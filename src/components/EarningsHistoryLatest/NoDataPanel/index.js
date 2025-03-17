import React from 'react'
import { useMediaQuery } from 'react-responsive'
import ActionRow from '../ActionRow'
import { useThemeContext } from '../../../providers/useThemeContext'
import { useWallet } from '../../../providers/Wallet'
import { fakeYieldData } from '../../../constants'
import { EmptyInfo, EmptyPanel, FakeBoxWrapper } from './style'

const NoDataPanel = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const { fontColor } = useThemeContext()
  const { connected } = useWallet()

  return (
    <EmptyPanel height="300px">
      <EmptyInfo height="100%" weight={500} size={14} lineHeight={20} color={fontColor}>
        {connected
          ? 'No activity found for this wallet.'
          : 'Connect wallet to see your latest yield'}
      </EmptyInfo>
      <FakeBoxWrapper>
        {fakeYieldData
          .map((el, i) => {
            const info = fakeYieldData[i]
            return <ActionRow key={i} info={info} />
          })
          .slice(0, isMobile ? 6 : 4)}
      </FakeBoxWrapper>
    </EmptyPanel>
  )
}
export default NoDataPanel
