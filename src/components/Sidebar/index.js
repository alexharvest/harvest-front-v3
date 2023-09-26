import React, { Fragment, useEffect, useState } from 'react'
import { Dropdown, Offcanvas } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import Analytics from '../../assets/images/logos/sidebar/analytics.svg'
import ConnectDisableIcon from '../../assets/images/logos/sidebar/connect-disable.svg'
import ConnectSuccessIcon from '../../assets/images/logos/sidebar/connect-success.svg'
import connectAvatar from '../../assets/images/logos/sidebar/connectavatar.svg'
import Portfolio from '../../assets/images/logos/sidebar/dashboard.svg'
import Docs from '../../assets/images/logos/sidebar/docs.svg'
import ExternalLink from '../../assets/images/logos/sidebar/external_link.svg'
import FAQ from '../../assets/images/logos/sidebar/faq.svg'
import Farms from '../../assets/images/logos/sidebar/farms.svg'
import logoNew from '../../assets/images/logos/sidebar/ifarm.svg'
import LogoutIcon from '../../assets/images/logos/sidebar/logout.svg'
import MobileConnect from '../../assets/images/logos/sidebar/mobileconnect.svg'
import ProfitSharingIcon from '../../assets/images/logos/sidebar/profit-sharing.svg'
import Toggle from '../../assets/images/logos/sidebar/toggle.svg'
import Arbitrum from '../../assets/images/chains/arbitrum.svg'
import Base from '../../assets/images/chains/base.svg'
import Era from '../../assets/images/chains/era.svg'
import Ethereum from '../../assets/images/chains/ethereum.svg'
import Polygon from '../../assets/images/chains/polygon.svg'
import { ROUTES, directDetailUrl } from '../../constants'
import { CHAIN_IDS } from '../../data/constants'
import { addresses } from '../../data/index'
import { usePools } from '../../providers/Pools'
import { useStats } from '../../providers/Stats'
import { useThemeContext } from '../../providers/useThemeContext'
import { useWallet } from '../../providers/Wallet'
import { formatAddress, getDataQuery, isSpecialApp } from '../../utils'
import SmallApexChart from '../SmallApexChart'
import Social from '../Social'
import {
  AboutHarvest,
  Address,
  BottomDiv,
  ChartDiv,
  ConnectAvatar,
  ConnectButtonStyle,
  Container,
  FlexDiv,
  Follow,
  Layout,
  Link,
  LinkContainer,
  LinksContainer,
  MiddleActionsContainer,
  MobileActionsContainer,
  MobileConnectBtn,
  MobileFollow,
  MobileLinkContainer,
  MobileLinksContainer,
  MobileToggle,
  MobileView,
  OffcanvasDiv,
  ProfitSharing,
  SideIcons,
  ThemeMode,
  TopDiv,
  TopTitle,
  UserDropDown,
  UserDropDownItem,
  UserDropDownMenu,
  BottomPart,
  MobileProfitSharing,
  ProfitPart,
  Divider,
  Logo,
} from './style'

const sideLinks = [
  {
    path: ROUTES.HOME,
    name: 'Home',
    imgPath: Farms,
  },
  {
    path: ROUTES.PORTFOLIO,
    name: 'Portfolio',
    imgPath: Portfolio,
  },
]

const sideLinks1 = [
  {
    path: ROUTES.ANALYTIC,
    name: 'Analytics',
    imgPath: Analytics,
    external: false,
  },
  {
    path: ROUTES.FAQ,
    name: 'FAQ',
    imgPath: FAQ,
    external: false,
  },
  {
    path: 'https://docs.harvest.finance',
    name: 'Docs',
    imgPath: Docs,
    external: false,
    newTab: true,
  },
]

