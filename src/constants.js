import React from 'react'
import { CHAIN_IDS } from './data/constants'
import Dollar from './assets/images/logos/dashboard/flag_usd.svg'
import Pound from './assets/images/logos/dashboard/flag_gbp.svg'
import Euro from './assets/images/logos/dashboard/flag_euro.svg'
import Franc from './assets/images/logos/dashboard/flag_chf.svg'
import Yen from './assets/images/logos/dashboard/flag_jpy.svg'
import ARBITRUM from './assets/images/chains/arbitrum.svg'
import BASE from './assets/images/chains/base.svg'
import ETHEREUM from './assets/images/chains/ethereum.svg'
import POLYGON from './assets/images/chains/polygon.svg'
import ZKSYNC from './assets/images/chains/zksync.svg'

export const HARVEST_LAUNCH_DATE = new Date(1598986800000)

export const SOCIAL_LINKS = {
  TELEGRAM: 'https://t.me/Breadforthepeople',
  TWITTER: 'https://twitter.com/harvest_finance',
  MEDIUM: 'https://medium.com/harvest-finance',
  Tutorial: 'https://docs.harvest.finance/get-started-farming',
  TutorialQuest: 'https://docs.harvest.finance/other/coinbase-wallet-quest-tutorial',
  DISCORD: 'https://discord.gg/ePZKmST7yn',
  REDDIT: 'https://www.reddit.com/r/HarvestFinance/',
  GITHUB: 'https://github.com/harvest-finance',
  WIKI: 'https://docs.harvest.finance',
  WIKI_CHINEESE: 'https://farm.chainwiki.dev/zh/%E7%AD%96%E7%95%A5',
  AUDITS: 'https://github.com/harvest-finance/harvest/tree/master/audits',
  BUG_BOUNTY: 'https://immunefi.com/bounty/harvest/',
}

export const historyTags = [{ name: 'Harvests' }, { name: 'Rewards' }]

export const ROUTES = {
  PORTFOLIO: '/portfolio',
  TUTORIAL: 'https://docs.harvest.finance/get-started-farming',
  ADVANCED: '/',
  ACTIVITY: '/activity',
  SETTINGS: '/settings',
  LiveSupport: 'https://discord.com/channels/748967094745563176/749862621188194328',
  ANALYTIC: '/analytics',
  DOC: 'https://docs.harvest.finance',
  FAQ: '/faq',
  ADVANCEDFARM: '/:network/:paramAddress',
  AUTOPILOTNOCHAIN: '/autopilot',
  AUTOPILOT: '/autopilot/:network',
  CHARTS: '/charts',
  WORK: '/work',
  POOL: '/pool',
  ZAPPER: '/zapper',
  VESTING: 'https://vest.harvest.finance/',
  WIKI: 'https://docs.harvest.finance/',
  WIKI_ZH: 'https://farm.chainwiki.dev/zh/%E7%AD%96%E7%95%A5',
  CLAIM_EXT: 'https://claim.harvest.finance',
  STATS: 'https://farmdashboard.xyz',
  LEADERBOARD: '/leaderboard',
  MIGRATE: '/migrate',
}

export const KEY_CODES = {
  MINUS: 189,
  E: 69,
}

export const POLL_BALANCES_INTERVAL_MS = 2000
export const POLL_POOL_DATA_INTERVAL_MS = window.ethereum ? 900000 : 36000000
export const POLL_POOL_USER_DATA_INTERVAL_MS = 2000
export const POLL_BOOST_USER_DATA_INTERVAL_MS = 5000

export const GECKO_URL = 'https://pro-api.coingecko.com/api/v3/'

export const INFURA_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
export const MATIC_URL = `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
export const BASE_URL = `https://base-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
export const ARBITRUM_URL = `https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
export const ZKSYNC_URL = `https://zksync-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`

export const GRAPH_URLS = {
  1: process.env.REACT_APP_GRAPH_URL_MAINNET || 'https://monkfish-app-mhcjl.ondigitalocean.app/1',
  137:
    process.env.REACT_APP_GRAPH_URL_POLYGON || 'https://monkfish-app-mhcjl.ondigitalocean.app/137',
  324:
    process.env.REACT_APP_GRAPH_URL_ZKSYNC || 'https://monkfish-app-mhcjl.ondigitalocean.app/324',
  8453:
    process.env.REACT_APP_GRAPH_URL_BASE || 'https://monkfish-app-mhcjl.ondigitalocean.app/8453',
  42161:
    process.env.REACT_APP_GRAPH_URL_ARBITRUM ||
    'https://monkfish-app-mhcjl.ondigitalocean.app/42161',
}

export const ETHERSCAN_URL = 'https://etherscan.io'

export const MATICSCAN_URL = 'https://polygonscan.com'

export const BASESCAN_URL = 'https://basescan.org'

export const ARBISCAN_URL = 'https://arbiscan.io'

