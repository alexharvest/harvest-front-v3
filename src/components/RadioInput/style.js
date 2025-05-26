import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  grid-column: ${props => props.gridCol};
  justify-content: space-evenly;
  align-items: center;

  input {
    width: ${props => (props.$width ? props.$width : 'auto')};
    border-radius: 3px;
    border: 2px solid #f2b435;
    height: 30px;
    margin: 0;
    padding: 0px 0px 0px 10px;
    outline: 0;
    font-family: 'Inter', sans-serif;
    background-color: white;

    &:disabled {
      background-color: #fffce6;
      opacity: 0.9;
      cursor: not-allowed;
    }
  }
`

const Radio = styled.div`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.$disabled ? '0.3' : '1')};
  pointer-events: ${props => (props.$disabled ? 'none' : 'auto')};

  input {
    position: absolute;
    opacity: 0;
    cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};

    &:disabled {
      opacity: 0;
    }
  }
`

const Label = styled.div`
  display: inline-block;
  vertical-align: sub;
  font-size: 14px;
`

const Check = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #f2b435;

  &:after {
    content: ' ';
    display: ${props => (props.checked ? 'inline-block' : 'hidden')};
    vertical-align: middle;
    margin-top: 3px;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background: #4c351b;
  }
`

export { Container, Radio, Label, Check }
