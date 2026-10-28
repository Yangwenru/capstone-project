import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// 后面我们会逐个新建这些页面组件，现在先占位
import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Header from './components/Header'
import Footer from './components/Footer'

// 保护路由：没有token直接跳登录页
const ProtectedRoute = ({children}) => {
  const {token} = useAuth()
  if(!token){
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <>
      <Header />
      <main style={{minHeight:"80vh"}}>
        <Routes>
          {/* 公开页面 */}
          <Route path="/" element={<Home />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/blog" element={<Blog />}/>
          <Route path="/blog/:id" element={<BlogDetail />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>

          {/* 受保护后台，必须登录 */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }/>
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
