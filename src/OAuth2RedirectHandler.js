// src/OAuth2RedirectHandler.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2RedirectHandler = () => {
    console.log("test")
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 주소창(URL)에서 백엔드가 보낸 쿼리 스트링(?token=...)을 읽어옵니다.
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token"); // 만약 백엔드가 보낸 이름이 accessToken이면 'accessToken'으로 변경

    if (token) {
      // 2. 중요! 토큰을 브라우저 로컬스토리지에 저장합니다. (이제 검사창 Application 탭에 보입니다)
      localStorage.setItem("token", token);
      console.log("토큰 저장 완료:", token);

      // 3. 로그인이 완료되었으니 메인 페이지(홈)로 이동시킵니다.
      navigate("/");
    } else {
      console.error("URL에 토큰이 없습니다.");
      navigate("/rental"); // 실패 시 로그인 페이지로 돌려보냄
    }
  }, [navigate]);

  return (
    <div style={{ textDirection: "center", marginTop: "100px" }}>
      <h2>소셜 로그인 처리 중입니다...</h2>
      <p>잠시만 기다려주세요.</p>
    </div>
  );
};

export default OAuth2RedirectHandler;
