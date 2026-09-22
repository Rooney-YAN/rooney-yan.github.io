import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { currently, education, experience, profile, projects, research, skillGroups, ui, type Language, type Project } from './data'
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

function SectionHeading({ number, title, id }: { number: string; title: string; id?: string }) {
  return <div className="section-heading"><p className="section-number">{number}</p><h2 id={id}>{title}</h2></div>
}

function ProjectCard({ project, index, language, navigate }: { project: Project; index: number; language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <article className="project-card">
    <div className="project-topline"><span>{String(index + 1).padStart(2, '0')} / {project.status[language]}</span><Link to={`/projects/${project.slug}`} navigate={navigate}>{copy.viewProject} <span aria-hidden="true">→</span></Link></div>
    <h3>{project.title}</h3><p>{project.description[language]}</p>
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
  return <section className="contact-section" id="contact"><p className="eyebrow">{copy.contact}</p><h2>{copy.contactTitle}</h2><p>{copy.contactText}</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a></section>
}

function Home({ language, navigate }: { language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow">{copy.eyebrow}</p><h1 id="hero-title">{profile.name}</h1><p className="role">{profile.role[language]}</p><p className="summary">{profile.summary[language]}</p><ul className="focus-list">{profile.focus.map((item) => <li key={item}>{item}</li>)}</ul><div className="hero-links"><Link className="button primary-button" to="/projects" navigate={navigate}>{copy.projects}</Link>{profile.links.map((link) => <ExternalLink className="button secondary-button" href={link.href} key={link.label}>{link.label}</ExternalLink>)}</div></div>
      <div className="portrait-column"><div className="portrait-frame">{profile.photoUrl ? <img src={profile.photoUrl} alt={copy.photoAlt} /> : <span className="portrait-placeholder" aria-label={copy.photoAlt}>{profile.initials}</span>}</div><p>{profile.availability[language]}</p></div>
    </section>
    <section className="resume-section"><SectionHeading number="01" title={copy.currently} id="currently-title"/><div className="currently-grid">{currently.map((item) => <div className="current-item" key={item.label.en}><span>{item.label[language]}</span><p>{item.text[language]}</p></div>)}</div></section>
    <section className="resume-section projects-section"><SectionHeading number="02" title={copy.selectedProjects}/><div><div className="project-grid">{projects.filter((p) => p.selected).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} language={language} navigate={navigate}/>)}</div><Link className="section-link" to="/projects" navigate={navigate}>{copy.viewAll} →</Link></div></section>
    <section className="resume-section"><SectionHeading number="03" title={copy.research}/><div><ResearchCard language={language}/><Link className="section-link" to="/research" navigate={navigate}>{copy.viewAll} →</Link></div></section>
    <section className="resume-section"><SectionHeading number="04" title={copy.recentWriting}/><div><WritingList items={articles.slice(0, 3)} language={language} navigate={navigate}/><Link className="section-link" to="/writing" navigate={navigate}>{copy.viewAll} →</Link></div></section>
    <Contact language={language}/>
  </>
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{text && <p>{text}</p>}</header>
}

function ProjectsPage({ language, navigate }: { language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <><PageIntro eyebrow={copy.eyebrow} title={copy.projects} text={language === 'zh' ? '持续构建中的项目与实验。' : 'Projects and experiments, documented as they develop.'}/><section className="page-section"><div className="project-grid all-projects">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} language={language} navigate={navigate}/>)}</div><div className="future-note"><span>+</span><p>{language === 'zh' ? '未来项目会继续在这里补充。' : 'Future projects will be added here.'}</p></div></section></>
}

function ProjectPage({ project, language, navigate }: { project: Project; language: Language; navigate: Navigate }) {
  const copy = ui[language]
  const sections = [copy.overview, copy.problem, copy.built, copy.architecture, copy.learned, copy.evidence]
  return <><PageIntro eyebrow={`${copy.projects} / ${project.status[language]}`} title={project.title} text={project.description[language]}/><section className="project-detail">{sections.map((title) => <div className="detail-row" key={title}><h2>{title}</h2><p>{copy.detailsPending}</p></div>)}<div className="detail-links"><span>{copy.github}</span><span>{project.github ? <ExternalLink href={project.github}>{copy.github}</ExternalLink> : copy.detailsPending}</span><span>{copy.demo}</span><span>{project.demo ? <ExternalLink href={project.demo}>{copy.demo}</ExternalLink> : copy.detailsPending}</span></div></section><Link className="section-link back-link" to="/projects" navigate={navigate}>← {copy.projects}</Link></>
}

function ResearchPage({ language }: { language: Language }) {
  const copy = ui[language]
  return <><PageIntro eyebrow={copy.researchIntro} title={copy.research} text={language === 'zh' ? '记录进行中的本科研究；未完成的工作不会被包装成成果。' : 'Undergraduate research in progress, presented as work in progress rather than finished results.'}/><section className="resume-section page-section"><SectionHeading number="01" title={copy.ongoingResearch}/><div>{research.map((item) => <ResearchCard key={item.title} language={language}/>)}</div></section><section className="resume-section"><SectionHeading number="02" title={copy.publications}/><p className="empty-state">{copy.noPublications}</p></section></>
}

