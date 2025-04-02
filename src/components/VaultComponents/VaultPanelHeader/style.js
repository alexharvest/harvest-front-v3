import styled from 'styled-components'
import { Modal } from 'react-bootstrap'

const PanelContainer = styled.a`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid ${props => props.borderColor};
  cursor: pointer;
  color: ${props => props.fontColor};
  text-decoration: none;

  &:hover {
    color: ${props => props.fontColor};
  }

  @media screen and (max-width: 992px) {
    flex-direction: row;
    align-items: baseline;
    position: relative;
    padding: 10px 25px;
    justify-content: space-between;
  }
`

const TokenLogo = styled.img`
  max-width: 30px;
  float: left;

  @media screen and (max-width: 992px) {
    margin-left: 0;
  }
`

const TokenNameContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.fontColor1};

  @media screen and (max-width: 1480px) {
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 992px) {
    font-size: 11px;
    margin-bottom: 8px;
  }
`

const TokenDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  small {
    font-size: 14px;
  }

  @media screen and (max-width: 1480px) {
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
  }
  @media screen and (max-width: 992px) {
    font-size: 11px;
  }
`

const RewardsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${props => props.fontColor1};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  span {
    font-size: 20px;

    @media screen and (max-width: 1480px) {
      font-size: 16px;
    }
  }

  b {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.boost-apy {
    font-weight: 600;
    display: flex;

    div.boost-img {
      margin: auto 0px auto 5px;

      img {
        width: 16px;
        margin-top: -2px;

        @media screen and (max-width: 992px) {
          margin-top: -4px;
        }
      }
    }
  }
`

const ValueContainer = styled.div`
  font-weight: 500;
  width: ${props => props.width || 'auto'};
  min-width: ${props => props.minWidth || 'auto'};
  text-align: ${props => props.textAlign || 'center'};
  display: flex;
  justify-content: start;
  ${props => (props.textAlign === 'left' ? `justify-content: start;` : '')}
  padding-right: ${props => props.paddingRight || '0px'};
  padding-left: ${props => props.paddingLeft || '0px'};

  .tag {
    display: none;
    position: absolute;
    left: 53px;
    top: 31px;
  }

  ${props =>
    props.position
      ? `
    position: ${props.position};
  `
      : ''}
`

const LogoImg = styled.img`
  z-index: 10;
  width: 37px;
  height: 37px;
  &:not(:first-child) {
    margin-left: -7px;
    ${props =>
      props.zIndex
        ? `
      z-index: ${props.zIndex};
    `
        : ``};
  }

  @media screen and (max-width: 1480px) {
    width: 25px;
    height: 25px;
  }
`

const BadgeIcon = styled.div`
  position: absolute;
  top: 26px;
  left: 24px;
  width: 23px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 992px) {
    position: inherit;
    border: none;
    width: 13.096px;
    height: 13.096px;
    margin: auto 5px auto 0px;
    img {
      padding: 1.708px 1.706px 1.709px 1.71px;
      width: 13px;
      height: 13px;
    }
  }
`

const TokenLogoContainer = styled.div`
  width: ${props => (props.width ? props.width : 'auto')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-right: 5px;
  text-align: left;
  position: relative;

  @media screen and (max-width: 992px) {
    margin-top: 8px;
  }
`

const TooltipText = styled.div`
  font-weight: normal;
  width: ${props => props.width || 'auto'};
  text-align: ${props => props.textAlign || 'unset'};
`

const NewBadge = styled.img`
  position: absolute;
  top: -4px;
  left: -4px;
  width: 35px;
  height: 35px;
`

const AdditionalBadge = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 5px;
`

const ArrowContainer = styled.div`
  padding: 0px 5.4px;
  background: ${props => (props.open ? '#f2b435' : '#FFFCE6')};
  border-radius: 4px;
  margin-right: 5px;

  svg {
    width: 9px;
    height: 9px;
    transition: 0.25s;
    transform: ${props => (props.open ? 'rotate(-180deg)' : 'unset')};

    path {
      fill: ${props => (props.open ? '#4C351B' : '#F2B435')};
    }
  }
`

const MobileVaultInfoContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  align-items: end;
  gap: 4px;
`

const MobileVaultValueContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: baseline;
  line-height: 2;
  font-size: 11px;

  * {
    font-size: 11px !important;
  }

  div {
    font-weight: bold;
  }

  img {
    width: 12px;
    height: 12px;
  }

  .title {
    img {
      margin-left: 7px;
      margin-top: -2px;
      filter: ${props => props.filterColor};
    }
  }
`

const ApyInfo = styled.img`
  margin-top: 4px;
  width: 15px;
  height: 15px;
`

const FlexDiv = styled.div`
  ${props =>
    props.alignSelf
      ? `
    align-self: ${props.alignSelf};
  `
      : ''}
  ${props =>
    props.paddingBottom
      ? `
        padding-bottom: ${props.paddingBottom};
      `
      : ''}
  ${props =>
    props.width
      ? `
    width: ${props.width};
  `
      : 'width: auto;'}
  ${props =>
    props.marginRight
      ? `
    margin-right: ${props.marginRight};
  `
      : ''}

  .tag {
    display: none;
    position: absolute;
    left: 6px;
  }
  &.token-icons {
    display: flex;
    margin: auto 0px auto 5px;
    img {
      position: relative;
    }
  }
  &.token-symbols {
    img {
      margin-left: -4px;
    }
    img:first-child {
      margin-left: 0px;
    }
  }
`

const DetailModal = styled(Modal)`
  display: none;
  position: relative;

  @media screen and (max-width: 992px) {
    .modal-dialog {
      width: -webkit-fill-available;
      position: absolute;
      bottom: 0;
      margin: 0;
      .modal-content {
        border-radius: 20px 20px 0 0;
      }
    }
  }

  @media (min-width: 576px) {
    .modal-dialog {
      max-width: unset;
    }
  }
`
const Value = styled.div`
  color: ${props => props.fontColor1};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`

const BadgePlatform = styled.div`
  display: flex;
  justify-content: space-between;
  width: fit-content;
`

const Autopilot = styled.div`
  display: flex;
  flex-flow: row;
  border-radius: 13px;
  justify-content: space-between;
  align-items: center;
  background: #ecfdf3;
  color: #5dcf46;
  padding: 3px 10px;
  gap: 5px;
`

const NewLabel = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
`

export {
  PanelContainer,
  BadgePlatform,
  TokenLogo,
  RewardsContainer,
  TokenLogoContainer,
  ValueContainer,
  NewBadge,
  AdditionalBadge,
  TooltipText,
  ArrowContainer,
  TokenNameContainer,
  MobileVaultInfoContainer,
  MobileVaultValueContainer,
  TokenDescriptionContainer,
  ApyInfo,
  BadgeIcon,
  FlexDiv,
  DetailModal,
  Value,
  LogoImg,
  Autopilot,
  NewLabel,
}
