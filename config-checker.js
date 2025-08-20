const axios = require('axios');

// 配置检查工具
class ConfigChecker {
  constructor() {
    this.config = {
      apiBaseUrl: 'https://api.coze.cn/v1/workflows/chat',
      token: 'cztei_qQJybthkRXiR5C8w5mv4TnvV0t5NKkD71RtU2rjErrBggRN2z6f5SAWXGaiyjFP1f',
      workflows: {
        chat: {
          id: "7539120778186457124",
          appId: "7537995711728828426",
          name: "AI新闻对话助手"
        },
        podcast: {
          id: "7538014055757283374", 
          appId: "7537995711728828426",
          name: "AI每日新闻播客"
        }
      }
    };
  }

  async checkToken() {
    console.log('🔑 检查API Token...');
    
    try {
      // 尝试一个简单的API调用来验证token
      const response = await axios.get('https://api.coze.cn/v1/apps', {
        headers: {
          'Authorization': `Bearer ${this.config.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ API Token 有效!');
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('❌ API Token 无效或已过期');
        console.log('请按照以下步骤重新获取Token:');
        console.log('1. 登录 https://www.coze.cn');
        console.log('2. 进入开发者设置');
        console.log('3. 重新生成API Token');
        console.log('4. 更新 src/services/api.js 中的 API_TOKEN');
      } else {
        console.log('⚠️ 无法验证Token，可能是网络问题');
      }
      return false;
    }
  }

  async checkWorkflow(workflow) {
    console.log(`\n🔍 检查工作流: ${workflow.name}`);
    console.log(`   Workflow ID: ${workflow.id}`);
    console.log(`   App ID: ${workflow.appId}`);
    
    try {
      const response = await axios.post(this.config.apiBaseUrl, {
        workflow_id: workflow.id,
        app_id: workflow.appId,
        parameters: {
          CONVERSATION_NAME: "ConfigTest",
          USER_INPUT: "测试消息"
        },
        additional_messages: [
          {
            content: "测试消息",
            content_type: "text",
            role: "user",
            type: "question"
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${this.config.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ 工作流配置正确!');
      console.log(`   响应状态: ${response.status}`);
      return true;
    } catch (error) {
      console.log('❌ 工作流配置有问题!');
      
      if (error.response?.status === 401) {
        console.log('   原因: API Token 无效');
      } else if (error.response?.status === 404) {
        console.log('   原因: 工作流不存在或ID错误');
      } else if (error.response?.status === 400) {
        console.log('   原因: 请求参数错误');
        console.log(`   错误详情: ${JSON.stringify(error.response.data)}`);
      } else {
        console.log(`   原因: ${error.response?.data?.msg || error.message}`);
      }
      return false;
    }
  }

  async runFullCheck() {
    console.log('🚀 开始完整配置检查...\n');
    
    const tokenValid = await this.checkToken();
    
    if (!tokenValid) {
      console.log('\n⚠️ 由于Token无效，跳过工作流检查');
      return;
    }
    
    // 检查所有工作流
    for (const [key, workflow] of Object.entries(this.config.workflows)) {
      await this.checkWorkflow(workflow);
    }
    
    console.log('\n📋 配置检查完成!');
    console.log('\n💡 如果发现问题，请:');
    console.log('1. 检查API Token是否正确');
    console.log('2. 确认工作流ID和App ID');
    console.log('3. 确保工作流已发布并可用');
    console.log('4. 检查网络连接');
  }

  showCurrentConfig() {
    console.log('📋 当前配置:');
    console.log(`API Base URL: ${this.config.apiBaseUrl}`);
    console.log(`API Token: ${this.config.token.substring(0, 20)}...`);
    console.log('\n工作流配置:');
    
    for (const [key, workflow] of Object.entries(this.config.workflows)) {
      console.log(`  ${workflow.name}:`);
      console.log(`    Workflow ID: ${workflow.id}`);
      console.log(`    App ID: ${workflow.appId}`);
    }
  }
}

// 运行配置检查
const checker = new ConfigChecker();

console.log('🔧 AI新闻助手配置检查工具\n');
checker.showCurrentConfig();
console.log('\n' + '='.repeat(50) + '\n');

checker.runFullCheck().catch(console.error);
