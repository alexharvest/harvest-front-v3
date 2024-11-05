import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import ListItem from '../ListItem'
import { displayAPY, formatNumber, formatNumberWido } from '../../../utilities/formats'
import { useThemeContext } from '../../../providers/useThemeContext'
import { chainList, directDetailUrl } from '../../../constants'
import { useRate } from '../../../providers/Rate'
import ETHEREUM from '../../../assets/images/logos/badge/ethereum.svg'
import {
  BadgeIcon,
  Content,
  DetailView,
  FlexDiv,
  LogoImg,
  ContentInner,
  MobileContentContainer,
} from './style'
// import AnimatedDots from '../../AnimatedDots'

const VaultRow = ({ info, lifetimeYield, firstElement, lastElement, cKey, darkMode }) => {
  const { push } = useHistory()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const {
    switchMode,
    backColor,
    hoverColorRow,
    fontColor1,
    fontColor,
    borderColorTable,
  } = useThemeContext()

  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  return (
    <DetailView
      className="position-row"
      firstElement={firstElement}
      lastElement={lastElement}
      borderColor={borderColorTable}
      hoverColor={hoverColorRow}
      key={cKey}
      mode={switchMode}
      background={isMobile ? (darkMode ? '#171B25' : '#fff') : backColor}
      onClick={() => {
        let badgeId = -1
        const token = info.token
        const chain = token.chain || token.data.chain
        chainList.forEach((obj, j) => {
          if (obj.chainId === Number(chain)) {
            badgeId = j
          }
        })
        const isSpecialVault = token.liquidityPoolVault || token.poolVault
        const network = chainList[badgeId].name.toLowerCase()
        const address = isSpecialVault
          ? token.data.collateralAddress
          : token.vaultAddress || token.tokenAddress
        push(`${directDetailUrl + network}/${address}?from=portfolio`)
      }}
    >
      <FlexDiv padding={isMobile ? '25px' : '0'}>
        {!isMobile && (
          <>
            <Content width={isMobile ? '100%' : '40%'} display={isMobile ? 'block' : 'flex'}>
              <ContentInner width={isMobile ? '100%' : '50%'} display={isMobile ? 'block' : 'flex'}>
                <BadgeIcon
                  borderColor={info.status === 'Active' ? '#29ce84' : 'orange'}
                  className="network-badge"
                >
                  <img src={info.chain ? info.chain : ETHEREUM} width="15px" height="15px" alt="" />
                </BadgeIcon>
                {info.logos.length > 0 &&
                  info.logos.map((elem, index) => (
                    <LogoImg
                      key={index}
                      className="coin"
                      marginLeft={index === 0 ? '' : '-7px'}
                      src={elem}
                      alt=""
                    />
                  ))}
              </ContentInner>
              <ContentInner
                width={isMobile ? '100%' : '50%'}
                marginLeft={isMobile ? '0px' : '11px'}
              >
                <ListItem
                  weight={500}
                  size={12}
                  height={18}
                  value={info.symbol}
                  marginTop={isMobile ? 15 : 0}
                  color={fontColor1}
                />
                <ListItem
                  weight={400}
                  size={12}
                  height={18}
                  value={info.platform}
                  color={fontColor}
                />
              </ContentInner>
            </Content>
            <Content width={isMobile ? '25%' : '15%'} marginTop={isMobile ? '15px' : 'unset'}>
              {isMobile && (
                <ListItem color={fontColor} weight={500} size={12} height={18} value="Balance" />
              )}
              <ListItem
                weight={500}
                size={12}
                height={18}
                color={fontColor1}
                value={`${
                  info.balance === 0
                    ? `${currencySym}0.00`
                    : info.balance < 0.01
                    ? `<${currencySym}0.01`
                    : `${currencySym}${formatNumber(info.balance * Number(currencyRate), 2)}`
                }`}
              />
            </Content>
            <Content width={isMobile ? '30%' : '15%'} marginTop={isMobile ? '15px' : 'unset'}>
              {isMobile && (
                <ListItem
                  color={fontColor}
                  weight={500}
                  size={12}
                  height={18}
                  value="Lifetime Yield"
                />
              )}
              <ListItem
                weight={500}
                size={12}
                height={18}
                color={isMobile ? fontColor1 : fontColor}
                value={`${
                  lifetimeYield === -1
                    ? '-1'
                    : lifetimeYield === 0
                    ? `${currencySym}0.00`
                    : lifetimeYield < 0.01
                    ? `<${currencySym}0.01`
                    : `${currencySym}${formatNumber(lifetimeYield * Number(currencyRate), 2)}`
                }`}
              />
            </Content>
            <Content width={isMobile ? '25%' : '15%'} marginTop={isMobile ? '15px' : 'unset'}>
              {isMobile && (
                <ListItem color={fontColor} weight={500} size={12} height={18} value="Rewards" />
              )}
              <ListItem
                weight={500}
                size={12}
                height={18}
                color={isMobile ? fontColor1 : fontColor}
                value={`${
                  info.totalRewardUsd === 0
                    ? `${currencySym}0.00`
                    : info.totalRewardUsd < 0.01
                    ? `<${currencySym}0.01`
                    : `${currencySym}${formatNumberWido(
                        info.totalRewardUsd * Number(currencyRate),
                        2,
                      )}`
                }`}
              />
            </Content>
            <Content width={isMobile ? '20%' : '15%'} marginTop={isMobile ? '15px' : 'unset'}>
              {isMobile && (
                <ListItem color={fontColor} weight={500} size={12} height={18} value="Live APY" />
              )}
              <ListItem
                color={isMobile ? fontColor1 : fontColor}
                weight={500}
                size={12}
                height={18}
                value={
                  info.apy === -1
                    ? 'Inactive'
                    : Number.isNaN(info.apy)
                    ? '-'
                    : `${displayAPY(info.apy)}`
                }
              />
            </Content>
          </>
        )}
        {isMobile && (
          <MobileContentContainer>
            <Content width="33.333%" display="flex" flexDirection="column">
              <ContentInner width={isMobile ? '100%' : '50%'} display={isMobile ? 'block' : 'flex'}>
                {info.logos.length > 0 &&
                  info.logos.map((elem, index) => (
                    <LogoImg
                      key={index}
                      className="coin"
                      marginLeft={index === 0 ? '' : '-7px'}
                      src={elem}
                      alt=""
                    />
                  ))}
              </ContentInner>
              <ContentInner
                width={isMobile ? '100%' : '50%'}
                marginLeft={isMobile ? '0px' : '11px'}
              >
                <ListItem
                  weight={400}
                  size={12}
                  height={18}
                  value={info.symbol}
                  marginTop={10}
                  color={darkMode ? '#D9D9D9' : '#101828'}
                />
              </ContentInner>
              <ContentInner
                width={isMobile ? '100%' : '50%'}
                marginLeft={isMobile ? '0px' : '11px'}
                marginTop="8px"
                display="flex"
                alignItems="center"
              >
                <BadgeIcon
                  borderColor={info.status === 'Active' ? '#29ce84' : 'orange'}
                  className="network-badge"
                >
                  <img src={info.chain ? info.chain : ETHEREUM} width="15px" height="15px" alt="" />
                </BadgeIcon>
                <ListItem
                  weight={400}
                  size={8}
                  height={18}
                  value={info.platform}
                  color={darkMode ? '#D9D9D9' : '#101828'}
                />
              </ContentInner>
            </Content>
            <Content width="33.333%">
              <ContentInner>
                <ListItem color="#718BC5" weight={500} size={10} height={18} value="Balance" />
                <ListItem
                  weight={400}
                  size={12}
                  height={18}
                  color={fontColor1}
                  value={`${
                    info.balance === 0
                      ? `${currencySym}0.00`
                      : info.balance < 0.01
                      ? `<${currencySym}0.01`
                      : `${currencySym}${formatNumber(info.balance * Number(currencyRate), 2)}`
                  }`}
                />
              </ContentInner>
              <ContentInner marginTop="25px">
                <ListItem color="#718BC5" weight={500} size={10} height={18} value="Rewards" />
                <ListItem
                  weight={400}
                  size={12}
                  height={18}
                  color={isMobile ? fontColor1 : fontColor}
                  value={`${
                    info.totalRewardUsd === 0
                      ? `${currencySym}0.00`
                      : info.totalRewardUsd < 0.01
                      ? `<${currencySym}0.01`
                      : `${currencySym}${formatNumberWido(
                          info.totalRewardUsd * Number(currencyRate),
                          2,
                        )}`
                  }`}
                />
              </ContentInner>
            </Content>
            <Content width="33.333%">
              <ContentInner>
                <ListItem
                  color="#718BC5"
                  weight={500}
                  size={10}
                  height={18}
                  value="Lifetime Yield"
                />
                <ListItem
                  weight={400}
                  size={12}
                  height={18}
                  color={isMobile ? fontColor1 : fontColor}
                  value={`${
                    lifetimeYield === -1
                      ? '-1'
                      : lifetimeYield === 0
                      ? `${currencySym}0.00`
                      : lifetimeYield < 0.01
                      ? `<${currencySym}0.01`
                      : `${currencySym}${formatNumber(lifetimeYield * Number(currencyRate), 2)}`
                  }`}
                />
              </ContentInner>
              <ContentInner marginTop="25px">
                <ListItem color="#718BC5" weight={500} size={10} height={18} value="Live APY" />
                <ListItem
                  color={isMobile ? fontColor1 : fontColor}
                  weight={400}
                  size={12}
                  height={18}
                  value={
                    info.apy === -1
                      ? 'Inactive'
                      : Number.isNaN(info.apy)
                      ? '-'
                      : `${displayAPY(info.apy)}`
                  }
                />
              </ContentInner>
            </Content>
          </MobileContentContainer>
        )}
      </FlexDiv>
    </DetailView>
  )
}
export default VaultRow
