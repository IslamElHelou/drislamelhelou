import crypto from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'dash_auth'

export async function isDashboardAuthed() {
  const cookieStore = await cookies()
  const c = cookieStore.get(COOKIE_NAME)
  return c?.value === '1'
}

export function cookieName() {
  return COOKIE_NAME
}

export function verifyPassword(input: string) {
  const expected = process.env.DASHBOARD_PASSWORD || ''
  const a = Buffer.from(String(input || ''), 'utf8')
  const b = Buffer.from(String(expected), 'utf8')
  if (!expected) return false
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}
