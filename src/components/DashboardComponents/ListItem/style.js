import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-bottom: ${props => props.marginBottom}px;
  margin-top: ${props => props.marginTop}px;
  color: ${props => props.fontColor};
`

const Label = styled.div`
  display: flex;
  img {
    margin-right: 5px;
    align-self: center;
  }
`

const Content = styled.div`
  font-size: ${props => props.size}px;
  font-weight: ${props => (props.weight ? prop => prop.weight : 'normal')};
  line-height: ${props => props.height}px;
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

export { Container, Label, Content, Percent, TextInner }
