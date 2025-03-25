import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  Content,
  DetailView,
  FlexDiv,
  ContentInner,
  TopFiveText,
  MobileGranularBlock,
} from './style'
import { useThemeContext } from '../../../providers/useThemeContext'
import ARBITRUM from '../../../assets/images/chains/arbitrum.svg'
import BASE from '../../../assets/images/chains/base.svg'
import ETHEREUM from '../../../assets/images/logos/badge/ethereum.svg'
import POLYGON from '../../../assets/images/logos/badge/polygon.svg'
import ZKSYNC from '../../../assets/images/logos/badge/zksync.svg'
import ListItem from '../ListItem'
import { truncateAddress, formatNumber } from '../../../utilities/formats'
import { useRate } from '../../../providers/Rate'
import { chainList } from '../../../constants'
import ChevronUp from '../../../assets/images/ui/chevron-up.svg'
import ChevronDown from '../../../assets/images/ui/chevron-down.svg'
import { getTokenNames, handleToggle } from '../../../utilities/parsers'

const HolderRow = ({ value, cKey, accounts, groupOfVaults, lastItem, selectedItem, darkMode }) => {
  const [isExpand, setIsExpand] = useState(false)
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)
  const [walletApy, setWalletApy] = useState(0)
  const [monthlyYield, setMonthlyYield] = useState(0)

  const BadgeAry = [ETHEREUM, POLYGON, ARBITRUM, BASE, ZKSYNC]
  const networkNames = ['ethereum', 'polygon', 'arbitrum', 'base', 'zksync']
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const { borderColorBox, hoverColor, fontColor1 } = useThemeContext()
  const { rates } = useRate()

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  const matchedTokenNames = getTokenNames(value, groupOfVaults)

  const getPlatformName = vaultAddress => {
    const vaultData = Object.values(groupOfVaults).find(vault => {
      if (vault.vaultAddress && vaultAddress) {
        return vault.vaultAddress.toLowerCase() === vaultAddress.toLowerCase()
      }
      return false
    })
    const platformName = vaultData ? vaultData.platform : ''

    return platformName
  }

  const getBadgeId = vaultAddress => {
    const vaultData = Object.values(groupOfVaults).find(vault => {
      if (vault.vaultAddress && vaultAddress) {
        return vault.vaultAddress.toLowerCase() === vaultAddress.toLowerCase()
      }
      return false
    })
    const chain = vaultData ? vaultData.chain : ''

    for (let i = 0; i < chainList.length; i += 1) {
      if (chainList[i].chainId === Number(chain)) {
        return i
      }
    }
    return -1
  }

  const userHarvestBalance = value.totalBalance

  useEffect(() => {
    if (value) {
      const calculatedApy = ((1 + value.totalDailyYield / value.totalBalance) ** 365 - 1) * 100
      const calculatedYield =
        ((1 + value.totalDailyYield / value.totalBalance) ** 30 - 1) * value.totalBalance
      setWalletApy(calculatedApy)
      setMonthlyYield(calculatedYield * currencyRate)
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  const allocationValue = (walletApy * userHarvestBalance * currencyRate) / 100

  return isMobile ? (
    <DetailView
      borderColor={borderColorBox}
      hoverColor={hoverColor}
      key={cKey}
      onClick={handleToggle(setIsExpand)}
    >
      <FlexDiv>
        <Content display="flex" width="100%">
          <ContentInner
            width="50%"
            display="flex"
            justifyContent="space-between"
            padding="18px 28px 18px 16px"
            flexDirection="column"
          >
            <ListItem
              weight={400}
              size="12px"
              marginTop="0px"
              lineHeight="23px"
              color={darkMode ? '#ffffff' : '#475467'}
              rankingValue={`#${cKey}`}
              walletAddress={truncateAddress(accounts)}
              addressValue={accounts}
            />
            <ListItem
              weight={400}
              size="12px"
              marginTop="0px"
              lineHeight="23px"
              color={fontColor1}
              balanceValue={`${currencySym}${formatNumber(userHarvestBalance * currencyRate, 2)}`}
              justifyContent="space-between"
            />
            <ListItem
              weight={400}
              size="12px"
              marginTop="0px"
              lineHeight="23px"
              color={fontColor1}
              farmsNumber={matchedTokenNames.length}
            />
          </ContentInner>
          <ContentInner
            width="50%"
            display="flex"
            padding="18px 16px 18px 28px"
            flexDirection="column"
          >
            {selectedItem === 'Efficiency' ? (
              <>
                <ListItem
                  weight={400}
                  size="14px"
                  marginTop="0px"
                  color="#5FCF76"
                  value={
                    walletApy > 0 && walletApy < 0.01
                      ? `<0.01% APY`
                      : `${formatNumber(walletApy, 2)}% APY`
                  }
                  allocationValue={allocationValue}
                  justifyContent="end"
                />
                <ListItem
                  weight={400}
                  size="10px"
                  marginTop="0px"
                  color="#6988FF"
                  value={
                    allocationValue > 0 && allocationValue < 0.01
                      ? `<${currencySym}0.01/yr`
                      : `${currencySym}${formatNumber(allocationValue, 2)}/yr`
                  }
                  allocationValue={allocationValue}
                  justifyContent="end"
                />
              </>
            ) : (
              Object.entries(value.vaults)
                .slice(0, 1)
                .map(([vaultKey, vaultValue]) => {
                  return selectedItem === 'Top Allocation' ? (
                    <ListItem
                      key={`${vaultKey}-${cKey}`}
                      topAllocation={`${currencySym}${formatNumber(
                        vaultValue.balance * currencyRate,
                        2,
                      )}`}
                      tokenName={matchedTokenNames[0]}
                      platform={getPlatformName(vaultKey)}
                      chain={BadgeAry[getBadgeId(vaultKey)]}
                      weight={400}
                      size="14px"
                      marginTop="0px"
                      color="#5FCF76"
                      flexDirection="column"
                    />
                  ) : selectedItem === 'Monthly Yield' ? (
                    <ListItem
                      key={`${vaultKey}-${vaultKey}`}
                      weight={400}
                      size="12px"
                      color="#5FCF76"
                      backColor="rgba(95, 207, 118, 0.2)"
                      borderRadius="16px"
                      padding="2px 8px"
                      justifyContent="end"
                      value={`${currencySym}${formatNumber(monthlyYield, 2)}/mo`}
                    />
                  ) : (
                    <></>
                  )
                })
            )}
          </ContentInner>
        </Content>
      </FlexDiv>
      {isExpand && (
        <>
          <FlexDiv>
            <Content padding="0px 0px 0px 16px">
              <ContentInner
                width={isMobile ? '100%' : '100%'}
                display={isMobile ? 'block' : 'flex'}
              >
                <TopFiveText>Displaying top 5 positions</TopFiveText>
              </ContentInner>
            </Content>
          </FlexDiv>
          <Content padding="12px 0px 16px 16px">
            <ContentInner width={isMobile ? '100%' : '100%'} display={isMobile ? 'block' : 'flex'}>
              <div style={{ paddingLeft: '0px', margin: 0 }}>
                {Object.entries(value.vaults)
                  .slice(0, 5)
                  .map(([vaultKey, vaultValue], index) => {
                    const itemApy =
                      (((vaultValue.dailyYield
                        ? vaultValue.dailyYield
                        : 0 + vaultValue.dailyReward
                        ? vaultValue.dailyReward
                        : 0) /
                        vaultValue.balance +
                        1) **
                        365 -
                        1) *
                      100
                    return (
                      <div
                        key={vaultKey}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '10px',
                          position: 'relative',
                        }}
                      >
                        <MobileGranularBlock>
                          <ListItem
                            value={`${currencySym}${formatNumber(
                              vaultValue.balance * currencyRate,
                              2,
                            )}`}
                            weight={500}
                            size="10px"
                            marginTop="0px"
                            marginRight="10px"
                            color="#5FCF76"
                          />
                          <ListItem
                            value={matchedTokenNames[index]}
                            weight={500}
                            size="12px"
                            marginTop="0px"
                            marginRight="10px"
                            imgMargin="5px"
                            color={darkMode ? '#ffffff' : '#414141'}
                            platform={getPlatformName(vaultKey)}
                            chain={BadgeAry[getBadgeId(vaultKey)]}
                            networkName={networkNames[getBadgeId(vaultKey)]}
                            vaultAddress={vaultKey}
                            textDecoration="underline"
                            marginLeft="0px"
                            width="115%"
                          />
                        </MobileGranularBlock>
                        <MobileGranularBlock paddingRight="16px">
                          <ListItem
                            weight={500}
                            size="10px"
                            marginTop="0px"
                            marginRight="10px"
                            color="#5FCF76"
                            value={`${formatNumber(itemApy, 2)}% APY`}
                            justifyContent="end"
                          />
                          <ListItem
                            weight={500}
                            size="10px"
                            marginTop="0px"
                            color="#6988FF"
                            value={`${currencySym}${formatNumber(
                              (itemApy * vaultValue.balance * currencyRate) / 100,
                              2,
                            )}/yr`}
                            justifyContent="end"
                          />
                        </MobileGranularBlock>
                      </div>
                    )
                  })}
              </div>
            </ContentInner>
          </Content>
        </>
      )}
    </DetailView>
  ) : (
    <DetailView
      borderColor={borderColorBox}
      hoverColor={hoverColor}
      key={cKey}
      lastItem={lastItem}
      onClick={handleToggle(setIsExpand)}
    >
      <FlexDiv>
        <Content width="100%" display="flex">
          <ContentInner width="10%" display="flex">
            <ListItem
              weight={500}
              size="14px"
              marginTop="0px"
              color={fontColor1}
              value={`#${cKey}`}
            />
          </ContentInner>
          <ContentInner width="15%">
            <ListItem
              weight={400}
              size="14px"
              marginTop="0px"
              color={fontColor1}
              showAddress={truncateAddress(accounts)}
              addressValue={accounts}
            />
          </ContentInner>
          <ContentInner width="15%">
            <ListItem
              weight={400}
              size="14px"
              marginTop="0px"
              color={darkMode ? '#ffffff' : '#475467'}
              value={`${currencySym}${formatNumber(userHarvestBalance * currencyRate, 2)}`}
            />
          </ContentInner>
          <ContentInner width="15%">
            <ListItem
              value={matchedTokenNames.length}
              weight={400}
              size="14px"
              marginTop="0px"
              color={darkMode ? '#ffffff' : '#475467'}
            />
          </ContentInner>
          <ContentInner width="15%">
            {Object.entries(value.vaults)
              .slice(0, 1)
              .map(([vaultKey, vaultValue]) => {
                return (
                  <React.Fragment key={vaultKey}>
                    <ListItem
                      value={`${currencySym}${formatNumber(vaultValue.balance * currencyRate, 2)}`}
                      weight={400}
                      size="14px"
                      marginTop="0px"
                      color="#5FCF76"
                    />
                    <ListItem
                      value={matchedTokenNames[0]}
                      weight={400}
                      size="10px"
                      marginTop="0px"
                      color="#6988FF"
                      platform={getPlatformName(vaultKey)}
                      chain={BadgeAry[getBadgeId(vaultKey)]}
                    />
                  </React.Fragment>
                )
              })}
          </ContentInner>
          <ContentInner width="15%">
            <ListItem
              weight={400}
              size="14px"
              marginTop="0px"
              color="#5FCF76"
              value={
                walletApy > 0 && walletApy < 0.01
                  ? `<0.01% APY`
                  : walletApy === 0
                  ? `Apy Zero`
                  : `${formatNumber(walletApy, 2)}% APY`
              }
              allocationValue={allocationValue}
            />
            <ListItem
              weight={400}
              size="10px"
              marginTop="0px"
              color="#6988FF"
              value={
                allocationValue > 0 && allocationValue < 0.01
                  ? `<${currencySym}0.01/yr`
                  : allocationValue === 0
                  ? 'Apy Zero'
                  : `${currencySym}${formatNumber(allocationValue, 2)}/yr`
              }
              allocationValue={allocationValue}
            />
          </ContentInner>
          <ContentInner width="15%">
            <ListItem
              weight={400}
              size="12px"
              marginTop={isMobile ? 10 : 0}
              color="#5FCF76"
              backColor="rgba(95, 207, 118, 0.2)"
              borderRadius="16px"
              padding="2px 8px"
              justifyContent="center"
              value={
                monthlyYield > 0 && monthlyYield < 0.01
                  ? `<${currencySym}0.01/mo`
                  : `${currencySym}${formatNumber(monthlyYield, 2)}/mo`
              }
            />
          </ContentInner>
          <ContentInner
            width={isMobile ? '5%' : '2%'}
            display="flex"
            justifyContent="center"
            fontSize="18px"
          >
            {!isExpand ? (
              <img
                src={ChevronDown}
                alt="Chevron Down"
                style={{
                  filter: darkMode
                    ? 'invert(100%) sepia(100%) saturate(0%) hue-rotate(352deg) brightness(101%) contrast(104%)'
                    : '',
                }}
              />
            ) : (
              <img
                src={ChevronUp}
                alt="Chevron Up"
                style={{
                  filter: darkMode
                    ? 'invert(100%) sepia(100%) saturate(0%) hue-rotate(352deg) brightness(101%) contrast(104%)'
                    : '',
                }}
              />
            )}
          </ContentInner>
        </Content>
      </FlexDiv>
      {isExpand && (
        <>
          <FlexDiv>
            <Content padding="12px 0px 0px 0px">
              <ContentInner
                width={isMobile ? '100%' : '100%'}
                display={isMobile ? 'block' : 'flex'}
              >
                <TopFiveText color={darkMode ? '#ffffff' : '#101828'}>
                  Displaying top 5 positions
                </TopFiveText>
              </ContentInner>
            </Content>
          </FlexDiv>
          <Content padding="12px 0px 16px 0px">
            <ContentInner width={isMobile ? '100%' : '100%'} display={isMobile ? 'block' : 'flex'}>
              <div style={{ paddingLeft: '0px', margin: 0 }}>
                {Object.entries(value.vaults)
                  .slice(0, 5)
                  .map(([vaultKey, vaultValue], index) => {
                    const itemApy =
                      (((vaultValue.dailyYield
                        ? vaultValue.dailyYield
                        : 0 + vaultValue.dailyReward
                        ? vaultValue.dailyReward
                        : 0) /
                        vaultValue.balance +
                        1) **
                        365 -
                        1) *
                      100
                    return (
                      <div
                        key={vaultKey}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '10px',
                          position: 'relative',
                        }}
                      >
                        <ListItem
                          value={`${currencySym}${formatNumber(
                            vaultValue.balance * currencyRate,
                            2,
                          )}`}
                          weight={500}
                          size="12px"
                          marginTop="0px"
                          marginRight="10px"
                          color="#5FCF76"
                        />
                        <ListItem
                          value={matchedTokenNames[index]}
                          weight={500}
                          size="12px"
                          marginTop="0px"
                          marginRight="10px"
                          imgMargin="10px"
                          color={darkMode ? '#ffffff' : '#414141'}
                          platform={getPlatformName(vaultKey)}
                          chain={BadgeAry[getBadgeId(vaultKey)]}
                          networkName={networkNames[getBadgeId(vaultKey)]}
                          vaultAddress={vaultKey}
                          textDecoration="underline"
                        />
                        <ListItem
                          weight={500}
                          size="12px"
                          marginTop="0px"
                          marginRight="10px"
                          color="#5FCF76"
                          value={`${formatNumber(itemApy, 2)}% APY`}
                        />
                        <ListItem
                          weight={500}
                          size="12px"
                          marginTop="0px"
                          color="#6988FF"
                          value={`${currencySym}${formatNumber(
                            (itemApy * vaultValue.balance * currencyRate) / 100,
                            2,
                          )}/yr`}
                        />
                      </div>
                    )
                  })}
              </div>
            </ContentInner>
          </Content>
        </>
      )}
    </DetailView>
  )
}

export default HolderRow
