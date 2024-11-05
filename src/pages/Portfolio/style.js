import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'
import UsdIcon from '../../assets/images/ui/usd-port.svg'
import TokensIcon from '../../assets/images/ui/tokens-port.svg'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: ${props => props.fontColor};

  background: ${props => props.bgColor};
  transition: 0.25s;
  position: relative;
  margin-left: 280px;

  @media screen and (min-width: 1920px) {
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding-bottom: 100px;
  }
`

const Inner = styled.div`
  padding: 50px 75px 75px 75px;
  width: 100%;

  @media screen and (min-width: 1921px) {
    width: 1450px;
  }

  @media screen and (max-width: 1480px) {
    width: 100%;
    padding: 50px 30px;
  }

  @media screen and (max-width: 992px) {
    padding: 0px 0px 25px 0px;
    background: ${props => (props.bgColor ? props.bgColor : '')};
  }
`

const SubPart = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 30px;
  border-top: 1px solid #ced3e6;

  @media screen and (max-width: 992px) {
    flex-wrap: wrap;
    gap: 0px;
    margin: 0px 25px 25px 25px;
    border: none;
  }
`

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;

  @media screen and (max-width: 992px) {
    padding: ${props => (props.padding ? props.padding : '')};
    // background-image: ${props => (props.backImg ? `url(${props.backImg})` : '')};
    height: ${props => (props.height ? props.height : '')};
    background: linear-gradient(to right, #5b86e5, #36d1dc);
  }
`

const HeaderTitle = styled.div`
  margin: auto 0px;

  .title {
    color: ${props => props.fontColor1};
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
  }
  .desc {
    color: ${props => props.fontColor};
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
  }
  @media screen and (max-width: 992px) {
    color: #fff;
    .title {
      font-size: 16px;
      color: #fff;
    }
    .desc {
      color: #fff;
    }
  }
`

const HeaderButton = styled.div`
  margin: auto 0px;
  gap: 15px;
  display: ${props => (props.display ? props.display : 'flex')};

  @media screen and (max-width: 992px) {
    flex-direction: column-reverse;
    gap: 9px;
  }
`

const FarmTitle = styled.span`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.borderColor};

  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  z-index: 3;
  padding: 27px 20px;
`

const TransactionDetails = styled.div`
  width: 100%;
  border-radius: 15px;
  transition: 0.25s;
  margin-top: 20px;

  @media screen and (max-width: 992px) {
    margin-top: 24px;
  }
`

const MyFarm = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 23px;
  display: flex;

  color: ${props => props.fontColor};
  align-self: center;
  align-items: center;

  @media screen and (max-width: 992px) {
    font-size: 14px;
    line-height: 18px;
  }
`

const FarmPic = styled.img`
  position: absolute;
  right: 0;
  top: 0;
`

const EmptyPanel = styled.div`
  height: ${props => props.height};
  border: 1px solid ${props => props.borderColor};
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  @media screen and (max-width: 992px) {
    padding: 0px;
    border: none;
  }
`

const EmptyImg = styled.img`
  margin: auto;
`

const EmptyInfo = styled.div`
  ${props =>
    props.weight
      ? `
    font-weight: ${props.weight};
  `
      : ''}
  ${props =>
    props.size
      ? `
    font-size: ${props.size}px;
  `
      : ''}
  ${props =>
    props.lineHeight
      ? `
    line-height: ${props.lineHeight}px;
  `
      : ''}
  ${props =>
    props.height
      ? `
    height: ${props.height};
  `
      : ''}
  ${props =>
    props.color
      ? `
    color: ${props.color};
  `
      : ''}
  ${props =>
    props.marginTop
      ? `
    margin-top: ${props.marginTop};
  `
      : ''}
  ${props =>
    props.flexFlow
      ? `
    flex-flow: ${props.flexFlow};
  `
      : ''}
  ${props =>
    props.gap
      ? `
    gap: ${props.gap};
  `
      : 'gap: 23px;'}

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: center;
    flex-flow: column;
    font-size: 10px;
    line-height: 18px;
  }
`

const ConnectButtonStyle = styled.button`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  margin: 15px auto;
  width: 250px;
  background: none;
  border-radius: 8px;
  border: 2px solid #6988ff;
  color: #6988ff;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background: ${props => props.hoverColor};
  }

  ${props =>
    props.connected
      ? `
      padding: 7px 45px 7px 11px;
      filter: drop-shadow(0px 4px 52px rgba(0, 0, 0, 0.25));

      &:hover {
        background: #E6F8EB;
      }
    `
      : `
      padding: 15px 0px 15px 0px;
    `}

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;

    ${props =>
      props.connected
        ? `
      background: none;
      color: ${props.fontcolor};
      font-size: 11px;
      padding: 2px 16px 2px 7px;
      border: 1px solid ${props.bordercolor};
      `
        : `
      padding: 10px 11px;
      font-size: 13px;
      `}
  }
`

