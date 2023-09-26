import BigNumber from 'bignumber.js'
import { find, get, isEmpty, isNaN } from 'lodash'
import React, { useCallback, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {
  FARM_TOKEN_SYMBOL,
  IFARM_TOKEN_SYMBOL,
  POOL_BALANCES_DECIMALS,
  SPECIAL_VAULTS,
} from '../../../constants'
import { CHAIN_IDS } from '../../../data/constants'
import { usePools } from '../../../providers/Pools'
import { calculateRewardsEarned } from '../../../providers/Pools/utils'
import { useVaults } from '../../../providers/Vault'
import { useWallet } from '../../../providers/Wallet'
import { fromWei, newContractInstance, toWei } from '../../../services/web3'
import poolMethods from '../../../services/web3/contracts/pool/methods'
import tokenContract from '../../../services/web3/contracts/token/contract.json'
import tokenMethods from '../../../services/web3/contracts/token/methods'
import vaultMethods from '../../../services/web3/contracts/vault/methods'
import { convertAmountToFARM } from '../../../utils'
import PoolFooterActions from './PoolFooterActions'
import VaultFooterActions from './VaultFooterActions'

const { addresses, tokens } = require('../../../data')

const getPoolRewardSymbol = chain => {
  if (
    chain === CHAIN_IDS.ARBITRUM_ONE ||
    chain === CHAIN_IDS.POLYGON_MAINNET ||
    chain === CHAIN_IDS.BASE ||
    chain === CHAIN_IDS.ERA
  ) {
    return IFARM_TOKEN_SYMBOL
  }
  return FARM_TOKEN_SYMBOL
}

const VaultPanelActionsFooter = ({
  type,
  token,
  tokenSymbol,
  tokenDecimals,
  amountsToExecute,
  isSpecialVault,
  multipleAssets,
  withdrawMode,
  fAssetPool,
  loadingBalances,
  ...props
}) => {
  const { account, balances, chain } = useWallet()
  const { userStats, pools } = usePools()
  const { vaultsData } = useVaults()
  const [loadingRewards, setLoadingRewards] = useState(false)
  const [rewardsEarned, setRewardsEarned] = useState({})
  const [rewardTokenSymbols, setRewardTokenSymbols] = useState([])

  let totalTokensEarned = '0',
    iFARMBalance,
    iFARMBalanceToEther,
    iFARMinFARMInEther

  const ratesPerDay = []

  if (fAssetPool) {
    const [, selectedToken] = find(Object.entries(tokens), ([, tokenValues]) =>
      fAssetPool.rewardTokens.includes(tokenValues.tokenAddress),
    )
    if (fAssetPool.rewardAPY !== null) {
      fAssetPool.rewardAPY.forEach(rewardApy => {
        const ratePerDay = new BigNumber(rewardApy).dividedBy(365).dividedBy(100)
        ratesPerDay.push(
          isNaN(ratePerDay.toNumber()) ? 0 : ratePerDay.gte(1) ? 1 : ratePerDay.toFixed(),
        )
      })
    }

    totalTokensEarned = fromWei(
      get(userStats, `[${fAssetPool.id}]['totalRewardsEarned']`, 0),
      selectedToken.decimals,
      4,
    )
  }

  if (fAssetPool.id === SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID) {
    iFARMBalance = get(balances, IFARM_TOKEN_SYMBOL, 0)
    iFARMBalanceToEther = fromWei(
      get(balances, IFARM_TOKEN_SYMBOL, 0),
      tokens[IFARM_TOKEN_SYMBOL].decimals,
      POOL_BALANCES_DECIMALS,
      true,
    )

    iFARMinFARMInEther = fromWei(
      convertAmountToFARM(
        IFARM_TOKEN_SYMBOL,
        iFARMBalance <= 0 ? toWei(1, tokens[IFARM_TOKEN_SYMBOL].decimals) : iFARMBalance,
        tokens[FARM_TOKEN_SYMBOL].decimals,
        vaultsData,
      ),
      tokens[FARM_TOKEN_SYMBOL].decimals,
      POOL_BALANCES_DECIMALS,
      true,
    )
  }

  const getRewardsEarned = useCallback(
    async (hodlVaultId, mainRewardsEarned, hodlRewardTokenSymbols, hodlPool) => {
      if (hodlVaultId) {
        const userBalanceInVault = new BigNumber(
          await tokenMethods.getBalance(account, vaultsData[tokenSymbol].instance),
        )
        const userBalanceInPool = await poolMethods.balanceOf(account, fAssetPool.contractInstance)
        const totalBalance = userBalanceInVault.plus(userBalanceInPool)

        const vaultStrategyAddress = await vaultMethods.getStrategy(
          vaultsData[tokenSymbol].instance,
        )

        await Promise.all(
          Object.keys(hodlRewardTokenSymbols).map(async (rewardSymbolIdx, index) => {
            const hodlReward = new BigNumber(
              await calculateRewardsEarned(index, vaultStrategyAddress, hodlPool.contractInstance),
            )
            const rewardTokenBalance = await tokenMethods.getBalance(
              vaultStrategyAddress,
              await newContractInstance(
                null,
                addresses[hodlRewardTokenSymbols[rewardSymbolIdx]],
                tokenContract.abi,
              ),
            )
            mainRewardsEarned[hodlRewardTokenSymbols[rewardSymbolIdx]] = totalBalance
              .multipliedBy(hodlReward.plus(rewardTokenBalance))
              .dividedBy(vaultsData[tokenSymbol].totalSupply)
              .toString()
          }),
        )
        setRewardsEarned(mainRewardsEarned)
      } else {
        setRewardsEarned(mainRewardsEarned)
      }
    },
    [account, tokenSymbol, vaultsData, fAssetPool.contractInstance],
  )

  const hodlVaultId = get(vaultsData, `[${tokenSymbol}].hodlVaultId`)

  useDeepCompareEffect(() => {
    const fetchRewards = async () => {
      setLoadingRewards(true)
      const hodlVaultData = get(vaultsData, hodlVaultId)
      const hodlPool = hodlVaultData
        ? find(pools, selectedPool => selectedPool.collateralAddress === hodlVaultData.vaultAddress)
        : {}

      const mainRewardsEarned = get(userStats, `[${get(fAssetPool, 'id')}].rewardsEarned`)
      const mainRewardTokenSymbols = get(fAssetPool, 'rewardTokenSymbols', [])
      const hodlRewardTokenSymbols = get(hodlPool, 'rewardTokenSymbols', [])

      setRewardTokenSymbols([...mainRewardTokenSymbols, ...hodlRewardTokenSymbols])

      if (mainRewardsEarned) {
        await getRewardsEarned(hodlVaultId, mainRewardsEarned, hodlRewardTokenSymbols, hodlPool)
      }

      setLoadingRewards(false)
    }

    fetchRewards()
  }, [hodlVaultId, userStats, fAssetPool, pools, vaultsData, getRewardsEarned, setLoadingRewards])

  const amountsToExecuteInWei = amountsToExecute.map((amount, amountIdx) => {
    if (isEmpty(amount)) {
      return null
    }

    if (multipleAssets) {
      return toWei(
        amount,
        withdrawMode ? token.decimals : tokens[multipleAssets[amountIdx]].decimals,
        0,
      )
    }
    return toWei(amount, isSpecialVault ? tokenDecimals : token.decimals)
  })

  const isLoadingData = loadingBalances || loadingRewards || !fAssetPool.loaded

  const componentsProps = {
    token,
    amountsToExecuteInWei,
    multipleAssets,
    withdrawMode,
    isLoadingData,
    fAssetPool,
    tokenSymbol,
    rewardsEarned,
    rewardTokenSymbols,
    ratesPerDay,
    totalTokensEarned,
    iFARMBalanceToEther,
    iFARMinFARMInEther,
    loadingBalances,
    isSpecialVault,
    poolRewardSymbol: getPoolRewardSymbol(chain),
    ...props,
  }

  if (isSpecialVault) {
    return (
      <>
        <PoolFooterActions {...componentsProps} />
      </>
    )
  }

  return (
    <>
      <VaultFooterActions {...componentsProps} />
    </>
  )
}

export default VaultPanelActionsFooter
