import React, { createContext, useContext, useState, useEffect } from 'react'
import promiseObject from 'promise-all-object'
import importedContracts from '../services/web3/contracts'
import {
  newContractInstance,
  newIPORContractInstance,
  maticWeb3,
  arbitrumWeb3,
  baseWeb3,
  zksyncWeb3,
  infuraWeb3,
} from '../services/web3'
import { CHAIN_IDS } from '../data/constants'

const ContractsContext = createContext()
const useContracts = () => useContext(ContractsContext)

const getWeb3 = chainId => {
  if (chainId === CHAIN_IDS.POLYGON_MAINNET) {
    return maticWeb3
  }

  if (chainId === CHAIN_IDS.ARBITRUM_ONE) {
    return arbitrumWeb3
  }

  if (chainId === CHAIN_IDS.BASE) {
    return baseWeb3
  }

  if (chainId === CHAIN_IDS.ZKSYNC) {
    return zksyncWeb3
  }

  return infuraWeb3
}

const ContractsProvider = _ref => {
  const { children } = _ref
  const [contracts, setContracts] = useState({})
  useEffect(() => {
    const initializeContracts = async () => {
      const temporaryGroupOfContracts = {}
      const iporContracts = {}
      Object.keys(importedContracts).forEach(contract => {
        if (contract !== 'iporVaults') {
          Object.assign(temporaryGroupOfContracts, {
            [contract]: {
              instance: newContractInstance(
                contract,
                null,
                null,
                getWeb3(importedContracts[contract].chain),
              ),
              methods: importedContracts[contract].methods,
              address: importedContracts[contract].contract.address,
            },
          })
        } else {
          Object.keys(importedContracts.iporVaults).forEach(iporContract => {
            Object.assign(iporContracts, {
              [iporContract]: {
                instance: newIPORContractInstance(
                  importedContracts.iporVaults[iporContract].contract.address,
                  importedContracts.iporVaults[iporContract].contract.abi,
                  getWeb3(importedContracts.iporVaults[iporContract].chain),
                ),
                methods: importedContracts.iporVaults[iporContract].methods,
                address: importedContracts.iporVaults[iporContract].contract.address,
              },
            })
          })
        }
      })
      temporaryGroupOfContracts.iporVaults = iporContracts
      const initializedContracts = await promiseObject(temporaryGroupOfContracts)
      setContracts(initializedContracts)
    }

    initializeContracts()
  }, [])
  return React.createElement(
    ContractsContext.Provider,
    {
      value: {
        contracts,
      },
    },
    Object.keys(contracts).length ? children : '',
  )
}

export { ContractsProvider, useContracts }
