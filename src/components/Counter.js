import BigNumber from 'bignumber.js'
import { get, toArray } from 'lodash'
import React from 'react'
import CountUp from 'react-countup'
import { fromWei } from '../services/web3'

const { tokens } = require('../data')
const { POOL_TYPES } = require('../data/constants')

const nowInSeconds = Date.now() / 1000

const Counter = ({
  pool,
  totalTokensEarned,
  totalStaked,
  ratePerDay,
  rewardPerToken,
  rewardTokenAddress,
}) => {
  if (!!pool.autoStakePoolAddress && Number(totalStaked) <= 0) {
    return <span className="count-up-text">Auto-Compounding</span>
  }

  if (!pool.autoStakePoolAddress && Number(totalTokensEarned) <= 0) {
    return <span className="count-up-text">0.00</span>
  }

  const rewardToken = toArray(tokens).find(token => token.tokenAddress === rewardTokenAddress)

  const rewardPerTokenInEther = new BigNumber(rewardPerToken).dividedBy(
    new BigNumber(10).exponentiatedBy(get(rewardToken, 'decimals', 18)),
  )

  const sharingPoolEndTarget = fromWei(
    new BigNumber(totalStaked).multipliedBy(rewardPerTokenInEther).toNumber(),
    pool.lpTokenData.decimals,
  )

  const totalStakedInEther = fromWei(totalStaked, pool.lpTokenData.decimals)

  switch (true) {
    case pool.type === POOL_TYPES.UNIV3:
    case pool.type === POOL_TYPES.INCENTIVE:
    case pool.type === POOL_TYPES.INCENTIVE_BUYBACK:
      return (
        <CountUp
          start={Number(totalTokensEarned)}
          end={Number(totalTokensEarned) + Number(totalTokensEarned) * Number(ratePerDay)}
          useEasing={false}
          separator=","
          formattingFn={number => number}
          delay={0}
          decimals={Number(rewardToken?.decimals)}
          // duration={86400}
          duration={0.01}
          className="count-up-text"
        />
      )
    case pool.type === POOL_TYPES.PROFIT_SHARING && !!pool.autoStakePoolAddress:
      return (
        <CountUp
          start={Number(totalStakedInEther)}
          end={Number(totalStakedInEther) + Number(totalStakedInEther) * Number(ratePerDay)}
          useEasing={false}
          separator=","
          formattingFn={number => number}
          delay={0}
          decimals={Number(rewardToken?.decimals)}
          // duration={86400}
          duration={0.01}
          className="count-up-text"
        />
      )
    case pool.finishTime > nowInSeconds && pool.type === POOL_TYPES.PROFIT_SHARING:
      return (
        <CountUp
          start={Number(totalTokensEarned)}
          end={Number(sharingPoolEndTarget)}
          useEasing={false}
          separator=","
          formattingFn={number => number}
          delay={0}
          decimals={Number(rewardToken?.decimals)}
          // duration={pool.finishTime - nowInSeconds}
          duration={0.01}
          className="count-up-text"
        />
      )
    default:
      return '0.00'
  }
}

export default Counter
