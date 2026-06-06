# 🤖 OpenClaw Skills 集合

本仓库包含多个实用的OpenClaw技能，帮助你快速搭建强大的AI助手！

## 📦 包含的Skill

### 安全必备

#### 1. Skill-Vetter (安全审计官)
**功能**: 自动扫描第三方技能代码，检测恶意程序、越权操作、隐私窃取风险

```bash
openclaw skills install skill-vetter
```

**详细介绍**: [skill-vetter/README.md](skill-vetter/README.md)

---

#### 2. Session-Log (操作监控)
**功能**: 自动记录所有执行指令、文件操作、接口调用，生成可追溯日志

```bash
openclaw skills install session-log
```

**详细介绍**: [session-log/README.md](session-log/README.md)

---

### 效率工具

#### 3. Tavily-Web-Search (实时联网搜索)
**功能**: 接入全网实时数据，精准查询资讯、数据、政策、攻略

```bash
openclaw skills install tavily-search
```

**详细介绍**: [tavily-search/README.md](tavily-search/README.md)

---

#### 4. Self-Improving-Agent (自我进化)
**功能**: 内置长期记忆模块，记录用户使用习惯、指令偏好，越用越贴合需求

```bash
openclaw skills install self-improving-agent
```

**详细介绍**: [self-improving-agent/README.md](self-improving-agent/README.md)

---

### 办公必备

#### 5. File-Manager-Pro (本地文件管家)
**功能**: 支持语音/文字指令管理本地文件，批量重命名、分类归档、格式转换

```bash
openclaw skills install file-manager-pro
```

**详细介绍**: [file-manager-pro/README.md](file-manager-pro/README.md)

---

#### 6. Notion-Sync (双向同步)
**功能**: 打通OpenClaw与Notion知识库，自动保存笔记、纪要、数据

```bash
openclaw skills install notion-sync
```

**详细介绍**: [notion-sync/README.md](notion-sync/README.md)

---

### 创作开发

#### 7. Doc-Summarizer (文档总结)
**功能**: 支持PDF、Word、TXT、网页链接内容解析，一键提炼核心观点

```bash
openclaw skills install doc-summarizer
```

**详细介绍**: [doc-summarizer/README.md](doc-summarizer/README.md)

---

#### 8. Code-Reviewer (代码审查)
**功能**: 自动检测代码漏洞、语法错误、性能瓶颈，提供优化方案

```bash
openclaw skills install code-reviewer
```

**详细介绍**: [code-reviewer/README.md](code-reviewer/README.md)

---

#### 9. XHS-Content-Generator (小红书文案生成器)
**功能**: 帮助快速生成小红书爆款文案，自动生成标题、内容、标签

```bash
openclaw skills install xhs-content-generator
```

**详细介绍**: [xhs-content-generator/README.md](xhs-content-generator/README.md)

---

## 🚀 快速开始

### 方式一：从本仓库导入

1. 克隆本仓库：
```bash
git clone https://github.com/YOUR_USERNAME/openclaw-skills.git
```

2. 在OpenClaw中：
   - 打开"导入技能"
   - 选择"本地路径"或"远程导入"
   - 导入对应的Skill文件夹

### 方式二：逐个安装

在OpenClaw终端中运行：
```bash
openclaw skills install skill-vetter
openclaw skills install session-log
openclaw skills install tavily-search
openclaw skills install self-improving-agent
openclaw skills install file-manager-pro
openclaw skills install notion-sync
openclaw skills install doc-summarizer
openclaw skills install code-reviewer
openclaw skills install xhs-content-generator
```

---

## 📋 推荐安装顺序

1. **必装基础**: `skill-vetter`, `session-log` (安全必备)
2. **效率工具**: `tavily-search`, `self-improving-agent`
3. **办公必备**: `file-manager-pro`, `notion-sync`
4. **创作开发**: `doc-summarizer`, `code-reviewer`
5. **内容创作**: `xhs-content-generator`

---

## 🔧 环境要求

- OpenClaw Desktop v2.0+
- Node.js 18+ (部分技能需要)
- 对应平台的API Key (可选)

---

## 📚 相关资源

- OpenClaw官方文档: https://docs.openclaw.ai
- ClawHub技能市场: https://clawhub.com

---

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

---

**Star ⭐ 支持一下！**
