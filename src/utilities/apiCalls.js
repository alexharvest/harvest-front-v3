import axios from 'axios'
import { get } from 'lodash'
import { CHAIN_IDS } from '../data/constants'
import {
  GRAPH_URLS,
  TOTAL_TVL_API_ENDPOINT,
  HISTORICAL_RATES_API_ENDPOINT,
  GECKO_URL,
  COINGECKO_API_KEY,
  POOLS_API_ENDPOINT,
  LEADERBOARD_API_ENDPOINT,
} from '../constants'
import { fromWei } from '../services/web3'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const executeGraphCall = async (url, query, variables, retries = 10, delayMs = 5000) => {
  let retry = 0,
    response
  try {
    response = await axios.post(url, {
      query,
      variables,
    })
  } catch (error) {
    response = error.response
  }

  while (retry < retries && (!response || response.status !== 200)) {
    console.warn(`Error in subgraph call. Retry ${retry + 1}. Retrying after ${delayMs}ms...`)
    // eslint-disable-next-line no-await-in-loop
    await delay(delayMs)
    try {
      // eslint-disable-next-line no-await-in-loop
      response = await axios.post(url, {
        query,
        variables,
      })
    } catch (error) {
      response = error.response
    }
    retry += 1
  }
  const data = get(response, 'data.data')
  if (data) {
    return data
  }
  return null
}

export const getLastHarvestInfo = async (address, chainId) => {
  let result = ''
  const nowDate = Math.floor(new Date().getTime() / 1000)

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'

  const query = `
    query getLastHarvestInfo($vault: String!) {
      vaultHistories(
        first: 1,
        where: {
          vault: $vault,
        },
        orderBy: timestamp,
        orderDirection: desc
      ) {
        timestamp
      }
    }
  `
  const variables = address === farm ? { vault: ifarm } : { vault: address }
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, variables)
  const hisData = data.vaultHistories

  if (hisData && hisData.length !== 0) {
    const timeStamp = hisData[0].timestamp
    let duration = Number(nowDate) - Number(timeStamp),
      day = 0,
      hour = 0,
      min = 0
    // calculate (and subtract) whole days
    day = Math.floor(duration / 86400)
    duration -= day * 86400

    // calculate (and subtract) whole hours
    hour = Math.floor(duration / 3600) % 24
    duration -= hour * 3600

    // calculate (and subtract) whole minutes
    min = Math.floor(duration / 60) % 60

    const dayString = `${day > 0 ? `${day}d` : ''}`
    const hourString = `${hour > 0 ? `${hour}h` : ''}`
    const minString = `${min > 0 ? `${min}m` : ''}`
    result = `${`${dayString !== '' ? `${dayString} ` : ''}${
      hourString !== '' ? `${hourString} ` : ''
    }`}${minString}`
  }
  return result
}

export const getPublishDate = async () => {
  const allData = [],
    allFlags = []

  const graphqlQueries = [
    {
      url: GRAPH_URLS[CHAIN_IDS.ETH_MAINNET],
      query: `{
        vaults(
          first: 1000,
          orderBy: timestamp,
          orderDirection: desc
        ) {
          id, timestamp
        }
      }`,
    },
    {
      url: GRAPH_URLS[CHAIN_IDS.POLYGON_MAINNET],
      query: `{
        vaults(
          first: 1000,
          orderBy: timestamp,
          orderDirection: desc
        ) {
          id, timestamp
        }
      }`,
    },
    {
      url: GRAPH_URLS[CHAIN_IDS.BASE],
      query: `{
        vaults(
          first: 1000,
          orderBy: timestamp,
          orderDirection: desc
        ) {
          id, timestamp
        }
      }`,
    },
    {
      url: GRAPH_URLS[CHAIN_IDS.ARBITRUM_ONE],
      query: `{
        vaults(
          first: 1000,
          orderBy: timestamp,
          orderDirection: desc
        ) {
          id, timestamp
        }
      }`,
    },
    {
      url: GRAPH_URLS[CHAIN_IDS.ZKSYNC],
      query: `{
        vaults(
          first: 1000,
          orderBy: timestamp,
          orderDirection: desc
        ) {
          id, timestamp
        }
      }`,
    },
  ]

  try {
    const results = await Promise.all(
      graphqlQueries.map(({ url, query }) => executeGraphCall(url, query, {})),
    )

    results.forEach(data => {
      allData.push(...data.vaults)
      allFlags.push(data.vaults.length > 0)
    })
  } catch (err) {
    console.error('Error fetching data:', err)
    return { data: [], flag: false }
  }

  const combinedFlags = allFlags.every(flag => flag)
  return { data: allData, flag: combinedFlags }
}

