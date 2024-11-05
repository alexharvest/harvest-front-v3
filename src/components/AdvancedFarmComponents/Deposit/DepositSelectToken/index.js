import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Modal from 'react-bootstrap/Modal'
import { BsArrowDown } from 'react-icons/bs'
import { useWallet } from '../../../../providers/Wallet'
import { useThemeContext } from '../../../../providers/useThemeContext'
import {
  SelectTokenWido,
  // CloseBtn,
  FilterInput,
  NewLabel,
  Search,
  NotConnectedWallet,
  ImgBtn,
  FTokenInfo,
  IconCard,
} from './style'
import SelectTokenList from '../SelectTokenList'
import CloseIcon from '../../../../assets/images/logos/beginners/close.svg'
import SearchIcon from '../../../../assets/images/logos/beginners/search.svg'
import InfoIcon from '../../../../assets/images/logos/beginners/info-circle.svg'

const DepositSelectToken = ({
  selectToken,
  setSelectToken,
  setPickedToken,
  setBalance,
  // supTokenList,
  soonToSupList,
  supTokenNoBalanceList,
  balanceList,
  defaultToken,
  supportedVault,
  hasPortalsError,
  setFromTokenList,
}) => {
  const {
    darkMode,
    bgColor,
    fontColor,
    fontColor1,
    fontColor2,
    modalInputColor,
    inputBorderColor,
    inputFontColor,
    borderColor,
  } = useThemeContext()

  const { connected } = useWallet()
  const [filterWord, setFilterWord] = useState('')
  const [showDesc, setShowDesc] = useState(true)

  const onFilter = async e => {
    setFilterWord(e.target.value)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  return (
    <Modal
      show={selectToken}
      // onHide={onClose}
      dialogClassName="modal-notification"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="token-select-modal-header">
        <FTokenInfo>
          <>
            <NewLabel margin="auto 16px auto 0px">
              <IconCard>
                <BsArrowDown />
              </IconCard>
            </NewLabel>
            <NewLabel align="left" marginRight="12px">
              <NewLabel
                color="#15B088"
                size={isMobile ? '18px' : '18px'}
                height={isMobile ? '28px' : '28px'}
                weight="600"
                marginBottom="4px"
              >
                Select Token
              </NewLabel>
              <NewLabel
                color={fontColor1}
                size={isMobile ? '14px' : '14px'}
                height={isMobile ? '20px' : '20px'}
                weight="400"
                marginBottom="5px"
              >
                Pick a token from your wallet to convert into fToken
              </NewLabel>
            </NewLabel>
          </>
          <NewLabel>
            <NewLabel
              display="flex"
              marginBottom={isMobile ? '18px' : '18px'}
              width="fit-content"
              cursorType="pointer"
              weight="600"
              size={isMobile ? '14px' : '14px'}
              height={isMobile ? '20px ' : '20px'}
              darkMode={darkMode}
              color={inputFontColor}
              align="center"
              onClick={() => {
                setSelectToken(false)
              }}
            >
              <ImgBtn src={CloseIcon} alt="" />
            </NewLabel>
          </NewLabel>
        </FTokenInfo>
        <NewLabel darkMode={darkMode} width="100%" marginTop="18px" position="relative">
          <Search src={SearchIcon} />
          <FilterInput
            value={filterWord}
            placeholder="Find tokens by name or address"
            onChange={onFilter}
            inputBorderColor={inputBorderColor}
            modalInputColor={modalInputColor}
            inputFontColor={inputFontColor}
          />
        </NewLabel>
      </Modal.Header>
      <Modal.Body className="token-select-modal-body">
        <SelectTokenWido>
          <NewLabel heightDiv="100%" divScroll="scroll" padding={connected ? '0px' : '25px'}>
            {connected ? (
              <SelectTokenList
                balanceList={balanceList}
                supTokenNoBalanceList={supTokenNoBalanceList}
                defaultToken={defaultToken}
                soonToSupList={soonToSupList}
                setPickedToken={setPickedToken}
                setBalance={setBalance}
                setSelectToken={setSelectToken}
                filterWord={filterWord}
                supportedVault={supportedVault}
                hasPortalsError={hasPortalsError}
                setFromTokenList={setFromTokenList}
              />
            ) : (
              <NotConnectedWallet
                isShow={showDesc ? 'true' : 'false'}
                bgColor={bgColor}
                borderColor={borderColor}
              >
                <NewLabel darkMode={darkMode} marginRight="12px" display="flex">
                  <div>
                    <img width={isMobile ? '21px' : '21px'} src={InfoIcon} alt="" />
                  </div>
                  <NewLabel marginLeft={isMobile ? '12px' : '12px'}>
                    <NewLabel
                      color={fontColor2}
                      size={isMobile ? '14px' : '14px'}
                      height={isMobile ? '20px' : '20px'}
                      weight="600"
                      marginBottom="4px"
                    >
                      Wallet not connected.
                    </NewLabel>
                    <NewLabel
                      color={fontColor}
                      size={isMobile ? '14px' : '14px'}
                      height={isMobile ? '20px' : '20px'}
                      weight="400"
                    >
                      Please connect wallet to see the list of available tokens to convert.
                    </NewLabel>
                  </NewLabel>
                </NewLabel>
                <NewLabel darkMode={darkMode}>
                  <ImgBtn
                    src={CloseIcon}
                    alt=""
                    onClick={() => {
                      setShowDesc(false)
                    }}
                  />
                </NewLabel>
              </NotConnectedWallet>
            )}
          </NewLabel>
        </SelectTokenWido>
      </Modal.Body>
    </Modal>
  )
}
export default DepositSelectToken
