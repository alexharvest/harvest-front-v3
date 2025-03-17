import styled from 'styled-components'
import { Dropdown, Offcanvas } from 'react-bootstrap'
import HoverBack from '../../assets/images/logos/farm/hover_filter.svg'

const QuickFilterContainer = styled.div`
  display: flex;
  ${props =>
    props.justifyContent
      ? `
    justify-content: ${props.justifyContent};
  `
      : ''}
  ${props =>
    props.sub
      ? `
  `
      : `padding: 25px 0 0;`}
  
  &:first-child {
    padding: 0;
  }

  ${props =>
    props.position
      ? `
    position: ${props.position};
  `
      : ''}

  ${props =>
    props.width
      ? `
    width: ${props.width};
  `
      : ''}

  @media screen and (max-width: 950px) {
    padding: 30px;
    overflow: hidden;
    flex-direction: column;
    grid-gap: 20px;
  }

  @media screen and (max-width: 860px) {
    margin-bottom: 20px;
  }
`

const InputsContainer = styled.div`
  width: 100%;
  min-width: 25%;

  @media screen and (max-width: 950px) {
    width: 100%;
  }
`

const UserDropDown = styled(Dropdown.Toggle)`
  background: ${props => props.backcolor} !important;
  border: 1px solid ${props => props.bordercolor} !important;
  color: ${props => props.fontcolor} !important;
  border-radius: 10px;
  align-items: center;
  padding: 12px 15px !important;
  width: 100%;
  display: flex;
  text-align: left;
  position: relative;

  &:after {
    display: none !important;
  }

  &:hover {
    background: white;
    color: black;
    font-weight: 500;
  }

  &:active {
    background: green;
    color: black;
  }

  img {
    filter: ${props => props.filtercolor};
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
    top: 12px;
  }
`

const UserDropDownMenu = styled(Dropdown.Menu)`
  background: white;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 12px 12px;
  padding: 0;
  min-width: 8rem;
  width: 100% !important;
`

const UserDropDownItem = styled(Dropdown.Item)`
  padding: 12px 15px !important;
  text-align: left;
  display: flex !important;
  background: white;
  color: #888e8f;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  align-items: center;

  &:hover {
    background: #f6f6f6 !important;
    color: black;
    font-weight: 500;
  }

  img {
    margin-right: 5px;
  }
`

const DivWidth = styled.div`
  ${props =>
    props.width
      ? `
    width: ${props.width};
  `
      : 'width: auto;'}
  ${props =>
    props.alignItems
      ? `
        align-items: ${props.alignItems};
      `
      : ''}
  ${props =>
    props.marginRight
      ? `
    margin-right: ${props.marginRight};
  `
      : ''}
  ${props =>
    props.justifyContent
      ? `
    justify-content: ${props.justifyContent};
  `
      : ''}
  ${props =>
    props.display
      ? `
    display: ${props.display};
  `
      : ''}
  ${props =>
    props.padding
      ? `
    padding: ${props.padding};
  `
      : ''}
  ${props =>
    props.position
      ? `
    position: ${props.position};
  `
      : ''}
  ${props =>
    props.top
      ? `
    top: ${props.top}px;
  `
      : ''}
  ${props =>
    props.left
      ? `
    left: ${props.left}px;
  `
      : ''}
  ${props =>
    props.right
      ? `
    right: ${props.right}px;
  `
      : ''}
  ${props =>
    props.boxShadow
      ? `
    box-shadow: ${props.boxShadow};
  `
      : ''}
  ${props =>
    props.borderRadius
      ? `
    border-radius: ${props.borderRadius}px;
  `
      : ''}
  ${props =>
    props.height
      ? `
    height: ${props.height};
  `
      : ''}
  background: ${props => props.backColor};

  &.searchbar {
    width: 23%;
    position: absolute;
    border: none;
    top: 100px;
    left: 20px;
  }

  &.chain {
    background: none;
  }
  transition: 0.25s;
  @media screen and (max-width: 1480px) {
    &.searchbar {
      top: 83px;
    }

    position: unset;
    height: fit-content;
  }

  @media screen and (max-width: 1280px) {
    &.searchbar {
      top: 68px;
    }

    position: unset;
    margin-right: 3px;
  }

  @media screen and (max-width: 992px) {
    margin-right: 0px;
    ${props =>
      props.mobileMarginBottom
        ? `
      margin-bottom: ${props.mobileMarginBottom};
    `
        : ''}
  }
`

