import styled from 'styled-components'

const HalfInfo = styled.div`
  border-radius: 12px;
  background: ${props => props.backColor};
  transition: 0.25s;
  margin-bottom: ${props => props.marginBottom};
  font-family: 'Inter', sans-serif;
  border: 2px solid ${props => props.borderColor};

  ${props =>
    props.padding
      ? `
  padding: ${props.padding};
  `
      : ''}
  ${props =>
    props.display
      ? `
  display: ${props.display};
  `
      : ''}
  ${props =>
    props.justifyContent
      ? `
  justify-content: ${props.justifyContent};
  `
      : ''}
`

const NewLabel = styled.div`
  font-weight: ${props => props.weight || '400'};
  font-size: ${props => props.size || '20px'};
  line-height: ${props => props.height || '0px'};

  ${props =>
    props.backColor
      ? `
    background: ${props.backColor};
  `
      : ''}
  ${props =>
    props.cursor
      ? `
    cursor: ${props.cursor};
  `
      : ''}
  ${props =>
    props.border
      ? `
    border: ${props.border};
  `
      : ''}
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
  ${props =>
    props.transition
      ? `
    transition: ${props.transition};
    `
      : ``}

  svg.question {
    font-size: 16px;
    color: ${props => props.color};
    cursor: pointer;
    margin: auto 0px auto 5px;
  }

  span.symbol {
    position: absolute;
    color: ${props => props.fontColor2};
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
  color: ${props => props.fontColor3};
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
      color: ${props => props.fontColor6};
    }
  }
`

const FlexDiv = styled.div`
  display: flex;

  ${props =>
    props.gap
      ? `
      gap: ${props.gap};
    `
      : ''}

  ${props =>
    props.padding
      ? `
      padding: ${props.padding};
    `
      : ''}

  ${props =>
    props.marginTop
      ? `
    margin-top: ${props.marginTop};
  `
      : ''}

  ${props =>
    props.marginBottom
      ? `
    margin-bottom: ${props.marginBottom};
  `
      : ''}

  ${props =>
    props.justifyContent
      ? `
    justify-content: ${props.justifyContent};
  `
      : ''}

  ${props =>
    props.borderBottom
      ? `
    border-bottom: ${props.borderBottom};
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
    props.weight
      ? `
  font-weight: ${props.weight};
  `
      : ''}
  ${props =>
    props.display
      ? `
  display: ${props.display};
  `
      : ''}
  ${props =>
    props.size
      ? `
  font-size: ${props.size};
  `
      : ''}
  ${props =>
    props.height
      ? `
  line-height: ${props.height};
  `
      : ''}
  margin-right: 15px;
  justify-content: center;
  background: ${props => props.bgColor};
  border-radius: 8px;
  border: 1px solid ${props => props.borderColor};
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
    background: ${props => props.hoverColor};
    .address {
      font-weight: bold;
    }
  }
`

export { HalfInfo, NewLabel, DescInfo, FlexDiv, InfoLabel }
