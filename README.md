# AI新闻助手 Web应用

一个基于React的智能新闻助手Web应用，提供AI新闻对话和每日播客功能。

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

## 🚀 技术栈

- **前端框架**: React 18
- **样式框架**: Tailwind CSS
- **图标库**: Lucide React
- **HTTP客户端**: Axios
- **Markdown渲染**: React Markdown
- **状态管理**: React Context API

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
应用使用Coze平台提供的AI服务，需要在 `src/services/api.js` 中配置：

```javascript
const API_TOKEN = 'your_coze_api_token';
const NEWS_CHAT_CONFIG = {
  workflow_id: "your_chat_workflow_id",
  app_id: "your_app_id"
};
const NEWS_PODCAST_CONFIG = {
  workflow_id: "your_podcast_workflow_id", 
  app_id: "your_app_id"
};
```

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

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📞 联系方式

如有问题或建议，请通过GitHub Issues联系我们。

---

**© 2025 AI新闻助手. 由Coze AI提供音频技术支持.**
