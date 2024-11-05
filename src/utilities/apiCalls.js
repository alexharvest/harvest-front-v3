import axios from 'axios'
import { get } from 'lodash'
import { CHAIN_IDS } from '../data/constants'
import {
  GRAPH_URL_MAINNET,
  GRAPH_URL_POLYGON,
  GRAPH_URL_ARBITRUM,
  GRAPH_URL_BASE,
  GRAPH_URL_ZKSYNC,
  GRAPH_URL_BASE_MOONWELL,
  TOTAL_TVL_API_ENDPOINT,
  HISTORICAL_RATES_API_ENDPOINT,
  GECKO_URL,
  COINGECKO_API_KEY,
  POOLS_API_ENDPOINT,
} from '../constants'
import { fromWei } from '../services/web3'

const moonwellWeth = '0x0b0193fad49de45f5e2b0a9f5d6bc3bb7d281688'

export const getLastHarvestInfo = async (address, chainId) => {
  // eslint-disable-next-line no-unused-vars
  let nowDate = new Date(),
    data = {},
    result = ''

  nowDate = Math.floor(nowDate.setDate(nowDate.getDate()) / 1000)

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'

  const graphql = JSON.stringify({
      query: `{
        vaultHistories(
          first: 1,
          where: {
            vault: "${address === farm ? ifarm : address}",
          },
          orderBy: timestamp,
          orderDirection: desc
        ) {
          timestamp
        }
      }`,
      variables: {},
    }),
    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    }

  const url =
    chainId === CHAIN_IDS.ETH_MAINNET
      ? GRAPH_URL_MAINNET
      : chainId === CHAIN_IDS.POLYGON_MAINNET
      ? GRAPH_URL_POLYGON
      : chainId === CHAIN_IDS.BASE
      ? address.toLowerCase() === moonwellWeth.toLowerCase()
        ? GRAPH_URL_BASE_MOONWELL
        : GRAPH_URL_BASE
      : chainId === CHAIN_IDS.ZKSYNC
      ? GRAPH_URL_ZKSYNC
      : GRAPH_URL_ARBITRUM

  try {
    await fetch(url, requestOptions)
      .then(response => response.json())
      .then(res => {
        data = res.data.vaultHistories
        if (data.length !== 0) {
          const timeStamp = data[0].timestamp
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
          result = `${
            `${dayString !== '' ? `${dayString} ` : ''}` +
            `${hourString !== '' ? `${hourString} ` : ''}`
          }${minString}`
        }
      })
      .catch(error => console.log('error', error))
  } catch (err) {
    console.log('Fetch data about last harvest: ', err)
  }
  return result
}

export const getPublishDate = async () => {
  const allData = [],
    allFlags = []

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const graphqlQueries = [
    {
      url: GRAPH_URL_MAINNET,
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
      url: GRAPH_URL_POLYGON,
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
      url: GRAPH_URL_BASE,
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
      url: GRAPH_URL_ARBITRUM,
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
      url: GRAPH_URL_ZKSYNC,
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
    const requests = graphqlQueries.map(({ url, query }) => {
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ query }),
        redirect: 'follow',
      }
      return fetch(url, requestOptions)
        .then(response => response.json())
        .then(res => {
          const data = res.data.vaults || []
          const flag = data.length > 0
          allData.push(data)
          allFlags.push(flag)
        })
        .catch(error => {
          console.log('Error fetching data from URL:', url, error)
          allFlags.push(false)
        })
    })

    await Promise.all(requests)
  } catch (err) {
    console.log('Error fetching data:', err)
    return { data: [], flags: [] }
  }

  const combinedData = allData.reduce((acc, curr) => acc.concat(curr), [])
  const combinedFlags = allFlags.every(flag => flag)
  return { data: combinedData, flag: combinedFlags }
}

