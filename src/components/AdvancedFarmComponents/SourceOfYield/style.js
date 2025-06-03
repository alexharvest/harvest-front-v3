import styled from 'styled-components'

const HalfInfo = styled.div`
  border-radius: 12px;
  background: ${props => props.$backcolor};
  transition: 0.25s;
  margin-bottom: ${props => props.$marginbottom};
  font-family: 'Inter', sans-serif;
  border: 2px solid ${props => props.$bordercolor};

  ${props =>
    props.$padding
      ? `
  padding: ${props.$padding};
  `
      : ''}
  ${props =>
    props.$display
      ? `
  display: ${props.$display};
  `
      : ''}
  ${props =>
    props.$justifycontent
      ? `
  justify-content: ${props.$justifycontent};
  `
      : ''}
`

const NewLabel = styled.div`
  font-weight: ${props => props.$weight || '400'};
  font-size: ${props => props.$size || '20px'};
  line-height: ${props => props.$height || '0px'};

  ${props =>
    props.$backcolor
      ? `
    background: ${props.$backcolor};
  `
      : ''}
  ${props =>
    props.$cursor
      ? `
    cursor: ${props.$cursor};
  `
      : ''}
  ${props =>
    props.$border
      ? `
    border: ${props.$border};
  `
      : ''}
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
  ${props =>
    props.$transition
      ? `
    transition: ${props.$transition};
    `
      : ``}

  svg.question {
    font-size: 16px;
    color: ${props => props.$fontcolor};
    cursor: pointer;
    margin: auto 0px auto 5px;
  }

  span.symbol {
    position: absolute;
    color: ${props => props.$fontcolor2};
    font-size: 8px;
    right: 0;
    top: 13px;
  }

  img.icon {
    margin-right: 10px;
  }

  img.thumbs-up {
    margin-right: 10px;
  }

  img.info-icon {
    margin-left: 15px;
  }

  #info .tooltip-inner {
    background: black;
  }

  #tooltip-token-name,
  #tooltip-balance,
  #tooltip-underlying-balance,
  #tooltip-lifetime-earning,
  #tooltip-latest-earning,
  #tooltip-total-balance,
  #tooltip-yield-estimate {
    max-width: 300px;
  }

  span {
    font-weight: 700;
  }

  span.total-days {
    font-weight: 400;
  }

  @media screen and (max-width: 992px) {
    img.icon {
      margin-right: 5px;
    }

    img.info {
      margin-left: 5px;
    }

    img.thumbs-up {
      margin-right: 5px;
      width: 11px;
    }
  }

  a:hover {
    color: #0d6efd !important;
  }
`

const DescInfo = styled.div`
  color: ${props => props.$fontcolor3};
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  padding: 10px 15px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 992px) {
    font-size: 12px;
  }

  .help-message {
    margin-top: 0;
  }
  p {
    a {
      cursor: pointer;
      color: ${props => props.$fontcolor6};
    }
  }
`

const FlexDiv = styled.div`
  display: flex;

  ${props =>
    props.$gap
      ? `
      gap: ${props.$gap};
    `
      : ''}

  ${props =>
    props.$padding
      ? `
      padding: ${props.$padding};
    `
      : ''}

  ${props =>
    props.$margintop
      ? `
    margin-top: ${props.$margintop};
  `
      : ''}

  ${props =>
    props.$marginbottom
      ? `
    margin-bottom: ${props.$marginbottom};
  `
      : ''}

  ${props =>
    props.$justifycontent
      ? `
    justify-content: ${props.$justifycontent};
  `
      : ''}

  ${props =>
    props.$borderbottom
      ? `
    border-bottom: ${props.$borderbottom};
  `
      : ''}

  @media screen and (max-width: 992px) {
    &.farm-symbol {
      flex-flow: column;
    }
  }
`

const InfoLabel = styled.a`
  ${props =>
    props.$weight
      ? `
  font-weight: ${props.$weight};
  `
      : ''}
  ${props =>
    props.$display
      ? `
  display: ${props.$display};
  `
      : ''}
  ${props =>
    props.$size
      ? `
  font-size: ${props.$size};
  `
      : ''}
  ${props =>
    props.$height
      ? `
  line-height: ${props.$height};
  `
      : ''}
  margin-right: 15px;
  justify-content: center;
  background: ${props => props.$bgcolor};
  border-radius: 8px;
  border: 1px solid ${props => props.$bordercolor};
  text-decoration: none;
  padding: 9px 17px;
  align-self: center;
  position: relative;
  color: #15202b;

  img.icon {
    margin-right: 5px;
  }

  img.external-link {
    position: absolute;
    top: 3px;
    right: 3px;
  }

  &:hover {
    color: #1f2937;
    background: ${props => props.$hovercolor};
    .address {
      font-weight: bold;
    }
  }
`

export { HalfInfo, NewLabel, DescInfo, FlexDiv, InfoLabel }
