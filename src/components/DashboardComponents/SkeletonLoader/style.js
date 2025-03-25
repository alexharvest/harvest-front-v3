import styled from 'styled-components'

const EmptyPanel = styled.div`
  height: ${props => props.height};
  border: 1px solid ${props => props.borderColor};
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  @media screen and (max-width: 992px) {
    padding: 0px;
    border: none;
  }
`

const SkeletonItem = styled.div`
  padding: 22px 25px;
  display: flex;
`

const SkeletonDiv = styled.div`
  display: ${props => props.display};
  ${props => (props.direction ? `flex-direction: ${props.direction};` : '')}
  ${props => (props.width ? `width: ${props.width};` : 'width: 33%;')}
  gap: 6px;

  .skeleton-container {
    width: 100%;
  }

  .skeleton-lines {
    width: 100%;
    gap: 6px;
    display: grid;
  }

  .skeleton {
    display: flex;
    height: 10px;
  }
`

export { EmptyPanel, SkeletonDiv, SkeletonItem }
