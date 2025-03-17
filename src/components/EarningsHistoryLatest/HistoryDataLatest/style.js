import styled from 'styled-components'

const TransactionDetails = styled.div`
  width: 100%;
  border-radius: 15px;
  transition: 0.25s;
  margin-top: 20px;

  @media screen and (max-width: 992px) {
    height: ${props => props.hasData};
    margin-top: 24px;
  }
`

const TableContent = styled.div`
  @media screen and (max-width: 992px) {
    // overflow-x: scroll;
    /* border: 1px solid ${props => props.borderColor}; */
    ${props =>
      props.count === 0
        ? `
        border-radius: unset;
        border: none;
    `
        : ``}
  }
`

const ContentBox = styled.div`
  div.latest-yield-row:last-child {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  @media screen and (max-width: 992px) {
    border: unset;
  }
`

const EmptyPanel = styled.div`
  height: ${props => props.height};
  position: relative;

  @media screen and (max-width: 992px) {
    padding: 0px;
    border: none;
    min-height: 100px;
  }
`

const SkeletonItem = styled.div`
  padding: 22px 25px;
  display: grid;
  gap: 6px;

  @media screen and (max-width: 1100px) {
    padding: 10px 15px;
  }

  .skeleton {
    display: flex;
    height: 10px;
  }
`

export { TransactionDetails, TableContent, ContentBox, EmptyPanel, SkeletonItem }
