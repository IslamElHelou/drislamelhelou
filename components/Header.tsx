'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/i18n'
import { clinic } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import MobileMenu from '@/components/MobileMenu'

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const base = `/${locale}`
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`headerSticky ${scrolled ? 'headerScrolled' : ''}`}>
      <div className="container">
        <div className="nav">
          <Link href={base} className="brand">
            <Image
              src="/brand/logo.png"
              alt={clinic.brandName}
              width={38}
              height={38}
              priority
              className="brandLogo"
            />
            <div className="brandText">
              <div className="brandName">{clinic.brandName}</div>
              <div className="brandTitle">{locale === 'ar' ? clinic.titleAr : clinic.titleEn}</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="navlinks" aria-label="Primary">
            <Link href={base}>{t.nav.home}</Link>
            <Link href={`${base}/about`}>{t.nav.about}</Link>
            <Link href={`${base}/services`}>{t.nav.services}</Link>
            <Link href={`${base}/insights`}>{t.nav.insights}</Link>
            <Link href={`${base}/blog`}>{t.nav.blog}</Link>
            <Link href={`${base}/faq`}>{t.nav.faq}</Link>
            <Link href={`${base}/testimonials`}>{t.nav.testimonials}</Link>
            <Link href={`${base}/results`}>{t.nav.results}</Link>
            <Link href={`${base}/contact`}>{t.nav.contact}</Link>

            <span className="social" aria-label="Social links">
              <a className="iconBtn" href={clinic.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 8.5V7c0-.8.5-1 1-1h2V3h-3c-2.2 0-4 1.8-4 4v1.5H8v3h2V21h4v-9.5h2.7l.3-3H14Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a className="iconBtn" href={clinic.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-2.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </span>

            <ThemeToggle />
            <LanguageToggle locale={locale} />
          </nav>

          {/* Mobile */}
          <MobileMenu
            locale={locale}
            base={base}
            labels={{
              home: t.nav.home,
              about: t.nav.about,
              services: t.nav.services,
              insights: t.nav.insights,
              blog: t.nav.blog,
              faq: t.nav.faq,
              testimonials: t.nav.testimonials,
              results: t.nav.results,
              contact: t.nav.contact
            }}
            rightSlot={
              <>
                <ThemeToggle />
                <LanguageToggle locale={locale} />
              </>
            }
          />
        </div>
      </div>
    </header>
  )
}
