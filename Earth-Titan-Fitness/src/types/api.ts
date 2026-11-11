// Entity types that mirror db.json (and the real API planned for weeks 6–7).
// One interface per resource; relations are expressed with ids (e.g. Membership.userId).

export type UserRole = 'customer' | 'employee' | 'admin'

export interface User {
  id: number
  name: string
  email: string
  /** Mock only — the real API (weeks 6–7) stores a password hash and never returns it. */
  password?: string
  role: UserRole
}

export type MembershipDbStatus = 'active' | 'expired'

export interface Membership {
  id: number
  userId: number
  membershipCode: string
  plan: string
  registrationDate: string // YYYY-MM-DD
  expirationDate: string // YYYY-MM-DD
  status: MembershipDbStatus
}

/** GET /memberships?_expand=user returns the linked user inline. */
export interface MembershipWithUser extends Membership {
  user?: User
}

export type HolidayType = 'regular' | 'adjusted' | 'closed'

export interface HolidayEntry {
  date: string // YYYY-MM-DD
  name: string
  type: HolidayType
  openingTime?: string
  closingTime?: string
}

export interface Amenity {
  icon: string
  label: string
}

export interface GymBranch {
  id: number
  name: string
  address: string
  image: string
  badge: string
  openingTime: string // HH:mm (Mon–Fri)
  closingTime: string
  weekendOpeningTime: string // HH:mm (Sat–Sun)
  weekendClosingTime: string
  is24Hours: boolean
  capacityPercent: number
  amenities: Amenity[]
  holidaySchedule: HolidayEntry[]
}

