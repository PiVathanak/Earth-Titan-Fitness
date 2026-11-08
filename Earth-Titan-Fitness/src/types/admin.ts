export type MemberStatus = 'active' | 'expiring' | 'expired'

export interface AdminMember {
  id: number
  name: string
  email: string
  memberId: string
  registerDate: string
  expireDate: string
  status: MemberStatus
}

export interface NewMember {
  name: string
  email: string
  memberId: string
  registerDate: string
  expireDate: string
}

export interface AdminToast {
  id: number
  message: string
  tone: 'success' | 'info'
}
