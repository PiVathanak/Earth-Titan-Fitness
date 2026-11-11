<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useBranchesStore } from '@/stores/branches'
import { holidayTypeLabel, toBranchCard } from '@/utils/branchView'
import { formatDate } from '@/utils/membership'

const props = defineProps<{ id: number }>()
const store = useBranchesStore()

// Re-fetch when the param changes (e.g. /branches/1 -> /branches/2)
watch(() => props.id, (id) => store.fetchOne(id), { immediate: true })

const branch = computed(() => (store.current ? toBranchCard(store.current) : null))
const notFound = computed(() => store.currentStatus === 'error' && store.currentError?.includes('not found'))
</script>

<template>
  <div class="bg-surface text-on-surface min-h-screen flex flex-col">
    <AppHeader active="our-branches" />

    <main class="flex-1 pt-20">
      <div class="max-w-5xl mx-auto w-full px-4 lg:px-8 py-10">
        <RouterLink
          to="/branches"
          class="inline-flex items-center gap-1 text-secondary hover:text-on-surface font-label-caps uppercase text-sm"
        >
          <span class="material-symbols-outlined text-base">arrow_back</span> All branches
        </RouterLink>

        <!-- Loading -->
        <div v-if="store.currentStatus === 'loading'" class="mt-8 animate-pulse space-y-4" aria-busy="true">
          <div class="h-72 rounded-xl bg-surface-container"></div>
          <div class="h-8 w-2/3 rounded bg-surface-container"></div>
          <div class="h-4 w-1/2 rounded bg-surface-container"></div>
          <p class="text-secondary">Loading branch…</p>
        </div>

        <!-- Error / not found -->
        <div
          v-else-if="store.currentStatus === 'error'"
          class="mt-8 p-6 rounded-xl bg-red-950/40 border border-red-900 text-center"
          role="alert"
        >
          <span class="material-symbols-outlined text-4xl text-error">error</span>
          <h1 class="font-headline-md text-2xl uppercase mt-2">
            {{ notFound ? `Branch #${id} does not exist` : 'Could not load this branch' }}
          </h1>
          <p class="text-secondary mt-2">{{ store.currentError }}</p>
          <button
            v-if="!notFound"
            type="button"
            class="mt-4 px-5 py-2 rounded bg-primary-container text-on-primary-container font-label-caps uppercase"
            @click="store.fetchOne(id)"
          >
            Try again
          </button>
        </div>

        <!-- Success -->
        <article v-else-if="branch" class="mt-8">
          <div class="relative h-72 rounded-xl overflow-hidden">
            <div
              class="bg-cover bg-center w-full h-full"
              :class="branch.imageClass"
              :style="branch.image ? { backgroundImage: `url('${branch.image}')` } : {}"
            ></div>
            <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
            <span
              class="absolute top-4 left-4 px-4 py-1 rounded-full font-label-caps uppercase flex items-center gap-1.5 text-sm"
              :class="branch.statusClass"
            >
              <span class="w-2 h-2 rounded-full" :class="branch.dotClass"></span>
              {{ branch.statusLabel }}
            </span>
            <div class="absolute bottom-4 left-4 right-4">
              <p class="font-label-caps uppercase text-sm" :class="branch.badgeClass">{{ branch.badge }}</p>
              <h1 class="font-headline-lg text-4xl uppercase leading-none">{{ branch.name }}</h1>
              <p class="text-secondary mt-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-base text-primary-container">location_on</span>
                {{ branch.address }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <section class="bg-surface-container p-5 rounded-xl">
              <h2 class="font-label-caps uppercase text-secondary text-sm">Today</h2>
              <p class="text-2xl font-bold mt-1">{{ branch.todayHours }}</p>
              <p class="text-secondary text-sm mt-1">{{ branch.loadText }}</p>
            </section>
            <section class="bg-surface-container p-5 rounded-xl">
              <h2 class="font-label-caps uppercase text-secondary text-sm">Regular schedule</h2>
              <p class="font-bold mt-1">{{ branch.regular[0] }}</p>
              <p class="text-secondary">{{ branch.regular[1] }}</p>
            </section>
            <section class="bg-surface-container p-5 rounded-xl">
              <h2 class="font-label-caps uppercase text-secondary text-sm">{{ branch.holidayLabel }}</h2>
              <p class="font-bold mt-1" :class="branch.holidayTitleClass">{{ branch.holidayTitle }}</p>
              <p class="text-secondary text-sm">{{ branch.holidaySub }}</p>
            </section>
          </div>

          <section class="bg-surface-container p-5 rounded-xl mt-4">
            <h2 class="font-label-caps uppercase text-secondary text-sm mb-3">Upcoming holiday schedule</h2>
            <p v-if="branch.upcomingHolidays.length === 0" class="text-secondary">
              No holiday changes scheduled. Regular hours apply.
            </p>
            <ul v-else class="divide-y divide-surface-container-highest">
              <li v-for="h in branch.upcomingHolidays" :key="h.date" class="flex justify-between py-2">
                <span>{{ formatDate(h.date) }} — {{ h.name }}</span>
                <span
                  :class="h.type === 'closed' ? 'text-error' : h.type === 'adjusted' ? 'text-amber-400' : 'text-emerald-400'"
                  >{{ holidayTypeLabel(h) }}</span
                >
              </li>
            </ul>
          </section>

          <section class="bg-surface-container p-5 rounded-xl mt-4">
            <h2 class="font-label-caps uppercase text-secondary text-sm mb-3">Amenities</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="a in branch.amenities"
                :key="a.label"
                class="px-3 py-1 rounded bg-surface-container-highest font-label-caps uppercase text-sm flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-sm text-primary-container">{{ a.icon }}</span>
                {{ a.label }}
              </span>
            </div>
          </section>
        </article>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

