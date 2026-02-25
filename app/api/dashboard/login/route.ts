import { NextResponse } from 'next/server'
import { cookieName, verifyPassword } from '@/lib/dashboardAuth'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const password = String(body?.password ?? '')

  if (!verifyPassword(password)) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set(cookieName(), '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 14
  })
  return res
}