export const getSequenceId = async (address, chainId) => {
  let vaultTVLCount,
    vaultPriceFeedCount,
    vaultsFlag = true

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
  const vaultAddress = address === farm ? ifarm : address

  const graphql = JSON.stringify({
      query: `{
        vaults(
          first: 1000,
          orderBy: timestamp,
          orderDirection: desc
        ) {
          id, tvlSequenceId, priceFeedSequenceId
        }
      }`,
      variables: {},
    }),
    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    }

  const url =
    chainId === CHAIN_IDS.ETH_MAINNET
      ? GRAPH_URL_MAINNET
      : chainId === CHAIN_IDS.POLYGON_MAINNET
      ? GRAPH_URL_POLYGON
      : chainId === CHAIN_IDS.BASE
      ? address.toLowerCase() === moonwellWeth.toLowerCase()
        ? GRAPH_URL_BASE_MOONWELL
        : GRAPH_URL_BASE
      : GRAPH_URL_ARBITRUM

  try {
    await fetch(url, requestOptions)
      .then(response => response.json())
      .then(res => {
        const vaultsData = res.data.vaults
        const vl = vaultsData.length
        for (let i = 0; i < vl; i += 1) {
          if (vaultAddress === vaultsData[i].id) {
            vaultTVLCount = vaultsData[i].tvlSequenceId
            vaultPriceFeedCount = vaultsData[i].priceFeedSequenceId
            return
          }
        }
        if (vl === 0) {
          vaultsFlag = false
        }
      })
      .catch(error => {
        console.log('error', error)
        vaultsFlag = false
      })
  } catch (err) {
    console.log('Fetch data about price feed: ', err)
    vaultsFlag = false
  }
  return { vaultTVLCount, vaultPriceFeedCount, vaultsFlag }
}

export const getVaultHistories = async (address, chainId) => {
  let vaultHData = {},
    vaultHFlag = true

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'

  const graphql = JSON.stringify({
      query: `{
        vaultHistories(
          first: 1000,
          where: {
            vault: "${address === farm ? ifarm : address}",
          },
          orderBy: timestamp,
          orderDirection: desc
        ) {
          priceUnderlying, sharePrice, timestamp
        }
      }`,
      variables: {},
    }),
    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    }

  const url =
    chainId === CHAIN_IDS.ETH_MAINNET
      ? GRAPH_URL_MAINNET
      : chainId === CHAIN_IDS.POLYGON_MAINNET
      ? GRAPH_URL_POLYGON
      : chainId === CHAIN_IDS.BASE
      ? address.toLowerCase() === moonwellWeth.toLowerCase()
        ? GRAPH_URL_BASE_MOONWELL
        : GRAPH_URL_BASE
      : chainId === CHAIN_IDS.ZKSYNC
      ? GRAPH_URL_ZKSYNC
      : GRAPH_URL_ARBITRUM

  try {
    await fetch(url, requestOptions)
      .then(response => response.json())
      .then(res => {
        vaultHData = res.data.vaultHistories
        if (vaultHData.length === 0) {
          vaultHFlag = false
        }
      })
      .catch(error => {
        console.log('error', error)
        vaultHFlag = false
      })
  } catch (err) {
    console.log('Fetch data about price feed: ', err)
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
  let sequenceIdsArray = []
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
    sequenceIdsArray = []
  }
  const tvlSequenceId = vaultTVLCount > 1000 ? `tvlSequenceId_in: [${sequenceIdsArray}]` : ''

  const timestampQuery = asQuery ? `timestamp_lt: "${timestamp}"` : ''
  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const graphql = JSON.stringify({
      query: `{
        generalApies(
          first: 1000,
          where: {
            vault: "${address === farm ? ifarm : address}",
          }, 
          orderBy: timestamp, 
          orderDirection: desc
        ) { 
          apy, timestamp
        }
        tvls(
          first: 1000,
          where: {
            vault: "${address === farm ? ifarm : address}", 
            ${timestampQuery},
            ${tvlSequenceId}
          },
          orderBy: timestamp,
          orderDirection: desc
        ) {
          value, timestamp
        },
        vaultHistories(
          first: 1000,
          where: {
            vault: "${address === farm ? ifarm : address}",
          },
          orderBy: timestamp,
          orderDirection: desc
        ) {
          priceUnderlying, sharePrice, timestamp
        }
      }`,
      variables: {},
    }),
    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    }

  const url =
    chainId === CHAIN_IDS.ETH_MAINNET
      ? GRAPH_URL_MAINNET
      : chainId === CHAIN_IDS.POLYGON_MAINNET
      ? GRAPH_URL_POLYGON
      : chainId === CHAIN_IDS.BASE
      ? address.toLowerCase() === moonwellWeth.toLowerCase()
        ? GRAPH_URL_BASE_MOONWELL
        : GRAPH_URL_BASE
      : chainId === CHAIN_IDS.ZKSYNC
      ? GRAPH_URL_ZKSYNC
      : GRAPH_URL_ARBITRUM

  try {
    const response = await fetch(url, requestOptions)
    const responseJson = await response.json()

    // To merge the response data into the chartData object
    Object.keys(responseJson.data).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(chartData, key)) {
        chartData[key] = responseJson.data[key]
      } else if (Array.isArray(chartData[key]) && Array.isArray(responseJson.data[key])) {
        chartData[key].push(...responseJson.data[key])
      } else if (typeof chartData[key] === 'object' && typeof responseJson.data[key] === 'object') {
        Object.assign(chartData[key], responseJson.data[key])
      } else {
        chartData[key] = responseJson.data[key]
      }
    })

    const dataTimestamp = Number(chartData.tvls[chartData.tvls.length - 1].timestamp)
    const initTimestamp = Number(
      chartData.generalApies[chartData.generalApies.length - 1].timestamp,
    )
    if (responseJson.data.tvls.length === 1000 && dataTimestamp > initTimestamp) {
      await getDataQuery(address, chainId, vaultTVLCount, true, dataTimestamp, chartData)
    }
  } catch (err) {
    console.log('Fetch data about subgraph: ', err)
  }

  return chartData
}

