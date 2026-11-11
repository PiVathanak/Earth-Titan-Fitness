import type { GymBranch, HolidayEntry } from '@/types/api'
import { formatDate, todayIso } from './membership'
import branch1 from '@/assets/branch1-1.png'
import branch2 from '@/assets/branch1-2.png'
import branch3 from '@/assets/branch1-3.png'
import branch4 from '@/assets/branch1-4.png'
import branch5 from '@/assets/branch1-5.png'
import branch6 from '@/assets/branch1-6.png'

// db.json stores only the file name; the bundler needs real imports.
const images: Record<string, string> = {
  'branch1-1.png': branch1,
  'branch1-2.png': branch2,
  'branch1-3.png': branch3,
  'branch1-4.png': branch4,
  'branch1-5.png': branch5,
  'branch1-6.png': branch6,
}

export interface BranchCard {
  id: number
  name: string
  address: string
  image: string
  imageClass: string
  isOpen: boolean
  statusLabel: string
  statusClass: string
  dotClass: string
  badge: string
  badgeClass: string
  regular: [string, string]
  todayHours: string
  holidayLabel: string
  holidayTitle: string
  holidayTitleClass: string
  holidaySub: string
  upcomingHolidays: HolidayEntry[]
  amenities: GymBranch['amenities']
  loadIcon: string
  loadText: string
  loadTextClass: string
  loadBarClass: string
  loadWidth: string
}

function toMinutes(hhmm: string): number {
  const [h = 0, m = 0] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function hoursFor(branch: GymBranch, date: Date, holiday?: HolidayEntry) {
  if (holiday?.type === 'closed') return null
  if (holiday?.type === 'adjusted' && holiday.openingTime && holiday.closingTime) {
    return { open: holiday.openingTime, close: holiday.closingTime }
  }
  const weekend = date.getDay() === 0 || date.getDay() === 6
  return weekend
    ? { open: branch.weekendOpeningTime, close: branch.weekendClosingTime }
    : { open: branch.openingTime, close: branch.closingTime }
}

function holidayTitle(h: HolidayEntry): string {
  if (h.type === 'closed') return 'Closed'
  if (h.type === 'adjusted') return `Adjusted ${h.openingTime} - ${h.closingTime}`
  return 'Regular Operation'
}

/** Turns a raw branch from the API into everything the cards need (US-01). */
export function toBranchCard(branch: GymBranch, now = new Date()): BranchCard {
  const today = todayIso()
  const todayHoliday = branch.holidaySchedule.find((h) => h.date === today)
  const hours = hoursFor(branch, now, todayHoliday)
  const minutes = now.getHours() * 60 + now.getMinutes()

  let isOpen = false
  let statusLabel: string
  if (branch.is24Hours && todayHoliday?.type !== 'closed') {
    isOpen = true
    statusLabel = 'OPEN 24 HOURS'
  } else if (!hours) {
    statusLabel = `CLOSED TODAY (${todayHoliday?.name ?? 'Holiday'})`
  } else if (minutes >= toMinutes(hours.open) && minutes < toMinutes(hours.close)) {
    isOpen = true
    statusLabel = `OPEN NOW (Closes at ${hours.close})`
  } else {
    statusLabel =
      minutes < toMinutes(hours.open) ? `CLOSED (Opens at ${hours.open})` : 'CLOSED (Opens tomorrow)'
  }

  const upcoming = branch.holidaySchedule
    .filter((h) => h.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
  const next = upcoming[0]

  return {
    id: branch.id,
    name: branch.name,
    address: branch.address,
    image: images[branch.image] ?? '',
    imageClass: isOpen ? '' : 'opacity-70',
    isOpen,
    statusLabel,
    statusClass: isOpen ? 'bg-emerald-950/90 text-emerald-400' : 'bg-red-950/90 text-red-400',
    dotClass: isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-red-500',
    badge: branch.badge,
    badgeClass: branch.is24Hours ? 'text-primary-container' : 'text-secondary',
    regular: branch.is24Hours
      ? ['24/7 Continuous Access', 'Keyless RFID & App Pass']
      : [
          `Mon-Fri: ${branch.openingTime} - ${branch.closingTime}`,
          `Sat-Sun: ${branch.weekendOpeningTime} - ${branch.weekendClosingTime}`,
        ],
    todayHours: branch.is24Hours ? '24 hours' : hours ? `${hours.open} - ${hours.close}` : 'Closed',
    holidayLabel: next?.type === 'closed' ? 'Holiday Notice' : 'Holiday Schedule Status',
    holidayTitle: next ? holidayTitle(next) : 'Regular Operation',
    holidayTitleClass: !next
      ? 'text-on-surface'
      : next.type === 'closed'
        ? 'text-error'
        : next.type === 'adjusted'
          ? 'text-amber-400'
          : 'text-emerald-400',
    holidaySub: next ? `${next.name} · ${formatDate(next.date)}` : 'No upcoming holidays',
    upcomingHolidays: upcoming,
    amenities: branch.amenities,
    loadIcon: isOpen ? 'speed' : 'lock_clock',
    loadText: isOpen ? `${branch.capacityPercent}% Capacity` : 'Facility Offline',
    loadTextClass: isOpen ? 'text-on-surface' : 'text-secondary',
    loadBarClass: isOpen ? 'bg-emerald-500' : 'bg-secondary-container',
    loadWidth: isOpen ? `${branch.capacityPercent}%` : '0%',
  }
}

export function holidayTypeLabel(h: HolidayEntry): string {
  return holidayTitle(h)
}

