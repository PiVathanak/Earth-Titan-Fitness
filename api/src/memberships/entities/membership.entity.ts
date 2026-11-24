import type { PublicUser } from '../../users/entities/user.entity.js';

export const MEMBERSHIP_PLANS = [
  'Titan Pro Black',
  'Titan Standard Iron',
  'Titan Month-to-Month',
] as const;
export type MembershipPlan = (typeof MEMBERSHIP_PLANS)[number];

export const MEMBERSHIP_STATUSES = ['active', 'expired'] as const;
export type MembershipStatus = (typeof MEMBERSHIP_STATUSES)[number];

export interface Membership {
  id: number;
  userId: number;
  membershipCode: string; // e.g. ETF-89241
  plan: MembershipPlan;
  registrationDate: string; // YYYY-MM-DD
  expirationDate: string; // YYYY-MM-DD
  status: MembershipStatus;
}

export interface MembershipWithUser extends Membership {
  user?: PublicUser;
}
