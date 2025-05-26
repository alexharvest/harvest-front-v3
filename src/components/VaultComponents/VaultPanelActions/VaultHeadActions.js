import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import BigNumber from 'bignumber.js'
import ReactTooltip from 'react-tooltip'
import { ACTIONS, DISABLED_DEPOSITS } from '../../../constants'
import { useActions } from '../../../providers/Actions'
import { useContracts } from '../../../providers/Contracts'
import { usePools } from '../../../providers/Pools'
import { useVaults } from '../../../providers/Vault'
import { useWallet } from '../../../providers/Wallet'
import Button from '../../Button'
import { PrimaryActionsContainer, DepositOptionsContainer } from './style'
import {
  hasAmountGreaterThanZero,
  hasAmountLessThanOrEqualTo,
  hasRequirementsForInteraction,
  hasValidAmountForWithdraw,
} from '../../../utilities/formats'
import Checkbox from '../../Checkbox'
import RadioInput from '../../RadioInput'
import { Divider } from '../../GlobalStyle'

const VaultHeadActions = ({
  token,
  tokenSymbol,
  fAssetPool,
  amountsToExecuteInWei,
  withdrawMode,
  pendingAction,
  autoStake,
  autoUnStake,
  setAmountsToExecute,
  setLoadingDots,
  setPendingAction,
  setAutoStake,
  setUnAutoStake,
  loaded,
  loadingBalances,
  multipleAssets,
  totalAmountToExecute,
  zap,
  selectZapMode,
}) => {
  const { contracts } = useContracts()
  const { fetchUserPoolStats, userStats } = usePools()
  const { account, getWalletBalances, balances } = useWallet()
  const { vaultsData, farmingBalances, getFarmingBalances } = useVaults()
  const { handleDeposit, handleStake, handleWithdraw, handleExit } = useActions()

  const [selectedAsset, selectAsset] = useState(!token.isSingleAssetWithdrawalAllowed ? -1 : 0)

  const userBalance = balances[tokenSymbol]
  const lpTokenBalance = get(userStats, `[${fAssetPool.id}]['lpTokenBalance']`, 0)
  const totalStaked = get(userStats, `[${fAssetPool.id}]['totalStaked']`, 0)

  let capDisabled = false

  if (token.uniswapV3ManagedData?.capToken) {
    capDisabled = !(token.uniswapV3ManagedData.maxToDeposit > 0)
  }

  const getDepositButtonText = action => {
    switch (action) {
      case ACTIONS.DEPOSIT:
        return 'Depositing...'
      case ACTIONS.APPROVE_DEPOSIT:
        return 'Approving...'
      default:
        return 'Deposit'
    }
  }

  const walletBalancesToCheck = multipleAssets || [tokenSymbol]

  const hasDepositRequirements = amountsToExecuteInWei.map((amount, amountIdx) => {
    if (amount === null) {
      return null
    }

    return (
      hasAmountGreaterThanZero(totalAmountToExecute) &&
      hasAmountLessThanOrEqualTo(
        amount,
        multipleAssets ? balances[multipleAssets[amountIdx]] : userBalance,
      )
    )
  })

  const hasEnoughAmountToDeposit =
    !hasDepositRequirements.includes(false) && hasDepositRequirements.includes(true)

  const hasNullAmountsToExecute =
    multipleAssets && (amountsToExecuteInWei.includes(null) || amountsToExecuteInWei.includes('0'))

  useEffect(() => {
    if (hasNullAmountsToExecute && !zap && !token.disableAutoSwap) {
      selectZapMode(true)
    }
  }, [hasNullAmountsToExecute, zap, selectZapMode, token.disableAutoSwap])

  return (
    <>
      <ReactTooltip
        id={`disabled-deposit-tooltip-${tokenSymbol}`}
        backgroundColor="white"
        borderColor="black"
        border
        textColor="black"
        disable={!token.disabledDepositTooltip}
        getContent={() => <>{token.disabledDepositTooltip}</>}
      />
      <PrimaryActionsContainer
        gridItems="1"
        gridRowGap={multipleAssets && !withdrawMode ? '37px' : '8px'}
        gridColGap="0px"
        data-for={`disabled-deposit-tooltip-${tokenSymbol}`}
        data-tip=""
      >
        {!withdrawMode ? (
          <>
            <Checkbox
              icon={<FontAwesomeIcon size="lg" icon={faCheck} />}
              name="stake"
              checked={autoStake}
              onChange={checked => setAutoStake(checked)}
              label="Stake for rewards"
              disabled={
                !hasRequirementsForInteraction(
                  loaded,
                  pendingAction,
                  vaultsData,
                  loadingBalances,
                ) ||
                token.inactive ||
                DISABLED_DEPOSITS.includes(tokenSymbol) ||
                !hasEnoughAmountToDeposit
              }
            />
            {multipleAssets ? (
              <DepositOptionsContainer>
                <ReactTooltip
                  id="zap-tooltip"
                  backgroundColor="#fffce6"
                  borderColor="black"
                  border
                  textColor="black"
                  getContent={() => (
                    <>
                      The deposit will make best effort to swap tokens to the correct ratio required
                      by Uniswap v3 pool. <br /> Almost all tokens will be used for liquidity. The
                      swap will incur <b>trading fees</b> and <b>slippage</b>.
                    </>
                  )}
                />
                <div data-tip="" data-for="zap-tooltip">
                  <Checkbox
                    icon={<FontAwesomeIcon size="lg" icon={faCheck} />}
                    name="zap"
                    checked={zap}
                    onChange={checked => selectZapMode(checked)}
                    label="Auto-swap to correct ratio"
                    disabled={
                      token.disableAutoSwap ||
                      !hasRequirementsForInteraction(
                        loaded,
                        pendingAction,
                        vaultsData,
                        loadingBalances,
                      ) ||
                      token.inactive ||
                      DISABLED_DEPOSITS.includes(tokenSymbol) ||
                      !hasEnoughAmountToDeposit ||
                      hasNullAmountsToExecute
                    }
                  />
                </div>
              </DepositOptionsContainer>
            ) : null}
            <Button
              color="earn"
              size="md"
              width="100%"
              maxHeight="34px"
              onClick={async () => {
                await handleDeposit(
                  token,
                  account,
                  amountsToExecuteInWei,
                  vaultsData[tokenSymbol],
                  multipleAssets,
                  zap,
                  async (updatedLpTokenBalance, updatedLpTokenApprovedBalance) => {
                    setLoadingDots(true, true)

                    await getWalletBalances(walletBalancesToCheck)
                    const updatedStats = await fetchUserPoolStats([fAssetPool], account, userStats)
                    await getFarmingBalances([tokenSymbol], farmingBalances, updatedStats)
                    setLoadingDots(false, false)

                    if (autoStake) {
                      await handleStake(
                        token,
                        account,
                        tokenSymbol,
                        updatedLpTokenBalance,
                        updatedLpTokenApprovedBalance,
                        fAssetPool,
                        contracts,
                        setPendingAction,
                        multipleAssets,
                        async () => {
                          await getWalletBalances(walletBalancesToCheck, false, true)
                        },
                        async () => {
                          await fetchUserPoolStats([fAssetPool], account, userStats)
                        },
                      )
                    }

                    setAmountsToExecute(['', ''])
                    setLoadingDots(true, true)
                    await fetchUserPoolStats([fAssetPool], account, userStats)
                    setLoadingDots(false, false)
                  },
                  async () => {
                    await getWalletBalances(walletBalancesToCheck, false, true)
                  },
                )
              }}
              disabled={
                !hasRequirementsForInteraction(
                  loaded,
                  pendingAction,
                  vaultsData,
                  loadingBalances,
                ) ||
                token.inactive ||
                DISABLED_DEPOSITS.includes(tokenSymbol) ||
                !hasEnoughAmountToDeposit ||
                capDisabled
              }
            >
              {getDepositButtonText(pendingAction)}
            </Button>
          </>
        ) : (
          <>
            <div>
              <Checkbox
                icon={<FontAwesomeIcon size="lg" icon={faCheck} />}
                name="unstake"
                checked={hasAmountGreaterThanZero(totalStaked) && autoUnStake}
                onChange={checked => setUnAutoStake(checked)}
                label="Unstake if needed"
                disabled={
                  !hasRequirementsForInteraction(
                    loaded,
                    pendingAction,
                    vaultsData,
                    loadingBalances,
                  ) ||
                  token.inactive ||
                  !hasAmountGreaterThanZero(totalStaked)
                }
              />
              <Divider height="10px" />
              <Button
                color="earn"
                size="md"
                width="100%"
                onClick={async () => {
                  let autoUnstakeCompleted = null
                  const shouldAutoUnStake = new BigNumber(amountsToExecuteInWei[0]).isGreaterThan(
                    lpTokenBalance,
                  )

                  if (autoUnStake && shouldAutoUnStake) {
                    const amountToUnstake = new BigNumber(amountsToExecuteInWei[0])
                      .minus(lpTokenBalance)
                      .toFixed()
                    const shouldDoPartialUnstake = new BigNumber(amountToUnstake).isLessThan(
                      totalStaked,
                    )

                    await handleExit(
                      account,
                      fAssetPool,
                      shouldDoPartialUnstake,
                      amountToUnstake,
                      setPendingAction,
                      async () => {
                        autoUnstakeCompleted = true
                        await fetchUserPoolStats([fAssetPool], account, userStats)
                        await getWalletBalances(walletBalancesToCheck, false, true)
                      },
                    )
                  } else {
                    autoUnstakeCompleted = true
                  }

                  if (autoUnstakeCompleted) {
                    await handleWithdraw(
                      account,
                      tokenSymbol,
                      amountsToExecuteInWei[0],
                      vaultsData,
                      setPendingAction,
                      multipleAssets,
                      selectedAsset,
                      async () => {
                        setAmountsToExecute(['', ''])
                        setLoadingDots(true, true)
                        const updatedStats = await fetchUserPoolStats(
                          [fAssetPool],
                          account,
                          userStats,
                        )
                        await getWalletBalances(walletBalancesToCheck)
                        await getFarmingBalances([tokenSymbol], farmingBalances, updatedStats)
                        setLoadingDots(false, false)
                      },
                    )
                  }
                }}
                disabled={
                  !hasRequirementsForInteraction(
                    loaded,
                    pendingAction,
                    vaultsData,
                    loadingBalances,
                  ) ||
                  !hasValidAmountForWithdraw(
                    amountsToExecuteInWei[0],
                    lpTokenBalance,
                    totalStaked,
                    autoUnStake,
                  )
                }
              >
                {pendingAction === ACTIONS.EXIT || pendingAction === ACTIONS.WITHDRAW
                  ? 'Processing...'
                  : 'Withdraw'}
              </Button>
            </div>
            {multipleAssets ? (
              <>
                <Divider height="15px" />
                <RadioInput
                  options={[
                    ...multipleAssets.map((symbol, symbolIdx) => ({
                      value: symbolIdx,
                      label: symbol,
                      tooltip: `Convert everything into ${symbol} and withdraw as ${symbol}`,
                      disabled: !token.isSingleAssetWithdrawalAllowed,
                    })),
                    {
                      value: -1,
                      label: 'Combination',
                      tooltip: `Keep the same ratio as in the position, and withdraw as combination of ${multipleAssets.join(
                        ' and ',
                      )}`,
                    },
                  ]}
                  selectedOption={selectedAsset}
                  onChange={selectAsset}
                  gridCol="1/3"
                  disabled={
                    !hasRequirementsForInteraction(
                      loaded,
                      pendingAction,
                      vaultsData,
                      loadingBalances,
                    )
                  }
                />
              </>
            ) : null}
          </>
        )}
      </PrimaryActionsContainer>
    </>
  )
}

export default VaultHeadActions
