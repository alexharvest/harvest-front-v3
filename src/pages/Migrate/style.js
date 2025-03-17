import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'

const Container = styled.div`
  padding: 50px 75px 75px 75px;
  width: 100%;
  min-height: 100vh;
  color: ${props => props.fontColor};
  display: flex;
  align-items: center;
  flex-direction: column;

  background: ${props => props.bgColor};
  transition: 0.25s;
  position: relative;
  margin-left: 260px;

  @media screen and (min-width: 1920px) {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding-bottom: 50px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
  }
`

const Inner = styled.div`
  width: 100%;
  display: ${props => (props.display ? props.display : '')};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : '')};
  align-items: ${props => (props.alignItems ? props.alignItems : '')};
  height: ${props => (props.height ? props.height : '')};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '')};
  padding: ${props => (props.padding ? props.padding : '')};

  @media screen and (min-width: 1921px) {
    width: 1450px;
  }

  @media screen and (max-width: 1660px) {
    &.box-faq {
      padding: 0px 50px;
    }
  }

  @media screen and (max-width: 1600px) {
    &.box-faq {
      padding: 0px;
    }
  }

  @media screen and (max-width: 1265px) {
    &.box-faq {
      flex-direction: column;
      padding: 0px 50px;
    }

    .migrate-faq {
      width: 100%;
      margin-left: 0px;
      margin-top: 70px;
    }
  }

  @media screen and (max-width: 992px) {
    &.box-faq {
      flex-direction: column;
      padding: 0px 150px;
    }

    padding: 25px 15px;
    flex-direction: column;

    .migrate-faq {
      margin-top: 0px;
    }
  }

  @media screen and (max-width: 570px) {
    &.box-faq {
      padding: 15px;
    }
  }

  .migrate-box {
    position: relative;
    border: 1px solid ${props => props.borderColor};
  }

  // .migrate-box::before {
  //   content: '';
  //   position: absolute;
  //   inset: 0;
  //   border-radius: 12px;
  //   padding: 4px;
  //   background: linear-gradient(90deg, #ffd6a6 0%, #a1b5ff 48.9%, #73df88 100%);
  //   -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  //   -webkit-mask-composite: xor;
  //   mask-composite: exclude;
  // }
`

const MigrateTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`

const PageTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: ${props => (props.color ? props.color : '')};
`

const PageIntro = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: ${props => (props.color ? props.color : '')};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '20px')};
`

const SpaceLine = styled.div`
  border-bottom: 1px solid ${props => props.borderColor};
`

const MigrateBox = styled.div`
  width: ${props => (props.width ? props.width : '')};
  border-radius: 12px;
  padding: 25px;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '')};

  .from-vault {
    position: relative;
  }

  @media screen and (max-width: 1380px) {
    width: 50%;
  }

  @media screen and (max-width: 1265px) {
    width: 100%;
  }

  // .from-vault::before {
  //   content: '';
  //   position: absolute;
  //   inset: 0;
  //   border-radius: 8px;
  //   padding: 2px;
  //   background: linear-gradient(90deg, #ffd6a6 0%, #a1b5ff 48.9%, #73df88 100%);
  //   -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  //   -webkit-mask-composite: xor;
  //   mask-composite: exclude;
  //   z-index: 0;
  // }
`
const BoxTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  margin-top: 20px;
  color: ${props => (props.color ? props.color : '')};
`

const VaultBox = styled.div`
  box-shadow: 0px 1px 2px 0px #1018280d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px 10px 14px;
  border-radius: 8px;
  margin-bottom: 21px;
  background: ${props => (props.bgColor ? props.bgColor : '')};
  border: ${props => (props.border ? props.border : '')};
  cursor: pointer;
  position: relative;
  z-index: 1;

  &.inactive {
    cursor: not-allowed;
  }
`

const MigrateIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`
const Button = styled.button`
  padding: 15px 18px;
  border: unset;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #5dcf46;
  color: white;
  width: 100%;

  &:hover {
    background: #4ddd30;
  }

  &.inactive-btn {
    background: #535763;
    cursor: not-allowed;
  }
`

const Buttons = styled.button`
  background: #5dcf46;
  border: none;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: white;
  border-radius: 8px;
  padding: 15px 18px;
  align-items: center;
  width: 100%;

  &:hover {
    background: #4ddd30;
  }

  &:active {
    background: #4ddd30;
    opacity: 1;
  }
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  position: relative;
  z-index: 1;
`

const Content = styled.div`
  display: flex;
  align-items: ${props => (props.alignItems ? props.alignItems : '')};
  flex-direction: column;
`

const InfoText = styled.div`
  font-size: ${props => (props.fontSize ? props.fontSize : '')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '')};
  line-height: 20px;
  color: ${props => (props.color ? props.color : '')};
`

const BadgeToken = styled.div`
  display: flex;
  justify-content: start;
  align-items: baseline;
`

const BadgeIcon = styled.div`
  margin: ${props => props.margin};
  width: ${props => props.width};
  height: 13.096px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 10px;
    height: 11px;
  }
`

const ApyDownIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Token = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #414141;
  cursor: pointer;
  z-index: 1;
  text-decoration: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 260px;

  @media screen and (max-width: 415px) {
    width: 200px;
  }

  @media screen and (max-width: 355px) {
    width: 170px;
  }
`

const ChainGroup = styled.div`
  display: flex;
  border-radius: 10px;
  width: 40%;
  justify-content: right;
`

const ChainButton = styled.button`
  width: 50px;
  align-items: center;
  padding: 9px 0px;
  display: flex;
  justify-content: center;
  transition: 0.25s;
  border: 1px solid ${props => props.borderColor};
  background: ${props => props.backColor};

  &:first-child {
    border-radius: 10px 0 0 10px;
    border-right: none;
  }

  &:nth-child(2) {
    border-right: none;
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
    border-left: none;
  }

  &:hover {
    background: ${props => props.hoverColor} !important;
  }

  &.active {
    background: ${props => props.backColor};

    img {
      opacity: 1;
    }
  }

  img {
    opacity: 0.3;
    width: 22px;
    height: 22px;
  }

  @media screen and (max-width: 1480px) {
    img {
      width: 20px;
      height: 20px;
    }
  }

  @media screen and (max-width: 1280px) {
    img {
      width: 14px;
      height: 14px;
    }
  }

  @media screen and (max-width: 992px) {
    width: 25%;
    img {
      width: 22px;
      height: 22px;
    }
  }
`

const BoxHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    width: 17.6px;
    height: 17.6px;
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
    background: ${props => (props.bgcolor ? props.bgcolor : '')};
    gap: 5px;
    justify-content: center;

    img {
      margin-left: 0px;
    }
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
    padding: 10px;
    gap: 0px;
    justify-content: space-between;
    width: 60px;

    img {
      width: 17.6px;
      height: 17.6px;
    }
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

export {
  Container,
  Inner,
  MigrateTop,
  PageTitle,
  PageIntro,
  SpaceLine,
  MigrateBox,
  VaultBox,
  BoxTitle,
  MigrateIcon,
  Button,
  ButtonDiv,
  Content,
  InfoText,
  BadgeToken,
  BadgeIcon,
  ApyDownIcon,
  Token,
  Buttons,
  ChainGroup,
  ChainButton,
  BoxHeading,
  CurrencyDropDownItem,
  CurrencySelect,
  CurrencyDropDownMenu,
  CurrencyDropDown,
}
