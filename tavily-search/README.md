# Tavily-Web-Search 实时联网搜索

## 功能
- 接入全网实时数据
- 精准查询资讯、数据、政策、攻略
- 支持结果筛选与来源核验
- 信息真实可靠，无虚假内容

## 使用场景
- 查询最新资讯
- 数据调研
- 政策解读
- 攻略查找

## 使用方法

```javascript
const TavilySearch = require('./index');

const search = new TavilySearch('你的API-KEY');

// 基础搜索
const results = await search.search('AI工具推荐');

// 使用模板
const news = await search.templates.news('科技');
const guide = await search.templates.guide('写作');
```

## 安装
```
openclaw skills install tavily-search
```

## API Key申请
访问 https://tavily.com 注册获取免费的API Key