const ExploreButtonStyle = styled.button`
  font-size: 15px;
  line-height: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  margin: 15px auto;
  padding: 12px 0px 12px 0px;
  width: 250px;
  background: #6988ff;
  border-radius: 8px;
  border: none;
  color: white;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  gap: 8px;
  transition: 0.5s;

  &:hover {
    background: #7692fb;
  }

  img.explore-farms {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(352deg) brightness(101%) contrast(104%);
  }

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 11px;
    font-size: 13px;
  }
`

const ThemeMode = styled.div`
  display: flex;

  #theme-switch {
    position: relative;
    width: fit-content;
    height: fit-content;
    touch-action: pan-x;
    user-select: none;

    input {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
    }

    .switch-track {
      background: ${props => props.backColor};
      border: 1px solid ${props => props.borderColor};
      height: 24px;
      width: 50px;
      border-radius: 30px;
      transition: all 0.2s ease 0s;
    }
    .switch-thumb {
      background: url(${props => (props.mode === 'usd' ? UsdIcon : TokensIcon)});
      background-size: cover;
      height: 20px;
      left: 2px;
      position: absolute;
      top: 2px;
      width: 20px;
      border-radius: 50%;
      transition: all 0.25s ease 0s;
    }

    &:hover .switch-thumb {
      box-shadow: 0 0 2px 3px #7f56d9;
    }
  }

  ${props =>
    props.mode === 'token'
      ? `
      #theme-switch {
        .switch-check {
          opacity: 1;
        }
        .switch-x {
          opacity: 0;
        }
        .switch-thumb {
          left: 27px;
        }
      }
    `
      : `
      
    `}
`

const Div = styled.div`
  width: 32%;

  display: ${props => (props.mobileView ? 'none' : 'block')};

  @media screen and (max-width: 992px) {
    width: 100%;
  }
`

const Counter = styled.div`
  color: #344054;
  background: #f2c94c;
  width: 20px;
  height: 20px;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`

const Header = styled.div`
  width: 100%;
  padding: 12px 24px;
  background: ${props => props.backColor};
  display: flex;
  border: 1px solid ${props => props.borderColor};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  @media screen and (max-width: 992px) {
    display: none;
  }
`

const Column = styled.div`
  width: ${props => props.width};
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  justify-content: start;
  color: ${props => props.color};
  transition: 0.5s;

  &:hover {
    color: #44699e;
  }
`

const Status = styled.div`
  ${props =>
    props.status === 'Active'
      ? `
        background: #ECFDF3;
        color: #027A48;
      `
      : `
        background: #FFE8C8;
        color: #F2994A;
        img {
          filter: invert(60%) sepia(97%) saturate(5817%) hue-rotate(15deg) brightness(87%) contrast(86%);
        }
  `};

  padding: 2px 7px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  width: fit-content;
  border-radius: 13px;
  align-items: center;

  img {
    margin-right: 5px;
  }

  @media screen and (max-width: 992px) {
    img {
      margin-right: 0;
    }
  }
`

const Col = styled.div`
  display: flex;
  cursor: pointer;
  width: fit-content;
  @media screen and (max-width: 1200px) {
    flex-flow: column;
  }

  img.sortIcon {
    width: 8.8px;
    height: 10.5px;
    margin: auto 0px auto 5px;
    @media screen and (max-width: 1200px) {
      margin: auto;
    }
  }

  img.info {
    margin-right: 3px;
    margin-left: 0px;
  }

  #tooltip-balance {
    max-width: 300px;
  }
`

const TableContent = styled.div`
  ${props =>
    props.count === 0
      ? `
    margin-bottom: 10px;
  `
      : ``}
  @media screen and (max-width: 992px) {
    // overflow-x: scroll;
    ${props =>
      props.count === 0
        ? `
        border-radius: unset;
        border: none;
    `
        : ``}
  }
`

const TableWrap = styled.div`
  display: flex;
  gap: 35px;

  .table-title {
    color: ${props => props.fontColor1};
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;

    @media screen and (max-width: 992px) {
      display: none;
    }
  }

  @media screen and (max-width: 1480px) {
    gap: 15px;
  }

  @media screen and (max-width: 1320px) {
    flex-direction: column;
    gap: 50px;
  }

  @media screen and (max-width: 992px) {
    flex-direction: column;
    gap: 0px;
  }
`

const SubBtnWrap = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: end;
  padding-right: 15px;
`

const MobileSwitch = styled.div`
  display: flex;
  padding: 4px;
  margin: 0px 10px;
  background: ${props => (props.darkMode ? '#373d51' : '#6988FF33')};
  border-radius: 8px;
