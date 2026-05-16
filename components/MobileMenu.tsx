'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { Locale } from '@/lib/i18n'
import { clinic, getClinicBrandName, getWhatsAppBookingHref } from '@/lib/i18n'

type Labels = {
  home: string
  about: string
  services: string
  insights: string
  blog: string
  faq: string
  testimonials: string
  results: string
  contact: string
}

export default function MobileMenu({
  locale,
  base,
  labels,
  rightSlot
}: {
  locale: Locale
  base: string
  labels: Labels
  rightSlot?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const brandName = getClinicBrandName(locale)
  const bookingHref = getWhatsAppBookingHref(locale)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) return

    const htmlStyle = document.documentElement.style
    const bodyStyle = document.body.style

    const prevHtmlOverflow = htmlStyle.overflow
    const prevBodyOverflow = bodyStyle.overflow
    const prevBodyTouchAction = bodyStyle.touchAction

    htmlStyle.overflow = 'hidden'
    bodyStyle.overflow = 'hidden'
    bodyStyle.touchAction = 'none'

    return () => {
      htmlStyle.overflow = prevHtmlOverflow
      bodyStyle.overflow = prevBodyOverflow
      bodyStyle.touchAction = prevBodyTouchAction
    }
  }, [open])

  const links = useMemo(
    () => [
      { href: base, label: labels.home },
      { href: `${base}/about`, label: labels.about },
      { href: `${base}/services`, label: labels.services },
      { href: `${base}/insights`, label: labels.insights },
      { href: `${base}/blog`, label: labels.blog },
      { href: `${base}/faq`, label: labels.faq },
      { href: `${base}/testimonials`, label: labels.testimonials },
      { href: `${base}/results`, label: labels.results },
      { href: `${base}/contact`, label: labels.contact }
    ],
    [base, labels]
  )

  return (
    <div className="mobileNav">
      <button
        type="button"
        className="iconBtn iconBtnStrong"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M18 6 6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="mobileOverlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.aside
                className="mobileSheet"
                initial={{ x: locale === 'ar' ? -16 : 16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: locale === 'ar' ? -16 : 16, opacity: 0 }}
                transition={{ duration: 0.14 }}
              >
                <div className="mobileSheetTop">
                  <div>
                    <div className="mobileBrand">{brandName}</div>
                    <div className="mobileSub">
                      {locale === 'ar' ? clinic.titleAr : clinic.titleEn}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {rightSlot}
                  </div>
                </div>

                <nav className="mobileLinks" aria-label="Mobile">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="mobileLink"
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>

                <div className="mobileSocial">
                  <a href={bookingHref} target="_blank" rel="noreferrer" className="mobileSocialBtn mobileSocialBtnGold">
                    WhatsApp
                  </a>
                  <a href={clinic.facebookUrl} target="_blank" rel="noreferrer" className="mobileSocialBtn">
                    Facebook
                  </a>
                  <a href={clinic.instagramUrl} target="_blank" rel="noreferrer" className="mobileSocialBtn">
                    Instagram
                  </a>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
