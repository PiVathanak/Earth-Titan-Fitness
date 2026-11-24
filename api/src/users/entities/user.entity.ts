export const USER_ROLES = ['customer', 'employee', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type PublicUser = Omit<User, 'password'>;
