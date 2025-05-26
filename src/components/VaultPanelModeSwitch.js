import { get } from 'lodash'
import React from 'react'
import { Tooltip } from 'react-tooltip'
import { DISABLED_WITHDRAWS, FARM_TOKEN_SYMBOL, IFARM_TOKEN_SYMBOL } from '../constants'
import { usePools } from '../providers/Pools'
import { useVaults } from '../providers/Vault'
import { useWallet } from '../providers/Wallet'
import { hasAmountGreaterThanZero, hasRequirementsForInteraction } from '../utilities/formats'
import ButtonSwitch from './ButtonSwitch'

const VaultPanelModeSwitch = ({
  token,
  tokenSymbol,
  fAssetPool,
  withdrawMode,
  loaded,
  pendingAction,
  loadingBalances,
  setWithdrawMode,
}) => {
  const { balances } = useWallet()
  const { userStats } = usePools()
  const { vaultsData } = useVaults()
  const iFARMBalance = get(balances, IFARM_TOKEN_SYMBOL, 0)
  const lpTokenBalance = get(userStats, `[${fAssetPool.id}]['lpTokenBalance']`, 0)
  const totalStaked = get(userStats, `[${fAssetPool.id}]['totalStaked']`, 0)

  const isSpecialVault = token.liquidityPoolVault || token.poolVault

  let withdrawalTimestamp = 0,
    timeLimited = false

  if (token.uniswapV3ManagedData?.capToken) {
    withdrawalTimestamp = token.uniswapV3ManagedData.withdrawalTimestamp
      ? parseInt(token.uniswapV3ManagedData.withdrawalTimestamp, 10)
      : 0
    timeLimited = !(Date.now() >= withdrawalTimestamp)
  }

  return (
    <>
      <Tooltip
        id={`${tokenSymbol}-withdraw-button`}
        backgroundColor="#fffce6"
        borderColor="black"
        border
        textColor="black"
        disable={!token.disabledWithdrawTooltip}
        effect="solid"
        delayHide={50}
        clickable
      >
        {token.disabledWithdrawTooltip}
      </Tooltip>
      <div style={{ display: 'flex' }} data-tip data-for={`${tokenSymbol}-withdraw-button`}>
        <ButtonSwitch
          checked={withdrawMode}
          options={{
            checked: {
              label: 'Deposit',
              disabled: !hasRequirementsForInteraction(
                loaded,
                pendingAction,
                vaultsData,
                loadingBalances,
              ),
            },
            unchecked: {
              label: 'Withdraw',
              disabled:
                !!token.disabledWithdrawTooltip ||
                timeLimited ||
                !hasRequirementsForInteraction(
                  loaded,
                  pendingAction,
                  vaultsData,
                  loadingBalances,
                ) ||
                DISABLED_WITHDRAWS.indexOf(tokenSymbol) !== -1 ||
                (isSpecialVault
                  ? tokenSymbol === FARM_TOKEN_SYMBOL
                    ? !hasAmountGreaterThanZero(totalStaked) &&
                      !hasAmountGreaterThanZero(iFARMBalance)
                    : !hasAmountGreaterThanZero(totalStaked)
                  : !hasAmountGreaterThanZero(totalStaked) &&
                    !hasAmountGreaterThanZero(lpTokenBalance)),
            },
          }}
          setChecked={checked => {
            setWithdrawMode(checked)
          }}
        />
      </div>
    </>
  )
}

export default VaultPanelModeSwitch
