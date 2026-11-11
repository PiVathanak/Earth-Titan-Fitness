<script setup lang="ts">
import logoUrl from '@/images/logo.png'

const branchLogistics = [
  'Downtown Titanium Flagship',
  'Northside Ironworks',
  'East Harbor Performance',
  'West End Powerhouse',
]

const complianceLinks = ['Safety Protocols', 'Privacy & Data Security', 'Membership Terms']
</script>

<template>
  <footer
    class="w-full bg-surface-container-lowest border-t border-surface-container-highest mt-auto"
  >
    <div class="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl mb-space-xl">
        <div class="space-y-space-md">
          <div class="flex items-center gap-space-sm group">
            <img
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
</template>
