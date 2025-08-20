import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Loader2, RefreshCw, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { usePodcast } from '../contexts/PodcastContext';

const PodcastInterface = () => {
  const {
    podcastData,
    isLoading,
    lastUpdated,
    hasInitialized,
    showConfirmDialog,
    fetchPodcast,
    handleConfirmGenerate,
    handleCancelGenerate
  } = usePodcast();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioRef = React.useRef(null);

  // 当播客数据更新时，设置音频源
  useEffect(() => {
    if (podcastData?.audioUrl && audioRef.current) {
      audioRef.current.src = podcastData.audioUrl;
      audioRef.current.load();
    }
  }, [podcastData?.audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRefresh = () => {
    fetchPodcast();
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Volume2 className="w-6 h-6" />
          AI每日新闻播客
        </h2>
        <p className="text-purple-100 text-sm mt-1">
          每日精选新闻，AI智能播报，让您轻松了解天下事
        </p>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 p-6">
        {/* 确认对话框 */}
        {showConfirmDialog && !hasInitialized && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
              <Volume2 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                启动AI每日新闻播客
              </h3>
              <p className="text-gray-600 mb-6">
                是否要运行AI每日新闻播客？这将生成最新的新闻内容和音频播报。
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmGenerate}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  是，开始生成
                </button>
                <button
                  onClick={handleCancelGenerate}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-600">正在生成今日新闻播客...</p>
          </div>
        ) : podcastData && hasInitialized ? (
          <div className="space-y-6">
            {/* 播客信息 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">今日新闻播报</h3>
                <button
                  onClick={handleRefresh}
                  className="p-2 text-purple-600 hover:bg-purple-100 rounded-full transition-colors"
                  title="刷新播客"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              
              {lastUpdated && (
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{lastUpdated.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{lastUpdated.toLocaleTimeString()}</span>
                  </div>
                </div>
              )}

                                           <div className="text-gray-700 leading-relaxed">
                {podcastData.error ? (
                  <span className="text-red-600">{podcastData.message}</span>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        // 自定义渲染组件以匹配播客界面风格
                        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                        h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-purple-800">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 text-purple-700">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-md font-medium mb-2 text-purple-600">{children}</h3>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-2">{children}</ol>,
                        li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-purple-800">{children}</strong>,
                        em: ({ children }) => <em className="italic text-purple-700">{children}</em>,
                        a: ({ href, children }) => (
                          <a 
                            href={href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 underline"
                          >
                            {children}
                          </a>
                        ),
                        code: ({ children }) => (
                          <code className="bg-purple-100 px-2 py-1 rounded text-sm font-mono text-purple-800">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-purple-50 p-3 rounded text-sm overflow-x-auto">
                            {children}
                          </pre>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-purple-300 pl-4 italic bg-purple-50 py-2">
                            {children}
                          </blockquote>
                        )
                      }}
                    >
                      {podcastData.data?.content || podcastData.message || podcastData.content || '今日新闻播客内容加载中...'}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>

            {/* 音频播放器 - 只在有音频链接时显示 */}
            {podcastData.audioUrl && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={handlePlayPause}
                    className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="w-4 h-4 text-gray-500" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{formatTime(currentTime)}</span>
                      <div className="flex-1 relative">
                        <div
                          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
                          onClick={handleSeek}
                        >
                          <div
                            className="h-full bg-purple-500 rounded-full transition-all"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {isPlaying ? '正在播放今日新闻播客...' : '点击播放按钮开始收听'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    音频链接: {podcastData.audioUrl}
                  </p>
                </div>
              </div>
            )}

            {/* 功能提示 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">使用提示</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 播客内容由AI智能生成，包含最新热点新闻</li>
                <li>• 支持音频播放、音量调节和进度控制</li>
                <li>• 点击刷新按钮可重新生成最新播客</li>
                <li>• 新闻内容支持Markdown格式，包含链接和格式化文本</li>
                <li>• 音频链接会自动与播放器集成</li>
              </ul>
            </div>
          </div>
        ) : hasInitialized && (
          <div className="text-center text-gray-500 py-8">
            <Volume2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>暂无播客内容</p>
            <button
              onClick={fetchPodcast}
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              重新生成播客
            </button>
          </div>
        )}
      </div>

      {/* 隐藏的音频元素 */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default PodcastInterface;
