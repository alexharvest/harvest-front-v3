import styled from 'styled-components'
import UsdIcon from '../../assets/images/ui/usd-port.svg'
import TokensIcon from '../../assets/images/ui/tokens-port.svg'

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
    padding: 50px 30px;
  }

  @media screen and (max-width: 992px) {
    padding: 0px 0px 25px 0px;
  }
`

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;

  @media screen and (max-width: 992px) {
    padding: ${props => (props.padding ? props.padding : '')};
    border-bottom: 1px solid ${props => props.borderColor};
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

const NewLabel = styled.div`
  font-weight: ${props => props.weight || '400'};
  font-size: ${props => props.size || '20px'};
  line-height: ${props => props.height || '0px'};

  ${props =>
    props.backColor
      ? `
    background: ${props.backColor};
  `
      : ''}
  ${props =>
    props.cursor
      ? `
    cursor: ${props.cursor};
  `
      : ''}
  ${props =>
    props.border
      ? `
    border: ${props.border};
  `
      : ''}
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
    props.margin
      ? `
    margin: ${props.margin};
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
  ${props =>
    props.transition
      ? `
    transition: ${props.transition};
    `
      : ``}

  svg.question {
    font-size: 16px;
    color: ${props => props.color};
    cursor: pointer;
    margin: auto 0px auto 5px;
  }

  span.symbol {
    position: absolute;
    color: ${props => props.fontColor2};
    font-size: 8px;
    right: 0;
    top: 13px;
  }

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

  #tooltip-token-name,
  #tooltip-balance,
  #tooltip-underlying-balance,
  #tooltip-lifetime-earning,
  #tooltip-latest-earning,
  #tooltip-total-balance,
  #tooltip-yield-estimate {
    max-width: 300px;
  }

  span {
    font-weight: 700;
  }

  span.total-days {
    font-weight: 400;
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

  a:hover {
    color: #0d6efd !important;
  }
`

const SwitchTabTag = styled.div`
  width: 50%;
  transition: 0.25s;
  color: ${props => props.color};
  background: ${props => props.backColor};
  box-shadow: ${props => props.boxShadow};
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  cursor: pointer;

  svg {
    font-size: 16px;
    margin: auto 0px;
  }

  p {
    margin-bottom: 0px;
    padding-left: 5px;
    font-size: 14px;
    line-height: 20px;
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

const EmptyImg = styled.img`
  margin: auto;
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

export {
  Container,
  HeaderWrap,
  HeaderTitle,
  FarmTitle,
  MyFarm,
  FarmPic,
  Inner,
  EmptyImg,
  ThemeMode,
  Div,
  Counter,
  Status,
  NewLabel,
  SwitchTabTag,
}
