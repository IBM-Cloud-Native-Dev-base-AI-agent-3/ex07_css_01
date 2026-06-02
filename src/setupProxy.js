const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 1. /api 경로 우회 (pathRewrite를 통해 /api 접두사를 백엔드 전송 시 보존합니다)
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://flask-maturely-stopwatch.ngrok-free.dev",
      changeOrigin: true,
      pathRewrite: {
        "^/": "/api/",
      },
    }),
  );

  // 2. 소셜 로그인 진입 경로 우회 (/oauth2/redirect와의 충돌을 막기 위해 범위를 좁힙니다)
  app.use(
    "/oauth2/authorization",
    createProxyMiddleware({
      target: "https://flask-maturely-stopwatch.ngrok-free.dev",
      changeOrigin: true,
    }),
  );

  // 3. /login/oauth2 경로 우회
  app.use(
    "/login/oauth2",
    createProxyMiddleware({
      target: "https://flask-maturely-stopwatch.ngrok-free.dev",
      changeOrigin: true,
    }),
  );
};


