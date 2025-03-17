import styled from 'styled-components'

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
  background: ${props => props.bgColor};

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

  @media screen and (max-width: 1660px) {
    padding: 100px 40px;
  }

  @media screen and (max-width: 992px) {
    padding: 0px 25px;
    text-align: center;
  }
`

const Inner = styled.div`
  padding: 45px 100px 200px 100px;
  width: 100%;
  margin: auto;

  @media screen and (min-width: 1921px) {
    width: 1450px;
    padding: 45px 40px 200px 40px;
  }

  @media screen and (max-width: 1660px) {
    padding: 45px 40px 100px;
  }

  @media screen and (max-width: 992px) {
    padding: 25px 25px;
  }

  @media screen and (max-width: 512px) {
    padding: 25px 15px;
  }
`

const CoinSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;

  @media screen and (max-width: 1660px) {
    gap: 25px;
  }

  @media screen and (max-width: 1350px) {
    gap: 15px;
  }

  @media screen and (max-width: 992px) {
    flex-flow: column;
    gap: 20px;
  }
`

const LiveChat = styled.div`
  width: 60%;
  height: 580px;
  margin-left: -12px;

  @media screen and (max-width: 1660px) {
    width: 60%;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: 730px;
    margin-left: 0px;
  }
`

const ContactWrap = styled.div`
  width: 40%;

  @media screen and (max-width: 1660px) {
    width: 40%;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: 100%;
    margin-bottom: 50px;
  }
`

const DiscordBox = styled.div`
  height: 355px;
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  background: #7289da;
  border-radius: 16px;
  padding: 32px 20px;
`

const LinkButton = styled.a`
  display: flex;
  justify-content: center;
  width: 170px;
  text-decoration: none;
  background: #fff;
  gap: 8px;
  margin: auto;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

  .discord {
    color: #344054;
  }
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

const FTokenWrong = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fffcf5;
  border-radius: 12px;
  border: 1px solid #fec84b;
  padding: 16px;
  margin-top: 20px;
`

const NewLabel = styled.div`
  ${props =>
    props.height
      ? `
    line-height: ${props.height};
  `
      : ''}
  ${props =>
    props.size
      ? `
    font-size: ${props.size};
  `
      : ''}
  ${props =>
    props.weight
      ? `
    font-weight: ${props.weight};
  `
      : ''}
  
  ${props =>
    props.align
      ? `
    align-items: ${props.align};
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
    props.marginRight
      ? `
    margin-right: ${props.marginRight};
  `
      : ''}
  ${props =>
    props.marginBottom
      ? `
    margin-bottom: ${props.marginBottom};
  `
      : ''}
  ${props =>
    props.marginLeft
      ? `
    margin-left: ${props.marginLeft};
  `
      : ''}
  ${props =>
    props.display
      ? `
    display: ${props.display};
  `
      : ''}
  ${props =>
    props.flexFlow
      ? `
    flex-flow: ${props.flexFlow};
  `
      : ''}
  ${props =>
    props.items
      ? `
    align-items: ${props.items};
  `
      : ''}
  ${props =>
    props.padding
      ? `
    padding: ${props.padding};
  `
      : ''}
  ${props =>
    props.color
      ? `
    color: ${props.color};
  `
      : ''}
  ${props =>
    props.cursorType
      ? `
    cursor: ${props.cursorType};
  `
      : ''}
  ${props =>
    props.width
      ? `
    width: ${props.width};
  `
      : ''}
  ${props =>
    props.textAlign
      ? `
    text-align: ${props.textAlign};
  `
      : ''}
  ${props =>
    props.gap
      ? `
    gap: ${props.gap};
  `
      : ''}

  svg.scam-message {
    font-size: 16px;
    color: ${props => props.color};
    cursor: pointer;
    transition: 0.25s;
    margin-top: -10px;
  }

  img.help-icon {
    margin-left: 5px;
    cursor: pointer;
  }

  span {
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
  }
`

export {
  Container,
  TopSection,
  TopContainer,
  Inner,
  CoinSection,
  LiveChat,
  ContactWrap,
  DiscordBox,
  LinkButton,
  HeaderTitle,
  HeaderDesc,
  FTokenWrong,
  NewLabel,
}
