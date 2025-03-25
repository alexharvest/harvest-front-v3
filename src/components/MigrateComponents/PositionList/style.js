import styled from 'styled-components'

const VaultBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: ${props => (props.bgColor ? props.bgColor : '')};
  border: ${props => (props.border ? props.border : '')};
  border-bottom: ${props => (props.borderBottom ? props.borderBottom : '')};
  color: ${props => (props.color ? props.color : '')};
  cursor: pointer;

  &:hover {
    background: ${props => (props.hoverBgColor ? props.hoverBgColor : '')};
  }
`

const Content = styled.div`
  display: flex;
  align-items: ${props => (props.alignItems ? props.alignItems : '')};
  flex-direction: column;
`

const InfoText = styled.div`
  font-size: ${props => (props.fontSize ? props.fontSize : '')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '')};
  line-height: 20px;
  color: ${props => (props.color ? props.color : '')};
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
  color: ${props => (props.color ? props.color : '')};
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
