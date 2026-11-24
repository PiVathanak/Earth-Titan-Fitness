import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import type { HolidayType } from '../entities/branch.entity.js';

export const HH_MM_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
export const ISO_DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export class AmenityDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 40)
  icon: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  label: string;
}

export class HolidayEntryDto {
  @IsString()
  @Matches(ISO_DATE_REGEX, {
    message: 'date must be a valid YYYY-MM-DD date string',
  })
  date: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 60)
  name: string;

  @IsIn(['regular', 'adjusted', 'closed'])
  type: HolidayType;

  @ValidateIf(
    (entry: HolidayEntryDto) =>
      entry.type === 'adjusted' || entry.openingTime !== undefined,
  )
  @IsString()
  @Matches(HH_MM_REGEX, {
    message: 'openingTime must be in 24-hour HH:mm format (00:00–23:59)',
  })
  openingTime?: string;

  @ValidateIf(
    (entry: HolidayEntryDto) =>
      entry.type === 'adjusted' || entry.closingTime !== undefined,
  )
  @IsString()
  @Matches(HH_MM_REGEX, {
    message: 'closingTime must be in 24-hour HH:mm format (00:00–23:59)',
  })
  closingTime?: string;
}

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 160)
  address: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  badge?: string;

  @IsString()
  @Matches(HH_MM_REGEX, {
    message: 'openingTime must be in 24-hour HH:mm format (00:00–23:59)',
  })
  openingTime: string;

  @IsString()
  @Matches(HH_MM_REGEX, {
    message: 'closingTime must be in 24-hour HH:mm format (00:00–23:59)',
  })
  closingTime: string;

  @IsString()
  @Matches(HH_MM_REGEX, {
    message: 'weekendOpeningTime must be in 24-hour HH:mm format (00:00–23:59)',
  })
  weekendOpeningTime: string;

  @IsString()
  @Matches(HH_MM_REGEX, {
    message: 'weekendClosingTime must be in 24-hour HH:mm format (00:00–23:59)',
  })
  weekendClosingTime: string;

  @IsBoolean()
  is24Hours: boolean;

  @IsInt()
  @Min(0)
  @Max(100)
  capacityPercent: number;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(12)
  @ValidateNested({ each: true })
  @Type(() => AmenityDto)
  amenities?: AmenityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HolidayEntryDto)
  holidaySchedule?: HolidayEntryDto[];
}
