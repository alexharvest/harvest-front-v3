import styled from 'styled-components'

const EmptyPanel = styled.div`
  height: ${props => props.height};
  position: relative;

  @media screen and (max-width: 992px) {
    padding: 0px;
    border: none;
    min-height: 100px;
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
    props.gap
      ? `
    gap: ${props.gap};
  `
      : 'gap: 23px;'}

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: absolute;
  width: 100%;
  z-index: 1;

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: center;
    flex-flow: column;
    font-size: 10px;
    line-height: 18px;
    padding-top: 35px;
  }
`

const FakeBoxWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  filter: blur(4px);
`

export { EmptyPanel, EmptyInfo, FakeBoxWrapper }
