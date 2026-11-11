<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { AdminMember, NewMember } from '@/types/admin'
import { useMembersStore } from '@/stores/members'
import { todayIso } from '@/utils/membership'

const props = defineProps<{ open: boolean; member?: AdminMember | null; saving?: boolean; serverError?: string | null }>()
const emit = defineEmits<{ close: []; save: [member: NewMember] }>()

const store = useMembersStore()
const plans = ['Titan Pro Black', 'Titan Standard Iron', 'Titan Month-to-Month']

type Field = keyof NewMember
const empty = (): NewMember => ({ name: '', email: '', memberId: '', plan: '', registerDate: todayIso(), expireDate: '' })

const form = reactive<NewMember>(empty())
const touched = reactive<Record<Field, boolean>>({ name: false, email: false, memberId: false, plan: false, registerDate: false, expireDate: false })
const submitted = ref(false)

watch(() => props.open, (open) => {
  if (!open) return
  const m = props.member
  Object.assign(form, m ? { name: m.name, email: m.email, memberId: m.memberId, plan: m.plan, registerDate: m.registerDate, expireDate: m.expireDate } : empty())
  ;(Object.keys(touched) as Field[]).forEach((k) => (touched[k] = false))
  submitted.value = false
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CODE_RE = /^ETF-\d{5}$/
const NAME_RE = /^[A-Za-z][A-Za-z .'-]*$/

// One message per field; empty string = valid
const errors = computed<Record<Field, string>>(() => {
  const e: Record<Field, string> = { name: '', email: '', memberId: '', plan: '', registerDate: '', expireDate: '' }
  const name = form.name.trim()
  if (!name) e.name = 'Full name is required.'
  else if (name.length < 2) e.name = 'Full name must be at least 2 characters.'
  else if (name.length > 60) e.name = 'Full name must be 60 characters or fewer.'
  else if (!NAME_RE.test(name)) e.name = 'Use letters, spaces, apostrophes, dots or hyphens only.'

  const email = form.email.trim()
  if (!email) e.email = 'Email address is required.'
  else if (!EMAIL_RE.test(email)) e.email = 'Enter a valid email, e.g. member@example.com.'
  else if (store.isEmailTaken(email, props.member?.userId)) e.email = 'This email already belongs to another member.'

  const code = form.memberId.trim().toUpperCase()
  if (!code) e.memberId = 'Gym ID is required.'
  else if (!CODE_RE.test(code)) e.memberId = 'Gym ID must look like ETF-12345 (ETF- followed by 5 digits).'
  else if (store.isCodeTaken(code, props.member?.id)) e.memberId = 'This Gym ID is already assigned.'

  if (!form.plan) e.plan = 'Choose a membership plan.'

  if (!form.registerDate) e.registerDate = 'Register date is required.'
  else if (form.registerDate > todayIso()) e.registerDate = 'Register date cannot be in the future.'

  if (!form.expireDate) e.expireDate = 'Expire date is required.'
  else if (form.registerDate && form.expireDate <= form.registerDate) e.expireDate = 'Expire date must be after the register date.'

  return e
})

const isValid = computed(() => Object.values(errors.value).every((m) => !m))
const show = (field: Field) => (touched[field] || submitted.value) && errors.value[field]

function submit() {
  submitted.value = true
  if (!isValid.value) return
  emit('save', { ...form, name: form.name.trim(), email: form.email.trim(), memberId: form.memberId.trim().toUpperCase() })
}
</script>

<template>
  <div v-if="open" class="modal-backdrop" role="presentation" @click.self="emit('close')">
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal__header">
        <div><span class="eyebrow">Member registry</span><h2 id="modal-title">{{ member ? 'Edit Member' : 'Add Member' }}</h2></div>
        <button type="button" aria-label="Close dialog" @click="emit('close')">×</button>
      </div>
      <form novalidate @submit.prevent="submit">
        <label :class="{ invalid: show('name') }">Full name
          <input v-model="form.name" type="text" placeholder="Marcus Vance" :aria-invalid="!!show('name')" aria-describedby="err-name" @blur="touched.name = true" />
          <small v-if="show('name')" id="err-name" class="error">{{ errors.name }}</small>
        </label>
        <label :class="{ invalid: show('email') }">Email address
          <input v-model="form.email" type="email" placeholder="member@example.com" :aria-invalid="!!show('email')" aria-describedby="err-email" @blur="touched.email = true" />
          <small v-if="show('email')" id="err-email" class="error">{{ errors.email }}</small>
        </label>
        <div class="form-grid">
          <label :class="{ invalid: show('memberId') }">Gym ID
            <input v-model="form.memberId" type="text" placeholder="ETF-00000" :aria-invalid="!!show('memberId')" aria-describedby="err-code" @blur="touched.memberId = true" />
            <small v-if="show('memberId')" id="err-code" class="error">{{ errors.memberId }}</small>
          </label>
          <label :class="{ invalid: show('plan') }">Plan
            <select v-model="form.plan" :aria-invalid="!!show('plan')" aria-describedby="err-plan" @blur="touched.plan = true">
              <option value="" disabled>Select a plan</option>
              <option v-for="p in plans" :key="p" :value="p">{{ p }}</option>
            </select>
            <small v-if="show('plan')" id="err-plan" class="error">{{ errors.plan }}</small>
          </label>
        </div>
        <div class="form-grid">
          <label :class="{ invalid: show('registerDate') }">Register date
            <input v-model="form.registerDate" type="date" :aria-invalid="!!show('registerDate')" aria-describedby="err-reg" @blur="touched.registerDate = true" />
            <small v-if="show('registerDate')" id="err-reg" class="error">{{ errors.registerDate }}</small>
          </label>
          <label :class="{ invalid: show('expireDate') }">Expire date
            <input v-model="form.expireDate" type="date" :aria-invalid="!!show('expireDate')" aria-describedby="err-exp" @blur="touched.expireDate = true" />
            <small v-if="show('expireDate')" id="err-exp" class="error">{{ errors.expireDate }}</small>
          </label>
        </div>
        <p v-if="serverError" class="server-error" role="alert">{{ serverError }}</p>
        <div class="modal__actions"><button type="button" class="secondary" @click="emit('close')">Cancel</button><button type="submit" class="primary" :disabled="saving">{{ saving ? 'Saving…' : 'Save record' }}</button></div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.modal-backdrop { position: fixed; inset: 0; z-index: 20; display: grid; place-items: center; padding: 1rem; background: rgba(0, 0, 0, 0.82); }
.modal { width: min(100%, 34rem); max-height: calc(100vh - 2rem); overflow-y: auto; padding: 1.5rem; background: #202020; border: 1px solid #3c3c3c; border-radius: 0.75rem; box-shadow: 0 1rem 4rem #000; }
.modal__header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }.modal__header h2 { margin: 0.25rem 0 0; color: #fff; font: 700 1.5rem Oswald, Impact, sans-serif; text-transform: uppercase; }
.modal__header > button { color: #aaa; background: none; border: 0; cursor: pointer; font-size: 1.75rem; line-height: 1; }
.eyebrow { color: #ff6b72; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
form { display: grid; gap: 1rem; } label { display: grid; gap: 0.4rem; align-content: start; color: #c4c4c4; font-size: 0.75rem; font-weight: 600; } input, select { width: 100%; padding: 0.7rem 0.8rem; color: #fff; background: #2c2c2c; border: 1px solid #454545; border-radius: 0.3rem; } input:focus, select:focus { outline: 1px solid #e50914; border-color: #e50914; }
.invalid input, .invalid select { border-color: #ff6b72; }
.error { color: #ff6b72; font-size: 0.72rem; font-weight: 500; }
.server-error { margin: 0; padding: 0.6rem 0.8rem; color: #ffdad6; background: #4c0519; border-radius: 0.3rem; font-size: 0.8rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }.modal__actions { display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem; }.modal__actions button { padding: 0.7rem 1rem; border: 1px solid #454545; border-radius: 0.3rem; cursor: pointer; font-weight: 700; text-transform: uppercase; }.modal__actions button:disabled { opacity: 0.6; cursor: wait; }.secondary { color: #ddd; background: #303030; }.primary { color: #fff; background: #e50914; border-color: #e50914 !important; }
@media (max-width: 500px) { .form-grid { grid-template-columns: 1fr; } }
</style>
