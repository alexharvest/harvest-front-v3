import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import apyActive from '../../../assets/images/logos/earn/percent-circle.svg'
import tvlActive from '../../../assets/images/logos/earn/bank.svg'
import myBalanceActive from '../../../assets/images/logos/earn/chart-graph.svg'
import { addresses } from '../../../data/index'
import {
  getDataQuery,
  getSequenceId,
  getTotalTVLData,
  getIPORSequenceId,
  getIPORDataQuery,
} from '../../../utilities/apiCalls'
import { formatDate, numberWithCommas } from '../../../utilities/formats'
import { useThemeContext } from '../../../providers/useThemeContext'
import ApexChart from '../ApexChart'
import ChartButtonsGroup from '../ChartButtonsGroup'
import ChartRangeSelect from '../../ChartRangeSelect'
import { useRate } from '../../../providers/Rate'
import { fromWei } from '../../../services/web3'
import { calculateApy, handleToggle } from '../../../utilities/parsers'
import {
  ButtonGroup,
  ChartDiv,
  Container,
  FilterGroup,
  Header,
  Total,
  CurDate,
  TooltipInfo,
  FlexDiv,
  LabelInfo,
  ToggleButton,
  ChevronIcon,
} from './style'

const filterList = [
  { id: 1, name: 'APY', img: apyActive },
  { id: 2, name: 'TVL in USD', img: tvlActive },
  { id: 3, name: 'Share Price', img: myBalanceActive },
]

const recommendLinks = [
  { name: '1W', type: 1, state: '1W' },
  { name: '1M', type: 2, state: '1M' },
  { name: '1Y', type: 3, state: '1Y' },
  { name: 'ALL', type: 4, state: 'ALL' },
]

