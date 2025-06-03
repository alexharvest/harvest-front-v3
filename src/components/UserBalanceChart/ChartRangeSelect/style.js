import styled from 'styled-components'

const Container = styled.button`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding: 3px 15px;
  display: ${props => props.$display};
  text-align: left;
  border: none;
  color: #282f3d;
  border-radius: 3px;

  &:hover {
    background: ${props =>
      props.$mode === 'dark'
        ? `
          #3b3c3e
        `
        : `#e9f0f7`};
  }

  ${props =>
    props.$activeitem
      ? props.$mode === 'dark'
        ? `
        background: none;
        border-radius: 3px;
        color: #15B088;
        font-weight: 700;
    `
        : `
        background: none;
        border-radius: 3px;
        color: #15B088;
        font-weight: 700;
      `
      : props.$mode === 'dark'
      ? `
      background: none;
      border: none;
      color: white;
    `
      : `
      background: white;
      `}
`

const NewLabel = styled.div`
  font-weight: ${props => props.$weight || '400'};
  font-size: ${props => props.$size || '20px'};
  line-height: ${props => props.$height || '0px'};
  ${props =>
    props.$borderbottom
      ? `
    border-bottom: ${props.$borderbottom};
  `
      : ''}

  ${props =>
    props.$fontcolor
      ? `
    color: ${props.$fontcolor};
  `
      : ''}
  ${props =>
    props.$position
      ? `
    position: ${props.$position};
  `
      : ''}
  ${props =>
    props.$align
      ? `
    text-align: ${props.$align};
  `
      : ''}
  ${props =>
    props.$justifycontent
      ? `
    justify-content: ${props.$justifycontent};
  `
      : ''}
  ${props =>
    props.$margintop
      ? `
    margin-top: ${props.$margintop};
  `
      : ''}
  ${props =>
    props.$marginleft
      ? `
    margin-left: ${props.$marginleft};
  `
      : ''}
  ${props =>
    props.$marginbottom
      ? `
    margin-bottom: ${props.$marginbottom};
  `
      : ''}
  ${props =>
    props.$marginright
      ? `
    margin-right: ${props.$marginright};
  `
      : ''}
  ${props =>
    props.$display
      ? `
    display: ${props.$display};
  `
      : ''}
  ${props =>
    props.$items
      ? `
    align-items: ${props.$items};
  `
      : ''}
  ${props =>
    props.$self
      ? `
    align-self: ${props.$self};
  `
      : ''}
  ${props =>
    props.$padding
      ? `
    padding: ${props.$padding};
  `
      : ''}
  ${props =>
    props.$width
      ? `
    width: ${props.$width};
  `
      : ''}
  ${props =>
    props.$borderradius
      ? `
    border-radius: ${props.$borderradius};
    `
      : ``}
`

const Text = styled.div`
  display: flex;
  align-items: center;
  svg.info {
    margin-left: 3px;
  }

  #tooltip-last-timeframe {
    max-width: 300px;
  }
`

export { Container, Text, NewLabel }
