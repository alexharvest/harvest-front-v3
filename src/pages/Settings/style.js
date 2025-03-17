import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: ${props => props.fontColor};

  background: ${props => props.bgColor};
  transition: 0.25s;
  position: relative;
  margin-left: 260px;

  @media screen and (min-width: 1921px) {
    flex-direction: row;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: 100%;
    margin: 0;
    justify-content: start;
    padding-bottom: 10px;
  }
`

const Inner = styled.div`
  padding: 100px 100px 50px;
  width: 100%;
  margin: auto;

  @media screen and (min-width: 1921px) {
    width: 1450px;
    padding: 60px 40px;
  }

  @media screen and (max-width: 1200px) {
    padding: 60px 40px;
  }

  @media screen and (max-width: 992px) {
    padding: 22px 37px;
  }

  @media screen and (max-width: 512px) {
    padding: 32px 15px;
  }
`

const WrapperDiv = styled.div`
  width: 720px;
  margin: 0px auto 27px;

  @media screen and (max-width: 1200px) {
    width: 600px;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
  }
`

const Title = styled.div`
  color: ${props => props.fontColor1};
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;

  @media screen and (max-width: 992px) {
    font-size: 16px;
  }
`

const DescText = styled.div`
  color: ${props => props.fontColor};
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;

  @media screen and (max-width: 992px) {
    font-size: 12px;
  }
`

const RowWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`

const CateName = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin: auto 0px;

  @media screen and (max-width: 992px) {
    font-size: 12px;
  }
`

const CoinSection = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
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
        ${props => (props.className === 'inactive' ? 'font-size: 18px;' : 'font-size: 24px;')}
        ${props =>
          props.className === 'inactive'
            ? 'margin: 4px 0px 0px 15px;'
            : 'margin: 4px 0px 0px 12px;'}
      }
    }

    .switch-icon {
      color: ${props => props.color};
      height: 32px;
      ${props => (props.mode === 'dark' || props.mode === 'show' ? 'left: 5px;' : 'right: 5px;')}
      position: absolute;
      top: 4px;
      width: 48px;
      transition: all 0.25s ease 0s;

      svg {
        ${props => (props.className === 'inactive' ? 'font-size: 18px;' : 'font-size: 24px;')}
        ${props =>
          props.className === 'inactive'
            ? 'margin: 4px 0px 0px 15px;'
            : 'margin: 4px 0px 0px 12px;'}
      }
    }

    &:hover .switch-thumb {
      box-shadow: 0 0 2px 3px #ff9400;
    }
  }

  ${props =>
    props.mode === 'light' || props.mode === 'hide'
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

export {
  Container,
  Inner,
  CoinSection,
  WrapperDiv,
  Title,
  DescText,
  RowWrap,
  CateName,
  ThemeMode,
  CurrencySelect,
  CurrencyDropDown,
  CurrencyDropDownMenu,
  CurrencyDropDownItem,
}
