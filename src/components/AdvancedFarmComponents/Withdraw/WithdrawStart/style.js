import styled from 'styled-components'

const SelectTokenWido = styled.div`
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
  padding: 8px;
  background: #5dcf46;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  justify-content: center;
`

const ImgBtn = styled.img`
  cursor: pointer;
  transition: 0.25s;
  margin-right: 8px;
  margin-top: -10px;
`

const AnimateDotDiv = styled.div`
  display: block;
`

const NewLabel = styled.div`
  ${props =>
    props.$textalign
      ? `
    text-align: ${props.$textalign};
  `
      : ''}
  ${props =>
    props.$width
      ? `
    width: ${props.$width};
  `
      : ''}
  ${props =>
    props.$cursortype
      ? `
    cursor: ${props.$cursortype};
  `
      : ''}
  ${props =>
    props.$padding
      ? `
    padding: ${props.$padding};
  `
      : ''}
  ${props =>
    props.$height
      ? `
    line-height: ${props.$height};
  `
      : ''}
  ${props =>
    props.$size
      ? `
    font-size: ${props.$size};
  `
      : ''}
  ${props =>
    props.$weight
      ? `
    font-weight: ${props.$weight};
  `
      : ''}
  ${props =>
    props.$align
      ? `
    text-align: ${props.$align};
  `
      : ''}
  ${props =>
    props.$justifycontent
      ? `
    justify-content: ${props.$justifycontent};
  `
      : ''}
  ${props =>
    props.$margintop
      ? `
    margin-top: ${props.$margintop};
  `
      : ''}
  ${props =>
    props.$marginbottom
      ? `
    margin-bottom: ${props.$marginbottom};
  `
      : ''}
  ${props =>
    props.$marginleft
      ? `
    margin-left: ${props.$marginleft};
  `
      : ''}
  ${props =>
    props.$margin
      ? `
    margin: ${props.$margin};
  `
      : ''}
  ${props =>
    props.$display
      ? `
    display: ${props.$display};
  `
      : ''}
  ${props =>
    props.$flexflow
      ? `
    flex-flow: ${props.$flexflow};
  `
      : ''}
  ${props =>
    props.$alignself
      ? `
    align-self: ${props.$alignself};
  `
      : ''}
  ${props =>
    props.$items
      ? `
    align-items: ${props.$items};
  `
      : ''}
  ${props =>
    props.$fontcolor
      ? `
    color: ${props.$fontcolor};
  `
      : ''}
  ${props =>
    props.$gap
      ? `
    gap: ${props.$gap};
  `
      : ''}

  svg.question {
    font-size: 16px;
    color: ${props => props.$fontcolor};
    cursor: pointer;
    margin: auto 0px auto 5px;
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

  img.progressbar-img {
    width: 100%;
  }

  #min-help {
    max-width: 300px;
  }

  img.help-icon {
    margin-left: 5px;
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
    background: ${props => props.$hovercolor};
  }

  &:active {
    background: #46eb25;
  }
`

const SlippageBtn = styled.button`
  &&& {
    background: ${props => props.$bgcolor};
    border: none;
    border-radius: 8px;
    padding: 11px;
    align-items: center;
    color: ${props => props.$fontcolor};
    font-size: 14px;
    line-height: 20px;
    width: 60%;
    cursor: ${props => props.$cursor};

    &:hover {
      background: ${props => props.$hovercolor};
    }

    &:active {
      background: ${props => props.$activecolor};
    }
  }
`

const IconArrowDown = styled.img`
  filter: ${props => props.$filtercolor};
`

const FTokenWrong = styled.div`
  border-radius: 12px;
  border: 1px solid #fec84b;
  background: #fffcf5;
  padding: 16px;
  display: ${props => (props.$isshow === 'true' ? `flex` : 'none')};
  gap: 12px 0;
  margin: 0px 24px 15px;
  justify-content: space-between;
`

const ApyValue = styled.div`
  color: ${props => props.$fontcolor};
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 16.591px;
  padding: 1.659px 8.295px 1.659px 6.636px;

  background: linear-gradient(${props => props.$bgcolor}, ${props => props.$bgcolor}) padding-box,
    linear-gradient(45deg, #cf1894, #b0229b, #e0439b, #670e78) border-box;
  border-radius: 4.148px;
  border: 1.078px solid transparent;
`

const LogoImg = styled.img`
  margin-right: -10px;
  width: 35px;

  ${props =>
    props.$zindex
      ? `
    z-index: ${props.$zindex};
  `
      : ``}
`

const SlippageBox = styled.div`
  padding: 14px 18px;
  align-items: center;
  border-radius: 8px;
  background: #ced3e6;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  margin-right: 12px;
  cursor: pointer;
`

const MiddleLine = styled.hr`
  width: ${props => props.$width};
  height: 0.5px;
  margin: auto 0px;
`

const SlipValue = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  width: 20%;
  font-weight: 600;
  text-align: center;
  color: ${props => props.$fontcolor};
  background: ${props => props.$bgcolor};
  border-right: ${props => (props.$islastchild ? 'none' : `1px solid ${props.$bordercolor}`)};
  border-radius: ${props =>
    props.$isfirstchild ? '8px 0 0 8px' : props.$islastchild ? '0 8px 8px 0' : '0'};
`

const SlippageRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid ${props => props.$bordercolor};
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`

const SlippageInput = styled.div`
  position: relative;

  input {
    border-radius: 8px;
    border: 1px solid ${props => props.$bordercolor};
    background: ${props => props.$backcolor};
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    outline: 0;
    padding: 8px 30px 8px 12px;
    color: ${props => props.$fontcolor2};
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

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
  color: ${props => props.$fontcolor2};
`

const ProgressText = styled.div`
  width: ${props => props.$width};
  padding: ${props => props.$padding};
  text-align: center;
`

const BigLogoImg = styled.img`
  z-index: 10;
  width: 37px;
  height: 37px;
  &:not(:first-child) {
    margin-left: -7px;
    ${props =>
      props.$zindex
        ? `
      z-index: ${props.$zindex};
    `
        : ``};
  }

  @media screen and (max-width: 1480px) {
    width: 25px;
    height: 25px;
  }
`

const VaultContainer = styled.div`
  padding: 15px 24px;

  .highest-vault::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(90deg, #ffd6a6 0%, #a1b5ff 48.9%, #73df88 100%);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`

const HighestVault = styled.div`
  padding: 16px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fffc;
  cursor: pointer;
  border-radius: 12px;

  &:hover {
    background: #ffffff;
  }

  .top-apy {
    position: relative;
    padding: 1.66px 8.3px 1.66px 6.64px;
  }

  .top-apy::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 4.15px;
    padding: 2px;
    background: linear-gradient(90deg, #ffd6a6 0%, #a1b5ff 48.9%, #73df88 100%);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`

const ImagePart = styled.div``

const NamePart = styled.div``

const ImageName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export {
  SelectTokenWido,
  FTokenInfo,
  FTokenDiv,
  IconCard,
  ImgBtn,
  NewLabel,
  Buttons,
  SlippageBtn,
  IconArrowDown,
  FTokenWrong,
  AnimateDotDiv,
  SlippageBox,
  MiddleLine,
  SlipValue,
  SlippageRow,
  SlippageInput,
  ProgressLabel,
  ProgressText,
  ApyValue,
  LogoImg,
  BigLogoImg,
  VaultContainer,
  HighestVault,
  ImagePart,
  NamePart,
  ImageName,
}
