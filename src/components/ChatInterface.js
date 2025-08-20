import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithNewsAssistant } from '../services/api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatWithNewsAssistant(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        content: response?.content || response?.message || response?.data?.content || '抱歉，我暂时无法回答您的问题。',
        role: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
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
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="w-6 h-6" />
          AI新闻对话助手
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          与AI助手进行智能新闻对话，获取最新资讯和深度分析
        </p>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>开始与AI新闻助手对话吧！</p>
            <p className="text-sm mt-2">您可以询问最新的新闻、热点话题或任何感兴趣的内容</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.isError
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.role === 'bot' && (
                  <Bot className={`w-5 h-5 mt-0.5 ${message.isError ? 'text-red-600' : 'text-blue-500'}`} />
                )}
                <div className="flex-1">
                  {message.role === 'bot' ? (
                    <div className="text-sm prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          // 自定义渲染组件以匹配设计风格
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-md font-semibold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-medium mb-1">{children}</h3>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="text-sm">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          a: ({ href, children }) => (
                            <a 
                              href={href} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                              {children}
                            </pre>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-gray-300 pl-3 italic">
                              {children}
                            </blockquote>
                          )
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </p>
                </div>
                {message.role === 'user' && (
                  <User className="w-5 h-5 mt-0.5" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                <span className="text-gray-600">AI正在思考中...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入您的问题..."
            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="1"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          按 Enter 发送，Shift + Enter 换行
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
