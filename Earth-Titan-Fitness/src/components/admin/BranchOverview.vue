<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MetricCard from './MetricCard.vue'
import AddBranchModal from './AddBranchModal.vue'
import ToastStack from './ToastStack.vue'
import { useBranchesStore } from '@/stores/branches'
import { useMembersStore } from '@/stores/members'
import { errorMessage } from '@/api/http'
import type { NewBranch } from '@/api/branches'
import type { GymBranch } from '@/types/api'
import type { AdminToast } from '@/types/admin'
import { toBranchCard } from '@/utils/branchView'
import { todayIso } from '@/utils/membership'

const store = useBranchesStore()
const membersStore = useMembersStore()

onMounted(() => {
  store.fetchAll()
  if (membersStore.status === 'idle') membersStore.fetchAll()
})

const modalOpen = ref(false)
const editingBranch = ref<GymBranch | null>(null)
const saveError = ref<string | null>(null)
const toasts = ref<AdminToast[]>([])

const cards = computed(() =>
  store.items.map((raw) => ({
    raw,
    view: toBranchCard(raw),
  })),
)

const openCount = computed(() => cards.value.filter((c) => c.view.isOpen).length)
const closedCount = computed(() => Math.max(0, cards.value.length - openCount.value))
const activeRatio = computed(() =>
  cards.value.length ? Math.round((openCount.value / cards.value.length) * 100) : 0,
)

function notify(message: string, tone: AdminToast['tone'] = 'success') {
  const id = Date.now()
  toasts.value.push({ id, message, tone })
  window.setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, 3000)
}

function openAddModal() {
  editingBranch.value = null
  saveError.value = null
  modalOpen.value = true
}

function openEditModal(branch: GymBranch) {
  editingBranch.value = branch
  saveError.value = null
  modalOpen.value = true
}

async function saveBranch(payload: NewBranch) {
  saveError.value = null
  try {
    if (editingBranch.value) {
      await store.update(editingBranch.value.id, payload)
      notify(`Updated "${payload.name}".`)
    } else {
      await store.create(payload)
      notify(`Added new branch "${payload.name}".`)
    }
    modalOpen.value = false
  } catch (e) {
    saveError.value = errorMessage(e)
  }
}

async function toggleBranchTodayStatus(branch: GymBranch, currentlyOpen: boolean) {
  const today = todayIso()
  const otherHolidays = branch.holidaySchedule.filter((h) => h.date !== today)
  const nextHolidays = currentlyOpen
    ? [...otherHolidays, { date: today, name: 'Admin Temporary Closure', type: 'closed' as const }]
    : [...otherHolidays, { date: today, name: 'Admin Open Override', type: 'regular' as const }]

  try {
    await store.update(branch.id, { holidaySchedule: nextHolidays })
    notify(`${branch.name} marked ${currentlyOpen ? 'closed' : 'open'} for today.`, 'info')
  } catch (e) {
    notify(errorMessage(e), 'error')
  }
}
</script>

<template>
  <section class="overview">
    <div class="heading">
      <div>
        <p class="eyebrow">FACILITY NETWORK / OPERATIONS</p>
        <h2>Branch Overview</h2>
        <p>Manage connected facilities, operating schedules, amenities, and regional availability.</p>
      </div>
      <button class="primary-button" type="button" @click="openAddModal">＋ Add Branch</button>
    </div>

    <div class="metrics">
      <MetricCard
        label="Active Units"
        :value="openCount.toString()"
        detail="Currently operational"
        icon="▤"
        accent="green"
        :progress="activeRatio"
      />
      <MetricCard
        label="Inactive Units"
        :value="closedCount.toString()"
        detail="Closed or off-hours"
        icon="!"
        :progress="100 - activeRatio"
      />
      <MetricCard label="Employees" value="48" detail="Staff on roster" icon="▣" :progress="65" />
      <MetricCard
        label="Total Members"
        :value="(membersStore.members.length || 6).toString()"
        detail="Registered memberships"
        icon="♟"
        :progress="84"
      />
    </div>

    <div class="section-title">
      <span>▤</span>
      <h3>Branches &amp; Operational Schedules</h3>
    </div>

    <!-- Loading -->
    <div v-if="store.status === 'loading' || store.status === 'idle'" class="state" aria-busy="true">
      Loading branches…
    </div>

    <!-- Error -->
    <div v-else-if="store.status === 'error'" class="state state--error" role="alert">
      <strong>Could not load branches.</strong>
      <span>{{ store.error }}</span>
      <button class="primary-button" type="button" @click="store.fetchAll()">Try again</button>
    </div>

    <!-- Success -->
    <div v-else class="branch-grid">
      <article
        v-for="{ raw, view } in cards"
        :key="raw.id"
        class="branch-card"
        :class="{ 'branch-card--primary': raw.id === 1 }"
      >
        <div class="branch-card__content">
          <div class="branch-card__meta">
            <span class="branch-number">BRANCH {{ raw.id }} · {{ raw.badge }}</span>
            <span class="capacity-tag">{{ raw.capacityPercent }}% LOAD</span>
          </div>
          <h4>{{ raw.name }}</h4>
          <p class="branch-address">{{ raw.address }}</p>
          <div class="branch-image">
            <img :src="view.image" :alt="raw.name" />
          </div>
          <div class="hours">
            <span>REGULAR HOURS</span>
            <strong>{{ view.regular[0] }}</strong>
            <small>{{ view.regular[1] }}</small>
          </div>
          <div v-if="raw.amenities.length" class="card-amenities">
            <span v-for="amenity in raw.amenities.slice(0, 4)" :key="amenity.label" class="card-amenity">
              <i class="material-symbols-outlined">{{ amenity.icon }}</i>
              {{ amenity.label }}
            </span>
            <span v-if="raw.amenities.length > 4" class="card-amenity card-amenity--more">
              +{{ raw.amenities.length - 4 }}
            </span>
          </div>
        </div>

        <div class="branch-actions">
          <button
            class="open-status"
            :class="{ 'open-status--closed': !view.isOpen }"
            type="button"
            @click="toggleBranchTodayStatus(raw, view.isOpen)"
          >
            <i :class="{ closed: !view.isOpen }" />
            STATUS: {{ view.isOpen ? 'OPEN' : 'CLOSED' }}
          </button>
          <button class="edit-button" type="button" @click="openEditModal(raw)">✎ EDIT DATA</button>
        </div>
      </article>

      <article class="provision-card">
        <span class="provision-icon">＋</span>
        <h4>Provision New Station</h4>
        <p>Register a new gym branch with custom hours, holiday overrides, and facility amenities.</p>
        <button class="primary-button" type="button" @click="openAddModal">
          Configure Node {{ String(store.items.length + 1).padStart(2, '0') }} →
        </button>
      </article>
    </div>

    <AddBranchModal
      :open="modalOpen"
      :branch="editingBranch"
      :saving="store.saving"
      :server-error="saveError"
      @close="modalOpen = false"
      @save="saveBranch"
    />
    <ToastStack :toasts="toasts" />
  </section>
