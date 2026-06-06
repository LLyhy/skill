# File-Manager-Pro 本地文件管家

## 功能
- 语音/文字指令管理本地文件
- 批量重命名
- 分类归档
- 格式转换
- 内容提取
- 一键整理桌面、文档、下载文件夹

## 支持平台
- Windows
- macOS
- Linux

## 使用方法

```javascript
const FileManagerPro = require('./index');

const fm = new FileManagerPro('./downloads');

// 列出所有文件
const files = fm.listFiles('./downloads');

// 批量重命名
fm.batchRename(files, (name, file) => {
  return `${name}_backup`;
});

// 按类型分类
fm.organizeByType('./downloads', './organized');

// 搜索文件
const results = fm.search('report');

// 获取统计
const stats = fm.getStats();
```

## 安装
```
openclaw skills install file-manager-pro
```