export const getSequenceId = async (address, chainId) => {
  let vaultTVLCount,
    vaultPriceFeedCount,
    vaultsFlag = true

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
  const vaultAddress = address === farm ? ifarm : address

  const query = `
    {
      vaults(
        first: 1000,
        orderBy: timestamp,
        orderDirection: desc
      ) {
        id, tvlSequenceId, priceFeedSequenceId
      }
    }
  `
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, {})
  const vaultsData = data ? data.vaults : []

  if (!vaultsData || vaultsData.length === 0) {
    vaultsFlag = false
  } else {
    const matchingVault = vaultsData.find(vault => vault.id === vaultAddress)
    if (matchingVault) {
      vaultTVLCount = matchingVault.tvlSequenceId
      vaultPriceFeedCount = matchingVault.priceFeedSequenceId
    }
  }

  return { vaultTVLCount, vaultPriceFeedCount, vaultsFlag }
}

export const getIPORSequenceId = async (vault, chainId) => {
  let vaultTVLCount

  const query = `
    query getVaultHistories($vault: String!) {
      plasmaVaultHistories(
        where: {
          plasmaVault: $vault,
        },
        first: 1000,
        orderBy: timestamp,
        orderDirection: desc
      ) {
        historySequenceId
      }
    }
  `
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, { vault })
  const vaultsData = data ? data.plasmaVaultHistories : []

  if (!vaultsData || vaultsData.length === 0) {
    vaultTVLCount = 0
  } else if (vaultsData) {
    vaultTVLCount = vaultsData[0].historySequenceId
  }

  return { vaultTVLCount }
}

export const getVaultHistories = async (address, chainId) => {
  let vaultHData = [],
    vaultHFlag = true

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'

  const query = `
    query getVaultHistories($vault: String!) {
      vaultHistories(
        first: 1000,
        where: {
          vault: $vault,
        },
        orderBy: timestamp,
        orderDirection: desc
      ) {
        priceUnderlying, sharePrice, timestamp
      }
    }
  `
  const variables = address === farm ? { vault: ifarm } : { vault: address }
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, variables)
  vaultHData = data?.vaultHistories

  if (!vaultHData || vaultHData.length === 0) {
    vaultHFlag = false
  }

  return { vaultHData, vaultHFlag }
}

export const getCurrencyRateHistories = async () => {
  const apiResponse = await axios.get(HISTORICAL_RATES_API_ENDPOINT)
  const apiData = get(apiResponse, 'data')
  return apiData
}

export const getDataQuery = async (
  address,
  chainId,
  vaultTVLCount,
  asQuery,
  timestamp,
  chartData = {},
) => {
  const sequenceIdsArray = []
  if (vaultTVLCount > 10000) {
    const step = Math.ceil(vaultTVLCount / 2000)
    for (let i = 1; i <= vaultTVLCount; i += step) {
      sequenceIdsArray.push(i)
    }
  } else if (vaultTVLCount > 1000) {
    const step = Math.ceil(vaultTVLCount / 1000)
    for (let i = 1; i <= vaultTVLCount; i += step) {
      sequenceIdsArray.push(i)
    }
  } else {
    for (let i = 1; i <= vaultTVLCount; i += 1) {
      sequenceIdsArray.push(i)
    }
  }

  const nowTime = Math.floor(new Date().getTime() / 1000)
  const timestampQuery = asQuery ? timestamp : nowTime
  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'

  const query = `
    query getData($vault: String!, $endTime: BigInt, $sequenceIds: [Int!]) {
      generalApies(
        first: 1000,
        where: {
          vault: $vault,
        }, 
        orderBy: timestamp, 
        orderDirection: desc
      ) { 
        apy, timestamp
      }
      tvls(
        first: 1000,
        where: {
          vault: $vault, 
          timestamp_lt: $endTime,
          tvlSequenceId_in: $sequenceIds
        },
        orderBy: timestamp,
        orderDirection: desc
      ) {
        value, timestamp
      },
      vaultHistories(
        first: 1000,
        where: {
          vault: $vault,
        },
        orderBy: timestamp,
        orderDirection: desc
      ) {
        priceUnderlying, sharePrice, timestamp
      }
    }
  `
  const variables =
    address === farm
      ? { vault: ifarm, endTime: timestampQuery, sequenceIds: sequenceIdsArray }
      : { vault: address, endTime: timestampQuery, sequenceIds: sequenceIdsArray }
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, variables)
  // To merge the response data into the chartData object
  Object.keys(data).forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(chartData, key)) {
      chartData[key] = data[key]
    } else if (Array.isArray(chartData[key]) && Array.isArray(data[key])) {
      chartData[key].push(...data[key])
    } else if (typeof chartData[key] === 'object' && typeof data[key] === 'object') {
      Object.assign(chartData[key], data[key])
    } else {
      chartData[key] = data[key]
    }
  })
  console.log(chartData)
  const dataTimestamp = Number(
    chartData.vaultHistories[chartData.vaultHistories.length - 1].timestamp,
  )
  const initTimestamp = Number(chartData.generalApies[chartData.generalApies.length - 1].timestamp)

  if (data.tvls.length === 1000 && dataTimestamp > initTimestamp) {
    await getDataQuery(address, chainId, vaultTVLCount, true, dataTimestamp, chartData)
  }
  return chartData
}

