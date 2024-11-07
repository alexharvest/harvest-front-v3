import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: ${props => props.justify};
  background: ${props => props.backColor};
  align-items: center;
  position: relative;
  border-radius: 10px;
  transition: 0.25s;
  border: 1px solid ${props => props.borderColor};
  margin-right: 15px;
  height: fit-content;

  input {
    width: 100%;
    border-width: 0px;
    box-sizing: border-box;
    border-radius: 10px 0 0 10px;
    color: ${props => props.fontColor};
    background: none;
    transition: 0.25s;
    margin: 0;
    padding: 9px 10px;
    outline: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    &:disabled {
      background-color: #fffce6;
      opacity: 0.9;
      cursor: not-allowed;
    }

    &::placeholder {
      color: #667085;
    }

    @media screen and (max-width: 1480px) {
      padding: 6px 10px;
      font-size: 12px;
      line-height: 16px;
    }

    @media screen and (max-width: 1280px) {
      padding: 5px 10px;
      font-size: 8px;
      line-height: 14px;
    }

    @media screen and (max-width: 992px) {
      font-weight: 300;
      font-size: 12px;
      line-height: 22px;
      color: #888e8f;
      padding: 9px 10px;
    }
  }

  @media screen and (max-width: 992px) {
    margin-right: 0;
    margin-bottom: 15px;
  }
`

const SearchBtn = styled.button`
  background: #6988ff;
  border-radius: 0px 8px 8px 0px;
  padding: 8px 18px;
  color: white;
  border: none;

  &:hover {
    background: #88a1ff;
  }

  img {
    height: 20px;
  }

  @media screen and (max-width: 1480px) {
    padding: 5px 15px;
  }

  @media screen and (max-width: 1280px) {
    padding: 0px 10px;

    img {
      height: 11px;
    }
  }

  @media screen and (max-width: 992px) {
    padding: 10px 18px;

    img {
      height: 20px;
    }
  }
`

export { Container, SearchBtn }
