import Link from 'next/link'
import type { TocItem } from '@/lib/mdx'

export default function Toc({ items, lang }: { items: TocItem[]; lang: 'en' | 'ar' }) {
  if (!items?.length) return null
  const title = lang === 'ar' ? 'المحتويات' : 'On this page'

  return (
    <aside className="toc">
      <div className="tocCard">
        <div className="tocTitle">{title}</div>
        <nav aria-label={title}>
          <ul className="tocList">
            {items.map((it) => (
              <li key={it.id} className={it.level === 3 ? 'tocItem tocItemL3' : 'tocItem'}>
                <Link href={`#${it.id}`} className="tocLink">
                  {it.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
