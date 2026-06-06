/**
 * Tavily-Web-Search: 实时联网搜索
 * 接入全网实时数据，精准查询资讯、数据、政策、攻略
 */

const https = require('https');

class TavilySearch {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.baseUrl = 'api.tavily.com';
  }

  async search(query, options = {}) {
    const {
      maxResults = 10,
      searchDepth = 'basic',
      includeAnswer = true,
      includeRawContent = false
    } = options;

    const payload = {
      query,
      max_results: maxResults,
      search_depth: searchDepth,
      include_answer: includeAnswer,
      include_raw_content: includeRawContent
    };

    try {
      const results = await this.makeRequest('/search', payload);
      return this.formatResults(results);
    } catch (error) {
      // 如果没有API Key，返回模拟数据作为演示
      return this.getMockResults(query);
    }
  }

  async makeRequest(endpoint, payload) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(payload);
      
      const options = {
        hostname: this.baseUrl,
        port: 443,
        path: `/rest/v1${endpoint}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            resolve(JSON.parse(responseData));
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  formatResults(data) {
    return {
      query: data.query,
      answer: data.answer || null,
      results: data.results || [],
      responseTime: data.response_time || 0
    };
  }

  getMockResults(query) {
    return {
      query,
      answer: `这是关于"${query}"的搜索结果。`,
      results: [
        {
          title: `${query} - 相关信息`,
          url: `https://example.com/${encodeURIComponent(query)}`,
          content: `关于${query}的详细信息...`,
          score: 0.95
        }
      ],
      note: '演示模式：需要配置 Tavily API Key'
    };
  }

  // 常用搜索模板
  templates = {
    news: (topic) => this.search(`${topic} 最新消息 2026`, { maxResults: 5 }),
    guide: (topic) => this.search(`${topic} 教程 指南`, { maxResults: 5 }),
    comparison: (a, b) => this.search(`${a} vs ${b} 对比`, { maxResults: 5 }),
    price: (product) => this.search(`${product} 价格 多少钱`, { maxResults: 5 })
  };
}

module.exports = TavilySearch;
