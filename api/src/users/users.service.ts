import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import type { PublicUser, User, UserRole } from './entities/user.entity.js';

const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: 'Marcus Vance',
    email: 'm.vance@titanathletics.io',
    password: 'titan123',
    role: 'customer',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    email: 'e.rostova@heavyiron.org',
    password: 'titan123',
    role: 'customer',
  },
  {
    id: 3,
    name: 'Damian Kross',
    email: 'd.kross@titanathletics.io',
    password: 'titan123',
    role: 'customer',
  },
  {
    id: 4,
    name: 'Sarah Chen',
    email: 's.chen@ironvault.org',
    password: 'titan123',
    role: 'customer',
  },
  {
    id: 5,
    name: 'Darius Thorne',
    email: 'd.thorne@ironstrength.com',
    password: 'titan123',
    role: 'customer',
  },
  {
    id: 6,
    name: 'Cassandra Cole',
    email: 'c.cole@apexfitness.org',
    password: 'titan123',
    role: 'customer',
  },
  {
    id: 7,
    name: 'Jordan Reyes',
    email: 'staff@titanathletics.io',
    password: 'staff123',
    role: 'employee',
  },
  {
    id: 8,
    name: 'Avery Stone',
    email: 'command@titanathletics.io',
    password: 'admin123',
    role: 'admin',
  },
];

function stripPassword(user: User): PublicUser {
  const { password: _password, ...safeUser } = user;
  void _password;
  return { ...safeUser };
}

@Injectable()
export class UsersService {
  private users: User[] = structuredClone(INITIAL_USERS);
  private nextId = INITIAL_USERS.length + 1;

  findAll(filters?: {
    role?: UserRole;
    email?: string;
  }): Array<PublicUser | User> {
    let result = this.users;

    if (filters?.role) {
      result = result.filter((user) => user.role === filters.role);
    }

    if (filters?.email !== undefined && filters.email.trim() !== '') {
      const normalizedEmail = filters.email.trim().toLowerCase();
      // Pre-Week-8 compatibility: frontend mock login queries GET /users?email=...
      // before JWT POST /auth/login is introduced in Week 8.
      return structuredClone(
        result.filter((user) => user.email.toLowerCase() === normalizedEmail),
      );
    }

    return result.map(stripPassword);
  }

  findOne(id: number): PublicUser {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} was not found.`);
    }
    return stripPassword(user);
  }

  findByIdOrNull(id: number): PublicUser | null {
    const user = this.users.find((item) => item.id === id);
    return user ? stripPassword(user) : null;
  }

  create(dto: CreateUserDto): PublicUser {
    const email = dto.email.trim().toLowerCase();
    this.ensureUniqueEmail(email);

    const created: User = {
      id: this.nextId++,
      name: dto.name.trim(),
      email,
      password: dto.password,
      role: dto.role,
    };

    this.users.push(created);
    return stripPassword(created);
  }

  update(id: number, dto: UpdateUserDto): PublicUser {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} was not found.`);
    }

    const existing = this.users[index];
    const nextEmail =
      dto.email !== undefined ? dto.email.trim().toLowerCase() : existing.email;
    this.ensureUniqueEmail(nextEmail, id);

    const updated: User = {
      ...existing,
      ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
      email: nextEmail,
      ...(dto.password !== undefined ? { password: dto.password } : {}),
      ...(dto.role !== undefined ? { role: dto.role } : {}),
    };

    this.users[index] = updated;
    return stripPassword(updated);
  }

  remove(id: number): void {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} was not found.`);
    }
    this.users.splice(index, 1);
  }

  private ensureUniqueEmail(email: string, ignoreId?: number): void {
    const duplicate = this.users.some(
      (user) => user.id !== ignoreId && user.email.toLowerCase() === email,
    );
    if (duplicate) {
      throw new ConflictException(
        `A user with email "${email}" already exists.`,
      );
    }
  }
}
