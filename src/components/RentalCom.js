import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertCircle,
  FileCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import "../styles/rental.css";
import "../styles/app.css";

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

  if (isSubmitted) {
    return (
      <div className="success-screen-container">
        <div className="success-card">
          <div className="success-icon-wrapper">
            <CheckCircle size={32} />
          </div>
          <h2 className="success-title">✓ 진단 제출 완료</h2>
          <p className="success-description">
            성공적으로 청약 자격 진단 정보가 제출되었습니다.
            <br />
            실시간 진단 결과 확인 및 수정·삭제 처리는 아래의 버튼 또는{" "}
            <strong className="success-strong-text">신청 리스트</strong> 버튼을
            통해 접속하십시오.
          </p>
          <button
            type="button"
            onClick={() => navigate("/rentalList")}
            className="btn-primary full-width-btn"
          >
            <span>진단 결과 확인하러 가기</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rental-theme">
      {/* 타이틀 헤더 */}
      <div className="rental-title-header">
        <div className="sparkle-badge">
          <Sparkles size={14} />
          <span>국가 공공임대 & 청약 실시간 자격 대조 시스템</span>
        </div>
        <h1 className="rental-main-heading">신청 자격 진단 입력</h1>
        <p className="rental-sub-heading">
          국공유 공공분양 및 임대주택 청약을 위한 기초적인 자격 증명을 가구단위
          정보로 실시간 판정합니다.
        </p>
      </div>

      {/* 중앙 단일 정렬 레이아웃 */}
      <div className="rental-form-layout">
        <form
          id="rental-sub-form"
          onSubmit={handleSubmit}
          className="rental-card"
        >
          {/* A. 주택 소유 여부 */}
          <div className="form-group-spaced">
            <label className="group-label-decor">
              <span className="alpha-tag">A</span>
              <span>주택 소유 여부</span>
            </label>
            <p className="group-desc-text">
              무주택 인정 여부를 결정짓는 우선 배점의 기본 조건입니다.
            </p>
            <div className="rental-toggle-grid">
              <button
                type="button"
                id="btn-isHomeOwner-true"
                onClick={() => handleBooleanButton("isHomeOwner", true)}
                className={`rental-toggle-card ${formData.isHomeOwner === true ? "active" : ""}`}
              >
                <span>예 (유주택)</span>
              </button>
              <button
                type="button"
                id="btn-isHomeOwner-false"
                onClick={() => handleBooleanButton("isHomeOwner", false)}
                className={`rental-toggle-card ${formData.isHomeOwner === false ? "active" : ""}`}
              >
                <span>아니요 (무주택)</span>
              </button>
            </div>
            <div className="current-selection-alert">
              <AlertCircle size={14} />
              <span>
                현재 선택값:{" "}
                {formData.isHomeOwner === null
                  ? "선택하지 않음"
                  : formData.isHomeOwner
                    ? "예 (소유 중 - 일반 분약 타겟)"
                    : "아니요 (무주택 유지 - 특별 우선자격 부여)"}
              </span>
            </div>
          </div>

          <hr className="divider" />

          {/* B. 과거 주택 처분 이력 여부 */}
          <div className="form-group-spaced">
            <label className="group-label-decor">
              <span className="alpha-tag">B</span>
              <span>과거 주택 처분 이력 여부</span>
            </label>
            <p className="group-desc-text">
              과거 부동산 소유 이력을 일체 처분했는지 체크하여 생초 청약 자격을
              규명합니다.
            </p>
            <div className="rental-toggle-grid">
              <button
                type="button"
                id="btn-hasPastHome-true"
                onClick={() =>
                  handleBooleanPastButton("hasPastHomeOwnership", true)
                }
                className={`rental-toggle-card ${formData.hasPastHomeOwnership === true ? "active" : ""}`}
              >
                <span>예 (매각/상속 처분 경험 있음)</span>
              </button>
              <button
                type="button"
                id="btn-hasPastHome-false"
                onClick={() =>
                  handleBooleanPastButton("hasPastHomeOwnership", false)
                }
                className={`rental-toggle-card ${formData.hasPastHomeOwnership === false ? "active" : ""}`}
              >
                <span>아니요 (일절 없음)</span>
              </button>
            </div>
            <div className="current-selection-alert">
              <AlertCircle size={14} />
              <span>
                현재 선택값:{" "}
                {formData.hasPastHomeOwnership === null
                  ? "선택하지 않음"
                  : formData.hasPastHomeOwnership
                    ? "예 (이력 보유)"
                    : "아니요 (해당 이력 없음)"}
              </span>
            </div>
          </div>

          <hr className="divider" />

          {/* C. 나이 선택 */}
          <div className="form-group-spaced">
            <label htmlFor="age_select" className="group-label-decor">
              <span className="alpha-tag">C</span>
              <span>나이 선택</span>
            </label>
            <p className="group-desc-text">
              청년 우대 한도(만 19세~39세) 등의 가산 배율을 자동 검정합니다.
            </p>
            <div className="input-decoration-wrapper">
              <select
                id="age_select"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="rental-input rental-select"
              >
                <option value="">나이를 선택해 주세요</option>
                {Array.from({ length: 63 }, (_, i) => i + 18).map((age) => (
                  <option key={age} value={age}>
                    {age}세
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="divider" />

          {/* D. 거주지역 */}
          <div className="form-group-spaced">
            <label className="group-label-decor">
              <span className="alpha-tag">D</span>
              <span>거주지역</span>
            </label>
            <p className="group-desc-text">
              거주 의무 기간 및 당해지역 우선 특별 가점을 정합 판단합니다.
            </p>
            <div className="form-input-grid-2col">
              <select
                id="residence_prov"
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                className="rental-input rental-select"
                aria-label="시/도 선택"
              >
                <option value="">시/도 선택</option>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="인천">인천</option>
              </select>

              <select
                id="residence_dist"
                name="district"
                value={formData.district}
                onChange={handleChange}
                disabled={!formData.residence}
                className="rental-input rental-select"
                aria-label="구/시 선택"
              >
                <option value="">
                  {formData.residence
                    ? "구/시 선택"
                    : "시/도를 먼저 선택하세요"}
                </option>
                {(districtMap[formData.residence] || []).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="divider" />

          {/* E. 혼인 기간 */}
          <div className="form-group-spaced">
            <label
              htmlFor="marriageDurationInput"
              className="group-label-decor"
            >
              <span className="alpha-tag">E</span>
              <span>혼인 기간</span>
            </label>
            <p className="group-desc-text">
              신혼부부 특별공급 규정(혼인 7년 이내 및 자녀 요건 연계)에 맞춰
              소수점 한자리까지 숫자 기재 가능합니다. 미혼일 경우 0을
              입력하세요.
            </p>
            <div className="input-decoration-wrapper">
              <input
                id="marriageDurationInput"
                type="number"
                name="marriageDurationYears"
                value={formData.marriageDurationYears}
                onChange={handleChange}
                placeholder="예) 3.5 (단위: 년)"
                max="99"
                step="0.1"
                className="rental-input"
              />
              <span className="input-suffix">년</span>
            </div>
          </div>

          <hr className="divider" />

          {/* F. 소득 기준 비율 */}
          <div className="form-group-spaced">
            <label className="group-label-decor">
              <span className="alpha-tag">F</span>
              <span>소득 기준 비율</span>
            </label>
            <p className="group-desc-text">
              전년도 도시근로자 평균 가구당 월평균소득액 범위 한계선 비율입니다.
            </p>

            <div className="rental-three-column-grid">
              {[80, 100, 120].map((percent) => {
                const active = Number(formData.incomePercent) === percent;
                return (
                  <button
                    key={percent}
                    type="button"
                    id={`income-btn-${percent}`}
                    onClick={() =>
                      handleChange({
                        target: {
                          name: "incomePercent",
                          value: String(percent),
                        },
                      })
                    }
                    className={`rental-toggle-card income-toggle-col ${active ? "active" : ""}`}
                  >
                    <span className="report-value-main-text">{percent}%</span>
                    <span className="income-toggle-subtext">
                      {percent === 80
                        ? "우선 공급"
                        : percent === 100
                          ? "일반 공급"
                          : "추첨 보완"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="divider" />

          {/* G. 총자산 */}
          <div className="form-group-spaced">
            <label htmlFor="totalAssetInput" className="group-label-decor">
              <span className="alpha-tag">G</span>
              <span>총자산 (원 단위)</span>
            </label>
            <p className="group-desc-text">
              토지, 건물, 전세보증금 및 금융자산을 합산한 순자산 기준액입니다
              (공공임대 기준한도: 345,000,000원).
            </p>
            <div className="input-decoration-wrapper">
              <div className="input-prefix">₩</div>
              <input
                id="totalAssetInput"
                type="text"
                inputMode="numeric"
                name="totalAsset"
                value={
                  formData.totalAsset === ""
                    ? ""
                    : Number(formData.totalAsset).toLocaleString("ko-KR")
                }
                onChange={handleChange}
                placeholder="예) 345,000,000"
                className="rental-input rental-input-padded-prefix"
              />
            </div>
          </div>

          <hr className="divider" />

          {/* H. 차량가액 */}
          <div className="form-group-spaced">
            <label htmlFor="carValueInput" className="group-label-decor">
              <span className="alpha-tag">H</span>
              <span>차량가액 (원 단위)</span>
            </label>
            <p className="group-desc-text">
              보유 차량이 있을 경우 비영업용 승용차 기준 가치를 명기하십시오
              (공공임대 기준한도: 37,080,000원). 없으면 0을 입력하세요.
            </p>
            <div className="input-decoration-wrapper">
              <div className="input-prefix">₩</div>
              <input
                id="carValueInput"
                type="text"
                inputMode="numeric"
                name="carValue"
                value={
                  formData.carValue === ""
                    ? ""
                    : Number(formData.carValue).toLocaleString("ko-KR")
                }
                onChange={handleChange}
                placeholder="예) 35,000,000"
                className="rental-input rental-input-padded-prefix"
              />
            </div>
          </div>

          <hr className="divider" />

          {/* I. 청약통장 납입 횟수 */}
          <div className="form-group-spaced">
            <label
              htmlFor="subscriptionCountInput"
              className="group-label-decor"
            >
              <span className="alpha-tag">I</span>
              <span>청약통장 납입 횟수</span>
            </label>
            <p className="group-desc-text">
              공인 금융기관 주택청약종합저축 납부 회차를 기록해 가산 배점을
              검증합니다 (만점이 되는 24회 통과 여부 산출).
            </p>
            <div className="input-decoration-wrapper">
              <input
                id="subscriptionCountInput"
                type="number"
                name="subscriptionCount"
                value={formData.subscriptionCount}
                onChange={handleChange}
                placeholder="예) 24"
                className="rental-input"
              />
              <span className="input-suffix">회</span>
            </div>
          </div>

          <hr className="divider" />

          {/* J. 특별 자격 */}
          <div className="form-group-spaced">
            <label className="group-label-decor">
              <span className="alpha-tag">J</span>
              <span>특별 자격 대상 (중복 가능)</span>
            </label>
            <p className="group-desc-text">
              다자녀, 주거약자 등 특수 인정 우대 배점용 사실여부에 한하여 체크해
              주십시오. "해당없음" 클릭 시 타 조항들은 소거 처리됩니다.
            </p>

            <div className="rental-checkbox-grid">
              {specialOptions.map((option) => {
                const active =
                  option === "해당없음"
                    ? formData.specialQualifications.length === 0
                    : formData.specialQualifications.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    id={`special-qual-${option}`}
                    onClick={() =>
                      handleSpecialChange({
                        target: { value: option, checked: !active },
                      })
                    }
                    className={`rental-checkbox-chip ${active ? "active" : ""}`}
                  >
                    <div
                      className={`checkbox-dot-outer ${active ? "active" : ""}`}
                    >
                      {active && <div className="checkbox-dot-inner" />}
                    </div>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="divider" />

          {/* K. 과거 계약 이력 */}
          <div className="form-group-spaced">
            <label
              htmlFor="pastContractHistorySelect"
              className="group-label-decor"
            >
              <span className="alpha-tag">K</span>
              <span>과거 임대주택 계약 및 유의 이력 건수</span>
            </label>
            <p className="group-desc-text">
              과거 공공임대 공급계약 체결 경험으로 인한 재당첨 기한 규범 저촉
              관계 체크 요소입니다.
            </p>
            <div className="input-decoration-wrapper">
              <select
                id="pastContractHistorySelect"
                name="pastContractHistory"
                value={formData.pastContractHistory}
                onChange={handleChange}
                className="rental-input rental-select"
              >
                <option value="">과거 계약 여부 선택</option>
                <option value="NONE">없음</option>
                <option value="CONTRACTED">계약 이력 있음</option>
              </select>
            </div>
          </div>

          <hr className="divider" />

          {/* 제출 버튼 */}
          <div className="submit-wrapper">
            <button
              type="submit"
              id="rental-submit-btn"
              className="btn-primary btn-large-flat"
            >
              <FileCheck size={20} />
              <span>기재 자격 정보 최종 검토 및 진단 제출</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalCom;
