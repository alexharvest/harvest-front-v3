import axios from 'axios'
import axiosRetry from 'axios-retry'
import BigNumber from 'bignumber.js'
import { get, isArray, isNaN, isEmpty } from 'lodash'
import {
  DECIMAL_PRECISION,
  DISABLED_DEPOSITS,
  DISABLED_WITHDRAWS,
  FARM_TOKEN_SYMBOL,
  KEY_CODES,
  MAX_APY_DISPLAY,
} from '../constants'

axiosRetry(axios, {
  retries: 1,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    error.code !== 'ECONNABORTED' && (!error.response || error.response.status >= 303),
})

export const preventNonNumericInput = e =>
  (e.keyCode === KEY_CODES.MINUS || e.keyCode === KEY_CODES.E) && e.preventDefault()

export const preventNonNumericPaste = e => {
  const pastedData = e.clipboardData.getData('Text')
  if (!/^\d*\.?\d+$/.test(pastedData)) {
    e.preventDefault()
  }
}

export const toAPYPercentage = number => {
  let percentage = '0'

  if (number) {
    percentage = new BigNumber(number).toFixed(2, 1)
  }

  return `${percentage}%`
}

export const abbreaviteNumber = (number, decPlaces) => {
  const signs = ['K', 'M', 'B', 'T']
  const sl = signs.length
  const adjDecPlaces = 10 ** decPlaces

  if (number < 1 / adjDecPlaces) {
    return number.toFixed(decPlaces)
  }

  for (let i = sl - 1; i >= 0; i -= 1) {
    const size = 10 ** ((i + 1) * 3)
    if (size <= number) {
      number = (Math.floor((number * adjDecPlaces) / size) / adjDecPlaces).toFixed(decPlaces)
      number += signs[i]
      break
    }
  }

  if (typeof number === 'number' && number < 1000) {
    return number.toFixed(decPlaces)
  }

  return number
}

export const showNumber = (number, decPlaces) => {
  const adjDecPlaces = 10 ** decPlaces

  if (number < 1 / adjDecPlaces) {
    return number.toFixed(decPlaces)
  }

  if (typeof number === 'number' && number < 1000) {
    return number.toFixed(decPlaces)
  }

  return number
}

export const countDecimals = value => {
  if (typeof value === 'string' && value.split('.').length > 1) {
    return value.split('.')[1].length
  }
  return 0
}

export const truncateNumberString = (
  numberString,
  decimals = DECIMAL_PRECISION,
  maxDigits = false,
) => {
  let truncatedNumberAsBN = new BigNumber(numberString)

  if (truncatedNumberAsBN.dp() > decimals) {
    truncatedNumberAsBN = truncatedNumberAsBN.dp(decimals)
  }

  const truncatedNumberAsString = truncatedNumberAsBN.toString(10)

  if (maxDigits && truncatedNumberAsString && truncatedNumberAsString.length > maxDigits) {
    return `${truncatedNumberAsString.substring(0, maxDigits)}...`
  }

  return truncatedNumberAsBN.isNaN() ? '0' : truncatedNumberAsBN.toFixed(2)
}

export const parseValue = value => {
  if (value === null || value === undefined) {
    return NaN
  }

  let newValue = value.toString().replace(/,/g, ''),
    multiplier = 1
  const suffix = newValue.slice(-1).toUpperCase()

  if (isNaN(newValue.slice(0, -1))) {
    return NaN
  }

  if (suffix === 'K') {
    multiplier = 1000
  } else if (suffix === 'M') {
    multiplier = 1000000
  } else if (suffix === 'B') {
    multiplier = 1000000000
  } else if (suffix === 'T') {
    multiplier = 1000000000000
  } else if (suffix === 'Q') {
    multiplier = 1000000000000000
  }

  newValue = parseFloat(newValue) * multiplier
  return newValue
}

export const formatNumber = (number, decimals = DECIMAL_PRECISION) => {
  let result = number

  if (countDecimals(result) > decimals) {
    result = result.substring(0, result.indexOf('.') + decimals + 1)
  }

  return abbreaviteNumber(Number(result), decimals)
}

