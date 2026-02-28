import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { addAppointment, listAppointments, updateAppointmentStatus, type AppointmentStatus } from '@/lib/appointments'
import { isDashboardAuthed } from '@/lib/dashboardAuth'
import { clinic } from '@/lib/i18n'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })

    // Honeypot
    if (typeof body.company === 'string' && body.company.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    const name = String(body.name ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const email = String(body.email ?? '').trim().toLowerCase()
    const condition = String(body.condition ?? '').trim()
    const preferred = String(body.preferred ?? '').trim()
    const locale = (body.locale === 'ar' ? 'ar' : 'en') as 'en' | 'ar'

    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, error: 'Name required' }, { status: 400 })
    }
    if (!phone || phone.length < 8) {
      return NextResponse.json({ success: false, error: 'Phone required' }, { status: 400 })
    }
    if (email && !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 })
    }
    if (!preferred) {
      return NextResponse.json({ success: false, error: 'Preferred time required' }, { status: 400 })
    }

    const createdAt = new Date().toISOString()
    const id = uid()

    await addAppointment({
      id,
      createdAt,
      name,
      phone,
      email: email || undefined,
      condition,
      preferred,
      status: 'new',
      locale
    })

    let emailNotified = false

    // Email notify
    const apiKey = process.env.RESEND_API_KEY
    const notifyTo = process.env.APPOINTMENT_NOTIFICATION_EMAIL || process.env.LEAD_NOTIFICATION_EMAIL
    if (apiKey && notifyTo) {
      try {
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
            <h2 style="margin:0 0 12px;">New Appointment Request</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
              <tr><td style="padding:6px 0; color:#444;"><strong>Name</strong></td><td style="padding:6px 0;">${safe(name)}</td></tr>
              <tr><td style="padding:6px 0; color:#444;"><strong>Phone / WhatsApp</strong></td><td style="padding:6px 0;">${safe(phone)}</td></tr>
              <tr><td style="padding:6px 0; color:#444;"><strong>Email</strong></td><td style="padding:6px 0;">${email ? safe(email) : 'Not provided'}</td></tr>
              <tr><td style="padding:6px 0; color:#444;"><strong>Condition</strong></td><td style="padding:6px 0;">${safe(condition || 'General')}</td></tr>
              <tr><td style="padding:6px 0; color:#444;"><strong>Preferred time</strong></td><td style="padding:6px 0;">${safe(preferred)}</td></tr>
              <tr><td style="padding:6px 0; color:#444;"><strong>Status</strong></td><td style="padding:6px 0;">New</td></tr>
              <tr><td style="padding:6px 0; color:#444;"><strong>ID</strong></td><td style="padding:6px 0;">${safe(id)}</td></tr>
            </table>
            <p style="margin:16px 0 0; color:#666; font-size: 13px;">Submitted from the clinic website appointment request form.</p>
          </div>
        `

        await resend.emails.send({
          from,
          to: notifyTo,
          subject: `Appointment Request — ${condition || 'General'}`,
          html,
          ...(email ? { replyTo: email } : {})
        })
        emailNotified = true
      } catch (error) {
        console.error('[APPOINTMENT_EMAIL_FAILED]', {
          id,
          notifyTo,
          condition,
          error
        })
      }
    } else {
      console.warn('[APPOINTMENT_EMAIL_SKIPPED]', {
        id,
        hasApiKey: Boolean(apiKey),
        hasNotifyTo: Boolean(notifyTo)
      })
    }

    const msg = locale === 'ar'
      ? `مرحبًا، أرسلت طلب حجز موعد عبر موقع العيادة.\nالاسم: ${name}\nالحالة: ${condition || 'جلدية عامة'}\nالوقت المفضل: ${preferred}\nرقم الهاتف: ${phone}`
      : `Hello, I submitted an appointment request from the clinic website.\nName: ${name}\nCondition: ${condition || 'General dermatology'}\nPreferred time: ${preferred}\nPhone: ${phone}`

    const whatsappUrl = `https://wa.me/${clinic.whatsappE164.replace('+', '')}?text=${encodeURIComponent(msg)}`

    return NextResponse.json({ success: true, whatsappUrl, emailNotified })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  if (!(await isDashboardAuthed())) {
    return NextResponse.json({ success: false }, { status: 401 })
  }
  const items = await listAppointments()
  return NextResponse.json({ success: true, items })
}

export async function PATCH(req: Request) {
  if (!(await isDashboardAuthed())) {
    return NextResponse.json({ success: false }, { status: 401 })
  }
  const body = await req.json().catch(() => null)
  const id = String(body?.id ?? '')
  const status = String(body?.status ?? '') as AppointmentStatus
  const allowed: AppointmentStatus[] = ['new', 'contacted', 'booked', 'closed']
  if (!id || !allowed.includes(status)) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
  await updateAppointmentStatus(id, status)
  return NextResponse.json({ success: true })
}
