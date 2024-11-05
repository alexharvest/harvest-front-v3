import React, { useState, useEffect, useRef } from 'react'
// import { get, find } from 'lodash'
import { isEmpty } from 'lodash'
import Modal from 'react-bootstrap/Modal'
import { BsArrowDown } from 'react-icons/bs'
import BigNumber from 'bignumber.js'
import { Spinner } from 'react-bootstrap'
import { FTokenInfo, NewLabel, IconCard, ImgBtn } from '../PositionModal/style'
import { useThemeContext } from '../../../providers/useThemeContext'
import CloseIcon from '../../../assets/images/logos/beginners/close.svg'
import { fromWei, checkNativeToken } from '../../../services/web3'
import AnimatedDots from '../../AnimatedDots'
import { formatNetworkName, formatNumber, formatNumberWido } from '../../../utilities/formats'
import VaultList from '../VaultList'
import { getMatchedVaultList, getVaultValue } from '../../../utilities/parsers'
import { FARM_TOKEN_SYMBOL, BEGINNERS_BALANCES_DECIMALS } from '../../../constants'
import { usePortals } from '../../../providers/Portals'
import { VaultBox } from '../PositionList/style'

const VaultModal = ({
  showVaultModal,
  setShowVaultModal,
  networkName,
  setHighestApyVault,
  setHighestVaultAddress,
  filteredFarmList,
  chain,
  isMobile,
  currencySym,
  currencyRate,
  setIsFromModal,
  stopPropagation,
  groupOfVaults,
  vaultsData,
  pools,
  matchVaultList,
  setMatchVaultList,
  setToken,
  setId,
  token,
  id,
  addresses,
  balances,
  account,
  ethers,
  setPickedToken,
  positionAddress,
  setBalance,
  pickedToken,
  setInputAmount,
  balance,
  setSupportedVault,
  convertSuccess,
  startPoint,
  setStartPoint,
  connected,
  setAllMatchVaultList,
  userStats,
}) => {
  const { darkMode, inputFontColor, fontColor } = useThemeContext()
  const [countFarm, setCountFarm] = useState(0)
  const [hasPortalsError, setHasPortalsError] = useState(true)
  const [balanceList, setBalanceList] = useState([])
  const [defaultToken, setDefaultToken] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [supTokenList, setSupTokenList] = useState([])
  const [supTokenNoBalanceList, setSupTokenNoBalanceList] = useState([])
  const [defaultCurToken, setDefaultCurToken] = useState(defaultToken)
  const [balanceTokenList, setBalanceTokenList] = useState(balanceList)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [newMatchesList, setNewMatchesList] = useState([])
  const [matchingList, setMatchingList] = useState([])
  const [startSpinner, setStartSpinner] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const isFetchingRef = useRef(false)

  const {
    getPortalsSupport,
    getPortalsBalances,
    getPortalsBaseTokens,
    getPortalsToken,
  } = usePortals()

  /* eslint-disable global-require */
  const { tokens } = require('../../../data')

  const useIFARM = id === FARM_TOKEN_SYMBOL
  const filterWord = ''
  const specialToken = groupOfVaults[FARM_TOKEN_SYMBOL]

  let tokenDecimals

  if (token) {
    tokenDecimals = token.decimals || tokens[id].decimals
  }

  useEffect(() => {
    setNewMatchesList([])
    setIsEnd(false)
    setStartPoint(10)
    setMatchVaultList([])
  }, [connected]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMatchVaultList([])
  }, [chain]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let matched = []
    const activedList = []
    if (chain && !isEmpty(userStats) && connected) {
      matched = getMatchedVaultList(groupOfVaults, chain, vaultsData, pools)
      if (matched.length > 0) {
        matched.forEach(item => {
          const vaultValue = getVaultValue(item.vault)
          if (Number(item.vaultApy) !== 0 && Number(vaultValue) > 500) {
            activedList.push(item)
          }
        })
        if (activedList.length > 0) {
          setMatchingList(activedList)
          setAllMatchVaultList(activedList)
        }
      }
    } else if (!connected) {
      matched = getMatchedVaultList(groupOfVaults, 8453, vaultsData, pools)
      if (matched.length > 0) {
        matched.forEach(item => {
          const vaultValue = getVaultValue(item.vault)
          if (Number(item.vaultApy) !== 0 && Number(vaultValue) > 500) {
            activedList.push(item)
          }
        })
        if (activedList.length > 0) {
          setMatchingList(activedList)
          setAllMatchVaultList(activedList)
        }
      }
    }

    activedList.sort((a, b) => b.vaultApy - a.vaultApy)

    const fetchSupportedMatches = async () => {
      if (isFetchingRef.current) {
        return
      }
      isFetchingRef.current = true
      const filteredMatchList = []

      if (activedList.length > 0) {
        activedList.sort((a, b) => b.vaultApy - a.vaultApy)
        const newArray = activedList.slice(0, 10)
        // eslint-disable-next-line no-restricted-syntax
        for (const item of newArray) {
          if (
            item.vaultApy !== 0 &&
            item.vault.vaultAddress !== '0x47e3daF382C4603450905fb68766DB8308315407'
          ) {
            const mToken = item.vault
            const tokenAddress = useIFARM
              ? addresses.iFARM
              : mToken.vaultAddress || mToken.tokenAddress
            const chainId = mToken.chain || mToken.data.chain
            // eslint-disable-next-line no-await-in-loop
            const portalsToken = await getPortalsSupport(chainId, tokenAddress)
            if (portalsToken) {
              if (portalsToken.status === 200) {
                if (portalsToken.data.totalItems !== 0) {
                  filteredMatchList.push(item)
                }
              }
            } else {
              console.log('Error in fetching Portals supported')
            }
          }
        }
      }
      if (filteredMatchList.length > 0) {
        setMatchVaultList(filteredMatchList)
        setCountFarm(filteredMatchList.length)
      }

      isFetchingRef.current = false
    }

    fetchSupportedMatches()
  }, [chain, pools, setMatchVaultList, specialToken.profitShareAPY, connected, userStats]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMoreMatches = async () => {
    if (!isEnd) {
      setStartSpinner(true)
      const filteredMatchList = []
      const nextArray = matchingList.slice(startPoint, startPoint + 10)
      // eslint-disable-next-line no-restricted-syntax
      for (const item of nextArray) {
        const mToken = item.vault
        const tokenAddress = useIFARM ? addresses.iFARM : mToken.vaultAddress || mToken.tokenAddress
        const chainId = mToken.chain || mToken.data.chain
        // eslint-disable-next-line no-await-in-loop
        const portalsToken = await getPortalsSupport(chainId, tokenAddress)
        if (portalsToken) {
          if (portalsToken.status === 200) {
            if (portalsToken.data.totalItems !== 0) {
              filteredMatchList.push(item)
            }
          }
        } else {
          console.log('Error in fetching Portals supported')
        }
      }

      const newMathcing = [...newMatchesList, ...filteredMatchList]
      setStartPoint(startPoint + 10)
      setNewMatchesList(newMathcing)
      setCountFarm(countFarm + filteredMatchList.length)
      if (newMathcing.length > 0) {
        setStartSpinner(false)
      }

      if (
        nextArray[nextArray.length - 1].vault.vaultAddress.toLowerCase() ===
        matchingList[matchingList.length - 1].vault.vaultAddress.toLowerCase()
      ) {
        setIsEnd(true)
      }
    }
  }

  const positions = matchVaultList.map((item, i) => {
    return (
      <VaultList
        key={i}
        matchVault={item}
        currencySym={currencySym}
        currencyRate={currencyRate}
        networkName={networkName}
        setShowVaultModal={setShowVaultModal}
        setHighestVaultAddress={setHighestVaultAddress}
        setHighestApyVault={setHighestApyVault}
        setIsFromModal={setIsFromModal}
        stopPropagation={stopPropagation}
        darkMode={darkMode}
        filteredFarmList={filteredFarmList}
        chainId={chain}
        setToken={setToken}
        setId={setId}
        groupOfVaults={groupOfVaults}
        connected={connected}
      />
    )
  })

  const newPositions = newMatchesList.map((item, i) => {
    return (
      <VaultList
        key={i}
        matchVault={item}
        currencySym={currencySym}
        currencyRate={currencyRate}
        networkName={networkName}
        setShowVaultModal={setShowVaultModal}
        setHighestVaultAddress={setHighestVaultAddress}
        setHighestApyVault={setHighestApyVault}
        setIsFromModal={setIsFromModal}
        stopPropagation={stopPropagation}
        darkMode={darkMode}
        filteredFarmList={filteredFarmList}
        chainId={chain}
        setToken={setToken}
        setId={setId}
        groupOfVaults={groupOfVaults}
        connected={connected}
      />
    )
  })

  useEffect(() => {
    async function fetchData() {
      if (token) {
        const tokenAddress = useIFARM ? addresses.iFARM : token.vaultAddress || token.tokenAddress
        const chainId = token.chain || token.data.chain
        const portalsToken = await getPortalsSupport(chainId, tokenAddress)

        if (portalsToken) {
          if (portalsToken === undefined || portalsToken.status !== 200) {
            setHasPortalsError(true)
          } else if (portalsToken.status === 200) {
            setHasPortalsError(false)
            if (portalsToken.data.totalItems === 0) {
              setSupportedVault(false)
            } else {
              setSupportedVault(true)
            }
          }
        }
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    const getTokenBalance = async () => {
      try {
        if (chain && account && Object.keys(balances).length !== 0 && token) {
          if (!hasPortalsError) {
            let supList = [],
              directInSup = {},
              directInBalance = {}

            const portalsRawBalances = await getPortalsBalances(account, chain.toString())
            const portalsBaseTokens = await getPortalsBaseTokens(chain.toString())
            const curNoBalances = portalsBaseTokens
              .map(baseToken => {
                const balToken = portalsRawBalances.find(
                  el => el.address.toLowerCase() === baseToken.address.toLowerCase(),
                )
                if (balToken === undefined) {
                  const item = {
                    symbol: baseToken.symbol,
                    address: baseToken.address,
                    balance: 0,
                    default: false,
                    usdValue: 0,
                    usdPrice: baseToken.price,
                    logoURI: baseToken.image
                      ? baseToken.image
                      : baseToken.images
                      ? baseToken.images[0]
                      : 'https://etherscan.io/images/main/empty-token.png',
                    decimals: baseToken.decimals,
                    chainId: chain,
                  }
                  return item
                }

                return null
              })
              .filter(item => item !== null)

            const curBalances = portalsRawBalances
              .map(rawBalance => {
                if (!ethers.utils.isAddress(rawBalance.address))
                  rawBalance.address = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
                const item = {
                  symbol: rawBalance.symbol,
                  address: rawBalance.address,
                  balance: new BigNumber(rawBalance.rawBalance)
                    .div(10 ** rawBalance.decimals)
                    .toFixed(),
                  rawBalance: rawBalance.rawBalance,
                  default: false,
                  usdValue: rawBalance.balanceUSD,
                  usdPrice: rawBalance.price,
                  logoURI: rawBalance.image
                    ? rawBalance.image
                    : rawBalance.images
                    ? rawBalance.images[0]
                    : 'https://etherscan.io/images/main/empty-token.png',
                  decimals: rawBalance.decimals,
                  chainId: chain,
                }
                return item
              })
              .filter(item => item.address)

            const tokenAddress =
              token.tokenAddress !== undefined && token.tokenAddress.length !== 2
                ? token.tokenAddress
                : token.vaultAddress

            const fTokenAddr = useIFARM
              ? addresses.iFARM
              : token.vaultAddress
              ? token.vaultAddress
              : token.tokenAddress
            const curSortedBalances = curBalances
              .sort(function reducer(a, b) {
                return b.usdValue - a.usdValue
              })
              .filter(item => item.address.toLowerCase() !== fTokenAddr.toLowerCase())

            // setBalanceList(
            //   curSortedBalances.filter(
            //     item => item.address.toLowerCase() !== tokenAddress.toLowerCase(),
            //   ),
            // )
            setBalanceList(curSortedBalances)

            curSortedBalances.forEach(balanceToken => {
              if (balanceToken.symbol === 'ARB') {
                // setArbBalance(balanceToken.balance)
              }
            })

            supList = [...curBalances, ...curNoBalances]

            supList = supList.map(sup => {
              const supToken = curBalances.find(el => el.address === sup.address)
              if (supToken) {
                sup.balance = supToken.balance
                sup.usdValue = supToken.usdValue
                sup.usdPrice = supToken.usdPrice
              } else {
                sup.balance = '0'
                sup.usdValue = '0'
              }
              sup.default = false

              if (Object.keys(directInSup).length === 0 && tokenAddress.length !== 2) {
                if (sup.address.toLowerCase() === tokenAddress.toLowerCase()) {
                  directInSup = sup
                }
              }
              return sup
            })

            supList = supList.sort(function reducer(a, b) {
              return b.usdValue - a.usdValue
            })
            const cl = curBalances.length
            for (let j = 0; j < cl; j += 1) {
              if (Object.keys(directInBalance).length === 0 && tokenAddress.length !== 2) {
                if (curBalances[j].address.toLowerCase() === tokenAddress.toLowerCase()) {
                  directInBalance = curBalances[j]
                }
              }
            }

            const directData = curBalances.find(
              el => el.address.toLowerCase() === tokenAddress.toLowerCase(),
            )
            const directBalance = directData
              ? directData.balance
              : balances[id]
              ? new BigNumber(balances[id]).div(10 ** token.decimals).toFixed()
              : '0'
            const directUsdPrice = id === 'FARM_GRAIN_LP' ? 0 : token.usdPrice
            const directUsdValue = directData
              ? directData.usdValue
              : new BigNumber(directBalance).times(directUsdPrice).toFixed()
            if (!(Object.keys(directInSup).length === 0 && directInSup.constructor === Object)) {
              directInSup.balance = directBalance
              directInSup.usdPrice =
                directInSup.usdPrice > 0 ? directInSup.usdPrice : directUsdPrice
              directInSup.usdValue =
                directInSup.usdValue > 0 ? directInSup.usdValue : directUsdValue
              supList = supList.sort(function result(x, y) {
                return x === directInSup ? -1 : y === directInSup ? 1 : 0
              })
              supList[0].default = true
            } else if (
              !(Object.keys(directInBalance).length === 0 && directInBalance.constructor === Object)
            ) {
              directInBalance.balance = directBalance || '0'
              directInBalance.usdPrice =
                directInBalance.usdPrice > 0 ? directInBalance.usdPrice : directUsdPrice
              directInBalance.usdValue =
                directInBalance.usdValue > 0 ? directInBalance.usdValue : directUsdValue
              supList.unshift(directInBalance)
              supList[0].default = true
            } else {
              // const web3Client = await getWeb3(chain, null)
              // const { getSymbol } = tokenMethods
              // const lpInstance = await newContractInstance(
              //   id,
              //   tokenAddress,
              //   tokenContract.abi,
              //   web3Client,
              // )
              // const lpSymbol = await getSymbol(lpInstance)
              const direct = {
                symbol: 'lpSymbol',
                address: tokenAddress,
                balance: directBalance || '0',
                default: true,
                usdPrice: directUsdPrice || '0',
                usdValue: directUsdValue || '0',
                logoURI: 'https://etherscan.io/images/main/empty-token.png',
                decimals: tokenDecimals,
                chainId: parseInt(chain, 0),
              }
              supList.unshift(direct)
            }

            if (supList[0].default) {
              if (supList[0].balance === '0' && balances[supList[0].symbol]) {
                const defaultBalance = fromWei(
                  balances[supList[0].symbol],
                  supList[0].decimals,
                  supList[0].decimals,
                )
                const defaultUsdBalance = formatNumber(
                  Number(supList[0].usdPrice) * Number(defaultBalance),
                  2,
                )
                supList[0].balance = defaultBalance
                supList[0].usdValue = defaultUsdBalance
              }
              setDefaultToken(supList[0])
            } else {
              setDefaultToken({})
            }
            // supList.shift()
            setSupTokenList(supList)

            const supNoBalanceList = [],
              sl = supList.length
            if (sl > 0) {
              for (let i = 0; i < sl; i += 1) {
                if (Number(supList[i].balance) === 0) {
                  supNoBalanceList.push(supList[i])
                }
              }
            }
            supNoBalanceList.shift()
            setSupTokenNoBalanceList(supNoBalanceList)

            // const soonSupList = []
            // for (let j = 0; j < curBalances.length; j += 1) {
            //   const supToken = supList.find(el => el.address === curBalances[j].address)
            //   if (!supToken) {
            //     soonSupList.push(curBalances[j])
            //   }

            //   if (Object.keys(directInBalance).length === 0 && tokenAddress.length !== 2) {
            //     if (curBalances[j].address.toLowerCase() === tokenAddress.toLowerCase()) {
            //       directInBalance = curBalances[j]
            //     }
            //   }
            // }
            // setSoonToSupList(soonSupList)
            // setSoonToSupList({}) // TODO: remove soonToSupList once confirmed
          } else {
            let tokenSymbol,
              decimals = 18

            decimals = useIFARM ? token.data?.watchAsset?.decimals : token.decimals
            tokenSymbol = useIFARM ? token.tokenNames[0] : token?.pool?.lpTokenData?.symbol

            if (tokenSymbol && tokenSymbol.substring(0, 1) === 'f') {
              tokenSymbol = tokenSymbol.substring(1)
            }
            // const tokenAddress = useIFARM ? addresses.iFARM : token.tokenAddress
            const tokenAddress = token.tokenAddress
            const tokenId = token?.pool?.id
            const tokenBalance = fromWei(
              balances[useIFARM ? tokenSymbol : tokenId],
              decimals,
              decimals,
            )
            const tokenPrice = useIFARM ? token.data?.lpTokenData?.price : token.usdPrice
            const usdValue = formatNumberWido(
              Number(tokenBalance) * Number(tokenPrice),
              BEGINNERS_BALANCES_DECIMALS,
            )
            const logoURI =
              token.logoUrl.length === 1
                ? token.logoUrl[0].substring(1)
                : 'https://etherscan.io/images/main/empty-token.png'

            const defaultTokenData = {
              symbol: tokenSymbol,
              address: tokenAddress,
              balance: tokenBalance,
              default: true,
              usdValue,
              usdPrice: tokenPrice,
              logoURI,
              decimals,
              chainId: useIFARM ? token.data.chain : token.chain,
            }
            setDefaultToken(defaultTokenData)
          }
        }
      } catch (err) {
        console.log('getTokenBalance: ', err)
      }
      console.debug('convert status', convertSuccess)
    }
    getTokenBalance()
  }, [
    account,
    chain,
    balances,
    hasPortalsError,
    getPortalsBalances,
    getPortalsBaseTokens,
    id,
    token,
    tokenDecimals,
    useIFARM,
    addresses.iFARM,
    ethers.utils,
    convertSuccess,
  ])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (defaultToken !== null) {
  //       let tokenToSet = null

  //       // Check if defaultToken is present in the balanceList
  //       if (defaultToken.balance !== '0' || !supportedVault || hasPortalsError) {
  //         setBalance(defaultToken.balance)
  //         return
  //       }

  //       // If defaultToken is not found, find the token with the highest USD value among those in the SUPPORTED_TOKEN_LIST and balanceList
  //       const supportedTokens = balanceList.filter(
  //         balancedToken => SUPPORTED_TOKEN_LIST[chain][balancedToken.symbol],
  //       )
  //       if (supportedTokens.length > 0) {
  //         tokenToSet = supportedTokens.reduce((prevToken, currentToken) =>
  //           prevToken.usdValue > currentToken.usdValue ? prevToken : currentToken,
  //         )
  //       }

  //       // If no token is found in SUPPORTED_TOKEN_LIST, set the token with the highest USD value in balanceList
  //       if (!tokenToSet && balanceList.length > 0) {
  //         tokenToSet = balanceList.reduce(
  //           (prevToken, currentToken) =>
  //             prevToken.usdValue > currentToken.usdValue ? prevToken : currentToken,
  //           balanceList[0], // Providing the first element as the initial value
  //         )
  //       }

  //       // Set the pickedTokenDepo and balanceDepo based on the determined tokenToSet
  //       if (tokenToSet) {
  //         setBalance(
  //           fromWei(
  //             tokenToSet.rawBalance ? tokenToSet.rawBalance : 0,
  //             tokenToSet.decimals,
  //             tokenToSet.decimals,
  //           ),
  //         )
  //       }
  //     } else if (supTokenList.length !== 0) {
  //       setBalance('0')
  //     }
  //   }, 3000)

  //   return () => clearTimeout(timer)
  // }, [
  //   balanceList,
  //   supTokenList,
  //   defaultToken,
  //   chain,
  //   SUPPORTED_TOKEN_LIST,
  //   supportedVault,
  //   hasPortalsError,
  //   setBalance,
  // ])

  useEffect(() => {
    if (account && pickedToken) {
      if (checkNativeToken(pickedToken)) {
        setInputAmount(new BigNumber((Number(balance) * 0.95).toFixed(5)).toString())
      } else {
        setInputAmount(new BigNumber(balance).toString())
      }
    }
  }, [account, balance, pickedToken, setInputAmount])

  useEffect(() => {
    const fetch = async () => {
      if (supTokenNoBalanceList && balanceList && filterWord !== undefined && filterWord !== '') {
        const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/
        if (ethereumAddressRegex.test(filterWord)) {
          let TokenDetail = {},
            defaultTokenInvolve = false,
            balanceListInvolve = false
          try {
            TokenDetail = (await getPortalsToken(chain, filterWord)) || {}
          } catch (e) {
            TokenDetail = {}
          }
          if (Object.keys(TokenDetail).length !== 0) {
            TokenDetail = {
              ...TokenDetail,
              logoURI: TokenDetail.image,
              balance: 0,
              default: false,
              usdValue: 0,
              usdPrice: TokenDetail.price,
              chain,
            }
          }
          if (Object.keys(TokenDetail).length !== 0) {
            if (!(Object.keys(defaultToken).length === 0 && defaultToken.constructor === Object)) {
              if (defaultToken.symbol.includes(TokenDetail.symbol.toLowerCase().trim())) {
                defaultTokenInvolve = true
                setDefaultCurToken(defaultToken)
              } else {
                setDefaultCurToken(null)
              }
            }
            if (balanceList.length !== 0) {
              const newList = balanceList.filter(el =>
                el.symbol.toLowerCase().includes(TokenDetail.symbol.toLowerCase().trim()),
              )
              if (newList.length > 0) {
                balanceListInvolve = true
              }
              setBalanceTokenList(newList)
            }
            if (defaultCurToken === null) {
              const newList = balanceList.filter(el =>
                el.symbol.toLowerCase().includes(TokenDetail.symbol.toLowerCase().trim()),
              )
              if (newList.length === 0) {
                setSupTokenList([TokenDetail])
              } else {
                setSupTokenList([])
              }
            } else {
              setSupTokenList([])
            }
            if (supTokenNoBalanceList.length !== 0 && !defaultTokenInvolve && !balanceListInvolve) {
              const newList = supTokenNoBalanceList.filter(el =>
                el.symbol.toLowerCase().includes(TokenDetail.symbol.toLowerCase().trim()),
              )
              if (newList.length > 0) {
                setSupTokenList(newList)
              } else {
                setSupTokenList([TokenDetail])
              }
            }
          } else {
            setSupTokenList([])
            if (!(Object.keys(defaultToken).length === 0 && defaultToken.constructor === Object)) {
              setDefaultCurToken(null)
            }
            setBalanceTokenList([])
          }
        } else {
          if (supTokenNoBalanceList.length !== 0) {
            const newList = supTokenNoBalanceList.filter(el =>
              el.symbol.toLowerCase().includes(filterWord.toLowerCase().trim()),
            )
            setSupTokenList(newList)
          }
          if (
            defaultToken &&
            !(Object.keys(defaultToken).length === 0 && defaultToken.constructor === Object)
          ) {
            if (defaultToken.symbol.includes(filterWord.toLowerCase().trim())) {
              setDefaultCurToken(defaultToken)
            } else {
              setDefaultCurToken(null)
            }
          }
          if (balanceList.length !== 0) {
            const newList = balanceList.filter(el =>
              el.symbol.toLowerCase().includes(filterWord.toLowerCase().trim()),
            )
            setBalanceTokenList(newList)
          }
        }
      }
      if (filterWord === '') {
        setSupTokenList(supTokenNoBalanceList)
        setBalanceTokenList(balanceList)
        setDefaultCurToken(defaultToken)
      }
    }
    fetch()
  }, [supTokenNoBalanceList, balanceList, chain, defaultCurToken, defaultToken, getPortalsToken])

  useEffect(() => {
    // let tokenForPick
    // if (balanceTokenList.length > 0 && positionAddress) {
    //   const matchingVault = Object.entries(groupOfVaults).find(item => {
    //     const compareAddress = item[1].poolVault ? item[1].tokenAddress : item[1].vaultAddress
    //     return compareAddress.toLowerCase() === positionAddress.toLowerCase()
    //   })
    //   if (matchingVault) {
    //     tokenForPick = balanceTokenList.find(item => {
    //       if (item.address.toLowerCase() === matchingVault[1].tokenAddress.toLowerCase()) {
    //         return item
    //       }
    //       if (item.address.toLowerCase() === positionAddress.toLowerCase()) {
    //         return item
    //       }
    //       return null
    //     })
    //   }

    //   if (tokenForPick) {
    //     setPickedToken(tokenForPick)
    //     setBalance(tokenForPick.balance)
    //   } else {
    //     setPickedToken(null)
    //   }
    // }

    if (filteredFarmList.length > 0 && positionAddress) {
      const matchingVault = filteredFarmList.find(item => {
        const compareAddress = item.token.poolVault
          ? item.token.tokenAddress
          : item.token.vaultAddress
        return compareAddress.toLowerCase() === positionAddress.toLowerCase()
      })

      if (matchingVault) {
        let staked, unstaked, total, hasStakeUnstake
        const useIFARM1 = matchingVault.token.poolVault

        if (useIFARM1) {
          staked = matchingVault.stake
          unstaked = matchingVault.unstake
          total = staked
          hasStakeUnstake = unstaked
        } else {
          staked = matchingVault.stake

          unstaked = matchingVault.unstake

          total = unstaked
          hasStakeUnstake = staked
          // amountBalanceUSD = total * usdPrice * Number(currencyRate)
        }
        const newAddress = matchingVault.token.poolVault
          ? matchingVault.token.tokenAddress
          : matchingVault.token.vaultAddress
        const newSymbol = matchingVault.token.poolVault
          ? 'iFARM'
          : `f${matchingVault.token.pool.id}`
        const newToken = {
          address: newAddress,
          balance: total,
          chain,
          decimals: Number(matchingVault.token.decimals),
          default: false,
          symbol: newSymbol,
          staked: Number(hasStakeUnstake),
        }

        if (newToken) {
          setPickedToken(newToken)
          setBalance(newToken.balance)
        }
      }
    }
  }, [balanceTokenList, positionAddress, setPickedToken, setBalance]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      show={showVaultModal}
      // onHide={onClose}
      dialogClassName="migrate-modal-notification"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="migrate-position-modal-header">
        <FTokenInfo>
          <div className="modal-header-part">
            <NewLabel margin="auto 16px auto 0px">
              <IconCard bgColor="#6988ff">
                <BsArrowDown />
              </IconCard>
            </NewLabel>
            <NewLabel align="left" marginRight="12px">
              <NewLabel
                color={darkMode ? '#ffffff' : '#262525'}
                size={isMobile ? '18px' : '18px'}
                height={isMobile ? '28px' : '28px'}
                weight="600"
                marginBottom="4px"
              >
                Choose new Strategy
              </NewLabel>
              <NewLabel
                color={fontColor}
                size={isMobile ? '14px' : '14px'}
                height={isMobile ? '20px' : '20px'}
                weight="400"
                marginBottom="5px"
              >
                Pick a destination strategy
              </NewLabel>
            </NewLabel>
          </div>
          <NewLabel>
            <NewLabel
              display="flex"
              marginBottom={isMobile ? '18px' : '18px'}
              width="fit-content"
              cursorType="pointer"
              weight="600"
              size={isMobile ? '14px' : '14px'}
              height={isMobile ? '20px ' : '20px'}
              darkMode={darkMode}
              color={inputFontColor}
              align="center"
              onClick={() => {
                setShowVaultModal(false)
              }}
            >
              <ImgBtn src={CloseIcon} alt="" />
            </NewLabel>
          </NewLabel>
        </FTokenInfo>
      </Modal.Header>
      <Modal.Body className="migrate-position-modal-body">
        {countFarm === 0 ? (
          <NewLabel
            color={fontColor}
            size={isMobile ? '12px' : '12px'}
            height={isMobile ? '20px' : '20px'}
            weight="400"
            padding="15px"
            borderBottom={darkMode ? '1px solid #1F242F' : '1px solid #ECECEC'}
            display="flex"
            justifyContent="center"
          >
            Loading Strategy List
            <AnimatedDots />
          </NewLabel>
        ) : (
          <>
            <NewLabel
              color={fontColor}
              size={isMobile ? '12px' : '12px'}
              height={isMobile ? '20px' : '20px'}
              weight="400"
              padding="15px"
              borderBottom={darkMode ? '1px solid #1F242F' : '1px solid #ECECEC'}
            >
              {`25+ Opportunities found on ${formatNetworkName(networkName)}`}
            </NewLabel>
            {positions}
            {isLoadingMore && newPositions}
            {matchingList.length > 0 && (
              <VaultBox
                borderBottom={darkMode ? '1px solid #1F242F' : '1px solid #ECECEC'}
                hoverBgColor={darkMode ? '#1F242F' : '#e9f0f7'}
                color={darkMode ? '#ffffff' : '#414141'}
                onClick={() => {
                  setIsLoadingMore(true)
                  fetchMoreMatches()
                }}
              >
                {!isEnd ? 'Display more results' : 'All results are loaded'}
                {!startSpinner ? (
                  <></>
                ) : (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </VaultBox>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default VaultModal
