import styled from 'styled-components'

const FTokenInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const FTokenDiv = styled.div`
  display: flex;
  gap: 16px;
`

const BaseSection = styled.div`
  transition: 0.25s;
`

const LearnLink = styled.a`
  font-weight: 400;
  cursor: pointer;
  background: none;
  border: none;
  color: ${props => props.$linkcolor};
  padding: 0;
  text-decoration: underline;

  &:hover {
    color: ${props => props.$hovercolor};
  }
`

const NewLabel = styled.div`
  ${props =>
    props.$size
      ? `
    font-size: ${props.$size};
  `
      : ''}
  ${props =>
    props.$weight
      ? `
    font-weight: ${props.$weight};
  `
      : ''}
  ${props =>
    props.$height
      ? `
    line-height: ${props.$height};
  `
      : ''}
  ${props =>
    props.$padding
      ? `
    padding: ${props.$padding};
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
    props.$margin
      ? `
    margin: ${props.$margin};
  `
      : ''}
  ${props =>
    props.$display
      ? `
    display: ${props.$display};
  `
      : ''}
  ${props =>
    props.$flexflow
      ? `
    flex-flow: ${props.$flexflow};
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
    props.$widthdiv
      ? `
    width: ${props.$widthdiv};
  `
      : ''}

  ${props =>
    props.$border
      ? `
      border: ${props.$border};
  `
      : ''}

  ${props =>
    props.$borderradius
      ? `
      border-radius: ${props.$borderradius};
  `
      : ''}

  span {
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
  }

  img.progressbar-img {
    width: 100%;
  }

  img.icon {
    margin-right: 10px;
  }

  img.info {
    margin-left: 10px;
  }

  img.info-icon {
    margin-right: 10px;
  }

  img.info-msg {
    width: 48px;
    height: 48px;
  }

  @media screen and (max-width: 992px) {
    img.icon {
      margin-right: 5px;
    }

    img.info {
      margin-left: 5px;
    }
  }
`

const ImgBtn = styled.img`
  cursor: pointer;
  transition: 0.25s;
  margin-right: 8px;
`

export { FTokenInfo, FTokenDiv, BaseSection, NewLabel, ImgBtn, LearnLink }
