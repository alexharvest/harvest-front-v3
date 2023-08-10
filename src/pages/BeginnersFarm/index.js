import BigNumber from 'bignumber.js'
import { find, get, isEqual, isArray } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useHistory, useParams } from 'react-router-dom'
import useEffectWithPrevious from 'use-effect-with-previous'
import { getBalances, getSupportedTokens } from 'wido'
import tokenMethods from '../../services/web3/contracts/token/methods'
import tokenContract from '../../services/web3/contracts/token/contract.json'
import Back from '../../assets/images/logos/earn/back.svg'
import Info from '../../assets/images/logos/earn/info.svg'
import BeginnerFriendly from '../../assets/images/logos/beginners/beginner-friendly.svg'
import WithdrawAnytime from '../../assets/images/logos/beginners/withdraw-anytime.svg'
import Thumbsup from '../../assets/images/logos/beginners/thumbs-up.svg'
import DOT from '../../assets/images/logos/beginners/dot.svg'
import DAIBottom from '../../assets/images/logos/beginnershome/dai-bottom.svg'
import ETHBottom from '../../assets/images/logos/beginnershome/eth-bottom.svg'
import USDTBottom from '../../assets/images/logos/beginnershome/usdt-bottom.svg'
import USDCBottom from '../../assets/images/logos/beginnershome/usdc-bottom.svg'
import AnimatedDots from '../../components/AnimatedDots'
import DepositBase from '../../components/BeginnersFarmComponents/DepositBase'
import DepositSelectToken from '../../components/BeginnersFarmComponents/DepositSelectToken'
import DepositStart from '../../components/BeginnersFarmComponents/DepositStart'
import DepositResult from '../../components/BeginnersFarmComponents/DepositResult'
import {
  DECIMAL_PRECISION,
  FARM_GRAIN_TOKEN_SYMBOL,
  FARM_TOKEN_SYMBOL,
  FARM_WETH_TOKEN_SYMBOL,
  IFARM_TOKEN_SYMBOL,
  ROUTES,
  SPECIAL_VAULTS,
  POOL_BALANCES_DECIMALS,
} from '../../constants'
import { Divider } from '../../components/GlobalStyle'
import { fromWei, newContractInstance, getWeb3 } from '../../services/web3'
import { addresses } from '../../data'
import { usePools } from '../../providers/Pools'
import { useStats } from '../../providers/Stats'
import { useThemeContext } from '../../providers/useThemeContext'
import { useVaults } from '../../providers/Vault'
import { useWallet } from '../../providers/Wallet'
import { displayAPY, getTotalApy, formatNumber } from '../../utils'
import {
  BackArrow,
  BackBtnRect,
  BigDiv,
  DetailView,
  FlexDiv,
  FlexTopDiv,
  HalfContent,
  InfoIcon,
  Inner,
  LogoImg,
  NewLabel,
  RestContent,
  TopDesc,
  TopPart,
  MyBalance,
  GuideSection,
  GuidePart,
  APRShow,
} from './style'

const BeginnersCoinGroup = ['DAI', 'ETH', 'USDT', 'xGRAIL']

