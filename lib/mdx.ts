import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import GithubSlugger from 'github-slugger'
import type { Locale } from '@/lib/i18n'

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  tags?: string[]
  image?: string
}

export type TocItem = {
  level: 2 | 3
  text: string
  id: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'blog')

function getLocaleDir(locale: Locale) {
  return path.join(CONTENT_ROOT, locale)
}

export function getAllPostSlugs(locale: Locale) {
  const dir = getLocaleDir(locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getAllPosts(locale: Locale) {
  const slugs = getAllPostSlugs(locale)
  const posts = slugs
    .map((slug) => {
      const file = path.join(getLocaleDir(locale), `${slug}.mdx`)
      const raw = fs.readFileSync(file, 'utf8')
      const { data } = matter(raw)
      return { slug, ...(data as BlogFrontmatter) }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}

export async function getPost(locale: Locale, slug: string) {
  const file = path.join(getLocaleDir(locale), `${slug}.mdx`)
  const raw = fs.readFileSync(file, 'utf8')
  const { content, data } = matter(raw)

  // Table of contents: collect H2/H3 headings in order.
  // We use github-slugger to match rehype-slug IDs.
  const slugger = new GithubSlugger()
  const toc: TocItem[] = []
  for (const line of content.split(/\r?\n/)) {
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!m) continue
    const level = m[1].length
    if (level !== 2 && level !== 3) continue
    const text = m[2].replace(/`/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1').trim()
    if (!text) continue
    toc.push({ level: level as 2 | 3, text, id: slugger.slug(text) })
  }

  // Reading time (rough): count words excluding code blocks.
  const withoutCode = content.replace(/```[\s\S]*?```/g, ' ')
  const plain = withoutCode
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]+\}/g, ' ')
    .replace(/[#>*_~`]/g, ' ')
  const words = plain.trim().split(/\s+/).filter(Boolean).length
  const readingTimeMinutes = Math.max(1, Math.round(words / 200))

  const compiled = await compileMDX<BlogFrontmatter>({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug]
      }
    }
  })

  return {
    frontmatter: data as BlogFrontmatter,
    content: compiled.content,
    toc,
    readingTimeMinutes
  }
}
