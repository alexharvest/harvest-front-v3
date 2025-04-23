import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  border: none;
  ${props =>
    props.cursor
      ? `
      cursor: ${props.cursor};
      `
      : `cursor: pointer;`}
  width: auto;
  padding: 8px 24px;
  align-items: center;

  &:hover {
    background: ${props => props.hoverColor};
  }

  &.active {
    background: ${props => props.activeColor};
  }

  img {
    border-radius: 50%;
  }
`

const Text = styled.div`
  margin: auto 0px;
  font-weight: ${props => props.weight || '400'};
  ${props =>
    props.color
      ? `
        color: ${props.color}
      `
      : ``}
`

const RightText = styled.div`
  display: flex;
  flex-flow: column;
  text-align: right;
  font-weight: ${props => props.weight || '400'};
  ${props =>
    props.color
      ? `
        color: ${props.color}
      `
      : ``}
`

const TextSpan = styled.div`
  color: ${props => props.fontColor2};
  font-size: 10px;
  font-weight: 400;
  line-height: 20px;
`

const Vault = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: 8px;
  font-size: 14px;
  line-height: 18px;
`

const Content = styled.div`
  height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #caf1d5;
    border-radius: 6px;
    border: none;
  }
`

const EmptyContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.fontColor};
  ${props =>
    props.cursor
      ? `
      cursor: ${props.cursor};
      `
      : `cursor: pointer;`}
`

const Label = styled.div`
  color: ${props => props.fontColor};
  font-size: 14px;
  font-weight: 400;
  line-height: 18.972px;
  ${props =>
    props.showLabel
      ? `
        display: ${props.showLabel};
      `
      : ``}
  ${props =>
    props.padding
      ? `
        padding: ${props.padding};
      `
      : ``}
`

export { Container, Text, Vault, Content, EmptyContainer, Label, RightText, TextSpan }
