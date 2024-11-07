import { useHistory, useLocation } from 'react-router-dom'
import { useWindowWidth } from '@react-hook/window-size'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { FaRegSquare, FaRegSquareCheck } from 'react-icons/fa6'
import { useMediaQuery } from 'react-responsive'
import { IoIosArrowDown } from 'react-icons/io'
import { Dropdown } from 'react-bootstrap'
import ARBITRUM from '../../assets/images/chains/arbitrum.svg'
import BASE from '../../assets/images/chains/base.svg'
import ETHEREUM from '../../assets/images/chains/ethereum.svg'
import POLYGON from '../../assets/images/chains/polygon.svg'
import ZKSYNC from '../../assets/images/chains/zksync.svg'
import FilterIcon from '../../assets/images/logos/filters-icon.svg'
import SpecNarrowDown from '../../assets/images/logos/filter/spec-narrowdown.svg'
import MobileSortCheckedIcon from '../../assets/images/logos/filter/mobile-sort-checked.svg'
import DesciBack from '../../assets/images/logos/filter/desciback.jpg'
import LSDBack from '../../assets/images/logos/filter/lsdback.jpg'
import Zap from '../../assets/images/logos/filter/zap.svg'
import { CHAIN_IDS } from '../../data/constants'
import { useThemeContext } from '../../providers/useThemeContext'
import { useWallet } from '../../providers/Wallet'
import { isSpecialApp } from '../../utilities/formats'
import ButtonGroup from '../ButtonGroup'
import SearchBar from '../SearchBar'
import {
  ChainButton,
  ClearFilter,
  Counter,
  DivWidth,
  FarmButtonPart,
  FarmFilter,
  FarmFiltersPart,
  FilterOffCanvas,
  FilterOffCanvasBody,
  FilterOffCanvasHeader,
  MobileClearFilter,
  MobileListHeaderSearch,
  MobileView,
  QuickFilterContainer,
  WebView,
  TrendDropDown,
  TrendDropDownMenu,
  TrendDropDownItem,
  ChainGroup,
  // SwitchBalanceButton,
  ApplyFilterBtn,
  CheckBoxDiv,
  MobileListFilter,
  MobileFilterBtn,
  DropdownRow,
} from './style'

const ChainsList = [
  { id: 0, name: 'Ethereum', img: ETHEREUM, chainId: CHAIN_IDS.ETH_MAINNET },
  { id: 1, name: 'Polygon', img: POLYGON, chainId: CHAIN_IDS.POLYGON_MAINNET },
  { id: 2, name: 'Arbitrum', img: ARBITRUM, chainId: CHAIN_IDS.ARBITRUM_ONE },
  { id: 3, name: 'Base', img: BASE, chainId: CHAIN_IDS.BASE },
  { id: 4, name: 'Zksync', img: ZKSYNC, chainId: CHAIN_IDS.ZKSYNC },
]

const TrendsList = [
  { id: 0, name: 'LSD', backImg: LSDBack, status: 'LSD' },
  { id: 1, name: 'DeSci', backImg: DesciBack, status: 'DeSci' },
]

const FarmsList = [
  { id: 1, name: 'All Farms', filter: 'allfarm' },
  { id: 2, name: 'My Farms', filter: 'myfarm' },
  { id: 3, name: 'Inactive', filter: 'inactive' },
]

const MobileFarmsList = [
  { id: 1, name: 'All', filter: 'allfarm' },
  { id: 2, name: 'Wallet', filter: 'myfarm', border: 'none' },
  { id: 3, name: 'Inactive', filter: 'inactive' },
]

const RiskList = [
  { id: 1, name: 'New', img: Zap, filter: 'new' },
  { id: 2, name: 'Popular', filter: 'popular' },
]

const RiskListMobile = [
  { id: 1, name: 'New', filter: 'new' },
  { id: 2, name: 'Popular', filter: 'popular' },
]

const AssetsList = [
  { id: 1, name: 'LP', filter: 'lptokens' },
  { id: 2, name: 'Single', filter: 'singlestakes' },
  { id: 3, name: 'Stable', filter: 'stablecoins' },
]

