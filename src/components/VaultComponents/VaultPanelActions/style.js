import styled from 'styled-components'

const UniV3VaultContainer = styled.div`
  display: flex;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #dadfe6;

  @media screen and (max-width: 670px) {
    justify-content: center;
    flex-direction: column;
  }
`

const PrimaryActionsContainer = styled.div`
  display: grid;
  align-items: ${props => props.$alignitems || 'center'};
  grid-template-columns: repeat(${props => props.gridItems || '2'}, 1fr);
  grid-column-gap: ${props => props.gridColGap || '15px'};
  grid-row-gap: ${props => props.gridRowGap || '15px'};
  width: 100%;

  @media screen and (max-width: 575px) {
    margin-top: 20px;
    padding-left: 0;
    margin-left: 0;
    border-left: 0;
  }
`

const DepositOptionsContainer = styled.div`
  display: flex;
  grid-column: 1/3;
`

const MigrateOptionsContainer = styled.div`
  display: flex;
  grid-column: 2/3;
`

const SelectedVaultContainer = styled.div`
  width: 100%;
  padding: ${props => props.$padding || '20px 0px'};
  max-width: ${props => props.$maxwidth || '500px'};
  border-color: ${props => props.$bordercolor};
  border-style: solid;
  border-width: ${props => props.$borderwidth || '1px 0px'};
  margin: ${props => props.$margin || '15px 0px'};
  gap: 20px;

  button {
    font-weight: 800;
  }

  @media screen and (max-width: 670px) {
    justify-content: start;
    flex-direction: column;
  }
`

const SelectedVault = styled.div`
  display: flex;
  flex-basis: 50%;
  flex-direction: ${props => props.$flexdirection || 'row'};
  justify-content: ${props => props.$justifycontent || 'space-between'};
  align-items: ${props => props.$alignitems || 'unset'};
  order: ${props => props.order};
  border-right: 1px solid #dadfe6;
  border-right: 0;
  width: 100%;
  margin-bottom: 14px;

  &:last-child {
    border: unset;
  }

  &:first-of-type {
    @media screen and (max-width: 670px) {
      order: 10;
      border-right: unset;
      align-items: center;
    }
  }

  @media screen and (max-width: 670px) {
    border-right: unset;
    justify-content: start;
  }
`
const SelectedVaultLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$justifycontent || 'center'};
  margin-bottom: 10px;
  white-space: pre;
  flex-wrap: wrap;
  font-weight: 700;
  font-size: ${props => props.$fontsize || '16px'} !important;
  line-height: ${props => props.$lineheight || '24px'};
  color: ${props => props.$fontcolor};
  text-decoration: ${props => (props.link ? 'underline' : 'unset')};
  cursor ${props => (props.link ? 'pointer' : 'unset')};
  margin-bottom: 15px;
`

const SelectedVaultNumber = styled.span`
  ${props =>
    props.$display
      ? `
      display: ${props.$display};
    `
      : ''}
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
`

const RangeGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 50%;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  @media screen and (max-width: 670px) {
    align-items: center;
    border-left: unset;
    padding-top: 20px;
    margin-top: 15px;
  }
`

const VaultRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 16px;
`

const VaultRange = styled.span`
  font-weight: 500;
  font-size: 14px !important;
  color: ${props => props.$fontcolor || 'black'};
  text-align: left;
`

const SelectedVaultTokenInfo = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`

const Div = styled.div`
  margin-left: 20px;
  align-self: center;
`

const InfoIcon = styled.img`
  filter: ${props => props.$filtercolor};
  transition: 0.25s;
  cursor: pointer;
  margin-left: 5px;
`

const USDValue = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: start;
`

export {
  UniV3VaultContainer,
  PrimaryActionsContainer,
  DepositOptionsContainer,
  SelectedVaultTokenInfo,
  SelectedVaultContainer,
  SelectedVault,
  SelectedVaultLabel,
  SelectedVaultNumber,
  RangeGroup,
  VaultRangeContainer,
  VaultRange,
  MigrateOptionsContainer,
  Div,
  InfoIcon,
  USDValue,
}
