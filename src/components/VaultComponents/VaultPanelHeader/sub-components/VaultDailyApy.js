import { get } from 'lodash'
import React from 'react'
import { useVaults } from '../../../../providers/Vault'
import { getTotalApy } from '../../../../utilities/parsers'
import AnimatedDots from '../../../AnimatedDots'
import { RewardsContainer } from '../style'

const VaultDailyApy = ({ token, tokenSymbol, vaultPool, isSpecialVault, fontColor1 }) => {
  const { loadingVaults, vaultsData } = useVaults()
  const tokenVault = get(vaultsData, token.hodlVaultId || tokenSymbol)

  const totalApy = isSpecialVault
    ? getTotalApy(null, token, true)
    : getTotalApy(vaultPool, tokenVault)

  const apyDaily = totalApy
    ? (((Number(totalApy) / 100 + 1) ** (1 / 365) - 1) * 100).toFixed(3)
    : null

  if (token.excludeVaultStats) {
    return 'N/A'
  }

  return isSpecialVault ? (
    token.data && (token.data.dataFetched === false || totalApy !== null) ? (
      <RewardsContainer $fontcolor1={fontColor1}>
        {token.inactive ? 'Inactive' : <>{totalApy ? `${apyDaily}%` : null}</>}
      </RewardsContainer>
    ) : (
      <b>
        <AnimatedDots />
      </b>
    )
  ) : totalApy !== null && !loadingVaults ? (
    <RewardsContainer $fontcolor1={fontColor1}>
      {token.inactive || token.testInactive || token.hideTotalApy || !token.dataFetched ? (
        token.inactive || token.testInactive ? (
          'Inactive'
        ) : null
      ) : (
        <>{apyDaily}% &nbsp;</>
      )}
    </RewardsContainer>
  ) : (
    <b>
      <AnimatedDots />
    </b>
  )
}

export default VaultDailyApy
