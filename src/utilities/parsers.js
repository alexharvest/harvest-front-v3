import BigNumber from 'bignumber.js'
import { get, sum, sumBy, find } from 'lodash'
import {
  FARM_GRAIN_TOKEN_SYMBOL,
  FARM_TOKEN_SYMBOL,
  FARM_WETH_TOKEN_SYMBOL,
  MAX_APY_DISPLAY,
  HARVEST_LAUNCH_DATE,
  SPECIAL_VAULTS,
} from '../constants'
import { CHAIN_IDS } from '../data/constants'
import { ceil10, floor10, formatNumber, round10 } from './formats'
import Arbitrum from '../assets/images/chains/arbitrum.svg'
import Base from '../assets/images/chains/base.svg'
import Zksync from '../assets/images/chains/zksync.svg'
import Ethereum from '../assets/images/chains/ethereum.svg'
import Polygon from '../assets/images/chains/polygon.svg'
import { fromWei } from '../services/web3'

export const totalNetProfitKey = 'TOTAL_NET_PROFIT'
export const totalHistoryDataKey = 'TOTAL_HISTORY_DATA'
export const vaultProfitDataKey = 'VAULT_LIFETIME_YIELD'

export const getNextEmissionsCutDate = () => {
  const result = new Date()
  result.setUTCHours(19)
  result.setUTCMinutes(0)
  result.setUTCSeconds(0)
  result.setUTCMilliseconds(0)
  result.setUTCDate(result.getUTCDate() + ((2 - result.getUTCDay() + 7) % 7))
  return result
}

export const getUserVaultBalance = (
  tokenSymbol,
  farmingBalances,
  totalStakedInPool,
  iFARMBalance,
) => {
  switch (tokenSymbol) {
    case FARM_TOKEN_SYMBOL:
      // return new BigNumber(totalStakedInPool).plus(iFARMBalance).toString()
      return iFARMBalance.toString()
    case FARM_WETH_TOKEN_SYMBOL:
    case FARM_GRAIN_TOKEN_SYMBOL:
      return totalStakedInPool
    default:
      return farmingBalances[tokenSymbol]
        ? farmingBalances[tokenSymbol] === 'error'
          ? false
          : farmingBalances[tokenSymbol]
        : '0'
  }
}

export const getUserVaultBalanceInDetail = (tokenSymbol, totalStakedInPool, iFARMinFARM) => {
  switch (tokenSymbol) {
    case FARM_TOKEN_SYMBOL:
      return new BigNumber(totalStakedInPool).plus(iFARMinFARM).toString()
    default:
      return totalStakedInPool
  }
}

export const getVaultValue = token => {
  if (token.isIPORVault) {
    if (token.totalValueLocked) {
      return new BigNumber(get(token, 'totalValueLocked', 0))
    }
    return new BigNumber(0)
  }
  const poolId = get(token, 'data.id')

  switch (poolId) {
    case SPECIAL_VAULTS.FARM_WETH_POOL_ID:
      return get(token, 'data.lpTokenData.liquidity')
    case SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID: {
      if (!get(token, 'data.lpTokenData.price')) {
        return null
      }

      return new BigNumber(get(token, 'data.totalValueLocked', 0))
    }
    case SPECIAL_VAULTS.FARM_GRAIN_POOL_ID:
    case SPECIAL_VAULTS.FARM_USDC_POOL_ID:
      return get(token, 'data.totalValueLocked')
    default:
      return token.usdPrice
        ? new BigNumber(token.underlyingBalanceWithInvestment?.toString())
            .times(token.usdPrice)
            .dividedBy(new BigNumber(10).pow(token.decimals))
        : null
  }
}

