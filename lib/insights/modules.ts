import type { Locale } from '@/lib/i18n'
import { computeScore, withRedFlags } from './engine'
import type { InsightModule, InsightResult } from './types'

const acne: InsightModule = {
  slug: 'acne',
  title: { en: 'Acne Insight', ar: 'إرشادات حب الشباب' },
  description: {
    en: 'A structured, educational tool to understand patterns and when a medical review is helpful.',
    ar: 'أداة تعليمية منظمة لفهم نمط الحالة ومتى قد يفيد التقييم الطبي.'
  },
  questions: [
    {
      id: 'duration',
      title: { en: 'How long have the breakouts been present?', ar: 'منذ متى توجد الحبوب؟' },
      options: [
        { id: 'lt3', label: { en: 'Less than 3 months', ar: 'أقل من 3 أشهر' }, score: 1 },
        { id: '3to12', label: { en: '3–12 months', ar: 'من 3 إلى 12 شهرًا' }, score: 3 },
        { id: 'gt12', label: { en: 'More than 1 year', ar: 'أكثر من سنة' }, score: 4 }
      ]
    },
    {
      id: 'location',
      title: { en: 'Where is it most prominent?', ar: 'أين تتركز أكثر؟' },
      options: [
        { id: 'forehead', label: { en: 'Forehead / T‑zone', ar: 'الجبهة / منطقة الـT' }, score: 1 },
        { id: 'cheeks', label: { en: 'Cheeks', ar: 'الخدين' }, score: 2 },
        { id: 'jaw', label: { en: 'Jawline / chin', ar: 'الفك / الذقن' }, score: 3 },
        { id: 'trunk', label: { en: 'Back / chest', ar: 'الظهر / الصدر' }, score: 3 }
      ]
    },
    {
      id: 'type',
      title: { en: 'What describes the lesions best?', ar: 'ما الوصف الأقرب للحبوب؟' },
      options: [
        { id: 'comedones', label: { en: 'Mostly blackheads / whiteheads', ar: 'رؤوس سوداء / بيضاء' }, score: 1 },
        { id: 'inflamed', label: { en: 'Inflamed bumps / pustules', ar: 'حبوب ملتهبة' }, score: 3 },
        {
          id: 'nodules',
          label: { en: 'Deep painful nodules', ar: 'عُقَد مؤلمة عميقة' },
          score: 5,
          redFlag: {
            en: 'Painful deep nodules and early scarring benefit from earlier medical evaluation.',
            ar: 'العُقَد المؤلمة العميقة وبدء الندبات قد تستدعي تقييمًا طبيًا مبكرًا.'
          }
        }
      ]
    },
    {
      id: 'marks',
      title: { en: 'Do you notice marks or scarring?', ar: 'هل توجد آثار أو ندبات؟' },
      options: [
        { id: 'none', label: { en: 'No', ar: 'لا' }, score: 0 },
        { id: 'pigment', label: { en: 'Post‑inflammatory marks', ar: 'آثار تصبغ بعد الالتهاب' }, score: 2 },
        {
          id: 'scar',
          label: { en: 'Scarring', ar: 'ندبات' },
          score: 5,
          redFlag: {
            en: 'When scarring is developing, early structured treatment can reduce long‑term impact.',
            ar: 'عند بدء الندبات، قد يقلّل التدخل المنظم مبكرًا من الأثر طويل المدى.'
          }
        }
      ]
    },
    {
      id: 'treat',
      title: { en: 'What best describes prior treatment?', ar: 'ما وصف العلاج السابق؟' },
      options: [
        { id: 'none', label: { en: 'None / minimal', ar: 'لا يوجد / بسيط' }, score: 1 },
        { id: 'otc', label: { en: 'Over‑the‑counter products', ar: 'منتجات بدون وصفة' }, score: 2 },
        { id: 'rx', label: { en: 'Prescription treatment in the past', ar: 'علاج بوصفة سابقًا' }, score: 2 }
      ]
    }
  ],
  evaluate: (answers, locale) => {
    const { score, redFlagsByLocale } = computeScore(acne, answers)

    // thresholds tuned for educational triage, not diagnosis
    const level = score >= 14 ? 'priority' : score >= 9 ? 'evaluation' : 'informational'

    const summary = {
      en:
        level === 'priority'
          ? 'Your answers suggest a more persistent or inflammatory acne pattern.'
          : level === 'evaluation'
            ? 'Your answers suggest acne that may benefit from a structured plan.'
            : 'Your answers suggest a milder breakout pattern.'
      ,
      ar:
        level === 'priority'
          ? 'تشير إجاباتك إلى نمط حب شباب أكثر استمرارية أو التهابيًا.'
          : level === 'evaluation'
            ? 'تشير إجاباتك إلى حب شباب قد يستفيد من خطة علاج منظمة.'
            : 'تشير إجاباتك إلى نمط حبوب خفيف نسبيًا.'
    }

    const explanation = {
      en:
        'Acne can behave like a chronic inflammatory condition. When lesions persist, become painful, or leave marks, intermittent product changes often underperform compared with structured medical planning.',
      ar:
        'قد يتصرف حب الشباب كحالة التهابية مزمنة. عند استمرار الحبوب أو ألمها أو تركها آثارًا، غالبًا ما يكون النهج المنظم أكثر فعالية من تغيير المنتجات بشكل متكرر.'
    }

    const nextSteps = {
      en: [
        'Keep routines simple: gentle cleanser, non‑comedogenic moisturizer, daily sunscreen.',
        'Avoid frequent “rotation” of active products when irritation is present.',
        level === 'informational'
          ? 'If breakouts persist beyond 8–12 weeks, consider a professional evaluation.'
          : 'Consider a consultation for a structured plan and follow‑up.'
      ],
      ar: [
        'اجعل الروتين بسيطًا: غسول لطيف، مرطب مناسب، واقي شمس يوميًا.',
        'تجنب تبديل العلاجات النشطة بشكل متكرر خاصة عند وجود تهيج.',
        level === 'informational'
          ? 'إذا استمرت الحبوب لأكثر من 8–12 أسبوعًا، فكّر في تقييم متخصص.'
          : 'قد يفيد حجز استشارة لوضع خطة منظمة ومتابعة.'
      ]
    }

    const result: InsightResult = {
      level,
      score,
      summary,
      explanation,
      nextSteps
    }

    return withRedFlags(result, redFlagsByLocale)
  }
}

