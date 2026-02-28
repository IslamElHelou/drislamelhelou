import type { Locale } from './i18n'

type Dict = {
  nav: {
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
  hero: {
    badge: string
    headline: string
    name: string
    title: string
    lead: string
    ctaPrimary: string
    ctaSecondary: string
  }
  philosophy: {
    title: string
    headline: string
    body: string
    points: string[]
  }
  servicesHome: {
    titleMedical: string
    descMedical: string
    titleAesthetic: string
    descAesthetic: string
    titleProcedures: string
    descProcedures: string
    viewAll: string
  }
  clinicEnv: {
    title: string
    body: string
  }
  about: {
    title: string
    body: string
  }
  cta: {
    title: string
    body: string
    bookWhatsApp: string
    call: string
  }
  reviews: {
    title: string
    subtitle: string
    badge: string
    viewAll: string
  }
  blog: {
    title: string
    subtitle: string
    read: string
    more: string
  }
  faq: {
    title: string
    subtitle: string
  }
  testimonials: {
    title: string
    subtitle: string
  }
  dashboard: {
    title: string
    subtitle: string
    newPostTitle: string
    newPostHint: string
    postTitle: string
    postTitlePh: string
    postDescription: string
    postDescriptionPh: string
    createDraft: string
    notConnected: string
    howItWorksTitle: string
    step1: string
    step2: string
    step3: string
    securityNote: string
  }
  results: {
    title: string
    subtitle: string
  }
  contact: {
    title: string
    subtitle: string
    formTitle: string
    formHint: string
    name: string
    namePh: string
    phone: string
    phonePh: string
    message: string
    messagePh: string
    send: string
    sending: string
    sent: string
    error: string
    detailsTitle: string
    addressLabel: string
    phoneLabel: string
    whatsappHint: string
    mapLabel: string
  }
}

export type Dictionary = Dict

const en: Dict = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    insights: 'Insights',
    blog: 'Blog',
    faq: 'FAQ',
    testimonials: 'Reviews',
    results: 'Results',
    contact: 'Contact'
  },
  hero: {
    badge: 'Consultant • Dermatology • Alexandria',
    headline: 'Precision dermatology. Structured care. Long‑term skin health.',
    name: 'Dr. Islam El-Helou',
    title: 'Consultant Dermatology & Aesthetic Medicine',
    lead:
      'A calm, evidence-based approach grounded in clinical reasoning — with clear diagnosis, a structured plan, and realistic expectations.',
    ctaPrimary: 'Book a consultation',
    ctaSecondary: 'Clinical philosophy'
  },
  philosophy: {
    title: 'Clinical philosophy',
    headline: 'A structured approach to modern dermatology',
    body:
      'Each case begins with careful evaluation and clinical reasoning — not trends or assumptions. The objective remains constant: restore skin health, preserve natural balance, and deliver treatment grounded in medical integrity.',
    points: ['Calm environment', 'Structured process', 'Long-term results']
  },
  servicesHome: {
    titleMedical: 'Medical Dermatology',
    descMedical:
      'Comprehensive diagnosis and management of acute and chronic skin conditions using evidence-based protocols.',
    titleAesthetic: 'Aesthetic Medicine',
    descAesthetic:
      'Subtle, medically supervised procedures designed to enhance natural features while preserving skin health.',
    titleProcedures: 'Procedures',
    descProcedures: 'Skin biopsy, minor procedures, and diagnostic support when indicated.',
    viewAll: 'Explore all services'
  },
  clinicEnv: {
    title: 'The clinic environment',
    body:
      'A calm, structured space designed to support precise evaluation and a comfortable patient experience — with professionalism, discretion, and clinical excellence.'
  },
  about: {
    title: 'About Dr. Islam El-Helou',
    body:
      'A consultant in Dermatology & Aesthetic Medicine with experience across hospital and private practice settings. The approach is grounded in structured evaluation, evidence-based treatment, and long-term patient outcomes.'
  },
  cta: {
    title: 'Schedule a consultation',
    body:
      'Professional dermatological care begins with accurate evaluation and structured planning. Appointments are organized to ensure adequate time for thorough examination and a clear plan.',
    bookWhatsApp: 'Book on WhatsApp',
    call: 'Call the clinic'
  },
  reviews: {
    title: 'Verified patient reviews',
    subtitle: 'Selected 5-star reviews from Google Business Profile.',
    badge: 'Verified via Google',
    viewAll: 'View all reviews on Google'
  },
  blog: {
    title: 'Medical insights',
    subtitle: 'Evidence-based explanations and practical guidance.',
    read: 'Read article',
    more: 'View all articles'
  },
  faq: {
    title: 'Frequently asked questions',
    subtitle: 'Short, practical answers to help you prepare for your visit.'
  },
  testimonials: {
    title: 'Reviews',
    subtitle: 'A selection of public patient feedback.'
  },
  dashboard: {
    title: 'Dashboard',
    subtitle:
      'A simple admin area to add blog articles later. For now it shows how the content system will work.',
    newPostTitle: 'New blog post',
    newPostHint: 'Draft a title and summary. Next step: connect a database or CMS.',
    postTitle: 'Title',
    postTitlePh: 'Example: Acne — what actually works',
    postDescription: 'Short description',
    postDescriptionPh: 'A short summary that appears on the blog list…',
    createDraft: 'Create draft',
    notConnected: 'Dashboard is not connected yet. Next step: connect a CMS or database.',
    howItWorksTitle: 'How it will work',
    step1: 'Create an article draft (title, summary, tags).',
    step2: 'Write the content in MDX with images and headings.',
    step3: 'Publish — the blog updates automatically.',
    securityNote: 'Note: protect this route before using it in production.'
  },
  results: {
    title: 'What results to expect',
    subtitle: 'Realistic expectations, timelines, and how we measure progress.'
  },
  contact: {
    title: 'Contact & booking',
    subtitle: 'Fastest way: WhatsApp message. You can also call the clinic.',
    formTitle: 'Send a message',
    formHint: 'This form is a placeholder for now. Most patients book via WhatsApp.',
    name: 'Name',
    namePh: 'Your name',
    phone: 'Phone',
    phonePh: '+20…',
    message: 'Message',
    messagePh: 'How can we help?',
    send: 'Send',
    sending: 'Sending…',
    sent: 'Sent ✓',
    error: 'Error — try again',
    detailsTitle: 'Clinic details',
    addressLabel: 'Address',
    phoneLabel: 'Phone / WhatsApp',
    whatsappHint: 'Fastest response: WhatsApp',
    mapLabel: 'Map'
  }
}