export const getTotalApy = (vaultPool, token, isSpecialVault) => {
  const vaultData = isSpecialVault ? token.data : vaultPool

  if (
    isSpecialVault &&
    vaultData &&
    vaultData.id &&
    vaultData.id === SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID
  ) {
    if (Number(token.profitShareAPY) <= 0) {
      return null
    }
    return Number.isNaN(Number(token.profitShareAPY)) ? 0 : Number(token.profitShareAPY).toFixed(2)
  }
  // if(token === undefined) {
  //   return 0;
  // }
  let farmAPY = token.hideFarmApy
      ? sumBy(
          vaultPool.rewardAPY.filter((_, index) => index !== 0),
          apy => Number(apy),
        )
      : get(vaultData, 'totalRewardAPY', 0),
    total

  const tradingAPY = get(vaultData, 'tradingApy', 0)
  const estimatedApy = get(token, 'estimatedApy', 0)
  const boostedEstimatedApy = get(token, 'boostedEstimatedAPY', 0)
  const boostedRewardApy = get(vaultData, 'boostedRewardAPY', 0)

  if (new BigNumber(farmAPY).gte(MAX_APY_DISPLAY)) {
    farmAPY = MAX_APY_DISPLAY
  }

  total = new BigNumber(tradingAPY).plus(
    token.fullBuyback && new BigNumber(boostedEstimatedApy).gt(0)
      ? boostedEstimatedApy
      : estimatedApy,
  )

  if (new BigNumber(farmAPY).gt(0)) {
    if (new BigNumber(boostedRewardApy).gt(0)) {
      total = total.plus(boostedRewardApy)

      if (vaultPool && vaultPool.rewardTokenSymbols.length >= 2) {
        total = total.plus(sumBy(vaultPool.rewardAPY.slice(1), apy => Number(apy)))
      }
    } else {
      total = total.plus(farmAPY)
    }
  }

  if (total.isNaN()) {
    return null
  }

  return total.toFixed(2)
}

export const getTotalFARMSupply = () => {
  const earlyEmissions = [57569.1, 51676.2, 26400.0, 24977.5]
  const weeksSinceLaunch = Math.floor(
    (new Date() - HARVEST_LAUNCH_DATE) / (7 * 24 * 60 * 60 * 1000),
  ) // Get number of weeks (including partial) between now, and the launch date
  let thisWeeksSupply = 690420

  if (weeksSinceLaunch <= 208) {
    const emissionsWeek5 = 23555.0
    const emissionsWeeklyScale = 0.95554375

    const totalOfEarlyEmissions = sum(earlyEmissions)

    thisWeeksSupply =
      totalOfEarlyEmissions +
      (emissionsWeek5 * (1 - emissionsWeeklyScale ** (weeksSinceLaunch - 4))) /
        (1 - emissionsWeeklyScale)
  }

  return thisWeeksSupply
}

export const getChainNamePortals = chain => {
  let chainName = 'ethereum'
  switch (chain) {
    case CHAIN_IDS.POLYGON_MAINNET:
      chainName = 'polygon'
      break
    case CHAIN_IDS.ARBITRUM_ONE:
      chainName = 'arbitrum'
      break
    case CHAIN_IDS.BASE:
      chainName = 'base'
      break
    case CHAIN_IDS.ZKSYNC:
      chainName = 'zksync'
      break
    default:
      chainName = 'ethereum'
      break
  }
  return chainName
}

export const getChainName = chain => {
  let chainName = 'Ethereum'
  switch (chain) {
    case CHAIN_IDS.POLYGON_MAINNET:
      chainName = 'Polygon'
      break
    case CHAIN_IDS.ARBITRUM_ONE:
      chainName = 'Arbitrum'
      break
    case CHAIN_IDS.BASE:
      chainName = 'Base'
      break
    case CHAIN_IDS.ZKSYNC:
      chainName = 'Zksync'
      break
    default:
      chainName = 'Ethereum'
      break
  }
  return chainName
}

