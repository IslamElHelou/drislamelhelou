"use client"

import { useMemo, useState } from 'react'
import { trackAppointmentLead, trackContact } from '@/lib/analytics'

type Props = {
  locale: 'en' | 'ar'
  condition?: string
}

export default function AppointmentRequest({ locale, condition }: Props) {
  const isAr = locale === 'ar'
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const title = isAr ? 'طلب حجز موعد' : 'Request an appointment'
  const subtitle = isAr
    ? 'نموذج مختصر لتسهيل التواصل وتأكيد الموعد. سيتم التواصل معك لتأكيد التوقيت.'
    : 'A short request to streamline scheduling. Our team will contact you to confirm the time.'

  const defaultPreferred = useMemo(() => (isAr ? 'مساءً (مثال: 6–9)' : 'Evening (e.g., 6–9pm)'), [isAr])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') || ''),
      phone: String(fd.get('phone') || ''),
      email: String(fd.get('email') || ''),
      preferred: String(fd.get('preferred') || ''),
      condition: String(fd.get('condition') || condition || ''),
      locale,
      company: String(fd.get('company') || '')
    }

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const json = (await res.json().catch(() => null)) as any
      if (!res.ok || !json?.success) {
        setError(isAr ? 'تعذر إرسال الطلب. حاول مرة أخرى.' : 'Could not send request. Please try again.')
        setLoading(false)
        return
      }

      setSent(true)
      setLoading(false)
      trackAppointmentLead(payload.condition)

      if (json.whatsappUrl) {
        // Open WhatsApp pre-filled message in a new tab
        trackContact('whatsapp', 'appointment_success')
        window.open(json.whatsappUrl, '_blank', 'noopener,noreferrer')
      }
    } catch {
      setError(isAr ? 'تعذر إرسال الطلب. حاول مرة أخرى.' : 'Could not send request. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="leadCard" style={{ marginTop: 18 }}>
      <div className="leadTitle">{title}</div>
      <div className="leadSub">{subtitle}</div>

      {sent ? (
        <div className="leadSuccess" style={{ marginTop: 12 }}>
          {isAr
            ? 'تم استلام طلبك. سنقوم بالتواصل معك لتأكيد الموعد.'
            : 'Your request was received. We will contact you to confirm your appointment.'}
        </div>
      ) : (
        <form className="leadForm" onSubmit={onSubmit} style={{ marginTop: 12 }}>
          {/* honeypot */}
          <input name="company" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

          <div className="leadRow">
            <label className="leadLabel">{isAr ? 'الاسم الكامل' : 'Full name'}</label>
            <input className="leadInput" name="name" required placeholder={isAr ? 'اكتب الاسم' : 'Enter your name'} />
          </div>

          <div className="leadRow">
            <label className="leadLabel">{isAr ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}</label>
            <input
              className="leadInput"
              name="phone"
              required
              placeholder={isAr ? 'مثال: 010...' : 'e.g., +20 10...'}
              inputMode="tel"
            />
          </div>

          <div className="leadRow">
            <label className="leadLabel">{isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)'}</label>
            <input className="leadInput" name="email" type="email" placeholder={isAr ? 'name@email.com' : 'name@email.com'} />
          </div>

          <div className="leadRow">
            <label className="leadLabel">{isAr ? 'الوقت المفضل' : 'Preferred time'}</label>
            <input className="leadInput" name="preferred" required defaultValue={defaultPreferred} />
          </div>

          <div className="leadRow">
            <label className="leadLabel">{isAr ? 'نوع الاستشارة' : 'Consultation type'}</label>
            <select className="leadInput" name="condition" defaultValue={condition || ''}>
              <option value="">{isAr ? 'جلدية عامة' : 'General dermatology'}</option>
              <option value="acne">{isAr ? 'حب الشباب' : 'Acne'}</option>
              <option value="hair-loss">{isAr ? 'الشعر وفروة الرأس' : 'Hair & scalp'}</option>
              <option value="pigmentation">{isAr ? 'التصبغات / الكلف' : 'Pigmentation / melasma'}</option>
              <option value="rosacea">{isAr ? 'الوردية / الاحمرار' : 'Rosacea / redness'}</option>
              <option value="eczema">{isAr ? 'الإكزيما / التهاب الجلد' : 'Eczema / dermatitis'}</option>
              <option value="psoriasis">{isAr ? 'الصدفية' : 'Psoriasis'}</option>
              <option value="aesthetic">{isAr ? 'تقييم تجميلي' : 'Aesthetic evaluation'}</option>
            </select>
          </div>

          {error ? <div className="leadError">{error}</div> : null}

          <button className="leadButton" type="submit" disabled={loading}>
            {loading ? (isAr ? 'جاري الإرسال...' : 'Sending...') : isAr ? 'إرسال الطلب' : 'Send request'}
          </button>
        </form>
      )}
    </div>
  )
}
