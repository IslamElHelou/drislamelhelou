import type { Locale } from '@/lib/i18n'

export type InsightLevel = 'informational' | 'evaluation' | 'priority'

export type InsightOption = {
  id: string
  label: Record<Locale, string>
  score: number
  /** If selected, adds a red-flag note (educational, not diagnostic). */
  redFlag?: Record<Locale, string>
}

export type InsightQuestion = {
  id: string
  title: Record<Locale, string>
  helper?: Record<Locale, string>
  options: InsightOption[]
}

export type InsightResult = {
  level: InsightLevel
  score: number
  summary: Record<Locale, string>
  explanation: Record<Locale, string>
  nextSteps: Record<Locale, string[]>
  redFlags?: Record<Locale, string[]>
}

export type InsightModule = {
  slug: string
  title: Record<Locale, string>
  description: Record<Locale, string>
  questions: InsightQuestion[]
  /** Convert answers into result */
  evaluate: (answers: Record<string, string>, locale: Locale) => InsightResult
}
