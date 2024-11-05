import styled from 'styled-components'
import { Dropdown, Offcanvas } from 'react-bootstrap'

const Container = styled.div`
  border-right: 1px solid #eaecf0;

  a.logo {
    color: ${props => props.fontColor};
  }
  transition: 0.25s;
  background: ${props => props.backColor};
  color: ${props => props.fontColor};

  min-height: 652px;
  height: 100%;
  min-width: ${props => props.width};
  max-width: 100%;
  position: fixed;
  z-index: 10;
  padding: 25px 25px;

  @media screen and (max-width: 992px) {
    display: flex;
    grid-auto-columns: unset;
    flex-direction: column;
    align-items: baseline;
    width: 100%;
    min-height: auto;
    border: none;
    bottom: 0;
    height: fit-content;
    border-top: 1px solid ${props => props.borderColor};
    padding: 0px 25px;
  }
`

const Layout = styled.div`
  align-items: center;
  max-width: 1790px;

  @media screen and (max-width: 992px) {
    display: none;
    padding: 10px 30px;
    flex-wrap: wrap;
    margin: 0;
    background-color: transparent;
    align-items: unset;
    overflow: hidden;
    transform: translateX(-300px);
    transition: transform 0.3s ease-in-out 0s;
  }

  @media screen and (max-width: 400px) {
    padding: 10px;
  }
`

const LinksContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  margin: 0 0px auto;
  transition: 0.25s;

  div.logo {
    display: flex;
    align-items: inherit;
    text-decoration: none;
    font-weight: 700;
    font-size: 16.7px;

    &:after {
      margin-left: 15px;
      display: block;
      content: 'Harvest';
      color: ${props => props.fontColor};
    }
  }

  @media screen and (max-width: 992px) {
    display: none;
    margin: 100px 0 80px 0;
    grid-auto-columns: unset;
    flex-direction: column;
    align-items: baseline;
  }
`

const LinkContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: 992px) {
    display: flex;
  }

  .leaderboard-dark-btn {
    color: rgb(255, 255, 255);
    --border-angle: 0turn;
    --main-bg: conic-gradient(from var(--border-angle), #213, #112 5%, #112 60%, #213 95%);

    border: solid 2px transparent;
    --gradient-border: conic-gradient(
      from var(--border-angle),
      transparent 25%,
      #08f,
      #f03 99%,
      transparent
    );

    background: var(--main-bg) padding-box, var(--gradient-border) border-box,
      var(--main-bg) border-box !important;

    background-position: center center;

    animation: bg-spin 3s linear infinite;
    @keyframes bg-spin {
      to {
        --border-angle: 1turn;
      }
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  .leaderboard-white-icon {
    color: rgb(16, 24, 40);
    --border-angle: 0turn;
    --main-bg: conic-gradient(from var(--border-angle), #fff, #fff 5%, #fff 60%, #fff 95%);

    border: solid 2px transparent;
    --gradient-border: conic-gradient(
      from var(--border-angle),
      transparent 25%,
      #08f,
      #f03 99%,
      transparent
    );

    background: var(--main-bg) padding-box, var(--gradient-border) border-box,
      var(--main-bg) border-box !important;

    background-position: center center;

    animation: bg-spin 3s linear infinite;
    @keyframes bg-spin {
      to {
        --border-angle: 1turn;
      }
    }

    &:hover {
      animation-play-state: paused;
    }
  }

  @property --border-angle {
    syntax: '<angle>';
    inherits: true;
    initial-value: 0turn;
  }
`

const Link = styled.button`
  color: ${props => props.fontColor1};
  transition: 0.25s;
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  transition: 0.25s;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  padding: 8px 12px;
  border-width: 0;
  border-radius: 6px;
  transition: 0.5s;

  .sideIcon {
    margin-right: 12px;
    filter: ${props =>
      props.darkMode
        ? 'invert(100%) sepia(100%) saturate(0%) hue-rotate(352deg) brightness(101%) contrast(104%)'
        : ''};
  }

  &:hover {
    background: ${props => props.hoverColorSide};
  }

  ${props =>
    props.enabled === 'false'
      ? `
      pointer-events: none;
      color: #a4a4a4;

      img.sideIcon {
        filter: invert(81%) sepia(0%) saturate(1%) hue-rotate(315deg) brightness(82%) contrast(85%);
      }
    `
      : ``}

  ${props =>
    props.active
      ? `
      background: #6988FF !important;
      color: #fff;
      img.sideIcon {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(352deg) brightness(101%) contrast(104%);
      }
    `
      : ``}

  .external-link {
    margin-left: 5px;
    margin-bottom: 14px;
    margin-top: 0;
  }

  @media screen and (max-width: 992px) {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    ${props =>
      props.enabled === 'false'
        ? `
        pointer-events: none;
        color: #a4a4a4;
  
        img.sideIcon {
          filter: invert(81%) sepia(0%) saturate(1%) hue-rotate(315deg) brightness(82%) contrast(85%);
        }
      `
        : ``}
    ${props =>
      props.active
        ? `
        font-weight: bold;
        background: unset;
    `
        : `
    `}
    display: ${props => (props.isDropdownLink ? 'none' : 'flex')};

    img {
      width: 20px;
      height: 20px;
    }
  }
`