const SideLink = ({
  item,
  subItem,
  isDropdownLink,
  fontColor,
  activeFontColor,
  activeIconColor,
  darkMode,
}) => {
  const { pathname } = useLocation()
  const pageName = pathname === '/' ? 'home' : pathname
  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <Link
      fontColor={fontColor}
      active={pageName.includes(item.name.toLowerCase())}
      subItem={subItem}
      isDropdownLink={isDropdownLink}
      activeColor={activeFontColor}
      activeIconColor={activeIconColor}
      darkMode={darkMode}
    >
      <div className="item">
        <SideIcons
          className="sideIcon"
          src={item.imgPath}
          alt="Harvest"
          width="27px"
          height="27px"
        />
      </div>
      {item.name}
    </Link>
  )
}

const getChainIcon = chainNum => {
  let icon = null
  if (chainNum) {
    switch (chainNum) {
      case CHAIN_IDS.ETH_MAINNET:
        icon = Ethereum
        break
      case CHAIN_IDS.POLYGON_MAINNET:
        icon = Polygon
        break
      case CHAIN_IDS.ARBITRUM_ONE:
        icon = Arbitrum
        break
      case CHAIN_IDS.BASE:
        icon = Base
        break
      case CHAIN_IDS.ERA:
        icon = Era
        break
      default:
        icon = Ethereum
        break
    }
  }
  return icon
}

