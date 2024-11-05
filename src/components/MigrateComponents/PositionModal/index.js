import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { BsArrowDown } from 'react-icons/bs'
// import BigNumber from 'bignumber.js'
import { useThemeContext } from '../../../providers/useThemeContext'
// import { FARM_TOKEN_SYMBOL, BEGINNERS_BALANCES_DECIMALS } from '../../../constants'
import { FARM_TOKEN_SYMBOL } from '../../../constants'
import { FTokenInfo, NewLabel, IconCard, ImgBtn } from './style'
import CloseIcon from '../../../assets/images/logos/beginners/close.svg'
// import tokenContract from '../../../services/web3/contracts/token/contract.json'
import AnimatedDots from '../../AnimatedDots'
// import { formatNetworkName, formatNumberWido, formatNumber } from '../../../utilities/formats'
import { formatNetworkName } from '../../../utilities/formats'
// import tokenMethods from '../../../services/web3/contracts/token/methods'
import PositionList from '../PositionList'
import { usePortals } from '../../../providers/Portals'
// import { fromWei } from '../../../services/web3'

const PositionModal = ({
  showPositionModal,
  setShowPositionModal,
  networkName,
  setPositionVaultAddress,
  filteredFarmList,
  chain,
  isMobile,
  currencySym,
  setHighestPosition,
  setIsFromModal,
  stopPropagation,
  token,
  // account,
  // balances,
  // ethers,
  id,
  addresses,
  setId,
  setToken,
  groupOfVaults,
  // setDefaultToken,
  // defaultToken,
  // setAllTokenList,
  setCurSupportedVault,
  setNetworkMatchList,
  networkMatchList,
  setNoPosition,
  connected,
  currencyRate,
}) => {
  const [countFarm, setCountFarm] = useState(0)
  // const [balanceList, setBalanceList] = useState([])
  // const [arbBalance, setArbBalance] = useState('0')
  // const [supTokenList, setSupTokenList] = useState([])
  // const [supTokenNoBalanceList, setSupTokenNoBalanceList] = useState([])
  // const [soonToSupList, setSoonToSupList] = useState([])
  // const [defaultCurToken, setDefaultCurToken] = useState(defaultToken)
  // const [balanceTokenList, setBalanceTokenList] = useState(balanceList)

  // const filterWord = ''

  const { darkMode, inputFontColor, fontColor } = useThemeContext()
  // eslint-disable-next-line no-empty-pattern
  const {
    // getPortalsBaseTokens,
    // getPortalsBalances,
    getPortalsSupport,
    // getPortalsToken,
  } = usePortals()

  /* eslint-disable global-require */
  // const { tokens } = require('../../../data')

  // let tokenDecimals
  // if (token) {
  //   tokenDecimals = token.decimals || tokens[id].decimals
  // }

  const useIFARM = id === FARM_TOKEN_SYMBOL

  useEffect(() => {
    setNetworkMatchList([])
    setNoPosition(false)
  }, [connected]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNetworkMatchList([])
  }, [chain]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const matchListAry = []
    if (filteredFarmList.length > 0) {
      filteredFarmList.forEach(vault => {
        const findingChain = vault.token.poolVault ? vault.token.data.chain : vault.token.chain
        if (Number(findingChain) === Number(chain)) {
          matchListAry.push(vault)
        }
        matchListAry.sort((a, b) => b.balance - a.balance)
      })

      if (matchListAry.length > 0) {
        setNoPosition(false)
        setNetworkMatchList(matchListAry)
        setCountFarm(matchListAry.length)
      }

      if (matchListAry.length === 0) {
        setNetworkMatchList([])
        setNoPosition(true)
      }
    }
  }, [chain, filteredFarmList.length]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function fetchData() {
      if (token) {
        const tokenAddress = useIFARM ? addresses.iFARM : token.vaultAddress || token.tokenAddress
        const chainId = token.chain || token.data.chain

        const portalsToken = await getPortalsSupport(chainId, tokenAddress)
        if (portalsToken) {
          if (portalsToken.status === 200) {
            if (portalsToken.data.totalItems === 0) {
              setCurSupportedVault(false)
            } else {
              setCurSupportedVault(true)
            }
          }
        }
      }
    }

    fetchData()
  }, [
    token,
    getPortalsSupport,
    addresses,
    useIFARM,
    setCurSupportedVault,
    setHighestPosition,
    setPositionVaultAddress,
    networkMatchList,
    chain,
  ])

  const positions = networkMatchList.map((item, i) => {
    return (
      <PositionList
        key={i}
        matchVault={item}
        currencySym={currencySym}
        networkName={networkName}
        setShowPositionModal={setShowPositionModal}
        setPositionVaultAddress={setPositionVaultAddress}
        setHighestPosition={setHighestPosition}
        setIsFromModal={setIsFromModal}
        stopPropagation={stopPropagation}
        darkMode={darkMode}
        setId={setId}
        setToken={setToken}
        groupOfVaults={groupOfVaults}
        currencyRate={currencyRate}
      />
    )
  })

  // useEffect(() => {
  //   const getTokenBalance = async () => {
  //     try {
  //       if (chain && account && Object.keys(balances).length !== 0 && token) {
  //         if (!hasPortalsError) {
  //           let supList = [],
  //             directInSup = {},
  //             directInBalance = {}

  //           const portalsRawBalances = await getPortalsBalances(account, chain.toString())
  //           const portalsBaseTokens = await getPortalsBaseTokens(chain.toString())
  //           const curNoBalances = portalsBaseTokens
  //             .map(baseToken => {
  //               const balToken = portalsRawBalances.find(
  //                 el => el.address.toLowerCase() === baseToken.address.toLowerCase(),
  //               )
  //               if (balToken === undefined) {
  //                 const item = {
  //                   symbol: baseToken.symbol,
  //                   address: baseToken.address,
  //                   balance: 0,
  //                   default: false,
  //                   usdValue: 0,
  //                   usdPrice: baseToken.price,
  //                   logoURI: baseToken.image
  //                     ? baseToken.image
  //                     : baseToken.images
  //                     ? baseToken.images[0]
  //                     : 'https://etherscan.io/images/main/empty-token.png',
  //                   decimals: baseToken.decimals,
  //                   chainId: chain,
  //                 }
  //                 return item
  //               }

  //               return null
  //             })
  //             .filter(item => item !== null)

  //           const curBalances = portalsRawBalances
  //             .map(balance => {
  //               if (!ethers.utils.isAddress(balance.address))
  //                 balance.address = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
  //               const item = {
  //                 symbol: balance.symbol,
  //                 address: balance.address,
  //                 balance: new BigNumber(balance.rawBalance).div(10 ** balance.decimals).toFixed(),
  //                 rawBalance: balance.rawBalance,
  //                 default: false,
  //                 usdValue: balance.balanceUSD,
  //                 usdPrice: balance.price,
  //                 logoURI: balance.image
  //                   ? balance.image
  //                   : balance.images
  //                   ? balance.images[0]
  //                   : 'https://etherscan.io/images/main/empty-token.png',
  //                 decimals: balance.decimals,
  //                 chainId: chain,
  //               }
  //               return item
  //             })
  //             .filter(item => item.address)

  //           const tokenAddress =
  //             token.tokenAddress !== undefined && token.tokenAddress.length !== 2
  //               ? token.tokenAddress
  //               : token.vaultAddress

  //           const fTokenAddr = useIFARM
  //             ? addresses.iFARM
  //             : token.vaultAddress
  //             ? token.vaultAddress
  //             : token.tokenAddress
  //           const curSortedBalances = curBalances
  //             .sort(function reducer(a, b) {
  //               return b.usdValue - a.usdValue
  //             })
  //             .filter(item => item.address.toLowerCase() !== fTokenAddr.toLowerCase())

  //           // setBalanceList(
  //           //   curSortedBalances.filter(
  //           //     item => item.address.toLowerCase() !== tokenAddress.toLowerCase(),
  //           //   ),
  //           // )
  //           setBalanceList(curSortedBalances)

  //           curSortedBalances.forEach(balanceToken => {
  //             if (balanceToken.symbol === 'ARB') {
  //               // setArbBalance(balanceToken.balance)
  //             }
  //           })

  //           supList = [...curBalances, ...curNoBalances]

  //           supList = supList.map(sup => {
  //             const supToken = curBalances.find(el => el.address === sup.address)
  //             if (supToken) {
  //               sup.balance = supToken.balance
  //               sup.usdValue = supToken.usdValue
  //               sup.usdPrice = supToken.usdPrice
  //             } else {
  //               sup.balance = '0'
  //               sup.usdValue = '0'
  //             }
  //             sup.default = false

  //             if (Object.keys(directInSup).length === 0 && tokenAddress.length !== 2) {
  //               if (sup.address.toLowerCase() === tokenAddress.toLowerCase()) {
  //                 directInSup = sup
  //               }
  //             }
  //             return sup
  //           })

  //           supList = supList.sort(function reducer(a, b) {
  //             return b.usdValue - a.usdValue
  //           })
  //           const cl = curBalances.length
  //           for (let j = 0; j < cl; j += 1) {
  //             if (Object.keys(directInBalance).length === 0 && tokenAddress.length !== 2) {
  //               if (curBalances[j].address.toLowerCase() === tokenAddress.toLowerCase()) {
  //                 directInBalance = curBalances[j]
  //               }
  //             }
  //           }

  //           const directData = curBalances.find(
  //             el => el.address.toLowerCase() === tokenAddress.toLowerCase(),
  //           )
  //           const directBalance = directData
  //             ? directData.balance
  //             : balances[id]
  //             ? new BigNumber(balances[id]).div(10 ** token.decimals).toFixed()
  //             : '0'
  //           const directUsdPrice = id === 'FARM_GRAIN_LP' ? 0 : token.usdPrice
  //           const directUsdValue = directData
  //             ? directData.usdValue
  //             : new BigNumber(directBalance).times(directUsdPrice).toFixed()
  //           if (!(Object.keys(directInSup).length === 0 && directInSup.constructor === Object)) {
  //             directInSup.balance = directBalance
  //             directInSup.usdPrice =
  //               directInSup.usdPrice > 0 ? directInSup.usdPrice : directUsdPrice
  //             directInSup.usdValue =
  //               directInSup.usdValue > 0 ? directInSup.usdValue : directUsdValue
  //             supList = supList.sort(function result(x, y) {
  //               return x === directInSup ? -1 : y === directInSup ? 1 : 0
  //             })
  //             supList[0].default = true
  //           } else if (
  //             !(Object.keys(directInBalance).length === 0 && directInBalance.constructor === Object)
  //           ) {
  //             directInBalance.balance = directBalance || '0'
  //             directInBalance.usdPrice =
  //               directInBalance.usdPrice > 0 ? directInBalance.usdPrice : directUsdPrice
  //             directInBalance.usdValue =
  //               directInBalance.usdValue > 0 ? directInBalance.usdValue : directUsdValue
  //             supList.unshift(directInBalance)
  //             supList[0].default = true
  //           } else {
  //             // const web3Client = await getWeb3(chain, null)
  //             // const { getSymbol } = tokenMethods
  //             // const lpInstance = await newContractInstance(
  //             //   id,
  //             //   tokenAddress,
  //             //   tokenContract.abi,
  //             //   web3Client,
  //             // )
  //             // const lpSymbol = await getSymbol(lpInstance)
  //             const direct = {
  //               symbol: 'lpSymbol',
  //               address: tokenAddress,
  //               balance: directBalance || '0',
  //               default: true,
  //               usdPrice: directUsdPrice || '0',
  //               usdValue: directUsdValue || '0',
  //               logoURI: 'https://etherscan.io/images/main/empty-token.png',
  //               decimals: tokenDecimals,
  //               chainId: parseInt(chain, 0),
  //             }
  //             supList.unshift(direct)
  //           }

  //           if (supList[0].default) {
  //             if (supList[0].balance === '0' && balances[supList[0].symbol]) {
  //               const defaultBalance = fromWei(
  //                 balances[supList[0].symbol],
  //                 supList[0].decimals,
  //                 supList[0].decimals,
  //               )
  //               const defaultUsdBalance = formatNumber(
  //                 Number(supList[0].usdPrice) * Number(defaultBalance),
  //                 2,
  //               )
  //               supList[0].balance = defaultBalance
  //               supList[0].usdValue = defaultUsdBalance
  //             }
  //             setDefaultToken(supList[0])
  //           } else {
  //             setDefaultToken({})
  //           }
  //           // supList.shift()
  //           setSupTokenList(supList)

  //           const supNoBalanceList = [],
  //             sl = supList.length
  //           if (sl > 0) {
  //             for (let i = 0; i < sl; i += 1) {
  //               if (Number(supList[i].balance) === 0) {
  //                 supNoBalanceList.push(supList[i])
  //               }
  //             }
  //           }
  //           supNoBalanceList.shift()
  //           setSupTokenNoBalanceList(supNoBalanceList)

  //           // const soonSupList = []
  //           // for (let j = 0; j < curBalances.length; j += 1) {
  //           //   const supToken = supList.find(el => el.address === curBalances[j].address)
  //           //   if (!supToken) {
  //           //     soonSupList.push(curBalances[j])
  //           //   }

  //           //   if (Object.keys(directInBalance).length === 0 && tokenAddress.length !== 2) {
  //           //     if (curBalances[j].address.toLowerCase() === tokenAddress.toLowerCase()) {
  //           //       directInBalance = curBalances[j]
  //           //     }
  //           //   }
  //           // }
  //           // setSoonToSupList(soonSupList)
  //           // setSoonToSupList({}) // TODO: remove soonToSupList once confirmed
  //         } else {
  //           let tokenSymbol,
  //             decimals = 18

  //           decimals = useIFARM ? token.data?.watchAsset?.decimals : token.decimals
  //           tokenSymbol = useIFARM ? token.tokenNames[0] : token?.pool?.lpTokenData?.symbol

  //           if (tokenSymbol && tokenSymbol.substring(0, 1) === 'f') {
  //             tokenSymbol = tokenSymbol.substring(1)
  //           }
  //           // const tokenAddress = useIFARM ? addresses.iFARM : token.tokenAddress
  //           const tokenAddress = token.tokenAddress
  //           const tokenId = token?.pool?.id
  //           const tokenBalance = fromWei(
  //             balances[useIFARM ? tokenSymbol : tokenId],
  //             decimals,
  //             decimals,
  //           )
  //           const tokenPrice = useIFARM ? token.data?.lpTokenData?.price : token.usdPrice
  //           const usdValue = formatNumberWido(
  //             Number(tokenBalance) * Number(tokenPrice),
  //             BEGINNERS_BALANCES_DECIMALS,
  //           )
  //           const logoURI =
  //             token.logoUrl.length === 1
  //               ? token.logoUrl[0].substring(1)
  //               : 'https://etherscan.io/images/main/empty-token.png'

  //           const defaultTokenData = {
  //             symbol: tokenSymbol,
  //             address: tokenAddress,
  //             balance: tokenBalance,
  //             default: true,
  //             usdValue,
  //             usdPrice: tokenPrice,
  //             logoURI,
  //             decimals,
  //             chainId: useIFARM ? token.data.chain : token.chain,
  //           }
  //           setDefaultToken(defaultTokenData)
  //         }
  //       }
  //     } catch (err) {
  //       console.log('getTokenBalance: ', err)
  //     }
  //   }
  //   getTokenBalance()
  // }, [
  //   account,
  //   chain,
  //   balances,
  //   hasPortalsError,
  //   getPortalsBalances,
  //   getPortalsBaseTokens,
  //   id,
  //   token,
  //   tokenDecimals,
  //   useIFARM,
  //   addresses.iFARM,
  //   ethers.utils,
  //   setAllTokenList,
  //   setDefaultToken,
  // ])

  // useEffect(() => {
  //   const fetch = async () => {
  //     if (supTokenNoBalanceList && balanceList && filterWord !== undefined && filterWord !== '') {
  //       const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/
  //       if (ethereumAddressRegex.test(filterWord)) {
  //         let TokenDetail = {},
  //           defaultTokenInvolve = false,
  //           balanceListInvolve = false
  //         try {
  //           TokenDetail = (await getPortalsToken(chain, filterWord)) || {}
  //         } catch (e) {
  //           TokenDetail = {}
  //         }
  //         if (Object.keys(TokenDetail).length !== 0) {
  //           TokenDetail = {
  //             ...TokenDetail,
  //             logoURI: TokenDetail.image,
  //             balance: 0,
  //             default: false,
  //             usdValue: 0,
  //             usdPrice: TokenDetail.price,
  //             chain,
  //           }
  //         }
  //         if (Object.keys(TokenDetail).length !== 0) {
  //           setCurSupportedVault(true)
  //           if (!(Object.keys(defaultToken).length === 0 && defaultToken.constructor === Object)) {
  //             if (defaultToken.symbol.includes(TokenDetail.symbol.toLowerCase().trim())) {
  //               defaultTokenInvolve = true
  //               setDefaultCurToken(defaultToken)
  //             } else {
  //               setDefaultCurToken(null)
  //             }
  //           }
  //           if (balanceList.length !== 0) {
  //             const newList = balanceList.filter(el =>
  //               el.symbol.toLowerCase().includes(TokenDetail.symbol.toLowerCase().trim()),
  //             )
  //             if (newList.length > 0) {
  //               balanceListInvolve = true
  //             }
  //             setBalanceTokenList(newList)
  //           }
  //           if (defaultCurToken === null) {
  //             const newList = balanceList.filter(el =>
  //               el.symbol.toLowerCase().includes(TokenDetail.symbol.toLowerCase().trim()),
  //             )
  //             if (newList.length === 0) {
  //               setSupTokenList([TokenDetail])
  //             } else {
  //               setSupTokenList([])
  //             }
  //           } else {
  //             setSupTokenList([])
  //           }
  //           if (supTokenNoBalanceList.length !== 0 && !defaultTokenInvolve && !balanceListInvolve) {
  //             const newList = supTokenNoBalanceList.filter(el =>
  //               el.symbol.toLowerCase().includes(TokenDetail.symbol.toLowerCase().trim()),
  //             )
  //             if (newList.length > 0) {
  //               setSupTokenList(newList)
  //             } else {
  //               setSupTokenList([TokenDetail])
  //             }
  //           }
  //         } else {
  //           setSupTokenList([])
  //           if (!(Object.keys(defaultToken).length === 0 && defaultToken.constructor === Object)) {
  //             setDefaultCurToken(null)
  //           }
  //           setBalanceTokenList([])
  //         }
  //       } else {
  //         if (supTokenNoBalanceList.length !== 0) {
  //           const newList = supTokenNoBalanceList.filter(el =>
  //             el.symbol.toLowerCase().includes(filterWord.toLowerCase().trim()),
  //           )
  //           setSupTokenList(newList)
  //         }
  //         if (
  //           defaultToken &&
  //           !(Object.keys(defaultToken).length === 0 && defaultToken.constructor === Object)
  //         ) {
  //           if (defaultToken.symbol.includes(filterWord.toLowerCase().trim())) {
  //             setDefaultCurToken(defaultToken)
  //           } else {
  //             setDefaultCurToken(null)
  //           }
  //         }
  //         if (balanceList.length !== 0) {
  //           const newList = balanceList.filter(el =>
  //             el.symbol.toLowerCase().includes(filterWord.toLowerCase().trim()),
  //           )
  //           setBalanceTokenList(newList)
  //         }
  //       }
  //     }
  //     if (filterWord === '') {
  //       setSupTokenList(supTokenNoBalanceList)
  //       setBalanceTokenList(balanceList)
  //       setDefaultCurToken(defaultToken)
  //     }
  //   }
  //   fetch()
  // }, [
  //   supTokenNoBalanceList,
  //   balanceList,
  //   chain,
  //   defaultCurToken,
  //   defaultToken,
  //   getPortalsToken,
  //   setCurSupportedVault,
  // ])
  // useEffect(() => {
  //   if (!curSupportedVault && defaultToken) {
  //     setAllTokenList([defaultToken])
  //   } else if (curSupportedVault && supTokenList.length > 0 && balanceTokenList.length > 0) {
  //     const tokenList = [...supTokenList, ...balanceTokenList]
  //     setAllTokenList(tokenList)
  //   }
  // }, [balanceTokenList, supTokenList, setAllTokenList, defaultToken, curSupportedVault])

  return (
    <Modal
      show={showPositionModal}
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
                color="#6988FF"
                size={isMobile ? '18px' : '18px'}
                height={isMobile ? '28px' : '28px'}
                weight="600"
                marginBottom="4px"
              >
                Choose Position
              </NewLabel>
              <NewLabel
                color={fontColor}
                size={isMobile ? '14px' : '14px'}
                height={isMobile ? '20px' : '20px'}
                weight="400"
                marginBottom="5px"
              >
                Displaying positions with any amount of unstaked fTokens.
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
                setShowPositionModal(false)
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
            Loading Position List
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
              {`${countFarm} eligible positions found on ${formatNetworkName(networkName)}`}
            </NewLabel>
            {positions}
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default PositionModal
