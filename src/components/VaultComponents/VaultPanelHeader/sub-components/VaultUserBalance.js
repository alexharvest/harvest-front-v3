import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { get } from 'lodash'
import {
  FARM_TOKEN_SYMBOL,
  IFARM_TOKEN_SYMBOL,
  // SPECIAL_VAULTS,
  MAX_DECIMALS,
} from '../../../../constants'
import { useVaults } from '../../../../providers/Vault'
import { fromWei } from '../../../../services/web3'
import { formatNumber, parseValue } from '../../../../utilities/formats'
import { getUserVaultBalance } from '../../../../utilities/parsers'
import AnimatedDots from '../../../AnimatedDots'
import { useWallet } from '../../../../providers/Wallet'
import { Monospace } from '../../../GlobalStyle'
import { usePools } from '../../../../providers/Pools'
import { useRate } from '../../../../providers/Rate'

const VaultUserBalance = ({
  token,
  tokenSymbol,
  multipleAssets,
  isSpecialVault,
  // loadingFarmingBalance,
  vaultPool,
  // loadedVault,
  useIFARM,
  fontColor1,
  allLoaded,
  setAllLoaded,
}) => {
  const { vaultsData, farmingBalances } = useVaults()
  const { connected, balances } = useWallet()
  const { userStats } = usePools()
  const [userVaultBalance, setUserVaultBalance] = useState(null)
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)
  const [allContentLoaded, setAllContentLoaded] = useState(false)
  let resultValue = 0

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  const tokenDecimals = useIFARM
    ? get(vaultsData, `${IFARM_TOKEN_SYMBOL}.decimals`, 0)
    : token.decimals
  const tempPricePerFullShare = useIFARM
    ? get(vaultsData, `${IFARM_TOKEN_SYMBOL}.pricePerFullShare`, 0)
    : get(token, `pricePerFullShare`, 0)
  const pricePerFullShare = fromWei(tempPricePerFullShare, tokenDecimals, tokenDecimals)

  useEffect(() => {
    let iFARMBalance
    if (tokenSymbol === FARM_TOKEN_SYMBOL) {
      iFARMBalance = get(balances, IFARM_TOKEN_SYMBOL, 0)
    }

    const totalStaked = get(userStats, `[${get(vaultPool, 'id')}]['totalStaked']`, 0)
    setUserVaultBalance(
      getUserVaultBalance(tokenSymbol, farmingBalances, totalStaked, iFARMBalance),
    )
  }, [vaultsData, tokenSymbol, vaultPool, userStats, farmingBalances, balances])

  // const isLoadingUserBalance =
  //   loadedVault === false ||
  //   loadingFarmingBalance ||
  //   (isSpecialVault
  //     ? connected &&
  //       (!token.data ||
  //         !get(userStats, `[${token.data.id}]['totalStaked']`) ||
  //         (token.data.id === SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID &&
  //           !balances[IFARM_TOKEN_SYMBOL]))
  //     : userVaultBalance === false)

  const balanceVaultLoaded = Number(userVaultBalance) !== 0 && userVaultBalance !== 'NaN'
  useEffect(() => {
    if (!connected) {
      setAllLoaded(false)
      setAllContentLoaded(false)
    } else if (balanceVaultLoaded) {
      setAllContentLoaded(true)
      setAllLoaded(true)
    }
  }, [balanceVaultLoaded, connected]) // eslint-disable-line react-hooks/exhaustive-deps

  if (allContentLoaded) {
    resultValue = multipleAssets
      ? Number(fromWei(parseValue(userVaultBalance), token.decimals, MAX_DECIMALS)) *
        (token.usdPrice || 1) *
        Number(currencyRate)
      : Number(
          fromWei(
            parseValue(userVaultBalance),
            isSpecialVault ? get(token, 'data.watchAsset.decimals', 18) : token.decimals,
            MAX_DECIMALS,
          ),
        ) *
          (tokenSymbol === FARM_TOKEN_SYMBOL
            ? token.data.lpTokenData.price * pricePerFullShare
            : token.usdPrice) || 1 * Number(currencyRate)
  }

  return (
    <Monospace
      // borderBottom={connected && !isLoadingUserBalance && multipleAssets && '1px dotted black'}
      fontWeight="500"
      className="farm-balance-span"
      fontColor1={fontColor1}
    >
      {!connected ? (
        ''
      ) : !allLoaded ? (
        <AnimatedDots />
      ) : allLoaded && Number(userVaultBalance) === 0 ? (
        `${currencySym}0.00`
      ) : (
        <>
          {resultValue < 0.01
            ? `<${currencySym}0.01`
            : multipleAssets
            ? `${currencySym}${formatNumber(
                new BigNumber(fromWei(parseValue(userVaultBalance), token.decimals, MAX_DECIMALS))
                  .multipliedBy(token.usdPrice || 1)
                  .multipliedBy(new BigNumber(currencyRate))
                  .toString(),
                2,
              )}`
            : `${currencySym}${formatNumber(
                new BigNumber(
                  fromWei(
                    parseValue(userVaultBalance),
                    isSpecialVault ? get(token, 'data.watchAsset.decimals', 18) : token.decimals,
                    MAX_DECIMALS,
                  ),
                )
                  .multipliedBy(
                    (tokenSymbol === FARM_TOKEN_SYMBOL
                      ? token.data.lpTokenData.price * pricePerFullShare
                      : token.usdPrice) || 1,
                  )
                  .multipliedBy(new BigNumber(currencyRate))
                  .toString(),
                2,
              )}`}
        </>
      )}
    </Monospace>
  )
}

export default VaultUserBalance
