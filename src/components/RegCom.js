import {StyleContentBlock, StyleContentWrap} from "./common/StyleContent"
import StyleForm from "./common/StyleForm";
import StyleInput from "./common/StyleInput";
import StyleButton from "./common/StyleButton";
import {ProductTitle} from "./common/StyleProduct"
import { OPTIONS } from "../options/options";
import { REGION } from "../options/region"
import { checkboxOptions } from "../options/checkbox";


const RegCom = ({onChange, onSubmit, username, password, role, OPTIONS, selectedValue, handleChange, handleCityChange, handleDistrictChange, city,
  district,
  setCity,
  setDistrict, options, checkedItems,}) => {
    return (
      <>
            <StyleForm onSubmit={onSubmit} width="30%">
              <StyleInput name="username" value={username} onChange={onChange} placeholder="input username" />
              <StyleInput name="password" value={password} onChange={onChange} placeholder="input password" />
              {/* <StyleInput name="role" value={role} onChange={onChange} placeholder="input role" /> */}
            <select onChange={handleChange} value={selectedValue} name="role">
              {OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <hr />
            <select value={city} onChange={handleCityChange} name="city">
              {Object.keys(REGION).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
             <select value={district} onChange={handleDistrictChange} name="district">
                <option value="">구 선택</option>

                {REGION[city].map((gu) => (
                  <option key={gu} value={gu}>
                    {gu}
                  </option>
                ))}
              </select>
              <div>
                선택값 : {city} {district}
              </div>
            <hr />
                 {checkboxOptions.map((option) => (
                  <label key={option.id} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={checkedItems.includes(option.value)}
                      onChange={onChange}
                      name="chk1"
                    />
                    {option.label}
                  </label>
                ))}
                <div>선택값 : {checkedItems.join(",")}</div>
            <hr />
              <StyleButton>전송</StyleButton>
            </StyleForm>
      </>
    );
    // return (
    //   <>
    //         <ProductTitle>회원가입</ProductTitle>
    //         <StyleForm onSubmit={onSubmit} width="30%">
    //           <StyleInput name="username" value={username} onChange={onChange} placeholder="input username" />
    //           <StyleInput name="password" value={password} onChange={onChange} placeholder="input password" />
    //           <StyleInput name="role" value={role} onChange={onChange} placeholder="input role" />
    //           <StyleButton>회원 가입</StyleButton>
    //         </StyleForm>
    //   </>
    // );
}

export default RegCom;