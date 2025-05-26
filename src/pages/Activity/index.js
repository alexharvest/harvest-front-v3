import React, { useRef, useEffect, useMemo, useState } from 'react'
import useEffectWithPrevious from 'use-effect-with-previous'
import { isEmpty, isEqual } from 'lodash'
import { useMediaQuery } from 'react-responsive'
import 'react-loading-skeleton/dist/skeleton.css'
import EarningsHistory from '../../components/EarningsHistory/HistoryData'
import RewardsHistory from '../../components/RewardsHistory/RewardsData'
import { FARM_TOKEN_SYMBOL, IFARM_TOKEN_SYMBOL, SPECIAL_VAULTS, historyTags } from '../../constants'
import { addresses } from '../../data'
import { usePools } from '../../providers/Pools'
import { useStats } from '../../providers/Stats'
import { useThemeContext } from '../../providers/useThemeContext'
import { useVaults } from '../../providers/Vault'
import { useWallet } from '../../providers/Wallet'
import {
  fetchAndParseVaultData,
  totalHistoryDataKey,
  totalNetProfitKey,
  vaultProfitDataKey,
} from '../../utilities/parsers'
import { Container, Inner, HeaderWrap, HeaderTitle, NewLabel, SwitchTabTag } from './style'

const Activity = () => {
  const { connected, account, balances, getWalletBalances } = useWallet()
  const { userStats, totalPools } = usePools()
  const { profitShareAPY } = useStats()
  const { vaultsData } = useVaults()
  /* eslint-disable global-require */
  const {
    darkMode,
    bgColorNew,
    fontColor,
    fontColor1,
    fontColor3,
    fontColor4,
    activeColorNew,
    boxShadowColor2,
  } = useThemeContext()

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const [onceRun, setOnceRun] = useState(false)
  const [safeFlag, setSafeFlag] = useState(true)
  const [noHarvestsData, setNoHarvestsData] = useState(false)
  const [noRewardsData, setNoRewardsData] = useState(false)
  const [activeHarvests, setActiveHarvests] = useState(true)
  const [, setTotalNetProfit] = useState(() => {
    return Number(localStorage.getItem(totalNetProfitKey) || '0')
  })
  const [, setVaultNetChangeList] = useState(() => {
    return JSON.parse(localStorage.getItem(vaultProfitDataKey) || '[]')
  })
  const [totalHistoryData, setTotalHistoryData] = useState(() => {
    return JSON.parse(localStorage.getItem(totalHistoryDataKey) || '[]')
  })

  const farmProfitSharingPool = totalPools.find(
    pool => pool.id === SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID,
  )

  const poolVaults = useMemo(
    () => ({
      [FARM_TOKEN_SYMBOL]: {
        poolVault: true,
        profitShareAPY,
        data: farmProfitSharingPool,
        logoUrl: ['./icons/ifarm.svg'],
        tokenAddress: addresses.iFARM,
        rewardSymbol: 'iFarm',
        tokenNames: ['FARM'],
        platform: ['Harvest'],
        decimals: 18,
      },
    }),
    [farmProfitSharingPool, profitShareAPY],
  )

  const groupOfVaults = { ...vaultsData, ...poolVaults }

  const firstWalletBalanceLoad = useRef(true)
  useEffectWithPrevious(
    ([prevAccount, prevBalances]) => {
      const hasSwitchedAccount = account !== prevAccount && account
      if (
        hasSwitchedAccount ||
        firstWalletBalanceLoad.current ||
        (balances && !isEqual(balances, prevBalances))
      ) {
        const getBalance = async () => {
          firstWalletBalanceLoad.current = false
          await getWalletBalances([IFARM_TOKEN_SYMBOL, FARM_TOKEN_SYMBOL], false, true)
        }

        getBalance()
      }
    },
    [account, balances],
  )

  useEffect(() => {
    const totalNetProfitValue = localStorage.getItem(totalNetProfitKey)

    if (
      Number(totalNetProfitValue) === 0 ||
      totalNetProfitValue === null ||
      Number(totalNetProfitValue) === -1
    ) {
      if (!isEmpty(userStats) && account && !onceRun) {
        setOnceRun(true)
        const getNetProfitValue = async () => {
          const {
            vaultNetChanges,
            sortedCombinedEnrichedArray,
            totalNetProfitUSD,
            stakedVaults,
            rewardsAPIDataLength,
          } = await fetchAndParseVaultData({
            account,
            groupOfVaults,
            totalPools,
            setSafeFlag,
          })

          if (stakedVaults.length === 0) {
            setNoHarvestsData(true)
          }

          if (rewardsAPIDataLength === 0) {
            setNoRewardsData(true)
          }

          setTotalNetProfit(totalNetProfitUSD)
          localStorage.setItem(totalNetProfitKey, totalNetProfitUSD.toString())

          setVaultNetChangeList(vaultNetChanges)
          localStorage.setItem(vaultProfitDataKey, JSON.stringify(vaultNetChanges))

          setTotalHistoryData(sortedCombinedEnrichedArray)
          localStorage.setItem(totalHistoryDataKey, JSON.stringify(sortedCombinedEnrichedArray))
        }

        getNetProfitValue()
      } else {
        setTotalNetProfit(0)
        localStorage.setItem(totalNetProfitKey, '0')
        setVaultNetChangeList([])
        localStorage.setItem(vaultProfitDataKey, JSON.stringify([]))
        setTotalHistoryData([])
        localStorage.setItem(totalHistoryDataKey, JSON.stringify([]))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, userStats, connected, safeFlag])

  return (
    <Container bgColor={bgColorNew} fontColor={fontColor}>
      <Inner>
        <HeaderWrap backImg="" padding="25px 15px 20px" borderColor="unset">
          <HeaderTitle fontColor={fontColor} fontColor1={fontColor1}>
            <div className="title">Full History</div>
            <div className="desc">
              History of all harvest, claimed rewards, and convert/revert events for connected
              wallet.
            </div>
          </HeaderTitle>
        </HeaderWrap>

        <NewLabel width={isMobile ? '90%' : '40%'} margin={isMobile ? 'auto' : 'unset'}>
          <NewLabel
            backColor={darkMode ? '#373737' : '#ebebeb'}
            size={isMobile ? '16px' : '16px'}
            height={isMobile ? '24px' : '24px'}
            weight="600"
            color={fontColor1}
            display="flex"
            justifyContent="center"
            marginBottom="13px"
            borderRadius="8px"
            transition="0.25s"
          >
            {historyTags.map((tag, i) => (
              <SwitchTabTag
                key={i}
                num={i}
                onClick={() => {
                  if ((i === 0 && !activeHarvests) || (i === 1 && activeHarvests))
                    setActiveHarvests(prev => !prev)
                }}
                color={
                  (i === 0 && activeHarvests) || (i === 1 && !activeHarvests)
                    ? fontColor4
                    : fontColor3
                }
                backColor={
                  (i === 0 && activeHarvests) || (i === 1 && !activeHarvests) ? activeColorNew : ''
                }
                boxShadow={
                  (i === 0 && activeHarvests) || (i === 1 && !activeHarvests) ? boxShadowColor2 : ''
                }
              >
                <p>{tag.name}</p>
              </SwitchTabTag>
            ))}
          </NewLabel>
        </NewLabel>

        {activeHarvests ? (
          <EarningsHistory historyData={totalHistoryData} isDashboard noData={noHarvestsData} />
        ) : (
          <RewardsHistory
            historyData={totalHistoryData}
            account={account}
            token={null}
            isDashboard
            noData={noRewardsData}
            setNoData={setNoRewardsData}
          />
        )}
      </Inner>
    </Container>
  )
}

export default Activity
