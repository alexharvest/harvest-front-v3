import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-bottom: ${props => props.$marginbottom}px;
  margin-top: ${props => props.$margintop}px;
  color: ${props => props.$fontcolor};
`

const Label = styled.div`
  display: flex;
  img {
    margin-right: 5px;
    align-self: center;
  }
`

const Content = styled.div`
  font-size: ${props => props.$size}px;
  font-weight: ${props => (props.$weight ? props => props.$weight : 'normal')};
  line-height: ${props => props.$height}px;
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

export { Container, Label, Content, TextInner }
