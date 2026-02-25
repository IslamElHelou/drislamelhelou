import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(6).max(30),
  message: z.string().min(5).max(1200),
  locale: z.string().optional()
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const data = schema.parse(json)

    // TODO: Replace with your preferred delivery:
    // - email (Resend, SendGrid)
    // - WhatsApp Business API
    // - store in a DB
    // For now we just log it.
    console.log('[CONTACT]', data)

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
}
