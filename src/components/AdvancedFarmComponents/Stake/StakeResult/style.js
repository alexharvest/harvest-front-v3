import styled from 'styled-components'

const Section = styled.div`
  transition: 0.25s;
  padding: 16px 15px 24px;

  ${props =>
    props.$show
      ? `
    display: block;
  `
      : 'display: none;'}

  @media screen and (max-width: 992px) {
    padding: 12px 12px 18px;
  }
`

const ImgBtn = styled.img`
  cursor: pointer;
  transition: 0.25s;

  @media screen and (max-width: 992px) {
    width: 17px;
    height: 16px;
  }
`

const NewLabel = styled.div`
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
    align-items: ${props.$align};
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
    props.$marginright
      ? `
    margin-right: ${props.$marginright};
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
    props.$display
      ? `
    display: ${props.$display};
  `
      : ''}
  ${props =>
    props.$items
      ? `
    align-items: ${props.$items};
  `
      : ''}
  ${props =>
    props.$padding
      ? `
    padding: ${props.$padding};
  `
      : ''}
  ${props =>
    props.$fontcolor
      ? `
    color: ${props.$fontcolor};
  `
      : ''}
  ${props =>
    props.$cursortype
      ? `
    cursor: ${props.$cursortype};
  `
      : ''}
  ${props =>
    props.$width
      ? `
    width: ${props.$width};
  `
      : ''}
  img.help-icon {
    margin-left: 5px;
    cursor: pointer;
  }

  @media screen and (max-width: 992px) {
    img.help-icon {
      width: 12px;
      height: 12px;
    }
  }
`

const Buttons = styled.button`
  border: 1px solid #000;
  background: #000;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: white;
  border-radius: 8px;
  padding: 10px 18px;
  align-items: center;
  width: 100%;

  &:hover {
    background: #000000d0;
  }

  @media screen and (max-width: 992px) {
    padding: 7px 14px;
  }
`

const FTokenInfo = styled.div`
  border-radius: 12px;
  border: 1px solid #6ce9a6;
  background: #f6fef9;
  padding: 16px;
  display: ${props => (props.$isshow === 'true' ? `flex` : 'none')};
  justify-content: space-between;
  gap: 12px 0;

  @media screen and (max-width: 992px) {
    padding: 12px;
    margin-top: 12px;
  }
`

const IconCard = styled.div`
  border-radius: 8px;
  border: 1px solid #eaecf0;
  background: #fff;

  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  padding: 8px 8.5px 8px 7.5px;
  justify-content: center;
  align-items: center;
`

export { Section, ImgBtn, NewLabel, Buttons, FTokenInfo, IconCard }
