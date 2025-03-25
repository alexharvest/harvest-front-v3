import React, { useState, useMemo } from 'react'
import { find, get, keys, orderBy, sortBy } from 'lodash'
import move from 'lodash-move'
import { CHAIN_IDS } from '../../data/constants'
import { isSpecialApp } from '../../utilities/formats'
import { getVaultValue, getTotalApy } from '../../utilities/parsers'
import { FARM_TOKEN_SYMBOL, IFARM_TOKEN_SYMBOL, SPECIAL_VAULTS } from '../../constants'
import { useVaults } from '../../providers/Vault'
import { usePools } from '../../providers/Pools'
import { useStats } from '../../providers/Stats'
import { useWallet } from '../../providers/Wallet'
import { useThemeContext } from '../../providers/useThemeContext'
import UserBalanceData from '../../components/UserBalanceChart/UserBalanceData'
import FarmDetailChart from '../../components/DetailChart/FarmDetailChart'
import { Container, Inner, Title, ChartSection, PriceChartArea } from './style'
import { addresses } from '../../data'

const formatVaults = (groupOfVaults, chainId) => {
  let vaultsSymbol = sortBy(keys(groupOfVaults), [
    // eslint-disable-next-line consistent-return
    key => {
      if (get(groupOfVaults, `[${key}].isNew`, get(groupOfVaults, `[${key}].data.isNew`))) {
        return groupOfVaults[key]
      }
    },
    // eslint-disable-next-line consistent-return
    key => {
      if (!get(groupOfVaults, `[${key}].isNew`, get(groupOfVaults, `[${key}].data.isNew`))) {
        return groupOfVaults[key]
      }
    },
  ])

  if (
    (isSpecialApp && chainId === CHAIN_IDS.ETH_MAINNET) ||
    (!isSpecialApp && chainId === CHAIN_IDS.ETH_MAINNET)
  ) {
    const farmIdx = vaultsSymbol.findIndex(symbol => symbol === FARM_TOKEN_SYMBOL)
    vaultsSymbol = move(vaultsSymbol, farmIdx, 0)

    const wethIdx = vaultsSymbol.findIndex(symbol => symbol === 'WETH')
    vaultsSymbol = move(vaultsSymbol, wethIdx, 1)
  }

  // not include beginners farm(DAI, WETH, USDC, USDT)
  vaultsSymbol = vaultsSymbol.filter(
    tokenSymbol =>
      tokenSymbol !== IFARM_TOKEN_SYMBOL &&
      tokenSymbol !== 'DAI' &&
      tokenSymbol !== 'WETH' &&
      tokenSymbol !== 'USDT' &&
      tokenSymbol !== 'USDC' &&
      tokenSymbol !== 'SUSHI_GNOME_ETH' &&
      tokenSymbol !== 'SUSHI_GENE_ETH' &&
      (chainId === groupOfVaults[tokenSymbol]?.chain ||
        (groupOfVaults[tokenSymbol]?.data && chainId === groupOfVaults[tokenSymbol]?.data.chain)) &&
      !groupOfVaults[tokenSymbol].inactive,
  )
  vaultsSymbol = orderBy(vaultsSymbol, v => Number(getVaultValue(groupOfVaults[v])), 'desc')

  vaultsSymbol = [...new Set(vaultsSymbol)].slice(0, 10)
  return vaultsSymbol
}

