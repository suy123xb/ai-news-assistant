import React from 'react';

/**
 * 全局 UI 主题色配置
 * 修改此文件即可统一更换全站颜色风格（当前为浅蓝色）
 */
export const theme = {
  // ---------- 页面与布局 ----------
  pageBg: 'bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50',
  headerBg: 'bg-gradient-to-r from-sky-600 to-blue-600 text-white p-4 rounded-t-lg',
  headerSubtext: 'text-blue-100',
  footerBg: 'bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 border-t border-blue-200',

  // ---------- 卡片 ----------
  cardBorder: 'border border-blue-200',
  cardHeaderBg: 'bg-gradient-to-r from-blue-50 to-sky-50 p-4 border-b border-blue-200',

  // ---------- 按钮 ----------
  buttonPrimary: 'px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors',
  buttonPrimaryLg: 'px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-lg',
  buttonPrimaryRounded: 'w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors shadow-lg',
  buttonSecondary: 'px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors',

  // ---------- 图标与链接 ----------
  iconPrimary: 'text-sky-600',
  iconPrimaryLg: 'text-sky-500',
  iconButton: 'p-2 text-sky-600 hover:bg-sky-50 rounded-full transition-colors',
  link: 'text-sky-600 hover:text-sky-800 underline transition-colors',

  // ---------- 加载动画 ----------
  loader: 'text-sky-600',

  // ---------- 进度条 ----------
  progressBar: 'bg-sky-500',

  // ---------- 使用提示框 ----------
  tipBox: 'bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl shadow-lg border border-blue-200 p-4',
  tipBoxTitle: 'font-semibold text-slate-800 mb-3',
  tipBoxText: 'text-sm text-slate-700 space-y-2',

  // ---------- Markdown 内容区（播客/推送页） ----------
  markdown: {
    h1: 'text-xl font-bold mb-4 text-slate-800',
    h2: 'text-lg font-semibold mb-3 text-slate-700',
    h3: 'text-md font-medium mb-3 text-slate-600',
    strong: 'font-semibold text-slate-800',
    em: 'italic text-slate-700',
    a: 'text-sky-600 hover:text-sky-800 underline transition-colors',
    code: 'bg-sky-50 px-2 py-1 rounded text-sm font-mono text-slate-800',
    pre: 'bg-sky-50/50 p-3 rounded text-sm overflow-x-auto border border-blue-200',
    blockquote: 'border-l-4 border-sky-300 pl-4 italic bg-sky-50/50 py-3 rounded-r',
  },

  // ---------- 对话页（ChatInterface） ----------
  chatAvatar: 'bg-gradient-to-br from-sky-400 to-blue-500',
  chatUserBubble: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white',
  chatUserTimestamp: 'text-sky-100',
  chatBotAvatar: 'bg-sky-50',
  chatBotIcon: 'text-sky-600',
  chatSendButton: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl hover:from-sky-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md',
  chatSendButtonFocus: 'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent',
  chatLoadingDots: 'bg-sky-400',

  // ---------- 全局布局（App.js 导航等） ----------
  appLogo: 'bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent',
  navActive: 'bg-sky-100 text-sky-700',
  navInactive: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
};

/**
 * 根据 theme.markdown 生成 ReactMarkdown 的 components 配置
 * 用于播客、每日推送等页面的正文渲染
 */
export function getMarkdownComponents() {
  const md = theme.markdown;
  return {
    p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
    h1: ({ children }) => <h1 className={md.h1}>{children}</h1>,
    h2: ({ children }) => <h2 className={md.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={md.h3}>{children}</h3>,
    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
    li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
    strong: ({ children }) => <strong className={md.strong}>{children}</strong>,
    em: ({ children }) => <em className={md.em}>{children}</em>,
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className={md.a}>
        {children}
      </a>
    ),
    code: ({ children }) => <code className={md.code}>{children}</code>,
    pre: ({ children }) => <pre className={md.pre}>{children}</pre>,
    blockquote: ({ children }) => <blockquote className={md.blockquote}>{children}</blockquote>,
  };
}

/** 合并 class 字符串，便于与局部 class 拼接 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
