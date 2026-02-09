import React from 'react';
import { Newspaper, Loader2, RefreshCw, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useDigest } from '../contexts/DigestContext';
import { theme, getMarkdownComponents } from '../theme/colors';

const NewsDigestInterface = () => {
  const {
    digestData,
    isLoading,
    lastUpdated,
    error,
    fetchDigest,
  } = useDigest();

  const rawContent = digestData?.data?.content ?? digestData?.content ?? digestData?.message ?? '';
  const hasError = digestData?.isError || error;
  const hasContent = rawContent && !hasError;
  // 将单个换行转为 Markdown 硬换行，避免链接标题与摘要挤在同一行
  const content = hasContent
    ? rawContent.replace(/(?<!\n)\n(?!\n)/g, '  \n')
    : rawContent;

  return (
    <div className={`flex flex-col min-h-screen ${theme.pageBg}`}>
      {/* 头部：Logo + 文案 */}
      <div className={theme.headerBg}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">今日推送</h2>
            <p className={`${theme.headerSubtext} text-xs`}>Daily Digest</p>
          </div>
        </div>
        <p className="text-sm mt-2 opacity-95">
          快速了解今日AI新闻大事
        </p>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[280px]">
            <Loader2 className={`w-12 h-12 ${theme.loader} animate-spin mb-4`} />
            <p className="text-slate-600">正在生成今日推送，您可先切换至其他功能</p>
          </div>
        ) : !digestData ? (
          <div className="flex flex-col items-center justify-center min-h-[280px] text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center mb-4 border border-blue-200">
              <Newspaper className={`w-8 h-8 ${theme.iconPrimaryLg}`} />
            </div>
            <p className="text-slate-600 mb-6">点击下方按钮，一键生成当日新闻摘要</p>
            <button onClick={fetchDigest} className={`${theme.buttonPrimaryLg} flex items-center gap-2`}>
              <Newspaper className="w-5 h-5" />
              生成今日推送
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`bg-white rounded-xl shadow-lg ${theme.cardBorder} overflow-hidden`}>
              <div className={theme.cardHeaderBg}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-800">今日推送内容</h3>
                  <button
                    onClick={fetchDigest}
                    disabled={isLoading}
                    className={`${theme.iconButton} disabled:opacity-50`}
                    title="重新生成"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
                {lastUpdated && (
                  <div className="flex items-center gap-4 text-sm text-slate-600">
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
              </div>

              <div className="p-4">
                {hasError ? (
                  <p className="text-red-600">{error || rawContent}</p>
                ) : (
                  <div className="prose prose-sm max-w-none digest-content">
                    <ReactMarkdown components={getMarkdownComponents()}>
                      {hasContent ? content : '暂无内容'}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>

            <div className={theme.tipBox}>
              <h4 className={theme.tipBoxTitle}>使用说明</h4>
              <ul className={theme.tipBoxText}>
                <li>• 内容由 Coze 工作流生成，包含当日热点与摘要</li>
                <li>• 支持 Markdown 格式；生成过程中可切换至对话或播客，不会中断</li>
                <li>• 点击右上角刷新可重新生成最新推送</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className={theme.footerBg}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-slate-600">
            <p className="text-sm">
              © 2025 AI新闻助手 · 今日推送由 Coze AI 生成 · Designed by Suy
            </p>
            <p className="text-xs mt-2 text-slate-500">
              智能新闻对话 | 每日播客播报 | 每日新闻推送
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDigestInterface;
