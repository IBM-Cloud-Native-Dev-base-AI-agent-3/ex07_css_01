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

    // 2. 백엔드 인증 정보 조회 API 호출 (/api/v1/users/me)
    const fetchHeaders = {};
    const storedToken = token || localStorage.getItem("accessToken");
    console.log("=== [디버깅 3단계] API 요청 헤더 셋업 ===");
    console.log("최종 사용할 인증 토큰:", storedToken);

    if (storedToken) {
      fetchHeaders["Authorization"] = `Bearer ${storedToken}`;
      console.log("-> Authorization 헤더 Bearer 주입 완료!");
    }

    console.log("=== [디버깅 4단계] /api/v1/users/me API 호출 시작 ===");
    fetch("/api/v1/users/me", {
      credentials: "include",
      headers: fetchHeaders,
    })
      .then((response) => {
        console.log("=== [디버깅 5단계] API 응답 수신 ===");
        console.log("HTTP 상태 코드:", response.status);
        console.log("응답 헤더 Content-Type:", response.headers.get("content-type"));

        // 응답 텍스트를 먼저 읽어와 HTML 등의 정체를 파악하고 디버깅 로그로 남깁니다.
        return response.text().then((text) => {
          console.log("=== [디버깅 5.5단계] 수신한 Raw 응답 본문 ===");
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
        console.log("=== [디버깅 6단계] 사용자 데이터 파싱 성공 ===");
        console.log("백엔드 수신 유저 데이터:", data);

        // 3. 백엔드에서 받아온 nickname 정보를 Redux Store에 저장
        dispatch(
          authSlice.actions.socialLoginSuccess({
            username: data.nickname || data.email || data.username || "소셜유저",
          })
        );
        console.log("-> Redux 스토어 로그인 세션 동기화 성공!");

        // 화면 튕김(Redirect)을 멈추고 로그를 볼 수 있도록 성공 alert 팝업을 띄웁니다.
        alert(`★ 소셜 로그인 완벽 연동 성공! ★\n확인된 사용자: ${data.nickname || data.email || "소셜유저"}\n[확인]을 누르면 메인 홈으로 진입합니다.`);
        navigate("/");
      })
      .catch((error) => {
        console.error("=== [디버깅 에러] 세션 조회 과정 중 예외 발생 ===", error);
        
        // 화면이 바로 튕겨나가 콘솔 로그가 삭제되는 것을 차단하기 위해 에러 alert창을 띄웁니다.
        alert(`[로그인 진단 경고]\n세션 정보 확인 중 예외가 발생했습니다.\n에러 내용: ${error.message}\n\n개발자 도구(F12) 콘솔창에서 '[디버깅 N단계]' 로그를 직접 파악하십시오.`);
        navigate("/login");
      });
  }, [navigate, dispatch]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>소셜 로그인 처리 중입니다...</h2>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};

export default OAuth2RedirectHandler;
