import React, { useEffect, useState } from 'react'
import {
  ComposedChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { useWindowWidth } from '@react-hook/window-size'
import { ClipLoader } from 'react-spinners'
import 'rc-slider/assets/index.css'
import { useThemeContext } from '../../../providers/useThemeContext'
import {
  numberWithCommas,
  formatDate,
  formatXAxis,
  normalizeSliderValue,
  denormalizeSliderValue,
} from '../../../utilities/formats'
import {
  findMax,
  findMin,
  getChartDomain,
  getRangeNumber,
  getTimeSlots,
  getYAxisValues,
} from '../../../utilities/parsers'
import { ChartWrapper, LoadingDiv, NoData, FakeChartWrapper, LoaderWrapper } from './style'
import { useWallet } from '../../../providers/Wallet'
import { useRate } from '../../../providers/Rate'
import { fakeChartData } from '../../../constants'

function findMaxUnderlying(data) {
  const ary = data.map(el => el.z)
  const max = Math.max(...ary)
  return max
}
function findMinUnderlying(data) {
  const ary = data.map(el => el.z)
  const min = Math.min(...ary)
  return min
}

function generateChartDataWithSlots(slots, apiData, balance, priceUnderlying, sharePrice) {
  const seriesData = [],
    sl = slots.length,
    al = apiData.length

  for (let i = 0; i < sl; i += 1) {
    for (let j = 0; j < al; j += 1) {
      if (slots[i] >= parseInt(apiData[j].timestamp, 10)) {
        const value1 = parseFloat(apiData[j][balance])
        const value2 = parseFloat(apiData[j][priceUnderlying])
        const value3 = parseFloat(apiData[j][sharePrice])
        seriesData.push({ x: slots[i] * 1000, y: value1 * value2 * value3, z: value1 * value3 })
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

const ApexChart = ({
  data,
  data1,
  loadComplete,
  range,
  setCurDate,
  setCurContent,
  setCurContentUnderlying,
  handleTooltipContent,
  setFixedLen,
  fixedLen,
  lastFarmingTimeStamp,
  lpTokenBalance,
  totalValue,
  isInactive,
}) => {
  const { fontColor, fontColor5, bgColorChart } = useThemeContext()
  const { connected } = useWallet()

  const [mainSeries, setMainSeries] = useState([])
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  const onlyWidth = useWindowWidth()

  const [isDataReady, setIsDataReady] = useState('false')
  const [roundedDecimal, setRoundedDecimal] = useState(2)
  const [roundedDecimalUnderlying, setRoundedDecimalUnderlying] = useState(2)
  const [hourUnit, setHourUnit] = useState(false)
  const [startPoint, setStartPoint] = useState(0)
  const [endPoint, setEndPoint] = useState(0)
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(0)
  const [minValUnderlying, setMinValUnderlying] = useState(0)
  const [maxValUnderlying, setMaxValUnderlying] = useState(0)
  const [yAxisTicks, setYAxisTicks] = useState([])
  const [zAxisTicks, setZAxisTicks] = useState([])

  const CustomTooltip = ({ active, payload, onTooltipContentChange }) => {
    useEffect(() => {
      if (active && payload && payload.length) {
        onTooltipContentChange(payload)
      }
    }, [active, payload, onTooltipContentChange])

    return null
  }

  const renderCustomXAxisTick = ({ x, y, payload, index }) => {
    let path = '',
      dx = 0

    if (payload.value !== '') {
      path = formatXAxis(payload.value, hourUnit)
    }

    if (index === 0) dx = 5 // Adjust the first tick
    if (index === payload.length - 1) dx = -10 // Adjust the last tick
    return (
      <text
        orientation="bottom"
        x={x + dx}
        y={y + 4}
        width={24}
        height={24}
        textAnchor={index === 0 ? 'start' : index === payload.length - 1 ? 'end' : 'middle'}
        viewBox="0 0 1024 1024"
        fill={fontColor5}
        fontSize="10px"
      >
        <tspan dy="0.71em">{path}</tspan>
      </text>
    )
  }

  const renderCustomYAxisTick = ({ x, y, payload }) => {
    let path = ''

    if (payload.value !== '') {
      path = `${currencySym}${numberWithCommas(
        (Number(payload.value) * Number(currencyRate)).toFixed(2),
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
        fill="none"
        textAnchor="start"
      >
        <tspan dx={0} dy="0.355em">
          {path}
        </tspan>
      </text>
    )
  }

  const renderCustomZAxisTick = ({ x, y, payload }) => {
    let path = ''

    if (payload.value !== '') {
      path = `${numberWithCommas(payload.value)}`
    }

    return (
      <text
        orientation="right"
        className="recharts-text recharts-cartesian-axis-tick-value"
        x={x}
        y={y}
        width={60}
        height={310}
        stroke="none"
        fill="none"
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
      let mainData = [],
        allMainData = [],
        useData = [],
        firstDate,
        firstDate1,
        firstDate2,
        ago,
        filteredData,
        filteredSlot = [],
        maxTimestamp,
        minTimestamp

      const slotCount = 50
      const allSlotCount = 50
      const dl = data.length
      const dl1 = data1.length
      if (!connected) {
        setIsDataReady('false')
      } else if (lpTokenBalance === 0) {
        setIsDataReady('loading')
      } else if (lpTokenBalance === '0' && totalValue !== 0 && dl === 0) {
        setIsDataReady('loading')
      } else if (lpTokenBalance === '0' && totalValue === 0 && dl === 0) {
        setIsDataReady('false')
      } else if (totalValue !== '0' && dl === 0) {
        setIsDataReady('loading')
      } else if (dl !== 0 && dl1 !== 0) {
        setIsDataReady('true')
      }

      if (
        (Object.keys(data).length === 0 && data.constructor === Object) ||
        dl === 0 ||
        (Object.keys(data1).length === 0 && data1.constructor === Object) ||
        dl1 === 0
      ) {
        return
      }

      for (let i = dl - 1; i >= 0; i -= 1) {
        if (data[i].value !== 0) {
          firstDate1 = data[i].timestamp
          break
        }
      }
      if (firstDate1 === undefined) {
        firstDate1 = data[dl1 - 1].timestamp
      }

      for (let i = dl1 - 1; i >= 0; i -= 1) {
        if (data1[i].value !== 0) {
          firstDate2 = data1[i].timestamp
          break
        }
      }
      if (firstDate2 === undefined) {
        firstDate2 = data1[dl1 - 1].timestamp
      }

      const nowDate = new Date()
      const currentTimeStamp = Math.floor(nowDate.getTime() / 1000)

      const checkPeriod = (currentTimeStamp - Number(firstDate1)) / (24 * 60 * 60)

      if (isInactive || checkPeriod < 100) {
        useData = data
        firstDate = firstDate1
        maxTimestamp = useData[0].timestamp * 1000
        minTimestamp = useData[dl - 1].timestamp * 1000
      } else {
        useData = data1
        firstDate = firstDate2
        maxTimestamp = useData[0].timestamp * 1000
        minTimestamp = useData[dl1 - 1].timestamp * 1000
      }

      const startTimestamp = denormalizeSliderValue(startPoint, minTimestamp, maxTimestamp)
      const endTimestamp = denormalizeSliderValue(endPoint, minTimestamp, maxTimestamp)
      const allPeriodDate = (currentTimeStamp - Number(firstDate)) / (24 * 60 * 60)
      const allAgo = Math.ceil(allPeriodDate)

      if (range === 'Latest') {
        const periodDate = (currentTimeStamp - Number(lastFarmingTimeStamp)) / (24 * 60 * 60)
        ago = Math.ceil(periodDate)
        if (ago === 1) {
          setHourUnit(true)
        } else {
          setHourUnit(false)
        }
      } else if (range === 'All') {
        ago = allAgo
        if (ago === 1) {
          setHourUnit(true)
        } else {
          setHourUnit(false)
        }
      } else if (range === 'CUSTOM') {
        const periodDate = (maxTimestamp / 1000 - startTimestamp) / (24 * 60 * 60)
        ago = Math.ceil(periodDate)
        if (ago === 1) {
          setHourUnit(true)
        } else {
          setHourUnit(false)
        }
      } else {
        ago = getRangeNumber(range)
        if (range === '1D') {
          setHourUnit(true)
        } else {
          setHourUnit(false)
        }
      }

      const slots = getTimeSlots(ago, slotCount)
      const allSlots = getTimeSlots(allAgo, allSlotCount)

      if (range === 'Latest') {
        filteredData = useData.filter(obj => parseInt(obj.timestamp, 10) >= lastFarmingTimeStamp)
        filteredSlot = slots.filter(obj => parseInt(obj, 10) >= lastFarmingTimeStamp)
      } else if (range === 'All') {
        filteredData = useData.filter(obj => parseInt(obj.timestamp, 10) >= firstDate)
        filteredSlot = slots.filter(obj => parseInt(obj, 10) >= firstDate)
      } else if (range === 'CUSTOM') {
        filteredData = useData.filter(obj => {
          const timestamp = parseInt(obj.timestamp, 10)
          return timestamp >= startTimestamp && timestamp <= endTimestamp
        })
        filteredSlot = slots.filter(obj => {
          const timestamp = parseInt(obj, 10)
          return timestamp >= startTimestamp && timestamp <= endTimestamp
        })
      }

      const allChartData = useData.filter(obj => parseInt(obj.timestamp, 10) >= firstDate)
      const allChartSlot = allSlots.filter(obj => parseInt(obj, 10) >= firstDate)
      allMainData = generateChartDataWithSlots(
        allChartSlot,
        allChartData,
        'value',
        'priceUnderlying',
        'sharePrice',
      )
      if (allMainData.length === 1) {
        const firstObject = {
          x: currentTimeStamp,
          y: allMainData[0].y,
          z: allMainData[0].z,
        }
        allMainData.unshift(firstObject)
      }

      mainData = generateChartDataWithSlots(
        range === 'Latest' || (range === 'All' && ago > 2) || range === 'CUSTOM'
          ? filteredSlot
          : slots,
        range === 'Latest' || (range === 'All' && ago > 2) || range === 'CUSTOM'
          ? filteredData
          : useData,
        'value',
        'priceUnderlying',
        'sharePrice',
      )
      if (mainData.length === 1) {
        const firstObject = {
          x: currentTimeStamp,
          y: mainData[0].y,
          z: mainData[0].z,
        }
        mainData.unshift(firstObject)
      }

      const maxValue = findMax(mainData)
      const minValue = findMin(mainData)
      const maxValueUnderlying = findMaxUnderlying(mainData)
      const minValueUnderlying = findMinUnderlying(mainData)

      const {
        maxValue: maxDomain,
        minValue: minDomain,
        maxValueUnderlying: maxDomainUnderlying,
        minValueUnderlying: minDomainUnderlying,
        len,
        lenUnderlying,
      } = getChartDomain(maxValue, minValue, maxValueUnderlying, minValueUnderlying)

      // Set date and price with latest value by default
      if (mainData.length > 0) {
        setCurDate(formatDate(mainData[mainData.length - 1].x))
        const balanceUnderlying = numberWithCommas(Number(mainData[mainData.length - 1].z))
        setCurContent(
          `${currencySym}${numberWithCommas(
            (Number(mainData[mainData.length - 1].y) * Number(currencyRate)).toFixed(fixedLen),
          )}`,
        )
        setCurContentUnderlying(balanceUnderlying)

        const startSliderPoint = mainData[0].x
        const endSliderPoint = mainData[mainData.length - 1].x

        if (range !== 'CUSTOM') {
          setStartPoint(normalizeSliderValue(startSliderPoint, minTimestamp, maxTimestamp))
          setEndPoint(normalizeSliderValue(endSliderPoint, minTimestamp, maxTimestamp))
        }
      } else {
        console.log('The chart data is either undefined or empty.')
      }

      setRoundedDecimal(-len)
      setFixedLen(len)
      setRoundedDecimalUnderlying(-lenUnderlying)
      setMinVal(minDomain)
      setMaxVal(maxDomain)
      setMaxValUnderlying(maxDomainUnderlying)
      setMinValUnderlying(minDomainUnderlying)

      const yAxisAry = getYAxisValues(minDomain, maxDomain, roundedDecimal)
      setYAxisTicks(yAxisAry)

      const zAxisAry = getYAxisValues(
        minDomainUnderlying,
        maxDomainUnderlying,
        roundedDecimalUnderlying,
      )
      setZAxisTicks(zAxisAry)
      setMainSeries(mainData)
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    connected,
    range,
    data,
    isDataReady,
    lpTokenBalance,
    totalValue,
    loadComplete,
    roundedDecimal,
    setCurContent,
    setCurContentUnderlying,
    setCurDate,
    fixedLen,
    startPoint,
    endPoint,
    data1,
  ])

  return (
    <>
      {isDataReady === 'true' ? (
        <ChartWrapper bgColorChart={bgColorChart}>
          <ResponsiveContainer width="100%" height={onlyWidth > 1291 ? 346 : 230}>
            <ComposedChart
              data={mainSeries}
              margin={{
                top: 20,
                right: 0,
                bottom: 0,
                left: roundedDecimal === 3 ? -14 : 0,
              }}
            >
              <defs>
                <linearGradient id="colorUvPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D26B" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
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
              <Line
                dataKey="z"
                type="monotone"
                strokeLinecap="round"
                strokeWidth={2}
                stroke="#8884d8"
                dot={false}
                legendType="none"
                yAxisId="right"
              />
              <XAxis
                dataKey="x"
                tickLine={false}
                tickCount={5}
                tick={renderCustomXAxisTick}
                interval={8}
              />
              <YAxis
                dataKey="y"
                tickCount={5}
                tick={renderCustomYAxisTick}
                ticks={yAxisTicks}
                domain={[minVal, maxVal]}
                stroke="none"
                yAxisId="left"
                orientation="left"
                mirror
              />
              <YAxis
                dataKey="z"
                tickCount={5}
                tick={renderCustomZAxisTick}
                ticks={zAxisTicks}
                domain={[minValUnderlying, maxValUnderlying]}
                stroke="none"
                yAxisId="right"
                orientation="right"
                mirror
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
        </ChartWrapper>
      ) : (
        <LoadingDiv>
          {isDataReady === 'loading' ? (
            <LoaderWrapper height={onlyWidth > 1291 ? '346px' : '230px'}>
              <ClipLoader size={30} margin={2} color={fontColor} />
            </LoaderWrapper>
          ) : (
            <>
              {connected ? (
                <NoData color={fontColor}>
                  No activity found for this wallet. Convert any token to start farming!
                </NoData>
              ) : (
                <NoData color={fontColor}>Connect wallet to see your balance chart</NoData>
              )}
              <FakeChartWrapper>
                <ResponsiveContainer width="100%" height={onlyWidth > 1291 ? 346 : 230}>
                  <ComposedChart
                    data={fakeChartData}
                    margin={{
                      top: 20,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorUvPrice" x1="0" y1="0" x2="0" y2="1">
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
                    <Line
                      dataKey="z"
                      type="monotone"
                      strokeLinecap="round"
                      strokeWidth={2}
                      stroke="#8884d8"
                      dot={false}
                      legendType="none"
                      yAxisId="right"
                    />
                    <XAxis
                      dataKey="x"
                      tickLine={false}
                      tickCount={5}
                      tick={renderCustomXAxisTick}
                    />
                    <YAxis
                      dataKey="y"
                      tickCount={5}
                      stroke="#00D26B"
                      yAxisId="left"
                      orientation="left"
                      mirror
                    />
                    <YAxis
                      dataKey="z"
                      tickCount={5}
                      yAxisId="right"
                      orientation="right"
                      stroke="#8884d8"
                      mirror
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </FakeChartWrapper>
            </>
          )}
        </LoadingDiv>
      )}
    </>
  )
}

export default ApexChart
