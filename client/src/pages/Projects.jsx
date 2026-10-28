import { useState, useEffect } from 'react'
import api from '../api/axiosInstance'

export default function Projects() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/api/projects')
        setList(res.data)
      } catch (err) {
        setError('加载项目失败')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="container"><p className="text-muted">Loading...</p></div>
  if (error) return <div className="container"><p className="alert alert-error">{error}</p></div>

  return (
    <div className="container-wide">
      <h1 className="page-title">项目作品集 Projects</h1>
      {list.length === 0 && <p className="text-muted">暂无项目</p>}
      <div className="grid">
        {list.map(item => (
          <div key={item._id} className="card">
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="card-actions">
              {item.repoUrl && <a href={item.repoUrl} target="_blank" rel="noreferrer">代码仓库</a>}
              {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noreferrer">线上预览</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
