import injectedModule from '@web3-onboard/injected-wallets'
import gnosisModule from '@web3-onboard/gnosis'
import { init, Web3OnboardProvider } from '@web3-onboard/react'
import walletConnectModule from '@web3-onboard/walletconnect'
import ledgerModule from '@web3-onboard/ledger'
import React from 'react'
import { ActionsProvider } from './Actions'
import { ContractsProvider } from './Contracts'
import { PoolsProvider } from './Pools'
import { StatsProvider } from './Stats'
import { RateProvider } from './Rate'
import { ThemeProvider } from './useThemeContext'
import { VaultsProvider } from './Vault'
import { WalletProvider } from './Wallet'
import { PortalsProvider } from './Portals'
import HavestLogo from '../assets/images/logos/Harvest_Standard.svg'

const injected = injectedModule()
const gnosis = gnosisModule()
const ledger = ledgerModule({
  projectId: '6931eace1272646ed84e46c55fac0311',
})
const walletConnect = walletConnectModule({
  version: 2,
  projectId: '6931eace1272646ed84e46c55fac0311',
  bridge: 'https://bridge.walletconnect.org',
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar'],
  },
})

const web3Onboard = init({
  // head to https://explorer.blocknative.com/account to sign up for free
  apiKey: process.env.REACT_APP_BLOCKNATIVE_KEY,
  wallets: [injected, walletConnect, gnosis, ledger],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://rpc.ankr.com/eth`,
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Polygon Mainnet',
      rpcUrl: 'https://rpc.ankr.com/polygon',
    },
    {
      id: 8453,
      token: 'BETH',
      label: 'Base Mainnet',
      rpcUrl: 'https://developer-access-mainnet.base.org',
    },
    {
      id: 42161,
      token: 'AETH',
      label: 'Arbitrum One',
      rpcUrl: 'https://rpc.ankr.com/arbitrum',
    },
    {
      id: 324,
      token: 'ZETH',
      label: 'Zksync',
      rpcUrl: 'https://rpc.ankr.com/zksync_era',
    },
  ],
  appMetadata: {
    name: 'Harvest',
    icon: 'https://app.harvest.finance/static/media/ifarm.ffb37908.svg',
    logo: HavestLogo, // svg string logo
    description: 'Home to Yield Farming',
    gettingStartedGuide: 'https://docs.harvest.finance',
    explore: 'https://app.harvest.finance',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    ],
    agreement: {
      version: '3.0.1',
      termsUrl: 'https://docs.harvest.finance/legal/terms-and-conditions',
      privacyUrl: 'https://docs.harvest.finance/legal/privacy-policy',
    },
  },
  notify: {
    enabled: false,
  },
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: false,
      minimal: true,
    },
    mobile: {
      position: 'topRight',
      enabled: false,
      minimal: true,
    },
  },
  connect: {
    autoConnectLastWallet: true,
  },
})

const Providers = ({ children }) => (
  <ContractsProvider>
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <PortalsProvider>
        <WalletProvider>
          <PoolsProvider>
            <VaultsProvider>
              <ActionsProvider>
                <StatsProvider>
                  <RateProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                  </RateProvider>
                </StatsProvider>
              </ActionsProvider>
            </VaultsProvider>
          </PoolsProvider>
        </WalletProvider>
      </PortalsProvider>
    </Web3OnboardProvider>
  </ContractsProvider>
)

export default Providers
