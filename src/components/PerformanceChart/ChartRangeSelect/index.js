import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useThemeContext } from '../../../providers/useThemeContext'
import { Container, Text } from './style'

const ChartRangeSelect = ({ state, type, text, onClick }) => {
  const { switchMode } = useThemeContext()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const isWeek = text === '1W'
  return (
    <Container
      type={type}
      // state={state}
      // text={text}
      $mode={switchMode}
      $activeitem={text === state}
      onClick={() => {
        onClick()
      }}
      $display={isMobile && isWeek ? 'none' : 'flex'}
    >
      <Text $activeitem={text === state}>{text}</Text>
    </Container>
  )
}

export default ChartRangeSelect
