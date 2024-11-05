import React from 'react'
import ETHEREUM from '../../../assets/images/logos/badge/ethereum.svg'
import ARBITRUM from '../../../assets/images/logos/badge/arbitrum.svg'
import POLYGON from '../../../assets/images/logos/badge/polygon.svg'
import ZKSYNC from '../../../assets/images/logos/badge/zksync.svg'
import BASE from '../../../assets/images/logos/badge/base.svg'
import { formatNumber } from '../../../utilities/formats'
import { tokens } from '../../../data'
import {
  VaultBox,
  Content,
  InfoText,
  BadgeIcon,
  BadgeToken,
  Token,
  ApyDownIcon,
} from '../PositionList/style'
import { FARM_TOKEN_SYMBOL, IFARM_TOKEN_SYMBOL } from '../../../constants'

const VaultList = ({
  matchVault,
  currencySym,
  networkName,
  setShowVaultModal,
  setHighestVaultAddress,
  setHighestApyVault,
  setIsFromModal,
  stopPropagation,
  darkMode,
  filteredFarmList,
  chainId,
  setToken,
  setId,
  groupOfVaults,
  connected,
  currencyRate,
}) => {
  let chainUrl, matchingFarm
  const vaultAddress = matchVault.vault.poolVault
    ? matchVault.vault.tokenAddress
    : matchVault.vault.vaultAddress
  const vaultName = matchVault.vault.tokenNames
  if (connected) {
    chainUrl =
      chainId === 42161
        ? ARBITRUM
        : chainId === 8453
        ? BASE
        : chainId === 324
        ? ZKSYNC
        : chainId === 137
        ? POLYGON
        : ETHEREUM
  } else if (!connected) {
    chainUrl = BASE
  }
  const id = matchVault.vault.pool === undefined ? 'FARM' : matchVault.vault.pool.id
  const useIFARM = id === FARM_TOKEN_SYMBOL
  const token = matchVault.vault
  const platformName = useIFARM
    ? tokens[IFARM_TOKEN_SYMBOL].subLabel
      ? `${tokens[IFARM_TOKEN_SYMBOL].platform[0]} - ${tokens[IFARM_TOKEN_SYMBOL].subLabel}`
      : tokens[IFARM_TOKEN_SYMBOL].platform[0]
    : token.subLabel
    ? token.platform[0] && `${token.platform[0]} - ${token.subLabel}`
    : token.platform[0] && token.platform[0]

  filteredFarmList.forEach(farm => {
    const farmAddress = farm.token.poolVault ? farm.token.tokenAddress : farm.token.vaultAddress
    if (farmAddress.toLowerCase() === vaultAddress.toLowerCase()) {
      matchingFarm = farm
    }
  })

  return (
    <VaultBox
      borderBottom={darkMode ? '1px solid #1F242F' : '1px solid #ECECEC'}
      onClick={() => {
        setShowVaultModal(false)
        setHighestApyVault(matchVault)
        setHighestVaultAddress(vaultAddress)
        setIsFromModal(true)
        setId(id.toString())
        setToken(groupOfVaults[id.toString()])
      }}
      hoverBgColor={darkMode ? '#1F242F' : '#e9f0f7'}
    >
      <Content alignItems="start">
        <InfoText fontSize="10px" fontWeight="500" color="#5fCf76">
          {matchingFarm
            ? `${currencySym}${formatNumber(matchingFarm.balance * currencyRate)}`
            : '-'}
        </InfoText>
        <BadgeToken>
          <BadgeIcon>
            <img src={chainUrl} alt="" />
          </BadgeIcon>
          <Token
            color={darkMode ? '#ffffff' : '#414141'}
            href={`${window.location.origin}/${networkName}/${vaultAddress}`}
            onClick={stopPropagation}
          >
            {`${vaultName.join(', ')} (${platformName})`}
          </Token>
        </BadgeToken>
      </Content>
      <ApyDownIcon>
        <Content alignItems="end">
          <InfoText fontSize="10px" fontWeight="700" color="#5fCf76">
            {`${matchVault.vaultApy}% Live APY`}
          </InfoText>
          <InfoText fontSize="10px" fontWeight="500" color="#6988ff">
            {`$${formatNumber(matchVault.vaultApy / 100)}/yr per $1 allocated`}
          </InfoText>
        </Content>
      </ApyDownIcon>
    </VaultBox>
  )
}

export default VaultList