`

const SwitchBtn = styled.div`
  width: 50%;
  padding: 8px 12px;
  border-radius: 6px;
  text-align: center;
  background: ${props => props.backColor};
  box-shadow: ${props => props.boxShadow};
  color: ${props => props.color};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin: auto;
`

const PositionTable = styled.div`
  width: 70%;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    display: ${props => props.display};
  }
`

const YieldTable = styled.div`
  width: 30%;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    display: ${props => props.display};
  }
`

const ContentBox = styled.div`
  border: 1px solid ${props => props.borderColor};
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  div.position-row:last-child {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  @media screen and (max-width: 992px) {
    border: none;
  }
`

const CheckBoxDiv = styled.div`
  cursor: pointer;
  margin-top: 25px;
  margin-right: 25px;
  display: inline-block;
  position: relative;

  svg {
    position: absolute;
    top: 4px;
  }

  div {
    padding-left: 23px;
  }

  @media screen and (max-width: 992px) {
    margin: unset;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    margin: auto 0px;
  }
`

const SwitchView = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px;
  gap: 8px;
  width: fit-content;
  height: 40px;
  align-items: center;
  color: ${props => props.color};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  position: relative;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  background: ${props => props.backColor};
  transition: 0.5s;

  :hover {
    cursor: pointer;
    background: ${props => props.hovercolor};
  }

  img {
    width: 20px;
    height: 20px;
    filter: ${props =>
      props.darkMode
        ? 'invert(100%) sepia(100%) saturate(0%) hue-rotate(352deg) brightness(101%) contrast(104%)'
        : 'invert(48%) sepia(4%) saturate(2341%) hue-rotate(183deg) brightness(87%) contrast(80%)'};
  }

  @media screen and (max-width: 992px) {
    height: unset;
    padding: 10px 16px;
  }
`

const BackArrow = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 10px;

  :hover {
    cursor: pointer;
  }
`

const CurrencySelect = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  transition: 0.5s;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  color: ${props => props.fontcolor2} !important;

  display: flex;
  align-items: center;

  img.logo {
    margin-right: 7.5px;
  }

  img.logo-dark {
    margin-right: 7.5px;
  }

  span {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 4px;
  }

  @media screen and (max-width: 992px) {
    height: unset;
    border-radius: 8px;
    line-height: 20px;
    padding: 9px 10px;
    gap: 0px;

    img {
      width: 17.6px;
      height: 17.6px;
    }
  }
`

const CurrencyDropDown = styled(Dropdown.Toggle)`
  background: ${props => props.bgcolor} !important;
  border: none !important;
  border-radius: 8px !important;
  color: ${props => props.fontcolor2} !important;
  align-items: center;
  width: 100%;
  display: flex !important;
  justify-content: space-between;
  text-align: left;
  position: relative;
  margin: 0px 0px;

  &:after {
    display: none !important;
  }

  &:hover {
    background: ${props => props.hovercolor} !important;
    color: black;
    font-weight: 500;
  }

  &:active {
    background: green;
    color: black;
  }

  .chain-name {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    margin-left: 5px;
  }

  img.narrow {
    position: absolute;
    right: 15px;
    top: 15px;
  }
`

const CurrencyDropDownMenu = styled(Dropdown.Menu)`
  background-color: ${props => props.backcolor} !important;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px !important;
  padding: 0;
  min-width: 6rem;
  width: 100% !important;
  z-index: 120;
  top: 5px !important;

  &:focus {
    box-shadow: none;
  }

  @media screen and (max-width: 992px) {
    min-width: unset;
    transform: translate3d(0px, -215px, 0px) !important;
  }
`

const CurrencyDropDownItem = styled(Dropdown.Item)`
  text-align: left;
  display: flex !important;
  justify-content: start;
  align-items: center;
  font-size: 14px;
  padding: 10px 5px;
  ${props =>
    props.bordercolor
      ? `
    border-bottom: 0.5px solid ${props.bordercolor} !important;
  `
      : `
  `}
  width: auto !important;
  color: ${props => props.fontcolor} !important;

  :first-child {
    border-radius: 8px 8px 0px 0px;
  }

  :last-child {
    border-radius: 0px 0px 8px 8px;
  }

  &:hover {
    background: ${props => props.hovercolor} !important;

    div {
      color: #ff9400;
    }
  }

  img {
    margin-right: 15px;
    margin-left: 10px;
  }

  img.logo {
    margin-right: 7.5px;
  }

  img.logo-dark {
    margin-right: 7.5px;
  }

  div {
    align-self: center;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
  }

  svg.check-icon {
    margin-left: 10px;
    color: #6988ff;
  }

  @media screen and (max-width: 992px) {
    line-height: 20px;
    padding: 10px 16px;
    gap: 5px;

    img {
      margin-left: 0px;
    }
  }
`

const MobileHeader = styled.div`
  width: 100%;
`
const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  background: ${props => (props.bgColor ? props.bgColor : '')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '')};
  padding: ${props => (props.padding ? props.padding : '')};
