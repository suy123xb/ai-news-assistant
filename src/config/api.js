// API配置文件
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL ||
    'https://ai-news-assistant-api.pages.dev/v1/workflows/chat',
  
  WORKFLOWS: {
    NEWS_CHAT: {
      id: "7539120778186457124",
      appId: "7537995711728828426",
      name: "AI新闻对话助手"
    },
    NEWS_PODCAST: {
      id: "7538014055757283374",
      appId: "7537995711728828426", 
      name: "AI每日新闻播客"
    },
    NEWS_DIGEST: {
      id: "7604822147281977385",
      appId: "7604774068013105171",
      name: "每日新闻推送"
    }
  }
};

// 环境检查
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// API状态检查
export const checkApiConfig = () => {
  const issues = [];
  
  if (!API_CONFIG.BASE_URL) {
    issues.push('API代理地址未配置');
  }
  
  if (!API_CONFIG.WORKFLOWS.NEWS_CHAT.id) {
    issues.push('新闻对话工作流ID未配置');
  }
  
  if (!API_CONFIG.WORKFLOWS.NEWS_PODCAST.id) {
    issues.push('新闻播客工作流ID未配置');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
};
