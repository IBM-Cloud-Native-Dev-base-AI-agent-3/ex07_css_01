import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RentalListCom from "../components/RentalListCom";

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
        }
      } catch (err) {
        console.error("서버 데이터 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestData();
  }, []);

  // 3. 로딩 중 예외 처리
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        데이터 불러오는 중...
      </div>
    );
  }
  
  // // 1. 로컬스토리지에서 초기 데이터 로드 및 State 관리
  // const [resultData, setResultData] = useState(() => {
  //   const savedData = localStorage.getItem("rentalResult");
  //   return savedData ? JSON.parse(savedData) : null;
  // });

  // // 2. 수정 모드 상태 활성화 여부
  // const [isEditing, setIsEditing] = useState(false);

  // // 3. 수정 화면 전용 임시 데이터 State
  // const [editFormData, setEditFormData] = useState(() => {
  //   const savedData = localStorage.getItem("rentalResult");
  //   return savedData ? JSON.parse(savedData) : {
  //     isHomeOwner: null,
  //     hasPastHomeOwnership: null,
  //     age: "",
  //     residence: "",
  //     district: "",
  //     marriageDurationYears: "",
  //     incomePercent: "",
  //     totalAsset: "",
  //     carValue: "",
  //     subscriptionCount: "",
  //     specialQualifications: [],
  //     pastContractHistory: "",
  //   };
  // });

  // resultData가 세팅되거나 바뀔 때 수정용 임시 데이터도 동기화
  // useEffect(() => {
  //   if (resultData) {
  //     setEditFormData({ ...resultData });
  //   }
  // }, [resultData]);

  // 데이터가 아예 없을 때의 예외 처리
  if (!resultData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>제출된 데이터가 없습니다.</p>
        <button onClick={() => navigate("/rental")}>신청 페이지로</button>
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
        specialQualifications: (prev.specialQualifications || []).filter((item) => item !== value),
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
      marriageDurationYears: editFormData.marriageDurationYears === "" ? 0 : Math.round(Number(editFormData.marriageDurationYears) * 10) / 10,
      incomePercent: Number(editFormData.incomePercent),
      totalAsset: Number(editFormData.totalAsset),
      carValue: Number(editFormData.carValue),
      subscriptionCount: Number(editFormData.subscriptionCount),
    };

    const announcementId = 2026101;
    // 백엔드가 식별할 고유 ID 추출 (@PathVariable Long id 로 들어감)
    const dataId = resultData.id; 

    try {
      // @PutMapping("/evaluate/{announcementId}/{id}") 호출
      const res = await fetch(`http://localhost:8080/api/rules/evaluate/${announcementId}/${dataId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (res.ok) {
        const updatedData = await res.json();
        
        // 로컬스토리지 및 리액트 State 동기화
        localStorage.setItem("rentalResult", JSON.stringify(updatedData));
        setResultData(updatedData);
        setIsEditing(false); // 보기 모드로 복귀
        alert("백엔드 서버에 수정 처리가 완료되었습니다.");
      } else {
        alert("수정에 실패했습니다. 서버 상태를 확인하세요.");
      }
    } catch (err) {
      console.error("수정 통신 에러:", err);
    }
  };

  // --- [백엔드 연동: 삭제 처리 (DELETE)] ---
  const handleDelete = async () => {
    if (!window.confirm("정말로 진단 결과를 삭제하시겠습니까? 데이터가 초기화됩니다.")) return;

    const announcementId = 2026101;
    const dataId = resultData.id;

    try {
      // @DeleteMapping("/evaluate/{announcementId}/{id}") 호출
      const res = await fetch(`http://localhost:8080/api/rules/evaluate/${announcementId}/${dataId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // 백엔드 삭제 성공 시 브라우저 정보도 깔끔하게 클리어
        localStorage.removeItem("rentalResult");
        alert("백엔드 서버에서 삭제가 완료되었습니다. 신청 페이지로 이동합니다.");
        navigate("/rental");
      } else {
        alert("삭제 처리에 실패했습니다.");
      }
    } catch (err) {
      console.error("삭제 통신 에러:", err);
    }
  };

  return (
    <>
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
    </>
  );
};

export default RentalListCon;