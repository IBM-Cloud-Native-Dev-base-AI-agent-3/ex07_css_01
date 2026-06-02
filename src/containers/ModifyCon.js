import { useDispatch, useSelector } from "react-redux";
import HeaderCom from "../components/common/HeaderCom";
import ModifyCom from "../components/ModifyCom";
import { changeInput, setModifyData } from "../redux/inputSlice";
import { useEffect } from "react";
import { memberModifyThunk, memberOneThunk } from "../service/authThunk";
import { useNavigate, useParams } from "react-router-dom";

const ModifyCon = () => {
  const params = useParams(); // username 받아오기위해 새로고침방지
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {username, password, role} = useSelector(state => state.input.modify)
  const {dataOne} = useSelector(state => state.memberData)
  useEffect(() => {
    dispatch(memberOneThunk({ username: params.username }));
  }, [dispatch, params]);
  useEffect(()=>{
    if( dataOne )
      dispatch(setModifyData(dataOne));
  },[dispatch, dataOne])
  
  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeInput({name,value,form:"modify"}))
  }
  const onSubmit =(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData)
    dispatch(memberModifyThunk(userData))
    navigate("/info/" + userData.username);
  }

  return (
    <>
      <ModifyCom username={username} password={password} role={role} onChange={onChange} onSubmit={onSubmit} />
    </>
  );
};
export default ModifyCon;
