import axios from 'axios'
import BigNumber from 'bignumber.js'
import { get, isArray, merge, pickBy } from 'lodash'
import { forEach } from 'promised-loops'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import useEffectWithPrevious from 'use-effect-with-previous'
import { IFARM_TOKEN_SYMBOL, VAULTS_API_ENDPOINT } from '../../constants'
import { CHAIN_IDS } from '../../data/constants'
import {
  getWeb3,
  hasValidUpdatedBalance,
  newContractInstance,
  pollUpdatedBalance,
  ledgerWeb3,
} from '../../services/web3'
import univ3ContractData from '../../services/web3/contracts/uniswap-v3/contract.json'
import vaultContractData from '../../services/web3/contracts/vault/contract.json'
import vaultMethods from '../../services/web3/contracts/vault/methods'
import { abbreaviteNumber, isSpecialApp, isLedgerLive } from '../../utilities/formats'
import { usePools } from '../Pools'
import { useWallet } from '../Wallet'
import { calculateFarmingBalance, filterVaults } from './utils'

/* eslint-disable global-require */
const { tokens, addresses } = require('../../data')
/* eslint-enable global-require */

const VaultsContext = createContext()
const useVaults = () => useContext(VaultsContext)

const importedVaults = pickBy(
  tokens,
  token => token.vaultAddress || token.tokenAddress === addresses.iFARM,
)

const {
  getUnderlyingBalanceWithInvestment,
  getUnderlyingBalanceWithInvestmentForHolder,
  getPricePerFullShare,
  getTotalSupply,
} = vaultMethods