const BeginnersFarm = () => {
  const { paramAddress } = useParams()
  // Switch Tag (Deposit/Withdraw)
  const [activeDepo, setActiveDepo] = useState(true)

  // Switch Tag (Farm/Details in mobile)
  const [farmView] = useState(true)
  const [detailsView] = useState(false)

  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const { push } = useHistory()

  const { vaultsData } = useVaults()
  const { pools, userStats, fetchUserPoolStats } = usePools()
  const { connected, account, balances, getWalletBalances } = useWallet()
  const { profitShareAPY } = useStats()
  /* eslint-disable global-require */
  const { tokens } = require('../../data')
  /* eslint-enable global-require */

  const farmProfitSharingPool = pools.find(
    pool => pool.id === SPECIAL_VAULTS.NEW_PROFIT_SHARING_POOL_ID,
  )
  const farmWethPool = pools.find(pool => pool.id === SPECIAL_VAULTS.FARM_WETH_POOL_ID)
  const farmGrainPool = pools.find(pool => pool.id === SPECIAL_VAULTS.FARM_GRAIN_POOL_ID)

  const poolVaults = useMemo(
    () => ({
      [FARM_TOKEN_SYMBOL]: {
        poolVault: true,
        profitShareAPY,
        data: farmProfitSharingPool,
        logoUrl: ['./icons/ifarm.svg'],
        tokenAddress: addresses.FARM,
        vaultAddress: addresses.iFARM,
        rewardSymbol: 'iFarm',
        isNew: tokens[IFARM_TOKEN_SYMBOL].isNew,
        newDetails: tokens[IFARM_TOKEN_SYMBOL].newDetails,
        tokenNames: ['FARM'],
      },
      [FARM_WETH_TOKEN_SYMBOL]: {
        liquidityPoolVault: true,
        tokenNames: ['FARM, ETH'], // 'FARM/ETH',
        platform: ['Uniswap'],
        data: farmWethPool,
        vaultAddress: addresses.FARM_WETH_LP,
        logoUrl: ['./icons/farm.svg', './icons/eth.svg'],
        rewardSymbol: FARM_TOKEN_SYMBOL,
        isNew: tokens[FARM_WETH_TOKEN_SYMBOL].isNew,
        balance: 'FARM_WETH_LP',
      },
      [FARM_GRAIN_TOKEN_SYMBOL]: {
        liquidityPoolVault: true,
        tokenNames: ['FARM, GRAIN'], // 'FARM/GRAIN',
        platform: ['Uniswap'],
        data: farmGrainPool,
        vaultAddress: addresses.FARM_GRAIN_LP,
        logoUrl: ['./icons/farm.svg', './icons/grain.svg'],
        rewardSymbol: FARM_TOKEN_SYMBOL,
        isNew: tokens[FARM_GRAIN_TOKEN_SYMBOL].isNew,
        balance: 'FARM_GRAIN_LP',
      },
    }),
    [tokens, farmGrainPool, farmWethPool, farmProfitSharingPool, profitShareAPY],
  )

  const groupOfVaults = { ...vaultsData, ...poolVaults }
  const vaultsKey = Object.keys(groupOfVaults)
  const vaultIds = vaultsKey.filter(
    vaultId =>
      groupOfVaults[vaultId].vaultAddress === paramAddress ||
      groupOfVaults[vaultId].tokenAddress === paramAddress,
  )
  const id = vaultIds[0]
  const token = groupOfVaults[id]

  const { logoUrl } = token

  const isSpecialVault = token.liquidityPoolVault || token.poolVault
  const tokenVault = get(vaultsData, token.hodlVaultId || id)

  const vaultPool = isSpecialVault
    ? token.data
    : find(pools, pool => pool.collateralAddress === get(tokenVault, `vaultAddress`))

  const totalApy = isSpecialVault
    ? getTotalApy(null, token, true)
    : getTotalApy(vaultPool, tokenVault)

  const chain = token.chain || token.data.chain

  const [coinId, setCoinId] = useState(-1)
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  const tokenName = token.tokenNames.join(', ') || token.rewardSymbol
  const bottomImg =
    tokenName === 'DAI'
      ? DAIBottom
      : tokenName === 'ETH'
      ? ETHBottom
      : tokenName === 'USDT'
      ? USDTBottom
      : USDCBottom
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    BeginnersCoinGroup.map((el, i) => {
      if (el === tokenName) {
        setCoinId(i)
      }
    })
  }, [token, tokenName])

  const useIFARM = id === FARM_TOKEN_SYMBOL
  const fAssetPool = find(pools, pool => pool.collateralAddress === tokens[id].vaultAddress)
  const multipleAssets = useMemo(
    () =>
      isArray(tokens[id].tokenAddress) &&
      tokens[id].tokenAddress.map(address => {
        const selectedSymbol = Object.keys(tokens).find(
          symbol =>
            !isArray(tokens[symbol].tokenAddress) &&
            tokens[symbol].tokenAddress.toLowerCase() === address.toLowerCase(),
        )
        return selectedSymbol
      }),
    [id, tokens],
  )

  const tokenDecimals = token.decimals || tokens[id].decimals
  const lpTokenBalance = get(userStats, `[${fAssetPool.id}]['lpTokenBalance']`, 0)
  const usdPrice = token.usdPrice

  // Show/Hide Select Token Component
  const [selectTokenDepo, setSelectTokenDepo] = useState(false)

  // Show/Hide Deposit
  const [depositStart, setDepositStart] = useState(false)
  const [clickTokenIdDepo, setClickedTokenIdDepo] = useState(-1)
  const [balanceDepo, setBalanceDepo] = useState(0)
  const [pickedTokenDepo, setPickedTokenDepo] = useState({ symbol: 'Select Token' })
  const [depositFinalStep, setDepositFinalStep] = useState(false)
  const [quoteValueDepo, setQuoteValueDepo] = useState(null)
  const [inputAmountDepo, setInputAmountDepo] = useState(0)

  const [balanceList, setBalanceList] = useState([])
  const [supTokenList, setSupTokenList] = useState([])

  const toTokenAddress = useIFARM ? addresses.iFARM : token.vaultAddress || token.tokenAddress
  useEffect(() => {
    const getTokenBalance = async () => {
      try {
        if (chain && account && Object.keys(balances).length !== 0) {
          const curBalances = await getBalances(account, [chain.toString()])
          setBalanceList(curBalances)
          let supList = [],
            directInSup = {},
            directInBalance = {}
          try {
            supList = await getSupportedTokens({
              chainId: [chain],
              toToken: toTokenAddress,
              toChainId: chain,
            })
          } catch (err) {
            console.log('getSupportedTokens of Wido: ', err)
          }
          const tokenAddress =
            token.tokenAddress !== undefined && token.tokenAddress.length !== 2
              ? token.tokenAddress
              : token.vaultAddress

          supList = supList.map(sup => {
            const supToken = curBalances.find(el => el.address === sup.address)
            if (supToken) {
              sup.balance = supToken.balance
              sup.usdValue = supToken.balanceUsdValue
              sup.usdPrice = supToken.usdPrice
            } else {
              sup.balance = '0'
              sup.usdValue = '0'
            }
            sup.default = false

            if (Object.keys(directInSup).length === 0 && tokenAddress.length !== 2) {
              if (sup.address.toLowerCase() === tokenAddress.toLowerCase()) {
                directInSup = sup
              }
            }
            return sup
          })

          supList = supList.sort(function reducer(a, b) {
            return Number(fromWei(b.balance, b.decimals)) - Number(fromWei(a.balance, a.decimals))
          })

          for (let j = 0; j < curBalances.length; j += 1) {
            if (Object.keys(directInBalance).length === 0 && tokenAddress.length !== 2) {
              if (curBalances[j].address.toLowerCase() === tokenAddress.toLowerCase()) {
                directInBalance = curBalances[j]
              }
            }
          }

          const vaultId = Object.keys(groupOfVaults).find(
            key => groupOfVaults[key].tokenAddress === tokenAddress,
          )
          const directBalance = balances[vaultId]
          const directUsdPrice = token.usdPrice
          const directUsdValue =
            directUsdPrice && directBalance
              ? new BigNumber(directBalance)
                  .div(10 ** tokenDecimals)
                  .times(directUsdPrice)
                  .toFixed(4)
              : '0'

          if (!(Object.keys(directInSup).length === 0 && directInSup.constructor === Object)) {
            directInSup.balance = directBalance
            directInSup.usdPrice = directInSup.usdPrice > 0 ? directInSup.usdPrice : directUsdPrice
            directInSup.usdValue = directInSup.usdValue > 0 ? directInSup.usdValue : directUsdValue
            supList = supList.sort(function result(x, y) {
              return x === directInSup ? -1 : y === directInSup ? 1 : 0
            })
            supList[0].default = true
          } else if (
            !(Object.keys(directInBalance).length === 0 && directInBalance.constructor === Object)
          ) {
            directInBalance.balance = directBalance || '0'
            directInBalance.usdPrice =
              directInBalance.usdPrice > 0 ? directInBalance.usdPrice : directUsdPrice
            directInBalance.usdValue =
              directInBalance.usdValue > 0 ? directInBalance.usdValue : directUsdValue
            supList.unshift(directInBalance)
            supList[0].default = true
          } else {
            const web3Client = await getWeb3(chain, null)
            const { getSymbol } = tokenMethods
            const lpInstance = await newContractInstance(
              id,
              tokenAddress,
              tokenContract.abi,
              web3Client,
            )
            const lpSymbol = await getSymbol(lpInstance)
            const direct = {
              symbol: lpSymbol,
              address: tokenAddress,
              balance: directBalance || '0',
              default: true,
              usdPrice: directUsdPrice || '0',
              usdValue: directUsdValue || '0',
              logoURI: 'https://etherscan.io/images/main/empty-token.png',
              decimals: tokenDecimals,
              chainId: parseInt(chain, 0),
            }
            supList.unshift(direct)
          }
          setSupTokenList(supList)
        }
      } catch (err) {
        console.log('getTokenBalance: ', err)
      }
    }

    getTokenBalance()
  }, [account, chain, balances]) // eslint-disable-line react-hooks/exhaustive-deps

  const { backColor, pageBackColor, fontColor, filterColor } = useThemeContext()

  const firstUserPoolsLoad = useRef(true)
  const firstWalletBalanceLoad = useRef(true)

  useEffectWithPrevious(
    ([prevAccount, prevUserStats, prevBalances]) => {
      const hasSwitchedAccount = account !== prevAccount && account

      if (
        hasSwitchedAccount ||
        firstUserPoolsLoad.current ||
        (userStats && !isEqual(userStats, prevUserStats))
      ) {
        const loadUserPoolsStats = async () => {
          firstUserPoolsLoad.current = false
          const poolsToLoad = [fAssetPool]
          await fetchUserPoolStats(poolsToLoad, account, userStats)
        }
        loadUserPoolsStats()
      }

      if (
        hasSwitchedAccount ||
        firstWalletBalanceLoad.current ||
        (balances && !isEqual(balances, prevBalances))
      ) {
        const getBalance = async () => {
          firstWalletBalanceLoad.current = false
          await getWalletBalances([IFARM_TOKEN_SYMBOL, FARM_TOKEN_SYMBOL, id], false, true)
        }

        getBalance()
      }
    },
    [account, userStats, balances],
  )

  const switchMethod = () => setActiveDepo(prev => !prev)
  const [partHeightDepo, setPartHeightDepo] = useState(null)

  return (
    <DetailView pageBackColor={pageBackColor} fontColor={fontColor}>
      <TopPart num={coinId}>
        <FlexTopDiv>
          <div>
            <BackBtnRect
              onClick={() => {
                push(ROUTES.BEGINNERS)
              }}
            >
              <BackArrow src={Back} alt="" />
            </BackBtnRect>
          </div>
          <GuideSection>
            <GuidePart>
              <img src={BeginnerFriendly} alt="" />
              Beginner Friendly
            </GuidePart>
            <GuidePart>
              <img src={WithdrawAnytime} alt="" />
              Withdraw Anytime
            </GuidePart>
            <GuidePart>
              <img src={DOT} alt="" />
              {displayAPY(totalApy, DECIMAL_PRECISION, 10)}
              &nbsp;APR
            </GuidePart>
          </GuideSection>
          <TopDesc weight={600} size="68px" height="82px" marginBottom="10px">
            {token.tokenNames.join(', ')}&nbsp;Farm
          </TopDesc>
          <NewLabel weight={400} size="18px" height="26px" marginBottom="10px" color="white">
            Deposit USDC or any token from your wallet to start earning.
          </NewLabel>
          <NewLabel weight={700} size="18px" height="26px" color="white">
            <img className="thumbs-up" src={Thumbsup} alt="" />
            Currently used by 265 other users.
          </NewLabel>
        </FlexTopDiv>
        <FlexTopDiv>
          {logoUrl.map((el, i) => (
            <LogoImg className="logo" src={el.slice(1, el.length)} key={i} alt="" />
          ))}
        </FlexTopDiv>
        <img className="bottom" src={bottomImg} alt="" />
      </TopPart>
      <Inner>
        <BigDiv>
          <HalfContent show={detailsView} partHeight={partHeightDepo}>
            <DepositBase
              selectToken={selectTokenDepo}
              setSelectToken={setSelectTokenDepo}
              deposit={depositStart}
              setDeposit={setDepositStart}
              finalStep={depositFinalStep}
              balance={balanceDepo}
              pickedToken={pickedTokenDepo}
              inputAmount={inputAmountDepo}
              setInputAmount={setInputAmountDepo}
              token={token}
              supTokenList={supTokenList}
              activeDepo={activeDepo}
              switchMethod={switchMethod}
            />
            <DepositSelectToken
              selectToken={selectTokenDepo}
              setSelectToken={setSelectTokenDepo}
              clickTokenId={clickTokenIdDepo}
              setClickedTokenId={setClickedTokenIdDepo}
              setPickedToken={setPickedTokenDepo}
              setBalance={setBalanceDepo}
              supTokenList={supTokenList}
              setPartHeight={setPartHeightDepo}
            />
            <DepositStart
              pickedToken={pickedTokenDepo}
              deposit={depositStart}
              setDeposit={setDepositStart}
              finalStep={depositFinalStep}
              setFinalStep={setDepositFinalStep}
              inputAmount={inputAmountDepo}
              token={token}
              balanceList={balanceList}
              useIFARM={useIFARM}
              tokenSymbol={id}
              quoteValue={quoteValueDepo}
              setQuoteValue={setQuoteValueDepo}
              fAssetPool={fAssetPool}
              multipleAssets={multipleAssets}
            />
            <DepositResult
              pickedToken={pickedTokenDepo}
              finalStep={depositFinalStep}
              setFinalStep={setDepositFinalStep}
              setSelectToken={setSelectTokenDepo}
              setDeposit={setDepositStart}
              inputAmount={inputAmountDepo}
              token={token}
              tokenSymbol={id}
              quoteValue={quoteValueDepo}
              setQuoteValue={setQuoteValueDepo}
            />
          </HalfContent>
          <RestContent show={farmView}>
            <MyBalance backColor={backColor}>
              <NewLabel
                size="14px"
                weight="700"
                height="24px"
                color="#344054"
                padding="10px 15px"
                borderBottom="1px solid #EBEBEB"
              >
                My Balance
              </NewLabel>
              <FlexDiv justifyContent="space-between" padding="10px 15px">
                <NewLabel size="14px" weight="500" height="24px" color="#344054">
                  {`f${id}`}
                  <InfoIcon
                    className="info"
                    width={isMobile ? 10 : 16}
                    src={Info}
                    alt=""
                    data-tip
                    data-for="tooltip-last-harvest"
                    filterColor={filterColor}
                  />
                </NewLabel>
                <NewLabel size="14px" weight="700" height="24px" color="#00D26B">
                  {!connected ? (
                    0
                  ) : lpTokenBalance ? (
                    fromWei(
                      lpTokenBalance,
                      fAssetPool.lpTokenData.decimals,
                      POOL_BALANCES_DECIMALS,
                      true,
                    )
                  ) : (
                    <AnimatedDots />
                  )}
                </NewLabel>
              </FlexDiv>
              <FlexDiv justifyContent="space-between" padding="10px 15px">
                <NewLabel size="14px" weight="500" height="24px" color="#344054" self="center">
                  Est. Value
                </NewLabel>
                <NewLabel weight="500" size="14px" height="24px" color="black" self="center">
                  {!connected ? (
                    0
                  ) : lpTokenBalance ? (
                    formatNumber(
                      fromWei(
                        lpTokenBalance,
                        fAssetPool.lpTokenData.decimals,
                        POOL_BALANCES_DECIMALS,
                        true,
                      ) * usdPrice,
                      POOL_BALANCES_DECIMALS,
                    )
                  ) : (
                    <AnimatedDots />
                  )}
                </NewLabel>
              </FlexDiv>
            </MyBalance>
            <Divider height="unset" marginTop="25px" />
            <MyBalance backColor={backColor}>
              <NewLabel
                display="flex"
                padding="10px 15px"
                justifyContent="space-between"
                borderBottom="1px solid #ebebeb"
              >
                <NewLabel size="14px" weight="700" height="24px" color="#344054">
                  Farm Info
                </NewLabel>
                <APRShow>
                  <img src={DOT} alt="" />
                  <NewLabel size="14px" weight="500" height="20px" color="#344054">
                    {displayAPY(totalApy, DECIMAL_PRECISION, 10)}
                    &nbsp;APR
                  </NewLabel>
                </APRShow>
              </NewLabel>
              <NewLabel padding="20px 15px" size="13px" height="24px" weight="500" color="#475467">
                This farm offers a yield from Idle Finance strategy relying on a combination of top
                DeFi protocols (Compound, Aave, Clearpool, and Morpho) to boost your earnings.
              </NewLabel>
            </MyBalance>
          </RestContent>
        </BigDiv>
      </Inner>
    </DetailView>
  )
}

export default BeginnersFarm
