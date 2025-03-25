import styled from 'styled-components'

const FTokenInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .modal-header-part {
    display: flex;
  }
`

const IconCard = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 14px;
  background: ${props => (props.bgColor ? props.bgColor : '')};
  box-shadow: 0px 1px 2px 0px #1018280d;
  justify-content: center;
  display: ${props => (props.display ? props.display : '')};
  align-items: ${props => (props.items ? props.items : '')};
`

const NewLabel = styled.div`
  font-weight: ${props => props.weight || '400'};
  font-size: ${props => props.size || '20px'};
  line-height: ${props => props.height || '0px'};
  padding-bottom: ${props => (props.paddingBottom ? props.paddingBottom : '')};
  ${props =>
    props.width
      ? `
      width: ${props.width};
  `
      : ''}
  ${props =>
    props.flexDirection
      ? `
          flex-direction: ${props.flexDirection};
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
    props.heightDiv
      ? `
    height: ${props.heightDiv};
  `
      : ''}
  
  ${props =>
    props.padding
      ? `
    padding: ${props.padding};
  `
      : ''}

  ${props =>
    props.cursorType
      ? `
    cursor: ${props.cursorType};
  `
      : ''}

  ${props =>
    props.divScroll
      ? `
    // overflow: ${props.divScroll};
    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #caf1d5;
      border-radius: 6px;
      border: none;
    }
  `
      : ''}
  img.icon {
    margin-right: 5px;
  }

  img.progressbar-img {
    width: 100%;
  }

  span.auto-slippage {
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
  }

  img.info {
    margin-left: 5px;
  }

  img {
    ${props =>
      props.darkMode
        ? 'filter: invert(100%) sepia(75%) saturate(45%) hue-rotate(145deg) brightness(119%) contrast(100%);'
        : ''}
  }

  @media screen and (max-width: 992px) {
    img.icon {
      margin-right: 5px;
    }

    img.info {
      margin-left: 5px;
    }
  }
`

const ImgBtn = styled.img`
  cursor: pointer;
`

export { FTokenInfo, NewLabel, IconCard, ImgBtn }
