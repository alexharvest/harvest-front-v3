import BigNumber from 'bignumber.js'
import { useSetChain } from '@web3-onboard/react'
import { get, isEmpty } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import ChevronRightIcon from '../../../assets/images/logos/wido/chevron-right.svg'
import DropDownIcon from '../../../assets/images/logos/wido/drop-down.svg'
import FARMIcon from '../../../assets/images/logos/wido/farm.svg'
import HelpIcon from '../../../assets/images/logos/wido/help.svg'
import IFARMIcon from '../../../assets/images/logos/wido/ifarm.svg'
import WidoIcon from '../../../assets/images/logos/wido/wido.svg'
import {
  FARM_TOKEN_SYMBOL,
  IFARM_TOKEN_SYMBOL,
  POOL_BALANCES_DECIMALS,
  WIDO_BALANCES_DECIMALS,
} from '../../../constants'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useVaults } from '../../../providers/Vault'
import { useWallet } from '../../../providers/Wallet'
import { fromWei } from '../../../services/web3'
import { formatNumberWido, isSpecialApp } from '../../../utils'
import { CHAIN_IDS } from '../../../data/constants'
import AnimatedDots from '../../AnimatedDots'
import Button from '../../Button'
import {
  BalanceInfo,
  BaseWido,
  DepoTitle,
  FarmInfo,
  HelpImg,
  Line,
  PoweredByWido,
  SelectToken,
  StakeInfo,
  SwitchMode,
  ThemeMode,
  TokenAmount,
  TokenInfo,
  TokenName,
  TokenSelect,
  TokenUSD,
} from './style'

const getPrice = async vaultsData => {
  try {
    const result = Number(get(vaultsData, `${IFARM_TOKEN_SYMBOL}.usdPrice`, 0)).toFixed(2)
    return result
  } catch (e) {
    return 0
  }
}

const getChainName = chain => {
  let chainName = 'Ethereum'
  switch (chain) {
    case CHAIN_IDS.POLYGON_MAINNET:
      chainName = 'Polygon'
      break
    case CHAIN_IDS.ARBITRUM_ONE:
      chainName = 'Arbitrum'
      break
    case CHAIN_IDS.BASE:
      chainName = 'Base'
      break
    case CHAIN_IDS.ERA:
      chainName = 'Era'
      break
    default:
      chainName = 'Ethereum'
      break
  }
  return chainName
}

