import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface RelatedBlog {
  slug: string
  title: string
  description: string
}

const relatedBlogsByModule: Record<string, Record<'en' | 'ar', RelatedBlog[]>> = {
  'skin-aging': {
    en: [
      {
        slug: 'anti-aging-skincare',
        title: 'Anti-aging skincare: prevention and correction',
        description: 'Evidence-based approaches with realistic timelines for sun protection, retinoids, and professional treatments.'
      },
      {
        slug: 'injectable-treatments-guide',
        title: 'Injectable and laser treatments: what to expect',
        description: 'Practical guide to Botox, fillers, lasers—how they work, realistic results, and important questions to ask.'
      }
    ],
    ar: [
      {
        slug: 'anti-aging-skincare',
        title: 'العناية المضادة لشيخوخة الجلد: الوقاية والتصحيح',
        description: 'نهج مبني على الأدلة للتعامل مع الخطوط الدقيقة وفقدان المرونة وتغيرات نسيج البشرة.'
      },
      {
        slug: 'injectable-treatments-guide',
        title: 'دليل الحقن التجميلي والليزر: ماذا تتوقعين؟',
        description: 'شرح عملي للبوتوكس®، ديسبورت®، الفيلر والليزر: آلية العمل، النتائج الواقعية، وفترة التعافي.'
      }
    ]
  },
  'aesthetic-goals': {
    en: [
      {
        slug: 'anti-aging-skincare',
        title: 'Anti-aging skincare: prevention and correction',
        description: 'Evidence-based approaches with realistic timelines for sun protection, retinoids, and professional treatments.'
      },
      {
        slug: 'injectable-treatments-guide',
        title: 'Injectable and laser treatments: what to expect',
        description: 'Practical guide to Botox, fillers, lasers—how they work, realistic results, and important questions to ask.'
      }
    ],
    ar: [
      {
        slug: 'anti-aging-skincare',
        title: 'العناية المضادة لشيخوخة الجلد: الوقاية والتصحيح',
        description: 'نهج مبني على الأدلة للتعامل مع الخطوط الدقيقة وفقدان المرونة وتغيرات نسيج البشرة.'
      },
      {
        slug: 'injectable-treatments-guide',
        title: 'دليل الحقن التجميلي والليزر: ماذا تتوقعين؟',
        description: 'شرح عملي للبوتوكس®، ديسبورت®، الفيلر والليزر: آلية العمل، النتائج الواقعية، وفترة التعافي.'
      }
    ]
  },
  acne: {
    en: [
      {
        slug: 'acne-basics',
        title: 'Acne: what helps (and what usually doesn\'t)',
        description: 'A practical guide to acne treatment: timelines, common mistakes, and when to see a dermatologist.'
      }
    ],
    ar: [
      {
        slug: 'acne-basics',
        title: 'حب الشباب: ما الذي يُحسّن الحالة فعلاً؟',
        description: 'دليل عملي مبني على الأدلة لعلاج حب الشباب: المدة المتوقعة، الأخطاء الشائعة، ومتى تحتاج مراجعة طبيب الجلدية.'
      }
    ]
  }
}

export function RelatedBlogs({ moduleSlug, locale }: { moduleSlug: string; locale: Locale }) {
  const blogs = relatedBlogsByModule[moduleSlug]?.[locale]

  if (!blogs || blogs.length === 0) return null

  const labels = {
    en: {
      title: 'Related Blog Posts',
      explore: 'Read Article'
    },
    ar: {
      title: 'منشورات مدونة ذات صلة',
      explore: 'اقرأ المقال'
    }
  }

  const t = labels[locale]
  const base = `/${locale}`

  return (
    <section className="section" style={{ marginTop: '3rem' }}>
      <div className="container">
        <h2 style={{ marginBottom: '1.5rem' }}>{t.title}</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {blogs.map((blog) => (
            <Link href={`${base}/blog/${blog.slug}`} key={blog.slug}>
              <div
                className="card"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  textDecoration: 'none'
                }}
              >
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>{blog.title}</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
                  {blog.description}
                </p>
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{t.explore} →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
