import React from 'react'
import { useThemeContext } from '../../providers/useThemeContext'
import { ButtonsGroup, ButtonStyle } from './style'

const ButtonGroup = ({
  buttons,
  doSomethingAfterClick,
  clickedId,
  setClickedId,
  fontColor,
  unsetWidth,
  prevFocusId,
  isMobile,
  oneClass,
  setSortOrder,
}) => {
  const { bgColorNew, filterChainHoverColor, borderColorBox, darkMode } = useThemeContext()

  const handleClick = (event, id) => {
    if (buttons[id].name !== 'Labs') {
      setClickedId(id)
      doSomethingAfterClick(id)
      if (setSortOrder) {
        setSortOrder('asc')
      }
    }
  }
  const [focusId, setFocusId] = React.useState(prevFocusId)
  let tempId = -1
  return (
    <ButtonsGroup backColor={bgColorNew} borderColor={borderColorBox} className={oneClass}>
      {buttons.map((button, i) => {
        const buttonLength =
          isMobile && buttons[buttons.length - 1].name === 'Inactive'
            ? buttons.length - 1
            : buttons.length
        return (
          <ButtonStyle
            key={i}
            percent={100 / buttonLength}
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
            num={i}
            className={i === clickedId || i === focusId ? 'active' : ''}
            fontColor={fontColor}
            borderColor={borderColorBox}
            hoverColor={filterChainHoverColor}
            unsetWidth={unsetWidth}
            mobileFontColor={darkMode ? '#fff' : '#000'}
            display={isMobile && button.name === 'Inactive' ? 'none' : 'flex'}
            borderDisplay={isMobile && button.border}
          >
            {/* {button.img && <img src={button.img} width="18" height="15" alt="" />} */}
            <div>{button.name}</div>
          </ButtonStyle>
        )
      })}
    </ButtonsGroup>
  )
}

export default ButtonGroup
