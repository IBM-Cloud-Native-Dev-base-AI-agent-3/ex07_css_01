import { useDispatch, useSelector } from "react-redux";
import RegCom from "../components/RegCom";
import HeaderCom from "../components/common/HeaderCom";
import {changeInput} from "../redux/inputSlice"
import { registerThunk } from "../service/authThunk";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { OPTIONS } from "../options/options";
import { REGION } from "../options/region"
import {checkboxOptions} from "../options/checkbox"

const RegCon = () => {
    const {username, password, role} = useSelector(state => state.input.register)
    const [selectedValue, setSelectedValue] = useState("");
    const [city, setCity] = useState("서울");
    const [district, setDistrict] = useState("");
    const [checkedItems, setCheckedItems] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onChange = (e) => {
        const {name, value} = e.target;
        dispatch(changeInput({name,value,form:"register"}))
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        //e.target을 이용해 key, value값을 받아올수있다
        const formData = new FormData(e.target)
        const userData ={ ...Object.fromEntries(formData.entries()), chk1: formData.getAll("chk1"), region: `${city} ${district}`}
        const selectedOption = OPTIONS.find(
          (option) => option.value == userData.role,
        );
        console.log(userData);
        console.log(selectedOption.label);
        if (!district) {
          alert("구를 선택하세요");
          return;
        }
        const {payload} = await dispatch(registerThunk(userData));
        if(payload.result === 0)
            // navigate("/login")
            navigate("/list")
    }
    const handleChange = (e) => {
      setSelectedValue(e.target.value);
    };
    const handleCityChange = (e) => {
      setCity(e.target.value);
      setDistrict("");
    };

    const handleDistrictChange = (e) => {
      setDistrict(e.target.value);
    };
    const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;

      if (checked) {
        setCheckedItems((prev) => [...prev, value]);
      } else {
        setCheckedItems((prev) =>
          prev.filter((item) => item !== value)
        );
      }
    }
    
    return (<>
        <RegCom onChange={(e) => {onChange(e);handleCheckboxChange(e);}} onSubmit={onSubmit} usernaem={username} password={password} role={role} OPTIONS={OPTIONS}
      selectedValue={selectedValue} handleChange={handleChange} handleCityChange={handleCityChange} handleDistrictChange={handleDistrictChange} city={city}
  district={district}
  setCity={setCity}
  setDistrict={setDistrict} options={checkboxOptions}
        checkedItems={checkedItems}/>
    </>)
}

export default RegCon;