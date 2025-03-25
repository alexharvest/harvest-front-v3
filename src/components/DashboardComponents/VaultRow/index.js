import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import ListItem from '../ListItem'
import { displayAPY, showUsdValueCurrency } from '../../../utilities/formats'
import { useThemeContext } from '../../../providers/useThemeContext'
import { chainList, directDetailUrl } from '../../../constants'
import { useRate } from '../../../providers/Rate'
import ETHEREUM from '../../../assets/images/logos/badge/ethereum.svg'
import Diamond from '../../../assets/images/logos/diamond.svg'
import {
  BadgeIcon,
  Content,
  DetailView,
  FlexDiv,
  LogoImg,
  ContentInner,
  MobileContentContainer,
  Autopilot,
  NewLabel,
} from './style'

const VaultRow = ({ info, lifetimeYield, lastElement, cKey, darkMode }) => {
  const { push } = useHistory()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const {
    switchMode,
    bgColorNew,
    hoverColorRow,
    fontColor1,
    fontColor,
    borderColorBox,
  } = useThemeContext()

  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  const token = info.token
  const chain = token.chain || token.data.chain

  let badgeId = -1
  chainList.forEach((obj, j) => {
    if (obj.chainId === Number(chain)) {
      badgeId = j
    }
  })

  const isSpecialVault = token.liquidityPoolVault || token.poolVault
  const network = chainList[badgeId]?.name.toLowerCase()
  const address = isSpecialVault
    ? token.data.collateralAddress
    : token.vaultAddress || token.tokenAddress
  const url = `${directDetailUrl}${network}/${address}?from=portfolio`

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  return (
    <DetailView
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="position-row"
      key={cKey}
      mode={switchMode}
      background={bgColorNew}
      onClick={e => {
        if (!e.ctrlKey) {
          e.preventDefault()
          push(url)
        }
      }}
    >
      <FlexDiv
        lastElement={lastElement}
        padding={isMobile ? '25px' : '16px 24px'}
        hoverColor={hoverColorRow}
        borderColor={borderColorBox}
      >
        {!isMobile && (
          <>
            <Content width={isMobile ? '100%' : '40%'} display={isMobile ? 'block' : 'flex'}>
              <ContentInner width={isMobile ? '100%' : '50%'} display={isMobile ? 'block' : 'flex'}>
                <BadgeIcon className="network-badge">
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
                {info.platform === 'Autopilot' ? (
                  <Autopilot>
                    <img src={Diamond} width="12" height="12" alt="" />
                    <NewLabel>{info.platform}</NewLabel>
                  </Autopilot>
                ) : (
                  <ListItem
                    weight={400}
                    size={12}
                    height={18}
                    value={info.platform}
                    color={fontColor}
                  />
                )}
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
                value={showUsdValueCurrency(info.balance, currencySym, currencyRate)}
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
                value={
                  lifetimeYield === -1
                    ? '-1'
                    : showUsdValueCurrency(lifetimeYield, currencySym, currencyRate)
                }
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
                value={showUsdValueCurrency(info.totalRewardUsd, currencySym, currencyRate)}
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
                  value={showUsdValueCurrency(info.balance, currencySym, currencyRate)}
                />
              </ContentInner>
              <ContentInner marginTop="25px">
                <ListItem color="#718BC5" weight={500} size={10} height={18} value="Rewards" />
                <ListItem
                  weight={400}
                  size={12}
                  height={18}
                  color={isMobile ? fontColor1 : fontColor}
                  value={showUsdValueCurrency(info.totalRewardUsd, currencySym, currencyRate)}
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
                  value={
                    lifetimeYield === -1
                      ? '-1'
                      : showUsdValueCurrency(lifetimeYield, currencySym, currencyRate)
                  }
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
