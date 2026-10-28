<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

type Role = 'member' | 'staff' | 'admin'

const roles: { key: Role; label: string; icon: string }[] = [
  { key: 'member', label: 'CUSTOMER', icon: 'person' },
  { key: 'staff', label: 'STAFF DESK', icon: 'badge' },
  { key: 'admin', label: 'COMMAND', icon: 'security' },
]

// Per-role text that changes when a tab is selected
const presets: Record<Role, { placeholder: string; btnText: string }> = {
  member: {
    placeholder: 'athlete@titanathletics.io',
    btnText: 'AUTHENTICATE & ENTER PORTAL',
  },
  staff: {
    placeholder: 'staff@titanathletics.io',
    btnText: 'UNLOCK STAFF TERMINAL',
  },
  admin: {
    placeholder: 'command@titanathletics.io',
    btnText: 'GRANT COMMAND ROOT ACCESS',
  },
}

const currentRole = ref<Role>('member')

const form = reactive({
  email: '',
  password: '',
  gymId: '',
  remember: true,
})

const showPassword = ref(false)
const showGymId = ref(false)
const isSubmitting = ref(false)
const granted = ref(false)

const status = reactive({ visible: false, text: '', icon: 'info' })

const emailPlaceholder = computed(() => presets[currentRole.value].placeholder)

const buttonLabel = computed(() => {
  if (isSubmitting.value) return 'VERIFYING CREDENTIAL CRYPTOGRAM...'
  if (granted.value) return 'ACCESS GRANTED'
  return presets[currentRole.value].btnText
})

function setRole(role: Role) {
  currentRole.value = role
  granted.value = false
}

function showStatus(text: string, icon = 'info') {
  status.text = text
  status.icon = icon
  status.visible = true
}

function handleAuthenticate() {
  if (isSubmitting.value) return
  isSubmitting.value = true
  granted.value = false
  showStatus('Routing SHA-256 signature to Node Cluster 01...', 'lock')

  // Fake delay: replace with a real API call later
  setTimeout(() => {
    isSubmitting.value = false
    granted.value = true
    showStatus(
      `Session validated! Welcome to Earth-Titan Portal (${form.email}). Redirecting...`,
      'verified_user',
    )
  }, 1400)
}

function forgotPassword() {
  alert('Reset link routed to active device phone / token.')
}

function joinFacility() {
  alert('Redirecting to Earth-Titan Membership Inquiries.')
}

function deskSupport() {
  alert('Help Desk Hotline: +1 (800) TITAN-CORE')
}
</script>

