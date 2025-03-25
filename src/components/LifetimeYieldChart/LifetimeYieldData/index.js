import React, { useEffect, useState } from 'react'
import { PiQuestion } from 'react-icons/pi'
import ReactTooltip from 'react-tooltip'
import { useMediaQuery } from 'react-responsive'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useWallet } from '../../../providers/Wallet'
import { useRate } from '../../../providers/Rate'
import { Container, Header, ChartDiv, TooltipContent, CurDate, NewLabel } from './style'
import ApexChart from '../ApexChart'
import { formatDate, showUsdValueCurrency } from '../../../utilities/formats'

const LifetimeYieldData = ({ noFarm, totalHistoryData }) => {
  const { connected } = useWallet()
  const { darkMode, fontColor } = useThemeContext()
  const [curDate, setCurDate] = useState('')
  const [curContent, setCurContent] = useState('')
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const nowDate = new Date()
  const currentTimeStamp = Math.floor(nowDate.getTime() / 1000)
  const firstDate = totalHistoryData[totalHistoryData.length - 1]?.timestamp
  const allPeriodDate = ((currentTimeStamp - Number(firstDate)) / (24 * 60 * 60)).toFixed(2)

  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  const handleTooltipContent = payload => {
    if (payload && payload.length) {
      const currentDate = formatDate(payload[0].payload.x)
      const value = Number(payload[0].payload.y) * Number(currencyRate)
      const content = `
          <div style="font-size: 25px; line-height: 38px;">
            <div style="color: #5DCF46; font-weight: 600;">
              ${showUsdValueCurrency(value, currencySym, currencyRate)}
            </div>
          </div>`
      setCurContent(content)
      setCurDate(currentDate)
    }
  }

  return (
    <Container fontColor={fontColor}>
      <Header>
        <TooltipContent>
          <div className="title">
            Lifetime Yield
            <PiQuestion className="question" data-tip data-for="lifetime-yield-desktop" />
            <ReactTooltip
              id="lifetime-yield-desktop"
              backgroundColor={darkMode ? 'white' : '#101828'}
              borderColor={darkMode ? 'white' : 'black'}
              textColor={darkMode ? 'black' : 'white'}
              className="mobile-top-tooltip"
              place="top"
            >
              <NewLabel
                size={isMobile ? '10px' : '12px'}
                height={isMobile ? '15px' : '18px'}
                weight="600"
              >
                This metric represents your wallet&apos;s total lifetime yield from Harvest,
                including both &apos;harvest&apos; events and claimed rewards.
                <br />
                <br />
                Note: Yield from Liquidity Provision activities is not included in this metric or
                its associated chart.
              </NewLabel>
            </ReactTooltip>
          </div>
          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: connected ? curContent : '' }} />
            <CurDate>{curDate}</CurDate>
          </div>
        </TooltipContent>
      </Header>
      <ChartDiv>
        <ApexChart
          noFarm={noFarm}
          data={totalHistoryData}
          range={allPeriodDate}
          handleTooltipContent={handleTooltipContent}
          setCurDate={setCurDate}
          setCurContent={setCurContent}
        />
      </ChartDiv>
    </Container>
  )
}
export default LifetimeYieldData
