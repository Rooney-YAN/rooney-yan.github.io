export type Language = 'zh' | 'en'
export type LocalizedText = Record<Language, string>

export const profile = {
  name: 'Rooney Yan',
  initials: 'RY',
  role: { zh: '香港科技大学 · 计算机科学工学士', en: 'BEng in Computer Science · HKUST' } satisfies LocalizedText,
  location: { zh: '中国香港', en: 'Hong Kong' } satisfies LocalizedText,
  email: 'zyanbs@connect.ust.hk',
  wechatId: 'Essential_Yan',
  summary: {
    // Add your own introduction here when it is ready.
    zh: '',
    en: '',
  } satisfies LocalizedText,
  focus: ['AI Systems', 'Quantitative Finance', 'Technology & Ideas'],
  availability: { zh: '正在香港科技大学学习与研究。', en: 'Studying and conducting research at HKUST.' } satisfies LocalizedText,
  resumeUrl: '/cv',
  photoUrl: '/Profile.jpg',
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
  highlights?: LocalizedText[]
  github?: string
  demo?: string
  selected: boolean
}

export const projects: Project[] = [
  {
    slug: 'noteloop',
    title: 'NoteLoop',
    description: {
      zh: '浏览器端学习诊断工具，对照课程 PDF 与个人笔记，生成知识覆盖分析、针对性测验和可追加的 Markdown 修订建议。',
      en: 'A browser-based study diagnostic tool that compares course PDFs with personal notes, then generates coverage analysis, targeted quizzes, and append-only Markdown corrections.',
    },
    status: { zh: '可用演示', en: 'Working demo' },
    technologies: ['Next.js', 'TypeScript', 'Zod', 'PDF.js'],
    highlights: [
      { zh: '将课程材料和学习笔记分别结构化分析，再生成知识覆盖图。', en: 'Analyzes course material and student notes separately before producing a structured coverage map.' },
      { zh: '生成六道经二次模型审查的测验，并根据答题结果诊断误解与信心度。', en: 'Generates a six-question quiz reviewed by a second model pass, then diagnoses misconceptions and confidence.' },
      { zh: '支持 OpenAI 与 DeepSeek；PDF 文本在本地提取，模型输出经 Zod 校验。', en: 'Supports OpenAI and DeepSeek, with local PDF text extraction and Zod-validated model output.' },
    ],
    github: 'https://github.com/Rooney-YAN/NoteLoop',
    demo: 'https://rooney-yan.github.io/NoteLoop/',
    selected: true,
  },
  {
    slug: 'dailymodule',
    title: 'DailyModule',
    description: {
      zh: '模块化个人时间管理工具，用日、周、月视图组织时间块，并将计划、专注与复盘放在同一工作流中。',
      en: 'A modular personal planning tool that organizes time blocks across day, week, and month views, connecting planning, focus, and review in one workflow.',
    },
    status: { zh: '持续开发', en: 'In active development' },
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase'],
    highlights: [
      { zh: '支持时间块模板、冲突检测、周计划、进度跟踪与专注视图。', en: 'Supports reusable time-block templates, conflict detection, weekly planning, progress tracking, and a focus view.' },
      { zh: '可导入 ICS 课程表，并导入或导出 JSON 备份。', en: 'Imports ICS calendars and supports JSON backup and restore.' },
      { zh: '默认使用浏览器本地存储，可选启用 Supabase 跨设备同步。', en: 'Stores data locally by default, with optional Supabase cross-device synchronization.' },
    ],
    github: 'https://github.com/Rooney-YAN/DailyModule',
    demo: 'https://rooney-yan.github.io/DailyModule/',
    selected: true,
  },
  {
    slug: 'gitmaster',
    title: 'GitMaster',
    description: {
      zh: '互动式 Git 与 GitHub 学习平台，通过浏览器内状态引擎、虚拟终端和协作流程模拟器，让初学者在操作中理解 Git。',
      en: 'An interactive Git and GitHub learning platform that uses an in-browser state engine, virtual terminal, and collaboration workflow simulator to teach by doing.',
    },
    status: { zh: 'Portfolio MVP', en: 'Portfolio MVP' },
    technologies: ['Next.js', 'TypeScript', 'React Flow', 'Monaco Editor'],
    highlights: [
      { zh: '提供 24 节结构化课程、XP 与章节解锁，学习进度保存在浏览器中。', en: 'Provides 24 structured lessons with XP, chapter unlocking, and browser-persisted learning progress.' },
      { zh: '在安全沙盒中模拟 Git 命令，实时可视化工作区、暂存区与提交图变化。', en: 'Simulates Git commands in a safe sandbox and visualizes working-tree, staging-area, and commit-graph changes.' },
      { zh: '模拟 Fork、分支、Pull Request、Code Review 与 Merge 等完整团队协作流程。', en: 'Walks learners through a full collaboration flow covering forks, branches, pull requests, code review, and merge gates.' },
    ],
    github: 'https://github.com/Rooney-YAN/GitMaster',
    demo: 'https://rooney-yan.github.io/GitMaster/',
    selected: true,
  },
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
    period: '2025 — 2029',
    location: { zh: '中国香港', en: 'Hong Kong' } satisfies LocalizedText,
    school: { zh: '香港科技大学', en: 'The Hong Kong University of Science and Technology' } satisfies LocalizedText,
    degree: { zh: '计算机科学工学学士', en: 'Bachelor of Engineering in Computer Science · Expected 2029' } satisfies LocalizedText,
    details: { zh: '', en: '' } satisfies LocalizedText,
  },
  {
    period: '2022 — 2025',
    location: { zh: '中国湖南长沙', en: 'Changsha, Hunan, China' } satisfies LocalizedText,
    school: { zh: '长郡中学', en: 'Changjun High School' } satisfies LocalizedText,
    degree: { zh: '普通高中教育', en: 'High School Diploma' } satisfies LocalizedText,
    details: { zh: '', en: '' } satisfies LocalizedText,
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
    learned: '收获', evidence: '证据', demo: '演示', github: 'GitHub', contact: '联系', contactTitle: 'Connect',
    contactText: '邮箱与社交链接', emailMe: '发送邮件', backToTop: '返回顶部',
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
    contactTitle: 'Connect', contactText: 'Email and social links.',
    emailMe: 'Email me', backToTop: 'Back to top', readArticle: 'Read article', allWriting: 'All writing', switchLanguage: '切换至中文',
    lightTheme: 'Switch to light mode', darkTheme: 'Switch to dark mode', skipToContent: 'Skip to main content', photoAlt: 'Portrait of Rooney Yan',
    notFound: 'Page not found', goHome: 'Go home',
  },
} as const
