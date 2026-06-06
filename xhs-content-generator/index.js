
const SKILL_NAME = "小红书文案生成器";

function generateXhsContent(topic) {
  return {
    title: generateTitle(topic),
    content: generateContent(topic),
    tags: generateTags(topic)
  };
}

function generateTitle(topic) {
  const templates = [
    "🔥 这个{topic}绝了！一定要试试",
    "💰 用了{topic}之后，我真的后悔没早发现",
    "✨ 分享我的{topic}心得，看完你会感谢我",
    "💡 {topic}的正确打开方式！收藏起来",
    "👍 普通人也能学会的{topic}技巧，超实用"
  ];
  return pickRandom(templates).replace("{topic}", topic);
}

function generateContent(topic) {
  return `姐妹们！今天一定要和你们分享这个${topic}！

真的太好用了！自从用了它之后，我的效率直接翻倍！

💎 使用感受：
真的是相见恨晚！后悔没早发现！现在每天都离不开！

✨ 推荐理由：
1. 超级简单，新手也能秒上手
2. 性价比超高
3. 效果真的立竿见影

赶紧码住试试！你们一定会回来感谢我的！

#${topic}`;
}

function generateTags(topic) {
  return [
    topic,
    "好物分享",
    "干货分享",
    "经验分享",
    "实用教程",
    "宝藏好物"
  ];
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  name: SKILL_NAME,
  generateXhsContent
};
