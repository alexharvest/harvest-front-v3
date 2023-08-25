import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import { useSetChain } from '@web3-onboard/react'
import { Spinner } from 'react-bootstrap'
import { isEmpty } from 'lodash'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import WalletIcon from '../../../../assets/images/logos/beginners/wallet-in-button.svg'
import InfoIcon from '../../../../assets/images/logos/beginners/info-circle.svg'
import CloseIcon from '../../../../assets/images/logos/beginners/close.svg'
import AlertIcon from '../../../../assets/images/logos/beginners/alert-triangle.svg'
import AlertCloseIcon from '../../../../assets/images/logos/beginners/alert-close.svg'
import AnimatedDots from '../../../AnimatedDots'
import { POOL_BALANCES_DECIMALS } from '../../../../constants'
import { useWallet } from '../../../../providers/Wallet'
import { usePools } from '../../../../providers/Pools'
import { useActions } from '../../../../providers/Actions'
import { CHAIN_IDS } from '../../../../data/constants'
import { isSpecialApp } from '../../../../utils'
import { fromWei, toWei } from '../../../../services/web3'
import Button from '../../../Button'
import {
  BalanceInfo,
  BaseSection,
  DepoTitle,
  TokenAmount,
  NewLabel,
  AmountSection,
  ThemeMode,
  InsufficientSection,
  CloseBtn,
  FTokenWrong,
  ImgBtn,
  AmountInputSection,
} from './style'

const { tokens } = require('../../../../data')

const getChainName = chain => {
  let chainName = 'Ethereum'
  switch (chain) {
    case CHAIN_IDS.POLYGON_MAINNET:
      chainName = 'Polygon'
      break
    case CHAIN_IDS.ARBITRUM_ONE:
      chainName = 'Arbitrum'
      break
    default:
      chainName = 'Ethereum'
      break
  }
  return chainName
}

