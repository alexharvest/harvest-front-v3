import styled from 'styled-components'

const DetailView = styled.div`
  width: 100%;
  padding: 16px 24px;
  cursor: pointer;
  background: ${props => props.$background};
  border: 1px solid ${props => props.$bordercolor};
  border-top: 0px;
  border-radius: ${props => (props.$lastitem ? `0 0 12px 12px` : ``)};
  ${props =>
    props.$mode === 'dark'
      ? `
        ${props.$lastelement === 'yes' ? '' : ''}
      `
      : `
        ${props.$lastelement === 'yes' ? `` : ``}
  `}
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
      : ``};
  ${props =>
    props.$cursor
      ? `
      cursor: ${props.$cursor};
  `
      : ''};
  ${props =>
    props.$marginleft
      ? `
    margin-left: ${props.$marginleft};
  `
      : ''};
  ${props =>
    props.$margintop
      ? `
    margin-top: ${props.$margintop};
  `
      : ''};
  ${props =>
    props.$padding
      ? `
        padding: ${props.$padding};
      `
      : ''};
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

const ContentInner = styled.div`
  ${props =>
    props.$width
      ? `
    width: ${props.$width}
  `
      : ``};
  ${props =>
    props.$justifycontent
      ? `
        justify-content: ${props.$justifycontent};
      `
      : ''}
  ${props =>
    props.$display
      ? `
    display: ${props.$display};
  `
      : ''};
  ${props =>
    props.$marginleft
      ? `
    margin-left: ${props.$marginleft};
  `
      : ''};
  ${props =>
    props.$fontsize
      ? `
        font-size: ${props.$fontsize};
      `
      : '12px'};
  ${props =>
    props.$padding
      ? `
            padding: ${props.$padding};
          `
      : ''};
  ${props =>
    props.$flexdirection
      ? `
            flex-direction: ${props.$flexdirection};
              `
      : ''};
  font-weight: 400;
  line-height: 20px;
  align-self: center;

  img.eyeIcon {
    cursor: pointer;
  }
`

const TopFiveText = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  color: ${props => props.$fontcolor};
`
const MobileGranularBlock = styled.div`
  width: 100%;
  padding-right: ${props => (props.$paddingright ? props.$paddingright : '')};
`

export { DetailView, FlexDiv, Content, ContentInner, TopFiveText, MobileGranularBlock }
