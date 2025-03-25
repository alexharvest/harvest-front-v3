import React, { useState, useEffect } from 'react'
import { PiSunDimFill, PiMoonBold } from 'react-icons/pi'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Dropdown } from 'react-bootstrap'
import { IoCheckmark } from 'react-icons/io5'

import { useThemeContext } from '../../providers/useThemeContext'
import { useRate } from '../../providers/Rate'
import { supportedCurrencies } from '../../constants'
import DropDownIcon from '../../assets/images/logos/advancedfarm/drop-down.svg'
import {
  Container,
  Inner,
  WrapperDiv,
  DescText,
  CoinSection,
  Title,
  ThemeMode,
  CurrencyDropDown,
  CurrencySelect,
  CurrencyDropDownMenu,
  CurrencyDropDownItem,
  RowWrap,
  CateName,
} from './style'
import { isSpecialApp } from '../../utilities/formats'
import { handleToggle } from '../../utilities/parsers'

const Settings = () => {
  const {
    showInactiveFarms,
    setShowInactiveFarms,
    darkMode,
    setDarkMode,
    backColor,
    bgColorNew,
    fontColor,
    fontColor1,
    fontColor2,
    fontColor5,
    borderColor,
    hoverColorNew,
    hoverColor,
    filterColor,
    toggleBackColor,
  } = useThemeContext()

  const { rates, updateCurrency } = useRate()

  const [curCurrency, setCurCurrency] = useState(supportedCurrencies[0])

  useEffect(() => {
    setCurCurrency(supportedCurrencies[rates.currency.id])
  }, [rates])

  return (
    <Container bgColor={bgColorNew} fontColor={fontColor}>
      <Inner>
        <CoinSection>
          <WrapperDiv>
            <Title fontColor1={fontColor1}>Settings</Title>
            <DescText fontColor={fontColor}>Set displayed currency, app theme and other.</DescText>
          </WrapperDiv>
          <WrapperDiv>
            <RowWrap>
              <CateName>Theme</CateName>
              <div>
                <ThemeMode
                  mode={darkMode ? 'dark' : 'light'}
                  backColor={toggleBackColor}
                  borderColor={borderColor}
                  color={fontColor5}
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
                      onChange={handleToggle(setDarkMode)}
                      aria-label="Switch between dark and light mode"
                    />
                  </div>
                </ThemeMode>
              </div>
            </RowWrap>
            <RowWrap>
              <CateName>Currency</CateName>
              <div>
                <Dropdown>
                  <CurrencyDropDown
                    id="dropdown-basic"
                    bgcolor={bgColorNew}
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
                    <CurrencyDropDownMenu backcolor={bgColorNew}>
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
              </div>
            </RowWrap>
            <RowWrap>
              <CateName>Show Inactive Positions in Portfolio</CateName>
              <div>
                <ThemeMode
                  className="inactive"
                  mode={showInactiveFarms ? 'show' : 'hide'}
                  backColor={toggleBackColor}
                  borderColor={borderColor}
                  color={fontColor5}
                >
                  <div id="theme-switch">
                    <div className="switch-track">
                      <div className="switch-thumb">
                        {showInactiveFarms ? <FiEye /> : <FiEyeOff />}
                      </div>
                      <div className="switch-icon">
                        {showInactiveFarms ? <FiEyeOff /> : <FiEye />}
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={showInactiveFarms}
                      onChange={handleToggle(setShowInactiveFarms)}
                      aria-label="Switch between dark and light mode"
                    />
                  </div>
                </ThemeMode>
              </div>
            </RowWrap>
          </WrapperDiv>
        </CoinSection>
      </Inner>
    </Container>
  )
}

export default Settings
