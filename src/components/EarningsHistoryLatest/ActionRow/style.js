import styled from 'styled-components'

const DetailView = styled.div`
  width: 100%;
  padding: 15px 25px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: ${props => props.$hovercolor};
  }

  @media screen and (max-width: 1100px) {
    padding: 10px 15px;
  }

  @media screen and (max-width: 992px) {
    padding: 0px;
    border-bottom: 1px solid ${props => props.$bordercolor};

    &:first-child {
      border-top: 1px solid ${props => props.$bordercolor};
    }
  }
`

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  width: ${props => (props.$width ? props.$width : 'auto')};
  padding: ${props => (props.$padding ? props.$padding : 'unset')};

  @media screen and (max-width: 992px) {
    ${props =>
      props.$display
        ? `
      display: ${props.$display};
    `
        : ``};
  }
`

const NewLabel = styled.div`
  font-weight: ${props => props.$weight || '400'};
  font-size: ${props => props.$size || '20px'};
  line-height: ${props => props.$height || '0px'};

  ${props =>
    props.$borderbottom
      ? `
    border-bottom: ${props.$borderbottom};
  `
      : ''}
  ${props =>
    props.$fontcolor
      ? `
    color: ${props.$fontcolor};
  `
      : ''}
  ${props =>
    props.$position
      ? `
    position: ${props.$position};
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
    props.$margin
      ? `
    margin: ${props.$margin};
  `
      : ''}
  ${props =>
    props.$margintop
      ? `
    margin-top: ${props.$margintop};
  `
      : ''}
  ${props =>
    props.$marginleft
      ? `
    margin-left: ${props.$marginleft};
  `
      : ''}
  ${props =>
    props.$marginbottom
      ? `
    margin-bottom: ${props.$marginbottom};
  `
      : ''}
  ${props =>
    props.$marginright
      ? `
    margin-right: ${props.$marginright};
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
    props.$self
      ? `
    align-self: ${props.$self};
  `
      : ''}
  ${props =>
    props.$padding
      ? `
    padding: ${props.$padding};
  `
      : ''}
  ${props =>
    props.$width
      ? `
    width: ${props.$width};
  `
      : ''}
  ${props =>
    props.$borderradius
      ? `
    border-radius: ${props.$borderradius};
    `
      : ``}
`

const Content = styled.div`
  width: ${props => props.$width};
  ${props =>
    props.$display
      ? `
    display: ${props.$display};
  `
      : ``}
  ${props =>
    props.$cursor
      ? `
    cursor: ${props.$cursor};
  `
      : ''}
  ${props =>
    props.$marginleft
      ? `
    margin-left: ${props.$marginleft};
  `
      : ''}
  ${props =>
    props.$paddingright
      ? `
    padding-right: ${props.$paddingright};
  `
      : ''}
  ${props =>
    props.$margintop
      ? `
    margin-top: ${props.$margintop};
  `
      : ''}
  ${props =>
    props.$flexdirection
      ? `
    flex-direction: ${props.$flexdirection};
  `
      : ''}
  ${props =>
    props.$alignitems
      ? `
    align-items: ${props.$alignitems};
  `
      : ''}
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  align-self: center;

  #harvest-event-minus {
    max-width: 300px;
  }

  &.mobile-extender {
    width: unset;
    position: absolute;
    top: 2.5%;
    right: 3%;

    img.file-icon {
      padding: 6px;
    }

    img.active-file-icon {
      padding: 6px;
    }
  }

  div.timestamp {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    color: ${props => props.$fontcolor};

    @media screen and (max-width: 992px) {
      font-size: 12px;
    }
  }

  img.file-icon {
    padding: 4px;
    background: ${props => props.$backcolor};
    border-radius: 4.7px;
    border: 1px solid ${props => props.$bordercolor};
  }

  img.active-file-icon {
    background: ${props => props.$bgcolorbutton};
    padding: 4px;
    border-radius: 4.7px;
    border: 1px solid ${props => props.$bordercolor};
  }

  img.active-file-icon:hover {
    background: ${props => props.$bgcolorbutton};
  }

  img.file-icon:hover {
    background: ${props => props.$bgcolorbutton};
  }
`

const NetImg = styled.div`
  margin: auto 12px auto 0px;

  @media screen and (max-width: 992px) {
    margin: auto 5px auto 0px;
  }
`

const MobileGreenBox = styled.div`
  padding: 5.35px 9.37px;
  border-radius: 5.35px;
  background: #5dcf46;
  display: flex;
  width: fit-content;

  img {
    margin-right: 5px;
    width: 13px;
  }
`

const BadgePart = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 5px;
  align-items: center;

  img.network {
    margin-right: 5px;
  }
`

const Autopilot = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 13px;
  background: #ecfdf3;
  color: #5dcf46;
  padding: 3px 10px;
  margin-left: 5px;
  width: 85px;
`

export { DetailView, FlexDiv, Content, NetImg, NewLabel, MobileGreenBox, BadgePart, Autopilot }