const hairLoss: InsightModule = {
  slug: 'hair-loss',
  title: { en: 'Hair Loss Insight', ar: 'إرشادات تساقط الشعر' },
  description: {
    en: 'A structured guide to understand common patterns and when evaluation is recommended.',
    ar: 'دليل منظم لفهم الأنماط الشائعة ومتى يُنصح بالتقييم.'
  },
  questions: [
    {
      id: 'tempo',
      title: { en: 'How did it start?', ar: 'كيف بدأ التساقط؟' },
      options: [
        { id: 'gradual', label: { en: 'Gradual over months', ar: 'تدريجي خلال أشهر' }, score: 2 },
        {
          id: 'sudden',
          label: { en: 'Sudden increase in shedding', ar: 'زيادة مفاجئة في التساقط' },
          score: 3
        },
        {
          id: 'patchy',
          label: { en: 'Patchy / localized loss', ar: 'فراغات موضعية' },
          score: 5,
          redFlag: {
            en: 'Patchy hair loss is a pattern that benefits from timely clinical evaluation.',
            ar: 'الفراغات الموضعية نمط قد يستفيد من تقييم متخصص في وقت مبكر.'
          }
        }
      ]
    },
    {
      id: 'duration',
      title: { en: 'How long has it been ongoing?', ar: 'منذ متى؟' },
      options: [
        { id: 'lt2', label: { en: 'Less than 2 months', ar: 'أقل من شهرين' }, score: 1 },
        { id: '2to6', label: { en: '2–6 months', ar: 'من شهرين إلى 6 أشهر' }, score: 3 },
        { id: 'gt6', label: { en: 'More than 6 months', ar: 'أكثر من 6 أشهر' }, score: 4 }
      ]
    },
    {
      id: 'symptoms',
      title: { en: 'Any scalp symptoms?', ar: 'هل توجد أعراض بفروة الرأس؟' },
      options: [
        { id: 'none', label: { en: 'No', ar: 'لا' }, score: 0 },
        { id: 'itch', label: { en: 'Itching / dandruff', ar: 'حكة / قشرة' }, score: 2 },
        {
          id: 'pain',
          label: { en: 'Pain / burning', ar: 'ألم / حرقان' },
          score: 4,
          redFlag: {
            en: 'Pain or burning can signal inflammatory scalp conditions that warrant assessment.',
            ar: 'الألم أو الحرقان قد يشير إلى التهاب بفروة الرأس ويستدعي تقييمًا.'
          }
        }
      ]
    },
    {
      id: 'context',
      title: { en: 'Any recent trigger in the last 3–4 months?', ar: 'هل حدث عامل مُحفّز خلال 3–4 أشهر؟' },
      helper: {
        en: 'Examples: stress, illness, surgery, rapid weight change, postpartum.',
        ar: 'مثل: توتر شديد، مرض، عملية، تغير وزن سريع، بعد الولادة.'
      },
      options: [
        { id: 'no', label: { en: 'No / not sure', ar: 'لا / غير متأكد' }, score: 1 },
        { id: 'yes', label: { en: 'Yes', ar: 'نعم' }, score: 2 }
      ]
    }
  ],
  evaluate: (answers) => {
    const { score, redFlagsByLocale } = computeScore(hairLoss, answers)
    const level = score >= 12 ? 'priority' : score >= 7 ? 'evaluation' : 'informational'

    const summary = {
      en:
        level === 'priority'
          ? 'Your answers suggest a pattern that benefits from timely evaluation.'
          : level === 'evaluation'
            ? 'Your answers suggest hair shedding that may benefit from structured assessment.'
            : 'Your answers suggest a mild or early shedding pattern.'
      ,
      ar:
        level === 'priority'
          ? 'تشير إجاباتك إلى نمط قد يستفيد من تقييم في وقت قريب.'
          : level === 'evaluation'
            ? 'تشير إجاباتك إلى تساقط قد يستفيد من تقييم منظم.'
            : 'تشير إجاباتك إلى نمط تساقط خفيف أو مبكر.'
    }

    const explanation = {
      en:
        'Hair loss often reflects more than one factor. A structured approach focuses on pattern, timeline, scalp health, and medical context — then selects investigations or treatments only when appropriate.',
      ar:
        'غالبًا ما ينتج تساقط الشعر عن أكثر من عامل. النهج المنظم يركز على النمط والزمن وصحة فروة الرأس والسياق الطبي، ثم يحدد الفحوصات أو العلاج عند الحاجة.'
    }

    const nextSteps = {
      en: [
        'Avoid aggressive pulling, heat, or frequent harsh chemical treatments.',
        'Prioritize scalp health: manage dandruff/itch when present.',
        level === 'informational'
          ? 'If shedding persists beyond 8–12 weeks, consider evaluation.'
          : 'Consider a consultation for pattern assessment and tailored plan.'
      ],
      ar: [
        'تجنب الشد القوي والحرارة والمواد الكيميائية القاسية بشكل متكرر.',
        'اهتم بصحة فروة الرأس وعلاج القشرة/الحكة عند وجودها.',
        level === 'informational'
          ? 'إذا استمر التساقط لأكثر من 8–12 أسبوعًا، فكّر في تقييم متخصص.'
          : 'قد يفيد حجز استشارة لتقييم النمط ووضع خطة مناسبة.'
      ]
    }

    return withRedFlags({ level, score, summary, explanation, nextSteps }, redFlagsByLocale)
  }
}

