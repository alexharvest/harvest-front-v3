import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useSetChain } from '@web3-onboard/react'
import { Spinner } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import Diamond from '../../../assets/images/logos/sidebar/diamond.svg'
import WalletIcon from '../../../assets/images/logos/beginners/wallet-in-button.svg'
import CloseIcon from '../../../assets/images/logos/beginners/close.svg'
import AlertIcon from '../../../assets/images/logos/beginners/alert-triangle.svg'
import AlertCloseIcon from '../../../assets/images/logos/beginners/alert-close.svg'
import ProgressOne from '../../../assets/images/logos/advancedfarm/unstake-step1.png'
import ProgressTwo from '../../../assets/images/logos/advancedfarm/unstake-step2.png'
import ProgressThree from '../../../assets/images/logos/advancedfarm/unstake-step3.png'
import AnimatedDots from '../../AnimatedDots'
import { useWallet } from '../../../providers/Wallet'
import { useActions } from '../../../providers/Actions'
import { isSpecialApp } from '../../../utilities/formats'
import { useThemeContext } from '../../../providers/useThemeContext'
import { toWei } from '../../../services/web3'
import Button from '../../Button'
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

const UnsubscribeModal = ({ inputAmount, setInputAmount, token, modalShow, setModalShow }) => {
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
  const [unsubscribeFailed, setUnsubscribeFailed] = useState(false)
  const [progressStep, setProgressStep] = useState(0)

  const { handleIPORWithdraw } = useActions()

  const [startSpinner, setStartSpinner] = useState(false)

  const unsubscribeAmount = toWei(inputAmount, token.decimals)

  const onClickUnsubscrbie = async () => {
    if (progressStep === 0) {
      setProgressStep(1)
      setStartSpinner(true)
      setBtnName('Pending Confirmation in Wallet')
      let bSuccessUnsubscribe = false
      try {
        await handleIPORWithdraw(account, token, unsubscribeAmount, async () => {
          await getWalletBalances([token.id], false, true)
          bSuccessUnsubscribe = true
        })
      } catch (err) {
        setUnsubscribeFailed(true)
        setStartSpinner(false)
        setBtnName('Confirm Transaction')
        return
      }
      if (bSuccessUnsubscribe) {
        setStartSpinner(false)
        setUnsubscribeFailed(false)
        setProgressStep(2)
        setBtnName('Success! Close this window.')
      } else {
        setStartSpinner(false)
        setUnsubscribeFailed(true)
        setProgressStep(0)
        setBtnName('Confirm Transaction')
      }
    } else if (progressStep === 2) {
      setProgressStep(0)
      setBtnName('Confirm Transaction')
      setUnsubscribeFailed(false)
      setModalShow(false)
      setInputAmount('0')
      window.location.reload()
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  return (
    <Modal
      show={modalShow}
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
                <img src={Diamond} alt="diamond" />
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
                Unsubscribe
              </NewLabel>
              <NewLabel
                color={fontColor1}
                size={isMobile ? '14px' : '14px'}
                height={isMobile ? '20px' : '20px'}
                weight="400"
                marginBottom="5px"
              >
                {`You are now unsubscribing from the ${token?.tokenNames[0]} Autopilot`}
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
                setUnsubscribeFailed(false)
                setProgressStep(0)
                setStartSpinner(false)
                setModalShow(false)
                setBtnName('Confirm Transaction')
                if (progressStep === 2) {
                  window.location.reload()
                }
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
              <NewLabel weight="500">
                {progressStep === 4 ? 'Unsubscribed' : 'Unsubscribing'}
              </NewLabel>
              <NewLabel display="flex" flexFlow="column" weight="600" align="right">
                <>{inputAmount !== '' ? inputAmount : <AnimatedDots />}</>
                <span>
                  {token.tokenNames.length > 0 ? `${token?.tokenNames[0]}` : <AnimatedDots />}
                </span>
              </NewLabel>
            </NewLabel>
          </NewLabel>
          <FTokenWrong isShow={unsubscribeFailed ? 'true' : 'false'}>
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
                  setUnsubscribeFailed(false)
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
                  onClickUnsubscrbie()
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
export default UnsubscribeModal
