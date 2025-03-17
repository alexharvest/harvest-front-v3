import React, { useEffect, useState } from 'react'
import ApexChart from '../ApexChart'
import { useThemeContext } from '../../../providers/useThemeContext'
import { formatDate, numberWithCommas } from '../../../utilities/formats'
import { fromWei } from '../../../services/web3'
import { getVaultHistories, getIPORVaultHistories } from '../../../utilities/apiCalls'
import {
  ChartDiv,
  Container,
  Header,
  Total,
  TokenSymbol,
  TooltipInfo,
  FlexDiv,
  CurContent,
} from './style'

const { tokens } = require('../../../data')

const SharePricesData = ({ token }) => {
  const { bgColorNew, borderColorBox, fontColor3 } = useThemeContext()

  const [loadComplete, setLoadComplete] = useState(false)
  const [sharePriceData, setSharePriceData] = useState({})
  const [curDate, setCurDate] = useState('')
  const [curContent, setCurContent] = useState('')
  const [fixedLen, setFixedLen] = useState(0)
  const [lastFarmingTimeStamp, setLastFarmingTimeStamp] = useState('-')

  const address = token.vaultAddress
  const chainId = token.chain || token.data.chain

  const handleTooltipContent = payload => {
    if (payload && payload.length) {
      const currentDate = formatDate(payload[0].payload.x)
      if (Number(payload[0].payload[token.id] === 0)) {
        setCurContent(`0`)
      } else {
        setCurContent(`${numberWithCommas(Number(payload[0].payload[token.id]))}`)
      }

      setCurDate(currentDate)
    }
  }

  const findLastMatchingTimestamp = data => {
    const dl = data.length
    if (data && dl > 0) {
      const firstSharePrice = data[dl - 1].sharePrice

      for (let i = dl - 1; i >= 0; i -= 1) {
        if (data[i].sharePrice === firstSharePrice) {
          return data[i].timestamp
        }
      }

      return data[0].timestamp
    }

    return '-'
  }

  useEffect(() => {
    let isMounted = true
    const interpolateSharePrice = (prev, next, targetTimestamp) => {
      if (!prev || !next) return prev ? parseFloat(prev.sharePrice) : parseFloat(next.sharePrice) // Handle edge cases

      const t1 = parseInt(prev.timestamp, 10), // Ensure timestamps are numbers
        p1 = parseFloat(prev.sharePrice), // Ensure prices are numbers
        t2 = parseInt(next.timestamp, 10),
        p2 = parseFloat(next.sharePrice),
        t = parseInt(targetTimestamp, 10)

      if (t1 === t2) return p1 // Avoid division by zero

      return p1 + ((p2 - p1) * (t - t1)) / (t2 - t1)
    }

    const adjustTimestamps = (sharepriceData, id) => {
      const referenceTimestamps = sharepriceData[id].map(entry => entry.timestamp)
      const referenceStartPrice = parseFloat(
        sharepriceData[id][sharepriceData[id].length - 1].sharePrice,
      )

      Object.keys(sharepriceData).forEach(key => {
        if (key === id) return // Skip itself

        const targetEntries = sharepriceData[key],
          adjustedEntries = []

        let targetIndex = 0

        referenceTimestamps.forEach(ts => {
          while (
            targetIndex < targetEntries.length - 1 &&
            Number(targetEntries[targetIndex + 1].timestamp) >= ts
          ) {
            targetIndex += 1
          }

          const prev = targetEntries[targetIndex],
            next = targetEntries[targetIndex + 1] || prev,
            interpolatedPrice = interpolateSharePrice(prev, next, ts)

          adjustedEntries.push({
            timestamp: ts,
            sharePrice: parseFloat(interpolatedPrice.toFixed(5)), // Keep precision
          })
        })

        sharepriceData[key] = adjustedEntries
      })
      Object.keys(sharepriceData).forEach(key => {
        if (key === id) return // Skip itself

        const targetEntries = sharepriceData[key],
          adjustedEntries = [],
          originalStartPrice = parseFloat(targetEntries[targetEntries.length - 1].sharePrice)

        referenceTimestamps.forEach(ts => {
          const curData = targetEntries.find(entry => entry.timestamp === ts) ?? 1,
            adjustedSharePrice =
              (parseFloat(curData.sharePrice) / originalStartPrice) * referenceStartPrice

          adjustedEntries.push({
            timestamp: ts,
            sharePrice: parseFloat(adjustedSharePrice.toFixed(5)), // Keep precision
          })
        })

        sharepriceData[key] = adjustedEntries
      })
      return sharepriceData
    }

    const initData = async () => {
      if (address && chainId) {
        try {
          let sharePricesData = {}

          setLoadComplete(false)
          if (token.allocPointData && token.allocPointData.length > 0) {
            await Promise.all(
              token.allocPointData
                .filter(data => data.hVaultId !== 'Not invested')
                .map(async data => {
                  const vaultAddress = tokens[data.hVaultId].vaultAddress
                  const vaultChain = tokens[data.hVaultId].chain
                  const { vaultHData, vaultHFlag } = await getVaultHistories(
                    vaultAddress,
                    vaultChain,
                  )
                  if (vaultHFlag) {
                    vaultHData.forEach((obj, index) => {
                      const sharePriceDecimals = fromWei(
                        obj.sharePrice,
                        tokens[data.hVaultId].decimals,
                        5,
                      )
                      vaultHData[index].sharePrice = sharePriceDecimals
                    })
                    sharePricesData[data.hVaultId] = vaultHData
                  } else {
                    sharePricesData[data.hVaultId] = {}
                  }
                }),
            )

            const { vaultHIPORFlag, vaultHIPORData } = await getIPORVaultHistories(
              token.chain,
              token.vaultAddress.toLowerCase(),
            )
            sharePricesData[token.id] = {}
            if (vaultHIPORFlag) {
              vaultHIPORData.forEach((obj, index) => {
                const sharePriceDecimals = fromWei(obj.sharePrice, token.decimals, 5)
                vaultHIPORData[index].sharePrice = sharePriceDecimals
              })
              sharePricesData[token.id] = vaultHIPORData
            }

            if (sharePricesData[token.id].length > 0) {
              sharePricesData = adjustTimestamps(sharePricesData, token.id)
            }

            setSharePriceData(sharePricesData)

            const lastMatchingTimestamp = findLastMatchingTimestamp(sharePricesData[token.id])
            setLastFarmingTimeStamp(lastMatchingTimestamp)

            if (isMounted && sharePricesData[token.id]?.length > 0) {
              setLoadComplete(true)
            }
          }
        } catch (error) {
          console.log('An error ocurred', error)
        }
      }
    }

    initData()

    return () => {
      isMounted = false
    }
  }, [address, chainId, token])

  return (
    <Container backColor={bgColorNew} borderColor={borderColorBox}>
      <Header>
        <Total>
          <FlexDiv>
            <TooltipInfo>
              <TokenSymbol className="priceshare" color="#15B088">
                Share Price
              </TokenSymbol>
              <FlexDiv>
                <CurContent color={fontColor3}>
                  {curContent === '0' ? (
                    ''
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: `${curDate}&nbsp;<span>|</span>&nbsp;` }}
                    />
                  )}
                </CurContent>
                <CurContent color="#15B088">{curContent}</CurContent>
              </FlexDiv>
            </TooltipInfo>
          </FlexDiv>
        </Total>
      </Header>
      <ChartDiv className="advanced-price">
        <ApexChart
          token={token}
          loadComplete={loadComplete}
          setCurDate={setCurDate}
          setCurContent={setCurContent}
          handleTooltipContent={handleTooltipContent}
          setFixedLen={setFixedLen}
          fixedLen={fixedLen}
          lastFarmingTimeStamp={lastFarmingTimeStamp}
          isInactive={token.inactive}
          sharePriceData={sharePriceData}
        />
      </ChartDiv>
    </Container>
  )
}
export default SharePricesData