export const getRewardEntities = async (account, address, chainId) => {
  let rewardsData = [],
    rewardsFlag = true

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
  const vaultAddress = address === farm ? ifarm : address

  if (account) {
    account = account.toLowerCase()
  }

  const query = `
    query getRewardEntities($vault: String!, $account: String!) {
      rewardPaidEntities(
        first:1000,
        where: {
          userAddress: $account,
          pool_: {
            vault: $vault,
          }
        },
        orderBy: timestamp,
        orderDirection: desc,
      ) {
        price,
        value,
        pool {
          vault {
            id
          }
        },
        token {
          symbol,
          decimals,
        },
        timestamp,
      }
    }
  `
  const variables = { vault: vaultAddress, account }
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, variables)
  rewardsData = data ? data.rewardPaidEntities : []

  if (!rewardsData || rewardsData.length === 0) {
    rewardsFlag = false
  }

  return { rewardsData, rewardsFlag }
}

export const getAllRewardEntities = async account => {
  const rewardsAPIData = []

  if (account) {
    account = account.toLowerCase()
  }

  const query = `
    query getRewardEntities($account: String!) {
      rewardPaidEntities(
        first:1000,
        where: {
          userAddress: $account,
        },
        orderBy: timestamp,
        orderDirection: desc,
      ) {
        price,
        value,
        pool {
          vault {
            id
          }
        },
        token {
          symbol,
          decimals,
        },
        timestamp,
      }
    }
  `
  const variables = { account }
  const urls = [
    GRAPH_URLS[CHAIN_IDS.ETH_MAINNET],
    GRAPH_URLS[CHAIN_IDS.POLYGON_MAINNET],
    GRAPH_URLS[CHAIN_IDS.BASE],
    GRAPH_URLS[CHAIN_IDS.ARBITRUM_ONE],
  ]

  const results = await Promise.all(urls.map(url => executeGraphCall(url, query, variables)))
  results.forEach(userRewardsData => {
    if (userRewardsData && Array.isArray(userRewardsData.rewardPaidEntities)) {
      userRewardsData.rewardPaidEntities.forEach(reward => {
        rewardsAPIData.push(reward)
      })
    }
  })
  rewardsAPIData.sort((a, b) => b.timestamp - a.timestamp)

  return { rewardsAPIData }
}

export const getIPORDataQuery = async (
  vault,
  chainId,
  vaultTVLCount,
  asQuery,
  timestamp,
  chartData = {},
) => {
  const sequenceIdsArray = []
  if (vaultTVLCount > 10000) {
    const step = Math.ceil(vaultTVLCount / 2000)
    for (let i = 1; i <= vaultTVLCount; i += step) {
      sequenceIdsArray.push(i)
    }
  } else if (vaultTVLCount > 1000) {
    const step = Math.ceil(vaultTVLCount / 1000)
    for (let i = 1; i <= vaultTVLCount; i += step) {
      sequenceIdsArray.push(i)
    }
  } else {
    for (let i = 1; i <= vaultTVLCount; i += 1) {
      sequenceIdsArray.push(i)
    }
  }

  const nowTime = Math.floor(new Date().getTime() / 1000)
  const timestampQuery = asQuery ? timestamp : nowTime

  const query = `
    query getData($vault: String!, $endTime: BigInt, $sequenceIds: [Int!]) {
    generalApies: plasmaVaultHistories(
        where: {
          plasmaVault: $vault,
        },
        first: 1000,
        orderBy: timestamp, 
        orderDirection: desc
      ) { 
        apy, timestamp
      }
      tvls: plasmaVaultHistories(
        first: 1000,
        where: {
          plasmaVault: $vault,
          timestamp_lt: $endTime,
          historySequenceId_in: $sequenceIds
        },
        orderBy: timestamp,
        orderDirection: desc
      ) {
        tvl, timestamp
      },
      vaultHistories: plasmaVaultHistories(
        where: {
          plasmaVault: $vault,
        },
        first: 1000,
        orderBy: timestamp,
        orderDirection: desc
      ) {
        priceUnderlying, sharePrice, timestamp
      }
    }
  `
  const variables = { vault, endTime: timestampQuery, sequenceIds: sequenceIdsArray }
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, variables)
  // To merge the response data into the chartData object
  Object.keys(data).forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(chartData, key)) {
      chartData[key] = data[key]
    } else if (Array.isArray(chartData[key]) && Array.isArray(data[key])) {
      chartData[key].push(...data[key])
    } else if (typeof chartData[key] === 'object' && typeof data[key] === 'object') {
      Object.assign(chartData[key], data[key])
    } else {
      chartData[key] = data[key]
    }
  })

  const dataTimestamp = Number(chartData.tvls[chartData.tvls.length - 1]?.timestamp)
  const initTimestamp = Number(chartData.generalApies[chartData.generalApies.length - 1]?.timestamp)

  if (data.tvls.length === 1000 && dataTimestamp > initTimestamp) {
    await getDataQuery(vaultTVLCount, true, dataTimestamp, chartData)
  }

  chartData.tvls.forEach(obj => {
    obj.value = obj.tvl
    delete obj.tvl
  })

  return chartData
}

