import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import ListItem from '../ListItem'
import { useRate } from '../../../providers/Rate'
import { useThemeContext } from '../../../providers/useThemeContext'
import GiftIcon from '../../../assets/images/logos/advancedfarm/gift-01.svg'
import { formatDateTime, formatDateTimeMobile, formatNumber } from '../../../utilities/formats'
import { Content, DetailView, FlexDiv, Badge, NetImg } from './style'

const ActionRow = ({ info }) => {
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const { switchMode, bgColorNew, borderColorBox, hoverColorRow, fontColor } = useThemeContext()

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
        <Content display="flex" width={isMobile ? '25%' : '33%'}>
          <Badge bgColor="#d7def9" color="#2775CA">
            {isMobile ? 'Claim' : 'Rewards Claim'}
          </Badge>
        </Content>
        <Content
          width={isMobile ? '25%' : '33%'}
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
        <Content
          display="flex"
          justifyContent={isMobile ? 'center' : 'start'}
          width={isMobile ? '50%' : '34%'}
        >
          <NetImg>
            <img src={GiftIcon} alt="gift" />
          </NetImg>
          <div>
            <ListItem
              weight={500}
              size={12}
              height={18}
              color="#5FCF76"
              justifyContent={isMobile ? 'end' : 'start'}
              value={`${
                info.rewardsUSD < 0.01
                  ? `<${currencySym}0.01`
                  : `≈${currencySym}${formatNumber(info.rewardsUSD * Number(currencyRate), 2)}`
              }`}
            />
            <ListItem
              weight={500}
              size={isMobile ? 10 : 12}
              height={18}
              color="#8884D8"
              justifyContent={isMobile ? 'end' : 'start'}
              value={info.rewards}
            />
            <ListItem
              weight={400}
              size={isMobile ? 10 : 12}
              height={18}
              color={fontColor}
              justifyContent={isMobile ? 'end' : 'start'}
              value={info.symbol}
            />
          </div>
        </Content>
      </FlexDiv>
    </DetailView>
  )
}
export default ActionRow
