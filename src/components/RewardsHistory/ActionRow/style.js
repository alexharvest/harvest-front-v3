import styled from 'styled-components'

const DetailView = styled.div`
  width: 100%;
  padding: 16px 24px;
  cursor: pointer;
  background: ${props => props.$background};
  border: 1px solid ${props => props.$bordercolor};
  border-top: 0px;
  transition: 0.25s;

  &:hover {
    background: ${props => props.$hovercolor};
  }

  @media screen and (max-width: 992px) {
    padding: 0px;
    border: unset;
    border-bottom: 1px solid ${props => props.$bordercolor};
  }
`

const FlexDiv = styled.div`
  display: flex;
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

const Content = styled.div`
  width: ${props => props.$width};
  ${props =>
    props.$display
      ? `
    display: ${props.$display};
  `
      : ``}
  ${props =>
    props.$justifycontent
      ? `
    justify-content: ${props.$justifycontent};
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
    font-weight: 500;
    line-height: 18px;
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

const Badge = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: ${props => props.$fontcolor};
  border-radius: 16px;
  background: ${props => props.$bgcolor};
  display: inline-block;
  padding: 2px 8px 2px 6px;
`

export { DetailView, FlexDiv, Content, Badge, NetImg }
