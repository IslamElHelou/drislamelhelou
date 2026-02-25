'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { clinic } from '@/lib/i18n'

export default function HeroPortrait({
  nameLine,
  titleLine,
  addressLine
}: {
  nameLine: string
  titleLine: string
  addressLine: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ willChange: 'transform' }}
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="heroCardWrap"
      >
        <div className="heroBackdrop" aria-hidden />
        <div className="card heroCard" style={{ padding: 0, overflow: 'hidden' }}>
          <Image
            src="/images/doctor.webp"
            alt={clinic.doctorName}
            width={900}
            height={900}
            sizes="(max-width: 768px) 70vw, 420px"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />
          <div style={{ padding: '1rem 1.05rem' }}>
            <div style={{ fontWeight: 900, fontSize: '1.05rem' }}>{nameLine}</div>
            <div style={{ color: 'var(--muted)' }}>{titleLine}</div>
            <div style={{ color: 'var(--muted)', marginTop: '.35rem' }}>{addressLine}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
