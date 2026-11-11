<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { homeForRole, useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types/api'

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
const granted = ref(false)

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const isSubmitting = computed(() => auth.loading)

// Login tab -> role stored in db.json
const roleMap: Record<Role, UserRole> = { member: 'customer', staff: 'employee', admin: 'admin' }

const status = reactive({ visible: false, text: '', icon: 'info', isError: false })

// ---- Validation: one message per field, shown under the input ----
type Field = 'email' | 'password' | 'gymId'
const touched = reactive<Record<Field, boolean>>({ email: false, password: false, gymId: false })
const submitted = ref(false)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const errors = computed<Record<Field, string>>(() => ({
  email: !form.email.trim()
    ? 'Email address is required.'
    : !EMAIL_RE.test(form.email.trim())
      ? 'Enter a valid email, e.g. athlete@titanathletics.io.'
      : '',
  password: !form.password
    ? 'Password is required.'
    : form.password.length < 6
      ? 'Password must be at least 6 characters.'
      : '',
  gymId: !isCustomer.value
    ? ''
    : !form.gymId.trim()
      ? 'Gym ID is required for customers.'
      : !/^ETF-\d{5}$/i.test(form.gymId.trim())
        ? 'Gym ID must look like ETF-12345.'
        : '',
}))
const showError = (field: Field) => (touched[field] || submitted.value) && errors.value[field]
const isValid = computed(() => Object.values(errors.value).every((m) => !m))

const emailPlaceholder = computed(() => presets[currentRole.value].placeholder)
const isCustomer = computed(() => currentRole.value === 'member')

const buttonLabel = computed(() => {
  if (isSubmitting.value) return 'VERIFYING CREDENTIAL CRYPTOGRAM...'
  if (granted.value) return 'ACCESS GRANTED'
  return presets[currentRole.value].btnText
})

function setRole(role: Role) {
  currentRole.value = role
  granted.value = false
  status.visible = false
  if (role !== 'member') {
    form.gymId = ''
  }
}

function showStatus(text: string, icon = 'info', isError = false) {
  status.text = text
  status.icon = icon
  status.isError = isError
  status.visible = true
}

async function handleAuthenticate() {
  if (isSubmitting.value) return
  submitted.value = true
  granted.value = false
  if (!isValid.value) {
    showStatus('Please fix the highlighted fields.', 'error', true)
    return
  }
  showStatus('Routing SHA-256 signature to Node Cluster 01...', 'lock')

  try {
    const user = await auth.login(form.email, form.password, roleMap[currentRole.value], form.gymId)
    granted.value = true
    showStatus(`Session validated! Welcome, ${user.name}. Redirecting...`, 'verified_user')
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : null
    router.push(redirect ?? homeForRole[user.role])
  } catch {
    showStatus(auth.error ?? 'Login failed.', 'error', true)
  }
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
            class="absolute -top-24 left-1/2 -translate-x-1/2 w-180 h-90 bg-primary-container/10 blur-[130px] pointer-events-none rounded-full"
          ></div>
          <div
            class="absolute top-1/3 -right-24 w-80 h-80 bg-primary-container/5 blur-[100px] pointer-events-none rounded-full"
          ></div>

          <div class="w-full flex justify-center items-center relative z-10">
            <div
              class="w-full max-w-lg bg-surface-container-low rounded-xl shadow-2xl p-6 sm:p-10 relative overflow-hidden"
            >
              <div
                class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary-container to-transparent"
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
              <form class="space-y-4" novalidate @submit.prevent="handleAuthenticate">
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
                      autocomplete="email"
                      :placeholder="emailPlaceholder"
                      :aria-invalid="!!showError('email')"
                      aria-describedby="email-error"
                      class="w-full bg-surface-container pl-11 pr-4 py-3 rounded font-body-base text-body-base text-on-surface placeholder:text-secondary/50 focus:outline-none focus:bg-surface-container-high transition-all"
                      :class="showError('email') ? 'ring-1 ring-error' : ''"
                      @blur="touched.email = true"
                    />
                  </div>
                  <p v-if="showError('email')" id="email-error" class="text-xs text-error">
                    {{ errors.email }}
                  </p>
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
                      autocomplete="current-password"
                      placeholder="••••••••••••"
                      :type="showPassword ? 'text' : 'password'"
                      :aria-invalid="!!showError('password')"
                      aria-describedby="password-error"
                      class="w-full bg-surface-container pl-11 pr-11 py-3 rounded font-body-base text-body-base text-on-surface placeholder:text-secondary/50 focus:outline-none focus:bg-surface-container-high transition-all"
                      :class="showError('password') ? 'ring-1 ring-error' : ''"
                      @blur="touched.password = true"
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
                  <p v-if="showError('password')" id="password-error" class="text-xs text-error">
                    {{ errors.password }}
                  </p>
                </div>

                <!-- Customer OTP -->
                <div v-if="isCustomer" class="space-y-1.5">
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
                      placeholder="ETF-00000"
                      :type="showGymId ? 'text' : 'password'"
                      :aria-invalid="!!showError('gymId')"
                      aria-describedby="gymId-error"
                      class="w-full bg-surface-container pl-11 pr-11 py-3 rounded font-body-base text-body-base text-on-surface placeholder:text-secondary/50 focus:outline-none focus:bg-surface-container-high transition-all tracking-wider"
                      :class="showError('gymId') ? 'ring-1 ring-error' : ''"
                      @blur="touched.gymId = true"
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
                  <p v-if="showError('gymId')" id="gymId-error" class="text-xs text-error">
                    {{ errors.gymId }}
                  </p>
                  <p v-else class="font-body-sm text-xs text-secondary/80">
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
                class="mt-4 p-3 rounded text-on-surface font-body-sm text-body-sm flex items-center space-x-2"
                :class="status.isError ? 'bg-error-container/60' : 'bg-surface-container-highest'"
                :role="status.isError ? 'alert' : 'status'"
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