export const ZKSYNCSCAN_URL = 'https://explorer.zksync.io/'

export const PORTALS_FI_API_URL = 'https://api.portals.fi'

export const DECIMAL_PRECISION = 2

export const FAQ_ITEMS_FIRST = [
  {
    id: 1,
    question: 'What is yield farming?',
    answer: (
      <>
        Yield farming is the practice of putting your crypto assets to work via staking or lending
        to generate returns and earn rewards in the form of additional cryptocurrency. This process
        can be done manually by anyone in DeFi or automated via platforms such as Harvest that
        maximize your returns with the latest yield strategies & auto-compounding mechanism.
      </>
    ),
  },
  {
    id: 3,
    question: 'Why deposit with Harvest?',
    answer: (
      <>
        <ul>
          <li style={{ marginBottom: '20px' }}>
            Yield farming is a highly manual process and inconvenient for people that cannot keep up
            with the latest updates 24/7. Harvest automates the yield farming process by regularly
            harvesting & auto-compounding rewards at a significantly lower cost for users.
          </li>
          <li style={{ marginBottom: '20px' }}>
            Harvest is one of the longest-running yield farming platforms in DeFi, established in
            August 2020 with the native token FARM listed on trusted exchanges such as Coinbase,
            Binance, Kraken, and several other CEXs and DEXs.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 5,
    question: 'What are APR and APY, and how are they calculated?',
    answer: (
      <>
        See{' '}
        <a
          href="https://docs.harvest.finance/general-info/how-to-use-1/how-to-understand-how-much-you-earn/apy-calculation"
          target="_blank"
          rel="noopener noreferrer"
        >
          this article about APY calculation
        </a>{' '}
        and{' '}
        <a
          href="https://docs.harvest.finance/general-info/how-to-use-1/how-to-understand-how-much-you-earn/interest-rate-guide"
          target="_blank"
          rel="noopener noreferrer"
        >
          this one about your expected profits.
        </a>
        <br />
        <br />
        <b>
          Remember: the APY is estimated on past performance. The APY may go up or down due to
          several reasons:
        </b>
        <ul>
          <li>Governance decisions of the underlying platform</li>
          <li>
            Change of incentives like the number of emissions directed to profit share, fundamental
            tokenomics or dynamics such as the 4% emission reduction every week
          </li>
          <li>
            Swings in the price of FARM token (which is used for incentives) can deviate the APY.
          </li>
          <li>Large changes in TVL may dilute rewards and reduce APY. </li>
          <li>
            Market volume in LP assets farmed can also have an impact on the APY movement as a high
            volume generally in an LP position captures more fees driving up the APY.
          </li>
        </ul>
        <br />
        <div>APR / APY Disclaimer</div>
        <br />
        <div>
          The stated APR/APY (the &apos;Rate&apos;) is denominated in terms of relevant underlying
          tokens in the vaults. The Rate is a forward-looking projection based on our good faith
          belief of how to project results over the relevant period reasonably, but such belief is
          subject to numerous assumptions, risks and uncertainties (including smart contract
          security risks and third-party actions) which could result in a materially different
          (lower or higher) token-denominated APR/APY. The Rate is not a promise, guarantee, or
          undertaking on the part of any person or group of persons but depends entirely on the
          results of the operation of smart contracts and other autonomous systems (including
          third-party systems) and how third parties interact with those systems after the time of
          your deposit. Even if the Rate is achieved as projected, you may still suffer a financial
          loss in fiat-denominated terms if the fiat-denominated value of the relevant tokens (your
          deposit and any tokens allocated or distributed to you pursuant to the Rate) declines
          during the deposit period.
        </div>
      </>
    ),
  },
  {
    id: 7,
    question: 'What are Harvest deposit/withdrawal fees?',
    answer: (
      <>
        Harvest does not charge you any deposit/withdrawal fee. There is only a performance fee
        applied to your earned rewards (30% on Ethereum Network, 8% on other chains). The APY values
        of our farms are estimated by taking the performance fee into account.
      </>
    ),
  },
  {
    id: 9,
    question: 'What is a f_Token?',
    answer: (
      <>
        fDAI, fUSD, and other f-tokens are the yield-bearing versions of the corresponding assets
        that users deposit. It’s also proof of deposit. F_tokens can be redeemed anytime for DAI,
        USDC, or any other asset via our integration with Wido.
      </>
    ),
  },
  {
    id: 11,
    question: 'Are there timelocks?',
    answer: (
      <>
        <div style={{ color: '#ff9400', textDecoration: 'underline' }}>Yes, 12 hours.</div>
      </>
    ),
  },
  {
    id: 13,
    question: 'I deposited FARM into the FARM profit share, but I can’t find it anymore!',
    answer: (
      <>
        Don’t worry; your funds are still there, under the iFARM pool. Uncheck “use iFARM” if you
        want to withdraw!
      </>
    ),
  },
  {
    id: 15,
    question: 'I deposited into a Pool for a few hours but still have no yield. Why?',
    answer: (
      <>
        While FARM emissions start accruing immediately after depositing, yields from farmed tokens
        come after a successful DoHardWork (a smart contract execution). Profitability analysis is
        done on when to harvest to ensure maximum yields and gas efficiency.
      </>
    ),
  },
  {
    id: 17,
    question: 'What is Profit-Sharing?',
    answer: (
      <>
        Harvest’s flagship farm is called ‘Profit-Sharing’. It’s where anyone can deposit the native
        $FARM, $iFARM, or any other token deposited via Wido to be entitled to a part of the yield
        from all other farming strategies at Harvest.
      </>
    ),
  },
  {
    id: 19,
    question: 'What are the token economics for FARM?',
    answer: (
      <ul>
        <li style={{ marginBottom: '10px' }}>
          Circulating supply at launch: <b>0</b>.
        </li>
        <li style={{ marginBottom: '10px' }}>
          FARM has a total supply over 4 years of <b>690,420.</b> distributed over four years since
          the project’s inception in August 2020
        </li>
        <li>Harvest was bootstrapped entirely, with no VCs and no premine.</li>
      </ul>
    ),
  },
  {
    id: 21,
    question: 'Who is the Harvest team?',
    answer: <>Just like Satoshi, the Harvest Finance launch team is anonymous.</>,
  },
  {
    id: 23,
    question: 'Is Harvest audited?',
    answer: (
      <>
        See Audits from PeckShield, Heachi, Certik & Least Authority{' '}
        <a
          href="https://docs.harvest.finance/general-info/security/audites"
          target="_blank"
          rel="noopener noreferrer"
        >
          here.
        </a>
        <ul>
          <li>
            The Harvest smart contracts have been designed from the ground up with security in mind
            by using as many audited components as possible. Please review the smart contracts
            before depositing funds.
          </li>
          <li>
            The Harvest smart contracts are{' '}
            <a target="_blank" rel="noopener noreferrer" href={SOCIAL_LINKS.GITHUB}>
              here.
            </a>
          </li>
          <li>
            We would like to thank Least Authority, Haechi, Peckshield and CertiK for their hard
            work on the audits.
          </li>
        </ul>
      </>
    ),
  },
]

export const FAQ_ITEMS_SECOND = [
  {
    id: 2,
    question: 'What is Harvest?',
    answer: (
      <>
        Harvest is an international cooperative of users pooling resources to earn DeFi yields. When
        users (also referred to as farmers) deposit their assets into one of the farming strategies
        available in the app, Harvest automatically puts them to work to earn the{' '}
        <b>highest yields</b> with these deposits in a ‘set & forget’ fashion.
      </>
    ),
  },
  {
    id: 4,
    question: 'What is Wido?',
    answer: (
      <>
        Wido is a 3rd party zap provider which Harvest uses under the hood. With Wido, users can
        deposit any token into any farm, for example, $USDC into an $ETH farm. Wido takes care of
        the token conversion for you at the best rates so that you don’t have to leave Harvest to
        swap tokens elsewhere manually.
      </>
    ),
  },
  {
    id: 6,
    question: 'Why do I need to Deposit and then additionally Stake my tokens?',
    answer: (
      <>
        The first step to getting started farming with Harvest is to wrap your token into Harvest’s
        f_Token, such as fUSDC. From here, you can 1) use it for farming on Harvest to be entitled
        to all rewards, 2) take it to another DeFi platform for yield derivatives, interest rates,
        or use as collateral.
        <br />
        <br />
        Staking your fToken on Harvest only then entitles you to full APY of the given farm.
      </>
    ),
  },
  {
    id: 8,
    question: 'Why is the gas fee for depositing and withdrawing so high?',
    answer: (
      <>
        Interacting with our farms, whether depositing or withdrawing, comes with network fees.
        Depending on network congestion, the fees can be temporarily higher than usual. We suggest
        coming back later for lower fees​. (Tip: Sundays are usually low in network activity
        compared to the rest of the weekdays)
      </>
    ),
  },
  {
    id: 10,
    question: 'I can’t find the farm I deposited into weeks ago!',
    answer: <>Go to the Portfolio, and look under the inactive section.</>,
  },
  {
    id: 12,
    question: 'I withdrew from Harvest, but I can’t see my funds!',
    answer: (
      <>
        Withdrawing is a two-step process. First, you need to unstake your fToken from Harvest.
        Then, to finally withdraw your fToken into your input token, e.g., USDC, hit the “Withdraw”
        button for the tokens to appear in your wallet, such as Metamask.
      </>
    ),
  },
  {
    id: 14,
    question: 'What are FARM, iFARM, miFarm, and bFARM?',
    answer: (
      <>
        Both <b>FARM</b> and <b>iFARM</b> are ERC-20 tokens on Ethereum.
        <br />
        <br />
        <ul>
          <li>
            <a
              href="https://www.coingecko.com/en/coins/harvest-finance"
              target="_blank"
              rel="noopener noreferrer"
            >
              FARM
            </a>{' '}
            is a cashflow token for Harvest. Find out{' '}
            <a
              href="https://docs.harvest.finance/general-info/how-to-use-1/where-trade-farm-bfarm"
              rel="noopener noreferrer"
              target="_blank"
            >
              here
            </a>{' '}
            where you can trade it. You can read more about it{' '}
            <a
              href="https://farm.chainwiki.dev/en/supply"
              rel="noopener noreferrer"
              target="_blank"
            >
              here
            </a>
            .
          </li>

          <li>
            <a
              href="https://etherscan.io/token/0x1571eD0bed4D987fe2b498DdBaE7DFA19519F651"
              target="_blank"
              rel="noopener noreferrer"
            >
              iFARM
            </a>{' '}
            is a yield-bearing token for Harvest. It can be acquired by depositing FARM into the
            Profit-Sharing pool on Ethereum Network with the <b>Use iFARM</b> checkbox.
          </li>

          <li>
            <a
              href="https://polygonscan.com/token/0xab0b2ddB9C7e440fAc8E140A89c0dbCBf2d7Bbff"
              target="_blank"
              rel="noopener noreferrer"
            >
              miFARM
            </a>{' '}
            is the equivalent of iFARM on Polygon. It can be bridged back and forth using{' '}
            <a
              href="https://wallet.polygon.technology/bridge"
              target="_blank"
              rel="noopener noreferrer"
            >
              the official bridge
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 16,
    lazyRender: false,
    question: 'What is the utility of FARM token?',
    answer: (
      <>
        FARM fuels the Harvest platform. It is simultaneously a reward token for users, a payment
        token for Harvest workers, and a governance token. Its supply is limited to 690,420 tokens.
        FARM is also a cash flow token for Harvest. When Harvest’s farms generate yields, 70% (70%
        on Ethereum Network, 92% on other chains) of these yields are used to increase the value of
        the deposits. The remaining 30% (30% on Ethereum Network, 8% on other chains) are converted
        into FARM tokens which are then used to reward farmers who staked their FARM into the FARM
        pool on Ethereum Network. Hence the name ‘Profit-Sharing.’
        <br />
        <br />
        The Profit-Sharing pool has implications for the value of iFARM - the yield-bearing FARM.
        iFARM is using the FARM pool under the hood. iFARM acts as FARM staked in the Profit-Sharing
        pool. Its main advantages are 1) a lower gas cost, 2) transferability and 3) further new
        utilities (e.g. lending collateralization).
        <br />
        <br />
        You can read more{' '}
        <a
          href="https://docs.harvest.finance/general-info/what-do-we-do/profit-sharing-pool-ps"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{' '}
        and{' '}
        <a
          href="https://redmption.medium.com/flight-of-the-aggregator-1a687a1662ed"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{' '}
        for detailed mechanics of FARM and the FARM pool.
      </>
    ),
  },
  {
    id: 18,
    question: 'What is the road map for Harvest?',
    answer: `
      The long-term goal for Harvest is to become DeFi's go-to place for all yield farmers - big or small - by offering a clean and 
      intuitive interface to manage funds easily. Harvest is a decentralized cooperative shaped by dozens of users who believe in better, 
      decentralized finance. Given the pace at which DeFi develops, Harvest does not hold a detailed roadmap to shift the course rapidly when needed.
    `,
  },
  {
    id: 20,
    question: 'Is the code open-source?',
    answer: (
      <div>
        <a
          href="https://github.com/harvest-finance/harvest"
          target="_blank"
          rel="noopener noreferrer"
        >
          Smart contracts can be found here.
        </a>
      </div>
    ),
  },
]