export const getUserBalanceVaults = async account => {
  const userBalanceVaults = []
  if (account) {
    account = account.toLowerCase()
  }

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const graphql = JSON.stringify({
      query: `{
        userBalances(
          where: {
            userAddress: "${account}"
          }
        ) {
          vault { id }
        }
      }`,
      variables: {},
    }),
    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    }

  const urls = [
    GRAPH_URL_MAINNET,
    GRAPH_URL_POLYGON,
    GRAPH_URL_BASE,
    GRAPH_URL_ARBITRUM,
    GRAPH_URL_ZKSYNC,
  ]

  try {
    const results = await Promise.all(
      urls.map(url =>
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(res => res.data.userBalances)
          .catch(error => {
            console.log('error', error)
            return []
          }),
      ),
    )

    results.forEach(userBalanceVaultData => {
      userBalanceVaultData.forEach(balance => {
        userBalanceVaults.push(balance.vault.id)
      })
    })
  } catch (err) {
    console.log('Fetch data about user balance histories: ', err)
  }
  return { userBalanceVaults }
}

export const getUserBalanceHistories = async (address, chainId, account) => {
  let balanceData = {},
    balanceFlag = true

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
  if (account) {
    account = account.toLowerCase()
  }

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const graphql = JSON.stringify({
      query: `{
        userBalanceHistories(
          first: 1000,
          where: {
            vault: "${address === farm ? ifarm : address}",
            userAddress: "${account}"
          },
          orderBy: timestamp,
          orderDirection: desc,
        ) {
          value, timestamp
        }
      }`,
      variables: {},
    }),
    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    }

  const url =
    chainId === CHAIN_IDS.ETH_MAINNET
      ? GRAPH_URL_MAINNET
      : chainId === CHAIN_IDS.POLYGON_MAINNET
      ? GRAPH_URL_POLYGON
      : chainId === CHAIN_IDS.BASE
      ? address.toLowerCase() === moonwellWeth.toLowerCase()
        ? GRAPH_URL_BASE_MOONWELL
        : GRAPH_URL_BASE
      : chainId === CHAIN_IDS.ZKSYNC
      ? GRAPH_URL_ZKSYNC
      : GRAPH_URL_ARBITRUM

  try {
    await fetch(url, requestOptions)
      .then(response => response.json())
      .then(res => {
        balanceData = res.data.userBalanceHistories
        if (balanceData.length === 0) {
          balanceFlag = false
        }
      })
      .catch(error => {
        console.log('error', error)
        balanceFlag = false
      })
  } catch (err) {
    console.log('Fetch data about user balance histories: ', err)
    balanceFlag = false
  }
  return { balanceData, balanceFlag }
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
  let priceFeedFlag = true,
    sequenceIdsArray = []

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
    sequenceIdsArray = []
  }
  const priceFeedSequenceId =
    vaultPriceFeedCount > 1000 ? `priceFeedSequenceId_in: [${sequenceIdsArray}]` : ''

  address = address.toLowerCase()
  const farm = '0xa0246c9032bc3a600820415ae600c6388619a14d'
  const ifarm = '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
  const timestampQuery = timestamp && asQuery ? `timestamp_lt: "${timestamp}"` : ''

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const graphql = JSON.stringify({
      query: `{
        priceFeeds(
          first: 1000,
          where: {
            vault: "${address === ifarm ? farm : address}",
            ${timestampQuery},
            ${priceFeedSequenceId}
          },
          orderBy: timestamp,
          orderDirection: desc,
        ) {
          sharePrice, price, timestamp
        }
      }`,
      variables: {},
    }),
    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    }

  const url =
    chainId === CHAIN_IDS.ETH_MAINNET
      ? GRAPH_URL_MAINNET
      : chainId === CHAIN_IDS.POLYGON_MAINNET
      ? GRAPH_URL_POLYGON
      : chainId === CHAIN_IDS.BASE
      ? address.toLowerCase() === moonwellWeth.toLowerCase()
        ? GRAPH_URL_BASE_MOONWELL
        : GRAPH_URL_BASE
      : chainId === CHAIN_IDS.ZKSYNC
      ? GRAPH_URL_ZKSYNC
      : GRAPH_URL_ARBITRUM

  try {
    const response = await fetch(url, requestOptions)
    const responseJson = await response.json()

    if (
      responseJson.data &&
      responseJson.data.priceFeeds &&
      Array.isArray(responseJson.data.priceFeeds)
    ) {
      priceFeedData.push(...responseJson.data.priceFeeds)
      const dataTimestamp = priceFeedData[priceFeedData.length - 1].timestamp
      if (Number(dataTimestamp) > Number(firstTimeStamp)) {
        await getPriceFeeds(
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
      console.error('Error: Unable to retrieve vault histories from the response.')
    }

    if (priceFeedData.length === 0) {
      priceFeedFlag = false
    }
  } catch (err) {
    console.log('Fetch data about user balance histories: ', err)
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

export const initBalanceAndDetailData = async (address, chainId, account, tokenDecimals) => {
  const timestamps = []
  const uniqueVaultHData = []
  const mergedData = []
  let enrichedData = [],
    sumNetChange = 0,
    sumNetChangeUsd = 0,
    sumLatestNetChange = 0,
    sumLatestNetChangeUsd = 0

  const { balanceData, balanceFlag } = await getUserBalanceHistories(address, chainId, account)
  const { vaultHData, vaultHFlag } = await getVaultHistories(address, chainId)

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
          netChangeUsd = Math.abs(netChange) * Number(item.priceUnderlying)
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

  return {
    balanceFlag,
    vaultHFlag,
    sumNetChange,
    sumNetChangeUsd,
    sumLatestNetChange,
    sumLatestNetChangeUsd,
    enrichedData,
    uniqueVaultHData,
  }
}

export const getTVLData = async (ago, address) => {
  let nowDate = new Date(),
    data = []
  nowDate = Math.floor(nowDate.setDate(nowDate.getDate() - 1) / 1000)
  const startDate = nowDate - 3600 * 24 * ago

  const api = `https://ethparser-api.herokuapp.com/api/transactions/history/tvl/${address}?reduce=1&start=${startDate}&network=eth`
  try {
    await fetch(api)
      .then(async res => {
        res = await res.json()
        if (res.length > 0) {
          data = res.map(a => {
            return [a.calculateTime, a.lastTvl]
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  } catch (err) {
    console.log('Fetch Chart Data error: ', err)
  }

  return data
}

// eslint-disable-next-line consistent-return
export const getTotalTVLData = async () => {
  try {
    const apiResponse = await axios.get(TOTAL_TVL_API_ENDPOINT)
    const apiData = get(apiResponse, 'data')
    return apiData
  } catch (err) {
    console.log(err)
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

// /**
//  * @param symbol token symbol
//  * @param apiData coingeko data
//  * @dev get token id from api data
//  * ** */
// export function getTokenIdBySymbolInApiData(symbol, apiData) {
//   const symbol = symbol.toLowerCase();
//   for (let ids = 0; ids < apiData.length; ids += 1) {
//     const tempData = apiData[ids]
//     const tempSymbol = tempData.symbol
//     if (tempSymbol.toLowerCase() === symbol.toLowerCase()) {
//       return tempData.id
//     }
//   }
//   return null;
// }

export const fetchLeaderboardData = async () => {
  try {
    const response = await fetch(`https://api.harvest.finance/leaderboard?key=harvest-key`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error fetching leaderboard data', error)
    return null
  }
}

export const fetchRewardToken = async () => {
  try {
    const response = await fetch(POOLS_API_ENDPOINT)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()

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
