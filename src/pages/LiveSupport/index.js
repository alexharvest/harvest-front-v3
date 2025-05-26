import React, { useState, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import Avatars from '../../assets/images/logos/LiveSupport/Avatars.png'
import AlertIcon from '../../assets/images/logos/beginners/alert-triangle.svg'
import DiscordChat from '../../assets/images/logos/LiveSupport/Discord-icon.png'
import { useThemeContext } from '../../providers/useThemeContext'
import {
  Container,
  TopSection,
  TopContainer,
  DiscordBox,
  Inner,
  HeaderTitle,
  HeaderDesc,
  CoinSection,
  FTokenWrong,
  NewLabel,
  LinkButton,
  LiveChat,
  ContactWrap,
} from './style'
import { SOCIAL_LINKS } from '../../constants'

const LiveSupport = () => {
  const { bgColor, bgColorSup, fontColor } = useThemeContext()
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const firstViewScamMessage = localStorage.getItem('firstViewScamMessage')
    if (firstViewScamMessage === null || firstViewScamMessage === 'true') {
      setShowMessage(true)
    }
  }, [])

  const closeScamMessage = () => {
    setShowMessage(false)
    localStorage.setItem('firstViewScamMessage', 'false')
  }

  return (
    <Container $bgcolor={bgColor} $fontcolor={fontColor}>
      <TopSection $bgcolor={bgColorSup}>
        <TopContainer>
          <HeaderTitle>
            Need help?{' '}
            <span role="img" aria-label="hand" aria-labelledby="hand">
              👋
            </span>
          </HeaderTitle>
          <HeaderDesc>Our AI bot knows Harvest inside out and will help you out!</HeaderDesc>
        </TopContainer>
      </TopSection>
      <Inner>
        <CoinSection>
          <LiveChat>
            <iframe
              src="https://app.wonderchat.io/chatbot/clul8p1za010fazo0y74bt8dy"
              title="live-chat"
              width="100%"
              height="100%"
            />
          </LiveChat>
          <ContactWrap>
            <DiscordBox>
              <NewLabel $textalign="center">
                <img src={Avatars} alt="avatar" />
              </NewLabel>
              <NewLabel $fontcolor="#fff" $textalign="center">
                <NewLabel $size="20px" $weight="600" $height="30px" $marginbottom="8px">
                  Still have questions?
                </NewLabel>
                <NewLabel $size="16px">
                  Reach out to Harvest via our Discord channel and open a ticket. Our mods will be
                  there to assist you!
                </NewLabel>
              </NewLabel>
              <NewLabel>
                <LinkButton href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer">
                  <img src={DiscordChat} alt="Discord" />
                  <div className="discord">Get in touch</div>
                </LinkButton>
              </NewLabel>
            </DiscordBox>
            {showMessage && (
              <FTokenWrong>
                <NewLabel $marginright="12px" $display="flex">
                  <NewLabel>
                    <img src={AlertIcon} alt="" />
                  </NewLabel>
                  <NewLabel $marginleft="12px">
                    <NewLabel
                      $fontcolor="#B54708"
                      $size="14px"
                      $height="20px"
                      $weight="600"
                      $marginbottom="4px"
                    >
                      Beware of Scams
                    </NewLabel>
                    <NewLabel
                      $fontcolor="#B54708"
                      $size="14px"
                      $height="20px"
                      $weight="400"
                      $marginbottom="5px"
                    >
                      Harvest moderators will never request your seed phrase or private wallet
                      details. Always be vigilant of direct messages from scammers. For genuine
                      support, please open a ticket in our Discord&apos;s #support channel only.
                    </NewLabel>
                    <NewLabel
                      $fontcolor="#B54708"
                      $size="14px"
                      $height="20px"
                      $weight="600"
                      $marginbottom="4px"
                      onClick={closeScamMessage}
                      $cursortype="pointer"
                    >
                      Got it
                    </NewLabel>
                  </NewLabel>
                </NewLabel>
                <NewLabel $fontcolor="#F79009">
                  <RxCross2 className="scam-message" onClick={closeScamMessage} />
                </NewLabel>
              </FTokenWrong>
            )}
          </ContactWrap>
        </CoinSection>
      </Inner>
    </Container>
  )
}

export default LiveSupport
