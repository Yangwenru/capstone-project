import axios from 'axios'

// baseURL 从环境变量读：本地开发在 client/.env 配置 VITE_API_URL=http://localhost:5000
// 部署到 Netlify 后前后端同域，baseURL 为空字符串即可（请求发到本站 /api/*）
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? ''
})

// 请求拦截：每次请求自动带上token
instance.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token')
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截：401自动登出跳转登录
instance.interceptors.response.use(
  res=>res,
  err=>{
    if(err.response && err.response.status === 401){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default instance
