const axios = require('axios');

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL ||
  'https://ai-news-assistant-api.pages.dev/v1/workflows/chat';

const workflows = {
  chat: {
    id: '7539120778186457124',
    appId: '7537995711728828426',
    name: 'AI新闻对话助手'
  },
  podcast: {
    id: '7538014055757283374',
    appId: '7537995711728828426',
    name: 'AI每日新闻播客'
  }
};

async function checkProxy() {
  console.log('🔑 检查 Cloudflare Pages 代理...');
  const healthUrl = new URL('/health', apiBaseUrl).toString();
  const response = await axios.get(healthUrl);

  if (response.data?.ok !== true) {
    throw new Error('代理健康检查返回异常');
  }

  console.log('✅ Cloudflare Pages 代理可用');
}

async function checkWorkflow(workflow) {
  console.log(`\n🔍 检查工作流: ${workflow.name}`);

  const response = await axios.post(apiBaseUrl, {
    workflow_id: workflow.id,
    app_id: workflow.appId,
    parameters: { USER_INPUT: '请回复：配置检查成功' },
    additional_messages: [
      {
        content: '请回复：配置检查成功',
        content_type: 'text',
        role: 'user',
        type: 'question'
      }
    ]
  }, {
    headers: {
      Origin: 'https://yhao-l.github.io',
      'Content-Type': 'application/json'
    }
  });

  console.log(`✅ 代理请求成功，响应状态: ${response.status}`);
  if (typeof response.data === 'string' && response.data.includes('event: error')) {
    console.log('⚠️ Coze 返回了业务错误，请检查额度或工作流状态');
  }
}

async function runFullCheck() {
  console.log('🚀 开始完整配置检查...\n');
  console.log(`API Base URL: ${apiBaseUrl}`);
  console.log('API Token: 由 Cloudflare 加密 Secret 管理');

  await checkProxy();
  for (const workflow of Object.values(workflows)) {
    await checkWorkflow(workflow);
  }

  console.log('\n📋 配置检查完成');
}

runFullCheck().catch((error) => {
  console.error(`❌ 配置检查失败: ${error.response?.data?.msg || error.message}`);
  process.exitCode = 1;
});