export const formatNumberWido = (number, decimals = DECIMAL_PRECISION) => {
  let result = number.toString()
  if (countDecimals(result) > decimals) {
    result = result.substring(0, result.indexOf('.') + decimals + 1)
  }

  // return showNumber(Number(result), decimals)
  return result
}

export const showUsdValue = (value, currencySym) => {
  if (value === 0) {
    return `${currencySym}0`
  }
  if (value < 0.01) {
    return `<${currencySym}0.01`
  }
  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

  return `${currencySym}${formattedValue}`
}

export const showUsdValueCurrency = (value, currencySym, currencyRate) => {
  let numValue = Number(value)
  if (numValue === 0) {
    return `${currencySym}0`
  }
  numValue *= currencyRate
  if (numValue > 0 && numValue < 0.01) {
    return `<${currencySym}0.01`
  }
  if (numValue < 0 && numValue > -0.01) {
    return `-<${currencySym}0.01`
  }
  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currencySym === '¥' ? 0 : 2,
    maximumFractionDigits: currencySym === '¥' ? 0 : 2,
  }).format(Math.abs(numValue))

  return `${numValue < 0 ? '-' : ''}${currencySym}${formattedValue}`
}

export const formatFrequency = value => {
  if (value === '-') {
    return '-'
  }

  if (value === '') {
    return ''
  }

  const totalHours = 24 / value

  const days = Math.floor(totalHours / 24)
  const hours = Math.floor(totalHours % 24)
  const minutes = Math.floor((totalHours % 1) * 60)

  const daysText = days > 0 ? `${days}d` : ''
  const hoursText = hours > 0 ? `${hours}h` : ''
  const minutesText = minutes > 0 ? `${minutes}m` : '0m'

  return [daysText, hoursText, minutesText].filter(Boolean).join(' ')
}

export const showTokenBalance = (balance, decimals = 6) => {
  let value = parseFloat(balance.toString().replace(/,/g, ''))
  if (isNaN(value)) {
    return '0'
  }
  if (value === 0) {
    return '0'
  }
  if (value > 0 && value < 0.000001) {
    return '<0.000001'
  }
  value = value.toFixed(decimals).replace(/\.?0+$/, '')
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value)
}

export const getCurrencyRate = (sym, item, rateData) => {
  const date = new Date(Number(item.timestamp ?? 0))

  date.setUTCHours(0, 0, 0, 0) // Set hours, minutes, seconds, and milliseconds to 0
  const curTimeStamp = date.getTime() * 1000
  if (sym === '£') {
    const result = rateData.GBP.filter(
      dataItem => dataItem.timestamp.toString() === curTimeStamp.toString(),
    )
    return result[0]?.price ?? 1
  }
  if (sym === '€') {
    const result = rateData.EUR.filter(
      dataItem => dataItem.timestamp.toString() === curTimeStamp.toString(),
    )
    return result[0]?.price ?? 1
  }
  return 1
}

