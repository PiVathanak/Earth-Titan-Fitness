<script setup lang="ts">
import type { AdminToast } from '@/types/admin'

defineProps<{ toasts: AdminToast[] }>()
</script>

<template>
  <div class="toast-stack" aria-live="polite">
    <div v-for="toast in toasts" :key="toast.id" :class="`toast toast--${toast.tone}`">{{ toast.message }}</div>
  </div>
</template>

<style scoped>
.toast-stack { position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 30; display: grid; gap: 0.6rem; }.toast { padding: 0.8rem 1rem; color: #fff; background: #292929; border-left: 3px solid #e50914; border-radius: 0.3rem; box-shadow: 0 0.5rem 1.5rem #0008; font-size: 0.8rem; }.toast--success { border-color: #22c55e; }
</style>
