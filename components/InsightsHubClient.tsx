'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { insightModules } from '@/lib/insights/modules'

const STORAGE_PREFIX = 'insight:last:'

type LastState = Record<string, { at: number } | null>

export default function InsightsHubClient({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar'
  const [last, setLast] = useState<LastState>({})

  useEffect(() => {
    const next: LastState = {}
    for (const m of insightModules) {
      try {
        const raw = localStorage.getItem(`${STORAGE_PREFIX}${m.slug}`)
        if (!raw) {
          next[m.slug] = null
          continue
        }
        const parsed = JSON.parse(raw)
        next[m.slug] = typeof parsed?.at === 'number' ? { at: parsed.at } : null
      } catch {
        next[m.slug] = null
      }
    }
    setLast(next)
  }, [])

  const format = (ms: number) => {
    try {
      return new Date(ms).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return ''
    }
  }

  return (
    <div className="insightHubGrid" dir={isAr ? 'rtl' : 'ltr'}>
      {insightModules.map((m) => {
        const lastAt = last[m.slug]?.at
        return (
          <Link key={m.slug} href={`/${locale}/insights/${m.slug}`} className="insightHubCard">
            <div className="insightHubTop">
              <div className="insightHubTitle">{m.title[locale]}</div>
              <div className="insightHubMeta">
                {lastAt
                  ? isAr
                    ? `آخر استخدام: ${format(lastAt)}`
                    : `Last used: ${format(lastAt)}`
                  : isAr
                    ? 'أداة تعليمية منظمة'
                    : 'Structured educational tool'}
              </div>
            </div>
            <div className="insightHubDesc">{m.description[locale]}</div>
            <div className="journalRead">{isAr ? 'ابدأ الآن' : 'Start now'}</div>
          </Link>
        )
      })}
    </div>
  )
}
