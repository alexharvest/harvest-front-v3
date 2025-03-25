import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { ComposedChart, XAxis, Line, Area, Tooltip, ResponsiveContainer, YAxis } from 'recharts'
import { useWindowWidth } from '@react-hook/window-size'
import { ClipLoader } from 'react-spinners'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useWallet } from '../../../providers/Wallet'
import { useRate } from '../../../providers/Rate'
import { ceil10, floor10, numberWithCommas, showUsdValueCurrency } from '../../../utilities/formats'
import { findMax, findMin, getTimeSlots, getYAxisValues } from '../../../utilities/parsers'
import { BoxWrapper, EmptyInfo, LoadingDiv, NoData } from './style'
import MagicChart from '../MagicChart'

function generateChartDataWithSlots(slots, apiData, lifetimeYield) {
  const seriesData = [],
    sl = slots.length,
    al = apiData.length

  for (let i = 0; i < sl; i += 1) {
    for (let j = 0; j < al; j += 1) {
      if (slots[i] >= parseInt(apiData[j].timestamp, 10)) {
        const value = parseFloat(apiData[j][lifetimeYield])
        seriesData.push({ x: slots[i] * 1000, y: value })
        break
      }
      // else if (j === al - 1) {
      //   seriesData.push({ x: slots[i] * 1000, y: 0, z: 0 })
      // }
    }
  }

  if (seriesData.length === 1) {
    seriesData.push(seriesData[0])
  }

  return seriesData
}

function formatXAxis(value, range) {
  const date = new Date(value)

  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const mins = date.getMinutes()

  return range < 1 ? `${hour}:${mins}` : `${month} / ${day}`
}

