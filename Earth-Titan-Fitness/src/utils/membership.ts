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

/** Duration in months for each membership plan. */
export const PLAN_MONTHS: Record<string, number> = {
  'Titan Month-to-Month': 1,
  'Titan Standard Iron': 6,
  'Titan Pro Black': 12,
}

/** Adds calendar months to a YYYY-MM-DD date, clamping month-end days cleanly. */
export function addMonthsIso(isoDate: string, months: number): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate)
  if (!match) return ''
  const year = Number(match[1])
  const monthIndex = Number(match[2]) - 1
  const day = Number(match[3])

  const totalMonths = year * 12 + monthIndex + months
  const targetYear = Math.floor(totalMonths / 12)
  const targetMonthIndex = ((totalMonths % 12) + 12) % 12
  const daysInTargetMonth = new Date(Date.UTC(targetYear, targetMonthIndex + 1, 0)).getUTCDate()
  const clampedDay = Math.min(day, daysInTargetMonth)

  const yyyy = String(targetYear).padStart(4, '0')
  const mm = String(targetMonthIndex + 1).padStart(2, '0')
  const dd = String(clampedDay).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export function formatDate(iso: string): string {
  if (!iso) return '—'
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

