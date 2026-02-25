'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type Review = {
  name: string
  source: string
  body: string
}

export default function TestimonialsSlider({
  reviews,
  dir
}: {
  reviews: Review[]
  dir: 'ltr' | 'rtl'
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const total = reviews.length

  const current = reviews[index]
  const dots = useMemo(() => Array.from({ length: total }, (_, i) => i), [total])

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  // Autoplay (pauses on hover/touch)
  useEffect(() => {
    if (paused || total <= 1) return
    const t = setInterval(() => next(), 5200)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, total])

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  return (
    <div
      className="slider"
      dir={dir}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="sliderTop">
        <button className="iconBtn" onClick={prev} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="badge">★★★★★</div>

        <button className="iconBtn" onClick={next} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="sliderStage" ref={stageRef}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="card sliderCard"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const offset = info.offset.x
              const velocity = info.velocity.x
              const swipe = Math.abs(offset) * velocity

              // Direction-aware swipe (RTL reverses)
              const effective = dir === 'rtl' ? -offset : offset
              if (effective < -60 || swipe < -10000) next()
              else if (effective > 60 || swipe > 10000) prev()
            }}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.8rem', alignItems: 'center' }}>
              <div style={{ fontWeight: 800 }}>{current.name}</div>
              <div className="badge">{current.source}</div>
            </div>
            <p style={{ color: 'var(--muted)', marginTop: '.6rem' }}>{current.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="sliderDots" aria-label="Slide navigation">
        {dots.map((d) => (
          <button
            key={d}
            className={`dot ${d === index ? 'dotActive' : ''}`}
            onClick={() => setIndex(d)}
            aria-label={`Go to slide ${d + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
