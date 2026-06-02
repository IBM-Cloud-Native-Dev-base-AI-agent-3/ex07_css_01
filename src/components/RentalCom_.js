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


const RentalCom = ({
  formData,
  specialOptions,
  districtMap,
  handleChange,
  handleBooleanButton,
  handleBooleanPastButton,
  handleSpecialChange,
  handleSubmit,
  isSubmitted,
}) => {
  const navigate = useNavigate();
  if(isSubmitted){
   return (
      <div style={{ textAlign: "center", padding: "40px 20px", border: "1px solid #ddd", borderRadius: "8px", marginTop: "20px" }}>
        <h2 style={{ color: "#4CAF50" }}>✓ 진단 제출 완료</h2>
        <p style={{ fontSize: "16px", lineHeight: "1.6", margin: "20px 0" }}>
          입력 완료 상태입니다. <br />
          수정 및 삭제를 원하시면 <strong>마이페이지(신청 리스트)</strong>에서 확인해주십시오.
        </p>
        <button 
          onClick={() => navigate("/rentalList")} 
          style={{ padding: "10px 20px", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          확인하러 가기
        </button>
      </div>
    );
  }
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
    </div>
  );
};

export default RentalCom;