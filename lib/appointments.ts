import { createClient } from '@supabase/supabase-js'
import { promises as fs } from 'node:fs'
import path from 'node:path'

export type AppointmentStatus = 'new' | 'contacted' | 'booked' | 'closed'

export type AppointmentRequest = {
  id: string
  createdAt: string
  name: string
  phone: string
  email?: string
  condition: string
  preferred: string
  status: AppointmentStatus
  locale?: 'en' | 'ar'
}

const isSupabaseConfigured = () =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

function supabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false }
  })
}

const filePath = path.join(process.cwd(), 'data', 'appointments.json')

async function ensureFile() {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  try {
    await fs.access(filePath)
  } catch {
    await fs.writeFile(filePath, JSON.stringify({ items: [] }, null, 2), 'utf8')
  }
}

async function readFileStore(): Promise<AppointmentRequest[]> {
  await ensureFile()
  const raw = await fs.readFile(filePath, 'utf8')
  const parsed = JSON.parse(raw) as { items: AppointmentRequest[] }
  return Array.isArray(parsed.items) ? parsed.items : []
}

async function writeFileStore(items: AppointmentRequest[]) {
  await ensureFile()
  await fs.writeFile(filePath, JSON.stringify({ items }, null, 2), 'utf8')
}

export async function addAppointment(a: AppointmentRequest) {
  if (isSupabaseConfigured()) {
    const s = supabase()
    // Expect a table named `appointments` with matching columns.
    await s.from('appointments').insert(a)
    return
  }
  const items = await readFileStore()
  items.unshift(a)
  await writeFileStore(items.slice(0, 5000))
}

export async function listAppointments(): Promise<AppointmentRequest[]> {
  if (isSupabaseConfigured()) {
    const s = supabase()
    const { data } = await s
      .from('appointments')
      .select('*')
      .order('createdAt', { ascending: false })
      .limit(500)
    return (data as AppointmentRequest[]) || []
  }
  return readFileStore()
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  if (isSupabaseConfigured()) {
    const s = supabase()
    await s.from('appointments').update({ status }).eq('id', id)
    return
  }
  const items = await readFileStore()
  const idx = items.findIndex((x) => x.id === id)
  if (idx >= 0) items[idx] = { ...items[idx], status }
  await writeFileStore(items)
}