const QuickFilter = ({
  onSelectActiveType = () => {},
  setSearchQuery,
  onDepositedOnlyClick = () => {},
  onAssetClick = () => {},
  onSelectStableCoin = () => {},
  onSelectFarmType = () => {},
  SortsList,
  sortId,
  setSortId,
  updateSortQuery,
  riskId,
  setRiskId,
  setSortOrder,
}) => {
  // Search string is null, it will be false, otherwise true.
  const [stringSearch, setStringSearch] = useState(false)

  const [flag, setFlag] = useState(false)
  const [showInactiveFarms, setShowInactiveFarms] = useState(false)
  const [focusId, setFocusId] = useState(-1)
  const [inactiveId, setInactiveId] = useState(-1)
  const [mobileRiskId, setMobileRiskId] = useState(-1)
  const [mobileAssetsId, setMobileAssetsId] = useState(-1)

  useEffect(() => {
    onSelectActiveType(['Active'])
    setFlag(true)
  }, [flag, onSelectActiveType])

  const { pathname } = useLocation()
  const { push } = useHistory()

  const [paramObj, setParamObj] = useState({})

  const updateSearchQuery = event => {
    event.persist()

    const debouncedFn = debounce(() => {
      const searchString = event.target.value
      setSearchQuery(searchString)
      setStringSearch(searchString.length > 0)
      if (searchString !== '') {
        const updateValue = { search: searchString }
        setParamObj(newParamObj => ({
          ...newParamObj,
          ...updateValue,
        }))
      } else {
        const newObj = { ...paramObj }
        delete newObj.search
        setParamObj(() => ({
          ...newObj,
        }))
      }
    }, 300)

    if (event.key === 'Enter') {
      debouncedFn()
    }
  }

  const [inputText, setInputText] = React.useState('')

  const onClickSearch = text => {
    const searchString = text
    setSearchQuery(searchString)
    setStringSearch(searchString.length > 0)
    if (searchString !== '') {
      const updateValue = { search: searchString }
      setParamObj(newParamObj => ({
        ...newParamObj,
        ...updateValue,
      }))
    } else {
      const newObj = { ...paramObj }
      delete newObj.search
      setParamObj(() => ({
        ...newObj,
      }))
    }
  }

  const printFarm = id => {
    let text = []
    switch (id) {
      case 2:
        text = ['Inactive']
        break
      case 1:
        onDepositedOnlyClick(true)
        break
      case 0:
        text = ['Active']
        onDepositedOnlyClick(false)
        break
      default:
        text = ['Active']
        break
    }
    const updateValue = { farm: FarmsList[id].filter }
    setParamObj(newParamObj => ({
      ...newParamObj,
      ...updateValue,
    }))
    onSelectActiveType(text)
  }

  const printAsset = id => {
    let text = '',
      stable = ''
    switch (id) {
      case 0:
        text = 'LP Token'
        break
      case 1:
        text = 'Single Asset'
        break
      case 2:
        text = ''
        stable = 'Stable'
        break
      default:
        break
    }
    const updateValue = { asset: AssetsList[id].filter }
    setParamObj(newParamObj => ({
      ...newParamObj,
      ...updateValue,
    }))
    onAssetClick(text)
    onSelectStableCoin(stable)
  }

  const printRisk = id => {
    let text = ''
    switch (id) {
      case 0:
        text = 'New'
        break
      case 1:
        text = 'PopularNow'
        break
      default:
        break
    }
    const updateValue = { filter: RiskList[id].filter }
    setParamObj(newParamObj => ({
      ...newParamObj,
      ...updateValue,
    }))
    onSelectFarmType(text)
  }

  const [filterCount, setFilterCount] = useState(0)
  const [mobileFilterCount, setMobileFilterCount] = useState(0)

  const [assetsId, setAssetsId] = useState(-1) // for asset id
  const [farmId, setFarmId] = useState(-1) // for chain

  const { selChain, setSelChain, chainId } = useWallet()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  // for Chain
  const curChain = []
  if (selChain.includes(CHAIN_IDS.ETH_MAINNET)) {
    curChain.push(0)
  }
  if (selChain.includes(CHAIN_IDS.POLYGON_MAINNET)) {
    curChain.push(1)
  }
  if (selChain.includes(CHAIN_IDS.ARBITRUM_ONE)) {
    curChain.push(2)
  }
  if (selChain.includes(CHAIN_IDS.BASE)) {
    curChain.push(3)
  }
  if (selChain.includes(CHAIN_IDS.ZKSYNC)) {
    curChain.push(4)
  }

  const [selectedClass, setSelectedClass] = useState(curChain)

  const selectedClasses = []

  const [trendName, setTrendName] = useState('Trends')
  const [trendsBackNum, setTrendsBackNum] = useState(-1)

  const [collabBswapStatus, setCollabBswapStatus] = useState('')
  const [trendStatus, setTrendStatus] = useState('')

  const onClearSpecDropdowns = () => {
    setTrendsBackNum(-1)
    setTrendName('Trends')
    setTrendStatus('')
    setCollabBswapStatus('')
  }

  useEffect(() => {
    if (farmId === 2) {
      setShowInactiveFarms(true)
      setInactiveId(2)
      printFarm(2)
    } else if (farmId !== -1 && farmId !== 2) {
      setShowInactiveFarms(false)
      setInactiveId(-1)
      printFarm(farmId)
    }
  }, [farmId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const setUrlData = () => {
      const chains = [],
        chainIds = []
      const params = new URLSearchParams(window.location.search)
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of params.entries()) {
        if (key === 'risk') {
          for (let j = 0; j < RiskList.length; j += 1) {
            if (RiskList[j].filter === value) {
              printRisk(j)
              setRiskId(j)
              break
            }
          }
        } else if (key === 'asset') {
          for (let i = 0; i < AssetsList.length; i += 1) {
            if (AssetsList[i].filter === value) {
              printAsset(i)
              setAssetsId(i)
              break
            }
          }
        } else if (key === 'farm') {
          for (let k = 0; k < FarmsList.length; k += 1) {
            if (FarmsList[k].filter === value) {
              printFarm(k)
              setFarmId(k)
              break
            }
          }
        } else if (key === 'search') {
          setInputText(value)
          if (value.toLowerCase() === 'baseswap') {
            setCollabBswapStatus('BaseSwap')
          } else if (value.toLowerCase() === 'lsd') {
            setTrendName('LSD')
            setTrendsBackNum(0)
            setTrendStatus('LSD')
          } else if (value.toLowerCase() === 'desci') {
            setTrendName('DeSci')
            setTrendsBackNum(1)
            setTrendStatus('DeSci')
          }
          setSearchQuery(value)
          const updateValue = { search: value }
          setParamObj(newParamObj => ({
            ...newParamObj,
            ...updateValue,
          }))
          setStringSearch(true)
        } else if (key === 'chain') {
          for (let i = 0; i < ChainsList.length; i += 1) {
            if (ChainsList[i].name.toLowerCase() === value.toString()) {
              chains.push(ChainsList[i].chainId)
              chainIds.push(ChainsList[i].id)
              break
            }
          }
        }
      }
      if (chains.length !== 0) {
        setSelectedClass(chainIds)
        setSelChain(chains)
      }
    }

    setUrlData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const params = new URLSearchParams(paramObj)

    if (selectedClass.length !== 0 && selectedClass.length !== ChainsList.length) {
      if (isSpecialApp) params.append('chain', chainId)
      else {
        for (let i = 0; i < selectedClass.length; i += 1) {
          params.append('chain', ChainsList[selectedClass[i]].name.toLowerCase())
        }
      }
    }
    push(`${pathname}?${params.toString()}`)
  }, [selectedClass, paramObj]) // eslint-disable-line react-hooks/exhaustive-deps

  const clearFilter = () => {
    setParamObj({})
    push(pathname)
  }

  useEffect(() => {
    const count =
      (riskId >= 0 ? 1 : 0) +
      (assetsId >= 0 ? 1 : 0) +
      (farmId >= 0 ? 1 : 0) +
      (selectedClass.length === 0 || selectedClass.length === ChainsList.length
        ? 0
        : selectedClass.length) +
      (stringSearch ? 1 : 0)
    setFilterCount(count >= 0 ? count : 0)
    setMobileFilterCount(count >= 0 ? count : 0)
  }, [riskId, assetsId, farmId, selectedClass, stringSearch])

  // When clicked 'filter' button, show filter panel
  const [filterShow, setFilterShow] = useState(false)

  const handleFilterClose = () => setFilterShow(false)
  const handleFilterShow = () => setFilterShow(true)

  // get window width
  const onlyWidth = useWindowWidth()
  // set window mode - pc or mobile
  const [windowMode, setWindowMode] = useState(true)

  useEffect(() => {
    // pc - true, mobile - false
    if (onlyWidth >= 992) {
      setWindowMode(true)
    } else {
      setWindowMode(false)
    }
  }, [onlyWidth])

  const {
    backColor,
    borderColor,
    fontColor,
    fontColor2,
    filterColor,
    filterChainHoverColor,
    mobileFilterDisableColor,
    mobileFilterHoverColor,
    darkMode,
    mobileFilterBackColor,
    bgColor,
    fontColor1,
    fontColor4,
    hoverColor,
    inputBorderColor,
    inputFontColor,
  } = useThemeContext()

  return (
    <div>
      {windowMode ? (
        <WebView>
          <QuickFilterContainer>
            <DivWidth className="chain" width="100%" marginBottom="15px" backColor={backColor}>
              <DivWidth
                className="chain"
                background="none"
                width="100%"
                display="flex"
                justifyContent="start"
                backColor={backColor}
              >
                {isSpecialApp ? (
                  <></>
                ) : (
                  <ChainGroup>
                    {ChainsList.map((item, i) => (
                      <ChainButton
                        backColor={backColor}
                        hoverColor={filterChainHoverColor}
                        borderColor={darkMode ? '#1F242F' : '#d1dbfb'}
                        className={`${selectedClass.includes(i) ? 'active' : ''}`}
                        data-tip
                        data-for={`chain-${item.name}`}
                        key={i}
                        onClick={() => {
                          let tempIds = []
                          if (selectedClass.length !== ChainsList.length) {
                            tempIds = [...selectedClass]
                          }

                          if (!tempIds.includes(i)) {
                            tempIds.push(i)
                          } else {
                            for (let el = 0; el < tempIds.length; el += 1) {
                              if (tempIds[el] === i) {
                                tempIds.splice(el, 1)
                              }
                            }
                          }

                          if (tempIds.length === 0 || tempIds.length === ChainsList.length) {
                            tempIds = [0, 1, 2, 3, 4]
                            setSelectedClass(tempIds)
                          } else {
                            setSelectedClass(tempIds)
                          }
                          tempIds.map(tempId => {
                            return selectedClasses.push(ChainsList[tempId].name)
                          })
                          const tempChains = []
                          for (let j = 0; j < tempIds.length; j += 1) {
                            tempChains.push(ChainsList[tempIds[j]].chainId)
                          }
                          setSelChain(tempChains)
                          if (farmId !== -1) {
                            printFarm(farmId)
                          }
                        }}
                      >
                        <img src={item.img} alt="" />
                      </ChainButton>
                    ))}
                  </ChainGroup>
                )}
              </DivWidth>
            </DivWidth>
            <DivWidth right="0" borderRadius="10" backColor={backColor}>
              <ClearFilter
                fontColor={fontColor2}
                backColor={backColor}
                borderColor={darkMode ? '#1F242F' : '#d1dbfb'}
                onClick={() => {
                  document.getElementById('search-input').value = ''
                  setSearchQuery('')
                  setInputText('')
                  // clear collaboration and trends
                  onClearSpecDropdowns()
                  onSelectActiveType(['Active'])
                  setStringSearch(false)
                  setRiskId(-1)
                  setAssetsId(-1)
                  setFarmId(-1)
                  onDepositedOnlyClick(false)
                  setSelectedClass([0, 1, 2, 3, 4])
                  onSelectStableCoin(false)
                  onAssetClick('')
                  onSelectFarmType('')
                  setSelChain([
                    CHAIN_IDS.ETH_MAINNET,
                    CHAIN_IDS.POLYGON_MAINNET,
                    CHAIN_IDS.ARBITRUM_ONE,
                    CHAIN_IDS.BASE,
                    CHAIN_IDS.ZKSYNC,
                  ])
                  clearFilter()
                }}
              >
                <Counter count={filterCount}>{filterCount > 0 ? filterCount : ''}</Counter>
                &nbsp;Clear Filters
              </ClearFilter>
            </DivWidth>
          </QuickFilterContainer>
          <QuickFilterContainer position="relative" justifyContent="space-between">
            <DivWidth className="first" borderRadius="10" display="flex" alignItems="center">
              <SearchBar
                placeholder="Assets, platforms..."
                onKeyDown={updateSearchQuery}
                onSearch={onClickSearch}
                inputText={inputText}
                setInputText={setInputText}
              />
              <DivWidth borderRadius="10" marginRight="15px" backColor={backColor}>
                <ButtonGroup
                  buttons={RiskList}
                  doSomethingAfterClick={printRisk}
                  clickedId={riskId}
                  setClickedId={setRiskId}
                  fontColor={fontColor2}
                  setSortOrder={setSortOrder}
                />
              </DivWidth>
              <DivWidth display="none" marginRight="15px" height="fit-content">
                <Dropdown>
                  <TrendDropDown
                    num={trendsBackNum}
                    bordercolor={borderColor}
                    fontcolor={fontColor}
                  >
                    <div className="name">{trendName}</div>
                    <img className="narrow" src={SpecNarrowDown} alt="" />
                  </TrendDropDown>

                  {isSpecialApp ? (
                    <></>
                  ) : (
                    <TrendDropDownMenu>
                      {TrendsList.map((item, i) => (
                        <TrendDropDownItem
                          key={i}
                          className={i === 0 ? 'first' : i === TrendsList.length - 1 ? 'last' : ''}
                          num={i}
                          onClick={() => {
                            setInputText(item.status)
                            onClickSearch(item.status)
                            setTrendName(item.name)
                            setTrendsBackNum(i)
                          }}
                        >
                          <div>{item.name}</div>
                        </TrendDropDownItem>
                      ))}
                    </TrendDropDownMenu>
                  )}
                </Dropdown>
              </DivWidth>
              <DivWidth borderRadius="10" marginRight="15px" backColor={backColor}>
                <ButtonGroup
                  buttons={AssetsList}
                  doSomethingAfterClick={printAsset}
                  clickedId={assetsId}
                  setClickedId={setAssetsId}
                  fontColor={fontColor2}
                />
              </DivWidth>
            </DivWidth>

            <DivWidth borderRadius="10">
              <ButtonGroup
                buttons={FarmsList}
                doSomethingAfterClick={printFarm}
                clickedId={farmId}
                setClickedId={setFarmId}
                fontColor={fontColor2}
              />
            </DivWidth>
          </QuickFilterContainer>
        </WebView>
      ) : (
        <MobileView>
          <FarmButtonPart justifyContent="start">
            <ChainGroup borderColor={borderColor}>
              {ChainsList.map((item, i) => (
                <ChainButton
                  backColor={backColor}
                  hoverColor={filterChainHoverColor}
                  borderColor={darkMode ? '#1F242F' : '#D1DBFB'}
                  className={`${selectedClass.includes(i) ? 'active' : ''}`}
                  data-tip
                  data-for={`chain-${item.name}`}
                  key={i}
                  onClick={() => {
                    let tempIds = []
                    if (selectedClass.length !== ChainsList.length) {
                      tempIds = [...selectedClass]
                    }

                    if (!tempIds.includes(i)) {
                      tempIds.push(i)
                    } else {
                      const tl = tempIds.length
                      for (let el = 0; el < tl; el += 1) {
                        if (tempIds[el] === i) {
                          tempIds.splice(el, 1)
                        }
                      }
                    }

                    if (tempIds.length === 0 || tempIds.length === ChainsList.length) {
                      tempIds = [0, 1, 2, 3, 4]
                      setSelectedClass(tempIds)
                    } else {
                      setSelectedClass(tempIds)
                    }
                    tempIds.map(tempId => {
                      return selectedClasses.push(ChainsList[tempId].name)
                    })
                    const tempChains = [],
                      tl = tempIds.length
                    for (let j = 0; j < tl; j += 1) {
                      tempChains.push(ChainsList[tempIds[j]].chainId)
                    }
                    setSelChain(tempChains)
                    if (farmId !== -1) {
                      printFarm(farmId)
                    }
                  }}
                >
                  <img src={item.img} alt="" />
                </ChainButton>
              ))}
            </ChainGroup>
          </FarmButtonPart>

          <FarmButtonPart>
            <ButtonGroup
              buttons={MobileFarmsList}
              doSomethingAfterClick={printFarm}
              clickedId={farmId}
              setClickedId={setFarmId}
              fontColor={fontColor2}
              prevFocusId={focusId}
              isMobile={isMobile}
              oneClass="time-filter"
            />
            <FarmFiltersPart
              backColor={backColor}
              fontColor={fontColor}
              mobileColor={darkMode ? '#fff' : '#000'}
              borderColor={darkMode ? '#1F242F' : '#d1dbfb'}
              filterColor={filterColor}
            >
              <div className="filter-part">
                <button
                  type="button"
                  placeholder="Filters"
                  className="filters-btn"
                  color={fontColor2}
                  onClick={() => {
                    handleFilterShow()
                  }}
                >
                  <img src={FilterIcon} alt="filter icon" />
                  Filters
                </button>
              </div>

              <FilterOffCanvas
                show={filterShow}
                onHide={handleFilterClose}
                placement="left"
                backcolor={backColor}
                filtercolor={filterColor}
                className="farm-mobile-filter offcanvas-bottom"
              >
                <FilterOffCanvasHeader closeButton>
                  <FarmFilter
                    color={darkMode ? '#fff' : '#000'}
                    imgFilter={
                      darkMode
                        ? 'invert(100%) sepia(6%) saturate(2%) hue-rotate(223deg) brightness(115%) contrast(100%)'
                        : ''
                    }
                  >
                    <img src={FilterIcon} alt="filter icon" style={{ marginRight: '10px' }} />
                    Filters
                  </FarmFilter>
                </FilterOffCanvasHeader>
                <FilterOffCanvasBody
                  className="filter-show"
                  filtercolor={filterColor}
                  backcolor={backColor}
                  fontcolor={fontColor}
                  bordercolor={borderColor}
                  hovercolor={mobileFilterHoverColor}
                  mobilefilterdisablecolor={mobileFilterDisableColor}
                >
                  <DivWidth mobileMarginBottom="25px">
                    <ButtonGroup
                      buttons={RiskListMobile}
                      doSomethingAfterClick={() => {}}
                      clickedId={mobileRiskId}
                      setClickedId={setMobileRiskId}
                      fontColor={fontColor2}
                      unsetWidth={false}
                    />
                  </DivWidth>
                  <DivWidth mobileMarginBottom="25px">
                    <ButtonGroup
                      buttons={AssetsList}
                      doSomethingAfterClick={() => {}}
                      clickedId={mobileAssetsId}
                      setClickedId={setMobileAssetsId}
                      fontColor={fontColor2}
                    />
                  </DivWidth>
                  <DivWidth display="none" mobileMarginBottom="10px" height="fit-content">
                    <Dropdown>
                      <TrendDropDown
                        num={trendsBackNum}
                        bordercolor={borderColor}
                        fontcolor={fontColor}
                      >
                        <div className="name">{trendName}</div>
                        <img className="narrow" src={SpecNarrowDown} alt="" />
                      </TrendDropDown>

                      {isSpecialApp ? (
                        <></>
                      ) : (
                        <TrendDropDownMenu>
                          {TrendsList.map((item, i) => (
                            <TrendDropDownItem
                              key={i}
                              className={
                                i === 0 ? 'first' : i === TrendsList.length - 1 ? 'last' : ''
                              }
                              num={i}
                              onClick={() => {
                                setTrendName(item.name)
                                setTrendsBackNum(i)
                                setTrendStatus(item.status)
                              }}
                            >
                              <div>{item.name}</div>
                            </TrendDropDownItem>
                          ))}
                        </TrendDropDownMenu>
                      )}
                    </Dropdown>
                  </DivWidth>
                  <CheckBoxDiv
                    bgColor={darkMode ? '' : '#f9f5ff'}
                    fontColor={darkMode ? '#ffffff' : '#344054'}
                    onClick={() => {
                      if (showInactiveFarms) {
                        setInactiveId(-1)
                        setShowInactiveFarms(prev => !prev)
                      } else {
                        setInactiveId(2)
                        setShowInactiveFarms(prev => !prev)
                      }
                    }}
                  >
                    {showInactiveFarms ? (
                      <FaRegSquareCheck color="#6988FF" />
                    ) : (
                      <FaRegSquare color="#6988FF" />
                    )}
                    <div>Show inactive</div>
                  </CheckBoxDiv>
                  <ApplyFilterBtn
                    type="button"
                    onClick={() => {
                      if (mobileRiskId !== -1) {
                        printRisk(mobileRiskId)
                        setRiskId(mobileRiskId)
                      }
                      if (mobileAssetsId !== -1) {
                        printAsset(mobileAssetsId)
                        setAssetsId(mobileAssetsId)
                      }
                      if (inactiveId !== -1) {
                        setFarmId(inactiveId)
                        printFarm(inactiveId)
                        setFocusId(inactiveId)
                      } else if (inactiveId === -1) {
                        setFarmId(inactiveId)
                        setFocusId(inactiveId)
                      }
                      if (collabBswapStatus === 'BaseSwap') {
                        setInputText('BaseSwap')
                        onClickSearch('BaseSwap')
                      }
                      if (trendStatus !== '') {
                        setInputText(trendStatus)
                        onClickSearch(trendStatus)
                      }
                      handleFilterClose()
                    }}
                  >
                    Save
                  </ApplyFilterBtn>
                </FilterOffCanvasBody>
              </FilterOffCanvas>
            </FarmFiltersPart>
          </FarmButtonPart>

          <MobileListHeaderSearch>
            <SearchBar
              placeholder="Assets, platforms..."
              onKeyDown={updateSearchQuery}
              onSearch={onClickSearch}
              inputText={inputText}
              setInputText={setInputText}
            />
            <div className="clear-filter">
              <MobileListFilter
                mobileBackColor={mobileFilterBackColor}
                backColor={backColor}
                bgColor={bgColor}
                borderColor={darkMode ? '#1F242F' : '#d1dbfb'}
                fontColor={fontColor}
                fontColor1={fontColor1}
                fontColor4={fontColor4}
                // filterColor={filterColor}
                hoverColor={hoverColor}
              >
                <Dropdown className="filter-sort">
                  <Dropdown.Toggle className="toggle">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      Sort By:
                      <span>{sortId === -1 ? '' : SortsList[sortId].name}</span>
                      <img src={SortsList[sortId].img} className="sort-icon" alt="sort" />
                    </div>
                    <MobileFilterBtn
                      inputBorderColor={inputBorderColor}
                      type="button"
                      darkmode={darkMode ? 'true' : 'false'}
                    >
                      <IoIosArrowDown color={inputFontColor} fontSize={20} />
                    </MobileFilterBtn>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="menu">
                    {SortsList.map((item, i) => (
                      <Dropdown.Item
                        className={`item ${
                          sortId !== -1 && item.type === SortsList[sortId].type ? 'active-item' : ''
                        }`}
                        key={i}
                        onClick={() => {
                          setSortId(item.id)
                          updateSortQuery(item.type)
                        }}
                      >
                        <DropdownRow>
                          <div>{item.name}</div>
                          <img
                            src={item.img}
                            className="sort-icon"
                            alt="sort"
                            style={{ marginLeft: '10px' }}
                          />
                        </DropdownRow>
                        <img className="checked" src={MobileSortCheckedIcon} alt="" />
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </MobileListFilter>
              <MobileClearFilter
                onClick={() => {
                  document.getElementById('search-input').value = ''
                  setSearchQuery('')
                  setInputText('')
                  // clear collaboration and trends
                  onClearSpecDropdowns()
                  setStringSearch(false)
                  onSelectActiveType(['Active'])
                  onSelectStableCoin(false)
                  onAssetClick('')
                  onSelectFarmType('')
                  onDepositedOnlyClick(false)
                  setAssetsId(-1)
                  setRiskId(-1)
                  setMobileAssetsId(-1)
                  setMobileRiskId(-1)
                  setFarmId(-1)
                  setMobileFilterCount(0)
                  setSelectedClass([0, 1, 2, 3, 4])
                  setShowInactiveFarms(false)
                  setSelChain([
                    CHAIN_IDS.ETH_MAINNET,
                    CHAIN_IDS.POLYGON_MAINNET,
                    CHAIN_IDS.ARBITRUM_ONE,
                    CHAIN_IDS.BASE,
                    CHAIN_IDS.ZKSYNC,
                  ])
                  clearFilter()
                }}
                borderColor={darkMode ? '#1F242F' : '#d1dbfb'}
                fontColor={fontColor2}
                mobileColor={darkMode ? '#fff' : '#000'}
                backColor={backColor}
              >
                <Counter count={mobileFilterCount}>
                  {mobileFilterCount > 0 ? mobileFilterCount : ''}
                </Counter>
                &nbsp;Clear
              </MobileClearFilter>
            </div>
          </MobileListHeaderSearch>
        </MobileView>
      )}
    </div>
  )
}

export default QuickFilter
