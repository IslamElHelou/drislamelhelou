import { ImageResponse } from 'next/og'
import { clinic } from '@/lib/i18n'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || clinic.brandName
  const lang = searchParams.get('lang') === 'ar' ? 'ar' : 'en'
  const subtitle =
    lang === 'ar'
      ? 'استشاري الأمراض الجلدية — تشخيص دقيق ورعاية هادئة'
      : 'Consultant Dermatologist — accurate diagnosis, thoughtful care'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px',
          background:
            'radial-gradient(900px 420px at 20% 10%, rgba(99,102,241,.35), transparent 60%), radial-gradient(900px 520px at 80% 15%, rgba(34,197,94,.25), transparent 60%), linear-gradient(135deg, #070a12, #0b1220)',
          color: 'white'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: 'rgba(255,255,255,.08)',
              border: '1px solid rgba(255,255,255,.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 800
            }}
          >
            IH
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 26, opacity: 0.95, fontWeight: 800 }}>{clinic.brandName}</div>
            <div style={{ fontSize: 18, opacity: 0.8 }}>{subtitle}</div>
          </div>
        </div>

        <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em' }}>{title}</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.85, fontSize: 18 }}>
          <div>{lang === 'ar' ? 'الإسكندرية — مصر' : 'Alexandria — Egypt'}</div>
          <div>www.drislamelhelou.com</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
