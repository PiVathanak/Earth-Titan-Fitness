export interface HeroStat {
  value: string
  label: string
  sub: string
}

export interface AboutPillar {
  num: string
  tag: string
  title: string
  text: string
  metricLabel: string
  metricValue: string
  fill: string
}

export interface GalleryItem {
  src: string
  alt: string
  caption: string
  icon: string
}

export interface TelemetryStat {
  label: string
  value: string
  unit: string
  text: string
}

export interface MembershipOption {
  tier: string
  icon: string
  name: string
  duration: string
  price: string
  billingNote: string
  description: string
  access: string
  commitment: string
  perks: string
  featured?: boolean
}

export interface FacilityStandard {
  icon: string
  title: string
  text: string
  badge: string
}

export interface BranchPhone {
  name: string
  phone: string
}

export interface LegalLink {
  label: string
  path: string
}

