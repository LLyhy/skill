/**
 * Notion-Sync: 双向同步
 * 打通OpenClaw与Notion知识库
 */

const https = require('https');

class NotionSync {
  constructor(apiKey, databaseId = null) {
    this.apiKey = apiKey;
    this.databaseId = databaseId;
    this.baseUrl = 'api.notion.com';
    this.version = '2022-06-28';
  }

  async createPage(properties, children = []) {
    return this.makeRequest('/pages', 'POST', {
      parent: { database_id: this.databaseId },
      properties,
      children
    });
  }

  async updatePage(pageId, properties) {
    return this.makeRequest(`/pages/${pageId}`, 'PATCH', {
      properties
    });
  }

  async queryDatabase(databaseId = this.databaseId, filter = null) {
    const payload = {};
    if (filter) {
      payload.filter = filter;
    }
    return this.makeRequest(`/databases/${databaseId}/query`, 'POST', payload);
  }

  async getPage(pageId) {
    return this.makeRequest(`/pages/${pageId}`, 'GET');
  }

  async createDatabase(parentPageId, title, properties) {
    return this.makeRequest('/databases', 'POST', {
      parent: { type: 'page_id', page_id: parentPageId },
      title: [{ type: 'text', text: { content: title } }],
      properties
    });
  }

  async archivePage(pageId) {
    return this.makeRequest(`/pages/${pageId}`, 'PATCH', {
      archived: true
    });
  }

  async makeRequest(endpoint, method = 'GET', payload = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.baseUrl,
        port: 443,
        path: `/v1${endpoint}`,
        method,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Notion-Version': this.version,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        });
      });

      req.on('error', reject);

      if (payload) {
        req.write(JSON.stringify(payload));
      }

      req.end();
    });
  }

  // 工具方法：创建文本块
  createTextBlock(text, annotations = {}) {
    return {
      type: 'paragraph',
      paragraph: {
        rich_text: [{
          type: 'text',
          text: { content: text },
          annotations
        }]
      }
    };
  }

  // 工具方法：创建标题块
  createHeadingBlock(text, level = 1) {
    return {
      type: `heading_${level}`,
      [`heading_${level}`]: {
        rich_text: [{ type: 'text', text: { content: text } }]
      }
    };
  }

  // 工具方法：创建待办块
  createTodoBlock(text, checked = false) {
    return {
      type: 'to_do',
      to_do: {
        rich_text: [{ type: 'text', text: { content: text } }],
        checked
      }
    };
  }

  // 快速保存笔记
  async quickNote(title, content) {
    return this.createPage({
      title: {
        title: [{ text: { content: title } }]
      }
    }, [
      this.createTextBlock(content)
    ]);
  }
}

module.exports = NotionSync;
