import styled from 'styled-components'

const ButtonsGroup = styled.div`
  display: flex;
  width: fit-content;
  background: ${props => props.$backcolor};
  transition: 0.25s;

  border-radius: 8px;
  border: 1px solid ${props => props.$bordercolor};
  overflow: hidden;
`

const ButtonStyle = styled.button`
  display: flex;
  background: transparent;
  color: black;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  border: none;
  cursor: unset !important;
  padding: 10px 16px;
  ${props =>
    props.$btnnum === 0
      ? `
    border-radius: 8px 0 0 8px !important;
    border-right: 1px solid ${props.$bordercolor};
  `
      : props =>
          props.$btnNum === 1
            ? `
      border-radius: 0 !important;
    `
            : `
        border-radius: 0 8px 8px 0 !important;
        border-left: 1px solid ${props.$bordercolor};
      `}

  img {
    filter: invert(47%) sepia(41%) saturate(409%) hue-rotate(194deg) brightness(93%) contrast(86%);
  }

  &.active {
    cursor: pointer !important;
    background: transparent;
    color: ${props => (props.$activecolor ? props.$activecolor : 'black')};
    font-weight: bold;

    img {
      filter: invert(46%) sepia(93%) saturate(1403%) hue-rotate(129deg) brightness(95%)
        contrast(84%);
    }
  }

  &:hover {
    background-color: ${props => props.$backcolor};
  }

  ${props =>
    props.$mode === 'true'
      ? `
      img {
        filter: invert(100%) sepia(95%) saturate(22%) hue-rotate(33deg) brightness(106%) contrast(107%);
      }
    `
      : ``}
`

export { ButtonsGroup, ButtonStyle }
