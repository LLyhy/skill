/**
 * Session-Log: 操作监控
 * 自动记录所有执行指令、文件操作、接口调用
 */

const fs = require('fs');
const path = require('path');

class SessionLogger {
  constructor(logDir = './logs') {
    this.logDir = logDir;
    this.ensureLogDir();
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  log(action, details = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      action,
      details,
      sessionId: this.getSessionId()
    };

    const logFile = path.join(
      this.logDir,
      `session-${this.getDate()}.log`
    );

    fs.appendFileSync(
      logFile,
      JSON.stringify(logEntry) + '\n',
      'utf8'
    );

    return logEntry;
  }

  getDate() {
    return new Date().toISOString().split('T')[0];
  }

  getSessionId() {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  logFileOperation(operation, filePath, status) {
    return this.log('file_operation', {
      operation,
      filePath,
      status
    });
  }

  logApiCall(endpoint, method, status) {
    return this.log('api_call', {
      endpoint,
      method,
      status
    });
  }

  logCommand(command, args = []) {
    return this.log('command_execution', {
      command,
      args
    });
  }

  getRecentLogs(count = 100) {
    const logFile = path.join(
      this.logDir,
      `session-${this.getDate()}.log`
    );

    if (!fs.existsSync(logFile)) {
      return [];
    }

    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.trim().split('\n').filter(l => l);
    
    return lines.slice(-count).map(line => JSON.parse(line));
  }
}

module.exports = SessionLogger;
