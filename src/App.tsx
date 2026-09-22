import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { currently, education, experience, profile, projects, research, ui, type Language, type Project } from './data'
import { articles, type Article } from './writing'
import { Markdown } from './Markdown'

type Theme = 'light' | 'dark'
type Navigate = (to: string) => void

function initialLanguage(): Language {
  const saved = localStorage.getItem('language')
  if (saved === 'zh' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

function initialTheme(): Theme {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/'

function usePath() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))
  useEffect(() => {
    const update = () => setPath(normalizePath(window.location.pathname))
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])
  const navigate: Navigate = (to) => {
    window.history.pushState({}, '', to)
    setPath(normalizePath(to))
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
  return { path, navigate }
}

function Link({ to, children, className, navigate, label }: { to: string; children: ReactNode; className?: string; navigate: Navigate; label?: string }) {
  const click = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }
  return <a className={className} href={to} onClick={click} aria-label={label}>{children}</a>
}

function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children} <span className="external-arrow" aria-hidden="true">↗</span></a>
}

function WeChatContact({ language, className }: { language: Language; className?: string }) {
  const [open, setOpen] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(profile.wechatId)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    window.setTimeout(() => setCopyState('idle'), 1600)
  }
  return <span className="wechat-contact">
    <button className={className} type="button" aria-expanded={open} onClick={() => setOpen(!open)}>WeChat <span className="external-arrow" aria-hidden="true">↗</span></button>
    {open && <span className="wechat-popover" role="dialog" aria-label="WeChat ID">
      <span className="wechat-id">{profile.wechatId}</span>
      <button type="button" onClick={copyId}>{copyState === 'copied' ? (language === 'zh' ? '已复制' : 'Copied') : copyState === 'failed' ? (language === 'zh' ? '复制失败' : 'Failed') : (language === 'zh' ? '复制' : 'Copy')}</button>
    </span>}
  </span>
}

function ContactLinks({ language, className }: { language: Language; className: string }) {
  return <div className={className}>
    <WeChatContact language={language} className="contact-link"/>
    <a className="contact-link" href={`mailto:${profile.email}`}>Email <span className="external-arrow" aria-hidden="true">↗</span></a>
    {profile.links.map((link) => <ExternalLink className="contact-link" href={link.href} key={link.label}>{link.label}</ExternalLink>)}
  </div>
}

function SectionHeading({ title, id }: { title: string; id?: string }) {
  return <div className="section-heading"><h2 id={id}>{title}</h2></div>
}

