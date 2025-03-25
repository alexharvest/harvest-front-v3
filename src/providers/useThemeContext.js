import React, { createContext, useContext, useState } from 'react'
import usePersistedState from './usePersistedState'

// register the context
const ThemeContext = createContext({})

/**
 * export custom provider
 * @param {boolean} darkMode
 * @returns
 */
export function ThemeProvider({ children }) {
  /** usePersistedState for storing state in local store */
  const [showInactiveFarms, setShowInactiveFarms] = usePersistedState('showInactiveFarms', false)
  // const [darkMode, setDarkMode] = useState(false);
  const [darkMode, setDarkMode] = usePersistedState('darkmode', false)

  const switchMode = darkMode ? 'dark' : 'light'

  const pageBackColor = darkMode ? '#15202B' : '#fff'
  const backColor = darkMode ? '#0C111D' : '#fff'
  const backColorButton = darkMode ? '#1E293B' : '#fff'
  const bgColorModal = darkMode ? '#15191C' : '#F2F5FF'
  const bgColor = darkMode ? '#161B26' : '#fff'
  const bgColorTooltip = darkMode ? '#59607A' : '#fff'
  const bgColorNew = darkMode ? '#15191C' : '#fff'
  const bgColorFarm = darkMode ? '#213662' : '#f2f5ff'
  const bgColorSup = darkMode ? '#213662' : '#7289da'
  const bgColorMessage = darkMode ? '#242c3c' : '#fcfcfd'
  const bgColorButton = darkMode ? '#242c3c' : '#eaf1ff'
  const bgColorSlippage = darkMode ? '#1F242F' : '#15b088'
  const bgColorChart = darkMode ? '#161B26' : '#f3f6ff'
  const bgColorBox = darkMode ? '#202325' : '#fff'
  const toggleBackColor = darkMode ? '#181f27' : '#E9EAF0'

  const fontColor = darkMode ? '#fff' : '#475467'
  const fontColor1 = darkMode ? '#fff' : '#101828'
  const fontColor2 = darkMode ? '#fff' : '#344054'
  const fontColor3 = darkMode ? '#D9D9D9' : '#6F78AA'
  const fontColor4 = darkMode ? '#fff' : '#1F2937'
  const fontColor5 = darkMode ? '#fff' : '#000'
  const fontColor6 = darkMode ? '#15b088' : '#000'
  const fontColor7 = darkMode ? '#D9D9D9' : '#15191C'
  const fontColor8 = darkMode ? '#ADADAD' : '#939BC7'
  const fontColorTooltip = darkMode ? '#fff' : '#6941c6'
  const inputFontColor = darkMode ? '#fff' : '#667085'
  const linkColor = darkMode ? '#FF9400' : '#6941c6'
  const linkColorTooltip = darkMode ? '#15b088' : '#6941c6'
  const linkColorOnHover = darkMode ? '#00d26b' : '#5318db'

  const borderColor = darkMode ? '#1F242F' : '#F3F6FF'
  const borderColorBox = darkMode ? '#414141' : '#F2F5FF'
  const borderColorBox2 = darkMode ? '#202325' : '#F2F5FF'
  const inputBorderColor = darkMode ? '#1F242F' : '#d0d5dd'
  const hoverColor = darkMode ? '#1F242F' : '#e9f0f7'
  const hoverColorRow = darkMode ? '#282D3A' : '#F7F9FF'
  const hoverColorNew = darkMode ? '#313E55' : '#F7F9FF'
  const hoverColorButton = darkMode ? '#1F242F' : '#F7F9FF'
  const hoverColorSide = darkMode ? '#1E2225' : '#F0F1FA'
  const activeColor = darkMode ? '#242C3C' : '#F3F6FF'
  const activeColorNew = darkMode ? '#5DCF46' : '#F2F5FF'
  const activeColorModal = darkMode ? '#242C3C' : '#ECFDF3'
  const modalInputColor = darkMode ? '#242C3C' : '#ffffff'

  const btnColor = '#5dcf46'
  const btnHoverColor = '#51e932'
  const btnActiveColor = '#4bd72f'
  const highlightColor = darkMode ? '#bfbfbf' : '#F4F4F4'

  const filterColorNew =
    'invert(75%) sepia(25%) saturate(1160%) hue-rotate(59deg) brightness(91%) contrast(89%)'
  const filterColor = darkMode
    ? 'invert(100%) sepia(20%) saturate(0%) hue-rotate(40deg) brightness(104%) contrast(101%)'
    : ''
  const filterColor2 = darkMode
    ? 'invert(100%) sepia(20%) saturate(0%) hue-rotate(40deg) brightness(104%) contrast(101%)'
    : 'invert(33%) sepia(11%) saturate(950%) hue-rotate(176deg) brightness(92%) contrast(91%)'
  const filterColorBottom = darkMode
    ? 'invert(100%) sepia(20%) saturate(0%) hue-rotate(40deg) brightness(104%) contrast(101%)'
    : 'invert(57%) sepia(22%) saturate(0%) hue-rotate(197deg) brightness(79%) contrast(90%)'
  const boxShadowColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
  const boxShadowColor2 = darkMode
    ? ''
    : '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)'
  const hoverImgColor =
    'invert(57%) sepia(61%) saturate(2063%) hue-rotate(1deg) brightness(103%) contrast(105%)'

  const switchDarkIconFilter = darkMode
    ? 'invert(49%) sepia(95%) saturate(814%) hue-rotate(2deg) brightness(106%) contrast(103%)'
    : ''
  const switchLightIconFilter = darkMode
    ? ''
    : 'invert(49%) sepia(95%) saturate(814%) hue-rotate(2deg) brightness(106%) contrast(103%)'
  const switchLightBorder = darkMode ? '#FFFFFF' : '#FF9400'
  const switchDarkBorder = darkMode ? '#FFFFFF' : '#15202B'
  const switchDarkBack = darkMode ? '#FFFFFF' : '#15202B'
  const switchLightBack = darkMode ? '#15202B' : '#FFFFFF'

  const dashboardListItemPercentBack = darkMode ? 'rgba(39, 174, 96, 0.1)' : '#E6F8EB'
  const dashboardListItemPercentColor = darkMode ? '#27AE60' : '#1ABC9C'

  const filterChainHoverColor = darkMode ? '#242f3a' : '#6988FF4F'

  const badgeIconBackColor = darkMode ? 'white' : 'rgba(255, 255, 255, 0.6)'

  const narrowIconColor = darkMode
    ? 'invert(100%) sepia(1%) saturate(0%) hue-rotate(213deg) brightness(104%) contrast(100%)'
    : ''

  const toggleColor = darkMode
    ? 'invert(100%) sepia(100%) saturate(300%) hue-rotate(288deg) brightness(120%) contrast(102%)'
    : ''

  const mobileFilterBackColor = darkMode ? 'none' : 'white'
  const mobileFilterBorderColor = darkMode
    ? '1px solid rgba(217, 217, 217, 0.5)'
    : '1px solid #d0d5dd'

  const mobileFilterDisableColor = darkMode ? '#94949f' : 'rgba(21, 32, 43, 0.5)'

  const [switchBalance, setSwitchBalance] = useState(false) // true : USD, false: Token

  const connectWalletBtnHoverBackColor = darkMode ? '#E5E5E5' : 'rgba(255, 148, 0, 0.2)'

  const chartBtnGroupBackColor = darkMode ? '#FFFFFF' : '#FCDC67'

  const widoDetailDividerColor = darkMode ? 'rgba(255, 255, 255, 0.27)' : '#EAECF0'

  const widoBackBtnBackColor = darkMode ? '#FF9400' : 'rgba(255, 148, 0, 0.35)'
  const widoBackBtnBackHoverColor = darkMode ? 'rgba(255, 148, 0, 0.8)' : 'rgba(255, 148, 0, 0.25)'
  const widoBackIconColor = darkMode
    ? ''
    : 'invert(59%) sepia(42%) saturate(2316%) hue-rotate(359deg) brightness(101%) contrast(107%)'

  const vaultPanelHoverColor = darkMode ? '#222f3c' : '#f8f8f9'
  const socialBackColor = darkMode ? 'white' : '#15202B'
  const socialIconColor = darkMode
    ? ''
    : 'invert(92%) sepia(6%) saturate(22%) hue-rotate(195deg) brightness(107%) contrast(107%)'

  const searchBackColor = darkMode ? '#15202B' : '#F5F5F5'
  const searchBorderColor = darkMode ? 'rgba(217, 217, 217, 0.5)' : 'none'
  const searchIconColor = darkMode
    ? 'invert(100%) sepia(20%) saturate(0%) hue-rotate(40deg) brightness(104%) contrast(101%)'
    : ''

  const widoDepoTokenListActiveColor = darkMode ? '#7b8b81' : '#ECFDF3'
  const widoDepoTokenListHoverColor = darkMode ? '#585e5b' : '#e1e5e3'

  const widoSwitchTagBorderColor = darkMode ? '#F2F4F7' : '#F2F4F7'
  const widoSwitchTagBackColor = darkMode ? '#243648' : '#F9FAFB'
  const widoTagBackColor = darkMode ? '#15202B' : '#FFFFFF'
  const widoTagBoxShadow = darkMode
    ? '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
    : '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
  const widoTagFontColor = darkMode ? '#b9bcc3' : '#667085'
  const widoTagActiveFontColor = darkMode ? 'white' : '#344054'
  const widoInputPanelBorderColor = darkMode ? '#D0D5DD' : '#D0D5DD'
  const widoInputBoxShadow = darkMode
    ? '0px 1px 2px rgba(16, 24, 40, 0.05)'
    : '0px 1px 2px rgba(16, 24, 40, 0.05)'
  const widoSelTokenSubTitleColor = darkMode ? '#475467' : '#475467'

  const toggleInactiveBackColor = darkMode ? '' : '#F2F4F7'
  const toggleActiveBackColor = darkMode ? '' : '#7F56D9'

  const sidebarFontColor = darkMode ? '#D0D5DD' : '#000'
  const sidebarActiveIconColor = darkMode
    ? 'invert(95%) sepia(4%) saturate(441%) hue-rotate(183deg) brightness(89%) contrast(94%)'
    : 'invert(46%) sepia(10%) saturate(767%) hue-rotate(183deg) brightness(92%) contrast(90%)'

  const faqQueHoverColor = darkMode ? '#293744' : '#e9e9e9'

  const analyticTitleColor = darkMode ? 'white' : '#475467'

  const mobileFilterHoverColor = darkMode ? '#808081' : '#e9e9e9'

  const filterBorderColor = darkMode ? 'rgba(217, 217, 217, 0.5)' : '#15202b'

  const [openNotify, setOpenNotify] = useState(false) // true : USD, false: Token

  const [prevPage, setPrevPage] = useState('')

  return (
    <ThemeContext.Provider
      value={{
        showInactiveFarms,
        setShowInactiveFarms,
        darkMode,
        setDarkMode,
        switchMode,
        pageBackColor,
        backColorButton,
        bgColorModal,
        fontColor,
        fontColor1,
        fontColor2,
        fontColor3,
        fontColor4,
        fontColor5,
        fontColor6,
        fontColor7,
        fontColor8,
        inputFontColor,
        linkColor,
        linkColorTooltip,
        linkColorOnHover,
        fontColorTooltip,
        backColor,
        bgColor,
        bgColorNew,
        bgColorTooltip,
        borderColor,
        borderColorBox,
        borderColorBox2,
        btnColor,
        btnHoverColor,
        btnActiveColor,
        inputBorderColor,
        hoverColor,
        hoverColorRow,
        hoverColorNew,
        hoverColorButton,
        hoverColorSide,
        activeColor,
        activeColorNew,
        activeColorModal,
        modalInputColor,
        highlightColor,
        bgColorFarm,
        bgColorSup,
        bgColorMessage,
        bgColorButton,
        bgColorSlippage,
        bgColorChart,
        bgColorBox,
        filterColorNew,
        filterColor,
        filterColor2,
        filterColorBottom,
        boxShadowColor,
        boxShadowColor2,
        hoverImgColor,
        switchDarkIconFilter,
        switchLightIconFilter,
        switchLightBorder,
        switchDarkBorder,
        switchDarkBack,
        switchLightBack,
        dashboardListItemPercentBack,
        dashboardListItemPercentColor,
        filterChainHoverColor,
        badgeIconBackColor,
        narrowIconColor,
        toggleColor,
        mobileFilterBackColor,
        mobileFilterBorderColor,
        mobileFilterDisableColor,
        toggleBackColor,
        switchBalance,
        setSwitchBalance,
        connectWalletBtnHoverBackColor,
        chartBtnGroupBackColor,
        widoDetailDividerColor,
        widoBackBtnBackColor,
        widoBackBtnBackHoverColor,
        widoBackIconColor,
        vaultPanelHoverColor,
        socialBackColor,
        socialIconColor,
        searchBackColor,
        searchBorderColor,
        searchIconColor,
        widoDepoTokenListActiveColor,
        widoDepoTokenListHoverColor,
        widoSwitchTagBorderColor,
        widoSwitchTagBackColor,
        widoTagBackColor,
        widoTagBoxShadow,
        widoTagFontColor,
        widoTagActiveFontColor,
        widoInputPanelBorderColor,
        widoInputBoxShadow,
        widoSelTokenSubTitleColor,
        toggleInactiveBackColor,
        toggleActiveBackColor,
        sidebarFontColor,
        sidebarActiveIconColor,
        faqQueHoverColor,
        analyticTitleColor,
        openNotify,
        setOpenNotify,
        mobileFilterHoverColor,
        filterBorderColor,
        prevPage,
        setPrevPage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// export a custom hook to use this specific context
export function useThemeContext() {
  return useContext(ThemeContext)
}
