import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  ComposedChart,
  XAxis,
  YAxis,
  Line,
  Area,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from 'recharts'
import { round } from 'lodash'
import { ClipLoader } from 'react-spinners'
import Slider from 'rc-slider'
import { useWindowWidth } from '@react-hook/window-size'
import { useThemeContext } from '../../../providers/useThemeContext'
import {
  ceil10,
  floor10,
  round10,
  numberWithCommas,
  formatDate,
  denormalizeSliderValue,
  normalizeSliderValue,
} from '../../../utilities/formats'
import {
  findClosestIndex,
  findMax,
  findMin,
  getChartDomain,
  getRangeNumber,
  getTimeSlots,
} from '../../../utilities/parsers'
import { ChartWrapper, LoadingDiv, NoData } from './style'
import { fromWei } from '../../../services/web3'
import { useRate } from '../../../providers/Rate'

function generateChartDataWithSlots(slots, apiData, kind, filter, decimals) {
  const seriesData = [],
    sl = slots.length,
    al = apiData.length

  for (let i = 0; i < sl; i += 1) {
    for (let j = 0; j < al; j += 1) {
      if (slots[i] > parseInt(apiData[j].timestamp, 10)) {
        const value = parseFloat(apiData[j][kind])
        if (filter === 2) {
          seriesData.push({ x: slots[i] * 1000, y: fromWei(value, decimals, decimals, true) })
        } else {
          seriesData.push({ x: slots[i] * 1000, y: value })
        }
        break
      } else if (j === al - 1) {
        seriesData.push({ x: slots[i] * 1000, y: 0 })
      }
    }
  }

  return seriesData
}

function formatXAxis(value, range) {
  const date = new Date(value)

  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const mins = date.getMinutes()

  return range === '1D' ? `${hour}:${mins}` : `${month} / ${day}`
}

function getYAxisValues(min, max, roundNum, filter) {
  const duration = max - min
  const result = []
  if (filter === 2) {
    const ary = []
    const bet = Number(max - min)
    for (let i = min; i <= max; i += bet / 4) {
      ary.push(i)
    }
    if (ary.length === 4) {
      ary.push(max)
    }

    for (let j = 0; j < ary.length; j += 1) {
      const val = ary[j].toFixed(roundNum)
      result.push(val)
    }
  } else if (filter === 1) {
    for (let i = min; i <= max; i += duration / 4) {
      const val = round(i, 2)
      result.push(val)
    }
  } else {
    for (let i = min; i <= max; i += duration / 4) {
      const val = round10(i, roundNum)
      result.push(val)
    }
  }
  return result
}

function generateIFARMTVLWithSlots(slots, apiData) {
  const seriesData = [],
    sl = slots.length

  for (let i = 0; i < sl; i += 1) {
    const data = apiData.FARM.reduce((prev, curr) =>
      Math.abs(Number(curr.timestamp) - slots[i]) < Math.abs(Number(prev.timestamp) - slots[i])
        ? curr
        : prev,
    )

    seriesData.push({ x: slots[i] * 1000, y: Number(data.value) })
  }

  return seriesData
}

