import styled from 'styled-components'
import Pattern from '../../assets/images/logos/pattern.png'

const Container = styled.div`
  margin-left: 260px;
  width: 100%;
  min-height: 100vh;

  background: ${props => props.pageBackColor};
  transition: 0.25s;

  @media screen and (max-width: 992px) {
    margin: 0;
    padding-bottom: 150px;
  }
`

const Content = styled.div`
  padding: 100px;
  margin: auto;

  @media screen and (min-width: 1921px) {
    width: 1450px;
  }

  @media screen and (max-width: 1480px) {
    width: 100%;
    padding: 70px 30px 40px;
  }

  @media screen and (max-width: 992px) {
    padding: 16px 10px;
  }
`

const FarmStatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width: 1310px) {
    ${props =>
      props.firstLine
        ? `
      display: inline-flex;
      flex-wrap: wrap;
      `
        : ``}
  }

  @media screen and (max-width: 992px) {
    margin: 0;
  }
`

const FarmStatsLastContainer = styled(FarmStatsContainer)`
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`

const FarmSubTitle = styled.h2`
  position: relative;

  font-size: ${props => (props.size ? props.size : '16px')};
  font-weight: ${props => (props.bold ? 'bold' : '700')};
  line-height: ${props => (props.lineHeight ? props.lineHeight : 'auto')};
  height: ${props => (props.height ? props.height : 'auto')};

  a {
    color: black;
  }
`

const EmissionsCountdownText = styled.span`
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 23px;
  width: 100%;
  text-align: center;
  color: ${props => props.fontColor};
  transition: 0.25s;
`

const StatsBox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'column'};
  justify-content: start;
  position: relative;
  align-items: ${props => props.align || 'center'};

  transition: 0.25s;
  border: 2px solid ${props => props.borderColor};
  color: ${props => props.fontColor};
  background: ${props => props.backColor};

  border-radius: 12px 12px 10px 10px;
  margin-bottom: 10px;
  width: ${props => props.width || '-webkit-fill-available'};
  height: ${props => props.height};
  min-height: ${props => props.minHeight || '152px'};
  margin: ${props => props.margin || 'unset'};

  .emission-header {
    background: url(${Pattern});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100vw auto;
    width: 100%;
    height: 50%;
    border-radius: 10px 10px 0 0;
    position: relative;
    margin-bottom: 70px;

    .rect {
      position: absolute;
      bottom: -60px;
      left: calc(50% - 60px);
      width: 120px;
      min-height: 120px;
      display: flex;
    }
  }

  h2 {
    text-align: left;
  }

  @media screen and (max-width: 992px) {
    order: ${props => props.mobileOrder || 'unset'};
  }
`

const StatsContainerRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  margin: ${props => props.margin || '20px 30px 10px'};

  @media screen and (max-width: 992px) {
    flex-direction: column;
    align-items: baseline;
  }
`

const BigStatsSubheader = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  margin-bottom: 30px !important;

  img {
    margin-right: 10px;
  }

  @media screen and (max-width: 992px) {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
  }
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;

  span {
    text-align: left;
    margin-bottom: 10px;

    b {
      font-size: 14px;
      line-height: 17px;
    }
  }

  b {
    text-align: start;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 840px) {
    span {
      margin-bottom: 5px;
    }

    b {
      line-height: unset;
    }
  }
`

const StatsTooltip = styled.div`
  text-align: left;
`

const ImgList = styled.div`
  display: block;
  a {
    margin-right: 23px;
    img {
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 992px) {
    a {
      margin-right: 10px;
    }
  }
`

const DataSource = styled.div`
  background: ${props => props.background || 'none'};
  color: ${props => props.color || 'black'};

  padding: 15px 20px;
  display: flex;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  border-radius: 10px;
  align-items: center;
  position: relative;

  &:hover {
    box-shadow: 0px 4px 4px ${props => props.boxShadowColor};
  }

  .avatar {
    height: 23px;
    margin-right: 20px;
    text-align: right;
  }
`

const DataSourceInner = styled(StatsContainer)`
  width: 100%;
`

const StatsValue = styled(StatsBox)`
  border: none;
  justify-content: space-between;

  @media screen and (max-width: 1530px) {
    display: block;

    .first-comp {
      margin-bottom: 20px;
    }

    .child {
      width: 100% !important;
    }
  }
`

const StatsExchange = styled(StatsBox)`
  padding: 28px 24px;
  display: block;
  justify-content: start;
`

const DataSourceDirect = styled.a`
  text-decoration: none;
  margin-right: 24px;
  div.back {
    background: white;
    border-radius: 10px;
  }
`

const BigStatsExchange = styled(BigStatsSubheader)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  align-items: center;
  margin-bottom: 17px !important;
  color: ${props => props.fontColor};

  img {
    ${props =>
      props.darkMode
        ? 'filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(283deg) brightness(106%) contrast(106%);'
        : ''}
  }
`

const ValueComponent = styled.div`
  border: 2px solid ${props => props.borderColor};
  background: ${props => props.backColor};
  color: ${props => props.fontColor};
  padding: 28px 24px;
  border-radius: 12px;
  width: ${props => props.width};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 992px) {
    width: 100%;
  }
`

const CompHeader = styled.div`
  display: flex;
  margin-bottom: 18px;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${props => props.fontColor};

  img {
    margin-right: 10px;
    ${props =>
      props.darkMode
        ? 'filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(283deg) brightness(106%) contrast(106%);'
        : ''}
  }
`

const FlexDiv = styled.div`
  display: flex;
  justify-content: start;

  @media screen and (max-width: 1350px) {
    display: block;
  }

  @media screen and (max-width: 992px) {
    display: flex;
  }

  @media screen and (max-width: 500px) {
    display: block;
  }
`

export {
  Container,
  Content,
  FarmStatsContainer,
  FarmSubTitle,
  StatsBox,
  StatsContainer,
  StatsTooltip,
  EmissionsCountdownText,
  StatsContainerRow,
  BigStatsSubheader,
  ImgList,
  DataSource,
  DataSourceInner,
  StatsValue,
  StatsExchange,
  DataSourceDirect,
  BigStatsExchange,
  ValueComponent,
  CompHeader,
  FlexDiv,
  FarmStatsLastContainer,
}
