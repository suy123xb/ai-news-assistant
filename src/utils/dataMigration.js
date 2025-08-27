// 数据迁移工具
// 用于处理旧版本数据的兼容性和迁移

const OLD_STORAGE_KEY = 'ai_news_chat_messages';
const NEW_STORAGE_KEY = 'ai_news_chat_conversations';

// 检查是否需要数据迁移
export const checkDataMigration = () => {
  try {
    const oldData = localStorage.getItem(OLD_STORAGE_KEY);
    const newData = localStorage.getItem(NEW_STORAGE_KEY);
    
    // 如果有旧数据但没有新数据，需要迁移
    if (oldData && !newData) {
      return {
        needsMigration: true,
        oldData: JSON.parse(oldData)
      };
    }
    
    return { needsMigration: false };
  } catch (error) {
    console.error('检查数据迁移失败:', error);
    return { needsMigration: false };
  }
};

// 执行数据迁移
export const migrateData = (oldMessages) => {
  try {
    if (!oldMessages || !Array.isArray(oldMessages) || oldMessages.length === 0) {
      return null;
    }
    
    // 创建新的对话结构
    const newConversation = {
      id: Date.now().toString(),
      title: '历史对话',
      messages: oldMessages.map((msg, index) => ({
        id: Date.now() + index,
        content: msg.content || msg.message || '',
        role: msg.role || 'user',
        timestamp: msg.timestamp || new Date().toLocaleTimeString(),
        isError: msg.isError || false
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: oldMessages.length
    };
    
    // 保存新格式的数据
    const conversations = [newConversation];
    localStorage.setItem(NEW_STORAGE_KEY, JSON.stringify(conversations));
    localStorage.setItem('ai_news_current_conversation', newConversation.id);
    
    // 删除旧数据
    localStorage.removeItem(OLD_STORAGE_KEY);
    
    console.log('数据迁移完成:', newConversation);
    return newConversation;
  } catch (error) {
    console.error('数据迁移失败:', error);
    return null;
  }
};

// 清理无效数据
export const cleanupInvalidData = () => {
  try {
    const conversations = JSON.parse(localStorage.getItem(NEW_STORAGE_KEY) || '[]');
    
    if (!Array.isArray(conversations)) {
      localStorage.removeItem(NEW_STORAGE_KEY);
      return;
    }
    
    // 清理无效的对话
    const validConversations = conversations.filter(conv => {
      return conv && 
             conv.id && 
             conv.title && 
             Array.isArray(conv.messages) &&
             typeof conv.createdAt === 'string' &&
             typeof conv.updatedAt === 'string';
    });
    
    if (validConversations.length !== conversations.length) {
      localStorage.setItem(NEW_STORAGE_KEY, JSON.stringify(validConversations));
      console.log('清理了无效数据');
    }
  } catch (error) {
    console.error('清理数据失败:', error);
  }
};

// 导出数据
export const exportData = () => {
  try {
    const conversations = localStorage.getItem(NEW_STORAGE_KEY);
    const currentConversation = localStorage.getItem('ai_news_current_conversation');
    
    const exportData = {
      conversations: conversations ? JSON.parse(conversations) : [],
      currentConversationId: currentConversation,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-news-chat-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('导出数据失败:', error);
    return false;
  }
};

// 导入数据
export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (!data.conversations || !Array.isArray(data.conversations)) {
          reject(new Error('无效的数据格式'));
          return;
        }
        
        // 验证数据格式
        const validConversations = data.conversations.filter(conv => {
          return conv && 
                 conv.id && 
                 conv.title && 
                 Array.isArray(conv.messages);
        });
        
        if (validConversations.length === 0) {
          reject(new Error('没有有效的对话数据'));
          return;
        }
        
        // 保存数据
        localStorage.setItem(NEW_STORAGE_KEY, JSON.stringify(validConversations));
        if (data.currentConversationId) {
          localStorage.setItem('ai_news_current_conversation', data.currentConversationId);
        }
        
        resolve(validConversations);
      } catch (error) {
        reject(new Error('解析数据失败'));
      }
    };
    
    reader.onerror = () => reject(new Error('读取文件失败'));
    reader.readAsText(file);
  });
};
