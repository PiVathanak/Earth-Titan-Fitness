<script setup lang="ts">
import { computed, ref } from 'vue'
import MetricCard from './MetricCard.vue'
import MemberTable from './MemberTable.vue'
import TablePagination from './TablePagination.vue'
import AddMemberModal from './AddMemberModal.vue'
import ToastStack from './ToastStack.vue'
import type { AdminMember, AdminToast, MemberStatus, NewMember } from '@/types/admin'

const members = ref<AdminMember[]>([
  { id: 1, name: 'Marcus Vance', email: 'm.vance@titanathletics.io', memberId: 'ET-88204', registerDate: 'Jan 01, 2025', expireDate: 'Dec 31, 2025', status: 'active' },
  { id: 2, name: 'Elena Rostova', email: 'e.rostova@heavyiron.org', memberId: 'ET-91044', registerDate: 'Aug 20, 2024', expireDate: 'In 5 Days', status: 'expiring' },
  { id: 3, name: 'Damian Kross', email: 'd.kross@titanathletics.io', memberId: 'ET-73412', registerDate: 'Oct 01, 2023', expireDate: 'Oct 01, 2024', status: 'expired' },
  { id: 4, name: 'Sarah Chen', email: 's.chen@ironvault.org', memberId: 'ET-80192', registerDate: 'Mar 14, 2025', expireDate: 'Mar 14, 2026', status: 'active' },
])
const search = ref('')
const status = ref<'all' | MemberStatus>('all')
const page = ref(1)
const modalOpen = ref(false)
const editing = ref<AdminMember | null>(null)
const toasts = ref<AdminToast[]>([])
const filtered = computed(() => members.value.filter((member) => {
  const query = search.value.toLowerCase()
  return (!query || [member.name, member.email, member.memberId].some((value) => value.toLowerCase().includes(query))) &&
    (status.value === 'all' || member.status === status.value)
}))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 5)))
const visible = computed(() => filtered.value.slice((page.value - 1) * 5, page.value * 5))
const count = (value: MemberStatus) => members.value.filter((member) => member.status === value).length

function notify(message: string, tone: AdminToast['tone'] = 'success') {
  const id = Date.now()
  toasts.value.push({ id, message, tone })
  window.setTimeout(() => { toasts.value = toasts.value.filter((toast) => toast.id !== id) }, 3000)
}
function save(form: NewMember) {
  const member = { ...form, status: form.expireDate < '2025-01-01' ? 'expired' as const : 'active' as const }
  if (editing.value) {
    const index = members.value.findIndex((item) => item.id === editing.value?.id)
    if (index >= 0) members.value[index] = { ...member, id: editing.value.id }
    notify('Member record updated.')
  } else {
    members.value.unshift({ ...member, id: Date.now() })
    notify('Member record added.')
  }
  modalOpen.value = false
}
function remove(member: AdminMember) {
  if (!window.confirm(`Delete the record for ${member.name}?`)) return
  members.value = members.value.filter((item) => item.id !== member.id)
  notify('Member record deleted.', 'info')
}
</script>

<template>
  <section class="overview">
    <div class="overview-heading"><div><p class="eyebrow">MEMBER REGISTRY / 2025 CYCLE</p><h2>Member Overview</h2><p>Comprehensive lifter registry, active membership ledger, and credential management.</p></div><button class="primary" type="button" @click="editing = null; modalOpen = true">＋ Add Record</button></div>
    <div class="metrics">
      <MetricCard label="Total Members" value="1,428" detail="+38 this cycle" icon="♟" :progress="40" />
      <MetricCard label="Active Members" value="1,215" detail="88.0% active compliance" icon="●" accent="green" :progress="88" />
      <MetricCard label="Expiring Soon" :value="count('expiring').toString()" detail="Within the next 14 days" icon="◷" accent="amber" />
      <MetricCard label="Expired" value="165" detail="Requires outreach" icon="!" :progress="20" />
      <MetricCard label="Active Sites" value="5 Units" detail="All nodes connected" icon="▤" />
    </div>
    <section class="ledger">
      <div class="ledger-heading"><div><p class="eyebrow">CUSTOMER & MEMBERSHIP LEDGER</p><h3>New Customer Record</h3><p>Operational registry of certified strength athletes and branch access passes.</p></div><div class="controls"><input v-model="search" type="search" placeholder="Search name, email, or ID..." @input="page = 1" /><select v-model="status" @change="page = 1"><option value="all">All statuses</option><option value="active">Active</option><option value="expiring">Expiring soon</option><option value="expired">Expired</option></select></div></div>
      <MemberTable :members="visible" @edit="editing = $event; modalOpen = true" @remove="remove" />
      <TablePagination :page="page" :total-pages="totalPages" :total-items="filtered.length" @change="page = $event" />
    </section>
    <AddMemberModal :open="modalOpen" :member="editing" @close="modalOpen = false" @save="save" />
    <ToastStack :toasts="toasts" />
  </section>
</template>

<style scoped>
.overview-heading,.ledger-heading{display:flex;align-items:end;justify-content:space-between;gap:1rem;margin-bottom:1.5rem}.overview-heading h2{margin:.4rem 0;color:#fff;font:700 2.5rem/1 Oswald,sans-serif;text-transform:uppercase}.overview-heading p:last-child,.ledger-heading p:last-child{margin:0;color:#999;font-size:.8rem}.metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:2rem}.ledger{overflow:hidden;background:#1c1c1c;border:1px solid #2f2f2f;border-radius:.75rem}.ledger-heading{align-items:center;margin:0;padding:1.5rem;background:#101010}.ledger-heading h3{margin:.35rem 0 .25rem;color:#fff;font:700 1.35rem Oswald,sans-serif;text-transform:uppercase}.controls{display:flex;gap:.5rem}.controls input,.controls select{min-width:13rem;padding:.75rem;color:#ddd;background:#292929;border:1px solid #3b3b3b;border-radius:.3rem}.primary{padding:.75rem 1rem;color:#fff;background:#e50914;border:0;border-radius:.3rem;cursor:pointer;font-weight:700;text-transform:uppercase}@media(max-width:1100px){.metrics{grid-template-columns:repeat(3,1fr)}}@media(max-width:750px){.overview-heading,.ledger-heading{align-items:stretch;flex-direction:column}.metrics{grid-template-columns:repeat(2,1fr)}.controls{flex-direction:column}.controls input,.controls select{width:100%}}@media(max-width:450px){.metrics{grid-template-columns:1fr}}
</style>
