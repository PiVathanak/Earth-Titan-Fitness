<script setup lang="ts">
// "active" decides which nav item is highlighted, e.g. <AppHeader active="about" />
defineProps<{ active?: string }>()

const logoUrl = '' // TODO: add logo image

const navLinks = [
  { label: 'Home', path: 'home', href: '#' },
  { label: 'About', path: 'about', href: '#about' },
  { label: 'Our Branches', path: 'our-branches', href: '#branches' },
  { label: 'Supplements', path: 'supplements', href: '#supplements' },
  { label: 'Food & Beverages', path: 'food-and-beverages', href: '#food-beverages' },
  { label: 'Membership', path: 'membership', href: '#membership', locked: true },
]
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container-highest"
  >
    <div
      class="h-20 w-full max-w-7xl mx-auto px-margin flex items-center justify-between gap-space-md"
    >
      <div class="flex items-center gap-space-lg">
        <a class="flex items-center gap-space-sm group" data-path="public-home" href="#">
          <img
            v-if="logoUrl"
            alt="Earth-Titan Fitness Logo"
            class="h-8 w-auto object-contain"
            :src="logoUrl"
          />
        </a>
        <nav class="hidden lg:flex items-center gap-space-xs">
          <a
            v-for="link in navLinks"
            :key="link.path"
            :href="link.href"
            :data-path="link.path"
            class="px-space-md py-space-sm rounded-lg font-label-caps text-label-caps uppercase transition-colors hover:text-on-surface hover:bg-surface-container"
            :class="[
              active === link.path
                ? 'bg-primary-container text-on-primary-container font-body-bold'
                : 'text-on-surface-variant',
              link.locked ? 'inline-flex items-center gap-1' : '',
            ]"
          >
            <span>{{ link.label }}</span>
            <span v-if="link.locked" class="material-symbols-outlined text-sm text-secondary"
              >lock</span
            >
          </a>
        </nav>
      </div>
      <div class="flex items-center gap-space-md">
        <a
          class="inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-lg font-headline-sm text-headline-sm uppercase text-on-primary-container bg-primary-container hover:bg-primary-container/90 transition-all shadow-md shadow-primary-container/20"
          data-path="login"
          href="#"
        >
          <span class="material-symbols-outlined text-lg">login</span>
          <span>Log In</span>
        </a>
      </div>
    </div>
  </header>
</template>