const MiddleActionsContainer = styled.div`
  flex-basis: 520px;

  @media screen and (max-width: 992px) {
    display: none;
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

  .detail-info {
    margin: auto;
  }

  input[type='checkbox'] {
    accent-color: #188e54;
    width: 20px;
    height: 20px;
    padding: 4px;
    border-radius: 6px;
  }
`

const ConnectButtonStyle = styled.button`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  margin: 25px 0px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid #6988ff;
  background: none;
  color: #6888ff;
  border-radius: 9px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  transition: 0.5s;
  padding: 15px 0px;

  &:hover {
    background: ${props => props.hoverColor};
  }

  @media screen and (max-width: 992px) {
    font-size: 15px;
    font-weight: 400;
    border-radius: 9px;
    background: #20d099;
    color: #ffffff;
    padding: 9.19px 16.08px 9.19px 16.08px;
    border: none;
    margin: auto 0px auto 10px;
  }

  ${props =>
    props.connected
      ? `
      // padding: 7px 45px 7px 11px;
      // filter: drop-shadow(0px 4px 52px rgba(0, 0, 0, 0.25));

      // &:hover {
      //   background: #E6F8EB;
      // }
    `
      : `
      // padding: 15px 0px 15px 0px;
    `}// img.connect-wallet {
  //   margin-right: 25px;
  // }
`

const AboutHarvest = styled.div`
  font-size: 16px;
  font-weight: 700;

  margin-top: 30px;
  margin-bottom: 30px;
  padding-left: 13px;

  height: 30px;

  @media screen and (max-width: 992px) {
    margin-bottom: 24px;
    margin-top: 0;
    height: 0;
  }
`

const Mobile = styled.div`
  display: none;
  position: relative;
  width: 100%;

  button {
    background: none;
    border: 0px;
  }

  @media screen and (max-width: 992px) {
    display: block;
  }
`

const MobileView = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 100%;
  padding: 10px 0px 5px 0px;

  &.connect-modal {
    padding: 10px 25px;
    border-top: 1px solid ${props => props.borderColor};
  }

  button {
    background: none;
    border: 0px;
  }
`

const MobileConnectBtn = styled.div`
  display: ${props => (props.display ? props.display : '')};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : '')};
  align-items: ${props => (props.alignItems ? props.alignItems : '')};
`

const MobileActionsContainer = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  border-radius: 15px 15px 0px 0px;
  background: ${props => props.bgColor};
  box-shadow: 0px -4px 4px 0px ${props => props.borderColor};
  &.full-menu-container {
    padding: 19px 19px 0px;
  }
`

const MobileWalletTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 19px 19px 0px;
`

const MobileWalletTopNet = styled.div`
  display: flex;
  margin: auto 0px;

  img.chainIcon {
    padding: 3px 5px;
    border-radius: 2px;
    background: #fff;
  }

  img.chainStatus {
    margin: auto 5px;
  }
`

const MobileWalletBody = styled.div`
  display: flex;
  flex-flow: column;
  padding: 25px 25px 0px;
  &.connect-body {
    padding: 80px 25px;
  }
`

const MobileWalletBtn = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 25px 0px;
`

const MobileAmount = styled.div`
  display: none;
  /* display: flex; */
  color: ${props => props.fontColor2};
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
`

const MobileAmountDiv = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  &.middle-letter {
    width: 10%;
    margin-top: -1px;
  }
  &.eth-letter {
    text-align: end;
  }
  &.usdc-letter {
    text-align: start;
  }
`

const MobileWalletButton = styled.div`
  color: ${props => props.fontColor5};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${props => (props.marginLeft ? props.marginLeft : '')};
  // padding: 10px 18px;
  background: ${props => props.backColor};
  // border-radius: 5px;
  // border: 1px solid ${props => props.borderColor};
  cursor: pointer;
  width: 45%;
  text-align: center;

  &.connect-button {
    padding: 10px 40px;
  }