export const FAQ_TOTAL = FAQ_ITEMS_SECOND.reduce(
  (result, current) => result.concat(current),
  FAQ_ITEMS_FIRST,
).sort((a, b) => a.id - b.id)
export const CURVE_APY = 79.02

export const HARVEST_API_URL = process.env.REACT_APP_HARVEST_API_URL

export const HARVEST_EXTERNAL_API_URL = process.env.REACT_APP_HARVEST_EXTERNAL_API_URL

export const TOKEN_STATS_API_ENDPOINT = `${HARVEST_EXTERNAL_API_URL}/token-stats?key=${process.env.REACT_APP_EXTERNAL_API_KEY}`
export const POOLS_API_ENDPOINT = `${HARVEST_API_URL}/pools?key=${process.env.REACT_APP_API_KEY}`
export const VAULTS_API_ENDPOINT = `${HARVEST_API_URL}/vaults?key=${process.env.REACT_APP_API_KEY}`
export const REVENUE_MONTHLY_API_ENDPOINT = `${HARVEST_EXTERNAL_API_URL}/revenue/monthly?key=${process.env.REACT_APP_EXTERNAL_API_KEY}`
export const CMC_API_ENDPOINT = `${HARVEST_EXTERNAL_API_URL}/cmc?key=${process.env.REACT_APP_EXTERNAL_API_KEY}`
export const TVL_API_ENDPOINT = `${HARVEST_EXTERNAL_API_URL}/gmv/total?key=${process.env.REACT_APP_EXTERNAL_API_KEY}`
export const TOTAL_TVL_API_ENDPOINT = `${HARVEST_API_URL}/tvl?key=${process.env.REACT_APP_EXTERNAL_API_KEY}`
export const CURRENCY_RATES_API_ENDPOINT = `${HARVEST_API_URL}/rates?key=${process.env.REACT_APP_EXTERNAL_API_KEY}`
export const HISTORICAL_RATES_API_ENDPOINT = `${HARVEST_API_URL}/historical-rates?key=${process.env.REACT_APP_EXTERNAL_API_KEY}`
export const LEADERBOARD_API_ENDPOINT = `${HARVEST_API_URL}/leaderboard?key=${process.env.REACT_APP_EXTERNAL_API_KEY}`
export const COINGECKO_API_KEY = `${process.env.REACT_APP_COINGECKO_API_KEY}`

