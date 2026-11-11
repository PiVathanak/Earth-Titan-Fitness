import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { branchesApi } from '@/api/branches'
import { errorMessage } from '@/api/http'
import type { GymBranch } from '@/types/api'

export type LoadStatus = 'idle' | 'loading' | 'error' | 'success'

export const useBranchesStore = defineStore('branches', () => {
  // List page (BranchesPage)
  const items = ref<GymBranch[]>([])
  const status = ref<LoadStatus>('idle')
  const error = ref<string | null>(null)

  // Detail page (BranchDetailPage)
  const current = ref<GymBranch | null>(null)
  const currentStatus = ref<LoadStatus>('idle')
  const currentError = ref<string | null>(null)

  const isEmpty = computed(() => status.value === 'success' && items.value.length === 0)

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

  return { items, status, error, isEmpty, current, currentStatus, currentError, fetchAll, fetchOne }
})

