import React, { Fragment, useEffect, useState } from 'react'
import { Dropdown, Offcanvas } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import { PiSunDimFill, PiMoonBold } from 'react-icons/pi'
import { IoCloseCircleOutline, IoCheckmark } from 'react-icons/io5'
import ConnectSuccessIcon from '../../assets/images/logos/sidebar/connect-success.svg'
import ConnectFailureIcon from '../../assets/images/logos/sidebar/connect-failure.svg'
import connectAvatar from '../../assets/images/logos/sidebar/connect-frame.svg'
import connectAvatarMobile from '../../assets/images/logos/sidebar/connectavatarmobile.svg'
// import Docs from '../../assets/images/logos/sidebar/docs.svg'
import FAQ from '../../assets/images/logos/sidebar/faq.svg'
import ActiveDarkMobileBottomHome from '../../assets/images/logos/sidebar/active-dark-home.svg'
import ActiveWhiteMobileBottomHome from '../../assets/images/logos/sidebar/active-white-home.svg'
import { useRate } from '../../providers/Rate'
import ActiveWhiteMobileBottomAdvanced from '../../assets/images/logos/sidebar/active-white-farms.svg'
import Home from '../../assets/images/logos/sidebar/home-line.svg'
import MobileBottomHome from '../../assets/images/logos/sidebar/bottom-home.svg'
import Beginners from '../../assets/images/logos/sidebar/beginners.svg'
import Support from '../../assets/images/logos/sidebar/support.svg'
import Analytics from '../../assets/images/logos/sidebar/analytics.svg'
import BlackLeader from '../../assets/images/logos/sidebar/leader_icon_black.svg'
import BlackMigrate from '../../assets/images/logos/sidebar/Migrate_black.svg'
// import Collaborations from '../../assets/images/logos/sidebar/collaborations.svg'
import Advanced from '../../assets/images/logos/sidebar/advanced.svg'
import logoNew from '../../assets/images/logos/sidebar/ifarm.svg'
import logoNewDark from '../../assets/images/logos/sidebar/ifarm_dark.svg'
import LogoutIcon from '../../assets/images/logos/sidebar/logout.svg'
import Wallet from '../../assets/images/logos/sidebar/wallet.svg'
import WalletOff from '../../assets/images/logos/sidebar/wallet_off.svg'
import WalletActive from '../../assets/images/logos/sidebar/wallet_active.svg'
import WalletInactive from '../../assets/images/logos/sidebar/wallet_inactive.svg'
import Toggle from '../../assets/images/logos/sidebar/more-mobile.svg'
// import DocsMobile from '../../assets/images/logos/sidebar/docs-mobile.svg'
import { ROUTES, supportedCurrencies } from '../../constants'
import { CHAIN_IDS } from '../../data/constants'
import DropDownIcon from '../../assets/images/logos/advancedfarm/drop-down.svg'
import { usePools } from '../../providers/Pools'
import { useThemeContext } from '../../providers/useThemeContext'
import usePersistedState from '../../providers/usePersistedState'
import { useWallet } from '../../providers/Wallet'
import { fromWei } from '../../services/web3'
import { getChainIcon } from '../../utilities/parsers'
import { formatAddress, isLedgerLive, isSpecialApp } from '../../utilities/formats'
import Social from '../Social'
import CopyIcon from '../../assets/images/logos/sidebar/copy.svg'
import WhiteCopyIcon from '../../assets/images/logos/sidebar/white-copy.svg'
import WhiteOnOff from '../../assets/images/logos/sidebar/white-on-off.svg'
import OnOff from '../../assets/images/logos/sidebar/on-off.svg'
import {
  Address,
  ConnectAvatar,
  ConnectButtonStyle,
  Container,
  FlexDiv,
  Layout,
  Link,
  LinkContainer,
  LinksContainer,
  MobileFollow,
  MiddleActionsContainer,
  MobileActionsContainer,
  MobileWalletTop,
  MobileWalletTopNet,
  MobileWalletBody,
  MobileAmount,
  MobileAmountDiv,
  MobileWalletBtn,
  MobileWalletButton,
  MobileConnectBtn,
  MobileLinkContainer,
  MobileToggle,
  MobileView,
  OffcanvasDiv,
  SideIcons,
  ThemeMode,
  UserDropDown,
  UserDropDownItem,
  UserDropDownMenu,
  BottomPart,
  Logo,
  Desktop,
  NewTag,
  LinkMobile,
  MobileMenuContainer,
  Mobile,
  ConnectSection,
  MoreBtn,
  CurrencyDiv,
  LinkName,
  MobileMoreTop,
} from './style'
import {
  HeaderButton,
  CurrencyDropDown,
  CurrencySelect,
  CurrencyDropDownMenu,
  CurrencyDropDownItem,
} from '../../pages/Portfolio/style'

