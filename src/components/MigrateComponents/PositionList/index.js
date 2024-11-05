import React from 'react'
import { VaultBox, Content, InfoText, BadgeIcon, Token, ApyDownIcon, BadgeToken } from './style'
import ETHEREUM from '../../../assets/images/logos/badge/ethereum.svg'
import { formatNumber } from '../../../utilities/formats'

const PositionList = ({
  matchVault,
  currencySym,
  networkName,
  setShowPositionModal,
  setPositionVaultAddress,
  setHighestPosition,
  setIsFromModal,
  stopPropagation,
  darkMode,
  setId,
  setToken,
  groupOfVaults,
  currencyRate,
}) => {
  const vaultAddress = matchVault.token.poolVault
    ? '0xa0246c9032bC3A600820415aE600c6388619A14D'
    : matchVault.token.vaultAddress
  const vaultName = matchVault.token.tokenNames
  const id = matchVault.token.poolVault ? 'FARM' : matchVault.token.pool.id

  return (
    <VaultBox
      borderBottom={darkMode ? '1px solid #1F242F' : '1px solid #ECECEC'}
      onClick={() => {
        setShowPositionModal(false)
        setHighestPosition(matchVault)
        setId(id.toString())
        setPositionVaultAddress(vaultAddress)
        setIsFromModal(true)
        setToken(groupOfVaults[id.toString()])
      }}
      hoverBgColor={darkMode ? '#1F242F' : '#e9f0f7'}
    >
      <Content alignItems="start">
        <InfoText fontSize="10px" fontWeight="500" color="#5fCf76">
          {matchVault.balance >= 0.01
            ? `${currencySym}${formatNumber(matchVault.balance * currencyRate)}`
            : `<${currencySym}0.01`}
        </InfoText>
        <BadgeToken>
          <BadgeIcon>
            <img src={matchVault.chain ? matchVault.chain : ETHEREUM} alt="" />
          </BadgeIcon>
          <Token
            color={darkMode ? '#ffffff' : '#414141'}
            href={`${window.location.origin}/${networkName}/${vaultAddress}`}
            onClick={stopPropagation}
          >
            {`${vaultName.join(', ')} (${matchVault.platform})`}
          </Token>
        </BadgeToken>
      </Content>
      <ApyDownIcon>
        <Content alignItems="end">
          <InfoText fontSize="10px" fontWeight="700" color="#5fCf76">
            {`${matchVault.apy}% Live APY`}
          </InfoText>
          <InfoText fontSize="10px" fontWeight="500" color="#6988ff">
            {`$${formatNumber(matchVault.apy / 100)}/yr per $1 allocated`}
          </InfoText>
        </Content>
      </ApyDownIcon>
    </VaultBox>
  )
}

export default PositionList
