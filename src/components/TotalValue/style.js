import styled from 'styled-components'

const Container = styled.div`
  width: 25%;
  font-weight: 700;
  padding: 24px 24px 24px 0px;

  &:nth-child(2) {
    display: none;
  }

  @media screen and (max-width: 1350px) {
    padding: 15px 15px 15px 0px;
  }

  @media screen and (max-width: 1200px) {
    padding: 10px 10px 10px 0px;
  }

  @media screen and (max-width: 992px) {
    width: 33.3%;
    border: unset;
    border-radius: 0px 6.5px 6.5px 0px;
    padding: 0px 5px 0px 0px;
    margin-top: 24px;

    &:nth-child(2) {
      display: block;
    }
  }
`

const Div = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #718bc5;
  margin-bottom: 8px;
  display: flex;

  svg.question {
    font-size: 16px;
    color: ${props => props.fontColor3};
    cursor: pointer;
    margin: auto 0px auto 5px;
  }

  @media screen and (max-width: 1375px) {
    font-size: 12px;
  }

  @media screen and (max-width: 1300px) {
    display: flex;
    flex-flow: column;
  }

  @media screen and (max-width: 992px) {
    flex-flow: row;
    font-size: 12px;
    margin-bottom: 0px;

    svg {
      display: none;
    }
  }

  #tt-total-profit,
  #tt-total-balance,
  #tt-monthly-yield,
  #tt-yearly-yield,
  #tt-daily-yield,
  #tt-rewards {
    max-width: 300px;

    @media screen and (max-width: 668px) {
      max-width: unset;
      left: 0px !important;
    }
  }
`

const Price = styled.div`
  font-weight: 600;
  font-size: 25px;
  line-height: 38px;
  color: ${props => props.fontColor1};

  @media screen and (max-width: 1350px) {
    font-size: 24px;
  }

  @media screen and (max-width: 992px) {
    font-size: 17px;
    line-height: 36px;
  }
`

const BoxIcon = styled.div`
  margin: auto 24px auto 0px;
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
`
const BetaBadge = styled.span`
  background-color: #ecfdf3;
  color: #027a48;
  font-weight: 500;
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 8px;
  line-height: 12px;
  padding: 1.4px 5px;
  height: fit-content;
  margin: auto 2px auto 8px;
`

export { Container, Div, Price, BoxIcon, NewLabel, BetaBadge }
