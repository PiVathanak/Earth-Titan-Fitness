<script setup lang="ts">
import { ref } from 'vue'
import MetricCard from './MetricCard.vue'
import branch1 from '@/images/branch1-1.png'
import branch2 from '@/images/branch1-2.png'
import branch3 from '@/images/branch1-3.png'
import branch4 from '@/images/branch1-4.png'
import branch5 from '@/images/branch1-5.png'

interface Branch {
  id: number
  name: string
  hours: string
  image: string
  status: 'open' | 'closed'
}

const branches = ref<Branch[]>([
  { id: 1, name: 'Downtown Titanium Flagship', hours: '05:00 - 23:00 EST', image: branch1, status: 'open' },
  { id: 2, name: 'Northside Heavy Athletics', hours: '06:00 - 22:00 EST', image: branch2, status: 'open' },
  { id: 3, name: 'Metro Core District', hours: 'Unrestricted 24 Hours Access', image: branch3, status: 'open' },
  { id: 4, name: 'West Titanium Vault', hours: '05:00 - 23:00 EST', image: branch4, status: 'open' },
  { id: 5, name: 'East Coast Barbell Lab', hours: '06:00 - 21:00 EST', image: branch5, status: 'open' },
])

const selectedBranch = ref<Branch | null>(null)
const editHours = ref('')
const editStatus = ref<Branch['status']>('open')

function openEditor(branch: Branch) {
  selectedBranch.value = branch
  editHours.value = branch.hours
  editStatus.value = branch.status
}

function saveBranch() {
  if (!selectedBranch.value) return
  selectedBranch.value.hours = editHours.value
  selectedBranch.value.status = editStatus.value
  selectedBranch.value = null
}
</script>

<template>
  <section class="overview">
    <div class="heading"><div><p class="eyebrow">FACILITY NETWORK / OPERATIONS</p><h2>Branch Overview</h2><p>Manage connected facilities, operating schedules, and regional availability.</p></div><button class="secondary-button" type="button">＋ Add Branch</button></div>
    <div class="metrics">
      <MetricCard label="Active Units" value="4" detail="Currently operational" icon="▤" accent="green" :progress="80" />
      <MetricCard label="Inactive Units" value="1" detail="Under scheduled retrofit" icon="!" :progress="20" />
      <MetricCard label="Employees" value="48" detail="Staff on roster" icon="▣" :progress="65" />
      <MetricCard label="Total Members" value="1,428" detail="+38 this cycle" icon="♟" :progress="84" />
    </div>
    <div class="section-title"><span>▤</span><h3>Branches & Operational Schedules</h3></div>
    <div class="branch-grid">
      <article v-for="branch in branches" :key="branch.id" class="branch-card" :class="{ 'branch-card--primary': branch.id === 1 }">
        <div class="branch-card__content"><span class="branch-number">BRANCH {{ branch.id }}</span><h4>{{ branch.name }}</h4><div class="branch-image"><img :src="branch.image" :alt="branch.name" /></div><div class="hours"><span>REGULAR HOURS</span><strong>{{ branch.hours }}</strong></div></div>
        <div class="branch-actions"><button class="open-status" type="button" @click="branch.status = branch.status === 'open' ? 'closed' : 'open'"><i :class="{ closed: branch.status === 'closed' }" /> STATUS: {{ branch.status.toUpperCase() }}</button><button class="edit-button" type="button" @click="openEditor(branch)">✎ EDIT DATA</button></div>
      </article>
      <article class="provision-card"><span class="provision-icon">＋</span><h4>Provision New Station</h4><p>Initialize turnstile API gateways, card scanner hardware, and regional roster nodes.</p><button class="secondary-button" type="button">Configure Node 06 →</button></article>
    </div>
    <div v-if="selectedBranch" class="modal-backdrop" role="presentation" @click.self="selectedBranch = null">
      <form class="modal" @submit.prevent="saveBranch"><div class="modal-header"><div><p class="eyebrow">BRANCH {{ selectedBranch.id }}</p><h3>Edit Branch Configuration</h3></div><button type="button" @click="selectedBranch = null">×</button></div><label>Status<select v-model="editStatus"><option value="open">Status: Open</option><option value="closed">Status: Closed</option></select></label><label>Regular hours<input v-model.trim="editHours" required /></label><div class="modal-actions"><button class="edit-button" type="button" @click="selectedBranch = null">Cancel</button><button class="secondary-button" type="submit">Save Configuration</button></div></form>
    </div>
  </section>
