import { Fragment, type ReactNode } from 'react'

function inline(text: string): ReactNode[] {
  const pattern = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g
  return text.split(pattern).filter(Boolean).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return <a href={link[2]} key={index} target={link[2].startsWith('http') ? '_blank' : undefined} rel={link[2].startsWith('http') ? 'noreferrer' : undefined}>{link[1]}</a>
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>
    return <Fragment key={index}>{part}</Fragment>
  })
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r/g, '').split('\n')
  const blocks: ReactNode[] = []
  let index = 0
  while (index < lines.length) {
    const line = lines[index]
    if (!line.trim()) { index += 1; continue }
    if (line.startsWith('```')) {
      const language = line.slice(3).trim()
      const code: string[] = []
      index += 1
      while (index < lines.length && !lines[index].startsWith('```')) { code.push(lines[index]); index += 1 }
      blocks.push(<pre key={blocks.length}><code className={language ? `language-${language}` : undefined}>{code.join('\n')}</code></pre>)
      index += 1
      continue
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      const level = heading[1].length
      if (level === 1) blocks.push(<h2 key={blocks.length}>{inline(heading[2])}</h2>)
      else if (level === 2) blocks.push(<h3 key={blocks.length}>{inline(heading[2])}</h3>)
      else blocks.push(<h4 key={blocks.length}>{inline(heading[2])}</h4>)
      index += 1
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) { items.push(lines[index].replace(/^[-*]\s+/, '')); index += 1 }
      blocks.push(<ul key={blocks.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>)
      continue
    }
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) { items.push(lines[index].replace(/^\d+\.\s+/, '')); index += 1 }
      blocks.push(<ol key={blocks.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ol>)
      continue
    }
    if (line.startsWith('> ')) { blocks.push(<blockquote key={blocks.length}>{inline(line.slice(2))}</blockquote>); index += 1; continue }
    const paragraph = [line]
    index += 1
    while (index < lines.length && lines[index].trim() && !/^(#{1,3})\s|^```|^[-*]\s+|^\d+\.\s+|^> /.test(lines[index])) { paragraph.push(lines[index]); index += 1 }
    blocks.push(<p key={blocks.length}>{inline(paragraph.join(' '))}</p>)
  }
  return <>{blocks}</>
}
