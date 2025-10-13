# 🚀 Token 更新速查表（一页搞定）

## 📍 **唯一需要改的地方**

```
文件：src/services/api.js
位置：第 6-7 行
```

---

## ⚡ **三步搞定（5分钟）**

### **第一步：获取新 Token** ⏱️ 2分钟
```
🔗 https://www.coze.cn/open/oauth/pats
   → 点击"创建 Personal Access Token"
   → 复制 Token (格式: pat_xxxx...)
```

### **第二步：GitHub 网页编辑** ⏱️ 1分钟
```
🔗 https://github.com/suy123xb/ai-news-assistant/blob/main/src/services/api.js
   → 点击 ✏️ 编辑按钮
   → 第 6-7 行粘贴新 Token
   → 提交更改
```

### **第三步：重新部署** ⏱️ 2分钟
```
本地命令行运行：
npm run deploy
或
deploy.bat
```

---

## 📝 **代码修改示例**

### **修改前（旧 Token）**：
```javascript
const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN || 
                  'pat_fN3yKfVSRx7hoa42M3HjiqLFu1ORB6UNzQ31HTQMRFrJKVFMtBpZRpGm3F3YA8t0';
```

### **修改后（新 Token）**：
```javascript
const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN || 
                  'pat_你的新Token在这里';
```

---

## ✅ **验证成功**

1. **GitHub 检查**：
   - 访问：https://github.com/suy123xb/ai-news-assistant/blob/main/src/services/api.js
   - 确认 Token 已更新

2. **网站测试**：
   - 访问：https://suy123xb.github.io/ai-news-assistant/
   - 按 Ctrl + F5 强制刷新
   - 发送测试消息
   - ✅ 无 401 错误 = 成功！

---

## ⚠️ **重要提醒**

- ⚠️ 修改代码后**必须**运行 `npm run deploy`
- ⚠️ 等待 1-3 分钟让 GitHub Pages 更新
- ⚠️ 浏览器要强制刷新（Ctrl + F5）

---

## 🔗 **常用链接**

| 功能 | 链接 |
|------|------|
| 获取 Token | https://www.coze.cn/open/oauth/pats |
| 编辑文件 | https://github.com/suy123xb/ai-news-assistant/blob/main/src/services/api.js |
| 查看部署 | https://github.com/suy123xb/ai-news-assistant/actions |
| 访问网站 | https://suy123xb.github.io/ai-news-assistant/ |

---

## 💡 **快捷操作**

### **在 GitHub 网页快速编辑**：
1. 打开文件链接
2. 按键盘 `E` 键（自动进入编辑模式）
3. 修改 Token
4. Ctrl + Enter 快速提交

### **本地快速部署**：
```bash
# Windows
deploy.bat

# 命令行
npm run deploy
```

---

**记住：1个文件，2行代码，3个步骤！** 🎯

