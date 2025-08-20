const axios = require('axios');

const API_BASE_URL = 'https://api.coze.cn/v1/workflows/chat';
const API_TOKEN = 'cztei_qQJybthkRXiR5C8w5mv4TnvV0t5NKkD71RtU2rjErrBggRN2z6f5SAWXGaiyjFP1f';

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

async function testNewsChatAPI() {
  console.log('🧪 测试AI新闻对话助手API...');
  
  try {
    const response = await axios.post(API_BASE_URL, {
      workflow_id: NEWS_CHAT_CONFIG.workflow_id,
      app_id: NEWS_CHAT_CONFIG.app_id,
      parameters: {
        CONVERSATION_NAME: "Test",
        USER_INPUT: "你好，请介绍一下今天的新闻"
      },
      additional_messages: [
        {
          content: "你好，请介绍一下今天的新闻",
          content_type: "text",
          role: "user",
          type: "question"
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ AI新闻对话助手API测试成功!');
    console.log('响应状态:', response.status);
    console.log('响应数据:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('❌ AI新闻对话助手API测试失败!');
    console.error('错误状态:', error.response?.status);
    console.error('错误信息:', error.response?.data);
    console.error('错误详情:', error.message);
  }
}

async function testNewsPodcastAPI() {
  console.log('\n🧪 测试AI每日新闻播客API...');
  
  try {
    const response = await axios.post(API_BASE_URL, {
      workflow_id: NEWS_PODCAST_CONFIG.workflow_id,
      app_id: NEWS_PODCAST_CONFIG.app_id,
      parameters: {
        CONVERSATION_NAME: "Test",
        USER_INPUT: "你是谁"
      },
      additional_messages: [
        {
          content: "你是谁",
          content_type: "text",
          role: "user",
          type: "question"
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ AI每日新闻播客API测试成功!');
    console.log('响应状态:', response.status);
    console.log('响应数据:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('❌ AI每日新闻播客API测试失败!');
    console.error('错误状态:', error.response?.status);
    console.error('错误信息:', error.response?.data);
    console.error('错误详情:', error.message);
  }
}

async function runTests() {
  console.log('🚀 开始API测试...\n');
  
  await testNewsChatAPI();
  await testNewsPodcastAPI();
  
  console.log('\n🏁 API测试完成!');
}

// 运行测试
runTests().catch(console.error);