export const getChainIcon = chainNum => {
  let icon = null
  if (chainNum) {
    switch (chainNum) {
      case CHAIN_IDS.ETH_MAINNET:
        icon = Ethereum
        break
      case CHAIN_IDS.POLYGON_MAINNET:
        icon = Polygon
        break
      case CHAIN_IDS.ARBITRUM_ONE:
        icon = Arbitrum
        break
      case CHAIN_IDS.BASE:
        icon = Base
        break
      case CHAIN_IDS.ZKSYNC:
        icon = Zksync
        break
      default:
        icon = Ethereum
        break
    }
  }
  return icon
}

export const getTimeSlots = (ago, slotCount) => {
  const slots = [],
    nowDate = new Date(),
    toDate = Math.floor(nowDate.getTime() / 1000),
    fromDate = Math.floor(nowDate.setDate(nowDate.getDate() - ago) / 1000),
    between = (toDate - fromDate) / slotCount,
    sl = slots.length

  for (let i = fromDate + between; i <= toDate && sl < slotCount; i += between) {
    slots.push(i)
  }

  return slots
}

export const getChartDomain = (maxValue, minValue, maxValueUnderlying, minValueUnderlying) => {
  let len = 0,
    lenUnderlying = 0,
    unitBtw,
    unitBtwUnderlying

  minValue /= 1.01
  const between = maxValue - minValue
  const betweenUnderlying = maxValueUnderlying - minValueUnderlying
  unitBtw = between / 4
  unitBtwUnderlying = betweenUnderlying / 4
  if (unitBtw >= 1) {
    unitBtw = Math.ceil(unitBtw)
    len = 2
    // len = unitBtw.toString().length
    unitBtw = ceil10(unitBtw, len - 1)
    // maxValue = ceil10(maxValue, len - 1)
    // minValue = floor10(minValue, len - 1)
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

  if (unitBtwUnderlying >= 1) {
    unitBtwUnderlying = Math.ceil(unitBtwUnderlying)
    lenUnderlying = unitBtwUnderlying.toString().length
    unitBtwUnderlying = ceil10(unitBtwUnderlying, lenUnderlying - 1)
    maxValueUnderlying = ceil10(maxValueUnderlying, lenUnderlying - 1)
    minValueUnderlying = floor10(minValueUnderlying, lenUnderlying - 1)
  } else if (unitBtwUnderlying === 0) {
    lenUnderlying = Math.ceil(maxValueUnderlying).toString().length
    maxValueUnderlying += 10 ** (lenUnderlying - 1)
    minValueUnderlying -= 10 ** (lenUnderlying - 1)
  } else {
    lenUnderlying = Math.ceil(1 / unitBtwUnderlying).toString().length + 1
    unitBtwUnderlying = ceil10(unitBtwUnderlying, -lenUnderlying)
    maxValueUnderlying = ceil10(maxValueUnderlying, -lenUnderlying)
    minValueUnderlying = floor10(minValueUnderlying, -lenUnderlying + 1)
  }
  if (unitBtw !== 0) {
    if (minValue === 0) {
      maxValue *= 1.1
    } else {
      maxValue += between / 5
    }
  } else {
    unitBtw = (maxValue - minValue) / 4
  }

  if (unitBtwUnderlying !== 0) {
    if (minValueUnderlying === 0) {
      maxValueUnderlying *= 1.5
    } else {
      maxValueUnderlying += betweenUnderlying * 2
    }
    // minValueUnderlying = 0
  } else {
    unitBtwUnderlying = (maxValueUnderlying - minValueUnderlying) / 4
  }

  return { maxValue, minValue, maxValueUnderlying, minValueUnderlying, len, lenUnderlying }
}

export const getRangeNumber = strRange => {
  let ago = 30
  if (strRange === '1D') {
    ago = 1
  } else if (strRange === '1W') {
    ago = 7
  } else if (strRange === '1M') {
    ago = 30
  } else if (strRange === '1Y') {
    ago = 365
  } else if (strRange === 'ALL') {
    ago = 365
  }

  return ago
}

export const findMax = data => {
  const ary = data.map(el => el.y)
  const max = Math.max(...ary)
  return max
}

export const findMin = data => {
  const ary = data.map(el => el.y)
  const min = Math.min(...ary)
  return min
}

export const findMaxData = data => {
  let maxVal = -Infinity // Start with the smallest possible value

  Object.values(data).forEach(item => {
    if (item && item.value !== undefined) {
      maxVal = Math.max(maxVal, item.value)
    }
  })

  return maxVal === -Infinity ? null : maxVal // Return null if no valid value found
}

export const findMinData = data => {
  let minVal = Infinity

  Object.values(data).forEach(item => {
    if (item && item.value !== undefined) {
      minVal = Math.min(minVal, item.value)
    }
  })

  return minVal === Infinity ? null : minVal
}

export const findMinMax = (data, key) => {
  const filteredData = data.filter(item => item[key] !== undefined)

  filteredData.sort((a, b) => a[key] - b[key])

  return {
    min: filteredData[0] ? { x: filteredData[0].x, value: filteredData[0][key] } : null,
    max: filteredData[filteredData.length - 1]
      ? {
          x: filteredData[filteredData.length - 1].x,
          value: filteredData[filteredData.length - 1][key],
        }
      : null,
  }
}

export const findClosestIndex = (data, target) => {
  let closestIndex = 0,
    closestDistance = Math.abs(data[0].x - target)

  const dl = data.length
  for (let i = 1; i < dl; i += 1) {
    const distance = Math.abs(data[i].x - target)
    if (distance < closestDistance) {
      closestIndex = i
      closestDistance = distance
    }
  }

  return closestIndex
}

export const getYAxisValues = (min, max, roundNum) => {
  const duration = Number(max - min)
  const ary = []
  for (let i = min; i <= max; i += duration / 4) {
    const val = round10(i, roundNum)
    ary.push(val)
  }
  return ary
}

export const getTokenNames = (userVault, dataVaults) => {
  const vaults = userVault.vaults
  const tokenNames = []
  const matchedVaults = {}

  Object.entries(vaults).forEach(([vaultKey]) => {
    const match = Object.entries(dataVaults).find(([, vaultData]) => {
      return (
        vaultData.vaultAddress &&
        vaultData.vaultAddress.toLowerCase() === vaultKey.toLowerCase() &&
        !vaultData.inactive
      )
    })

    if (match) {
      const [, vaultData] = match
      if (vaultData.tokenNames.length > 1) {
        tokenNames.push(vaultData.tokenNames.join(', '))
      } else {
        tokenNames.push(...vaultData.tokenNames)
      }
      matchedVaults[vaultKey] = vaults[vaultKey]
    }
  })

  userVault.vaults = matchedVaults
  return tokenNames
}

export const getVaultApy = (vaultKey, vaultsGroup, vaultsData, pools) => {
  let token = null,
    tokenSymbol = null,
    // specialVaultFlag = false,
    vaultPool

  // if (vaultKey.toLowerCase() === '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651') {
  //   vaultKey = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  //   specialVaultFlag = true
  // }

  Object.entries(vaultsGroup).forEach(([key, vaultData]) => {
    if (vaultData.data) {
      if (vaultData.data.collateralAddress.toLowerCase() === vaultKey.toLowerCase()) {
        token = vaultData
        tokenSymbol = key
      }
    } else if (
      vaultData.vaultAddress &&
      vaultData.vaultAddress.toLowerCase() === vaultKey.toLowerCase()
    ) {
      token = vaultData
      tokenSymbol = key
    }
  })

  const isSpecialVault = token.liquidityPoolVault || token.poolVault

  const tokenVault = get(vaultsData, token.hodlVaultId || tokenSymbol)

  if (isSpecialVault) {
    vaultPool = token.data
  } else {
    vaultPool = find(pools, pool => pool.collateralAddress === get(tokenVault, `vaultAddress`))
  }

  const totalApy = isSpecialVault
    ? getTotalApy(null, token, true)
    : getTotalApy(vaultPool, tokenVault)

  return totalApy
}

export const getMigrateVaultApy = (vaultKey, vaultsGroup, vaultsData, pools) => {
  let token = null,
    tokenSymbol = null,
    vaultPool

  if (vaultKey.toLowerCase() === '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651') {
    vaultKey = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  }

  Object.entries(vaultsGroup).forEach(([key, vaultData]) => {
    if (vaultData.data) {
      if (vaultData.data.collateralAddress.toLowerCase() === vaultKey.toLowerCase()) {
        token = vaultData
        tokenSymbol = key
      }
    } else if (
      vaultData.vaultAddress &&
      vaultData.vaultAddress.toLowerCase() === vaultKey.toLowerCase()
    ) {
      token = vaultData
      tokenSymbol = key
    }
  })

  const isSpecialVault = token.liquidityPoolVault || token.poolVault

  const tokenVault = get(vaultsData, token.hodlVaultId || tokenSymbol)

  if (isSpecialVault) {
    vaultPool = token.data
  } else {
    vaultPool = find(pools, pool => pool.collateralAddress === get(tokenVault, `vaultAddress`))
  }

  const totalApy = isSpecialVault
    ? getTotalApy(null, token, true)
    : getTotalApy(vaultPool, tokenVault)

  const vaultTvl = getVaultValue(isSpecialVault ? token : tokenVault)

  return { totalApy, vaultTvl }
}

export const rearrangeApiData = (apiData, groupOfVaults) => {
  const vaultsFilteredData = Object.entries(apiData)
    .map(([wallet, entry]) => {
      const vaultsNumber = Object.entries(entry.vaults).length
      const vaultTokenNames = getTokenNames(entry, groupOfVaults)
      if (vaultTokenNames.length > 0 && Number(vaultsNumber) > 0) {
        return [wallet, entry]
      }
      return null
    })
    .filter(item => item != null)

  const removeLowMonthlyYieldData = vaultsFilteredData
    .map(([wallet, entry]) => {
      const result = (entry.totalDailyYield * 365) / 12
      if (result >= 0.01) {
        return [wallet, entry]
      }
      return null
    })
    .filter(item => item != null)

  const filteredApiData = Object.fromEntries(removeLowMonthlyYieldData)

  const vaultBalanceSortedData = Object.entries(filteredApiData)
    .map(([address, data]) => {
      // eslint-disable-next-line no-shadow
      const totalVaultBalance = Object.values(data.vaults).reduce((sum, vault) => {
        return sum + vault.balance
      }, 0)
      data.totalBalance = totalVaultBalance
      return { address, data, totalVaultBalance }
    })
    .sort((a, b) => b.totalVaultBalance - a.totalVaultBalance)
    .reduce((acc, { address, data }) => {
      acc[address] = data
      return acc
    }, {})

  Object.entries(vaultBalanceSortedData).forEach(([, value]) => {
    if (value.vaults) {
      value.vaults = Object.fromEntries(
        Object.entries(value.vaults).sort(([, a], [, b]) => b.balance - a.balance),
      )
    }
  })
  return vaultBalanceSortedData
}

export const getHighestApy = (allVaults, chainName, vaultsData, pools) => {
  const sameNetworkVautls = []

  Object.entries(allVaults).map(vault => {
    if (Number(vault[1].chain) === chainName) {
      const vaultApy = getVaultApy(vault[1].vaultAddress, allVaults, vaultsData, pools)
      sameNetworkVautls.push({ vaultApy: Number(vaultApy), vault: vault[1] })
    }
    return true
  })
  sameNetworkVautls.sort((a, b) => b.vaultApy - a.vaultApy)
  if (sameNetworkVautls[0].vaultApy) {
    return sameNetworkVautls[0]
  }
  return null
}

export const getSecondApy = (allVaults, chainName, vaultsData, pools) => {
  const sameNetworkVautls = []

  Object.entries(allVaults).map(vault => {
    if (Number(vault[1].chain) === chainName) {
      const vaultApy = getVaultApy(vault[1].vaultAddress, allVaults, vaultsData, pools)
      sameNetworkVautls.push({ vaultApy: Number(vaultApy), vault: vault[1] })
    }
    return true
  })
  sameNetworkVautls.sort((a, b) => b.vaultApy - a.vaultApy)
  if (sameNetworkVautls[1].vaultApy) {
    return sameNetworkVautls[1]
  }
  return null
}

export const getMatchedVaultList = (allVaults, chainName, vaultsData, pools) => {
  const sameNetworkVaults = []

  Object.entries(allVaults).map(vault => {
    const compareChain = vault[1].poolVault
      ? vault[1].data
        ? vault[1].data.chain
        : null
      : vault[1].chain
    const address = vault[1].poolVault ? vault[1].tokenAddress : vault[1].vaultAddress
    if (
      Number(compareChain) === Number(chainName) &&
      vault[0] !== 'IFARM' &&
      compareChain !== null
    ) {
      const { totalApy: vaultApy, vaultTvl } = getMigrateVaultApy(
        address,
        allVaults,
        vaultsData,
        pools,
      )
      sameNetworkVaults.push({
        vaultApy: Number(vaultApy),
        vaultTvl: Number(vaultTvl),
        vault: vault[1],
      })
    }
    return true
  })
  sameNetworkVaults.sort((a, b) => b.vaultApy - a.vaultApy)
  if (sameNetworkVaults) {
    return sameNetworkVaults
  }
  return false
}

export const mergeArrays = (rewardsAPIData, totalHistoryData) => {
  const rewardsData = rewardsAPIData.map(reward => ({
    event: 'Rewards',
    symbol: reward.token.symbol,
    timestamp: reward.timestamp,
    rewards: fromWei(reward.value, reward.token.decimals, reward.token.decimals, true),
    rewardsUSD:
      parseFloat(reward.price) *
      fromWei(reward.value, reward.token.decimals, reward.token.decimals, true),
  }))

  const combinedArray = [...totalHistoryData, ...rewardsData]

  combinedArray.sort((a, b) => parseInt(b.timestamp, 10) - parseInt(a.timestamp, 10))

  return combinedArray
}

export const handleToggle = setter => () => setter(prev => !prev)

export const getUnderlyingId = vaultData => {
  if (vaultData.isIPORVault && vaultData.allocPointData?.length > 1) {
    if (vaultData?.allocPointData[0]?.hVaultId !== 'Not invested')
      return vaultData.allocPointData[0].hVaultId
    return vaultData.allocPointData[1].hVaultId
  }
  return ''
}

export const calculateApy = (vaultHData, latestSharePriceValue, vaultData, periodDays) => {
  const filteredData = vaultHData.filter(
    entry => Number(entry.timestamp) >= Number(vaultHData[0].timestamp) - periodDays * 24 * 3600,
  )

  if (filteredData.length === 0) return '0%'

  const initialSharePrice = fromWei(
    filteredData[filteredData.length - 1].sharePrice,
    vaultData.decimals || vaultData.data.watchAsset.decimals,
    vaultData.decimals || vaultData.data.watchAsset.decimals,
    false,
  )

  return `${formatNumber(
    ((latestSharePriceValue - initialSharePrice) / (periodDays / 365)) * 100,
    2,
  )}%`
}

/* eslint-disable no-plusplus, no-bitwise, one-var */
export const generateColor = key => {
  let hash = 0

  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash)
  }

  const r = hash & 0x7f
  const g = (hash >> 3) & 0x7f
  const b = 128 + ((hash >> 6) & 0x7f)

  const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`

  return color.toUpperCase()
}
/* eslint-enable no-plusplus, no-bitwise, one-var */
