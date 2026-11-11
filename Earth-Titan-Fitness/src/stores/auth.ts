import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { usersApi } from '@/api/users'
import { membershipsApi } from '@/api/memberships'
import { errorMessage } from '@/api/http'
import type { User, UserRole } from '@/types/api'

const STORAGE_KEY = 'etf-session'

type SessionUser = Omit<User, 'password'>

function loadSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SessionUser) : null
  } catch {
    return null
  }
}

/** Where each role lands after logging in. */
export const homeForRole: Record<UserRole, string> = {
  customer: '/membership',
  employee: '/employee-status',
  admin: '/admin',
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<SessionUser | null>(loadSession())
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => user.value !== null)
  const role = computed<UserRole | null>(() => user.value?.role ?? null)

  /**
   * Mock login against json-server: find the user by email and compare the password.
   * In weeks 6–8 this becomes POST /auth/login returning a token.
   */
  async function login(email: string, password: string, expectedRole: UserRole, gymId?: string) {
    loading.value = true
    error.value = null
    try {
      const [found] = await usersApi.findByEmail(email.trim().toLowerCase())
      if (!found || found.password !== password) {
        throw new Error('Email or password is incorrect.')
      }
      if (found.role !== expectedRole) {
        throw new Error(`This account is not a ${expectedRole} account. Choose the correct tab.`)
      }
      // Customers also confirm their Gym ID (membership code)
      if (expectedRole === 'customer') {
        const [membership] = await membershipsApi.findByUser(found.id)
        if (!membership || membership.membershipCode !== gymId?.trim().toUpperCase()) {
          throw new Error('Gym ID does not match this account.')
        }
      }
      const { password: _omit, ...safeUser } = found
      void _omit
      user.value = safeUser
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
      return safeUser
    } catch (e) {
      error.value = errorMessage(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return { user, loading, error, isLoggedIn, role, login, logout }
})

