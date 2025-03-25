import React, { createContext, useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import { get } from 'lodash'
import { CURRENCY_RATES_API_ENDPOINT, supportedCurrencies } from '../constants'
import usePersistedState from './usePersistedState'

const RateContext = createContext()
const useRate = () => useContext(RateContext)

const fetchDataFromAPI = (endpoint, defaultValue = null) =>
  axios
    .get(endpoint)
    .then(res => get(res, 'data', defaultValue))
    .catch(err => {
      console.error(err)
      return defaultValue
    })

const RateProvider = ({ children }) => {
  const [rates, setRates] = usePersistedState('RATE', {
    currency: supportedCurrencies[0],
  })

  const firstRateRender = useRef(true)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rateData = await fetchDataFromAPI(CURRENCY_RATES_API_ENDPOINT)
        setRates(prevRates => ({
          ...prevRates,
          rateData, // Update only the rateData property
        }))
      } catch (error) {
        console.error('Error fetching currency rates:', error)
      }
    }

    if (firstRateRender.current) {
      fetchRates()
      firstRateRender.current = false
    }
  }, [setRates])

  const updateCurrency = value => {
    setRates({
      ...rates,
      currency: supportedCurrencies[value],
    })
  }

  return <RateContext.Provider value={{ rates, updateCurrency }}>{children}</RateContext.Provider>
}

export { RateProvider, useRate }
