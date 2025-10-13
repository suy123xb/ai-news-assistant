import axios from 'axios';

const API_BASE_URL = 'https://api.coze.cn/v1/workflows/chat';

// 优先从环境变量读取 Token（推荐），否则使用硬编码的 Token（备用）
const API_TOKEN = process.env.REACT_APP_COZE_API_TOKEN || 
                  'pat_fN3yKfVSRx7hoa42M3HjiqLFu1ORB6UNzQ31HTQMRFrJKVFMtBpZRpGm3F3YA8t0';

// Token 验证和提示
if (!API_TOKEN || API_TOKEN === 'your_token_here') {
  console.error('⚠️ Coze API Token 未正确配置！');
  console.error('请在项目根目录创建 .env.local 文件，并设置：');
  console.error('REACT_APP_COZE_API_TOKEN=your_actual_token');
} else {
  console.log('✅ API Token 已配置 (前缀: ' + API_TOKEN.substring(0, 10) + '...)');
}

// AI新闻对话助手API配置
const NEWS_CHAT_CONFIG = {
  workflow_id: "7539120778186457124",
  app_id: "7537995711728828426"
};

// AI每日新闻播客API配置
const NEWS_PODCAST_CONFIG = {
  workflow_id: "7538014055757283374",
  app_id: "7537995711728828426"
};

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// AI新闻对话助手API
export const chatWithNewsAssistant = async (message, conversationName = null) => {
  try {
    const response = await apiClient.post('', {
      workflow_id: NEWS_CHAT_CONFIG.workflow_id,
      app_id: NEWS_CHAT_CONFIG.app_id,
      parameters: {
        USER_INPUT: message
      },
      additional_messages: [
        {
          content: message,
          content_type: "text",
          role: "user",
          type: "question"
        }
      ]
    });
    
    // 处理SSE格式的响应数据
    const sseData = response.data;
    let finalContent = '';
    
    // 提取包含实际内容的assistant消息
    const lines = sseData.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.substring(6));
          // 查找包含完整内容的assistant消息（completed事件）
          if (data.content && data.role === 'assistant' && data.type === 'answer' && data.created_at) {
            finalContent = data.content;
          }
        } catch (e) {
          // 忽略解析错误
        }
      }
    }
    
    return {
      content: finalContent || 'AI助手已回复，请查看完整内容',
      message: finalContent || 'AI助手已回复，请查看完整内容',
      data: {
        content: finalContent || 'AI助手已回复，请查看完整内容'
      }
    };
  } catch (error) {
    console.error('AI新闻对话助手API调用失败:', error);
    throw error;
  }
};

// AI每日新闻播客API
export const getDailyNewsPodcast = async (message = "你是谁", conversationName = null) => {
  try {
    const response = await apiClient.post('', {
      workflow_id: NEWS_PODCAST_CONFIG.workflow_id,
      app_id: NEWS_PODCAST_CONFIG.app_id,
      parameters: {
        USER_INPUT: message
      },
      additional_messages: [
        {
          content: message,
          content_type: "text",
          role: "user",
          type: "question"
        }
      ]
    });
    
    // 处理SSE格式的响应数据
    console.log('播客API响应:', response.data);
    
    // 解析SSE格式的数据
    const sseData = response.data;
    let finalContent = '';
    
    // 提取包含实际内容的assistant消息
    const lines = sseData.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.substring(6));
          // 查找包含实际内容的assistant消息
          if (data.content && data.role === 'assistant' && data.type === 'answer') {
            finalContent = data.content;
          }
        } catch (e) {
          // 忽略解析错误
        }
      }
    }
    
    // 解析音频链接和新闻内容
    let audioUrl = '';
    let newsContent = finalContent;
    
    // 尝试从内容中提取音频链接 - 支持多种格式
    if (finalContent) {
      // 尝试多种可能的音频链接格式
      const audioPatterns = [
        /音频链接[：:]\s*(https?:\/\/[^\s\n]+)/i,
        /音频[：:]\s*(https?:\/\/[^\s\n]+)/i,
        /播客链接[：:]\s*(https?:\/\/[^\s\n]+)/i,
        /播放链接[：:]\s*(https?:\/\/[^\s\n]+)/i,
        /链接[：:]\s*(https?:\/\/[^\s\n]+)/i
      ];
      
      for (const pattern of audioPatterns) {
        const audioMatch = finalContent.match(pattern);
        if (audioMatch) {
          audioUrl = audioMatch[1];
          // 移除音频链接部分，保留新闻内容
          newsContent = finalContent.replace(pattern, '').trim();
          break;
        }
      }
    }
    
    return {
      content: newsContent || 'AI播客内容已生成，请查看完整内容',
      message: newsContent || 'AI播客内容已生成，请查看完整内容',
      audioUrl: audioUrl,
      data: {
        content: newsContent || 'AI播客内容已生成，请查看完整内容',
        audioUrl: audioUrl
      }
    };
  } catch (error) {
    console.error('AI每日新闻播客API调用失败:', error);
    console.error('错误详情:', error.response?.data);
    throw error;
  }
};