export const getUserBalanceVaults = async account => {
  const userBalanceVaults = []
  let userBalanceFlag = true
  if (account) {
    account = account.toLowerCase()
  }

  const query = `
    query getUserVaults($account: String!) {
      userBalances(
        where: {
          userAddress: $account,
        }
      ) {
        vault{ id }
      }
    }
  `
  const variables = { account }
  const urls = [
    GRAPH_URLS[CHAIN_IDS.ETH_MAINNET],
    GRAPH_URLS[CHAIN_IDS.POLYGON_MAINNET],
    GRAPH_URLS[CHAIN_IDS.BASE],
    GRAPH_URLS[CHAIN_IDS.ARBITRUM_ONE],
    GRAPH_URLS[CHAIN_IDS.ZKSYNC],
  ]

  try {
    const results = await Promise.all(urls.map(url => executeGraphCall(url, query, variables)))

    results.forEach(userBalanceVaultData => {
      const balances = userBalanceVaultData.userBalances
      balances.forEach(balance => {
        userBalanceVaults.push(balance.vault.id)
      })
    })
  } catch (err) {
    console.error('Fetch data about user balance vaults failed: ', err)
    userBalanceFlag = false
  }
  return { userBalanceVaults, userBalanceFlag }
}

export const checkIPORUserBalance = async (account, vaultAdr, chainId) => {
  if (account) {
    account = account.toLowerCase()
  }

  const iporquery = `
    query getUserBalance($account: String!, $vaultAdr: String!) {
      plasmaUserBalances(
        where: {
          userAddress: $account,
          plasmaVault: $vaultAdr,
        }
      ) {
        id, plasmaVault, value
      }
    }
  `

  const variables = { account, vaultAdr }
  const url = GRAPH_URLS[chainId]

  try {
    const result = await executeGraphCall(url, iporquery, variables)
    if (result.plasmaUserBalances.length > 0) return true
    return false
  } catch (err) {
    console.error('Fetch data about user balance vaults failed: ', err)
    return false
  }
}

export const getUserBalanceHistories = async (address, chainId, account) => {
  let balanceData = [],
    balanceFlag = true

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
  if (account) {
    account = account.toLowerCase()
  }

  const query = `
    query getUserBalanceHistories($vault: String!, $account: String!) {
      userBalanceHistories(
        first: 1000,
        where: {
          vault: $vault,
          userAddress: $account,
        },
        orderBy: timestamp,
        orderDirection: desc,
      ) {
        value, timestamp
      }
    }
  `
  const variables = address === farm ? { vault: ifarm, account } : { vault: address, account }
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, variables)
  balanceData = data?.userBalanceHistories

  if (!balanceData || balanceData.length === 0) {
    balanceFlag = false
  }
  return { balanceData, balanceFlag }
}

export const getIPORUserBalanceHistories = async (vaultAdr, chainId, account) => {
  let balanceIPORData = {},
    balanceIPORFlag = true

  if (account) {
    account = account.toLowerCase()
  }

  const query = `
    query getUserBalanceHistories($account: String!, $vaultAdr: String!) {
      plasmaUserBalanceHistories(
        first: 1000,
        where: {
          plasmaVault: $vaultAdr,
          userAddress: $account,
        },
        orderBy: timestamp,
        orderDirection: desc,
      ) {
        value, timestamp
      }
    }
  `
  const url = GRAPH_URLS[chainId]
  try {
    const data = await executeGraphCall(url, query, { account, vaultAdr })
    balanceIPORData = data?.plasmaUserBalanceHistories
  } catch (e) {
    return e
  }

  if (!balanceIPORData || balanceIPORData.length === 0) {
    balanceIPORFlag = false
  }
  return { balanceIPORData, balanceIPORFlag }
}

export const getIPORLastHarvestInfo = async (vaultAdr, chainId) => {
  let result = ''
  const nowDate = Math.floor(new Date().getTime() / 1000)

  const query = `
    query getLastHarvestInfo($vaultAdr: String!){
      plasmaVaultHistories(
        where: {
          plasmaVault: $vaultAdr,
        },
        first: 1,
        orderBy: timestamp,
        orderDirection: desc
      ) {
        timestamp
      }
    }
`
  const variables = { vaultAdr }
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, variables)
  const hisData = data?.plasmaVaultHistories

  if (hisData && hisData.length !== 0) {
    const timeStamp = hisData[0].timestamp
    let duration = Number(nowDate) - Number(timeStamp),
      day = 0,
      hour = 0,
      min = 0
    // calculate (and subtract) whole days
    day = Math.floor(duration / 86400)
    duration -= day * 86400

    // calculate (and subtract) whole hours
    hour = Math.floor(duration / 3600) % 24
    duration -= hour * 3600

    // calculate (and subtract) whole minutes
    min = Math.floor(duration / 60) % 60

    const dayString = `${day > 0 ? `${day}d` : ''}`
    const hourString = `${hour > 0 ? `${hour}h` : ''}`
    const minString = `${min > 0 ? `${min}m` : ''}`
    result = `${`${dayString !== '' ? `${dayString} ` : ''}${
      hourString !== '' ? `${hourString} ` : ''
    }`}${minString}`
  }
  return result
}

