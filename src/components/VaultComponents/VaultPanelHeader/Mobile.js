import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useHistory, useLocation } from 'react-router-dom'
import ARBITRUM from '../../../assets/images/chains/arbitrum.svg'
import BASE from '../../../assets/images/chains/base.svg'
import ETHEREUM from '../../../assets/images/chains/ethereum.svg'
import POLYGON from '../../../assets/images/chains/polygon.svg'
import ZKSYNC from '../../../assets/images/chains/zksync.svg'
import APYIcon from '../../../assets/images/logos/farm/sortAPY.svg'
import TVLIcon from '../../../assets/images/logos/farm/sortBank.svg'
import DailyIcon from '../../../assets/images/logos/farm/sortCurrency.svg'
import LSD from '../../../assets/images/logos/lsd.svg'
import DESCI from '../../../assets/images/logos/DeSci.svg'
import { chainList, directDetailUrl } from '../../../constants'
import { useThemeContext } from '../../../providers/useThemeContext'
import {
  // BadgeIcon,
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
  const location = useLocation()
  const BadgeAry = [ETHEREUM, POLYGON, ARBITRUM, BASE, ZKSYNC]
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

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
        const url = `${directDetailUrl}${network}/${address}${location.search}`
        push(url)
      }}
    >
      <FlexDiv
        className="token-symbols"
        width="60%"
        alignSelf="center"
        marginRight="18px"
        paddingBottom="5px"
      >
        <div>
          {logoUrl.map((el, i) => (
            <img key={i} src={el} width={19} alt={tokenSymbol} />
          ))}
        </div>
        <TokenLogoContainer>
          <VaultName
            token={token}
            tokenSymbol={tokenSymbol}
            useIFARM={useIFARM}
            BadgeAry={BadgeAry}
            badgeId={badgeId}
            badgeIconBackColor={badgeIconBackColor}
            lsdToken={lsdToken}
            LSD={LSD}
            desciToken={desciToken}
            DESCI={DESCI}
            isMobile={isMobile}
          />
        </TokenLogoContainer>
      </FlexDiv>
      <FlexDiv width="30%">
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
              useIFARM={useIFARM}
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