const sideLinksTop = [
  {
    path: ROUTES.PORTFOLIO,
    name: 'Portfolio',
    imgPath: Home,
  },
  {
    path: ROUTES.BEGINNERSFARM,
    name: 'Beginners',
    imgPath: Beginners,
  },
  {
    path: ROUTES.ADVANCED,
    name: 'All Farms',
    imgPath: Advanced,
  },
  // {
  //   path: ROUTES.COLLABORATIONS,
  //   name: 'Collaborations',
  //   imgPath: Collaborations,
  //   new: true,
  //   enabled: false,
  // },
]

const sideLinksBottom = [
  {
    path: ROUTES.MIGRATE,
    name: 'Migrate Position',
    imgPath: BlackMigrate,
    external: false,
  },
  {
    path: ROUTES.LEADERBOARD,
    name: 'Leaderboard',
    imgPath: BlackLeader,
    external: false,
  },
  {
    path: ROUTES.ANALYTIC,
    name: 'Analytics',
    imgPath: Analytics,
    external: false,
  },
  {
    path: ROUTES.TUTORIAL,
    name: 'Tutorial',
    imgPath: FAQ,
    external: false,
    newTab: true,
  },
  // {
  //   path: ROUTES.DOC,
  //   name: 'Docs',
  //   imgPath: Docs,
  //   external: false,
  //   newTab: true,
  // },
  {
    path: ROUTES.LiveSupport,
    name: 'Support',
    imgPath: Support,
    external: true,
    newTab: true,
  },
]

const sideLinksMobile = [
  {
    path: ROUTES.PORTFOLIO,
    name: 'Portfolio',
    imgPath: MobileBottomHome,
    darkImg: ActiveDarkMobileBottomHome,
    whiteImg: ActiveWhiteMobileBottomHome,
    linkName: 'Portfolio',
  },
  {
    path: ROUTES.ADVANCED,
    name: 'All Farms',
    imgPath: ActiveWhiteMobileBottomAdvanced,
    isFarms: true,
    linkName: 'Farms',
  },
]

const sideLinksMobileBottom = [
  {
    path: ROUTES.PORTFOLIO,
    name: 'Portfolio',
    imgPath: Home,
  },
  {
    path: ROUTES.BEGINNERSFARM,
    name: 'Beginners',
    imgPath: Beginners,
  },
  {
    path: ROUTES.ADVANCED,
    name: 'All Farms',
    imgPath: Advanced,
  },
  {
    path: ROUTES.MIGRATE,
    name: 'Migrate Position',
    imgPath: BlackMigrate,
    external: false,
  },
  {
    path: ROUTES.LEADERBOARD,
    name: 'Leaderboard',
    imgPath: BlackLeader,
    external: false,
  },
  {
    path: ROUTES.ANALYTIC,
    name: 'Analytics',
    imgPath: Analytics,
  },
  {
    path: ROUTES.TUTORIAL,
    name: 'Tutorial',
    imgPath: FAQ,
    newTab: true,
  },
  {
    path: ROUTES.LiveSupport,
    name: 'Support',
    imgPath: Support,
    external: true,
    newTab: true,
  },
  // {
  //   path: ROUTES.DOC,
  //   name: 'Docs',
  //   imgPath: DocsMobile,
  //   newTab: true,
  // },
]

const SideLink = ({
  item,
  subItem,
  isDropdownLink,
  fontColor1,
  activeIconColor,
  darkMode,
  hoverColorSide,
  className,
}) => {
  const { pathname } = useLocation()
  const pageName =
    pathname === '/'
      ? 'all farms'
      : pathname === ROUTES.PORTFOLIO
      ? 'portfolio'
      : pathname === ROUTES.TUTORIAL
      ? 'tutorial'
      : pathname === ROUTES.MIGRATE
      ? 'migrate position'
      : pathname
  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <Link
      fontColor1={fontColor1}
      active={pageName.includes(item.name.toLowerCase().trim())}
      subItem={subItem}
      isDropdownLink={isDropdownLink}
      activeIconColor={activeIconColor}
      darkMode={darkMode}
      enabled={item.enabled === false ? 'false' : 'true'}
      hoverColorSide={hoverColorSide}
      className={className}
    >
      <div className="item">
        <SideIcons
          className="sideIcon"
          src={item.imgPath}
          alt="Harvest"
          width={item.name === 'Portfolio' ? '20px' : '24px'}
          height={item.name === 'Portfolio' ? '20px' : '24px'}
        />
      </div>
      <div className="item-name">{item.name}</div>
      {item.new ? <NewTag>New</NewTag> : <></>}
    </Link>
  )
}