const pigmentation: InsightModule = {
  slug: 'pigmentation',
  title: { en: 'Pigmentation Insight', ar: 'إرشادات التصبغات' },
  description: {
    en: 'Understand common pigmentation patterns and the role of sun protection and planning.',
    ar: 'فهم أنماط التصبغات الشائعة ودور واقي الشمس والخطة العلاجية.'
  },
  questions: [
    {
      id: 'onset',
      title: { en: 'How did the pigmentation start?', ar: 'كيف بدأت التصبغات؟' },
      options: [
        { id: 'gradual', label: { en: 'Gradual', ar: 'تدريجيًا' }, score: 2 },
        { id: 'afterInflamm', label: { en: 'After acne/irritation', ar: 'بعد حبوب/تهيج' }, score: 3 },
        { id: 'preg', label: { en: 'During/after pregnancy or hormones', ar: 'مع الحمل/الهرمونات' }, score: 3 }
      ]
    },
    {
      id: 'site',
      title: { en: 'Where is it mainly located?', ar: 'أين تتركز؟' },
      options: [
        { id: 'face', label: { en: 'Face', ar: 'الوجه' }, score: 2 },
        { id: 'body', label: { en: 'Body / exposed areas', ar: 'الجسم / مناطق مكشوفة' }, score: 2 },
        {
          id: 'newMole',
          label: { en: 'New changing spot / mole', ar: 'بقعة/شامة جديدة تتغير' },
          score: 6,
          redFlag: {
            en: 'A new or changing pigmented lesion should be assessed clinically.',
            ar: 'أي بقعة مصطبغة جديدة أو متغيرة يُنصح بتقييمها إكلينيكيًا.'
          }
        }
      ]
    },
    {
      id: 'sun',
      title: { en: 'How consistent is sun protection?', ar: 'ما مدى الالتزام بواقي الشمس؟' },
      options: [
        { id: 'daily', label: { en: 'Daily and re-applied', ar: 'يوميًا مع إعادة' }, score: 0 },
        { id: 'sometimes', label: { en: 'Sometimes', ar: 'أحيانًا' }, score: 2 },
        { id: 'rare', label: { en: 'Rarely', ar: 'نادرًا' }, score: 4 }
      ]
    },
    {
      id: 'irritation',
      title: { en: 'Do products cause irritation/burning?', ar: 'هل تسبب المنتجات تهيجًا/حرقانًا؟' },
      options: [
        { id: 'no', label: { en: 'No', ar: 'لا' }, score: 0 },
        { id: 'some', label: { en: 'Occasionally', ar: 'أحيانًا' }, score: 2 },
        { id: 'yes', label: { en: 'Frequently', ar: 'غالبًا' }, score: 3 }
      ]
    }
  ],
  evaluate: (answers) => {
    const { score, redFlagsByLocale } = computeScore(pigmentation, answers)
    const level = score >= 12 ? 'priority' : score >= 7 ? 'evaluation' : 'informational'

    const summary = {
      en:
        level === 'priority'
          ? 'Your answers suggest pigmentation that benefits from professional evaluation.'
          : level === 'evaluation'
            ? 'Your answers suggest pigmentation that may benefit from a structured plan.'
            : 'Your answers suggest a mild pigmentation pattern.'
      ,
      ar:
        level === 'priority'
          ? 'تشير إجاباتك إلى تصبغات قد تستفيد من تقييم متخصص.'
          : level === 'evaluation'
            ? 'تشير إجاباتك إلى تصبغات قد تستفيد من خطة منظمة.'
            : 'تشير إجاباتك إلى تصبغات خفيفة نسبيًا.'
    }

    const explanation = {
      en:
        'Pigmentation improves best with consistency: sun protection, barrier-friendly routines, and stepwise treatment. Irritation can worsen pigmentation, so planning matters more than intensity.',
      ar:
        'تتحسن التصبغات أكثر بالاستمرارية: واقي الشمس، روتين لطيف يحافظ على الحاجز، وعلاج تدريجي. التهيج قد يزيد التصبغ، لذا التخطيط أهم من الشدة.'
    }

    const nextSteps = {
      en: [
        'Use broad-spectrum sunscreen daily and re-apply with outdoor exposure.',
        'Avoid aggressive actives if irritation occurs; support the skin barrier first.',
        level === 'informational'
          ? 'If pigmentation persists or spreads, consider evaluation to tailor a plan.'
          : 'Consider a consultation to confirm the pattern and build a stepwise plan.'
      ],
      ar: [
        'استخدم واقي شمس واسع الطيف يوميًا وأعد وضعه عند التعرض للشمس.',
        'تجنب العلاجات القوية عند حدوث تهيج وابدأ بدعم حاجز الجلد.',
        level === 'informational'
          ? 'إذا استمر التصبغ أو زاد، قد يفيد التقييم لتحديد خطة.'
          : 'قد يفيد حجز استشارة لتأكيد النمط ووضع خطة تدريجية.'
      ]
    }

    return withRedFlags({ level, score, summary, explanation, nextSteps }, redFlagsByLocale)
  }
}

