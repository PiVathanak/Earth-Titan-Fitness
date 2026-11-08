export interface HeroMetricSuffix {
  type: 'text' | 'icon'
  text: string
  class: string
}

export interface HeroMetric {
  label: string
  value: string
  suffix: HeroMetricSuffix
  sub: string
}

export interface Pillar {
  num: string
  icon: string
  title: string
  text: string
  tag: string
}

export interface Branch {
  name: string
  address: string
  src: string
  alt: string
  status: 'open' | 'modified' | 'closed'
  statusLabel: string
  statusClass: string
  dotClass: string
  tier: string
  hoursLabel: string
  hours: string
  hoursClass: string
  loadText: string
  loadTextClass: string
  loadBarClass: string
  loadWidth: string
  tags: string[]
}

export interface LoadBreakdown {
  label: string
  pct: string
  barClass: string
}

export interface Benefit {
  icon: string
  title: string
  text: string
  tag: string
}

