import styled from 'styled-components'
import '@fontsource/manrope'

const FAQContainer = styled.div`
  margin-left: 260px;
  width: 100%;
  position: relative;

  background: ${props => props.pageBackColor};
  color: ${props => props.fontColor};

  font-weight: 400;
  line-height: 150%;
  font-family: 'Inter', sans-serif;
  transition: 0.25s;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 992px) {
    margin: auto;
    padding-bottom: 150px;
  }
`

const FAQContent = styled.div`
  padding: 70px 46px 57px 46px;

  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 1920px) {
    width: 1450px;
  }

  @media screen and (max-width: 1480px) {
    padding: 70px 30px 40px;
  }

  @media screen and (max-width: 992px) {
    display: block;
    padding: 30px 10px;
  }
`

const FAQHalfContent = styled.div`
  width: 45%;
`

const FAQBox = styled.div`
  background: #daeff0;
  border-radius: 8px;
  width: 100%;
`

const QuestionContainer = styled.div`
  margin-bottom: 25px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 3;

  ul {
    margin: 0px;
  }

  @media screen and (max-width: 992px) {
    margin-bottom: 15px;
    ul {
      padding: 0 5px 0px;
      list-style-type: none;
    }
  }
`

const Question = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  padding: 16px;
  border-radius: 10px;
  transition: 0.25s;

  &:hover {
    background: ${props => props.hoverColor};
  }

  ${props =>
    props.open
      ? `
  border-bottom-left-radius: 0px; 
  border-bottom-right-radius: 0px;
  border-radius: 10px 10px 0px 0px;
    background: ${props.hoverColor};
  `
      : ``}

  @media screen and (max-width: 992px) {
    padding: 16px;
    font-size: 16px;
    line-height: 24px;
  }
`

const Answer = styled.div`
  padding: 16px;
  background: ${props => props.hoverColor};
  transition: 0.25s;
  border-radius: 0 0 10px 10px;
  border-top: none;
  font-size: 14px;

  a {
    color: #ff9400;
    font-weight: bold;

    &:hover {
      color: #ffaa34;
    }
  }

  @media screen and (max-width: 992px) {
    padding: 16px 20px;
    font-size: 12px;
  }
`

const FarmHeader = styled.div`
  background: #15202b;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  padding: 75px 88px 68px;

  @media screen and (max-width: 992px) {
    padding: 64px 16px;
  }
`

const Title = styled.div`
  font-weight: 600;
  font-size: 13px;
  line-height: 19px;
  color: #ff9400;

  margin-bottom: 19px;

  @media screen and (max-width: 992px) {
    text-align: center;
    color: white;
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 20px;
  }
`

const Desc = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 992px) {
    display: block;
  }
`

const FAQMain = styled.div`
  display: flex;
  justify-content: center;
`

const LeftPart = styled.div`
  font-weight: 600;
  font-size: 38px;
  line-height: 47px;

  letter-spacing: -0.02em;
  color: #ffffff;

  @media screen and (max-width: 992px) {
    font-weight: 600;
    font-size: 36px;
    line-height: 44px;
    text-align: center;
  }
`

const RightPart = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ff9400;

  @media screen and (max-width: 992px) {
    text-align: center;
    margin-top: 18px;
    font-size: 18px;
    line-height: 28px;
  }
`

export {
  FAQContainer,
  FAQBox,
  Question,
  Answer,
  QuestionContainer,
  FAQHalfContent,
  FAQContent,
  FarmHeader,
  Title,
  Desc,
  FAQMain,
  LeftPart,
  RightPart,
}
