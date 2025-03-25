import BigNumber from 'bignumber.js'
import React, { useState, useEffect } from 'react'
import { useSetChain } from '@web3-onboard/react'
import { toast } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import { useMediaQuery } from 'react-responsive'
import { PiQuestion } from 'react-icons/pi'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import DropDownIcon from '../../../../assets/images/logos/advancedfarm/drop-down.svg'
import InfoIcon from '../../../../assets/images/logos/beginners/info-circle.svg'
import CloseIcon from '../../../../assets/images/logos/beginners/close.svg'
import { BEGINNERS_BALANCES_DECIMALS } from '../../../../constants'
import { useWallet } from '../../../../providers/Wallet'
import { useRate } from '../../../../providers/Rate'
import { fromWei, toWei } from '../../../../services/web3'
import { addresses } from '../../../../data'
import { formatNumberWido, isSpecialApp, showTokenBalance } from '../../../../utilities/formats'
import { useThemeContext } from '../../../../providers/useThemeContext'
import AnimatedDots from '../../../AnimatedDots'
import Button from '../../../Button'
import {
  BaseWidoDiv,
  NewLabel,
  TokenInput,
  TokenAmount,
  TokenUSDAmount,
  TokenInfo,
  TokenSelect,
  Title,
  AmountSection,
  BalanceInfo,
  InsufficientSection,
  CloseBtn,
  TokenSelectSection,
  SwitchTabTag,
  HasErrorSection,
  FlexDiv,
} from './style'
import { usePortals } from '../../../../providers/Portals'
import { getChainName } from '../../../../utilities/parsers'

