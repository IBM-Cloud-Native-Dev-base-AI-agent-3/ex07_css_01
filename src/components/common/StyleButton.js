import styled, { css } from "styled-components";
const StyledButton = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  background-color: lightgray;
  ${(props) => css`
    ${props.width && `width : ${props.width};`}
    ${props.background &&
    `background-color : rgba(${props.background[0]},
                                    ${props.background[1]}); `}
  `}
  &:hover {
    background-color: gray;
    ${(props) => css`
      ${props.background &&
      `background-color : rgba(${props.background[0]},
                                        ${props.background[1] + 0.5}); `}
    `}
  }
`;
export default StyledButton;