const ApexChart = ({
  token,
  data,
  iFarmTVL,
  isIFARM,
  range,
  filter,
  lastTVL,
  lastAPY,
  setCurDate,
  setCurContent,
  setRoundNumber,
  handleTooltipContent,
  setFixedLen,
  fixedLen,
  setSelectedState,
  isExpanded,
}) => {
  const { fontColor, fontColor5, bgColorChart } = useThemeContext()

  const onlyWidth = useWindowWidth()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const [mainSeries, setMainSeries] = useState([])
  const [allMainSeries, setAllMainSeries] = useState([])
  const [loading, setLoading] = useState(false)
  const [isDataReady, setIsDataReady] = useState(true)
  const [startPoint, setStartPoint] = useState(0)
  const [endPoint, setEndPoint] = useState(0)
  const [minAllVal, setMinAllVal] = useState(0)
  const [maxAllVal, setMaxAllVal] = useState(0)
  const [startTimeStampPos, setStartTimeStampPos] = useState()
  const [endTimeStampPos, setEndTimeStampPos] = useState()

  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

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
      }
    }, [active, payload, onTooltipContentChange])

    return null
  }

  const renderCustomXAxisTick = ({ x, y, payload }) => {
    let path = ''

    if (payload.value !== '') {
      path = formatXAxis(payload.value, range)
    }
    return (
      <text
        orientation="bottom"
        x={x - 12}
        y={y + 4}
        width={24}
        height={24}
        viewBox="0 0 1024 1024"
        fill={fontColor5}
      >
        <tspan dy="0.71em">{path}</tspan>
      </text>
    )
  }

  const renderCustomYAxisTick = ({ x, y, payload }) => {
    let path = ''

    if (payload.value !== '') {
      path = `${filter === 1 ? currencySym : ''}${
        filter === 1
          ? numberWithCommas((Number(payload.value) * Number(currencyRate)).toFixed(0))
          : payload.value
      } ${filter === 0 ? '%' : ''}`
    }
    return (
      <text
        orientation="left"
        className="recharts-text recharts-cartesian-axis-tick-value"
        x={isMobile ? (path.length > 8 ? x + 10 : x) : path.length > 8 ? x + 10 : x}
        y={y}
        width={60}
        height={310}
        stroke="none"
        fill={fontColor5}
        textAnchor="end"
      >
        <tspan dx={0} dy="0.355em">
          {path}
        </tspan>
      </text>
    )
  }

  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(0)
  const [yAxisTicks, setYAxisTicks] = useState([])

  useEffect(() => {
    const init = async () => {
      setLoading(true)

      let mainData = [],
        allMainData = [],
        usedData = [],
        maxAPY = lastAPY,
        minAPY,
        maxTVL = lastTVL,
        minTVL,
        maxSharePrice,
        minSharePrice,
        maxValue,
        minValue,
        len = 0,
        unitBtw,
        roundNum,
        slots = [],
        slotCount = 50,
        allSlotCount = 50,
        ago

      if ((Object.keys(data).length === 0 && data.constructor === Object) || data.length === 0) {
        setIsDataReady(false)
        return
      }

      if (filter === 1) {
        if (isIFARM) {
          if (iFarmTVL && iFarmTVL.FARM) {
            if (iFarmTVL.FARM.length === 0) {
              setIsDataReady(false)
              return
            }
            usedData = iFarmTVL && iFarmTVL.FARM ? iFarmTVL.FARM : []
          } else {
            return
          }
        } else {
          if (data && data.tvls) {
            if (data.tvls.length === 0) {
              setIsDataReady(false)
              return
            }
          }
          usedData = data && data.tvls ? data.tvls : []
          if (usedData.length !== 0 && lastTVL && !Number.isNaN(lastTVL)) {
            usedData[0].value = lastTVL
          }
        }
      } else if (filter === 0) {
        if (data && data.generalApies) {
          if (data.generalApies.length === 0) {
            setIsDataReady(false)
            return
          }
        }
        usedData = data.generalApies !== undefined ? data.generalApies : []
        if (lastAPY && !Number.isNaN(lastAPY) && usedData.length > 0) {
          usedData[0].apy = lastAPY
        }
      } else {
        if (data && data.vaultHistories) {
          if (data.vaultHistories.length === 0) {
            setIsDataReady(false)
            return
          }
        }
        usedData = data && data.vaultHistories ? data.vaultHistories : []
      }

      const nowDate = new Date(),
        currentTimeStamp = Math.floor(nowDate.getTime() / 1000),
        firstDate =
          usedData.length > 0
            ? usedData[isIFARM && filter === 1 ? 0 : usedData.length - 1]?.timestamp
            : null

      const maxTimestamp =
        usedData[isIFARM && filter === 1 ? usedData.length - 1 : 0].timestamp * 1000
      const minTimestamp =
        usedData[isIFARM && filter === 1 ? 0 : usedData.length - 1].timestamp * 1000
      const startTimestamp = denormalizeSliderValue(startPoint, minTimestamp, maxTimestamp)
      const endTimestamp = denormalizeSliderValue(endPoint, minTimestamp, maxTimestamp)

      if (range === 'ALL' || range === '1Y' || range === 'CUSTOM') {
        let periodDate
        if (range === 'CUSTOM') {
          periodDate = (maxTimestamp / 1000 - startTimestamp) / (24 * 60 * 60)
        } else {
          periodDate = (currentTimeStamp - Number(firstDate)) / (24 * 60 * 60)
        }

        if (range === '1Y' && periodDate > 365) {
          ago = getRangeNumber(range)
        } else {
          ago = Math.ceil(periodDate)
        }
        if (ago > 700) {
          slotCount = 500
        } else if (ago > 365) {
          slotCount = 400
        } else if (ago > 180) {
          slotCount = 300
        } else if (ago > 90) {
          slotCount = 150
        } else if (ago > 60) {
          slotCount = 100
        } else if (ago > 30) {
          slotCount = 100
        } else {
          slotCount = 50
        }
      } else {
        ago = getRangeNumber(range)
      }

      slots = getTimeSlots(ago, slotCount)

      const allPeriodDate = (currentTimeStamp - Number(firstDate)) / (24 * 60 * 60)
      const allAgo = Math.ceil(allPeriodDate)
      if (allAgo > 700) {
        allSlotCount = 500
      } else if (allAgo > 365) {
        allSlotCount = 400
      } else if (allAgo > 180) {
        allSlotCount = 300
      } else if (allAgo > 90) {
        allSlotCount = 150
      } else if (allAgo > 60) {
        allSlotCount = 100
      } else if (allAgo > 30) {
        allSlotCount = 100
      } else {
        allSlotCount = 50
      }

      const allSlots = getTimeSlots(allAgo, allSlotCount)
      const allChartData = usedData.filter(obj => parseInt(obj.timestamp, 10) >= firstDate)
      const allChartSlot = allSlots.filter(obj => parseInt(obj, 10) >= firstDate)
      if (filter === 1 && isIFARM) {
        allMainData = generateIFARMTVLWithSlots(allChartSlot, iFarmTVL, 'value')
      } else {
        allMainData = generateChartDataWithSlots(
          allChartSlot,
          allChartData,
          filter === 0 ? 'apy' : filter === 1 ? 'value' : 'sharePrice',
          filter,
          token.decimals || token.data.watchAsset.decimals,
        )
      }

      if (range === 'CUSTOM') {
        usedData = usedData.filter(obj => {
          const timestamp = parseInt(obj.timestamp, 10)
          return timestamp >= startTimestamp && timestamp <= endTimestamp
        })
        slots = slots.filter(obj => {
          const timestamp = parseInt(obj, 10)
          return timestamp >= startTimestamp && timestamp <= endTimestamp
        })
      }

      if (filter === 1) {
        if (isIFARM) {
          if (iFarmTVL.FARM.length === 0) {
            return
          }
          const filteredSlots = slots.filter(
            timestamp => timestamp > Number(iFarmTVL.FARM[0].timestamp),
          )
          mainData = generateIFARMTVLWithSlots(filteredSlots, iFarmTVL, 'value')
        } else {
          if (usedData.length === 0) {
            return
          }
          const filteredSlots = slots.filter(
            timestamp => timestamp > Number(usedData[usedData.length - 1].timestamp),
          )
          mainData = generateChartDataWithSlots(
            filteredSlots,
            usedData,
            'value',
            filter,
            token.decimals || token.data.watchAsset.decimals,
          )
        }
        maxTVL = findMax(mainData)
        minTVL = findMin(mainData)
      } else if (filter === 0) {
        if (usedData.length === 0) {
          setIsDataReady(false)
          return
        }
        const filteredSlots = slots.filter(
          timestamp => timestamp > Number(usedData[usedData.length - 1].timestamp),
        )
        mainData = generateChartDataWithSlots(
          filteredSlots,
          usedData,
          'apy',
          filter,
          token.decimals || token.data.watchAsset.decimals,
        )
        maxAPY = findMax(mainData)
        minAPY = findMin(mainData)
      } else {
        if (usedData.length === 0) {
          return
        }
        const filteredSlots = slots.filter(
          timestamp => timestamp > Number(usedData[usedData.length - 1].timestamp),
        )
        mainData = generateChartDataWithSlots(
          filteredSlots,
          usedData,
          'sharePrice',
          filter,
          token.decimals || token.data.watchAsset.decimals,
        )
        maxSharePrice = findMax(mainData)
        minSharePrice = findMin(mainData)
      }

      maxValue = filter === 0 ? maxAPY : filter === 1 ? maxTVL : maxSharePrice
      minValue = filter === 0 ? minAPY : filter === 1 ? minTVL : minSharePrice

      const between = maxValue - minValue
      unitBtw = between / 4
      if (filter === 2) {
        if (unitBtw >= 1) {
          len = (1 / unitBtw).toString().length
          // unitBtw = ceil10(unitBtw, -len)
          maxValue = ceil10(maxValue, -len)
          minValue = floor10(minValue, -len)
        } else if (unitBtw === 0) {
          len = (1 / maxValue).toString().length
          maxValue += 1
          minValue -= 1
        } else {
          len = (1 / unitBtw).toString().length
          // unitBtw = ceil10(between, -len)
          maxValue = ceil10(maxValue, -len)
          minValue = floor10(minValue, -len + 1)
        }

        if (unitBtw === 0) {
          unitBtw = (maxValue - minValue) / 4
        } else {
          const rate = Number(unitBtw / maxValue) + 1
          maxValue *= rate
          maxValue = ceil10(maxValue, -len)
          minValue /= rate
        }
      } else {
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
      }

      if (filter === 1) {
        if (unitBtw === 0) {
          roundNum = 0
        } else {
          roundNum = len - 2
        }
      } else if (filter === 0) {
        roundNum = -len
      } else if (filter === 2) {
        roundNum = maxValue - minValue < 0.001 ? 6 : 5
      }

      const maxAllValue = findMax(allMainData)
      const minAllValue = findMin(allMainData)
      const { maxValue: maxAllDomain, minValue: minAllDomain } = getChartDomain(
        maxAllValue,
        minAllValue,
      )

      setMinVal(minValue)
      setMaxVal(maxValue)
      setMinAllVal(minAllDomain)
      setMaxAllVal(maxAllDomain)

      setFixedLen(filter === 1 ? 0 : len)
      setRoundNumber(roundNum)

      setCurDate(formatDate(mainData[mainData.length - 1]?.x))
      const content = numberWithCommas(
        (
          Number(mainData[mainData.length - 1].y) * (filter === 1 ? Number(currencyRate) : 1)
        ).toFixed(filter === 1 ? 2 : filter === 0 ? fixedLen : roundNum),
      )
      setCurContent(content)

      const startSliderPoint = mainData[0].x
      const endSliderPoint = mainData[mainData.length - 1].x

      if (range !== 'CUSTOM') {
        setStartPoint(normalizeSliderValue(startSliderPoint, minTimestamp, maxTimestamp))
        setEndPoint(normalizeSliderValue(endSliderPoint, minTimestamp, maxTimestamp))
      }

      if (allMainSeries.length > 0) {
        const startIndex = findClosestIndex(allMainSeries, startTimestamp * 1000)
        const endIndex = findClosestIndex(allMainSeries, endTimestamp * 1000)
        setStartTimeStampPos(startIndex)
        setEndTimeStampPos(endIndex)
      }

      const yAxisAry = getYAxisValues(minValue, maxValue, roundNum, filter)
      setYAxisTicks(yAxisAry)

      setMainSeries(mainData)
      setAllMainSeries(allMainData)

      setLoading(false)
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    range,
    filter,
    data,
    lastTVL,
    lastAPY,
    isIFARM,
    iFarmTVL,
    fixedLen,
    setCurContent,
    setCurDate,
    token.decimals,
    currencyRate,
    startPoint,
    endPoint,
  ])

  const handleSliderChange = value => {
    setSelectedState('CUSTOM')
    setStartPoint(value[0])
    setEndPoint(value[1])
  }

  return (
    <>
      {!loading ? (
        <ChartWrapper bgColorChart={bgColorChart}>
          <ResponsiveContainer
            width="100%"
            // height={onlyWidth > 1250 ? 350 : onlyWidth > 1050 ? 330 : 330}
            height={
              onlyWidth > 1291
                ? 346
                : onlyWidth > 1262
                ? 365
                : onlyWidth > 1035
                ? 365
                : onlyWidth > 992
                ? 365
                : 365
            }
          >
            <ComposedChart
              data={mainSeries}
              margin={{
                top: 20,
                right: 0,
                bottom: 0,
                left: isMobile ? 0 : 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D26B" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="0"
                strokeLinecap="butt"
                stroke="rgba(228, 228, 228, 0.2)"
                vertical={false}
              />
              <XAxis
                dataKey="x"
                tickLine={false}
                // interval={20}
                tickCount={isMobile ? 7 : 5}
                tick={renderCustomXAxisTick}
                padding={{ right: 10 }}
              />
              <YAxis
                dataKey="y"
                tickLine={false}
                tickCount={5}
                tick={renderCustomYAxisTick}
                ticks={yAxisTicks}
                domain={[minVal, maxVal]}
              />
              <Line
                dataKey="y"
                type="monotone"
                unit="M"
                strokeLinecap="round"
                strokeWidth={2.5}
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
              <Tooltip
                content={<CustomTooltip onTooltipContentChange={handleTooltipContent} />}
                legendType="none"
                dot={false}
                cursor={{
                  stroke: '#00D26B',
                  strokeDasharray: 3,
                  strokeLinecap: 'butt',
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
          {isExpanded && (
            <>
              {mainSeries.length > 0 && (
                <div className="chart-slider-wrapper">
                  <Slider
                    className="chart-slider"
                    range
                    value={[startPoint, endPoint]}
                    onChange={handleSliderChange}
                    pushable={1}
                  />
                </div>
              )}
              <ResponsiveContainer className="bottom-chart" width="100%" height={50}>
                <ComposedChart
                  data={allMainSeries}
                  margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUvSmallChart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D26B" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <YAxis
                    dataKey="y"
                    tickCount={0}
                    domain={[minAllVal, maxAllVal]}
                    stroke="#00D26B"
                    yAxisId="left"
                    orientation="left"
                    mirror
                  />
                  <Line
                    dataKey="y"
                    type="monotone"
                    unit="$"
                    strokeLinecap="round"
                    strokeWidth={1}
                    stroke="#00D26B"
                    dot={false}
                    legendType="none"
                    yAxisId="left"
                  />
                  <ReferenceLine x={startTimeStampPos} stroke="grey" label="" yAxisId="left" />
                  <ReferenceLine x={endTimeStampPos} stroke="grey" label="" yAxisId="left" />
                  <ReferenceArea
                    x1={startTimeStampPos}
                    x2={endTimeStampPos}
                    y1={minAllVal}
                    y2={maxAllVal}
                    stroke="#161B26"
                    fill="#161B26"
                    strokeOpacity={1}
                    yAxisId="left"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </>
          )}
        </ChartWrapper>
      ) : (
        <LoadingDiv>
          {isDataReady ? (
            <ClipLoader size={30} margin={2} color={fontColor} />
          ) : (
            <NoData color={fontColor}>Vault data soon to be available.</NoData>
          )}
        </LoadingDiv>
      )}
    </>
  )
}

export default ApexChart
