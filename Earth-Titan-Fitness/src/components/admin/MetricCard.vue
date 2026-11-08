<script setup lang="ts">
defineProps<{
  label: string
  value: string
  detail: string
  icon: string
  accent?: 'red' | 'amber' | 'green'
  progress?: number
}>()
</script>

<template>
  <article class="metric-card" :class="`metric-card--${accent ?? 'red'}`">
    <div class="metric-card__top">
      <span>{{ label }}</span>
      <span class="metric-card__icon" aria-hidden="true">{{ icon }}</span>
    </div>
    <strong>{{ value }}</strong>
    <p>{{ detail }}</p>
    <div class="metric-card__bar"><span :style="{ width: `${progress ?? 100}%` }" /></div>
  </article>
</template>

<style scoped>
.metric-card {
  padding: 1.25rem;
  background: #1d1d1d;
  border: 1px solid #303030;
  border-radius: 0.75rem;
}

.metric-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #b7b7b7;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.metric-card__icon {
  font-size: 1.2rem;
}

.metric-card strong {
  display: block;
  margin-top: 0.75rem;
  color: #f3f3f3;
  font-family: Oswald, Impact, sans-serif;
  font-size: 2rem;
  line-height: 1;
}

.metric-card p {
  margin: 0.45rem 0 1rem;
  color: #969696;
  font-size: 0.8rem;
}

.metric-card__bar {
  height: 0.25rem;
  overflow: hidden;
  background: #353535;
  border-radius: 999px;
}

.metric-card__bar span {
  display: block;
  width: 100%;
  height: 100%;
  background: #e50914;
}

.metric-card--amber .metric-card__bar span { background: #eab308; }
.metric-card--green .metric-card__bar span { background: #22c55e; }
.metric-card--amber .metric-card__icon { color: #fbbf24; }
.metric-card--green .metric-card__icon { color: #4ade80; }
.metric-card--red .metric-card__icon { color: #ff6b72; }
</style>
