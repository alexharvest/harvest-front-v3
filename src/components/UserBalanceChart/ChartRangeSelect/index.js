import React from 'react'
import { PiQuestion } from 'react-icons/pi'
import { Tooltip } from 'react-tooltip'
import { useMediaQuery } from 'react-responsive'
import { useThemeContext } from '../../../providers/useThemeContext'
import { Container, Text, NewLabel } from './style'

const ChartRangeSelect = ({ state, type, text, onClick }) => {
  const { darkMode, switchMode, fontColor3 } = useThemeContext()
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
      <Text $activeitem={text === state}>
        {text}
        {text === 'LAST' && (
          <>
            <PiQuestion
              color={fontColor3}
              fontSize={12}
              className="info"
              data-tip
              data-for="tooltip-last-timeframe"
            />
            <Tooltip
              id="tooltip-last-timeframe"
              backgroundColor={darkMode ? 'white' : '#101828'}
              borderColor={darkMode ? 'white' : 'black'}
              textColor={darkMode ? 'black' : 'white'}
              place="right"
            >
              <NewLabel
                $size={isMobile ? '12px' : '12px'}
                $height={isMobile ? '18px' : '18px'}
                $weight="500"
              >
                When set to &apos;Last&apos;, the performance chart displays your last interaction
                (convert or revert) with this farm as the starting point.
              </NewLabel>
            </Tooltip>
          </>
        )}
      </Text>
    </Container>
  )
}

export default ChartRangeSelect
