<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
</script>

<template>
  <div class="bg-surface text-on-surface min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 flex items-center justify-center pt-20 px-4">
      <div class="text-center max-w-lg py-16">
        <p class="font-label-caps text-label-caps uppercase text-primary tracking-widest">
          Error 404 / Route not found
        </p>
        <h1 class="font-display-lg text-6xl sm:text-8xl uppercase text-primary-container mt-2">404</h1>
        <h2 class="font-headline-md text-2xl uppercase mt-2">This station is offline</h2>
        <p class="text-secondary mt-3">
          We couldn't find
          <code class="bg-surface-container px-2 py-0.5 rounded text-on-surface">{{ route.fullPath }}</code>.
          The page may have moved or the link is wrong.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <RouterLink
            to="/"
            class="px-6 py-3 rounded bg-primary-container text-on-primary-container font-label-caps uppercase"
            >Back to Home</RouterLink
          >
          <RouterLink
            to="/branches"
            class="px-6 py-3 rounded bg-surface-container-high text-on-surface font-label-caps uppercase"
            >View Branches</RouterLink
          >
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

