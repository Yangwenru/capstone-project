# Full-Stack Portfolio & Blog Application

MERN 技术栈（MongoDB Atlas + Express + React + Node.js）个人作品集与博客系统 —— Web Data Management and Application 课程 Capstone 项目。

## Live Demo

- **前端：** https://your-frontend-url.vercel.app （部署后替换）
- **后端 API：** https://your-backend-url.onrender.com （部署后替换）

## 项目结构

```
CapstoneProject/
├── server/                  # 后端 API（MVC 结构）
│   ├── config/db.js         # MongoDB Atlas 连接
│   ├── models/              # User / Project / BlogPost / Comment / Message
│   ├── controllers/         # 业务逻辑
│   ├── routes/              # 路由
│   ├── middleware/          # authMiddleware(JWT protect) + errorMiddleware(统一错误处理)
│   ├── .env                 # 环境变量（不上传/不上传 git）
│   └── server.js            # 入口
└── client/                  # 前端 React SPA（Vite）
    └── src/
        ├── api/axiosInstance.js   # axios 实例（自动附加 JWT）
        ├── context/AuthContext.jsx # 全局登录状态（Context API）
        ├── components/            # Header / Footer
        └── pages/                 # Home / Projects / Blog / BlogDetail / Contact / Login / Register / Admin
```

## API 端点一览

Base URL：本地 `http://localhost:5000`，线上为部署后的后端地址。
受保护路由需要请求头：`Authorization: Bearer <JWT>`

### 用户认证
| 方法 | 端点 | 权限 | 说明 | Body |
|---|---|---|---|---|
| POST | `/api/users/register` | 公开 | 注册（bcrypt 加密密码） | `{ username, email, password }` |
| POST | `/api/users/login` | 公开 | 登录，返回 JWT | `{ email, password }` |

### 作品集项目
| 方法 | 端点 | 权限 | 说明 | Body |
|---|---|---|---|---|
| GET | `/api/projects` | 公开 | 全部项目 | — |
| GET | `/api/projects/:id` | 公开 | 单个项目 | — |
| POST | `/api/projects` | 登录 | 新建项目（关联当前用户） | `{ title, description, imageUrl?, repoUrl?, liveUrl? }` |
| PUT | `/api/projects/:id` | 登录 | 更新项目 | 任意项目字段 |
| DELETE | `/api/projects/:id` | 登录 | 删除项目 | — |

### 联系表单
| 方法 | 端点 | 权限 | 说明 | Body |
|---|---|---|---|---|
| POST | `/api/contact` | 公开 | 保存留言到数据库 | `{ name, email, message }` |

### 博客
| 方法 | 端点 | 权限 | 说明 | Body |
|---|---|---|---|---|
| GET | `/api/blog` | 公开 | 全部文章（含作者名） | — |
| GET | `/api/blog/:id` | 公开 | 单篇文章 + 全部评论 | — |
| POST | `/api/blog` | 登录 | 发布文章 | `{ title, content }` |
| PUT | `/api/blog/:id` | 仅作者 | 更新文章（非作者返回 403） | `{ title?, content? }` |
| DELETE | `/api/blog/:id` | 仅作者 | 删除文章（非作者返回 403） | — |

### 评论
| 方法 | 端点 | 权限 | 说明 | Body |
|---|---|---|---|---|
| GET | `/api/blog/:postId/comments` | 公开 | 某文章的全部评论 | — |
| POST | `/api/blog/:postId/comments` | 登录 | 发表评论 | `{ body }` |

## 本地运行

### 1. 后端

```bash
cd server
npm install
```

确认 `server/.env` 配置齐全：

```
PORT=5000
MONGO_URI=<你的 MongoDB Atlas 连接串>
JWT_SECRET=<任意长随机字符串>
NODE_ENV=development
```

启动：

```bash
npm run dev    # nodemon 热重载
# 或 npm start
```

### 2. 前端

```bash
cd client
npm install
```

新建 `client/.env`（参考 `.env.example`）：

```
VITE_API_URL=http://localhost:5000
```

启动：

```bash
npm run dev
```

浏览器打开 Vite 输出的地址（默认 http://localhost:5173）。先到 `/register` 注册账号，登录后进入 `/admin` 管理项目和博客。

## 部署

### 后端 → Render
1. 代码推送到 GitHub
2. Render → New Web Service，Root Directory 填 `server`
3. Build Command: `npm install`，Start Command: `npm start`
4. 环境变量添加：`MONGO_URI`、`JWT_SECRET`、`NODE_ENV=production`
5. MongoDB Atlas → Network Access 放行 `0.0.0.0/0`

### 前端 → Vercel / Netlify
1. 导入仓库，Root Directory 选 `client`
2. 框架选 Vite，Build Command `npm run build`，输出目录 `dist`
3. 环境变量添加：`VITE_API_URL=<后端线上地址>`
4. 部署即可，前端所有请求都会发往线上后端
