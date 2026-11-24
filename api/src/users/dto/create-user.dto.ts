import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { USER_ROLES, type UserRole } from '../entities/user.entity.js';

export const PERSON_NAME_REGEX = /^[A-Za-z][A-Za-z .'-]*$/;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 60)
  @Matches(PERSON_NAME_REGEX, {
    message:
      'name may only contain letters, spaces, dots, apostrophes, or hyphens',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 72)
  password: string;

  @IsIn(USER_ROLES)
  role: UserRole;
}
