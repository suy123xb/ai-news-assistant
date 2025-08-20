import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownDemo = () => {
  const demoMarkdown = `# AI新闻助手 Markdown 演示

这是一个演示 **Markdown 渲染功能** 的测试页面。

## 支持的功能

### 文本格式
- **粗体文本**
- *斜体文本*
- ~~删除线文本~~
- \`行内代码\`

### 列表
1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3

无序列表：
- 无序列表项 A
- 无序列表项 B
- 无序列表项 C

### 链接
[访问 GitHub](https://github.com)

### 引用
> 这是一个引用块，用于显示重要信息或引用内容。

### 代码块
\`\`\`javascript
const message = "Hello, World!";
console.log(message);
\`\`\`

### 新闻示例
以下是今日AI新闻：

- **OpenAI在印度推出ChatGPT Go新订阅计划，月费仅 5 美元**
  **摘要:** 近日，OpenAI宣布在印度等部分地区推出ChatGPT Go订阅计划，用户约每月花5美元可体验GPT-5模型。
  **链接:** [https://www.aibase.com/news/20611](https://www.aibase.com/news/20611)

- **Meta内部文件曝光:AI被允许与未成年人"性感对话"引发轩然大波**
  **摘要:** 随着人工智能竞赛激烈，Meta采取激进策略，但其超200页内部文件显示相关问题。
  **链接:** [https://www.aibase.com/news/20612](https://www.aibase.com/news/20612)

---

*这就是 Markdown 渲染的效果！*`;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-blue-800">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 text-blue-700">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-medium mb-2 text-blue-600">{children}</h3>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold text-blue-800">{children}</strong>,
            em: ({ children }) => <em className="italic text-blue-700">{children}</em>,
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
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-gray-800">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-300 pl-4 italic bg-blue-50 py-2">
                {children}
              </blockquote>
            )
          }}
        >
          {demoMarkdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownDemo;
