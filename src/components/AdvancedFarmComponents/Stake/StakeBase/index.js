import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import { useSetChain } from '@web3-onboard/react'
import { useMediaQuery } from 'react-responsive'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import InfoIcon from '../../../../assets/images/logos/beginners/info-circle.svg'
import CloseIcon from '../../../../assets/images/logos/beginners/close.svg'
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
  AmountInputSection,
  SwitchTabTag,
} from './style'
import { useThemeContext } from '../../../../providers/useThemeContext'
import { getChainName } from '../../../../utilities/parsers'

const StakeBase = ({
  setStakeStart,
  inputAmount,
  setInputAmount,
  token,
  switchMethod,
  tokenSymbol,
  lpTokenBalance,
  fAssetPool,
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
  const [btnName, setBtnName] = useState('Preview & Stake')
  const [showWarning, setShowWarning] = useState(false)
  const [warningContent, setWarningContent] = useState('')

  useEffect(() => {
    if (account) {
      if (curChain !== '' && curChain !== tokenChain) {
        const chainName = getChainName(tokenChain)
        setBtnName(`Change Network to ${chainName}`)
      } else {
        setBtnName('Preview & Stake')
      }
    } else {
      setBtnName('Connect Wallet to Get Started')
    }
  }, [account, curChain, tokenChain])

  const onClickStake = async () => {
    if (inputAmount === '' || inputAmount === 0 || inputAmount === '0') {
      setWarningContent('The amount to stake must be greater than 0.')
      setShowWarning(true)
      return
    }
    const stakeAmount = toWei(inputAmount, fAssetPool.lpTokenData.decimals)
    if (new BigNumber(stakeAmount.toString()).isGreaterThan(lpTokenBalance.toString())) {
      setWarningContent(`Insufficient f${tokenSymbol} balance`)
      setShowWarning(true)
      return
    }
    setShowWarning(false)
    setStakeStart(true)
  }

  const onInputBalance = e => {
    const inputValue = e.currentTarget.value.replace(/,/g, '.')
    setInputAmount(inputValue)
  }

  const mainTags = [
    { name: 'Stake', img: BsArrowDown },
    { name: 'Unstake', img: BsArrowUp },
  ]

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  return (
    <BaseSection>
      <NewLabel
        $bgcolor={darkMode ? '#373D51' : '#fff'}
        $size={isMobile ? '16px' : '16px'}
        $height={isMobile ? '24px' : '24px'}
        $weight="600"
        $fontcolor={fontColor1}
        $display="flex"
        $justifycontent="center"
        $padding={isMobile ? '4px 0px' : '4px 0px'}
        $marginbottom="13px"
        $border={`1.3px solid ${borderColorBox}`}
        $borderradius="8px"
      >
        {mainTags.map((tag, i) => (
          <SwitchTabTag
            key={i}
            onClick={() => {
              if (i === 1) {
                switchMethod()
              }
            }}
            $fontcolor={i === 0 ? fontColor4 : fontColor3}
            $bordercolor={i === 0 ? activeColor : ''}
            $backcolor={i === 0 ? activeColorNew : ''}
            $boxshadow={
              i === 0
                ? '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)'
                : ''
            }
          >
            <tag.img />
            <p>{tag.name}</p>
          </SwitchTabTag>
        ))}
      </NewLabel>
      <DepoTitle $fontcolor={fontColor}>Stake your fTokens to earn extra rewards.</DepoTitle>
      <AmountSection>
        <NewLabel
          $size={isMobile ? '14px' : '14px'}
          $height={isMobile ? '20px' : '20px'}
          $weight="500"
          $fontcolor={fontColor2}
          $marginbottom="6px"
        >
          Amount to Stake
        </NewLabel>
        <AmountInputSection $fontcolor5={fontColor5}>
          <TokenAmount
            type="number"
            value={inputAmount}
            onChange={onInputBalance}
            $bgcolor={bgColorNew}
            $fontcolor2={fontColor2}
            $bordercolor={borderColorBox}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0"
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
                      lpTokenBalance,
                      fAssetPool.lpTokenData.decimals,
                      fAssetPool.lpTokenData.decimals,
                      false,
                    ),
                  ).toString(),
                )
              }
            }}
          >
            Max
          </button>
        </AmountInputSection>
      </AmountSection>
      <BalanceInfo
        $fontcolor={fontColor}
        onClick={() => {
          if (account) {
            setInputAmount(
              new BigNumber(
                fromWei(
                  lpTokenBalance,
                  fAssetPool.lpTokenData.decimals,
                  fAssetPool.lpTokenData.decimals,
                  false,
                ),
              ).toString(),
            )
          }
        }}
      >
        Balance Available:
        <span>
          {!connected ? (
            0
          ) : lpTokenBalance ? (
            new BigNumber(
              fromWei(
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
        $isshow={showWarning ? 'true' : 'false'}
        $activecolor={activeColor}
        $bgcolormessage={bgColorMessage}
      >
        <NewLabel $display="flex" $widthdiv="80%" $items="start">
          <img className="info-icon" src={InfoIcon} alt="" />
          <NewLabel
            $size={isMobile ? '14px' : '14px'}
            $height={isMobile ? '20px' : '20px'}
            $weight="600"
            $fontcolor={fontColor2}
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

      <NewLabel $margintop={isMobile ? '10px' : '10px'}>
        <Button
          $fontcolor="wido-deposit"
          $width="100%"
          $btncolor={btnColor}
          $btnhovercolor={btnHoverColor}
          $btnactivecolor={btnActiveColor}
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
              onClickStake()
            }
          }}
        >
          {btnName}
        </Button>
      </NewLabel>
    </BaseSection>
  )
}
export default StakeBase
