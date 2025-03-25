import React, { useEffect, useState } from 'react'
import VaultList from '../../components/VaultComponents/VaultList'
import { useThemeContext } from '../../providers/useThemeContext'
import BswapBG from '../../assets/images/logos/bswap_bg.png'
import FarmContainer from './style'

const Farm = () => {
  const { bgColorNew } = useThemeContext()
  const [baseswapBG, setBaseswapBG] = useState(false)

  useEffect(() => {
    const setUrlData = () => {
      const params = new URLSearchParams(window.location.search)
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of params.entries()) {
        if (key === 'search') {
          if (value.toLowerCase() === 'baseswap') {
            setBaseswapBG(true)
          } else {
            setBaseswapBG(false)
          }
        } else {
          setBaseswapBG(false)
        }
      }
    }

    setUrlData()
  }, [window.location.search]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <FarmContainer bgColor={bgColorNew}>
      {baseswapBG ? <img className="bswap-bg" src={BswapBG} width="100%" alt="" /> : <></>}
      <VaultList />
    </FarmContainer>
  )
}

export default Farm
