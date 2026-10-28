import axios from 'axios'

// baseURL 从环境变量读：本地开发走 localhost，部署后走线上后端地址
// 在 client/.env 里配置 VITE_API_URL（参考 .env.example）
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
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
