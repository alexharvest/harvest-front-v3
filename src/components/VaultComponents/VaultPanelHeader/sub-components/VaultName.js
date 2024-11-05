import React from 'react'
import { IFARM_TOKEN_SYMBOL } from '../../../../constants'
import { tokens } from '../../../../data'
import { TokenDescriptionContainer, TokenNameContainer, BadgeIcon, BadgePlatform } from '../style'
import { useThemeContext } from '../../../../providers/useThemeContext'

const VaultName = ({
  token,
  tokenSymbol,
  useIFARM,
  fontColor1,
  BadgeAry,
  badgeId,
  lsdToken,
  LSD,
  desciToken,
  DESCI,
  isMobile,
}) => {
  const { darkMode } = useThemeContext()
  return (
    <TokenDescriptionContainer>
      <TokenNameContainer fontColor1={fontColor1}>
        {useIFARM
          ? tokens[IFARM_TOKEN_SYMBOL].tokenNames.join(' - ')
          : token.tokenNames.join(' - ') || tokenSymbol}
      </TokenNameContainer>
      {isMobile ? (
        <BadgePlatform>
          <BadgeIcon badgeBack={darkMode ? 'transparent' : 'rgba(255, 255, 255, 0.6)'}>
            {BadgeAry[badgeId] ? (
              <img src={BadgeAry[badgeId]} width="10" height="10" alt="" />
            ) : (
              <></>
            )}
          </BadgeIcon>
          {lsdToken ? <img className="tag" src={LSD} alt="" /> : null}
          {desciToken ? <img className="tag" src={DESCI} alt="" /> : null}
          {useIFARM
            ? tokens[IFARM_TOKEN_SYMBOL].subLabel
              ? `${tokens[IFARM_TOKEN_SYMBOL].platform[0]} - ${tokens[IFARM_TOKEN_SYMBOL].subLabel}`
              : tokens[IFARM_TOKEN_SYMBOL].platform[0]
            : token.subLabel
            ? token.platform[0] && `${token.platform[0]} - ${token.subLabel}`
            : token.platform[0] && token.platform[0]}
        </BadgePlatform>
      ) : (
        <>
          {useIFARM
            ? tokens[IFARM_TOKEN_SYMBOL].subLabel
              ? `${tokens[IFARM_TOKEN_SYMBOL].platform[0]} - ${tokens[IFARM_TOKEN_SYMBOL].subLabel}`
              : tokens[IFARM_TOKEN_SYMBOL].platform[0]
            : token.subLabel
            ? token.platform[0] && `${token.platform[0]} - ${token.subLabel}`
            : token.platform[0] && token.platform[0]}
        </>
      )}
    </TokenDescriptionContainer>
  )
}

export default VaultName
