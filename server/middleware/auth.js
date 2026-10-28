const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  let token;
  // 从请求头拿token，格式 Bearer xxxxx
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // 解密token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // 把用户信息挂载到req上（后面 req.user 就能拿到用户）
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      return res.status(401).json({msg: 'token无效，请重新登录'});
    }
  }
  if (!token) {
    return res.status(401).json({msg: '没有token，未授权'});
  }
};

module.exports = authMiddleware;