export const formatAddress = address => {
  if (address) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`
  }
  return '0x...0'
}

export const stringToArray = value => (isArray(value) ? value : [value])

export const displayAPY = (apy, ...args) =>
  new BigNumber(apy).isGreaterThan(MAX_APY_DISPLAY)
    ? `${MAX_APY_DISPLAY}%+`
    : `${truncateNumberString(apy, ...args)}%`

export const displayApyRefusingNegative = (apy, ...args) =>
  new BigNumber(apy).isGreaterThan(MAX_APY_DISPLAY)
    ? `${MAX_APY_DISPLAY}%+`
    : new BigNumber(apy).isLessThanOrEqualTo(0)
    ? '0.00%'
    : `${truncateNumberString(apy, ...args)}%`

export const hasValidAmountForInputAndMaxButton = (
  userBalance,
  lpTokenBalance,
  totalStaked,
  tokenSymbol,
  withdrawMode,
  isSpecialVault,
  iFARMBalance,
  useIFARM,
) => {
  if (tokenSymbol === FARM_TOKEN_SYMBOL && withdrawMode && !useIFARM) {
    return false
  }

  if (!withdrawMode) {
    return (
      new BigNumber(isSpecialVault ? lpTokenBalance : userBalance).isGreaterThan(0) &&
      DISABLED_DEPOSITS.indexOf(tokenSymbol) === -1
    )
  }

  if (isSpecialVault) {
    return (
      new BigNumber(useIFARM ? iFARMBalance : totalStaked).isGreaterThan(0) &&
      DISABLED_WITHDRAWS.indexOf(tokenSymbol) === -1
    )
  }
  return (
    new BigNumber(totalStaked).plus(lpTokenBalance).isGreaterThan(0) &&
    DISABLED_WITHDRAWS.indexOf(tokenSymbol) === -1
  )
}

export const hasValidAmountForWithdraw = (
  amountToExecute,
  unstakedBalance,
  totalStaked,
  autoUnStake,
) => {
  const amountToExecuteInBN = new BigNumber(amountToExecute)
  const unstakedBalanceInBN = new BigNumber(unstakedBalance)
  const totalBalanceInBN = new BigNumber(unstakedBalance).plus(totalStaked)

  if (amountToExecuteInBN.isGreaterThan(0)) {
    if (autoUnStake && amountToExecuteInBN.isGreaterThan(unstakedBalanceInBN)) {
      const amountToUnStake = amountToExecuteInBN.minus(unstakedBalanceInBN)
      return (
        totalBalanceInBN.isGreaterThanOrEqualTo(amountToExecuteInBN) &&
        amountToUnStake.isLessThanOrEqualTo(totalStaked)
      )
    }
    return unstakedBalanceInBN.isGreaterThanOrEqualTo(amountToExecute)
  }
  return false
}

export const hasAmountLessThanOrEqualTo = (primaryAmount, secondaryAmount) =>
  new BigNumber(secondaryAmount).isGreaterThanOrEqualTo(primaryAmount)

export const hasAmountGreaterThanZero = amount => new BigNumber(amount).isGreaterThan(0)

export const hasRequirementsForInteraction = (loaded, pendingAction, vaultsData, loadingBalances) =>
  loaded === true && pendingAction === null && !isEmpty(vaultsData) && !loadingBalances

export const convertAmountToFARM = (token, balance, decimals, vaultsData) => {
  const pricePerFullShare = get(vaultsData, `[${token}].pricePerFullShare`, 0)

  return new BigNumber(balance)
    .times(pricePerFullShare)
    .dividedBy(new BigNumber(10).exponentiatedBy(decimals))
    .toString()
}

export function CustomException(message, code) {
  this.message = message
  this.code = code
}

function decimalAdjust(type, value, exp) {
  type = String(type)
  if (!['round', 'floor', 'ceil'].includes(type)) {
    throw new TypeError(
      "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'.",
    )
  }
  exp = Number(exp)
  value = Number(value)
  if (exp % 1 !== 0 || Number.isNaN(value)) {
    return NaN
  }
  if (exp === 0) {
    return Math[type](value)
  }
  const [magnitude, exponent = 0] = value.toString().split('e')
  const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`)
  // Shift back
  const [newMagnitude, newExponent = 0] = adjustedValue.toString().split('e')
  return Number(`${newMagnitude}e${+newExponent + exp}`)
}

// Decimal round
export const round10 = (value, exp) => decimalAdjust('round', value, exp)
// Decimal floor
export const floor10 = (value, exp) => decimalAdjust('floor', value, exp)
// Decimal ceil
export const ceil10 = (value, exp) => decimalAdjust('ceil', value, exp)

export const isInIframe = () => {
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}

export const isLoadedInOtherDomain = domain => {
  return (
    isInIframe() &&
    (window?.location?.ancestorOrigins?.[0]?.includes(domain) ||
      document?.referrer?.includes(domain))
  )
}

export const isLedgerLive = () => {
  return isLoadedInOtherDomain('ledger')
}

export const isSafeApp = () => {
  return isLoadedInOtherDomain('app.safe.global')
}

export const isSpecialApp = isLedgerLive() || isSafeApp()

