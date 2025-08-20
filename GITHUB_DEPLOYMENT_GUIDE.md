# GitHub部署指南

## 步骤1：创建GitHub仓库

1. 访问 [GitHub.com](https://github.com) 并登录您的账户
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `ai-news-assistant` (或您喜欢的名称)
   - **Description**: `AI新闻助手Web应用 - 智能新闻对话和每日播客`
   - **Visibility**: 选择 Public (公开) 或 Private (私有)
   - **不要**勾选 "Add a README file" (我们已经有了)
   - **不要**勾选 "Add .gitignore" (我们已经有了)
   - **不要**勾选 "Choose a license" (我们已经有了)
4. 点击 "Create repository"

## 步骤2：推送代码到GitHub

在您的本地项目目录中运行以下命令：

```bash
# 添加远程仓库（替换 YOUR_USERNAME 和 REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

## 步骤3：部署选项

### 选项A：使用GitHub Pages (免费)

1. 在GitHub仓库页面，点击 "Settings" 标签
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"

**注意**: 由于这是React应用，需要先构建生产版本：

```bash
# 构建生产版本
npm run build

# 将构建文件推送到GitHub
git add build
git commit -m "Add production build"
git push
```

### 选项B：使用Vercel (推荐，免费)

1. 访问 [Vercel.com](https://vercel.com) 并注册/登录
2. 点击 "New Project"
3. 导入您的GitHub仓库
4. 配置项目：
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. 点击 "Deploy"

### 选项C：使用Netlify (免费)

1. 访问 [Netlify.com](https://netlify.com) 并注册/登录
2. 点击 "New site from Git"
3. 选择GitHub并授权
4. 选择您的仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. 点击 "Deploy site"

## 步骤4：配置环境变量 (如果需要)

如果您的应用需要环境变量，在部署平台中配置：

- `REACT_APP_API_TOKEN`: 您的Coze API Token
- `REACT_APP_CHAT_WORKFLOW_ID`: 聊天工作流ID
- `REACT_APP_PODCAST_WORKFLOW_ID`: 播客工作流ID

## 步骤5：获取公网地址

部署完成后，您将获得一个公网地址，例如：
- GitHub Pages: `https://YOUR_USERNAME.github.io/REPO_NAME`
- Vercel: `https://YOUR_PROJECT.vercel.app`
- Netlify: `https://YOUR_PROJECT.netlify.app`

## 故障排除

### 常见问题

1. **构建失败**
   - 检查package.json中的依赖是否正确
   - 确保所有文件都已提交到GitHub

2. **API调用失败**
   - 检查CORS设置
   - 确保API Token正确配置

3. **页面显示空白**
   - 检查浏览器控制台错误
   - 确保路由配置正确

### 安全注意事项

1. **不要**在代码中硬编码API Token
2. 使用环境变量存储敏感信息
3. 定期更新依赖包
4. 启用HTTPS

## 维护和更新

### 更新应用

```bash
# 修改代码后
git add .
git commit -m "Update: 描述您的更改"
git push
```

大多数部署平台会自动检测到代码更新并重新部署。

### 监控

- 定期检查应用性能
- 监控API调用限制
- 查看用户反馈

---

**完成这些步骤后，您的AI新闻助手Web应用就可以在公网上访问了！** 🎉
