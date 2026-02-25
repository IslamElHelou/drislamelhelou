'use client'

import { useMemo, useState } from 'react'

import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionaries'
import { clinic } from '@/lib/i18n'

import { MotionFadeInUp } from '@/components/Motion'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactClient({
  locale,
  t,
}: {
  locale: Locale
  t: Dictionary
}) {
  const dir = useMemo(() => (locale === 'ar' ? 'rtl' : 'ltr'), [locale])
  const [status, setStatus] = useState<Status>('idle')

  return (
    <main className="container" dir={dir}>
      <header className="section">
        <MotionFadeInUp>
          <h1 className="h1">{t.contact.title}</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            {t.contact.subtitle}
          </p>
        </MotionFadeInUp>
      </header>

      <section className="grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
        <div className="card" style={{ gridColumn: 'span 7' }}>
          <h2 className="h2" style={{ marginTop: 0 }}>
            {t.contact.formTitle}
          </h2>
          <p className="muted">{t.contact.formHint}</p>

          <form
            className="stack"
            onSubmit={async (e) => {
              e.preventDefault()
              setStatus('sending')

              try {
                // No backend yet: this is a placeholder to keep UX clean.
                await new Promise((r) => setTimeout(r, 700))
                setStatus('sent')
              } catch {
                setStatus('error')
              }
            }}
          >
            <label className="field">
              <span>{t.contact.name}</span>
              <input className="input" required placeholder={t.contact.namePh} />
            </label>
            <label className="field">
              <span>{t.contact.phone}</span>
              <input className="input" required placeholder={t.contact.phonePh} />
            </label>
            <label className="field">
              <span>{t.contact.message}</span>
              <textarea className="textarea" required placeholder={t.contact.messagePh} />
            </label>

            <button className="button" type="submit" disabled={status === 'sending'}>
              {status === 'idle' && t.contact.send}
              {status === 'sending' && t.contact.sending}
              {status === 'sent' && t.contact.sent}
              {status === 'error' && t.contact.error}
            </button>
          </form>
        </div>

        <div className="card" style={{ gridColumn: 'span 5' }}>
          <h2 className="h2" style={{ marginTop: 0 }}>
            {t.contact.detailsTitle}
          </h2>

          <div className="stack">
            <div>
              <div className="muted" style={{ marginBottom: 6 }}>
                {t.contact.addressLabel}
              </div>
              <div style={{ lineHeight: 1.7 }}>
                {locale === 'ar' ? clinic.addressAr : clinic.addressEn}
              </div>
            </div>

            <div>
              <div className="muted" style={{ marginBottom: 6 }}>
                {t.contact.phoneLabel}
              </div>
              <a className="link" href={`tel:${clinic.phoneE164}`}>
                {clinic.phoneE164}
              </a>
              <div className="muted" style={{ marginTop: 6 }}>
                {t.contact.whatsappHint}
              </div>
            </div>

            <div>
              <div className="muted" style={{ marginBottom: 8 }}>
                {t.contact.mapLabel}
              </div>
              <div style={{ marginBottom: 10 }}>
                <a className="link" href={clinic.googleMapsDirectionsUrl} target="_blank" rel="noreferrer">
                  {locale === 'ar' ? 'افتح الاتجاهات في خرائط Google' : 'Open directions in Google Maps'}
                </a>
              </div>
              <div className="mapWrap">
                <iframe
                  title="Google Map"
                  src={clinic.mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
