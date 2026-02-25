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
        ar: 'متى لا يكون حبّ الشباب «مجرد حبّ شباب»؟ نهج منظّم'
      }
    }
  ],
  'hair-loss': [
    {
      slug: 'hair-loss-workup',
      title: {
        en: 'Hair loss workup: patterns, timelines, and what matters',
        ar: 'تقييم تساقط الشعر: الأنماط والزمن وما الذي يهم'
      }
    }
  ],
  pigmentation: [
    {
      slug: 'pigmentation-melasma-guide',
      title: {
        en: 'Pigmentation & melasma: why it recurs and how to manage it',
        ar: 'التصبغات والكلف: لماذا تعود وكيف نُديرها بشكل صحيح'
      }
    }
  ],
  'when-to-consult': [
    {
      slug: 'when-to-see-a-dermatologist',
      title: {
        en: 'When to see a dermatologist: practical signals to not ignore',
        ar: 'متى يجب زيارة طبيب الجلدية؟ إشارات عملية لا تُهمل'
      }
    }
  ]
}
