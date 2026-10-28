<script setup>
import { computed, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

// Images: left blank for now
const logoUrl = '' // TODO: add logo image (footer)
const mapBg = '' // TODO: add map background image

const searchQuery = ref('')
const filter = ref('all')

const filters = [
  { key: 'all', label: 'All Branches' },
  { key: 'open', label: 'Open Now' },
]

const branches = [
  {
    name: 'Downtown Titanium Flagship',
    address: '108 Ironworks Blvd, Central Metro, NY 10001',
    image: '', // TODO: add image
    imageClass: '',
    tags: ['open', 'olympic'],
    statusLabel: 'OPEN NOW (Closes at 23:00)',
    statusClass: 'bg-emerald-950/90 text-emerald-400',
    dotClass: 'bg-emerald-400 animate-pulse',
    badge: 'HQ Node 01',
    badgeClass: 'text-secondary',
    regular: ['Mon-Fri: 05:00 - 23:00', 'Sat-Sun: 06:00 - 21:00'],
    holidayLabel: 'Holiday Schedule Status',
    holidayTitle: 'Regular Operation',
    holidayTitleClass: 'text-on-surface',
    holidaySub: 'Confirmed for Memorial Day',
    amenities: [
      { icon: 'fitness_center', label: 'Powerlifting Pods' },
      { icon: 'sports_gymnastics', label: 'Olympic Platforms' },
      { icon: 'ac_unit', label: 'Cold Plunge & Sauna' },
      { icon: 'sprint', label: 'Turf Sprint Track' },
    ],
    loadIcon: 'speed',
    loadText: '68% Capacity (312 Lifters)',
    loadTextClass: 'text-on-surface',
    loadBarClass: 'bg-emerald-500',
    loadWidth: '68%',
  },
  {
    name: 'Northside Heavy Athletics',
    address: '454 Olympic Way, North District, NY 10024',
    image: '', // TODO: add image
    imageClass: '',
    tags: ['open'],
    statusLabel: 'OPEN NOW (Closes at 22:00)',
    statusClass: 'bg-emerald-950/90 text-emerald-400',
    dotClass: 'bg-emerald-400 animate-pulse',
    badge: 'Branch 02',
    badgeClass: 'text-secondary',
    regular: ['Mon-Sun: 06:00 - 22:00', '7 Days Operating Window'],
    holidayLabel: 'Holiday Schedule Status',
    holidayTitle: 'Adjusted 08:00 - 18:00',
    holidayTitleClass: 'text-amber-400',
    holidaySub: 'Labor Day Special Protocol',
    amenities: [
      { icon: 'weight', label: 'Free Weights up to 150lbs' },
      { icon: 'precision_manufacturing', label: 'Hammer Strength Circuit' },
      { icon: 'chair', label: 'Recovery Lounge' },
    ],
    loadIcon: 'speed',
    loadText: '42% Capacity (145 Lifters)',
    loadTextClass: 'text-on-surface',
    loadBarClass: 'bg-emerald-500',
    loadWidth: '42%',
  },
  {
    name: 'West End Powerhouse',
    address: '780 Industrial Parkway, Westside, NY 10036',
    image: '', // TODO: add image
    imageClass: 'opacity-70',
    tags: ['closed'],
    statusLabel: 'CLOSED (Opens tomorrow at 05:00)',
    statusClass: 'bg-red-950/90 text-red-400',
    dotClass: 'bg-red-500',
    badge: 'Branch 03',
    badgeClass: 'text-secondary',
    regular: ['Mon-Fri: 05:00 - 23:00', 'Sat-Sun: 07:00 - 20:00'],
    holidayLabel: 'Holiday Notice',
    holidayTitle: 'Scheduled Maintenance',
    holidayTitleClass: 'text-error',
    holidaySub: 'Independence Day Full Lockdown',
    amenities: [
      { icon: 'sports_mma', label: 'Combat Sparring Ring' },
      { icon: 'hardware', label: 'Strongman Log & Stones' },
      { icon: 'shower', label: 'Hydrotherapy Suite' },
    ],
    loadIcon: 'lock_clock',
    loadText: 'Facility Offline',
    loadTextClass: 'text-secondary',
    loadBarClass: 'bg-secondary-container',
    loadWidth: '0%',
  },
  {
    name: 'Metro Core District',
    address: '89 Velocity Ave, Financial Quarter, NY 10005',
    image: '', // TODO: add image
    imageClass: '',
    tags: ['open', '247'],
    statusLabel: 'OPEN 24 HOURS',
    statusClass: 'bg-emerald-950/90 text-emerald-400',
    dotClass: 'bg-emerald-400 animate-pulse',
    badge: 'Autonomous 04',
    badgeClass: 'text-primary-container',
    regular: ['24/7 Continuous Access', 'Keyless RFID & App Pass'],
    holidayLabel: 'Holiday Schedule Status',
    holidayTitle: 'Always Open',
    holidayTitleClass: 'text-emerald-400',
    holidaySub: 'Zero Interruption Protocol',
    amenities: [
      { icon: 'qr_code_scanner', label: 'Keyless Access' },
      { icon: 'security', label: '24/7 CCTV & Guard' },
      { icon: 'bolt', label: 'Hi-Velocity Functional Rig' },
    ],
    loadIcon: 'speed',
    loadText: '28% Capacity (64 Lifters)',
    loadTextClass: 'text-on-surface',
    loadBarClass: 'bg-emerald-500',
    loadWidth: '28%',
  },
]

// Search by name/address, then apply the status filter
const filteredBranches = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  return branches.filter((b) => {
    const matchesQuery = !q || `${b.name} ${b.address}`.toLowerCase().includes(q)
    const matchesFilter = filter.value === 'all' || b.tags.includes(filter.value)
    return matchesQuery && matchesFilter
  })
})

