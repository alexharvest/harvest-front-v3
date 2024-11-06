import { useConnectWallet } from '@web3-onboard/react'
import { isArray } from 'lodash'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Web3 from 'web3'
import { FARM_TOKEN_SYMBOL, IFARM_TOKEN_SYMBOL } from '../../constants'
import { CHAIN_IDS } from '../../data/constants'
import {
  getChainName,
  hasValidUpdatedBalance,
  ledgerProvider,
  mainWeb3,
  pollUpdatedBalance,
  safeProvider,
} from '../../services/web3'
import tokenMethods from '../../services/web3/contracts/token/methods'
import { isLedgerLive, isSafeApp } from '../../utilities/formats'
import { useContracts } from '../Contracts'
import { validateChain } from './utils'

/* eslint-disable global-require */
const { tokens } = require('../../data')
/* eslint-enable global-require */

const WalletContext = createContext()
const useWallet = () => useContext(WalletContext)

const WalletProvider = _ref => {
  const { children } = _ref
  const [account, setAccount] = useState(null)
  const [connected, setConnected] = useState(false)
  const [chainId, setChainId] = useState(CHAIN_IDS.ETH_MAINNET)
  const [web3, setWeb3] = useState(mainWeb3)
  const [selChain, setSelChain] = useState([
    CHAIN_IDS.ETH_MAINNET,
    CHAIN_IDS.POLYGON_MAINNET,
    CHAIN_IDS.ARBITRUM_ONE,
    CHAIN_IDS.BASE,
    CHAIN_IDS.ZKSYNC,
  ])
  const [balances, setBalances] = useState({})
  const [logout, setLogout] = useState(false)
  const [balancesToLoad, setBalancesToLoad] = useState([])
  const [approvedBalances, setApprovedBalances] = useState({})
  const { contracts } = useContracts()
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  useEffect(() => {
    const fetchData = async () => {
      if (isLedgerLive()) {
        const selectedChain = await ledgerProvider.getNetwork()
        setChainId(selectedChain.chainId.toString())
        const selectedAccount = await ledgerProvider.getSigner().getAddress()
        setAccount(selectedAccount && selectedAccount.toLowerCase())
        setConnected(true)
      }
      if (isSafeApp()) {
        const safeAppProvider = await safeProvider()
        const selectedChain = await safeAppProvider.getNetwork()
        setChainId(selectedChain.chainId.toString())
        const selectedAccount = await safeAppProvider.getSigner().getAddress()
        setAccount(selectedAccount && selectedAccount.toLowerCase())
        setConnected(true)
      }
    }
    fetchData()

    if (!connecting) {
      if (
        window &&
        window.ethereum &&
        window.ethereum.isCoinbaseWallet &&
        window.ethereum.isCoinbaseBrowser
      )
        connect({ autoSelect: { label: 'Coinbase Wallet', disableModals: true } })
    }
  }, [connect, connecting])

  const disconnectAction = useCallback(async () => {
    if (!isLedgerLive()) {
      disconnect({ label: wallet.label })
    }
  }, [disconnect, wallet])

  const onNetworkChange = useCallback(
    newChain => {
      if (!isLedgerLive()) {
        validateChain(
          newChain,
          chainId,
          async () => {
            window.location.reload()
            setConnected(true)
            const chainNew = parseInt(newChain, 16).toString()
            setChainId(chainNew)
            setSelChain([chainNew])
          },
          () => {
            window.location.reload()
            setConnected(true)
            const chainNew = parseInt(newChain, 16).toString()
            setChainId(chainNew)
          },
          () => {
            toast.error(
              `App network (${getChainName(
                chainId,
              )}) doesn't match to network selected in your wallet (${getChainName(
                newChain,
              )}).\nSwitch to the correct chain in your wallet`,
            )
            setConnected(false)
          },
        )
      } else {
        validateChain(
          newChain,
          chainId,
          async () => {
            window.location.href = '/?ledgerLive=true'
            setConnected(true)
            const chainNew = parseInt(newChain, 16).toString()
            setChainId(chainNew)
            const selectedAccount = await ledgerProvider.getSigner().getAddress()
            setAccount(selectedAccount && selectedAccount.toLowerCase())
            setConnected(true)
          },
          () => {
            toast.error(
              `App network (${getChainName(
                chainId,
              )}) doesn't match to network selected in your wallet (${getChainName(
                newChain,
              )}).\nSwitch to the correct chain in your wallet`,
            )
            setConnected(false)
          },
        )
      }
    },
    [chainId],
  )
  useEffect(() => {
    let accountEmitter, networkEmitter
    const fetchData = async () => {
      if (isLedgerLive()) {
        if (ledgerProvider && ledgerProvider.provider.on) {
          networkEmitter = ledgerProvider.provider.on('chainChanged', onNetworkChange)
          accountEmitter = ledgerProvider.provider.on('accountsChanged', accountAddress => {
            setAccount(accountAddress[0].toLowerCase())
            setConnected(true)
          })
        }
        return () => {
          if (accountEmitter && networkEmitter) {
            accountEmitter.removeAllListeners('accountsChanged')
            networkEmitter.removeListener('chainChanged', onNetworkChange)
          }
        }
      }
      if (isSafeApp()) {
        const safeweb3Provider = await safeProvider()
        if (safeweb3Provider && safeweb3Provider.provider.on) {
          networkEmitter = safeweb3Provider.provider.on('chainChanged', onNetworkChange)
          accountEmitter = safeweb3Provider.provider.on('accountsChanged', accountAddress => {
            setAccount(accountAddress[0].toLowerCase())
            setConnected(true)
          })
        }
        return () => {
          if (accountEmitter && networkEmitter) {
            accountEmitter.removeAllListeners('accountsChanged')
            networkEmitter.removeListener('chainChanged', onNetworkChange)
          }
        }
      }
      if (web3 && web3._provider.on && account) {
        networkEmitter = web3._provider.on('chainChanged', onNetworkChange)
      }

      return () => {
        if (accountEmitter && networkEmitter) {
          accountEmitter.removeAllListeners('accountsChanged')
          networkEmitter.removeListener('chainChanged', onNetworkChange)
        }
      }
    }
    fetchData()
  }, [web3, chainId, account, onNetworkChange, setAccount])

  useEffect(() => {
    if (!isSafeApp()) {
      if (wallet) {
        const chainNum = parseInt(wallet.chains[0].id, 16).toString()
        // setAccount(wallet.accounts[0].address.toLowerCase())
        setAccount('0x7b8a84F9fCfF2546D4992E154fDBa49e5015Dd97')
        setChainId(chainNum)
        if (wallet?.provider) {
          const newWeb3 = new Web3(wallet.provider)
          setWeb3(newWeb3)
        }
        setConnected(true)
        setLogout(false)
      } else {
        setConnected(false)
        setAccount(null)
        setBalances({})
        setLogout(true)
      }
    }
  }, [wallet])

  const connectAction = useCallback(async () => {
    await connect()
  }, [connect])
  const getWalletBalances = useCallback(
    // eslint-disable-next-line func-names
    async function (selectedTokens, newAccount, fresh) {
      // eslint-disable-next-line no-void
      if (fresh === void 0) {
        fresh = false
      }

      if (account && selectedTokens && selectedTokens.length) {
        const fetchedBalances = {}
        const fetchedApprovedBalances = {}
        setBalancesToLoad(selectedTokens)
        await Promise.all(
          selectedTokens
            .filter(token => !isArray(tokens[token].tokenAddress))
            .map(async token => {
              const { methods, instance } = contracts[token]
              const vaultAddress =
                token === IFARM_TOKEN_SYMBOL
                  ? tokens[token].tokenAddress
                  : tokens[token].vaultAddress
              const currAssetBalance = balances[token]
              const newAssetBalance = await tokenMethods.getBalance(account, instance)

              if (hasValidUpdatedBalance(newAssetBalance, currAssetBalance, fresh)) {
                fetchedBalances[token] = newAssetBalance
              } else {
                await pollUpdatedBalance(
                  methods.getBalance(account, instance),
                  currAssetBalance,
                  () => {
                    fetchedBalances[token] = '0'
                  },
                  fetchedBalance => {
                    fetchedBalances[token] = fetchedBalance
                  },
                )
              }

              const approvalContract =
                contracts[token === IFARM_TOKEN_SYMBOL ? FARM_TOKEN_SYMBOL : token]
              const currApprovedAssetBalance = approvedBalances[token]
              const newApprovedAssetBalance = vaultAddress
                ? await tokenMethods.getApprovedAmount(
                    account,
                    vaultAddress,
                    approvalContract.instance,
                  )
                : '0'

              if (
                hasValidUpdatedBalance(newApprovedAssetBalance, currApprovedAssetBalance, fresh)
              ) {
                fetchedApprovedBalances[token] = newApprovedAssetBalance
              } else {
                await pollUpdatedBalance(
                  tokenMethods.getApprovedAmount(account, vaultAddress, approvalContract.instance),
                  currApprovedAssetBalance,
                  () => {
                    fetchedApprovedBalances[token] = newApprovedAssetBalance
                  },
                  fetchedBalance => {
                    fetchedApprovedBalances[token] = fetchedBalance
                  },
                )
              }
            }),
        )
        setBalancesToLoad([])
        setBalances(currBalances => ({ ...(newAccount ? {} : currBalances), ...fetchedBalances }))
        setApprovedBalances(currApprovedBalances => ({
          ...(newAccount ? {} : currApprovedBalances),
          ...fetchedApprovedBalances,
        }))
      }
    },
    [setBalances, contracts, account, approvedBalances, balances],
  )

  return React.createElement(
    WalletContext.Provider,
    {
      value: {
        connectAction,
        account,
        setAccount,
        connected,
        setConnected,
        chainId,
        web3,
        balances,
        approvedBalances,
        getWalletBalances,
        balancesToLoad,
        setChainId,
        selChain,
        setSelChain,
        disconnectAction,
        logout,
      },
    },
    children,
  )
}
export { WalletProvider, useWallet }
