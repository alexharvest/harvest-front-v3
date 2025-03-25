import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { SocialsContainer, Social } from './style'
import { SOCIAL_LINKS } from '../../constants'
import { useThemeContext } from '../../providers/useThemeContext'
import discord from '../../assets/images/logos/sidebar/discord.svg'
import twitter from '../../assets/images/logos/sidebar/twitter.svg'
import medium from '../../assets/images/logos/sidebar/medium.svg'

const Socials = () => {
  const { darkMode, socialBackColor, socialIconColor } = useThemeContext()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  return (
    <SocialsContainer iconColor={socialIconColor} backColor={socialBackColor}>
      <Social darkMode={darkMode} href={SOCIAL_LINKS.MEDIUM} target="_blank">
        <img src={medium} alt="" />
      </Social>
      <Social darkMode={darkMode} href={SOCIAL_LINKS.TWITTER} target="_blank">
        <img src={twitter} alt="" />
      </Social>
      <Social
        darkMode={darkMode}
        href={SOCIAL_LINKS.DISCORD}
        target="_blank"
        marginRight={isMobile ? '0px' : '12px'}
      >
        <img src={discord} alt="" />
      </Social>
    </SocialsContainer>
  )
}

export default Socials
