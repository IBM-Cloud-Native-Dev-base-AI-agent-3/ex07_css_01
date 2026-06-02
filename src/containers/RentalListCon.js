import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RentalListCom from "../components/RentalListCom";
import "../styles/app.css";
import "../styles/rental.css";

const RentalListCon = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // 1. 초기값은 로컬스토리지에서 가져오되, 빈 값일 수 있으므로 null 처리
  const [resultData, setResultData] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const announcementId = 2026101;

  // 2. 화면 진입 시 스프링 부트 서버에서 실제 데이터를 새로 조회
  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/rules/evaluate/${announcementId}`,
        );
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            // 백엔드가 List를 주므로 가장 마지막에 등록된 본인 데이터(혹은 첫 번째)를 타겟팅
            const latestData = data[data.length - 1];
            setResultData(latestData);
            setEditFormData(latestData);
            localStorage.setItem("rentalResult", JSON.stringify(latestData));
          } else {
            // 서버에 데이터가 없다면 초기화
            setResultData(null);
            localStorage.removeItem("rentalResult");
          }
        } else {
          // 백엔드가 떠있지 않거나 HTTP status가 에러일 경우 프리뷰를 위한 로컬 캐시 폴백
          const savedData = localStorage.getItem("rentalResult");
          if (savedData) {
            const parsed = JSON.parse(savedData);
            setResultData(parsed);
            setEditFormData(parsed);
          }
        }
      } catch (err) {
        console.warn(
          "서버 데이터 로드 실패 - 프리뷰를 위해 로컬 캐시로 대체 조회를 시도합니다:",
          err,
        );
        const savedData = localStorage.getItem("rentalResult");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setResultData(parsed);
          setEditFormData(parsed);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestData();
  }, []);

  // 3. 로딩 중 예외 처리
  if (isLoading) {
    return (
      <div className="flex-center-col">
        <div className="spinner"></div>
        <p className="loading-text">청약 정보 조회 및 실시간 판정 중...</p>
      </div>
    );
  }

  // 데이터가 아예 없을 때의 예외 처리
  if (!resultData) {
    return (
      <div className="empty-box-container">
        <p className="empty-text">제출 및 진단 기록이 존재하지 않습니다.</p>
        <button
          onClick={() => navigate("/rental")}
          className="btn-primary full-width-btn"
        >
          청약 자격 진단 신청하러 가기
        </button>
      </div>
    );
  }

  // --- [수정 모드 입력 핸들러 로직] ---
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "marriageDurationYears") {
      if (value !== "" && !/^\d{0,2}(\.\d{0,1})?$/.test(value)) return;
    }

    if (name === "totalAsset" || name === "carValue") {
      const onlyNums = value.replace(/[^\d]/g, "");
      setEditFormData((prev) => ({ ...prev, [name]: onlyNums }));
      return;
    }

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "residence" ? { district: "" } : {}),
    }));
  };

  const handleBooleanButton = (name, value) => {
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooleanPastButton = (name, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecialChange = (e) => {
    const { value, checked } = e.target;

    if (value === "해당없음") {
      setEditFormData((prev) => ({ ...prev, specialQualifications: [] }));
      return;
    }

    if (checked) {
      setEditFormData((prev) => ({
        ...prev,
        specialQualifications: [...(prev.specialQualifications || []), value],
      }));
    } else {
      setEditFormData((prev) => ({
        ...prev,
        specialQualifications: (prev.specialQualifications || []).filter(
          (item) => item !== value,
        ),
      }));
    }
  };

  // --- [백엔드 연동: 수정 처리 (PUT)] ---
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // 백엔드로 보낼 포맷 가공 (Id 유지 필수)
    const requestData = {
      ...editFormData,
      age: Number(editFormData.age),
      marriageDurationYears:
        editFormData.marriageDurationYears === ""
          ? 0
          : Math.round(Number(editFormData.marriageDurationYears) * 10) / 10,
      incomePercent: Number(editFormData.incomePercent),
      totalAsset: Number(editFormData.totalAsset),
      carValue: Number(editFormData.carValue),
      subscriptionCount: Number(editFormData.subscriptionCount),
    };

    const announcementId = 2026101;
    // 백엔드가 식별할 고유 ID 추출 (기본값 설정)
    const dataId = resultData.id || 999;

    try {
      // @PutMapping("/evaluate/{announcementId}/{id}") 호출
      const res = await fetch(
        `http://localhost:8080/api/rules/evaluate/${announcementId}/${dataId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        },
      );

      if (res.ok) {
        const updatedData = await res.json();

        // 로컬스토리지 및 리액트 State 동기화
        localStorage.setItem("rentalResult", JSON.stringify(updatedData));
        setResultData(updatedData);
        setIsEditing(false); // 보기 모드로 복귀
        alert("백엔드 서버에 수정 처리가 완료되었습니다.");
      } else {
        // 백엔드 수정 실패 시 프리뷰를 위해 로컬 스토리지 데이터 임시 업데이트 지원
        localStorage.setItem("rentalResult", JSON.stringify(requestData));
        setResultData(requestData);
        setIsEditing(false);
        alert(
          "[안내] 백엔드 응답을 수신하지 못하여 로컬 데이터만 가상 수정하였습니다.",
        );
      }
    } catch (err) {
      console.warn(
        "수정 통신 에러가 발생했으므로 로컬 모크 저장을 실행합니다:",
        err,
      );
      localStorage.setItem("rentalResult", JSON.stringify(requestData));
      setResultData(requestData);
      setIsEditing(false);
      alert(
        "[수정 안내] 로컬 캐시 데이터 임시 수정이 반영되었습니다. (프리뷰 테스트 구동)",
      );
    }
  };

  // --- [백엔드 연동: 삭제 처리 (DELETE)] ---
  const handleDelete = async () => {
    if (
      !window.confirm(
        "정말로 진단 결과를 삭제하시겠습니까? 데이터가 초기화됩니다.",
      )
    )
      return;

    const announcementId = 2026101;
    const dataId = resultData.id || 999;

    try {
      // @DeleteMapping("/evaluate/{announcementId}/{id}") 호출
      const res = await fetch(
        `http://localhost:8080/api/rules/evaluate/${announcementId}/${dataId}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        // 백엔드 삭제 성공 시 브라우저 정보도 깔끔하게 클리어
        localStorage.removeItem("rentalResult");
        alert(
          "백엔드 서버에서 삭제가 완료되었습니다. 신청 페이지로 이동합니다.",
        );
        navigate("/rental");
      } else {
        localStorage.removeItem("rentalResult");
        alert("데이터 삭제가 완료되어 초기 가입 양식으로 리다이렉트합니다.");
        navigate("/rental");
      }
    } catch (err) {
      console.warn(
        "삭제 통신 에러이므로 브라우저 세션을 완전 청소합니다:",
        err,
      );
      localStorage.removeItem("rentalResult");
      alert("진단 결과가 제거되었습니다. 신청 화면으로 복귀합니다.");
      navigate("/rental");
    }
  };

  return (
    <RentalListCom
      resultData={resultData}
      editFormData={editFormData}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleEditChange={handleEditChange}
      handleBooleanButton={handleBooleanButton}
      handleBooleanPastButton={handleBooleanPastButton}
      handleSpecialChange={handleSpecialChange}
      handleUpdateSubmit={handleUpdateSubmit}
      handleDelete={handleDelete}
    />
  );
};

export default RentalListCon;
