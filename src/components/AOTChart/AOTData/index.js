import React, { useEffect, useState } from 'react'
import ApexChart from '../ApexChart'
import { useThemeContext } from '../../../providers/useThemeContext'
import { getPlasmaVaultHistory } from '../../../utilities/apiCalls'
import { ChartDiv, Container, Header, Total, TokenSymbol, TooltipInfo, FlexDiv } from './style'

const AOTData = ({ chainName, token, iporHvaultsLFAPY }) => {
  const { bgColorNew, borderColorBox } = useThemeContext()

  const [loadComplete, setLoadComplete] = useState(false)
  const [aotData, setAOTData] = useState({})
  const [dataKeys, setDataKeys] = useState({})

  const address = token.vaultAddress
  const chainId = token.chain || token.data.chain

  const getMarketBalances = (marketBalances, tvl) => {
    return marketBalances.reduce(
      (acc, { balanceUsd, marketId }) => {
        const balanceLessThanOneCent = Number(balanceUsd) / Number(tvl) < 0.0001
        const marketBalance = balanceLessThanOneCent ? null : Number(balanceUsd)
        const key = marketId

        return {
          markets: {
            ...acc.markets,
            [key]: marketBalance,
          },
          sum: acc.sum + Number(balanceUsd),
        }
      },
      {
        markets: {},
        sum: 0,
      },
    )
  }

  const getAllocationOvertimeData = data => {
    if (!data) return undefined

    return data
      .map(({ blockTimestamp, marketBalances, tvl, blockNumber }) => {
        const erc4626 = getMarketBalances(marketBalances, tvl)
        const marketsSum = erc4626.sum
        const unallocatedMaybe = +tvl - marketsSum
        const unallocated = unallocatedMaybe <= 0.01 ? null : unallocatedMaybe

        return {
          date: blockTimestamp,
          blockNumber,
          markets: { ...erc4626.markets },
          marketsSum,
          unallocated,
        }
      })
      .filter(entry => entry.marketsSum > 0)
  }

  const getMarketDataKeys = data => {
    if (!data) return undefined

    const marketsKeys = data.flatMap(({ marketBalances }) => {
      return marketBalances.map(({ protocol, marketId }) => {
        marketId = marketId || ''
        return {
          marketType: 'erc4626',
          protocol,
          key: marketId,
          marketId,
        }
      })
    })

    return Array.from(new Map(marketsKeys.map(keyData => [keyData.key, keyData])).values())
  }

  useEffect(() => {
    let isMounted = true

    const initData = async () => {
      if (address && chainId) {
        try {
          setLoadComplete(false)

          const data = await getPlasmaVaultHistory(address, chainId)
          const aotDataResponse = getAllocationOvertimeData(data)

          if (aotDataResponse?.length > 0) {
            aotDataResponse.forEach(item => {
              if (item.marketsSum !== 0) {
                const unallocated = item.unallocated === null ? 0 : item.unallocated
                const totalSum = item.marketsSum + unallocated
                let newMarketsSum = 0
                Object.keys(item.markets).forEach(key => {
                  item.markets[key] = item.markets[key] === null ? 0 : item.markets[key]
                  item.markets[key] = (item.markets[key] / totalSum) * 100
                  newMarketsSum += item.markets[key]
                })
                item.unallocated =
                  item.unallocated === null ? 0 : (item.unallocated / totalSum) * 100
                item.marketsSum = newMarketsSum
              }
            })
          }

          const keys = getMarketDataKeys(data)
          setDataKeys(keys)

          setAOTData(aotDataResponse)

          if (isMounted && aotDataResponse?.length > 0 && keys?.length > 0) {
            setLoadComplete(true)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chainId, token, setAOTData, setDataKeys])

  return (
    <Container backColor={bgColorNew} borderColor={borderColorBox}>
      <Header>
        <Total>
          <FlexDiv>
            <TooltipInfo>
              <TokenSymbol className="priceshare" color="#15B088">
                Allocation
              </TokenSymbol>
            </TooltipInfo>
          </FlexDiv>
        </Total>
      </Header>
      <ChartDiv className="advanced-price">
        <ApexChart
          chainName={chainName}
          token={token}
          loadComplete={loadComplete}
          aotData={aotData}
          dataKeys={dataKeys}
          iporHvaultsLFAPY={iporHvaultsLFAPY}
        />
      </ChartDiv>
    </Container>
  )
}
export default AOTData
