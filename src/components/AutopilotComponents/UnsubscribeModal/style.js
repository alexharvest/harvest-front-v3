import styled from 'styled-components'
import Plus from '../../../assets/images/logos/beginners/plus.svg'
import Minus from '../../../assets/images/logos/beginners/minus.svg'

const BaseSection = styled.div`
  transition: 0.25s;
`

const FTokenInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const FTokenDiv = styled.div`
  display: flex;
  gap: 16px;
`

const IconCard = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 9px;
  background: #5dcf46;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  justify-content: center;

  img {
    margin: 4px auto 0px auto;
    filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(102deg) brightness(107%) contrast(101%);
  }
`

const NewLabel = styled.div`
  ${props =>
    props.weight
      ? `
      font-weight: ${props.weight};
  `
      : ''}
  ${props =>
    props.size
      ? `
      font-size: ${props.size};
  `
      : ''}
  ${props =>
    props.height
      ? `
      line-height: ${props.height};
  `
      : ''}
  ${props =>
    props.padding
      ? `
    padding: ${props.padding};
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
    props.margin
      ? `
    margin: ${props.margin};
  `
      : ''}
  ${props =>
    props.display
      ? `
    display: ${props.display};
  `
      : ''}
  ${props =>
    props.flexFlow
      ? `
    flex-flow: ${props.flexFlow};
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
    props.widthDiv
      ? `
    width: ${props.widthDiv};
  `
      : ''}
  ${props =>
    props.border
      ? `
      border: ${props.border};
  `
      : ''}
  ${props =>
    props.borderRadius
      ? `
      border-radius: ${props.borderRadius};
  `
      : ''}

  span {
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
  }

  img.progressbar-img {
    width: 100%;
  }

  img.icon {
    margin-right: 10px;
  }

  img.info {
    margin-left: 10px;
  }

  img.info-icon {
    margin-right: 10px;
  }

  @media screen and (max-width: 992px) {
    img.icon {
      margin-right: 5px;
    }

    img.info {
      margin-left: 5px;
    }

    img.info-icon {
      width: 16px;
    }
  }
`

const TokenInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const TokenAmount = styled.input`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: #fff;
  border: 1px solid #d0d5dd;
  outline: 0;
  padding: 10px 55px 10px 14px;
  border-radius: 8px;
  color: #344054;
  transition: 0.25s;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  @media screen and (max-width: 992px) {
    font-size: 10px;
    line-height: 18px;
    padding: 7px 10px;
  }
`

const TokenSelect = styled.button`
  background: white;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  transition: 0.25s;

  border-radius: 8px;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  color: #344054;

  display: flex;
  align-items: center;

  &:hover {
    background: rgba(203, 203, 203, 0.7);
  }

  img.logo {
    margin-right: 8px;
  }

  span {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 4px;
  }

  @media screen and (max-width: 992px) {
    font-size: 10px;
    line-height: 18px;
    padding: 7px 10px;

    img.logo {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }

    img.dropdown-icon {
      width: 15px;
      height: 16px;
    }
  }
`

const BalanceInfo = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #475467;
  margin-top: 5px;
  cursor: pointer;

  width: fit-content;

  span {
    margin-left: 6px;
    transition: 0.25s;
  }

  @media screen and (max-width: 992px) {
    font-size: 10px;
    line-height: 15px;
    margin-top: 3px;
  }
`

const DepoTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin: 4px 0 20px;
  color: #475467;

  @media screen and (max-width: 992px) {
    font-size: 10px;
    line-height: 15px;
    margin: 0 0 15px;
  }
`

const AmountSection = styled.div`
  width: 100%;
