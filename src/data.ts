export type Language = 'zh' | 'en'
export type LocalizedText = Record<Language, string>

export const profile = {
  name: 'Rooney Yan',
  initials: 'RY',
  role: { zh: '香港科技大学 · 计算机科学', en: 'Computer Science @ HKUST' } satisfies LocalizedText,
  location: { zh: '中国香港', en: 'Hong Kong' } satisfies LocalizedText,
  email: 'zyanbs@connect.ust.hk',
  summary: {
    zh: '我目前在探索和构建人工智能、量化金融相关项目，并进行本科研究。这里长期记录我的项目、研究、写作与思考。',
    en: 'I explore and build projects across AI and quantitative finance while pursuing undergraduate research. This is where I document projects, research, writing, and ideas over time.',
  } satisfies LocalizedText,
  focus: ['AI Systems', 'Quantitative Finance', 'Technology & Ideas'],
  availability: { zh: '正在香港科技大学学习与研究。', en: 'Studying and conducting research at HKUST.' } satisfies LocalizedText,
  resumeUrl: '',
  photoUrl: '',
  links: [
    { label: 'GitHub', href: 'https://github.com/Rooney-YAN' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zhixiang-yan-2302ab3aa/' },
  ],
}

export const currently = [
  { label: { zh: '构建', en: 'Building' } satisfies LocalizedText, text: { zh: 'AI 与量化金融方向的个人项目', en: 'Projects in AI and quantitative finance' } satisfies LocalizedText },
  { label: { zh: '研究', en: 'Researching' } satisfies LocalizedText, text: { zh: '让大型语言模型与物理世界交互', en: 'Making Large Language Models interact with the physical world' } satisfies LocalizedText },
  { label: { zh: '记录', en: 'Writing' } satisfies LocalizedText, text: { zh: '技术、市场与想法', en: 'Technology, markets, and ideas' } satisfies LocalizedText },
]

export type Project = {
  slug: string
  title: string
  description: LocalizedText
  status: LocalizedText
  technologies: string[]
  github?: string
  demo?: string
  selected: boolean
}

const detailsPending = { zh: '项目资料整理中；详情将随项目进展补充。', en: 'Project notes are being organized; details will be added as the work develops.' } satisfies LocalizedText

export const projects: Project[] = [
  { slug: 'stocklens', title: 'StockLens', description: detailsPending, status: { zh: '进行中', en: 'In progress' }, technologies: [], selected: true },
  { slug: 'ai-knowledge-tool', title: 'AI Knowledge Tool', description: detailsPending, status: { zh: '进行中', en: 'In progress' }, technologies: [], selected: true },
  { slug: 'dailymodule', title: 'DailyModule', description: detailsPending, status: { zh: '进行中', en: 'In progress' }, technologies: [], selected: true },
]

export const research = [
  { title: 'Making Large Language Models (LLMs) Interact with Physical World', program: 'HKUST UROP', status: { zh: '进行中', en: 'Ongoing' } satisfies LocalizedText },
]

// Keep verified experience here as it becomes available. Empty by design: no placeholder claims.
export const experience: Array<{
  period: LocalizedText
  location: LocalizedText
  role: LocalizedText
  organization: LocalizedText
  highlights: Record<Language, string[]>
}> = []

export const education = [
  {
    period: '2023 — 2027',
    location: { zh: '中国香港', en: 'Hong Kong' } satisfies LocalizedText,
    school: { zh: '香港科技大学', en: 'The Hong Kong University of Science and Technology' } satisfies LocalizedText,
    degree: { zh: '计算机科学', en: 'Computer Science' } satisfies LocalizedText,
    details: { zh: '本科在读。', en: 'Undergraduate student.' } satisfies LocalizedText,
  },
]

// Add only skills Rooney has confirmed. The section remains data-driven.
export const skillGroups: Array<{ label: LocalizedText; items: string[] | Record<Language, string[]> }> = []

export const ui = {
  zh: {
    navLabel: '页面导航', home: '首页', projects: '项目', research: '研究', writing: '写作', about: '关于', eyebrow: '个人网站',
    currently: '目前', selectedProjects: '精选项目', viewProject: '查看项目', viewAll: '查看全部', researchIntro: '本科研究',
    recentWriting: '近期写作', noWriting: '文章正在准备中。', publications: '论文发表', noPublications: '暂无正式发表的论文。',
    ongoingResearch: '进行中的研究', status: '状态', experience: '研究 / 经历', education: '教育', skills: '技能', cv: '简历',
    detailsPending: '具体内容将在资料确认后补充。', overview: '概览', problem: '问题', built: '构建内容', architecture: '架构 / 实现',
    learned: '收获', evidence: '证据', demo: '演示', github: 'GitHub', contact: '联系', contactTitle: '保持联系',
    contactText: '如果你想讨论项目、研究或合作，欢迎给我发邮件。', emailMe: '发送邮件', backToTop: '返回顶部',
    readArticle: '阅读全文', allWriting: '全部文章', switchLanguage: 'Switch to English', lightTheme: '切换至浅色模式',
    darkTheme: '切换至深色模式', skipToContent: '跳转至主要内容', photoAlt: 'Rooney Yan 的个人照片', notFound: '页面未找到', goHome: '返回首页',
  },
  en: {
    navLabel: 'Page navigation', home: 'Home', projects: 'Projects', research: 'Research', writing: 'Writing', about: 'About', eyebrow: 'Personal Website',
    currently: 'Currently', selectedProjects: 'Selected Projects', viewProject: 'View project', viewAll: 'View all', researchIntro: 'Undergraduate Research',
    recentWriting: 'Recent Writing', noWriting: 'Writing is on the way.', publications: 'Publications', noPublications: 'No formal publications yet.',
    ongoingResearch: 'Ongoing Research', status: 'Status', experience: 'Research / Experience', education: 'Education', skills: 'Skills', cv: 'CV',
    detailsPending: 'Details will be added after the project material is confirmed.', overview: 'Overview', problem: 'Problem', built: 'What I Built',
    architecture: 'Architecture / Implementation', learned: 'What I Learned', evidence: 'Evidence', demo: 'Demo', github: 'GitHub', contact: 'Contact',
    contactTitle: 'Let’s connect', contactText: 'If you would like to discuss projects, research, or collaboration, feel free to send me an email.',
    emailMe: 'Email me', backToTop: 'Back to top', readArticle: 'Read article', allWriting: 'All writing', switchLanguage: '切换至中文',
    lightTheme: 'Switch to light mode', darkTheme: 'Switch to dark mode', skipToContent: 'Skip to main content', photoAlt: 'Portrait of Rooney Yan',
    notFound: 'Page not found', goHome: 'Go home',
  },
} as const
