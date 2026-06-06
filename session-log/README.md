# Session-Log 操作监控

## 功能
- 自动记录所有执行指令
- 文件操作记录
- 接口调用日志
- 生成可追溯日志
- 异常行为告警

## 使用场景
- 安装新技能前自动检测
- 日常运行实时防护
- 代码安全审计

## 日志记录内容
- 操作时间戳
- 操作类型
- 操作详情
- Session ID

## 安装
```
openclaw skills install session-log
```

## 使用
自动记录所有操作，无需手动调用。
查看日志：`openclaw logs show`