const MobileMenu = ({
  item,
  subItem,
  isDropdownLink,
  fontColor,
  activeIconColor,
  darkMode,
  isWallet,
  isMobile,
  isMobileBottom,
}) => {
  const { pathname } = useLocation()
  const pageName =
    pathname === '/' ? 'all farms' : pathname === ROUTES.PORTFOLIO ? 'portfolio' : pathname
  const active = !isWallet && pageName.includes(item.name.toLowerCase())
  const isFarms = item.isFarms
  const farmsFilter =
    active && isFarms
      ? darkMode
        ? 'invert(100%) sepia(1%) saturate(3890%) hue-rotate(51deg) brightness(113%) contrast(100%);'
        : ''
      : !active && isFarms
      ? 'invert(51%) sepia(1%) saturate(2273%) hue-rotate(333deg) brightness(93%) contrast(81%)'
      : ''
  return (
    <LinkMobile
      fontColor={fontColor}
      active={!isWallet && pageName.includes(item.name.toLowerCase())}
      subItem={subItem}
      isDropdownLink={isDropdownLink}
      activeIconColor={activeIconColor}
      darkMode={darkMode}
      enabled={item.enabled === false ? 'false' : 'true'}
      isMobile={isMobile}
      farmsFilter={farmsFilter}
    >
      <SideIcons
        className="sideIcon"
        src={
          isMobileBottom && !isFarms
            ? active
              ? darkMode
                ? item.darkImg
                : item.whiteImg
              : item.imgPath
            : item.imgPath
        }
        alt="Harvest"
        width={item.name === 'Portfolio' ? '18px' : '22px'}
        height={item.name === 'Portfolio' ? '18px' : '22px'}
        marginTop={item.name === 'All Farms' ? '-1px' : ''}
      />
      <LinkName
        color={active ? (darkMode ? '#ffffff' : '#000000') : '#7A7A7A'}
        marginTop={item.name === 'Portfolio' ? '5px' : ' 2px'}
      >
        {item.linkName}
      </LinkName>
      {item.new ? <NewTag>New</NewTag> : <></>}
    </LinkMobile>
  )
}

