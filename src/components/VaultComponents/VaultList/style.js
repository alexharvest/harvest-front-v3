import styled from 'styled-components'
import UsdIcon from '../../../assets/images/ui/usd.svg'
import TokensIcon from '../../../assets/images/ui/tokens.svg'

const Container = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
  padding: 50px 100px 50px;
  width: 100%;
  position: relative;

  @media screen and (min-width: 1921px) {
    width: 1450px;
  }

  @media screen and (max-width: 1480px) {
    width: 100%;
    padding: 50px 30px;
  }

  @media screen and (max-width: 992px) {
    padding: 25px 0px 0px 0px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 27px 24px 27px 24px;
  color: ${props => props.fontColor};
  border-bottom: 1px solid ${props => props.borderColor};

  img.sort-icon {
    filter: ${props => props.filterColor};
  }

  transition: 0.25s;

  @media screen and (max-width: 1480px) {
    padding: 17px 24px 17px 24px;
  }

  @media screen and (max-width: 1280px) {
    padding: 12px 24px 12px 24px;
  }

  @media screen and (max-width: 992px) {
    display: none;
  }
`

const HeaderCol = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent || 'end'};
  align-items: center;
  width: ${props => props.width || 'auto'};
  text-align: ${props => props.textAlign || 'center'};
  margin: ${props => props.margin || 'unset'};
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;

  img.sort-icon {
    margin-left: 10px;
  }

  .hoverable {
    &:hover {
      cursor: pointer;
      color: #ff9400;
    }
  }

  @media screen and (max-width: 1480px) {
    font-size: 12px;
    line-height: 16px;
  }

  @media screen and (max-width: 1280px) {
    font-size: 8px;
    line-height: 12px;
  }
`

const FlexDiv = styled.div`
  display: flex;
`

const EmptyPanel = styled.div`
  color: ${props => props.fontColor};
  padding-top: 10%;
  padding-bottom: 30%;
  @media screen and (max-width: 992px) {
    padding-top: 70px;
  }
`

const EmptyImg = styled.img`
  margin: auto;
`

const EmptyInfo = styled.div`
  ${props =>
    props.weight
      ? `
    font-weight: ${props.weight};
  `
      : ''}
  ${props =>
    props.size
      ? `
    font-size: ${props.size}px;
  `
      : ''}
  ${props =>
    props.height
      ? `
    line-height: ${props.height}px;
  `
      : ''}
  color: ${props => props.fontColor};
  ${props =>
    props.marginTop
      ? `
    margin-top: ${props.marginTop};
  `
      : ''}

  text-align: center;
`

const VaultsListBody = styled.div`
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background: ${props => props.backColor};
  transition: 0.25s;
  border: 1px solid ${props => props.borderColor};
  border-radius: 5px;
`

const MobileListFilter = styled.div`
  .filter-sort {
    display: none;
  }

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px 10px;
    border-bottom: 1px solid ${props => props.borderColor};
    .filter-sort {
      position: relative;
      width: 100%;
      display: block;
      background: ${props => props.mobileBackColor} !important;
      border: 1px solid ${props => props.borderColor};
      border-radius: 8px;

      .toggle {
        background: ${props => props.mobileBackColor};
        display: flex;
        justify-content: space-between;
        border: none;
        width: 100%;
        color: ${props => props.fontColor4};
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
        padding: 0px 0px 0px 10px;
        align-items: center;

        span {
          font-weight: 600;
          padding-left: 4px;
        }

        &:after {
          display: none;
        }

        input {
          background: #f5f5f5;
          width: 100%;
          border: 0px;
        }

        img.sort-icon {
          width: 15px;
          height: 15px;
          margin-left: 6px;
          filter: ${props => props.filterColor};
        }

        img.narrow {
          position: absolute;
          right: 10px;
          top: 12px;
        }
      }

      .menu {
        width: 100%;
        padding: 4px 6px;
        background: ${props => props.bgColor};

        .item {
          padding: 10px 8px;
          border-radius: 6px;
          &:hover,
          &:active {
            background: ${props => props.hoverColor};
          }
          div {
            color: ${props => props.fontColor1};
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
            .sort-icon {
              width: 14px;
              height: 14px;
              margin-right: 4px;
              margin-top: -2px;
              filter: ${props => props.filterColor};
            }
          }

          img.checked {
            display: none;
          }
        }

        .item.active-item {
          display: flex;
          justify-content: space-between;
          background: transparent;
          img.checked {
            display: block;
          }
        }
      }
    }
  }
`

const Filtersinput = styled.input`
  background: #ffffff;
  border: 0px;
  outline: 0;
  border-radius: 5px;
  color: #888e8f;
  padding: 12px 20px 12px 32px;
  width: 80%;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;

  &:active {
    border: 0px;
  }
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
      background: ${props => props.backColor};
      border: 1px solid ${props => props.borderColor};
      height: 24px;
      width: 50px;
      border-radius: 30px;
      transition: all 0.2s ease 0s;
    }
    .switch-thumb {
      background: url(${props => (props.mode === 'usd' ? UsdIcon : TokensIcon)});
      background-size: cover;
      height: 22px;
      left: 1px;
      position: absolute;
      top: 1px;
      width: 22px;
      border-radius: 50%;
      transition: all 0.25s ease 0s;
    }

    &:hover .switch-thumb {
      box-shadow: 0 0 2px 3px #ff9400;
    }
  }

  ${props =>
    props.mode === 'token'
      ? `
      #theme-switch {
        .switch-check {
          opacity: 1;
        }
        .switch-x {
          opacity: 0;
        }
        .switch-thumb {
          left: 27px;
        }
      }
    `
      : `
      
    `}
`

const MobileFilterBtn = styled.div`
  border-radius: 0px 8px 8px 0px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: white;
  border: none;
  ${props =>
    props.darkmode === 'true'
      ? `
    border-left: 1px solid ${props.inputBorderColor};
  `
      : `
  `}

  @media screen and (max-width: 992px) {
    padding: 10px 18px;
  }
`

const DisplayCount = styled.div`
  font-size: 12px;
  line-height: 20px;
  font-weight: 300;
  color: ${props => props.color};
  margin-bottom: 15px;

  span {
    font-weight: 500;
  }

  @media screen and (max-width: 992px) {
    color: ${props => (props.mobileColor ? props.mobileColor : '')};
    padding-left: 15px;
  }
`

export {
  Container,
  Header,
  HeaderCol,
  EmptyPanel,
  EmptyImg,
  EmptyInfo,
  FlexDiv,
  VaultsListBody,
  MobileListFilter,
  Filtersinput,
  ThemeMode,
  MobileFilterBtn,
  DisplayCount,
}