export const BEGINNERS_BALANCES_DECIMALS = 2
export const WIDO_BALANCES_DECIMALS = 5
export const POOL_BALANCES_DECIMALS = 8
export const WIDO_EXTEND_DECIMALS = 9
export const MAX_BALANCES_DECIMALS = 12
export const MAX_DECIMALS = 18

export const MIGRATING_VAULTS = []

export const FARM_TOKEN_SYMBOL = 'FARM'
export const FARM_WETH_TOKEN_SYMBOL = 'FARM_WETH_LP'
export const FARM_GRAIN_TOKEN_SYMBOL = 'FARM_GRAIN_LP'
export const IFARM_TOKEN_SYMBOL = 'IFARM'

export const SPECIAL_VAULTS = {
  NEW_PROFIT_SHARING_POOL_ID: 'profit-sharing-farm',
  FARM_WETH_POOL_ID: 'farm-weth',
  FARM_GRAIN_POOL_ID: 'farm-grain',
  FARM_USDC_POOL_ID: 'uni-farm-usdc',
  FARMSTEAD_USDC_POOL_ID: 'farmstead-usdc',
}

export const DISABLED_DEPOSITS = [
  '1INCH-ETH-DAI',
  '1INCH-ETH-USDT',
  '1INCH-ETH-USDC',
  '1INCH-ETH-WBTC',
]
export const DISABLED_WITHDRAWS = []

