<script setup lang="ts">
import type { AdminMember } from '@/types/admin'

defineProps<{
  members: AdminMember[]
}>()

const emit = defineEmits<{
  edit: [member: AdminMember]
  remove: [member: AdminMember]
}>()

const statusDetails: Record<AdminMember['status'], { label: string; icon: string }> = {
  active: { label: 'Active', icon: '✓' },
  expiring: { label: 'Expiring Soon', icon: '◷' },
  expired: { label: 'Expired', icon: '!' },
}
</script>

<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Athlete / Name</th>
          <th>Email Address</th>
          <th>Gym ID</th>
          <th>Register Date</th>
          <th>Expire Date</th>
          <th>Status</th>
          <th class="table-actions">Operations</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" :key="member.id">
          <td class="member-name"><span :class="`status-dot status-dot--${member.status}`" />{{ member.name }}</td>
          <td class="muted">{{ member.email }}</td>
          <td><span class="member-id">{{ member.memberId }}</span></td>
          <td>{{ member.registerDate }}</td>
          <td>{{ member.expireDate }}</td>
          <td>
            <span :class="`status status--${member.status}`">
              {{ statusDetails[member.status].icon }} {{ statusDetails[member.status].label }}
            </span>
          </td>
          <td class="table-actions">
            <button type="button" title="Edit member" @click="emit('edit', member)">Edit</button>
            <button type="button" title="Delete member" @click="emit('remove', member)">Delete</button>
          </td>
        </tr>
        <tr v-if="members.length === 0">
          <td colspan="7" class="empty-state">No member records match your search.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap { overflow-x: auto; }
table { width: 100%; min-width: 860px; border-collapse: collapse; text-align: left; }
th { padding: 0.9rem 1.25rem; color: #9c9c9c; background: #242424; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; }
td { padding: 1rem 1.25rem; color: #e0e0e0; border-top: 1px solid #303030; font-size: 0.84rem; }
tbody tr:hover { background: #242424; }
.member-name { display: flex; align-items: center; gap: 0.55rem; font-weight: 700; }
.status-dot { width: 0.45rem; height: 0.45rem; border-radius: 50%; }
.status-dot--active { background: #22c55e; }.status-dot--expiring { background: #fbbf24; }.status-dot--expired { background: #e50914; }
.muted { color: #a0a0a0; }
.member-id { padding: 0.25rem 0.5rem; color: #ddd; background: #303030; border-radius: 0.25rem; font-size: 0.75rem; }
.status { display: inline-flex; gap: 0.3rem; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; white-space: nowrap; }
.status--active { color: #4ade80; background: rgba(34, 197, 94, 0.14); }.status--expiring { color: #fbbf24; background: rgba(251, 191, 36, 0.12); }.status--expired { color: #ff6b72; background: rgba(229, 9, 20, 0.14); }
.table-actions { text-align: right; white-space: nowrap; }
.table-actions button { padding: 0.3rem 0.45rem; color: #a0a0a0; background: transparent; border: 0; cursor: pointer; font-size: 0.75rem; }
.table-actions button:hover { color: #fff; }.table-actions button + button:hover { color: #ff6b72; }
.empty-state { padding: 3rem; color: #999; text-align: center; }
</style>