const rosacea: InsightModule = {
  slug: 'rosacea',
  title: { en: 'Rosacea & Redness Insight', ar: 'إرشادات الوردية والاحمرار' },
  description: {
    en: 'A structured guide to understand facial redness, flushing triggers, and when evaluation helps.',
    ar: 'دليل منظم لفهم احمرار الوجه ومحفزات التورد ومتى يفيد التقييم المتخصص.'
  },
  questions: [
    {
      id: 'pattern',
      title: { en: 'What best describes the redness?', ar: 'ما الوصف الأقرب للاحمرار؟' },
      options: [
        { id: 'episodic', label: { en: 'Comes and goes', ar: 'يظهر ويختفي' }, score: 2 },
        { id: 'persistent', label: { en: 'Persistent central facial redness', ar: 'احمرار مستمر بمنتصف الوجه' }, score: 4 },
        {
          id: 'bumps',
          label: { en: 'Redness with bumps/pustules', ar: 'احمرار مع حبوب/بثور' },
          score: 5
        }
      ]
    },
    {
      id: 'triggers',
      title: { en: 'Do common triggers make it worse?', ar: 'هل تزيدها المحفزات الشائعة؟' },
      helper: {
        en: 'Examples: heat, sun, spicy food, hot drinks, stress.',
        ar: 'مثل: الحرارة، الشمس، الأكل الحار، المشروبات الساخنة، التوتر.'
      },
      options: [
        { id: 'no', label: { en: 'Not clearly', ar: 'ليس بوضوح' }, score: 1 },
        { id: 'some', label: { en: 'Sometimes', ar: 'أحيانًا' }, score: 2 },
        { id: 'yes', label: { en: 'Yes, clearly', ar: 'نعم بوضوح' }, score: 3 }
      ]
    },
    {
      id: 'sensitivity',
      title: { en: 'How reactive is the skin?', ar: 'ما مدى حساسية الجلد؟' },
      options: [
        { id: 'mild', label: { en: 'Mild sensitivity', ar: 'حساسية بسيطة' }, score: 1 },
        { id: 'sting', label: { en: 'Burning/stinging with products', ar: 'حرقان/لسع مع المنتجات' }, score: 3 },
        {
          id: 'severe',
          label: { en: 'Frequent irritation and flushing', ar: 'تهيج وتورد متكرر' },
          score: 4
        }
      ]
    },
    {
      id: 'eyes',
      title: { en: 'Any eye symptoms with it?', ar: 'هل توجد أعراض بالعين مع الاحمرار؟' },
      options: [
        { id: 'no', label: { en: 'No', ar: 'لا' }, score: 0 },
        { id: 'mild', label: { en: 'Dry/gritty eyes', ar: 'جفاف/إحساس بالرمل' }, score: 3 },
        {
          id: 'pain',
          label: { en: 'Painful or very irritated eyes', ar: 'ألم أو تهيج شديد بالعين' },
          score: 6,
          redFlag: {
            en: 'Eye irritation with facial redness can benefit from earlier medical assessment.',
            ar: 'أعراض العين مع احمرار الوجه قد تستفيد من تقييم طبي مبكر.'
          }
        }
      ]
    }
  ],
  evaluate: (answers) => {
    const { score, redFlagsByLocale } = computeScore(rosacea, answers)
    const level = score >= 13 ? 'priority' : score >= 8 ? 'evaluation' : 'informational'

    const summary = {
      en:
        level === 'priority'
          ? 'Your answers suggest redness that may benefit from earlier evaluation.'
          : level === 'evaluation'
            ? 'Your answers suggest a rosacea-like pattern that may benefit from a structured plan.'
            : 'Your answers suggest a mild redness/flushing pattern.'
      ,
      ar:
        level === 'priority'
          ? 'تشير إجاباتك إلى احمرار قد يستفيد من تقييم مبكر.'
          : level === 'evaluation'
            ? 'تشير إجاباتك إلى نمط يشبه الوردية وقد يستفيد من خطة منظمة.'
            : 'تشير إجاباتك إلى نمط احمرار/تورد خفيف.'
    }

    const explanation = {
      en:
        'Facial redness is often trigger-sensitive. Consistent sun protection, gentle skincare, and identifying flushing triggers usually matter more than frequent product changes.',
      ar:
        'غالبًا ما يكون احمرار الوجه حساسًا للمحفزات. واقي الشمس المنتظم، والروتين اللطيف، ومعرفة المحفزات أهم عادة من تبديل المنتجات بشكل متكرر.'
    }

    const nextSteps = {
      en: [
        'Use gentle skincare and daily sunscreen; avoid harsh scrubs and frequent exfoliation.',
        'Track common triggers such as heat, sun, spicy food, and stress.',
        level === 'informational'
          ? 'If redness becomes persistent or develops bumps, consider evaluation.'
          : 'Consider a consultation to confirm the pattern and tailor trigger-focused treatment.'
      ],
      ar: [
        'استخدم روتينًا لطيفًا وواقي شمس يوميًا وتجنب المقشرات القاسية.',
        'راقب المحفزات الشائعة مثل الحرارة والشمس والأكل الحار والتوتر.',
        level === 'informational'
          ? 'إذا أصبح الاحمرار مستمرًا أو ظهر معه حبوب، فكّر في تقييم متخصص.'
          : 'قد يفيد حجز استشارة لتأكيد النمط ووضع علاج مناسب للمحفزات.'
      ]
    }

    return withRedFlags({ level, score, summary, explanation, nextSteps }, redFlagsByLocale)
  }
}

