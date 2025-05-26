import styled from 'styled-components'
import { Modal } from 'react-bootstrap'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 20px 26px;
  border-radius: 8px;

  position: relative;
  transition: 0.25s;
  color: ${props => props.$fontcolor};

  @media screen and (max-width: 992px) {
    width: 100%;
    margin-bottom: 15px;
  }
`

const Header = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`

const Title = styled.h5`
  font-size: 16px;
  line-height: 21px;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;

  img {
    margin-right: 5px;
  }
`

const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1250px) {
    display: block;
  }
`

const MoreBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 0.8em 0.5em;
  margin: 1em;
  background: rgba(223, 0, 0, 0.06);
  border-radius: 1em;
  height: 15px;
  color: #df0000;
  border: none;

  img {
    margin-right: 0.25em;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: #fff;

  button {
    padding: 0.1em 0.3em;
    border-radius: 0.4em;
    margin-left: 0.25em;
    font-weight: 400;
  }
`

const ChartDiv = styled.div`
  min-height: 90%;
  margin-bottom: 10px;
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: 0;

  @media screen and (max-width: 1250px) {
    margin-top: 15px;
  }
`

const PriceShow = styled.div`
  display: flex;

  h2 {
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    padding: 0;
    margin: 0 10px 0 0;
  }

  @media screen and (max-width: 992px) {
    margin-bottom: 1rem;
  }
`

const BlurBack = styled.div`
  position: absolute;
  background: #fafafa;
  filter: blur(10px);
  height: calc(100% - 20px);
  width: calc(100% - 52px);
`

const ConnectButton = styled.button`
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 70px);
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  width: 30%;
  min-width: 170px;
  text-align: center;
  background: white;
  border-radius: 8px;
  border: 0;
  color: #344054;
  padding: 12px 21px;
  cursor: pointer;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);

  @media screen and (max-width: 992px) {
    display: flex;
    width: 170px;
  }
`

const FlexDiv = styled.div`
  display: flex;
  text-align: center;
  label {
    padding: 0.4rem;
    display: flex;
    justify-content: center;
  }

  input[type='checkbox'] {
    accent-color: #188e54;
    width: 20px;
    height: 20px;
    padding: 4px;
    border-radius: 6px;
  }
`

const Address = styled.span`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
`

const ConnectWalletModal = styled(Modal)`
  border-width: 0px;
  margin: auto;
  .modal-dialog {
    .modal-content {
      background: #188e54 !important;
      border: 0px;
      border-radius: 20px;

      .modal-header {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        img {
          z-index: 100;
        }
      }

      .modal-body {
        background: #fff;
        border-radius: 0 0 20px 20px;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .modal-dialog {
      position: absolute;
      bottom: 0;

      .modal-content {
        border-radius: 20px 20px 0 0;

        .modal-body {
          border-radius: 0;
        }
      }
    }
  }
`

const ModalHeader = styled(Modal.Header)`
  background: #188e54;
  height: 100px;
  border-radius: 20px 20px 0 0;
  position: relative;
`

const HeaderImg = styled.img`
  position: absolute;
  top: calc(100% - 51px);
  left: calc(50% - 51px);
`

const ModalTitle = styled.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  color: #000000;
  margin-top: 60px;
`

const WalletList = styled.div`
  display: flex;
  margin: 0.5rem 1rem;
  background: #f6f6f6;
  border-radius: 20px;
  padding: 19px;
  cursor: pointer;

  &:hover {
    background: white;
  }

  img {
    margin-right: 2rem;
  }

  div {
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    margin: auto 0;
  }
`

const TooltipContent = styled.div`
  margin-left: 10px;
  align-self: center;
`

const CurDate = styled.div`
  font-size: 13px;
  line-height: 16px;
  font-weight: 700;

  @media screen and (max-width: 992px) {
    margin-top: 0.5rem;
  }
`

export {
  Container,
  Title,
  Header,
  Total,
  MoreBtn,
  ButtonGroup,
  ChartDiv,
  FilterGroup,
  PriceShow,
  BlurBack,
  ConnectButton,
  FlexDiv,
  Address,
  ConnectWalletModal,
  ModalHeader,
  HeaderImg,
  ModalTitle,
  WalletList,
  TooltipContent,
  CurDate,
}
