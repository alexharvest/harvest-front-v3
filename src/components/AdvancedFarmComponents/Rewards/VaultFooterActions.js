import { get } from 'lodash'
import React from 'react'
import { useSetChain } from '@web3-onboard/react'
import ReactTooltip from 'react-tooltip'
import { ACTIONS } from '../../../constants'
import { useActions } from '../../../providers/Actions'
import { usePools } from '../../../providers/Pools'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useVaults } from '../../../providers/Vault'
import { useWallet } from '../../../providers/Wallet'
import { fromWei } from '../../../services/web3'
import {
  hasAmountGreaterThanZero,
  hasRequirementsForInteraction,
  isSpecialApp,
} from '../../../utilities/formats'
import AnimatedDots from '../../AnimatedDots'
import Button from '../../Button'
import Counter from '../../Counter'
import CounterUsdPrice from '../../CounterUsdPrice'
import {
  Div,
  SelectedVault,
  SelectedVaultContainer,
  Monospace,
  BottomPart,
  SelectedVaultLabel,
} from './style'

const { tokens } = require('../../../data')

const VaultFooterActions = ({
  fAssetPool,
  totalTokensEarned,
  token,
  rewardTokenSymbols,
  rewardTokenPrices,
  isLoadingData,
  rewardsEarned,
  ratesPerDay,
  tokenSymbol,
  loadingBalances,
  setLoadingDots,
  setPendingAction,
  pendingAction,
  loaded,
  poolRewardSymbol,
}) => {
  const { fetchUserPoolStats, userStats } = usePools()
  const { account, getWalletBalances, connected, chainId } = useWallet()
  const { vaultsData } = useVaults()
  const { handleClaim } = useActions()
  const { borderColor, fontColor, fontColor2, fontColor5 } = useThemeContext()

  const [
    {
      connectedChain, // the current chain the user's wallet is connected to
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()

  const tokenChain = token.chain || token.data.chain
  const curChain = isSpecialApp
    ? chainId
    : connectedChain
    ? parseInt(connectedChain.id, 16).toString()
    : ''

  return (
    <SelectedVaultContainer
      maxWidth="100%"
      margin="0px"
      padding="0px"
      borderWidth="0px"
      borderColor={borderColor}
    >
      {rewardTokenSymbols &&
        rewardTokenSymbols.map((symbol, symbolIdx) => {
          return (
            <SelectedVault key={`${symbol}-rewards-earned`}>
              <Div fontColor2={fontColor2}>
                <img
                  src={`/icons/${
                    symbol.toLowerCase() === 'mifarm' ? 'ifarm' : symbol.toLowerCase()
                  }.svg`}
                  alt=""
                />
                {symbol.toLowerCase() === 'mifarm' ? 'iFARM' : symbol}
              </Div>
              <Monospace fontColor5={fontColor5}>
                {!connected ? (
                  '0.00'
                ) : !isLoadingData && get(userStats, `[${get(fAssetPool, 'id')}].rewardsEarned`) ? (
                  <>
                    <Counter
                      pool={fAssetPool}
                      totalTokensEarned={
                        rewardTokenSymbols.length > 1
                          ? fromWei(
                              get(rewardsEarned, symbol, 0),
                              get(tokens[symbol], 'decimals', 18),
                              get(tokens[symbol], 'decimals', 18),
                            )
                          : totalTokensEarned
                      }
                      totalStaked={get(userStats, `[${fAssetPool.id}]['totalStaked']`, 0)}
                      ratePerDay={get(ratesPerDay, symbolIdx, ratesPerDay[0])}
                      rewardPerToken={get(
                        fAssetPool,
                        `rewardPerToken[${symbolIdx}]`,
                        fAssetPool.rewardPerToken[0],
                      )}
                      rewardTokenAddress={get(
                        fAssetPool,
                        `rewardTokens[${symbolIdx}]`,
                        fAssetPool.rewardTokens[0],
                      )}
                    />
                    <CounterUsdPrice
                      pool={fAssetPool}
                      totalTokensEarned={
                        rewardTokenSymbols.length > 1
                          ? fromWei(
                              get(rewardsEarned, symbol, 0),
                              get(tokens[symbol], 'decimals', 18),
                              get(tokens[symbol], 'decimals', 18),
                            )
                          : totalTokensEarned
                      }
                      totalStaked={get(userStats, `[${fAssetPool.id}]['totalStaked']`, 0)}
                      ratePerDay={get(ratesPerDay, symbolIdx, ratesPerDay[0])}
                      rewardPerToken={get(
                        fAssetPool,
                        `rewardPerToken[${symbolIdx}]`,
                        fAssetPool.rewardPerToken[0],
                      )}
                      rewardTokenAddress={get(
                        fAssetPool,
                        `rewardTokens[${symbolIdx}]`,
                        fAssetPool.rewardTokens[0],
                      )}
                      rewardTokenUsdPrice={rewardTokenPrices[symbolIdx]}
                    />
                  </>
                ) : userStats.length === 0 ? (
                  <AnimatedDots />
                ) : (
                  '0.00'
                )}
              </Monospace>
            </SelectedVault>
          )
        })}
      <ReactTooltip
        id={`claim-tooltip-${tokenSymbol}`}
        backgroundColor="black"
        borderColor="black"
        textColor="white"
        getContent={() =>
          token.hodlVaultId ? (
            <>
              <b>iFARM</b> and <b>fSUSHI</b> amount is claimed upon withdrawal only.
            </>
          ) : (
            <>
              Claims all non-compounded reward tokens.
              <br />
              All pending rewards are automatically claimed when withdrawing the full value of a
              position.
            </>
          )
        }
      />
      <BottomPart>
        <SelectedVaultLabel fontWeight="400" lineHeight="20px" color={fontColor}>
          Claim all rewards into your wallet.
        </SelectedVaultLabel>
        <Button
          color="advanced-reward"
          // width="100%"
          size="md"
          onClick={async () => {
            if (curChain !== tokenChain) {
              const chainHex = `0x${Number(tokenChain).toString(16)}`
              if (!isSpecialApp) await setChain({ chainId: chainHex })
            } else {
              handleClaim(account, fAssetPool, setPendingAction, async () => {
                await getWalletBalances([poolRewardSymbol])
                setLoadingDots(false, true)
                await fetchUserPoolStats([fAssetPool], account, userStats)
                setLoadingDots(false, false)
              })
            }
          }}
          disabled={
            !hasRequirementsForInteraction(loaded, pendingAction, vaultsData, loadingBalances) ||
            !hasAmountGreaterThanZero(totalTokensEarned)
          }
        >
          {pendingAction === ACTIONS.CLAIM ? 'Processing...' : 'Claim All'}
        </Button>
      </BottomPart>
    </SelectedVaultContainer>
  )
}

export default VaultFooterActions
