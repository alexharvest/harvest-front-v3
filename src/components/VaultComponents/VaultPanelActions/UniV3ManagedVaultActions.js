import React from 'react'
import { Tooltip } from 'react-tooltip'
import { faInfoCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fromWei } from '../../../services/web3'
import { Monospace } from '../../GlobalStyle'
import {
  UniV3VaultContainer,
  SelectedVault,
  SelectedVaultLabel,
  SelectedVaultNumber,
  RangeGroup,
  VaultRangeContainer,
  VaultRange,
} from './style'

const UniV3ManagedVaultActions = token => {
  let lockedDate = new Date(parseInt(token.uniswapV3ManagedData.withdrawalTimestamp, 10) * 1000)
  lockedDate = `${lockedDate.getUTCFullYear()}-${`0${lockedDate.getUTCMonth()}`.slice(
    -2,
  )}-${`0${lockedDate.getUTCDate()}`.slice(-2)} ${`0${lockedDate.getUTCHours()}`.slice(
    -2,
  )}:${`0${lockedDate.getUTCMinutes()}`.slice(-2)} UTC`

  return (
    <UniV3VaultContainer>
      <Tooltip
        id="univ3-vault-available"
        backgroundColor="#fffce6"
        borderColor="black"
        border
        textColor="black"
        getContent={() => (
          <>
            This value shows the {token.uniswapV3ManagedData.capTokenSymbol} token limit you can
            deposit in the Uniswap v3 pool.
          </>
        )}
      />
      <SelectedVault>
        <SelectedVaultLabel $fontsize="14px">
          Deposit Cap{' '}
          <FontAwesomeIcon
            icon={faInfoCircle}
            color="#249669"
            data-tip=""
            data-for="univ3-vault-available"
          />
        </SelectedVaultLabel>
        <SelectedVaultNumber>
          <Monospace>
            {token.uniswapV3ManagedData.capLimit !== '0' ? (
              fromWei(
                token.uniswapV3ManagedData.maxToDeposit,
                token.uniswapV3ManagedData.capTokenDecimal,
              )
            ) : (
              <b>Unlimited</b>
            )}
          </Monospace>
        </SelectedVaultNumber>
      </SelectedVault>
      <Tooltip
        id="univ3-locked-time"
        backgroundColor="#fffce6"
        borderColor="black"
        border
        textColor="black"
        getContent={() => <>You can&apos;t withdraw before the withdrawal time.</>}
      />
      <SelectedVault>
        <SelectedVaultLabel $fontsize="14px">
          Withdrawals allowed after:{' '}
          <FontAwesomeIcon
            icon={faInfoCircle}
            color="#249669"
            data-tip=""
            data-for="univ3-locked-time"
          />
        </SelectedVaultLabel>
        <SelectedVaultNumber>
          {token.uniswapV3ManagedData.withdrawalTimestamp !== '0'
            ? lockedDate
            : 'Withdrawals are now allowed'}
        </SelectedVaultNumber>
      </SelectedVault>
      <Tooltip
        id="univ3-vault-ranges"
        backgroundColor="#fffce6"
        borderColor="black"
        border
        textColor="black"
        getContent={() => (
          <>
            It shows the ranges of <b>{token.uniswapV3ManagedData.ranges[0].token1Symbol}</b> in
            this vault.
          </>
        )}
      />
      <RangeGroup>
        <SelectedVaultLabel $fontsize="14px">
          Ranges:{' '}
          <FontAwesomeIcon
            icon={faInfoCircle}
            color="#249669"
            data-tip=""
            data-for="univ3-vault-ranges"
          />
        </SelectedVaultLabel>
        <VaultRangeContainer>
          {token.uniswapV3ManagedData.ranges.map(range => {
            if (range.posId === token.uniswapV3ManagedData.currentRange.posId) {
              return (
                <>
                  <Tooltip
                    id="univ3-vault-currentRange"
                    backgroundColor="#fffce6"
                    borderColor="black"
                    border
                    textColor="black"
                    getContent={() => (
                      <>
                        It shows current <b>{token.uniswapV3ManagedData.ranges[0].token1Symbol}</b>{' '}
                        range in this vault.
                      </>
                    )}
                  />
                  <VaultRange $fontcolor="#249669" data-tip="" data-for="univ3-vault-currentRange">
                    <b>{range.token1Symbol}</b>: {range.lowerBound} ~ {range.upperBound}{' '}
                    <b>{range.token0Symbol}</b>
                    <FontAwesomeIcon icon={faCheckCircle} $fontcolor="#249669" />
                  </VaultRange>
                </>
              )
            }
            return (
              <VaultRange key="normal-range">
                <b>{range.token1Symbol}</b>: {range.lowerBound} ~ {range.upperBound}{' '}
                <b>{range.token0Symbol}</b>
              </VaultRange>
            )
          })}
        </VaultRangeContainer>
      </RangeGroup>
    </UniV3VaultContainer>
  )
}

export default UniV3ManagedVaultActions
