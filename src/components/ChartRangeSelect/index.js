import React from 'react'
import { useThemeContext } from '../../providers/useThemeContext'
import { Container, Text } from './style'

const ChartRangeSelect = ({ state, type, text, onClick }) => {
  const { switchMode } = useThemeContext()
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
    >
      <Text $activeitem={text === state}>{text}</Text>
    </Container>
  )
}

export default ChartRangeSelect
