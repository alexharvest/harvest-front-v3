import styled from 'styled-components'

const TransactionDetails = styled.div`
  width: 100%;
  border-radius: 15px;
  transition: 0.25s;

  @media screen and (max-width: 992px) {
    height: ${props => props.hasData};
  }
`

const TableContent = styled.div`
  @media screen and (max-width: 992px) {
    // overflow-x: scroll;
    ${props =>
      props.count === 0
        ? `
        border-radius: unset;
        border: none;
    `
        : ``}
  }
`

const HistoryPagination = styled.div`
  margin-top: 25px;

  ul.paginate-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    list-style: none;
    padding: 12px 24px 16px 24px;
    margin-bottom: 0px;
    gap: 5px;
  }

  li.previous,
  li.next {
    border-radius: 8px;
    border: 1px solid ${props => props.borderColor};
    background: ${props => props.bgColor};
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    display: flex;
    padding: 8px 14px;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  li.paginate-item {
    margin: auto 0px;
  }

  li.break {
    margin: auto 0px;
  }

  li.previous a,
  li.next a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${props => props.fontColor2};
  }

  li.previous a svg,
  li.next a svg {
    margin-top: -2px;
  }

  a.paginate-item-link {
    text-decoration: none;
    color: ${props => props.fontColor};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  li.disabled a {
    color: #b2b2b2;
  }

  li.selected a {
    color: #1d2939;
    background: #f9fafb;
  }
`

const Header = styled.div`
  width: 100%;
  padding: 12px 24px;
  background: ${props => props.backColor};
  display: flex;
  border: 1px solid ${props => props.borderColor};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  @media screen and (max-width: 992px) {
    border-radius: 0px;
    border: unset;
    border-bottom: 1px solid ${props => props.borderColor};
  }
`

const Column = styled.div`
  width: ${props => props.width};
  color: ${props => props.color};
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  justify-content: start;
  ${props => (props.display ? `display: ${props.display}` : '')};
  ${props => (props.justifyContent ? `justify-content: ${props.justifyContent}` : '')};
`

const Col = styled.div`
  display: flex;
  cursor: pointer;
  width: fit-content;
  @media screen and (max-width: 1200px) {
    flex-flow: column;
  }

  img.sortIcon {
    width: 8.8px;
    height: 10.5px;
    margin: auto 0px auto 5px;
    @media screen and (max-width: 1200px) {
      margin: auto;
    }
  }

  img.info {
    margin-right: 3px;
    margin-left: 0px;
  }

  #tooltip-balance {
    max-width: 300px;
  }
`

const EmptyPanel = styled.div`
  padding-top: 12%;
  padding-bottom: 12%;
  border: 1px solid ${props => props.borderColor};
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  @media screen and (max-width: 992px) {
    padding: 0px;
    border: none;
    height: 100%;
    margin: auto;
  }
`

const ContentBox = styled.div`
  div.yield-row:last-child {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
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
    props.lineHeight
      ? `
    line-height: ${props.lineHeight}px;
  `
      : ''}
  ${props =>
    props.height
      ? `
    height: ${props.height};
  `
      : ''}
  ${props =>
    props.color
      ? `
    color: ${props.color};
  `
      : ''}
  ${props =>
    props.marginTop
      ? `
    margin-top: ${props.marginTop};
  `
      : ''}
  ${props =>
    props.flexFlow
      ? `
    flex-flow: ${props.flexFlow};
  `
      : ''}
  ${props =>
    props.gap
      ? `
    gap: ${props.gap};
  `
      : 'gap: 23px;'}

  display: flex;
  justify-content: center;
  text-align: center;

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: center;
    flex-flow: column;
    font-size: 10px;
    line-height: 18px;
    padding-top: 35px;
  }
`

const ConnectButtonStyle = styled.button`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  margin: 15px auto;
  width: 250px;
  background: ${props => props.backColor};
  border-radius: 8px;
  border: none;
  color: #fff;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background: ${props => props.hoverColor};
  }

  ${props =>
    props.connected
      ? `
      padding: 7px 45px 7px 11px;
      filter: drop-shadow(0px 4px 52px rgba(0, 0, 0, 0.25));

      &:hover {
        background: #E6F8EB;
      }
    `
      : `
      padding: 15px 0px 15px 0px;
    `}

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;

    ${props =>
      props.connected
        ? `
      background: none;
      color: ${props.fontcolor};
      font-size: 11px;
      padding: 2px 16px 2px 7px;
      border: 1px solid ${props.bordercolor};
      `
        : `
      padding: 10px 11px;
      font-size: 13px;
      `}
  }
`

const ExploreButtonStyle = styled.button`
  font-size: 15px;
  line-height: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  margin: 15px auto;
  padding: 12px 0px 12px 0px;
  width: 250px;
  background: ${props => props.backColor};
  border-radius: 8px;
  border: none;
  color: white;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  cursor: pointer;
  gap: 8px;
  transition: 0.5s;

  img.explore-farms {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(352deg) brightness(101%) contrast(104%);
  }

  &:hover {
    background: ${props => props.hoverColor};
  }

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 11px;
    font-size: 13px;
  }
`

const LeaderboardPagination = styled.div`
  margin-top: 25px;

  ul.paginate-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    padding: 12px 24px 16px 24px;
    margin-bottom: 0px;
    gap: 5px;
  }

  li.previous,
  li.next {
    border-radius: 8px;
    border: 1px solid ${props => props.borderColor};
    background: ${props => props.bgColor};
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    display: flex;
    padding: 8px 14px;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  li.previous {
    margin-right: 100px;
  }

  li.next {
    margin-left: 100px;
  }

  li.paginate-item {
    margin: auto 0px;
  }

  li.break {
    margin: auto 0px;
  }

  li.previous a,
  li.next a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: ${props => props.fontColor2};
  }

  li.previous a svg,
  li.next a svg {
    margin-top: -2px;
  }

  a.paginate-item-link {
    text-decoration: none;
    color: ${props => props.fontColor};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  li.disabled a {
    color: #b2b2b2;
  }

  li.selected a {
    color: #1d2939;
    background: #f9fafb;
  }

  @media screen and (max-width: 992px) {
    li.previous {
      margin-right: 0px;
    }

    li.next {
      margin-left: 0px;
    }
  }
`

export {
  TransactionDetails,
  HistoryPagination,
  TableContent,
  Header,
  Column,
  Col,
  ContentBox,
  EmptyPanel,
  EmptyInfo,
  ConnectButtonStyle,
  ExploreButtonStyle,
  LeaderboardPagination,
}
