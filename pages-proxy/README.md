# Pages 代理入口

`pages.dev` 在部分中国网络下比 `workers.dev` 更稳定，因此线上前端使用此 Pages Advanced Mode 入口。

Cloudflare Pages 的加密 Secret：

- 名称：`COZE_API_TOKEN`
- 值：Coze Personal Access Token（仅在 Cloudflare 控制台保存）

`_worker.js` 是 Pages Advanced Mode Worker。它提供 `/health` 和 `/v1/workflows/chat`，并限制来源与可调用的工作流。