const VaultsProvider = _ref => {
  const { children } = _ref
  const { account, chainId, web3, selChain, logout } = useWallet()
  const { pools, userStats } = usePools()
  const [loadingVaults, setLoadingVaults] = useState(true)
  const [loadingFarmingBalances, setLoadingFarmingBalances] = useState(false)
  const [farmingBalances, setFarmingBalances] = useState({})
  const [vaultsData, setVaults] = useState(importedVaults)
  const loadedVaults = useMemo(
    () =>
      pickBy(vaultsData, vault =>
        isSpecialApp ? vault.chain === chainId : selChain.includes(vault.chain),
      ),
    [selChain, vaultsData, chainId],
  )
  // const initialFetch = useRef(true)
  const loadedUserVaultsWeb3Provider = useRef(false)
  const setFormattedVaults = useCallback(
    async (apiData, apiFailed) => {
      const formattedVaults = {}
      let curChainId = chainId
      try {
        if (isLedgerLive()) {
          const selectedChain = await ledgerWeb3.eth.net.getId()
          curChainId = selectedChain.toString()
        }
      } catch (e) {
        console.log(e)
      }

      await forEach(Object.keys(importedVaults), async vaultSymbol => {
        const vaultChain = get(importedVaults, `[${vaultSymbol}].chain`)
        try {
          let web3Client = await getWeb3(vaultChain, account),
            estimatedApy = null,
            estimatedApyBreakdown = [],
            usdPrice = null,
            vaultPrice = null,
            underlyingBalanceWithInvestment = '0',
            underlyingBalanceWithInvestmentForHolder = '0',
            pricePerFullShare = '0',
            totalSupply = '0',
            totalValueLocked = '0',
            allocPointData = [],
            vaultName = null,
            boostedEstimatedAPY = null,
            uniswapV3PositionId = null,
            uniswapV3UnderlyingTokenPrices = [],
            { subLabel } = importedVaults[vaultSymbol],
            uniswapV3ManagedData = null,
            dataFetched = false
          if (!isSpecialApp) {
            web3Client = web3
          }
          if (vaultChain !== chainId) {
            web3Client = await getWeb3(vaultChain, false)
          }
          const tokenPool = pools.find(
            pool => pool.collateralAddress === importedVaults[vaultSymbol].vaultAddress,
          )
          const isIFARM = vaultSymbol === IFARM_TOKEN_SYMBOL
          const hasMultipleAssets = isArray(importedVaults[vaultSymbol].tokenAddress)
          const instance = await newContractInstance(
            null,
            isIFARM
              ? importedVaults[vaultSymbol].tokenAddress
              : importedVaults[vaultSymbol].vaultAddress,
            hasMultipleAssets ? univ3ContractData.abi : vaultContractData.abi,
            web3Client,
          )

          if (apiData && apiData[vaultSymbol]) {
            estimatedApy = apiData[vaultSymbol].estimatedApy
            estimatedApyBreakdown = apiData[vaultSymbol].estimatedApyBreakdown
            boostedEstimatedAPY = apiData[vaultSymbol].boostedEstimatedAPY
            usdPrice = apiData[vaultSymbol].usdPrice
            underlyingBalanceWithInvestment = apiData[vaultSymbol].underlyingBalanceWithInvestment
            totalSupply = apiData[vaultSymbol].totalSupply
            totalValueLocked = apiData[vaultSymbol].totalValueLocked
              ? apiData[vaultSymbol].totalValueLocked
              : '0'
            allocPointData = apiData[vaultSymbol].allocPointData
              ? apiData[vaultSymbol].allocPointData
              : []
            vaultName = apiData[vaultSymbol].vaultSymbol ? apiData[vaultSymbol].vaultSymbol : null
            pricePerFullShare = importedVaults[vaultSymbol].pricePerFullShareOverride
              ? importedVaults[vaultSymbol].pricePerFullShareOverride
              : apiData[vaultSymbol].pricePerFullShare
            vaultPrice = new BigNumber(usdPrice)
              .times(pricePerFullShare)
              .div(10 ** apiData[vaultSymbol].decimals)
            uniswapV3PositionId = apiData[vaultSymbol].uniswapV3PositionId
            uniswapV3UnderlyingTokenPrices = apiData[vaultSymbol].uniswapV3UnderlyingTokenPrices
            if (apiData[vaultSymbol].uniswapV3ManagedData) {
              const { capLimit, currentCap, ranges } = apiData[vaultSymbol].uniswapV3ManagedData
              const upper = abbreaviteNumber(Math.floor(ranges[0].upperBound / 100) * 100, 1)
              const lower = abbreaviteNumber(
                Math.floor(ranges[ranges.length - 1].lowerBound / 100) * 100,
                1,
              )
              subLabel = `${lower.toString()}⟷${upper.toString()}`
              uniswapV3ManagedData = {
                ...apiData[vaultSymbol].uniswapV3ManagedData,
                capLimit,
                currentCap,
                maxToDeposit: new BigNumber(capLimit).minus(new BigNumber(currentCap)),
                ranges,
              }
            }
            dataFetched = !apiFailed
          } else if (isIFARM) {
            totalSupply = await getTotalSupply(instance, web3Client)
            underlyingBalanceWithInvestment = await getUnderlyingBalanceWithInvestment(
              instance,
              web3Client,
            )
            pricePerFullShare = importedVaults[vaultSymbol].pricePerFullShareOverride
              ? importedVaults[vaultSymbol].pricePerFullShareOverride
              : await getPricePerFullShare(instance, web3Client)
          }

          if (isIFARM && account && curChainId === CHAIN_IDS.ETH_MAINNET) {
            underlyingBalanceWithInvestmentForHolder = await getUnderlyingBalanceWithInvestmentForHolder(
              account,
              instance,
              web3Client,
            )
          }

          formattedVaults[vaultSymbol] = {
            ...importedVaults[vaultSymbol],
            vaultAddress: isIFARM
              ? importedVaults[vaultSymbol].tokenAddress
              : importedVaults[vaultSymbol].vaultAddress,
            estimatedApy,
            estimatedApyBreakdown,
            boostedEstimatedAPY,
            apyIconUrls: importedVaults[vaultSymbol].apyIconUrls,
            apyTokenSymbols: importedVaults[vaultSymbol].apyTokenSymbols,
            usdPrice,
            vaultPrice,
            underlyingBalanceWithInvestment,
            underlyingBalanceWithInvestmentForHolder,
            pricePerFullShare,
            totalSupply,
            totalValueLocked,
            allocPointData,
            vaultSymbol: vaultName,
            instance,
            uniswapV3PositionId,
            dataFetched,
            uniswapV3UnderlyingTokenPrices,
            pool: tokenPool,
            subLabel,
            uniswapV3ManagedData,
          }
        } catch (e) {
          console.log(e)
        }
      })

      if (account) {
        loadedUserVaultsWeb3Provider.current = true
      }

      setVaults(formattedVaults)
    },
    [pools, account, chainId, web3],
  )
  const getFarmingBalances = useCallback(
    // eslint-disable-next-line func-names
    async function (selectedVaults, selectedBalances, updatedUserStats) {
      // eslint-disable-next-line no-void
      if (selectedBalances === void 0) {
        selectedBalances = {}
      }

      const fetchedBalances = {}

      if (loadedUserVaultsWeb3Provider.current) {
        setLoadingFarmingBalances(true)
        const curStats = updatedUserStats || userStats
        if (curStats.length !== 0) {
          await Promise.all(
            filterVaults(selectedVaults).map(async vaultSymbol => {
              const fetchedBalance = await calculateFarmingBalance(
                pools,
                updatedUserStats || userStats,
                vaultSymbol,
                loadedVaults,
              )
              const currentBalance = selectedBalances[vaultSymbol]

              if (hasValidUpdatedBalance(fetchedBalance, currentBalance)) {
                fetchedBalances[vaultSymbol] = fetchedBalance
              } else {
                await pollUpdatedBalance(
                  calculateFarmingBalance(
                    pools,
                    updatedUserStats || userStats,
                    vaultSymbol,
                    loadedVaults,
                  ),
                  currentBalance,
                  () => {
                    fetchedBalances[vaultSymbol] = 'error'
                  },
                  farmedBalance => {
                    fetchedBalances[vaultSymbol] = farmedBalance
                  },
                )
              }
            }),
          )
          setFarmingBalances(currBalances => ({ ...currBalances, ...fetchedBalances }))
          setLoadingFarmingBalances(false)
        }
      }
    },
    [pools, userStats, loadedVaults],
  )
  useEffect(() => {
    if (logout) {
      setFarmingBalances({})
    }
  }, [logout])
  useEffect(() => {
    const formatVaults = async () => {
      try {
        const apiResponse = await axios.get(VAULTS_API_ENDPOINT)
        const apiData = get(apiResponse, 'data')
        if (isSpecialApp) {
          if (chainId === CHAIN_IDS.ETH_MAINNET) await setFormattedVaults(apiData.eth)
          else if (chainId === CHAIN_IDS.POLYGON_MAINNET) await setFormattedVaults(apiData.matic)
          else if (chainId === CHAIN_IDS.BASE) await setFormattedVaults(apiData.base)
          else if (chainId === CHAIN_IDS.ZKSYNC) await setFormattedVaults(apiData.zksync)
          else await setFormattedVaults(apiData.arbitrum)
        } else {
          await setFormattedVaults(
            merge(apiData.eth, apiData.matic, apiData.arbitrum, apiData.base, apiData.zksync),
          )
        }
        setLoadingVaults(false)
      } catch (err) {
        console.log(err)

        if (!toast.isActive('api-error')) {
          toast.error(
            'Updates are in progress. Vaults APY and AUM stats are temporarily unavailable. Also, please check your internet connection',
            {
              toastId: 'api-error',
            },
          )
        }

        await setFormattedVaults(importedVaults, true)
        setLoadingVaults(false)
      }
    }

    // if (initialFetch.current) {
    // initialFetch.current = false
    setLoadingVaults(true)
    formatVaults()
    // }
  }, [setFormattedVaults, chainId])
  useEffectWithPrevious(
    _ref2 => {
      const [prevAccount] = _ref2

      if (account !== prevAccount && account && !loadedUserVaultsWeb3Provider.current) {
        setFormattedVaults(vaultsData)
      }
    },
    [account, vaultsData],
  )
  return React.createElement(
    VaultsContext.Provider,
    {
      value: {
        loadingVaults,
        loadingFarmingBalances,
        vaultsData: loadedVaults,
        allVaultsData: vaultsData,
        symbols: Object.keys(loadedVaults),
        farmingBalances,
        getFarmingBalances,
        loadedUserVaultsWeb3Provider: loadedUserVaultsWeb3Provider.current,
      },
    },
    children,
  )
}

export { VaultsProvider, useVaults }
