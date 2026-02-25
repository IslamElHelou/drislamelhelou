"use client"

import { useEffect, useMemo, useState } from 'react'
import type { AppointmentRequest, AppointmentStatus } from '@/lib/appointments'

export default function DashboardClient({ authed }: { authed: boolean }) {
  const [isAuthed, setIsAuthed] = useState(authed)
  const [password, setPassword] = useState('')
  const [items, setItems] = useState<AppointmentRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    const res = await fetch('/api/appointment', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    if (!res.ok) setItems(prev)
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
            <div style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'center' }}>
              <button className="btnSecondary" onClick={load} disabled={loading}>
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
              <button className="btnTertiary" onClick={logout}>
                Sign out
              </button>
              {error ? <span className="leadError" style={{ marginLeft: 10 }}>{error}</span> : null}
            </div>

            <div className="serviceCard" style={{ marginTop: 18, padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 780 }}>
                  <thead>
                    <tr style={{ textAlign: 'left' }}>
                      {['Date', 'Name', 'Phone', 'Condition', 'Preferred', 'Status'].map((h) => (
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
                    {items.map((it) => (
                      <tr key={it.id}>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                          {new Date(it.createdAt).toLocaleString()}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>{it.name}</td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>{it.phone}</td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                          {it.condition || 'general'}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
                          {it.preferred}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                          <select
                            className="leadInput"
                            value={it.status}
                            onChange={(e) => updateStatus(it.id, e.target.value as AppointmentStatus)}
                            style={{ maxWidth: 180 }}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                    {!items.length ? (
                      <tr>
                        <td colSpan={6} style={{ padding: 18, color: 'var(--muted)' }}>
                          No appointment requests yet.
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
