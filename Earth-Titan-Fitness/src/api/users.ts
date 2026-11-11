import { api } from './http'
import type { User, UserRole } from '@/types/api'

export type NewUser = Omit<User, 'id'>

export const usersApi = {
  list: (role?: UserRole) => api.get<User[]>('/users', { role }),
  get: (id: number) => api.get<User>(`/users/${id}`),
  findByEmail: (email: string) => api.get<User[]>('/users', { email }),
  create: (user: NewUser) => api.post<User>('/users', user),
  update: (id: number, changes: Partial<NewUser>) => api.patch<User>(`/users/${id}`, changes),
  remove: (id: number) => api.delete(`/users/${id}`),
}

