import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { CreateMembershipDto } from './dto/create-membership.dto.js';
import { UpdateMembershipDto } from './dto/update-membership.dto.js';
import type {
  Membership,
  MembershipStatus,
  MembershipWithUser,
} from './entities/membership.entity.js';

const INITIAL_MEMBERSHIPS: Membership[] = [
  {
    id: 1,
    userId: 1,
    membershipCode: 'ETF-89241',
    plan: 'Titan Pro Black',
    registrationDate: '2026-01-15',
    expirationDate: '2027-01-15',
    status: 'active',
  },
  {
    id: 2,
    userId: 2,
    membershipCode: 'ETF-91044',
    plan: 'Titan Standard Iron',
    registrationDate: '2025-11-15',
    expirationDate: '2026-11-15',
    status: 'active',
  },
  {
    id: 3,
    userId: 3,
    membershipCode: 'ETF-73412',
    plan: 'Titan Month-to-Month',
    registrationDate: '2024-10-01',
    expirationDate: '2025-10-01',
    status: 'expired',
  },
  {
    id: 4,
    userId: 4,
    membershipCode: 'ETF-80192',
    plan: 'Titan Pro Black',
    registrationDate: '2026-03-14',
    expirationDate: '2027-03-14',
    status: 'active',
  },
  {
    id: 5,
    userId: 5,
    membershipCode: 'ETF-55012',
    plan: 'Titan Standard Iron',
    registrationDate: '2025-11-20',
    expirationDate: '2026-11-20',
    status: 'active',
  },
  {
    id: 6,
    userId: 6,
    membershipCode: 'ETF-10499',
    plan: 'Titan Month-to-Month',
    registrationDate: '2025-04-01',
    expirationDate: '2026-04-01',
    status: 'expired',
  },
];

export interface MembershipQuery {
  expand?: string;
  userId?: string;
  membershipCode?: string;
  status?: MembershipStatus;
  page?: string;
  limit?: string;
}

function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

@Injectable()
export class MembershipsService {
  private memberships: Membership[] = structuredClone(INITIAL_MEMBERSHIPS);
  private nextId = INITIAL_MEMBERSHIPS.length + 1;

  constructor(private readonly usersService: UsersService) {}

  findAll(query: MembershipQuery = {}): MembershipWithUser[] {
    let result = this.memberships;

    if (query.userId !== undefined && query.userId !== '') {
      const parsedUserId = Number(query.userId);
      if (!Number.isInteger(parsedUserId) || parsedUserId < 1) {
        throw new BadRequestException(
          'userId query must be a positive integer.',
        );
      }
      result = result.filter((item) => item.userId === parsedUserId);
    }

    if (
      query.membershipCode !== undefined &&
      query.membershipCode.trim() !== ''
    ) {
      const code = query.membershipCode.trim().toUpperCase();
      result = result.filter((item) => item.membershipCode === code);
    }

    if (query.status) {
      result = result.filter((item) => item.status === query.status);
    }

    if (query.page !== undefined || query.limit !== undefined) {
      const page = Math.max(1, Number(query.page ?? 1));
      const limit = Math.max(1, Number(query.limit ?? 10));
      if (!Number.isInteger(page) || !Number.isInteger(limit)) {
        throw new BadRequestException(
          '_page and _limit must be positive integers.',
        );
      }
      const start = (page - 1) * limit;
      result = result.slice(start, start + limit);
    }

    const expandUser = query.expand === 'user';
    return result.map((membership) => this.toOutput(membership, expandUser));
  }

  findOne(id: number, expand?: string): MembershipWithUser {
    const membership = this.memberships.find((item) => item.id === id);
    if (!membership) {
      throw new NotFoundException(`Membership #${id} was not found.`);
    }
    return this.toOutput(membership, expand === 'user');
  }

  create(dto: CreateMembershipDto): Membership {
    // Verify linked user exists (404 if missing)
    this.usersService.findOne(dto.userId);

    const code = dto.membershipCode.trim().toUpperCase();
    this.ensureUniqueUser(dto.userId);
    this.ensureUniqueCode(code);
    this.validateDates(dto.registrationDate, dto.expirationDate, true);

    const created: Membership = {
      id: this.nextId++,
      userId: dto.userId,
      membershipCode: code,
      plan: dto.plan,
      registrationDate: dto.registrationDate,
      expirationDate: dto.expirationDate,
      status: dto.status,
    };

    this.memberships.push(created);
    return { ...created };
  }

  update(id: number, dto: UpdateMembershipDto): Membership {
    const index = this.memberships.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Membership #${id} was not found.`);
    }

    const existing = this.memberships[index];
    const nextUserId = dto.userId ?? existing.userId;
    const nextCode =
      dto.membershipCode !== undefined
        ? dto.membershipCode.trim().toUpperCase()
        : existing.membershipCode;

    if (dto.userId !== undefined) {
      this.usersService.findOne(dto.userId);
    }
    this.ensureUniqueUser(nextUserId, id);
    this.ensureUniqueCode(nextCode, id);

    const nextRegistrationDate =
      dto.registrationDate ?? existing.registrationDate;
    const nextExpirationDate = dto.expirationDate ?? existing.expirationDate;
    this.validateDates(
      nextRegistrationDate,
      nextExpirationDate,
      dto.registrationDate !== undefined,
    );

    const updated: Membership = {
      ...existing,
      userId: nextUserId,
      membershipCode: nextCode,
      ...(dto.plan !== undefined ? { plan: dto.plan } : {}),
      registrationDate: nextRegistrationDate,
      expirationDate: nextExpirationDate,
      ...(dto.status !== undefined ? { status: dto.status } : {}),
    };

    this.memberships[index] = updated;
    return { ...updated };
  }

  remove(id: number): void {
    const index = this.memberships.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Membership #${id} was not found.`);
    }
    this.memberships.splice(index, 1);
  }

  private toOutput(
    membership: Membership,
    expandUser: boolean,
  ): MembershipWithUser {
    if (!expandUser) {
      return { ...membership };
    }
    const user = this.usersService.findByIdOrNull(membership.userId);
    return {
      ...membership,
      ...(user ? { user } : {}),
    };
  }

  private ensureUniqueUser(userId: number, ignoreId?: number): void {
    const duplicate = this.memberships.some(
      (item) => item.id !== ignoreId && item.userId === userId,
    );
    if (duplicate) {
      throw new ConflictException(
        `User #${userId} already has a membership record.`,
      );
    }
  }

  private ensureUniqueCode(code: string, ignoreId?: number): void {
    const duplicate = this.memberships.some(
      (item) => item.id !== ignoreId && item.membershipCode === code,
    );
    if (duplicate) {
      throw new ConflictException(
        `Membership code "${code}" is already assigned.`,
      );
    }
  }

  private validateDates(
    registrationDate: string,
    expirationDate: string,
    checkNotFutureRegistration: boolean,
  ): void {
    if (checkNotFutureRegistration && registrationDate > todayIso()) {
      throw new BadRequestException(
        'registrationDate cannot be in the future.',
      );
    }
    if (expirationDate <= registrationDate) {
      throw new BadRequestException(
        'expirationDate must be strictly after registrationDate.',
      );
    }
  }
}
