import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
// eslint-disable-next-line import/no-unresolved
import axios from 'axios'
import isEqual from 'fast-deep-equal/react'
import { filter, get, map, sumBy } from 'lodash'
import { forEach } from 'promised-loops'
// eslint-disable-next-line import/no-unresolved
import { useInterval } from 'react-interval-hook'
import { toast } from 'react-toastify'
import useEffectWithPrevious from 'use-effect-with-previous'
import BigNumber from 'bignumber.js'
import { POLL_POOL_DATA_INTERVAL_MS, POOLS_API_ENDPOINT, SPECIAL_VAULTS } from '../../constants'
import { CHAIN_IDS } from '../../data/constants'
import { getWeb3, ledgerWeb3, newContractInstance, safeProvider } from '../../services/web3'
import poolContractData from '../../services/web3/contracts/pool/contract.json'
import tokenContract from '../../services/web3/contracts/token/contract.json'
import tokenMethods from '../../services/web3/contracts/token/methods'
import {
  isLedgerLive,
  isSafeApp,
  isSpecialApp,
  truncateNumberString,
} from '../../utilities/formats'
import { useContracts } from '../Contracts'
import { useWallet } from '../Wallet'
import { getLpTokenData, getUserStats, pollUpdatedUserStats } from './utils'

/* eslint-disable global-require */
const { pools: defaultPools, tokens } = require('../../data')
/* eslint-enable global-require */

const PoolsContext = createContext()
const usePools = () => useContext(PoolsContext)

const getReader = (selectedChain, contracts) => {
  switch (String(selectedChain)) {
    case CHAIN_IDS.ARBITRUM_ONE:
      return contracts.readerArbitrum
    case CHAIN_IDS.BASE:
      return contracts.readerBase
    case CHAIN_IDS.POLYGON_MAINNET:
      return contracts.readerMatic
    case CHAIN_IDS.ZKSYNC:
      return contracts.readerZksync
    default:
      return contracts.readerEth
  }
}

