<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useAuthStore } from '@/stores/auth'
import { membershipsApi } from '@/api/memberships'
import { errorMessage } from '@/api/http'
import { daysBetween, displayStatus, formatDate, todayIso } from '@/utils/membership'
import type { Membership } from '@/types/api'
import type {
  MemberProfile,
  MembershipCard,
  CycleChronometer,
  BranchAccess,
  StatusIndicator,
} from '@/types/membership'


// ---- Data for the logged-in customer (US-02), loaded from the API ----
const auth = useAuthStore()
const membership = ref<Membership | null>(null)
const loadState = ref<'loading' | 'error' | 'empty' | 'success'>('loading')
const loadError = ref<string | null>(null)

async function loadMembership() {
  loadState.value = 'loading'
  loadError.value = null
  try {
    // Customers can only see their own membership: query by the session's userId
    const [mine] = await membershipsApi.findByUser(auth.user!.id)
    membership.value = mine ?? null
    loadState.value = mine ? 'success' : 'empty'
  } catch (e) {
    loadError.value = errorMessage(e)
    loadState.value = 'error'
  }
}
onMounted(loadMembership)

const memberStatus = computed(() => (membership.value ? displayStatus(membership.value.expirationDate) : 'expired'))

const memberProfile = computed<MemberProfile>(() => ({
  name: auth.user?.name ?? 'Member',
  title: membership.value?.plan ?? 'No active plan',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuALId_VwxuSAiRS8McUZxZtfPtTqo4FaYOvEEBepSsyLDSxgVKztxCaKKeXNK3uCLnSj88Ej9CgosCkwHLJmQjNcUON7lRWDKpfmhRR6glOnhHTKl4KIp2hg_H2bKhHxB8-invOHOVPn-l3xCQFC0sclLhl-_dKZ1pfYU3mNnNDVOL4FwyZKPMFY7fpzSHrDm5SRIevIYdPC4xzEjXKSvocZGFvR8HYrvNTrmkI8_cNyAKybz9tsq6m',
  memberId: membership.value?.membershipCode ?? '—',
  homeBranch: 'Downtown Titanium Flagship',
  memberSince: formatDate(membership.value?.registrationDate ?? ''),
  validUntil: formatDate(membership.value?.expirationDate ?? ''),
  status: memberStatus.value,
}))

const membershipCard = computed<MembershipCard>(() => ({
  cardTitle: membership.value?.plan ?? 'Titan Black Card',
  cardSubtitle: 'Universal All-Access Passport',
  cardholderName: memberProfile.value.name,
  titanId: memberProfile.value.memberId,
  homeBranch: memberProfile.value.homeBranch,
  memberSince: memberProfile.value.memberSince,
  validUntil: memberProfile.value.validUntil,
  branchPrivilege: memberStatus.value === 'expired' ? '0 / 5 Locked' : '5 / 5 Unlocked',
  status: memberStatus.value,
}))

const cycleChronometer = computed<CycleChronometer>(() => {
  const m = membership.value
  if (!m) return { daysRemaining: 0, daysEnrolled: 0, totalDays: 0, progressPercent: 0 }
  const today = todayIso()
  const totalDays = Math.max(1, daysBetween(m.registrationDate, m.expirationDate))
  const daysEnrolled = Math.min(totalDays, Math.max(0, daysBetween(m.registrationDate, today)))
  return {
    daysRemaining: Math.max(0, daysBetween(today, m.expirationDate)),
    daysEnrolled,
    totalDays,
    progressPercent: Math.round((daysEnrolled / totalDays) * 100),
  }
})

