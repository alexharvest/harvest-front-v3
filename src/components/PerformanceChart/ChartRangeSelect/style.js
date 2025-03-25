import styled from 'styled-components'

const Container = styled.button`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding: 3px 15px;
  display: ${props => props.display};
  text-align: left;
  color: #282f3d;
  border: none;
  border-radius: 70.69px;

  &:hover {
    background: ${props =>
      props.mode === 'dark'
        ? `
          #6ED459
        `
        : `#6ED459`};
  }

  ${props =>
    props.activeItem
      ? props.mode === 'dark'
        ? `
        background: #6ED459;
        color: #15191C;
    `
        : `
        background: #6ED459;
        color: #15191C;
      `
      : props.mode === 'dark'
      ? `
      background: rgba(183, 205, 255, 0.33);
      color: white;
    `
      : `
      color: #15191C;
      background: #F2F5FF;
      `}
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

export { Container, Text }
