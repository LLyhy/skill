/**
 * Doc-Summarizer: 文档总结
 * PDF、Word、TXT、网页链接内容解析
 */

const fs = require('fs');
const path = require('path');

class DocSummarizer {
  constructor() {
    this.supportedFormats = ['.txt', '.md', '.pdf', '.doc', '.docx'];
  }

  async summarize(content, options = {}) {
    const {
      maxLength = 500,
      format = 'bullets',
      extractKeyPoints = true
    } = options;

    // 简单的摘要逻辑（实际项目中可以接入LLM API）
    const sentences = this.splitSentences(content);
    const keySentences = this.extractKeySentences(sentences);
    
    if (format === 'bullets') {
      return this.toBulletPoints(keySentences, maxLength);
    } else {
      return this.toParagraph(keySentences, maxLength);
    }
  }

  splitSentences(text) {
    return text
      .replace(/[.。!！?？]\s*/g, '|')
      .split('|')
      .filter(s => s.trim().length > 10);
  }

  extractKeySentences(sentences) {
    // 简单的关键词权重计算
    const keywords = ['重要', '关键', '核心', '主要', '必须', '建议', '总结'];
    
    return sentences
      .map(sentence => {
        let score = sentence.length / 100; // 基础分数
        keywords.forEach(kw => {
          if (sentence.includes(kw)) score += 1;
        });
        return { sentence, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.sentence);
  }

  toBulletPoints(sentences, maxLength) {
    return sentences.map((s, i) => `${i + 1}. ${s.trim()}`).join('\n');
  }

  toParagraph(sentences, maxLength) {
    const text = sentences.join(' ');
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  async extractFromFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    
    if (!this.supportedFormats.includes(ext)) {
      throw new Error(`不支持的格式: ${ext}`);
    }

    let content;
    
    if (ext === '.txt' || ext === '.md') {
      content = fs.readFileSync(filePath, 'utf8');
    } else {
      // 其他格式的简单处理
      content = fs.readFileSync(filePath, 'utf8').substring(0, 10000);
    }

    return this.summarize(content);
  }

  extractHeadings(content) {
    const headingRegex = /^#{1,6}\s+(.+)$/gm;
    const headings = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        level: match[0].indexOf(' '),
        text: match[1]
      });
    }

    return headings;
  }

  generateOutline(content) {
    const headings = this.extractHeadings(content);
    return headings.map(h => '  '.repeat(h.level - 1) + `- ${h.text}`).join('\n');
  }
}

module.exports = DocSummarizer;
