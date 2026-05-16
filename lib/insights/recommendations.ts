export type InsightRecommendation = {
  slug: string
  title: {
    en: string
    ar: string
  }
}

/**
 * Lightweight internal-linking between Insight tools and the Blog.
 *
 * Notes:
 * - Keys MUST match InsightModule.slug values.
 * - Slugs MUST match MDX filenames under content/blog/{en,ar}/.
 */
export const insightRecommendations: Record<string, InsightRecommendation[]> = {
  acne: [
    {
      slug: 'acne-basics',
      title: {
        en: 'When acne is not “just acne”: a structured approach',
        ar: 'حب الشباب: ما الذي يُحسّن الحالة فعلاً؟'
      }
    }
  ],
  'hair-loss': [
    {
      slug: 'hair-loss-workup',
      title: {
        en: 'Hair loss workup: patterns, timelines, and what matters',
        ar: 'تساقط الشعر عند البالغين: نهج تشخيصي عملي'
      }
    }
  ],
  pigmentation: [
    {
      slug: 'pigmentation-melasma-guide',
      title: {
        en: 'Pigmentation & melasma: why it recurs and how to manage it',
        ar: 'التصبغات والكلف: لماذا تعود وكيف نديرها بشكل صحيح'
      }
    }
  ],
  eczema: [
    {
      slug: 'cutaneous-lymphoma-signs',
      title: {
        en: 'Persistent rashes: when a “simple eczema” story deserves a second look',
        ar: 'هل يمكن أن تكون ليمفوما جلدية؟ علامات تستدعي تقييمًا أدق'
      }
    }
  ],
  psoriasis: [
    {
      slug: 'psoriasis-beyond-skin',
      title: {
        en: 'Psoriasis beyond the skin: why long-term control matters',
        ar: 'الصدفية أبعد من الجلد: لماذا هي مرض التهابي مزمن؟'
      }
    }
  ],
  'when-to-consult': [
    {
      slug: 'when-to-see-a-dermatologist',
      title: {
        en: 'When to see a dermatologist: practical signals to not ignore',
        ar: 'متى تزور طبيب الجلدية؟ إشارات عملية لا يجب تجاهلها'
      }
    }
  ]
}