`

const MobileLinkContainer = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 12px;
  margin: auto;
  width: 95%;

  &:last-child {
    margin-bottom: 0;
  }
`

const MobileLink = styled.button`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  align-items: end;
  justify-content: start;
  color: ${props => props.fontColor};
  background-color: transparent;
  cursor: pointer;
  margin-left: 1rem;
  border-width: 0;
  ${props =>
    props.active
      ? `
    opacity: 1;
    font-weight: 800;
    color: ${props.activeFontColor} !important;
    transition: 0.25s;
  `
      : `
    opacity: 0.85;
  `}

  display: flex;

  &:hover {
    opacity: 1;
  }
`

const MobileFollow = styled.div`
  left: 12px;
  display: flex;
  justify-content: space-between;
  width: 90%;

  @media screen and (max-width: 992px) {
    width: 95%;
    margin: 0px auto 35px auto;
  }
`

const ConnectAvatar = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${props => (props.avatar ? '13px' : '-13px')};
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  transition: 0.25s;
  letter-spacing: -0.15px;
  color: ${props => props.color};

  img {
    margin-right: 5px;
  }

  @media screen and (max-width: 992px) {
    justify-content: center;
    margin-right: 0px;
  }
`

const Address = styled.span`
  display: flex;
  color: ${props => (props.color ? props.color : '')};
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: -0.12px;

  @media screen and (max-width: 992px) {
    text-align: center;
    line-height: 25px;
    margin-left: 10px;
    font-size: 15px;
  }
`

const ThemeMode = styled.div`
  display: flex;

  @media screen and (max-width: 992px) {
    margin: 3px 0px 0px 0px;
  }

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
      width: 105px;
      height: 40px;
      border-radius: 30px;
      transition: all 0.2s ease 0s;
    }

    .switch-thumb {
      color: #000;
      background: #fff;
      background-size: cover;
      height: 32px;
      right: 5px;
      position: absolute;
      top: 4px;
      width: 48px;
      border-radius: 32px;
      transition: all 0.25s ease 0s;

      svg {
        font-size: 24px;
        margin: 4px 0px 0px 12px;
      }
    }

    .switch-icon {
      color: ${props => props.color};
      height: 32px;
      ${props => (props.mode === 'dark' ? 'left: 5px;' : 'right: 5px;')}
      position: absolute;
      top: 4px;
      width: 48px;
      transition: all 0.25s ease 0s;

      svg {
        font-size: 24px;
        margin: 4px 0px 0px 12px;
      }
    }

    &:hover .switch-thumb {
      box-shadow: 0 0 2px 3px #ff9400;
    }
  }

  ${props =>
    props.mode === 'light'
      ? `
      #theme-switch {
        .switch-check {
          opacity: 1;
        }
        .switch-x {
          opacity: 0;
        }
        .switch-thumb {
          left: 6px;
        }
      }
    `
      : `
      
    `}
`

const SideIcons = styled.img`
  transition: 0.25s;
  width: ${props => props.width};
  height: ${props => props.height};
  margin-top: ${props => (props.marginTop ? props.marginTop : '')};
`

const UserDropDown = styled(Dropdown.Toggle)`
  background: none !important;
  border: none !important;
  border-radius: 10px !important;
  color: ${props => props.fontcolor2} !important;
  align-items: center;
  padding: 8px 18px 8px 5px !important;
  width: 100%;
  display: flex !important;
  justify-content: space-between;
  text-align: left;
  position: relative;
  margin: 20px 0px;
  transition: 0.5s;

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

  img.chain-icon {
    width: 11px;
    height: 11px;
  }

  @media screen and (max-width: 992px) {
    margin-left: 13px;
  }
`

const UserDropDownMenu = styled(Dropdown.Menu)`
  background-color: ${props => props.backcolor} !important;
  border: 1px solid ${props => props.bordercolor} !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px !important;
  padding: 0;
  min-width: 8rem;
  width: 100% !important;
  margin-top: 6px;

  &:focus {
    box-shadow: none;
  }