export const numberWithCommas = x => {
  const parts = x.toString().split('.')
  let integerPart = parts[0]
  const decimalPart = parts.length > 1 ? `.${parts[1]}` : ''
  if (parseInt(integerPart, 10) < 1000) return x
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return integerPart + decimalPart
}

export const formatDate = value => {
  const date = new Date(value)
  const year = date.getFullYear()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const monthNum = date.getMonth()
  const month = monthNames[monthNum]
  const day = date.getDate()

  return `${month} ${day} ${year}`
}

export const normalizeSliderValue = (value, min, max) => ((value - min) / (max - min)) * 100
export const denormalizeSliderValue = (value, min, max) =>
  ((value / 100) * (max - min) + min) / 1000

export const calculateMarks = (data, minTimestamp, maxTimestamp) => {
  const length = data.length
  if (length === 0) {
    return ''
  }

  const marks = {}
  data.forEach(item => {
    if (item.event !== 'Harvest') {
      const timestamp = parseFloat(item.timestamp) * 1000
      const position = formatNumber(normalizeSliderValue(timestamp, minTimestamp, maxTimestamp), 2)
      let dotColor = ''
      if (item.event === 'Convert') {
        dotColor = '#00D26B'
      } else if (item.event === 'Revert') {
        dotColor = '#FF5733'
      }

      marks[position] = {
        style: { borderColor: dotColor, color: dotColor },
        label: ' ',
        dotColor,
      }
    }
  })

  return marks
}

export const formatXAxis = (value, hourUnit) => {
  const date = new Date(value)

  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const mins = date.getMinutes()

  return hourUnit ? `${hour}:${mins}` : `${month} / ${day}`
}

export const formatDateTime = value => {
  const date = new Date(value * 1000) // Multiply by 1000 to convert seconds to milliseconds
  const year = date.getFullYear()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const monthNum = date.getMonth()
  const month = monthNames[monthNum]
  const day = date.getDate()

  // Get hours and minutes
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours %= 12
  hours = hours || 12 // Convert 0 hours to 12

  // Format the time
  const time = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`

  return { __html: `${time}<br /> ${month} ${day}, ${year}` }
}

export const formatDateTimeMobile = value => {
  const date = new Date(value * 1000) // Multiply by 1000 to convert seconds to milliseconds
  const year = date.getFullYear()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const monthNum = date.getMonth()
  const month = monthNames[monthNum]
  const day = date.getDate()

  // Get hours and minutes
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours %= 12
  hours = hours || 12 // Convert 0 hours to 12

  // Format the time
  const time = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`

  return { __html: `${time}<br /> ${month} ${day}<br /> ${year}` }
}

export const formatAge = timestamp => {
  let nowDate = new Date(),
    result = '',
    duration = 0,
    day = 0,
    hour = 0,
    min = 0,
    week = 0,
    month = 0

  nowDate = Math.floor(nowDate.getTime() / 1000)
  duration = Number(nowDate) - Number(timestamp)

  month = Math.floor(duration / 2592000)
  duration -= month * 2592000

  week = Math.floor(duration / 604800)
  duration -= week * 604800

  day = Math.floor(duration / 86400)
  duration -= day * 86400

  hour = Math.floor(duration / 3600) % 24
  duration -= hour * 3600

  min = Math.floor(duration / 60) % 60

  const monthString = month > 0 ? `${month}m` : ''
  const weekString = week > 0 ? `${week}w` : ''
  const dayString = day > 0 ? `${day}d` : ''
  const hourString = hour > 0 ? `${hour}h` : ''
  const minString = min > 0 ? `${min}m` : ''
  result = monthString || weekString || dayString || hourString || minString

  return result
}

export const truncateAddress = address => {
  if (!address || address.length < 10) {
    return address
  }
  const start = address.slice(0, 6)
  const end = address.slice(-4)

  return `${start}...${end}`
}

export const formatNetworkName = networkName => {
  let splitName = []
  if (networkName) {
    splitName = networkName.toLowerCase().split(' ')
    for (let i = 0; i < splitName.length; i += 1) {
      splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substring(1)
    }
  }

  return splitName.join(' ')
}