export const MINIMUM_DEPOSIT_AUTOFILL_AMOUNT_USD = 5

export const POOL_DETAILS_ACTIONS = {
  STAKE: 1,
  STAKE_WITH_AUTOSTAKING: 2,
  WITHDRAW_ALL: 3,
  WITHDRAW_ALL_WITH_AUTOSTAKING: 4,
  CLAIM_ALL: 5,
}

export const MAX_APY_DISPLAY = 10000

export const DEGEN_WARNING_TOOLTIP_TEXT = (
  <>
    Chad embodies the animal spirits of Degens. These pools may be more volatile. <b>doHardWork</b>{' '}
    helps to auto-harvest these pools for you, saving you gas.
  </>
)

export const ACTIONS = {
  DEPOSIT: 0,
  CLAIM: 1,
  EXIT: 2,
  WITHDRAW: 3,
  STAKE: 4,
  APPROVE_DEPOSIT: 5,
  APPROVE_STAKE: 6,
  APPROVE_MIGRATE: 7,
  STAKE_MIGRATE: 8,
  MIGRATE: 9,
  REDEEM: 10,
}

export const PANEL_ACTIONS_TYPE = {
  HEAD: 0,
  BODY: 1,
  FOOTER: 2,
  MIGRATE: 3,
  UNIV3MANAGED: 4,
}

export const IFARM_DEPOSIT_TOOLTIP = (
  <>
    When unchecked, <b style={{ textDecoration: 'underline' }}>FARM</b> is deposited into{' '}
    <b style={{ textDecoration: 'underline' }}>FARM</b> Pool directly.
    <br /> When checked, <b style={{ textDecoration: 'underline' }}>FARM</b> is converted into{' '}
    <b style={{ textDecoration: 'underline' }}>iFARM</b>: the interest-bearing{' '}
    <b style={{ textDecoration: 'underline' }}>FARM</b> which grows in value over time
  </>
)
export const IFARM_WITHDRAW_TOOLTIP = (
  <>
    If you own <b style={{ textDecoration: 'underline' }}>iFARM</b>, check to withdraw from the{' '}
    <b style={{ textDecoration: 'underline' }}>iFARM</b> vault.
    <br /> Uncheck to withdraw all <b style={{ textDecoration: 'underline' }}>FARM</b> staked into{' '}
    <b>FARM Pool</b> directly
  </>
)

