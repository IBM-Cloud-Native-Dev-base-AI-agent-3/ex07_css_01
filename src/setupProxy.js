const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 1. /api 경로 우회
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://flask-maturely-stopwatch.ngrok-free.dev",
      changeOrigin: true,
    }),
  );

  // 2. /oauth2 경로 우회
  app.use(
    "/oauth2",
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

  // 3. /login/oauth2 경로 우회
  app.use(
    "/oauth2/redirect/",
    createProxyMiddleware({
      target: "https://flask-maturely-stopwatch.ngrok-free.dev",
      changeOrigin: true,
    }),
  );
};
