import styled from 'styled-components'
import { Dropdown, Offcanvas } from 'react-bootstrap'

const Container = styled.div`
  border-right: 1px solid ${props => props.bordercolor};

  a.logo {
    color: ${props => props.fontColor};
  }
  transition: 0.25s;
  background: ${props => props.backcolor};
  color: ${props => props.fontColor};

  min-height: 652px;
  height: 100%;
  min-width: ${props => props.width};
  max-width: 100%;
  position: fixed;
  z-index: 10;
  padding: 24px;

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
    border-top: 1px solid ${props => props.bordercolor};
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

const CategoryRow = styled.div`
  color: ${props => props.color};
  font-size: 13.176px;
  font-weight: 300;
  line-height: 26.352px;
  padding-left: 13.18px;
  margin-top: 25px;
`

const LinkContainer = styled.div`
  position: relative;
  cursor: pointer;

  @media screen and (min-width: 992px) {
    display: flex;
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
      color: #5dcf46;
      img.sideIcon {
        filter: invert(75%) sepia(25%) saturate(1160%) hue-rotate(59deg) brightness(91%) contrast(89%);
      }
    `
      : ``}

  .external-link {
    margin-left: 5px;
    margin-bottom: 14px;
    margin-top: 0;
  }

  @media screen and (max-width: 1536px) {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    padding: 6px 12px;

    .sideIcon {
      width: 22px;
      height: 22px;
    }
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
    display: flex;
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
  font-size: 15px;
  line-height: 30px;
  font-weight: 700;
  margin: 25px 0px;
  width: 100%;
  border: none;
  background: #5dcf46;
  color: #fff;
  border-radius: 11px;
  cursor: pointer;
  transition: 0.5s;
  padding: 7.32px 10.98px;

  &:hover {
    background: ${props => props.hoverColor};
  }

  @media screen and (max-width: 992px) {
    font-size: 15px;
    font-weight: 400;
    border-radius: 9px;
    color: #fff;
    padding: 9.19px 16.08px 9.19px 16.08px;
    margin: auto 0px;
  }
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
    border-top: 1px solid ${props => props.bordercolor};
  }

  button {
    background: none;
    border: 0px;
  }
`

const MobileActionsContainer = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  border-radius: 15px 15px 0px 0px;
  background: ${props => props.bgColor};
  box-shadow: 0px -4px 4px 0px ${props => props.bordercolor};
  &.full-menu-container {
    padding: 19px 19px 0px;
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
  background: ${props => props.backcolor};
  // border-radius: 5px;
  // border: 1px solid ${props => props.bordercolor};
  cursor: pointer;
  width: 10%;
  text-align: center;

  img.disconnect {
    filter: ${props => props.filterColor};
  }

  &.connect-button {
    padding: 10px 40px;
  }
`

const MobileLinkContainer = styled.div`
  display: flex;
  position: relative;
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
    margin: 20px auto 35px auto;
  }
`

const ConnectAvatar = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${props => (props.avatar ? '10px' : '-10px')};
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  transition: 0.25s;
  letter-spacing: -0.15px;
  color: ${props => props.color};

  @media screen and (max-width: 992px) {
    justify-content: center;
    margin-right: 0px;
  }
`

const Address = styled.span`
  display: flex;
  color: ${props => (props.color ? props.color : '')};
  font-weight: 500;
  letter-spacing: -0.12px;
  font-size: 13px;
  font-weight: 500;
  line-height: 26px;

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
      background: ${props => props.backcolor};
      border: 1px solid ${props => props.bordercolor};
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
  filter: ${props => props.filterColor};
  margin-top: ${props => (props.marginTop ? props.marginTop : '')};
`

const UserDropDown = styled(Dropdown.Toggle)`
  border-radius: 11px;
  background: ${props => props.backcolor} !important;
  border: none !important;
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

  &:hover,
  &:active,
  &:focus {
    background: ${props => props.hovercolor} !important;
  }

  .chain-name {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    margin-left: 5px;
  }

  img.chain-icon {
    width: 16.47px;
    height: 16.47px;
    margin: auto 8.78px auto 0px;
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
      filter: ${props => props.filtercolornew};
    }
    div {
      color: #5dcf46;
    }
  }

  img {
    margin-right: 15px;
    margin-left: 10px;
  }

  div {
    align-self: center;
    font-weight: 600;
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
  font-size: 8.637px;
  font-weight: 500;
  line-height: 12.955px;
  border-radius: 16px;
  background: #5dcf46;
  padding: 2px 8px;
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

  &.more {
    margin-top: -1px;
  }

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

const MobileMoreTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const MobileMoreHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 11px;
  width: 70%;
  border-radius: 10.98px;
  background: ${props => props.backcolor};
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
  OffcanvasDiv,
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
  LinkName,
  MobileMoreTop,
  CategoryRow,
  MobileMoreHeader,
}