export const SPECIAL_REWARD_TOKENS = []

export const DEFAULT_CLAIM_HELP_MESSAGES = {
  FARM: (
    <div className="help-message">
      <b>Claim rewards:</b>
      <ol className="numeric-list">
        <li>
          Hit &quot;Claim rewards&quot; to claim your{' '}
          <b style={{ textDecoration: 'underline' }}>FARM</b>
        </li>
        <li>
          To earn additional interest on your <b style={{ textDecoration: 'underline' }}>FARM</b>,
          stake your claimed <b style={{ textDecoration: 'underline' }}>FARM</b> into the{' '}
          <b style={{ textDecoration: 'underline' }}>FARM</b> pool. We recommend claiming and
          re-staking your <b style={{ textDecoration: 'underline' }}>FARM</b> rewards into the{' '}
          <b style={{ textDecoration: 'underline' }}>FARM</b> pool periodically (for example,
          weekly)
        </li>
      </ol>
    </div>
  ),
  MIGRATED_TO_HODL: (
    <div className="help-message">
      <b>Claim rewards:</b>
      <ol className="numeric-list">
        <li>
          Hit &quot;Claim FARM&quot; to claim your{' '}
          <b style={{ textDecoration: 'underline' }}>FARM</b>
        </li>
        <li>
          To earn additional interest on your <b style={{ textDecoration: 'underline' }}>FARM</b>,
          stake your claimed <b style={{ textDecoration: 'underline' }}>FARM</b> into the{' '}
          <b style={{ textDecoration: 'underline' }}>FARM</b> pool. We recommend claiming and
          re-staking your <b style={{ textDecoration: 'underline' }}>FARM</b> rewards into the{' '}
          <b style={{ textDecoration: 'underline' }}>FARM</b> pool periodically (for example,
          weekly)
        </li>
      </ol>
    </div>
  ),
  IFARM: (
    <div className="help-message">
      <b>Claim rewards:</b>
      <ol className="numeric-list">
        <li>
          Hit &quot;Claim rewards&quot; to claim your{' '}
          <b style={{ textDecoration: 'underline' }}>iFARM</b>
        </li>
        <li>
          Your <b style={{ textDecoration: 'underline' }}>iFARM</b> earns interest automatically,
          you do not need to stake it
        </li>
      </ol>
    </div>
  ),
  HODL: (
    <div className="help-message">
      <b>Claim rewards:</b>
      <ol className="numeric-list">
        <li>
          Hit &quot;Claim rewards&quot; to claim your{' '}
          <b style={{ textDecoration: 'underline' }}>iFARM</b> and{' '}
          <b style={{ textDecoration: 'underline' }}>fSUSHI</b>
        </li>
        <li>
          To redeem <b style={{ textDecoration: 'underline' }}>fSUSHI</b> for{' '}
          <b style={{ textDecoration: 'underline' }}>SUSHI</b>, withdraw from the{' '}
          <b style={{ textDecoration: 'underline' }}>SUSHI</b> vault on the same page
        </li>
      </ol>
    </div>
  ),
  bFARM: (
    <div className="help-message">
      <b>Claim rewards:</b>
      <ol className="numeric-list">
        <li>
          Hit &quot;Claim rewards&quot; to claim your{' '}
          <b style={{ textDecoration: 'underline' }}>bFARM</b>
        </li>
        <li>
          To earn additional interest on your <b style={{ textDecoration: 'underline' }}>bFARM</b>,
          you can bridge <b style={{ textDecoration: 'underline' }}>bFARM</b> into{' '}
          <b style={{ textDecoration: 'underline' }}>FARM</b> using{' '}
          <a href="https://anyswap.exchange/bridge" target="_blank" rel="noopener noreferrer">
            Anyswap
          </a>{' '}
          and stake it into the <b style={{ textDecoration: 'underline' }}>FARM</b> pool. We
          recommend doing so periodically (for example, weekly)
        </li>
      </ol>
    </div>
  ),
  miFARM: (
    <div className="help-message">
      <b>Claim rewards:</b>
      <ol className="numeric-list">
        <li>
          Hit &quot;Claim rewards&quot; to claim your{' '}
          <b style={{ textDecoration: 'underline' }}>miFARM</b>
        </li>
        <li>
          Your <b style={{ textDecoration: 'underline' }}>miFARM</b> earns interest automatically,
          you do not need to stake it
        </li>
      </ol>
    </div>
  ),
}

export const isDebugMode = process.env.REACT_APP_MODE === 'debug'

export const UNIV3_TOLERANCE = 150
export const UNIV3_SLIPPAGE_TOLERANCE = 0.95

