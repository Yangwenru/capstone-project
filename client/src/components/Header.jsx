import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header(){
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/') // 登出后跳回首页
  }

  return (
    <header className="site-header">
      <nav>
        <Link to="/" className="brand">MyPortfolio</Link>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/projects" className="nav-link">Projects</Link>
        <Link to="/blog" className="nav-link">Blog</Link>
        <Link to="/contact" className="nav-link">Contact</Link>

        { token ? (
          <>
            <Link to="/admin" className="nav-link">Admin后台</Link>
            {user?.username && <span className="nav-user">你好，{user.username}</span>}
            <button onClick={handleLogout} className="btn btn-outline btn-sm">登出</button>
          </>
        ):(
          <>
            <Link to="/login" className="nav-link">登录</Link>
            <Link to="/register" className="btn btn-primary btn-sm">注册</Link>
          </>
        )}
      </nav>
    </header>
  )
}
