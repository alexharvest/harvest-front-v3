import React from 'react'
import { useMediaQuery } from 'react-responsive'
import ReactHtmlParser from 'react-html-parser'
import { HalfInfo, NewLabel, DescInfo, FlexDiv, InfoLabel } from './style'
import { useThemeContext } from '../../../providers/useThemeContext'
import { getExplorerLink } from '../../../services/web3'

const SourceOfYield = params => {
  const {
    bgColor,
    bgColorNew,
    borderColorBox,
    hoverColor,
    fontColor1,
    fontColor3,
    fontColor4,
    fontColor6,
  } = useThemeContext()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const useIFARM = params.useIFARM
  const token = params.token
  const vaultPool = params.vaultPool

  return (
    <HalfInfo marginBottom="20px" backColor={bgColorNew} borderColor={borderColorBox}>
      <NewLabel
        size={isMobile ? '12px' : '14px'}
        weight={isMobile ? '600' : '600'}
        height={isMobile ? '20px' : '24px'}
        color={fontColor4}
        padding={isMobile ? '10px 15px' : '10px 15px'}
        borderBottom={`1px solid ${borderColorBox}`}
      >
        Source of Yield
      </NewLabel>
      <DescInfo fontColor6={fontColor6} fontColor3={fontColor3}>
        {useIFARM ? (
          <div>
            <p>
              This vault enables users to convert their assets into{' '}
              <a
                href="https://etherscan.io/token/0x1571eD0bed4D987fe2b498DdBaE7DFA19519F651"
                target="_blank"
                rel="noopener noreferrer"
              >
                iFARM
              </a>
              . In doing so, they benefit from a portion of the fees collected by Harvest.
            </p>
          </div>
        ) : token.isIPORVault ? (
          <div>
            <p>
              Harvest{' '}
              <a
                href={`${getExplorerLink(token?.chain)}/address/${token?.vaultAddress}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {token.tokenNames[0]}
              </a>{' '}
              Autopilot plugs into multiple sub-level vaults and uses algorithms to monitor and
              adjust positioning based on prevailing interest rates, liquidity conditions, and
              network gas costs. It streamlines the process by selecting optimal opportunities
              within Harvest, helping users maximize efficiency without manual oversight.
            </p>
          </div>
        ) : (
          ReactHtmlParser(vaultPool?.stakeAndDepositHelpMessage)
        )}
      </DescInfo>
      <FlexDiv className="address" padding="0 15px 20px">
        {token.vaultAddress && (
          <InfoLabel
            display="flex"
            href={`${getExplorerLink(token?.chain)}/address/${token?.vaultAddress}`}
            target="_blank"
            onClick={e => e.stopPropagation()}
            rel="noopener noreferrer"
            bgColor={bgColorNew}
            hoverColor={hoverColor}
            borderColor={borderColorBox}
          >
            <NewLabel
              size="12px"
              weight={isMobile ? 600 : 600}
              height="16px"
              self="center"
              color={fontColor1}
            >
              Vault Address
            </NewLabel>
          </InfoLabel>
        )}
        {token.strategyAddress && (
          <InfoLabel
            display="flex"
            href={`${getExplorerLink(token?.chain)}/address/${token?.strategyAddress}`}
            target="_blank"
            onClick={e => e.stopPropagation()}
            rel="noopener noreferrer"
            bgColor={bgColorNew}
            hoverColor={hoverColor}
            borderColor={borderColorBox}
          >
            <NewLabel
              size="12px"
              weight={isMobile ? 600 : 600}
              height="16px"
              self="center"
              color={fontColor1}
            >
              Strategy Address
            </NewLabel>
          </InfoLabel>
        )}
        {token.isIPORVault ? (
          <></>
        ) : (
          <>
            <InfoLabel
              display="flex"
              href={`${getExplorerLink(token.chain)}/address/${
                vaultPool?.autoStakePoolAddress || vaultPool?.contractAddress
              }`}
              onClick={e => e.stopPropagation()}
              rel="noopener noreferrer"
              target="_blank"
              bgColor={bgColorNew}
              hoverColor={hoverColor}
              borderColor={borderColorBox}
            >
              <NewLabel
                size="12px"
                weight={isMobile ? 400 : 600}
                height="16px"
                self="center"
                color={fontColor1}
              >
                Pool Address
              </NewLabel>
            </InfoLabel>
            {vaultPool?.liquidityUrl && (
              <InfoLabel
                display="flex"
                href={`${vaultPool?.liquidityUrl}`}
                target="_blank"
                onClick={e => e.stopPropagation()}
                rel="noopener noreferrer"
                bgColor={bgColor}
                hoverColor={hoverColor}
                borderColor={borderColorBox}
              >
                <NewLabel
                  size="12px"
                  weight={isMobile ? 600 : 600}
                  height="16px"
                  self="center"
                  color={fontColor1}
                >
                  Add Liquidity
                </NewLabel>
              </InfoLabel>
            )}
          </>
        )}
      </FlexDiv>
    </HalfInfo>
  )
}

export default SourceOfYield
