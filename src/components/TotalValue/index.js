import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Tooltip } from 'react-tooltip'
import { PiQuestion } from 'react-icons/pi'
import { formatNumber } from '../../utilities/formats'
import { useThemeContext } from '../../providers/useThemeContext'
import AnimatedDots from '../AnimatedDots'
import { Container, Div, Price, NewLabel, BetaBadge } from './style'
import { useRate } from '../../providers/Rate'

const TotalValue = ({
  content,
  price,
  toolTipTitle,
  toolTip,
  connected,
  isLoading,
  farmTokenListLength,
}) => {
  const { darkMode, fontColor1, fontColor3 } = useThemeContext()
  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])
  return (
    <Container>
      <Div $fontcolor3={fontColor3}>
        {content}
        {content === 'Lifetime Yield' && <BetaBadge>Beta</BetaBadge>}
        <PiQuestion className="question" data-tip data-for={toolTipTitle} color="#718BC5" />
        <Tooltip
          id={toolTipTitle}
          backgroundColor={darkMode ? 'white' : '#101828'}
          borderColor={darkMode ? 'white' : 'black'}
          textColor={darkMode ? 'black' : 'white'}
          place="bottom"
        >
          <NewLabel
            $size={isMobile ? '10px' : '12px'}
            $height={isMobile ? '15px' : '18px'}
            $weight="600"
          >
            {toolTip}
          </NewLabel>
        </Tooltip>
      </Div>
      <Price $fontcolor1={fontColor1}>
        {!connected || isLoading ? (
          `${currencySym}0.00`
        ) : farmTokenListLength === 0 && price === 0 ? (
          `${currencySym}0.00`
        ) : parseFloat(price) === 0 ? (
          content.includes('Rewards') ? (
            `${currencySym}0.00`
          ) : (
            <AnimatedDots />
          )
        ) : content === 'Lifetime Yield' && parseFloat(price) === -1 ? (
          `${currencySym}0.00`
        ) : parseFloat(price) < 0.01 ? (
          `<${currencySym}0.01`
        ) : (
          `${currencySym}${formatNumber(price * Number(currencyRate), 2)}`
        )}
      </Price>
    </Container>
  )
}

export default TotalValue
