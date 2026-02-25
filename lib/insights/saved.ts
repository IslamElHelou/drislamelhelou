export type SavedInsight = {
  id: string
  module: string
  at: number
  level: 'informational' | 'evaluation' | 'priority'
  summary: { en: string; ar: string }
}

export const SAVED_KEY = 'drislam:insights:saved'

export function loadSaved(): SavedInsight[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(SAVED_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed
      .filter((x) => x && typeof x === 'object')
      .map((x) => ({
        id: String((x as any).id ?? ''),
        module: String((x as any).module ?? ''),
        at: Number((x as any).at ?? 0),
        level: (((x as any).level as SavedInsight['level']) ?? 'informational'),
        summary: {
          en: String((x as any).summary?.en ?? ''),
          ar: String((x as any).summary?.ar ?? '')
        }
      }))
      .filter((x) => x.id && x.module && x.at)
      .slice(0, 3)
  } catch {
    return []
  }
}

export function saveInsight(entry: Omit<SavedInsight, 'id'>) {
  if (typeof window === 'undefined') return
  const id = `${entry.module}:${entry.at}`
  const existing = loadSaved()
  const next: SavedInsight[] = [{ ...entry, id }, ...existing.filter((e) => e.id !== id)]
  window.localStorage.setItem(SAVED_KEY, JSON.stringify(next.slice(0, 3)))
}

export function removeSaved(id: string) {
  if (typeof window === 'undefined') return
  const next = loadSaved().filter((e) => e.id !== id)
  window.localStorage.setItem(SAVED_KEY, JSON.stringify(next))
}
