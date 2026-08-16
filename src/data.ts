export type Language = 'zh' | 'en'

type LocalizedText = Record<Language, string>

export const profile = {
  name: 'Yan Zhixiang',
  initials: 'YZ',
  role: {
    zh: '计算机科学学生 · 软件开发者',
    en: 'Computer Science Student · Software Developer',
  } satisfies LocalizedText,
  location: {
    zh: '中国香港',
    en: 'Hong Kong, China',
  } satisfies LocalizedText,
  email: 'zyanbs@connect.ust.hk',
  summary: {
    zh: '我关注软件开发、数据分析与人机交互。我喜欢把复杂问题梳理清楚，并用可靠、易用的技术方案解决真实需求。',
    en: 'I am interested in software development, data analysis, and human-computer interaction. I enjoy making complex problems clear and building reliable, useful solutions for real needs.',
  } satisfies LocalizedText,
  availability: {
    zh: '目前在香港学习，欢迎交流研究、实习与合作机会。',
    en: 'Currently studying in Hong Kong and open to research, internship, and collaboration opportunities.',
  } satisfies LocalizedText,
  resumeUrl: '',
  photoUrl: '',
  links: [
    { label: 'GitHub', href: 'https://github.com/Rooney-YAN' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zhixiang-yan-2302ab3aa/' },
  ],
}

export const experience = [
  {
    period: { zh: '2025 — 至今', en: '2025 — Present' } satisfies LocalizedText,
    location: { zh: '中国香港', en: 'Hong Kong' } satisfies LocalizedText,
    role: { zh: '职位名称', en: 'Position Title' } satisfies LocalizedText,
    organization: { zh: '公司 / 实验室名称', en: 'Company / Laboratory' } satisfies LocalizedText,
    highlights: {
      zh: [
        '在这里说明你负责的主要工作，最好包含使用的方法、技术或工具。',
        '补充工作产生的结果；如有数据，可用百分比或数量体现影响。',
      ],
      en: [
        'Describe your main responsibility here, including the methods, technologies, or tools you used.',
        'Add the outcome of your work; use a percentage or number when it helps show the impact.',
      ],
    },
  },
  {
    period: { zh: '2024 — 2025', en: '2024 — 2025' } satisfies LocalizedText,
    location: { zh: '中国香港', en: 'Hong Kong' } satisfies LocalizedText,
    role: { zh: '研究助理 / 实习生', en: 'Research Assistant / Intern' } satisfies LocalizedText,
    organization: { zh: '机构名称', en: 'Organization Name' } satisfies LocalizedText,
    highlights: {
      zh: [
        '用一到两句话概括这段经历中最重要的工作。',
        '强调与你目标岗位、研究方向或个人能力最相关的成果。',
      ],
      en: [
        'Summarize the most important work from this experience in one or two sentences.',
        'Highlight the outcome most relevant to your target role, research interest, or strengths.',
      ],
    },
  },
]

export const projects = [
  {
    period: '2025',
    title: 'Project Atlas',
    description: {
      zh: '帮助学生整理研究资料、建立笔记关联的轻量知识管理工具。负责需求分析、界面设计与前端实现。',
      en: 'A lightweight knowledge tool that helps students organize research materials and connect notes. I worked on product definition, interface design, and frontend development.',
    } satisfies LocalizedText,
    technologies: ['React', 'TypeScript', 'Vite'],
    href: 'https://github.com/Rooney-YAN',
  },
  {
    period: '2024',
    title: 'Signal Lab',
    description: {
      zh: '针对公开数据集完成清洗、分析与可视化，并将主要发现整理成可交互的网页报告。',
      en: 'A data project that cleans, analyzes, and visualizes a public dataset, presenting the main findings in an interactive web report.',
    } satisfies LocalizedText,
    technologies: ['Python', 'Pandas', 'Data Visualization'],
    href: 'https://github.com/Rooney-YAN',
  },
  {
    period: '2024',
    title: 'Small Tools',
    description: {
      zh: '一组解决日常问题的开源小工具，涵盖信息整理、文件处理和网页自动化。',
      en: 'A collection of small open-source utilities for information organization, file processing, and web automation.',
    } satisfies LocalizedText,
    technologies: ['JavaScript', 'Python', 'Git'],
    href: 'https://github.com/Rooney-YAN',
  },
]

export const education = [
  {
    period: '2023 — 2027',
    location: { zh: '中国香港', en: 'Hong Kong' } satisfies LocalizedText,
    school: {
      zh: '香港科技大学',
      en: 'The Hong Kong University of Science and Technology',
    } satisfies LocalizedText,
    degree: {
      zh: '计算机科学理学学士',
      en: 'B.Sc. in Computer Science',
    } satisfies LocalizedText,
    details: {
      zh: '相关课程：数据结构、算法、数据库、软件工程与机器学习。',
      en: 'Relevant coursework: Data Structures, Algorithms, Databases, Software Engineering, and Machine Learning.',
    } satisfies LocalizedText,
  },
]

export const skillGroups = [
  {
    label: { zh: '编程语言', en: 'Languages' } satisfies LocalizedText,
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: { zh: '开发工具', en: 'Tools' } satisfies LocalizedText,
    items: ['React', 'Git', 'GitHub', 'Vite'],
  },
  {
    label: { zh: '其他能力', en: 'Additional' } satisfies LocalizedText,
    items: {
      zh: ['数据分析', '产品设计', '技术写作'],
      en: ['Data Analysis', 'Product Design', 'Technical Writing'],
    },
  },
  {
    label: { zh: '语言能力', en: 'Spoken' } satisfies LocalizedText,
    items: { zh: ['中文', '英语'], en: ['Chinese', 'English'] },
  },
]

export const ui = {
  zh: {
    navLabel: '页面导航',
    about: '关于',
    resume: '简历',
    projects: '项目',
    contact: '联系',
    eyebrow: '个人主页 / 在线简历',
    introduction: '个人简介',
    experience: '经历',
    education: '教育',
    skills: '技能',
    selectedProjects: '代表项目',
    viewProject: '查看项目',
    downloadResume: '下载 PDF 简历',
    contactTitle: '保持联系',
    contactText: '如果你对我的经历、项目或合作方向感兴趣，欢迎给我发邮件。',
    emailMe: '发送邮件',
    backToTop: '返回顶部',
    switchLanguage: 'Switch to English',
    lightTheme: '切换至浅色模式',
    darkTheme: '切换至深色模式',
    skipToContent: '跳转至主要内容',
    photoAlt: 'Yan Zhixiang 的个人照片',
  },
  en: {
    navLabel: 'Page navigation',
    about: 'About',
    resume: 'Resume',
    projects: 'Projects',
    contact: 'Contact',
    eyebrow: 'Personal website / CV',
    introduction: 'Profile',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    selectedProjects: 'Selected Projects',
    viewProject: 'View project',
    downloadResume: 'Download PDF resume',
    contactTitle: 'Let’s connect',
    contactText: 'If you would like to discuss my experience, projects, or a possible collaboration, feel free to send me an email.',
    emailMe: 'Email me',
    backToTop: 'Back to top',
    switchLanguage: '切换至中文',
    lightTheme: 'Switch to light mode',
    darkTheme: 'Switch to dark mode',
    skipToContent: 'Skip to main content',
    photoAlt: 'Portrait of Yan Zhixiang',
  },
} as const
