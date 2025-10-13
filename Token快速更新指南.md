# 🔑 Token 快速更新指南

## ⚡ 当 Token 过期时的快速修复（5分钟搞定）

---

## 📋 **步骤一：获取新的 Token**

1. **访问 Coze 平台**：
   ```
   https://www.coze.cn/open/oauth/pats
   ```

2. **创建新 Token**：
   - 点击 "创建 Personal Access Token"
   - 设置名称（例如：ai-news-token-2025）
   - 选择权限（需要工作流执行权限）
   - 点击创建

3. **复制 Token**：
   - ⚠️ Token 只显示一次，立即复制保存
   - 格式：`pat_xxxxxxxxxxxxxxxxxxxxxx`

---

## 📝 **步骤二：在 GitHub 上修改代码**

### **方法 1：网页直接编辑（最快）** ⭐⭐⭐

1. **打开文件**：
   ```
   https://github.com/suy123xb/ai-news-assistant/blob/main/src/services/api.js
   ```
   
2. **点击编辑按钮**（右上角铅笔图标 ✏️）

3. **找到第 6-7 行**：
   ```javascript
   const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN || 
                     'pat_fN3yKfVSRx7hoa42M3HjiqLFu1ORB6UNzQ31HTQMRFrJKVFMtBpZRpGm3F3YA8t0';
   ```

4. **替换 Token**：
   ```javascript
   const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN || 
                     '这里粘贴您的新Token';
   ```

5. **提交更改**：
   - 滚动到页面底部
   - Commit message 填写：`Update: Refresh API Token`
   - 点击 "Commit changes" 绿色按钮

---

### **方法 2：GitHub Web 编辑器（推荐）** ⭐⭐

1. **打开仓库**：
   ```
   https://github.com/suy123xb/ai-news-assistant
   ```

2. **按键盘 `.`（点）键**，或将网址中的 `.com` 改为 `.dev`：
   ```
   https://github.dev/suy123xb/ai-news-assistant
   ```

3. **在左侧文件树找到**：
   ```
   src → services → api.js
   ```

4. **修改第 6-7 行**，粘贴新 Token

5. **提交**：
   - 点击左侧 Source Control 图标（分支图标）
   - 输入提交信息：`Update API Token`
   - 点击 ✓ 提交
   - 点击 "Sync Changes" 同步到远程

---

## 🚀 **步骤三：重新部署**

### **方法 A：在 GitHub Actions 中手动触发** ⭐⭐⭐

1. **访问 Actions 页面**：
   ```
   https://github.com/suy123xb/ai-news-assistant/actions
   ```

2. **找到最新的工作流**，点击 "Re-run all jobs"

### **方法 B：本地重新部署**

1. **拉取最新代码**：
   ```bash
   git pull origin main
   ```

2. **部署**：
   ```bash
   npm run deploy
   # 或
   deploy.bat
   ```

---

## 🎯 **最快捷的完整流程（推荐）**

```
1. 获取新 Token (2分钟)
   ↓
2. GitHub 网页编辑 api.js (1分钟)
   ↓
3. 提交更改 (30秒)
   ↓
4. 本地运行 npm run deploy (1分钟)
   ↓
5. 等待部署完成 (1-2分钟)
```

**总耗时：约 5-6 分钟** ⚡

---

## 📍 **需要修改的唯一文件**

```
文件路径：src/services/api.js
修改位置：第 6-7 行
修改内容：替换 Token 字符串
```

### **修改前**：
```javascript
const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN || 
                  'pat_OLD_TOKEN_HERE';
```

### **修改后**：
```javascript
const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN || 
                  'pat_NEW_TOKEN_HERE';
```

---

## ⚠️ **重要提示**

### **确认 Token 有效**
在部署前可以先测试：
1. 访问：https://www.coze.cn
2. 用新 Token 测试 API 调用
3. 确认返回状态码 200（而非 401）

### **修改后必须重新部署**
- ⚠️ 只修改 GitHub 上的代码**不够**
- ✅ 必须运行 `npm run deploy` 才能更新网站
- ✅ 或者等待 GitHub Actions 自动部署（如果配置了）

### **安全建议**
- 🔒 定期更换 Token（建议每 3-6 个月）
- 🔒 不要在公开场合分享 Token
- 🔒 Token 泄露后立即撤销并创建新的

---

## 🔍 **故障排查**

### **修改后还是 401 错误？**

**检查清单**：
1. ✅ 新 Token 是否已在 Coze 平台创建？
2. ✅ Token 是否正确复制（没有多余空格）？
3. ✅ 代码是否已提交到 GitHub？
4. ✅ 是否已运行 `npm run deploy`？
5. ✅ 部署是否完成（等待 1-3 分钟）？
6. ✅ 浏览器是否强制刷新（Ctrl + F5）？

### **如何确认部署成功？**

1. **查看 gh-pages 分支更新时间**：
   ```
   https://github.com/suy123xb/ai-news-assistant/tree/gh-pages
   ```
   - 应该显示刚刚更新

2. **查看浏览器控制台**（F12）：
   ```
   ✅ API Token 已配置 (前缀: pat_xxxxxx...)
   ```

3. **测试发送消息**：
   - 应该正常回复，无 401 错误

---

## 📱 **移动端应急方案**

如果您不在电脑旁，可以用手机快速修复：

1. **手机浏览器访问**：
   ```
   https://github.com/suy123xb/ai-news-assistant/blob/main/src/services/api.js
   ```

2. **点击右上角三个点 ⋯ → Edit file**

3. **修改 Token**

4. **滚动到底部 → Commit changes**

5. **（可选）在电脑上运行 `npm run deploy`**

---

## 🎓 **进阶：使用环境变量（更安全）**

如果想避免频繁修改代码，可以切换到 Vercel：

### **Vercel 的优势**：
- ✅ Token 存储在环境变量中（更安全）
- ✅ 更新 Token 不需要修改代码
- ✅ 推送代码自动部署
- ✅ 完全免费

### **Vercel 部署步骤**：
1. 访问 https://vercel.com
2. 导入 GitHub 仓库
3. 添加环境变量：
   - `REACT_APP_COZE_API_TOKEN` = 您的 Token
4. Deploy

### **Vercel 上更新 Token**：
1. 打开项目设置
2. Environment Variables
3. 编辑 `REACT_APP_COZE_API_TOKEN`
4. 保存（自动重新部署）

---

## 📞 **快速参考**

| 项目 | 链接 |
|------|------|
| **获取新 Token** | https://www.coze.cn/open/oauth/pats |
| **编辑文件** | https://github.com/suy123xb/ai-news-assistant/blob/main/src/services/api.js |
| **查看部署** | https://github.com/suy123xb/ai-news-assistant/actions |
| **访问网站** | https://suy123xb.github.io/ai-news-assistant/ |

---

## ✅ **成功标志**

Token 更新成功的三个信号：
1. ✅ GitHub 上 api.js 文件已更新
2. ✅ gh-pages 分支时间戳是最新的
3. ✅ 网站测试无 401 错误

---

## 💡 **小技巧**

1. **保存 Token**：将 Token 保存在密码管理器中
2. **设置提醒**：每 3 个月检查一次 Token 有效性
3. **测试先行**：在本地测试新 Token 再部署
4. **备份 Token**：保留上一个有效的 Token 作为备份

---

**记住：只需修改一个文件的两行代码！** 🎯

文件：`src/services/api.js`  
位置：第 6-7 行  
操作：替换 Token → 提交 → 部署 → 完成！