const eczema: InsightModule = {
  slug: 'eczema',
  title: { en: 'Eczema Insight', ar: 'إرشادات الإكزيما' },
  description: {
    en: 'A structured guide to itch, dryness, flare patterns, and when earlier review is useful.',
    ar: 'دليل منظم للحكة والجفاف ونمط النوبات ومتى تكون المراجعة المبكرة مفيدة.'
  },
  questions: [
    {
      id: 'itch',
      title: { en: 'How troublesome is the itch?', ar: 'ما شدة الحكة؟' },
      options: [
        { id: 'mild', label: { en: 'Mild', ar: 'بسيطة' }, score: 1 },
        { id: 'moderate', label: { en: 'Moderate', ar: 'متوسطة' }, score: 3 },
        { id: 'severe', label: { en: 'Severe / disturbing sleep', ar: 'شديدة / تؤثر على النوم' }, score: 5 }
      ]
    },
    {
      id: 'pattern',
      title: { en: 'What best describes the rash?', ar: 'ما الوصف الأقرب للطفح؟' },
      options: [
        { id: 'dry', label: { en: 'Dry, rough patches', ar: 'بقع جافة وخشنة' }, score: 2 },
        { id: 'recurrent', label: { en: 'Recurrent flares', ar: 'نوبات متكررة' }, score: 3 },
        {
          id: 'oozing',
          label: { en: 'Crusting/oozing areas', ar: 'مناطق بها إفرازات/قشور' },
          score: 6,
          redFlag: {
            en: 'Oozing or crusted eczema can need earlier review to assess infection or stronger inflammation.',
            ar: 'الإكزيما المصحوبة بإفرازات أو قشور قد تحتاج مراجعة مبكرة لتقييم العدوى أو شدة الالتهاب.'
          }
        }
      ]
    },
    {
      id: 'spread',
      title: { en: 'How widespread is it?', ar: 'ما مدى انتشارها؟' },
      options: [
        { id: 'small', label: { en: 'Small areas only', ar: 'مناطق محدودة' }, score: 1 },
        { id: 'several', label: { en: 'Several body areas', ar: 'عدة مناطق بالجسم' }, score: 3 },
        { id: 'large', label: { en: 'Large/widespread areas', ar: 'مناطق واسعة/منتشرة' }, score: 5 }
      ]
    },
    {
      id: 'response',
      title: { en: 'How has basic care worked so far?', ar: 'كيف كانت الاستجابة للعناية الأساسية؟' },
      helper: {
        en: 'Examples: moisturizer, fragrance avoidance, gentle cleansers.',
        ar: 'مثل: الترطيب، تجنب العطور، واستخدام غسول لطيف.'
      },
      options: [
        { id: 'better', label: { en: 'It improved', ar: 'تحسنت' }, score: 1 },
        { id: 'partial', label: { en: 'Only partial improvement', ar: 'تحسن جزئي فقط' }, score: 3 },
        { id: 'none', label: { en: 'Little or no improvement', ar: 'تحسن بسيط جدًا أو لا يوجد' }, score: 4 }
      ]
    }
  ],
  evaluate: (answers) => {
    const { score, redFlagsByLocale } = computeScore(eczema, answers)
    const level = score >= 14 ? 'priority' : score >= 9 ? 'evaluation' : 'informational'

    const summary = {
      en:
        level === 'priority'
          ? 'Your answers suggest eczema that may benefit from earlier medical review.'
          : level === 'evaluation'
            ? 'Your answers suggest eczema that may benefit from a structured treatment plan.'
            : 'Your answers suggest a mild eczema pattern.'
      ,
      ar:
        level === 'priority'
          ? 'تشير إجاباتك إلى إكزيما قد تستفيد من مراجعة طبية مبكرة.'
          : level === 'evaluation'
            ? 'تشير إجاباتك إلى إكزيما قد تستفيد من خطة علاج منظمة.'
            : 'تشير إجاباتك إلى نمط إكزيما خفيف.'
    }

    const explanation = {
      en:
        'Eczema control usually depends on barrier repair, trigger reduction, and timely treatment during flares. Recurrent or widespread disease often needs a more structured plan.',
      ar:
        'يعتمد التحكم في الإكزيما غالبًا على إصلاح حاجز الجلد وتقليل المحفزات والعلاج المناسب أثناء النوبات. الحالات المتكررة أو الواسعة قد تحتاج خطة أكثر تنظيمًا.'
    }

    const nextSteps = {
      en: [
        'Prioritize frequent moisturizer use and avoid fragranced or harsh products.',
        'Use lukewarm showers and reduce friction from scratching when possible.',
        level === 'informational'
          ? 'If flares become frequent or spread, consider evaluation.'
          : 'Consider a consultation to confirm the trigger pattern and adjust treatment intensity.'
      ],
      ar: [
        'اهتم باستخدام المرطب بانتظام وتجنب المنتجات المعطرة أو القاسية.',
        'استخدم ماءً فاترًا وقلل الاحتكاك الناتج عن الحك قدر الإمكان.',
        level === 'informational'
          ? 'إذا أصبحت النوبات متكررة أو منتشرة، فكّر في تقييم متخصص.'
          : 'قد يفيد حجز استشارة لتحديد المحفزات وضبط شدة العلاج.'
      ]
    }

    return withRedFlags({ level, score, summary, explanation, nextSteps }, redFlagsByLocale)
  }
}

