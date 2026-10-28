import { useState, useEffect } from 'react'
import api from '../api/axiosInstance'

export default function Admin() {
  // token 由 axios 拦截器自动附加到每个请求头（Authorization: Bearer xxx）

  // --------项目 state--------
  const [projects, setProjects] = useState([])
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: ''
  })
  const [editProId, setEditProId] = useState(null)

  // --------博客 state--------
  const [posts, setPosts] = useState([])
  const [blogForm, setBlogForm] = useState({ title: '', content: '' })
  const [editBlogId, setEditBlogId] = useState(null)

  const [error, setError] = useState('')

  // 读取全部项目
  const fetchProjects = async () => {
    const res = await api.get('/api/projects')
    setProjects(res.data)
  }
  // 读取全部博客
  const fetchBlogs = async () => {
    const res = await api.get('/api/blog')
    setPosts(res.data)
  }

  useEffect(() => {
    fetchProjects().catch(() => setError('项目加载失败'))
    fetchBlogs().catch(() => setError('博客加载失败'))
  }, [])

  // 保存项目（新增 / 修改）
  const submitProject = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (editProId) {
        await api.put(`/api/projects/${editProId}`, projectForm)
      } else {
        await api.post('/api/projects', projectForm)
      }
      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' })
      setEditProId(null)
      fetchProjects()
    } catch (err) {
      setError(err.response?.data?.message || '项目保存失败')
    }
  }

  // 编辑项目回填
  const editProject = (item) => {
    setEditProId(item._id)
    setProjectForm({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl || '',
      repoUrl: item.repoUrl || '',
      liveUrl: item.liveUrl || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 删除项目
  const delProject = async (id) => {
    if (!window.confirm('确定删除项目？')) return
    try {
      await api.delete(`/api/projects/${id}`)
      fetchProjects()
    } catch (err) {
      setError(err.response?.data?.message || '删除失败')
    }
  }

  // 保存博客
  const submitBlog = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (editBlogId) {
        await api.put(`/api/blog/${editBlogId}`, blogForm)
      } else {
        await api.post('/api/blog', blogForm)
      }
      setBlogForm({ title: '', content: '' })
      setEditBlogId(null)
      fetchBlogs()
    } catch (err) {
      setError(err.response?.data?.message || '博客保存失败')
    }
  }

  // 编辑博客回填
  const editBlog = (item) => {
    setEditBlogId(item._id)
    setBlogForm({ title: item.title, content: item.content })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 删除博客
  const delBlog = async (id) => {
    if (!window.confirm('确定删除博客？')) return
    try {
      await api.delete(`/api/blog/${id}`)
      fetchBlogs()
    } catch (err) {
      setError(err.response?.data?.message || '删除失败')
    }
  }

  return (
    <div className="container-wide">
      <h1 className="page-title">管理员后台 Admin Dashboard</h1>

      {error && <p className="alert alert-error">{error}</p>}

      <section className="admin-section">
        <h2>📁 项目管理</h2>
        <form onSubmit={submitProject} className="card" style={{marginTop:"1rem"}}>
          <div className="form-group">
            <label>标题 *</label>
            <input className="input" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>描述 *</label>
            <textarea className="textarea" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>图片地址</label>
            <input className="input" value={projectForm.imageUrl} onChange={e => setProjectForm({ ...projectForm, imageUrl: e.target.value })} />
          </div>
          <div className="form-group">
            <label>仓库地址</label>
            <input className="input" value={projectForm.repoUrl} onChange={e => setProjectForm({ ...projectForm, repoUrl: e.target.value })} />
          </div>
          <div className="form-group">
            <label>线上地址</label>
            <input className="input" value={projectForm.liveUrl} onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editProId ? '更新项目' : '新增项目'}</button>
            {editProId && (
              <button type="button" className="btn btn-outline" onClick={() => { setEditProId(null); setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' }) }}>
                取消编辑
              </button>
            )}
          </div>
        </form>

        <ul className="admin-list">
          {projects.length === 0 && <p className="text-muted">暂无项目</p>}
          {projects.map(p => (
            <li key={p._id}>
              <strong>{p.title}</strong>
              <span className="item-actions">
                <button className="btn btn-outline btn-sm" onClick={() => editProject(p)}>编辑</button>
                <button className="btn btn-danger btn-sm" onClick={() => delProject(p._id)}>删除</button>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-section">
        <h2>📝 博客管理</h2>
        <form onSubmit={submitBlog} className="card" style={{marginTop:"1rem"}}>
          <div className="form-group">
            <label>博客标题 *</label>
            <input className="input" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>正文内容 *</label>
            <textarea className="textarea" value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} required rows={6} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">{editBlogId ? '更新博客' : '新增博客'}</button>
            {editBlogId && (
              <button type="button" className="btn btn-outline" onClick={() => { setEditBlogId(null); setBlogForm({ title: '', content: '' }) }}>
                取消编辑
              </button>
            )}
          </div>
        </form>

        <ul className="admin-list">
          {posts.length === 0 && <p className="text-muted">暂无博客</p>}
          {posts.map(b => (
            <li key={b._id}>
              <strong>{b.title}</strong>
              <span className="item-actions">
                <button className="btn btn-outline btn-sm" onClick={() => editBlog(b)}>编辑</button>
                <button className="btn btn-danger btn-sm" onClick={() => delBlog(b._id)}>删除</button>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
