export type MembershipStatus = 'active' | 'expiring' | 'expired'

export interface MemberProfile {
  name: string
  title: string
  avatarUrl: string
  memberId: string
  homeBranch: string
  memberSince: string
  validUntil: string
  status: MembershipStatus
}

export interface MembershipCard {
  cardTitle: string
  cardSubtitle: string
  cardholderName: string
  titanId: string
  homeBranch: string
  memberSince: string
  validUntil: string
  branchPrivilege: string
  status: MembershipStatus
}

export interface CycleChronometer {
  daysRemaining: number
  daysEnrolled: number
  totalDays: number
  progressPercent: number
}

export interface BranchAccess {
  name: string
  type: 'primary' | 'regional'
  typeLabel: string
  address: string
  capacityPercent: number
  isActive: boolean
}

export interface StatusIndicator {
  color: 'emerald' | 'amber' | 'red'
  label: string
  description: string
  dotClass: string
  textClass: string
}

