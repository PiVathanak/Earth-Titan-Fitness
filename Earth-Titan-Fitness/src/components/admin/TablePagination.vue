<script setup lang="ts">
defineProps<{ page: number; totalPages: number; totalItems: number }>()

const emit = defineEmits<{ change: [page: number] }>()
</script>

<template>
  <footer class="pagination">
    <span>Showing page {{ page }} of {{ totalPages }} · {{ totalItems }} records</span>
    <div>
      <button type="button" :disabled="page === 1" @click="emit('change', page - 1)">Previous</button>
      <button v-for="number in totalPages" :key="number" type="button" :class="{ active: number === page }" @click="emit('change', number)">
        {{ number }}
      </button>
      <button type="button" :disabled="page === totalPages" @click="emit('change', page + 1)">Next</button>
    </div>
  </footer>
</template>

<style scoped>
.pagination { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.25rem; color: #929292; font-size: 0.75rem; }
.pagination div { display: flex; gap: 0.35rem; }
button { padding: 0.4rem 0.65rem; color: #aaa; background: #292929; border: 1px solid #383838; border-radius: 0.25rem; cursor: pointer; }
button:hover:not(:disabled), button.active { color: #fff; background: #e50914; border-color: #e50914; }
button:disabled { cursor: not-allowed; opacity: 0.4; }
@media (max-width: 650px) { .pagination { align-items: flex-start; flex-direction: column; } }
</style>