export const BOOST_PANEL_MODES = {
  STAKE: 0,
  UNSTAKE: 1,
  REDEEM: 2,
}

export const AUDIT_FILE_LINKS = {
  LEAST_AUTHORITY:
    'https://github.com/harvest-finance/harvest/blob/master/audits/LeastAuthority-Harvest.pdf',
  CERTIK: 'https://github.com/harvest-finance/harvest/blob/master/audits/CertiK-Harvest.pdf',
  HAECHI: 'https://github.com/harvest-finance/harvest/blob/master/audits/Haechi-Harvest.pdf',
  PECKSHIELD:
    'https://github.com/harvest-finance/harvest/blob/master/audits/PeckShield-Harvest.pdf',
}

export const ZAPPER_FI_ZAP_IN_ENDPOINT = 'https://api.zapper.fi/v1/zap-in/harvest'

export const UNIV3_POOL_ID_REGEX = '[uU]ni[vV]3'

export const RESTRICTED_COUNTRIES = ['US']

export const MIGRATION_STEPS = {
  UNSTAKE: 0,
  APPROVE: 1,
  MIGRATE: 2,
}

export const directDetailUrl = '/'

export const feeList = [
  { label: 'Convert Fee', value: '0%' },
  { label: 'Revert Fee', value: '0%' },
]

export const SUPPORTED_CURRENCY = {
  USD: 0,
  GBP: 1,
  EUR: 2,
  CHF: 3,
  JPY: 4,
}

export const chainList = [
  { id: 1, name: 'Ethereum', chainId: 1 },
  { id: 2, name: 'Polygon', chainId: 137 },
  { id: 3, name: 'Arbitrum', chainId: 42161 },
  { id: 4, name: 'Base', chainId: 8453 },
  { id: 5, name: 'Zksync', chainId: 324 },
]

export const ChainsList = [
  { id: 0, name: 'Ethereum', img: ETHEREUM, chainId: CHAIN_IDS.ETH_MAINNET },
  { id: 1, name: 'Polygon', img: POLYGON, chainId: CHAIN_IDS.POLYGON_MAINNET },
  { id: 2, name: 'Arbitrum', img: ARBITRUM, chainId: CHAIN_IDS.ARBITRUM_ONE },
  { id: 3, name: 'Base', img: BASE, chainId: CHAIN_IDS.BASE },
  { id: 4, name: 'Zksync', img: ZKSYNC, chainId: CHAIN_IDS.ZKSYNC },
]

export const someChainsList = [
  { id: 0, name: 'base', img: BASE, chainId: CHAIN_IDS.BASE },
  { id: 1, name: 'arbitrum', img: ARBITRUM, chainId: CHAIN_IDS.ARBITRUM_ONE },
]

export const fakeChartData = [
  { x: 1691637444000, y: 5, z: 1.5 },
  { x: 1691780004000, y: 6, z: 2 },
  { x: 1691922564000, y: 7, z: 2.5 },
  { x: 1692065124000, y: 7, z: 2.5 },
  { x: 1692207684000, y: 7.5, z: 3 },
  { x: 1692350244000, y: 8, z: 3 },
  { x: 1692492804000, y: 8.5, z: 3 },
  { x: 1692635364000, y: 9, z: 3.5 },
  { x: 1692777924000, y: 10, z: 3.5 },
  { x: 1692920484000, y: 11, z: 3.7 },
  { x: 1693063044000, y: 11, z: 3.7 },
  { x: 1693205604000, y: 11.5, z: 4 },
  { x: 1693348164000, y: 11.5, z: 4.2 },
  { x: 1693490724000, y: 12, z: 4.3 },
  { x: 1693633284000, y: 14, z: 4.5 },
  { x: 1693775844000, y: 15, z: 4.5 },
]

export const magicChartData = [
  { x: 1691637444000, y: 0 },
  { x: 1691780004000, y: 0.1 },
  { x: 1691922564000, y: 0.4 },
  { x: 1692065124000, y: 2.5 },
  { x: 1692207684000, y: 2.7 },
  { x: 1692350244000, y: 2.9 },
  { x: 1692492804000, y: 3.1 },
  { x: 1692635364000, y: 3.5 },
  { x: 1692777924000, y: 4 },
  { x: 1692920484000, y: 4.8 },
  { x: 1693063044000, y: 5 },
  { x: 1693205604000, y: 5.5 },
  { x: 1693348164000, y: 5.6 },
  { x: 1693490724000, y: 6.7 },
  { x: 1693633284000, y: 6.9 },
  { x: 1693775844000, y: 7.2 },
]

