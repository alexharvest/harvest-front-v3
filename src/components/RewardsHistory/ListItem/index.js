import React from 'react'
import { useThemeContext } from '../../../providers/useThemeContext'
import { Container, Content, Label } from './style'

const ListItem = ({
  weight,
  size,
  height,
  color,
  label,
  icon,
  value,
  marginBottom,
  marginTop,
  justifyContent,
}) => {
  const { fontColor } = useThemeContext()
  return (
    <Container
      fontColor={fontColor}
      marginBottom={marginBottom}
      marginTop={marginTop}
      justifyContent={justifyContent}
    >
      {label ? (
        <Label>
          {icon && icon !== '' ? (
            <img src={`${icon.toLowerCase()}.svg`} width="16px" height="16px" alt="" />
          ) : (
            <></>
          )}
          <Content weight={weight} size={size} height={height} color={color}>
            {label}
          </Content>
        </Label>
      ) : (
        ''
      )}
      {value ? (
        <Content weight={weight} size={size} height={height} color={color}>
          {value}
        </Content>
      ) : (
        ''
      )}
    </Container>
  )
}
export default ListItem