const UnstakeBase = ({
  finalStep,
  setFinalStep,
  inputAmount,
  setInputAmount,
  token,
  activeStake,
  switchMethod,
  tokenSymbol,
  totalStaked,
  fAssetPool,
  setPendingAction,
  multipleAssets,
}) => {
  const { connected, connectAction, account, chainId, setChainId, getWalletBalances } = useWallet()

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
  const [btnName, setBtnName] = useState('Unstake')
  const [showWarning, setShowWarning] = useState(false)
  const [unstakeFailed, setUnstakeFailed] = useState(false)

  const { handleExit } = useActions()
  const { userStats, fetchUserPoolStats } = usePools()

  const isSpecialVault = token.liquidityPoolVault || token.poolVault
  const tokenDecimals = token.decimals || tokens[tokenSymbol].decimals
  const walletBalancesToCheck = multipleAssets || [tokenSymbol]

  const [amountsToExecute, setAmountsToExecute] = useState('')
  useEffect(() => {
    if (account) {
      if (curChain !== '' && curChain !== tokenChain) {
        const chainName = getChainName(tokenChain)
        setBtnName(`Switch to ${chainName}`)
      } else {
        setBtnName('Unstake')
      }
    }
  }, [account, curChain, tokenChain])

  useEffect(() => {
    if (connected) {
      setBtnName('Unstake')
    } else {
      setBtnName('Connect Wallet to Get Started')
    }
  }, [connected])

  const [startSpinner, setStartSpinner] = useState(false)

  const onClickUnStake = async () => {
    if (new BigNumber(totalStaked).isEqualTo(0)) {
      toast.error('Please stake first!')
      return
    }

    if (amountsToExecute === '') {
      setShowWarning(true)
      return
    }

    const amountsToExecuteInWei = amountsToExecute.map(amount => {
      if (isEmpty(amount)) {
        return null
      }

      if (multipleAssets) {
        return toWei(amount, token.decimals, 0)
      }
      return toWei(amount, isSpecialVault ? tokenDecimals : token.decimals)
    })

    if (new BigNumber(amountsToExecuteInWei[0]) === 0) {
      setShowWarning(true)
      return
    }

    const isAvailableUnstake = new BigNumber(amountsToExecuteInWei[0]).isLessThanOrEqualTo(
      totalStaked,
    )

    if (!isAvailableUnstake) {
      setShowWarning(true)
      return
    }

    setStartSpinner(true)
    setBtnName('Confirm Unstaking in Wallet')
    const shouldDoPartialUnstake = new BigNumber(amountsToExecuteInWei[0]).isLessThan(totalStaked)
    let bSuccessUnstake = false
    try {
      await handleExit(
        account,
        fAssetPool,
        shouldDoPartialUnstake,
        amountsToExecuteInWei[0],
        setPendingAction,
        async () => {
          await fetchUserPoolStats([fAssetPool], account, userStats)
          await getWalletBalances(walletBalancesToCheck, false, true)
          bSuccessUnstake = true
        },
      )
    } catch (err) {
      setUnstakeFailed(true)
      setBtnName('Unstake')
      return
    }
    setBtnName('Unstake')
    setStartSpinner(false)
    if (bSuccessUnstake) {
      setFinalStep(true)
    }
  }

  const onInputBalance = e => {
    setInputAmount(e.currentTarget.value)
    setAmountsToExecute([e.currentTarget.value])
  }

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  return (
    <BaseSection show={!finalStep}>
      <NewLabel
        size={isMobile ? '12px' : '16px'}
        height={isMobile ? '24px' : '28px'}
        weight="600"
        color="#101828"
        display="flex"
        justifyContent="space-between"
      >
        Unstake
        <ThemeMode mode={activeStake ? 'deposit' : 'withdraw'}>
          <div id="theme-switch">
            <div className="switch-track">
              <div className="switch-thumb" />
            </div>

            <input
              type="checkbox"
              checked={activeStake}
              onChange={switchMethod}
              aria-label="Switch between dark and light mode"
            />
          </div>
        </ThemeMode>
      </NewLabel>
      <DepoTitle>Unstake your f{tokenSymbol}.</DepoTitle>
      <AmountSection>
        <NewLabel
          size={isMobile ? '10px' : '14px'}
          height={isMobile ? '15px' : '20px'}
          weight="500"
          color="#344054"
          marginBottom="6px"
        >
          Amount to Unstake
        </NewLabel>
        <AmountInputSection>
          <TokenAmount type="number" value={inputAmount} onChange={onInputBalance} />
          <button
            className="max-btn"
            type="button"
            onClick={() => {
              if (account) {
                setInputAmount(Number(fromWei(totalStaked, fAssetPool.lpTokenData.decimals)))
                setAmountsToExecute([fromWei(totalStaked, fAssetPool.lpTokenData.decimals)])
              }
            }}
          >
            Max
          </button>
        </AmountInputSection>
      </AmountSection>
      <BalanceInfo
        onClick={() => {
          if (account) {
            setInputAmount(Number(fromWei(totalStaked, fAssetPool.lpTokenData.decimals)))
            setAmountsToExecute([fromWei(totalStaked, fAssetPool.lpTokenData.decimals)])
          }
        }}
      >
        Balance Available:
        <span>
          {!connected ? (
            0
          ) : totalStaked ? (
            fromWei(totalStaked, fAssetPool.lpTokenData.decimals, POOL_BALANCES_DECIMALS, true)
          ) : (
            <AnimatedDots />
          )}
        </span>
      </BalanceInfo>
      <InsufficientSection isShow={showWarning ? 'true' : 'false'}>
        <NewLabel display="flex" widthDiv="80%" items="center">
          <img className="info-icon" src={InfoIcon} alt="" />
          <NewLabel
            size={isMobile ? '10px' : '14px'}
            height={isMobile ? '15px' : '20px'}
            weight="600"
            color="#344054"
          >
            Insufficient f{tokenSymbol} balance
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

      <FTokenWrong isShow={unstakeFailed ? 'true' : 'false'}>
        <NewLabel marginRight="12px" display="flex">
          <div>
            <img src={AlertIcon} alt="" />
          </div>
          <NewLabel marginLeft="12px">
            <NewLabel
              color="#B54708"
              size={isMobile ? '12px' : '14px'}
              height={isMobile ? '17px' : '20px'}
              weight="600"
              marginBottom="4px"
            >
              Whoops, something went wrong.
            </NewLabel>
            <NewLabel
              color="#B54708"
              size={isMobile ? '12px' : '14px'}
              height={isMobile ? '17px' : '20px'}
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
              setUnstakeFailed(false)
            }}
          />
        </NewLabel>
      </FTokenWrong>

      <NewLabel marginTop={isMobile ? '19px' : '25px'}>
        <Button
          color="wido-deposit"
          width="100%"
          onClick={async () => {
            if (!connected) {
              connectAction()
              return
            }
            if (curChain !== tokenChain) {
              const chainHex = `0x${Number(tokenChain).toString(16)}`
              if (!isSpecialApp) {
                await setChain({ chainId: chainHex })
                setChainId(tokenChain)
              }
            } else {
              onClickUnStake()
            }
          }}
        >
          {btnName}
          {!connected ? <img src={WalletIcon} alt="" /> : <></>}
          {!startSpinner ? (
            <></>
          ) : (
            <>
              &nbsp;
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            </>
          )}
        </Button>
      </NewLabel>
    </BaseSection>
  )
}
export default UnstakeBase