export const getIPORVaultHistories = async (chainId, vaultAdr) => {
  let vaultHIPORData = {},
    vaultHIPORFlag = true

  const query = `
    query  getVaultHistories($vaultAdr: String!){
      plasmaVaultHistories(
        where: {
          plasmaVault: $vaultAdr,
        },
        first: 1000,
        orderBy: timestamp,
        orderDirection: desc
      ) {
        tvl, apy, priceUnderlying, sharePrice, timestamp
      }
    }
  `
  const variables = { vaultAdr }
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, variables)
  vaultHIPORData = data?.plasmaVaultHistories

  if (!vaultHIPORData || vaultHIPORData.length === 0) {
    vaultHIPORFlag = false
  }

  return { vaultHIPORData, vaultHIPORFlag }
}

export const getPriceFeeds = async (
  address,
  chainId,
  vaultPriceFeedCount,
  firstTimeStamp,
  timestamp,
  asQuery,
  priceFeedData = [],
) => {
  let priceFeedFlag = true
  const sequenceIdsArray = []

  if (vaultPriceFeedCount > 10000) {
    const step = Math.ceil(vaultPriceFeedCount / 2000)
    for (let i = 1; i <= vaultPriceFeedCount; i += step) {
      sequenceIdsArray.push(i)
    }
  } else if (vaultPriceFeedCount > 1000) {
    const step = Math.ceil(vaultPriceFeedCount / 1000)
    for (let i = 1; i <= vaultPriceFeedCount; i += step) {
      sequenceIdsArray.push(i)
    }
  } else {
    for (let i = 1; i <= vaultPriceFeedCount; i += 1) {
      sequenceIdsArray.push(i)
    }
  }

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
  const nowTime = Math.floor(new Date().getTime() / 1000)
  const timestampQuery = timestamp && asQuery ? timestamp : nowTime

  const query = `
    query getPriceFeeds($vault: String!, $endTime: BigInt, $sequenceIds: [Int!]) {
      priceFeeds(
        first: 1000,
        where: {
          vault: $vault,
          timestamp_lt: $endTime,
          priceFeedSequenceId_in: $sequenceIds,
        },
        orderBy: timestamp,
        orderDirection: desc,
      ) {
        sharePrice, price, timestamp
      }
    }
  `
  const variables =
    address === farm
      ? { vault: ifarm, endTime: timestampQuery, sequenceIds: sequenceIdsArray }
      : { vault: address, endTime: timestampQuery, sequenceIds: sequenceIdsArray }
  const url = GRAPH_URLS[chainId]

  const data = await executeGraphCall(url, query, variables)

  if (data && data.priceFeeds && Array.isArray(data.priceFeeds)) {
    priceFeedData.push(...data.priceFeeds)
    const dataTimestamp = priceFeedData[priceFeedData.length - 1]?.timestamp
    if (Number(dataTimestamp) > Number(firstTimeStamp)) {
      return getPriceFeeds(
        address,
        chainId,
        vaultPriceFeedCount,
        firstTimeStamp,
        dataTimestamp,
        true,
        priceFeedData,
      )
    }
  } else {
    console.error('Error: Unable to retrieve price feeds from the response.')
    priceFeedFlag = false
  }

  if (priceFeedData.length === 0) {
    priceFeedFlag = false
  }
  return { priceFeedData, priceFeedFlag }
}

const removeZeroValueObjects = data => {
  let nonZeroValueEncountered = false
  const dl = data.length
  for (let i = dl - 1; i >= 0; i -= 1) {
    if (parseFloat(data[i].value) === 0 || data[i].value === '0') {
      if (!nonZeroValueEncountered) {
        data.splice(i, 1)
      }
    } else {
      nonZeroValueEncountered = true
    }
  }
  return data
}

