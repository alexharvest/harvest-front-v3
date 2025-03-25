import React, { useEffect, useState } from 'react'
import { fromWei } from '../../../../services/web3'
import { useThemeContext } from '../../../../providers/useThemeContext'
import {
  Container,
  Text,
  Vault,
  Content,
  EmptyContainer,
  Label,
  RightText,
  TextSpan,
} from './style'
import AnimatedDots from '../../../AnimatedDots'
import { useWallet } from '../../../../providers/Wallet'
import { usePortals } from '../../../../providers/Portals'
import { useRate } from '../../../../providers/Rate'
import { showTokenBalance } from '../../../../utilities/formats'

const SelectTokenList = ({
  balanceList,
  supTokenNoBalanceList,
  defaultToken,
  soonToSupList,
  setPickedToken,
  setBalance,
  setSelectToken,
  filterWord,
  supportedVault,
  hasPortalsError,
  setFromTokenList,
}) => {
  const { fontColor, fontColor2, hoverColor, activeColorModal } = useThemeContext()
  const [showList, setShowList] = useState(false)
  const [curSupportedVault, setCurSupportedVault] = useState(supportedVault)
  const { chainId } = useWallet()
  const { getPortalsToken } = usePortals()
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  // Supported Token with no balance
  const [supTokenList, setSupTokenList] = useState(supTokenNoBalanceList)
  const [clicksupTokenNoBalanceListId, setClickSupTokenNoBalanceListId] = useState(-1)
  const handleSupTokenNoBalanceListClick = id => {
    setClickSupTokenNoBalanceListId(id)
    setPickedToken(supTokenList[id])
    setBalance(supTokenList[id].balance ? supTokenList[id].balance : 0)
    setSelectToken(false)
  }

  // Supported token with balance in my wallet
  const [balanceTokenList, setBalanceTokenList] = useState(balanceList)
  const [clickBalanceListId, setClickBalanceListId] = useState(-1)
  const handleBalanceListClick = id => {
    setClickBalanceListId(id)
    setPickedToken(balanceTokenList[id])
    setBalance(
      balanceTokenList[id].balance
        ? fromWei(
            balanceTokenList[id].rawBalance,
            balanceTokenList[id].decimals,
            balanceTokenList[id].decimals,
          )
        : 0,
    )
    setSelectToken(false)
  }

  // Default Token
  const handleDefaultToken = () => {
    setClickBalanceListId(-1)
    setClickSupTokenNoBalanceListId(-1)
    setPickedToken(defaultToken)
    setBalance(defaultToken.balance ? defaultToken.balance : 0)
    setSelectToken(false)
  }

  const [defaultCurToken, setDefaultCurToken] = useState(defaultToken)

  useEffect(() => {
    const fetch = async () => {
      if (supTokenNoBalanceList && balanceList && filterWord !== undefined && filterWord !== '') {
        const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/
        if (ethereumAddressRegex.test(filterWord)) {
          let TokenDetail = {},
            defaultTokenInvolve = false,
            balanceListInvolve = false
          try {
            TokenDetail = (await getPortalsToken(chainId, filterWord)) || {}
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
              chainId,
            }
          }
          if (Object.keys(TokenDetail).length !== 0) {
            setCurSupportedVault(true)
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
              if (newList.length === 0) setSupTokenList([TokenDetail])
              else setSupTokenList([])
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
          if (!(Object.keys(defaultToken).length === 0 && defaultToken.constructor === Object)) {
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
  }, [filterWord, supTokenNoBalanceList, balanceList, chainId, setCurSupportedVault]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const count =
      defaultToken &&
      !(Object.keys(defaultToken).length === 0 && defaultToken.constructor === Object)
        ? 1
        : 0 +
          (balanceList && balanceList.length) +
          (supTokenNoBalanceList && supTokenNoBalanceList.length) +
          (soonToSupList && soonToSupList.length)
    if (count > 0) {
      setShowList(true)
    }
  }, [defaultToken, balanceList, supTokenNoBalanceList, soonToSupList])

  return (
    <>
      {showList ? (
        <Content>
          {defaultCurToken &&
            !(
              Object.keys(defaultCurToken).length === 0 && defaultCurToken.constructor === Object
            ) && (
              <>
                <Label fontColor={fontColor} padding="15px 24px 0px">
                  Default token
                </Label>
                <Container
                  onClick={() => {
                    handleDefaultToken()
                    setFromTokenList(true)
                  }}
                  hoverColor={hoverColor}
                  activeColor={activeColorModal}
                >
                  <img src={defaultCurToken.logoURI} width={26} height={26} alt="" />
                  <Vault>
                    <Text weight={600} color={fontColor2}>
                      {defaultCurToken.symbol}
                    </Text>
                    <RightText weight={600} color={fontColor2}>
                      <>
                        {defaultCurToken.balance ? showTokenBalance(defaultCurToken.balance) : '0'}
                      </>
                      <TextSpan fontColor2={fontColor2}>
                        {defaultCurToken.usdValue
                          ? `${currencySym}${(
                              defaultCurToken.usdValue * Number(currencyRate)
                            ).toFixed(2)}`
                          : `${currencySym}0.00`}
                      </TextSpan>
                    </RightText>
                  </Vault>
                </Container>
              </>
            )}
          {!hasPortalsError && balanceTokenList.length > 0 && (
            <>
              <Label fontColor={fontColor} padding="15px 24px 0px">
                {curSupportedVault ? 'Supported tokens in your wallet' : 'Soon to be supported'}
              </Label>
              {balanceTokenList.map((data, i) => {
                return (
                  <Container
                    key={i}
                    className={i === clickBalanceListId ? 'active' : ''}
                    onClick={() => {
                      if (curSupportedVault) handleBalanceListClick(i)
                      setFromTokenList(true)
                    }}
                    cursor={curSupportedVault ? 'pointer' : 'not-allowed'}
                    hoverColor={hoverColor}
                    activeColor={activeColorModal}
                  >
                    <img src={data.logoURI} width={26} height={26} alt="" />
                    <Vault>
                      <Text weight={600} color={fontColor2}>
                        {data.symbol}
                      </Text>
                      <RightText weight={600} color={fontColor2}>
                        <>{data.balance ? showTokenBalance(data.balance) : '0'}</>
                        <TextSpan fontColor2={fontColor2}>
                          {data.usdValue
                            ? `${currencySym}${(data.usdValue * Number(currencyRate)).toFixed(2)}`
                            : `${currencySym}0`}
                        </TextSpan>
                      </RightText>
                    </Vault>
                  </Container>
                )
              })}
            </>
          )}
          {!hasPortalsError && supTokenList.length > 0 && (
            <>
              <Label
                fontColor={fontColor}
                padding="15px 24px 0px"
                showLabel={curSupportedVault ? 'block' : 'none'}
              >
                {curSupportedVault
                  ? `Other supported convert tokens, which you don't have on your wallet`
                  : `Other, currently unsupported tokens, which you don't have in your wallet`}
              </Label>
              {supTokenList.map((data, i) => (
                <Container
                  key={i}
                  className={i === clicksupTokenNoBalanceListId ? 'active' : ''}
                  onClick={() => {
                    if (curSupportedVault) handleSupTokenNoBalanceListClick(i)
                    setFromTokenList(true)
                  }}
                  cursor={curSupportedVault ? 'pointer' : 'not-allowed'}
                  hoverColor={hoverColor}
                  activeColor={activeColorModal}
                >
                  <img src={data.logoURI} width={26} height={26} alt="" />
                  <Vault>
                    <Text weight={600} color={fontColor2}>
                      {data.symbol}
                    </Text>
                    <RightText weight={600} color={fontColor2}>
                      <>{data.balance ? data.balance : '0'}</>
                      <TextSpan fontColor2={fontColor2}>{`${currencySym}0`}</TextSpan>
                    </RightText>
                  </Vault>
                </Container>
              ))}
            </>
          )}
          {!hasPortalsError && soonToSupList.length > 0 && (
            <>
              <Label fontColor={fontColor} padding="0px 24px">
                Soon to be supported
              </Label>
              {soonToSupList.map((data, i) => (
                <Container key={i} hoverColor={hoverColor} activeColor={activeColorModal}>
                  <img src={data.logoURI} width={26} height={26} alt="" />
                  <Vault>
                    <Text weight={600} color={fontColor2}>
                      {data.symbol}
                    </Text>
                    <RightText weight={600} color={fontColor2}>
                      <>{data.balance ? `${1 * fromWei(data.balance, data.decimals)}` : '0.00'}</>
                      <TextSpan fontColor2={fontColor2}>{`${currencySym}0`}</TextSpan>
                    </RightText>
                  </Vault>
                </Container>
              ))}
            </>
          )}
          {defaultCurToken === null &&
            supTokenList.length === 0 &&
            balanceTokenList.length === 0 &&
            Object.keys(soonToSupList).length === 0 &&
            filterWord !== '' && (
              <EmptyContainer fontColor={fontColor} cursor="not-allowed">
                Not Found
              </EmptyContainer>
            )}
        </Content>
      ) : (
        <EmptyContainer fontColor={fontColor}>
          Loading Token list
          <AnimatedDots />
        </EmptyContainer>
      )}
    </>
  )
}
export default SelectTokenList