const ChainButton = styled.button`
  width: 50px;
  align-items: center;
  padding: 7px 16px;
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

  &:nth-child(3) {
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
    padding: 9px 16px;
    img {
      width: 22px;
      height: 22px;
    }
  }
`

const ChainATag = styled.a`
  align-items: center;
  position: relative;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 12px;
  margin-right: 21px;
  padding: 7px 15px;
  display: flex;
  justify-content: center;
  transition: 0.25s;

  border: 1px solid ${props => props.borderColor};
  background: ${props => props.backColor};

  img.link {
    filter: ${props => props.filterColor};
  }

  &:hover {
    background: ${props => props.hoverColor} !important;
    border-radius: 12px;
  }

  &.active {
    background: ${props => props.backColor};
    border-radius: 12px;

    img {
      opacity: 1;
    }
  }

  img.link {
    position: absolute;
    top: 3px;
    right: 3px;
  }
`

const ClearFilter = styled.div`
  width: max-content;
  background: ${props => props.backColor};
  color: ${props => props.fontColor};
  border: 1px solid ${props => props.borderColor};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  height: 100%;
  display: flex;
  transition: 0.25s;

  align-items: center;

  &:hover {
    color: #5dcf46;
  }

  @media screen and (max-width: 1480px) {
    padding: 9px 13px;
    font-size: 11px;
    line-height: 16px;
  }

  @media screen and (max-width: 1280px) {
    padding: 5px 10px;
    font-size: 8px;
    line-height: 14px;
  }
`

const Counter = styled.div`
  ${props =>
    props.count > 0
      ? `
  background: #5dcf46;
  color: white;
  `
      : `
  background: #5dcf46;
  color: #1F2937;
  `}
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;

  @media screen and (max-width: 1480px) {
    width: 15px;
    height: 15px;
  }

  @media screen and (max-width: 1280px) {
    width: 12px;
    height: 12px;
    border-radius: 3px;
  }

  @media screen and (max-width: 992px) {
    color: white;
    width: 20px;
    height: 20px;
  }
`

const WebView = styled.div`
  display: block;

  @media screen and (max-width: 992px) {
    display: none;
  }
`

const MobileView = styled.div`
  display: none;

  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0px 15px 0px 15px;
  }
`

const FarmButtonPart = styled.div`
  display: flex;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'center')};
  margin-bottom: 15px;
  width: 100%;

  .dropdown {
    width: 100%;
  }

  #dropdown-basic {
    display: flex;
  }

  .show {
    .narrow {
      display: none;
    }
  }
`

const Filtersinput = styled.input`
  background: #ffffff;
  border: 0px;
  outline: 0;
  border-radius: 5px;
  color: #888e8f;
  padding: 12px 20px 12px 32px;
  width: 80%;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;

  &:active {
    border: 0px;
  }
`

