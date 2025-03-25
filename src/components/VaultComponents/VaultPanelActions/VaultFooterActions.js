import { get } from 'lodash'
import React, { useMemo, useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSetChain } from '@web3-onboard/react'
import ReactTooltip from 'react-tooltip'
import Info from '../../../assets/images/logos/earn/info.svg'
import { ACTIONS, FARM_TOKEN_SYMBOL, IFARM_TOKEN_SYMBOL, SPECIAL_VAULTS } from '../../../constants'
import { useActions } from '../../../providers/Actions'
import { usePools } from '../../../providers/Pools'
import { useStats } from '../../../providers/Stats'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useVaults } from '../../../providers/Vault'
import { useWallet } from '../../../providers/Wallet'
import { useRate } from '../../../providers/Rate'
import { fromWei } from '../../../services/web3'
import {
  formatNumber,
  hasAmountGreaterThanZero,
  hasRequirementsForInteraction,
  isSpecialApp,
} from '../../../utilities/formats'
import AnimatedDots from '../../AnimatedDots'
import Button from '../../Button'
import Counter from '../../Counter'
import { Monospace } from '../../GlobalStyle'
import {
  Div,
  InfoIcon,
  SelectedVault,
  SelectedVaultContainer,
  SelectedVaultLabel,
  SelectedVaultNumber,
  USDValue,
} from './style'

const { tokens } = require('../../../data')

const VaultFooterActions = ({
  fAssetPool,
  totalTokensEarned,
  token,
  rewardTokenSymbols,
  isLoadingData,
  rewardsEarned,
  ratesPerDay,
  tokenSymbol,
  totalRewardsEarned,
  loadingBalances,
  setLoadingDots,
  setPendingAction,
  pendingAction,
  loaded,
  poolRewardSymbol,
}) => {
  const { fetchUserPoolStats, userStats, pools } = usePools()
  const { account, getWalletBalances, connected, chainId } = useWallet()
  const { vaultsData } = useVaults()
  const { profitShareAPY } = useStats()
  const { handleClaim } = useActions()
  const { fontColor, borderColor, filterColor } = useThemeContext()
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const farmProfitSharingPool = pools.find(
    pool => pool.id === SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID,
  )

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

  const poolVaults = useMemo(
    () => ({
      [FARM_TOKEN_SYMBOL]: {
        poolVault: true,
        profitShareAPY,
        data: farmProfitSharingPool,
        logoUrl: ['./icons/ifarm.svg'],
        rewardSymbol: FARM_TOKEN_SYMBOL,
        tokenNames: ['FARM'],
      },
    }),
    [farmProfitSharingPool, profitShareAPY],
  )
  const groupOfVaults = { ...vaultsData, ...poolVaults }

  return (
    <SelectedVaultContainer
      maxWidth="100%"
      margin="0px"
      padding="0px"
      borderWidth="0px"
      borderColor={borderColor}
    >
      <SelectedVault alignItems="center" justifyContent="start">
        <SelectedVaultLabel fontSize="16px" lineHeight="21px" fontColor={fontColor}>
          Rewards
          <InfoIcon
            className="info"
            width={isMobile ? 10 : 16}
            src={Info}
            alt=""
            data-tip
            data-for={`claim-tooltip-${tokenSymbol}`}
            filterColor={filterColor}
          />
        </SelectedVaultLabel>
      </SelectedVault>
      {rewardTokenSymbols &&
        rewardTokenSymbols.map((symbol, symbolIdx) => {
          const tokenName = symbol.toUpperCase()
          const curtoken = groupOfVaults[tokenName]
          let usdPrice = 1
          if (curtoken) {
            usdPrice =
              (tokenName === FARM_TOKEN_SYMBOL
                ? curtoken.data.lpTokenData && curtoken.data.lpTokenData.price
                : curtoken.usdPrice) || 1
          }
          return (
            <SelectedVault key={`${symbol}-rewards-earned`}>
              <SelectedVaultNumber display="flex">
                <img
                  src={`/icons/${
                    symbol.toLowerCase() === 'mifarm' ? 'ifarm' : symbol.toLowerCase()
                  }.svg`}
                  width={40}
                  height={40}
                  alt=""
                />
                <Div>
                  <Monospace>
                    {!connected ? (
                      formatNumber(0, 8)
                    ) : !isLoadingData &&
                      get(userStats, `[${get(fAssetPool, 'id')}].rewardsEarned`) ? (
                      <Counter
                        pool={fAssetPool}
                        totalTokensEarned={
                          rewardTokenSymbols.length > 1
                            ? fromWei(
                                get(rewardsEarned, symbol, 0),
                                get(tokens[symbol], 'decimals', 18),
                                4,
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
                      formatNumber(0, 8)
                    )}
                  </Monospace>
                  {usdPrice === 1 && tokenName !== IFARM_TOKEN_SYMBOL ? null : (
                    <USDValue>
                      <Monospace>
                        {currencySym}
                        {!connected ? (
                          formatNumber(0, 8)
                        ) : !isLoadingData &&
                          get(userStats, `[${get(fAssetPool, 'id')}].rewardsEarned`) ? (
                          <Counter
                            rate={currencyRate}
                            pool={fAssetPool}
                            totalTokensEarned={
                              (rewardTokenSymbols.length > 1
                                ? fromWei(
                                    get(rewardsEarned, symbol, 0),
                                    get(tokens[symbol], 'decimals', 18),
                                    4,
                                  )
                                : totalTokensEarned) * usdPrice
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
                          formatNumber(0, 8)
                        )}
                      </Monospace>
                    </USDValue>
                  )}
                </Div>
              </SelectedVaultNumber>
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
      <Button
        color="reward"
        width="100%"
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
          !hasAmountGreaterThanZero(totalRewardsEarned)
        }
      >
        {pendingAction === ACTIONS.CLAIM ? 'Processing...' : 'Claim All'}
      </Button>
    </SelectedVaultContainer>
  )
}

export default VaultFooterActions
