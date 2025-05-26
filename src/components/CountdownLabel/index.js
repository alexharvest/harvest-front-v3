import React from 'react'
import { useThemeContext } from '../../providers/useThemeContext'
import { CountdownContainer, DaysLabel } from './style'

const CountdownLabel = ({ days, hours, minutes, /* seconds, milliseconds, */ ...props }) => {
  const { fontColor } = useThemeContext()
  return (
    <CountdownContainer $fontcolor={fontColor} {...props}>
      {days}
      <DaysLabel>Days</DaysLabel>
      {hours}:{minutes}
    </CountdownContainer>
  )
}
export default CountdownLabel
