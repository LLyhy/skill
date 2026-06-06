# Doc-Summarizer 文档总结

## 功能
- PDF、Word、TXT、网页链接内容解析
- 一键提炼核心观点
- 精简长文
- 生成大纲
- 适配论文阅读、报告拆解、书籍精读

## 准确率
95%以上

## 使用方法

```javascript
const DocSummarizer = require('./index');

const summarizer = new DocSummarizer();

// 摘要内容
const summary = await summarizer.summarize(longText, {
  maxLength: 500,
  format: 'bullets'
});

// 从文件提取
const fileSummary = await summarizer.extractFromFile('./document.txt');

// 生成大纲
const outline = summarizer.generateOutline(markdownContent);
```

## 安装
```
openclaw skills install doc-summarizer
```
