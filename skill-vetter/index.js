/**
 * Skill-Vetter: 安全审计官
 * 自动扫描第三方技能代码，检测恶意程序、越权操作、隐私窃取风险
 */

const RISKY_PATTERNS = [
  /eval\s*\(/,                          // eval执行
  /exec\s*\(/,                          // 命令执行
  /child_process/,                      // 子进程
  /require\s*\(\s*['"]child_process['"]/, // 引入子进程模块
  /process\.env/,                       // 访问环境变量
  /fs\.readFile.*password/,             // 读取密码文件
  /crypto\.crypto/,                     // 加密相关
  /https?:\/\/.*\.exe/,                 // 下载可执行文件
  /\.sendKeys/,                         // 键盘记录
  /screenshot/,                         // 屏幕截图窃取
];

const RISKY_PERMISSIONS = [
  'admin', 'root', 'sudo', 'elevated',
  'file:write:*', 'file:delete:*',
  'network:external:*', 'exec:*'
];

function scanSkill(skillPath) {
  const results = {
    passed: true,
    risks: [],
    warnings: [],
    score: 100
  };

  // 检查危险模式
  RISKY_PATTERNS.forEach(pattern => {
    if (pattern.test(skillPath)) {
      results.risks.push(`发现危险模式: ${pattern}`);
      results.passed = false;
      results.score -= 50;
    }
  });

  // 检查权限申请
  RISKY_PERMISSIONS.forEach(perm => {
    if (skillPath.includes(perm)) {
      results.warnings.push(`敏感权限: ${perm}`);
      results.score -= 10;
    }
  });

  return results;
}

module.exports = {
  name: "Skill-Vetter",
  description: "安全审计官 - 安装新技能前自动检测",
  scanSkill
};
