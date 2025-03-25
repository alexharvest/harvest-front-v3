import React, { useState, useEffect } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import 'react-loading-skeleton/dist/skeleton.css'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useRate } from '../../../providers/Rate'
import { fromWei, getExplorerLink } from '../../../services/web3'
import { useContracts } from '../../../providers/Contracts'
import { getIPORVaultHistories, getIPORLastHarvestInfo } from '../../../utilities/apiCalls'
import { abbreaviteNumber, formatFrequency, formatNumber } from '../../../utilities/formats'
import {
  PanelHeader,
  PanelTitle,
  RowDiv,
  FlexDiv,
  ColumnDiv,
  GeneralDiv,
  PanelTags,
  MainTag,
  BasePanelBox,
  NewLabel,
  PilotInfoClose,
  SwitchMode,
} from './style'
import { handleToggle, getChainNamePortals, calculateApy } from '../../../utilities/parsers'
import Button from '../../Button'
import AnimatedDots from '../../AnimatedDots'

const AutopilotInfo = ({ allVaultsData, vaultData, setPilotInfoShow }) => {
  const {
    darkMode,
    borderColorBox,
    btnColor,
    fontColor2,
    fontColor3,
    fontColor5,
  } = useThemeContext()
  const { rates } = useRate()

  const [activeMainTag, setActiveMainTag] = useState(0)

  const { contracts } = useContracts()

  const [currencySym, setCurrencySym] = useState('$')
  const [currencyRate, setCurrencyRate] = useState(1)
  const [lastHarvest, setLastHarvest] = useState('-')
  const [harvestFrequency, setHarvestFrequency] = useState('-')
  const [operatingSince, setOperatingSince] = useState('-')
  const [periodInday, setPeriodInDay] = useState('-')
  const [totalValueLocked, setTotalValueLocked] = useState('-')
  const [vaultToken, setVaultToken] = useState('-')
  const mainTags = ['General', 'Allocation', 'Historical Rates']
  const [showApyHistory, setShowApyHistory] = useState(true)

  const [lifetimeApy, setLifetimeApy] = useState('-')
  const [sevenDApy, set7DApy] = useState('')
  const [thirtyDApy, set30DApy] = useState('')
  const [oneEightyDApy, set180DApy] = useState('')
  const [threeSixtyDApy, set360DApy] = useState('')
  const [sevenDHarvest, set7DHarvest] = useState('')
  const [thirtyDHarvest, set30DHarvest] = useState('')
  const [oneEightyDHarvest, set180DHarvest] = useState('')
  const [threeSixtyDHarvest, set360DHarvest] = useState('')

  const autoPilotInfoData = [
    { label: 'Last Harvest', value: lastHarvest === '-' ? <AnimatedDots /> : `${lastHarvest} ago` },
    {
      label: 'Harvest Frequency',
      value: harvestFrequency === '-' ? <AnimatedDots /> : `~${harvestFrequency}`,
    },
    { label: 'Lifetime APY', value: lifetimeApy === '-' ? <AnimatedDots /> : lifetimeApy },
    {
      label: 'Operating Since',
      value: periodInday === '-' ? <AnimatedDots /> : `${operatingSince} (${periodInday} days)`,
    },
    {
      label: 'TVL',
      value: totalValueLocked === '-' ? <AnimatedDots /> : `${currencySym}${totalValueLocked}`,
    },
    { label: 'Underlying', value: `${vaultData.tokenNames[0]}` },
  ]

  const detailData = [
    {
      label: showApyHistory ? 'Live' : 'Latest',
      value: showApyHistory ? `${formatNumber(vaultData.estimatedApy, 2)}%` : `${lastHarvest} ago`,
    },
    { label: '7d', value: showApyHistory ? sevenDApy : sevenDHarvest },
    { label: '30d', value: showApyHistory ? thirtyDApy : thirtyDHarvest },
    { label: '180d', value: showApyHistory ? oneEightyDApy : oneEightyDHarvest },
    { label: '360d', value: showApyHistory ? threeSixtyDApy : threeSixtyDHarvest },
    { label: 'Lifetime', value: showApyHistory ? lifetimeApy : harvestFrequency },
  ]

  useEffect(() => {
    if (rates.rateData) {
      setCurrencySym(rates.currency.icon)
      setCurrencyRate(rates.rateData[rates.currency.symbol])
    }
  }, [rates])

  useEffect(() => {
    const initData = async () => {
      const lHarvestDate = await getIPORLastHarvestInfo(
        vaultData.vaultAddress.toLowerCase(),
        vaultData.chain,
      )
      setLastHarvest(lHarvestDate)
      const { vaultHIPORData, vaultHIPORFlag } = await getIPORVaultHistories(
        vaultData.chain,
        vaultData.vaultAddress.toLowerCase(),
      )

      const vaultContract = contracts.iporVaults[vaultData.id]
      const symbol = await vaultContract.methods.symbol(vaultContract.instance)
      setVaultToken(symbol)

      if (vaultHIPORFlag) {
        const totalPeriod =
          Number(vaultHIPORData[0].timestamp) -
          Number(vaultHIPORData[vaultHIPORData.length - 1].timestamp)

        const totalPeriodInDay = Math.round(totalPeriod / (24 * 3600))
        setPeriodInDay(totalPeriodInDay)
        let duration = totalPeriod / vaultHIPORData.length,
          day = 0,
          hour = 0,
          min = 0,
          [sevenDaysApy, thirtyDaysApy, oneEightyDaysApy, threeSixtyFiveDaysApy] = Array(4).fill(
            '-',
          ),
          [
            sevenDaysHarvest,
            thirtyDaysHarvest,
            oneEightyDaysHarvest,
            threeSixtyFiveDaysHarvest,
          ] = Array(4).fill('-'),
          latestSharePriceValue = '-',
          lifetimeApyValue = 0

        // calculate (and subtract) whole days
        day = Math.floor(duration / 86400)
        duration -= day * 86400

        // calculate (and subtract) whole hours
        hour = Math.floor(duration / 3600) % 24
        duration -= hour * 3600

        // calculate (and subtract) whole minutes
        min = Math.floor(duration / 60) % 60

        const dayString = `${day > 0 ? `${day}d` : ''}`
        const hourString = `${hour > 0 ? `${hour}h` : ''}`
        const minString = `${min > 0 ? `${min}m` : ''}`
        const result = `${`${dayString !== '' ? `${dayString} ` : ''}${
          hourString !== '' ? `${hourString} ` : ''
        }`}${minString}`

        setHarvestFrequency(result)

        // calculate operating since
        const date = new Date(Number(vaultHIPORData[vaultHIPORData.length - 1].timestamp) * 1000) // Convert to milliseconds
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
        setOperatingSince(formattedDate)

        // calculate TVL
        const tvl = abbreaviteNumber(Number(vaultData.totalValueLocked) * Number(currencyRate), 2)
        setTotalValueLocked(tvl)

        latestSharePriceValue = fromWei(
          vaultHIPORData[0].sharePrice,
          vaultData.decimals,
          vaultData.decimals,
          false,
        )

        const totalPeriodDays =
          (Number(vaultHIPORData[0].timestamp) -
            Number(vaultHIPORData[vaultHIPORData.length - 1].timestamp)) /
          (24 * 3600)

        const sharePriceVal = latestSharePriceValue === '-' ? 1 : Number(latestSharePriceValue)
        lifetimeApyValue = `${(((sharePriceVal - 1) / (totalPeriodDays / 365)) * 100).toFixed(2)}%`

        if (totalPeriodDays >= 7) {
          sevenDaysHarvest =
            vaultHIPORData.filter(
              entry =>
                Number(entry.timestamp) >= Number(vaultHIPORData[0].timestamp) - 7 * 24 * 3600,
            ).length / 7
          sevenDaysApy = calculateApy(vaultHIPORData, latestSharePriceValue, vaultData, 7)
        }

        if (totalPeriodDays >= 30) {
          thirtyDaysHarvest =
            vaultHIPORData.filter(
              entry =>
                Number(entry.timestamp) >= Number(vaultHIPORData[0].timestamp) - 30 * 24 * 3600,
            ).length / 30
          thirtyDaysApy = calculateApy(vaultHIPORData, latestSharePriceValue, vaultData, 30)
        }

        if (totalPeriodDays >= 180) {
          oneEightyDaysHarvest =
            vaultHIPORData.filter(
              entry =>
                Number(entry.timestamp) >= Number(vaultHIPORData[0].timestamp) - 180 * 24 * 3600,
            ).length / 180
          oneEightyDaysApy = calculateApy(vaultHIPORData, latestSharePriceValue, vaultData, 180)
        }

        if (totalPeriodDays >= 365) {
          threeSixtyFiveDaysHarvest =
            vaultHIPORData.filter(
              entry =>
                Number(entry.timestamp) >= Number(vaultHIPORData[0].timestamp) - 365 * 24 * 3600,
            ).length / 365
          threeSixtyFiveDaysApy = calculateApy(
            vaultHIPORData,
            latestSharePriceValue,
            vaultData,
            365,
          )
        }
        set7DApy(sevenDaysApy)
        set30DApy(thirtyDaysApy)
        set180DApy(oneEightyDaysApy)
        set360DApy(threeSixtyFiveDaysApy)
        setLifetimeApy(lifetimeApyValue === 0 ? '-' : lifetimeApyValue)
        set7DHarvest(formatFrequency(sevenDaysHarvest))
        set30DHarvest(formatFrequency(thirtyDaysHarvest))
        set180DHarvest(formatFrequency(oneEightyDaysHarvest))
        set360DHarvest(formatFrequency(threeSixtyFiveDaysHarvest))
      }
    }

    initData()
  }, [contracts, currencyRate, vaultData])

  const onClickCloseInfo = () => {
    setPilotInfoShow(false)
  }

  return (
    <>
      <BasePanelBox borderColor={borderColorBox} borderRadius="15px">
        <PanelHeader>
          <PanelTitle>
            <NewLabel
              size="13.4px"
              height="20px"
              weight="700"
              marginTop="25px"
              marginLeft="20px"
              color={fontColor2}
            >
              {vaultData.tokenNames[0]} Autopilot Info
            </NewLabel>
            <PilotInfoClose>
              <IoIosCloseCircleOutline
                className="pilot-info"
                onClick={() => {
                  onClickCloseInfo()
                }}
              />
            </PilotInfoClose>
          </PanelTitle>
          <PanelTags>
            {mainTags.map((tag, i) => (
              <MainTag
                fontColor2={fontColor2}
                backColor={btnColor}
                key={i}
                active={activeMainTag === i ? 'true' : 'false'}
                onClick={() => {
                  setActiveMainTag(i)
                }}
              >
                <NewLabel size="11px">{tag}</NewLabel>
              </MainTag>
            ))}
          </PanelTags>
        </PanelHeader>
        {activeMainTag === 0 && (
          <GeneralDiv key={activeMainTag} darkMode={darkMode ? 'true' : 'false'}>
            {autoPilotInfoData.map((item, index) => (
              <RowDiv key={index}>
                <NewLabel color={fontColor3} size="12px" height="20px" weight="500">
                  {item.label}
                </NewLabel>
                <NewLabel color={fontColor5} size="12px" height="20px" weight="500">
                  {item.value}
                </NewLabel>
              </RowDiv>
            ))}
            <RowDiv>
              <NewLabel color={fontColor3} size="12px" height="20px" weight="500">
                Vault Token
              </NewLabel>
              <u>
                <NewLabel
                  color={fontColor5}
                  size="12px"
                  height="20px"
                  weight="500"
                  cursor="pointer"
                  onClick={() => {
                    window.open(
                      `${getExplorerLink(vaultData.chain)}/address/${vaultData.vaultAddress}`,
                      '_blank',
                    )
                  }}
                >
                  {vaultToken === '-' ? <AnimatedDots /> : vaultToken}
                </NewLabel>
              </u>
            </RowDiv>
            <ColumnDiv>
              <NewLabel color={fontColor3} size="12px" height="20px" weight="700">
                Technology
              </NewLabel>
              <NewLabel color={fontColor5} size="12px" height="20px" weight="400">
                Autopilot is powered by audited IPOR Fusion Vault technology.
              </NewLabel>
            </ColumnDiv>
          </GeneralDiv>
        )}
        {activeMainTag === 1 && (
          <GeneralDiv key={activeMainTag} darkMode={darkMode ? 'true' : 'false'}>
            {vaultData.allocPointData && vaultData.allocPointData.length > 0 ? (
              vaultData.allocPointData.map((data, index) => {
                let vaultName = data.hVaultId.split('_')[0]
                vaultName = `${vaultName.charAt(0).toUpperCase() + vaultName.slice(1)} ${
                  vaultData.tokenNames[0]
                }`
                return (
                  <RowDiv key={index}>
                    <NewLabel
                      size="12px"
                      height="20px"
                      weight="500"
                      cursor="pointer"
                      borderBottom="0.5px dotted white"
                      onClick={() => {
                        const chainName = getChainNamePortals(vaultData.chain)
                        return allVaultsData[data.hVaultId]?.vaultAddress
                          ? window.open(
                              `https://app.harvest.finance/${chainName}/${
                                allVaultsData[data.hVaultId]?.vaultAddress
                              }`,
                              '_blank',
                            )
                          : null
                      }}
                    >
                      {vaultName}
                    </NewLabel>
                    <NewLabel size="12px" height="20px" weight="500">
                      {Number(data.allocPoint).toFixed(2)}%
                    </NewLabel>
                  </RowDiv>
                )
              })
            ) : (
              <></>
            )}
          </GeneralDiv>
        )}
        {activeMainTag === 2 && (
          <GeneralDiv key={activeMainTag} darkMode={darkMode ? 'true' : 'false'}>
            <RowDiv>
              <NewLabel size="12px" height="20px" weight="500">
                {showApyHistory ? 'APY' : 'Harvest Frequency'}
              </NewLabel>
              <SwitchMode mode={showApyHistory ? 'apy' : 'harvest'}>
                <div id="theme-switch">
                  <div className="switch-track">
                    <div className="switch-thumb" />
                  </div>
                  <input
                    type="checkbox"
                    checked={showApyHistory}
                    onChange={handleToggle(setShowApyHistory)}
                    aria-label="Switch between APY and Harvest frequency"
                  />
                </div>
              </SwitchMode>
            </RowDiv>
            {detailData.map(
              (item, index) =>
                item.label !== '30d' && (
                  <RowDiv key={index}>
                    <NewLabel size="12px" height="20px" weight="500">
                      {item.label}
                    </NewLabel>
                    <NewLabel size="12px" height="20px" weight="500">
                      {item.value}
                    </NewLabel>
                  </RowDiv>
                ),
            )}
            <RowDiv>
              <NewLabel color={fontColor5} size="13.3px" height="20px" weight="700">
                Curious about more data and insights?
              </NewLabel>
            </RowDiv>
            <FlexDiv width="100%">
              <Button
                width="80%"
                margin="auto"
                color="autopilot"
                onClick={() => {
                  const chainName = getChainNamePortals(vaultData.chain)
                  return window.open(
                    `/${chainName}/${vaultData.vaultAddress.toLowerCase()}`,
                    '_self',
                  )
                }}
              >
                Open Autopilot in Advanced Mode
              </Button>
            </FlexDiv>
          </GeneralDiv>
        )}
      </BasePanelBox>
    </>
  )
}

export default AutopilotInfo
