# 🔑 Token 更新指南

Coze Token 不再写入 React 源码或 GitHub Actions。它作为加密 Secret 保存在 Cloudflare Pages 中，公开的 GitHub Pages 构建不会包含 Token。

## 更新步骤

1. 访问 Coze Personal Access Token 页面并创建新 Token。
2. 打开 Cloudflare Dashboard → Workers & Pages → `ai-news-assistant-api`。
3. 进入 Settings → Variables and Secrets。
4. 在 Production 环境编辑加密 Secret `COZE_API_TOKEN`，粘贴新 Token 并重新部署。
5. 访问 `https://ai-news-assistant-api.pages.dev/health`，确认返回 `{"ok":true}`，再从网站发送一条测试消息。

## 安全提醒

- 不要把 Token 写入 `src/`、`.env.production`、GitHub 仓库或前端构建变量。
- `REACT_APP_*` 会被编译进公开的 JavaScript，不能用来保存 Secret。
- Pages 代理代码只提交 Secret 名称，不提交 Secret 值。
