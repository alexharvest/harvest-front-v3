import React, { useState } from 'react'
import { NewLabel } from '../PositionModal/style'
import { useThemeContext } from '../../../providers/useThemeContext'
import { handleToggle } from '../../../utilities/parsers'

const Accordian = ({ text, EXPANDED, COLLAPSED, darkMode }) => {
  const { borderColorBox } = useThemeContext()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <NewLabel
      display="flex"
      paddingBottom="32px"
      marginBottom="24px"
      flexDirection="column"
      borderBottom={`1px solid ${borderColorBox}`}
      cursorType="pointer"
      onClick={handleToggle(setIsExpanded)}
    >
      <NewLabel display="flex" justifyContent="space-between" alignItems="center">
        <NewLabel
          size="15.37px"
          height="23.91px"
          weight="500"
          color={darkMode ? '#ffffff' : '#101828'}
          marginRight="10px"
        >
          {text.question}
        </NewLabel>
        <img src={isExpanded ? EXPANDED : COLLAPSED} alt="" />
      </NewLabel>
      {isExpanded && (
        <NewLabel
          size="13.66px"
          weight="400"
          height="20.49px"
          color={darkMode ? '#ffffff' : '#475467'}
          marginTop="10px"
        >
          {text.answer}
        </NewLabel>
      )}
    </NewLabel>
  )
}

export default Accordian
