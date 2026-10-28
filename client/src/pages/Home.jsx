import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>你好，欢迎来到我的作品集 👋</h1>
        <p>一名全栈开发者，专注于用 MERN 技术栈（MongoDB / Express / React / Node.js）构建现代 Web 应用。</p>
        <div style={{display:"flex", gap:"0.75rem", justifyContent:"center"}}>
          <Link to="/projects" className="btn btn-primary">查看我的项目</Link>
          <Link to="/contact" className="btn btn-outline">联系我</Link>
        </div>
      </section>

      <section className="container section-center">
        <h2>技能 Skills</h2>
        <div className="skill-tags" style={{marginTop:"1rem"}}>
          {['JavaScript','React','Node.js','Express','MongoDB','Mongoose','REST API','JWT 认证','Git'].map(s => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>
    </div>
  )
}
