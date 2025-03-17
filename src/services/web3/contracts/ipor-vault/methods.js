import { handleWeb3ReadMethod } from '../..'

const name = instance => handleWeb3ReadMethod('name', [], instance)

const symbol = instance => handleWeb3ReadMethod('symbol', [], instance)

const decimals = instance => handleWeb3ReadMethod('decimals', [], instance)

const getBalanceOf = (instance, account) => handleWeb3ReadMethod('balanceOf', [account], instance)

const convertToAssets = (instance, amount) =>
  handleWeb3ReadMethod('convertToAssets', [amount], instance)

const convertToShares = (instance, amount) =>
  handleWeb3ReadMethod('convertToShares', [amount], instance)

const getTotalSupply = instance => handleWeb3ReadMethod('totalSupply', [], instance)

const getTotalAssets = instance => handleWeb3ReadMethod('totalAssets', [], instance)

const withdraw = (amount, address, instance) =>
  instance.methods.withdraw(amount, address, address).send({ from: address })

const deposit = (amount, address, instance) =>
  instance.methods.deposit(amount, address).send({ from: address })

export default {
  name,
  symbol,
  decimals,
  getBalanceOf,
  convertToAssets,
  convertToShares,
  getTotalSupply,
  getTotalAssets,
  withdraw,
  deposit,
}
