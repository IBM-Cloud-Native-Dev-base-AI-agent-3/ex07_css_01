import styled, {css} from "styled-components";

export default styled.form`
  width: 80%;
  margin: auto;
  ${props => props.width && css`
    width : ${props.width}` }
`;
