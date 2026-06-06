# Code-Reviewer 代码审查

## 功能
- 自动检测代码漏洞
- 语法错误检测
- 性能瓶颈识别
- 提供优化方案
- 支持多种语言

## 支持语言
- Python
- JavaScript / TypeScript
- Java
- C++
- Go

## 使用方法

```javascript
const CodeReviewer = require('./index');

const reviewer = new CodeReviewer();

// 审查代码
const results = await reviewer.review(codeString, 'javascript');

// 结果
console.log(results.score);        // 分数
console.log(results.issues);       // 问题列表
console.log(results.suggestions); // 建议
console.log(results.summary);      // 总结
```

## 检测范围

### 安全
- eval/exec 使用
- XSS风险
- 硬编码密码/API Key
- SQL注入

### 性能
- 循环内重复计算
- 未使用变量
- 内存泄漏

### 代码风格
- 函数过长
- 命名不规范
- 注释缺失

## 安装
```
openclaw skills install code-reviewer
```
