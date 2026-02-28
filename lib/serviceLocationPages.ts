import type { Locale } from '@/lib/i18n'

export const SERVICE_LOCATION_SLUGS = ['acne', 'hair-loss', 'pigmentation', 'psoriasis'] as const

export type ServiceLocationSlug = (typeof SERVICE_LOCATION_SLUGS)[number]

type Localized = Record<Locale, string>

type ServiceLocationPage = {
  slug: ServiceLocationSlug
  condition: Localized
  title: Localized
  metaDescription: Localized
  intro: Localized
  whoForTitle: Localized
  whoForPoints: Record<Locale, string[]>
  approachTitle: Localized
  approachPoints: Record<Locale, string[]>
  faqTitle: Localized
  faq: Record<Locale, Array<{ q: string; a: string }>>
}

const pages: ServiceLocationPage[] = [
  {
    slug: 'acne',
    condition: { en: 'Acne', ar: 'حب الشباب' },
    title: {
      en: 'Acne Care | Dr Islam El Helou Clinic Alexandria',
      ar: 'رعاية حب الشباب | عيادة د. إسلام الحلو - الإسكندرية'
    },
    metaDescription: {
      en: 'Structured acne evaluation and treatment at Dr Islam El Helou Clinic Alexandria, focused on inflammation control, marks prevention, and long-term maintenance.',
      ar: 'تقييم وعلاج منظم لحب الشباب في عيادة د. إسلام الحلو بالإسكندرية، مع التركيز على التحكم بالالتهاب، تقليل الآثار، وخطة متابعة طويلة المدى.'
    },
    intro: {
      en: 'Acne is more than occasional breakouts. At Dr Islam El Helou Clinic Alexandria, we assess pattern, trigger profile, and skin tolerance before selecting treatment.',
      ar: 'حب الشباب ليس مجرد حبوب عابرة. في عيادة د. إسلام الحلو بالإسكندرية، نقيم النمط والمحفزات وتحمل البشرة قبل اختيار الخطة العلاجية.'
    },
    whoForTitle: { en: 'Who this service is for', ar: 'لمن تناسب هذه الخدمة' },
    whoForPoints: {
      en: [
        'Persistent acne beyond 8-12 weeks despite products',
        'Painful inflammatory lesions or recurrent flares',
        'Post-acne marks or early scar concerns'
      ],
      ar: [
        'حب شباب مستمر لأكثر من 8-12 أسبوعًا رغم المنتجات',
        'حبوب ملتهبة مؤلمة أو نوبات متكررة',
        'آثار ما بعد الحبوب أو بداية ندبات'
      ]
    },
    approachTitle: { en: 'How we approach acne care', ar: 'كيف نتعامل مع علاج حب الشباب' },
    approachPoints: {
      en: [
        'Diagnosis-first visit: lesion type, severity, and contributing factors',
        'Barrier-safe routine design with practical adherence',
        'Stepwise escalation with follow-up to reduce relapse'
      ],
      ar: [
        'زيارة تبدأ بالتشخيص: نوع الحبوب وشدتها والعوامل المساهمة',
        'تصميم روتين علاجي عملي يحافظ على حاجز البشرة',
        'تصعيد تدريجي للعلاج مع متابعة لتقليل تكرار النوبات'
      ]
    },
    faqTitle: { en: 'Common acne questions', ar: 'أسئلة شائعة عن حب الشباب' },
    faq: {
      en: [
        {
          q: 'How long until acne treatment starts working?',
          a: 'Most plans need consistent use for several weeks before meaningful improvement appears.'
        },
        {
          q: 'Can acne scars be prevented?',
          a: 'Early control of deep inflammation usually lowers scar risk, especially with structured follow-up.'
        }
      ],
      ar: [
        {
          q: 'متى تظهر نتيجة علاج حب الشباب؟',
          a: 'غالبًا تحتاج الخطة العلاجية لعدة أسابيع من الالتزام قبل ظهور تحسن واضح.'
        },
        {
          q: 'هل يمكن تقليل احتمالية الندبات؟',
          a: 'التحكم المبكر في الالتهاب العميق يقلل عادة خطر الندبات مع متابعة منظمة.'
        }
      ]
    }
  },
  {
    slug: 'hair-loss',
    condition: { en: 'Hair Loss', ar: 'تساقط الشعر' },
    title: {
      en: 'Hair Loss Evaluation | Dr Islam El Helou Clinic Alexandria',
      ar: 'تقييم تساقط الشعر | عيادة د. إسلام الحلو - الإسكندرية'
    },
    metaDescription: {
      en: 'Diagnosis-focused hair loss assessment at Dr Islam El Helou Clinic Alexandria to identify shedding pattern, scalp factors, and targeted treatment options.',
      ar: 'تقييم تشخيصي لتساقط الشعر في عيادة د. إسلام الحلو بالإسكندرية لتحديد النمط، عوامل فروة الرأس، وخيارات العلاج المناسبة.'
    },
    intro: {
      en: 'Not all hair loss is the same. In Alexandria, our clinic uses pattern-based evaluation to separate reversible shedding from chronic causes.',
      ar: 'ليس كل تساقط الشعر متشابهًا. في عيادتنا بالإسكندرية نعتمد تقييمًا نمطيًا يميز بين التساقط المؤقت والأسباب المزمنة.'
    },
    whoForTitle: { en: 'Who this service is for', ar: 'لمن تناسب هذه الخدمة' },
    whoForPoints: {
      en: [
        'Sudden increase in daily shedding',
        'Progressive thinning at crown or frontal scalp',
        'Patchy loss or scalp irritation'
      ],
      ar: [
        'زيادة مفاجئة في معدل التساقط اليومي',
        'ترقق تدريجي بمقدمة الرأس أو القمة',
        'فراغات موضعية أو أعراض التهابية بفروة الرأس'
      ]
    },
    approachTitle: { en: 'How we approach hair loss care', ar: 'كيف نتعامل مع تساقط الشعر' },
    approachPoints: {
      en: [
        'History and scalp-focused clinical examination',
        'Selective investigations only when clinically indicated',
        'Pattern-specific treatment and realistic timeline planning'
      ],
      ar: [
        'تاريخ مرضي وفحص دقيق لفروة الرأس',
        'فحوصات انتقائية عند الحاجة الطبية فقط',
        'خطة علاج حسب النمط مع جدول زمني واقعي للتحسن'
      ]
    },
    faqTitle: { en: 'Common hair loss questions', ar: 'أسئلة شائعة عن تساقط الشعر' },
    faq: {
      en: [
        {
          q: 'Do all patients need lab tests?',
          a: 'No. Tests are selected case-by-case after clinical assessment.'
        },
        {
          q: 'When should I seek early review?',
          a: 'Patchy loss, painful scalp symptoms, or rapidly worsening shedding should be evaluated early.'
        }
      ],
      ar: [
        {
          q: 'هل يحتاج كل مريض إلى تحاليل؟',
          a: 'لا. يتم تحديد الفحوصات حسب كل حالة بعد التقييم الإكلينيكي.'
        },
        {
          q: 'متى يفضل التقييم المبكر؟',
          a: 'عند ظهور فراغات موضعية أو ألم بفروة الرأس أو تساقط سريع متزايد.'
        }
      ]
    }
  },
  {
    slug: 'pigmentation',
    condition: { en: 'Pigmentation', ar: 'التصبغات' },
    title: {
      en: 'Pigmentation & Melasma Care | Dr Islam El Helou Clinic Alexandria',
      ar: 'رعاية التصبغات والكلف | عيادة د. إسلام الحلو - الإسكندرية'
    },
    metaDescription: {
      en: 'Clinical pigmentation and melasma management at Dr Islam El Helou Clinic Alexandria with sun-protection strategy, barrier-safe routines, and stepwise treatment.',
      ar: 'خطة علاجية للتصبغات والكلف في عيادة د. إسلام الحلو بالإسكندرية تشمل استراتيجية واقي الشمس، روتينًا لطيفًا، وعلاجًا تدريجيًا.'
    },
    intro: {
      en: 'Pigmentation often recurs when triggers are not controlled. Our approach at Dr Islam El Helou Clinic Alexandria prioritizes consistency over aggressive short cycles.',
      ar: 'التصبغات كثيرًا ما تعود عند استمرار المحفزات. نهجنا في عيادة د. إسلام الحلو بالإسكندرية يركز على الاستمرارية بدل الحلول السريعة العنيفة.'
    },
    whoForTitle: { en: 'Who this service is for', ar: 'لمن تناسب هذه الخدمة' },
    whoForPoints: {
      en: [
        'Facial melasma or recurrent dark patches',
        'Post-inflammatory marks after acne or irritation',
        'Pigmentation worsened by sun exposure'
      ],
      ar: [
        'كلف أو بقع داكنة متكررة بالوجه',
        'آثار تصبغ بعد الحبوب أو التهيج',
        'تصبغات تزداد مع التعرض للشمس'
      ]
    },
    approachTitle: { en: 'How we approach pigmentation care', ar: 'كيف نتعامل مع علاج التصبغات' },
    approachPoints: {
      en: [
        'Pattern confirmation and trigger mapping',
        'Sun-protection protocol and barrier-first support',
        'Stepwise actives with close irritation control'
      ],
      ar: [
        'تأكيد النمط وتحديد المحفزات',
        'بروتوكول واقي الشمس ودعم حاجز البشرة أولًا',
        'علاجات تدريجية مع التحكم الدقيق في التهيج'
      ]
    },
    faqTitle: { en: 'Common pigmentation questions', ar: 'أسئلة شائعة عن التصبغات' },
    faq: {
      en: [
        {
          q: 'Why does melasma come back?',
          a: 'Because sunlight, hormones, and irritation can reactivate pigment pathways even after initial improvement.'
        },
        {
          q: 'Is stronger always better?',
          a: 'No. Over-irritation can worsen pigmentation, so treatment intensity must match skin tolerance.'
        }
      ],
      ar: [
        {
          q: 'لماذا يعود الكلف بعد التحسن؟',
          a: 'لأن الشمس والهرمونات والتهيج قد تعيد تنشيط التصبغ حتى بعد تحسن أولي.'
        },
        {
          q: 'هل العلاج الأقوى دائمًا أفضل؟',
          a: 'لا. التهيج الزائد قد يزيد التصبغ، لذلك يجب أن تتناسب شدة العلاج مع تحمل البشرة.'
        }
      ]
    }
  },
  {
    slug: 'psoriasis',
    condition: { en: 'Psoriasis', ar: 'الصدفية' },
    title: {
      en: 'Psoriasis Management | Dr Islam El Helou Clinic Alexandria',
      ar: 'إدارة الصدفية | عيادة د. إسلام الحلو - الإسكندرية'
    },
    metaDescription: {
      en: 'Structured psoriasis management at Dr Islam El Helou Clinic Alexandria, including scalp and nail involvement, flare control, and long-term treatment planning.',
      ar: 'إدارة منظمة للصدفية في عيادة د. إسلام الحلو بالإسكندرية تشمل فروة الرأس والأظافر، التحكم في النوبات، وخطة طويلة المدى.'
    },
    intro: {
      en: 'Psoriasis is a chronic inflammatory condition that needs ongoing strategy. Our Alexandria clinic focuses on practical control and relapse prevention.',
      ar: 'الصدفية حالة التهابية مزمنة تحتاج استراتيجية مستمرة. تركز عيادتنا بالإسكندرية على التحكم العملي وتقليل تكرار النوبات.'
    },
    whoForTitle: { en: 'Who this service is for', ar: 'لمن تناسب هذه الخدمة' },
    whoForPoints: {
      en: [
        'Recurrent plaques despite basic topical care',
        'Scalp or nail psoriasis affecting quality of life',
        'Frequent flares needing structured follow-up'
      ],
      ar: [
        'لويحات متكررة رغم العناية الموضعية الأساسية',
        'صدفية فروة الرأس أو الأظافر المؤثرة على الحياة اليومية',
        'نوبات متكررة تحتاج متابعة وعلاجًا منظمًا'
      ]
    },
    approachTitle: { en: 'How we approach psoriasis care', ar: 'كيف نتعامل مع الصدفية' },
    approachPoints: {
      en: [
        'Assess extent, sensitive sites, and flare pattern',
        'Match treatment intensity to disease burden',
        'Long-term monitoring to maintain control'
      ],
      ar: [
        'تقييم مدى الانتشار والمناطق الحساسة ونمط النوبات',
        'تحديد شدة العلاج حسب عبء الحالة',
        'متابعة طويلة المدى للحفاظ على الاستقرار'
      ]
    },
    faqTitle: { en: 'Common psoriasis questions', ar: 'أسئلة شائعة عن الصدفية' },
    faq: {
      en: [
        {
          q: 'Can psoriasis be cured permanently?',
          a: 'Psoriasis is usually managed as a chronic condition, but good control and long remission are achievable.'
        },
        {
          q: 'Do scalp and nail symptoms matter?',
          a: 'Yes. They often affect treatment choice and should be addressed as part of the full plan.'
        }
      ],
      ar: [
        {
          q: 'هل يمكن الشفاء النهائي من الصدفية؟',
          a: 'غالبًا تُدار الصدفية كحالة مزمنة، لكن يمكن تحقيق تحكم جيد وفترات هدوء طويلة.'
        },
        {
          q: 'هل صدفية فروة الرأس أو الأظافر مهمة؟',
          a: 'نعم. غالبًا تؤثر على اختيار العلاج ويجب التعامل معها ضمن الخطة الكاملة.'
        }
      ]
    }
  }
]

export function getServiceLocationPage(slug: string) {
  return pages.find((p) => p.slug === slug)
}

export function getAllServiceLocationPages() {
  return pages
}
