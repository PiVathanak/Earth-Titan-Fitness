import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto.js';
import { UpdateBranchDto } from './dto/update-branch.dto.js';
import type { GymBranch, HolidayEntry } from './entities/branch.entity.js';

const INITIAL_BRANCHES: GymBranch[] = [
  {
    id: 1,
    name: 'Downtown Titanium Flagship',
    address: '108 Ironworks Blvd, Central Metro, NY 10001',
    image: 'branch1-1.png',
    badge: 'HQ Node 01',
    openingTime: '05:00',
    closingTime: '23:00',
    weekendOpeningTime: '06:00',
    weekendClosingTime: '21:00',
    is24Hours: false,
    capacityPercent: 68,
    amenities: [
      { icon: 'fitness_center', label: 'Powerlifting Pods' },
      { icon: 'sports_gymnastics', label: 'Olympic Platforms' },
      { icon: 'ac_unit', label: 'Cold Plunge & Sauna' },
      { icon: 'sprint', label: 'Turf Sprint Track' },
    ],
    holidaySchedule: [
      {
        date: '2026-11-26',
        name: 'Thanksgiving Day',
        type: 'adjusted',
        openingTime: '08:00',
        closingTime: '16:00',
      },
      { date: '2026-12-25', name: 'Christmas Day', type: 'closed' },
    ],
  },
  {
    id: 2,
    name: 'Northside Heavy Athletics',
    address: '454 Olympic Way, North District, NY 10024',
    image: 'branch1-2.png',
    badge: 'Branch 02',
    openingTime: '06:00',
    closingTime: '22:00',
    weekendOpeningTime: '06:00',
    weekendClosingTime: '22:00',
    is24Hours: false,
    capacityPercent: 42,
    amenities: [
      { icon: 'weight', label: 'Free Weights up to 150lbs' },
      { icon: 'precision_manufacturing', label: 'Hammer Strength Circuit' },
      { icon: 'chair', label: 'Recovery Lounge' },
    ],
    holidaySchedule: [
      {
        date: '2026-11-26',
        name: 'Thanksgiving Day',
        type: 'adjusted',
        openingTime: '08:00',
        closingTime: '18:00',
      },
      {
        date: '2026-12-25',
        name: 'Christmas Day',
        type: 'adjusted',
        openingTime: '10:00',
        closingTime: '16:00',
      },
    ],
  },
  {
    id: 3,
    name: 'West End Powerhouse',
    address: '780 Industrial Parkway, Westside, NY 10036',
    image: 'branch1-3.png',
    badge: 'Branch 03',
    openingTime: '05:00',
    closingTime: '23:00',
    weekendOpeningTime: '07:00',
    weekendClosingTime: '20:00',
    is24Hours: false,
    capacityPercent: 0,
    amenities: [
      { icon: 'sports_mma', label: 'Combat Sparring Ring' },
      { icon: 'hardware', label: 'Strongman Log & Stones' },
      { icon: 'shower', label: 'Hydrotherapy Suite' },
    ],
    holidaySchedule: [
      {
        date: '2026-11-11',
        name: 'Veterans Day Maintenance',
        type: 'closed',
      },
      { date: '2026-11-26', name: 'Thanksgiving Day', type: 'closed' },
      { date: '2026-12-25', name: 'Christmas Day', type: 'closed' },
    ],
  },
  {
    id: 4,
    name: 'Metro Core District',
    address: '89 Velocity Ave, Financial Quarter, NY 10005',
    image: 'branch1-4.png',
    badge: 'Autonomous 04',
    openingTime: '00:00',
    closingTime: '23:59',
    weekendOpeningTime: '00:00',
    weekendClosingTime: '23:59',
    is24Hours: true,
    capacityPercent: 28,
    amenities: [
      { icon: 'qr_code_scanner', label: 'Keyless Access' },
      { icon: 'security', label: '24/7 CCTV & Guard' },
      { icon: 'bolt', label: 'Hi-Velocity Functional Rig' },
    ],
    holidaySchedule: [
      { date: '2026-12-25', name: 'Christmas Day', type: 'regular' },
    ],
  },
];

@Injectable()
export class BranchesService {
  private branches: GymBranch[] = structuredClone(INITIAL_BRANCHES);
  private nextId = INITIAL_BRANCHES.length + 1;

  findAll(query?: string): GymBranch[] {
    const q = query?.trim().toLowerCase();
    if (!q) {
      return structuredClone(this.branches);
    }
    return structuredClone(
      this.branches.filter(
        (branch) =>
          branch.name.toLowerCase().includes(q) ||
          branch.address.toLowerCase().includes(q),
      ),
    );
  }

  findOne(id: number): GymBranch {
    const branch = this.branches.find((item) => item.id === id);
    if (!branch) {
      throw new NotFoundException(`Branch #${id} was not found.`);
    }
    return structuredClone(branch);
  }

