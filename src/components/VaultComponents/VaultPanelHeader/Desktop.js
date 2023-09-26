import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ARBITRUM from '../../../assets/images/chains/arbitrum.svg'
import BASE from '../../../assets/images/chains/base.svg'
import ERA from '../../../assets/images/chains/era.svg'
import ETHEREUM from '../../../assets/images/logos/badge/ethereum.svg'
import POLYGON from '../../../assets/images/logos/badge/polygon.svg'
import LSD from '../../../assets/images/logos/lsd.svg'
import DESCI from '../../../assets/images/logos/DeSci.svg'
import { directDetailUrl } from '../../../constants'
import { useThemeContext } from '../../../providers/useThemeContext'
import { BadgeIcon, LogoImg, PanelContainer, ValueContainer } from './style'
import VaultApy from './sub-components/VaultApy'
import VaultName from './sub-components/VaultName'
import VaultUserBalance from './sub-components/VaultUserBalance'
import VaultValue from './sub-components/VaultValue'
import { isLedgerLive } from '../../../utils'

const chainList = isLedgerLive()
  ? [
      { id: 1, name: 'Ethereum', chainId: 1 },
      { id: 2, name: 'Polygon', chainId: 137 },
    ]
  : [
      { id: 1, name: 'Ethereum', chainId: 1 },
      { id: 2, name: 'Polygon', chainId: 137 },
      { id: 3, name: 'Arbitrum', chainId: 42161 },
      { id: 4, name: 'Base', chainId: 8453 },
      { id: 5, name: 'Era', chainId: 324 },
    ]

const DesktopPanelHeader = ({
  token,
  tokenSymbol,
  useIFARM,
  vaultPool,
  isSpecialVault,
  multipleAssets,
  loadedVault,
  loadingFarmingBalance,
  lsdToken,
  desciToken,
}) => {
  const BadgeAry = isLedgerLive() ? [ETHEREUM, POLYGON] : [ETHEREUM, POLYGON, ARBITRUM, BASE, ERA]

  const chainId = token.chain || token.data.chain
  const [badgeId, setBadgeId] = useState(-1)

  const { logoUrl } = token

  const { push } = useHistory()

  const { fontColor, borderColor, badgeIconBackColor, setPrevPage } = useThemeContext()

  useEffect(() => {
    const getBadge = () => {
      chainList.forEach((el, i) => {
        if (el.chainId === Number(chainId)) {
          setBadgeId(i)
        }
      })
    }
    getBadge()
  }, [chainId])

  return (
    <>
      <PanelContainer
        fontColor={fontColor}
        borderColor={borderColor}
        onClick={() => {
          const network = chainList[badgeId].name.toLowerCase()
          const address = isSpecialVault
            ? token.data.collateralAddress
            : token.vaultAddress || token.tokenAddress
          setPrevPage(window.location.href)
          push(`${directDetailUrl + network}/${address}`)
        }}
      >
        <ValueContainer width="5%" />
        <ValueContainer width="20%" textAlign="left">
          {logoUrl.map((el, i) => (
            <LogoImg key={i} className="logo-img" zIndex={10 - i} src={el} alt={tokenSymbol} />
          ))}
          <BadgeIcon badgeBack={badgeIconBackColor}>
            {BadgeAry[badgeId] ? (
              <img src={BadgeAry[badgeId]} width="17px" height="17px" alt="" />
            ) : (
              <></>
            )}
          </BadgeIcon>
          {lsdToken ? <img className="tag" src={LSD} alt="" /> : null}
          {desciToken ? <img className="tag" src={DESCI} alt="" /> : null}
        </ValueContainer>
        <ValueContainer width="25%" textAlign="left" paddingLeft="0%">
          <VaultName token={token} tokenSymbol={tokenSymbol} useIFARM={useIFARM} />
        </ValueContainer>
        <ValueContainer width="10%">
          <VaultApy
            token={token}
            tokenSymbol={tokenSymbol}
            vaultPool={vaultPool}
            isSpecialVault={isSpecialVault}
          />
        </ValueContainer>
        <ValueContainer width="20%">
          <VaultValue token={token} />
        </ValueContainer>
        <ValueContainer width="20%">
          <VaultUserBalance
            token={token}
            tokenSymbol={tokenSymbol}
            multipleAssets={multipleAssets}
            isSpecialVault={isSpecialVault}
            loadingFarmingBalance={loadingFarmingBalance}
            vaultPool={vaultPool}
            loadedVault={loadedVault}
          />
        </ValueContainer>
      </PanelContainer>
    </>
  )
}

export default DesktopPanelHeader
