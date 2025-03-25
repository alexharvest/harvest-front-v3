import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  overflow: hidden;
  padding: 0px;
  transition: 0.25s;

  // @media screen and (max-width: 992px) {
  //   width: 100%;
  //   height: 400px;
  // }
`

const Header = styled.div`
  font-size: 14px;
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MoreBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 0.8em 0.5em;
  margin: 1em;
  background: rgba(223, 0, 0, 0.06);
  border-radius: 1em;
  height: 15px;
  color: #df0000;
  border: none;

  img {
    margin-right: 0.25em;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  // margin: 0.8em 1em 0.25em auto;
  color: #fff;
  justify-content: end;
  padding-top: 25px;
`

const ToggleButton = styled.div`
  color: ${props => (props.color ? props.color : '')};
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding: 3px 15px;
  border-radius: 3px;
  &:hover {
    background: ${props => (props.backColor ? props.backColor : '')};
    .chevron {
      opacity: 1;
    }
  }
  .chevron {
    opacity: 0;
  }
  @media screen and (max-width: 992px) {
    padding: 3px 10px;
  }
`

const ChevronIcon = styled.span`
  margin-right: 5px;
`

const ChartDiv = styled.div``

const FilterGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

const PriceShow = styled.div`
  display: flex;

  h2 {
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    padding: 0;
    margin: 0 10px 0 0;
  }
`

const FilterName = styled.div`
  text-align: right;
  margin-top: 1rem;
`

const CurDate = styled.div`
  color: ${props => props.fontColor3};
  display: flex;
  font-size: 13px;
  font-weight: 500;

  @media screen and (max-width: 992px) {
    display: flex;
    font-size: 10px;
    font-weight: 400;
  }

  span {
    color: #ced3e6;
  }

  p {
    color: #15b088;
    font-weight: 500;
    margin-bottom: 0px;
  }
`

const TooltipInfo = styled.div`
  margin-left: 10px;
  align-self: center;
  @media screen and (max-width: 992px) {
    margin-left: 0px;
  }
`

const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const LabelInfo = styled.div`
  color: ${props => props.fontColor4};
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;

  @media screen and (max-width: 992px) {
    font-size: 12px;
    line-height: 20px;
  }
`

export {
  Container,
  Header,
  Total,
  MoreBtn,
  ButtonGroup,
  ToggleButton,
  ChevronIcon,
  ChartDiv,
  FilterGroup,
  PriceShow,
  FilterName,
  CurDate,
  TooltipInfo,
  FlexDiv,
  LabelInfo,
}
