import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { isUndefined } from 'lodash'
import { Container, LabelContainer, Label, InputContainer, CoinInfo } from './style'
import { preventNonNumericInput, preventNonNumericPaste } from '../../utilities/formats'
import Button from '../Button'
import { useThemeContext } from '../../providers/useThemeContext'

const NumberInput = ({
  label,
  secondaryLabel,
  logo,
  interactiveButton,
  buttonLabel,
  onClick,
  disabled,
  hideButton,
  invalidAmount,
  ...props
}) => {
  const { backColor, borderColor } = useThemeContext()

  return (
    <Container
      label={label}
      invalidAmount={invalidAmount}
      hasButton={!isUndefined(onClick)}
      {...props}
    >
      <InputContainer>
        <input
          type="number"
          min="0"
          onKeyDown={preventNonNumericInput}
          onPaste={preventNonNumericPaste}
          disabled={disabled || invalidAmount}
          {...props}
        />
        <CoinInfo $backcolor={backColor} $bordercolor={borderColor}>
          {/* <img src={`/icons/${label}.png`} width={20} height={20} alt={label} /> */}
          <img src={logo} height={20} alt={logo} />
          {label}
        </CoinInfo>
      </InputContainer>

      {label || secondaryLabel ? (
        <LabelContainer>
          <Label>Balance</Label>
          {secondaryLabel ? <Label>{ReactHtmlParser(secondaryLabel)}</Label> : null}
          {label ? <Label>{ReactHtmlParser(label)}</Label> : null}
          {!hideButton ? (
            <Button $fontcolor="secondary" $size="sm" onClick={onClick} disabled={disabled}>
              {buttonLabel || 'MAX'}
            </Button>
          ) : null}
        </LabelContainer>
      ) : null}
    </Container>
  )
}

export default NumberInput
