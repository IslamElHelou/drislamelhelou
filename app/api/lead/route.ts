import { NextResponse } from 'next/server'
import { Resend } from 'resend'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
    }

    // Honeypot for basic bot filtering
    if (typeof body.company === 'string' && body.company.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim().toLowerCase()
    const phone = String(body.phone ?? '').trim()
    const condition = String(body.condition ?? '').trim()
    const level = String(body.level ?? '').trim()

    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, error: 'Name required' }, { status: 400 })
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL
    if (!apiKey || !notifyTo) {
      return NextResponse.json(
        { success: false, error: 'Server email configuration missing' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const from = process.env.LEAD_FROM_EMAIL || 'Website Lead <onboarding@resend.dev>'

    const safe = (s: string) =>
      s
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')

    const html = `
      <div style="font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; line-height: 1.5;">
        <h2 style="margin:0 0 12px;">New Clinical Summary Request</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tr><td style="padding:6px 0; color:#444;"><strong>Name</strong></td><td style="padding:6px 0;">${safe(name)}</td></tr>
          <tr><td style="padding:6px 0; color:#444;"><strong>Email</strong></td><td style="padding:6px 0;">${safe(email)}</td></tr>
          <tr><td style="padding:6px 0; color:#444;"><strong>WhatsApp</strong></td><td style="padding:6px 0;">${phone ? safe(phone) : 'Not provided'}</td></tr>
          <tr><td style="padding:6px 0; color:#444;"><strong>Insight</strong></td><td style="padding:6px 0;">${safe(condition)}</td></tr>
          <tr><td style="padding:6px 0; color:#444;"><strong>Level</strong></td><td style="padding:6px 0;">${safe(level)}</td></tr>
        </table>
        <p style="margin:16px 0 0; color:#666; font-size: 13px;">Submitted from the clinic website Insights tool.</p>
      </div>
    `

    await resend.emails.send({
      from,
      to: notifyTo,
      subject: `New Insight Lead — ${condition || 'Clinical Summary'}`,
      html
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
