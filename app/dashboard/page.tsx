import { isDashboardAuthed } from '@/lib/dashboardAuth'
import DashboardClient from '@/components/DashboardClient'

export const dynamic = 'force-dynamic'
export const metadata = {
  robots: { index: false, follow: false }
}

export default async function DashboardPage() {
  const authed = await isDashboardAuthed()
  return <DashboardClient authed={authed} />
}