const Charts = () => {
  const { pageBackColor, fontColor } = useThemeContext()

  const { vaultsData } = useVaults()
  const { profitShareAPY } = useStats()
  const { pools } = usePools()
  const { chainId } = useWallet()

  const farmProfitSharingPool = pools.find(
    pool => pool.id === SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID,
  )

  const poolVaults = useMemo(
    () => ({
      [FARM_TOKEN_SYMBOL]: {
        poolVault: true,
        profitShareAPY,
        data: farmProfitSharingPool,
        logoUrl: ['./icons/ifarm.svg'],
        tokenAddress: addresses.FARM,
        vaultAddress: addresses.FARM,
        rewardSymbol: 'iFarm',
        tokenNames: ['FARM'],
      },
    }),
    [farmProfitSharingPool, profitShareAPY],
  )

  let groupOfVaults = []
  if (isSpecialApp) {
    if (chainId === CHAIN_IDS.ETH_MAINNET) groupOfVaults = { ...vaultsData, ...poolVaults }
    else groupOfVaults = { ...vaultsData }
  } else {
    groupOfVaults = { ...vaultsData, ...poolVaults }
  }

  const ethVaultsSymbol = useMemo(() => formatVaults(groupOfVaults, CHAIN_IDS.ETH_MAINNET), [
    groupOfVaults,
  ])
  const polVaultsSymbol = useMemo(() => formatVaults(groupOfVaults, CHAIN_IDS.POLYGON_MAINNET), [
    groupOfVaults,
  ])
  const arbVaultsSymbol = useMemo(() => formatVaults(groupOfVaults, CHAIN_IDS.ARBITRUM_ONE), [
    groupOfVaults,
  ])

  const zksyncVaultsSymbol = useMemo(() => formatVaults(groupOfVaults, CHAIN_IDS.ZKSYNC), [
    groupOfVaults,
  ])

  const [, setLoadData] = useState(true)

  return (
    <Container pageBackColor={pageBackColor} fontColor={fontColor}>
      <Inner>
        <Title>Ethereum: </Title>
        {ethVaultsSymbol.map((symbol, i) => {
          const token = groupOfVaults[symbol]
          const isSpecialVault = token.liquidityPoolVault || token.poolVault
          let vaultPool

          const tokenVault = get(vaultsData, token.hodlVaultId || symbol)

          if (isSpecialVault) {
            vaultPool = token.data
          } else {
            vaultPool = find(
              pools,
              pool => pool.collateralAddress === get(tokenVault, `vaultAddress`),
            )
          }

          const vaultValue = getVaultValue(token)
          const totalApy = isSpecialVault
            ? getTotalApy(null, token, true)
            : getTotalApy(vaultPool, tokenVault)

          return (
            <ChartSection key={i}>
              <PriceChartArea>
                <UserBalanceData
                  token={token}
                  vaultPool={vaultPool}
                  tokenSymbol={symbol}
                  setLoadData={setLoadData}
                />
              </PriceChartArea>
              <PriceChartArea>
                <FarmDetailChart
                  token={token}
                  vaultPool={vaultPool}
                  lastTVL={Number(vaultValue)}
                  lastAPY={Number(totalApy)}
                />
              </PriceChartArea>
            </ChartSection>
          )
        })}
        <Title>Polygon: </Title>
        {polVaultsSymbol.map((symbol, i) => {
          const token = groupOfVaults[symbol]
          const isSpecialVault = token.liquidityPoolVault || token.poolVault
          let vaultPool

          const tokenVault = get(vaultsData, token.hodlVaultId || symbol)

          if (isSpecialVault) {
            vaultPool = token.data
          } else {
            vaultPool = find(
              pools,
              pool => pool.collateralAddress === get(tokenVault, `vaultAddress`),
            )
          }

          const vaultValue = getVaultValue(token)
          const totalApy = isSpecialVault
            ? getTotalApy(null, token, true)
            : getTotalApy(vaultPool, tokenVault)

          return (
            <ChartSection key={i}>
              <PriceChartArea>
                <UserBalanceData
                  token={token}
                  vaultPool={vaultPool}
                  tokenSymbol={symbol}
                  setLoadData={setLoadData}
                />
              </PriceChartArea>
              <PriceChartArea>
                <FarmDetailChart
                  token={token}
                  vaultPool={vaultPool}
                  lastTVL={Number(vaultValue)}
                  lastAPY={Number(totalApy)}
                />
              </PriceChartArea>
            </ChartSection>
          )
        })}
        <Title>Arbitrum: </Title>
        {arbVaultsSymbol.map((symbol, i) => {
          const token = groupOfVaults[symbol]
          const isSpecialVault = token.liquidityPoolVault || token.poolVault
          let vaultPool

          const tokenVault = get(vaultsData, token.hodlVaultId || symbol)

          if (isSpecialVault) {
            vaultPool = token.data
          } else {
            vaultPool = find(
              pools,
              pool => pool.collateralAddress === get(tokenVault, `vaultAddress`),
            )
          }

          const vaultValue = getVaultValue(token)
          const totalApy = isSpecialVault
            ? getTotalApy(null, token, true)
            : getTotalApy(vaultPool, tokenVault)

          return (
            <ChartSection key={i}>
              <PriceChartArea>
                <UserBalanceData
                  token={token}
                  vaultPool={vaultPool}
                  tokenSymbol={symbol}
                  setLoadData={setLoadData}
                />
              </PriceChartArea>
              <PriceChartArea>
                <FarmDetailChart
                  token={token}
                  vaultPool={vaultPool}
                  lastTVL={Number(vaultValue)}
                  lastAPY={Number(totalApy)}
                />
              </PriceChartArea>
            </ChartSection>
          )
        })}
        <Title>Zksync: </Title>
        {zksyncVaultsSymbol.map((symbol, i) => {
          const token = groupOfVaults[symbol]
          const isSpecialVault = token.liquidityPoolVault || token.poolVault
          let vaultPool

          const tokenVault = get(vaultsData, token.hodlVaultId || symbol)

          if (isSpecialVault) {
            vaultPool = token.data
          } else {
            vaultPool = find(
              pools,
              pool => pool.collateralAddress === get(tokenVault, `vaultAddress`),
            )
          }

          const vaultValue = getVaultValue(token)
          const totalApy = isSpecialVault
            ? getTotalApy(null, token, true)
            : getTotalApy(vaultPool, tokenVault)

          return (
            <ChartSection key={i}>
              <PriceChartArea>
                <UserBalanceData
                  token={token}
                  vaultPool={vaultPool}
                  tokenSymbol={symbol}
                  setLoadData={setLoadData}
                />
              </PriceChartArea>
              <PriceChartArea>
                <FarmDetailChart
                  token={token}
                  vaultPool={vaultPool}
                  lastTVL={Number(vaultValue)}
                  lastAPY={Number(totalApy)}
                />
              </PriceChartArea>
            </ChartSection>
          )
        })}
      </Inner>
    </Container>
  )
}

export default Charts