</template>

<style scoped>
.overview{color:#e5e5e5}.heading{display:flex;align-items:end;justify-content:space-between;gap:1rem;margin-bottom:1.5rem}.heading h2{margin:.4rem 0;color:#fff;font:700 2.5rem/1 Oswald,sans-serif;text-transform:uppercase}.heading p:last-child{margin:0;color:#999;font-size:.8rem}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem}.secondary-button{padding:.75rem 1rem;color:#ddd;background:#2c2c2c;border:1px solid #444;border-radius:.3rem;cursor:pointer;font-weight:700;text-transform:uppercase}.secondary-button:hover{background:#3a3a3a}.section-title{display:flex;align-items:center;gap:.6rem;margin-bottom:1rem}.section-title span{color:#e50914;font-size:1.4rem}.section-title h3{margin:0;color:#fff;font:700 1.35rem Oswald,sans-serif;text-transform:uppercase}.branch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.branch-card,.provision-card{position:relative;display:flex;min-height:25rem;flex-direction:column;justify-content:space-between;overflow:hidden;padding:1.25rem;background:#1c1c1c;border:1px solid #2f2f2f;border-radius:.75rem}.branch-card--primary{border-top:3px solid #e50914}.branch-number{color:#e76d72;font-size:.65rem;font-weight:700;letter-spacing:.1em}.branch-card h4,.provision-card h4{margin:.4rem 0;color:#fff;font:700 1.1rem Oswald,sans-serif;text-transform:uppercase}.branch-image{height:8rem;margin:.75rem 0;overflow:hidden;background:#292929;border-radius:.3rem}.branch-image img{width:100%;height:100%;object-fit:cover}.branch-image span{display:grid;height:100%;place-items:center;color:#777;font-size:.7rem}.hours{display:grid;gap:.3rem;padding:.75rem;background:#0e0e0e;border-radius:.4rem}.hours span{color:#999;font-size:.65rem;letter-spacing:.08em}.hours strong{font-size:.8rem}.branch-actions{display:flex;gap:.5rem;margin-top:1rem}.branch-actions button{flex:1;padding:.55rem .35rem;border-radius:.25rem;cursor:pointer;font-size:.65rem;font-weight:700}.open-status{color:#4ade80;background:#22c55e18;border:1px solid #22c55e55}.open-status i{display:inline-block;width:.4rem;height:.4rem;margin-right:.25rem;background:#4ade80;border-radius:50%}.open-status i.closed{background:#e50914}.edit-button{color:#ddd;background:#ffffff0a;border:1px solid #ffffff20}.provision-card{align-items:center;justify-content:center;text-align:center}.provision-icon{display:grid;width:3.5rem;height:3.5rem;place-items:center;margin-bottom:1rem;color:#ff6b72;background:#2c2c2c;border-radius:50%;font-size:2rem}.provision-card p{max-width:18rem;margin:0 0 1.25rem;color:#999;font-size:.8rem}.modal-backdrop{position:fixed;inset:0;z-index:20;display:grid;place-items:center;padding:1rem;background:#000d}.modal{width:min(100%,32rem);display:grid;gap:1rem;padding:1.5rem;background:#202020;border:1px solid #3c3c3c;border-radius:.75rem}.modal-header{display:flex;justify-content:space-between}.modal-header h3{margin:.3rem 0;color:#fff;font:700 1.3rem Oswald,sans-serif;text-transform:uppercase}.modal-header button{color:#aaa;background:none;border:0;cursor:pointer;font-size:1.7rem}.modal label{display:grid;gap:.35rem;color:#bbb;font-size:.75rem;font-weight:700}.modal input,.modal select{padding:.7rem;color:#fff;background:#2c2c2c;border:1px solid #454545;border-radius:.3rem}.modal-actions{display:flex;justify-content:flex-end;gap:.5rem}@media(max-width:1050px){.branch-grid{grid-template-columns:repeat(2,1fr)}.metrics{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.heading{align-items:flex-start;flex-direction:column}.branch-grid,.metrics{grid-template-columns:1fr}}
</style>
