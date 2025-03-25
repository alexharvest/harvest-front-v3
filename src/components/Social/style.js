import styled from 'styled-components'

const SocialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  transition: 0.25s;
  margin-left: 15px;

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    position: unset;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 992px) {
    margin: 0px;
    padding-left: 12px;
  }

  z-index: 110;
`

const Social = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${props => (props.marginRight ? props.marginRight : '12px')};
  text-decoration: none;

  img {
    margin: auto;
    ${props =>
      props.darkMode
        ? 'filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(352deg) brightness(101%) contrast(104%);'
        : ''};
  }
`

export { SocialsContainer, Social }
