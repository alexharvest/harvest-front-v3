import styled from 'styled-components'
import Plus from '../../../../assets/images/logos/beginners/plus.svg'
import Minus from '../../../../assets/images/logos/beginners/minus.svg'

const BaseWidoDiv = styled.div`
  padding: 15px 15px 10px 15px;

  &:nth-child(2) {
    padding: 10px 15px 15px 15px;
    border-top: 1px solid ${props => props.borderColor};
  }
`

const NewLabel = styled.div`
  ${props =>
    props.bg
      ? `
      background: ${props.bg};
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
    props.position
      ? `
    position: ${props.position};
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
    props.marginBottom
      ? `
    margin-bottom: ${props.marginBottom};
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
    props.padding
      ? `
    padding: ${props.padding};
  `
      : ''}
  ${props =>
    props.items
      ? `
    align-items: ${props.items};
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

  svg.question {
    font-size: 16px;
    color: ${props => props.color};
    cursor: pointer;
    margin: auto 0px auto 5px;
  }

  #min-received {
    max-width: 300px;
  }

  img.info-icon {
    margin-right: 12px;
    width: 20px;
    height: 20px;
  }

  span.token-symbol {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
  }
`

const TokenInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const TokenSelect = styled.div`
  width: 100%;
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

const TokenInput = styled.div`
  position: relative;

  input[type='text'] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }

  input[type='text']::-webkit-outer-spin-button,
  input[type='text']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const TokenUSDAmount = styled.div`
  position: absolute;
  left: 15px;
  bottom: 3px;
  font-size: 10px;
  color: ${props => props.fontColor3};
  font-weight: 400;
`

const TokenAmount = styled.input`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: ${props => props.bgColor};
  border: 1px solid ${props => props.borderColor};
  outline: 0;
  padding: 7px 14px 13px 14px;
  border-radius: 8px;
  color: ${props => props.fontColor2};
  transition: 0.25s;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }
`

const Title = styled.div`
  font-weight: 400;
  line-height: 20px;
  margin: 4px 0 20px;
  color: ${props => props.fontColor};
  font-size: 14px;
  @media screen and (max-width: 992px) {
    font-size: 12px;
  }
`

const AmountSection = styled.div`
  width: -webkit-fill-available;
  padding-right: 16px;
  min-width: 50%;
`

const BalanceInfo = styled.div`
  color: ${props => props.fontColor};
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  margin-top: 5px;
  cursor: pointer;
  width: fit-content;

  @media screen and (max-width: 992px) {
    font-size: 12px;
  }

  span {
    margin-left: 6px;
    transition: 0.25s;
  }
`

const InsufficientSection = styled.div`
  border-radius: 12px;
  border: 1px solid ${props => props.activeColor};
  background: ${props => props.bgColorMessage};
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
`

const HasErrorSection = styled.div`
  border-radius: 12px;
  border: 1px solid ${props => props.activeColor};
  background: ${props => props.bgColorMessage};
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
`

const FlexDiv = styled.div`
  display: flex;
`

const CloseBtn = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`

const CreditCardBox = styled.div`
  border-radius: 10px;
  border: 1px solid var(--gray-200, #eaecf0);
  background: var(--base-white, #fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  padding: 12px;
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

const TokenSelectSection = styled.div`
  max-width: 50%;
`

export {
  BaseWidoDiv,
  NewLabel,
  TokenAmount,
  TokenInfo,
  TokenInput,
  TokenUSDAmount,
  TokenSelect,
  Title,
  AmountSection,
  BalanceInfo,
  InsufficientSection,
  CloseBtn,
  CreditCardBox,
  ThemeMode,
  TokenSelectSection,
  SwitchTabTag,
  HasErrorSection,
  FlexDiv,
}
