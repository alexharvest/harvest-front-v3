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
`

export { LoadingDiv, NoData }