const ar: Dict = {
  nav: {
    home: 'الرئيسية',
    about: 'عن الدكتور',
    services: 'الخدمات',
    insights: 'إرشادات تفاعلية',
    blog: 'المقالات',
    faq: 'الأسئلة الشائعة',
    testimonials: 'آراء المرضى',
    results: 'النتائج',
    contact: 'تواصل'
  },
  hero: {
    badge: 'استشاري • طب الجلدية • الإسكندرية',
    headline: 'دقة في التشخيص. منهج علاجي منظم. صحة جلدية طويلة المدى.',
    name: 'د. إسلام الحلو',
    title: 'استشاري الأمراض الجلدية وطب التجميل',
    lead: 'منهج هادئ مبني على الدليل العلمي والتحليل الإكلينيكي — تشخيص واضح وخطة علاج منظمة وتوقعات واقعية.',
    ctaPrimary: 'احجز موعدًا',
    ctaSecondary: 'الرؤية المهنية'
  },
  philosophy: {
    title: 'الرؤية المهنية',
    headline: 'منهج منظم في طب الجلدية الحديث',
    body:
      'كل حالة تبدأ بتقييم متأنٍ وتحليل إكلينيكي — بعيدًا عن العشوائية أو الصيحات. الهدف ثابت: استعادة صحة الجلد، والحفاظ على توازنه الطبيعي، وتقديم علاج يرتكز على الأمانة الطبية.',
    points: ['بيئة هادئة', 'منهج منظم', 'نتائج طويلة المدى']
  },
  servicesHome: {
    titleMedical: 'الأمراض الجلدية العلاجية',
    descMedical:
      'تشخيص وعلاج شامل للأمراض الجلدية الحادة والمزمنة وفقًا لأحدث المعايير والبروتوكولات العلمية.',
    titleAesthetic: 'طب التجميل الطبي',
    descAesthetic:
      'إجراءات دقيقة تحت إشراف طبي لتعزيز الملامح الطبيعية مع الحفاظ على صحة الجلد وتوازنه.',
    titleProcedures: 'إجراءات',
    descProcedures: 'أخذ عينة من الجلد وتحليل باثولوجي وإجراءات بسيطة ودعم تشخيصي عند الحاجة.',
    viewAll: 'عرض كل الخدمات'
  },
  clinicEnv: {
    title: 'بيئة العيادة',
    body:
      'مساحة هادئة ومنظمة صُممت لدعم التشخيص الدقيق وتجربة علاج مريحة — باحترافية وخصوصية وتميز إكلينيكي.'
  },
  about: {
    title: 'عن د. إسلام الحلو',
    body:
      'استشاري الأمراض الجلدية وطب التجميل بخبرة في المستشفيات والعيادة الخاصة. المنهج قائم على تقييم منظم، وعلاج مبني على الدليل العلمي، ونتائج طويلة المدى.'
  },
  cta: {
    title: 'حجز الاستشارة',
    body:
      'تبدأ الرعاية الجلدية المتخصصة بتقييم دقيق وخطة علاج منظمة. يتم تنظيم المواعيد لضمان الوقت الكافي للفحص الشامل والتشخيص ووضع خطة واضحة.',
    bookWhatsApp: 'احجز عبر واتساب',
    call: 'اتصل بالعيادة'
  },
  reviews: {
    title: 'آراء المرضى الموثقة',
    subtitle: 'مقتطفات مختارة من تقييمات 5 نجوم عبر Google.',
    badge: 'موثّق عبر Google',
    viewAll: 'عرض جميع التقييمات على Google'
  },
  blog: {
    title: 'مقالات طبية',
    subtitle: 'شرح علمي مبسط ومبني على الدليل لأهم الموضوعات.',
    read: 'اقرأ المقال',
    more: 'عرض كل المقالات'
  },
  faq: {
    title: 'الأسئلة الشائعة',
    subtitle: 'إجابات مختصرة وعملية تساعدك قبل الزيارة.'
  },
  testimonials: {
    title: 'آراء المرضى',
    subtitle: 'مقتطفات من آراء المرضى المنشورة.'
  },
  dashboard: {
    title: 'لوحة التحكم',
    subtitle: 'منطقة إدارة بسيطة لإضافة مقالات المدونة لاحقًا. حاليًا توضّح طريقة عمل نظام المحتوى.',
    newPostTitle: 'مقالة جديدة',
    newPostHint: 'اكتب عنوانًا وملخصًا. الخطوة التالية: ربط قاعدة بيانات أو نظام إدارة محتوى.',
    postTitle: 'العنوان',
    postTitlePh: 'مثال: حب الشباب — ما الذي ينفع فعلاً؟',
    postDescription: 'وصف قصير',
    postDescriptionPh: 'ملخص يظهر في قائمة المقالات…',
    createDraft: 'إنشاء مسودة',
    notConnected: 'لوحة التحكم غير متصلة بعد. الخطوة التالية: ربط CMS أو قاعدة بيانات.',
    howItWorksTitle: 'كيف ستعمل',
    step1: 'إنشاء مسودة (عنوان، ملخص، تصنيفات).',
    step2: 'كتابة المحتوى بصيغة MDX مع صور وعناوين.',
    step3: 'نشر — ويتم تحديث المدونة تلقائيًا.',
    securityNote: 'ملاحظة: يجب حماية هذا المسار قبل استخدامه في الإنتاج.'
  },
  results: {
    title: 'ماذا تتوقع من النتائج',
    subtitle: 'توقعات واقعية، مدة التحسن، وكيف نتابع التقدم.'
  },
  contact: {
    title: 'الحجز والتواصل',
    subtitle: 'الأسرع: رسالة واتساب. ويمكنك الاتصال بالعيادة أيضًا.',
    formTitle: 'أرسل رسالة',
    formHint: 'هذه الاستمارة مؤقتة الآن. أسرع وسيلة للحجز هي واتساب.',
    name: 'الاسم',
    namePh: 'اسمك',
    phone: 'الهاتف',
    phonePh: '+20…',
    message: 'الرسالة',
    messagePh: 'كيف نساعدك؟',
    send: 'إرسال',
    sending: 'جارٍ الإرسال…',
    sent: 'تم الإرسال ✓',
    error: 'حدث خطأ — حاول مرة أخرى',
    detailsTitle: 'بيانات العيادة',
    addressLabel: 'العنوان',
    phoneLabel: 'هاتف / واتساب',
    whatsappHint: 'أسرع رد: واتساب',
    mapLabel: 'الخريطة'
  }
}

export function getDictionary(locale: Locale) {
  return locale === 'ar' ? ar : en
}
