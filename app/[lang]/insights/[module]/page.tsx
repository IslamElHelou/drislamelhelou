import type { Locale } from '@/lib/i18n'
import { isLocale } from '@/lib/i18n'
import { getInsightModule } from '@/lib/insights/modules'
import InsightTool from '@/components/InsightTool'
import { notFound } from 'next/navigation'

export default async function InsightModulePage({
  params
}: {
  params: Promise<{ lang: string; module: string }>
}) {
  const { lang, module: moduleSlug } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const module = getInsightModule(moduleSlug)
  if (!module) return notFound()

  return (
    <section className="section">
      <div className="container">
        <InsightTool locale={locale} moduleSlug={moduleSlug} />
      </div>
    </section>
  )
}
