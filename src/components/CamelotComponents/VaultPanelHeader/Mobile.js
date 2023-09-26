import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ARBITRUM from '../../../assets/images/chains/arbitrum.svg'
import BASE from '../../../assets/images/chains/base.svg'
import ERA from '../../../assets/images/chains/era.svg'
import ETHEREUM from '../../../assets/images/chains/ethereum.svg'
import POLYGON from '../../../assets/images/chains/polygon.svg'
import APYIcon from '../../../assets/images/logos/farm/MobileAPYIcon.svg'
import DailyIcon from '../../../assets/images/logos/farm/MobileDailyIcon.svg'
import TVLIcon from '../../../assets/images/logos/farm/MobileTVLIcon.svg'
import LSD from '../../../assets/images/logos/lsd.svg'
import DESCI from '../../../assets/images/logos/DeSci.svg'
import { directDetailUrl } from '../../../constants'
import { useThemeContext } from '../../../providers/useThemeContext'
import { isLedgerLive } from '../../../utils'
import {
  BadgeIcon,
  FlexDiv,
  MobileVaultInfoContainer,
  MobileVaultValueContainer,
  PanelContainer,
  TokenLogoContainer,
} from './style'
import VaultApy from './sub-components/VaultApy'
import VaultName from './sub-components/VaultName'
import VaultUserBalance from './sub-components/VaultUserBalance'
import VaultValue from './sub-components/VaultValue'

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

const MobilePanelHeader = ({
  token,
  tokenSymbol,
  vaultPool,
  useIFARM,
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

  const { push } = useHistory()

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

  const { logoUrl } = token

  const { badgeIconBackColor, fontColor, borderColor, setPrevPage } = useThemeContext()
  return (
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
      <FlexDiv width="10%">
        <BadgeIcon badgeBack={badgeIconBackColor}>
          {BadgeAry[badgeId] ? (
            <img src={BadgeAry[badgeId]} width="10" height="10" alt="" />
          ) : (
            <></>
          )}
        </BadgeIcon>
        {lsdToken ? <img className="tag" src={LSD} alt="" /> : null}
        {desciToken ? <img className="tag" src={DESCI} alt="" /> : null}
      </FlexDiv>
      <FlexDiv width="70%" alignSelf="center" marginRight="18px">
        <div>
          {logoUrl.map((el, i) => (
            <img key={i} src={el} width={19} alt={tokenSymbol} />
          ))}
        </div>
        <div>
          <TokenLogoContainer>
            <VaultName token={token} tokenSymbol={tokenSymbol} useIFARM={useIFARM} />
          </TokenLogoContainer>
        </div>
      </FlexDiv>
      <FlexDiv width="20%">
        <MobileVaultInfoContainer>
          <MobileVaultValueContainer>
            <VaultApy
              token={token}
              tokenSymbol={tokenSymbol}
              vaultPool={vaultPool}
              isSpecialVault={isSpecialVault}
              mobile
            />
            <div className="title">
              <img src={APYIcon} alt="" />
            </div>
          </MobileVaultValueContainer>
          <MobileVaultValueContainer>
            <VaultValue token={token} tokenSymbol={tokenSymbol} />
            <div className="title">
              <img src={TVLIcon} alt="" />
            </div>
          </MobileVaultValueContainer>
          <MobileVaultValueContainer>
            <VaultUserBalance
              token={token}
              tokenSymbol={tokenSymbol}
              multipleAssets={multipleAssets}
              isSpecialVault={isSpecialVault}
              loadingFarmingBalance={loadingFarmingBalance}
              vaultPool={vaultPool}
              loadedVault={loadedVault}
            />
            <div className="title">
              <img src={DailyIcon} alt="" />
            </div>
          </MobileVaultValueContainer>
        </MobileVaultInfoContainer>
      </FlexDiv>
    </PanelContainer>
  )
}

export default MobilePanelHeader
