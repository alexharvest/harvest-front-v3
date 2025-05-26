import styled from 'styled-components'
import Pattern from '../../assets/images/logos/pattern.png'

const ProfitSharing = styled.div`
  background: url(${Pattern});
  text-decoration: none;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  position: relative;
  padding: 15px 18px;
  border-radius: 13px;
  height: ${props => (props.$height ? props.$height : 'unset')};
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    box-shadow: 4px 3px 3px rgba(16, 24, 40, 0.1), 3px 3px 4px rgba(16, 24, 40, 0.06);
  }
`

const ProfitBack = styled.img`
  border-radius: 13px;
`

const TopDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 23px;
`

const BottomDiv = styled.div`
  font-size: 30px;
  color: white;
  line-height: 38px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  position: relative;

  .apy {
    align-self: center;
  }

  .chart {
    position: absolute;
    bottom: -50px;
    right: 0px;

    @media screen and (max-width: 1280px) {
      right: -15px;
    }
  }
`

export { ProfitSharing, ProfitBack, TopDiv, BottomDiv }