const psoriasis: InsightModule = {
  slug: 'psoriasis',
  title: { en: 'Psoriasis Insight', ar: 'إرشادات الصدفية' },
  description: {
    en: 'A structured guide to plaque patterns, scalp/nail involvement, and when a broader plan is helpful.',
    ar: 'دليل منظم لأنماط اللويحات ومشاركة فروة الرأس أو الأظافر ومتى تكون الخطة الأوسع مفيدة.'
  },
  questions: [
    {
      id: 'plaques',
      title: { en: 'What best describes the skin changes?', ar: 'ما الوصف الأقرب لتغيرات الجلد؟' },
      options: [
        { id: 'small', label: { en: 'Small dry plaques', ar: 'لويحات صغيرة جافة' }, score: 2 },
        { id: 'thick', label: { en: 'Thicker/scaly plaques', ar: 'لويحات أكثر سماكة وتقشرًا' }, score: 4 },
        { id: 'widespread', label: { en: 'Multiple or widespread plaques', ar: 'لويحات متعددة أو واسعة' }, score: 5 }
      ]
    },
    {
      id: 'sites',
      title: { en: 'Where is it affecting you most?', ar: 'أين تؤثر أكثر؟' },
      options: [
        { id: 'limited', label: { en: 'Elbows/knees only', ar: 'الأكواع/الركبتان فقط' }, score: 2 },
        { id: 'scalp', label: { en: 'Scalp or face involvement', ar: 'فروة الرأس أو الوجه' }, score: 4 },
        { id: 'nails', label: { en: 'Nails and other areas too', ar: 'الأظافر ومناطق أخرى أيضًا' }, score: 5 }
      ]
    },
    {
      id: 'joints',
      title: { en: 'Any joint symptoms with the skin disease?', ar: 'هل توجد أعراض بالمفاصل مع الجلد؟' },
      options: [
        { id: 'no', label: { en: 'No', ar: 'لا' }, score: 0 },
        { id: 'some', label: { en: 'Some stiffness/ache', ar: 'تيبس/ألم بسيط' }, score: 4 },
        {
          id: 'clear',
          label: { en: 'Clear swelling or morning stiffness', ar: 'تورم واضح أو تيبس صباحي' },
          score: 7,
          redFlag: {
            en: 'Joint symptoms alongside psoriasis should be assessed clinically.',
            ar: 'وجود أعراض بالمفاصل مع الصدفية يستدعي تقييمًا إكلينيكيًا.'
          }
        }
      ]
    },
    {
      id: 'control',
      title: { en: 'How has it responded to treatment so far?', ar: 'كيف كانت الاستجابة للعلاج حتى الآن؟' },
      options: [
        { id: 'good', label: { en: 'Usually controlled', ar: 'غالبًا تحت السيطرة' }, score: 1 },
        { id: 'partial', label: { en: 'Partial or short-lived control', ar: 'تحكم جزئي أو مؤقت' }, score: 3 },
        { id: 'poor', label: { en: 'Persistent despite treatment', ar: 'مستمرة رغم العلاج' }, score: 5 }
      ]
    }
  ],
  evaluate: (answers) => {
    const { score, redFlagsByLocale } = computeScore(psoriasis, answers)
    const level = score >= 15 ? 'priority' : score >= 9 ? 'evaluation' : 'informational'

    const summary = {
      en:
        level === 'priority'
          ? 'Your answers suggest psoriasis that may benefit from earlier review.'
          : level === 'evaluation'
            ? 'Your answers suggest psoriasis that may benefit from a more structured plan.'
            : 'Your answers suggest a limited psoriasis pattern.'
      ,
      ar:
        level === 'priority'
          ? 'تشير إجاباتك إلى صدفية قد تستفيد من مراجعة مبكرة.'
          : level === 'evaluation'
            ? 'تشير إجاباتك إلى صدفية قد تستفيد من خطة أكثر تنظيمًا.'
            : 'تشير إجاباتك إلى نمط صدفية محدود.'
    }

    const explanation = {
      en:
        'Psoriasis is usually managed as a chronic inflammatory condition. Extent, scalp or nail involvement, and joint symptoms all influence how intensive treatment needs to be.',
      ar:
        'تُدار الصدفية عادة كحالة التهابية مزمنة. مدى الانتشار، ومشاركة فروة الرأس أو الأظافر، وأعراض المفاصل كلها تؤثر على شدة الخطة العلاجية.'
    }

    const nextSteps = {
      en: [
        'Keep routines consistent and avoid picking or overly aggressive scrubbing of plaques.',
        'Note whether scalp, nails, or joints are affected, since that changes planning.',
        level === 'informational'
          ? 'If plaques spread or recur frequently, consider evaluation.'
          : 'Consider a consultation to assess extent and decide whether broader control is needed.'
      ],
      ar: [
        'حافظ على روتين ثابت وتجنب العبث باللويحات أو فركها بعنف.',
        'سجل ما إذا كانت فروة الرأس أو الأظافر أو المفاصل متأثرة لأن ذلك يغير الخطة.',
        level === 'informational'
          ? 'إذا انتشرت اللويحات أو تكررت كثيرًا، فكّر في تقييم متخصص.'
          : 'قد يفيد حجز استشارة لتقييم مدى الحالة وتحديد الحاجة لخطة أوسع.'
      ]
    }

    return withRedFlags({ level, score, summary, explanation, nextSteps }, redFlagsByLocale)
  }
}

