import React, { useState, useEffect, useRef } from 'react'
import useEffectWithPrevious from 'use-effect-with-previous'
import { useHistory, useLocation } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import { isEqual, isEmpty } from 'lodash'
import BigNumber from 'bignumber.js'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { IoCheckmark } from 'react-icons/io5'
import 'react-loading-skeleton/dist/skeleton.css'
import { useThemeContext } from '../../providers/useThemeContext'
import { useVaults } from '../../providers/Vault'
import { useWallet } from '../../providers/Wallet'
import { useContracts } from '../../providers/Contracts'
import { someChainsList } from '../../constants'
import { isSpecialApp } from '../../utilities/formats'
import { getUnderlyingId } from '../../utilities/parsers'
import { initBalanceAndDetailData } from '../../utilities/apiCalls'
import { fromWei } from '../../services/web3'
import AutopilotPanel from '../../components/AutopilotComponents/AutopilotPanel'
import {
  Container,
  Inner,
  SubPart,
  CurrencyDropDown,
  CurrencySelect,
  CurrencyDropDownMenu,
  CurrencyDropDownItem,
  HeaderWrap,
  HeaderButton,
  HeaderTitle,
} from './style'

const Autopilot = () => {
  const {
    darkMode,
    bgColorNew,
    hoverColorNew,
    fontColor,
    fontColor1,
    fontColor2,
    borderColorBox,
  } = useThemeContext()

  const { connected, account, balances, getWalletBalances } = useWallet()
  const { contracts } = useContracts()
  const history = useHistory()
  const location = useLocation()
  const { chainId } = useWallet()
  const { allVaultsData, loadingVaults } = useVaults()
  const firstWalletBalanceLoad = useRef(true)

  const [curChain, setCurChain] = useState({})
  const [vaultsData, setVaultsData] = useState([])
  const [isManualSelection, setIsManualSelection] = useState(false)
  const [walletBalances, setWalletBalances] = useState({})
  const [userVBalance, setUserVBalance] = useState({})
  const [userAssetBalances, setUserAssetBalances] = useState({})
  const [yieldValues, setYieldValues] = useState({})

  useEffect(() => {
    const pathSegments = location.pathname.split('/')
    const networkName = pathSegments[pathSegments.length - 1]
    const matchedChain = someChainsList.find(item => item.name === networkName)
    if (matchedChain) {
      setCurChain(matchedChain)
    } else {
      setCurChain(someChainsList[0])
      history.replace('/autopilot/base')
    }
  }, [location.pathname, history])

  useEffect(() => {
    const matchedChain = someChainsList.find(item => item.chainId === chainId)
    if (matchedChain && matchedChain.chainId !== curChain.chainId && !isManualSelection) {
      setCurChain(matchedChain)
      history.replace(`/autopilot/${matchedChain.name}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, curChain.chainId, history])

  useEffect(() => {
    const initData = () => {
      const filteredVaults = Object.values(allVaultsData)
        .map((vaultData, index) => ({
          ...vaultData,
          id: Object.keys(allVaultsData)[index],
        }))
        .filter(vaultData => vaultData.isIPORVault)

      const filteredVaultsData = filteredVaults
        .filter(item => item.chain === curChain.chainId)
        .slice(0, 3)

      setVaultsData(filteredVaultsData)
    }

    if (Object.keys(allVaultsData).length !== 0 && !isEmpty(curChain)) {
      initData()
    }
  }, [allVaultsData, curChain])

  const fetchWalletBalances = async (vaultsDataValue, accountValue, balancesValue) => {
    if (!accountValue || vaultsDataValue.length === 0 || !balancesValue) return

    setWalletBalances(prev => {
      const mergedBalances = { ...prev }

      vaultsDataValue.forEach(vault => {
        if (!(vault.id in mergedBalances)) {
          mergedBalances[vault.id] = '0'
        }
      })

      Object.keys(balancesValue).forEach(underlyingId => {
        const vault = vaultsDataValue.find(v => getUnderlyingId(v) === underlyingId)
        if (vault) {
          mergedBalances[vault.id] = fromWei(
            balancesValue[underlyingId],
            vault.decimals,
            vault.decimals,
          )
        }
      })

      return mergedBalances
    })
  }

  useEffect(() => {
    if (account && vaultsData.length > 0 && !isEmpty(balances)) {
      fetchWalletBalances(vaultsData, account, balances)
    }
  }, [account, vaultsData, balances])

  const fetchBalances = async (vaultsDataVal, accountVal, contractsVal) => {
    const vBalancesMap = {}
    const assetBalancesMap = {}
    const yieldMap = {}

    await Promise.all(
      vaultsDataVal.map(async vault => {
        const underlyingId = getUnderlyingId(vault)
        if (underlyingId === '') return
        await getWalletBalances([vault.id, underlyingId], accountVal, true)

        const vaultContract = contractsVal.iporVaults[vault.id]
        const vaultBalance = await vaultContract.methods.getBalanceOf(
          vaultContract.instance,
          accountVal,
        )
        const AssetBalance = await vaultContract.methods.convertToAssets(
          vaultContract.instance,
          vaultBalance,
        )

        if (new BigNumber(AssetBalance).gt(0)) {
          vBalancesMap[vault.id] = fromWei(new BigNumber(vaultBalance), Number(vault.vaultDecimals))
          assetBalancesMap[vault.id] = fromWei(
            new BigNumber(AssetBalance),
            Number(vault.decimals),
            Number(vault.decimals),
          )
        } else {
          vBalancesMap[vault.id] = '0'
          assetBalancesMap[vault.id] = '0'
        }

        const iporVFlag = vault.isIPORVault ?? false
        const { bFlag, vHFlag, sumNetChange } = await initBalanceAndDetailData(
          vault.vaultAddress,
          vault.chain,
          accountVal,
          vault.decimals,
          iporVFlag,
          vault.decimals,
        )

        if (bFlag && vHFlag) {
          yieldMap[vault.id] = parseFloat(sumNetChange).toFixed(6)
        }
      }),
    )

    setUserVBalance(vBalancesMap)
    setUserAssetBalances(assetBalancesMap)
    setYieldValues(yieldMap)
  }

  useEffectWithPrevious(
    ([prevAccount, prevVaultsData, prevVBalance]) => {
      const hasSwitchedAccount = account !== prevAccount && account
      if (
        connected &&
        vaultsData.length !== 0 &&
        (hasSwitchedAccount ||
          firstWalletBalanceLoad.current ||
          (vaultsData && !isEqual(vaultsData, prevVaultsData)) ||
          (userVBalance && !isEqual(userVBalance, prevVBalance)))
      ) {
        firstWalletBalanceLoad.current = false
        fetchBalances(vaultsData, account, contracts)
      }
    },
    [account, vaultsData, userVBalance],
  )

  const handleNetworkChange = selectedChain => {
    setCurChain(selectedChain)
    setIsManualSelection(true)
    history.push(`/autopilot/${selectedChain.name}`)
  }

  return (
    <Container bgColor={bgColorNew} fontColor={fontColor}>
      <Inner bgColor={darkMode ? '#171b25' : '#fff'}>
        <HeaderWrap padding="21px 11px 15px 23px" borderColor={borderColorBox}>
          <HeaderTitle fontColor={fontColor} fontColor1={fontColor1}>
            <div className="title">Autopilot</div>
            <div className="desc">Maximized yield efficiency with 1-click autopilot vaults.</div>
          </HeaderTitle>
          <HeaderButton>
            <Dropdown>
              <CurrencyDropDown
                id="dropdown-basic"
                bgcolor={bgColorNew}
                fontcolor2={fontColor2}
                hovercolor={hoverColorNew}
                style={{ padding: 0 }}
              >
                {curChain ? (
                  <CurrencySelect>
                    <img
                      className={darkMode ? 'logo-dark' : 'logo'}
                      src={curChain.img}
                      width={16}
                      height={16}
                      alt=""
                    />
                    <span>Autopilots</span>
                    <MdKeyboardArrowDown color="6988ff" fontSize={20} />
                  </CurrencySelect>
                ) : (
                  <></>
                )}
              </CurrencyDropDown>
              {!isSpecialApp ? (
                <CurrencyDropDownMenu>
                  {someChainsList.map(elem => {
                    return (
                      <CurrencyDropDownItem
                        onClick={() => {
                          handleNetworkChange(elem)
                        }}
                        hovercolor={hoverColorNew}
                        backcolor={bgColorNew}
                        key={elem.id}
                      >
                        <img
                          className={darkMode ? 'logo-dark' : 'logo'}
                          src={elem.img}
                          width={14}
                          height={14}
                          alt=""
                        />
                        <span>Autopilots</span>
                        {curChain?.id === elem.id ? <IoCheckmark className="check-icon" /> : <></>}
                      </CurrencyDropDownItem>
                    )
                  })}
                </CurrencyDropDownMenu>
              ) : (
                <></>
              )}
            </Dropdown>
          </HeaderButton>
        </HeaderWrap>
        <SubPart>
          {!loadingVaults && vaultsData.length > 0 ? (
            vaultsData?.map((vault, index) => {
              return (
                <AutopilotPanel
                  allVaultsData={allVaultsData}
                  vaultData={vault}
                  walletBalance={walletBalances[vault.id] || '0'}
                  userAssetBalance={userAssetBalances[vault.id] || '0'}
                  yieldValue={yieldValues[vault.id] || '0'}
                  key={index}
                  index={index}
                />
              )
            })
          ) : (
            <></>
          )}
        </SubPart>
      </Inner>
    </Container>
  )
}

export default Autopilot
