import React, { useState } from 'react';
import { MessageSquare, Volume2, Newspaper, Menu, X } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import PodcastInterface from './components/PodcastInterface';
import NewsDigestInterface from './components/NewsDigestInterface';
import { PodcastProvider } from './contexts/PodcastContext';
import { ChatProvider } from './contexts/ChatContext';
import { DigestProvider } from './contexts/DigestContext';
import { theme } from './theme/colors';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: 'chat',
      name: 'AI新闻对话',
      icon: MessageSquare,
      component: ChatInterface
    },
    {
      id: 'podcast',
      name: 'AI每日播客',
      icon: Volume2,
      component: PodcastInterface
    },
    {
      id: 'digest',
      name: '每日新闻推送',
      icon: Newspaper,
      component: NewsDigestInterface
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <PodcastProvider>
      <ChatProvider>
        <DigestProvider>
        <div className={`min-h-screen ${theme.pageBg}`}>
      {/* 头部导航 */}
      <header className="bg-white shadow-lg">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className={`text-2xl font-bold ${theme.appLogo}`}>
                  AI新闻助手
                </h1>
              </div>
            </div>

            {/* 桌面端导航 */}
            <nav className="hidden md:flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id ? theme.navActive : theme.navInactive
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>

            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* 移动端导航菜单 */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        activeTab === tab.id ? theme.navActive : theme.navInactive
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-4rem)] overflow-hidden">
        <div className={activeTab === 'podcast' || activeTab === 'digest' ? 'h-full overflow-y-auto' : 'h-full'}>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </main>
    </div>
        </DigestProvider>
      </ChatProvider>
    </PodcastProvider>
  );
}

export default App;