function WritingPage({ language, navigate }: { language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <><PageIntro eyebrow="Technology · Markets · Ideas" title={copy.writing} text={language === 'zh' ? '关于技术、市场与想法的长期笔记。' : 'Long-form notes on technology, markets, and ideas.'}/><div className="category-line">{['Technology', 'Markets', 'Ideas'].map((item) => <span key={item}>{item}</span>)}</div><section className="page-section"><WritingList items={articles} language={language} navigate={navigate}/></section></>
}

function ArticlePage({ article, language, navigate }: { article: Article; language: Language; navigate: Navigate }) {
  const copy = ui[language]
  return <article className="article-page"><header><Link className="back-link" to="/writing" navigate={navigate}>← {copy.allWriting}</Link><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><p className="article-excerpt">{article.excerpt}</p><div className="article-meta"><time dateTime={article.date}>{article.date}</time><span>{article.tags.join(' · ')}</span></div></header><div className="prose"><Markdown source={article.content}/></div></article>
}

function AboutPage({ language }: { language: Language }) {
  const copy = ui[language]
  return <><PageIntro eyebrow={copy.eyebrow} title={copy.about} text={profile.summary[language]}/><section className="resume-section page-section"><SectionHeading number="01" title={copy.education}/><div>{education.map((item) => <article className="resume-entry" key={item.school.en}><div className="entry-meta"><time>{item.period}</time><span>{item.location[language]}</span></div><div className="entry-body"><h3>{item.school[language]}</h3><p className="organization">{item.degree[language]}</p><p className="entry-description">{item.details[language]}</p></div></article>)}</div></section><section className="resume-section"><SectionHeading number="02" title={copy.experience}/><div>{experience.length ? experience.map((item, index) => <article className="resume-entry" key={index}><div className="entry-meta"><time>{item.period[language]}</time><span>{item.location[language]}</span></div><div className="entry-body"><h3>{item.role[language]}</h3><p className="organization">{item.organization[language]}</p><ul>{item.highlights[language].map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></article>) : <ResearchCard language={language}/>}</div></section>{skillGroups.length > 0 && <section className="resume-section"><SectionHeading number="03" title={copy.skills}/><div className="skills-grid">{skillGroups.map((group) => { const items = Array.isArray(group.items) ? group.items : group.items[language]; return <div className="skill-group" key={group.label.en}><h3>{group.label[language]}</h3><p>{items.join(' · ')}</p></div> })}</div></section>}<section className="resume-section"><SectionHeading number={skillGroups.length ? '04' : '03'} title={copy.cv}/><div>{profile.resumeUrl ? <a className="button secondary-button" href={profile.resumeUrl}>{copy.cv} ↓</a> : <p className="empty-state">{language === 'zh' ? 'CV 链接将在文件确认后提供。' : 'A CV link will be added once the file is confirmed.'}</p>}</div></section><Contact language={language}/></>
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
  useEffect(() => { document.documentElement.dataset.theme = theme; document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#151617' : '#f5f4ef'); localStorage.setItem('theme', theme) }, [theme])
  useEffect(() => { const pageName = path.split('/').filter(Boolean).pop()?.replaceAll('-', ' '); document.title = path === '/' ? `${profile.name} — Personal Website` : `${pageName} — ${profile.name}`; document.querySelector('meta[name="description"]')?.setAttribute('content', profile.summary[language]) }, [path, language])

  const content = useMemo(() => {
    if (path === '/') return <Home language={language} navigate={navigate}/>
    if (path === '/projects') return <ProjectsPage language={language} navigate={navigate}/>
    if (path.startsWith('/projects/')) { const item = projects.find((project) => project.slug === path.split('/')[2]); return item ? <ProjectPage project={item} language={language} navigate={navigate}/> : <NotFound language={language} navigate={navigate}/> }
    if (path === '/research') return <ResearchPage language={language}/>
    if (path === '/writing') return <WritingPage language={language} navigate={navigate}/>
    if (path.startsWith('/writing/')) { const item = articles.find((article) => article.slug === path.split('/')[2]); return item ? <ArticlePage article={item} language={language} navigate={navigate}/> : <NotFound language={language} navigate={navigate}/> }
    if (path === '/about') return <AboutPage language={language}/>
    return <NotFound language={language} navigate={navigate}/>
  }, [path, language])

  const nav = [['/', copy.home], ['/projects', copy.projects], ['/research', copy.research], ['/writing', copy.writing], ['/about', copy.about]] as const
  return <div className="page" id="top"><a className="skip-link" href="#main">{copy.skipToContent}</a><header className="topbar"><Link className="wordmark" to="/" navigate={navigate}><span className="wordmark-mark" aria-hidden="true">{profile.initials}</span><span>{profile.name}</span></Link><div className="header-actions"><nav aria-label={copy.navLabel}>{nav.map(([to, label]) => <Link className={path === to ? 'active' : ''} to={to} navigate={navigate} key={to}>{label}</Link>)}</nav><div className="controls"><button className="text-control" type="button" onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')} aria-label={copy.switchLanguage}>{language === 'zh' ? 'EN' : '中文'}</button><button className="theme-control" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? copy.darkTheme : copy.lightTheme}><span aria-hidden="true">{theme === 'light' ? '◐' : '○'}</span></button></div></div></header><main id="main">{content}</main><footer><span>© {new Date().getFullYear()} {profile.name}</span><span>{language === 'zh' ? '使用 React 构建' : 'Built with React'}</span><a href="#top">{copy.backToTop} ↑</a></footer></div>
}

export default App
