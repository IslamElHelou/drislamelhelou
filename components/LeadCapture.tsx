'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
  condition: string
  level: string
}

export default function LeadCapture({ locale, condition, level }: Props) {
  const isAr = locale === 'ar'
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      // honeypot
      company: String(fd.get('company') || '').trim(),
      condition,
      level
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const j = await res.json().catch(() => null)
        setError(j?.error || (isAr ? 'تعذر الإرسال. حاول مرة أخرى.' : 'Unable to send. Please try again.'))
        setLoading(false)
        return
      }

      setOk(true)
      setLoading(false)
    } catch {
      setError(isAr ? 'تعذر الإرسال. حاول مرة أخرى.' : 'Unable to send. Please try again.')
      setLoading(false)
    }
  }

  if (ok) {
    return (
      <div className="leadCard" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="leadTitle">{isAr ? 'تم استلام طلبك' : 'Request received'}</div>
        <div className="leadDesc">
          {isAr
            ? 'تم استلام طلب الملخص التعليمي. قد يتواصل فريق العيادة معك للمتابعة.'
            : 'Your educational summary request has been received. Our team may contact you for follow-up.'}
        </div>
      </div>
    )
  }

  return (
    <div className="leadCard" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="leadKicker">{isAr ? 'ملخص تعليمي' : 'Clinical summary'}</div>
      <div className="leadTitle">
        {isAr ? 'استلم ملخصًا منظمًا للنتيجة' : 'Receive a structured summary'}
      </div>
      <div className="goldLine" aria-hidden />
      <p className="leadDesc">
        {isAr
          ? 'إذا رغبت، يمكنك طلب ملخص تعليمي مختصر وإرشادات متابعة بشكل خاص. (دون أي رسائل دعائية)'
          : 'If you wish, you may request a brief educational summary and follow-up guidance privately. (No promotional messages)'}
      </p>

      <form className="leadForm" onSubmit={onSubmit}>
        {/* honeypot */}
        <input
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="leadHoneypot"
          aria-hidden="true"
        />

        <div className="leadRow">
          <label className="leadLabel">
            {isAr ? 'الاسم الكامل' : 'Full name'}
            <input className="leadInput" name="name" required minLength={2} />
          </label>
        </div>

        <div className="leadRow leadRow2">
          <label className="leadLabel">
            Email
            <input className="leadInput" name="email" type="email" required />
          </label>

          <label className="leadLabel">
            {isAr ? 'واتساب (اختياري)' : 'WhatsApp (optional)'}
            <input className="leadInput" name="phone" inputMode="tel" placeholder="+20…" />
          </label>
        </div>

        <label className="leadCheck">
          <input type="checkbox" required />
          <span>
            {isAr
              ? 'أفهم أن هذه إرشادات تعليمية ولا تُعد تشخيصًا أو بديلًا عن الاستشارة الطبية.'
              : 'I understand this is educational guidance and does not replace medical consultation.'}
          </span>
        </label>

        {error ? <div className="leadError">{error}</div> : null}

        <div className="leadActions">
          <button type="submit" className="btnPrimary" disabled={loading}>
            {loading ? (isAr ? 'جاري الإرسال...' : 'Sending...') : isAr ? 'طلب الملخص' : 'Request summary'}
          </button>
        </div>
      </form>
    </div>
  )
}
