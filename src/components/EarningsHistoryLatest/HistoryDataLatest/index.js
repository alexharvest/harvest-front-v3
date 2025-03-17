import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useWallet } from '../../../providers/Wallet'
import ActionRow from '../ActionRow'
import NoDataPanel from '../NoDataPanel'
import { TransactionDetails, TableContent, EmptyPanel, ContentBox, SkeletonItem } from './style'

const HistoryDataLatest = ({ historyData, noFarm, setOneDayYield }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const filteredHistoryData = historyData.filter(el => el.event === 'Harvest' && el.netChange >= 0)
  const totalLength = filteredHistoryData.length
  useEffect(() => {
    let totalYield = 0
    for (let i = 0; i < totalLength; i += 1) {
      if (totalLength > 0) {
        let nowDate = new Date(),
          duration
        nowDate = Math.floor(nowDate.getTime() / 1000)
        const timestamp = filteredHistoryData[i].timestamp
        duration = Number(nowDate) - Number(timestamp)

        const day = Math.floor(duration / 86400)
        duration -= day * 86400

        const hour = Math.floor(duration / 3600) % 24
        duration -= hour * 3600

        totalYield += filteredHistoryData[i].netChangeUsd
        if (day > 0) {
          setOneDayYield(totalYield)
          break
        }
      }
    }
  }, [totalLength]) // eslint-disable-line react-hooks/exhaustive-deps

  const { highlightColor } = useThemeContext()
  const { connected } = useWallet()

  return (
    <TransactionDetails hasData={(connected && filteredHistoryData?.length > 0) || 'unset'}>
      <TableContent>
        {connected && filteredHistoryData?.length > 0 ? (
          <ContentBox>
            {filteredHistoryData
              .map((el, i) => {
                const info = filteredHistoryData[i]
                return <ActionRow key={i} info={info} />
              })
              .slice(0, isMobile ? 6 : 4)}
          </ContentBox>
        ) : connected ? (
          !noFarm ? (
            historyData.length !== 0 && filteredHistoryData.length === 0 ? (
              <NoDataPanel />
            ) : (
              <EmptyPanel>
                <SkeletonTheme baseColor="#ECECEC" highlightColor={highlightColor}>
                  {[...Array(isMobile ? 6 : 4)].map((_, index) => (
                    <SkeletonItem key={index}>
                      <div>
                        <Skeleton containerClassName="skeleton" width="50%" height={10} />
                      </div>
                      <div>
                        <Skeleton containerClassName="skeleton" width="25%" height={10} />
                      </div>
                    </SkeletonItem>
                  ))}
                </SkeletonTheme>
              </EmptyPanel>
            )
          ) : (
            <NoDataPanel />
          )
        ) : (
          <NoDataPanel />
        )}
      </TableContent>
    </TransactionDetails>
  )
}

export default HistoryDataLatest
