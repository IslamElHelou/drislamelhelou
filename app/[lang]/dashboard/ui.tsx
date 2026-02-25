'use client'

import { useMemo, useState } from 'react'

import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionaries'

import { MotionFadeInUp } from '@/components/Motion'

export default function DashboardClient({
  locale,
  t,
}: {
  locale: Locale
  t: Dictionary
}) {
  const dir = useMemo(() => (locale === 'ar' ? 'rtl' : 'ltr'), [locale])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <main className="container" dir={dir}>
      <header className="section">
        <MotionFadeInUp>
          <h1 className="h1">{t.dashboard.title}</h1>
          <p className="muted" style={{ maxWidth: 820 }}>
            {t.dashboard.subtitle}
          </p>
        </MotionFadeInUp>
      </header>

      <section className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
        <div className="card" style={{ gridColumn: 'span 7' }}>
          <h2 className="h2" style={{ marginTop: 0 }}>
            {t.dashboard.newPostTitle}
          </h2>
          <p className="muted">{t.dashboard.newPostHint}</p>

          <div className="stack">
            <label className="field">
              <span>{t.dashboard.postTitle}</span>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.dashboard.postTitlePh}
              />
            </label>
            <label className="field">
              <span>{t.dashboard.postDescription}</span>
              <textarea
                className="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.dashboard.postDescriptionPh}
              />
            </label>
            <button
              className="button"
              onClick={() => {
                // Placeholder. In a later iteration we can connect to a DB / CMS.
                alert(t.dashboard.notConnected)
              }}
            >
              {t.dashboard.createDraft}
            </button>
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 5' }}>
          <h2 className="h2" style={{ marginTop: 0 }}>
            {t.dashboard.howItWorksTitle}
          </h2>
          <ol style={{ lineHeight: 1.8, paddingInlineStart: 18 }}>
            <li>{t.dashboard.step1}</li>
            <li>{t.dashboard.step2}</li>
            <li>{t.dashboard.step3}</li>
          </ol>
          <p className="muted" style={{ marginTop: 12 }}>
            {t.dashboard.securityNote}
          </p>
        </div>
      </section>
    </main>
  )
}
