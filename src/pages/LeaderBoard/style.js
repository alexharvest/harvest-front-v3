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
    padding: 70px 30px 40px;
  }

  @media screen and (max-width: 992px) {
    padding: 25px 15px;
  }
`

const TransactionDetails = styled.div`
  width: 100%;
  border-radius: 15px;
  transition: 0.25s;
  margin-top: 25px;
  @media screen and (max-width: 992px) {
    margin-top: 0px;
  }
`

const Header = styled.div`
  width: 100%;
  padding: ${props => (props.padding ? props.padding : '12px 24px')};
  background: ${props => props.backColor};
  display: flex;
  border: 1px solid;
  border-color: ${props => (props.borderColor ? props.borderColor : '')};
  border-top-left-radius: ${props => (props.borderRadius ? props.borderRadius : '12px')};
  border-top-right-radius: ${props => (props.borderRadius ? props.borderRadius : '12px')};
`

const Column = styled.div`
  width: ${props => props.width};
  font-weight: 500;
  font-size: ${props => (props.fontSize ? props.fontSize : '12px')};
  line-height: 18px;
  display: flex;
  align-items: ${props => props.alighItems};
  color: ${props => props.color};
  padding: ${props => (props.padding ? props.padding : '')};
  ${props =>
    props.justifyContent
      ? `
  justify-content: ${props.justifyContent}
`
      : `start`};

  .mobileTooltip {
    left: 50px !important;
  }
`

const Col = styled.div`
  display: flex;
  cursor: ${props => props.cursor};
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

  svg.question {
    font-size: 16px;
    color: ${props => props.color};
    cursor: pointer;
    margin: auto 0px auto 5px;
  }

  img.sort-icon {
    filter: ${props => props.filterColor};
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
const DownIcon = styled.div`
  margin-left: 4px;
`

const TableTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: ${props => (props.color ? props.color : '')};
  display: flex;
`

const TableIntro = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: ${props => (props.color ? props.color : '')};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '20px')};
`
const SpaceLine = styled.div`
  border-bottom: 1px solid ${props => props.borderColor};
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

const BetaBadge = styled.span`
  background-color: #ecfdf3;
  color: #027a48;
  font-weight: 500;
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 8px;
  line-height: 12px;
  padding: 1.4px 5px;
  height: fit-content;
  margin: auto 2px auto 8px;
`

const HeaderButton = styled.div`
  display: flex;
  margin: auto 0px;
  gap: 15px;

  @media screen and (max-width: 992px) {
    flex-direction: column-reverse;
    gap: 9px;
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

const CurrencySelect = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid ${props => props.borderColor};
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
    padding: 10px 10px;
    gap: 0px;
    justify-content: space-between;

    img {
      width: 17.6px;
      height: 17.6px;
    }
  }
`

const CurrencyDropDownMenu = styled(Dropdown.Menu)`
  background-color: ${props => props.backcolor} !important;
  border: 1px solid ${props => props.borderColor};
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
    color: #6988ff;
  }

  @media screen and (max-width: 992px) {
    line-height: 20px;
    padding: 10px 10px;
    gap: 5px;
    justify-content: space-between;

    img {
      margin-left: 0px;
    }
  }
`

const LeaderBoardTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`

const RankIntro = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 23px;
  margin-bottom: 20px;
  color: #6988ff;
  @media screen and (max-width: 992px) {
    margin-bottom: 0px;
    margin-top: 20px;
    font-size: 10px;
  }
`

export {
  Container,
  TransactionDetails,
  Inner,
  Header,
  Column,
  Col,
  TableContent,
  DownIcon,
  TableTitle,
  TableIntro,
  SpaceLine,
  NewLabel,
  BetaBadge,
  HeaderButton,
  CurrencyDropDown,
  CurrencySelect,
  CurrencyDropDownMenu,
  CurrencyDropDownItem,
  LeaderBoardTop,
  RankIntro,
}
