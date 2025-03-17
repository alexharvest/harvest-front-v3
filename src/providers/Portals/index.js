import React, { createContext, useContext } from 'react'
import axios from 'axios'
import { getChainNamePortals } from '../../utilities/parsers'
import { PORTALS_FI_API_URL } from '../../constants'

const PortalsContext = createContext()
const usePortals = () => useContext(PortalsContext)

const authToken = process.env.REACT_APP_PORTALS_API_KEY

const SUPPORTED_TOKEN_LIST = {
  1: {
    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    LUSD: '0x5f98805a4e8be255a32880fdec7f6728c6568ba0',
    ETH: '0x0000000000000000000000000000000000000000',
    WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    stETH: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    wstETH: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
    WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    FARM: '0xa0246c9032bc3a600820415ae600c6388619a14d',
    iFARM: '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651',
    MATIC: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    UNI: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    LINK: '0x514910771af9ca656af840dff83e8264ecf986ca',
    ARB: '0xb50721bcf8d664c30412cfbc6cf7a15145234ad1',
    MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    AAVE: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    COMP: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    SNX: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
  },
  137: {
    USDC: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
    USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    DAI: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    LUSD: '0x23001f892c0c82b79303edc9b9033cd190bb21c7',
    WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    wstETH: '0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd',
    WBTC: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
    MATIC: '0x0000000000000000000000000000000000000000',
    WMATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    UNI: '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
    LINK: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
    MKR: '0x6f7c932e7684666c9fd1d44527765433e01ff61d',
    AAVE: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
    COMP: '0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c',
    SNX: '0x50b728d8d964fd00c2d0aad81718b71311fef68a',
  },
  42161: {
    USDC: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    USDT: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    DAI: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    LUSD: '0x93b346b6bc2548da6a1e7d98e9a421b42541425b',
    ETH: '0x0000000000000000000000000000000000000000',
    WETH: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    wstETH: '0x5979d7b546e38e414f7e9822514be443a4800529',
    WBTC: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    UNI: '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
    LINK: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
    ARB: '0x912ce59144191c1204e64559fe8253a0e49e6548',
    COMP: '0x354a6da3fcde098f8389cad84b0182725c6c91de',
  },
  8453: {
    USDC: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    DAI: '0x50c5725949a6f0c72e6c4a641f24049a917db0cb',
    ETH: '0x0000000000000000000000000000000000000000',
    WETH: '0x4200000000000000000000000000000000000006',
  },
}

const PortalsProvider = _ref => {
  const { children } = _ref
  // const [portalsBaseTokens, setPortalsBaseTokens] = useState({})

  const getPortalsBalances = async (address, chainId) => {
    try {
      const response = await axios.get(`${PORTALS_FI_API_URL}/v2/account`, {
        params: {
          owner: address,
          networks: getChainNamePortals(chainId),
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      return response.data.balances
    } catch (error) {
      console.error('Error fetching balances:', error)
      return []
    }
  }

  const getPortalsBaseTokens = async chainId => {
    try {
      const supportedTokens = SUPPORTED_TOKEN_LIST[parseInt(chainId, 10)]
      const addressesQueryString = Object.keys(supportedTokens)
        .map(symbol => {
          const address = `${getChainNamePortals(chainId)}:${supportedTokens[symbol]}`
          return `addresses=${address}`
        })
        .join('&')

      const response = await axios.get(
        `${PORTALS_FI_API_URL}/v2/tokens?${addressesQueryString}&networks=${getChainNamePortals(
          chainId,
        )}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      return response.data.tokens
    } catch (error) {
      console.error('Error fetching base tokens:', error)
      return []
    }
  }

  const getPortalsSupport = async (chainId, tokenAddress) => {
    try {
      const addresses = `${getChainNamePortals(chainId)}:${tokenAddress}`
      const response = await axios.get(`${PORTALS_FI_API_URL}/v2/tokens`, {
        params: {
          addresses,
          minLiquidity: 0,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      return response
    } catch (error) {
      console.error('Error fetching token:', error)
      return error.response
    }
  }

  const getPortalsToken = async (chainId, tokenAddress) => {
    try {
      const addresses = `${getChainNamePortals(chainId)}:${tokenAddress}`
      const response = await axios.get(`${PORTALS_FI_API_URL}/v2/tokens`, {
        params: {
          addresses,
          minLiquidity: 0,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      return response.data?.tokens[0]
    } catch (error) {
      console.error('Error fetching token:', error)
      return []
    }
  }

  const getPortalsApproval = async (chainId, fromAddress, tokenAddress) => {
    try {
      const inputToken = `${getChainNamePortals(chainId)}:${tokenAddress}`
      const response = await axios.get(`${PORTALS_FI_API_URL}/v2/approval`, {
        params: { sender: fromAddress, inputToken, inputAmount: 0 },
      })
      return response.data.context
    } catch (error) {
      console.error('Error fetching approvals:', error)
      return {}
    }
  }

  const portalsApprove = async (chainId, fromAddress, tokenAddress, inputAmount) => {
    try {
      const inputToken = `${getChainNamePortals(chainId)}:${tokenAddress}`
      const response = await axios.get(`${PORTALS_FI_API_URL}/v2/approval`, {
        params: { sender: fromAddress, inputToken, inputAmount },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching approve data:', error)
      return {}
    }
  }

  const getPortals = async ({ chainId, sender, tokenIn, inputAmount, tokenOut, slippage }) => {
    try {
      const inputToken = `${getChainNamePortals(chainId)}:${tokenIn}`
      const outputToken = `${getChainNamePortals(chainId)}:${tokenOut}`
      const validate = slippage === null
      const response = await axios.get(`${PORTALS_FI_API_URL}/v2/portal`, {
        params: {
          sender,
          inputToken,
          inputAmount,
          outputToken,
          slippageTolerancePercentage: slippage,
          feePercentage: 0,
          partner: '0xF066789028fE31D4f53B69B81b328B8218Cc0641',
          validate,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching routes:', error)
      return {}
    }
  }

  const getPortalsEstimate = async ({
    chainId,
    tokenIn,
    inputAmount,
    tokenOut,
    slippage,
    sender,
  }) => {
    const inputToken = `${getChainNamePortals(chainId)}:${tokenIn}`
    const outputToken = `${getChainNamePortals(chainId)}:${tokenOut}`
    let response
    try {
      response = await axios.get(`${PORTALS_FI_API_URL}/v2/portal/estimate`, {
        params: {
          inputToken,
          inputAmount,
          outputToken,
          slippageTolerancePercentage: slippage,
          sender,
        },
      })
      return { res: response.data, succeed: true }
    } catch (error) {
      // console.error('Error fetching estimates:', error)
      console.error('Error fetching estimates:', error.response.data.message)
      return { res: error.response.data, succeed: false }
    }
  }

  return React.createElement(
    PortalsContext.Provider,
    {
      value: {
        SUPPORTED_TOKEN_LIST,
        // portalsBaseTokens,
        getPortalsBaseTokens,
        getPortalsBalances,
        getPortalsSupport,
        getPortalsToken,
        getPortalsApproval,
        portalsApprove,
        getPortals,
        getPortalsEstimate,
      },
    },
    children,
  )
}
export { PortalsProvider, usePortals }
