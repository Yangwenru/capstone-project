import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosInstance'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/api/users/login', form)
      // 保存 token + 用户信息（用于导航栏显示用户名）
      login(res.data.token, { _id: res.data._id, username: res.data.username, email: res.data.email })
      navigate('/admin') // 登录成功跳后台
    } catch (err) {
      setError(err.response?.data?.message || '账号或者密码错误！')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <h2>登录</h2>
        {error && <p className="alert alert-error">{error}</p>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>邮箱</label>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={e=>setForm({...form, email:e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>密码</label>
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={e=>setForm({...form, password:e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <p className="text-muted" style={{marginTop:"1rem", fontSize:"0.9rem"}}>
          还没有账号？<Link to="/register">去注册</Link>
        </p>
      </div>
    </div>
  )
}
