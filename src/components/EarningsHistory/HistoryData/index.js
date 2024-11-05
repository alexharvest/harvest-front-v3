import React, { useState, useMemo, useCallback } from 'react'
import ReactPaginate from 'react-paginate'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5'
import SkeletonLoader from '../../DashboardComponents/SkeletonLoader'
import { useThemeContext } from '../../../providers/useThemeContext'
import { usePools } from '../../../providers/Pools'
import { useWallet } from '../../../providers/Wallet'
import ActionRow from '../ActionRow'
import AdvancedImg from '../../../assets/images/logos/sidebar/advanced.svg'
import { ROUTES } from '../../../constants'
import {
  TransactionDetails,
  HistoryPagination,
  TableContent,
  Header,
  Column,
  Col,
  ContentBox,
  EmptyPanel,
  EmptyInfo,
  ConnectButtonStyle,
  ThemeMode,
  ExploreButtonStyle,
} from './style'

const HistoryData = ({ historyData, isDashboard, noData }) => {
  const { push } = useHistory()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const itemsPerPage = isMobile ? 6 : 5

  const {
    borderColorTable,
    bgColorTable,
    bgColorFarm,
    fontColor,
    fontColor1,
    fontColor2,
    hoverColorButton,
    inputBorderColor,
  } = useThemeContext()

  const { disableWallet } = usePools()
  const { connected, connectAction } = useWallet()
  const [itemOffset, setItemOffset] = useState(0)
  const [showTotalBalance, setShowTotalBalance] = useState(true)

  const switchEarnings = () => setShowTotalBalance(prev => !prev)

  const { currentItems, pageCount } = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage
    const currentItems1 = historyData?.slice(itemOffset, endOffset)
    const pageCount1 = Math.ceil(historyData?.length / itemsPerPage)

    return { currentItems: currentItems1, pageCount: pageCount1 }
  }, [historyData, itemOffset, itemsPerPage])

  const handlePageClick = useCallback(
    event => {
      const newOffset = (event.selected * itemsPerPage) % historyData.length
      setItemOffset(newOffset)
    },
    [historyData, itemsPerPage],
  )

  const CustomPreviousComponent = () => (
    <span>
      <IoArrowBackSharp /> {isMobile ? '' : 'Previous'}
    </span>
  )

  const CustomNextComponent = () => (
    <span>
      {isMobile ? '' : 'Next'} <IoArrowForwardSharp />
    </span>
  )

  return (
    <TransactionDetails
      hasData={(connected && historyData?.length > 0) || isDashboard === 'true' ? 'unset' : '80vh'}
    >
      <TableContent>
        <Header borderColor={borderColorTable} backColor={bgColorTable}>
          <Column width={isMobile ? '25%' : '20%'} color={fontColor}>
            <Col>Event</Col>
          </Column>
          <Column width={isMobile ? '35%' : '20%'} color={fontColor}>
            <Col>Date</Col>
          </Column>
          <Column
            display="flex"
            justifyContent="space-between"
            width={isMobile ? '40%' : '30%'}
            color={fontColor}
          >
            <Col>{showTotalBalance ? 'Total Balance' : 'Net change'}</Col>
            {isMobile && (
              <ThemeMode mode={showTotalBalance ? 'balance' : 'netChange'}>
                <div id="theme-switch">
                  <div className="switch-track">
                    <div className="switch-thumb" />
                  </div>

                  <input
                    type="checkbox"
                    checked={showTotalBalance}
                    onChange={switchEarnings}
                    aria-label="Switch between balance and netChange earnings"
                  />
                </div>
              </ThemeMode>
            )}
          </Column>
          <Column
            width={isMobile ? '0%' : '30%'}
            color={fontColor}
            display={isMobile ? 'none' : 'flex'}
          >
            <Col>Net change</Col>
          </Column>
        </Header>
        {connected && historyData?.length > 0 ? (
          <div>
            <ContentBox>
              {currentItems
                .map((el, i) => {
                  const info = currentItems[i]
                  return <ActionRow key={i} info={info} showTotalBalance={showTotalBalance} />
                })
                .slice(0, 5)}
            </ContentBox>
            <HistoryPagination
              bgColor={bgColorFarm}
              fontColor={fontColor}
              fontColor1={fontColor1}
              fontColor2={fontColor2}
              borderColor={inputBorderColor}
            >
              <ReactPaginate
                breakLabel="..."
                nextLabel={<CustomNextComponent />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={isMobile ? 2 : 5}
                marginPagesDisplayed={isMobile ? 0 : 3}
                pageCount={pageCount}
                previousLabel={<CustomPreviousComponent />}
                renderOnZeroPageCount={null}
                containerClassName="paginate-container"
                className="paginate-wrapper"
                pageClassName="paginate-item"
                pageLinkClassName="paginate-item-link"
              />
            </HistoryPagination>
          </div>
        ) : connected ? (
          !noData ? (
            <SkeletonLoader isPosition="false" />
          ) : (
            <EmptyPanel borderColor={borderColorTable}>
              <EmptyInfo
                weight={500}
                size={14}
                lineHeight={20}
                color={fontColor}
                flexFlow="column"
                gap="0px"
              >
                <div>No activity found for this wallet in this strategy.</div>
                <ExploreButtonStyle
                  color="connectwallet"
                  onClick={() => {
                    push(ROUTES.ADVANCED)
                  }}
                  minWidth="190px"
                  inputBorderColor={inputBorderColor}
                  bordercolor={fontColor}
                  disabled={disableWallet}
                >
                  <img src={AdvancedImg} className="explore-farms" alt="" />
                  Explore Farms
                </ExploreButtonStyle>
              </EmptyInfo>
            </EmptyPanel>
          )
        ) : (
          <EmptyPanel>
            <EmptyInfo weight={500} size={14} lineHeight={20} color={fontColor}>
              Connect wallet to see full event history.
            </EmptyInfo>
            <ConnectButtonStyle
              color="connectwallet"
              onClick={() => {
                connectAction()
              }}
              minWidth="190px"
              inputBorderColor={inputBorderColor}
              bordercolor={fontColor}
              disabled={disableWallet}
              hoverColor={hoverColorButton}
            >
              Connect Wallet
            </ConnectButtonStyle>
          </EmptyPanel>
        )}
      </TableContent>
    </TransactionDetails>
  )
}

export default HistoryData
