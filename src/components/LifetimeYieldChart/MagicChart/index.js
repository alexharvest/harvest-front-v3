import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { ComposedChart, XAxis, Area, Line, ResponsiveContainer } from 'recharts'
import { useWindowWidth } from '@react-hook/window-size'
import { FakeChartWrapper } from './style'
import { magicChartData } from '../../../constants'
import { formatXAxis } from '../../../utilities/formats'
import { useThemeContext } from '../../../providers/useThemeContext'

const MagicChart = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const { inputFontColor } = useThemeContext()
  const onlyWidth = useWindowWidth()

  const renderCustomXAxisTick = ({ x, y, payload }) => {
    let path = ''

    if (payload.value !== '') {
      path = formatXAxis(payload.value, '1W')
    }
    return (
      <text
        orientation="bottom"
        x={x - 12}
        y={y + 4}
        width={24}
        height={24}
        viewBox="0 0 1024 1024"
        fill={inputFontColor}
      >
        <tspan dy="0.71em">{path}</tspan>
      </text>
    )
  }
  return (
    <FakeChartWrapper>
      <ResponsiveContainer width="100%" height={onlyWidth > 992 ? 300 : 120}>
        <ComposedChart
          data={magicChartData}
          margin={{
            top: 20,
            right: isMobile ? 20 : 0,
            bottom: 0,
            left: isMobile ? 20 : 0,
          }}
        >
          <defs>
            <linearGradient id="colorUvPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D26B" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#161B26" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="x" tickLine={false} tickCount={5} tick={renderCustomXAxisTick} />
          <Line
            dataKey="y"
            type="monotone"
            unit="$"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="#00D26B"
            dot={false}
            legendType="none"
            yAxisId="left"
          />
          <Area
            type="monotone"
            dataKey="y"
            stroke="#00D26B"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </FakeChartWrapper>
  )
}
export default MagicChart
