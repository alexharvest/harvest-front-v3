import { handleWeb3ReadMethod } from '../..'

const getAllInformation = (userAddress, vaults, pools, instance) =>
  handleWeb3ReadMethod('getAllInformation', [userAddress, vaults, pools], instance)

export default {
  getAllInformation,
}