const Sidebar = ({ width }) => {
  const {
    darkMode,
    setDarkMode,
    backColor,
    bgColor,
    fontColor,
    fontColor1,
    fontColor2,
    filterColor,
    fontColor5,
    inputBorderColor,
    hoverImgColor,
    toggleColor,
    borderColor,
    hoverColor,
    hoverColorButton,
    hoverColorSide,
    toggleBackColor,
    sidebarFontColor,
    sidebarActiveFontColor,
    sidebarActiveIconColor,
    backColorButton,
    hoverColorNew,
  } = useThemeContext()

  const {
    account,
    connectAction,
    disconnectAction,
    chainId,
    connected,
    setSelChain,
    balances,
    getWalletBalances,
  } = useWallet()

  const { disableWallet } = usePools()

  const switchTheme = () => setDarkMode(prev => !prev)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('darkMode', '')
    } else {
      document.documentElement.removeAttribute('darkMode', '')
    }
  }, [darkMode])

  const { pathname } = useLocation()
  const { push } = useHistory()

  // Show sidebar for mobile
  const [mobileShow, setMobileShow] = useState(false)
  const [mobileWalletShow, setMobileWalletShow] = useState(false)
  const [mobileConnectShow, setMobileConnectShow] = useState(false)
  const [copyAddress, setCopyAddress] = useState('Copy Address')
  const [balanceETH, setBalanceETH] = useState('')
  const [balanceUSDC, setBalanceUSDC] = useState('')
  const { rates, updateCurrency } = useRate()
  const [curCurrency, setCurCurrency] = useState(supportedCurrencies[0])
  const [migrateClick, setMigrateClick] = usePersistedState('migrateClick', false)

  const handleMobileClose = () => setMobileShow(false)
  const handleMobileShow = () => setMobileShow(true)
  const handleMobileWalletClose = () => setMobileWalletShow(false)
  const handleMobileWalletShow = () => setMobileWalletShow(true)
  const handleMobileConnectClose = () => setMobileConnectShow(false)
  const handleMobileConnectShow = () => setMobileConnectShow(true)
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(account).then(() => {
      setCopyAddress('Copied Address')

      setTimeout(() => {
        setCopyAddress('Copy Address')
      }, 1500)
    })
  }

  useEffect(() => {
    setCurCurrency(supportedCurrencies[rates.currency.id])
  }, [rates])

  const handleMobileWalletDetailShow = async () => {
    const showBalanceTokens =
      chainId === CHAIN_IDS.BASE
        ? ['WETH_base', 'USDC_base']
        : chainId === CHAIN_IDS.POLYGON_MAINNET
        ? ['WETH_polygon', 'USDC_polygon']
        : chainId === CHAIN_IDS.ARBITRUM_ONE
        ? ['WETH_arbitrum', 'USDC_arbitrum']
        : chainId === CHAIN_IDS.ZKSYNC
        ? ['WETH_zksync', 'USDC_zksync']
        : ['WETH', 'USDC']
    handleMobileWalletShow()
    await getWalletBalances(showBalanceTokens, false, true)
  }

  useEffect(() => {
    const ethBalance = fromWei(
      chainId === CHAIN_IDS.BASE
        ? balances.WETH_base
        : chainId === CHAIN_IDS.POLYGON_MAINNET
        ? balances.WETH_polygon
        : chainId === CHAIN_IDS.ARBITRUM_ONE
        ? balances.WETH_arbitrum
        : chainId === CHAIN_IDS.ZKSYNC
        ? balances.WETH_zksync
        : balances.WETH,
      18,
    )
    const usdcBalance = fromWei(
      chainId === CHAIN_IDS.BASE
        ? balances.USDC_base
        : chainId === CHAIN_IDS.POLYGON_MAINNET
        ? balances.USDC_polygon
        : chainId === CHAIN_IDS.ARBITRUM_ONE
        ? balances.USDC_arbitrum
        : chainId === CHAIN_IDS.ZKSYNC
        ? balances.USDC_zksync
        : balances.USDC,
      6,
    )
    setBalanceETH(ethBalance)
    setBalanceUSDC(usdcBalance)
  }, [balances, chainId])

  const directAction = path => {
    if (path === ROUTES.PORTFOLIO || path === ROUTES.ANALYTIC || path === ROUTES.BEGINNERS) {
      setSelChain([
        CHAIN_IDS.ETH_MAINNET,
        CHAIN_IDS.POLYGON_MAINNET,
        CHAIN_IDS.ARBITRUM_ONE,
        CHAIN_IDS.BASE,
        CHAIN_IDS.ZKSYNC,
      ])
    }
    push(path)
  }

  const handleMigrateClick = () => {
    setMigrateClick(true)
  }

  useEffect(() => {
    if (pathname.includes('migrate')) {
      setMigrateClick(true)
    }
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container
      width={width}
      darkMode={darkMode}
      backColor={backColor}
      borderColor={borderColor}
      fontColor={fontColor}
    >
      <Desktop>
        <Layout>
          <MiddleActionsContainer>
            <LinksContainer fontColor={fontColor2} totalItems={sideLinksTop.length + 2}>
              <Logo
                className="logo"
                onClick={() => {
                  push('/')
                }}
              >
                <img src={darkMode ? logoNewDark : logoNew} width={36} height={36} alt="Harvest" />
              </Logo>

              {(() => {
                if (!connected) {
                  return (
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
                  )
                }

                if (!chainId) {
                  return (
                    <button onClick={disconnectAction} type="button">
                      Wrong network
                    </button>
                  )
                }
                return (
                  <Dropdown>
                    <UserDropDown
                      id="dropdown-basic"
                      fontcolor2={fontColor2}
                      hovercolor={hoverColor}
                    >
                      <FlexDiv>
                        <ConnectAvatar avatar>
                          <img src={connectAvatar} alt="" />
                        </ConnectAvatar>
                        <div className="detail-info">
                          <ConnectAvatar color={fontColor1}>
                            Hello, farmer{' '}
                            <span role="img" aria-label="hand" aria-labelledby="hand">
                              👋
                            </span>
                          </ConnectAvatar>
                          <Address>{formatAddress(account)}</Address>
                        </div>
                      </FlexDiv>
                      <img alt="chain icon" src={getChainIcon(chainId)} className="chain-icon" />
                    </UserDropDown>
                    {!isSpecialApp ? (
                      <UserDropDownMenu backcolor={backColor} bordercolor={borderColor}>
                        <UserDropDownItem
                          onClick={() => {
                            disconnectAction()
                          }}
                          fontcolor={fontColor}
                          filtercolor={filterColor}
                        >
                          <img src={LogoutIcon} width="18px" height="18px" alt="" />
                          <div>Log Out</div>
                        </UserDropDownItem>
                      </UserDropDownMenu>
                    ) : (
                      <></>
                    )}
                  </Dropdown>
                )
              })()}

              {sideLinksTop.map(item =>
                !isLedgerLive() ||
                (isLedgerLive() &&
                  (chainId === CHAIN_IDS.BASE ||
                    (chainId !== CHAIN_IDS.BASE && item.name !== 'Beginners'))) ? (
                  <Fragment key={item.name}>
                    <LinkContainer
                      active={pathname.includes(item.path)}
                      activeColor={item.activeColor}
                      hoverImgColor={hoverImgColor}
                      onClick={() => {
                        if (item.newTab) {
                          window.open(item.path, '_blank')
                        } else if (item.enabled !== false) {
                          directAction(item.path)
                        }
                      }}
                      darkMode={darkMode}
                    >
                      <SideLink
                        item={item}
                        isDropdownLink={item.path === '#'}
                        fontColor1={fontColor1}
                        activeIconColor={sidebarActiveIconColor}
                        darkMode={darkMode}
                        hoverColorSide={hoverColorSide}
                      />
                    </LinkContainer>
                  </Fragment>
                ) : (
                  <></>
                ),
              )}
            </LinksContainer>
          </MiddleActionsContainer>
        </Layout>

        <BottomPart>
          <LinksContainer totalItems={sideLinksBottom.length + 2}>
            {sideLinksBottom.map(item => (
              <Fragment key={item.name}>
                <LinkContainer
                  active={pathname.includes(item.path)}
                  hoverImgColor={hoverImgColor}
                  onClick={() => {
                    if (item.newTab) {
                      window.open(item.path, '_blank')
                    } else {
                      directAction(item.path)
                    }
                    if (item.name === 'Migrate Position') {
                      handleMigrateClick()
                    }
                  }}
                >
                  <SideLink
                    item={item}
                    isDropdownLink={item.path === '#'}
                    fontColor1={fontColor1}
                    activeFontColor={sidebarActiveFontColor}
                    activeIconColor={sidebarActiveIconColor}
                    darkMode={darkMode}
                    hoverColorSide={hoverColorSide}
                    className={
                      item.name === 'Migrate Position'
                        ? !migrateClick && darkMode
                          ? 'leaderboard-dark-btn'
                          : !migrateClick && !darkMode
                          ? 'leaderboard-white-icon'
                          : ''
                        : ''
                    }
                  />
                </LinkContainer>
              </Fragment>
            ))}
          </LinksContainer>
          <CurrencyDiv>
            <MobileFollow>
              <Social />
            </MobileFollow>
            <ThemeMode
              mode={darkMode ? 'dark' : 'light'}
              backColor={toggleBackColor}
              borderColor={borderColor}
              color={fontColor5}
            >
              <div id="theme-switch">
                <div className="switch-track">
                  <div className="switch-thumb">{darkMode ? <PiMoonBold /> : <PiSunDimFill />}</div>
                  <div className="switch-icon">{darkMode ? <PiSunDimFill /> : <PiMoonBold />}</div>
                </div>

                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={switchTheme}
                  aria-label="Switch between dark and light mode"
                />
              </div>
            </ThemeMode>
          </CurrencyDiv>
        </BottomPart>
      </Desktop>
      <Mobile>
        <MobileView borderColor={borderColor}>
          {/* Full Menu */}
          <OffcanvasDiv
            show={mobileShow}
            onHide={handleMobileClose}
            placement="bottom"
            fontcolor={fontColor}
            filtercolor={filterColor}
          >
            <Offcanvas.Body>
              <MobileActionsContainer
                className="full-menu-container"
                bgColor={bgColor}
                borderColor={borderColor}
              >
                <Logo
                  color={fontColor5}
                  className="logo"
                  onClick={() => {
                    handleMobileClose()
                  }}
                >
                  <MobileMoreTop>
                    {connected ? (
                      <>
                        <img
                          className="chainIcon"
                          alt="chain icon"
                          src={getChainIcon(chainId)}
                          style={{ width: 21, height: 21 }}
                        />
                        <img
                          className="chainStatus"
                          alt="Chain icon"
                          src={ConnectSuccessIcon}
                          style={{ width: 6, height: 6, marginLeft: '10px' }}
                        />
                        <Address color={darkMode ? '#ffffff' : '#000000'}>
                          {formatAddress(account)}
                        </Address>
                        <MobileWalletButton
                          fontColor5={fontColor5}
                          backColor={backColor}
                          borderColor={borderColor}
                          onClick={handleCopyAddress}
                          marginLeft="10px"
                        >
                          <img
                            className="chainIcon"
                            alt="chain icon"
                            src={darkMode ? WhiteCopyIcon : CopyIcon}
                            style={{ width: 18, height: 18 }}
                          />
                        </MobileWalletButton>
                        <MobileWalletButton
                          fontColor5={fontColor5}
                          backColor={backColor}
                          borderColor={borderColor}
                          onClick={() => {
                            disconnectAction()
                            handleMobileWalletClose()
                          }}
                          marginLeft="15px"
                        >
                          <img
                            className="chainIcon"
                            alt="chain icon"
                            src={darkMode ? WhiteOnOff : OnOff}
                            style={{ width: 18, height: 18 }}
                          />
                        </MobileWalletButton>
                      </>
                    ) : (
                      <>
                        <img
                          className="chainStatus"
                          alt="Chain icon"
                          src={ConnectFailureIcon}
                          style={{ width: 6, height: 6 }}
                        />
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
                      </>
                    )}
                  </MobileMoreTop>
                  <IoCloseCircleOutline className="close" />
                </Logo>
                {sideLinksMobileBottom.map(item => (
                  <Fragment key={item.name}>
                    <MobileLinkContainer
                      active={pathname.includes(item.path)}
                      activeColor={item.activeColor}
                      hoverImgColor={hoverImgColor}
                      onClick={() => {
                        if (item.newTab) {
                          window.open(item.path, '_blank')
                        } else if (item.enabled !== false) {
                          directAction(item.path)
                          handleMobileClose()
                        }
                      }}
                    >
                      <SideLink
                        item={item}
                        isDropdownLink={item.path === '#'}
                        fontColor1={fontColor1}
                        activeFontColor={sidebarActiveFontColor}
                        activeIconColor={sidebarActiveIconColor}
                        darkMode={darkMode}
                        hoverColorSide={hoverColorSide}
                      />
                    </MobileLinkContainer>
                    {item.subItems ? (
                      <LinkContainer hideOnDesktop>
                        {item.subItems.map(subItem => (
                          <SideLink
                            key={subItem.name}
                            item={subItem}
                            fontColor1={fontColor1}
                            activeFontColor={sidebarActiveFontColor}
                            activeIconColor={sidebarActiveIconColor}
                            darkMode={darkMode}
                            hoverColorSide={hoverColorSide}
                          />
                        ))}
                      </LinkContainer>
                    ) : null}
                  </Fragment>
                ))}
                <MobileFollow>
                  <Social />
                  <ThemeMode
                    mode={darkMode ? 'dark' : 'light'}
                    backColor={toggleBackColor}
                    borderColor={borderColor}
                  >
                    <div id="theme-switch">
                      <div className="switch-track">
                        <div className="switch-thumb">
                          {darkMode ? <PiMoonBold /> : <PiSunDimFill />}
                        </div>
                        <div className="switch-icon">
                          {darkMode ? <PiSunDimFill /> : <PiMoonBold />}
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={switchTheme}
                        aria-label="Switch between dark and light mode"
                      />
                    </div>
                  </ThemeMode>
                  <HeaderButton>
                    <Dropdown>
                      <CurrencyDropDown
                        id="dropdown-basic"
                        bgcolor={backColorButton}
                        fontcolor2={fontColor2}
                        hovercolor={hoverColorNew}
                        style={{ padding: 0 }}
                      >
                        {curCurrency ? (
                          <CurrencySelect
                            backColor={backColor}
                            fontcolor2={fontColor2}
                            hovercolor={hoverColor}
                          >
                            <img
                              className={darkMode ? 'logo-dark' : 'logo'}
                              src={curCurrency.imgPath}
                              width={16}
                              height={16}
                              alt=""
                            />
                            <span>{curCurrency.symbol}</span>
                            <img className="dropdown-icon" src={DropDownIcon} alt="" />
                          </CurrencySelect>
                        ) : (
                          <></>
                        )}
                      </CurrencyDropDown>
                      {!isSpecialApp ? (
                        <CurrencyDropDownMenu backcolor={backColorButton}>
                          {supportedCurrencies.map(elem => {
                            return (
                              <CurrencyDropDownItem
                                onClick={() => {
                                  updateCurrency(elem.id)
                                }}
                                fontcolor={fontColor}
                                filtercolor={filterColor}
                                hovercolor={hoverColorNew}
                                key={elem.id}
                              >
                                <img
                                  className={darkMode ? 'logo-dark' : 'logo'}
                                  src={elem.imgPath}
                                  width={14}
                                  height={14}
                                  alt=""
                                />
                                <span>{elem.symbol}</span>
                                {curCurrency.id === elem.id ? (
                                  <IoCheckmark className="check-icon" />
                                ) : (
                                  <></>
                                )}
                              </CurrencyDropDownItem>
                            )
                          })}
                        </CurrencyDropDownMenu>
                      ) : (
                        <></>
                      )}
                    </Dropdown>
                  </HeaderButton>
                </MobileFollow>
              </MobileActionsContainer>
            </Offcanvas.Body>
          </OffcanvasDiv>
          {/* Wallet Connect */}
          <OffcanvasDiv
            show={mobileConnectShow}
            onHide={handleMobileConnectClose}
            placement="bottom"
            fontcolor={fontColor}
            filtercolor={filterColor}
          >
            <Offcanvas.Body>
              <MobileActionsContainer bgColor={bgColor} borderColor={borderColor}>
                <MobileWalletTop>
                  <MobileWalletTopNet>
                    <img
                      className="chainIcon"
                      alt="chain icon"
                      src={getChainIcon(chainId)}
                      style={{ width: 21, height: 21 }}
                    />
                    <img
                      className="chainStatus"
                      alt="Chain icon"
                      src={ConnectFailureIcon}
                      style={{ width: 6, height: 6 }}
                    />
                  </MobileWalletTopNet>
                  <Logo
                    color={fontColor5}
                    className="logo"
                    onClick={() => {
                      handleMobileConnectClose()
                    }}
                  >
                    <IoCloseCircleOutline className="close" />
                  </Logo>
                </MobileWalletTop>
                <MobileWalletBody className="connect-body">
                  <MobileWalletBtn>
                    <MobileWalletButton
                      className="connect-button"
                      borderColor={borderColor}
                      onClick={() => {
                        connectAction()
                        handleMobileConnectClose()
                      }}
                    >
                      Connect
                    </MobileWalletButton>
                  </MobileWalletBtn>
                </MobileWalletBody>
                <MobileView borderColor={borderColor} className="connect-modal">
                  {sideLinksMobile.map(item => (
                    <Fragment key={item.name}>
                      <MobileMenuContainer
                        active={pathname.includes(item.path)}
                        activeColor={item.activeColor}
                        hoverImgColor={hoverImgColor}
                        onClick={() => {
                          if (item.newTab) {
                            window.open(item.path, '_blank')
                          } else {
                            directAction(item.path)
                          }
                          handleMobileConnectClose()
                        }}
                      >
                        <MobileMenu
                          item={item}
                          isDropdownLink={item.path === '#'}
                          fontColor={sidebarFontColor}
                          activeFontColor={sidebarActiveFontColor}
                          activeIconColor={sidebarActiveIconColor}
                          darkMode={darkMode}
                          isWallet
                          isMobile
                        />
                      </MobileMenuContainer>
                    </Fragment>
                  ))}

                  <ConnectSection>
                    <MobileConnectBtn color="connectwallet">
                      <MobileToggle
                        className="wallet-btn"
                        toggleColor={toggleColor}
                        width={27}
                        height={21}
                        src={WalletInactive}
                        alt=""
                      />
                    </MobileConnectBtn>
                  </ConnectSection>
                  <MoreBtn
                    type="button"
                    onClick={() => {
                      handleMobileConnectClose()
                      handleMobileShow()
                    }}
                  >
                    <MobileToggle
                      toggleColor={toggleColor}
                      width={21}
                      height={21}
                      src={Toggle}
                      alt=""
                    />
                  </MoreBtn>
                </MobileView>
              </MobileActionsContainer>
            </Offcanvas.Body>
          </OffcanvasDiv>
          {/* Wallet Connection Detail */}
          <OffcanvasDiv
            show={mobileWalletShow}
            onHide={handleMobileWalletClose}
            placement="bottom"
            fontcolor={fontColor}
            filtercolor={filterColor}
          >
            <Offcanvas.Body>
              <MobileActionsContainer bgColor={bgColor} borderColor={borderColor}>
                <MobileWalletTop>
                  <MobileWalletTopNet>
                    <img
                      className="chainIcon"
                      alt="chain icon"
                      src={getChainIcon(chainId)}
                      style={{ width: 21, height: 21 }}
                    />
                    <img
                      className="chainStatus"
                      alt="Chain icon"
                      src={ConnectSuccessIcon}
                      style={{ width: 6, height: 6 }}
                    />
                  </MobileWalletTopNet>
                  <Logo
                    color={fontColor5}
                    className="logo"
                    onClick={() => {
                      handleMobileWalletClose()
                    }}
                  >
                    <IoCloseCircleOutline className="close" />
                  </Logo>
                </MobileWalletTop>
                <MobileWalletBody>
                  <ConnectAvatar avatar>
                    <img src={connectAvatarMobile} alt="" />
                  </ConnectAvatar>
                  <Address>{formatAddress(account)}</Address>
                  <MobileAmount fontColor2={fontColor2}>
                    <MobileAmountDiv className="eth-letter">
                      {Number(balanceETH).toFixed(5)} ETH
                    </MobileAmountDiv>
                    <MobileAmountDiv className="middle-letter">|</MobileAmountDiv>
                    <MobileAmountDiv className="usdc-letter">
                      {Number(balanceUSDC).toFixed(2)} USDC
                    </MobileAmountDiv>
                  </MobileAmount>
                  <MobileWalletBtn>
                    <MobileWalletButton
                      fontColor5={fontColor5}
                      backColor={backColor}
                      borderColor={borderColor}
                      onClick={handleCopyAddress}
                    >
                      {copyAddress}
                    </MobileWalletButton>
                    <MobileWalletButton
                      fontColor5={fontColor5}
                      backColor={backColor}
                      borderColor={borderColor}
                      onClick={() => {
                        disconnectAction()
                        handleMobileWalletClose()
                      }}
                    >
                      Disconnect
                    </MobileWalletButton>
                  </MobileWalletBtn>
                </MobileWalletBody>
                <MobileView borderColor={borderColor} className="connect-modal">
                  {sideLinksMobile.map(item => (
                    <Fragment key={item.name}>
                      <MobileMenuContainer
                        active={pathname.includes(item.path)}
                        activeColor={item.activeColor}
                        hoverImgColor={hoverImgColor}
                        onClick={() => {
                          if (item.newTab) {
                            window.open(item.path, '_blank')
                          } else {
                            directAction(item.path)
                          }
                          handleMobileWalletClose()
                        }}
                      >
                        <MobileMenu
                          item={item}
                          isDropdownLink={item.path === '#'}
                          fontColor={sidebarFontColor}
                          activeFontColor={sidebarActiveFontColor}
                          activeIconColor={sidebarActiveIconColor}
                          darkMode={darkMode}
                          isWallet
                          isMobile
                        />
                      </MobileMenuContainer>
                    </Fragment>
                  ))}

                  <ConnectSection>
                    <MobileConnectBtn color="connectwallet">
                      <MobileToggle
                        className={connected ? 'connected-wallet-btn' : 'wallet-btn'}
                        toggleColor={toggleColor}
                        width={27}
                        height={21}
                        src={WalletActive}
                        alt=""
                      />
                    </MobileConnectBtn>
                  </ConnectSection>
                  <MoreBtn
                    type="button"
                    onClick={() => {
                      handleMobileWalletClose()
                      handleMobileShow()
                    }}
                  >
                    <MobileToggle
                      toggleColor={toggleColor}
                      width={21}
                      height={21}
                      src={Toggle}
                      alt=""
                    />
                  </MoreBtn>
                </MobileView>
              </MobileActionsContainer>
            </Offcanvas.Body>
          </OffcanvasDiv>
          {/* Bottom Menu */}
          {sideLinksMobile.map(item => (
            <Fragment key={item.name}>
              <MobileMenuContainer
                active={pathname.includes(item.path)}
                activeColor={item.activeColor}
                hoverImgColor={hoverImgColor}
                onClick={() => {
                  if (item.newTab) {
                    window.open(item.path, '_blank')
                  } else {
                    directAction(item.path)
                  }
                  handleMobileClose()
                }}
              >
                <MobileMenu
                  item={item}
                  isDropdownLink={item.path === '#'}
                  fontColor={sidebarFontColor}
                  activeFontColor={sidebarActiveFontColor}
                  activeIconColor={sidebarActiveIconColor}
                  darkMode={darkMode}
                  isWallet={false}
                  isMobileBottom
                  isMobile
                />
              </MobileMenuContainer>
            </Fragment>
          ))}

          <ConnectSection display="none">
            <MobileConnectBtn
              color="connectwallet"
              connected={connected}
              onClick={
                connected
                  ? () => {
                      handleMobileWalletDetailShow()
                    }
                  : () => {
                      handleMobileConnectShow()
                    }
              }
            >
              <MobileToggle
                className={connected ? 'connected-wallet-btn' : 'wallet-btn'}
                toggleColor={toggleColor}
                width={27}
                height={21}
                src={connected ? Wallet : WalletOff}
                alt=""
              />
            </MobileConnectBtn>
          </ConnectSection>
          <>
            <MobileMenuContainer display="flex" justifyContent="center" alignItems="center">
              <LinkMobile type="button" onClick={handleMobileShow}>
                <SideIcons toggleColor={toggleColor} width={16} height={18} src={Toggle} alt="" />
                <LinkName marginTop="5px" color="#7A7A7A">
                  More
                </LinkName>
              </LinkMobile>
            </MobileMenuContainer>
          </>
        </MobileView>
      </Mobile>
    </Container>
  )
}

export default Sidebar
