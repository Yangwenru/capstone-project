require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');

// connect MongoDB Atlas
connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio & Blog API is running' });
});

// backend root route (exposed as /api via Netlify redirect)
app.get('/api', (req, res) => {
  res.json({
    name: 'Curious Creations — Portfolio & Blog API',
    version: '1.0.0',
    tech: 'Node.js + Express + MongoDB Atlas (MERN)',
    status: 'ok',
    endpoints: [
      { path: '/api/users/register', method: 'POST', desc: '用户注册' },
      { path: '/api/users/login',    method: 'POST', desc: '用户登录' },
      { path: '/api/users/profile',  method: 'GET',  desc: '当前用户信息（需 token）' },
      { path: '/api/projects',       method: 'GET / POST',  desc: '作品列表 / 新建作品' },
      { path: '/api/projects/:id',   method: 'GET / PUT / DELETE', desc: '单个作品（写操作需 token + 本人）' },
      { path: '/api/blog',            method: 'GET / POST',  desc: '博客列表 / 新建文章' },
      { path: '/api/blog/:id',        method: 'GET / PUT / DELETE', desc: '单篇文章' },
      { path: '/api/blog/:id/comments', method: 'GET / POST', desc: '评论列表 / 发表评论' },
      { path: '/api/contact',        method: 'POST', desc: '提交联系表单' }
    ],
    note: 'POST / PUT / DELETE 接口需要在请求头携带 Authorization: Bearer <token>'
  });
});

// mount routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

// central error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
