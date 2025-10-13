# 🔑 API Token 更新指南

## ❌ 当前问题
```
连接错误: Request failed with status code 401
```
**说明**: API Token 失效或无权限

---

## 📋 解决步骤

### 方法一：临时快速修复（测试用）

**优点**: 快速，适合测试  
**缺点**: Token 暴露在代码中，不安全

1. **获取新 Token**：
   - 访问 Coze 平台：https://www.coze.cn/open/oauth/pats
   - 点击 "创建 Personal Access Token"
   - 复制生成的 Token（格式：`pat_xxxxxx...`）

2. **更新代码**：
   打开 `src/services/api.js` 第4行，替换 Token：
   ```javascript
   const API_TOKEN = '这里粘贴您的新Token';
   ```

3. **重新部署**：
   ```bash
   npm run deploy
   ```

---

### 方法二：使用环境变量（推荐，安全）

**优点**: 安全，Token 不会暴露  
**缺点**: 需要配置环境变量

#### 本地开发配置

1. **创建 `.env.local` 文件**（项目根目录）：
   ```bash
   # Windows
   copy .env.local.example .env.local
   
   # 或手动创建
   echo REACT_APP_COZE_API_TOKEN=your_token_here > .env.local
   ```

2. **编辑 `.env.local`**，填入您的 Token：
   ```env
   REACT_APP_COZE_API_TOKEN=pat_xxxxxxxxxxxxxxxxxxxxxx
   ```

3. **修改 `src/services/api.js`**：
   ```javascript
   // 将第4行改为：
   const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN || '';
   
   // 添加 Token 检查
   if (!API_TOKEN) {
     console.error('❌ API Token 未配置！请检查 .env.local 文件');
   }
   ```

4. **重启开发服务器**：
   ```bash
   npm start
   ```

#### GitHub Pages 部署配置

**重要**：GitHub Pages 不支持环境变量！

**解决方案**：

##### 选项 A：使用构建时环境变量
在部署前设置环境变量：

**Windows (PowerShell)**：
```powershell
$env:REACT_APP_COZE_API_TOKEN="your_token_here"
npm run deploy
```

**Windows (CMD)**：
```cmd
set REACT_APP_COZE_API_TOKEN=your_token_here && npm run deploy
```

##### 选项 B：切换到支持环境变量的平台

推荐使用 **Vercel** 或 **Netlify**（免费且支持环境变量）：

**Vercel 部署**：
1. 访问 https://vercel.com
2. 导入 GitHub 仓库
3. 在 **Environment Variables** 中添加：
   - Key: `REACT_APP_COZE_API_TOKEN`
   - Value: 您的 Token
4. 点击 Deploy

**Netlify 部署**：
1. 访问 https://netlify.com
2. 导入 GitHub 仓库
3. 在 **Environment variables** 中添加：
   - Key: `REACT_APP_COZE_API_TOKEN`
   - Value: 您的 Token
4. 点击 Deploy

---

## 🛠️ 代码修改（推荐）

### 修改 `src/services/api.js`

将现有代码改为使用环境变量：

```javascript
import axios from 'axios';

const API_BASE_URL = 'https://api.coze.cn/v1/workflows/chat';

// 从环境变量读取 Token（优先）或使用硬编码（备用）
const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN || 
                  'pat_w0edcbtoBkdypUrhU0nF3gDTVnTd9eWdcPLiGAenhTQSQWTww0cp96wrlgm7BDk4';

// Token 验证
if (!API_TOKEN || API_TOKEN === 'your_token_here') {
  console.error('⚠️ API Token 未正确配置！');
  console.error('请在 .env.local 文件中设置 REACT_APP_COZE_API_TOKEN');
}

console.log('🔑 API Token 状态:', API_TOKEN ? '已配置' : '未配置');

// ... 其余代码保持不变
```

---

## 🔍 Token 问题排查

### 1. 检查 Token 是否有效

在浏览器控制台运行：
```javascript
// 查看当前 Token（前10个字符）
console.log('Token 前缀:', 'pat_w0edcbtoBk...');
```

### 2. 测试 API 调用

使用 curl 或 Postman 测试：
```bash
curl -X POST https://api.coze.cn/v1/workflows/chat \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "workflow_id": "7539120778186457124",
    "app_id": "7537995711728828426",
    "parameters": {"USER_INPUT": "测试"}
  }'
```

如果返回 401，说明 Token 确实无效。

### 3. 检查 Token 权限

确保 Token 有以下权限：
- ✅ 读取工作流
- ✅ 执行工作流
- ✅ 访问 App

---

## 📝 快速操作清单

- [ ] 访问 Coze 平台获取新 Token
- [ ] 创建 `.env.local` 文件
- [ ] 填入新 Token
- [ ] 修改 `src/services/api.js` 使用环境变量
- [ ] 本地测试（`npm start`）
- [ ] 确认功能正常
- [ ] 重新部署（`npm run deploy`）
- [ ] （可选）迁移到 Vercel/Netlify

---

## 🎯 快速修复脚本

我已经为您准备了自动修复脚本，稍后运行。

---

## 💡 最佳实践建议

1. **不要硬编码 Token**
   - 使用环境变量
   - 添加到 .gitignore

2. **定期更新 Token**
   - 设置过期时间
   - 定期轮换

3. **使用后端代理**（终极方案）
   - 在服务器端调用 API
   - 前端只调用自己的后端
   - Token 完全隐藏

4. **监控 API 调用**
   - 查看 Coze 平台使用情况
   - 设置调用限制

---

## ❓ 常见问题

**Q: Token 放在 .env.local 还是 .env？**  
A: 使用 `.env.local`，它优先级更高且默认被 git 忽略。

**Q: GitHub Pages 如何保护 Token？**  
A: GitHub Pages 不支持运行时环境变量，建议切换到 Vercel/Netlify。

**Q: 如何隐藏已提交的 Token？**  
A: 立即撤销该 Token，生成新的，并使用环境变量。

**Q: 本地可以但部署后 401？**  
A: 部署平台没有配置环境变量，需要在平台设置中添加。

---

## 📞 获取帮助

如果问题仍未解决：
1. 检查浏览器控制台的完整错误信息
2. 查看 Coze 平台的 API 调用日志
3. 确认 Workflow ID 和 App ID 是否正确
4. 测试 Token 在 Coze 平台是否有效

