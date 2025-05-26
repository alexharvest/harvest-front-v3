import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BigNumber from 'bignumber.js'
import { get } from 'lodash'
import React, { useCallback } from 'react'
import ReactHtmlParser from 'react-html-parser'
import ReactTooltip from 'react-tooltip'
import {
  ACTIONS,
  DISABLED_DEPOSITS,
  FARM_TOKEN_SYMBOL,
  IFARM_DEPOSIT_TOOLTIP,
  IFARM_TOKEN_SYMBOL,
  IFARM_WITHDRAW_TOOLTIP,
} from '../../../constants'
import { useActions } from '../../../providers/Actions'
import { useContracts } from '../../../providers/Contracts'
import { usePools } from '../../../providers/Pools'
import { useVaults } from '../../../providers/Vault'
import { useWallet } from '../../../providers/Wallet'
import {
  hasAmountGreaterThanZero,
  hasAmountLessThanOrEqualTo,
  hasRequirementsForInteraction,
  hasValidAmountForWithdraw,
} from '../../../utilities/formats'
import Button from '../../Button'
import Checkbox from '../../Checkbox'
import { PrimaryActionsContainer } from './style'

const { tokens } = require('../../../data')

const PoolHeadActions = ({
  token,
  tokenSymbol,
  fAssetPool,
  lpTokenBalance,
  lpTokenApprovedBalance,
  totalStaked,
  amountsToExecuteInWei,
  withdrawMode,
  setAmountsToExecute,
  setLoadingDots,
  setPendingAction,
  setIFARM,
  pendingAction,
  useIFARM,
  loaded,
  loadingBalances,
}) => {
  const { contracts } = useContracts()
  const { fetchUserPoolStats, userStats } = usePools()
  const { account, getWalletBalances, balances } = useWallet()
  const { vaultsData } = useVaults()
  const { handleDeposit, handleStake, handleExit, handleWithdraw } = useActions()

  const shouldDoPartialUnstake = new BigNumber(amountsToExecuteInWei[0]).isLessThan(totalStaked)
  const isFARMVault = tokenSymbol === FARM_TOKEN_SYMBOL
  const iFARMBalance = get(balances, IFARM_TOKEN_SYMBOL, 0)

  const reloadStats = useCallback(
    async (depositedOrTaken, iFARM) => {
      setAmountsToExecute(['', ''])
      const tokensToReload = []

      setLoadingDots(iFARM, true)

      if (iFARM) {
        tokensToReload.push(FARM_TOKEN_SYMBOL, IFARM_TOKEN_SYMBOL)
      } else {
        tokensToReload.push(tokenSymbol)
      }

      if ((depositedOrTaken && iFARM) || !iFARM) {
        await fetchUserPoolStats([fAssetPool], account, userStats)
      }

      await getWalletBalances(tokensToReload, false, true)

      setLoadingDots(false, false)
      setIFARM(false)
    },
    [
      tokenSymbol,
      fAssetPool,
      setAmountsToExecute,
      setIFARM,
      setLoadingDots,
      fetchUserPoolStats,
      getWalletBalances,
      account,
      userStats,
    ],
  )

  return (
    <>
      <ReactTooltip
        id={`disabled-deposit-tooltip-${tokenSymbol}`}
        backgroundColor="white"
        borderColor="black"
        border
        textColor="black"
        disable={!token.disabledDepositTooltip || withdrawMode}
        getContent={() => <>{ReactHtmlParser(token.disabledDepositTooltip)}</>}
      />
      <PrimaryActionsContainer
        data-for={`disabled-deposit-tooltip-${tokenSymbol}`}
        data-tip=""
        gridItems="1"
        gridRowGap="8px"
        alignItems={!isFARMVault || withdrawMode ? 'end' : 'center'}
      >
        {isFARMVault && (
          <>
            <ReactTooltip
              id={IFARM_TOKEN_SYMBOL}
              backgroundColor="#fffce6"
              borderColor="black"
              border
              textColor="black"
            >
              {withdrawMode ? IFARM_WITHDRAW_TOOLTIP : IFARM_DEPOSIT_TOOLTIP}
            </ReactTooltip>
            <div data-tip="" data-for={IFARM_TOKEN_SYMBOL}>
              <Checkbox
                icon={<FontAwesomeIcon size="lg" icon={faCheck} />}
                name={IFARM_TOKEN_SYMBOL}
                checked={useIFARM}
                onChange={checked => setIFARM(checked)}
                label={`Use ${tokens[IFARM_TOKEN_SYMBOL].tokenNames.join(', ')}`}
                disabled={
                  !hasRequirementsForInteraction(
                    loaded,
                    pendingAction,
                    vaultsData,
                    loadingBalances,
                  ) || token.inactive
                }
              />
            </div>
          </>
        )}

        {!withdrawMode ? (
          <>
            <Button
              color="earn"
              size="md"
              width="100%"
              onClick={async () => {
                if (useIFARM && isFARMVault) {
                  await handleDeposit(
                    token,
                    account,
                    amountsToExecuteInWei,
                    vaultsData[IFARM_TOKEN_SYMBOL],
                    false,
                    false,
                    async () => {
                      await reloadStats(true, true)
                    },
                    async () => {
                      await reloadStats(false, true)
                    },
                  )
                } else {
                  await handleStake(
                    token,
                    account,
                    tokenSymbol,
                    amountsToExecuteInWei[0],
                    lpTokenApprovedBalance,
                    fAssetPool,
                    contracts,
                    setPendingAction,
                    false,
                    async () => {
                      await reloadStats()
                    },
                    async () => {
                      await reloadStats()
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
                token.inactive ||
                DISABLED_DEPOSITS.includes(tokenSymbol) ||
                !hasAmountGreaterThanZero(amountsToExecuteInWei[0]) ||
                !hasAmountLessThanOrEqualTo(amountsToExecuteInWei[0], lpTokenBalance)
              }
            >
              {pendingAction === ACTIONS.STAKE ||
              pendingAction === ACTIONS.DEPOSIT ||
              pendingAction === ACTIONS.APPROVE_DEPOSIT ||
              pendingAction === ACTIONS.APPROVE_STAKE
                ? 'PROCESSING...'
                : tokenSymbol !== FARM_TOKEN_SYMBOL
                ? 'STAKE'
                : 'DEPOSIT'}
            </Button>
          </>
        ) : (
          <Button
            color="earn"
            size="md"
            width="100%"
            onClick={async () => {
              if (useIFARM && isFARMVault) {
                await handleWithdraw(
                  account,
                  IFARM_TOKEN_SYMBOL,
                  amountsToExecuteInWei[0],
                  vaultsData,
                  setPendingAction,
                  false,
                  null,
                  async () => {
                    await reloadStats(true, true)
                  },
                )
              } else {
                await handleExit(
                  account,
                  fAssetPool,
                  shouldDoPartialUnstake,
                  amountsToExecuteInWei[0],
                  setPendingAction,
                  async () => {
                    await reloadStats()
                  },
                )
              }
            }}
            disabled={
              !hasRequirementsForInteraction(loaded, pendingAction, vaultsData, loadingBalances) ||
              !hasValidAmountForWithdraw(
                amountsToExecuteInWei[0],
                useIFARM && isFARMVault ? iFARMBalance : totalStaked,
              )
            }
          >
            {pendingAction === ACTIONS.EXIT || pendingAction === ACTIONS.WITHDRAW
              ? 'PROCESSING...'
              : tokenSymbol !== FARM_TOKEN_SYMBOL
              ? 'UNSTAKE'
              : 'WITHDRAW'}
          </Button>
        )}
      </PrimaryActionsContainer>
    </>
  )
}

export default PoolHeadActions
