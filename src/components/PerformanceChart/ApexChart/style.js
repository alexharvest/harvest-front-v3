import styled from 'styled-components'

const ChartWrapper = styled.div`
  .bottom-chart {
    border-radius: 5px;

    .recharts-wrapper {
      .recharts-reference-area {
        path {
          stroke: ${props => props.bgColorChart};
          fill: ${props => props.bgColorChart};
        }
      }
    }
  }

  .chart-slider-wrapper {
    width: 100%;
    margin-top: 10px;

    .chart-slider {
      margin: 0px auto 25px auto;

      .rc-slider-track {
        background-color: #15b088;
      }

      .rc-slider-step {
        .rc-slider-dot-active {
          border-color: #15b088;
        }
      }

      .rc-slider-handle {
        border-color: #15b088;
      }

      .rc-slider-mark {
        .rc-slider-mark-text {
          width: 100%;
        }
        .rc-slider-mark-text-active {
          color: #15b088;
        }
      }
    }
  }
`

const LoadingDiv = styled.div`
  height: 100%;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
`

const NoData = styled.div`
  position: absolute;
  font-size: 14px;
  color: ${props => props.fontColor};
  width: 400px;

  @media screen and (max-width: 1262px) {
    width: 330px;
  }

  @media screen and (max-width: 992px) {
    width: 400px;
    font-size: 12px;
  }

  @media screen and (max-width: 556px) {
    width: 330px;
  }
`

const FakeChartWrapper = styled.div`
  width: 100%;
  position: relative;
  filter: blur(4px);
`

const LoaderWrapper = styled.div`
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
`

export { ChartWrapper, LoadingDiv, NoData, FakeChartWrapper, LoaderWrapper }
