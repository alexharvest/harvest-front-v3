import React from 'react'
import { Tooltip } from 'react-tooltip'
import { Container, Radio, Label, Check } from './style'

const RadioInput = ({
  selectedOption,
  options,
  onChange,
  disabled: componentDisaled,
  ...props
}) => (
  <Container {...props}>
    {options.map(option => (
      <>
        <Tooltip
          id={`${option.value}-tooltip`}
          backgroundColor="white"
          borderColor="black"
          border
          textColor="black"
          getContent={() => option.tooltip}
          disable={!option.tooltip}
        />
        <Radio
          key={option.value}
          onClick={() => onChange(option.value)}
          disabled={option.disabled || componentDisaled}
          data-tip=""
          data-for={`${option.value}-tooltip`}
        >
          <Label>{option.label}</Label>
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            defaultChecked={selectedOption === option.value}
            disabled={option.disabled || componentDisaled}
          />
          <Check checked={selectedOption === option.value} />
        </Radio>
      </>
    ))}
  </Container>
)

export default RadioInput
