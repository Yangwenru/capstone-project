import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // 从localStorage读取，刷新页面保持登录
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  // 登录保存token和用户信息
  const login = (jwtToken, userInfo) => {
    setToken(jwtToken)
    setUser(userInfo || null)
    localStorage.setItem('token', jwtToken)
    if (userInfo) localStorage.setItem('user', JSON.stringify(userInfo))
  }

  // 登出清空
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 自定义钩子，组件直接拿登录状态
export const useAuth = () => useContext(AuthContext)
