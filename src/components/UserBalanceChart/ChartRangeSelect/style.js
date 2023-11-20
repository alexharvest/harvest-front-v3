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
        color: #ff9400;
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

  @media screen and (max-width: 992px) {
    font-size: 8px;
    line-height: 8px;
    padding: 0.986px 5.628px 0.995px 5.968px;
    ${props =>
      props.activeItem
        ? `
        border-radius: 1.357px;
        border: 0.452px solid #FFF;
        background: #E9F0F7;
        `
        : ``}
  }
`

const Text = styled.div`
  @media screen and (max-width: 992px) {
    ${props =>
      props.activeItem
        ? `
          color: #00D26B;
          font-weight: 700;
        `
        : `
          color: #282F3D;
          font-weight: 400;
        `}
  }
`

export { Container, Text }