const WidoPoolDepositBase = ({
  selectTokenWido,
  setSelectTokenWido,
  startSlippage,
  depositWido,
  setDepositWido,
  finalStep,
  setFinalStep,
  balance,
  setBalance,
  usdValue,
  setUsdValue,
  pickedToken,
  setPickedToken,
  inputAmount,
  setInputAmount,
  token,
  fAssetPool,
  balanceList,
  totalStaked,
  lpTokenBalance,
  symbol,
  setSymbol,
  legacyStaking,
  setLegacyStaking,
}) => {
  /* eslint-disable global-require */
  const { tokens } = require('../../../data')
  const { account, connectAction, balances, chainId, setChainId } = useWallet()
  const { vaultsData } = useVaults()
  const [farmInfo, setFarmInfo] = useState(null)
  const [price, setPrice] = useState(0)
  const FARMBalance = get(balances, FARM_TOKEN_SYMBOL, 0)

  const {
    backColor,
    borderColor,
    widoTagActiveFontColor,
    widoInputPanelBorderColor,
    widoInputBoxShadow,
    toggleActiveBackColor,
    toggleInactiveBackColor,
  } = useThemeContext()

  const [totalValue, setTotalValue] = useState(0)
  const [underlyingValue, setUnderlyingValue] = useState(0)

  const [
    {
      connectedChain, // the current chain the user's wallet is connected to
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()

  useEffect(() => {
    const getPriceValue = async () => {
      const value = await getPrice(vaultsData)
      setPrice(value)
    }

    getPriceValue()
  }, [vaultsData])

  useEffect(() => {
    const total =
      Number(
        fromWei(
          totalStaked,
          fAssetPool && fAssetPool.lpTokenData && fAssetPool.lpTokenData.decimals,
          WIDO_BALANCES_DECIMALS,
        ),
      ) +
      Number(
        fromWei(
          lpTokenBalance,
          fAssetPool && fAssetPool.lpTokenData && fAssetPool.lpTokenData.decimals,
          WIDO_BALANCES_DECIMALS,
        ),
      )
    setTotalValue(total)
  }, [totalStaked, lpTokenBalance, fAssetPool])

  const firstUnderlyingBalance = useRef(true)
  useEffect(() => {
    const hasZeroValue = underlyingValue === 0
    if (account && hasZeroValue && (firstUnderlyingBalance.current || !isEmpty(vaultsData))) {
      const getUnderlyingBalance = async () => {
        firstUnderlyingBalance.current = false
        const val = Number(
          fromWei(
            get(vaultsData, `${IFARM_TOKEN_SYMBOL}.underlyingBalanceWithInvestmentForHolder`, 0),
            tokens[IFARM_TOKEN_SYMBOL].decimals,
            WIDO_BALANCES_DECIMALS,
          ),
        )
        setUnderlyingValue(val)
      }

      getUnderlyingBalance()
    }
  }, [account, vaultsData, underlyingValue, tokens])

  const tokenChain = token.chain || token.data.chain
  const curChain = isSpecialApp
    ? chainId
    : connectedChain
    ? parseInt(connectedChain.id, 16).toString()
    : ''
  const [depositName, setDepositName] = useState('Deposit')

  useEffect(() => {
    if (account) {
      if (curChain !== tokenChain) {
        const chainName = getChainName(tokenChain)
        setDepositName(`Switch to ${chainName}`)
      } else {
        setDepositName('Deposit')
      }
    }
  }, [account, curChain, tokenChain])

  const onClickDeposit = async () => {
    if (curChain !== tokenChain) {
      const chainHex = `0x${Number(tokenChain).toString(16)}`
      if (!isSpecialApp) {
        await setChain({ chainId: chainHex })
        setChainId(tokenChain)
      }
    } else {
      if (!legacyStaking && pickedToken.symbol === 'Select Token') {
        toast.error('Please select token to deposit!')
        return
      }
      if (new BigNumber(inputAmount).isGreaterThan(balance)) {
        toast.error('Please input sufficient balance!')
        return
      }
      if (new BigNumber(inputAmount).isEqualTo(0)) {
        toast.error('Please input balance to deposit!')
        return
      }

      if (!legacyStaking) {
        setDepositWido(true)
      } else {
        setFinalStep(true)
      }
    }
  }

  useEffect(() => {
    if (account) {
      if (legacyStaking) {
        const farmToken = balanceList.filter(bal => bal.symbol === FARM_TOKEN_SYMBOL)
        if (farmToken.length > 0) {
          setFarmInfo(farmToken[0])
          setBalance(fromWei(farmToken[0].balance, farmToken[0].decimals))
          setPickedToken(farmToken[0])
        }
      }
    }
  }, [legacyStaking, balanceList, vaultsData, account, setBalance, setPickedToken])

  const onInputBalance = e => {
    setInputAmount(e.currentTarget.value)
    setUsdValue(
      formatNumberWido(
        e.currentTarget.value * (legacyStaking ? farmInfo.usdPrice : pickedToken.usdPrice || 1),
        2,
      ),
    )
  }

  const switchLegacyStaking = () => {
    setLegacyStaking(!legacyStaking)
    setSymbol(legacyStaking ? 'iFARM' : FARM_TOKEN_SYMBOL)
    setPickedToken({ symbol: 'Select Token' })
    setInputAmount(0)
    setUsdValue(0)
    setBalance(0)
  }

  return (
    <BaseWido show={!depositWido && !selectTokenWido && !startSlippage && !finalStep}>
      <DepoTitle fontColor={widoTagActiveFontColor}>I want to deposit</DepoTitle>
      <SelectToken
        backColor={backColor}
        borderColor={widoInputPanelBorderColor}
        shadow={widoInputBoxShadow}
      >
        <TokenInfo>
          <div>
            <TokenAmount
              type="number"
              value={inputAmount}
              borderColor={borderColor}
              backColor={backColor}
              fontColor={widoTagActiveFontColor}
              onChange={onInputBalance}
            />
            <TokenUSD>${usdValue}</TokenUSD>
          </div>

          {!legacyStaking ? (
            <TokenSelect
              type="button"
              onClick={async () => {
                setSelectTokenWido(true)
                if (!account) {
                  await connectAction()
                }
              }}
              fontColor={widoTagActiveFontColor}
              borderColor={borderColor}
            >
              {pickedToken.logoURI ? (
                <img className="logo" src={pickedToken.logoURI} width={24} height={24} alt="" />
              ) : (
                <></>
              )}
              <span>{pickedToken.symbol}</span>
              <img src={DropDownIcon} alt="" />
            </TokenSelect>
          ) : (
            <FarmInfo>
              <img src={FARMIcon} height="29" width="29" alt="" />
              <span>FARM</span>
            </FarmInfo>
          )}
        </TokenInfo>
      </SelectToken>
      <BalanceInfo
        fontColor={widoTagActiveFontColor}
        onClick={() => {
          if (account && pickedToken.symbol !== 'Select Token') {
            const balanceAmount = !legacyStaking
              ? balance
              : FARMBalance && fromWei(FARMBalance, tokens[IFARM_TOKEN_SYMBOL].decimals)
            setInputAmount(balanceAmount)

            const usdAmount = legacyStaking
              ? balanceAmount * farmInfo.usdPrice
              : pickedToken.usdValue
            setUsdValue(formatNumberWido(usdAmount, 2))
          }
        }}
      >
        Balance:
        <span>
          {!legacyStaking
            ? formatNumberWido(balance, POOL_BALANCES_DECIMALS)
            : FARMBalance && `${fromWei(FARMBalance, tokens[IFARM_TOKEN_SYMBOL].decimals)} FARM`}
        </span>
      </BalanceInfo>
      <SwitchMode fontColor={widoTagActiveFontColor}>
        <ThemeMode
          mode={legacyStaking ? 'true' : 'false'}
          activeBackColor={toggleActiveBackColor}
          inactiveBackColor={toggleInactiveBackColor}
          borderColor={borderColor}
        >
          <div id="theme-switch">
            <div className="switch-track">
              <div className="switch-thumb" />
            </div>

            <input
              type="checkbox"
              checked={legacyStaking}
              onChange={switchLegacyStaking}
              aria-label="Switch between dark and light mode"
            />
          </div>
        </ThemeMode>
        Legacy Staking
      </SwitchMode>
      <Button
        color="wido-deposit"
        width="100%"
        size="md"
        onClick={() => {
          onClickDeposit()
        }}
      >
        {depositName}
        <img src={ChevronRightIcon} alt="" />
      </Button>

      {!legacyStaking ? (
        <PoweredByWido>
          <div>Powered By</div>
          <img src={WidoIcon} alt="" />
          <span>wido</span>
        </PoweredByWido>
      ) : (
        <></>
      )}

      <Line height="1px" backColor="#EAECF0" />

      <div>
        <TokenName>
          <img src={legacyStaking ? FARMIcon : IFARMIcon} width={20} height={20} alt="" />
          {symbol}
        </TokenName>
        <StakeInfo>
          {legacyStaking ? 'Unstaked' : 'Balance'}
          <span>
            {!legacyStaking ? (
              !account ? (
                ''
              ) : (
                formatNumberWido(
                  fromWei(
                    get(balances, IFARM_TOKEN_SYMBOL, 0),
                    tokens[IFARM_TOKEN_SYMBOL].decimals,
                    WIDO_BALANCES_DECIMALS,
                  ),
                  WIDO_BALANCES_DECIMALS,
                )
              )
            ) : !account ? (
              ''
            ) : lpTokenBalance ? (
              fromWei(
                lpTokenBalance,
                tokens[IFARM_TOKEN_SYMBOL].decimals,
                WIDO_BALANCES_DECIMALS,
                true,
              )
            ) : (
              <AnimatedDots />
            )}
          </span>
        </StakeInfo>
        {!legacyStaking && (
          <ReactTooltip
            id="help-underlyingbalance"
            backgroundColor="black"
            borderColor="black"
            textColor="white"
            effect="solid"
            delayHide={50}
            clickable
          >
            Your iFARM earnings denominated in underlying FARM
          </ReactTooltip>
        )}
        <StakeInfo>
          <div>
            {legacyStaking ? 'Staked' : 'Underlying Balance'}
            {!legacyStaking && (
              <HelpImg data-tip data-for="help-underlyingbalance" src={HelpIcon} alt="" />
            )}
          </div>
          <span>
            {legacyStaking ? (
              !account ? (
                ''
              ) : totalStaked ? (
                fromWei(
                  totalStaked,
                  tokens[FARM_TOKEN_SYMBOL].decimals,
                  WIDO_BALANCES_DECIMALS,
                  true,
                )
              ) : (
                <AnimatedDots />
              )
            ) : !account ? (
              ''
            ) : isEmpty(vaultsData) ? (
              <AnimatedDots />
            ) : (
              formatNumberWido(underlyingValue, WIDO_BALANCES_DECIMALS)
            )}
          </span>
        </StakeInfo>
      </div>

      <Line height="1px" backColor="#EAECF0" />

      <div>
        <StakeInfo>
          Current Price
          <span>
            {legacyStaking ? (
              !account ? (
                ''
              ) : token.data.lpTokenData ? (
                `$${token.data.lpTokenData.price}`
              ) : (
                <AnimatedDots />
              )
            ) : !account ? (
              ''
            ) : price ? (
              `$${price}`
            ) : (
              <AnimatedDots />
            )}
          </span>
        </StakeInfo>
        {legacyStaking && (
          <ReactTooltip
            id="help-img"
            backgroundColor="black"
            borderColor="black"
            textColor="white"
            effect="solid"
            delayHide={50}
            clickable
          >
            Total value of your Unstaked & Staked FARM
          </ReactTooltip>
        )}
        <StakeInfo>
          <div>
            Total Value
            {legacyStaking && <HelpImg data-tip data-for="help-img" src={HelpIcon} alt="" />}
          </div>
          <span>
            {legacyStaking ? (
              !account ? (
                ''
              ) : totalValue ? (
                `$${formatNumberWido(
                  totalValue * token.data.lpTokenData.price,
                  WIDO_BALANCES_DECIMALS,
                )}`
              ) : (
                <AnimatedDots />
              )
            ) : !account ? (
              ''
            ) : get(balances, IFARM_TOKEN_SYMBOL, 0) && token.data.lpTokenData ? (
              `$${formatNumberWido(
                fromWei(
                  get(balances, IFARM_TOKEN_SYMBOL, 0),
                  tokens[IFARM_TOKEN_SYMBOL].decimals,
                  WIDO_BALANCES_DECIMALS,
                ) * price,
                2,
              )}`
            ) : (
              <AnimatedDots />
            )}
          </span>
        </StakeInfo>
      </div>
    </BaseWido>
  )
}
export default WidoPoolDepositBase
