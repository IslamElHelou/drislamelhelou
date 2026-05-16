"use client"

import { useEffect, useMemo, useState } from 'react'
import type { AppointmentRequest, AppointmentStatus } from '@/lib/appointments'

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, '')
}

function toWhatsAppHref(phone: string, name: string) {
  const normalized = normalizePhone(phone).replace('+', '')
  if (!normalized) return '#'
  const text = encodeURIComponent(`Hello ${name}, this is Dr. Islam El-Helou Clinic regarding your appointment request.`)
  return `https://wa.me/${normalized}?text=${text}`
}

function toCsv(rows: AppointmentRequest[]) {
  const header = ['id', 'createdAt', 'name', 'phone', 'email', 'condition', 'preferred', 'status', 'locale']
  const escapeCell = (value: string) => {
    const safe = String(value ?? '')
    if (/[,"\n]/.test(safe)) return `"${safe.replace(/"/g, '""')}"`
    return safe
  }

  const lines = rows.map((r) =>
    [
      r.id,
      r.createdAt,
      r.name,
      r.phone,
      r.email || '',
      r.condition || '',
      r.preferred || '',
      r.status,
      r.locale || ''
    ]
      .map(escapeCell)
      .join(',')
  )

  return [header.join(','), ...lines].join('\n')
}

function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function DashboardClient({ authed }: { authed: boolean }) {
  const [isAuthed, setIsAuthed] = useState(authed)
  const [password, setPassword] = useState('')
  const [items, setItems] = useState<AppointmentRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all')
  const [localeFilter, setLocaleFilter] = useState<'all' | 'en' | 'ar'>('all')
  const [savingId, setSavingId] = useState<string | null>(null)

  const statusOptions: AppointmentStatus[] = useMemo(
    () => ['new', 'contacted', 'booked', 'closed'],
    []
  )

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/appointment', { cache: 'no-store' })
      if (!res.ok) {
        setError('Not authorized')
        setLoading(false)
        return
      }
      const json = (await res.json()) as any
      setItems(Array.isArray(json.items) ? json.items : [])
      setLoading(false)
    } catch {
      setError('Failed to load')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthed) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed])

  const stats = useMemo(() => {
    const base = { total: items.length, new: 0, contacted: 0, booked: 0, closed: 0 }
    for (const item of items) {
      if (item.status === 'new') base.new += 1
      if (item.status === 'contacted') base.contacted += 1
      if (item.status === 'booked') base.booked += 1
      if (item.status === 'closed') base.closed += 1
    }
    return base
  }, [items])

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false
      if (localeFilter !== 'all' && (item.locale || 'en') !== localeFilter) return false

      if (!q) return true
      const haystack = [item.name, item.phone, item.email || '', item.condition || '', item.preferred || '']
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [items, query, statusFilter, localeFilter])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/dashboard/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (!res.ok) {
      setError('Wrong password')
      return
    }
    setIsAuthed(true)
  }

  async function logout() {
    await fetch('/api/dashboard/logout', { method: 'POST' })
    setIsAuthed(false)
    setItems([])
  }

  async function updateStatus(id: string, status: AppointmentStatus) {
    const prev = items
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status } : x)))
    setSavingId(id)
    const res = await fetch('/api/appointment', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    if (!res.ok) setItems(prev)
    setSavingId((cur) => (cur === id ? null : cur))
  }

  function exportFilteredCsv() {
    const content = toCsv(filteredItems)
    const date = new Date().toISOString().slice(0, 10)
    downloadCsv(`appointments-${date}.csv`, content)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="journalHeader">
          <div className="journalKicker">Dashboard</div>
          <h1 className="journalTitle">Appointment Requests</h1>
          <div className="goldLine" aria-hidden />
          <p className="journalLead">Internal view for clinic staff. Use the status to track follow-up.</p>
        </div>

        {!isAuthed ? (
          <div className="serviceCard" style={{ marginTop: 18, maxWidth: 520 }}>
            <div className="serviceTitle">Sign in</div>
            <div className="serviceDesc" style={{ marginTop: 6 }}>
              Enter the dashboard password.
            </div>
            <form onSubmit={login} style={{ marginTop: 12, display: 'grid', gap: 10 }}>
              <input
                className="leadInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              {error ? <div className="leadError">{error}</div> : null}
              <button className="leadButton" type="submit">
                Sign in
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="grid grid3" style={{ marginTop: 18 }}>
              <div className="card"><div style={{ fontSize: 12, color: 'var(--muted)' }}>Total</div><div style={{ fontSize: 28, fontWeight: 900 }}>{stats.total}</div></div>
              <div className="card"><div style={{ fontSize: 12, color: 'var(--muted)' }}>New</div><div style={{ fontSize: 28, fontWeight: 900 }}>{stats.new}</div></div>
              <div className="card"><div style={{ fontSize: 12, color: 'var(--muted)' }}>Contacted</div><div style={{ fontSize: 28, fontWeight: 900 }}>{stats.contacted}</div></div>
              <div className="card"><div style={{ fontSize: 12, color: 'var(--muted)' }}>Booked</div><div style={{ fontSize: 28, fontWeight: 900 }}>{stats.booked}</div></div>
              <div className="card"><div style={{ fontSize: 12, color: 'var(--muted)' }}>Closed</div><div style={{ fontSize: 28, fontWeight: 900 }}>{stats.closed}</div></div>
              <div className="card"><div style={{ fontSize: 12, color: 'var(--muted)' }}>Visible</div><div style={{ fontSize: 28, fontWeight: 900 }}>{filteredItems.length}</div></div>
            </div>

            <div style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'center' }}>
              <button className="btnSecondary" onClick={load} disabled={loading}>
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
              <button className="btn" onClick={exportFilteredCsv} disabled={!filteredItems.length}>
                Export CSV
              </button>
              <button className="btnTertiary" onClick={logout}>
                Sign out
              </button>
              {error ? <span className="leadError" style={{ marginLeft: 10 }}>{error}</span> : null}
            </div>

            <div className="serviceCard" style={{ marginTop: 12 }}>
              <div className="grid grid3" style={{ gap: 10 }}>
                <input
                  className="leadInput"
                  placeholder="Search name, phone, condition, preferred…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <select
                  className="leadInput"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | AppointmentStatus)}
                >
                  <option value="all">All statuses</option>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  className="leadInput"
                  value={localeFilter}
                  onChange={(e) => setLocaleFilter(e.target.value as 'all' | 'en' | 'ar')}
                >
                  <option value="all">All locales</option>
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            </div>

            <div className="serviceCard" style={{ marginTop: 18, padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 780 }}>
                  <thead>
                    <tr style={{ textAlign: 'left' }}>
                      {['Date', 'Patient', 'Contact', 'Condition', 'Preferred', 'Locale', 'Status'].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: '12px 14px',
                            fontSize: 12,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)',
                            borderBottom: '1px solid var(--border)'
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((it) => (
                      <tr key={it.id}>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                          {new Date(it.createdAt).toLocaleString()}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                          <div style={{ fontWeight: 700 }}>{it.name}</div>
                          <div style={{ color: 'var(--muted)', fontSize: 12 }}>#{it.id.slice(0, 8)}</div>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                          <div>
                            <a className="link" href={`tel:${it.phone}`}>
                              {it.phone}
                            </a>
                          </div>
                          {it.email ? <div style={{ color: 'var(--muted)', fontSize: 12 }}>{it.email}</div> : null}
                          <div style={{ marginTop: 6 }}>
                            <a className="link" href={toWhatsAppHref(it.phone, it.name)} target="_blank" rel="noreferrer">
                              WhatsApp
                            </a>
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                          {it.condition || 'general'}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                          {it.preferred}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                          {(it.locale || 'en').toUpperCase()}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                          <select
                            className="leadInput"
                            value={it.status}
                            onChange={(e) => updateStatus(it.id, e.target.value as AppointmentStatus)}
                            style={{ maxWidth: 180 }}
                            disabled={savingId === it.id}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {savingId === it.id ? <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Saving…</div> : null}
                        </td>
                      </tr>
                    ))}
                    {!filteredItems.length ? (
                      <tr>
                        <td colSpan={7} style={{ padding: 18, color: 'var(--muted)' }}>
                          {items.length ? 'No matching results for current filters.' : 'No appointment requests yet.'}
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
