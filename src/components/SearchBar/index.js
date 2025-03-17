import React from 'react'
import { Container, SearchBtn } from './style'
import { useThemeContext } from '../../providers/useThemeContext'
import SearchIcon from '../../assets/images/logos/filter/search.svg'

const VaultSearchBar = ({
  placeholder,
  onKeyDown = () => {},
  onSearch = () => {},
  inputText,
  setInputText,
}) => {
  const { btnHoverColor, fontColor, bgColorNew, borderColorBox } = useThemeContext()

  const onChange = e => {
    setInputText(e.target.value)
  }
  return (
    <Container fontColor={fontColor} borderColor={borderColorBox} backColor={bgColorNew}>
      <input
        id="search-input"
        value={inputText}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <SearchBtn hoverColor={btnHoverColor} type="button" onClick={() => onSearch(inputText)}>
        <img src={SearchIcon} height={20} alt="" />
      </SearchBtn>
    </Container>
  )
}

export default VaultSearchBar
