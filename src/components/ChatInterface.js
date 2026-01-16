import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithNewsAssistant } from '../services/api';
import { useChat } from '../contexts/ChatContext';
import ChatSidebar from './ChatSidebar';

const ChatInterface = () => {
  const {
    currentConversation,
    addMessage,
    createConversation,
    isLoading
  } = useChat();
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  
  // 从当前对话获取消息 - 使用useMemo避免无限重渲染
  const messages = useMemo(() => {
    return currentConversation?.messages || [];
  }, [currentConversation?.messages]);

  // 检查是否应该显示欢迎界面
  const shouldShowWelcome = useMemo(() => {
    // 显示欢迎界面的条件：
    // 1. 消息数量为 0（无论是首次进入还是新建对话）
    // 2. 且不在加载状态
    // 3. 且没有正在加载的消息
    // 只有当用户发送第一条消息后（messages.length > 0），欢迎界面才会消失
    const hasNoMessages = messages.length === 0;
    const result = hasNoMessages && !isLoading && !isLoadingMessage;
    
    // 隐藏的调试信息 - 用户看不到
    if (process.env.NODE_ENV === 'development') {
      console.log('ChatInterface 状态:', {
        currentConversation: !!currentConversation,
        currentConversationId: currentConversation?.id,
        isLoading,
        isLoadingMessage,
        messagesLength: messages.length,
        shouldShowWelcome: result
      });
    }
    
    return result;
  }, [currentConversation, isLoading, isLoadingMessage, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoadingMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoadingMessage) return;

    const userMessage = {
      id: Date.now(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    // 如果没有当前对话，创建一个新的
    if (!currentConversation) {
      try {
        console.log('创建新对话...');
        const newConversation = await createConversation();
        console.log('新对话创建成功:', newConversation.id);
        
        // 等待状态更新 - 增加等待时间并检查状态
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 再次检查当前对话是否已设置
        console.log('等待后检查当前对话:', currentConversation?.id);
        
        // 直接添加到新创建的对话中
        addMessage(userMessage);
        console.log('用户消息已添加');
      } catch (error) {
        console.error('创建对话失败:', error);
        return;
      }
    } else {
      // 添加用户消息到对话
      console.log('添加到现有对话:', currentConversation.id);
      addMessage(userMessage);
    }
    
    setInputMessage('');
    setIsLoadingMessage(true);

    try {
      const response = await chatWithNewsAssistant(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        content: response?.content || response?.message || response?.data?.content || '抱歉，我暂时无法回答您的问题。',
        role: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      // 添加AI回复到对话
      console.log('添加AI回复');
      addMessage(botMessage);
    } catch (error) {
      console.error('聊天错误:', error);
      let errorContent = '抱歉，发生了错误，请稍后重试。';
      
      // 尝试从错误响应中获取更详细的错误信息
      if (error.response?.data?.message) {
        errorContent = `API错误: ${error.response.data.message}`;
      } else if (error.message) {
        errorContent = `连接错误: ${error.message}`;
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        content: errorContent,
        role: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      addMessage(errorMessage);
    } finally {
      setIsLoadingMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full min-h-0">
      {/* 侧边栏 */}
      <ChatSidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg lg:ml-0 min-h-0">
        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {shouldShowWelcome ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="max-w-md mx-auto mt-16 space-y-3">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">欢迎使用AI新闻助手</h2>
                <p className="text-gray-600 leading-relaxed">
                  我是您的智能新闻助手，可以为您提供最新的新闻资讯、热点话题分析和深度解读。
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 mb-2 font-medium">您可以这样问我：</p>
                  <ul className="text-sm text-gray-600 space-y-1 text-left">
                    <li>• "今天有什么重要AI新闻？"</li>
                    <li>• "请介绍一下AI领域的最新发展"</li>
                    <li>• "有什么有趣的科技新闻？"</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* 隐藏的调试信息 - 用户看不到 */}
              {process.env.NODE_ENV === 'development' && (
                <div className="hidden">
                  调试: 消息数量 = {messages.length}, 当前对话ID = {currentConversation?.id}
                </div>
              )}
              
              {/* 显示所有消息 */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : message.isError
                        ? 'bg-red-50 border border-red-200 text-red-800'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.role === 'bot' && (
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.isError ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <Bot className={`w-5 h-5 ${message.isError ? 'text-red-600' : 'text-blue-600'}`} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        {message.role === 'bot' ? (
                          <div className="text-sm leading-relaxed">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                                h1: ({ children }) => <h1 className="text-lg font-bold mb-3 text-gray-900">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-base font-semibold mb-2 text-gray-900">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-sm font-medium mb-2 text-gray-900">{children}</h3>,
                                ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-gray-700">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-700">{children}</ol>,
                                li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
                                strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                                em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                                a: ({ href, children }) => (
                                  <a 
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                                  >
                                    {children}
                                  </a>
                                ),
                                code: ({ children }) => (
                                  <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-800">
                                    {children}
                                  </code>
                                ),
                                pre: ({ children }) => (
                                  <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto border border-gray-200">
                                    {children}
                                  </pre>
                                ),
                                blockquote: ({ children }) => (
                                  <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-700 bg-blue-50 py-2 rounded-r">
                                    {children}
                                  </blockquote>
                                )
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        )}
                        <p className={`text-xs mt-2 opacity-70 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 加载状态指示器 */}
              {isLoadingMessage && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">AI正在思考中...</p>
                        <div className="flex space-x-1 mt-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的问题，按Enter发送..."
                className="w-full p-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows="1"
                disabled={isLoadingMessage}
                style={{ minHeight: '50px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoadingMessage}
              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
            >
              {isLoadingMessage ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              按 Enter 发送，Shift + Enter 换行
            </p>
            <p className="text-xs text-gray-400">
              AI新闻助手 · 智能对话
            </p>
          </div>
        </div>

        {/* 固定位置的底部区域 */}
        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-t border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="text-center text-gray-600">
              <p className="text-xs">
                © 2025 AI新闻助手. 由Coze AI提供音频技术支持. Designed by Suy.
              </p>
              <p className="text-xs mt-0.5 text-gray-500">
                智能新闻对话 | 每日播客播报 | 让AI为您解读天下事
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
