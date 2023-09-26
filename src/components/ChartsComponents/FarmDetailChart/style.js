import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 400px;
  overflow: hidden;
  padding: 25px 18px;
  width: 50%;
  transition: 0.25s;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08);

  @media screen and (max-width: 1368px) {
    width: 100%;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    min-height: 400px;
    margin-bottom: 15px;
  }
`

const Header = styled.div`
  font-size: 14px;
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 992px) {
    align-items: start;
  }
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
  color: #fff;

  button {
    padding: 0.1em 0.6em;
    margin-left: 0.5em;
    font-weight: 400;
  }
`

const ChartDiv = styled.div`
  height: 100%;
`

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

  @media screen and (max-width: 992px) {
    margin-bottom: 1rem;
  }
`

const FilterName = styled.div`
  text-align: right;
  margin-top: 1rem;

  @media screen and (max-width: 992px) {
    margin-top: 0.5rem;
  }
`

const CurDate = styled.div`
  font-size: 13px;
  line-height: normal;
  font-weight: 500;

  @media screen and (max-width: 992px) {
    margin-top: 0.5rem;
  }
`

const TooltipInfo = styled.div`
  margin-left: 10px;
  align-self: center;
  height: 35.5px;
`

const FlexDiv = styled.div`
  display: flex;

  @media screen and (max-width: 992px) {
    display: block;
    width: 100%;
  }
`

export {
  Container,
  Header,
  Total,
  MoreBtn,
  ButtonGroup,
  ChartDiv,
  FilterGroup,
  PriceShow,
  FilterName,
  CurDate,
  TooltipInfo,
  FlexDiv,
}