export const initBalanceAndDetailData = async (
  address,
  chainId,
  account,
  tokenDecimals,
  isIPORVault = false,
  vaultDecimals = 8,
) => {
  const timestamps = []
  const uniqueVaultHData = []
  const updatedBalanceData = []
  const mergedData = []
  let bFlag = false,
    vHFlag = false,
    enrichedData = [],
    sumNetChange = 0,
    sumNetChangeUsd = 0,
    sumLatestNetChange = 0,
    sumLatestNetChangeUsd = 0

  if (!isIPORVault) {
    const { balanceData, balanceFlag } = await getUserBalanceHistories(address, chainId, account)
    const { vaultHData, vaultHFlag } = await getVaultHistories(address, chainId)
    bFlag = balanceFlag
    vHFlag = vaultHFlag

    if (vaultHFlag) {
      vaultHData.forEach(obj => {
        if (!timestamps.includes(obj.timestamp)) {
          timestamps.push(obj.timestamp)
          const sharePriceDecimals = fromWei(obj.sharePrice, tokenDecimals, tokenDecimals)
          const modifiedObj = { ...obj, sharePrice: sharePriceDecimals }
          uniqueVaultHData.push(modifiedObj)
        }
      })
    }

    if (balanceFlag && vaultHFlag) {
      let uniqueData = [],
        uniqueFixedData = [],
        lastUserEvent = false,
        lastUserEventUsd = false,
        lastKnownSharePrice = null,
        lastKnownPriceUnderlying = null

      const bl = balanceData.length,
        ul = uniqueVaultHData.length
      if (balanceData[0].timestamp > uniqueVaultHData[0].timestamp) {
        let i = 0,
          z = 0,
          addFlag = false

        while (balanceData[i]?.timestamp > uniqueVaultHData[0].timestamp) {
          balanceData[i].priceUnderlying = uniqueVaultHData[0].priceUnderlying
          balanceData[i].sharePrice = uniqueVaultHData[0].sharePrice
          mergedData.push(balanceData[i])
          i += 1
        }
        while (i < bl) {
          if (z < ul) {
            while (uniqueVaultHData[z].timestamp >= balanceData[i].timestamp) {
              uniqueVaultHData[z].value = balanceData[i].value
              mergedData.push(uniqueVaultHData[z])
              z += 1
              if (!addFlag && uniqueVaultHData[z].timestamp === balanceData[i].timestamp) {
                addFlag = true
              }
            }
          }
          if (!addFlag) {
            balanceData[i].priceUnderlying = uniqueVaultHData[z === ul ? z - 1 : z].priceUnderlying
            balanceData[i].sharePrice = uniqueVaultHData[z === ul ? z - 1 : z].sharePrice
            mergedData.push(balanceData[i])
          }
          addFlag = false
          i += 1
        }
        while (z < ul) {
          uniqueVaultHData[z].value = 0
          mergedData.push(uniqueVaultHData[z])
          z += 1
        }
        while (i < bl) {
          balanceData[i].priceUnderlying = uniqueVaultHData[ul - 1].priceUnderlying
          balanceData[i].sharePrice = uniqueVaultHData[ul - 1].sharePrice
          mergedData.push(balanceData[i])
          i += 1
        }
      } else {
        let i = 0,
          z = 0,
          addFlag = false
        while (i < ul && uniqueVaultHData[i].timestamp > balanceData[0].timestamp) {
          uniqueVaultHData[i].value = balanceData[0].value
          mergedData.push(uniqueVaultHData[i])
          i += 1
        }
        while (z < bl) {
          if (i < ul) {
            while (uniqueVaultHData[i].timestamp >= balanceData[z].timestamp) {
              uniqueVaultHData[i].value = balanceData[z].value
              mergedData.push(uniqueVaultHData[i])
              i += 1
              if (i >= ul) {
                break
              }
              if (!addFlag && uniqueVaultHData[i].timestamp === balanceData[z].timestamp) {
                addFlag = true
              }
            }
          }
          if (!addFlag) {
            balanceData[z].priceUnderlying = uniqueVaultHData[i === ul ? i - 1 : i].priceUnderlying
            balanceData[z].sharePrice = uniqueVaultHData[i === ul ? i - 1 : i].sharePrice
            mergedData.push(balanceData[z])
          }
          addFlag = false
          z += 1
        }
        while (i < ul) {
          uniqueVaultHData[i].value = 0
          mergedData.push(uniqueVaultHData[i])
          i += 1
        }
        while (z < bl) {
          balanceData[z].priceUnderlying = uniqueVaultHData[ul - 1].priceUnderlying
          balanceData[z].sharePrice = uniqueVaultHData[ul - 1].sharePrice
          mergedData.push(balanceData[z])
          z += 1
        }
      }

      const filteredData = removeZeroValueObjects(mergedData)

      // Create a map to keep track of unique combinations of 'value' and 'sharePrice'
      const map = new Map()
      filteredData.forEach(item => {
        const key = `${item.value}_${item.sharePrice}`
        map.set(key, item)
      })

      // Convert the map back to an array
      uniqueData = Array.from(map.values())
      uniqueData.sort((a, b) => b.timestamp - a.timestamp)

      uniqueFixedData = uniqueData.map(item => {
        if (item.sharePrice === '0') {
          item.sharePrice = lastKnownSharePrice !== null ? lastKnownSharePrice : item.sharePrice
        } else {
          lastKnownSharePrice = item.sharePrice
        }

        if (item.priceUnderlying === '0') {
          item.priceUnderlying =
            lastKnownPriceUnderlying !== null ? lastKnownPriceUnderlying : item.priceUnderlying
        } else {
          lastKnownPriceUnderlying = item.priceUnderlying
        }

        return item
      })

      enrichedData = uniqueFixedData
        .map((item, index, array) => {
          const nextItem = array[index + 1]
          let event, balance, balanceUsd, netChange, netChangeUsd

          if (Number(item.value) === 0) {
            if (nextItem && Number(nextItem.value) === 0) {
              return false
            }
            balance = '0'
            balanceUsd = '0'
          } else {
            balance = Number(item.value) * Number(item.sharePrice)
            balanceUsd = balance * Number(item.priceUnderlying)
          }

          if (nextItem) {
            if (Number(item.value) === Number(nextItem.value)) {
              event = 'Harvest'
            } else if (Number(item.value) > Number(nextItem.value)) {
              event = 'Convert'
            } else {
              event = 'Revert'
            }

            const nextBalance = Number(nextItem.value) * Number(nextItem.sharePrice)
            netChange = balance - nextBalance
            netChangeUsd = Number(netChange) * Number(item.priceUnderlying)
          } else {
            event = 'Convert'
            netChange = balance
            netChangeUsd = netChange * Number(item.priceUnderlying)
          }

          return {
            ...item,
            event,
            balance,
            balanceUsd,
            netChange,
            netChangeUsd,
          }
        })
        .filter(Boolean)

      sumNetChange = enrichedData.reduce((sumValue, item) => {
        if (item.event === 'Harvest') {
          return sumValue + item.netChange
        }
        return sumValue
      }, 0)
      sumNetChangeUsd = enrichedData.reduce((sumUsdValue, item) => {
        if (item.event === 'Harvest') {
          return sumUsdValue + item.netChangeUsd
        }
        return sumUsdValue
      }, 0)

      enrichedData.forEach(item => {
        if (!lastUserEvent) {
          if (item.event === 'Harvest') {
            sumLatestNetChange += item.netChange
          } else if (item.event === 'Convert' || item.event === 'Revert') {
            lastUserEvent = true
          }
        }
      })
      enrichedData.forEach(item => {
        if (!lastUserEventUsd) {
          if (item.event === 'Harvest') {
            sumLatestNetChangeUsd += item.netChangeUsd
          } else if (item.event === 'Convert' || item.event === 'Revert') {
            lastUserEventUsd = true
          }
        }
      })
    }
  } else {
    const {
      balanceIPORData: balanceData,
      balanceIPORFlag: balanceFlag,
    } = await getIPORUserBalanceHistories(address.toLowerCase(), chainId, account)
    const { vaultHIPORData: vaultHData, vaultHIPORFlag: vaultHFlag } = await getIPORVaultHistories(
      chainId,
      address.toLowerCase(),
    )
    bFlag = balanceFlag
    vHFlag = vaultHFlag

    if (vaultHFlag) {
      vaultHData.forEach(obj => {
        if (!timestamps.includes(obj.timestamp)) {
          timestamps.push(obj.timestamp)
          const sharePriceDecimals = fromWei(obj.sharePrice, tokenDecimals, tokenDecimals)
          const modifiedObj = { ...obj, sharePrice: sharePriceDecimals }
          uniqueVaultHData.push(modifiedObj)
        }
      })
    }

    if (balanceFlag) {
      balanceData.forEach(obj => {
        timestamps.push(obj.timestamp)
        const valueDecimals = fromWei(obj.value, vaultDecimals, vaultDecimals)
        const modifiedObj = { ...obj, value: valueDecimals }
        updatedBalanceData.push(modifiedObj)
      })
    }

    if (balanceFlag && vaultHFlag) {
      let uniqueData = [],
        uniqueFixedData = [],
        lastUserEvent = false,
        lastUserEventUsd = false,
        lastKnownSharePrice = null,
        lastKnownPriceUnderlying = null,
        i = 0,
        z = 0

      const bl = updatedBalanceData.length,
        ul = uniqueVaultHData.length

      // Ensure both datasets are sorted by descending timestamps
      updatedBalanceData.sort((a, b) => b.timestamp - a.timestamp)
      uniqueVaultHData.sort((a, b) => b.timestamp - a.timestamp)

      // Merge datasets
      while (i < bl || z < ul) {
        if (
          i < bl &&
          (z >= ul || updatedBalanceData[i].timestamp > uniqueVaultHData[z]?.timestamp)
        ) {
          // Balance entry without a matching Vault entry
          const balanceEntry = { ...updatedBalanceData[i] }
          balanceEntry.priceUnderlying =
            uniqueVaultHData[z - 1]?.priceUnderlying || lastKnownPriceUnderlying
          balanceEntry.sharePrice = uniqueVaultHData[z - 1]?.sharePrice || lastKnownSharePrice
          balanceEntry.tvl = uniqueVaultHData[z - 1]?.tvl || 0
          balanceEntry.apy = uniqueVaultHData[z - 1]?.apy || 0
          mergedData.push(balanceEntry)
          i += 1
        } else {
          // Vault entry, possibly matching a Balance entry
          const vaultEntry = { ...uniqueVaultHData[z] }
          vaultEntry.value = updatedBalanceData[i]?.value || 0
          mergedData.push(vaultEntry)
          z += 1
        }
      }

      // Filter out zero-value objects
      const filteredData = removeZeroValueObjects(mergedData)

      // Create unique data by combining similar entries
      const map = new Map()
      filteredData.forEach(item => {
        const key = `${item.value}_${item.sharePrice}`
        map.set(key, item)
      })

      uniqueData = Array.from(map.values())
      uniqueData.sort((a, b) => b.timestamp - a.timestamp)

      // Fix missing sharePrice and priceUnderlying values
      uniqueFixedData = uniqueData.map(item => {
        if (item.sharePrice === '0') {
          item.sharePrice = lastKnownSharePrice !== null ? lastKnownSharePrice : item.sharePrice
        } else {
          lastKnownSharePrice = item.sharePrice
        }

        if (item.priceUnderlying === '0') {
          item.priceUnderlying =
            lastKnownPriceUnderlying !== null ? lastKnownPriceUnderlying : item.priceUnderlying
        } else {
          lastKnownPriceUnderlying = item.priceUnderlying
        }

        return item
      })

      // Enrich data
      enrichedData = uniqueFixedData
        .map((item, index, array) => {
          const nextItem = array[index + 1]
          let event, balance, balanceUsd, netChange, netChangeUsd

          if (Number(item.value) === 0) {
            if (nextItem && Number(nextItem.value) === 0) {
              return false
            }
            balance = '0'
            balanceUsd = '0'
          } else {
            balance = Number(item.value) * Number(item.sharePrice)
            balanceUsd = balance * Number(item.priceUnderlying)
          }

          if (nextItem) {
            if (Number(item.value) === Number(nextItem.value)) {
              event = 'Harvest'
            } else if (Number(item.value) > Number(nextItem.value)) {
              event = 'Convert'
            } else {
              event = 'Revert'
            }

            const nextBalance = Number(nextItem.value) * Number(nextItem.sharePrice)
            netChange = balance - nextBalance
            netChangeUsd = Number(netChange) * Number(item.priceUnderlying)
          } else {
            event = 'Convert'
            netChange = balance
            netChangeUsd = netChange * Number(item.priceUnderlying)
          }

          return {
            ...item,
            event,
            balance,
            balanceUsd,
            netChange,
            netChangeUsd,
          }
        })
        .filter(Boolean)

      // Calculate summary metrics
      sumNetChange = enrichedData.reduce((sumValue, item) => {
        if (item.event === 'Harvest') {
          return sumValue + item.netChange
        }
        return sumValue
      }, 0)

      sumNetChangeUsd = enrichedData.reduce((sumUsdValue, item) => {
        if (item.event === 'Harvest') {
          return sumUsdValue + item.netChangeUsd
        }
        return sumUsdValue
      }, 0)

      // Calculate latest net change values
      enrichedData.forEach(item => {
        if (!lastUserEvent) {
          if (item.event === 'Harvest') {
            sumLatestNetChange += item.netChange
          } else if (item.event === 'Convert' || item.event === 'Revert') {
            lastUserEvent = true
          }
        }
      })

      enrichedData.forEach(item => {
        if (!lastUserEventUsd) {
          if (item.event === 'Harvest') {
            sumLatestNetChangeUsd += item.netChangeUsd
          } else if (item.event === 'Convert' || item.event === 'Revert') {
            lastUserEventUsd = true
          }
        }
      })
    }
  }

  return {
    bFlag,
    vHFlag,
    sumNetChange,
    sumNetChangeUsd,
    sumLatestNetChange,
    sumLatestNetChangeUsd,
    enrichedData,
    uniqueVaultHData,
  }
}

