import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: ${props => (props.$flexdirection ? props.$flexdirection : '')};
  margin-top: ${props => props.$margintop};
  margin-right: ${props => props.$marginright};
  color: ${props => props.$fontcolor}!important;
  line-height: ${props => props.$lineheight};
  font-weight: ${props => props.$fontweight}!important;
  font-size: ${props => props.$fontsize};
  width: ${props => (props.$width ? props.$width : '')};
  justify-content: ${props => (props.$justifycontent ? props.$justifycontent : 'space-between')};
`

const Label = styled.div`
  display: flex;
  justify-content: ${props => (props.$justifycontent ? props.$justifycontent : 'start')};
  align-items: center;
  color: ${props => (props.$fontcolor ? `${props.$fontcolor}!important` : '')};
  background: ${props => props.$backcolor};
  border-radius: ${props => props.$borderradius};
  padding: ${props => props.$padding};
  text-decoration: ${props => props.$textdecoration};
  font-size: ${props => (props.$fontsize ? props.$fontsize : '')};
  font-weight: ${props => (props.$fontweight ? props.$fontweight : '')};
  margin-left: ${props => props.$marginleft};
  width: ${props => (props.$width ? props.$width : '')};
  white-space: ${props => (props.$whitespace ? props.$whitespace : '')};
  img {
    margin-left: ${props => (props.$imgmargin ? `${props.$imgmargin}px` : '3px')};
    align-self: center;
  }
`

const Content = styled.div`
  font-size: ${props => props.$size};
  font-weight: ${props => (props.$weight ? props => props.weight : 'normal')};
  line-height: ${props => props.$height};
  color: ${props => props.$fontcolor};
  align-self: center;

  img.boost-img {
    width: 16px;
    margin: -2px 0px auto 5px;
  }
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
  margin-left: ${props => (props.$imgmargin ? `${props.$imgmargin}!important` : '3px')};

  @media screen and (max-width: 992px) {
    margin-left: ${props => (props.$marginleft ? `${props.$marginleft}!important` : '')};
    margin-right: ${props => (props.$imgmargin ? `${props.$imgmargin}!important` : '3px')};
  }
`

const AddressLink = styled.a`
  font-weight: ${props => props.$fontweight};
  font-size: ${props => props.$fontsize};
  line-height: 20px;
  color: ${props => props.$fontcolor};
  white-space: nowrap;
`

export { Container, Label, Content, TextInner, ChainImage, AddressLink }
