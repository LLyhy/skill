# Notion-Sync 双向同步

## 功能
- 打通OpenClaw与Notion知识库
- 自动保存笔记、纪要、数据至Notion
- 读取页面内容编辑整理
- 实现知识沉淀
- 跨设备同步

## 适用场景
- 自媒体运营
- 职场人士
- 搭建个人知识库
- 笔记同步

## 使用方法

```javascript
const NotionSync = require('./index');

const notion = new NotionSync('your-notion-api-key', 'database-id');

// 创建页面
await notion.createPage({
  title: { title: [{ text: { content: '会议纪要' } }] }
}, [
  notion.createTextBlock('会议主题：项目进度'),
  notion.createTodoBlock('完成文档', false),
  notion.createHeadingBlock('讨论内容', 2)
]);

// 查询数据库
const results = await notion.queryDatabase();

// 快速保存笔记
await notion.quickNote('灵感', '一个新的产品想法...');
```

## 安装
```
openclaw skills install notion-sync
```

## 获取Notion API Key
1. 访问 https://www.notion.so/my-integrations
2. 创建新的 integration
3. 复制 API Key
