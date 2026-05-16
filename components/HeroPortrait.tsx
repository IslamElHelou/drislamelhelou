import Image from 'next/image'
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
    <div>
      <div className="heroCardWrap">
        <div className="heroBackdrop" aria-hidden="true" />
        <div className="card heroCard" style={{ padding: 0, overflow: 'hidden' }}>
          <Image
            src="/images/doctor.webp"
            alt={clinic.doctorName}
            width={900}
            height={900}
            sizes="(max-width: 768px) 70vw, 420px"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
            fetchPriority="high"
            loading="eager"
          />
          <div style={{ padding: '1rem 1.05rem' }}>
            <div style={{ fontWeight: 900, fontSize: '1.05rem' }}>{nameLine}</div>
            <div style={{ color: 'var(--muted)' }}>{titleLine}</div>
            <div style={{ color: 'var(--muted)', marginTop: '.35rem' }}>{addressLine}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
