/**
 * Tavily-Search: 实时联网搜索
 * 接入全网实时数据，精准查询资讯、数据、政策、攻略
 */

const run = function() {
  console.log('Tavily-Search 已加载！');
  return {
    name: 'Tavily-Search',
    version: '1.0.0',
    description: '实时联网搜索',
    features: ['网络搜索', '资讯查询', '数据检索']
  };
};

module.exports = {
  name: "Tavily-Search",
  description: "实时联网搜索 - 接入全网实时数据",
  run
};
