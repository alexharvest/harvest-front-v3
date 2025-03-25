import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: ${props => (props.flexDirection ? props.flexDirection : '')};
  margin-top: ${props => props.marginTop};
  margin-right: ${props => props.marginRight};
  color: ${props => props.fontColor}!important;
  line-height: ${props => props.lineHeight};
  font-weight: ${props => props.fontWeight}!important;
  font-size: ${props => props.fontSize};
  width: ${props => (props.width ? props.width : '')};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'space-between')};
`

const Label = styled.div`
  display: flex;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'start')};
  align-items: center;
  color: ${props => (props.fontColor ? `${props.fontColor}!important` : '')};
  background: ${props => props.backColor};
  border-radius: ${props => props.borderRadius};
  padding: ${props => props.padding};
  text-decoration: ${props => props.textDecoration};
  font-size: ${props => (props.fontSize ? props.fontSize : '')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '')};
  margin-left: ${props => props.marginLeft};
  width: ${props => (props.width ? props.width : '')};
  white-space: ${props => (props.whiteSpace ? props.whiteSpace : '')};
  img {
    margin-left: ${props => (props.imgMargin ? `${props.imgMargin}px` : '3px')};
    align-self: center;
  }
`

const Content = styled.div`
  font-size: ${props => props.size};
  font-weight: ${props => (props.weight ? prop => prop.weight : 'normal')};
  line-height: ${props => props.height};
  color: ${props => props.color};
  align-self: center;

  img.boost-img {
    width: 16px;
    margin: -2px 0px auto 5px;
  }
`

const Percent = styled.div`
  border-radius: 6px;
  padding: 0px 10px;
  margin-left: 10px;

  ${props =>
    props.up
      ? `
      background: ${props.dashboardBack};
      color: ${props.dashboardColor};
    `
      : `
      background: #FEE3E3;
      color: #E64D3E;
  `}
`

const TextInner = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;

  @media screen and (max-width: 992px) {
    font-size: 10px;
  }
`
const ChainImage = styled.img`
  width: 12px;
  height: 12px;
  margin-left: ${props => (props.imgMargin ? `${props.imgMargin}!important` : '3px')};

  @media screen and (max-width: 992px) {
    margin-left: ${props => (props.marginLeft ? `${props.marginLeft}!important` : '')};
    margin-right: ${props => (props.imgMargin ? `${props.imgMargin}!important` : '3px')};
  }
`

const AddressLink = styled.a`
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize};
  line-height: 20px;
  color: ${props => props.color};
  white-space: nowrap;
`

export { Container, Label, Content, Percent, TextInner, ChainImage, AddressLink }
