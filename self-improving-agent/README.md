# Self-Improving-Agent 自我进化

## 功能
- 内置长期记忆模块
- 记录用户使用习惯
- 记录指令偏好
- 越用越贴合需求
- 自动优化回复逻辑

## 安装量
突破35万次安装

## 使用方法

```javascript
const SelfImprovingAgent = require('./index');

const agent = new SelfImprovingAgent('./memory');

// 记录交互
agent.recordInteraction(
  '帮我写一篇关于AI的文章',
  '好的，我来帮你写...',
  { topic: 'AI', type: 'writing' }
);

// 获取个性化上下文
const context = agent.getPersonalizedContext();
console.log(context);

// 学习新偏好
agent.learnPreference('responseStyle', 'detailed');
```

## 安装
```
openclaw skills install self-improving-agent
```

## 存储内容
- 用户档案 (profile.json)
- 偏好设置 (preferences.json)
- 交互历史 (interactions.json)
