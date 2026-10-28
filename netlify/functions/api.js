// Netlify Functions 入口：把 Express 应用包装成 serverless 函数
const serverless = require('serverless-http');
const app = require('../../server/app');

const handler = serverless(app);

// Netlify 重定向后 event.path 形如 /.netlify/functions/api/xxx
// 还原成 Express 能识别的 /api/xxx
module.exports.handler = async (event, context) => {
  const prefix = '/.netlify/functions/api';
  if (event.path && event.path.startsWith(prefix)) {
    event.path = '/api' + event.path.slice(prefix.length);
  }
  return handler(event, context);
};
