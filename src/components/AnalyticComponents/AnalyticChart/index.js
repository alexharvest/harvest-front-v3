import React, { useState, useEffect } from 'react'
import { useThemeContext } from '../../../providers/useThemeContext'
import { usePools } from '../../../providers/Pools'
import { Container, Header, ButtonGroup, ChartDiv, TooltipContent, CurDate } from './style'
import { SPECIAL_VAULTS } from '../../../constants'
import { getTotalTVLData } from '../../../utilities/apiCalls'
import ApexChart from '../ApexChart'
import ChartRangeSelect from '../../ChartRangeSelect'

const recommendLinks = [
  { name: '1D', type: 0, state: '1D' },
  { name: '1W', type: 1, state: '1W' },
  { name: '1M', type: 2, state: '1M' },
  { name: '1Y', type: 3, state: '1Y' },
]

const AnalyticChart = () => {
  const { totalPools } = usePools()

  const farmProfitSharingPool = totalPools.find(
    pool => pool.id === SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID,
  )

  const chainId = farmProfitSharingPool.chain

  const [selectedState, setSelectedState] = useState('1Y')

  const address =
    farmProfitSharingPool.autoStakePoolAddress || farmProfitSharingPool.contractAddress

  const [apiData, setApiData] = useState([])

  const [curDate, setCurDate] = useState('')
  const [curContent, setCurContent] = useState('')

  useEffect(() => {
    const initData = async () => {
      const data = await getTotalTVLData()
      setApiData(data)
    }

    initData()
  }, [address, chainId])

  const { fontColor } = useThemeContext()

  return (
    <>
      <Container fontColor={fontColor}>
        <Header>
          <TooltipContent>
            <CurDate>{curDate}</CurDate>
            <div dangerouslySetInnerHTML={{ __html: curContent }} />
          </TooltipContent>
          <ButtonGroup>
            {recommendLinks.map((item, i) => (
              <ChartRangeSelect
                key={i}
                onClick={() => {
                  setSelectedState(item.state)
                }}
                state={selectedState}
                type={item.type}
                text={item.name}
              />
            ))}
          </ButtonGroup>
        </Header>
        <ChartDiv>
          <ApexChart
            data={apiData}
            range={selectedState}
            setCurDate={setCurDate}
            setCurContent={setCurContent}
          />
        </ChartDiv>
      </Container>
    </>
  )
}
export default AnalyticChart
