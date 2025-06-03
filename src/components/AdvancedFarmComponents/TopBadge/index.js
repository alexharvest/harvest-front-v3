import React, { useState } from 'react'
import { PiQuestion } from 'react-icons/pi'
import DiamondSvg from '../../../assets/images/logos/diamond.svg'
import { BadgeWrap, GuidePart, LearnLink, TooltipBox, TooltipWrapper } from './style'
import { useThemeContext } from '../../../providers/useThemeContext'

const TopBadge = () => {
  const { darkMode, fontColor8, hoverColor, activeColorModal } = useThemeContext()
  const [visible, setVisible] = useState(false)
  return (
    <BadgeWrap>
      <GuidePart $backcolor={activeColorModal} $fontcolor4="#5dcf46">
        <img src={DiamondSvg} width="14" height="14" alt="" />
        Autopilot
        <TooltipWrapper
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <PiQuestion className="question" color={fontColor8} fontSize={16} />
          {visible && (
            <TooltipBox
              darkMode={darkMode}
              onMouseEnter={() => setVisible(true)}
              onMouseLeave={() => setVisible(false)}
            >
              Automatic allocation optimization to the best performing sub-vaults.&nbsp;
              <LearnLink
                href="https://docs.harvest.finance/how-it-works/autopilots"
                target="_blank"
                rel="noopener noreferrer"
                $linkcolor={darkMode ? 'black' : 'white'}
                $hovercolor={hoverColor}
              >
                Learn more
              </LearnLink>
            </TooltipBox>
          )}
        </TooltipWrapper>
      </GuidePart>
    </BadgeWrap>
  )
}

export default TopBadge
