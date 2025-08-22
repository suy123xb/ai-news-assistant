# AI新闻助手 Web应用

## ✨基本概况
- 一个基于React的智能新闻助手Web应用，提供AI新闻对话和每日播客功能。
- 体验链接：<https://suy123xb.github.io/ai-news-assistant/>
- 背景：AI产品经理每天需要从多个平台搜寻AI相关的资讯，十分耗费精力和时间
- 目标：此新闻助手可以帮助用户从各大权威新闻网站，获取、整理并生成新闻列表和新闻播客，让用户快速把握重要资讯
- 前端页面：
<img width="1670" height="950" alt="image" src="https://github.com/user-attachments/assets/29e9ef3f-5983-4d54-a5fc-256e0a186977" />

## 🎶视频演示
- 对话演示：

https://github.com/user-attachments/assets/f5d3bff1-3a34-4086-9aad-8bf19d421a14


- 播客演示：

https://github.com/user-attachments/assets/7cb3e9cb-ebaf-48a5-b925-5efc9b0b4d9a



## 🌟 功能特性
### 🤖 AI新闻对话助手
- 智能新闻问答
- 实时对话交互
- Markdown格式回复
- 支持复杂问题解答
### 🎧 AI每日新闻播客
- 每日精选新闻播报
- 音频播放器集成
- 新闻内容Markdown渲染
- 状态持久化管理

## 📱 使用说明
### AI新闻对话
1. 点击"AI新闻对话"标签
2. 在输入框中输入您的问题
3. 点击发送按钮或按回车键
4. 查看AI助手的智能回复

### AI每日播客
1. 点击"AI每日播客"标签
2. 确认是否生成播客内容
3. 等待内容生成完成
4. 阅读新闻内容并播放音频

## 🙌AI协作
- 创建前端：<img width="595" height="976" alt="1" src="https://github.com/user-attachments/assets/4729d4eb-0ec4-4e12-b79d-c7e3a2078112" />

- 构建后端：<img width="313" height="983" alt="2" src="https://github.com/user-attachments/assets/aff5c93e-09e2-4880-87fd-273ab73d9300" />

- debug：<img width="334" height="925" alt="3" src="https://github.com/user-attachments/assets/adf598c5-c13e-4f2c-b473-6153177cd440" />

- 提交部署：<img width="609" height="906" alt="4" src="https://github.com/user-attachments/assets/8349abfb-166b-4659-8d67-618bc952eba3" />



## 🚀 技术栈
- **前端框架**: React 18
- **样式框架**: Tailwind CSS
- **图标库**: Lucide React
- **HTTP客户端**: Axios
- **Markdown渲染**: React Markdown
- **状态管理**: React Context API

## 📁 项目结构
```
ai-news-assistant/
├── public/                     # 静态资源
│   ├── index.html             # HTML模板
│   ├── favicon.ico            # 网站图标
│   └── manifest.json          # PWA清单文件
├── src/                       # 源代码
│   ├── components/            # React组件
│   │   ├── ChatInterface.js   # AI新闻对话界面
│   │   ├── PodcastInterface.js # AI每日播客界面
│   │   └── MarkdownDemo.js    # Markdown渲染演示
│   ├── contexts/              # Context状态管理
│   │   └── PodcastContext.js  # 播客状态管理
│   ├── services/              # API服务
│   │   └── api.js             # Coze API集成
│   ├── App.js                 # 主应用组件
│   ├── index.js               # 应用入口
│   └── index.css              # 全局样式
├── build/                     # 生产构建文件 (部署后生成)
├── node_modules/              # 依赖包 (git忽略)
├── .gitignore                 # Git忽略文件
├── package.json               # 项目配置和依赖
├── package-lock.json          # 依赖锁定文件
├── tailwind.config.js         # Tailwind CSS配置
├── postcss.config.js          # PostCSS配置
├── README.md                  # 项目说明文档
├── LICENSE                    # MIT许可证
├── GITHUB_DEPLOYMENT_GUIDE.md # GitHub部署指南
├── PROJECT_SUMMARY.md         # 项目总结文档
├── PODCAST_FEATURES.md        # 播客功能说明
├── deploy.bat                 # Windows部署脚本
├── start.bat                  # Windows启动脚本
└── config-checker.js          # API配置检查工具
```

### 核心文件说明
- **`src/App.js`**: 主应用组件，包含路由和布局
- **`src/components/ChatInterface.js`**: AI新闻对话功能实现
- **`src/components/PodcastInterface.js`**: AI每日播客功能实现
- **`src/contexts/PodcastContext.js`**: 播客状态管理和持久化
- **`src/services/api.js`**: Coze API集成和SSE解析
- **`public/index.html`**: 应用HTML模板
- **`tailwind.config.js`**: Tailwind CSS和Typography插件配置

## 📦 安装和运行
### 环境要求
- Node.js 16.0 或更高版本
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

应用将在 `http://localhost:3000` 启动

### 构建生产版本
```bash
npm run build
```

## 🔧 配置说明

### API配置
coze自行后端搭建相关工作流，并调用api：

AI新闻对话助手：
<img width="1371" height="305" alt="image" src="https://github.com/user-attachments/assets/3029fd65-1a71-455f-b875-ae1a91ac6dbf" />

获取新闻并生成音频播客：
<img width="1291" height="412" alt="image" src="https://github.com/user-attachments/assets/622d5d0f-9e4b-47c6-97fb-bc1b131d76a5" />




## 🎨 界面特色
- **响应式设计**: 适配桌面、平板和手机
- **现代化UI**: 渐变背景和卡片式布局
- **流畅动画**: 平滑的过渡效果
- **用户友好**: 直观的操作界面

## 🔒 隐私和安全
- 所有API调用使用HTTPS加密
- 不存储用户个人信息
- 遵循数据保护最佳实践

## 📄 许可证
本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🚀 部署信息

### 在线访问
- **🌐 公网地址**: [https://suy123xb.github.io/ai-news-assistant/](https://suy123xb.github.io/ai-news-assistant/)
- **📦 部署平台**: GitHub Pages
- **🔧 部署方式**: gh-pages分支自动部署

### 部署命令
```bash
# 构建并部署到GitHub Pages
npm run deploy

# 本地开发
npm start

# 生产构建
npm run build
```

## 🤝 贡献
欢迎提交Issue和Pull Request来改进这个项目！

## 📞 联系方式
如有问题或建议，请通过GitHub Issues联系我们。

---

**© 2025 AI新闻助手. 由Coze AI提供音频技术支持.**
