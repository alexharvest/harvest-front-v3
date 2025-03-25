import BigNumber from 'bignumber.js'
import { forEach } from 'promised-loops'
import { find } from 'lodash'
import { FARM_GRAIN_TOKEN_SYMBOL, FARM_TOKEN_SYMBOL, FARM_WETH_TOKEN_SYMBOL } from '../../constants'

export const calculateTotalValueDeposited = async vaults => {
  let totalDeposited = new BigNumber(0)

  await forEach(Object.keys(vaults), async vaultSymbol => {
    const { usdPrice, decimals, underlyingBalanceWithInvestment } = vaults[vaultSymbol]
    const tokenPriceInUSD = new BigNumber(usdPrice)

    totalDeposited = totalDeposited.plus(
      new BigNumber(underlyingBalanceWithInvestment)
        .multipliedBy(tokenPriceInUSD)
        .dividedBy(new BigNumber(10).exponentiatedBy(Number(decimals))),
    )
  })

  return totalDeposited
}

export const calculateFarmingBalance = async (pools, userStats, vaultSymbol, vaultsData) => {
  let farmedBalance = '0'
  if (!vaultsData[vaultSymbol]) return '0'
  const { vaultAddress, underlyingBalanceWithInvestment, totalSupply } = vaultsData[vaultSymbol]

  const vaultPool = find(pools, pool => pool.collateralAddress === vaultAddress)
  try {
    const userBalanceInVault = new BigNumber(
      userStats[vaultPool?.id] && userStats[vaultPool?.id].lpTokenBalance,
    )

    if (vaultPool && vaultPool.contractInstance) {
      const userBalanceInPool = new BigNumber(
        userStats[vaultPool.id] && userStats[vaultPool.id].totalStaked,
      )

      const underlyingPoolBalanceForHolder = new BigNumber(totalSupply).isGreaterThan(0)
        ? new BigNumber(underlyingBalanceWithInvestment)
            .multipliedBy(userBalanceInPool.plus(userBalanceInVault))
            .dividedBy(totalSupply)
        : userBalanceInPool.plus(userBalanceInVault)

      farmedBalance = underlyingPoolBalanceForHolder.toFixed()
    } else {
      farmedBalance = userBalanceInVault.toFixed()
    }
  } catch (err) {
    console.error(err)
    console.log('vaultSymbol: ', vaultSymbol)
    farmedBalance = 'error'
  }

  return farmedBalance
}

export const filterVaults = selectedVaults =>
  selectedVaults.filter(
    vaultSymbol =>
      vaultSymbol !== FARM_TOKEN_SYMBOL &&
      vaultSymbol !== FARM_WETH_TOKEN_SYMBOL &&
      vaultSymbol !== FARM_GRAIN_TOKEN_SYMBOL,
  )
