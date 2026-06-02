import { useDispatch, useSelector } from "react-redux";
import HeaderCom from "../components/common/HeaderCom";
import LoginCom from "../components/LoginCom";
import { changeInput } from "../redux/inputSlice";
import { loginThunk } from "../service/authThunk";
import { useNavigate } from "react-router-dom";
const LoginCon = () => {
 

  return (
    <>
      <LoginCom  />
    </>
  );
};
export default LoginCon;
