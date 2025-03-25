import { find, isArray, isEmpty } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { FARM_TOKEN_SYMBOL } from '../../../constants'
import { usePools } from '../../../providers/Pools'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useVaults } from '../../../providers/Vault'
import { useWallet } from '../../../providers/Wallet'
import VaultPanelHeader from '../VaultPanelHeader'
import VaultContainer from './style'

const { tokens } = require('../../../data')

const VaultPanel = ({ token, loaded, tokenSymbol, tokenNum, vaultsCount, ...props }) => {
  const { hoverColor } = useThemeContext()
  const { pools, fetchUserPoolStats, userStats, vaultLoading, setVaultLoading } = usePools()
  const { account, logout, chainId } = useWallet()
  const { vaultsData } = useVaults()
  const [loadingFarmingBalance] = useState(false)

  const isSpecialVault = token.liquidityPoolVault || token.poolVault

  const fAssetPool = isSpecialVault
    ? token.data
    : find(pools, pool => pool.collateralAddress === tokens[tokenSymbol].vaultAddress)

  const [useIFARM] = useState(tokenSymbol === FARM_TOKEN_SYMBOL)

  const multipleAssets = useMemo(
    () =>
      isArray(tokens[tokenSymbol].tokenAddress) &&
      tokens[tokenSymbol].tokenAddress.map(address => {
        const selectedSymbol = Object.keys(tokens).find(
          symbol =>
            !isArray(tokens[symbol].tokenAddress) &&
            tokens[symbol].tokenAddress.toLowerCase() === address.toLowerCase(),
        )
        return selectedSymbol
      }),
    [tokenSymbol],
  )

  useEffect(() => {
    if (logout) {
      setVaultLoading(true)
      return
    }
    setVaultLoading(true)
  }, [logout, chainId, setVaultLoading])

  useEffect(() => {
    if (account && fAssetPool && !isEmpty(userStats) && useIFARM && vaultLoading) {
      const loadUserPoolsStats = async () => {
        const poolsToLoad = [fAssetPool]

        await fetchUserPoolStats(poolsToLoad, account, userStats)
        setVaultLoading(false)
      }
      loadUserPoolsStats()
    }
  }, [
    account,
    setVaultLoading,
    fAssetPool,
    fetchUserPoolStats,
    pools,
    vaultsData,
    tokenSymbol,
    userStats,
    useIFARM,
    vaultLoading,
  ])

  return (
    <>
      <VaultContainer hoverColor={hoverColor} lastElement={vaultsCount === tokenNum}>
        <VaultPanelHeader
          token={token}
          tokenSymbol={tokenSymbol}
          useIFARM={useIFARM}
          isSpecialVault={isSpecialVault}
          multipleAssets={multipleAssets}
          loadedVault={loaded}
          loadingFarmingBalance={loadingFarmingBalance}
          {...props}
        />
      </VaultContainer>
    </>
  )
}

export default VaultPanel
