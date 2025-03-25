import React, { useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import Chart from 'react-apexcharts'
import { useThemeContext } from '../../providers/useThemeContext'
import { ceil10, floor10 } from '../../utilities/formats'
import { findMax, findMin, getTimeSlots } from '../../utilities/parsers'

function generateChartDataWithSlots(slots, apiData, kind) {
  const seriesData = [],
    sl = slots.length,
    al = slots.length

  for (let i = 0; i < sl; i += 1) {
    for (let j = 0; j < al; j += 1) {
      if (slots[i] > parseInt(apiData[j].timestamp, 10)) {
        const value = parseFloat(apiData[j][kind])
        seriesData.push([slots[i] * 1000, value])
        break
      } else if (j === al - 1) {
        seriesData.push([slots[i] * 1000, 0])
      }
    }
  }

  return seriesData
}

function generateChartDataForApy(apyData1, apyData2, field) {
  apyData1 = apyData1.map(function reducer(x) {
    return [x.timestamp, Number(x[field]), 1]
  })
  apyData2 = apyData2.map(function reducer(x) {
    return [x.timestamp, Number(x[field]), 2]
  })

  let apyData = apyData1.concat(apyData2)
  apyData = apyData.sort(function reducer(a, b) {
    return b[0] - a[0]
  })

  const al = apyData.length
  for (let i = 0; i < al; i += 1) {
    if (i === 0) {
      if (apyData[i][2] !== apyData[i + 1][2]) apyData[i][1] += apyData[i + 1][1]
    } else if (i === al - 1) {
      if (apyData[i][2] !== apyData[i - 1][2]) {
        apyData[i][1] += apyData[i - 1][1]
      }
    } else if (apyData[i][2] !== apyData[i + 1][2]) {
      if (apyData[i][2] !== apyData[i - 1][2]) {
        if (
          Math.abs(apyData[i][1] - apyData[i - 1][1]) <= Math.abs(apyData[i][1] - apyData[i + 1][1])
        )
          apyData[i][1] += apyData[i - 1][1]
        else apyData[i][1] += apyData[i + 1][1]
      } else {
        apyData[i][1] += apyData[i + 1][1]
      }
    } else if (apyData[i][2] !== apyData[i - 1][2]) {
      apyData[i][1] += apyData[i - 1][1]
    }
  }

  apyData = apyData.map(function reducer(x) {
    const d = 1 / x[1]
    if (d > 1) {
      const len = Math.ceil(d).toString().length + 1
      x[1] = x[1].toFixed(len)
    }
    const obj = {}
    obj.timestamp = x[0]
    obj[field] = x[1]
    return obj
  })

  return apyData
}

const ApexChart = ({ data, lastAPY }) => {
  const { backColor } = useThemeContext()

  const [mainSeries, setMainSeries] = useState([
    {
      name: 'TVL m$',
      data: [],
    },
  ])

  const [options, setOptions] = useState({
    chart: {
      id: 'apexchart-example',
      zoom: {
        enabled: false,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
      type: 'area',
      stacked: false,
      height: 350,
      foreColor: '#707070',
      background: 'transparent',
      animations: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },
    stroke: {
      colors: ['#12B76A'],
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      enabled: false,
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#F8DD9C'],
        inverseColors: true,
        opacityFrom: 0.6,
        opacityTo: 0.2,
        stops: [0, 20, 100],
        colorStops: [],
      },
    },
    tooltip: {
      enabled: false,
    },
    markers: {
      strokeColor: '#EDAE50',
      size: 0,
      strokeWidth: 2,
      fillColor: '#fff',
      hover: { size: 8 },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  })

  const [, setLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      let mainData = [],
        apyData = [],
        maxAPY = lastAPY,
        len = 0,
        unitBtw,
        maxValue,
        minValue
      setLoading(true)
      const ago = 30

      if (data && (data.apyAutoCompounds || data.apyRewards)) {
        if (data.apyAutoCompounds.length === 0 && data.apyRewards.length === 0) {
          return
        }
      }
      const apyAutoCompounds = data ? (data.apyAutoCompounds ? data.apyAutoCompounds : []) : [],
        apyRewards = data ? (data.apyRewards ? data.apyRewards : []) : []

      apyData = generateChartDataForApy(apyAutoCompounds, apyRewards, 'apy')
      if (lastAPY && lastAPY !== 0 && apyData.length !== 0) apyData[0].apy = lastAPY

      const slotCount = 30,
        slots = getTimeSlots(ago, slotCount)

      if (apyData.length === 0) {
        return
      }

      mainData = generateChartDataWithSlots(slots, apyData, 'apy')

      maxAPY = findMax(mainData)
      const minAPY = findMin(mainData)

      maxValue = maxAPY
      minValue = minAPY

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
      /**
       * Set min value with 0, and max value *1.5 - trello card
       */
      if (unitBtw !== 0) {
        maxValue *= 1.5
        minValue = 0
      } else {
        unitBtw = (maxValue - minValue) / 4
      }

      const yAxis = {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      }

      setMainSeries([
        {
          data: mainData,
        },
      ])

      setOptions({
        chart: {
          id: 'chartArea',
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
          foreColor: '#707070',
          stacked: false,
          background: 'transparent',
          zoom: {
            type: 'x',
            enabled: false,
          },
        },
        grid: {
          show: false,
        },
        stroke: {
          colors: ['#ffffff'],
          width: 3,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
          enabled: false,
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: ['#F8DD9C'],
            inverseColors: true,
            opacityFrom: 0.6,
            opacityTo: 0.2,
            stops: [0, 20, 100],
            colorStops: [],
          },
        },
        tooltip: {
          enabled: false,
        },
        markers: {
          strokeColor: '#EDAE50',
          size: 0,
          strokeWidth: 2,
          fillColor: '#fff',
          hover: { size: 8 },
        },
        yaxis: yAxis,
        xaxis: {
          show: false,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
      })

      setLoading(false)
    }

    init()
  }, [backColor, data, lastAPY])

  const onlyWidth = useWindowWidth()
  return (
    <>
      <Chart
        options={options}
        series={mainSeries}
        type="line"
        height="100"
        width={`${onlyWidth > 1352 ? '100' : onlyWidth > 992 ? '60' : '100'}`}
      />
    </>
  )
}

export default ApexChart
