import Link from 'next/link'
import {
  IconAcne,
  IconAesthetic,
  IconHair,
  IconPigmentation,
  IconScreening
} from '@/components/icons/services'

type Locale = 'en' | 'ar'

const content = {
  hero: {
    en: {
      eyebrow: 'Medical Dermatology',
      title: 'Psoriasis, acne, eczema, and chronic skin disease management',
      desc: 'Diagnosis-first care plans with staged follow-up for stable, realistic outcomes.'
    },
    ar: {
      eyebrow: 'الجلدية العلاجية',
      title: 'الصدفية وحب الشباب والإكزيما ومتابعة الأمراض الجلدية المزمنة',
      desc: 'خطة علاج تبدأ بالتشخيص ثم متابعة مرحلية للوصول إلى نتائج مستقرة وواقعية.'
    }
  },
  aesthetic: {
    en: {
      title: 'Aesthetic Medicine',
      desc: 'Injectables, rejuvenation plans, and subtle enhancement within a medical framework.'
    },
    ar: {
      title: 'طب التجميل',
      desc: 'الحقن التجميلي وخطط النضارة والتحسين الطبيعي ضمن إطار طبي منظم.'
    }
  },
  laser: {
    en: {
      title: 'Laser & Procedures',
      desc: 'Targeted technology for pigmentation, texture, scars, and selected resurfacing indications.'
    },
    ar: {
      title: 'الليزر والإجراءات',
      desc: 'تقنيات موجهة للتصبغات وملمس الجلد والندبات وبعض الحالات التي تستفيد من إعادة التسطيح.'
    }
  },
  hair: {
    en: {
      title: 'Hair & Scalp',
      desc: 'Evidence-based workup for shedding, thinning, and inflammatory scalp disease.'
    },
    ar: {
      title: 'الشعر وفروة الرأس',
      desc: 'تقييم علمي للتساقط والترقق والتهابات فروة الرأس.'
    }
  },
  prevention: {
    en: {
      title: 'Skin Checks',
      desc: 'Focused lesion review, dermoscopy, and earlier biopsy planning when required.'
    },
    ar: {
      title: 'فحص الجلد',
      desc: 'فحص دقيق للشامات والآفات الجلدية مع الدرموسكوب والتخطيط للعينة عند الحاجة.'
    }
  },
  cta: {
    en: {
      title: 'Book Appointment',
      href: '/en/contact'
    },
    ar: {
      title: 'احجز موعدك',
      href: '/ar/contact'
    }
  }
} as const

export function ServicesGrid({ locale }: { locale: Locale }) {
  const isAr = locale === 'ar'
  const c = {
    hero: content.hero[locale],
    aesthetic: content.aesthetic[locale],
    laser: content.laser[locale],
    hair: content.hair[locale],
    prevention: content.prevention[locale],
    cta: content.cta[locale]
  }

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="servicesBento">
      <article className="serviceBentoCard serviceBentoHero">
        <div className="serviceBentoOverlay" aria-hidden />
        <div className="serviceBentoIcon">
          <IconAcne size={42} />
        </div>
        <div className="serviceType">{c.hero.eyebrow}</div>
        <h3 className="serviceBentoTitle">{c.hero.title}</h3>
        <p className="serviceDesc">{c.hero.desc}</p>
        <div className="serviceBentoInline">
          <span className="serviceChip">
            <IconPigmentation size={18} />
            {isAr ? 'تصبغات' : 'Pigmentation'}
          </span>
          <span className="serviceChip">
            <IconHair size={18} />
            {isAr ? 'شعر' : 'Hair'}
          </span>
        </div>
      </article>

      <article className="serviceBentoCard serviceBentoGlass">
        <div className="serviceBentoIcon">
          <IconAesthetic size={34} />
        </div>
        <h3 className="serviceBentoTitle">{c.aesthetic.title}</h3>
        <p className="serviceDesc">{c.aesthetic.desc}</p>
      </article>

      <article className="serviceBentoCard serviceBentoGlass">
        <div className="serviceBentoIcon">
          <IconHair size={34} />
        </div>
        <h3 className="serviceBentoTitle">{c.hair.title}</h3>
        <p className="serviceDesc">{c.hair.desc}</p>
      </article>

      <article className="serviceBentoCard serviceBentoSilver">
        <div className="serviceBentoIcon">
          <IconScreening size={34} />
        </div>
        <h3 className="serviceBentoTitle">{c.prevention.title}</h3>
        <p className="serviceDesc">{c.prevention.desc}</p>
      </article>

      <article className="serviceBentoCard serviceBentoSilver">
        <div className="serviceBentoIcon">
          <IconPigmentation size={34} />
        </div>
        <h3 className="serviceBentoTitle">{c.laser.title}</h3>
        <p className="serviceDesc">{c.laser.desc}</p>
      </article>

      <Link href={c.cta.href} className="serviceBentoCard serviceBentoCta">
        <span>{c.cta.title}</span>
      </Link>
    </div>
  )
}
