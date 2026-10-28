import { useState, useEffect } from 'react'
import api from '../api/axiosInstance'
import { Link } from 'react-router-dom'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/api/blog')
        setPosts(res.data)
      } catch (e) {
        setError('博客加载失败')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading) return <div className="container"><p className="text-muted">Loading...</p></div>
  if (error) return <div className="container"><p className="alert alert-error">{error}</p></div>

  return (
    <div className="container">
      <h1 className="page-title">博客 Blog</h1>
      {posts.length === 0 && <p className="text-muted">还没有博客文章</p>}
      <div style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
        {posts.map(p => (
          <div key={p._id} className="card">
            <Link to={`/blog/${p._id}`}>
              <h3>{p.title}</h3>
            </Link>
            <p className="card-meta">
              作者：{p.author?.username || '未知'} · {new Date(p.createdAt).toLocaleDateString()}
            </p>
            <p>{p.content.length > 120 ? p.content.substring(0, 120) + '...' : p.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
