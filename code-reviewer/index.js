/**
 * Code-Reviewer: 代码审查
 * 自动检测代码漏洞、语法错误、性能瓶颈
 */

class CodeReviewer {
  constructor() {
    this.rules = {
      security: this.securityRules,
      performance: this.performanceRules,
      style: this.styleRules,
      bestPractices: this.bestPracticeRules
    };
  }

  async review(code, language = 'javascript') {
    const results = {
      score: 100,
      issues: [],
      suggestions: [],
      summary: ''
    };

    // 安全检查
    const securityIssues = this.checkSecurity(code, language);
    results.issues.push(...securityIssues);
    results.score -= securityIssues.length * 15;

    // 性能检查
    const perfIssues = this.checkPerformance(code, language);
    results.issues.push(...perfIssues);
    results.score -= perfIssues.length * 10;

    // 代码风格
    const styleIssues = this.checkStyle(code, language);
    results.suggestions.push(...styleIssues);
    results.score -= styleIssues.length * 5;

    // 生成总结
    results.summary = this.generateSummary(results);

    return results;
  }

  checkSecurity(code, language) {
    const issues = [];
    const securityPatterns = [
      { pattern: /eval\s*\(/, message: '避免使用eval()，存在安全风险' },
      { pattern: /innerHTML\s*=/, message: '避免直接赋值innerHTML，可能导致XSS' },
      { pattern: /document\.write/, message: '避免使用document.write()' },
      { pattern: /password\s*=\s*['"][^'"]+['"]/, message: '硬编码密码，存在安全隐患' },
      { pattern: /api[_-]?key\s*=\s*['"][^'"]+['"]/, message: '硬编码API Key，建议使用环境变量' },
      { pattern: /SQL\s*\+\s*['"]/, message: 'SQL拼接存在注入风险，建议使用参数化查询' }
    ];

    securityPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(code)) {
        issues.push({
          type: 'security',
          severity: 'high',
          message,
          line: this.findLine(code, pattern)
        });
      }
    });

    return issues;
  }

  checkPerformance(code, language) {
    const issues = [];
    
    // 循环内重复计算
    if (/for\s*\(/.test(code) && /Math\./.test(code)) {
      issues.push({
        type: 'performance',
        severity: 'medium',
        message: '考虑将循环内重复计算移到循环外',
        line: this.findLine(code, /for\s*\(/)
      });
    }

    // 未使用的变量
    const varPattern = /(?:const|let|var)\s+(\w+)/g;
    let match;
    while ((match = varPattern.exec(code)) !== null) {
      const varName = match[1];
      const usageCount = (code.match(new RegExp(`\\b${varName}\\b`, 'g')) || []).length;
      if (usageCount === 1) {
        issues.push({
          type: 'performance',
          severity: 'low',
          message: `变量 '${varName}' 定义后未使用`,
          line: this.findLine(code, new RegExp(`const|let|var\\s+${varName}`))
        });
      }
    }

    return issues;
  }

  checkStyle(code, language) {
    const suggestions = [];
    
    // 未使用分号
    if (language === 'javascript' && /;$/.test(code.trim())) {
      suggestions.push({
        type: 'style',
        message: '考虑使用ES6模块，减少对分号的依赖'
      });
    }

    // 过长的函数
    const functionMatches = code.match(/function\s+\w+\s*\([^)]*\)\s*\{[\s\S]{500,}\}/g);
    if (functionMatches) {
      functionMatches.forEach(fn => {
        suggestions.push({
          type: 'style',
          message: '函数过长，考虑拆分为更小的函数',
          line: this.findLine(code, /function\s+\w+/)
        });
      });
    }

    return suggestions;
  }

  findLine(code, pattern) {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (pattern.test(lines[i])) {
        return i + 1;
      }
    }
    return null;
  }

  generateSummary(results) {
    const { issues, score } = results;
    
    if (score >= 90) {
      return '代码质量优秀！🎉';
    } else if (score >= 70) {
      return '代码质量良好，有少量改进空间';
    } else if (score >= 50) {
      return '代码存在一些问题，建议修复';
    } else {
      return '代码质量问题较多，建议重构';
    }
  }
}

module.exports = CodeReviewer;