const Sidebar = ({ width }) => {
  const { account, connectAction, disconnectAction, chainId, connected, setSelChain } = useWallet()
  const { disableWallet } = usePools()
  const { profitShareAPY } = useStats()

  const {
    darkMode,
    setDarkMode,
    backColor,
    fontColor,
    filterColor,
    hoverImgColor,
    sidebarEffect,
    toggleColor,
    borderColor,
    connectWalletBtnBackColor,
    toggleBackColor,
    sidebarFontColor,
    sidebarActiveFontColor,
    sidebarActiveIconColor,
  } = useThemeContext()

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

  const handleMobileClose = () => setMobileShow(false)
  const handleMobileShow = () => setMobileShow(true)

  const [apiData, setApiData] = useState({})
  useEffect(() => {
    const initData = async () => {
      const data = await getDataQuery(365, addresses.iFARM, chainId.toString(), null)
      setApiData(data)
    }
    initData()
  }, [chainId])

  const directAction = path => {
    if (path === ROUTES.PORTFOLIO || path === ROUTES.ANALYTIC) {
      setSelChain([
        CHAIN_IDS.ETH_MAINNET,
        CHAIN_IDS.POLYGON_MAINNET,
        CHAIN_IDS.ARBITRUM_ONE,
        CHAIN_IDS.BASE,
        CHAIN_IDS.ERA,
      ])
    }
    push(path)
  }

  return (
    <Container
      width={width}
      sidebarEffect={sidebarEffect}
      backColor={backColor}
      fontColor={fontColor}
    >
      <Layout>
        <MiddleActionsContainer>
          <LinksContainer totalItems={sideLinks.length + 2}>
            <Logo
              className="logo"
              onClick={() => {
                push('/')
              }}
            >
              <img src={logoNew} width={52} height={52} alt="Harvest" />
            </Logo>

            <Divider height="1px" marginTop="36px" backColor="#EAECF0" />

            {(() => {
              if (!connected) {
                return (
                  <ConnectButtonStyle
                    color="connectwallet"
                    onClick={() => {
                      connectAction()
                    }}
                    minWidth="190px"
                    bordercolor={fontColor}
                    disabled={disableWallet}
                  >
                    <img src={ConnectDisableIcon} className="connect-wallet" alt="" />
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
                    fontcolor={fontColor}
                    hoverbackcolor={connectWalletBtnBackColor}
                  >
                    <FlexDiv>
                      <ConnectAvatar avatar>
                        <img src={connectAvatar} alt="" />
                      </ConnectAvatar>
                      <div className="detail-info">
                        <Address>{formatAddress(account)}</Address>
                        <br />
                        <ConnectAvatar>
                          <img
                            alt="Chain icon"
                            src={ConnectSuccessIcon}
                            style={{ width: 8, height: 8 }}
                          />
                          {/* )} */}
                          Connected
                        </ConnectAvatar>
                      </div>
                    </FlexDiv>
                    <img
                      alt="chain icon"
                      src={getChainIcon(chainId)}
                      style={{ width: 17, height: 17 }}
                    />
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

            {sideLinks.map(item => (
              <Fragment key={item.name}>
                <LinkContainer
                  active={pathname.includes(item.path)}
                  activeColor={item.activeColor}
                  hoverImgColor={hoverImgColor}
                  onClick={() => {
                    if (item.newTab) {
                      window.open(item.path, '_blank')
                    } else {
                      directAction(item.path)
                    }
                  }}
                >
                  <SideLink
                    item={item}
                    isDropdownLink={item.path === '#'}
                    fontColor={sidebarFontColor}
                    activeFontColor={sidebarActiveFontColor}
                    activeIconColor={sidebarActiveIconColor}
                    darkMode={darkMode}
                  />
                </LinkContainer>
              </Fragment>
            ))}
          </LinksContainer>
          <AboutHarvest />
        </MiddleActionsContainer>
      </Layout>

      <BottomPart>
        <LinksContainer totalItems={sideLinks1.length + 2}>
          {sideLinks1.map(item => (
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
                }}
              >
                <SideLink
                  item={item}
                  isDropdownLink={item.path === '#'}
                  fontColor={sidebarFontColor}
                  activeFontColor={sidebarActiveFontColor}
                  activeIconColor={sidebarActiveIconColor}
                  darkMode={darkMode}
                />
              </LinkContainer>
            </Fragment>
          ))}
        </LinksContainer>
        {isSpecialApp && chainId !== CHAIN_IDS.ETH_MAINNET ? (
          <></>
        ) : (
          <ProfitSharing
            onClick={() => {
              push(`${directDetailUrl}ethereum/${addresses.FARM}`)
            }}
          >
            <TopDiv>
              <img src={ProfitSharingIcon} alt="profit-sharing" />
              <TopTitle>
                <img src={ConnectDisableIcon} width="7px" height="7px" alt="" />
                Profit-Sharing
              </TopTitle>
            </TopDiv>
            <BottomDiv>
              {Number(profitShareAPY).toFixed(2)}%<div>APR</div>
            </BottomDiv>
            <ChartDiv>
              <SmallApexChart data={apiData} lastAPY={Number(profitShareAPY)} />
            </ChartDiv>
          </ProfitSharing>
        )}

        <Divider height="1px" marginTop="20px" backColor="#EAECF0" />
        <Follow>
          <Social />
          <ThemeMode
            mode={darkMode ? 'dark' : 'light'}
            backColor={toggleBackColor}
            borderColor={borderColor}
          >
            <div id="theme-switch">
              <div className="switch-track">
                <div className="switch-thumb" />
              </div>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={switchTheme}
                aria-label="Switch between dark and light mode"
              />
            </div>
          </ThemeMode>
        </Follow>
      </BottomPart>

      <MobileView>
        <OffcanvasDiv
          show={mobileShow}
          onHide={handleMobileClose}
          placement="end"
          backdrop={false}
          backcolor={backColor}
          fontcolor={fontColor}
          filtercolor={filterColor}
        >
          <Offcanvas.Header closeButton />
          <Offcanvas.Body>
            <MobileActionsContainer>
              <MobileLinksContainer totalItems={sideLinks.length + 2} fontColor={fontColor}>
                {(() => {
                  if (!connected) {
                    return (
                      <ConnectButtonStyle
                        color="connectwallet"
                        onClick={() => {
                          connectAction()
                          handleMobileClose()
                        }}
                        minWidth="190px"
                        bordercolor={fontColor}
                        disabled={disableWallet}
                      >
                        <img src={ConnectDisableIcon} className="connect-wallet" alt="" />
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
                        fontcolor={fontColor}
                        hoverbackcolor={connectWalletBtnBackColor}
                      >
                        <FlexDiv>
                          <ConnectAvatar avatar>
                            <img src={connectAvatar} alt="" />
                          </ConnectAvatar>
                          <div className="detail-info">
                            <Address>{formatAddress(account)}</Address>
                            <br />
                            <ConnectAvatar>
                              <img
                                alt="Chain icon"
                                src={ConnectSuccessIcon}
                                style={{ width: 8, height: 8 }}
                              />
                              Connected
                            </ConnectAvatar>
                          </div>
                        </FlexDiv>
                        <img
                          alt="chain icon"
                          src={getChainIcon(chainId)}
                          style={{ width: 17, height: 17 }}
                        />
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

                {sideLinks.map(item => (
                  <Fragment key={item.name}>
                    <MobileLinkContainer
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
                      <SideLink
                        item={item}
                        isDropdownLink={item.path === '#'}
                        fontColor={sidebarFontColor}
                        activeFontColor={sidebarActiveFontColor}
                        activeIconColor={sidebarActiveIconColor}
                        darkMode={darkMode}
                      />
                    </MobileLinkContainer>
                  </Fragment>
                ))}
              </MobileLinksContainer>
              <AboutHarvest />
              {sideLinks1.map(item => (
                <Fragment key={item.name}>
                  <MobileLinkContainer
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
                    <SideLink
                      item={item}
                      isDropdownLink={item.path === '#'}
                      fontColor={sidebarFontColor}
                      activeFontColor={sidebarActiveFontColor}
                      activeIconColor={sidebarActiveIconColor}
                      darkMode={darkMode}
                    />
                    {item.external ? (
                      <div className="item">
                        <SideIcons
                          className="external-link"
                          src={ExternalLink}
                          alt="external-link"
                          filterColor={filterColor}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </MobileLinkContainer>
                  {item.subItems ? (
                    <LinkContainer hideOnDesktop>
                      {item.subItems.map(subItem => (
                        <SideLink
                          key={subItem.name}
                          item={subItem}
                          fontColor={fontColor}
                          activeFontColor={sidebarActiveFontColor}
                          activeIconColor={sidebarActiveIconColor}
                          darkMode={darkMode}
                        />
                      ))}
                    </LinkContainer>
                  ) : null}
                </Fragment>
              ))}
            </MobileActionsContainer>
            <ProfitPart>
              <MobileProfitSharing
                onClick={() => {
                  push(`${directDetailUrl}ethereum/${addresses.FARM}`)
                }}
              >
                <TopDiv>
                  <img src={ProfitSharingIcon} alt="profit-sharing" />
                  <TopTitle>
                    <img src={ConnectDisableIcon} width="7px" height="7px" alt="" />
                    Profit-Sharing
                  </TopTitle>
                </TopDiv>
                <BottomDiv>
                  {Number(profitShareAPY).toFixed(2)}%<div>APR</div>
                </BottomDiv>
                <ChartDiv>
                  <SmallApexChart data={apiData} lastAPY={Number(profitShareAPY)} />
                </ChartDiv>
              </MobileProfitSharing>
            </ProfitPart>
            <MobileFollow>
              <Social />
              <ThemeMode
                mode={darkMode ? 'dark' : 'light'}
                backColor={toggleBackColor}
                borderColor={borderColor}
              >
                <div id="theme-switch">
                  <div className="switch-track">
                    <div className="switch-thumb" />
                  </div>

                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={switchTheme}
                    aria-label="Switch between dark and light mode"
                  />
                </div>
              </ThemeMode>
            </MobileFollow>
          </Offcanvas.Body>
        </OffcanvasDiv>
        <MobileConnectBtn
          color="connectwallet"
          connected={connected}
          onClick={() => {
            connectAction()
          }}
        >
          <img src={ConnectDisableIcon} className="connect-wallet" alt="" />
          <img src={MobileConnect} alt="" />
        </MobileConnectBtn>
        <a className="logo" href="/">
          <img src={logoNew} width={52} height={52} alt="Harvest" />
        </a>
        <button type="button" onClick={handleMobileShow}>
          <MobileToggle toggleColor={toggleColor} src={Toggle} alt="" />
        </button>
      </MobileView>
    </Container>
  )
}

export default Sidebar
