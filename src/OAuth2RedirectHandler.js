// src/OAuth2RedirectHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authSlice from "./redux/authSlice";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("=== [하이브리드 디버깅 1단계] OAuth2RedirectHandler 마운트 완료! ===");
    console.log("현재 주소창 URL:", window.location.href);

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
    console.log("=== [하이브리드 디버깅 2단계] URL 쿼리 분석 결과 ===");
    console.log("추출된 주소창 토큰:", token);

    if (token) {
      localStorage.setItem("accessToken", token);
      console.log("-> [로컬 개발 우회] 로컬스토리지에 accessToken 저장 완료!");
    }

    // 2. 백엔드 인증 정보 조회 API 호출 (/api/v1/users/me)
    const fetchHeaders = {};
    const storedToken = token || localStorage.getItem("accessToken");
    console.log("=== [하이브리드 디버깅 3단계] API 요청 설정 ===");
    console.log("최종 감지된 보존 토큰:", storedToken);

    if (storedToken) {
      fetchHeaders["Authorization"] = `Bearer ${storedToken}`;
      console.log("-> [동일도메인 쿠키 미반영 대비] Authorization Bearer 헤더 탑재 완료!");
    }

    console.log("=== [하이브리드 디버깅 4단계] /api/v1/users/me API 호출 시작 ===");
    fetch("/api/v1/users/me", {
      credentials: "include", // 쿠키 방식도 상시 대기
      headers: fetchHeaders, // 헤더 방식도 상시 대기
    })
      .then((response) => {
        console.log("=== [하이브리드 디버깅 5단계] API 응답 수신 ===");
        console.log("HTTP 상태 코드:", response.status);
        console.log("응답 헤더 Content-Type:", response.headers.get("content-type"));

        return response.text().then((text) => {
          console.log("=== [하이브리드 디버깅 5.5단계] 수신한 Raw 응답 본문 ===");
          console.log(text.substring(0, 500));

          if (!response.ok) {
            throw new Error(`백엔드 프로필 조회 실패 (HTTP 상태코드: ${response.status})`);
          }

          try {
            return JSON.parse(text);
          } catch (e) {
            throw new Error(`JSON 파싱 실패 (HTML 수신됨). 본문 앞부분: ${text.substring(0, 100)}`);
          }
        });
      })
      .then((data) => {
        console.log("=== [하이브리드 디버깅 6단계] 사용자 데이터 파싱 성공 ===");
        console.log("백엔드 수신 유저 데이터:", data);

        // 3. 백엔드에서 받아온 nickname 정보를 Redux Store에 저장
        dispatch(
          authSlice.actions.socialLoginSuccess({
            username: data.nickname || data.email || data.username || "소셜유저",
          })
        );
        console.log("-> Redux 스토어 로그인 세션 동기화 성공!");

        alert(`★ 소셜 로그인 연동 최종 대성공! ★\n\n- 로컬/상용 하이브리드 세션 수립 완료.\n\n확인된 사용자: ${data.nickname || data.email || "소셜유저"}`);
        navigate("/");
      })
      .catch((error) => {
        console.error("=== [하이브리드 디버깅 에러] 세션 조회 과정 중 예외 발생 ===", error);
        
        alert(`[로그인 진단 경고]\n세션 정보 확인 중 예외가 발생했습니다.\n에러 내용: ${error.message}\n\n개발자 도구(F12) 콘솔창에서 '[하이브리드 디버깅 N단계]' 로그를 직접 파악하십시오.`);
        navigate("/login");
      });
  }, [navigate, dispatch]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>소셜 로그인 세션을 안전하게 동기화 중입니다...</h2>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};

export default OAuth2RedirectHandler;
