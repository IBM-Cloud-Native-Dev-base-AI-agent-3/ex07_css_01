import {StyleContentBlock, StyleContentWrap} from "./common/StyleContent"
import StyleForm from "./common/StyleForm";
import StyleInput from "./common/StyleInput";
import StyleButton from "./common/StyleButton";
import {ProductTitle} from "./common/StyleProduct"
import { OPTIONS } from "../options/options";
import { REGION } from "../options/region"
import { checkboxOptions } from "../options/checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const RentalCom = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isHomeOwner: null,
    hasPastHomeOwnership: null,
    age: "",
    residence: "",
    marriageDurationYears: "",
    incomePercent: "",
    totalAsset: "",
    carValue: "",
    subscriptionCount: "",
    specialQualifications: [],
    pastContractHistory: "",
  });

  // 제출 후 화면에 보여줄 데이터
  const [resultData, setResultData] = useState(null);

  const specialOptions = ["해당없음","주거약자", "다자녀", "신혼부부", "국가유공자"];
  // 시/도 별 구 목록
  const districtMap = {
    서울: ["강남구", "강동구", "광진구", "마포구", "송파구", "종로구"],
    경기: ["수원시", "성남시", "용인시", "고양시", "부천시"],
    인천: ["중구", "남동구", "부평구", "연수구", "서구"],
  };

  // 일반 input/select 처리
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 혼인기간: 소수점 첫째 자리까지만 허용
    if (name === "marriageDurationYears") {
      // 빈 값 OR 숫자(소수점 1자리까지)만 통과
      if (value !== "" && !/^\d{0,2}(\.\d{0,1})?$/.test(value)) {
        return; // 둘째 자리 입력 무시
      }
    }

    // 총 자산, 차량가액: 콤마 제거 후 숫자만 저장
    if (name === "totalAsset" || name === "carValue") {
      const onlyNums = value.replace(/[^\d]/g, ""); // "1,000,000" → "1000000"
      setFormData((prev) => ({ ...prev, [name]: onlyNums }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // 시/도가 바뀌면 구는 초기화 (백엔드로 빈 값 전송되도록)
      ...(name === "residence" ? { district: "" } : {}),
    }));
  };

  // boolean 버튼 처리
  const handleBooleanButton = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBooleanPastButton = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 특별 자격 체크박스 처리
  const handleSpecialChange = (e) => {
    const { value, checked } = e.target;

    // 해당없음 선택
    if (value === "해당없음") {
      setFormData((prev) => ({
        ...prev,
        specialQualifications: [],
      }));

      return;
    }

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        specialQualifications: [...prev.specialQualifications, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        specialQualifications: prev.specialQualifications.filter(
          (item) => item !== value,
        ),
      }));
    }
  };;

  // 입력 값 확인
  const validateForm = () => {
    if (formData.isHomeOwner === null) {
      alert("주택 소유 여부를 선택해주세요.");
      return false;
    }

    if (formData.hasPastHomeOwnership === null) {
      alert("주택 소유 여부를 선택해주세요.");
      return false;
    }

    if (formData.age === "") {
      alert("나이를 선택해주세요.");
      return false;
    }

    if (!formData.residence) {
      alert("거주지를 선택해주세요.");
      return false;
    }
    if (!formData.district) {
      alert("구/시를 선택해주세요.");
      return false;
    }

    if (formData.marriageDurationYears === "") {
      alert("혼인 기간을 선택해주세요.");
      return false;
    }

    if (!formData.incomePercent) {
      alert("소득 기준 비율을 선택해주세요.");
      return false;
    }

    if (formData.totalAsset <= 0) {
      alert("총자산을 입력해주세요.");
      return false;
    }

    if (formData.carValue <= 0) {
      alert("차량가액을 입력해주세요.");
      return false;
    }

    if (formData.subscriptionCount <= 0) {
      alert("청약통장 납입 횟수를 입력해주세요.");
      return false;
    }

    // if (formData.specialQualifications.length === 0) {
    //   alert("특별 자격을 하나 이상 선택해주세요.");
    //   return false;
    // }
    
    if (formData.pastContractHistory === "") {
      alert("과거 공공임대 계약 이력을 선택해주세요.");
      return false;
    }

    return true;
  };

  // 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 유효성 검사
    if (!validateForm()) {
      return;
    }
    navigate("/RentalList");

    const requestData = {
      ...formData,
      age: Number(formData.age),
      marriageDurationYears:
        formData.marriageDurationYears === ""
          ? 0
          : Math.round(Number(formData.marriageDurationYears) * 10) / 10,
      incomePercent: Number(formData.incomePercent),
      totalAsset: Number(formData.totalAsset),
      carValue: Number(formData.carValue),
      subscriptionCount: Number(formData.subscriptionCount),
    };

    // 화면 출력용
    setResultData(requestData);

    const announcementId = 2026101;

    try {
      // const res = await fetch("http://localhost:8080/rental/apply", {
      const res = await fetch(
        `http://localhost:8080/api/rules/evaluate/${announcementId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      const data = await res.text();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>신청 자격 진단 여부</h2>

        {/* 주택 소유 여부 */}
        <div>
          <p>주택 소유 여부</p>

          <button
            type="button"
            onClick={() => handleBooleanButton("isHomeOwner", true)}
          >
            예
          </button>

          <button
            type="button"
            onClick={() => handleBooleanButton("isHomeOwner", false)}
          >
            아니요
          </button>

          <p>
            선택값 :
            {formData.isHomeOwner === null
              ? "선택하세요"
              : formData.isHomeOwner
                ? " 예"
                : " 아니요"}
          </p>
        </div>

        <hr />
        {/* 과거 주택 처분 이력 여부 */}
        <div>
          <p>과거 주택 처분 이력 여부</p>

          <button
            type="button"
            onClick={() =>
              handleBooleanPastButton("hasPastHomeOwnership", true)
            }
          >
            예
          </button>

          <button
            type="button"
            onClick={() =>
              handleBooleanPastButton("hasPastHomeOwnership", false)
            }
          >
            아니요
          </button>

          <p>
            선택값 :
            {formData.hasPastHomeOwnership === null
              ? "선택하세요"
              : formData.hasPastHomeOwnership
                ? " 예"
                : " 아니요"}
          </p>
        </div>
        <hr />

        {/* 나이 */}
        <div>
          <p>나이</p>

          <select name="age" value={formData.age} onChange={handleChange}>
            <option value="">선택</option>
            {Array.from({ length: 63 }, (_, i) => i + 18).map((age) => (
              <option key={age} value={age}>
                {age}세
              </option>
            ))}
          </select>
        </div>

        <hr />

        {/* 거주지 */}
        <div>
          <p>거주지</p>

          <select
            name="residence"
            value={formData.residence}
            onChange={handleChange}
          >
            <option value="">선택</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="인천">인천</option>
          </select>

          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            disabled={!formData.residence}
          >
            <option value="">
              {formData.residence ? "구/시 선택" : "시/도를 먼저 선택"}
            </option>
            {(districtMap[formData.residence] || []).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <hr />

        {/* 혼인 기간 */}
        <div>
          <p>혼인 기간 (소수점 한자리까지 입력 가능)</p>

          {/* <select
            name="marriageDurationYears"
            value={formData.marriageDurationYears}
            onChange={handleChange}
          >
            <option value="">선택</option>
            {Array.from({ length: 11 }, (_, i) => i).map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select> */}
          <input
            type="number"
            name="marriageDurationYears"
            value={formData.marriageDurationYears}
            onChange={handleChange}
            placeholder="혼인 기간"
            max="99"
          />
        </div>

        <hr />

        {/* 소득 기준 비율 */}
        <div>
          <p>소득 기준 비율</p>

          <label>
            <input
              type="radio"
              name="incomePercent"
              value={80}
              checked={Number(formData.incomePercent) === 80}
              onChange={handleChange}
            />
            80%
          </label>

          <label>
            <input
              type="radio"
              name="incomePercent"
              value={100}
              checked={Number(formData.incomePercent) === 100}
              onChange={handleChange}
            />
            100%
          </label>

          <label>
            <input
              type="radio"
              name="incomePercent"
              value={120}
              checked={Number(formData.incomePercent) === 120}
              onChange={handleChange}
            />
            120%
          </label>
        </div>

        <hr />

        {/* 총자산 */}
        <div>
          <p>총자산 (원 단위)</p>

          <input
            type="text"
            inputMode="numeric"
            name="totalAsset"
            value={
              formData.totalAsset === ""
                ? ""
                : Number(formData.totalAsset).toLocaleString("ko-KR")
            }
            onChange={handleChange}
          />
        </div>

        <hr />

        {/* 차량가액 */}
        <div>
          <p>차량가액 (원 단위)</p>

          <input
            type="text"
            inputMode="numeric"
            name="carValue"
            value={
              formData.carValue === ""
                ? ""
                : Number(formData.carValue).toLocaleString("ko-KR")
            }
            onChange={handleChange}
          />
        </div>

        <hr />

        {/* 청약통장 납입 횟수 */}
        <div>
          <p>청약통장 납입 횟수</p>

          <input
            type="number"
            name="subscriptionCount"
            value={formData.subscriptionCount}
            onChange={handleChange}
          />
        </div>

        <hr />

        {/* 특별 자격 */}
        <div>
          <p>특별 자격</p>

          {specialOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={
                  option === "해당없음"
                    ? formData.specialQualifications.length === 0
                    : formData.specialQualifications.includes(option)
                }
                onChange={handleSpecialChange}
              />

              {option}
            </label>
          ))}
        </div>

        <hr />

        {/* 계약 이력 */}
        <div>
          <p>과거 계약 이력</p>

          <select
            name="pastContractHistory"
            value={formData.pastContractHistory}
            onChange={handleChange}
          >
            <option value="">선택</option>
            <option value="NONE">없음</option>

            <option value="CONTRACTED">계약 이력 있음</option>
          </select>
        </div>

        <hr />

        <button type="submit">제출</button>
      </form>

      {/* 제출 결과 출력 */}
      {resultData && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid black",
            padding: "20px",
          }}
        >
          <h2>제출 결과</h2>

          <p>주택 소유 여부 :{resultData.isHomeOwner ? " 예" : " 아니요"}</p>

          <p>
            과거 주택 처분 이력 여부 :
            {resultData.hasPastHomeOwnership ? " 예" : " 아니요"}
          </p>

          <p>나이 :{resultData.age}</p>

          <p>
            거주지 :{resultData.residence} {resultData.district}
          </p>

          <p>혼인 기간 :{resultData.marriageDurationYears}년</p>

          <p>소득 기준 :{resultData.incomePercent}%</p>

          <p>총자산 :{resultData.totalAsset}</p>

          <p>차량가액 :{resultData.carValue}</p>

          <p>청약통장 납입 횟수 :{resultData.subscriptionCount}</p>

          <p>
            특별 자격 :{" "}
            {resultData.specialQualifications.length === 0
              ? " 해당없음"
              : resultData.specialQualifications.join(", ")}
          </p>

          <p>계약 이력 :{resultData.pastContractHistory}</p>
        </div>
      )}
    </div>
  );
};;

export default RentalCom;