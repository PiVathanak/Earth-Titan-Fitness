<script setup lang="ts">
import { computed, ref } from 'vue'
import MetricCard from './MetricCard.vue'
import TablePagination from './TablePagination.vue'

interface Employee { id: number; name: string; email: string; role: string; branch: string; status: 'active' | 'leave' }
interface EmployeeForm { name: string; email: string; role: string; branch: string }
const employees = ref<Employee[]>([
  { id: 1, name: 'Marcus Vance', email: 'm.vance@earthtitan.com', role: 'Desk Commander', branch: 'Downtown Iron Gym', status: 'active' },
  { id: 2, name: 'Elena Rostova', email: 'e.rostova@earthtitan.com', role: 'Athletic Director', branch: 'Northside Heavy Iron', status: 'active' },
  { id: 3, name: 'Jaxson Reed', email: 'j.reed@earthtitan.com', role: 'Sports Biomechanist', branch: 'Apex Compound', status: 'leave' },
  { id: 4, name: 'Sarah Chen', email: 's.chen@earthtitan.com', role: 'Front Desk Lead', branch: 'West End Hub', status: 'active' },
])
const search = ref('')
const page = ref(1)
const modalOpen = ref(false)
const form = ref<EmployeeForm>({ name: '', email: '', role: '', branch: '' })
const filtered = computed(() => employees.value.filter((employee) => `${employee.name} ${employee.email} ${employee.role} ${employee.branch}`.toLowerCase().includes(search.value.toLowerCase())))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 5)))
const visible = computed(() => filtered.value.slice((page.value - 1) * 5, page.value * 5))

function openEmployeeModal() {
  form.value = { name: '', email: '', role: '', branch: '' }
  modalOpen.value = true
}

function addEmployee() {
  employees.value.unshift({ ...form.value, id: Date.now(), status: 'active' })
  modalOpen.value = false
  page.value = 1
}
</script>

