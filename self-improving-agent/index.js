/**
 * Self-Improving-Agent: 自我进化
 * 记录用户使用习惯、指令偏好，越用越聪明
 */

const fs = require('fs');
const path = require('path');

class SelfImprovingAgent {
  constructor(memoryDir = './memory') {
    this.memoryDir = memoryDir;
    this.userProfile = this.loadProfile();
    this.preferences = this.loadPreferences();
    this.interactionHistory = [];
    this.ensureMemoryDir();
  }

  ensureMemoryDir() {
    if (!fs.existsSync(this.memoryDir)) {
      fs.mkdirSync(this.memoryDir, { recursive: true });
    }
  }

  loadProfile() {
    const profilePath = path.join(this.memoryDir, 'profile.json');
    if (fs.existsSync(profilePath)) {
      return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
    }
    return {
      name: 'User',
      createdAt: new Date().toISOString(),
      interactions: 0,
      topics: [],
      style: 'default'
    };
  }

  loadPreferences() {
    const prefsPath = path.join(this.memoryDir, 'preferences.json');
    if (fs.existsSync(prefsPath)) {
      return JSON.parse(fs.readFileSync(prefsPath, 'utf8'));
    }
    return {
      responseStyle: 'concise', // concise | detailed
      language: '中文',
      format: 'text',
      topics: []
    };
  }

  saveProfile() {
    const profilePath = path.join(this.memoryDir, 'profile.json');
    fs.writeFileSync(profilePath, JSON.stringify(this.userProfile, null, 2));
  }

  savePreferences() {
    const prefsPath = path.join(this.memoryDir, 'preferences.json');
    fs.writeFileSync(prefsPath, JSON.stringify(this.preferences, null, 2));
  }

  // 记录交互
  recordInteraction(input, output, context = {}) {
    this.interactionHistory.push({
      timestamp: new Date().toISOString(),
      input,
      output,
      context
    });

    this.userProfile.interactions++;
    this.updateProfile(input, output);
    this.inferPreferences(input, output);

    // 每10次交互保存一次
    if (this.userProfile.interactions % 10 === 0) {
      this.saveProfile();
      this.savePreferences();
    }
  }

  updateProfile(input, output) {
    // 分析输入中的主题
    const words = input.match(/[\u4e00-\u9fa5a-zA-Z]+/g) || [];
    words.forEach(word => {
      if (!this.userProfile.topics.includes(word)) {
        this.userProfile.topics.push(word);
      }
    });

    // 限制主题数量
    if (this.userProfile.topics.length > 100) {
      this.userProfile.topics = this.userProfile.topics.slice(-100);
    }
  }

  inferPreferences(input, output) {
    // 从交互中推断偏好
    if (input.length > 500) {
      this.preferences.responseStyle = 'concise';
    } else if (input.length < 50) {
      this.preferences.responseStyle = 'detailed';
    }
  }

  // 获取个性化回复
  getPersonalizedContext() {
    return {
      profile: this.userProfile,
      preferences: this.preferences,
      recentTopics: this.userProfile.topics.slice(-10),
      interactionCount: this.userProfile.interactions
    };
  }

  // 学习新偏好
  learnPreference(key, value) {
    this.preferences[key] = value;
    this.savePreferences();
  }

  // 获取记忆摘要
  getMemorySummary() {
    return {
      totalInteractions: this.userProfile.interactions,
      topTopics: this.userProfile.topics.slice(-20),
      preferences: this.preferences,
      memorySize: this.interactionHistory.length
    };
  }
}

module.exports = SelfImprovingAgent;
