import { api } from './http'
import type { Membership, MembershipWithUser } from '@/types/api'

export type NewMembership = Omit<Membership, 'id'>

export const membershipsApi = {
  /** All memberships with their linked user (json-server `_expand`). */
  listWithUsers: () => api.get<MembershipWithUser[]>('/memberships', { _expand: 'user' }),
  get: (id: number) => api.get<MembershipWithUser>(`/memberships/${id}`, { _expand: 'user' }),
  /** Lookup by the code printed on the card, e.g. ETF-89241 (US-03). */
  findByCode: (membershipCode: string) =>
    api.get<MembershipWithUser[]>('/memberships', { membershipCode, _expand: 'user' }),
  /** A user has zero or one membership. */
  findByUser: (userId: number) => api.get<Membership[]>('/memberships', { userId }),
  create: (membership: NewMembership) => api.post<Membership>('/memberships', membership),
  update: (id: number, changes: Partial<NewMembership>) =>
    api.patch<Membership>(`/memberships/${id}`, changes),
  remove: (id: number) => api.delete(`/memberships/${id}`),
}

