import styled from 'styled-components'

const Container = styled.button`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding: 3px 15px;
  display: flex;
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

const Text = styled.div``

export { Container, Text }
