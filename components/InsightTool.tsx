'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { clinic } from '@/lib/i18n'
import { getInsightModule } from '@/lib/insights/modules'
import { insightRecommendations } from '@/lib/insights/recommendations'
import { saveInsight } from '@/lib/insights/saved'
import LeadCapture from '@/components/LeadCapture'
import AppointmentRequest from '@/components/AppointmentRequest'

type Props = {
  locale: Locale
  moduleSlug: string
}

const STORAGE_PREFIX = 'insight:last:'
const STORAGE_LASTRUN = 'drislam:insights:lastRun'

export default function InsightTool({ locale, moduleSlug }: Props) {
  const module = useMemo(() => getInsightModule(moduleSlug), [moduleSlug])
  const isAr = locale === 'ar'
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!module) return null
  const activeModule = module

  const questions = activeModule.questions
  const current = questions[step]

  const result = useMemo(() => {
    if (!done) return null
    return activeModule.evaluate(answers, locale)
  }, [done, answers, locale, activeModule])

  function onSelect(qid: string, oid: string) {
    setAnswers((prev) => ({ ...prev, [qid]: oid }))
  }

  function canContinue() {
    if (!current) return false
    return Boolean(answers[current.id])
  }

  function next() {
    if (step < questions.length - 1) {
      setStep((s) => s + 1)
      return
    }
    setDone(true)
    setSaved(false)
    try {
      const payload = {
        at: Date.now(),
        module: activeModule.slug,
        locale,
        answers
      }
      localStorage.setItem(`${STORAGE_PREFIX}${activeModule.slug}`, JSON.stringify(payload))
      localStorage.setItem(
        STORAGE_LASTRUN,
        JSON.stringify({ at: payload.at, module: payload.module })
      )
    } catch {
      // ignore
    }
  }

  function back() {
    if (done) {
      setDone(false)
      setStep(0)
      return
    }
    setStep((s) => Math.max(0, s - 1))
  }

  function reset() {
    setAnswers({})
    setDone(false)
    setStep(0)
    setSaved(false)
  }

  function onSave() {
    if (!result) return
    try {
      saveInsight({
        module: activeModule.slug,
        at: Date.now(),
        level: result.level,
        summary: {
          en: result.summary.en,
          ar: result.summary.ar
        }
      })
      setSaved(true)
    } catch {
      // ignore
    }
  }

  const levelLabel = (lvl: string) => {
    if (lvl === 'priority') return isAr ? 'أولوية' : 'Priority'
    if (lvl === 'evaluation') return isAr ? 'يُفضّل التقييم' : 'Needs evaluation'
    return isAr ? 'إرشادي' : 'Informational'
  }

  return (
    <div className="insightWrap" dir={isAr ? 'rtl' : 'ltr'}>
      {!done ? (
        <>
          <div className="insightHeader">
            <div className="journalKicker">{isAr ? 'إرشادات تفاعلية' : 'Interactive Insights'}</div>
            <h1 className="journalTitle">{activeModule.title[locale]}</h1>
            <div className="goldLine" aria-hidden />
            <p className="journalLead">{activeModule.description[locale]}</p>
          </div>

          <div className="insightCard">
            <div className="insightStepRow">
              <div className="insightStep">{isAr ? `الخطوة ${step + 1} من ${questions.length}` : `Step ${step + 1} of ${questions.length}`}</div>
            </div>

            <div className="insightQ">
              <div className="insightQTitle">{current.title[locale]}</div>
              {current.helper ? <div className="insightQHelper">{current.helper[locale]}</div> : null}
            </div>

            <div className="insightOptions">
              {current.options.map((opt) => {
                const active = answers[current.id] === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`insightOption ${active ? 'active' : ''}`}
                    onClick={() => onSelect(current.id, opt.id)}
                  >
                    <span className="insightDot" aria-hidden />
                    <span>{opt.label[locale]}</span>
                  </button>
                )
              })}
            </div>

            <div className="insightActions">
              <button type="button" className="btnSecondary" onClick={back} disabled={step === 0}>
                {isAr ? 'رجوع' : 'Back'}
              </button>
              <button type="button" className="btnPrimary" onClick={next} disabled={!canContinue()}>
                {step === questions.length - 1 ? (isAr ? 'عرض النتيجة' : 'View result') : isAr ? 'التالي' : 'Continue'}
              </button>
            </div>
          </div>

          <div className="insightNote">
            {isAr
              ? 'ملاحظة: هذه الأداة تعليمية ولا تُعد تشخيصًا أو بديلًا عن الاستشارة الطبية.'
              : 'Note: This tool provides educational guidance and does not replace clinical consultation.'}
          </div>
        </>
      ) : (
        <>
          <div className="insightHeader">
            <div className="journalKicker">{isAr ? 'النتيجة' : 'Result'}</div>
            <h1 className="journalTitle">{activeModule.title[locale]}</h1>
            <div className="goldLine" aria-hidden />
          </div>

          {result ? (
            <div className="insightResultCard">
              <div className="insightBadge">
                <span className="insightBadgeLabel">{levelLabel(result.level)}</span>
                <span className="insightBadgeSub">{isAr ? 'إرشاد طبي منظم' : 'Structured guidance'}</span>
              </div>

              <div className="insightResultTitle">{result.summary[locale]}</div>
              <div className="insightResultBody">{result.explanation[locale]}</div>

              {result.redFlags?.[locale]?.length ? (
                <div className="insightRedFlags">
                  <div className="insightSubTitle">{isAr ? 'متى تُفضّل مراجعة عاجلة؟' : 'When to seek earlier review'}</div>
                  <ul>
                    {result.redFlags[locale].map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="insightSubTitle">{isAr ? 'خطوات عملية' : 'Practical next steps'}</div>
              <ul className="insightList">
                {result.nextSteps[locale].map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>

              {insightRecommendations[activeModule.slug]?.length ? (
                <div className="insightReading" style={{ marginTop: 18 }}>
                  <div className="journalKicker" style={{ marginTop: 6 }}>
                    {isAr ? 'قراءة إضافية' : 'Further reading'}
                  </div>
                  <div className="goldLine" aria-hidden />
                  <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
                    {insightRecommendations[activeModule.slug].map((rec) => (
                      <Link
                        key={rec.slug}
                        href={`/${locale}/blog/${rec.slug}`}
                        className="journalRead"
                        style={{ width: 'fit-content' }}
                      >
                        {rec.title[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}



              {/* Lead generation: inline, after Insight result only */}
              <LeadCapture locale={locale} condition={activeModule.slug} level={result.level} />

              {/* Appointment request: email + WhatsApp structured message + dashboard */}
              <AppointmentRequest locale={locale} condition={activeModule.slug} />

              <div className="insightActions" style={{ marginTop: 16 }}>
                <button type="button" className="btnSecondary" onClick={reset}>
                  {isAr ? 'إعادة' : 'Start again'}
                </button>

                <button type="button" className="btnTertiary" onClick={onSave}>
                  {saved ? (isAr ? 'تم الحفظ' : 'Saved') : isAr ? 'حفظ الملخص' : 'Save summary'}
                </button>

                <a
                  className="btnPrimary"
                  href={`https://wa.me/${clinic.whatsappE164.replace('+', '')}?text=${encodeURIComponent(
                    isAr
                      ? 'مرحبًا، أود حجز موعد. (من خلال موقع العيادة)'
                      : 'Hello, I would like to book a consultation. (From the clinic website)'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {isAr ? 'حجز عبر واتساب' : 'Book on WhatsApp'}
                </a>

                <Link className="btnTertiary" href={`/${locale}/insights`}>
                  {isAr ? 'العودة لمركز الإرشادات' : 'Back to Insights center'}
                </Link>
              </div>

              <div className="insightNote" style={{ marginTop: 14 }}>
                {isAr
                  ? 'هذه النتيجة إرشادية ولا تُعد تشخيصًا. التشخيص يتطلب تقييمًا إكلينيكيًا.'
                  : 'This result is educational and not a diagnosis. Diagnosis requires clinical evaluation.'}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
