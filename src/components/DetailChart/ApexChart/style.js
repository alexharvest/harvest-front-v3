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
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 346px;

  @media screen and (max-width: 1291px) {
    height: 365px;
  }

  @media screen and (max-width: 1262px) {
    height: 365px;
  }

  @media screen and (max-width: 1035px) {
    height: 365px;
  }

  @media screen and (max-width: 992px) {
    height: 365px;
  }
`

const NoData = styled.div`
  color: ${props => props.fontColor};

  @media screen and (max-width: 992px) {
    font-size: 12px;
    line-height: 18px;
  }
`

export { ChartWrapper, LoadingDiv, NoData }
