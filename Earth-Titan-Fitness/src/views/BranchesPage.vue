<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useBranchesStore } from '@/stores/branches'
import { toBranchCard } from '@/utils/branchView'

// Images: left blank for now
const mapBg = ''

const store = useBranchesStore()
onMounted(() => store.fetchAll())

const searchQuery = ref('')
const filter = ref('all')

const filters = [
  { key: 'all', label: 'All Branches' },
  { key: 'open', label: 'Open Now' },
]

// Raw API data -> card view model (status, hours, holiday, load)
const branches = computed(() => store.items.map((b) => toBranchCard(b)))
const openCount = computed(() => branches.value.filter((b) => b.isOpen).length)
const pad = (n: number) => String(n).padStart(2, '0')

// Search by name/address, then apply the status filter
const filteredBranches = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  return branches.value.filter((b) => {
    const matchesQuery = !q || `${b.name} ${b.address}`.toLowerCase().includes(q)
    const matchesFilter = filter.value === 'all' || (filter.value === 'open' && b.isOpen)
    return matchesQuery && matchesFilter
  })
})
</script>

<template>
  <div class="bg-surface font-body-base text-body-base text-on-surface min-h-screen flex flex-col">
    <!-- Shared header -->
    <AppHeader active="our-branches" />

    <main class="w-full pt-20 flex-1 bg-surface">
      <div class="flex flex-col w-full">
        <!-- Page intro, search and filters -->
        <div class="w-full bg-surface-container-lowest px-margin-mobile lg:px-margin py-space-xl">
          <div class="max-w-7xl mx-auto flex flex-col gap-space-lg">
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div>
                <div class="flex items-center gap-space-xs mb-space-xs">
                  <span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <span
                    class="font-label-caps text-label-caps uppercase text-primary tracking-widest"
                    >Network Outposts &amp; Facilities</span
                  >
                </div>
                <h1
                  class="font-display-lg text-display-lg uppercase tracking-tight text-on-surface"
                >
                  Branch Operations
                </h1>
                <p class="font-body-base text-body-base text-secondary max-w-2xl mt-1">
                  Real-time status, architectural amenities, synchronized holiday schedules, and
                  live telemetry across all regional hubs.
                </p>
              </div>
              <div
                class="flex items-center gap-space-md self-start lg:self-auto bg-surface-container-low px-space-md py-space-sm rounded-lg"
              >
                <div class="flex flex-col text-right">
                  <span class="font-label-caps text-label-caps uppercase text-secondary"
                    >Active Nodes</span
                  >
                  <span class="font-stat-lg text-stat-lg text-on-surface leading-none mt-1"
                    >{{ pad(openCount) }} / {{ pad(branches.length) }}</span
                  >
                </div>
                <div class="w-px h-8 bg-surface-container-highest"></div>
                <div class="flex flex-col">
                  <span class="font-label-caps text-label-caps uppercase text-secondary"
                    >Sync Cycle</span
                  >
                  <span
                    class="font-label-caps text-label-caps uppercase text-primary-container leading-none mt-1 flex items-center gap-1"
                  >
                    <span class="material-symbols-outlined text-sm">sync</span> 60s Live
                  </span>
                </div>
              </div>
            </div>

            <div
              class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md bg-surface-container p-space-md rounded-xl shadow-lg"
            >
              <div class="relative flex-1">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-xl"
                  >search</span
                >
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search branch by name..."
                  class="w-full bg-surface-container-lowest text-on-surface placeholder:text-secondary pl-12 pr-4 py-3 rounded-lg text-body-base font-body-base focus:outline-none focus:ring-0 shadow-inner"
                />
              </div>
              <div class="flex items-center gap-space-xs overflow-x-auto pb-1 md:pb-0">
                <button
                  v-for="f in filters"
                  :key="f.key"
                  type="button"
                  class="px-space-md py-space-sm rounded-lg font-label-caps text-label-caps uppercase whitespace-nowrap transition-transform active:scale-95"
                  :class="
                    filter === f.key
                      ? 'bg-primary-container text-on-primary-container shadow-md'
                      : 'bg-surface-container-high text-secondary hover:text-on-surface'
                  "
                  @click="filter = f.key"
                >
                  {{ f.label }}
                </button>
              </div>
            </div>

            <div
              class="flex items-start gap-space-md bg-surface-container-low p-space-md rounded-lg shadow-sm"
            >
              <div
                class="p-2 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-2xl">info</span>
              </div>
              <div class="flex-1">
                <div
                  class="font-headline-sm text-headline-sm uppercase text-on-surface tracking-wide"
                >
                  Automated Operational Intelligence
                </div>
                <p class="font-body-sm text-body-sm text-secondary mt-0.5 leading-relaxed">
                  Operating status is automatically calculated from real-time local schedules.
                  Holiday overrides take priority over regular opening hours. Swipe biometric
                  credential cards or key fobs at external access stanchions for after-hours
                  ingress.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Branch cards -->
        <div class="max-w-7xl mx-auto w-full px-margin-mobile lg:px-margin py-space-xl">
          <!-- Loading state -->
          <div
            v-if="store.status === 'loading' || store.status === 'idle'"
            class="grid grid-cols-1 lg:grid-cols-2 gap-space-lg"
            aria-busy="true"
          >
            <div v-for="n in 4" :key="n" class="h-128 rounded-xl bg-surface-container animate-pulse"></div>
            <p class="lg:col-span-2 text-center text-secondary">Loading branches…</p>
          </div>

          <!-- Error state -->
          <div
            v-else-if="store.status === 'error'"
            class="p-space-lg rounded-xl bg-red-950/40 border border-red-900 text-center"
            role="alert"
          >
            <span class="material-symbols-outlined text-4xl text-error">cloud_off</span>
            <h2 class="font-headline-md text-headline-md uppercase mt-2">Could not load branches</h2>
            <p class="text-secondary mt-1">{{ store.error }}</p>
            <button
              type="button"
              class="mt-4 px-space-md py-2 rounded bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase"
              @click="store.fetchAll()"
            >
              Try again
            </button>
          </div>

          <!-- Empty state (API returned no branches) -->
          <p
            v-else-if="store.isEmpty"
            class="text-center font-body-base text-body-base text-secondary py-space-xl"
          >
            No branches have been added yet.
          </p>

          <!-- Success state -->
          <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
            <div
              v-for="b in filteredBranches"
              :key="b.id"
              class="flex flex-col bg-surface-container rounded-xl shadow-xl overflow-hidden group hover:bg-surface-container-high transition-colors"
            >
              <div class="relative h-60 w-full overflow-hidden">
                <div
                  class="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  :class="b.imageClass"
                  :style="b.image ? { backgroundImage: `url('${b.image}')` } : {}"
                ></div>
                <div
                  class="absolute inset-0 bg-linear-to-t from-surface-container via-surface-container/40 to-transparent"
                ></div>
                <div class="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    class="px-space-md py-1 rounded-full font-label-caps text-label-caps uppercase flex items-center gap-1.5 shadow-md backdrop-blur-md"
                    :class="b.statusClass"
                  >
                    <span class="w-2 h-2 rounded-full" :class="b.dotClass"></span>
                    {{ b.statusLabel }}
                  </span>
                </div>
                <div
                  class="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-1 rounded font-label-caps text-label-caps uppercase"
                  :class="b.badgeClass"
                >
                  {{ b.badge }}
                </div>
                <div class="absolute bottom-4 left-4 right-4">
                  <h2
                    class="font-headline-lg text-headline-lg uppercase text-on-surface tracking-tight leading-none drop-shadow"
                  >
                    {{ b.name }}
                  </h2>
                  <p class="font-body-sm text-body-sm text-secondary mt-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-base text-primary-container"
                      >location_on</span
                    >
                    {{ b.address }}
                  </p>
                </div>
              </div>

              <div class="p-space-lg flex-1 flex flex-col justify-between gap-space-lg">
                <div class="space-y-space-md">
                  <div
                    class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm bg-surface-container-low p-space-md rounded-lg"
                  >
                    <div>
                      <span class="font-label-caps text-label-caps uppercase text-secondary block"
                        >Regular Schedule</span
                      >
                      <span
                        class="font-body-sm-bold text-body-sm-bold text-on-surface block mt-1"
                        >{{ b.regular[0] }}</span
                      >
                      <span class="font-body-sm text-body-sm text-secondary">{{
                        b.regular[1]
                      }}</span>
                    </div>
                    <div>
                      <span
                        class="font-label-caps text-label-caps uppercase text-secondary block"
                        >{{ b.holidayLabel }}</span
                      >
                      <span
                        class="font-body-sm-bold text-body-sm-bold block mt-1"
                        :class="b.holidayTitleClass"
                        >{{ b.holidayTitle }}</span
                      >
                      <span class="font-body-sm text-body-sm text-secondary">{{
                        b.holidaySub
                      }}</span>
                    </div>
                  </div>

                  <div>
                    <span
                      class="font-label-caps text-label-caps uppercase text-secondary block mb-2"
                      >Facility Load &amp; Amenity Matrix</span
                    >
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="a in b.amenities"
                        :key="a.label"
                        class="px-space-sm py-1 rounded bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase flex items-center gap-1"
                      >
                        <span class="material-symbols-outlined text-xs text-primary-container">{{
                          a.icon
                        }}</span>
                        {{ a.label }}
                      </span>
                    </div>
                  </div>

                  <div class="bg-surface-container-lowest p-space-md rounded-lg">
                    <div class="flex items-center justify-between text-secondary mb-1.5">
                      <span
                        class="font-label-caps text-label-caps uppercase flex items-center gap-1"
                      >
                        <span class="material-symbols-outlined text-sm">{{ b.loadIcon }}</span> Live
                        Capacity Load
                      </span>
                      <span class="font-body-sm-bold text-body-sm-bold" :class="b.loadTextClass">{{
                        b.loadText
                      }}</span>
                    </div>
                    <div class="w-full h-2 rounded bg-surface-container-high overflow-hidden">
                      <div
                        class="h-full rounded transition-all duration-500"
                        :class="b.loadBarClass"
                        :style="{ width: b.loadWidth }"
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs">
                  <button
                    type="button"
                    class="w-full py-3 px-space-md rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase hover:bg-surface-bright transition-colors flex items-center justify-center gap-1"
                  >
                    <span class="material-symbols-outlined text-base">directions</span> Directions
                  </button>
                  <RouterLink
                    :to="{ name: 'branch-detail', params: { id: b.id } }"
                    class="w-full py-3 px-space-md rounded bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase hover:bg-primary-container/90 transition-colors flex items-center justify-center gap-1"
                  >
                    <span class="material-symbols-outlined text-base">info</span> View Details
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty state when search/filter matches nothing -->
          <p
            v-if="store.status === 'success' && !store.isEmpty && filteredBranches.length === 0"
            class="text-center font-body-base text-body-base text-secondary py-space-xl"
          >
            No branches match your search.
          </p>
        </div>

        <!-- Map + emergency dispatch -->
        <div class="w-full bg-surface-container-lowest py-space-xl px-margin-mobile lg:px-margin">
          <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-space-xl">
            <div
              class="lg:col-span-2 flex flex-col gap-space-md bg-surface-container p-space-lg rounded-xl shadow-xl"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                <div>
                  <span class="font-label-caps text-label-caps uppercase text-primary-container"
                    >Interactive Geography</span
                  >
                  <h3 class="font-headline-md text-headline-md uppercase text-on-surface">
                    Regional Tactical Map
                  </h3>
                </div>
                <span
                  class="font-label-caps text-label-caps uppercase text-secondary bg-surface-container-lowest px-space-sm py-1 rounded self-start sm:self-auto"
                >
                  4 Nodes Geocoded
                </span>
              </div>
              <div
                class="w-full h-80 rounded-lg bg-surface-container-high bg-cover bg-center relative overflow-hidden shadow-inner flex items-end p-space-md"
                :style="mapBg ? { backgroundImage: `url('${mapBg}')` } : {}"
              >
                <div
                  class="absolute inset-0 bg-linear-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"
                ></div>
                <div
                  class="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest/90 backdrop-blur-md p-space-md rounded-lg"
                >
                  <div class="flex items-center gap-space-sm">
                    <div class="p-2 rounded bg-primary-container text-on-primary-container">
                      <span class="material-symbols-outlined text-xl">satellite_alt</span>
                    </div>
                    <div>
                      <div class="font-label-caps text-label-caps uppercase text-on-surface">
                        GPS Central Grid: NY Metro
                      </div>
                      <div class="font-body-sm text-body-sm text-secondary">
                        All facilities within 8.4-mile tactical radius
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="px-space-md py-2 rounded bg-surface-container-high text-on-surface font-label-caps text-label-caps uppercase hover:bg-surface-bright transition-colors text-center"
                  >
                    Expand Tactical Grid
                  </button>
                </div>
              </div>
            </div>

            <div
              class="flex flex-col justify-between bg-surface-container p-space-lg rounded-xl shadow-xl"
            >
              <div class="space-y-space-md">
                <div>
                  <div class="flex items-center gap-space-xs mb-1">
                    <span class="material-symbols-outlined text-error text-xl">e911_emergency</span>
                    <span class="font-label-caps text-label-caps uppercase text-error"
                      >Emergency Response</span
                    >
                  </div>
                  <h3 class="font-headline-md text-headline-md uppercase text-on-surface">
                    Branch Manager Dispatch
                  </h3>
                  <p class="font-body-sm text-body-sm text-secondary mt-1">
                    For urgent equipment hazards, biometric locker failures, emergency facility
                    lockouts, or operational medical alerts.
                  </p>
                </div>
                <div class="bg-surface-container-low p-space-md rounded-lg space-y-space-sm">
                  <div class="flex items-center justify-between">
                    <span class="font-label-caps text-label-caps uppercase text-secondary"
                      >Regional Ops Chief</span
                    >
                    <span class="font-body-sm-bold text-body-sm-bold text-on-surface"
                      >Col. David Stone</span
                    >
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-label-caps text-label-caps uppercase text-secondary"
                      >Direct Secure Line</span
                    >
                    <span class="font-headline-sm text-headline-sm text-primary-container"
                      >(555) 019-9110</span
                    >
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-label-caps text-label-caps uppercase text-secondary"
                      >Radio Frequency</span
                    >
                    <span class="font-body-sm-bold text-body-sm-bold text-on-surface"
                      >Ch. 4 (TacNet 148.2)</span
                    >
                  </div>
                </div>
                <div class="p-space-md rounded-lg bg-red-950/30 flex items-start gap-space-sm">
                  <span class="material-symbols-outlined text-error text-xl shrink-0 mt-0.5"
                    >verified_user</span
                  >
                  <p class="font-body-sm text-body-sm text-secondary">
                    Duty Officer status is monitored 24 hours a day with an average response time of
                    under 3 minutes.
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="w-full mt-space-md py-3 px-space-md rounded bg-surface-container-high hover:bg-error hover:text-white text-on-surface font-label-caps text-label-caps uppercase transition-colors shadow flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-base">call</span>
                Initiate Immediate Manager Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style>
/* Global resets from the original <style> block */
html,
body {
  margin: 0;
  padding: 0;
}

body {
  overscroll-behavior: none;
}

main > :first-child {
  margin-top: 0 !important;
}

main > :last-child {
  margin-bottom: 0 !important;
}

/* Hide scrollbars */
::-webkit-scrollbar {
  display: none;
}
</style>
