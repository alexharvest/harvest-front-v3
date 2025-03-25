import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { get } from 'lodash'
import { SPECIAL_VAULTS } from '../../../../constants'
import { formatNumber } from '../../../../utilities/formats'
import AnimatedDots from '../../../AnimatedDots'
import { useRate } from '../../../../providers/Rate'
import { Value } from '../style'

const getVaultValue = (token, rate) => {
  const poolId = get(token, 'data.id')

  if (token.isIPORVault) {
    if (token.totalValueLocked) {
      return new BigNumber(get(token, 'totalValueLocked', 0)) * Number(rate)
    }
    return new BigNumber(0)
  }

  switch (poolId) {
    case SPECIAL_VAULTS.FARM_WETH_POOL_ID:
      return Number(get(token, 'data.lpTokenData.liquidity')) * Number(rate)
    case SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID: {
      if (!get(token, 'data.lpTokenData.price')) {
        return null
      }

      return new BigNumber(get(token, 'data.totalValueLocked', 0)).times(rate)
    }
    case SPECIAL_VAULTS.FARM_GRAIN_POOL_ID:
    case SPECIAL_VAULTS.FARM_USDC_POOL_ID:
      return Number(get(token, 'data.totalValueLocked')) * Number(rate)
    default:
      return token.usdPrice
        ? new BigNumber(token.underlyingBalanceWithInvestment)
            .times(token.usdPrice)
            .times(rate)
            .dividedBy(new BigNumber(10).pow(token.decimals))
        : null
  }
}

const VaultValue = ({ token, fontColor1 }) => {
  const [vaultValue, setVaultValue] = useState(null)
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  useEffect(() => {
    setVaultValue(getVaultValue(token, currencyRate))
  }, [token, currencyRate])

  return (
    <Value fontColor1={fontColor1}>
      {token.excludeVaultStats ? (
        'N/A'
      ) : vaultValue ? (
        <>
          {`${currencySym}`}
          {formatNumber(vaultValue, 2)}
        </>
      ) : (
        <AnimatedDots />
      )}
    </Value>
  )
}

export default VaultValue
