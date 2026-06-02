import { useLocation, useNavigate } from "react-router-dom";
import RentalCom from "./RentalCom"; // 기존에 작성하신 입력 폼 컴포넌트 임포트

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

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {!isEditing ? (
        /* ========================================================
           [모드 1] ReadOnly - 백엔드에서 받아온 최종 제출 결과 출력
           ======================================================== */
        resultData && (
          <div
            style={{
              marginTop: "30px",
              border: "1px solid black",
              padding: "20px",
            }}
          >
            <h2>제출 결과</h2>
            <hr />
            <p>주택 소유 여부 : {resultData.isHomeOwner ? " 예" : " 아니요"}</p>
            <p>
              과거 주택 처분 이력 여부 :{" "}
              {resultData.hasPastHomeOwnership ? " 예" : " 아니요"}
            </p>
            <p>나이 : {resultData.age}세</p>
            <p>
              거주지 : {resultData.residence} {resultData.district}
            </p>
            <p>혼인 기간 : {resultData.marriageDurationYears}년</p>
            <p>소득 기준 : {resultData.incomePercent}%</p>
            <p>
              총자산 : {Number(resultData.totalAsset).toLocaleString("ko-KR")}원
            </p>
            <p>
              차량가액 : {Number(resultData.carValue).toLocaleString("ko-KR")}원
            </p>
            <p>청약통장 납입 횟수 : {resultData.subscriptionCount}회</p>
            <p>
              특별 자격 :{" "}
              {resultData.specialQualifications?.length > 0
                ? resultData.specialQualifications.join(", ")
                : "해당없음"}
            </p>
            <p>
              계약 이력 :{" "}
              {resultData.pastContractHistory === "NONE"
                ? "없음"
                : "계약 이력 있음"}
            </p>
            <hr />

            {/* 하단 제어 제어 버튼 컴포넌트 */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                수정하기
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                삭제하기
              </button>
            </div>
          </div>
        )
      ) : (
        /* ========================================================
           [모드 2] 수정 모드 활성화 - 기존 입력 UI 폼 그대로 컴포넌트 재사용
           ======================================================== */
        <div style={{ marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ color: "#2196F3", margin: 0 }}>[ 정보 수정 모드 ]</h3>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#bbb",
                border: "none",
                color: "white",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              수정 취소
            </button>
          </div>
          <hr />

          {/* 원본 RentalCom 양식을 바인딩하여 기존 작성값 유지 및 동적 편집 제어 */}
          <RentalCom
            formData={editFormData}
            specialOptions={specialOptions}
            districtMap={districtMap}
            handleChange={handleEditChange}
            handleBooleanButton={handleBooleanButton}
            handleBooleanPastButton={handleBooleanPastButton} // 이 구조에서는 공유 처리 가능
            handleSpecialChange={handleSpecialChange}
            handleSubmit={handleUpdateSubmit}
            isSubmitted={false} // 완료 창이 뜨지 않고 인풋 수정 폼이 그대로 노출되도록 강제 설정
          />
        </div>
      )}
    </div>
  );
};

export default RentalListCom;
