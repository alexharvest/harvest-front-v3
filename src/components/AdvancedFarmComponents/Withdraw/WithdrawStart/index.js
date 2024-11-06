import BigNumber from 'bignumber.js'
import React, { useState, useEffect, useRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useMediaQuery } from 'react-responsive'
import { isEmpty, isNaN } from 'lodash'
import { BsArrowUp } from 'react-icons/bs'
import { CiSettings } from 'react-icons/ci'
import { PiQuestion } from 'react-icons/pi'
import { IoIosArrowUp } from 'react-icons/io'
import ReactTooltip from 'react-tooltip'
import { Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import AlertIcon from '../../../../assets/images/logos/beginners/alert-triangle.svg'
import AlertCloseIcon from '../../../../assets/images/logos/beginners/alert-close.svg'
import CloseIcon from '../../../../assets/images/logos/beginners/close.svg'
import ProgressOne from '../../../../assets/images/logos/advancedfarm/progress-step1.png'
import ProgressTwo from '../../../../assets/images/logos/advancedfarm/progress-step2.png'
import ProgressThree from '../../../../assets/images/logos/advancedfarm/progress-step3.png'
import ProgressFour from '../../../../assets/images/logos/advancedfarm/progress-step4.png'
import ProgressFive from '../../../../assets/images/logos/advancedfarm/progress-step5.png'
import { chainList, directDetailUrl, IFARM_TOKEN_SYMBOL } from '../../../../constants'
import { useActions } from '../../../../providers/Actions'
import { useVaults } from '../../../../providers/Vault'
import { useWallet } from '../../../../providers/Wallet'
import { usePools } from '../../../../providers/Pools'
import { usePortals } from '../../../../providers/Portals'
import { useRate } from '../../../../providers/Rate'
import { useThemeContext } from '../../../../providers/useThemeContext'
import { getWeb3, fromWei } from '../../../../services/web3'
import { formatNumberWido, showTokenBalance } from '../../../../utilities/formats'
import AnimatedDots from '../../../AnimatedDots'
import { addresses } from '../../../../data'
import {
  // getHighestApy,
  // getSecondApy,
  addressMatchVault,
  getMatchedVaultList,
  getVaultValue,
} from '../../../../utilities/parsers'
import {
  Buttons,
  FTokenInfo,
  FTokenDiv,
  IconCard,
  ImgBtn,
  NewLabel,
  SelectTokenWido,
  FTokenWrong,
  AnimateDotDiv,
  SlippageBox,
  MiddleLine,
  SlipValue,
  SlippageRow,
  SlippageInput,
  SlippageBtn,
  ProgressLabel,
  ProgressText,
  AVRWrapper,
  AVRContainer,
  AVRBadge,
  ApyValue,
  TopLogo,
  LogoImg,
  BigLogoImg,
  VaultContainer,
  HighestVault,
  ImagePart,
  NamePart,
  ImageName,
} from './style'

const WithdrawStart = ({
  groupOfVaults,
  unstakeInputValue,
  withdrawStart,
  setWithdrawStart,
  defaultToken,
  pickedToken,
  setPickedToken,
  token,
  unstakeBalance,
  tokenSymbol,
  fAssetPool,
  useIFARM,
  setRevertFromInfoAmount,
  revertFromInfoAmount,
  revertFromInfoUsdAmount,
  revertMinReceivedAmount,
  revertMinReceivedUsdAmount,
  setUnstakeInputValue,
  setRevertSuccess,
  altVaultData,
}) => {
  const {
    darkMode,
    backColor,
    fontColor1,
    fontColor2,
    fontColor3,
    fontColor5,
    bgColorSlippage,
    borderColor,
    bgColorMessage,
    hoverColorAVR,
  } = useThemeContext()
  const { account, web3 } = useWallet()
  const { fetchUserPoolStats, userStats, pools } = usePools()
  const { push } = useHistory()
  const [slippagePercentage, setSlippagePercentage] = useState(null)
  const [slippageSetting, setSlippageSetting] = useState(false)
  const [customSlippage, setCustomSlippage] = useState(null)
  const [slippageBtnLabel, setSlippageBtnLabel] = useState('Save')
  const [progressStep, setProgressStep] = useState(0)
  const [buttonName, setButtonName] = useState('Approve Token')
  const [withdrawFailed, setWithdrawFailed] = useState(false)
  const [slippageFailed, setSlippageFailed] = useState(false)
  const [startSpinner, setStartSpinner] = useState(false) // State of Spinner for 'Finalize Deposit' button
  const [revertedAmount, setRevertedAmount] = useState('')
  const [revertedAmountUsd, setRevertedAmountUsd] = useState('')
  const { handleWithdraw } = useActions()
  const { vaultsData } = useVaults()
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)
  const [highestApyLogo, setHighestApyLogo] = useState([])
  const [tokenNames, setTokenNames] = useState([])
  const [platformNames, setPlatformNames] = useState([])
  const [topApyVault, setTopApyVault] = useState()
  const [fromTokenAddress, setFromTokenAddress] = useState()
  const [toVaultAddress, setToVaultAddress] = useState()
  const [isSpecialToken, setIsSpecialToken] = useState(false)
  const [matchVaultList, setMatchVaultList] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [networkName, setNetworkName] = useState('')
  const isFetchingRef = useRef(false)

  const curChain = token.poolVault ? token.data.chain : token.chain

  useEffect(() => {
    const tokenChain = token.poolVault ? token.data.chain : token.chain
    const network =
      Number(tokenChain) === 42161
        ? 'Arbitrum'
        : Number(tokenChain) === 8453
        ? 'Base'
        : Number(tokenChain) === 324
        ? 'Zksync'
        : Number(tokenChain) === 137
        ? 'Polygon'
        : 'Ethereum'
    setNetworkName(network)
  }, [token])

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  const { getPortalsApproval, portalsApprove, getPortals, getPortalsSupport } = usePortals()

  let pickedDefaultToken,
    totalApy = 0
  if (pickedToken.symbol !== 'Select' && defaultToken) {
    pickedDefaultToken = pickedToken.address.toLowerCase() === defaultToken.address.toLowerCase()
  }
  const SlippageValues = [null, 0.1, 0.5, 1, 5]
  const onInputSlippage = e => {
    let inputValue = e.target.value
    if (!isNaN(inputValue)) {
      inputValue = Math.max(0, Math.min(10, inputValue))
      setCustomSlippage(inputValue)
    }
  }

  const onSlippageSave = () => {
    if (!(customSlippage === null || customSlippage === 0)) {
      setSlippagePercentage(customSlippage)

      setSlippageBtnLabel('Saved')
      setTimeout(() => {
        setSlippageBtnLabel('Save')
      }, 2000)
    }
  }

  if (!isEmpty(altVaultData)) {
    totalApy =
      Number(altVaultData?.estimatedApy) +
      Number(altVaultData?.pool?.tradingApy) +
      Number(altVaultData?.pool?.totalRewardAPY)
    totalApy = isNaN(totalApy) ? 0 : totalApy.toFixed(2)
  }

  const chainId = token.chain || token.data.chain
  const fromToken = useIFARM ? addresses.iFARM : token.vaultAddress || token.tokenAddress

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  // const highestApyVault = getHighestApy(groupOfVaults, Number(chainId), vaultsData, pools)
  // const secHighApyVault = getSecondApy(groupOfVaults, Number(chainId), vaultsData, pools)

  const approveZap = async amnt => {
    const { approve } = await portalsApprove(chainId, account, fromToken, amnt.toString())
    const mainWeb = await getWeb3(chainId, account, web3)

    await mainWeb.eth.sendTransaction({
      from: account,
      data: approve.data,
      to: approve.to,
    })
  }

  const startWithdraw = async () => {
    if (progressStep === 0) {
      setStartSpinner(true)
      setProgressStep(1)
      setButtonName('Pending Approval in Wallet')
      setWithdrawFailed(false)
      if (pickedDefaultToken) {
        setProgressStep(2)
        setButtonName('Confirm Transaction')
        setStartSpinner(false)
      } else {
        try {
          const approval = await getPortalsApproval(chainId, account, fromToken)
          console.debug('Allowance Spender: ', approval.spender)

          const allowanceCheck = approval ? approval.allowance : 0

          if (
            !new BigNumber(allowanceCheck.toString()).gte(new BigNumber(unstakeBalance.toString()))
          ) {
            await approveZap(unstakeBalance) // Approve for Zap
          }
          setProgressStep(2)
          setButtonName('Confirm Transaction')
          setStartSpinner(false)
        } catch (err) {
          setStartSpinner(false)
          setWithdrawFailed(true)
          setProgressStep(0)
          setButtonName('Approve Token')
        }
      }
    } else if (progressStep === 2) {
      let isSuccess = true
      if (pickedDefaultToken) {
        setProgressStep(3)
        setButtonName('Pending Confirmation in Wallet')
        setStartSpinner(true)
        isSuccess = await handleWithdraw(
          account,
          useIFARM ? IFARM_TOKEN_SYMBOL : tokenSymbol,
          unstakeBalance,
          vaultsData,
          null,
          false,
          null,
          async () => {
            await fetchUserPoolStats([fAssetPool], account, userStats)
          },
          async () => {
            setWithdrawFailed(true)
            setStartSpinner(false)
            setProgressStep(0)
            setButtonName('Approve Token')
          },
        )
      } else {
        try {
          setProgressStep(3)
          setButtonName('Pending Confirmation in Wallet')
          setStartSpinner(true)
          const amount = unstakeBalance
          const toToken = pickedToken.address
          const mainWeb = await getWeb3(chainId, account, web3)
          const portalData = await getPortals({
            chainId,
            sender: account,
            tokenIn: fromToken,
            inputAmount: amount,
            tokenOut: toToken,
            slippage: slippagePercentage,
          })

          await mainWeb.eth.sendTransaction({
            from: portalData.tx.from,
            data: portalData.tx.data,
            to: portalData.tx.to,
            value: portalData.tx.value,
          })

          const receiveString = portalData
            ? fromWei(
                portalData.context?.outputAmount,
                pickedToken.decimals || 18,
                pickedToken.decimals || 18,
              )
            : ''
          const receiveUsdString = portalData ? portalData.context?.outputAmountUsd : ''
          setRevertedAmount(receiveString)
          setRevertedAmountUsd(formatNumberWido(receiveUsdString))

          await fetchUserPoolStats([fAssetPool], account, userStats)
        } catch (err) {
          setWithdrawFailed(true)
          setStartSpinner(false)
          setProgressStep(0)
          setButtonName('Approve Token')
          isSuccess = false
          return
        }
      }
      // End Approve and Withdraw successfully
      if (isSuccess) {
        setStartSpinner(false)
        setWithdrawFailed(false)
        setProgressStep(4)
        setButtonName('Success! Close this window.')
      }
    } else if (progressStep === 4) {
      setRevertSuccess(true)
      setUnstakeInputValue('0')
      setRevertFromInfoAmount('0')
      setPickedToken({ symbol: 'Select' })
      setProgressStep(0)
      setWithdrawStart(false)
      setWithdrawFailed(false)
      setButtonName('Approve Token')
    }
  }

  const closeWithdraw = async () => {
    setProgressStep(0)
    setWithdrawStart(false)
    setWithdrawFailed(false)
    setButtonName('Approve Token')
    setStartSpinner(false)
    if (progressStep === 4) {
      setRevertSuccess(true)
      setUnstakeInputValue('0')
      setRevertFromInfoAmount('0')
      setPickedToken({ symbol: 'Select' })
    }
  }

  useEffect(() => {
    const activedList = []
    if (chainId) {
      const matched = getMatchedVaultList(groupOfVaults, chainId, vaultsData, pools)
      if (matched.length > 0) {
        matched.forEach(item => {
          const vaultValue = getVaultValue(item.vault)
          if (Number(item.vaultApy) !== 0 && Number(vaultValue) > 500) {
            activedList.push(item)
          }
        })
      }
    }

    const fetchSupportedMatches = async () => {
      if (isFetchingRef.current) {
        return
      }
      isFetchingRef.current = true
      const filteredMatchList = []

      if (activedList.length > 0) {
        activedList.sort((a, b) => b.vaultApy - a.vaultApy)
        const newArray = activedList.slice(0, 10)
        // eslint-disable-next-line no-restricted-syntax
        for (const item of newArray) {
          if (
            item.vaultApy !== 0 &&
            item.vault.vaultAddress.toLowerCase() !== '0x47e3daf382c4603450905fb68766db8308315407'
          ) {
            const mToken = item.vault
            const tokenAddress = useIFARM
              ? addresses.iFARM
              : mToken.vaultAddress || mToken.tokenAddress
            // eslint-disable-next-line no-await-in-loop
            const portalsToken = await getPortalsSupport(chainId, tokenAddress)
            if (portalsToken) {
              if (portalsToken.status === 200) {
                if (portalsToken.data.totalItems !== 0) {
                  filteredMatchList.push(item)
                }
              }
            } else {
              console.log('Error in fetching Portals supported')
            }
          }
        }
      }
      if (filteredMatchList.length > 0) {
        setMatchVaultList(filteredMatchList)
      }

      isFetchingRef.current = false
    }

    fetchSupportedMatches()
  }, [chainId, pools, setMatchVaultList, token]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      matchVaultList.length > 0 &&
      token.vaultAddress.toLowerCase() !== matchVaultList[0].vault.vaultAddress.toLowerCase() &&
      !isSpecialToken
    ) {
      setHighestApyLogo(matchVaultList[0].vault.logoUrl)
      setTokenNames(matchVaultList[0].vault.tokenNames)
      setPlatformNames(matchVaultList[0].vault.platform)
      setTopApyVault(matchVaultList[0].vaultApy)
      setFromTokenAddress(token.vaultAddress.toLowerCase())
      setToVaultAddress(matchVaultList[0].vault.vaultAddress.toLowerCase())
    } else if (
      matchVaultList.length > 0 &&
      token.vaultAddress.toLowerCase() === matchVaultList[0].vault.vaultAddress.toLowerCase() &&
      !isSpecialToken
    ) {
      setHighestApyLogo(matchVaultList[1].vault.logoUrl)
      setTokenNames(matchVaultList[1].vault.tokenNames)
      setPlatformNames(matchVaultList[1].vault.platform)
      setTopApyVault(matchVaultList[1].vaultApy)
      setFromTokenAddress(token.vaultAddress.toLowerCase())
      setToVaultAddress(matchVaultList[1].vault.vaultAddress.toLowerCase())
    }
  }, [matchVaultList, token, isSpecialToken])

  useEffect(() => {
    let migrate
    if (token.vaultAddress.toLowerCase() === '0x6adebe9a4c8df4e6bfd09263ab7e2edf67288763') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0x7f7e98E5FA2ef1dE3b747b55dd81f73960Ce92C2',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0xc54a552ada1871417b6569a512f748b023ed49be') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0xc05374A286143BA88984AF1a103aceD8b587c96b',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0x85050bedc80ea28e53db5f80f165d87f29d2a1bc') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0x0D15225454474ab3cb124083278c7bE03f8a99Ff',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0xd691d8e3bc5008708786114481714b9c636f766f') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0x85050BEdC80eA28e53dB5F80F165d87F29d2A1bC',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0xb01a958d8e9dba566c6d71f66ef566ccf5fac859') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0x85050BEdC80eA28e53dB5F80F165d87F29d2A1bC',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0x95e96dade6cc960f3cbe3a71cae8413af5a3d9f4') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0x85050BEdC80eA28e53dB5F80F165d87F29d2A1bC',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0x58677351d11f8941c7199c49aa7379a156404972') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0x85050BEdC80eA28e53dB5F80F165d87F29d2A1bC',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0x5189dcb7cdab823915865817778032d2a6fc8108') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0x85050BEdC80eA28e53dB5F80F165d87F29d2A1bC',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0xe351c30c1b7da09df89d1c8528ce7110d0702d23') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0xe6b284e58E0D9f660503dD0E5579Cc8fbc954C6c',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0x0d15225454474ab3cb124083278c7be03f8a99ff') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0x85050BEdC80eA28e53dB5F80F165d87F29d2A1bC',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0xef39ef2069a9a65cd6476b6c9a6fb7dd2910f370') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0xe6b284e58E0D9f660503dD0E5579Cc8fbc954C6c',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0x2b70238022589f17e7b266bc753e74027d57009f') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0xe6b284e58E0D9f660503dD0E5579Cc8fbc954C6c',
        vaultsData,
        pools,
      )
    }
    if (token.vaultAddress.toLowerCase() === '0x24174022d382cd155c33a847404cda5bc7978802') {
      migrate = addressMatchVault(
        groupOfVaults,
        '0xf54537b19796d2c75EcB6760a299B8482eA717fB',
        vaultsData,
        pools,
      )
    }
    if (migrate) {
      setHighestApyLogo(migrate.vault.logoUrl)
      setTokenNames(migrate.vault.tokenNames)
      setPlatformNames(migrate.vault.platform)
      setTopApyVault(migrate.vaultApy)
      setFromTokenAddress(token.vaultAddress.toLowerCase())
      setToVaultAddress(migrate.vault.vaultAddress.toLowerCase())
      setIsSpecialToken(true)
    }
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      show={withdrawStart}
      // onHide={onClose}
      dialogClassName="modal-notification"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="deposit-modal-header">
        <FTokenInfo>
          <FTokenDiv>
            <NewLabel margin="auto 0px">
              <IconCard>
                <BsArrowUp />
              </IconCard>
            </NewLabel>
            <NewLabel textAlign="left" marginRight="12px">
              <NewLabel
                color="#15B088"
                size={isMobile ? '18px' : '18px'}
                height={isMobile ? '28px' : '28px'}
                weight="600"
                marginBottom="4px"
              >
                Summary
              </NewLabel>
              <NewLabel
                color={fontColor1}
                size={isMobile ? '14px' : '14px'}
                height={isMobile ? '20px' : '20px'}
                weight="400"
                marginBottom="5px"
              >
                Revert your fTokens into selected token
              </NewLabel>
            </NewLabel>
          </FTokenDiv>
          <NewLabel>
            <NewLabel
              display="flex"
              marginBottom={isMobile ? '16px' : '16px'}
              width="fit-content"
              cursorType="pointer"
              weight="600"
              size={isMobile ? '14px' : '14px'}
              height={isMobile ? '20px' : '20px'}
              color="#667085"
              align="center"
              onClick={() => {
                closeWithdraw()
              }}
            >
              <ImgBtn src={CloseIcon} alt="" />
            </NewLabel>
          </NewLabel>
        </FTokenInfo>
      </Modal.Header>
      <Modal.Body className="deposit-modal-body">
        <SelectTokenWido>
          <NewLabel
            size={isMobile ? '14px' : '14px'}
            height={isMobile ? '24px' : '24px'}
            padding="15px 24px"
            color={fontColor2}
          >
            <NewLabel
              display="flex"
              justifyContent="space-between"
              padding={isMobile ? '10px 0' : '10px 0'}
            >
              <NewLabel weight="500">{progressStep === 4 ? 'Reverted' : 'Reverting'}</NewLabel>
              <NewLabel display="flex" flexFlow="column" weight="600" textAlign="right">
                <>
                  {revertFromInfoAmount === '-' || revertFromInfoAmount === 'NaN' ? (
                    unstakeInputValue
                  ) : revertFromInfoAmount !== '' ? (
                    revertFromInfoAmount
                  ) : (
                    <AnimateDotDiv>
                      <AnimatedDots />
                    </AnimateDotDiv>
                  )}
                </>
                <NewLabel display="flex" flexFlow="column" weight="600" textAlign="right">
                  <span>{useIFARM ? `i${tokenSymbol}` : `f${tokenSymbol}`}</span>
                  <span>
                    {revertFromInfoUsdAmount !== '' ? (
                      <>≈{revertFromInfoUsdAmount}</>
                    ) : (
                      <AnimatedDots />
                    )}
                  </span>
                </NewLabel>
              </NewLabel>
            </NewLabel>
            <NewLabel
              display="flex"
              justifyContent="space-between"
              padding={isMobile ? '10px 0' : '10px 0'}
            >
              <NewLabel
                className="beginners"
                weight="500"
                items="center"
                display="flex"
                alignSelf="flex-start"
              >
                {progressStep === 4 ? 'Received' : 'Est. Received'}
                {progressStep !== 4 && (
                  <>
                    <PiQuestion className="question" data-tip data-for="min-help" />
                    <ReactTooltip
                      id="min-help"
                      backgroundColor={darkMode ? 'white' : '#101828'}
                      borderColor={darkMode ? 'white' : 'black'}
                      textColor={darkMode ? 'black' : 'white'}
                      place="right"
                    >
                      <NewLabel
                        size={isMobile ? '12px' : '12px'}
                        height={isMobile ? '18px' : '18px'}
                        weight="600"
                      >
                        The estimated number of tokens you will receive in your wallet. The default
                        slippage is set as &lsquo;Auto&lsquo;.
                      </NewLabel>
                    </ReactTooltip>
                  </>
                )}
              </NewLabel>
              <NewLabel display="flex" flexFlow="column" weight="600" textAlign="right">
                <>
                  <>
                    <div data-tip data-for="modal-fToken-receive-revert">
                      {!pickedDefaultToken && progressStep === 4 ? (
                        revertedAmount !== '' ? (
                          showTokenBalance(revertedAmount)
                        ) : (
                          <AnimateDotDiv>
                            <AnimatedDots />
                          </AnimateDotDiv>
                        )
                      ) : revertMinReceivedAmount !== '' ? (
                        showTokenBalance(revertMinReceivedAmount)
                      ) : (
                        <AnimateDotDiv>
                          <AnimatedDots />
                        </AnimateDotDiv>
                      )}
                    </div>
                    <ReactTooltip
                      id="modal-fToken-receive-revert"
                      backgroundColor={darkMode ? 'white' : '#101828'}
                      borderColor={darkMode ? 'white' : 'black'}
                      textColor={darkMode ? 'black' : 'white'}
                      place="top"
                    >
                      <NewLabel
                        size={isMobile ? '10px' : '10px'}
                        height={isMobile ? '14px' : '14px'}
                        weight="500"
                      >
                        {!pickedDefaultToken && progressStep === 4 ? (
                          revertedAmount !== '' ? (
                            revertedAmount
                          ) : (
                            <AnimateDotDiv>
                              <AnimatedDots />
                            </AnimateDotDiv>
                          )
                        ) : revertMinReceivedAmount !== '' ? (
                          revertMinReceivedAmount
                        ) : (
                          <AnimateDotDiv>
                            <AnimatedDots />
                          </AnimateDotDiv>
                        )}
                      </NewLabel>
                    </ReactTooltip>
                  </>
                  <span>{pickedToken.symbol}</span>
                </>
                <span>
                  {!pickedDefaultToken && progressStep === 4 ? (
                    revertedAmountUsd === 'NaN' || revertedAmountUsd === '' ? (
                      '-'
                    ) : revertedAmountUsd !== '' ? (
                      `≈${currencySym}${(Number(revertedAmountUsd) * Number(currencyRate)).toFixed(
                        2,
                      )}`
                    ) : (
                      <AnimatedDots />
                    )
                  ) : revertMinReceivedUsdAmount === 'NaN' || revertMinReceivedUsdAmount === '-' ? (
                    '-'
                  ) : revertMinReceivedUsdAmount !== '' ? (
                    `≈${revertMinReceivedUsdAmount}`
                  ) : (
                    <AnimatedDots />
                  )}
                </span>
              </NewLabel>
            </NewLabel>
          </NewLabel>

          <FTokenWrong isShow={withdrawFailed ? 'true' : 'false'}>
            <NewLabel marginRight="12px" display="flex">
              <div>
                <img src={AlertIcon} alt="" />
              </div>
              <NewLabel marginLeft="12px">
                <NewLabel
                  color="#B54708"
                  size={isMobile ? '14px' : '14px'}
                  height={isMobile ? '20px' : '20px'}
                  weight="600"
                  marginBottom="4px"
                >
                  Whoops, something went wrong.
                </NewLabel>
                <NewLabel
                  color="#B54708"
                  size={isMobile ? '14px' : '14px'}
                  height={isMobile ? '20px' : '20px'}
                  weight="400"
                  marginBottom="5px"
                >
                  Please try to repeat the transaction in your wallet.
                </NewLabel>
              </NewLabel>
            </NewLabel>
            <NewLabel>
              <ImgBtn
                src={AlertCloseIcon}
                alt=""
                onClick={() => {
                  setWithdrawFailed(false)
                }}
              />
            </NewLabel>
          </FTokenWrong>
          <FTokenWrong isShow={slippageFailed ? 'true' : 'false'}>
            <NewLabel marginRight="12px" display="flex">
              <div>
                <img src={AlertIcon} alt="" />
              </div>
              <NewLabel marginLeft="12px">
                <NewLabel
                  color="#B54708"
                  size={isMobile ? '14px' : '14px'}
                  height={isMobile ? '20px' : '20px'}
                  weight="600"
                  marginBottom="4px"
                >
                  Whoops, slippage set too low
                </NewLabel>
                <NewLabel
                  color="#B54708"
                  size={isMobile ? '14px' : '14px'}
                  height={isMobile ? '20px' : '20px'}
                  weight="400"
                  marginBottom="5px"
                >
                  Slippage for this conversion is set too low. Expected slippage is &gt;[number%].
                  If you wish to proceed, set it manually via the gear button below.
                </NewLabel>
              </NewLabel>
            </NewLabel>
            <NewLabel>
              <ImgBtn
                src={AlertCloseIcon}
                alt=""
                onClick={() => {
                  setSlippageFailed(false)
                }}
              />
            </NewLabel>
          </FTokenWrong>

          <NewLabel>
            <img
              className="progressbar-img"
              src={
                progressStep === 0
                  ? ProgressOne
                  : progressStep === 1
                  ? ProgressTwo
                  : progressStep === 2
                  ? ProgressThree
                  : progressStep === 3
                  ? ProgressFour
                  : ProgressFive
              }
              alt="progress bar"
            />
          </NewLabel>
          <ProgressLabel fontColor2={fontColor2}>
            <ProgressText width="50%" padding="0px 0px 0px 30px">
              Approve
              <br />
              Token
            </ProgressText>
            <ProgressText width="unset" padding="0px 0px 0px 7px">
              Confirm
              <br />
              Transaction
            </ProgressText>
            <ProgressText width="50%" padding="0px 10px 0px 0px">
              Transaction
              <br />
              Successful
            </ProgressText>
          </ProgressLabel>
          {Number(curChain) !== 324 && (
            <NewLabel>
              <NewLabel
                color={darkMode ? '#ffffff' : '#344054'}
                size={isMobile ? '14px' : '14px'}
                height={isMobile ? '20px' : '28px'}
                weight="600"
                padding="20px 24px 0px 24px"
              >
                Other users also like
              </NewLabel>
              <NewLabel
                color={darkMode ? '#ffffff' : '#15202b'}
                size={isMobile ? '14px' : '10px'}
                height={isMobile ? '20px' : '20px'}
                weight="400"
                padding="0px 24px"
              >
                Click on the new opportunity below to open a Migrate tool.
              </NewLabel>
              <VaultContainer>
                <HighestVault
                  className="highest-vault"
                  onClick={e => {
                    const url = `/migrate?from=${fromTokenAddress}&to=${toVaultAddress}&chain=${chainId}`
                    // token.vaultAddress.toLowerCase() !==
                    // highestApyVault.vault.vaultAddress.toLowerCase()
                    //   ? `/migrate?from=${token.vaultAddress.toLowerCase()}&to=${highestApyVault.vault.vaultAddress.toLowerCase()}&chain=${chainId}`
                    //   : `/migrate?from=${token.vaultAddress.toLowerCase()}&to=${secHighApyVault.vault.vaultAddress.toLowerCase()}&chain=${chainId}`
                    if (e.ctrlKey) {
                      window.open(url, '_blank')
                    } else {
                      push(url)
                    }
                  }}
                >
                  <ImageName>
                    <ImagePart>
                      {highestApyLogo.length === 0 ? (
                        <AnimatedDots />
                      ) : (
                        highestApyLogo.map((el, i) => {
                          return (
                            <BigLogoImg
                              key={i}
                              className="logo-img"
                              zIndex={10 - i}
                              src={`.${el}`}
                              alt={tokenNames[i]}
                            />
                          )
                        })
                      )}
                    </ImagePart>
                    <NamePart>
                      <NewLabel
                        color="#15202b"
                        size={isMobile ? '14px' : '14px'}
                        height={isMobile ? '20px' : '20px'}
                        weight="600"
                        padding="0px 10px"
                      >
                        {tokenNames.length === 0 ? <AnimatedDots /> : tokenNames.join(' - ')}
                      </NewLabel>
                      <NewLabel
                        color="#15202b"
                        size={isMobile ? '14px' : '10px'}
                        height={isMobile ? '20px' : '20px'}
                        weight="400"
                        padding="0px 10px"
                      >
                        {platformNames.length === 0 ? <AnimatedDots /> : platformNames.join(', ')}
                      </NewLabel>
                    </NamePart>
                  </ImageName>
                  <ImageName className="top-apy">
                    {topApyVault ? `${topApyVault}% APY` : <AnimatedDots />}
                  </ImageName>
                </HighestVault>
              </VaultContainer>
            </NewLabel>
          )}
          {!isEmpty(altVaultData) && progressStep === 4 && (
            <>
              <NewLabel
                size="14px"
                height="28px"
                weight={600}
                color={fontColor2}
                margin="25px 24px 0px 24px"
              >
                Looking for alternatives?
              </NewLabel>
              <AVRWrapper bgColor={bgColorMessage}>
                <AVRContainer
                  hoverColorAVR={hoverColorAVR}
                  onClick={() => {
                    let badgeId = -1
                    const chain = token.chain || token.data.chain
                    chainList.forEach((obj, j) => {
                      if (obj.chainId === Number(chain)) {
                        badgeId = j
                      }
                    })
                    const isSpecialVault = altVaultData.liquidityPoolVault || altVaultData.poolVault
                    const network = chainList[badgeId].name.toLowerCase()
                    const address = isSpecialVault
                      ? altVaultData.data.collateralAddress
                      : altVaultData.vaultAddress || altVaultData.tokenAddress
                    const url = `${directDetailUrl + network}/${address}`
                    window.open(url, '_blank')
                  }}
                >
                  <NewLabel marginRight="12px" display="flex">
                    <TopLogo>
                      {altVaultData.logoUrl.map((el, i) => (
                        <LogoImg className="logo" src={el.slice(1, el.length)} key={i} alt="" />
                      ))}
                    </TopLogo>
                    <NewLabel marginLeft="20px">
                      <NewLabel
                        color={fontColor1}
                        size="14px"
                        height="20px"
                        weight="600"
                        marginBottom="4px"
                      >
                        {altVaultData.tokenNames.join(' • ')}
                      </NewLabel>
                      <NewLabel
                        color={fontColor1}
                        size="12px"
                        height="20px"
                        weight="400"
                        marginBottom="5px"
                      >
                        {altVaultData.platform[0]}
                      </NewLabel>
                      <ApyValue bgColor={bgColorMessage} color={fontColor5}>
                        {totalApy}% APY
                      </ApyValue>
                    </NewLabel>
                  </NewLabel>
                  <AVRBadge>
                    Popular{' '}
                    <span role="img" aria-label="thumb" aria-labelledby="thumb">
                      🔥
                    </span>
                  </AVRBadge>
                </AVRContainer>
              </AVRWrapper>
            </>
          )}
          <NewLabel
            size={isMobile ? '16px' : '16px'}
            height={isMobile ? '24px' : '24px'}
            weight={600}
            color="#1F2937"
            padding={slippageSetting ? '25px 24px 10px' : '25px 24px 24px'}
            display="flex"
          >
            <SlippageBox onClick={() => setSlippageSetting(!slippageSetting)}>
              {slippageSetting ? (
                <IoIosArrowUp color="#6F78AA" fontSize={20} />
              ) : (
                <CiSettings color="#6F78AA" fontSize={20} />
              )}
            </SlippageBox>
            <Buttons
              onClick={() => {
                startWithdraw()
              }}
            >
              {buttonName}&nbsp;&nbsp;
              {!startSpinner ? (
                <></>
              ) : (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              )}
            </Buttons>
          </NewLabel>
          <NewLabel
            size={isMobile ? '12px' : '12px'}
            height={isMobile ? '24px' : '24px'}
            color={fontColor3}
            padding="10px 24px"
            display={slippageSetting ? 'flex' : 'none'}
            flexFlow="column"
          >
            <NewLabel display="flex" justifyContent="space-between">
              <NewLabel>Slippage Settings</NewLabel>
              <MiddleLine width={isMobile ? '65%' : '75%'} />
            </NewLabel>
            <NewLabel padding="10px 0px">
              Current slippage:{' '}
              <span className="auto-slippage">
                {slippagePercentage === null ? 'Auto (0 - 2.5%)' : `${slippagePercentage}%`}
              </span>
            </NewLabel>
            <SlippageRow borderColor={borderColor}>
              {SlippageValues.map((percentage, index) => (
                <SlipValue
                  key={index}
                  onClick={() => {
                    setSlippagePercentage(percentage)
                    setCustomSlippage(null)
                  }}
                  color={slippagePercentage === percentage ? '#fff' : fontColor2}
                  bgColor={slippagePercentage === percentage ? bgColorSlippage : ''}
                  borderColor={borderColor}
                  isLastChild={index === SlippageValues.length - 1}
                  isFirstChild={index === 0}
                >
                  {percentage === null ? 'Auto' : `${percentage}%`}
                </SlipValue>
              ))}
            </SlippageRow>
            <NewLabel
              display="flex"
              justifyContent="space-between"
              padding="15px 0px 5px"
              gap="10px"
            >
              <NewLabel color={fontColor2} weight="600" margin="auto">
                or
              </NewLabel>
              <SlippageInput
                fontColor2={fontColor2}
                backColor={backColor}
                borderColor={
                  customSlippage === null || customSlippage === 0 ? borderColor : '#15b088'
                }
              >
                <input
                  type="number"
                  value={customSlippage === null ? '' : customSlippage}
                  onChange={onInputSlippage}
                  placeholder="Custom"
                />
                <div className="percentage">%</div>
              </SlippageInput>
              <SlippageBtn
                onClick={onSlippageSave}
                color={
                  !darkMode
                    ? '#fff'
                    : customSlippage === null || customSlippage === 0
                    ? '#0C111D'
                    : '#fff'
                }
                bgColor={customSlippage === null || customSlippage === 0 ? '#ced3e6' : '#15b088'}
                cursor={customSlippage === null || customSlippage === 0 ? 'not-allowed' : 'pointer'}
                hoverColor={customSlippage === null || customSlippage === 0 ? '#ced3e6' : '#2ccda4'}
                activeColor={
                  customSlippage === null || customSlippage === 0 ? '#ced3e6' : '#4fdfbb'
                }
              >
                {slippageBtnLabel}
              </SlippageBtn>
            </NewLabel>
          </NewLabel>
        </SelectTokenWido>
      </Modal.Body>
    </Modal>
  )
}
export default WithdrawStart
