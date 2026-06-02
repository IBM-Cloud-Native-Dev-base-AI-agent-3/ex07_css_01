import { Link } from "react-router-dom";
import styled from "styled-components";
import StyledInput from "./common/StyleInput";
import StyledForm from "./common/StyleForm";
import StyledButton from "./common/StyleButton";
const AuthBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
`;
const LoginBox = styled.div`
  position: absolute;
  width: 360px;
  min-height: 200px;
  top: 150px;
  left: calc(50% - 180px);
  background-color: white;
  padding-top: 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  .logo-area {
    text-align: center;
    font-weight: bold;
    letter-spacing: 5px;
    font-size: 20px;
    border-bottom: 1px dotted olive;
    padding-bottom: 5px;
    width: 50%;
    margin: 0 auto;
    a {
      color: darkcyan;
      &:hover {
        color: cyan;
      }
    }
  }
`;
const LoginCom = ({ loading, error, result, onSubmit, onChange, username, password }) => {
  return (
    <AuthBlock>
      <LoginBox>
        <div className="logo-area">
          <Link to="/">탱이냥 이동</Link>
        </div>
        <StyledForm onSubmit={onSubmit}>
          <StyledInput
            name="username"
            value={username}
            onChange={onChange}
            placeholder="input username"
          />
          <StyledInput
            name="password"
            value={password}
            onChange={onChange}
            placeholder="input password"
          />
          <StyledButton disabled={loading} width="100%" background={["178,235,244", 0.5]}>
            로그인
          </StyledButton>
          {loading ? <>로그인 중</> : error && <>{error}</>}
          {result === 1 && <p>아이디 또는 비번 틀림</p>}
        </StyledForm>
      </LoginBox>
    </AuthBlock>
  );
};
export default LoginCom;
