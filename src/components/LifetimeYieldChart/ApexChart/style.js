import styled from 'styled-components'

const LoadingDiv = styled.div`
  height: 100%;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
`

const NoData = styled.div`
  color: ${props => props.$fontcolor};
  font-size: 14px;
`

const BoxWrapper = styled.div`
  width: 100%;
  position: relative;

  div.message {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-flow: column;
  }
`

const EmptyInfo = styled.div`
  ${props =>
    props.$weight
      ? `
    font-weight: ${props.$weight};
  `
      : ''}
  ${props =>
    props.$size
      ? `
    font-size: ${props.$size}px;
  `
      : ''}
  ${props =>
    props.$lineheight
      ? `
    line-height: ${props.$lineheight}px;
  `
      : ''}
  ${props =>
    props.$height
      ? `
    height: ${props.$height};
  `
      : ''}
  ${props =>
    props.$fontcolor
      ? `
    color: ${props.$fontcolor};
  `
      : ''}
  ${props =>
    props.$margintop
      ? `
    margin-top: ${props.$margintop};
  `
      : ''}
  
  ${props =>
    props.$gap
      ? `
    gap: ${props.$gap};
  `
      : 'gap: 23px;'}

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  .desc-text {
    padding: 0px 25px;
  }

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: center;
    flex-flow: column;
    font-size: 10px;
    line-height: 18px;
    padding-top: 35px;
  }
`

export { LoadingDiv, EmptyInfo, BoxWrapper, NoData }
