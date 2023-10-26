import styled from 'styled-components'

const SelectTokenWido = styled.div`
  border-radius: 12px;
  transition: 0.25s;
  height: 100%;
`

const CloseBtn = styled.img`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 8px;

  @media screen and (max-width: 992px) {
    width: 17px;
    height: 16px;
    top: 12px;
  }
`

const FilterInput = styled.input`
  border-radius: 8px;
  border: 1px solid var(--gray-300, #d0d5dd);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  background: #ffffff;
  height: 44px;
  width: 100%;
  padding: 15px 40px;
  outline: none;
  font-weight: 300;
  font-size: 12px;
  line-height: 23px;
  color: #667085;

  @media screen and (max-width: 992px) {
    font-size: 12px;
    line-height: 18px;
  }
`

const FTokenInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const IconCard = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 14px;
  background: #15b088;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  justify-content: center;
`

const NewLabel = styled.div`
  font-weight: ${props => props.weight || '400'};
  font-size: ${props => props.size || '20px'};
  line-height: ${props => props.height || '0px'};
  ${props =>
    props.width
      ? `
      width: ${props.width};
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
    props.divScroll
      ? `
    overflow: ${props.divScroll};
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
    margin-right: 10px;
  }

  img.info {
    margin-left: 10px;
  }

  img.info-icon {
    margin-left: 15px;
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

const Search = styled.img`
  position: absolute;
  left: 14px;
  top: 12px;

  @media screen and (max-width: 992px) {
    width: 15px;
    height: 15px;
    top: 12px;
  }
`

const NotConnectedWallet = styled.div`
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
      : 'display: none;'};
`

const ImgBtn = styled.img`
  cursor: pointer;

  @media screen and (max-width: 992px) {
    width: 17px;
    height: 16px;
  }
`

export {
  FTokenInfo,
  IconCard,
  SelectTokenWido,
  CloseBtn,
  FilterInput,
  NewLabel,
  Search,
  NotConnectedWallet,
  ImgBtn,
}