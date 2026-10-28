<script setup>
import { computed, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

// Images: left blank for now
const heroBg = '' // TODO: add hero background image
const logoUrl = '' // TODO: add logo image (footer)

// Branch filter: 'all' shows everything, 'open' shows only branches that are open now
const filter = ref('all')

const heroMetrics = [
  {
    label: 'Global Facilities',
    value: '5',
    suffix: {
      type: 'text',
      text: 'TIER',
      class: 'font-headline-sm text-headline-sm text-primary-container leading-none',
    },
    sub: 'Multi-Tier Branches',
  },
  {
    label: 'Uncompromised Access',
    value: '24/7',
    suffix: {
      type: 'icon',
      text: 'bolt',
      class: 'material-symbols-outlined text-primary-container text-xl',
    },
    sub: 'Elite Iron Access',
  },
  {
    label: 'Roster Volume',
    value: '10K+',
    suffix: {
      type: 'text',
      text: 'UNITS',
      class: 'font-label-caps text-label-caps text-primary-container',
    },
    sub: 'Active Titans On-Grid',
  },
  {
    label: 'Terms Protocol',
    value: 'ZERO',
    suffix: {
      type: 'icon',
      text: 'lock_open',
      class: 'material-symbols-outlined text-on-surface text-xl',
    },
    sub: 'Contract Locks & Fees',
  },
]

const pillars = [
  {
    num: '01',
    icon: 'shield',
    title: 'DISCIPLINE',
    text: 'No shortcuts, no gimmicks. A sanctuary dedicated to consistent mechanical strain, habit reinforcement, and internal fortitude.',
    tag: 'Rigorous Standard',
  },
  {
    num: '02',
    icon: 'precision_manufacturing',
    title: 'ENGINEERING',
    text: 'Calibrated Eleiko steel, custom-milled resistance levers, and biomechanically dialed angles designed to safeguard joint health.',
    tag: 'Precision Biomechanics',
  },
  {
    num: '03',
    icon: 'groups',
    title: 'COMMUNITY',
    text: 'A shared brotherhood and sisterhood of lifters, track athletes, and power specialists holding each other accountable every rep.',
    tag: 'Unified Culture',
  },
  {
    num: '04',
    icon: 'speed',
    title: 'PERFORMANCE',
    text: 'Measurable progression metrics, high-output conditioning zones, and post-session restorative thermal biology.',
    tag: 'Uncapped Output',
  },
]

const branches = [
  {
    name: 'Downtown Titanium Flagship',
    address: '108 Ironworks Blvd, Central Metro',
    src: '', // TODO: add image
    alt: 'Expansive multi-tier dark athletic gym with heavy dumbbell racks, powerlifting platforms, high industrial ceilings with exposed ductwork, and lifters training under dramatic red and warm spotlighting.',
    status: 'open',
    statusLabel: 'OPEN NOW',
    statusClass: 'text-emerald-400',
    dotClass: 'bg-emerald-500 animate-ping',
    tier: 'HQ Tier 1',
    hoursLabel: 'Operating Shift',
    hours: '05:00 - 23:00',
    hoursClass: 'text-on-surface',
    loadText: '78% DENSITY',
    loadTextClass: 'text-amber-400 font-bold',
    loadBarClass: 'bg-amber-400',
    loadWidth: '78%',
    tags: ['Eleiko Certified', 'Cryo Sauna', '12 Racks'],
  },
  {
    name: 'Northside Heavy Athletics',
    address: '454 Olympic Way, North District',
    src: '', // TODO: add image
    alt: 'Heavy weight room with row upon row of matte black Olympic lifting platforms, bumper plates lined up neatly, athlete chalking hands, dark stone concrete architecture.',
    status: 'open',
    statusLabel: 'OPEN NOW',
    statusClass: 'text-emerald-400',
    dotClass: 'bg-emerald-500 animate-ping',
    tier: 'Strength Lab',
    hoursLabel: 'Operating Shift',
    hours: '06:00 - 22:00',
    hoursClass: 'text-on-surface',
    loadText: '42% OPTIMAL',
    loadTextClass: 'text-emerald-400 font-bold',
    loadBarClass: 'bg-emerald-500',
    loadWidth: '42%',
    tags: ['Turf Sprint Track', 'Olympic Bars', 'Steam Lab'],
  },
  {
    name: 'Metro Core District',
    address: '89 Velocity Ave, Commercial Ring',
    src: '', // TODO: add image
    alt: 'High performance athletic training complex with rubber flooring, heavy red power racks, cable machines, dark architectural aesthetic and soft red rim backlighting.',
    status: 'modified',
    statusLabel: 'MODIFIED HOURS',
    statusClass: 'text-amber-400',
    dotClass: 'bg-amber-500',
    tier: 'Express Hub',
    hoursLabel: 'Holiday Override',
    hours: '07:00 - 18:00',
    hoursClass: 'text-amber-400 font-bold',
    loadText: '91% SURGE',
    loadTextClass: 'text-primary-container font-bold',
    loadBarClass: 'bg-primary-container',
    loadWidth: '91%',
    tags: ['Rapid Lockers', 'Recovery Booths', 'Heavy Dumbbells'],
  },
]

const visibleBranches = computed(() =>
  filter.value === 'open' ? branches.filter((b) => b.status === 'open') : branches,
)

const loadBreakdown = [
  { label: 'Free Weights & Cages', pct: '84%', barClass: 'bg-primary-container' },
  { label: 'Conditioning & Turf', pct: '35%', barClass: 'bg-emerald-500' },
  { label: 'Saunas & Cryo Vaults', pct: '62%', barClass: 'bg-amber-400' },
]

const benefits = [
  {
    icon: 'badge',
    title: 'Multi-Branch Universal Passport',
    text: 'Seamlessly swipe into any of our 5 performance centers using your digital NFC pass or high-security biometric badge.',
    tag: 'Instant Turnstile Auth',
  },
  {
    icon: 'fitness_center',
    title: 'Olympic Lifting Platforms',
    text: 'Full regulation oak platforms with competition bumpers, bearing barbells, chalk towers, and zero drop limitations.',
    tag: 'Raw Steel Allowed',
  },
  {
    icon: 'hot_tub',
    title: 'Dry Saunas & Recovery Lounge',
    text: 'Finnish dry cedar saunas running at 90°C, ice contrast plunges, and compression gear stations for accelerated muscular renewal.',
    tag: 'Daily Post-Session Therapy',
  },
  {
    icon: 'sports_martial_arts',
    title: 'Certified Strength Coaching',
    text: 'On-floor technical floor directors provide bar-path audits, deadlift cues, and custom periodization templates on request.',
    tag: 'Master Level Coaches',
  },
]

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
    <AppHeader active="home" />

    <main class="w-full pt-20 flex-1 bg-surface">
      <div class="flex flex-col w-full">
        <!-- Hero -->
        <section
          class="relative w-full -mt-20 pt-28 pb-20 lg:pb-28 overflow-hidden bg-surface-container-lowest"
        >
          <div
            class="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none scale-105"
            :style="heroBg ? { backgroundImage: `url('${heroBg}')` } : {}"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-surface-container-lowest/70 pointer-events-none"
          ></div>

          <div class="relative max-w-7xl mx-auto px-margin-mobile lg:px-margin z-10">
            <div class="flex flex-col max-w-4xl pt-6">
              <div
                class="inline-flex items-center gap-space-sm mb-space-md self-start bg-surface-container-high/80 backdrop-blur-md px-space-md py-1 rounded-full shadow-sm"
              >
                <span class="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
                <span
                  class="font-label-caps text-label-caps text-on-surface tracking-widest uppercase"
                  >High Performance Operations // 2025</span
                >
              </div>
              <h1
                class="font-display-lg text-display-lg text-on-surface uppercase tracking-tight leading-none mb-space-lg"
              >
                BUILT BY <span class="text-primary-container drop-shadow-sm">DISCIPLINE.</span
                ><br />
                POWERED BY <span class="text-on-surface">STRENGTH.</span>
              </h1>
              <p
                class="font-body-lg text-body-lg text-secondary max-w-2xl mb-space-xl leading-relaxed"
              >
                Your fitness journey starts here. Find your nearest Earth-Titan Fitness branch and
                train beyond your limits with raw Olympic steel, specialized biomechanics, and
                relentless athletic culture.
              </p>
              <div class="flex flex-wrap items-center gap-space-md">
                <a
                  class="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-lg font-headline-sm text-headline-sm uppercase text-on-primary-container bg-primary-container hover:bg-primary-container/90 transition-all shadow-xl shadow-primary-container/20 group"
                  href="#branches"
                >
                  <span>FIND A BRANCH</span>
                  <span
                    class="material-symbols-outlined transition-transform group-hover:translate-x-1"
                    >arrow_forward</span
                  >
                </a>
                <a
                  class="inline-flex items-center justify-center px-space-xl py-space-md rounded-lg font-headline-sm text-headline-sm uppercase text-on-surface bg-surface-container-high hover:bg-surface-container-highest transition-colors shadow-md"
                  href="#membership"
                >
                  VIEW MEMBERSHIP
                </a>
              </div>
            </div>

            <!-- Hero metrics -->
            <div class="mt-space-xl pt-space-lg">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-space-md">
                <div
                  v-for="m in heroMetrics"
                  :key="m.label"
                  class="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between"
                >
                  <span
                    class="font-label-caps text-label-caps text-secondary uppercase tracking-widest"
                    >{{ m.label }}</span
                  >
                  <div class="mt-space-sm flex items-baseline gap-space-xs">
                    <span class="font-stat-xl text-stat-xl text-on-surface leading-none">{{
                      m.value
                    }}</span>
                    <span :class="m.suffix.class">{{ m.suffix.text }}</span>
                  </div>
                  <p class="font-body-sm text-body-sm text-secondary mt-1">{{ m.sub }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Brand pillars -->
        <section class="py-space-xl bg-surface">
          <div class="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
              <div>
                <span
                  class="font-label-caps text-label-caps text-primary-container uppercase tracking-widest"
                  >Core Foundational Pillars</span
                >
                <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase mt-space-xs">
                  Engineered For Pure Performance
                </h2>
              </div>
              <p class="font-body-sm text-body-sm text-secondary max-w-md mt-space-sm md:mt-0">
                Earth-Titan removes unnecessary gym distractions, replacing commercial fitness fluff
                with high-output mechanical infrastructure.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
              <div
                v-for="p in pillars"
                :key="p.num"
                class="bg-surface-container-low p-space-lg rounded-xl shadow-md flex flex-col justify-between group hover:bg-surface-container transition-colors"
              >
                <div>
                  <div
                    class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container mb-space-md shadow-sm"
                  >
                    <span class="material-symbols-outlined text-2xl">{{ p.icon }}</span>
                  </div>
                  <span
                    class="font-label-caps text-label-caps text-secondary tracking-widest uppercase"
                    >{{ p.num }} / PILLAR</span
                  >
                  <h3
                    class="font-headline-md text-headline-md text-on-surface uppercase mt-space-xs mb-space-xs"
                  >
                    {{ p.title }}
                  </h3>
                  <p class="font-body-sm text-body-sm text-secondary leading-relaxed">
                    {{ p.text }}
                  </p>
                </div>
                <div
                  class="mt-space-lg pt-space-sm flex items-center gap-space-xs text-primary-container font-label-caps text-label-caps uppercase"
                >
                  <span>{{ p.tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Branches -->
        <section id="branches" class="py-space-xl bg-surface-container-lowest">
          <div class="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
            <div
              class="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-md"
            >
              <div>
                <div class="inline-flex items-center gap-space-xs mb-1">
                  <span class="material-symbols-outlined text-primary-container text-base"
                    >location_on</span
                  >
                  <span
                    class="font-label-caps text-label-caps text-primary-container uppercase tracking-wider"
                    >Branch Network Roster</span
                  >
                </div>
                <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase">
                  Earth-Titan Key Branches
                </h2>
              </div>
              <div
                class="flex items-center gap-space-sm bg-surface-container-low p-1.5 rounded-lg shadow-sm"
              >
                <span class="font-label-caps text-label-caps text-secondary uppercase px-space-xs"
                  >Filter Status:</span
                >
                <button
                  type="button"
                  class="px-space-md py-1 rounded font-label-caps text-label-caps uppercase transition-colors"
                  :class="
                    filter === 'all'
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'text-secondary hover:text-on-surface'
                  "
                  @click="filter = 'all'"
                >
                  All (5)
                </button>
                <button
                  type="button"
                  class="px-space-md py-1 rounded font-label-caps text-label-caps uppercase transition-colors"
                  :class="
                    filter === 'open'
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'text-secondary hover:text-on-surface'
                  "
                  @click="filter = 'open'"
                >
                  Active Open (4)
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              <article
                v-for="b in visibleBranches"
                :key="b.name"
                class="bg-surface-container rounded-xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300"
              >
                <div class="relative h-56 w-full overflow-hidden bg-surface-container-high">
                  <img
                    v-if="b.src"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    :data-alt="b.alt"
                    :src="b.src"
                    :alt="b.alt"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent"
                  ></div>
                  <div class="absolute top-space-md left-space-md">
                    <span
                      class="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md"
                    >
                      <span class="w-2 h-2 rounded-full" :class="b.dotClass"></span>
                      <span
                        class="font-label-caps text-label-caps uppercase tracking-wider"
                        :class="b.statusClass"
                        >{{ b.statusLabel }}</span
                      >
                    </span>
                  </div>
                  <div class="absolute top-space-md right-space-md">
                    <span
                      class="font-label-caps text-label-caps text-on-surface uppercase px-space-sm py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md"
                      >{{ b.tier }}</span
                    >
                  </div>
                </div>

                <div class="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      class="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs"
                    >
                      {{ b.name }}
                    </h3>
                    <p
                      class="font-body-sm text-body-sm text-secondary flex items-center gap-space-xs mb-space-md"
                    >
                      <span class="material-symbols-outlined text-primary-container text-base"
                        >pin_drop</span
                      >
                      <span>{{ b.address }}</span>
                    </p>
                    <div
                      class="bg-surface-container-low p-space-md rounded-lg mb-space-md shadow-inner"
                    >
                      <div
                        class="flex items-center justify-between text-secondary font-label-caps text-label-caps uppercase mb-1"
                      >
                        <span>{{ b.hoursLabel }}</span>
                        <span :class="b.hoursClass">{{ b.hours }}</span>
                      </div>
                      <div
                        class="flex items-center justify-between text-secondary font-label-caps text-label-caps uppercase mb-space-sm"
                      >
                        <span>Peak Hours Meter</span>
                        <span :class="b.loadTextClass">{{ b.loadText }}</span>
                      </div>
                      <div
                        class="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden"
                      >
                        <div
                          class="h-full rounded-full"
                          :class="b.loadBarClass"
                          :style="{ width: b.loadWidth }"
                        ></div>
                      </div>
                    </div>
                    <div class="flex flex-wrap gap-space-xs mb-space-lg">
                      <span
                        v-for="tag in b.tags"
                        :key="tag"
                        class="font-label-sm text-label-sm bg-surface-container-high text-secondary px-space-sm py-0.5 rounded"
                        >{{ tag }}</span
                      >
                    </div>
                  </div>
                  <div class="pt-space-md bg-surface-container">
                    <button
                      type="button"
                      class="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container font-headline-sm text-headline-sm uppercase transition-colors flex items-center justify-center gap-space-xs shadow-md"
                    >
                      <span>View Branch Details</span>
                      <span class="material-symbols-outlined text-lg">chevron_right</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>

            <!-- Network ribbon -->
            <div
              class="mt-space-lg p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md shadow-sm"
            >
              <div class="flex items-center gap-space-sm">
                <span class="material-symbols-outlined text-primary-container">sync_alt</span>
                <span class="font-body-sm text-body-sm text-on-surface"
                  >Universal Keycard Live: All active Earth-Titan credentials open turnstiles across
                  all 5 facilities without reassignment.</span
                >
              </div>
              <a
                class="font-label-caps text-label-caps uppercase text-primary-container hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
                data-path="our-branches"
                href="#"
              >
                <span>Explore All 5 Branches &amp; Maps</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        <!-- Congestion telemetry -->
        <section class="py-space-xl bg-surface">
          <div class="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
            <div
              class="bg-surface-container p-space-lg lg:p-space-xl rounded-xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-xl"
            >
              <div class="max-w-xl">
                <div class="inline-flex items-center gap-space-xs mb-space-xs">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span
                    class="font-label-caps text-label-caps text-emerald-400 uppercase tracking-wider"
                    >Live System Feed</span
                  >
                </div>
                <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase mb-space-sm">
                  Titan Congestion Telemetry
                </h2>
                <p class="font-body-base text-body-base text-secondary mb-space-md">
                  Our real-time sensor network aggregates platform utilization, cable station
                  queues, and sauna occupancy. Check branch velocity before stepping into the arena.
                </p>
                <div
                  class="flex items-center gap-space-xl text-on-surface font-label-caps text-label-caps uppercase"
                >
                  <div>
                    <span class="block text-secondary text-label-sm">Optimal Window</span>
                    <span class="text-on-surface font-stat-lg text-stat-lg">11:30 - 14:00</span>
                  </div>
                  <div>
                    <span class="block text-secondary text-label-sm">Peak Inflow</span>
                    <span class="text-primary-container font-stat-lg text-stat-lg"
                      >17:30 - 20:00</span
                    >
                  </div>
                </div>
              </div>

              <div
                class="w-full lg:w-96 bg-surface-container-low p-space-md rounded-xl shadow-inner"
              >
                <div class="flex items-center justify-between pb-space-sm mb-space-sm">
                  <span class="font-headline-sm text-headline-sm uppercase text-on-surface"
                    >Facility Load Breakdown</span
                  >
                  <span class="font-label-caps text-label-caps text-emerald-400 uppercase"
                    >Live Ping</span
                  >
                </div>
                <div class="space-y-space-md">
                  <div v-for="row in loadBreakdown" :key="row.label">
                    <div
                      class="flex justify-between font-label-caps text-label-caps uppercase text-secondary mb-1"
                    >
                      <span>{{ row.label }}</span>
                      <span class="text-on-surface">{{ row.pct }} Capacity</span>
                    </div>
                    <div class="w-full h-1.5 rounded-full bg-surface-container-highest">
                      <div
                        class="h-full rounded-full"
                        :class="row.barClass"
                        :style="{ width: row.pct }"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="mt-space-md pt-space-sm text-center">
                  <span class="font-label-sm text-label-sm text-secondary"
                    >Updated 48 seconds ago via Turnstile Matrix</span
                  >
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Membership -->
        <section id="membership" class="py-space-xl bg-surface-container-lowest">
          <div class="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
            <div
              class="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md"
            >
              <div>
                <span
                  class="font-label-caps text-label-caps text-primary-container uppercase tracking-widest"
                  >Universal Titan Access</span
                >
                <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase mt-space-xs">
                  Pure Privileges. Zero Friction.
                </h2>
              </div>
              <p class="font-body-base text-body-base text-secondary max-w-md">
                A single membership tier provides unencumbered clearance to all facilities, recovery
                amenities, and lifting sanctuaries.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
              <div
                v-for="f in benefits"
                :key="f.title"
                class="bg-surface-container p-space-lg rounded-xl shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div
                    class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container mb-space-md"
                  >
                    <span class="material-symbols-outlined text-2xl">{{ f.icon }}</span>
                  </div>
                  <h3
                    class="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-xs"
                  >
                    {{ f.title }}
                  </h3>
                  <p class="font-body-sm text-body-sm text-secondary leading-relaxed">
                    {{ f.text }}
                  </p>
                </div>
                <div class="mt-space-md pt-space-sm">
                  <span class="font-label-caps text-label-caps text-primary-container uppercase">{{
                    f.tag
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Membership status banner -->
            <div
              class="bg-surface-container p-space-lg md:p-space-xl rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-lg relative overflow-hidden"
            >
              <div
                class="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-on-surface select-none"
              >
                <span class="material-symbols-outlined text-[180px]">fingerprint</span>
              </div>
              <div class="space-y-space-xs z-10 text-center md:text-left">
                <span
                  class="font-label-caps text-label-caps text-primary-container uppercase tracking-wider"
                  >Lifter Account Matrix</span
                >
                <h3 class="font-headline-md text-headline-md uppercase text-on-surface">
                  Already Part of the Earth-Titan Vanguard?
                </h3>
                <p class="font-body-sm text-body-sm text-secondary max-w-xl">
                  Access your universal portal to verify current billing status, active check-in
                  keycards, and manage your locker assignments without front desk queues.
                </p>
              </div>
              <div
                class="z-10 w-full md:w-auto flex flex-col sm:flex-row items-center gap-space-sm"
              >
                <a
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md rounded-lg font-headline-sm text-headline-sm uppercase text-on-primary-container bg-primary-container hover:bg-primary-container/90 transition-all shadow-lg shadow-primary-container/25"
                  data-path="my-membership"
                  href="#"
                >
                  <span class="material-symbols-outlined text-xl">qr_code_scanner</span>
                  <span>CHECK YOUR MEMBERSHIP STATUS</span>
                </a>
              </div>
            </div>
          </div>
        </section>
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
