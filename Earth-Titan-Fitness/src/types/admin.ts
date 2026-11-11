export type MemberStatus = 'active' | 'expiring' | 'expired'

/** One row in the admin table = one membership joined with its user. */
export interface AdminMember {
  id: number // membership id
  userId: number
  name: string
  email: string
  memberId: string // membership code, e.g. ETF-89241
  plan: string
  registerDate: string // YYYY-MM-DD
  expireDate: string // YYYY-MM-DD
  status: MemberStatus
}

export interface NewMember {
  name: string
  email: string
  memberId: string
  plan: string
  registerDate: string
  expireDate: string
}

export interface AdminToast {
  id: number
  message: string
  tone: 'success' | 'info' | 'error'
}