</template>

<style scoped>
.overview{color:#e5e5e5}.heading{display:flex;align-items:end;justify-content:space-between;gap:1rem;margin-bottom:1.5rem}.heading h2{margin:.4rem 0;color:#fff;font:700 2.5rem/1 Oswald,sans-serif;text-transform:uppercase}.heading p:last-child{margin:0;color:#999;font-size:.8rem}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem}
.primary-button{padding:.75rem 1.1rem;color:#fff;background:#e50914;border:1px solid #e50914;border-radius:.3rem;cursor:pointer;font-weight:700;text-transform:uppercase;transition:background .15s ease}.primary-button:hover{background:#c90812;border-color:#c90812}
.section-title{display:flex;align-items:center;gap:.6rem;margin-bottom:1rem}.section-title span{color:#e50914;font-size:1.4rem}.section-title h3{margin:0;color:#fff;font:700 1.35rem Oswald,sans-serif;text-transform:uppercase}
.state{display:flex;flex-direction:column;align-items:center;gap:.6rem;padding:2.5rem 1rem;background:#1c1c1c;border:1px solid #2f2f2f;border-radius:.75rem;color:#aaa;text-align:center}.state strong{color:#fff}.state--error strong{color:#ff6b72}
.branch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.branch-card,.provision-card{position:relative;display:flex;min-height:26rem;flex-direction:column;justify-content:space-between;overflow:hidden;padding:1.25rem;background:#1c1c1c;border:1px solid #2f2f2f;border-radius:.75rem}.branch-card--primary{border-top:3px solid #e50914}
.branch-card__meta{display:flex;align-items:center;justify-content:space-between;gap:.5rem}
.branch-number{color:#e76d72;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.capacity-tag{color:#999;font-size:.62rem;font-weight:700;letter-spacing:.08em}
.branch-card h4,.provision-card h4{margin:.35rem 0 .2rem;color:#fff;font:700 1.15rem Oswald,sans-serif;text-transform:uppercase}
.branch-address{margin:0;color:#999;font-size:.74rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.branch-image{height:8rem;margin:.75rem 0;overflow:hidden;background:#292929;border-radius:.3rem}.branch-image img{width:100%;height:100%;object-fit:cover}
.hours{display:grid;gap:.2rem;padding:.75rem;background:#0e0e0e;border-radius:.4rem}.hours span{color:#999;font-size:.62rem;letter-spacing:.08em}.hours strong{font-size:.8rem;color:#fff}.hours small{color:#888;font-size:.72rem}
.card-amenities{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.65rem}
.card-amenity{display:inline-flex;align-items:center;gap:.25rem;padding:.2rem .45rem;background:#272727;border-radius:.25rem;color:#d4d4d4;font:700 .62rem Oswald,sans-serif;letter-spacing:.04em;text-transform:uppercase}
.card-amenity i{color:#e50914;font-size:.8rem;font-style:normal}
.card-amenity--more{color:#ff6b72;background:#2f1416}
.branch-actions{display:flex;gap:.5rem;margin-top:1rem}.branch-actions button{flex:1;padding:.55rem .35rem;border-radius:.25rem;cursor:pointer;font-size:.65rem;font-weight:700}
.open-status{color:#4ade80;background:#22c55e18;border:1px solid #22c55e55}.open-status--closed{color:#ff6b72;background:#e509141f;border-color:#e5091466}.open-status i{display:inline-block;width:.4rem;height:.4rem;margin-right:.25rem;background:#4ade80;border-radius:50%}.open-status i.closed{background:#e50914}
.edit-button{color:#ddd;background:#ffffff0a;border:1px solid #ffffff20}.edit-button:hover{color:#fff;border-color:#666}
.provision-card{align-items:center;justify-content:center;text-align:center}.provision-icon{display:grid;width:3.5rem;height:3.5rem;place-items:center;margin-bottom:1rem;color:#ff6b72;background:#2c2c2c;border-radius:50%;font-size:2rem}.provision-card p{max-width:18rem;margin:0 0 1.25rem;color:#999;font-size:.8rem}
@media(max-width:1050px){.branch-grid{grid-template-columns:repeat(2,1fr)}.metrics{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.heading{align-items:flex-start;flex-direction:column}.branch-grid,.metrics{grid-template-columns:1fr}}
</style>
