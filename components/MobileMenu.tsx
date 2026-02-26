'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Locale } from '@/lib/i18n'
import { clinic } from '@/lib/i18n'

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const htmlStyle = document.documentElement.style
    const bodyStyle = document.body.style

    const prevHtmlOverflow = htmlStyle.overflow
    const prevBodyOverflow = bodyStyle.overflow
    const prevBodyPosition = bodyStyle.position
    const prevBodyTop = bodyStyle.top
    const prevBodyWidth = bodyStyle.width

    htmlStyle.overflow = 'hidden'
    bodyStyle.overflow = 'hidden'
    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.width = '100%'

    return () => {
      htmlStyle.overflow = prevHtmlOverflow
      bodyStyle.overflow = prevBodyOverflow
      bodyStyle.position = prevBodyPosition
      bodyStyle.top = prevBodyTop
      bodyStyle.width = prevBodyWidth
      window.scrollTo(0, scrollY)
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
              initial={{ x: locale === 'ar' ? -20 : 20, opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: locale === 'ar' ? -20 : 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              <div className="mobileSheetTop">
                <div>
                  <div className="mobileBrand">{clinic.brandName}</div>
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
      </AnimatePresence>
    </div>
  )
}