<template>
  <section class="overview">
    <div class="heading"><div><p class="eyebrow">STAFF REGISTRY / OPERATIONS</p><h2>Employee Overview</h2><p>Manage facility staff, assignments, and operational availability.</p></div><button class="primary" type="button" @click="openEmployeeModal">＋ Add Employee</button></div>
    <div class="metrics">
      <MetricCard label="Employees" value="48" detail="Staff on roster" icon="▣" :progress="45" />
      <MetricCard label="On Duty" value="42" detail="Currently available" icon="✓" accent="green" :progress="88" />
      <MetricCard label="On Leave" value="6" detail="Temporary absence" icon="◷" accent="amber" :progress="12" />
      <MetricCard label="Active Sites" value="5 Units" detail="All nodes connected" icon="▤" />
    </div>
    <section class="ledger"><div class="ledger-heading"><div><p class="eyebrow">EMPLOYEE DIRECTORY</p><h3>Staff Records</h3><p>Certified operators and facility personnel.</p></div><input v-model="search" type="search" placeholder="Search staff, role, or branch..." @input="page = 1" /></div>
      <div class="table-wrap"><table><thead><tr><th>Employee</th><th>Email</th><th>Role</th><th>Assigned Branch</th><th>Status</th></tr></thead><tbody><tr v-for="employee in visible" :key="employee.id"><td class="name">{{ employee.name }}</td><td>{{ employee.email }}</td><td>{{ employee.role }}</td><td>{{ employee.branch }}</td><td><span :class="`status status--${employee.status}`">{{ employee.status === 'active' ? 'Active' : 'On Leave' }}</span></td></tr><tr v-if="!visible.length"><td colspan="5" class="empty">No employee records match your search.</td></tr></tbody></table></div>
      <TablePagination :page="page" :total-pages="totalPages" :total-items="filtered.length" @change="page = $event" />
    </section>
    <div v-if="modalOpen" class="modal-backdrop" role="presentation" @click.self="modalOpen = false">
      <form class="modal" @submit.prevent="addEmployee">
        <div class="modal-header"><div><p class="eyebrow">STAFF REGISTRY</p><h3>Add New Employee</h3></div><button type="button" aria-label="Close dialog" @click="modalOpen = false">×</button></div>
        <label>Full name<input v-model.trim="form.name" required type="text" placeholder="Employee name" /></label>
        <label>Email address<input v-model.trim="form.email" required type="email" placeholder="employee@earthtitan.com" /></label>
        <label>Role<input v-model.trim="form.role" required type="text" placeholder="Facility Manager" /></label>
        <label>Assigned branch<input v-model.trim="form.branch" required type="text" placeholder="Downtown Iron Gym" /></label>
        <div class="modal-actions"><button type="button" class="secondary" @click="modalOpen = false">Cancel</button><button class="primary" type="submit">Add Employee</button></div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.heading{display:flex;align-items:end;justify-content:space-between;gap:1rem;margin-bottom:1.5rem}.heading h2{margin:.4rem 0;color:#fff;font:700 2.5rem/1 Oswald,sans-serif;text-transform:uppercase}.heading p:last-child{margin:0;color:#999;font-size:.8rem}.primary{padding:.75rem 1rem;color:#fff;background:#e50914;border:0;border-radius:.3rem;cursor:pointer;font-weight:700;text-transform:uppercase}.primary:hover{background:#c90812}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem}.ledger{overflow:hidden;background:#1c1c1c;border:1px solid #2f2f2f;border-radius:.75rem}.ledger-heading{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem;background:#101010}.ledger-heading h3{margin:.35rem 0 .25rem;color:#fff;font:700 1.35rem Oswald,sans-serif;text-transform:uppercase}.ledger-heading p:last-child{margin:0;color:#999;font-size:.8rem}.ledger-heading input{min-width:16rem;padding:.75rem;color:#ddd;background:#292929;border:1px solid #3b3b3b;border-radius:.3rem}.table-wrap{overflow-x:auto}table{width:100%;min-width:700px;border-collapse:collapse;text-align:left}th{padding:.9rem 1.25rem;color:#999;background:#242424;font-size:.68rem;text-transform:uppercase}td{padding:1rem 1.25rem;color:#ddd;border-top:1px solid #303030;font-size:.8rem}.name{font-weight:700}.status{padding:.25rem .5rem;border-radius:.25rem;font-size:.68rem;font-weight:700;text-transform:uppercase}.status--active{color:#4ade80;background:#22c55e24}.status--leave{color:#fbbf24;background:#fbbf2424}.empty{padding:2rem;text-align:center}.modal-backdrop{position:fixed;inset:0;z-index:20;display:grid;place-items:center;padding:1rem;background:#000d}.modal{width:min(100%,32rem);display:grid;gap:1rem;padding:1.5rem;background:#202020;border:1px solid #3c3c3c;border-radius:.75rem;box-shadow:0 1rem 4rem #000}.modal-header{display:flex;justify-content:space-between}.modal-header h3{margin:.3rem 0;color:#fff;font:700 1.4rem Oswald,sans-serif;text-transform:uppercase}.modal-header>button{color:#aaa;background:none;border:0;cursor:pointer;font-size:1.7rem}.modal label{display:grid;gap:.35rem;color:#bbb;font-size:.75rem;font-weight:700}.modal input{padding:.7rem;color:#fff;background:#2c2c2c;border:1px solid #454545;border-radius:.3rem}.modal-actions{display:flex;justify-content:flex-end;gap:.5rem}.secondary{padding:.75rem 1rem;color:#ddd;background:#303030;border:1px solid #454545;border-radius:.3rem;cursor:pointer}@media(max-width:850px){.metrics{grid-template-columns:repeat(2,1fr)}.ledger-heading{align-items:stretch;flex-direction:column}}@media(max-width:450px){.metrics{grid-template-columns:1fr}.heading{align-items:flex-start;flex-direction:column}}
</style>
