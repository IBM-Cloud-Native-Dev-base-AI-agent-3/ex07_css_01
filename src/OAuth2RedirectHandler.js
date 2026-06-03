// src/OAuth2RedirectHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authSlice from "./redux/authSlice";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("=== [진짜 정석 보안 디버깅 1단계] OAuth2RedirectHandler 마운트 완료! ===");
    console.log("현재 주소창 URL (토큰 노출 제로):", window.location.href);

    console.log("=== [진짜 정석 보안 디버깅 2단계] 순수 HttpOnly 쿠키 기반 /api/v1/users/me 호출 ===");
    
    // 로컬스토리지, 주소창 파싱 등 어떠한 우회책도 쓰지 않습니다.
    // 오직 브라우저가 보관하고 있는 보안 쿠키만을 자동으로 전달합니다.
    fetch("/api/v1/users/me", {
      credentials: "include", // 브라우저가 HttpOnly accessToken 쿠키를 자동으로 싣고 감!
    })
      .then((response) => {
        console.log("=== [진짜 정석 보안 디버깅 3단계] API 응답 수신 ===");
        console.log("HTTP 상태 코드:", response.status);

        if (!response.ok) {
          throw new Error(`프로필 조회 실패 (상태코드: ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("=== [진짜 정석 보안 디버깅 4단계] 프로필 동기화 완료 ===");
        console.log("수신 유저 데이터:", data);

        dispatch(
          authSlice.actions.socialLoginSuccess({
            username: data.nickname || data.email || data.username || "소셜유저",
          })
        );

        alert(`★ 꼼수 제로! 순수 HttpOnly 보안 쿠키 연동 대성공! ★\n\n확인된 사용자: ${data.nickname || data.email || "소셜유저"}`);
        navigate("/");
      })
      .catch((error) => {
        console.error("=== [진짜 정석 보안 디버깅 에러] 세션 조회 실패 ===", error);
        alert(`[로그인 실패]\n보안 쿠키 세션을 연동하지 못했습니다.\n에러 내용: ${error.message}`);
        navigate("/login");
      });
  }, [navigate, dispatch]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>보안 세션을 안전하게 검증 중입니다...</h2>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};

export default OAuth2RedirectHandler;