function ProjectCard({ project, language, navigate }: { project: Project; language: Language; navigate: Navigate }) {
  return <article className="project-card">
    <h3><Link to={`/projects/${project.slug}`} navigate={navigate}>{project.title}</Link></h3><p>{project.description[language]}</p>
    {project.technologies.length > 0 && <ul className="tag-list">{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul>}
  </article>
}

function ResearchCard({ language }: { language: Language }) {
  const item = research[0]
  return <article className="research-card"><div><p className="card-kicker">{item.program}</p><h3>{item.title}</h3></div><span className="status-badge">{item.status[language]}</span></article>
}

function WritingList({ items, language, navigate }: { items: Article[]; language: Language; navigate: Navigate }) {
  const copy = ui[language]
  const visible = items.filter((article) => article.language === language || article.language === 'both')
  if (!visible.length) return <p className="empty-state">{copy.noWriting}</p>
  return <div className="writing-list">{visible.map((article) => <article className="writing-row" key={article.slug}>
    <div className="writing-meta"><time dateTime={article.date}>{article.date}</time><span>{article.category}</span></div>
    <div><h3><Link to={`/writing/${article.slug}`} navigate={navigate}>{article.title}</Link></h3><p>{article.excerpt}</p><ul className="tag-list">{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
    <Link className="row-arrow" to={`/writing/${article.slug}`} navigate={navigate} label={`${copy.readArticle}: ${article.title}`}>→</Link>
  </article>)}</div>
}

function Contact({ language }: { language: Language }) {
  const copy = ui[language]
  return <section className="connect-section" id="contact"><h2>{copy.contactTitle}</h2><ContactLinks language={language} className="connect-links"/></section>
}

function Home({ language, navigate }: { language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy"><h1 id="hero-title">{profile.name[language]}</h1><p className="role">{profile.role[language]}</p>{profile.summary[language] && <p className="summary">{profile.summary[language]}</p>}<ContactLinks language={language} className="hero-links"/></div>
      <div className="portrait-column"><div className="portrait-frame">{profile.photoUrl ? <img src={profile.photoUrl} alt={copy.photoAlt} /> : <span className="portrait-placeholder" aria-label={copy.photoAlt}>{profile.initials}</span>}</div></div>
    </section>
    <section className="resume-section"><SectionHeading title={copy.currently} id="currently-title"/><div className="currently-grid">{currently.map((item) => <div className="current-item" key={item.label.en}><span>{item.label[language]}</span><p>{item.text[language]}</p></div>)}</div></section>
    <section className="resume-section projects-section"><SectionHeading title={copy.selectedProjects}/><div><div className="project-grid">{projects.filter((p) => p.selected).map((project) => <ProjectCard key={project.slug} project={project} language={language} navigate={navigate}/>)}</div><Link className="section-link" to="/projects" navigate={navigate}>{copy.viewAll} →</Link></div></section>
    <section className="resume-section"><SectionHeading title={copy.research}/><div><ResearchCard language={language}/><Link className="section-link" to="/research" navigate={navigate}>{copy.viewAll} →</Link></div></section>
    <section className="resume-section"><SectionHeading title={copy.recentWriting}/><div><WritingList items={articles.slice(0, 3)} language={language} navigate={navigate}/><Link className="section-link" to="/writing" navigate={navigate}>{copy.viewAll} →</Link></div></section>
    <Contact language={language}/>
  </>
}

function PageIntro({ title, text }: { title: string; text?: string }) {
  return <header className="page-intro"><h1>{title}</h1>{text && <p>{text}</p>}</header>
}

function ProjectsPage({ language, navigate }: { language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <><PageIntro title={copy.projects}/><section className="page-section"><div className="project-grid all-projects">{projects.map((project) => <ProjectCard key={project.slug} project={project} language={language} navigate={navigate}/>)}</div></section></>
}

function ProjectPage({ project, language, navigate }: { project: Project; language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <><PageIntro title={project.title}/><section className="project-detail"><div className="detail-row"><h2>{copy.overview}</h2><div className="detail-copy"><p>{project.description[language]}</p>{project.highlights && <ul>{project.highlights.map((item) => <li key={item.en}>{item[language]}</li>)}</ul>}</div></div><div className="detail-row"><h2>{language === 'zh' ? '技术栈' : 'Stack'}</h2><p>{project.technologies.join(' · ')}</p></div><div className="detail-links"><span>{copy.github}</span><span>{project.github && <ExternalLink href={project.github}>{project.title}</ExternalLink>}</span>{project.demo && <><span>{copy.demo}</span><span><ExternalLink href={project.demo}>{copy.demo}</ExternalLink></span></>}</div></section><Link className="section-link back-link" to="/projects" navigate={navigate}>← {copy.projects}</Link></>
}

function ResearchPage({ language }: { language: Language }) {
  const copy = ui[language]
  return <><PageIntro title={copy.research}/><section className="resume-section page-section"><SectionHeading title={copy.ongoingResearch}/><div>{research.map((item) => <ResearchCard key={item.title} language={language}/>)}</div></section><section className="resume-section"><SectionHeading title={copy.publications}/><p className="empty-state">{copy.noPublications}</p></section></>
}

function WritingPage({ language, navigate }: { language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <><PageIntro title={copy.writing}/><section className="page-section"><WritingList items={articles} language={language} navigate={navigate}/></section></>
}

function ArticlePage({ article, language, navigate }: { article: Article; language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <article className="article-page"><header><Link className="back-link" to="/writing" navigate={navigate}>← {copy.allWriting}</Link><h1>{article.title}</h1><p className="article-excerpt">{article.excerpt}</p><div className="article-meta"><span>{article.category}</span><time dateTime={article.date}>{article.date}</time><span>{article.tags.join(' · ')}</span></div></header><div className="prose"><Markdown source={article.content}/></div></article>
}

function AboutPage({ language, navigate }: { language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <><PageIntro title={copy.about} text={profile.summary[language]}/><section className="resume-section page-section"><SectionHeading title={copy.education}/><div>{education.map((item) => <article className="resume-entry" key={item.school.en}><div className="entry-meta">{item.period && <time>{item.period}</time>}<span>{item.location[language]}</span></div><div className="entry-body"><h3>{item.school[language]}</h3><p className="organization">{item.degree[language]}</p>{item.details[language] && <p className="entry-description">{item.details[language]}</p>}</div></article>)}</div></section><section className="resume-section"><SectionHeading title={copy.experience}/><div>{experience.length ? experience.map((item, index) => <article className="resume-entry" key={index}><div className="entry-meta"><time>{item.period[language]}</time><span>{item.location[language]}</span></div><div className="entry-body"><h3>{item.role[language]}</h3><p className="organization">{item.organization[language]}</p><ul>{item.highlights[language].map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></article>) : <ResearchCard language={language}/>}</div></section><section className="resume-section"><SectionHeading title={copy.cv}/><div><a className="button secondary-button" href="/cv.html">{language === 'zh' ? '查看 HTML CV' : 'View HTML CV'} →</a></div></section><Contact language={language}/></>
}

function NotFound({ language, navigate }: { language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <div className="not-found"><p className="section-number">404</p><h1>{copy.notFound}</h1><Link className="button primary-button" to="/" navigate={navigate}>{copy.goHome}</Link></div>
}

function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const { path, navigate } = usePath()
  const copy = ui[language]

  useEffect(() => { document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'; localStorage.setItem('language', language) }, [language])
  useEffect(() => { document.documentElement.dataset.theme = theme; document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1f1e1b' : '#f7f5f2'); localStorage.setItem('theme', theme) }, [theme])
  useEffect(() => { const pageName = path.split('/').filter(Boolean).pop()?.replaceAll('-', ' '); document.title = path === '/' ? `${profile.name[language]} — Personal Website` : `${pageName} — ${profile.name[language]}`; document.querySelector('meta[name="description"]')?.setAttribute('content', profile.summary[language] || `${profile.name[language]} — ${profile.role[language]}. Projects, research, and writing.`) }, [path, language])

  const content = useMemo(() => {
    if (path === '/') return <Home language={language} navigate={navigate}/>
    if (path === '/projects') return <ProjectsPage language={language} navigate={navigate}/>
    if (path.startsWith('/projects/')) { const item = projects.find((project) => project.slug === path.split('/')[2]); return item ? <ProjectPage project={item} language={language} navigate={navigate}/> : <NotFound language={language} navigate={navigate}/> }
    if (path === '/research') return <ResearchPage language={language}/>
    if (path === '/writing') return <WritingPage language={language} navigate={navigate}/>
    if (path.startsWith('/writing/')) { const item = articles.find((article) => article.slug === path.split('/')[2]); return item ? <ArticlePage article={item} language={language} navigate={navigate}/> : <NotFound language={language} navigate={navigate}/> }
    if (path === '/about') return <AboutPage language={language} navigate={navigate}/>
    return <NotFound language={language} navigate={navigate}/>
  }, [path, language])

  const nav = [['/', copy.home], ['/projects', copy.projects], ['/research', copy.research], ['/writing', copy.writing], ['/about', copy.about]] as const
  return <div className="page" id="top"><a className="skip-link" href="#main">{copy.skipToContent}</a><header className="topbar"><Link className="wordmark" to="/" navigate={navigate}><img className="wordmark-mark" src="/rooney-mark.svg" alt=""/><span>{profile.name[language]}</span></Link><div className="header-actions"><nav aria-label={copy.navLabel}>{nav.map(([to, label]) => <Link className={path === to ? 'active' : ''} to={to} navigate={navigate} key={to}>{label}</Link>)}</nav><div className="controls"><button className="text-control" type="button" onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')} aria-label={copy.switchLanguage}>{language === 'zh' ? 'EN' : '中文'}</button><button className="theme-control" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? copy.darkTheme : copy.lightTheme}><span aria-hidden="true">{theme === 'light' ? '☼' : '◐'}</span></button></div></div></header><main id="main" className="page-content" key={path}>{content}</main><footer><span>© {new Date().getFullYear()} {profile.name[language]}</span><a href="#top">{copy.backToTop} ↑</a></footer></div>
}

export default App
