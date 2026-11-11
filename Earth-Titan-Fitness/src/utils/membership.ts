import type { Membership } from '@/types/api'

export type DisplayStatus = 'active' | 'expiring' | 'expired'

/** Days before expiry when a membership is flagged as "expiring soon". */
export const EXPIRING_WINDOW_DAYS = 14

export function todayIso(): string {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

export function daysBetween(fromIso: string, toIso: string): number {
  const from = Date.parse(`${fromIso}T00:00:00`)
  const to = Date.parse(`${toIso}T00:00:00`)
  return Math.round((to - from) / 86_400_000)
}

/** Status shown in the UI, always derived from the expiration date. */
export function displayStatus(expirationDate: string, today = todayIso()): DisplayStatus {
  const daysLeft = daysBetween(today, expirationDate)
  if (daysLeft < 0) return 'expired'
  if (daysLeft <= EXPIRING_WINDOW_DAYS) return 'expiring'
  return 'active'
}

/** Status saved in the database (proposal: Active / Expired). */
export function dbStatus(expirationDate: string): Membership['status'] {
  return displayStatus(expirationDate) === 'expired' ? 'expired' : 'active'
}

export function formatDate(iso: string): string {
  if (!iso) return '—'
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