const WithdrawBase = ({
  setSelectToken,
  unstakeInputValue,
  setUnstakeInputValue,
  withdrawStart,
  setWithdrawStart,
  defaultToken,
  pricePerFullShare,
  pickedToken,
  unstakeBalance,
  setUnstakeBalance,
  balanceList,
  tokenSymbol,
  fAssetPool,
  lpTokenBalance,
  stakedAmount,
  token,
  switchMethod,
  useIFARM,
  setRevertFromInfoAmount,
  revertFromInfoUsdAmount,
  setRevertFromInfoUsdAmount,
  setRevertMinReceivedAmount,
  revertMinReceivedAmount,
  revertMinReceivedUsdAmount,
  setRevertMinReceivedUsdAmount,
  hasErrorOccurred,
  setHasErrorOccurred,
}) => {
  const {
    darkMode,
    bgColorNew,
    activeColor,
    fontColor,
    fontColor1,
    fontColor2,
    fontColor3,
    fontColor4,
    activeColorNew,
    borderColorBox,
    bgColorMessage,
    btnColor,
    btnHoverColor,
    btnActiveColor,
  } = useThemeContext()

  const [withdrawName, setWithdrawName] = useState('Preview & Revert')
  const [showWarning, setShowWarning] = useState(false)

  const { account, web3, connected, chainId, balances } = useWallet()
  const { getPortalsEstimate, getPortalsToken } = usePortals()

  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  const slippage = 0.5 // Default slippage Percent

  const tokenName = token.isIPORVault ? tokenSymbol : `f${tokenSymbol}`

  const fromToken = useIFARM ? addresses.iFARM : token.vaultAddress || token.tokenAddress1

  let stakeAmountWei
  if (useIFARM) {
    stakeAmountWei = toWei(
      stakedAmount,
      useIFARM ? fAssetPool?.lpTokenData?.decimals : token.decimals,
    )
  }

  const [
    {
      connectedChain, // the current chain the user's wallet is connected to
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()

  const tokenChain = token.chain || token.data.chain
  const curChain = isSpecialApp
    ? chainId
    : connectedChain
    ? parseInt(connectedChain.id, 16).toString()
    : ''

  useEffect(() => {
    if (
      account &&
      pickedToken.symbol !== 'Select' &&
      !new BigNumber(unstakeBalance.toString()).isEqualTo(0) &&
      curChain === tokenChain
    ) {
      const getQuoteResult = async () => {
        setRevertFromInfoAmount('')
        setRevertFromInfoUsdAmount('')
        const amount = unstakeBalance
        let portalsEstimate
        try {
          let fromInfoValue = '',
            fromInfoUsdValue = '',
            minReceivedString = '',
            minReceivedUsdString,
            outputAmountDefault = ''
          const toToken = pickedToken.address

          const pickedDefaultToken =
            pickedToken.address.toLowerCase() === defaultToken.address.toLowerCase()

          if (pickedDefaultToken) {
            const unstakeBalanceDecimals = fromWei(
              unstakeBalance,
              pickedToken.decimals,
              pickedToken.decimals,
            )
            const outputAmountDefaultDecimals = new BigNumber(unstakeBalanceDecimals.toString())
              .times(new BigNumber(pricePerFullShare))
              .toString()
            outputAmountDefault = toWei(outputAmountDefaultDecimals, pickedToken.decimals, 0)
          } else {
            portalsEstimate = await getPortalsEstimate({
              chainId,
              tokenIn: fromToken,
              inputAmount: amount,
              tokenOut: toToken,
              slippage,
              sender: account,
            })
          }

          if (pickedDefaultToken || portalsEstimate.succeed) {
            let fromTokenUsdPrice, toTokenUsdPrice, fromTokenDetail, toTokenDetail
            if (pickedDefaultToken) {
              fromTokenUsdPrice = Number(pickedToken.usdPrice) * Number(pricePerFullShare)
              toTokenUsdPrice = pickedToken.usdPrice
            } else {
              fromTokenDetail = await getPortalsToken(chainId, fromToken)
              toTokenDetail = await getPortalsToken(chainId, toToken)
              fromTokenUsdPrice = fromTokenDetail?.price
              toTokenUsdPrice = toTokenDetail?.price
            }

            const quoteResult = {
              fromTokenAmount: amount,
              fromTokenUsdPrice,
              minToTokenAmount: pickedDefaultToken
                ? outputAmountDefault
                : portalsEstimate.res.outputAmount,
            }

            const defaultDecimal = token.isIPORVault ? token.vaultDecimals : token?.decimals
            fromInfoValue = new BigNumber(
              fromWei(
                quoteResult.fromTokenAmount,
                useIFARM
                  ? fAssetPool?.lpTokenData?.decimals
                  : pickedDefaultToken
                  ? defaultDecimal
                  : fromTokenDetail?.decimals,
                useIFARM
                  ? fAssetPool?.lpTokenData?.decimals
                  : pickedDefaultToken
                  ? defaultDecimal
                  : fromTokenDetail?.decimals,
              ),
            ).toString()
            fromInfoUsdValue =
              quoteResult.fromTokenAmount === null
                ? '0'
                : formatNumberWido(
                    fromWei(
                      quoteResult.fromTokenAmount,
                      useIFARM
                        ? fAssetPool?.lpTokenData?.decimals
                        : pickedDefaultToken
                        ? defaultDecimal
                        : fromTokenDetail?.decimals,
                      useIFARM
                        ? fAssetPool?.lpTokenData?.decimals
                        : pickedDefaultToken
                        ? defaultDecimal
                        : fromTokenDetail?.decimals,
                      true,
                    ) * quoteResult.fromTokenUsdPrice,
                    BEGINNERS_BALANCES_DECIMALS,
                  )
            const pDecimal =
              token.isIPORVault && pickedDefaultToken ? token.vaultDecimals : pickedToken.decimals
            minReceivedString = new BigNumber(
              fromWei(quoteResult.minToTokenAmount, pDecimal, pDecimal),
            ).toString()
            minReceivedUsdString = formatNumberWido(
              parseFloat(minReceivedString) * toTokenUsdPrice,
              BEGINNERS_BALANCES_DECIMALS,
            )

            if (Number(fromInfoUsdValue) < 0.01) {
              setRevertFromInfoUsdAmount(`<${currencySym}0.01`)
            } else {
              setRevertFromInfoUsdAmount(
                `${currencySym}${(Number(fromInfoUsdValue) * Number(currencyRate)).toFixed(2)}`,
              )
            }
            if (Number(minReceivedUsdString) < 0.01) {
              setRevertMinReceivedUsdAmount(`<${currencySym}0.01`)
            } else {
              setRevertMinReceivedUsdAmount(
                `${currencySym}${(Number(minReceivedUsdString) * Number(currencyRate)).toFixed(2)}`,
              )
            }
            setRevertFromInfoAmount(fromInfoValue)
            setRevertMinReceivedAmount(minReceivedString)
            setHasErrorOccurred(0)
          } else {
            setRevertFromInfoAmount('-')
            setRevertFromInfoUsdAmount('-')
            setRevertMinReceivedAmount('-')
            setRevertMinReceivedUsdAmount('-')
            if (
              portalsEstimate.res.message === 'inputToken not found' ||
              portalsEstimate.res.message === 'Unexpected error'
            ) {
              setHasErrorOccurred(2)
            } else {
              setHasErrorOccurred(1)
            }
          }
        } catch (e) {
          console.error('Error content: ', e)
        }
      }
      getQuoteResult()
    }
    // eslint-disable-next-line
  }, [
    account,
    tokenChain,
    pickedToken,
    unstakeBalance,
    withdrawStart,
    balanceList,
    token,
    web3,
    chainId,
    fromToken,
    curChain,
    setRevertFromInfoAmount,
    setRevertFromInfoUsdAmount,
    setRevertMinReceivedAmount,
    getPortalsEstimate,
    getPortalsToken,
    currencySym,
    currencyRate,
  ])

  useEffect(() => {
    if (account) {
      if (curChain !== tokenChain) {
        const chainName = getChainName(tokenChain)
        setWithdrawName(`Change Network to ${chainName}`)
      } else {
        setWithdrawName('Preview & Revert')
      }
    } else {
      setWithdrawName('Connect Wallet to Get Started')
    }
  }, [account, curChain, tokenChain])

  const onInputUnstake = e => {
    const inputValue = e.currentTarget.value.replace(/,/g, '.')
    setUnstakeInputValue(inputValue)
    setUnstakeBalance(
      toWei(
        inputValue,
        useIFARM
          ? fAssetPool.lpTokenData.decimals
          : token.isIPORVault
          ? token.vaultDecimals
          : token.decimals,
      ),
    )
  }

  const onClickWithdraw = async () => {
    if (pickedToken.symbol === 'Select') {
      toast.error('Please choose your Output Token.')
      return
    }

    if (new BigNumber(unstakeBalance.toString()).isEqualTo(0)) {
      toast.error('Please input amount to revert!')
      return
    }

    if (useIFARM) {
      if (
        !new BigNumber(unstakeBalance.toString()).isLessThanOrEqualTo(stakeAmountWei.toString())
      ) {
        setShowWarning(true)
      }
    } else if (
      !new BigNumber(unstakeBalance.toString()).isLessThanOrEqualTo(
        token.isIPORVault ? balances[token.id].toString() : lpTokenBalance.toString(),
      )
    ) {
      setShowWarning(true)
      return
    }
    setWithdrawStart(true)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const mainTags = [
    { name: 'Convert', img: BsArrowDown },
    { name: 'Revert', img: BsArrowUp },
  ]

  return (
    <>
      <BaseWidoDiv>
        <NewLabel
          bg={darkMode ? '#373D51' : '#fff'}
          size={isMobile ? '16px' : '16px'}
          height={isMobile ? '24px' : '24px'}
          weight="600"
          color={fontColor1}
          display="flex"
          justifyContent="center"
          padding={isMobile ? '4px 0px' : '4px 0px'}
          marginBottom="13px"
          border={`1.3px solid ${borderColorBox}`}
          borderRadius="8px"
        >
          {mainTags.map((tag, i) => (
            <SwitchTabTag
              key={i}
              onClick={() => {
                if (i === 0) {
                  switchMethod()
                }
              }}
              num={i}
              color={i === 1 ? fontColor4 : fontColor3}
              borderColor={i === 1 ? activeColor : ''}
              backColor={i === 1 ? activeColorNew : ''}
              boxShadow={
                i === 1
                  ? '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)'
                  : ''
              }
            >
              <tag.img />
              <p>{tag.name}</p>
            </SwitchTabTag>
          ))}
        </NewLabel>
        <Title fontColor={fontColor}>
          {`Revert your ${useIFARM ? `i${tokenSymbol}` : 'fToken'} into`}{' '}
          {pickedToken.symbol !== 'Select' ? pickedToken.symbol : 'Output Token'}.
        </Title>
        <TokenInfo>
          <AmountSection>
            <NewLabel
              size={isMobile ? '14px' : '14px'}
              height={isMobile ? '20px' : '20px'}
              weight="500"
              color={fontColor2}
              marginBottom="6px"
            >
              Amount to Revert
            </NewLabel>
            <TokenInput>
              <TokenAmount
                type="number"
                value={unstakeInputValue}
                onChange={onInputUnstake}
                bgColor={bgColorNew}
                fontColor2={fontColor2}
                borderColor={borderColorBox}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <input type="hidden" value={Number(unstakeInputValue)} />
              <TokenUSDAmount fontColor3={fontColor3}>
                {unstakeInputValue === '0' || unstakeInputValue === '' ? (
                  `${currencySym}0`
                ) : revertFromInfoUsdAmount === '' ? (
                  <TokenInfo>
                    <AnimatedDots />
                  </TokenInfo>
                ) : revertFromInfoUsdAmount === '-' ? (
                  '-'
                ) : (
                  `≈${revertFromInfoUsdAmount}`
                )}
              </TokenUSDAmount>
            </TokenInput>
          </AmountSection>
          <TokenSelectSection>
            <NewLabel
              size={isMobile ? '14px' : '14px'}
              height={isMobile ? '20px' : '20px'}
              weight="500"
              color={fontColor2}
              marginBottom="6px"
            >
              Output Token
            </NewLabel>
            <TokenSelect
              type="button"
              onClick={async () => {
                setSelectToken(true)
              }}
            >
              {pickedToken.logoURI ? (
                <img className="logo" src={pickedToken.logoURI} width={24} height={24} alt="" />
              ) : (
                <></>
              )}
              <span>{pickedToken.symbol}</span>
              <img className="dropdown-icon" src={DropDownIcon} alt="" />
            </TokenSelect>
          </TokenSelectSection>
        </TokenInfo>
        <BalanceInfo
          fontColor={fontColor}
          onClick={() => {
            if (account) {
              const bal = token.isIPORVault ? balances[token.id] : lpTokenBalance
              const decimal = token.isIPORVault
                ? token.vaultDecimals
                : fAssetPool.lpTokenData.decimals
              setUnstakeBalance(useIFARM ? stakeAmountWei : bal)
              setUnstakeInputValue(
                new BigNumber(
                  fromWei(useIFARM ? stakeAmountWei : bal, decimal, decimal, false),
                ).toString(),
              )
            }
          }}
        >
          Balance Available:
          <span>
            {!connected ? (
              0
            ) : useIFARM ? (
              stakedAmount || <AnimatedDots />
            ) : lpTokenBalance || token.isIPORVault ? (
              new BigNumber(
                token.isIPORVault
                  ? fromWei(balances[token.id], token.vaultDecimals, token.vaultDecimals, false)
                  : fromWei(
                      lpTokenBalance,
                      fAssetPool.lpTokenData.decimals,
                      fAssetPool.lpTokenData.decimals,
                      false,
                    ),
              ).toString()
            ) : (
              <AnimatedDots />
            )}
          </span>
        </BalanceInfo>
        <InsufficientSection
          isShow={showWarning ? 'true' : 'false'}
          activeColor={activeColor}
          bgColorMessage={bgColorMessage}
        >
          <NewLabel display="flex" widthDiv="80%" items="center">
            <img className="info-icon" src={InfoIcon} alt="" />
            <NewLabel
              size={isMobile ? '14px' : '14px'}
              height={isMobile ? '20px' : '20px'}
              weight="600"
              color={fontColor2}
            >
              The amount of {useIFARM ? `i${tokenSymbol}` : tokenName} you entered exceeds deposited
              balance.
            </NewLabel>
          </NewLabel>
          <div>
            <CloseBtn
              src={CloseIcon}
              alt=""
              onClick={() => {
                setShowWarning(false)
              }}
            />
          </div>
        </InsufficientSection>
        <HasErrorSection
          isShow={hasErrorOccurred === 1 ? 'true' : 'false'}
          activeColor={activeColor}
          bgColorMessage={bgColorMessage}
        >
          <NewLabel display="flex" flexFlow="column" widthDiv="100%">
            <FlexDiv>
              <img className="info-icon" src={InfoIcon} alt="" />
              <NewLabel
                size={isMobile ? '14px' : '14px'}
                height={isMobile ? '20px' : '20px'}
                weight="600"
                color={fontColor2}
              >
                Oops, we are having small issues with getting quotes. Please try again in 2 minutes.
              </NewLabel>
            </FlexDiv>
          </NewLabel>
          <div>
            <CloseBtn
              src={CloseIcon}
              alt=""
              onClick={() => {
                setHasErrorOccurred(0)
              }}
            />
          </div>
        </HasErrorSection>
      </BaseWidoDiv>
      <BaseWidoDiv borderColor={borderColorBox}>
        <NewLabel
          size={isMobile ? '14px' : '14px'}
          height={isMobile ? '24px' : '24px'}
          color={fontColor3}
        >
          <NewLabel
            display="flex"
            justifyContent="space-between"
            padding={isMobile ? '10px 0' : '10px 0'}
          >
            <NewLabel
              size={isMobile ? '14px' : '14px'}
              height={isMobile ? '24px' : '24px'}
              color={fontColor3}
              weight="500"
            >
              Est. Received
              <PiQuestion className="question" data-tip data-for="min-received" />
              <ReactTooltip
                id="min-received"
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
            </NewLabel>
            <NewLabel
              size={isMobile ? '14px' : '14px'}
              height={isMobile ? '24px' : '24px'}
              color={fontColor4}
              weight="600"
              textAlign="right"
              display="flex"
              items="flex-end"
              flexFlow="column"
            >
              <>
                <TokenInfo>
                  <div data-tip data-for="est-fToken-receive-revert">
                    {account &&
                    pickedToken.symbol !== 'Select Token' &&
                    !new BigNumber(unstakeBalance.toString()).isEqualTo(0) &&
                    curChain === tokenChain ? (
                      revertMinReceivedAmount !== '' ? (
                        showTokenBalance(revertMinReceivedAmount)
                      ) : (
                        <TokenInfo>
                          <AnimatedDots />
                        </TokenInfo>
                      )
                    ) : (
                      '-'
                    )}
                  </div>
                  <ReactTooltip
                    id="est-fToken-receive-revert"
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
                      {revertMinReceivedAmount}
                    </NewLabel>
                  </ReactTooltip>
                </TokenInfo>
                <span className="token-symbol">
                  {pickedToken.symbol !== 'Select' ? pickedToken.symbol : 'Output Token'}
                </span>
              </>
              <span className="token-symbol">
                {unstakeInputValue === '0' ||
                unstakeInputValue === '' ||
                pickedToken.symbol === 'Select' ||
                revertMinReceivedUsdAmount === 'NaN' ||
                revertMinReceivedUsdAmount === '-' ? (
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
        <NewLabel>
          <Button
            color="wido-deposit"
            width="100%"
            btnColor={btnColor}
            btnHoverColor={btnHoverColor}
            btnActiveColor={btnActiveColor}
            size="md"
            onClick={async () => {
              if (curChain !== tokenChain) {
                const chainHex = `0x${Number(tokenChain).toString(16)}`
                await setChain({ chainId: chainHex })
              } else {
                onClickWithdraw()
              }
            }}
          >
            {withdrawName}
          </Button>
        </NewLabel>
      </BaseWidoDiv>
    </>
  )
}
export default WithdrawBase