const branchLogistics = [
  'Downtown Obsidian Center: (555) 019-2831',
  'Metro Heavy Iron Complex: (555) 019-4402',
  'Titan High-Performance Lab: (555) 019-9981',
  'Global Dispatch: dispatch@earthtitanfitness.com',
]

const complianceLinks = [
  'Facility Liability Protocol',
  'Member Biometric Agreement',
  'Safety Audit Manifest',
  'System Access Governance',
]
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
                    >04 / 04</span
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
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
            <div
              v-for="b in filteredBranches"
              :key="b.name"
              class="flex flex-col bg-surface-container rounded-xl shadow-xl overflow-hidden group hover:bg-surface-container-high transition-colors"
            >
              <div class="relative h-60 w-full overflow-hidden">
                <div
                  class="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                  :class="b.imageClass"
                  :style="b.image ? { backgroundImage: `url('${b.image}')` } : {}"
                ></div>
                <div
                  class="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/40 to-transparent"
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
                </div>
              </div>
            </div>
          </div>

          <!-- Empty state when search/filter matches nothing -->
          <p
            v-if="filteredBranches.length === 0"
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
                  class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"
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

    <!-- Footer -->
    <footer
      class="w-full bg-surface-container-lowest border-t border-surface-container-highest mt-auto"
    >
      <div class="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl mb-space-xl">
          <div class="space-y-space-md">
            <div class="flex items-center gap-space-sm group">
              <img
                v-if="logoUrl"
                alt="Earth-Titan Fitness Logo"
                class="h-8 w-auto object-contain"
                :src="logoUrl"
              />
              <span
                class="font-headline-sm text-headline-sm uppercase tracking-wider text-on-surface"
                >Earth-Titan</span
              >
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Elite strength infrastructure and facility operational system. Built for maximum human
              performance and unyielding athletic endurance.
            </p>
          </div>

          <div class="space-y-space-sm">
            <h3 class="font-label-caps text-label-caps uppercase text-on-surface tracking-wider">
              Operational Emergency
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              24/7 Facility Response Line:
            </p>
            <p class="font-stat-lg text-stat-lg text-primary-container tracking-tight">
              1-800-TITAN-911
            </p>
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              Duty Commander Hotline for Branch Outages and Medical Incident Lockdowns.
            </p>
          </div>

          <div class="space-y-space-sm">
            <h3 class="font-label-caps text-label-caps uppercase text-on-surface tracking-wider">
              Branch Logistics
            </h3>
            <ul class="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li v-for="line in branchLogistics" :key="line">{{ line }}</li>
            </ul>
          </div>

          <div class="space-y-space-sm">
            <h3 class="font-label-caps text-label-caps uppercase text-on-surface tracking-wider">
              Compliance &amp; Security
            </h3>
            <ul class="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li v-for="link in complianceLinks" :key="link">
                <a class="hover:text-on-surface transition-colors" href="#">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="pt-space-lg border-t border-surface-container-high flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left"
        >
          <span class="font-label-sm text-label-sm text-on-surface-variant"
            >© 2024 Earth-Titan Fitness Holdings LLC. Industrial Strength Platform. All rights
            reserved.</span
          >
        </div>
      </div>
    </footer>
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
