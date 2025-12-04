# 🔑 Token 更新指南

## 更新步骤（只需 1 分钟）

### 第一步：获取新 Token

1. 访问 Coze 平台：https://www.coze.cn/open/oauth/pats
2. 点击 **"创建 Personal Access Token"**
3. 复制生成的 Token（格式：`pat_xxxxxx...`）

### 第二步：更新 Token

1. 打开文件：[src/services/api.js](./src/services/api.js)
2. 点击右上角 ✏️ **编辑按钮**
3. 找到第 7 行，替换 Token：
   ```javascript
   'pat_你的新Token粘贴在这里';
   ```
4. 点击绿色的 **"Commit changes"** 按钮

### 第三步：等待自动部署

- 提交后 **GitHub Actions 会自动构建和部署**
- 等待 2-3 分钟即可生效
- 查看部署状态：[Actions](../../actions)

---

## 🎯 流程图

```
更新 api.js 中的 Token
        ↓
   点击 Commit 提交
        ↓
  GitHub Actions 自动触发
        ↓
    自动构建项目
        ↓
  自动部署到 GitHub Pages
        ↓
     网站更新完成 ✅
```

---

## ❓ 常见问题

### Q: 部署需要多久？
A: 通常 2-3 分钟，可在 [Actions](../../actions) 页面查看进度。

### Q: 如何确认部署成功？
A: Actions 页面显示绿色 ✅ 表示成功。

### Q: 出现 401 错误怎么办？
A: Token 无效或过期，请重新获取新 Token。

### Q: 出现 "model is no longer available" 错误？
A: 需要到 Coze 平台更新工作流中使用的模型。

---

## 📁 相关文件

| 文件 | 说明 |
|------|------|
| `src/services/api.js` | Token 配置文件（第 7 行） |
| `.github/workflows/deploy.yml` | 自动部署配置 |

---

> 💡 **提示**：只需在 GitHub 网页上修改文件，无需本地操作！

