import { useNavigate, useParams } from "react-router-dom";
import HeaderCom from "../components/common/HeaderCom";
import InfoCom from "../components/InfoCom";
import { useDispatch, useSelector } from "react-redux";
import { memberDeleteThunk, memberOneThunk } from "../service/authThunk";
import { useEffect } from "react";

const InfoCon = () => {
    const dispatch = useDispatch();
    
    const {username} = useParams();
    const navigate = useNavigate();
    const {dataOne} = useSelector(state => {
        return state.memberData;
    });
    useEffect(()=>{
        dispatch(memberOneThunk({username}))
    },[dispatch, username])

    const onDelete = () => {
        dispatch(memberDeleteThunk({username}));
        navigate("/list")
    }

    const onModifyForm = () => {
      navigate("/modify/"+username);
    }

  return (
    <>
      <InfoCom data={dataOne} onDelete={onDelete} onModifyForm ={onModifyForm} />
    </>
  );
};
export default InfoCon;
