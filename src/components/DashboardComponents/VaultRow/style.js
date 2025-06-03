import styled from 'styled-components'

const DetailView = styled.a`
  width: 100%;
  cursor: pointer;
  background: ${props => props.$background};
  transition: 0.25s;
  text-decoration: none;
`

const FlexDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: ${props => (props.$width ? props.$width : 'auto')};
  padding: ${props => (props.$padding ? props.$padding : 'unset')};

  &:hover {
    background: ${props => props.$hovercolor};
  }

  @media screen and (max-width: 992px) {
    border-top: 1px solid ${props => props.$bordercolor};
    border-bottom: ${props =>
      props.$lastelement === 'yes' ? `1px solid ${props.$bordercolor}` : ''};
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
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  align-self: center;

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

const BadgeIcon = styled.div`
  margin: auto 17px auto 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
  }

  &.network-badge {
    @media screen and (max-width: 992px) {
      margin: 0px 5px 0px 0px;
      display: inline-flex;
    }
  }
`
const LogoImg = styled.img`
  z-index: 10;
  width: 37px;
  height: 37px;

  ${props =>
    props.$marginleft
      ? `
    margin-left: ${props.$marginleft}
  `
      : ``};

  @media screen and (max-width: 992px) {
    width: 21px;
    height: 21px;
  }
`

const ContentInner = styled.div`
  ${props =>
    props.$width
      ? `
    width: ${props.$width}
  `
      : ``};
  ${props =>
    props.$display
      ? `
    display: ${props.$display};
  `
      : ''}
  ${props =>
    props.$marginleft
      ? `
    margin-left: ${props.$marginleft};
  `
      : ''}
  ${props =>
    props.$alignitems
      ? `
        align-items: ${props.$alignitems};
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
`

const MobileContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Autopilot = styled.div`
  display: flex;
  flex-flow: row;
  border-radius: 13px;
  justify-content: left;
  align-items: center;
  background: #ecfdf3;
  color: #5dcf46;
  padding: 3px 10px;
  gap: 5px;
  width: 85px;
`

const NewLabel = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
`

export {
  DetailView,
  FlexDiv,
  BadgeIcon,
  Content,
  LogoImg,
  ContentInner,
  MobileContentContainer,
  Autopilot,
  NewLabel,
}
