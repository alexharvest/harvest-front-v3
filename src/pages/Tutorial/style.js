import styled from 'styled-components'
import AdvancedImg from '../../assets/images/logos/dashboard/box-bg-2.png'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: ${props => props.fontColor};

  background: ${props => props.bgColor};
  transition: 0.25s;
  position: relative;
  margin-left: 260px;

  @media screen and (min-width: 1921px) {
    flex-direction: row;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: 100%;
    margin: 0;
    justify-content: start;
    padding-bottom: 10px;
  }
`

const TopSection = styled.div`
  width: 100%;
  background: url(${AdvancedImg}), lightgray -163.801px -183.553px / 113.693% 204.76% no-repeat;
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width: 992px) {
    height: 250px;
  }
`

const TopContainer = styled.div`
  height: 250px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 100px;

  @media screen and (min-width: 1921px) {
    width: 1450px;
    margin: auto;
    padding: 100px 40px;
  }

  @media screen and (max-width: 1921px) {
    padding: 100px;
  }

  @media screen and (max-width: 1200px) {
    padding: 100px 40px;
  }

  @media screen and (max-width: 992px) {
    padding: 0px 25px;
    text-align: center;
  }
`

const Inner = styled.div`
  padding: 100px 100px 50px;
  width: 100%;
  margin: auto;

  @media screen and (min-width: 1921px) {
    width: 1450px;
    padding: 60px 40px;
  }

  @media screen and (max-width: 1200px) {
    padding: 60px 40px;
  }

  @media screen and (max-width: 992px) {
    padding: 22px 37px;
  }

  @media screen and (max-width: 512px) {
    padding: 32px 15px;
  }
`

const WrapperDiv = styled.div`
  width: 720px;
  margin: 0px auto 40px;

  @media screen and (max-width: 1200px) {
    width: 600px;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
  }
`

const Title = styled.div`
  color: ${props => props.fontColor1};
  font-size: 30px;
  font-weight: 600;
  line-height: 38px;
  margin-bottom: 20px;
`

const DescText = styled.div`
  color: ${props => props.fontColor};
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;

  div.italic {
    color: ${props => props.fontColor5};
    font-style: italic;
    font-family: initial;
  }

  div.note {
    color: ${props => props.fontColor5};
    font-style: italic;
    font-weight: 600;
    font-family: initial;
  }

  div.label {
    display: inline;
    background: ${props => props.bgColorFarm};
    padding: 0px 5px;
  }

  span {
    font-weight: 600;
  }

  a {
    color: ${props => props.linkColor};
    font-weight: 400;
  }

  a.classic {
    font-weight: 600;
  }

  ul.top-list {
    border-bottom: 1px solid #eaecf0;
    padding-bottom: 32px;
    margin-bottom: 0px;
  }
`

const DescImg = styled.img`
  width: 100%;
  padding: 40px 0px;
`

const DescImgText = styled.div`
  font-size: 14px;
  color: #475467;
  text-align: center;
  margin: -35px 0px 35px;
`

const CoinSection = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
`

const HeaderTitle = styled.div`
  font-size: 35px;
  font-weight: 600;
  line-height: 44px;
  color: #fff;
  text-align: start;
`

const HeaderDesc = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-top: 4.6px;
  margin-bottom: 12.8px;
  text-align: start;

  @media screen and (max-width: 992px) {
    margin-top: 15px;
    margin-bottom: 18px;
  }
`

export {
  Container,
  TopSection,
  TopContainer,
  Inner,
  CoinSection,
  Title,
  WrapperDiv,
  DescText,
  DescImg,
  DescImgText,
  HeaderTitle,
  HeaderDesc,
}