const branches: BranchAccess[] = [
  {
    name: 'Downtown Titanium Flagship',
    type: 'primary',
    typeLabel: 'Primary Enrolled Facility',
    address: '450 Titanium Way, Suite 100 • Olympic Rig & Cryo Lab',
    capacityPercent: 48,
    isActive: true,
  },
  {
    name: 'Northside Heavy Iron',
    type: 'regional',
    typeLabel: 'Regional Campus',
    address: '882 Foundry Boulevard • Strongman Compound & Sled Runs',
    capacityPercent: 32,
    isActive: true,
  },
  {
    name: 'West End Conditioning Hub',
    type: 'regional',
    typeLabel: 'Regional Campus',
    address: '104 Spartan Avenue • High-Velocity Turf & Sprint Track',
    capacityPercent: 61,
    isActive: true,
  },
  {
    name: 'Metro Core High-Performance',
    type: 'regional',
    typeLabel: 'Regional Campus',
    address: '200 Central Plaza, B2 • Hyperbaric Recovery & Calisthenics',
    capacityPercent: 74,
    isActive: true,
  },
  {
    name: 'Southside Powerhouse Arena',
    type: 'regional',
    typeLabel: 'Regional Campus',
    address: '1904 Industrial Road • Monolifts, Calibrated Plates & Outdoor Strongman Field',
    capacityPercent: 29,
    isActive: true,
  },
]

const statusIndicators: StatusIndicator[] = [
  {
    color: 'emerald',
    label: 'Active & Unexpired',
    description:
      'Full 24/7 access granted to all 5 regional facilities, recovery labs, and lockers.',
    dotClass: 'bg-emerald-500',
    textClass: 'text-emerald-400',
  },
  {
    color: 'amber',
    label: 'Expiring Soon',
    description:
      'Triggered when within 14 days of term expiration. Courtesy renewal alerts active.',
    dotClass: 'bg-amber-500',
    textClass: 'text-amber-400',
  },
  {
    color: 'red',
    label: 'Expired',
    description:
      'Access temporarily suspended at all turnstiles until renewed online or at desk.',
    dotClass: 'bg-primary-container',
    textClass: 'text-primary-container',
  },
]

const activeBranchCount = computed(() => branches.filter((b) => b.isActive).length)

const showBarcodeModal = ref(false)

function openBarcodeModal() {
  showBarcodeModal.value = true
}

function closeBarcodeModal() {
  showBarcodeModal.value = false
}

function handleModalBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    closeBarcodeModal()
  }
}

function copyId() {
  navigator.clipboard.writeText(memberProfile.value.memberId)
}

</script>

