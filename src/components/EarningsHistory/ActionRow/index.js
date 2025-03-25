import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { PiQuestion } from 'react-icons/pi'
import ReactTooltip from 'react-tooltip'
import ListItem from '../ListItem'
import { useRate } from '../../../providers/Rate'
import { useThemeContext } from '../../../providers/useThemeContext'
import TrendUp from '../../../assets/images/logos/advancedfarm/trend-up.svg'
import TrendDown from '../../../assets/images/logos/advancedfarm/trend-down.svg'
import {
  formatDateTime,
  formatDateTimeMobile,
  formatNumber,
  showUsdValueCurrency,
} from '../../../utilities/formats'
import { Content, DetailView, FlexDiv, IconWrapper, Badge, NetImg, NewLabel } from './style'

const ActionRow = ({ info, showTotalBalance }) => {
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const {
    darkMode,
    switchMode,
    bgColorNew,
    borderColorBox,
    hoverColorRow,
    fontColor,
  } = useThemeContext()

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  return (
    <DetailView
      className="yield-row"
      borderColor={borderColorBox}
      hoverColor={hoverColorRow}
      mode={switchMode}
      background={bgColorNew}
    >
      <FlexDiv padding={isMobile ? '10px 15px' : '0'}>
        <Content display="flex" width={isMobile ? '25%' : '20%'}>
          <Badge
            bgColor={
              info.event === 'Revert'
                ? '#FEF3F2'
                : info.event === 'Convert'
                ? '#fdeccf'
                : info.netChange >= 0
                ? '#ecfdf3'
                : '#FEF3F2'
            }
            color={
              info.event === 'Revert'
                ? '#B42318'
                : info.event === 'Convert'
                ? '#FF9400'
                : info.netChange >= 0
                ? '#027a48'
                : '#B42318'
            }
          >
            {info.event}
          </Badge>
          {info.event === 'Harvest' && info.netChange < 0 && (
            <IconWrapper>
              <PiQuestion className="question" data-tip data-for="harvest-event-minus" />
              <ReactTooltip
                id="harvest-event-minus"
                backgroundColor={darkMode ? 'white' : '#101828'}
                borderColor={darkMode ? 'white' : 'black'}
                textColor={darkMode ? 'black' : 'white'}
              >
                <NewLabel
                  size={isMobile ? '12px' : '12px'}
                  height={isMobile ? '18px' : '18px'}
                  weight="500"
                >
                  In certain strategies, a negative yield event might occur, resulting in a minor
                  reduction of the underlying.
                  <br />
                  <br />
                  If you have any questions, open a ticket in our Discord.
                </NewLabel>
              </ReactTooltip>
            </IconWrapper>
          )}
        </Content>
        <Content
          width={isMobile ? '30%' : '20%'}
          color={fontColor}
          paddingRight={isMobile ? '8px' : '0px'}
        >
          {isMobile ? (
            <div
              className="timestamp"
              dangerouslySetInnerHTML={formatDateTimeMobile(info.timestamp)}
            />
          ) : (
            <div className="timestamp" dangerouslySetInnerHTML={formatDateTime(info.timestamp)} />
          )}
        </Content>
        {!isMobile ? (
          <>
            <Content width="30%">
              <ListItem
                weight={500}
                size={12}
                height={18}
                color="#5FCF76"
                value={`${
                  info.balanceUsd < 0.01
                    ? `<${currencySym}0.01`
                    : `≈${currencySym}${formatNumber(info.balanceUsd * Number(currencyRate), 2)}`
                }`}
              />
              <ListItem weight={500} size={12} height={18} color="#8884D8" value={info.balance} />
              <ListItem
                weight={400}
                size={12}
                height={18}
                color={fontColor}
                value={info.tokenSymbol}
              />
            </Content>
            <Content display={isMobile ? 'none' : 'flex'} width="30%">
              <NetImg>
                <img src={info.netChange >= 0 ? TrendUp : TrendDown} alt="trend" />
              </NetImg>
              <div>
                <ListItem
                  weight={500}
                  size={12}
                  height={18}
                  color={info.netChangeUsd < 0 ? '#B42318' : '#5FCF76'}
                  value={showUsdValueCurrency(info.netChangeUsd, currencySym, currencyRate)}
                />
                <ListItem
                  weight={500}
                  size={12}
                  height={18}
                  color="#8884D8"
                  value={info.netChange}
                />
                <ListItem
                  weight={400}
                  size={12}
                  height={18}
                  color={fontColor}
                  value={info.tokenSymbol}
                />
              </div>
            </Content>
          </>
        ) : showTotalBalance ? (
          <Content width="45%">
            <ListItem
              weight={500}
              size={12}
              height={20}
              color="#5FCF76"
              justifyContent="end"
              value={`${
                info.balanceUsd < 0.01
                  ? `<${currencySym}0.01`
                  : `≈${currencySym}${formatNumber(info.balanceUsd * Number(currencyRate), 2)}`
              }`}
            />
            <ListItem
              weight={500}
              size={10}
              height={20}
              color="#6988FF"
              justifyContent="end"
              value={info.balance}
            />
            <ListItem
              weight={500}
              size={10}
              height={20}
              color="#6988FF"
              justifyContent="end"
              value={info.tokenSymbol}
            />
          </Content>
        ) : (
          <Content display="flex" width="45%" justifyContent="space-between">
            <NetImg>
              <img src={info.netChange >= 0 ? TrendUp : TrendDown} alt="trend" />
            </NetImg>
            <div>
              <ListItem
                weight={500}
                size={12}
                height={20}
                color={info.netChangeUsd < 0 ? '#B42318' : '#5FCF76'}
                justifyContent="end"
                value={showUsdValueCurrency(info.netChangeUsd, currencySym, currencyRate)}
              />
              <ListItem
                weight={500}
                size={10}
                height={20}
                color="#6988FF"
                justifyContent="end"
                value={info.netChange}
              />
              <ListItem
                weight={500}
                size={10}
                height={20}
                color="#6988FF"
                justifyContent="end"
                value={info.tokenSymbol}
              />
            </div>
          </Content>
        )}
      </FlexDiv>
    </DetailView>
  )
}
export default ActionRow
