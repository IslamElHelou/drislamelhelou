import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { isLocale } from '@/lib/i18n'

export default function NotFound({ params }: { params?: { lang?: string } }) {
  const lang = params?.lang
  const locale = (lang && isLocale(lang) ? lang : 'en') as Locale
  return (
    <section className="section">
      <div className="container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h1 style={{ marginTop: 0 }}>{locale === 'ar' ? 'الصفحة غير موجودة' : 'Page not found'}</h1>
          <p style={{ color: 'var(--muted)' }}>{locale === 'ar' ? 'تحقق من الرابط أو ارجع للرئيسية.' : 'Check the link or go back home.'}</p>
          <Link className="btn btnPrimary" href={`/${locale}`}>
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
        </div>
      </div>
    </section>
  )
}
