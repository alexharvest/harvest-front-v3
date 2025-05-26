import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip'
import { ACTIONS, DISABLED_DEPOSITS } from '../../../constants'
import { useActions } from '../../../providers/Actions'
import { usePools } from '../../../providers/Pools'
import { useVaults } from '../../../providers/Vault'
import { useWallet } from '../../../providers/Wallet'
import Button from '../../Button'
import { MigrateOptionsContainer, PrimaryActionsContainer } from './style'
import Checkbox from '../../Checkbox'
import {
  hasAmountGreaterThanZero,
  hasAmountLessThanOrEqualTo,
  hasRequirementsForInteraction,
} from '../../../utilities/formats'

const VaultHeadActionsMigrate = ({
  token,
  tokenSymbol,
  fAssetPool,
  fAssetSymbol,
  pendingAction,
  setPendingAction,
  loaded,
  amountsToExecuteInWei,
  autoStake,
  loadingBalances,
  setAutoStake,
  migrationInfo,
  lpAmount,
  zap,
  selectZapMode,
  multipleAssets,
  totalAmountToExecute,
}) => {
  const { fetchUserPoolStats, userStats } = usePools()
  const { account, getWalletBalances, balances } = useWallet()
  const { vaultsData, getFarmingBalances, farmingBalances } = useVaults()
  const { handleMigrate } = useActions()
  const userBalance = balances[tokenSymbol]

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

  const getMigrateButtonText = action => {
    switch (action) {
      case ACTIONS.MIGRATE:
        return 'Migrating...'
      case ACTIONS.APPROVE_MIGRATE:
        return 'Approving...'
      case ACTIONS.STAKE_MIGRATE:
        return 'Staking...'
      default:
        return 'Migrate'
    }
  }

  return (
    <PrimaryActionsContainer gridItems="1" gridRowGap="53px" gridColGap="0px">
      <Checkbox
        icon={<FontAwesomeIcon size="lg" icon={faCheck} />}
        name="stake"
        checked={autoStake}
        onChange={checked => setAutoStake(checked)}
        label="Stake for rewards"
        disabled={
          !hasRequirementsForInteraction(loaded, pendingAction, vaultsData, loadingBalances) ||
          token.inactive ||
          DISABLED_DEPOSITS.includes(tokenSymbol)
        }
      />
      {!token.disableAutoSwap ? (
        <MigrateOptionsContainer>
          <Tooltip
            id="zap-tooltip"
            backgroundColor="#fffce6"
            borderColor="black"
            border
            textColor="black"
            getContent={() => (
              <>
                The deposit will make best effort to swap tokens to the correct ratio required by
                Uniswap v3 pool. <br /> Almost all tokens will be used for liquidity. The swap will
                incur <b>trading fees</b> and <b>slippage</b>.
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
        </MigrateOptionsContainer>
      ) : null}
      <Button
        $fontcolor="earn"
        $size="md"
        $width="100%"
        onClick={async () => {
          handleMigrate(
            setPendingAction,
            migrationInfo,
            lpAmount,
            vaultsData[tokenSymbol],
            fAssetSymbol,
            account,
            async () => {
              await getWalletBalances([tokenSymbol], false, true)
              const updatedStats = await fetchUserPoolStats([fAssetPool], account, userStats)
              await getFarmingBalances([tokenSymbol], farmingBalances, updatedStats)
            },
            autoStake,
            zap,
          )
        }}
        disabled={
          !hasRequirementsForInteraction(loaded, pendingAction, vaultsData, loadingBalances) ||
          DISABLED_DEPOSITS.includes(tokenSymbol) ||
          token.inactive
        }
      >
        {getMigrateButtonText(pendingAction)}
      </Button>
    </PrimaryActionsContainer>
  )
}

export default VaultHeadActionsMigrate
