import { IsIn, IsInt, IsString, Matches, Min } from 'class-validator';
import { ISO_DATE_REGEX } from '../../branches/dto/create-branch.dto.js';
import {
  MEMBERSHIP_PLANS,
  MEMBERSHIP_STATUSES,
  type MembershipPlan,
  type MembershipStatus,
} from '../entities/membership.entity.js';

export const MEMBERSHIP_CODE_REGEX = /^ETF-\d{5}$/;

export class CreateMembershipDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsString()
  @Matches(MEMBERSHIP_CODE_REGEX, {
    message: 'membershipCode must match ETF-12345 (ETF- followed by 5 digits)',
  })
  membershipCode: string;

  @IsIn(MEMBERSHIP_PLANS)
  plan: MembershipPlan;

  @IsString()
  @Matches(ISO_DATE_REGEX, {
    message: 'registrationDate must be a valid YYYY-MM-DD date string',
  })
  registrationDate: string;

  @IsString()
  @Matches(ISO_DATE_REGEX, {
    message: 'expirationDate must be a valid YYYY-MM-DD date string',
  })
  expirationDate: string;

  @IsIn(MEMBERSHIP_STATUSES)
  status: MembershipStatus;
}
