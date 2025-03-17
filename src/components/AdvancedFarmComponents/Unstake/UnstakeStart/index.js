import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useSetChain } from '@web3-onboard/react'
import { Spinner } from 'react-bootstrap'
import { isEmpty } from 'lodash'
import { BiGift } from 'react-icons/bi'
import { useMediaQuery } from 'react-responsive'
import WalletIcon from '../../../../assets/images/logos/beginners/wallet-in-button.svg'
import CloseIcon from '../../../../assets/images/logos/beginners/close.svg'
import AlertIcon from '../../../../assets/images/logos/beginners/alert-triangle.svg'
import AlertCloseIcon from '../../../../assets/images/logos/beginners/alert-close.svg'
import ProgressOne from '../../../../assets/images/logos/advancedfarm/unstake-step1.png'
import ProgressTwo from '../../../../assets/images/logos/advancedfarm/unstake-step2.png'
import ProgressThree from '../../../../assets/images/logos/advancedfarm/unstake-step3.png'
import AnimatedDots from '../../../AnimatedDots'
import { useWallet } from '../../../../providers/Wallet'
import { usePools } from '../../../../providers/Pools'
import { useActions } from '../../../../providers/Actions'
import { isSpecialApp } from '../../../../utilities/formats'
import { toWei } from '../../../../services/web3'
import Button from '../../../Button'
import {
  FTokenInfo,
  FTokenDiv,
  IconCard,
  BaseSection,
  NewLabel,
  FTokenWrong,
  ImgBtn,
  ProgressLabel,
  ProgressText,
} from './style'
import { useThemeContext } from '../../../../providers/useThemeContext'

const { tokens } = require('../../../../data')

const UnstakeStart = ({
  unstakeStart,
  setUnstakeStart,
  inputAmount,
  setInputAmount,
  token,
  tokenSymbol,
  totalStaked,
  fAssetPool,
  setPendingAction,
  multipleAssets,
  amountsToExecute,
}) => {
  const { fontColor1, fontColor2, btnColor, btnHoverColor, btnActiveColor } = useThemeContext()
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
  const [btnName, setBtnName] = useState('Confirm Transaction')
  const [unstakeFailed, setUnstakeFailed] = useState(false)
  const [progressStep, setProgressStep] = useState(0)

  const { handleExit } = useActions()
  const { userStats, fetchUserPoolStats } = usePools()

  const isSpecialVault = token.liquidityPoolVault || token.poolVault
  const tokenDecimals = token.decimals || tokens[tokenSymbol].decimals
  const walletBalancesToCheck = multipleAssets || [tokenSymbol]

  const [startSpinner, setStartSpinner] = useState(false)

  const onClickUnStake = async () => {
    const amountsToExecuteInWei = amountsToExecute.map(amount => {
      if (isEmpty(amount)) {
        return null
      }

      if (multipleAssets) {
        return toWei(amount, token.decimals, 0)
      }
      return toWei(amount, isSpecialVault ? tokenDecimals : token.decimals)
    })
    const shouldDoPartialUnstake = new BigNumber(amountsToExecuteInWei[0].toString()).isLessThan(
      totalStaked.toString(),
    )

    if (progressStep === 0) {
      setProgressStep(1)
      setStartSpinner(true)
      setBtnName('Pending Confirmation in Wallet')
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
        setBtnName('Confirm Transaction')
        return
      }
      if (bSuccessUnstake) {
        setStartSpinner(false)
        setUnstakeFailed(false)
        setProgressStep(2)
        setBtnName('Success! Close this window.')
      } else {
        setStartSpinner(false)
        setUnstakeFailed(true)
        setProgressStep(0)
        setBtnName('Confirm Transaction')
      }
    } else if (progressStep === 2) {
      setProgressStep(0)
      setBtnName('Confirm Transaction')
      setUnstakeFailed(false)
      setUnstakeStart(false)
      setInputAmount('0')
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  return (
    <Modal
      show={unstakeStart}
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
                <BiGift />
              </IconCard>
            </NewLabel>
            <NewLabel align="left" marginRight="12px">
              <NewLabel
                color="#5dcf46"
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
                Unstake your fTokens
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
                setUnstakeStart(false)
                setUnstakeFailed(false)
                setProgressStep(0)
                setStartSpinner(false)
                setBtnName('Approve Token')
              }}
            >
              <ImgBtn src={CloseIcon} alt="" />
            </NewLabel>
          </NewLabel>
        </FTokenInfo>
      </Modal.Header>
      <Modal.Body className="deposit-modal-body">
        <BaseSection>
          <NewLabel
            size={isMobile ? '14px' : '14px'}
            height={isMobile ? '24px' : '24px'}
            padding="15px 24px 10px"
            color={fontColor2}
          >
            <NewLabel
              display="flex"
              justifyContent="space-between"
              padding={isMobile ? '10px 0' : '10px 0'}
            >
              <NewLabel weight="500">{progressStep === 4 ? 'Unstaked' : 'Unstaking'}</NewLabel>
              <NewLabel display="flex" flexFlow="column" weight="600" align="right">
                <>{inputAmount !== '' ? inputAmount : <AnimatedDots />}</>
                <span>{tokenSymbol !== '' ? `f${tokenSymbol}` : <AnimatedDots />}</span>
              </NewLabel>
            </NewLabel>
          </NewLabel>
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
          <NewLabel>
            <img
              className="progressbar-img"
              src={
                progressStep === 0 ? ProgressOne : progressStep === 1 ? ProgressTwo : ProgressThree
              }
              alt="progress bar"
            />
          </NewLabel>
          <ProgressLabel fontColor2={fontColor2}>
            <ProgressText width="50%" padding="0px 0px 0px 80px">
              Confirm
              <br />
              Transaction
            </ProgressText>
            <ProgressText width="50%" padding="0px 80px 0px 0px">
              Transaction
              <br />
              Successful
            </ProgressText>
          </ProgressLabel>
          <NewLabel padding={isMobile ? '24px' : '24px'}>
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
              {!connected ? <img src={WalletIcon} alt="" /> : <></>}
              {!startSpinner ? (
                <></>
              ) : (
                <>
                  &nbsp;
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </>
              )}
            </Button>
          </NewLabel>
        </BaseSection>
      </Modal.Body>
    </Modal>
  )
}
export default UnstakeStart