export const getTotalTVLData = async () => {
  try {
    const apiResponse = await axios.get(TOTAL_TVL_API_ENDPOINT)
    const apiData = get(apiResponse, 'data')
    return apiData
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getCoinListFromApi = async () => {
  try {
    const response = await axios.get(`${GECKO_URL}coins/list`, {
      headers: {
        'x-cg-pro-api-key': COINGECKO_API_KEY,
      },
    })
    return response.data
  } catch (err) {
    console.log('Fetch Chart Data error: ', err)
    return []
  }
}

export const getTokenPriceFromApi = async tokenID => {
  try {
    const response = await axios.get(`${GECKO_URL}simple/price`, {
      params: {
        ids: tokenID,
        // eslint-disable-next-line camelcase
        vs_currencies: 'usd',
      },
      headers: {
        'x-cg-pro-api-key': COINGECKO_API_KEY,
      },
    })
    return response.data[tokenID].usd
  } catch (err) {
    console.log('Fetch Chart Data error: ', err)
    return null
  }
}

export const fetchLeaderboardData = async () => {
  try {
    const response = await axios.get(LEADERBOARD_API_ENDPOINT)
    if (!response.status === 200) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = response.data

    return data
  } catch (error) {
    console.log('Error fetching leaderboard data', error)
    return null
  }
}

export const fetchRewardToken = async () => {
  try {
    const response = await axios.get(POOLS_API_ENDPOINT)
    if (!response.status === 200) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.data

    // Log and return only if data is valid
    if (data) {
      return data
    }
    console.log('No data received from API')
    return null
  } catch (error) {
    console.log('Error fetching reward token data', error)
    return null
  }
}
