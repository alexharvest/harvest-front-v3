import { get } from 'lodash'
import React from 'react'
import { useSetChain } from '@web3-onboard/react'
import { ACTIONS, SPECIAL_VAULTS } from '../../../constants'
import { useActions } from '../../../providers/Actions'
import { usePools } from '../../../providers/Pools'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useVaults } from '../../../providers/Vault'
import { useWallet } from '../../../providers/Wallet'
import {
  hasAmountGreaterThanZero,
  hasRequirementsForInteraction,
  isSpecialApp,
} from '../../../utilities/formats'
import Button from '../../Button'
import {
  SelectedVault,
  SelectedVaultContainer,
  Monospace,
  Div,
  SelectedVaultLabel,
  BottomPart,
} from './style'
import { fromWei } from '../../../services/web3'
import AnimatedDots from '../../AnimatedDots'
import Counter from '../../Counter'

const { tokens } = require('../../../data')

const PoolFooterActions = ({
  fAssetPool,
  token,
  totalTokensEarned,
  rewardTokenSymbols,
  isLoadingData,
  rewardsEarned,
  ratesPerDay,
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
  const { borderColor } = useThemeContext()

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
      {fAssetPool.id !== SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID &&
        rewardTokenSymbols.map((symbol, symbolIdx) => {
          return (
            <div key={symbolIdx}>
              <SelectedVault key={`${symbol}-rewards-earned`}>
                <Div>
                  <img src={`/icons/${symbol.toLowerCase()}.svg`} alt="" />
                  {symbol}
                </Div>
                <Monospace>
                  {!connected ? (
                    '0.00'
                  ) : !isLoadingData &&
                    get(userStats, `[${get(fAssetPool, 'id')}].rewardsEarned`) ? (
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
                  ) : userStats.length === 0 ? (
                    <AnimatedDots />
                  ) : (
                    '0.00'
                  )}
                </Monospace>
              </SelectedVault>
              <BottomPart>
                <SelectedVaultLabel fontWeight="400" lineHeight="20px" color="#475467">
                  Claim all rewards into your wallet.
                </SelectedVaultLabel>
                <Button
                  // width="100%"
                  size="md"
                  color="advanced-reward"
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
                    !hasRequirementsForInteraction(
                      loaded,
                      pendingAction,
                      vaultsData,
                      loadingBalances,
                    ) || !hasAmountGreaterThanZero(totalTokensEarned)
                  }
                >
                  {pendingAction === ACTIONS.CLAIM ? 'Processing...' : 'Claim All'}
                </Button>
              </BottomPart>
            </div>
          )
        })}
    </SelectedVaultContainer>
  )
}

export default PoolFooterActions
