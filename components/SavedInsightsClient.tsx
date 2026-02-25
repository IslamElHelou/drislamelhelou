'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { loadSaved, removeSaved, type SavedInsight } from '@/lib/insights/saved'
import { insightModules } from '@/lib/insights/modules'

function format(locale: Locale, ms: number) {
  try {
    return new Date(ms).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    })
  } catch {
    return ''
  }
}

function levelLabel(locale: Locale, lvl: SavedInsight['level']) {
  const isAr = locale === 'ar'
  if (lvl === 'priority') return isAr ? 'أولوية' : 'Priority'
  if (lvl === 'evaluation') return isAr ? 'يُفضّل التقييم' : 'Needs evaluation'
  return isAr ? 'إرشادي' : 'Informational'
}

export default function SavedInsightsClient({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar'
  const [items, setItems] = useState<SavedInsight[]>([])

  useEffect(() => {
    setItems(loadSaved())
  }, [])

  if (!items.length) return null

  return (
    <div style={{ marginTop: 18 }} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="journalKicker">{isAr ? 'محفوظاتك' : 'Saved summaries'}</div>
      <div className="goldLine" aria-hidden />

      <div className="journalList" style={{ marginTop: 12 }}>
        {items.map((it) => {
          const moduleTitle = insightModules.find((m) => m.slug === it.module)?.title?.[locale]
          return (
            <div key={it.id} className="journalItem" style={{ display: 'grid', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
                <div style={{ fontWeight: 900 }}>
                  {moduleTitle ?? (isAr ? 'ملخص' : 'Summary')}
                </div>
                <div className="journalItemMeta">{format(locale, it.at)}</div>
              </div>

              <div className="muted" style={{ fontSize: '.92rem' }}>
                {levelLabel(locale, it.level)}
              </div>

              <div style={{ lineHeight: 1.6 }}>
                {locale === 'ar' ? it.summary.ar : it.summary.en}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
                <Link className="journalRead" href={`/${locale}/insights/${it.module}`}>
                  {isAr ? 'فتح الأداة' : 'Open tool'}
                </Link>
                <button
                  type="button"
                  className="btnTertiary"
                  onClick={() => {
                    removeSaved(it.id)
                    setItems(loadSaved())
                  }}
                >
                  {isAr ? 'حذف' : 'Remove'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
