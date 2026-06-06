/**
 * XHS-Content-Generator: 小红书文案生成器
 * 帮助快速生成小红书爆款文案，自动生成标题、内容、标签
 */

const run = function() {
  console.log('XHS-Content-Generator 已加载！');
  return {
    name: 'XHS-Content-Generator',
    version: '1.0.0',
    description: '小红书文案生成器',
    features: ['文案生成', '爆款标题', '标签推荐']
  };
};

module.exports = {
  name: "XHS-Content-Generator",
  description: "小红书文案生成器 - 生成爆款文案",
  run
};
