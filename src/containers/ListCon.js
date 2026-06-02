import { useDispatch, useSelector } from "react-redux";
import HeaderCom from "../components/common/HeaderCom";
import ListCom from "../components/ListCom";
import { memberThunk } from "../service/authThunk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListCon = () => {

  const dispatch = useDispatch();
  const {data} = useSelector(state => {
    return state.memberData;
  })
  useEffect(() => {
    dispatch(memberThunk());
  }, [dispatch])

  const { isLoggedIn } = useSelector(state => state.auth)
  const navigate = useNavigate();
  const onInfo = (uId) => {
    console.log(uId)
    if(isLoggedIn){
      navigate("/info/"+uId)
    }else{
      navigate("/login")
    }
  }


  return (
    <>
      <ListCom data={data} onInfo={onInfo} />
    </>
  );
};
export default ListCon;