`

const UserDropDownItem = styled(Dropdown.Item)`
  padding: 12px 0px !important;
  margin: 0 23px !important;
  text-align: left;
  display: flex !important;
  justify-content: start;
  ${props =>
    props.bordercolor
      ? `
    border-bottom: 0.5px solid ${props.bordercolor} !important;
  `
      : `
  `}
  width: auto !important;
  color: ${props => props.fontcolor} !important;

  img {
    filter: ${props => props.filtercolor};
  }

  &:hover {
    background: none !important;

    img {
      filter: invert(63%) sepia(58%) saturate(3702%) hue-rotate(0deg) brightness(107%)
        contrast(105%);
    }
    div {
      color: #ff9400;
    }
  }

  img {
    margin-right: 15px;
    margin-left: 10px;
  }

  div {
    align-self: center;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
  }

  img.check-icon {
    width: 15px;
    height: 16px;
  }

  img.change-icon {
    transform: scale(1.5);
  }
`

const MobileToggle = styled.img`
  filter: ${props => props.toggleColor};
  &.wallet-btn {
    margin-top: -3px;
  }

  &.connected-wallet-btn {
    filter: invert(39%) sepia(83%) saturate(1585%) hue-rotate(137deg) brightness(103%) contrast(84%);
  }
`

const OffcanvasDiv = styled(Offcanvas)`
  background-color: #f2f5ff !important;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 15px 15px 0px 0px;
  border-left: unset !important;
  color: ${props => props.fontcolor};
  transition: 0.25s;
  a.logo {
    color: ${props => props.fontcolor};
  }

  .offcanvas-header {
    justify-content: end;

    .btn-close {
      filter: ${props => props.filtercolor};
    }
  }
`

const ProfitBack = styled.img`
  border-radius: 13px;
`

const BottomPart = styled.div``

const Logo = styled.div`
  cursor: pointer;
  color: #1f2937;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;

  svg.close {
    font-size: 24px;
    color: ${props => props.color};
    cursor: pointer;
  }

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-left: 12px;
  }
`

const Desktop = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 992px) {
    display: none;
  }
`

const NewTag = styled.div`
  border-radius: 16px;
  background: #00d26b;
  padding: 2px 8px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  color: white !important;
  margin-left: 10px;
`

const LinkName = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 25px;
  color: ${props => (props.color ? props.color : '')};
  margin-top: ${props => (props.marginTop ? props.marginTop : '')};
`

const LinkMobile = styled.button`
  font-size: 10px;
  line-height: 13px;
  color: #484c52;
  transition: 0.25s;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  cursor: pointer;
  padding-left: 0;
  padding-right: 0;
  flex-direction: column;
  display: ${props => (props.isDropdownLink ? 'none' : 'flex')};

  img {
    filter: ${props => (props.farmsFilter ? props.farmsFilter : '')};
  }

  ${props =>
    props.enabled === 'false'
      ? `
      pointer-events: none;
      color: #a4a4a4;
    `
      : ``}

  ${props =>
    props.active
      ? `
          font-weight: 500;
          color: #15B088;
      `
      : `font-weight: 400;`}
`

const MobileMenuContainer = styled.div`
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }
`

const ConnectSection = styled.div`
  cursor: pointer;
  display: ${props => (props.display ? props.display : 'flex')};
`

const MoreBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #484c52;
  font-size: 10.229px;
  font-style: normal;
  font-weight: 400;
  padding: 0px;
  align-items: center;
`

const CurrencyDiv = styled.div`
  left: 12px;
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin-top: 15px;

  @media screen and (max-width: 992px) {
    width: 95%;
    margin: 0px auto 35px auto;
  }
`

const MobileMoreTop = styled.div`
  display: flex;
  align-items: center;
`

export {
  Container,
  Layout,
  LinksContainer,
  LinkContainer,
  Link,
  MiddleActionsContainer,
  FlexDiv,
  Address,
  ConnectButtonStyle,
  AboutHarvest,
  MobileView,
  MobileConnectBtn,
  MobileToggle,
  OffcanvasDiv,
  MobileWalletTop,
  MobileWalletTopNet,
  MobileWalletBody,
  MobileWalletBtn,
  MobileAmount,
  MobileAmountDiv,
  MobileWalletButton,
  MobileActionsContainer,
  MobileLinkContainer,
  MobileLink,
  MobileFollow,
  ConnectAvatar,
  ThemeMode,
  SideIcons,
  UserDropDown,
  UserDropDownItem,
  UserDropDownMenu,
  ProfitBack,
  BottomPart,
  Logo,
  Desktop,
  NewTag,
  LinkMobile,
  MobileMenuContainer,
  Mobile,
  ConnectSection,
  MoreBtn,
  CurrencyDiv,
  LinkName,
  MobileMoreTop,
}
