import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import gnosisModule from '@web3-onboard/gnosis'
import walletConnectModule from '@web3-onboard/walletconnect'
import ledgerModule from '@web3-onboard/ledger'
import metamaskSDK from '@web3-onboard/metamask'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import trustModule from '@web3-onboard/trust'
import torusModule from '@web3-onboard/torus'
import dcentModule from '@web3-onboard/dcent'
import enrkypt from '@web3-onboard/enkrypt'
import trezorModule from '@web3-onboard/trezor'
import okxWallet from '@web3-onboard/okx'
import tahoWalletModule from '@web3-onboard/taho'
import bitgetWalletModule from '@web3-onboard/bitget'
import tallyWalletModule from '@web3-onboard/tallyho'
import xdefiWalletModule from '@web3-onboard/xdefi'
import frontierModule from '@web3-onboard/frontier'
import mewWallet from '@web3-onboard/mew-wallet'
import zealWalletModule from '@web3-onboard/zeal'
import phantomModule from '@web3-onboard/phantom'
import infinityWalletWalletModule from '@web3-onboard/infinity-wallet'
import frameModule from '@web3-onboard/frame'
import bloctoModule from '@web3-onboard/blocto'

import HavestLogo from '../assets/images/logos/Harvest_Standard.svg'

const injected = injectedModule()
const gnosis = gnosisModule()
const ledger = ledgerModule({
  projectId: '6931eace1272646ed84e46c55fac0311',
})

const walletConnect = walletConnectModule({
  projectId: '6931eace1272646ed84e46c55fac0311',
  dappUrl: 'https://app.harvest.finance',
  qrModalOptions: {
    mobileWallets: [
      {
        id: 'rainbow',
        name: 'Rainbow',
        links: {
          universal: 'https://rainbow.me',
          native: 'rainbow://',
        },
      },
      {
        id: 'metamask',
        name: 'MetaMask',
        links: {
          universal: 'https://metamask.io',
          native: 'metamask://',
        },
      },
      {
        id: 'argent',
        name: 'Argent',
        links: {
          universal: 'https://argent.xyz',
          native: 'argent://',
        },
      },
      {
        id: 'trust',
        name: 'Trust Wallet',
        links: {
          universal: 'https://trustwallet.com',
          native: 'trust://',
        },
      },
      {
        id: 'imtoken',
        name: 'imToken',
        links: {
          universal: 'https://token.im',
          native: 'imtokenv2://',
        },
      },
      {
        id: 'pillar',
        name: 'Pillar',
        links: {
          universal: 'https://pillar.fi',
          native: 'pillar://',
        },
      },
    ],
  },
})

const metamaskSDKWallet = metamaskSDK({
  options: {
    extensionOnly: false,
    dappMetadata: {
      name: 'Demo Web3Onboard',
    },
  },
})

const trezor = trezorModule({
  email: 'devstar718@gmail.com',
  appUrl: 'https://app.harvest.finance',
})

const coinbaseWalletSdk = coinbaseWalletModule()
const trust = trustModule()
const torus = torusModule()
const dcent = dcentModule()
const enrkyptModule = enrkypt()
const okx = okxWallet()
const taho = tahoWalletModule()
const bitgetWallet = bitgetWalletModule()
const tallyWallet = tallyWalletModule()
const xdefiWallet = xdefiWalletModule()
const frontier = frontierModule()
const mewWalletModule = mewWallet()
const zealWallet = zealWalletModule()
const phantom = phantomModule()
const infinityWalletSDK = infinityWalletWalletModule()
const frame = frameModule()
const blocto = bloctoModule()

export const web3Onboard = init({
  // head to https://explorer.blocknative.com/account to sign up for free
  apiKey: process.env.REACT_APP_BLOCKNATIVE_KEY,
  wallets: [
    injected,
    metamaskSDKWallet,
    coinbaseWalletSdk,
    walletConnect,
    gnosis,
    ledger,
    trust,
    okx,
    trezor,
    phantom,
    taho,
    bitgetWallet,
    torus,
    tallyWallet,
    xdefiWallet,
    frontier,
    infinityWalletSDK,
    frame,
    mewWalletModule,
    blocto,
    zealWallet,
    dcent,
    enrkyptModule,
  ],
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
