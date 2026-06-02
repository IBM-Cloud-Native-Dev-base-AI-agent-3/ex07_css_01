
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { OPTIONS } from "../options/options";
import { REGION } from "../options/region"
import {checkboxOptions} from "../options/checkbox"

import RentalCom from "../components/RentalCom"

const RentalCon = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const announcementId = 2026101;

  //   로컬 확인용
  //   useEffect(() => {
  //   const existingResult = localStorage.getItem("rentalResult");
  //   if (existingResult) {
  //     // 이미 제출한 이력이 있다면 바로 완료 상태로 변경
  //     setIsSubmitted(true);
  //   }
  // }, []);
  useEffect(() => {
    const checkServerData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/rules/evaluate/${announcementId}`,
        );
        if (res.ok) {
          const data = await res.json(); // List<RentalHomeRequestDto> 반환됨

          // 서버에 저장된 데이터가 하나라도 있다면 완료 상태로 전환
          if (data && data.length > 0) {
            setIsSubmitted(true);
            // 최신 데이터를 로컬스토리지에도 동기화 (선택사항)
            localStorage.setItem(
              "rentalResult",
              JSON.stringify(data[data.length - 1]),
            );
          } else {
            // 서버에 데이터가 없으면 로컬스토리지도 청소해서 싱크를 맞춤
            localStorage.removeItem("rentalResult");
            setIsSubmitted(false);
          }
        }
      } catch (err) {
        console.error("서버 데이터 조회 실패:", err);
      }
    };

    checkServerData();
  }, []);

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

  const specialOptions = [
    "해당없음",
    "주거약자",
    "다자녀",
    "신혼부부",
    "국가유공자",
  ];
  // 시/도 별 구 목록
  const districtMap = {
    서울: ["강남구", "강동구", "광진구", "마포구", "송파구", "종로구"],
    경기: ["수원시", "성남시", "용인시", "고양시", "부천시"],
    인천: ["중구", "남동구", "부평구", "연수구", "서구"],
  };

  // 일반 input/select 처리
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 혼인기간 : 소수점 첫째 자리까지만 허용
    if (name === "marriageDurationYears") {
      // 빈 값 OR 숫자(소수점 1자리까지)만 통과
      if (value !== "" && !/^\d{0,2}(\.\d{0,1})?$/.test(value)) {
        return; // 둘째 자리 입력 무시
      }
    }

    // 총 자산, 차량가액: 콤마 제거 후 숫자만 저장
    if (name === "totalAsset" || name === "carValue") {
      const onlyNums = value.replace(/[^\d]/g, ""); // ex) "1,000,000" → "1000000"
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

  // boolean 버튼 처리 - 주택 소유 여부 , 과거 주택 처분 이력 여부
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
  };

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

      const data = await res.json();

      localStorage.setItem("rentalResult", JSON.stringify(data));

      setIsSubmitted(true);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <RentalCom
        formData={formData}
        specialOptions={specialOptions}
        districtMap={districtMap}
        handleChange={handleChange}
        handleBooleanButton={handleBooleanButton}
        handleBooleanPastButton={handleBooleanPastButton}
        handleSpecialChange={handleSpecialChange}
        handleSubmit={handleSubmit}
        isSubmitted={isSubmitted}
      />
    </>
  );
}

export default RentalCon;