import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axiosInstance'

export default function Register() {
  // 注意：后端 User 模型要求 username 必填且唯一，漏掉会注册失败
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/api/users/register', form)
      alert('注册成功！去登录')
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || '注册失败！')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <h2>注册</h2>
        {error && <p className="alert alert-error">{error}</p>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>用户名</label>
            <input
              className="input"
              type="text"
              value={form.username}
              onChange={e=>setForm({...form, username:e.target.value})}
              required
            />
          </div>
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
            <label>密码（至少 6 位）</label>
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={e=>setForm({...form, password:e.target.value})}
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
        <p className="text-muted" style={{marginTop:"1rem", fontSize:"0.9rem"}}>
          已有账号？<Link to="/login">去登录</Link>
        </p>
      </div>
    </div>
  )
}