const whenToConsult: InsightModule = {
  slug: 'when-to-consult',
  title: { en: 'When to Consult', ar: 'متى أزور طبيب الجلدية؟' },
  description: {
    en: 'A structured guide to help decide when professional evaluation is recommended.',
    ar: 'دليل منظم يساعد على تحديد متى يُنصح بزيارة طبيب الجلدية.'
  },
  questions: [
    {
      id: 'duration',
      title: { en: 'How long has the issue been present?', ar: 'منذ متى توجد المشكلة؟' },
      options: [
        { id: 'lt2w', label: { en: 'Less than 2 weeks', ar: 'أقل من أسبوعين' }, score: 1 },
        { id: '2to8w', label: { en: '2–8 weeks', ar: 'من أسبوعين إلى 8 أسابيع' }, score: 3 },
        { id: 'gt8w', label: { en: 'More than 8 weeks', ar: 'أكثر من 8 أسابيع' }, score: 4 }
      ]
    },
    {
      id: 'symptoms',
      title: { en: 'Any of the following?', ar: 'هل يوجد أي مما يلي؟' },
      helper: {
        en: 'Rapid change, bleeding, severe pain, widespread rash, or fever.',
        ar: 'تغير سريع، نزف، ألم شديد، طفح منتشر، أو حرارة.'
      },
      options: [
        { id: 'no', label: { en: 'No', ar: 'لا' }, score: 0 },
        {
          id: 'yes',
          label: { en: 'Yes', ar: 'نعم' },
          score: 8,
          redFlag: {
            en: 'If there is rapid change, bleeding, severe pain, widespread rash, or fever, seek prompt evaluation.',
            ar: 'عند وجود تغير سريع أو نزف أو ألم شديد أو طفح منتشر أو حرارة، يُنصح بتقييم عاجل.'
          }
        }
      ]
    },
    {
      id: 'impact',
      title: { en: 'How much does it affect daily life?', ar: 'ما مدى تأثيرها على الحياة اليومية؟' },
      options: [
        { id: 'low', label: { en: 'Mild', ar: 'بسيط' }, score: 1 },
        { id: 'mid', label: { en: 'Moderate', ar: 'متوسط' }, score: 2 },
        { id: 'high', label: { en: 'High', ar: 'شديد' }, score: 4 }
      ]
    }
  ],
  evaluate: (answers) => {
    const { score, redFlagsByLocale } = computeScore(whenToConsult, answers)
    const level = score >= 10 ? 'priority' : score >= 6 ? 'evaluation' : 'informational'

    const summary = {
      en:
        level === 'priority'
          ? 'Your answers suggest you should seek evaluation promptly.'
          : level === 'evaluation'
            ? 'Your answers suggest a consultation may be helpful.'
            : 'Your answers suggest monitoring may be reasonable.'
      ,
      ar:
        level === 'priority'
          ? 'تشير إجاباتك إلى أن التقييم العاجل قد يكون مناسبًا.'
          : level === 'evaluation'
            ? 'تشير إجاباتك إلى أن الاستشارة قد تكون مفيدة.'
            : 'تشير إجاباتك إلى أن المتابعة قد تكون كافية.'
    }

    const explanation = {
      en:
        'Many skin concerns improve with time and basic care. Persistent problems, rapid change, significant symptoms, or high impact on daily life are good reasons to seek professional evaluation.',
      ar:
        'قد تتحسن كثير من مشكلات الجلد مع الوقت والرعاية الأساسية. لكن الاستمرار أو التغير السريع أو الأعراض الشديدة أو التأثير الكبير على الحياة اليومية هي أسباب وجيهة لطلب تقييم متخصص.'
    }

    const nextSteps = {
      en: [
        'If you notice rapid change, bleeding, or severe symptoms, seek prompt evaluation.',
        'If the issue persists beyond several weeks, a structured assessment can clarify the diagnosis.',
        'Bring photos (if changes fluctuate) and a list of products/medications used.'
      ],
      ar: [
        'عند وجود تغير سريع أو نزف أو أعراض شديدة، يُنصح بتقييم عاجل.',
        'إذا استمرت المشكلة لعدة أسابيع، قد يفيد تقييم منظم لتوضيح التشخيص.',
        'أحضر صورًا (إن كانت الحالة تتغير) وقائمة بالمنتجات/الأدوية المستخدمة.'
      ]
    }

    return withRedFlags({ level, score, summary, explanation, nextSteps }, redFlagsByLocale)
  }
}

export const insightModules: InsightModule[] = [
  acne,
  hairLoss,
  pigmentation,
  rosacea,
  eczema,
  psoriasis,
  whenToConsult
]

export function getInsightModule(slug: string) {
  return insightModules.find((m) => m.slug === slug)
}