`
const Address = styled.div`
  margin-left: 5px;
  font-weight: 500;
  font-size: 11px;
  line-height: 18px;
  color: #344054;
`
const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LifetimeValue = styled.div`
  text-align: center;
  margin-top: 30px;
  font-size: ${props => (props.isLoading && props.connected ? '18px' : '45px')};
  margin-bottom: ${props => (props.isLoading && props.connected ? '15px' : '0px')};
  color: #fff;
  font-weight: 700;
`
const LifetimeSub = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  svg.question {
    font-size: 16px;
    cursor: pointer;
    margin: auto 0px auto 5px;
  }

  .mobile-top-tooltip {
    width: 300px;
    background: #101828;
    color: #fff;
  }

  .mobile-top-tooltip:before,
  .mobile-top-tooltip:after {
    display: flex;
    border-top-color: #101828 !important;
  }
`

const NewLabel = styled.div`
  font-weight: ${props => props.weight || '400'};
  font-size: ${props => props.size || '20px'};
  line-height: ${props => props.height || '0px'};
  ${props =>
    props.borderBottom
      ? `
    border-bottom: ${props.borderBottom};
  `
      : ''}

  ${props =>
    props.color
      ? `
    color: ${props.color};
  `
      : ''}
  ${props =>
    props.position
      ? `
    position: ${props.position};
  `
      : ''}
  ${props =>
    props.align
      ? `
    text-align: ${props.align};
  `
      : ''}
  ${props =>
    props.justifyContent
      ? `
    justify-content: ${props.justifyContent};
  `
      : ''}
  ${props =>
    props.marginTop
      ? `
    margin-top: ${props.marginTop};
  `
      : ''}
  ${props =>
    props.marginLeft
      ? `
    margin-left: ${props.marginLeft};
  `
      : ''}
  ${props =>
    props.marginBottom
      ? `
    margin-bottom: ${props.marginBottom};
  `
      : ''}
  ${props =>
    props.marginRight
      ? `
    margin-right: ${props.marginRight};
  `
      : ''}
  ${props =>
    props.display
      ? `
    display: ${props.display};
  `
      : ''}
  ${props =>
    props.items
      ? `
    align-items: ${props.items};
  `
      : ''}
  ${props =>
    props.self
      ? `
    align-self: ${props.self};
  `
      : ''}
  ${props =>
    props.padding
      ? `
    padding: ${props.padding};
  `
      : ''}
  ${props =>
    props.width
      ? `
    width: ${props.width};
  `
      : ''}
  ${props =>
    props.borderRadius
      ? `
    border-radius: ${props.borderRadius};
    `
      : ``}
  img.icon {
    margin-right: 10px;
  }

  img.thumbs-up {
    margin-right: 10px;
  }

  img.info-icon {
    margin-left: 15px;
  }

  #info .tooltip-inner {
    background: black;
  }

  @media screen and (max-width: 992px) {
    img.icon {
      margin-right: 5px;
    }

    img.info {
      margin-left: 5px;
    }

    img.thumbs-up {
      margin-right: 5px;
      width: 11px;
    }
  }
`
const GreenBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5.35px 9.37px;
  border-radius: 5.35px;
  background: #5dcf46;
  margin-left: 10px;
  font-size: 12px;
  align-items: center;

  img {
    margin-right: 5px;
  }
`

export {
  Container,
  SubPart,
  TransactionDetails,
  HeaderWrap,
  HeaderTitle,
  HeaderButton,
  FarmTitle,
  MyFarm,
  FarmPic,
  Inner,
  EmptyPanel,
  EmptyInfo,
  EmptyImg,
  ThemeMode,
  Div,
  Counter,
  Header,
  Column,
  Status,
  Col,
  TableContent,
  TableWrap,
  MobileSwitch,
  SubBtnWrap,
  SwitchBtn,
  PositionTable,
  YieldTable,
  ContentBox,
  ConnectButtonStyle,
  ExploreButtonStyle,
  CheckBoxDiv,
  SwitchView,
  BackArrow,
  CurrencyDropDown,
  CurrencySelect,
  CurrencyDropDownMenu,
  CurrencyDropDownItem,
  MobileHeader,
  HeaderTop,
  LifetimeValue,
  LifetimeSub,
  LogoDiv,
  Address,
  NewLabel,
  GreenBox,
}
