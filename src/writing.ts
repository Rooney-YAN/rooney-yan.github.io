import type { Language } from './data'

export type Article = {
  slug: string
  title: string
  date: string
  category: 'Technology' | 'Markets' | 'Ideas'
  tags: string[]
  language: Language | 'both'
  excerpt: string
  content: string
}

const files = import.meta.glob('./content/writing/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function parseFrontMatter(source: string, fallbackSlug: string): Article | null {
  if (fallbackSlug.startsWith('_')) return null
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return null
  const values: Record<string, string> = {}
  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(':')
    if (separator > 0) values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')
  })
  if (!values.title || !values.date || !values.category || !values.language) return null
  const category = values.category as Article['category']
  const language = values.language as Article['language']
  if (!['Technology', 'Markets', 'Ideas'].includes(category) || !['zh', 'en', 'both'].includes(language)) return null
  return {
    slug: values.slug || fallbackSlug,
    title: values.title,
    date: values.date,
    category,
    language,
    tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
    excerpt: values.excerpt || '',
    content: match[2].trim(),
  }
}

export const articles = Object.entries(files)
  .map(([path, source]) => parseFrontMatter(source, path.split('/').pop()!.replace(/\.md$/, '')))
  .filter((article): article is Article => article !== null)
  .sort((a, b) => b.date.localeCompare(a.date))
