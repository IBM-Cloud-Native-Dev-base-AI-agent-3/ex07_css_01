import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Trash2,
  Edit3,
  RotateCcw,
  MapPin,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Award,
  Sliders,
  DollarSign,
  Calendar,
  ShieldAlert,
  ThumbsUp,
} from "lucide-react";
import RentalCom from "./RentalCom";
import "../styles/rental.css";
import "../styles/app.css"

const RentalListCom = ({
  resultData,
  editFormData,
  isEditing,
  setIsEditing,
  handleEditChange,
  handleBooleanButton,
  handleBooleanPastButton,
  handleSpecialChange,
  handleUpdateSubmit,
  handleDelete,
}) => {
  const navigate = useNavigate();

  // RentalCom 내부 select/checkbox 바인딩을 위한 고정 데이터 구조 정의
  const specialOptions = [
    "해당없음",
    "주거약자",
    "다자녀",
    "신혼부부",
    "국가유공자",
  ];
  const districtMap = {
    서울: ["강남구", "강동구", "광진구", "마포구", "송파구", "종로구"],
    경기: ["수원시", "성남시", "용인시", "고양시", "부천시"],
    인천: ["중구", "남동구", "부평구", "연수구", "서구"],
  };

  // 자산 및 차량가액 계산 통계 (보수적 상한 검토)
  const assetLimit = 345000000;
  const carLimit = 37080000;

  const userAsset = Number(resultData?.totalAsset || 0);
  const userCar = Number(resultData?.carValue || 0);

  const assetRatio = Math.min(100, Math.round((userAsset / assetLimit) * 100));
  const carRatio = Math.min(100, Math.round((userCar / carLimit) * 100));

  const isHomeOwner = resultData?.isHomeOwner;
  const isMarriageValid =
    Number(resultData?.marriageDurationYears) <= 7 &&
    Number(resultData?.marriageDurationYears) > 0;

  return (
    <div className="rental-theme">
      {!isEditing ? (
        /* ========================================================
           [모드 1] ReadOnly - 백엔드에서 받아온 최종 제출 결과 출력 (1400px 반응형 2단 그리드 대응)
           ======================================================== */
        resultData && (
          <div className="list-layout-grid">
            {/* 왼쪽 메인 리포트 구역 (8칸) */}
            <div className="list-main-col">
              {/* 리포트 전체 헤더 블록 */}
              <div className="report-header">
                <div className="report-header-inner">
                  <div>
                    <div className="report-title-badge">
                      <Award size={14} className="report-badge-gold-icon" />
                      <span>자격 진단 공인 리포트</span>
                    </div>
                    <h2 className="report-main-title">
                      실시간 종합 청약진단 결과
                    </h2>
                    <p className="report-sub-title">
                      제출 완료 일시 기준의 최종 연산 데이터입니다. (본 정보는
                      소득·가구 변동 시 수시 업데이트 가능합니다.)
                    </p>
                  </div>
                  <div className="report-header-badge-stat">
                    <span className="report-stat-label">판정 가입년한</span>
                    <span className="report-stat-val">
                      {resultData.subscriptionCount}회 납입
                    </span>
                  </div>
                </div>
              </div>

              {/* 청약 평가 인덱스 그리드 */}
              <div className="report-grid">
                {/* 항목 1: 무주택 요건 */}
                <div className="report-item">
                  <span className="report-item-label">
                    <Building2 size={16} className="report-item-label-icon" />
                    <span>주택 소유 상태</span>
                  </span>
                  <span className="report-item-value-row">
                    <span className="report-value-main-text">
                      {resultData.isHomeOwner
                        ? "유주택자 (자가 소유)"
                        : "무주택 세대 구성원"}
                    </span>
                    <span
                      className={`report-status-badge ${resultData.isHomeOwner ? "red" : "green"}`}
                    >
                      {resultData.isHomeOwner
                        ? "일반 순위 적용"
                        : "임대주택 최우선 대상"}
                    </span>
                  </span>
                </div>

                {/* 항목 2: 처분이력 */}
                <div className="report-item">
                  <span className="report-item-label">
                    <Sliders size={16} className="report-item-label-icon" />
                    <span>과거 주택 처분 이력 여부</span>
                  </span>
                  <span className="report-item-value-row">
                    <span className="report-value-main-text">
                      {resultData.hasPastHomeOwnership
                        ? "과거 처분 이력 있음"
                        : "경험 일절 없음"}
                    </span>
                    <span
                      className={`report-status-badge ${resultData.hasPastHomeOwnership ? "amber" : "green"}`}
                    >
                      {resultData.hasPastHomeOwnership
                        ? "생초 완화 조건"
                        : "생세최초 완벽 부합"}
                    </span>
                  </span>
                </div>

                {/* 항목 3: 나이 및 거주지 */}
                <div className="report-item">
                  <span className="report-item-label">
                    <MapPin size={16} className="report-item-label-icon" />
                    <span>나이 및 거주 등재지</span>
                  </span>
                  <span className="report-item-value-row mt-1">
                    <span className="report-value-main-text">
                      만 {resultData.age}세 • {resultData.residence}{" "}
                      {resultData.district}
                    </span>
                  </span>
                </div>

                {/* 항목 4: 혼인 관계 기간 */}
                <div className="report-item">
                  <span className="report-item-label">
                    <Calendar size={16} className="report-item-label-icon" />
                    <span>혼인 신고 기한</span>
                  </span>
                  <span className="report-item-value-row">
                    <span className="report-value-main-text">
                      {resultData.marriageDurationYears}년차 가구
                    </span>
                    <span
                      className={`report-status-badge ${isMarriageValid ? "green" : "gray"}`}
                    >
                      {isMarriageValid
                        ? "신혼 특별 공급 대상"
                        : "일반 배점 공급"}
                    </span>
                  </span>
                </div>

                {/* 항목 5: 소득 평가 선 */}
                <div className="report-item">
                  <span className="report-item-label">
                    <DollarSign size={16} className="report-item-label-icon" />
                    <span>기준 연도 소득 한계선</span>
                  </span>
                  <span className="report-item-value-row mt-1">
                    <span className="report-value-main-text">
                      도시근로자 기준 월 소득 {resultData.incomePercent}% 수준
                    </span>
                  </span>
                </div>

                {/* 항목 6: 특별자격 요건 */}
                <div className="report-item">
                  <span className="report-item-label">
                    <CheckCircle2
                      size={16}
                      className="report-item-label-icon"
                    />
                    <span>가점용 특별자격 명부</span>
                  </span>
                  <span className="report-item-value-row mt-1">
                    <span
                      className="report-value-main-text"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      {resultData.specialQualifications?.length > 0
                        ? resultData.specialQualifications.join(", ")
                        : "해당없음 (일반공급 전형 위격)"}
                    </span>
                  </span>
                </div>

                {/* 항목 7: 가용 자산 가치 상시 모니터 */}
                <div className="report-item report-span-2col">
                  <span className="report-item-label">
                    <TrendingUp size={16} className="report-item-label-icon" />
                    <span>현 신고 총자산 및 차량가액 세무 가액</span>
                  </span>
                  <div className="asset-report-inner">
                    <div className="asset-col asset-border-right">
                      <span className="asset-tiny-label">
                        신고 총 자산 규모
                      </span>
                      <span className="asset-val">
                        {Number(resultData.totalAsset).toLocaleString("ko-KR")}{" "}
                        원
                      </span>
                    </div>
                    <div className="asset-col">
                      <span className="asset-tiny-label">
                        평가 차량가치 규모
                      </span>
                      <span className="asset-val highlight-blue">
                        {Number(resultData.carValue).toLocaleString("ko-KR")} 원
                      </span>
                    </div>
                  </div>
                </div>

                {/* 항목 8: 계약 체결 이력 사항 */}
                <div className="report-item report-span-2col">
                  <span className="report-item-label">
                    <ShieldAlert
                      size={16}
                      style={{ color: "var(--danger-red)" }}
                    />
                    <span>과거 다년 임대주택 해약 및 계약 사실 이력</span>
                  </span>
                  <div className="history-status-container">
                    <span
                      className={`history-status-dot ${resultData.pastContractHistory === "NONE" ? "green" : "red"}`}
                    />
                    <span className="history-text">
                      {resultData.pastContractHistory === "NONE"
                        ? "패널티 사항 없음 (재당첨 저촉 무관하며 즉시 청약 지원 최선!)"
                        : "과거 공공계약 체결 이력 보유에 따른 재당첨 위배 여부 필히 소명요망"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 제어 패널 버튼 단 */}
              <div className="report-actions-container">
                <button
                  type="button"
                  id="rental-edit-trigger"
                  onClick={() => setIsEditing(true)}
                  className="btn-primary"
                >
                  <Edit3 size={16} />
                  <span>제출 정보 수정하기</span>
                </button>

                <button
                  type="button"
                  id="rental-delete-trigger"
                  onClick={handleDelete}
                  className="btn-secondary btn-danger-bg"
                >
                  <Trash2 size={16} />
                  <span>진단 결과 완전 삭제</span>
                </button>
              </div>
            </div>

            {/* 오른쪽 사이드바: 1400px 이상 공간을 활용하여 합격 안전진단 및 지표 시각화 (4칸) */}
            {/* <div className="list-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-card-header">
                  <Sliders size={18} className="sidebar-card-icon" />
                  <h3 className="sidebar-card-title">
                    자산 및 평가액 한도 실시간 진입율
                  </h3>
                </div>

                <div className="progress-list-group">
                  <div className="progress-item-block">
                    <div className="progress-header-row">
                      <span className="progress-item-title">
                        총자산 한도 기준율 (3.45억 한도)
                      </span>
                      <span
                        className={`progress-item-val ${assetRatio > 100 ? "danger" : "safe"}`}
                      >
                        {assetRatio}%
                        {assetRatio > 100 ? " (초과 우려)" : " (안정)"}
                      </span>
                    </div>
                    <div className="progress-bg-track">
                      <div
                        className={`progress-bar-fill ${assetRatio > 100 ? "red" : "blue"}`}
                        style={{ width: `${Math.min(100, assetRatio)}%` }}
                      />
                    </div>
                  </div>

                  <div className="progress-item-block">
                    <div className="progress-header-row">
                      <span className="progress-item-title">
                        차량가액 한도 기준율 (3,708만 한도)
                      </span>
                      <span
                        className={`progress-item-val ${carRatio > 100 ? "danger" : "safe"}`}
                      >
                        {carRatio}%{carRatio > 100 ? " (초과 우려)" : " (안정)"}
                      </span>
                    </div>
                    <div className="progress-bg-track">
                      <div
                        className={`progress-bar-fill ${carRatio > 100 ? "red" : "blue"}`}
                        style={{ width: `${Math.min(100, carRatio)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {assetRatio > 100 || carRatio > 100 ? (
                  <div className="panel-guide-box danger">
                    <ShieldAlert size={16} style={{ flexShrink: 0 }} />
                    <span>
                      신고된 가액이 국가 공공임대 한도선을 초과했습니다.
                      공시지가 조정 내역이 있거나 무자산 부양권자인 경우
                      소명서류 작성 가이드를 확인하세요.
                    </span>
                  </div>
                ) : (
                  <div className="panel-guide-box safe">
                    <ThumbsUp size={16} style={{ flexShrink: 0 }} />
                    <span>
                      축하합니다! 총자산 및 차량가액 규제 조건이 공급 규제 범위
                      내에 아주 안정적으로 충족되었습니다!
                    </span>
                  </div>
                )}
              </div>

              <div className="sidebar-card-dark">
                <div className="sidebar-card-dark-header">
                  <Sparkles size={16} className="sidebar-card-dark-icon" />
                  <h4 className="sidebar-card-dark-title">
                    {resultData.residence} {resultData.district} 맞춤 공급 정보
                  </h4>
                </div>

                <div className="dark-card-inner-list">
                  <div className="dark-card-panel">
                    <span className="dark-p-badge blue">
                      당해지역 우대 혜택
                    </span>
                    <p className="dark-p-text">
                      {resultData.residence} {resultData.district} 거주자로 당해
                      지자체 우선 분양 배점 항목에서 3점(만점) 수혜 대상으로
                      분류되었습니다.
                    </p>
                  </div>

                  <div className="dark-card-panel">
                    <span className="dark-p-badge amber">POINT CHECK</span>
                    <p className="dark-p-body-desc">
                      다음 분기 {resultData.district} 인근에 행복주택 및
                      국민임대 통합모집공고가 예정되어 있습니다. 알림톡 등록을
                      통해 일정을 차질없이 준비하십시오.
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        )
      ) : (
        /* ========================================================
           [모드 2] 수정 모드 활성화 - 기존 입력 UI 폼 그대로 컴포넌트 재사용
           ======================================================== */
        <div className="list-main-col">
          <div className="edit-mode-alert-bar">
            <div className="edit-mode-left">
              <div className="edit-mode-icon-box">
                <Sliders size={20} />
              </div>
              <div>
                <h3 className="edit-mode-title">
                  [ 실시간 정보 수정 모드 활성 ]
                </h3>
                <p className="edit-mode-desc">
                  수정 중 취소하시려면 우측의 '수정 취소' 버튼을 누르시면 원래의
                  판정값으로 복구됩니다.
                </p>
              </div>
            </div>

            <button
              type="button"
              id="rental-cancel-trigger"
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
            >
              <RotateCcw size={16} />
              <span>수정 취소</span>
            </button>
          </div>

          {/* 원본 RentalCom 양식을 바인딩하여 기존 작성값 유지 및 동적 편집 제어 */}
          <RentalCom
            formData={editFormData}
            specialOptions={specialOptions}
            districtMap={districtMap}
            handleChange={handleEditChange}
            handleBooleanButton={handleBooleanButton}
            handleBooleanPastButton={handleBooleanPastButton}
            handleSpecialChange={handleSpecialChange}
            handleSubmit={handleUpdateSubmit}
            isSubmitted={false} // 수정 모드 내에서는 언제나 양식이 지속되게 고정
          />
        </div>
      )}
    </div>
  );
};

export default RentalListCom;