const FarmFiltersPart = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 25px;

  .switch-balance {
    width: 32%;
  }

  .filter-part {
    width: 100%;

    button {
      background: ${props => props.backColor};
      color: ${props => props.fontColor};
      width: 100%;
      border: 1px solid ${props => props.borderColor};
      border-radius: 8px;
      padding: 10px 15px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      text-align: left;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    img {
      margin-right: 10px;
      filter: ${props => props.filterColor};
    }
  }

  .clear-filter {
    width: 100%;
  }

  @media screen and (max-width: 992px) {
    width: 40%;
    margin-left: 5px;

    button.filters-btn {
      border: 1px solid ${props => props.borderColor};
      font-size: 12px;
      font-weight: 400;
      color: ${props => (props.mobileColor ? props.mobileColor : '')};
    }
  }
`

const MobileListHeaderSearch = styled.div`
  width: 100%;
  margin-bottom: 15px;

  .filter-sort {
    background: #f5f5f5;
    border-radius: 5px;
    position: relative;
    color: #888e8f;

    input {
      background: #f5f5f5;
      width: 100%;
      border: 0px;
    }
  }

  @media screen and (max-width: 992px) {
    .clear-filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`

const BoostBtn = styled.div`
  padding: 11px;
  text-align: center;
  background: linear-gradient(to right, #d27318, #fdbe5f);
  border-radius: 8px;
  border: 1px #f3f6ff;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 15px;

  img {
    padding: 0px 4px;
  }

  span {
    font-weight: 600;
  }
`

const MobileClearFilter = styled(ClearFilter)`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  width: 100%;
  border-radius: 8px;
  color: ${props => props.fontColor};
  background: ${props => props.backColor};
  justify-content: center;

  @media screen and (max-width: 992px) {
    font-size: 12px;
    font-weight: 400;
    color: ${props => (props.mobileColor ? props.mobileColor : '')};
    border: 1px solid ${props => props.borderColor};
    padding: 10px 18px;
    width: 40%;
  }
`

const FilterOffCanvas = styled(Offcanvas)`
  background: ${props => props.backcolor} !important;
  align-items: center;
  border-top: 2px solid ${props => props.borderColor} !important;
  border-radius: 15px;
  .offcanvas-header {
    .btn-close {
      filter: ${props => props.filtercolor};
    }
  }

  .btn-close {
    opacity: 1;
  }
`

const FilterOffCanvasHeader = styled(Offcanvas.Header)`
  padding: 25px 15px 25px 15px !important;
  width: 95%;
`

const FilterOffCanvasBody = styled(Offcanvas.Body)`
  padding: 0px 15px 15px 15px !important;
  width: 95%;

  &.filter-show {
    height: 100% !important;

    .show {
      .toggle {
        .narrow {
          display: none;
        }
      }
    }

    .asset-type {
      margin-bottom: 15px;
    }

    .toggle {
      display: flex;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      background: ${props => props.backcolor} !important;
      border: 1px solid ${props => props.bordercolor} !important;
      color: ${props => props.fontcolor} !important;
      border-radius: 5px;
      width: 100%;
      position: relative;
      padding: 13px 18px 15px 18px;

      img.narrow {
        position: absolute;
        right: 10px;
        top: 17px;
      }

      img {
        margin-right: 5px;
        filter: ${props => props.filtercolor};
      }

      &:after {
        display: none;
      }
    }

    .menu {
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      width: 100%;
      background: ${props => props.backcolor};
      border: 1px solid ${props => props.bordercolor};

      .item {
        display: flex;
        padding: 13px 18px 15px 18px;
        color: ${props => props.fontcolor};
        background: none;
        img {
          margin-right: 6px;
          filter: ${props => props.filtercolor};
        }
      }

      .item:hover,
      .item:active {
        background: ${props => props.hovercolor};
      }

      .item.disabled {
        color: ${props => props.mobilefilterdisablecolor};
      }
    }
  }
`

const FarmFilter = styled.div`
  color: ${props => props.color};
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: center;

  img {
    margin-right: 15px;
    filter: ${props => (props.imgFilter ? props.imgFilter : '')};
  }
`

const BadgeText = styled.div`
  font-weight: 500;
  font-size: 5px;
  line-height: 7px;
  color: ${props => props.mobilefilterdisablecolor};
`

const CamelotButton = styled.button`
  background: url(${HoverBack});
  background-repeat: no-repeat;
  background-size: unset;
  color: white;

  padding: 9px 20px;
  border-radius: 0 7px 7px 0;
  border: none;

  img {
    margin-right: 10px;
  }

  &:hover {
    color: #ffab37;
    img {
      transition: 0.25s;
      filter: invert(57%) sepia(61%) saturate(2063%) hue-rotate(1deg) brightness(103%)
        contrast(105%);
    }
  }
  transition: 0.25s;
  &:active {
    color: white;
    img {
      filter: invert(57%) sepia(61%) saturate(2063%) hue-rotate(1deg) brightness(103%)
        contrast(105%);
    }
  }

  @media screen and (max-width: 1480px) {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 16px;

    img {
      width: 18px;
      height: 18px;
    }
  }

  @media screen and (max-width: 1280px) {
    padding: 5px 10px;
    font-size: 8px;
    line-height: 14px;

    img {
      width: 10px;
      height: 10px;
    }
  }
`

const SpecButtons = styled.button`
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  border: none;

  margin-right: 15px;
`

const ChainGroup = styled.div`
  display: flex;
  border-radius: 10px;
  @media screen and (max-width: 992px) {
    width: 100%;
  }
`

const SwitchBalanceButton = styled.button`
  align-items: center;
  border: 1px solid ${props => props.borderColor};
  &:first-child {
    border-radius: 10px 0 0 10px;
    border-right: none;
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
  }

  border-right: 1px solid ${props => props.borderColor};
  background: ${props => props.backColor};

  padding: 9px 14px;
  display: flex;
  justify-content: center;

  transition: 0.25s;

  img {
    filter: ${props => props.filterColor};
  }

  &:hover {
    img {
      filter: ${props => props.hoverColor};
    }
  }

  &.active {
    background: ${props => props.backColor};

    img {
      filter: ${props => props.hoverColor};
    }
  }

  img {
    width: 22px;
    height: 22px;
  }

  @media screen and (max-width: 1480px) {
    border-radius: 10px;
    padding: 7px 12px;
    img {
      width: 20px;
      height: 20px;
    }
  }

  @media screen and (max-width: 1280px) {
    padding: 5px 10px;
    img {
      width: 14px;
      height: 14px;
    }
  }

  @media screen and (max-width: 992px) {
    width: 50%;
    padding: 9px 10px;
    img {
      width: 22px;
      height: 22px;
    }
  }
`

const SpecDropDown = styled(Dropdown.Toggle)`
  ${props =>
    props.backcolor
      ? `
    background: ${props.backcolor} !important;
    `
      : `
      background: #ff9966;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #ff5e62, #ff9966);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #ff5e62, #ff9966); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  `}

  background-size: 100% !important;
  border: 1px solid ${props => props.bordercolor} !important;
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  border-radius: 10px;
  align-items: center;
  padding: 10px 15px;
  width: ${props => (props.type === 'collab' ? '140px' : '102px')};
  display: flex;
  justify-content: space-between;
  text-align: left;
  position: relative;

  &:after {
    display: none !important;
  }

  &:hover {
    filter: brightness(120%);
  }

  .name {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  img.narrow {
    margin-left: 10px;
  }

  @media screen and (max-width: 1480px) {
    padding: 9px 12px;
    width: ${props => (props.type === 'collab' ? '125px' : '90px')};
    .name {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
    }
  }

  @media screen and (max-width: 1280px) {
    padding: 5px 10px;
    font-size: 8px;
    line-height: 14px;
    width: ${props => (props.type === 'collab' ? '100px' : '72px')};
    .name {
      font-size: 8px;
      line-height: 14px;
    }
  }

  @media screen and (max-width: 992px) {
    justify-content: space-between;
    padding: 10px 16px;
    width: 100%;
    .name {
      font-size: 14px;
      line-height: 20px;
    }
  }
`

const SpecDropDownMenu = styled(Dropdown.Menu)`
  background: white;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 0;
  width: 100% !important;
  min-width: 200%;
  left: -100% !important;

  @media screen and (max-width: 992px) {
    left: unset !important;
    min-width: unset;
  }
`

const SpecDropDownItem = styled(Dropdown.Item)`
  text-align: left;
  display: flex;
  justify-content: center;
  ${props =>
    props.num === 0
      ? `
      background-color: #0085FF !important;
      padding: 21px 15px;
  `
      : props.num === 1
      ? `
      background-color: #A92A66 !important;
      padding: 8px;
      `
      : `
      padding: 27px 18px;
      background-color: #FFAF1D !important;`}
  color: white !important;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  align-items: center;

  &.first {
    border-radius: 8px 8px 0 0;
  }

  &.last {
    border-radius: 0 0 8px 8px;
  }

  &:hover {
    opacity: 0.9;
  }

  @media screen and (max-width: 1480px) {
    font-size: 12px;
    line-height: 16px;
    ${props =>
      props.num === 0
        ? `
        padding: 10px 15px;
        img {
          width: 68px;
        }
    `
        : props.num === 1
        ? `
        padding: 5px;
        img {
          width: 32px;
        }
        `
        : `
        padding: 14px;
        img {
          width: 80px;
        }
        `}
  }

  @media screen and (max-width: 1280px) {
    font-size: 8px;
    line-height: 12px;
    ${props =>
      props.num === 0
        ? `
        padding: 9px 10px;
        img {
          width: 50px;
        }
    `
        : props.num === 1
        ? `
        padding: 2px 8px;
        img {
          width: 30px;
        }
        `
        : `
        padding: 12px 10px;
        img {
          width: 60px;
        }
        `}
  }

  @media screen and (max-width: 992px) {
    font-size: 16px;
    line-height: 24px;
    padding: 12px;
    ${props =>
      props.num === 0
        ? `
        padding: 15px;
        img {
          width: unset;
        }
    `
        : props.num === 1
        ? `
        padding: 8px;
        img {
          width: unset;
        }
        `
        : `
        padding: 18px;
        img {
          width: unset;
        }
        `}
  }
`

const TrendDropDown = styled(Dropdown.Toggle)`
  background: #5dcf46;
  background-size: 100% !important;
  border: 1px solid ${props => props.bordercolor} !important;
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  border-radius: 10px;
  align-items: center;
  padding: 10px 15px;
  width: ${props => (props.type === 'collab' ? '140px' : '102px')};
  display: flex;
  justify-content: space-between;
  text-align: left;
  position: relative;

  &:after {
    display: none !important;
  }

  &:hover {
    background: #2ccda4;
  }

  &:active {
    background: #4fdfbb !important;
  }

  &.show {
    background: #2ccda4;
  }

  .name {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }

  img.narrow {
    margin-left: 10px;
  }

  @media screen and (max-width: 1480px) {
    padding: 9px 12px;
    width: ${props => (props.type === 'collab' ? '125px' : '90px')};
    .name {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
    }
  }

  @media screen and (max-width: 1280px) {
    padding: 5px 10px;
    font-size: 8px;
    line-height: 14px;
    width: ${props => (props.type === 'collab' ? '100px' : '72px')};
    .name {
      font-size: 8px;
      line-height: 14px;
    }
  }

  @media screen and (max-width: 992px) {
    justify-content: center;
    padding: 10px 16px;
    width: 100%;
    .name {
      font-size: 14px;
      line-height: 20px;
    }
  }
`

const TrendDropDownMenu = styled(Dropdown.Menu)`
  background: white;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 0;
  width: 100% !important;
  min-width: unset;
`

const TrendDropDownItem = styled(Dropdown.Item)`
  padding: 12px 15px;
  text-align: left;
  display: flex;
  justify-content: center;
  ${props =>
    props.num === 0
      ? `
    background: #12c2e9;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  `
      : `
    background: #134E5E;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #71B280, #134E5E);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #71B280, #134E5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      `}
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white !important;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  align-items: center;

  &.first {
    border-radius: 8px 8px 0 0;
  }

  &.last {
    border-radius: 0 0 8px 8px;
  }

  &:hover {
    opacity: 0.9;
  }

  @media screen and (max-width: 1480px) {
    font-size: 12px;
    line-height: 16px;
  }

  @media screen and (max-width: 1280px) {
    font-size: 8px;
    line-height: 12px;
    padding: 7px 10px;
  }

  @media screen and (max-width: 992px) {
    font-size: 16px;
    line-height: 24px;
    padding: 12px;
  }
`

const ApplyFilterBtn = styled.button`
  display: flex;
  justify-content: center;
  padding: 10px 16px;
  background: #5dcf46;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  width: 100%;
  border: none;
  color: white;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  opacity: 1;

  &:hover {
    background: ${props => props.hoverColor};
  }
`

const CheckBoxDiv = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  color: ${props => props.fontColor};

  svg {
    position: absolute;
    background: ${props => props.bgColor};
    top: 4px;
  }

  div {
    padding-left: 23px;
  }

  @media screen and (max-width: 992px) {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    margin-bottom: 25px;
  }
`

const MobileListFilter = styled.div`
  .filter-sort {
    display: none;
  }

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 80%;
    margin-right: 10px;
    .filter-sort {
      position: relative;
      width: 100%;
      display: block;
      background: ${props => props.backColor} !important;
      border: 1px solid ${props => props.borderColor};
      border-radius: 8px;
      position: relative;

      .toggle {
        background: ${props => props.mobileBackColor};
        display: flex;
        justify-content: space-between;
        border: none;
        width: 100%;
        color: ${props => props.fontColor4};
        font-size: 12px;
        line-height: 24px;
        font-weight: 400;
        padding: 0px 0px 0px 10px;
        align-items: center;

        span {
          font-weight: 500;
          padding-left: 4px;
        }

        &:after {
          display: none;
        }

        input {
          background: #f5f5f5;
          width: 100%;
          border: 0px;
        }

        img.sort-icon {
          width: 15px;
          height: 15px;
          margin-left: 6px;
          filter: ${props => props.filterColor};
        }

        img.narrow {
          position: absolute;
          right: 10px;
          top: 12px;
        }
      }

      .menu {
        width: 100%;
        padding: 4px 6px;
        background: ${props => props.bgColor};

        .item {
          padding: 10px 8px;
          border-radius: 6px;
          &:hover,
          &:active {
            background: ${props => props.hoverColor};
          }
          div {
            color: ${props => props.fontColor1};
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
            .sort-icon {
              width: 14px;
              height: 14px;
              margin-right: 4px;
              // margin-top: -2px;
              filter: ${props => props.filterColor};
            }
          }

          svg.checked {
            display: none;
          }
        }

        .item.active-item {
          display: flex;
          justify-content: space-between;
          background: transparent;
          svg.checked {
            display: block;
          }
        }
      }
    }
  }
`

const MobileFilterBtn = styled.div`
  border-radius: 0px 8px 8px 0px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: white;
  border: none;
  ${props =>
    props.darkmode === 'true'
      ? `
    border-left: 1px solid ${props.inputBorderColor};
  `
      : `
  `}

  @media screen and (max-width: 992px) {
    padding: 10px 18px;
  }
`

const DropdownRow = styled.div`
  display: flex;
  width: fit-content;
  justify-content: space-between;
  align-items: center;
`

export {
  QuickFilterContainer,
  DropdownRow,
  InputsContainer,
  Counter,
  UserDropDown,
  UserDropDownItem,
  UserDropDownMenu,
  DivWidth,
  ChainButton,
  ClearFilter,
  WebView,
  MobileView,
  FarmButtonPart,
  Filtersinput,
  FarmFiltersPart,
  MobileClearFilter,
  MobileListHeaderSearch,
  BoostBtn,
  FarmFilter,
  FilterOffCanvas,
  FilterOffCanvasHeader,
  FilterOffCanvasBody,
  ChainATag,
  BadgeText,
  CamelotButton,
  SpecButtons,
  ChainGroup,
  SwitchBalanceButton,
  SpecDropDown,
  SpecDropDownMenu,
  SpecDropDownItem,
  TrendDropDown,
  TrendDropDownMenu,
  TrendDropDownItem,
  ApplyFilterBtn,
  CheckBoxDiv,
  MobileFilterBtn,
  MobileListFilter,
}
