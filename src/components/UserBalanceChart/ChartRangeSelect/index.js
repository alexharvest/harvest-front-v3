import React from 'react'
import { GoQuestion } from 'react-icons/go'
import ReactTooltip from 'react-tooltip'
import { useMediaQuery } from 'react-responsive'
import { useThemeContext } from '../../../providers/useThemeContext'
import { Container, Text, NewLabel } from './style'

const ChartRangeSelect = ({ state, type, text, onClick }) => {
  const { switchMode } = useThemeContext()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  return (
    <Container
      state={state}
      type={type}
      text={text}
      mode={switchMode}
      activeItem={text === state}
      onClick={() => {
        onClick()
      }}
    >
      <Text activeItem={text === state}>
        {text}
        {text === 'LAST' && (
          <>
            <GoQuestion
              color="#6F78AA"
              fontSize={12}
              className="info"
              data-tip
              data-for="tooltip-last-timeframe"
            />
            <ReactTooltip
              id="tooltip-last-timeframe"
              backgroundColor="#101828"
              borderColor="black"
              textColor="white"
              place="right"
            >
              <NewLabel
                size={isMobile ? '12px' : '12px'}
                height={isMobile ? '18px' : '18px'}
                weight="500"
                color="white"
              >
                When set to ‘Last’, the performance chart displays your last interaction (convert or
                revert) with this farm as the starting point.
              </NewLabel>
            </ReactTooltip>
          </>
        )}
      </Text>
    </Container>
  )
}

export default ChartRangeSelect
