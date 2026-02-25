import type { Locale } from '@/lib/i18n'
import type { InsightModule, InsightResult } from './types'

export function computeScore(module: InsightModule, answers: Record<string, string>) {
  let score = 0
  const redFlagsByLocale: Record<Locale, string[]> = { en: [], ar: [] }

  for (const q of module.questions) {
    const selectedId = answers[q.id]
    const opt = q.options.find((o) => o.id === selectedId)
    if (!opt) continue
    score += opt.score
    if (opt.redFlag) {
      redFlagsByLocale.en.push(opt.redFlag.en)
      redFlagsByLocale.ar.push(opt.redFlag.ar)
    }
  }

  return { score, redFlagsByLocale }
}

export function withRedFlags(result: InsightResult, redFlagsByLocale: Record<Locale, string[]>) {
  const has = redFlagsByLocale.en.length > 0 || redFlagsByLocale.ar.length > 0
  if (!has) return result
  return {
    ...result,
    redFlags: {
      en: redFlagsByLocale.en,
      ar: redFlagsByLocale.ar
    }
  }
}
