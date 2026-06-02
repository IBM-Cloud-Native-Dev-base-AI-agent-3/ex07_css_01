import React, { useState, useEffect } from "react";
import "../styles/login.css";

// SVG Icons for the Social Login Brands
const KakaoIcon = () => (
  <svg
    className="login-btn-icon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.917 1.91 5.482 4.8 6.85l-.97 3.555c-.105.385.123.774.51.87a.64.64 0 0 0 .546-.115l4.134-2.75c.32.03.645.04.98.04 5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
  </svg>
);

const GoogleIcon = () => (
  <svg
    className="login-btn-icon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const NaverIcon = () => (
  <svg
    className="login-btn-icon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16.2 3H21v18h-4.8l-7.4-10.8V21H3V3h4.8l7.4 10.8V3z" />
  </svg>
);

const LoginCom = () => {
  

  return (
    <div className="login-page-container">
      
        <div id="login-card" className="login-card">
          <h1 className="login-title">HOMEGOOD 시작하기</h1>
          <p className="login-subtitle">
            가장 빠른 임대주택 정보, 지금 바로 가입하세요.
          </p>

          <div className="login-button-group">
            {/* 카카오 로그인 */}
            <a
              id="kakao-login"
              href="/oauth2/authorization/kakao"
              className="login-btn btn-kakao"
            >
              <KakaoIcon />
              카카오로 시작하기
            </a>

            {/* 구글 로그인 */}
            <a
              id="google-login"
              href="/oauth2/authorization/google"
              className="login-btn btn-google"
            >
              <GoogleIcon />
              구글로 시작하기
            </a>

            {/* 네이버 로그인 */}
            <a
              id="naver-login"
              href="/oauth2/authorization/naver"
              className="login-btn btn-naver"
            >
              <NaverIcon />
              네이버 시작하기
            </a>
          </div>
          </div>
    </div>
  );
};
export default LoginCom;
