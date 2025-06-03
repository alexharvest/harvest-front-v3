import React from 'react'
import Collapsible from 'react-collapsible'
import { useMediaQuery } from 'react-responsive'
import uuid from 'react-uuid'
import {
  FAQContainer,
  FAQContent,
  FAQHalfContent,
  Question,
  Answer,
  QuestionContainer,
  FarmHeader,
  Title,
  Desc,
  FAQMain,
  LeftPart,
  RightPart,
} from './style'
import { FAQ_ITEMS_FIRST, FAQ_ITEMS_SECOND, FAQ_TOTAL } from '../../constants'
import DropdownToggleImageOpen from '../../assets/images/ui/dropdown-toggle-closed-faq.svg'
import DropdownToggleImageClosed from '../../assets/images/ui/dropdown-toggle-open-faq.svg'
import { useThemeContext } from '../../providers/useThemeContext'

const FAQ = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const { pageBackColor, backColor, fontColor, borderColor, faqQueHoverColor } = useThemeContext()

  return (
    <FAQContainer $backcolor={pageBackColor} $fontcolor={fontColor}>
      <FarmHeader>
        <Title>Support</Title>
        <Desc>
          <LeftPart>Top questions about Harvest</LeftPart>
          <RightPart>
            Need something cleared up? Here are
            <br />
            our most frequently asked questions.
          </RightPart>
        </Desc>
      </FarmHeader>
      <FAQMain>
        {isMobile ? (
          <FAQContent>
            {FAQ_TOTAL.map(item => (
              <QuestionContainer key={uuid()}>
                <Collapsible
                  lazyRender={item.lazyRender ? item.lazyRender : true}
                  triggerWhenOpen={
                    <Question
                      $open='true'
                      $backcolor={backColor}
                      $bordercolor={borderColor}
                      $hovercolor={faqQueHoverColor}
                    >
                      {item.question}
                      <img open src={DropdownToggleImageOpen} alt="" />
                    </Question>
                  }
                  trigger={
                    <Question
                      $backcolor={backColor}
                      $bordercolor={borderColor}
                      $hovercolor={faqQueHoverColor}
                    >
                      {item.question}
                      <img src={DropdownToggleImageClosed} alt="" />
                    </Question>
                  }
                >
                  <Answer
                    $backcolor={backColor}
                    $bordercolor={borderColor}
                    $hovercolor={faqQueHoverColor}
                  >
                    {item.answer}
                  </Answer>
                </Collapsible>
              </QuestionContainer>
            ))}
          </FAQContent>
        ) : (
          <FAQContent>
            <FAQHalfContent>
              {FAQ_ITEMS_FIRST.map(item => (
                <QuestionContainer key={uuid()}>
                  <Collapsible
                    lazyRender={item.lazyRender ? item.lazyRender : true}
                    triggerWhenOpen={
                      <Question
                        open
                        $backcolor={backColor}
                        $bordercolor={borderColor}
                        $hovercolor={faqQueHoverColor}
                      >
                        {item.question}
                        <img open src={DropdownToggleImageOpen} alt="" />
                      </Question>
                    }
                    trigger={
                      <Question
                        $backcolor={backColor}
                        $bordercolor={borderColor}
                        $hovercolor={faqQueHoverColor}
                      >
                        {item.question}
                        <img src={DropdownToggleImageClosed} alt="" />
                      </Question>
                    }
                  >
                    <Answer
                      $backcolor={backColor}
                      $bordercolor={borderColor}
                      $hovercolor={faqQueHoverColor}
                    >
                      {item.answer}
                    </Answer>
                  </Collapsible>
                </QuestionContainer>
              ))}
            </FAQHalfContent>
            <FAQHalfContent>
              {FAQ_ITEMS_SECOND.map(item => (
                <QuestionContainer key={uuid()}>
                  <Collapsible
                    lazyRender={item.lazyRender !== undefined ? item.lazyRender : true}
                    triggerWhenOpen={
                      <Question
                        open
                        $backcolor={backColor}
                        $bordercolor={borderColor}
                        $hovercolor={faqQueHoverColor}
                      >
                        {item.question}
                        <img open src={DropdownToggleImageOpen} alt="" />
                      </Question>
                    }
                    trigger={
                      <Question
                        $backcolor={backColor}
                        $bordercolor={borderColor}
                        $hovercolor={faqQueHoverColor}
                      >
                        {item.question}
                        <img src={DropdownToggleImageClosed} alt="" />
                      </Question>
                    }
                  >
                    <Answer
                      $backcolor={backColor}
                      $bordercolor={borderColor}
                      $hovercolor={faqQueHoverColor}
                    >
                      {item.answer}
                    </Answer>
                  </Collapsible>
                </QuestionContainer>
              ))}
            </FAQHalfContent>
          </FAQContent>
        )}
      </FAQMain>
    </FAQContainer>
  )
}

export default FAQ
