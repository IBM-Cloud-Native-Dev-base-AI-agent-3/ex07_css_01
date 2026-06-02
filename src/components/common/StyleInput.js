import styled from "styled-components";
const StyledInput = styled.input`
  color: gray;
  font-size: 20px;
  margin-top: 10px;
  border: none;
  outline: none;
  border-bottom: 1px solid lightgray;
  letter-spacing: 3px;
  width: 100%;
  &:focus {
    border-bottom: 1px solid gray;
  }
`;
export default StyledInput;
