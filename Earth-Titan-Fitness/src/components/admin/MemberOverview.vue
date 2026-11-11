<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MetricCard from './MetricCard.vue'
import MemberTable from './MemberTable.vue'
import TablePagination from './TablePagination.vue'
import AddMemberModal from './AddMemberModal.vue'
import ToastStack from './ToastStack.vue'
import { useMembersStore } from '@/stores/members'
import { errorMessage } from '@/api/http'
import type { AdminMember, AdminToast, MemberStatus, NewMember } from '@/types/admin'

const PAGE_SIZE = 5
const store = useMembersStore()
onMounted(() => store.fetchAll())

const search = ref('')
const status = ref<'all' | MemberStatus>('all')
const page = ref(1)
const modalOpen = ref(false)
const editing = ref<AdminMember | null>(null)
const saveError = ref<string | null>(null)
const toasts = ref<AdminToast[]>([])

const filtered = computed(() => store.members.filter((member) => {
  const query = search.value.toLowerCase()
  return (!query || [member.name, member.email, member.memberId].some((value) => value.toLowerCase().includes(query))) &&
    (status.value === 'all' || member.status === status.value)
}))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const visible = computed(() => filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))
const total = computed(() => store.members.length)
const pct = (n: number) => (total.value ? Math.round((n / total.value) * 100) : 0)

function notify(message: string, tone: AdminToast['tone'] = 'success') {
  const id = Date.now()
  toasts.value.push({ id, message, tone })
  window.setTimeout(() => { toasts.value = toasts.value.filter((toast) => toast.id !== id) }, 3000)
}
function openModal(member: AdminMember | null) {
  editing.value = member
  saveError.value = null
  modalOpen.value = true
}
async function save(form: NewMember) {
  saveError.value = null
  try {
    if (editing.value) {
      await store.update(editing.value, form)
      notify('Member record updated.')
    } else {
      await store.create(form)
      page.value = 1
      notify('Member record added.')
    }
    modalOpen.value = false
  } catch (e) {
    saveError.value = errorMessage(e)
  }
}
async function remove(member: AdminMember) {
  if (!window.confirm(`Delete the record for ${member.name}?`)) return
  try {
    await store.remove(member)
    if (page.value > totalPages.value) page.value = totalPages.value
    notify('Member record deleted.', 'info')
  } catch (e) {
    notify(errorMessage(e), 'error')
  }
}
</script>

<template>
  <section class="overview">
    <div class="overview-heading"><div><p class="eyebrow">MEMBER REGISTRY / LIVE LEDGER</p><h2>Member Overview</h2><p>Comprehensive lifter registry, active membership ledger, and credential management.</p></div><button class="primary" type="button" :disabled="store.status !== 'success'" @click="openModal(null)">＋ Add Record</button></div>
    <div class="metrics">
      <MetricCard label="Total Members" :value="total.toString()" detail="Records in the registry" icon="♟" :progress="100" />
      <MetricCard label="Active Members" :value="store.countBy('active').toString()" :detail="`${pct(store.countBy('active'))}% active compliance`" icon="●" accent="green" :progress="pct(store.countBy('active'))" />
      <MetricCard label="Expiring Soon" :value="store.countBy('expiring').toString()" detail="Within the next 14 days" icon="◷" accent="amber" />
      <MetricCard label="Expired" :value="store.countBy('expired').toString()" detail="Requires outreach" icon="!" :progress="pct(store.countBy('expired'))" />
      <MetricCard label="Active Sites" value="4 Units" detail="All nodes connected" icon="▤" />
    </div>
    <section class="ledger">
      <div class="ledger-heading"><div><p class="eyebrow">CUSTOMER &amp; MEMBERSHIP LEDGER</p><h3>Customer Records</h3><p>Operational registry of certified strength athletes and branch access passes.</p></div><div class="controls"><input v-model="search" type="search" placeholder="Search name, email, or ID..." @input="page = 1" /><select v-model="status" @change="page = 1"><option value="all">All statuses</option><option value="active">Active</option><option value="expiring">Expiring soon</option><option value="expired">Expired</option></select></div></div>

      <!-- Loading -->
      <div v-if="store.status === 'loading' || store.status === 'idle'" class="state" aria-busy="true">
        <span class="spinner" /> Loading member records…
      </div>
      <!-- Error -->
      <div v-else-if="store.status === 'error'" class="state state--error" role="alert">
        <strong>Could not load members.</strong>
        <span>{{ store.error }}</span>
        <button class="primary" type="button" @click="store.fetchAll()">Try again</button>
      </div>
      <!-- Empty -->
      <div v-else-if="store.isEmpty" class="state">
        <strong>No members yet.</strong>
        <span>Add the first customer record to start the registry.</span>
        <button class="primary" type="button" @click="openModal(null)">＋ Add Record</button>
      </div>
      <!-- Success -->
      <template v-else>
        <MemberTable :members="visible" @edit="openModal" @remove="remove" />
        <TablePagination :page="page" :total-pages="totalPages" :total-items="filtered.length" @change="page = $event" />
      </template>
    </section>
    <AddMemberModal :open="modalOpen" :member="editing" :saving="store.saving" :server-error="saveError" @close="modalOpen = false" @save="save" />
    <ToastStack :toasts="toasts" />
  </section>
</template>

<style scoped>
.overview-heading,.ledger-heading{display:flex;align-items:end;justify-content:space-between;gap:1rem;margin-bottom:1.5rem}.overview-heading h2{margin:.4rem 0;color:#fff;font:700 2.5rem/1 Oswald,sans-serif;text-transform:uppercase}.overview-heading p:last-child,.ledger-heading p:last-child{margin:0;color:#999;font-size:.8rem}.metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:2rem}.ledger{overflow:hidden;background:#1c1c1c;border:1px solid #2f2f2f;border-radius:.75rem}.ledger-heading{align-items:center;margin:0;padding:1.5rem;background:#101010}.ledger-heading h3{margin:.35rem 0 .25rem;color:#fff;font:700 1.35rem Oswald,sans-serif;text-transform:uppercase}.controls{display:flex;gap:.5rem}.controls input,.controls select{min-width:13rem;padding:.75rem;color:#ddd;background:#292929;border:1px solid #3b3b3b;border-radius:.3rem}.primary{padding:.75rem 1rem;color:#fff;background:#e50914;border:0;border-radius:.3rem;cursor:pointer;font-weight:700;text-transform:uppercase}.primary:disabled{opacity:.5;cursor:not-allowed}
.state{display:flex;flex-direction:column;align-items:center;gap:.6rem;padding:3rem 1rem;color:#aaa;font-size:.85rem;text-align:center}.state strong{color:#fff;font-size:1rem}.state--error strong{color:#ff6b72}.spinner{width:1.5rem;height:1.5rem;border:3px solid #333;border-top-color:#e50914;border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:1100px){.metrics{grid-template-columns:repeat(3,1fr)}}@media(max-width:750px){.overview-heading,.ledger-heading{align-items:stretch;flex-direction:column}.metrics{grid-template-columns:repeat(2,1fr)}.controls{flex-direction:column}.controls input,.controls select{width:100%}}@media(max-width:450px){.metrics{grid-template-columns:1fr}}
</style>
