import React, { useState } from 'react'
import { NewLabel } from '../PositionModal/style'
import { useThemeContext } from '../../../providers/useThemeContext'
import { handleToggle } from '../../../utilities/parsers'

const Accordian = ({ text, EXPANDED, COLLAPSED, darkMode }) => {
  const { borderColorBox } = useThemeContext()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <NewLabel
      $display="flex"
      $paddingbottom="32px"
      $marginbottom="24px"
      $flexdirection="column"
      $borderbottom={`1px solid ${borderColorBox}`}
      $cursortype="pointer"
      onClick={handleToggle(setIsExpanded)}
    >
      <NewLabel $display="flex" $justifycontent="space-between" $alignitems="center">
        <NewLabel
          $size="15.37px"
          $height="23.91px"
          $weight="500"
          $fontcolor={darkMode ? '#ffffff' : '#101828'}
          $marginright="10px"
        >
          {text.question}
        </NewLabel>
        <img src={isExpanded ? EXPANDED : COLLAPSED} alt="" />
      </NewLabel>
      {isExpanded && (
        <NewLabel
          $size="13.66px"
          $weight="400"
          $height="20.49px"
          $fontcolor={darkMode ? '#ffffff' : '#475467'}
          $margintop="10px"
        >
          {text.answer}
        </NewLabel>
      )}
    </NewLabel>
  )
}

export default Accordian