<template>
  <div
    class="bg-surface font-body-base text-body-base text-on-surface min-h-screen flex flex-col justify-center items-center pt-20"
  >
    <!-- Shared header -->
    <AppHeader />

    <main class="w-full flex-1 flex flex-col items-center justify-center p-space-md">
      <div class="flex flex-col w-full">
        <div
          class="w-full max-w-7xl mx-auto px-4 py-8 lg:py-12 flex flex-col items-center justify-center relative"
        >
          <!-- Background glows -->
          <div
            class="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary-container/10 blur-[130px] pointer-events-none rounded-full"
          ></div>
          <div
            class="absolute top-1/3 -right-24 w-80 h-80 bg-primary-container/5 blur-[100px] pointer-events-none rounded-full"
          ></div>

          <div class="w-full flex justify-center items-center relative z-10">
            <div
              class="w-full max-w-lg bg-surface-container-low rounded-xl shadow-2xl p-6 sm:p-10 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent"
              ></div>

              <!-- Brand -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div class="flex items-center space-x-2">
                    <span
                      class="material-symbols-outlined text-primary-container text-2xl"
                      style="font-variation-settings: 'FILL' 1"
                      >fitness_center</span
                    >
                    <span
                      class="font-headline-sm text-headline-sm uppercase text-on-surface tracking-wider"
                      >EARTH-TITAN FITNESS</span
                    >
                  </div>
                  <p class="font-label-caps text-label-caps text-secondary uppercase mt-0.5">
                    HIGH-PERFORMANCE ATHLETIC NETWORK
                  </p>
                </div>
              </div>

              <!-- Role tabs -->
              <div class="mb-6">
                <label class="block font-label-caps text-label-caps text-secondary uppercase mb-2"
                  >ACCESS CLEARANCE TIER</label
                >
                <div class="grid grid-cols-3 gap-2 bg-surface-container p-1 rounded-lg">
                  <button
                    v-for="r in roles"
                    :key="r.key"
                    type="button"
                    class="role-tab flex flex-col items-center justify-center py-2 px-2 rounded font-headline-sm text-xs sm:text-sm uppercase transition-all"
                    :class="
                      currentRole === r.key
                        ? 'bg-primary-container text-on-primary shadow-md'
                        : 'text-secondary hover:text-on-surface hover:bg-surface-container-high'
                    "
                    @click="setRole(r.key)"
                  >
                    <span class="material-symbols-outlined text-lg mb-0.5">{{ r.icon }}</span>
                    <span>{{ r.label }}</span>
                  </button>
                </div>
              </div>

              <!-- Form -->
              <form class="space-y-4" @submit.prevent="handleAuthenticate">
                <!-- Email -->
                <div class="space-y-1.5">
                  <label
                    class="block font-label-caps text-label-caps text-secondary uppercase"
                    for="email"
                    >EMAIL ADDRESS</label
                  >
                  <div class="relative flex items-center">
                    <span
                      class="material-symbols-outlined absolute left-3.5 text-secondary text-xl pointer-events-none"
                      >mail</span
                    >
                    <input
                      id="email"
                      v-model="form.email"
                      name="email"
                      type="email"
                      required
                      :placeholder="emailPlaceholder"
                      class="w-full bg-surface-container pl-11 pr-4 py-3 rounded font-body-base text-body-base text-on-surface placeholder:text-secondary/50 focus:outline-none focus:bg-surface-container-high transition-all"
                    />
                  </div>
                </div>

                <!-- Password -->
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between">
                    <label
                      class="block font-label-caps text-label-caps text-secondary uppercase"
                      for="password"
                      >PASSWORD</label
                    >
                    <a
                      class="font-label-caps text-label-caps text-primary hover:underline uppercase"
                      href="#reset"
                      @click.prevent="forgotPassword"
                      >FORGOT PASSCODE?</a
                    >
                  </div>
                  <div class="relative flex items-center">
                    <span
                      class="material-symbols-outlined absolute left-3.5 text-secondary text-xl pointer-events-none"
                      >lock</span
                    >
                    <input
                      id="password"
                      v-model="form.password"
                      name="password"
                      required
                      placeholder="••••••••••••"
                      :type="showPassword ? 'text' : 'password'"
                      class="w-full bg-surface-container pl-11 pr-11 py-3 rounded font-body-base text-body-base text-on-surface placeholder:text-secondary/50 focus:outline-none focus:bg-surface-container-high transition-all"
                    />
                    <button
                      type="button"
                      class="absolute right-3.5 text-secondary hover:text-on-surface transition-colors flex items-center"
                      @click="showPassword = !showPassword"
                    >
                      <span class="material-symbols-outlined text-xl">{{
                        showPassword ? 'visibility_off' : 'visibility'
                      }}</span>
                    </button>
                  </div>
                </div>

                <!-- Gym ID / OTP -->
                <div class="space-y-1.5">
                  <label
                    class="block font-label-caps text-label-caps text-secondary uppercase"
                    for="gymId"
                    >OTP / VERIFICATION CODE (GYM ID)</label
                  >
                  <div class="relative flex items-center">
                    <span
                      class="material-symbols-outlined absolute left-3.5 text-secondary text-xl pointer-events-none"
                      >badge</span
                    >
                    <input
                      id="gymId"
                      v-model="form.gymId"
                      name="gymId"
                      required
                      placeholder="••••••••"
                      :type="showGymId ? 'text' : 'password'"
                      class="w-full bg-surface-container pl-11 pr-11 py-3 rounded font-body-base text-body-base text-on-surface placeholder:text-secondary/50 focus:outline-none focus:bg-surface-container-high transition-all tracking-wider"
                    />
                    <button
                      type="button"
                      class="absolute right-3.5 text-secondary hover:text-on-surface transition-colors flex items-center"
                      @click="showGymId = !showGymId"
                    >
                      <span class="material-symbols-outlined text-xl">{{
                        showGymId ? 'visibility_off' : 'visibility'
                      }}</span>
                    </button>
                  </div>
                  <p class="font-body-sm text-xs text-secondary/80">
                    Enter your assigned Gym ID as your one-time verification passcode.
                  </p>
                </div>

                <!-- Remember -->
                <div class="flex items-center justify-between pt-1">
                  <label class="flex items-center space-x-2.5 cursor-pointer select-none">
                    <input
                      id="rememberTerminal"
                      v-model="form.remember"
                      type="checkbox"
                      class="w-4 h-4 rounded bg-surface-container accent-primary-container cursor-pointer"
                    />
                    <span class="font-body-sm text-body-sm text-secondary"
                      >Remember terminal node</span
                    >
                  </label>
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  class="w-full py-3.5 px-6 rounded bg-primary-container hover:bg-primary-container/90 active:scale-[0.99] text-on-primary font-headline-md text-headline-md tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-primary-container/20 transition-all cursor-pointer mt-2"
                  :class="isSubmitting ? 'opacity-80 pointer-events-none' : ''"
                >
                  <span class="material-symbols-outlined text-xl">lock_open</span>
                  <span>{{ buttonLabel }}</span>
                </button>
              </form>

              <!-- Status message -->
              <div
                v-if="status.visible"
                class="mt-4 p-3 rounded bg-surface-container-highest text-on-surface font-body-sm text-body-sm flex items-center space-x-2"
              >
                <span class="material-symbols-outlined text-primary-container text-lg">{{
                  status.icon
                }}</span>
                <span>{{ status.text }}</span>
              </div>

              <!-- Footer links -->
              <div
                class="pt-6 mt-6 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between text-secondary gap-3"
              >
                <div class="flex items-center space-x-2 text-xs font-body-sm">
                  <span>Need membership access?</span>
                  <a
                    class="text-on-surface font-body-bold hover:text-primary transition-colors underline"
                    href="#register"
                    @click.prevent="joinFacility"
                    >Join Earth-Titan Facility</a
                  >
                </div>
                <a
                  class="text-xs font-label-caps text-secondary hover:text-on-surface transition-colors uppercase"
                  href="#support"
                  @click.prevent="deskSupport"
                  >DESK SUPPORT // GATE HELP</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
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
