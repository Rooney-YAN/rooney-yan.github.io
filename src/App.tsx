import { useEffect, useState, type ReactNode } from 'react'
import {
  education,
  experience,
  profile,
  projects,
  skillGroups,
  ui,
  type Language,
} from './data'

type Theme = 'light' | 'dark'

function getInitialLanguage(): Language {
  const saved = localStorage.getItem('language')
  if (saved === 'zh' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children} <span className="external-arrow" aria-hidden="true">↗</span>
    </a>
  )
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const copy = ui[language]

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    document.title = language === 'zh'
      ? 'Yan Zhixiang — 个人主页'
      : 'Yan Zhixiang — Personal Website'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', language === 'zh'
        ? 'Yan Zhixiang 的个人主页：个人简介、经历、项目与联系方式。'
        : 'Yan Zhixiang’s personal website: profile, experience, projects, and contact information.')
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#151617' : '#f5f4ef')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="page" id="top">
      <a className="skip-link" href="#main">{copy.skipToContent}</a>

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label={`${profile.name} — ${copy.about}`}>
          <span className="wordmark-mark" aria-hidden="true">{profile.initials}</span>
          <span>{profile.name}</span>
        </a>

        <div className="header-actions">
          <nav aria-label={copy.navLabel}>
            <a href="#about">{copy.about}</a>
            <a href="#resume">{copy.resume}</a>
            <a href="#projects">{copy.projects}</a>
            <a href="#contact">{copy.contact}</a>
          </nav>
          <div className="controls">
            <button
              className="text-control"
              type="button"
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              aria-label={copy.switchLanguage}
              title={copy.switchLanguage}
            >
              {language === 'zh' ? 'EN' : '中文'}
            </button>
            <button
              className="theme-control"
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={theme === 'light' ? copy.darkTheme : copy.lightTheme}
              title={theme === 'light' ? copy.darkTheme : copy.lightTheme}
            >
              <span aria-hidden="true">{theme === 'light' ? '◐' : '○'}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="about" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 id="hero-title">{profile.name}</h1>
            <p className="role">{profile.role[language]}</p>
            <p className="summary">{profile.summary[language]}</p>

            <div className="hero-links">
              <a className="button primary-button" href={`mailto:${profile.email}`}>{copy.emailMe}</a>
              {profile.links.map((link) => (
                <ExternalLink className="button secondary-button" href={link.href} key={link.label}>
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </div>

          <div className="portrait-column">
            <div className="portrait-frame">
              {profile.photoUrl ? (
                <img src={profile.photoUrl} alt={copy.photoAlt} />
              ) : (
                <span className="portrait-placeholder" aria-label={copy.photoAlt}>{profile.initials}</span>
              )}
            </div>
            <p>{profile.availability[language]}</p>
          </div>
        </section>

        <section className="profile-strip" aria-label={copy.introduction}>
          <div>
            <span className="strip-label">{copy.contact}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div>
            <span className="strip-label">{language === 'zh' ? '所在地' : 'Based in'}</span>
            <span>{profile.location[language]}</span>
          </div>
          {profile.resumeUrl && (
            <div>
              <span className="strip-label">PDF</span>
              <a href={profile.resumeUrl}>{copy.downloadResume} ↓</a>
            </div>
          )}
        </section>

        <section className="resume-section" id="resume" aria-labelledby="experience-title">
          <div className="section-heading">
            <p className="section-number">01</p>
            <h2 id="experience-title">{copy.experience}</h2>
          </div>
          <div className="section-content">
            {experience.map((item, index) => (
              <article className="resume-entry" key={`${item.period.en}-${index}`}>
                <div className="entry-meta">
                  <time>{item.period[language]}</time>
                  <span>{item.location[language]}</span>
                </div>
                <div className="entry-body">
                  <h3>{item.role[language]}</h3>
                  <p className="organization">{item.organization[language]}</p>
                  <ul>
                    {item.highlights[language].map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="section-number">02</p>
            <h2 id="projects-title">{copy.selectedProjects}</h2>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-topline">
                  <span>{String(index + 1).padStart(2, '0')} / {project.period}</span>
                  <ExternalLink href={project.href}>{copy.viewProject}</ExternalLink>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description[language]}</p>
                <ul className="tag-list" aria-label="Technologies">
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section education-section" aria-labelledby="education-title">
          <div className="section-heading">
            <p className="section-number">03</p>
            <h2 id="education-title">{copy.education}</h2>
          </div>
          <div className="section-content">
            {education.map((item) => (
              <article className="resume-entry" key={item.school.en}>
                <div className="entry-meta">
                  <time>{item.period}</time>
                  <span>{item.location[language]}</span>
                </div>
                <div className="entry-body">
                  <h3>{item.school[language]}</h3>
                  <p className="organization">{item.degree[language]}</p>
                  <p className="entry-description">{item.details[language]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section skills-section" aria-labelledby="skills-title">
          <div className="section-heading">
            <p className="section-number">04</p>
            <h2 id="skills-title">{copy.skills}</h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => {
              const items = Array.isArray(group.items) ? group.items : group.items[language]
              return (
                <div className="skill-group" key={group.label.en}>
                  <h3>{group.label[language]}</h3>
                  <p>{items.join(' · ')}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow">{copy.contact}</p>
          <h2 id="contact-title">{copy.contactTitle}</h2>
          <p>{copy.contactText}</p>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{language === 'zh' ? '使用 React 构建' : 'Built with React'}</span>
        <a href="#top">{copy.backToTop} ↑</a>
      </footer>
    </div>
  )
}

export default App