<template>
  <div class="bg-surface font-body-base text-body-base text-on-surface min-h-screen flex flex-col">
    <!-- Shared header -->
    <AppHeader active="membership" />

    <main class="w-full pt-20 flex-1 bg-surface">
      <div class="flex flex-col w-full">
        <div
          class="max-w-7xl mx-auto w-full px-margin-mobile lg:px-margin py-space-lg space-y-space-xl"
        >
          <!-- Top Security & Scope Notification Bar -->
          <div
            class="w-full bg-surface-container-lowest p-space-md rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-sm"
          >
            <div class="flex items-center gap-space-sm">
              <span
                class="p-2 rounded-lg bg-surface-container-high text-primary flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-xl">shield_lock</span>
              </span>
              <div class="flex flex-col">
                <span class="font-label-caps text-label-caps uppercase text-on-surface tracking-wider"
                  >Authenticated Member Scope</span
                >
                <span class="font-body-sm text-body-sm text-secondary"
                  >You are securely viewing your private membership data. Administrative and
                  employee functions are restricted.</span
                >
              </div>
            </div>
            <div class="flex items-center gap-space-sm self-end md:self-auto">
              <span
                class="font-label-caps text-label-caps uppercase text-secondary bg-surface-container-high px-3 py-1 rounded-full"
                >Encrypted Session</span
              >
              <span
                class="font-label-caps text-label-caps uppercase text-on-surface bg-surface-container px-3 py-1 rounded-full"
                >TLS 1.3 Active</span
              >
            </div>
          </div>

          <!-- Member Welcome Header & Immediate Access Quick-Status -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div class="space-y-space-xs">
              <div class="flex items-center gap-space-sm">
                <span
                  class="font-label-caps text-label-caps uppercase text-primary-container tracking-widest"
                  >Client Access Console</span
                >
                <span class="w-1.5 h-1.5 rounded-full bg-surface-container-highest"></span>
                <span class="font-label-caps text-label-caps uppercase text-secondary"
                  >Verified Member</span
                >
              </div>
              <div class="flex items-baseline gap-space-md flex-wrap">
                <h1
                  class="font-headline-lg text-headline-lg uppercase text-on-surface tracking-tight"
                >
                  Welcome back, {{ memberProfile.name }}
                </h1>
                <span
                  class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded"
                  >ID: {{ memberProfile.memberId }}</span
                >
              </div>
              <p class="font-body-base text-body-base text-secondary max-w-2xl">
                Your Earth-Titan Black Passport provides unrestricted biometric check-in,
                Olympic-tier equipment access, and recovery labs across all regional facilities.
              </p>
            </div>
            <!-- Quick Action Desk -->
            <div class="flex items-center gap-space-sm">
              <button
                class="bg-primary-container text-on-primary-container hover:bg-inverse-primary px-space-md py-space-sm rounded-lg font-label-caps text-label-caps uppercase flex items-center gap-2 transition-all shadow-md"
                @click="openBarcodeModal"
              >
                <span class="material-symbols-outlined text-lg">qr_code_scanner</span>
                <span>Display Barcode</span>
              </button>
            </div>
          </div>

          <div
            v-if="loadState === 'error'"
            class="p-4 rounded-xl bg-red-950/50 border border-red-800 flex items-center justify-between gap-4"
            role="alert"
          >
            <span>Could not load your membership: {{ loadError }}</span>
            <button
              type="button"
              class="px-4 py-1.5 rounded bg-primary-container text-on-primary-container font-label-caps uppercase"
              @click="loadMembership"
            >
              Retry
            </button>
          </div>
          <div
            v-else-if="memberStatus === 'expired'"
            class="p-4 rounded-xl bg-red-950/50 border border-red-800 font-label-caps uppercase text-red-300"
            role="alert"
          >
            Membership expired on {{ memberProfile.validUntil }}. Renew at the front desk to restore branch access.
          </div>

          <!-- Grid: Digital Membership Card + Dynamic Countdown & Status Panel -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
            <!-- Digital Titan Card (7 Cols) -->
            <div
              class="lg:col-span-7 flex flex-col justify-between relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg md:p-space-xl shadow-xl min-h-[380px]"
            >
              <!-- Decorative Carbon Fiber & Brushed Accent Layer -->
              <div
                class="absolute inset-0 opacity-15 pointer-events-none bg-gradient-to-tr from-surface-container-lowest via-surface-container-highest to-surface-container-lowest"
                style="
                  background-image: radial-gradient(#353534 1px, transparent 1px);
                  background-size: 8px 8px;
                "
              ></div>
              <div
                class="absolute top-0 right-0 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
              ></div>
              <div
                class="absolute -bottom-10 left-1/4 w-96 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"
              ></div>
              <div
                class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-container via-surface-tint to-primary-container"
              ></div>

              <!-- Card Top Bar -->
              <div class="relative z-10 flex items-start justify-between gap-space-md">
                <div class="flex items-center gap-space-sm">
                  <div
                    class="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary-container font-headline-md text-headline-md"
                  >
                    ET
                  </div>
                  <div>
                    <div
                      class="font-headline-sm text-headline-sm uppercase tracking-wider text-on-surface leading-tight"
                    >
                      {{ membershipCard.cardTitle }}
                    </div>
                    <div
                      class="font-label-caps text-label-caps text-primary-container uppercase tracking-widest"
                    >
                      {{ membershipCard.cardSubtitle }}
                    </div>
                  </div>
                </div>
                <!-- Status Pill with pulsing dot -->
                <div
                  class="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full"
                >
                  <span class="relative flex h-2.5 w-2.5">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                    ></span>
                    <span
                      class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"
                    ></span>
                  </span>
                  <span
                    class="font-label-caps text-label-caps uppercase"
                    :class="
                      memberStatus === 'active'
                        ? 'text-emerald-400'
                        : memberStatus === 'expiring'
                          ? 'text-amber-400'
                          : 'text-red-400'
                    "
                    >{{ memberStatus }}</span
                  >
                </div>
              </div>

              <!-- Card Center Matrix Details -->
              <div
                class="relative z-10 my-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md"
              >
                <div class="space-y-space-xs">
                  <div class="mb-space-xs">
                    <span
                      class="font-label-caps text-label-caps uppercase text-secondary tracking-widest block"
                      >Cardholder Name</span
                    >
                    <div
                      class="font-headline-md text-headline-md uppercase text-on-surface tracking-wide font-bold"
                    >
                      {{ membershipCard.cardholderName }}
                    </div>
                  </div>
                  <span
                    class="font-label-caps text-label-caps uppercase text-secondary tracking-widest block"
                    >Titan Identifier</span
                  >
                  <div
                    class="font-stat-xl text-stat-xl tracking-tight text-on-surface uppercase font-bold flex items-center gap-3"
                  >
                    {{ membershipCard.titanId }}
                    <button
                      class="text-secondary hover:text-on-surface text-sm transition-colors flex items-center"
                      title="Copy ID"
                      @click="copyId"
                    >
                      <span class="material-symbols-outlined text-base">content_copy</span>
                    </button>
                  </div>
                  <p
                    class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 pt-1"
                  >
                    <span class="material-symbols-outlined text-base text-primary">location_city</span>
                    Home Base:
                    <strong class="text-on-surface font-body-bold">{{
                      membershipCard.homeBranch
                    }}</strong>
                  </p>
                </div>
                <!-- Micro Chip Graphic representation -->
                <div class="hidden sm:flex flex-col items-end opacity-85">
                  <div
                    class="w-14 h-10 rounded-lg bg-surface-container-highest p-1 flex flex-col justify-between"
                  >
                    <div class="flex justify-between items-center px-1">
                      <span class="w-2 h-1.5 bg-surface-tint/60 rounded-xs"></span>
                      <span class="w-2 h-1.5 bg-surface-tint/60 rounded-xs"></span>
                    </div>
                    <div class="h-2 w-full bg-surface-container-low rounded-xs"></div>
                    <div class="flex justify-between items-center px-1">
                      <span class="w-2 h-1.5 bg-surface-tint/60 rounded-xs"></span>
                      <span class="w-2 h-1.5 bg-surface-tint/60 rounded-xs"></span>
                    </div>
                  </div>
                  <span
                    class="font-label-sm text-label-sm uppercase text-secondary tracking-widest mt-1"
                    >Titan Biometric V2</span
                  >
                </div>
              </div>

              <!-- Card Bottom Ledger -->
              <div
                class="relative z-10 pt-space-md bg-surface-container-low/60 -mx-space-lg -mb-space-lg md:-mx-space-xl md:-mb-space-xl px-space-lg md:px-space-xl py-space-md flex flex-wrap items-center justify-between gap-space-sm backdrop-blur-sm"
              >
                <div>
                  <span class="font-label-caps text-label-caps uppercase text-secondary block"
                    >Member Since</span
                  >
                  <span class="font-body-bold text-body-bold text-on-surface">{{
                    membershipCard.memberSince
                  }}</span>
                </div>
                <div>
                  <span class="font-label-caps text-label-caps uppercase text-secondary block"
                    >Valid Until</span
                  >
                  <span class="font-body-bold text-body-bold text-on-surface">{{
                    membershipCard.validUntil
                  }}</span>
                </div>
                <div>
                  <span class="font-label-caps text-label-caps uppercase text-secondary block"
                    >Branch Privilege</span
                  >
                  <span class="font-body-bold text-body-bold text-primary-container">{{
                    membershipCard.branchPrivilege
                  }}</span>
                </div>
                <div>
                  <span class="font-label-caps text-label-caps uppercase text-secondary block"
                    >Status</span
                  >
                  <span
                    class="inline-flex items-center gap-1.5 font-label-caps text-label-caps uppercase text-emerald-400"
                  >
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>Active
                  </span>
                </div>
              </div>
            </div>

            <!-- Expiration Analytics & Validation Engine (5 Cols) -->
            <div
              class="lg:col-span-5 flex flex-col justify-between bg-surface-container p-space-lg rounded-xl shadow-lg space-y-space-md"
            >
              <div>
                <div class="flex items-center justify-between mb-space-sm">
                  <span
                    class="font-label-caps text-label-caps uppercase text-secondary tracking-widest"
                    >Cycle Chronometer</span
                  >
                </div>
                <div class="flex items-baseline justify-between mb-space-xs">
                  <span class="font-display-lg text-display-lg font-bold text-on-surface leading-none">{{
                    cycleChronometer.daysRemaining
                  }}</span>
                  <span class="font-headline-sm text-headline-sm uppercase text-secondary"
                    >Days Remaining</span
                  >
                </div>
                <!-- Capacity / Progress Track -->
                <div class="w-full bg-surface-container-lowest h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    class="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-500"
                    :style="{ width: cycleChronometer.progressPercent + '%' }"
                  ></div>
                </div>
                <div
                  class="flex justify-between items-center font-label-sm text-label-sm text-secondary mt-1"
                >
                  <span>Enrolled: {{ cycleChronometer.daysEnrolled }} days ago</span>
                  <span>Annual Term: {{ cycleChronometer.totalDays }} Days</span>
                </div>
              </div>

              <!-- Dynamic Expiration Notice Card -->
              <div class="bg-surface-container-low p-space-md rounded-lg space-y-space-xs">
                <div class="flex items-center gap-space-xs text-emerald-400">
                  <span class="material-symbols-outlined text-lg">verified</span>
                  <span class="font-label-caps text-label-caps uppercase tracking-wide"
                    >Status Verification Notice</span
                  >
                </div>
                <p class="font-body-sm text-body-sm text-on-surface">
                  Your membership is in good standing. Auto-verification is enabled across all
                  reception kiosks, turnstiles, and biometric locks.
                </p>
              </div>
            </div>
          </div>

          <!-- Bento Grid Section: Legend & Universal Passport & Instructions -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <!-- Multi-Branch Universal Passport (8 Cols) -->
            <div
              class="lg:col-span-8 bg-surface-container p-space-lg rounded-xl shadow-md space-y-space-md"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm"
              >
                <div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary-container"
                      >travel_explore</span
                    >
                    <h2
                      class="font-headline-md text-headline-md uppercase text-on-surface tracking-tight"
                    >
                      Multi-Branch Universal Passport
                    </h2>
                  </div>
                  <p class="font-body-sm text-body-sm text-secondary">
                    Your {{ memberProfile.memberId }} token delivers zero-friction, cross-facility
                    credential rights.
                  </p>
                </div>
                <span
                  class="font-label-caps text-label-caps uppercase px-3 py-1 bg-surface-container-lowest text-emerald-400 rounded-full w-max"
                >
                  {{ activeBranchCount }} of {{ branches.length }} Facilities Active
                </span>
              </div>

              <!-- Branch Matrix Checklist -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                <div
                  v-for="(branch, index) in branches"
                  :key="branch.name"
                  class="bg-surface-container-low p-space-md rounded-lg flex items-start justify-between hover:bg-surface-container-high transition-colors"
                  :class="{ 'md:col-span-2': index === branches.length - 1 }"
                >
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span
                        class="font-headline-sm text-headline-sm uppercase text-on-surface"
                        >{{ branch.name }}</span
                      >
                    </div>
                    <span
                      class="font-label-sm text-label-sm block"
                      :class="
                        branch.type === 'primary' ? 'text-primary' : 'text-secondary'
                      "
                      >{{ branch.typeLabel }}</span
                    >
                    <p class="font-body-sm text-body-sm text-secondary">
                      {{ branch.address }}
                    </p>
                    <div
                      class="flex items-center gap-2 pt-1 font-label-caps text-label-caps text-secondary uppercase"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Current Density: {{ branch.capacityPercent }}% Capacity</span>
                    </div>
                  </div>
                  <span class="p-1 rounded-full bg-surface-container text-emerald-400">
                    <span class="material-symbols-outlined text-xl">check_circle</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Status Rule Indicator Legend (4 Cols) -->
            <div class="lg:col-span-4 flex flex-col gap-space-lg">
              <div
                class="bg-surface-container p-space-lg rounded-xl shadow-md space-y-space-md"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="font-label-caps text-label-caps uppercase text-on-surface tracking-wider"
                  >
                    Status Rule Indicator Legend
                  </h3>
                  <span class="font-label-sm text-label-sm text-secondary">System Matrix</span>
                </div>
                <div class="space-y-space-sm font-body-sm text-body-sm">
                  <div
                    v-for="indicator in statusIndicators"
                    :key="indicator.label"
                    class="p-space-sm rounded-lg bg-surface-container-lowest flex items-start gap-space-sm"
                  >
                    <div
                      class="w-3.5 h-3.5 rounded-full mt-1 shrink-0 shadow-sm"
                      :class="indicator.dotClass"
                    ></div>
                    <div>
                      <span
                        class="font-headline-sm text-headline-sm uppercase block text-sm"
                        :class="indicator.textClass"
                        >{{ indicator.label }}</span
                      >
                      <span class="text-secondary text-xs">{{ indicator.description }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Barcode Modal -->
        <div
          v-if="showBarcodeModal"
          class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-space-md"
          @click="handleModalBackdrop"
        >
          <div
            class="bg-surface-container-low w-full max-w-md p-space-lg rounded-xl shadow-2xl relative space-y-space-md"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary-container">qr_code_2</span>
                <span class="font-headline-sm text-headline-sm uppercase text-on-surface"
                  >Kiosk Fast-Scan</span
                >
              </div>
              <button
                class="p-1 rounded bg-surface-container-high text-secondary hover:text-on-surface"
                @click="closeBarcodeModal"
              >
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div
              class="bg-surface-container-lowest p-space-lg rounded-xl flex flex-col items-center justify-center space-y-space-md"
            >
              <!-- SVG Code 128 Simulated Barcode -->
              <svg
                class="w-full h-24 text-on-surface"
                fill="currentColor"
                viewBox="0 0 280 80"
              >
                <rect height="70" width="4" x="10" y="5"></rect>
                <rect height="70" width="2" x="18" y="5"></rect>
                <rect height="70" width="6" x="24" y="5"></rect>
                <rect height="70" width="2" x="34" y="5"></rect>
                <rect height="70" width="4" x="40" y="5"></rect>
                <rect height="70" width="8" x="48" y="5"></rect>
                <rect height="70" width="2" x="60" y="5"></rect>
                <rect height="70" width="6" x="66" y="5"></rect>
                <rect height="70" width="4" x="76" y="5"></rect>
                <rect height="70" width="2" x="84" y="5"></rect>
                <rect height="70" width="8" x="92" y="5"></rect>
                <rect height="70" width="4" x="104" y="5"></rect>
                <rect height="70" width="2" x="112" y="5"></rect>
                <rect height="70" width="6" x="118" y="5"></rect>
                <rect height="70" width="2" x="128" y="5"></rect>
                <rect height="70" width="4" x="134" y="5"></rect>
                <rect height="70" width="8" x="142" y="5"></rect>
                <rect height="70" width="2" x="154" y="5"></rect>
                <rect height="70" width="4" x="160" y="5"></rect>
                <rect height="70" width="6" x="168" y="5"></rect>
                <rect height="70" width="2" x="178" y="5"></rect>
                <rect height="70" width="8" x="184" y="5"></rect>
                <rect height="70" width="4" x="196" y="5"></rect>
                <rect height="70" width="2" x="204" y="5"></rect>
                <rect height="70" width="6" x="210" y="5"></rect>
                <rect height="70" width="4" x="220" y="5"></rect>
                <rect height="70" width="8" x="228" y="5"></rect>
                <rect height="70" width="2" x="240" y="5"></rect>
                <rect height="70" width="6" x="246" y="5"></rect>
                <rect height="70" width="4" x="256" y="5"></rect>
                <rect height="70" width="6" x="264" y="5"></rect>
              </svg>
              <span class="font-stat-lg text-stat-lg tracking-widest text-on-surface">{{
                memberProfile.memberId
              }}</span>
            </div>
            <div class="text-center font-body-sm text-body-sm text-secondary">
              Hold screen 4 inches from optical sensor or present to desk cashier.
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