  create(dto: CreateBranchDto): GymBranch {
    const name = dto.name.trim();
    this.ensureUniqueName(name);
    this.validateOperatingHours(
      dto.is24Hours,
      dto.openingTime,
      dto.closingTime,
      dto.weekendOpeningTime,
      dto.weekendClosingTime,
      dto.holidaySchedule ?? [],
    );

    const created: GymBranch = {
      id: this.nextId++,
      name,
      address: dto.address.trim(),
      image: dto.image?.trim() || 'branch1-1.png',
      badge:
        dto.badge?.trim() ||
        `Branch ${String(this.nextId - 1).padStart(2, '0')}`,
      openingTime: dto.openingTime,
      closingTime: dto.closingTime,
      weekendOpeningTime: dto.weekendOpeningTime,
      weekendClosingTime: dto.weekendClosingTime,
      is24Hours: dto.is24Hours,
      capacityPercent: dto.capacityPercent,
      amenities: structuredClone(dto.amenities ?? []),
      holidaySchedule: structuredClone(dto.holidaySchedule ?? []),
    };

    this.branches.push(created);
    return structuredClone(created);
  }

  update(id: number, dto: UpdateBranchDto): GymBranch {
    const index = this.branches.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Branch #${id} was not found.`);
    }

    const existing = this.branches[index];
    const nextName = dto.name !== undefined ? dto.name.trim() : existing.name;
    this.ensureUniqueName(nextName, id);

    const merged: GymBranch = {
      ...existing,
      ...(dto.name !== undefined ? { name: nextName } : {}),
      ...(dto.address !== undefined ? { address: dto.address.trim() } : {}),
      ...(dto.image !== undefined ? { image: dto.image.trim() } : {}),
      ...(dto.badge !== undefined ? { badge: dto.badge.trim() } : {}),
      ...(dto.openingTime !== undefined
        ? { openingTime: dto.openingTime }
        : {}),
      ...(dto.closingTime !== undefined
        ? { closingTime: dto.closingTime }
        : {}),
      ...(dto.weekendOpeningTime !== undefined
        ? { weekendOpeningTime: dto.weekendOpeningTime }
        : {}),
      ...(dto.weekendClosingTime !== undefined
        ? { weekendClosingTime: dto.weekendClosingTime }
        : {}),
      ...(dto.is24Hours !== undefined ? { is24Hours: dto.is24Hours } : {}),
      ...(dto.capacityPercent !== undefined
        ? { capacityPercent: dto.capacityPercent }
        : {}),
      ...(dto.amenities !== undefined
        ? { amenities: structuredClone(dto.amenities) }
        : {}),
      ...(dto.holidaySchedule !== undefined
        ? { holidaySchedule: structuredClone(dto.holidaySchedule) }
        : {}),
    };

    this.validateOperatingHours(
      merged.is24Hours,
      merged.openingTime,
      merged.closingTime,
      merged.weekendOpeningTime,
      merged.weekendClosingTime,
      merged.holidaySchedule,
    );

    this.branches[index] = merged;
    return structuredClone(merged);
  }

  remove(id: number): void {
    const index = this.branches.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Branch #${id} was not found.`);
    }
    this.branches.splice(index, 1);
  }

  private ensureUniqueName(name: string, ignoreId?: number): void {
    const normalized = name.toLowerCase();
    const duplicate = this.branches.some(
      (branch) =>
        branch.id !== ignoreId && branch.name.toLowerCase() === normalized,
    );
    if (duplicate) {
      throw new ConflictException(`A branch named "${name}" already exists.`);
    }
  }

  private validateOperatingHours(
    is24Hours: boolean,
    openingTime: string,
    closingTime: string,
    weekendOpeningTime: string,
    weekendClosingTime: string,
    holidaySchedule: HolidayEntry[],
  ): void {
    if (!is24Hours) {
      if (closingTime <= openingTime) {
        throw new BadRequestException(
          'closingTime must be after openingTime unless is24Hours is true.',
        );
      }
      if (weekendClosingTime <= weekendOpeningTime) {
        throw new BadRequestException(
          'weekendClosingTime must be after weekendOpeningTime unless is24Hours is true.',
        );
      }
    }

    for (const holiday of holidaySchedule) {
      if (holiday.type === 'adjusted') {
        if (!holiday.openingTime || !holiday.closingTime) {
          throw new BadRequestException(
            `Adjusted holiday "${holiday.name}" requires both openingTime and closingTime.`,
          );
        }
        if (holiday.closingTime <= holiday.openingTime) {
          throw new BadRequestException(
            `Adjusted holiday "${holiday.name}" must have closingTime after openingTime.`,
          );
        }
      }
    }
  }
}
