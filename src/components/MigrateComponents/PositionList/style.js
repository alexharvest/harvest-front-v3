import styled from 'styled-components'

const VaultBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: ${props => (props.$bgcolor ? props.$bgcolor : '')};
  border: ${props => (props.$border ? props.$border : '')};
  border-bottom: ${props => (props.$borderbottom ? props.$borderbottom : '')};
  color: ${props => (props.$fontcolor ? props.$fontcolor : '')};
  cursor: pointer;

  &:hover {
    background: ${props => (props.$hoverbgcolor ? props.$hoverbgcolor : '')};
  }
`

const Content = styled.div`
  display: flex;
  align-items: ${props => (props.$alignitems ? props.$alignitems : '')};
  flex-direction: column;
`

const InfoText = styled.div`
  font-size: ${props => (props.$fontsize ? props.$fontsize : '')};
  font-weight: ${props => (props.$fontweight ? props.$fontweight : '')};
  line-height: 20px;
  color: ${props => (props.$fontcolor ? props.$fontcolor : '')};
`

const BadgeIcon = styled.div`
  margin: 0px 5px -1px 0px;
  width: 13.096px;
  height: 13.096px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 10px;
    height: 11px;
  }
`

const Token = styled.a`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  color: ${props => (props.$fontcolor ? props.$fontcolor : '')};
  cursor: pointer;
  z-index: 1;

  @media screen and (max-width: 360px) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 150px;
  }
`

const ApyDownIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BadgeToken = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`

export { VaultBox, Content, InfoText, BadgeIcon, Token, ApyDownIcon, BadgeToken }
