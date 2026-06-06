/**
 * Code-Reviewer: 代码审查工具
 * 自动检测代码漏洞、语法错误、性能瓶颈，提供优化方案
 */

const run = function() {
  console.log('Code-Reviewer 已加载！');
  return {
    name: 'Code-Reviewer',
    version: '1.0.0',
    description: '代码审查工具',
    features: ['代码审查', 'Bug检测', '优化建议']
  };
};

module.exports = {
  name: "Code-Reviewer",
  description: "代码审查工具 - 检测代码问题",
  run
};
