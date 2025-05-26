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
  color: ${props => props.$fontcolor};
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

  @media screen and (max-width: 400px) {
    width: 260px;
  }
`

const FakeChartWrapper = styled.div`
  width: 100%;
  position: relative;
  filter: blur(4px);
`

const LoaderWrapper = styled.div`
  height: ${props => props.$height};
  display: flex;
  justify-content: center;
  align-items: center;
`

// Styled Components for Tooltip
const TooltipContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1px;
  border-radius: 5px;
  font-size: 12px;
`

const TooltipTotal = styled.p`
  margin: 0;
  font-weight: bold;
`

const TooltipContent = styled.div`
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: #15191c;
  padding: 8px;
  font-size: 12px;
  color: white;
`

const ProtocolEntry = styled.div`
  display: flex;
  align-items: space-between;
  width: 100%;
  font-size: 12px;
  color: ${({ color }) => color};
`

const DottedUnderline = styled.span`
  text-decoration: underline dotted;
`

export {
  ChartWrapper,
  LoadingDiv,
  NoData,
  FakeChartWrapper,
  LoaderWrapper,
  TooltipContainer,
  TooltipTotal,
  TooltipContent,
  ProtocolEntry,
  DottedUnderline,
}
