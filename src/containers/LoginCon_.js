import { useDispatch, useSelector } from "react-redux";
import HeaderCom from "../components/common/HeaderCom";
import LoginCom from "../components/LoginCom";
import { changeInput } from "../redux/inputSlice";
import { loginThunk } from "../service/authThunk";
import { useNavigate } from "react-router-dom";
const LoginCon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, password } = useSelector((state) => {
    return state.input.login;
  });
  const { isLoggedIn, result, loading, error } = useSelector((state) => {
    return state.auth;
  });

  const onChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name,value)
    dispatch(changeInput({ name, value, form: "login" }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch( loginThunk({username, password}) )
  };
  if( isLoggedIn ){
    navigate("/")
  }

  return (
    <>
      <LoginCom loading={loading} error={error} result={result} onSubmit={onSubmit} onChange={onChange} username={username} password={password} />
    </>
  );
};
export default LoginCon;
