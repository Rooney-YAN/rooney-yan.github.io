import {
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from './data'
import type { ReactNode } from 'react'

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  )
}

function App() {
  return (
    <div className="page" id="top">
      <header className="topbar">
        <a className="wordmark" href="#top">{profile.name}</a>
        <nav aria-label="页面导航">
          <a href="#experience">经历</a>
          <a href="#projects">项目</a>
          <a href="#education">教育</a>
          <a href="#contact">联系</a>
        </nav>
      </header>

      <main>
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro-main">
            <p className="overline">Personal website / CV</p>
            <h1 id="intro-title">{profile.name}</h1>
            <p className="role">{profile.role}</p>
            <p className="summary">{profile.summary}</p>
          </div>

          <address className="contact-list">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {profile.links.map((link) => (
              <ExternalLink href={link.href} key={link.label}>{link.label}</ExternalLink>
            ))}
            {profile.resumeUrl !== '#' && (
              <a className="resume-link" href={profile.resumeUrl}>下载 PDF 简历 ↓</a>
            )}
          </address>
        </section>

        <section className="cv-section" id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">经历</h2>
          <div className="section-content">
            {experience.map((item) => (
              <article className="entry" key={`${item.period}-${item.organization}`}>
                <div className="entry-meta">
                  <time>{item.period}</time>
                  <span>{item.location}</span>
                </div>
                <div className="entry-body">
                  <div className="entry-heading">
                    <h3>{item.role}</h3>
                    <p>{item.organization}</p>
                  </div>
                  <ul>
                    {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section" id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title">项目</h2>
          <div className="section-content">
            {projects.map((project) => (
              <article className="entry project-entry" key={project.title}>
                <div className="entry-meta">
                  <time>{project.period}</time>
                </div>
                <div className="entry-body">
                  <div className="entry-heading project-heading">
                    <h3>{project.title}</h3>
                    <ExternalLink href={project.href}>查看项目</ExternalLink>
                  </div>
                  <p className="description">{project.description}</p>
                  <p className="tools">{project.technologies.join(' · ')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section" id="education" aria-labelledby="education-title">
          <h2 id="education-title">教育</h2>
          <div className="section-content">
            {education.map((item) => (
              <article className="entry education-entry" key={item.school}>
                <div className="entry-meta">
                  <time>{item.period}</time>
                  <span>{item.location}</span>
                </div>
                <div className="entry-body">
                  <div className="entry-heading">
                    <h3>{item.school}</h3>
                    <p>{item.degree}</p>
                  </div>
                  <p className="description">{item.details}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section" aria-labelledby="skills-title">
          <h2 id="skills-title">技能</h2>
          <div className="section-content skill-list">
            {skillGroups.map((group) => (
              <div className="skill-row" key={group.label}>
                <h3>{group.label}</h3>
                <p>{group.items.join('、')}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <h2>联系我</h2>
          <p>如果你对我的经历或项目感兴趣，欢迎通过邮件联系。</p>
          <a className="email" href={`mailto:${profile.email}`}>{profile.email}</a>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </div>
  )
}

export default App
