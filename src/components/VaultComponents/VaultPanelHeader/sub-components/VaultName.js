import React from 'react'
import { IFARM_TOKEN_SYMBOL } from '../../../../constants'
import { tokens } from '../../../../data'
import {
  TokenDescriptionContainer,
  TokenNameContainer,
  BadgeIcon,
  BadgePlatform,
  Autopilot,
  NewLabel,
} from '../style'
import Diamond from '../../../../assets/images/logos/diamond.svg'

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
  return (
    <TokenDescriptionContainer>
      <TokenNameContainer fontColor1={fontColor1}>
        {useIFARM
          ? tokens[IFARM_TOKEN_SYMBOL].tokenNames.join(' - ')
          : token.tokenNames.join(' - ') || tokenSymbol}
      </TokenNameContainer>
      {isMobile ? (
        <BadgePlatform>
          <BadgeIcon>
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
          {useIFARM ? (
            tokens[IFARM_TOKEN_SYMBOL].subLabel ? (
              `${tokens[IFARM_TOKEN_SYMBOL].platform[0]} - ${tokens[IFARM_TOKEN_SYMBOL].subLabel}`
            ) : (
              tokens[IFARM_TOKEN_SYMBOL].platform[0]
            )
          ) : token.subLabel ? (
            token.platform[0] && `${token.platform[0]} - ${token.subLabel}`
          ) : token.platform[0] && token.platform[0] === 'Autopilot' ? (
            <Autopilot>
              <img src={Diamond} width="12" height="12" alt="" />
              <NewLabel>{token.platform[0]}</NewLabel>
            </Autopilot>
          ) : (
            token.platform[0] && token.platform[0]
          )}
        </>
      )}
    </TokenDescriptionContainer>
  )
}

export default VaultName
