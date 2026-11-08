export interface BranchFilter {
  key: string
  label: string
}

export interface BranchAmenity {
  icon: string
  label: string
}

export interface BranchDetail {
  name: string
  address: string
  image: string
  imageClass: string
  tags: string[]
  statusLabel: string
  statusClass: string
  dotClass: string
  badge: string
  badgeClass: string
  regular: string[]
  holidayLabel: string
  holidayTitle: string
  holidayTitleClass: string
  holidaySub: string
  amenities: BranchAmenity[]
  loadIcon: string
  loadText: string
  loadTextClass: string
  loadBarClass: string
  loadWidth: string
}

