// src/OAuth2RedirectHandler.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authSlice from "./redux/authSlice";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("=== [디버깅 1단계] OAuth2RedirectHandler 마운트 완료! ===");
    console.log("현재 주소창 URL:", window.location.href);
    console.log("현재 쿼리 스트링:", window.location.search);

    // 1. URL 쿼리 파라미터에서 token 추출
    const getUrlParameter = (name) => {
      const replacedName = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      const regex = new RegExp("[\\?&]" + replacedName + "=([^&#]*)");
      const results = regex.exec(window.location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    const token = getUrlParameter("token") || getUrlParameter("accessToken");
    console.log("=== [디버깅 2단계] URL 쿼리 파라미터 분석 결과 ===");
    console.log("추출된 토큰:", token);

    if (token) {
      localStorage.setItem("accessToken", token);
      console.log("-> 로컬스토리지에 accessToken 저장 완료!");
    } else {
      console.warn("-> URL 쿼리 스트링에 토큰이 유실되었거나 존재하지 않습니다.");
    }

    // 2. [임시 검증 모드] 백엔드 API(/api/v1/users/me) 호출을 건너뛰고, 발급된 토큰 흐름만 검증합니다.
    const storedToken = token || localStorage.getItem("accessToken");
    console.log("=== [디버깅 3단계 - 임시검증] API 호출 패스 및 토큰 정보 파싱 ===");
    console.log("최종 발급 및 보존된 토큰:", storedToken);

    if (storedToken) {
      let tempUser = "소셜유저";
      try {
        // JWT의 Payload를 파싱하여 sub(UUID) 정보 등을 추출해 봅니다.
        const base64Url = storedToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const payloadObj = JSON.parse(jsonPayload);
        console.log("-> [디코딩 성공] 토큰 내부 페이로드 정보:", payloadObj);
        tempUser = payloadObj.sub || "소셜유저";
      } catch (e) {
        console.error("-> JWT 페이로드 디코딩 에러:", e);
      }

      // Redux 스토어에 로그인 세션 임시 동기화
      dispatch(
        authSlice.actions.socialLoginSuccess({
          username: `임시(${tempUser.substring(0, 8)}...)`,
        })
      );
      console.log("-> 임시 Redux 스토어 동기화 완료! 홈 화면으로 진입을 준비합니다.");

      alert(`★ 토큰 발급 및 프론트 리다이렉트 완벽 성공! ★\n\n- 로컬스토리지 저장 토큰: ${storedToken.substring(0, 25)}...\n- 추출된 유저 UUID: ${tempUser}\n\n[확인]을 누르면 메인 홈으로 진입합니다.`);
      navigate("/");
    } else {
      console.error("=== [디버깅 에러] 저장된 토큰이 유실되었습니다 ===");
      alert(`[로그인 진단 경고]\n유효한 로그인 토큰을 찾을 수 없습니다.`);
      navigate("/login");
    }
  }, [navigate, dispatch]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>소셜 로그인 처리 중입니다...</h2>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};

export default OAuth2RedirectHandler;
