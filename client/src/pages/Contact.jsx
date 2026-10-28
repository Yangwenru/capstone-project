import { useState } from 'react'
import api from '../api/axiosInstance'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess('')
    setError('')
    setLoading(true)
    try {
      await api.post('/api/contact', form)
      setSuccess('消息发送成功！我会尽快回复你。')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError('发送失败，请稍后再试')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1 className="page-title">联系我 Contact</h1>
      <div className="form-card" style={{margin:0}}>
        {success && <p className="alert alert-success">{success}</p>}
        {error && <p className="alert alert-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>你的名字</label>
            <input
              className="input"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>邮箱</label>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>留言内容</label>
            <textarea
              className="textarea"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '发送中...' : '发送留言'}
          </button>
        </form>
      </div>
    </div>
  )
}
