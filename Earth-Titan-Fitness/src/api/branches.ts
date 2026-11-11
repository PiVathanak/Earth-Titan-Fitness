import { api } from './http'
import type { GymBranch } from '@/types/api'

export type NewBranch = Omit<GymBranch, 'id'>

export const branchesApi = {
  list: () => api.get<GymBranch[]>('/branches'),
  get: (id: number) => api.get<GymBranch>(`/branches/${id}`),
  create: (branch: NewBranch) => api.post<GymBranch>('/branches', branch),
  update: (id: number, changes: Partial<NewBranch>) => api.patch<GymBranch>(`/branches/${id}`, changes),
  remove: (id: number) => api.delete(`/branches/${id}`),
}

