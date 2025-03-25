import styled from 'styled-components'

const SelectTokenWido = styled.div`
  transition: 0.25s;
`

const ImgBtn = styled.img`
  cursor: pointer;
  transition: 0.25s;
  margin-top: -10px;
`

const NewLabel = styled.div`
  ${props =>
    props.height
      ? `
    line-height: ${props.height};
  `
      : ''}
  ${props =>
    props.bgColor
      ? `
        background: ${props.bgColor};
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
  ${props =>
    props.size
      ? `
    font-size: ${props.size};
  `
      : ''}
  ${props =>
    props.weight
      ? `
    font-weight: ${props.weight};
  `
      : ''}
  
  ${props =>
    props.align
      ? `
    align-items: ${props.align};
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
    props.margin
      ? `
    margin: ${props.margin};
  `
      : ''}
  ${props =>
    props.marginRight
      ? `
    margin-right: ${props.marginRight};
  `
      : ''}
  ${props =>
    props.marginBottom
      ? `
    margin-bottom: ${props.marginBottom};
  `
      : ''}
  ${props =>
    props.marginLeft
      ? `
    margin-left: ${props.marginLeft};
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
    props.cursorType
      ? `
    cursor: ${props.cursorType};
  `
      : ''}
  ${props =>
    props.width
      ? `
    width: ${props.width};
  `
      : ''}
  ${props =>
    props.textAlign
      ? `
    text-align: ${props.textAlign};
  `
      : ''}
  ${props =>
    props.gap
      ? `
    gap: ${props.gap};
  `
      : ''}

  svg.question {
    font-size: 16px;
    color: ${props => props.color};
    cursor: pointer;
    margin: auto 0px auto 5px;
  }

  img.help-icon {
    margin-left: 5px;
    cursor: pointer;
  }
  img.progressbar-img {
    width: 100%;
  }

  #min-help {
    max-width: 300px;
  }

  span {
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
  }

  span.auto-slippage {
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
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
    background: ${props => props.hoverColor};
  }

  &:active {
    background: #46eb25;
  }
`

const SlippageBtn = styled.button`
  &&& {
    background: ${props => props.bgColor};
    border: none;
    border-radius: 8px;
    padding: 11px;
    align-items: center;
    color: ${props => props.color};
    font-size: 14px;
    line-height: 20px;
    width: 60%;
    cursor: ${props => props.cursor};

    &:hover {
      background: ${props => props.hoverColor};
    }

    &:active {
      background: ${props => props.activeColor};
    }
  }
`

const AnimateDotDiv = styled.div`
  display: block;
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
  padding: 8px;
  background: #5dcf46;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  justify-content: center;
`

const GotItBtn = styled.button`
  color: #edae50;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
  text-decoration-line: underline;
  border: none;
  background: none;
  padding: 0;
`

const FTokenWrong = styled.div`
  border-radius: 12px;
  border: 1px solid #fec84b;
  background: #fffcf5;
  padding: 24px;
  display: ${props => (props.isShow === 'true' ? `flex` : 'none')};
  gap: 12px 0;
  margin: 0px 24px 24px 24px;
  justify-content: space-between;
`

const SlippageBox = styled.div`
  padding: 14px 18px;
  align-items: center;
  border-radius: 8px;
  background: #ced3e6;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  margin-right: 12px;
  cursor: pointer;
  display: ${props => (props.display ? props.display : '')};
`

const MiddleLine = styled.hr`
  width: ${props => props.width};
  height: 0.5px;
  margin: auto 0px;
`

const SlipValue = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  width: 20%;
  font-weight: 600;
  text-align: center;
  color: ${props => props.color};
  background: ${props => props.bgColor};
  border-right: ${props => (props.isLastChild ? 'none' : `1px solid ${props.borderColor}`)};
  border-radius: ${props =>
    props.isFirstChild ? '8px 0 0 8px' : props.isLastChild ? '0 8px 8px 0' : '0'};
`

const SlippageRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid ${props => props.borderColor};
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`

const SlippageInput = styled.div`
  position: relative;

  input {
    border-radius: 8px;
    border: 1px solid ${props => props.borderColor};
    background: ${props => props.backColor};
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    outline: 0;
    padding: 8px 30px 8px 12px;
    color: ${props => props.fontColor2};
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: ${props => (props.size ? props.size : '')};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: textfield;
      margin: 0;
    }

    &::placeholder {
      font-style: italic;
      color: #667085;
      font-weight: 300;
    }
  }

  div.percentage {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    color: #344054;
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

const StakeIconBox = styled.img`
  width: ${props => (props.width ? props.width : '')};
  height: ${props => (props.height ? props.height : '')};
  cursor: ${props => (props.cursor ? props.cursor : '')};
`

export {
  SelectTokenWido,
  ImgBtn,
  NewLabel,
  Buttons,
  SlippageBtn,
  FTokenInfo,
  FTokenDiv,
  IconCard,
  GotItBtn,
  FTokenWrong,
  AnimateDotDiv,
  SlippageBox,
  MiddleLine,
  SlipValue,
  SlippageRow,
  SlippageInput,
  ProgressLabel,
  ProgressText,
  StakeIconBox,
}
