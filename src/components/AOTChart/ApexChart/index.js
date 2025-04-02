import React, { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { useWindowWidth } from '@react-hook/window-size'
import { ClipLoader } from 'react-spinners'
import { useThemeContext } from '../../../providers/useThemeContext'
import { generateColor } from '../../../utilities/parsers'
import {
  ChartWrapper,
  LoadingDiv,
  NoData,
  LoaderWrapper,
  TooltipContainer,
  TooltipContent,
  TooltipTotal,
  ProtocolEntry,
  DottedUnderline,
} from './style'
import { useVaults } from '../../../providers/Vault'

const ApexChart = ({ token, loadComplete, aotData, dataKeys, iporHvaultsLFAPY }) => {
  const { vaultsData } = useVaults()
  const { fontColor, bgColorChart } = useThemeContext()
  const onlyWidth = useWindowWidth()

  const [dataPoints, setDataPoints] = useState([])
  const [isDataReady, setIsDataReady] = useState('false')
  const [roundedDecimal] = useState(2)

  const renderTooltipContent = o => {
    const { payload, label } = o

    const date = new Date(label)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours().toString().padStart(2, '0')
    const mins = date.getMinutes().toString().padStart(2, '0')

    return (
      <TooltipContainer>
        <TooltipContent>
          <TooltipTotal>{`${day}/${month}/${year} ${hour}:${mins}`}</TooltipTotal>
          {payload
            .filter(entry => entry.value !== 0 && entry.value !== null)
            .map((entry, index) => {
              const regex = /0x[a-fA-F0-9]{40}/ // Regular expression to match Ethereum address format
              const address = entry.dataKey.match(regex)[0] ?? ''
              const value = entry.value || 0

              if (value <= 0) return null

              const vaultKey = Object.entries(vaultsData).find(
                ([, vault]) => vault.vaultAddress.toLowerCase() === address.toLowerCase(),
              )?.[0]
              const vaultParts = vaultKey
                  .split('_')
                  .map(part => part.charAt(0).toUpperCase() + part.slice(1)),
                vaultName = vaultParts.join(' ')

              return (
                <ProtocolEntry
                  key={`item-${index}`}
                  color={generateColor(iporHvaultsLFAPY, vaultKey)}
                >
                  <DottedUnderline>{vaultName}</DottedUnderline>
                  &nbsp;&nbsp;
                  {entry.value.toFixed(2)}%
                </ProtocolEntry>
              )
            })}
        </TooltipContent>
      </TooltipContainer>
    )
  }

  useEffect(() => {
    const init = async () => {
      const dl = aotData?.length ?? 0
      if (loadComplete && dl === 0) {
        setIsDataReady('false')
      } else if (!loadComplete && dl === 0) {
        setIsDataReady('loading')
      } else if (dl !== 0) {
        setIsDataReady('true')
      }

      if (
        aotData === undefined ||
        (Object.keys(aotData).length === 0 && aotData.constructor === Object) ||
        dl === 0
      ) {
        return
      }

      setDataPoints(aotData)
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataReady, loadComplete])

  return (
    <>
      {isDataReady === 'true' ? (
        <ChartWrapper bgColorChart={bgColorChart}>
          <ResponsiveContainer width="100%" height={onlyWidth > 1291 ? 346 : 365}>
            <AreaChart
              data={dataPoints}
              margin={{
                top: 20,
                right: 0,
                bottom: 0,
                left: roundedDecimal === 3 ? -14 : 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="0"
                strokeLinecap="butt"
                stroke="rgba(228, 228, 228, 0.2)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tickFormatter={tick => {
                  const date = new Date(tick)
                  return `${date.getMonth() + 1}/${date.getDate()}` // Format as M/D
                }}
                ticks={
                  dataPoints.length > 0
                    ? dataPoints
                        .filter((_, index) => index % Math.ceil(dataPoints.length / 5) === 0)
                        .map(item => item.date)
                    : []
                }
              />
              <YAxis
                domain={[0, 100]} // Set Y-axis to show from 0 to 100%
                tickFormatter={tick => `${tick}%`} // Format Y-axis ticks as percentages
                ticks={Array.from({ length: 6 }, (_, index) => index * 20)} // Generates 6 ticks: [0, 20, 40, 60, 80, 100]
                interval={0} // Show every tick (we are specifying the ticks array manually)
              />
              <Tooltip content={renderTooltipContent} />
              {dataKeys?.map(dataKey => {
                const vaultAddr = dataKey.marketId
                const vaultKey = Object.entries(vaultsData).find(
                  ([, vault]) =>
                    vault.chain === token.chain &&
                    vault.vaultAddress.toLowerCase() === vaultAddr.toLowerCase(),
                )?.[0]

                return (
                  <Area
                    key={dataKey.key}
                    type="monotone"
                    dataKey={`markets.${dataKey.key}`}
                    stackId="1"
                    stroke={generateColor(iporHvaultsLFAPY, vaultKey)}
                    fill={generateColor(iporHvaultsLFAPY, vaultKey)}
                  />
                )
              })}
            </AreaChart>
          </ResponsiveContainer>
          <></>
        </ChartWrapper>
      ) : (
        <LoadingDiv>
          {isDataReady === 'loading' ? (
            <LoaderWrapper height={onlyWidth > 1291 ? '346px' : '365px'}>
              <ClipLoader size={30} margin={2} color={fontColor} />
            </LoaderWrapper>
          ) : (
            <NoData color={fontColor}>Historical allocation data soon to be available.</NoData>
          )}
        </LoadingDiv>
      )}
    </>
  )
}

export default ApexChart
