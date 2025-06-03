import React from 'react'
import { Web3OnboardProvider } from '@web3-onboard/react'

import { ActionsProvider } from './Actions'
import { ContractsProvider } from './Contracts'
import { PoolsProvider } from './Pools'
import { StatsProvider } from './Stats'
import { RateProvider } from './Rate'
import { ThemeProvider } from './useThemeContext'
import { VaultsProvider } from './Vault'
import { WalletProvider } from './Wallet'
import { PortalsProvider } from './Portals'
import { web3Onboard } from './web3Onboard'

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
