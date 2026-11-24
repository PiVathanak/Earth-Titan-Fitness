import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { branchesApi, type NewBranch } from '@/api/branches'
import { errorMessage } from '@/api/http'
import type { GymBranch } from '@/types/api'

export type LoadStatus = 'idle' | 'loading' | 'error' | 'success'

export const useBranchesStore = defineStore('branches', () => {
  // List page (BranchesPage & Admin BranchOverview)
  const items = ref<GymBranch[]>([])
  const status = ref<LoadStatus>('idle')
  const error = ref<string | null>(null)
  const saving = ref(false)

  // Detail page (BranchDetailPage)
  const current = ref<GymBranch | null>(null)
  const currentStatus = ref<LoadStatus>('idle')
  const currentError = ref<string | null>(null)

  const isEmpty = computed(() => status.value === 'success' && items.value.length === 0)

  function isNameTaken(name: string, exceptId?: number): boolean {
    const normalized = name.trim().toLowerCase()
    return items.value.some((b) => b.id !== exceptId && b.name.toLowerCase() === normalized)
  }

  async function fetchAll() {
    status.value = 'loading'
    error.value = null
    try {
      items.value = await branchesApi.list()
      status.value = 'success'
    } catch (e) {
      error.value = errorMessage(e)
      status.value = 'error'
    }
  }

  async function fetchOne(id: number) {
    currentStatus.value = 'loading'
    currentError.value = null
    current.value = null
    try {
      current.value = await branchesApi.get(id)
      currentStatus.value = 'success'
    } catch (e) {
      currentError.value = errorMessage(e)
      currentStatus.value = 'error'
    }
  }

  async function create(payload: NewBranch): Promise<GymBranch> {
    saving.value = true
    try {
      const created = await branchesApi.create(payload)
      items.value.push(created)
      return created
    } finally {
      saving.value = false
    }
  }

  async function update(id: number, changes: Partial<NewBranch>): Promise<GymBranch> {
    saving.value = true
    try {
      const updated = await branchesApi.update(id, changes)
      const index = items.value.findIndex((b) => b.id === id)
      if (index >= 0) items.value[index] = updated
      if (current.value?.id === id) current.value = updated
      return updated
    } finally {
      saving.value = false
    }
  }

  async function remove(id: number): Promise<void> {
    await branchesApi.remove(id)
    items.value = items.value.filter((b) => b.id !== id)
    if (current.value?.id === id) current.value = null
  }

  return {
    items,
    status,
    error,
    saving,
    isEmpty,
    current,
    currentStatus,
    currentError,
    isNameTaken,
    fetchAll,
    fetchOne,
    create,
    update,
    remove,
  }
})