const FarmDetailChart = ({
  token,
  vaultPool,
  lastTVL,
  lastAPY,
  set7DApy,
  set30DApy,
  set180DApy,
  set360DApy,
  setLifetimeApy,
  setVaultBirthday,
  setVaultTotalPeriod,
  setLatestSharePrice,
  set7DHarvest,
  set30DHarvest,
  set180DHarvest,
  set360DHarvest,
  setHarvestFrequency,
}) => {
  const { darkMode, fontColor3, fontColor4 } = useThemeContext()

  const [clickedId, setClickedId] = useState(2)
  const [selectedState, setSelectedState] = useState('1Y')
  const [apiData, setApiData] = useState({})
  const [iFarmTVLData, setIFarmTVLData] = useState({})
  const [curDate, setCurDate] = useState('')
  const [curContent, setCurContent] = useState('')
  const [tooltipLabel, setTooltipLabel] = useState('')
  const [roundNumber, setRoundNumber] = useState(0)
  const [fixedLen, setFixedLen] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const { rates } = useRate()
  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])
  const isIFARM = token.tokenAddress === addresses.FARM
  const address = isIFARM
    ? token.tokenAddress
    : token.vaultAddress || vaultPool.autoStakePoolAddress || vaultPool.contractAddress
  const chainId = token.chain || token.data.chain

  const handleTooltipContent = payload => {
    if (payload && payload.length) {
      setCurDate(formatDate(payload[0].payload.x))
      const content = numberWithCommas(
        (Number(payload[0].payload.y) * (clickedId === 1 ? Number(currencyRate) : 1)).toFixed(
          clickedId === 1 ? 2 : clickedId === 0 ? fixedLen : roundNumber,
        ),
      )
      setCurContent(content)
    }
  }

  useEffect(() => {
    const label = clickedId === 0 ? 'APY' : clickedId === 1 ? 'TVL' : 'Share Price'
    setTooltipLabel(label)
  }, [clickedId])

  useEffect(() => {
    let isMounted = true
    const initData = async () => {
      if (address && chainId) {
        try {
          const { vaultTVLCount } = token.isIPORVault
            ? await getIPORSequenceId(address.toLowerCase(), chainId)
            : await getSequenceId(address, chainId)
          const data = token.isIPORVault
            ? await getIPORDataQuery(address.toLowerCase(), chainId, vaultTVLCount, false)
            : await getDataQuery(address, chainId, vaultTVLCount, false)
          const filteredData = {
            ...data,
            generalApies: data.generalApies.filter(entry => parseFloat(entry.apy) <= 100000),
          }
          const updatedData = { ...filteredData }
          updatedData.vaultHistories = updatedData.vaultHistories.filter(
            history => history.sharePrice !== '0',
          )

          updatedData.vaultHistories.forEach(item => {
            if (item.sharePrice === '1') {
              item.sharePrice = '1000000000000000000'
            }
          })

          let [sevenDaysApy, thirtyDaysApy, oneEightyDaysApy, threeSixtyFiveDaysApy] = Array(
              4,
            ).fill('-'),
            [
              sevenDaysHarvest,
              thirtyDaysHarvest,
              oneEightyDaysHarvest,
              threeSixtyFiveDaysHarvest,
            ] = Array(4).fill('-'),
            lifetimeApyValue = 0,
            frequencyOfHarvest = '-',
            latestSharePriceValue = '-',
            vaultInitialDate = '-',
            totalPeriod = '-'

          if (updatedData.vaultHistories.length !== 0) {
            latestSharePriceValue = fromWei(
              updatedData.vaultHistories[0].sharePrice,
              token.decimals || token.data.watchAsset.decimals,
              token.decimals || token.data.watchAsset.decimals,
              false,
            )

            const totalPeriodBasedOnSharePrice =
              (Number(updatedData.vaultHistories[0].timestamp) -
                Number(
                  updatedData.vaultHistories[updatedData.vaultHistories.length - 1].timestamp,
                )) /
              (24 * 3600)

            frequencyOfHarvest = updatedData.vaultHistories.length / totalPeriodBasedOnSharePrice

            // Calculate Harvest Frequency
            if (totalPeriodBasedOnSharePrice >= 7) {
              const lastSevenDaysData = updatedData.vaultHistories.filter(
                entry =>
                  Number(entry.timestamp) >=
                  Number(updatedData.vaultHistories[0].timestamp) - 7 * 24 * 3600,
              )
              sevenDaysHarvest = lastSevenDaysData.length / 7
            }

            if (totalPeriodBasedOnSharePrice >= 30) {
              const lastSevenDaysData = updatedData.vaultHistories.filter(
                entry =>
                  Number(entry.timestamp) >=
                  Number(updatedData.vaultHistories[0].timestamp) - 30 * 24 * 3600,
              )
              thirtyDaysHarvest = lastSevenDaysData.length / 30
            }

            if (totalPeriodBasedOnSharePrice >= 180) {
              const lastSevenDaysData = updatedData.vaultHistories.filter(
                entry =>
                  Number(entry.timestamp) >=
                  Number(updatedData.vaultHistories[0].timestamp) - 180 * 24 * 3600,
              )
              oneEightyDaysHarvest = lastSevenDaysData.length / 180
            }

            if (totalPeriodBasedOnSharePrice >= 365) {
              const lastSevenDaysData = updatedData.vaultHistories.filter(
                entry =>
                  Number(entry.timestamp) >=
                  Number(updatedData.vaultHistories[0].timestamp) - 365 * 24 * 3600,
              )
              threeSixtyFiveDaysHarvest = lastSevenDaysData.length / 365
            }
          }

          if (updatedData.vaultHistories.length !== 0) {
            // Calculate Detailed APY Breakdown values
            const totalPeriodBasedOnSharePrice =
              (Number(updatedData.vaultHistories[0].timestamp) -
                Number(
                  updatedData.vaultHistories[updatedData.vaultHistories.length - 1].timestamp,
                )) /
              (24 * 3600)

            const sharePriceVal = latestSharePriceValue === '-' ? 1 : Number(latestSharePriceValue)
            lifetimeApyValue = `${(
              ((sharePriceVal - 1) / (totalPeriodBasedOnSharePrice / 365)) *
              100
            ).toFixed(2)}%`

            // Calculate APY - Live & Historical Average
            if (totalPeriodBasedOnSharePrice >= 7) {
              sevenDaysApy = calculateApy(
                updatedData.vaultHistories,
                latestSharePriceValue,
                token,
                7,
              )
            }

            if (totalPeriodBasedOnSharePrice >= 30) {
              thirtyDaysApy = calculateApy(
                updatedData.vaultHistories,
                latestSharePriceValue,
                token,
                30,
              )
            }

            if (totalPeriodBasedOnSharePrice >= 180) {
              oneEightyDaysApy = calculateApy(
                updatedData.vaultHistories,
                latestSharePriceValue,
                token,
                180,
              )
            }

            if (totalPeriodBasedOnSharePrice >= 365) {
              threeSixtyFiveDaysApy = calculateApy(
                updatedData.vaultHistories,
                latestSharePriceValue,
                token,
                365,
              )
            }
          }

          if (updatedData.vaultHistories.length !== 0) {
            vaultInitialDate = formatDate(
              Number(updatedData.vaultHistories[updatedData.vaultHistories.length - 1].timestamp) *
                1000,
            )
            totalPeriod =
              (Number(updatedData.vaultHistories[0].timestamp) -
                Number(
                  updatedData.vaultHistories[updatedData.vaultHistories.length - 1].timestamp,
                )) /
              (24 * 3600)
          } else if (updatedData.vaultHistories.length === 0 && updatedData.tvls.length !== 0) {
            vaultInitialDate = formatDate(
              Number(updatedData.tvls[updatedData.tvls.length - 1].timestamp) * 1000,
            )
            totalPeriod =
              (Number(updatedData.tvls[0].timestamp) -
                Number(updatedData.tvls[updatedData.tvls.length - 1].timestamp)) /
              (24 * 3600)
          } else if (
            updatedData.vaultHistories.length === 0 &&
            updatedData.tvls.length === 0 &&
            updatedData.generalApies.length !== 0
          ) {
            vaultInitialDate = formatDate(
              Number(updatedData.generalApies[updatedData.generalApies.length - 1].timestamp) *
                1000,
            )
            totalPeriod =
              (Number(updatedData.generalApies[0].timestamp) -
                Number(updatedData.generalApies[updatedData.generalApies.length - 1].timestamp)) /
              (24 * 3600)
          }

          set7DApy(sevenDaysApy)
          set30DApy(thirtyDaysApy)
          set180DApy(oneEightyDaysApy)
          set360DApy(threeSixtyFiveDaysApy)
          setLifetimeApy(lifetimeApyValue === 0 ? '-' : lifetimeApyValue)
          setVaultBirthday(vaultInitialDate)
          setVaultTotalPeriod(totalPeriod === '-' ? '' : totalPeriod.toFixed())
          setLatestSharePrice(latestSharePriceValue)
          set7DHarvest(sevenDaysHarvest)
          set30DHarvest(thirtyDaysHarvest)
          set180DHarvest(oneEightyDaysHarvest)
          set360DHarvest(threeSixtyFiveDaysHarvest)
          setHarvestFrequency(frequencyOfHarvest)

          if (isMounted) {
            setApiData(updatedData)
            if (isIFARM && updatedData) {
              data.apyRewards = updatedData.apyRewards
              data.tvls = updatedData.tvls

              const iFarmTVL = await getTotalTVLData()
              setIFarmTVLData(iFarmTVL)
            }
          }
        } catch (error) {
          console.log('An error ocurred', error)
        }
      }
    }

    initData()

    return () => {
      isMounted = false
    }
  }, [address, chainId, isIFARM]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Header>
        <Total>
          <FlexDiv>
            <TooltipInfo>
              <LabelInfo fontColor4={fontColor4}>{tooltipLabel}</LabelInfo>
              <CurDate fontColor3={fontColor3}>
                {curDate}&nbsp;<span>|</span>&nbsp;
                <p>
                  {clickedId === 1 ? currencySym : ''}
                  {curContent}
                  {clickedId === 0 ? '%' : ''}
                </p>
              </CurDate>
            </TooltipInfo>
            <FilterGroup>
              <ChartButtonsGroup
                buttons={filterList}
                clickedId={clickedId}
                setClickedId={setClickedId}
              />
            </FilterGroup>
          </FlexDiv>
        </Total>
      </Header>
      <ChartDiv className="advanced-farm">
        <ApexChart
          token={token}
          data={apiData}
          iFarmTVL={iFarmTVLData}
          isIFARM={isIFARM}
          range={selectedState}
          filter={clickedId}
          lastTVL={lastTVL}
          lastAPY={lastAPY}
          setCurDate={setCurDate}
          setCurContent={setCurContent}
          handleTooltipContent={handleTooltipContent}
          setRoundNumber={setRoundNumber}
          setFixedLen={setFixedLen}
          fixedLen={fixedLen}
          setSelectedState={setSelectedState}
          isExpanded={isExpanded}
        />
      </ChartDiv>
      <ButtonGroup>
        <ToggleButton
          type="button"
          onClick={handleToggle(setIsExpanded)}
          className="collapse-button"
          backColor={darkMode ? '#3b3c3e' : '#e9f0f7'}
          color={darkMode ? 'white' : 'black'}
        >
          <ChevronIcon className="chevron">
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </ChevronIcon>
          Custom
        </ToggleButton>
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
    </Container>
  )
}
export default FarmDetailChart