`

const ThemeMode = styled.div`
  display: flex;
  align-items: center;

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
      background: #000;
      border: 1px solid ${props => props.borderColor};
      height: 16px;
      width: 32px;
      border-radius: 30px;
      transition: all 0.2s ease 0s;
    }
    .switch-thumb {
      background-size: cover;
      background-repeat: no-repeat;
      background-color: white;
      height: 14px;
      left: 1px;
      position: absolute;
      top: 1px;
      width: 14px;
      border-radius: 50%;
      transition: all 0.25s ease 0s;
    }

    &:hover .switch-thumb {
      box-shadow: 0 0 2px 3px #ff9400;
    }
  }

  ${props =>
    props.mode === 'deposit'
      ? `
      #theme-switch {
        .switch-check {
          opacity: 1;
        }
        .switch-x {
          opacity: 0;
        }
        .switch-thumb {
          left: 16px;
          background-image: url(${Plus});
        }
      }
    `
      : `
      #theme-switch {
        .switch-thumb {
          background-image: url(${Minus});
        }
      }
    `}

  @media screen and (max-width: 992px) {
    #theme-switch {
      .switch-track {
        width: 24px;
        height: 12px;
      }

      .switch-thumb {
        width: 10px;
        height: 10px;
        top: 1px;
      }
    }

    ${props =>
      props.mode === 'deposit'
        ? `
        #theme-switch {
          .switch-thumb {
            left: 12px;
          }
      `
        : `
        #theme-switch {
        .switch-thumb {
          left: 2px;
        }
      `}
  }
`

const InsufficientSection = styled.div`
  border-radius: 12px;
  border: 1px solid #d0d5dd;
  background: #fcfcfd;
  padding: 16px;
  ${props =>
    props.isShow === 'true'
      ? `
    display: flex;
    justify-content: space-between;
  `
      : `
    display: none;
  `}
  margin-top: 20px;

  @media screen and (max-width: 992px) {
    padding: 10px;
    margin-top: 14px;
  }
`

const CloseBtn = styled.img`
  cursor: pointer;

  @media screen and (max-width: 992px) {
    width: 17px;
    height: 16px;
  }
`

const FTokenWrong = styled.div`
  border-radius: 12px;
  border: 1px solid #fec84b;
  background: #fffcf5;
  padding: 16px;
  display: ${props => (props.isShow === 'true' ? `flex` : 'none')};
  gap: 12px 0;
  margin: 10px 24px;
  justify-content: space-between;
`

const ImgBtn = styled.img`
  cursor: pointer;
  transition: 0.25s;
  margin-right: 8px;
`

const AmountInputSection = styled.div`
  position: relative;

  button.max-btn {
    position: absolute;
    right: 14px;
    top: 12px;
    border: none;
    background: none;
    font-size: 14px;
    font-weight: 300;
    line-height: 20px;
    color: #000;
  }

  @media screen and (max-width: 992px) {
    button.max-btn {
      right: 5px;
      top: 9px;
      font-size: 10px;
      line-height: 15px;
    }
  }
`

const SwitchTabTag = styled.div`
  width: 49%;
  transition: 0.25s;
  color: ${props => props.color};
  background: ${props => props.backColor};
  box-shadow: ${props => props.boxShadow};
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  ${props =>
    props.num === 0
      ? `
        filter: invert(52%) sepia(10%) saturate(1357%) hue-rotate(194deg) brightness(90%) contrast(95%);
      `
      : ``}

  p {
    margin-bottom: 0px;
    padding-left: 5px;
    font-size: 14px;
  }
`

const ProgressLabel = styled.div`
  display: flex;
  color: ${props => props.fontColor2};
`

const ProgressText = styled.div`
  width: ${props => props.width};
  padding: ${props => props.padding};
  text-align: center;
`

export {
  FTokenInfo,
  FTokenDiv,
  IconCard,
  BaseSection,
  NewLabel,
  TokenAmount,
  TokenInfo,
  TokenSelect,
  BalanceInfo,
  DepoTitle,
  AmountSection,
  ThemeMode,
  InsufficientSection,
  CloseBtn,
  FTokenWrong,
  ImgBtn,
  AmountInputSection,
  SwitchTabTag,
  ProgressLabel,
  ProgressText,
}
