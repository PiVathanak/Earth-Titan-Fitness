import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { membershipsApi } from '@/api/memberships'
import { usersApi } from '@/api/users'
import { errorMessage } from '@/api/http'
import { dbStatus, displayStatus } from '@/utils/membership'
import type { MembershipWithUser } from '@/types/api'
import type { AdminMember, MemberStatus, NewMember } from '@/types/admin'
import type { LoadStatus } from './branches'

function toRow(m: MembershipWithUser): AdminMember {
  return {
    id: m.id,
    userId: m.userId,
    name: m.user?.name ?? 'Unknown user',
    email: m.user?.email ?? '—',
    memberId: m.membershipCode,
    plan: m.plan,
    registerDate: m.registrationDate,
    expireDate: m.expirationDate,
    status: displayStatus(m.expirationDate),
  }
}

/** Customer + membership records for the admin Member Overview (US-08). */
export const useMembersStore = defineStore('members', () => {
  const members = ref<AdminMember[]>([])
  const status = ref<LoadStatus>('idle')
  const error = ref<string | null>(null)
  const saving = ref(false)

  const isEmpty = computed(() => status.value === 'success' && members.value.length === 0)
  const countBy = (s: MemberStatus) => members.value.filter((m) => m.status === s).length

  async function fetchAll() {
    status.value = 'loading'
    error.value = null
    try {
      const data = await membershipsApi.listWithUsers()
      members.value = data.map(toRow).sort((a, b) => b.id - a.id)
      status.value = 'success'
    } catch (e) {
      error.value = errorMessage(e)
      status.value = 'error'
    }
  }

  function isEmailTaken(email: string, exceptUserId?: number) {
    const value = email.trim().toLowerCase()
    return members.value.some((m) => m.email.toLowerCase() === value && m.userId !== exceptUserId)
  }

  function isCodeTaken(code: string, exceptId?: number) {
    const value = code.trim().toUpperCase()
    return members.value.some((m) => m.memberId === value && m.id !== exceptId)
  }

  /** Creates the user first, then the membership that points to it (userId). */
  async function create(form: NewMember) {
    saving.value = true
    try {
      const user = await usersApi.create({
        name: form.name,
        email: form.email.toLowerCase(),
        password: form.memberId, // temporary password = membership code (mock only)
        role: 'customer',
      })
      const membership = await membershipsApi.create({
        userId: user.id,
        membershipCode: form.memberId.toUpperCase(),
        plan: form.plan,
        registrationDate: form.registerDate,
        expirationDate: form.expireDate,
        status: dbStatus(form.expireDate),
      })
      members.value.unshift(toRow({ ...membership, user }))
    } finally {
      saving.value = false
    }
  }

  async function update(row: AdminMember, form: NewMember) {
    saving.value = true
    try {
      const user = await usersApi.update(row.userId, { name: form.name, email: form.email.toLowerCase() })
      const membership = await membershipsApi.update(row.id, {
        membershipCode: form.memberId.toUpperCase(),
        plan: form.plan,
        registrationDate: form.registerDate,
        expirationDate: form.expireDate,
        status: dbStatus(form.expireDate),
      })
      const index = members.value.findIndex((m) => m.id === row.id)
      if (index >= 0) members.value[index] = toRow({ ...membership, user })
    } finally {
      saving.value = false
    }
  }

  async function remove(row: AdminMember) {
    await membershipsApi.remove(row.id)
    await usersApi.remove(row.userId)
    members.value = members.value.filter((m) => m.id !== row.id)
  }

  return { members, status, error, saving, isEmpty, countBy, fetchAll, isEmailTaken, isCodeTaken, create, update, remove }
})

