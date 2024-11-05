import styled from 'styled-components'

const Container = styled.button`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding: 3px 15px;
  display: ${props => props.display};
  text-align: left;
  border: none;
  color: #282f3d;
  border-radius: 3px;

  &:hover {
    background: ${props =>
      props.mode === 'dark'
        ? `
          #3b3c3e
        `
        : `#e9f0f7`};
  }

  ${props =>
    props.activeItem
      ? props.mode === 'dark'
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
      : props.mode === 'dark'
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
  font-weight: ${props => props.weight || '400'};
  font-size: ${props => props.size || '20px'};
  line-height: ${props => props.height || '0px'};
  ${props =>
    props.borderBottom
      ? `
    border-bottom: ${props.borderBottom};
  `
      : ''}

  ${props =>
    props.color
      ? `
    color: ${props.color};
  `
      : ''}
  ${props =>
    props.position
      ? `
    position: ${props.position};
  `
      : ''}
  ${props =>
    props.align
      ? `
    text-align: ${props.align};
  `
      : ''}
  ${props =>
    props.justifyContent
      ? `
    justify-content: ${props.justifyContent};
  `
      : ''}
  ${props =>
    props.marginTop
      ? `
    margin-top: ${props.marginTop};
  `
      : ''}
  ${props =>
    props.marginLeft
      ? `
    margin-left: ${props.marginLeft};
  `
      : ''}
  ${props =>
    props.marginBottom
      ? `
    margin-bottom: ${props.marginBottom};
  `
      : ''}
  ${props =>
    props.marginRight
      ? `
    margin-right: ${props.marginRight};
  `
      : ''}
  ${props =>
    props.display
      ? `
    display: ${props.display};
  `
      : ''}
  ${props =>
    props.items
      ? `
    align-items: ${props.items};
  `
      : ''}
  ${props =>
    props.self
      ? `
    align-self: ${props.self};
  `
      : ''}
  ${props =>
    props.padding
      ? `
    padding: ${props.padding};
  `
      : ''}
  ${props =>
    props.width
      ? `
    width: ${props.width};
  `
      : ''}
  ${props =>
    props.borderRadius
      ? `
    border-radius: ${props.borderRadius};
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