export const fakeYieldData = [
  {
    balance: 0.09543812368478512,
    balanceUsd: 0.09617987541335737,
    chain: '137',
    event: 'Harvest',
    lifetimeYield: '3.08407408664195',
    name: 'jEUR - PAR',
    netChange: 0.00005202724519889901,
    netChangeUsd: 0.00005243160456357591,
    platform: 'Aura Finance',
    priceUnderlying: '1.007772069482653749245834699350357',
    sharePrice: '1.162605195614969479',
    timestamp: '1733229220',
    tokenSymbol: 'balancer_2EUR_PAR_v2',
    value: '0.082089882313232182',
  },
  {
    balance: 0.252538629620844,
    balanceUsd: 5.468231202454778,
    chain: '8453',
    event: 'Harvest',
    lifetimeYield: '3.0840216550373865',
    name: 'GENOME - ETH',
    netChange: 0.00043985899598542044,
    netChangeUsd: 0.009524288185689048,
    platform: 'Aerodrome',
    priceUnderlying: '21.65304852831687838280557137977929',
    sharePrice: '1.262693148104220191',
    timestamp: '1733225577',
    tokenSymbol: 'aerodrome_GENOME_ETH',
    value: '0.199999999999999952',
  },
  {
    balance: 0.00011656154927212192,
    balanceUsd: 0.4201860551481367,
    chain: '8453',
    event: 'Harvest',
    lifetimeYield: '3.0744973668516975',
    name: 'ETH',
    netChange: 6.34764691833246e-9,
    netChangeUsd: 0.000022882268936393218,
    platform: 'Moonwell',
    priceUnderlying: '3604.842744215589717608',
    sharePrice: '1.165615492721219307',
    timestamp: '1733224691',
    tokenSymbol: 'moonwell_WETH',
    value: '0.0001',
  },
  {
    balance: 0.2520987706248586,
    balanceUsd: 5.3210757750406,
    chain: '8453',
    event: 'Harvest',
    lifetimeYield: '3.0655754408710605',
    name: 'GENOME - ETH',
    netChange: 0.0004570560812419133,
    netChangeUsd: 0.009647131700417422,
    platform: 'Aerodrome',
    priceUnderlying: '21.10710719394483199243413743688557',
    sharePrice: '1.260493853124293350',
    timestamp: '1733201189',
    tokenSymbol: 'aerodrome_GENOME_ETH',
    value: '0.199999999999999952',
  },
  {
    balance: 9.38282696011794e-8,
    balanceUsd: 0.28714341600345744,
    chain: '8453',
    event: 'Harvest',
    lifetimeYield: '3.055928309170643',
    name: 'OVN - USD+',
    netChange: 5.385914863878393e-11,
    netChangeUsd: 0.00016482559029292796,
    platform: 'Aerodrome',
    priceUnderlying: '3060308.127006619367368306551062156',
    sharePrice: '3.673910220345035168',
    timestamp: '1733200751',
    tokenSymbol: 'aerodrome_OVN_USDp',
    value: '0.000000025539075256',
  },
  {
    balance: 0.00011655520162520359,
    balanceUsd: 0.42559854184086976,
    chain: '8453',
    event: 'Harvest',
    lifetimeYield: '3.05576348358035',
    name: 'ETH',
    netChange: 6.300172165403127e-9,
    netChangeUsd: 0.000023004928562211838,
    platform: 'Moonwell',
    priceUnderlying: '3651.476175292715931975',
    sharePrice: '1.165552016252035849',
    timestamp: '1733200337',
    tokenSymbol: 'moonwell_WETH',
    value: '0.0001',
  },
]

export const boostedVaults = [
  'lodestar_ARB',
  'lodestar_ETH',
  'lodestar_PENDLE',
  'camelot_iFARM_ETH',
  'lodestar_wstETH',
  'xGRAIL',
  'IFARM_arbitrum',
  'lodestar_LODE',
  'lodestar_GMX',
  'camelotV3_GRAIL_ETH',
  'camelotV3_ARB_USDC',
  'camelotV3_ETH_USDT',
  'camelotV3_ETH_USDC',
  'aave_GHO_arbitrum',
  'fluid_USDC_arbitrum',
  'fluid_USDT_arbitrum',
  'fluid_ETH_arbitrum',
  'dolomite_DAI',
  'dolomite_WBTC',
  'dolomite_USDC',
  'dolomite_USDT',
]

export const supportedCurrencies = [
  {
    id: SUPPORTED_CURRENCY.USD,
    symbol: 'USD',
    icon: '$',
    imgPath: Dollar,
  },
  {
    id: SUPPORTED_CURRENCY.GBP,
    symbol: 'GBP',
    icon: '£',
    imgPath: Pound,
  },
  {
    id: SUPPORTED_CURRENCY.EUR,
    symbol: 'EUR',
    icon: '€',
    imgPath: Euro,
  },
  {
    id: SUPPORTED_CURRENCY.CHF,
    symbol: 'CHF',
    icon: '₣',
    imgPath: Franc,
  },
  {
    id: SUPPORTED_CURRENCY.JPY,
    symbol: 'JPY',
    icon: '¥',
    imgPath: Yen,
  },
]