const ApexChart = ({ noFarm, data, range, handleTooltipContent, setCurDate, setCurContent }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const { darkMode, fontColor, inputFontColor } = useThemeContext()
  const { connected } = useWallet()

  const [mainSeries, setMainSeries] = useState([])

  const onlyWidth = useWindowWidth()

  const [loading, setLoading] = useState(false)
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(0)
  const [yAxisTicks, setYAxisTicks] = useState([])

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  const CustomTooltip = ({ active, payload, onTooltipContentChange }) => {
    useEffect(() => {
      if (active && payload && payload.length) {
        onTooltipContentChange(payload)
      } else {
        setCurDate('')
        const value = Number(data[0]?.lifetimeYield) * Number(currencyRate)
        const content = `
        <div style="font-size: 25px; line-height: 38px;">
          <div style="color: #5DCF46; font-weight: 600;">
            ${showUsdValueCurrency(value, currencySym, currencyRate)}
          </div>
        </div>`
        setCurContent(content)
      }
    }, [active, payload, onTooltipContentChange])

    return null
  }

  const renderCustomXAxisTick = ({ x, y, payload, index }) => {
    let path = '',
      dx = 0

    if (isMobile && index === 0) {
      return null
    }

    if (payload.value !== '') {
      path = formatXAxis(payload.value, range)
    }

    // if (isMobile && index === 0) dx = 5 // Adjust the first tick
    if (isMobile && index === payload.length - 1) dx = -10 // Adjust the last tick
    return (
      <text
        orientation="bottom"
        x={x + dx}
        y={y + 4}
        width={24}
        height={24}
        textAnchor={index === 0 ? 'start' : index === payload.length - 1 ? 'end' : 'middle'}
        viewBox="0 0 1024 1024"
        fill={inputFontColor}
        fontSize={isMobile ? '10px' : '12px'}
      >
        <tspan dy="0.71em">{path}</tspan>
      </text>
    )
  }

  const renderCustomYAxisTick = ({ x, y, payload }) => {
    let path = ''

    if (payload.value !== '') {
      path = `${currencySym}${numberWithCommas(
        (Number(payload.value) * Number(currencyRate)).toFixed(0),
      )}`
    }
    return (
      <text
        orientation="left"
        className="recharts-text recharts-cartesian-axis-tick-value"
        x={x}
        y={y}
        width={60}
        height={310}
        stroke="none"
        fill={inputFontColor}
        textAnchor="end"
      >
        <tspan dx={0} dy="0.355em">
          {path}
        </tspan>
      </text>
    )
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      if (data === undefined) {
        return
      }

      let mainData = [],
        maxValue,
        minValue,
        len = 0,
        unitBtw,
        roundNum,
        slotCount = 50

      if (range > 700) {
        slotCount = 500
      } else if (range > 365) {
        slotCount = 400
      } else if (range > 180) {
        slotCount = 300
      } else if (range > 90) {
        slotCount = 150
      } else if (range > 60) {
        slotCount = 100
      } else if (range > 30) {
        slotCount = 100
      } else {
        slotCount = 50
      }

      const slots = getTimeSlots(range, slotCount)

      if (data.length === 0) {
        return
      }
      mainData = generateChartDataWithSlots(slots, data, 'lifetimeYield')
      maxValue = findMax(mainData)
      minValue = findMin(mainData)

      const between = maxValue - minValue
      unitBtw = between / 4
      if (unitBtw >= 1) {
        unitBtw = Math.ceil(unitBtw)
        len = unitBtw.toString().length
        unitBtw = ceil10(unitBtw, len - 1)
        maxValue = ceil10(maxValue, len - 1)
        minValue = floor10(minValue, len - 1)
      } else if (unitBtw === 0) {
        len = Math.ceil(maxValue).toString().length
        maxValue += 10 ** (len - 1)
        minValue -= 10 ** (len - 1)
      } else {
        len = Math.ceil(1 / unitBtw).toString().length + 1
        unitBtw = ceil10(unitBtw, -len)
        maxValue = ceil10(maxValue, -len)
        minValue = floor10(minValue, -len + 1)
      }

      if (unitBtw !== 0) {
        maxValue *= 1.5
        minValue = 0
      } else {
        unitBtw = (maxValue - minValue) / 4
      }

      if (unitBtw === 0) {
        roundNum = 0
      } else {
        roundNum = len - 2
      }

      if (mainData.length > 0) {
        const value = Number(mainData[mainData.length - 1].y) * Number(currencyRate)
        const content = `
          <div style="font-size: 25px; line-height: 38px;">
            <div style="color: #5DCF46; font-weight: 600;">
              ${showUsdValueCurrency(value, currencySym, currencyRate)}
            </div>
          </div>`
        setCurContent(content)
      }

      setMinVal(minValue)
      setMaxVal(maxValue)

      const yAxisAry = getYAxisValues(minValue, maxValue, roundNum)
      setYAxisTicks(yAxisAry)

      setMainSeries(mainData)
      setLoading(false)
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, data])

  return (
    <>
      {connected && !loading ? (
        <ResponsiveContainer width="100%" height={onlyWidth > 992 ? 300 : 120}>
          <ComposedChart
            data={mainSeries}
            margin={{
              top: 0,
              right: isMobile ? 20 : 0,
              bottom: 0,
              left: isMobile ? 20 : 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D26B" stopOpacity={0.1} />
                <stop offset="95%" stopColor={darkMode ? '#161B26' : '#fff'} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Line
              dataKey="y"
              type="monotone"
              unit="M"
              strokeLinecap="round"
              strokeWidth={2}
              stroke="#00D26B"
              dot={false}
              legendType="none"
            />
            <Area
              type="monotone"
              dataKey="y"
              stroke="#00D26B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <XAxis
              dataKey="x"
              tickLine={false}
              tickCount={5}
              tick={renderCustomXAxisTick}
              interval={isMobile ? 50 : 'auto'}
            />
            <YAxis
              hide
              dataKey="y"
              tickLine={false}
              tickCount={5}
              tick={renderCustomYAxisTick}
              ticks={yAxisTicks}
              domain={[minVal, maxVal]}
            />
            <Tooltip
              content={<CustomTooltip onTooltipContentChange={handleTooltipContent} />}
              cursor={{
                stroke: '#00D26B',
                strokeDasharray: 3,
                strokeLinecap: 'butt',
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : connected ? (
        <LoadingDiv>
          {!noFarm ? (
            isMobile ? (
              <></>
            ) : (
              <ClipLoader size={30} margin={2} color={fontColor} />
            )
          ) : (
            <BoxWrapper>
              <NoData className="message" color={fontColor}>
                No activity found for this wallet.
              </NoData>
              <MagicChart />
            </BoxWrapper>
          )}
        </LoadingDiv>
      ) : (
        <BoxWrapper>
          <EmptyInfo
            className="message"
            height="100%"
            weight={500}
            size={14}
            lineHeight={20}
            color={fontColor}
          >
            Connect wallet to see your lifetime yield chart
          </EmptyInfo>
          <MagicChart />
        </BoxWrapper>
      )}
    </>
  )
}

export default ApexChart
