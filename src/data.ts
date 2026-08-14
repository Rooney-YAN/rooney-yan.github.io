export const profile = {
  name: 'Yan Zhixiang',
  role: 'Computer Science Student',
  location: 'Hong Kong',
  email: 'hello@example.com',
  summary:
    '我是一名计算机科学学生，关注软件开发、数据分析与人机交互。我喜欢理解真实问题，并通过清晰、可靠的技术方案解决它们。',
  resumeUrl: '#',
  links: [
    { label: 'GitHub', href: 'https://github.com/your-username' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-username' },
  ],
}

export const experience = [
  {
    period: '2025 — 至今',
    location: 'Hong Kong',
    role: '职位名称',
    organization: '公司 / 实验室名称',
    highlights: [
      '说明你负责的主要工作，最好包含使用的方法、技术或工具。',
      '说明工作产生的结果；如有数据，可用百分比或数量体现影响。',
    ],
  },
  {
    period: '2024 — 2025',
    location: 'Hong Kong',
    role: '研究助理 / 实习生',
    organization: '机构名称',
    highlights: [
      '用一到两句话概括这段经历中最重要的工作。',
      '强调与你目标岗位、研究方向或个人能力最相关的成果。',
    ],
  },
]

export const projects = [
  {
    period: '2025',
    title: 'Project Atlas',
    description: '帮助学生整理研究资料、建立笔记关联的轻量知识管理工具。负责需求分析、界面设计与前端实现。',
    technologies: ['React', 'TypeScript', 'Vite'],
    href: 'https://github.com/your-username/project-atlas',
  },
  {
    period: '2024',
    title: 'Signal Lab',
    description: '针对公开数据集完成清洗、分析与可视化，并将主要发现整理成可交互的网页报告。',
    technologies: ['Python', 'Pandas', 'Data Visualization'],
    href: 'https://github.com/your-username/signal-lab',
  },
  {
    period: '2024',
    title: 'Small Tools',
    description: '一组用于解决日常问题的开源小工具，涵盖信息整理、文件处理和网页自动化。',
    technologies: ['JavaScript', 'Python', 'Git'],
    href: 'https://github.com/your-username',
  },
]

export const education = [
  {
    period: '2023 — 2027',
    location: 'Hong Kong',
    school: 'Your University',
    degree: 'B.Sc. in Computer Science',
    details: '相关课程：数据结构、算法、数据库、软件工程、机器学习。',
  },
]

export const skillGroups = [
  { label: '编程语言', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
  { label: '开发工具', items: ['React', 'Git', 'GitHub', 'Vite'] },
  { label: '其他能力', items: ['数据分析', '产品设计', '技术写作'] },
  { label: '语言', items: ['中文', 'English'] },
]
