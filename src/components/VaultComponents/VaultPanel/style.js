import styled from 'styled-components'
import { ArrowContainer } from '../VaultPanelHeader/style'

const VaultContainer = styled.div`
  display: flex;
  font-size: 16px;
  flex-direction: column;
  position: relative;
  transition: 0.25s;

  ${props =>
    props.$lastelement
      ? `
    border-radius: 0 0 10px 10px;
  `
      : ''}

  span {
    font-size: 16px;
  }

  &:hover {
    background: ${props => props.$hovercolor};

    ${ArrowContainer} {
      background: #f2b435;

      path {
        fill: #4c351b;
      }
    }
  }

  @media screen and (max-width: 992px) {
    overflow: hidden;
    position: relative;

    span {
      font-size: 11px !important;
    }
  }
`

export default VaultContainer
