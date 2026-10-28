import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useAuth } from '../context/AuthContext'

export default function BlogDetail() {
  const { id } = useParams()
  const { token } = useAuth()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = useCallback(async () => {
    try {
      const res = await api.get(`/api/blog/${id}`)
      setPost(res.data)
      setComments(res.data.comments || [])
    } catch (e) {
      setError('文章加载失败')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadData()
  }, [loadData])

  const submitComment = async (e) => {
    e.preventDefault()
    if (!token) return alert('登录后才可以发表评论')
    try {
      // token 会由 axios 拦截器自动附加到请求头
      await api.post(`/api/blog/${id}/comments`, { body: commentText })
      setCommentText('')
      loadData()
    } catch (err) {
      alert(err.response?.data?.message || '评论失败')
    }
  }

  if (loading) return <div className="container"><p className="text-muted">Loading...</p></div>
  if (error) return <div className="container"><p className="alert alert-error">{error}</p></div>
  if (!post) return <div className="container"><p className="text-muted">文章不存在</p></div>

  return (
    <div className="container">
      <Link to="/blog" className="text-muted" style={{fontSize:"0.9rem"}}>← 返回博客列表</Link>

      <article className="card" style={{marginTop:"1rem"}}>
        <h1>{post.title}</h1>
        <p className="card-meta">
          作者：{post.author?.username || '未知'} · {new Date(post.createdAt).toLocaleString()}
        </p>
        <div style={{whiteSpace:"pre-wrap"}}>{post.content}</div>
      </article>

      <section style={{marginTop:"2rem"}}>
        <h3>评论区（{comments.length}）</h3>
        {token ? (
          <form onSubmit={submitComment} style={{margin:"1rem 0"}}>
            <div className="form-group">
              <textarea
                className="textarea"
                value={commentText}
                onChange={e=>setCommentText(e.target.value)}
                placeholder="写评论..."
                rows="3"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">提交评论</button>
          </form>
        ) : (
          <p className="text-muted"><Link to="/login">登录</Link> 后才可以写评论</p>
        )}

        <div style={{display:"flex", flexDirection:"column", gap:"0.75rem"}}>
          {comments.map(c => (
            <div key={c._id} className="card" style={{padding:"1rem"}}>
              <p className="card-meta">
                <strong>{c.author?.username || '未知'}</strong> · {new Date(c.createdAt).toLocaleString()}
              </p>
              <p>{c.body}</p>
            </div>
          ))}
          {comments.length === 0 && <p className="text-muted">还没有评论，来抢沙发</p>}
        </div>
      </section>
    </div>
  )
}
