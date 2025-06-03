import styled from 'styled-components'

const BadgeWrap = styled.div`
  @media screen and (max-width: 992px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

const GuidePart = styled.div`
  background: ${props => props.$backcolor};
  border-radius: 5px;
  border: 1.3px solid ${props => props.$fontcolor4};
  display: flex;
  padding: 2px 8px;
  align-items: center;
  gap: 6px;
  width: fit-content;
  color: ${props => props.$fontcolor4};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  svg.question {
    cursor: pointer;
  }

  #tooltip-autopilot-badge {
    width: 300px;
  }
`

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const TooltipBox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0px;
  background-color: ${({ darkMode }) => (darkMode ? 'white' : '#101828')};
  color: ${({ darkMode }) => (darkMode ? 'black' : 'white')};
  border: 1px solid ${({ darkMode }) => (darkMode ? 'white' : 'black')};
  padding: 10px;
  border-radius: 6px;
  font-size: 12px;
  white-space: normal;
  z-index: 1000;
  min-width: 220px;

  @media screen and (max-width: 992px) {
    top: -80px;
    right: -60px;
    left: unset;
  }
`

const LearnLink = styled.a`
  font-weight: 700;
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ linkColor }) => linkColor};
  padding: 0;
  text-decoration: none;

  &:hover {
    color: ${props => props.$hovercolor};
  }
`

export { BadgeWrap, GuidePart, TooltipWrapper, TooltipBox, LearnLink }
