import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useThemeContext } from '../../../providers/useThemeContext'
import { ButtonsGroup, ButtonStyle } from './style'

const ChartButtonsGroup = ({ buttons, clickedId, setClickedId }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const handleClick = (event, id) => {
    setClickedId(id)
    // doSomethingAfterClick(event)
  }

  const [focusId, setFocusId] = React.useState(-1)
  let tempId = -1

  const { bgColorNew, borderColorBox, darkMode, filterChainHoverColor } = useThemeContext()

  return (
    <ButtonsGroup backColor={bgColorNew} borderColor={borderColorBox}>
      {buttons.map((button, i) => (
        <ButtonStyle
          key={i}
          btnNum={i}
          name={button.name}
          onClick={event => handleClick(event, i)}
          onMouseEnter={() => {
            tempId = tempId !== -1 ? i : -1
            setFocusId(i)
          }}
          onMouseLeave={() => {
            setFocusId(tempId)
            tempId = focusId
          }}
          className={i === clickedId || i === focusId ? 'active' : ''}
          backcolor={filterChainHoverColor}
          mode={darkMode.toString()}
          borderColor={borderColorBox}
        >
          <img
            src={button.img}
            width={isMobile ? '15' : '20'}
            height={isMobile ? '15' : '20'}
            alt=""
          />
        </ButtonStyle>
      ))}
    </ButtonsGroup>
  )
}

export default ChartButtonsGroup
