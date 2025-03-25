import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import { useSetChain } from '@web3-onboard/react'
import { isEmpty } from 'lodash'
import { useMediaQuery } from 'react-responsive'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import InfoIcon from '../../../../assets/images/logos/beginners/info-circle.svg'
import CloseIcon from '../../../../assets/images/logos/beginners/close.svg'
import AlertIcon from '../../../../assets/images/logos/beginners/alert-triangle.svg'
import AlertCloseIcon from '../../../../assets/images/logos/beginners/alert-close.svg'
import AnimatedDots from '../../../AnimatedDots'
import { useWallet } from '../../../../providers/Wallet'
import { isSpecialApp } from '../../../../utilities/formats'
import { fromWei, toWei } from '../../../../services/web3'
import Button from '../../../Button'
import {
  BalanceInfo,
  BaseSection,
  DepoTitle,
  TokenAmount,
  NewLabel,
  AmountSection,
  // ThemeMode,
  InsufficientSection,
  CloseBtn,
  FTokenWrong,
  ImgBtn,
  AmountInputSection,
  SwitchTabTag,
} from './style'
import { useThemeContext } from '../../../../providers/useThemeContext'
import { getChainName } from '../../../../utilities/parsers'

const { tokens } = require('../../../../data')

const UnstakeBase = ({
  setUnstakeStart,
  finalStep,
  inputAmount,
  setInputAmount,
  token,
  switchMethod,
  tokenSymbol,
  totalStaked,
  fAssetPool,
  multipleAssets,
  amountsToExecute,
  setAmountsToExecute,
}) => {
  const {
    darkMode,
    bgColorNew,
    fontColor,
    fontColor1,
    fontColor2,
    fontColor3,
    fontColor4,
    fontColor5,
    activeColor,
    bgColorMessage,
    borderColorBox,
    activeColorNew,
    btnColor,
    btnHoverColor,
    btnActiveColor,
  } = useThemeContext()
  const { connected, connectAction, account, chainId, setChainId } = useWallet()

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
  const [btnName, setBtnName] = useState('Preview & Unstake')
  const [showWarning, setShowWarning] = useState(false)
  const [warningContent, setWarningContent] = useState('')
  const [unstakeFailed, setUnstakeFailed] = useState(false)

  const isSpecialVault = token.liquidityPoolVault || token.poolVault
  const tokenDecimals = token.decimals || tokens[tokenSymbol].decimals

  useEffect(() => {
    if (account) {
      if (curChain !== '' && curChain !== tokenChain) {
        const chainName = getChainName(tokenChain)
        setBtnName(`Change Network to ${chainName}`)
      } else {
        setBtnName('Preview & Unstake')
      }
    } else {
      setBtnName('Connect Wallet to Get Started')
    }
  }, [account, curChain, tokenChain])

  const onClickUnStake = async () => {
    if (new BigNumber(totalStaked.toString()).isEqualTo(0)) {
      setWarningContent('The amount to unstake must be greater than 0.')
      setShowWarning(true)
      return
    }

    if (inputAmount === '' || inputAmount === 0 || inputAmount === '0') {
      setWarningContent('The amount to unstake must be greater than 0.')
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

    if (new BigNumber(amountsToExecuteInWei[0].toString()) === 0) {
      setWarningContent('The amount to unstake must be greater than 0.')
      setShowWarning(true)
      return
    }

    const isAvailableUnstake = new BigNumber(
      amountsToExecuteInWei[0].toString(),
    ).isLessThanOrEqualTo(totalStaked.toString())

    if (!isAvailableUnstake) {
      setWarningContent(`Insufficient f${tokenSymbol} balance`)
      setShowWarning(true)
      return
    }

    setUnstakeStart(true)
  }

  const onInputBalance = e => {
    const inputValue = e.currentTarget.value.replace(/,/g, '.')
    setInputAmount(inputValue)
    setAmountsToExecute([inputValue])
  }

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const mainTags = [
    { name: 'Stake', img: BsArrowDown },
    { name: 'Unstake', img: BsArrowUp },
  ]

  return (
    <BaseSection show={!finalStep}>
      <NewLabel
        bg={darkMode ? '#373D51' : '#fff'}
        size={isMobile ? '16px' : '16px'}
        height={isMobile ? '28px' : '28px'}
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
      <DepoTitle fontColor={fontColor}>Unstake your fTokens.</DepoTitle>
      <AmountSection>
        <NewLabel
          size={isMobile ? '14px' : '14px'}
          height={isMobile ? '20px' : '20px'}
          weight="500"
          color={fontColor2}
          marginBottom="6px"
        >
          Amount to Unstake
        </NewLabel>
        <AmountInputSection fontColor5={fontColor5}>
          <TokenAmount
            type="number"
            value={inputAmount}
            onChange={onInputBalance}
            bgColor={bgColorNew}
            fontColor2={fontColor2}
            borderColor={borderColorBox}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <input type="hidden" value={Number(inputAmount)} />
          <button
            className="max-btn"
            type="button"
            onClick={() => {
              if (account) {
                setInputAmount(
                  new BigNumber(
                    fromWei(
                      totalStaked,
                      fAssetPool.lpTokenData.decimals,
                      fAssetPool.lpTokenData.decimals,
                      false,
                    ),
                  ).toString(),
                )
                setAmountsToExecute([
                  new BigNumber(
                    fromWei(
                      totalStaked,
                      fAssetPool.lpTokenData.decimals,
                      fAssetPool.lpTokenData.decimals,
                      false,
                    ),
                  ).toString(),
                ])
              }
            }}
          >
            Max
          </button>
        </AmountInputSection>
      </AmountSection>
      <BalanceInfo
        fontColor={fontColor}
        onClick={() => {
          if (account) {
            setInputAmount(
              new BigNumber(
                fromWei(
                  totalStaked,
                  fAssetPool.lpTokenData.decimals,
                  fAssetPool.lpTokenData.decimals,
                  false,
                ),
              ).toString(),
            )
            setAmountsToExecute([
              new BigNumber(
                fromWei(
                  totalStaked,
                  fAssetPool.lpTokenData.decimals,
                  fAssetPool.lpTokenData.decimals,
                  false,
                ),
              ).toString(),
            ])
          }
        }}
      >
        Balance Available:
        <span>
          {!connected ? (
            0
          ) : totalStaked ? (
            new BigNumber(
              fromWei(
                totalStaked,
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
        <NewLabel display="flex" widthDiv="80%" items="start">
          <img className="info-icon" src={InfoIcon} alt="" />
          <NewLabel
            size={isMobile ? '14px' : '14px'}
            height={isMobile ? '20px' : '20px'}
            weight="600"
            color={fontColor2}
          >
            {warningContent}
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
              setUnstakeFailed(false)
            }}
          />
        </NewLabel>
      </FTokenWrong>

      <NewLabel marginTop={isMobile ? '10px' : '10px'}>
        <Button
          color="wido-deposit"
          width="100%"
          btnColor={btnColor}
          btnHoverColor={btnHoverColor}
          btnActiveColor={btnActiveColor}
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
        </Button>
      </NewLabel>
    </BaseSection>
  )
}
export default UnstakeBase