const PoolsProvider = _ref => {
  const { children } = _ref
  const { account, selChain, chainId, web3, balances: walletBalances, logout } = useWallet()
  const { contracts } = useContracts()
  const [pools, setPools] = useState(defaultPools)
  const [totalPools, setTotalPools] = useState(defaultPools)
  const [userStats, setUserStats] = useState([])
  const [vaultLoading, setVaultLoading] = useState(true)
  const [loadingUserPoolStats, setLoadingUserPoolStats] = useState(false)
  const [disableWallet, setDisableWallet] = useState(true)
  const loadedUserPoolsWeb3Provider = useRef(false)
  const loadedInitialStakedAndUnstakedBalances = useRef(false)
  const loadedPools = useMemo(
    () =>
      filter(pools, pool =>
        isSpecialApp ? pool.chain === chainId : selChain.includes(pool.chain),
      ),
    [selChain, pools, chainId],
  )
  const [finishPool, setFinishPool] = useState(false) // set true when getPoolsData success
  const formatPoolsData = useCallback(
    async apiData => {
      let curChain = chainId,
        selectedAccount = account,
        formattedPools
      try {
        if (isLedgerLive()) {
          const selectedChain = await ledgerWeb3.eth.net.getId()
          curChain = selectedChain.toString()
        }
        if (isSafeApp()) {
          const safeAppProvider = await safeProvider()
          const selectedChain = await safeAppProvider.getNetwork()
          curChain = selectedChain.chainId.toString()
          const accountAdrs = await safeAppProvider.getSigner().getAddress()
          selectedAccount = accountAdrs.toLowerCase()
        }
      } catch (e) {
        console.log(e)
      }
      formattedPools = await Promise.all(
        defaultPools.map(async pool => {
          let web3Client = await getWeb3(pool.chain, selectedAccount, web3),
            web3ClientLocal = await getWeb3(pool.chain, true, web3),
            rewardAPY = ['0'],
            rewardAPR = ['0'],
            autoStakeContractInstance = null,
            autoStakeContractLocalInstance = null,
            lpTokenData,
            rewardPerToken = ['0'],
            totalSupply = '0',
            finishTime = '0',
            totalValueLocked = '0',
            tradingApy = '0',
            boostedRewardAPY = '0',
            lpTokenInstance = null,
            lpTokenLocalInstance = null,
            amountToStakeForBoost = null,
            dataFetched = null
          if (isSafeApp()) {
            web3Client = await getWeb3(pool.chain, selectedAccount)
            web3ClientLocal = await getWeb3(pool.chain, selectedAccount)
          }
          if (
            (Object.values(SPECIAL_VAULTS).includes(pool.id) &&
              curChain !== CHAIN_IDS.ETH_MAINNET) ||
            pool.chain !== curChain
          ) {
            web3Client = await getWeb3(pool.chain, false)
          }

          const contractInstance = await newContractInstance(
            null,
            pool.contractAddress,
            poolContractData.abi,
            web3Client,
          )
          const contractLocalInstance = await newContractInstance(
            null,
            pool.contractAddress,
            poolContractData.abi,
            web3ClientLocal,
          )
          const apiPool =
            apiData && apiData.find(fetchedPool => fetchedPool && fetchedPool.id === pool.id)

          if (apiPool) {
            // eslint-disable-next-line prefer-destructuring
            rewardAPY = map(apiPool.rewardAPY, apy => truncateNumberString(apy))
            rewardAPR = map(apiPool.rewardAPR, apr => truncateNumberString(apr))
            tradingApy = truncateNumberString(apiPool.tradingApy)
            lpTokenData = apiPool.lpTokenData
            rewardPerToken = apiPool.rewardPerToken
            totalSupply = apiPool.totalSupply
            finishTime = apiPool.finishTime
            totalValueLocked = apiPool.totalValueLocked
            boostedRewardAPY = apiPool.boostedRewardAPY
            amountToStakeForBoost = apiPool.amountToStakeForBoost
            lpTokenInstance = await newContractInstance(
              null,
              apiPool.lpTokenData.address,
              tokenContract.abi,
              web3Client,
            )
            lpTokenLocalInstance = await newContractInstance(
              null,
              apiPool.lpTokenData.address,
              tokenContract.abi,
              web3ClientLocal,
            )
            dataFetched = true
          } else if (!pool.breadPage && !pool.fake) {
            lpTokenData = await getLpTokenData(contractInstance, web3Client)
            lpTokenInstance = await newContractInstance(
              null,
              lpTokenData.address,
              tokenContract.abi,
              web3Client,
            )
            lpTokenLocalInstance = await newContractInstance(
              null,
              lpTokenData.address,
              tokenContract.abi,
              web3ClientLocal,
            )
            dataFetched = false
          }

          if (pool.autoStakePoolAddress) {
            autoStakeContractInstance = await newContractInstance(
              null,
              pool.autoStakePoolAddress,
              poolContractData.abi,
              web3Client,
            )
            autoStakeContractLocalInstance = await newContractInstance(
              null,
              pool.autoStakePoolAddress,
              poolContractData.abi,
              web3ClientLocal,
            )
          }

          return {
            ...pool,
            rewardAPY,
            amountToStakeForBoost,
            totalRewardAPY: sumBy(rewardAPY, apy => Number(apy)),
            rewardAPR,
            tradingApy,
            contractInstance,
            contractLocalInstance,
            autoStakeContractInstance,
            autoStakeContractLocalInstance,
            lpTokenData: {
              ...lpTokenData,
              instance: lpTokenInstance,
              localInstance: lpTokenLocalInstance,
            },
            rewardPerToken,
            totalSupply,
            finishTime,
            totalValueLocked,
            loaded: true,
            boostedRewardAPY,
            dataFetched,
          }
        }),
      )
      formattedPools = formattedPools.filter(pool => pool !== null)
      loadedUserPoolsWeb3Provider.current = true

      return formattedPools
    },
    [account, chainId, web3],
  )
  const getPoolsData = useCallback(async () => {
    let newPools = []

    try {
      const apiResponse = await axios.get(POOLS_API_ENDPOINT)
      const apiData = get(apiResponse, 'data')
      newPools = await formatPoolsData([
        ...apiData.eth,
        ...apiData.matic,
        ...apiData.arbitrum,
        ...apiData.base,
        ...apiData.zksync,
      ])
      setDisableWallet(false)
    } catch (err) {
      console.error(err)

      if (!toast.isActive('pool-api-error')) {
        toast.error(
          'FARM APYs are temporarily unavailable. Also, please check your internet connection',
          {
            toastId: 'pool-api-error',
          },
        )
      }

      newPools = await formatPoolsData()
    }

    setPools(newPools)
    setTotalPools(newPools)
    setFinishPool(true)
  }, [formatPoolsData])

  useEffect(() => {
    if (logout) {
      setUserStats([])
    }
  }, [logout])

  useEffectWithPrevious(
    _ref2 => {
      const [prevAccount, prevChainId] = _ref2

      if (
        (account !== prevAccount || prevChainId !== chainId) &&
        account &&
        // !loadedUserPoolsWeb3Provider.current &&
        finishPool &&
        !isSpecialApp
      ) {
        const setCurrentPoolsWithUserProvider = async () => {
          const poolsWithUpdatedProvider = await formatPoolsData(pools)
          setPools(poolsWithUpdatedProvider)
        }

        setCurrentPoolsWithUserProvider()
      } else if (
        account !== prevAccount &&
        account &&
        !loadedUserPoolsWeb3Provider.current &&
        finishPool &&
        isSpecialApp
      ) {
        const udpatePoolsData = async () => {
          await getPoolsData()
        }
        udpatePoolsData()
      }
    },
    [account, chainId, pools],
  )
  useEffectWithPrevious(
    _ref3 => {
      const [prevChainId, prevAccount] = _ref3
      const hasSwitchedChain = chainId !== prevChainId
      const hasSwitchedAccount = account !== prevAccount && account

      if (
        (hasSwitchedChain ||
          hasSwitchedAccount ||
          !loadedInitialStakedAndUnstakedBalances.current) &&
        loadedUserPoolsWeb3Provider.current &&
        account
      ) {
        const loadInitialStakedAndUnstakedBalances = async () => {
          loadedInitialStakedAndUnstakedBalances.current = true
          const stats = {}
          const chains = isSpecialApp ? [chainId] : selChain
          // selChain.forEach( async (ch)=> {
          /* eslint-disable no-await-in-loop */
          const cl = chains.length
          for (let i = 0; i < cl; i += 1) {
            const ch = chains[i]
            const readerType = getReader(ch, contracts)
            const poolAddresses = []
            const vaultAddresses = []
            const chLoadedPools = []
            loadedPools.forEach(pool => {
              if (pool.chain === ch) {
                poolAddresses.push(pool.contractAddress)
                chLoadedPools.push(pool)
              }

              if (!Object.values(SPECIAL_VAULTS).includes(pool.id) && pool.chain === ch) {
                vaultAddresses.push(pool.lpTokenData.address)
              }
            })
            const readerInstance = readerType.instance
            const readerMethods = readerType.methods
            const balances = await readerMethods.getAllInformation(
              account,
              vaultAddresses,
              poolAddresses,
              readerInstance,
            )
            // const stats = {}
            await forEach(chLoadedPools, async (pool, index) => {
              let lpTokenBalance
              const isSpecialVault = !vaultAddresses.includes(pool.lpTokenData.address)

              if (isSpecialVault) {
                const lpSymbol = Object.keys(tokens).filter(
                  symbol => tokens[symbol].tokenAddress === pool.lpTokenData.address,
                )

                const instance = await newContractInstance(
                  lpSymbol[0],
                  null,
                  null,
                  await getWeb3(ch, false),
                )

                lpTokenBalance = !walletBalances[lpSymbol]
                  ? await tokenMethods.getBalance(account, instance)
                  : walletBalances[lpSymbol]
              } else {
                const lpTokenBalanceIdx = vaultAddresses.findIndex(
                  address => address === pool.lpTokenData.address,
                )
                lpTokenBalance = balances[0][lpTokenBalanceIdx]
              }

              stats[pool.id] = {
                lpTokenBalance,
                totalStaked: balances[1][index],
              }
            })
          }

          /* eslint-disable no-restricted-syntax, no-await-in-loop */
          for (const vaultId of Object.keys(contracts.iporVaults)) {
            const vaultContract = contracts.iporVaults[vaultId]
            const vaultBalance = await vaultContract.methods.getBalanceOf(
              vaultContract.instance,
              account,
            )
            const AssetBalance = await vaultContract.methods.convertToAssets(
              vaultContract.instance,
              vaultBalance,
            )

            if (new BigNumber(AssetBalance).gt(0)) {
              // eslint-disable-next-line camelcase
              stats[vaultId] = {
                lpTokenBalance: 0,
                totalStaked: AssetBalance,
              }
            }
          }
          /* eslint-enable no-restricted-syntax, no-await-in-loop */
          /* eslint-enable no-await-in-loop */
          // })
          setUserStats(currStats => ({ ...currStats, ...stats }))
        }

        loadInitialStakedAndUnstakedBalances()
      }
    },
    [chainId, account, loadedPools, contracts, walletBalances],
  )
  useInterval(() => getPoolsData(), POLL_POOL_DATA_INTERVAL_MS, {
    immediate: true,
  })
  // eslint-disable-next-line func-names
  const fetchUserPoolStats = useCallback(async function (
    selectedPools,
    selectedAccount,
    currentStats,
  ) {
    // eslint-disable-next-line no-void
    if (currentStats === void 0) {
      currentStats = []
    }

    const stats = {}

    if (loadedUserPoolsWeb3Provider.current) {
      setLoadingUserPoolStats(true)
      await Promise.all(
        selectedPools.map(async pool => {
          if (pool) {
            const web3Client = await getWeb3(pool.chain, false)
            const contractInstance = await newContractInstance(
              null,
              pool.contractAddress,
              poolContractData.abi,
              web3Client,
            )
            const autoStakeContractInstance = await newContractInstance(
              null,
              pool.autoStakePoolAddress,
              poolContractData.abi,
              web3Client,
            )
            // const lpSymbol = Object.keys(tokens).filter(
            //   symbol => tokens[symbol].tokenAddress === pool.lpTokenData.address || tokens[symbol].vaultAddress === pool.lpTokenData.address,
            // )
            // if(lpSymbol.length !== 0) {
            const tokenInstance = await newContractInstance(
              null,
              pool.lpTokenData.address,
              poolContractData.abi,
              web3Client,
            )

            const fetchedStats = await getUserStats(
              contractInstance,
              tokenInstance,
              pool.contractAddress,
              pool.autoStakePoolAddress,
              selectedAccount,
              autoStakeContractInstance,
            )

            if (!isEqual(fetchedStats, currentStats[pool.id])) {
              stats[pool.id] = fetchedStats
            } else {
              await pollUpdatedUserStats(
                getUserStats(
                  contractInstance,
                  tokenInstance,
                  pool.contractAddress,
                  pool.autoStakePoolAddress,
                  selectedAccount,
                  autoStakeContractInstance,
                ),
                currentStats,
                () => {
                  console.error(`Something went wrong during the fetching of ${pool.id} user stats`)
                },
                updatedStats => {
                  stats[pool.id] = updatedStats
                },
              )
            }
          }
          // }
        }),
      )
      setUserStats(currStats => ({ ...currStats, ...stats }))
      setLoadingUserPoolStats(false)
    }

    return stats
  },
  [])
  return React.createElement(
    PoolsContext.Provider,
    {
      value: {
        pools: loadedPools,
        allPools: pools,
        fetchUserPoolStats,
        userStats,
        loadedUserPoolsWeb3Provider: loadedUserPoolsWeb3Provider.current,
        loadingUserPoolStats,
        vaultLoading,
        setVaultLoading,
        disableWallet,
        totalPools,
      },
    },
    children,
  )
}

export { PoolsProvider, usePools }
