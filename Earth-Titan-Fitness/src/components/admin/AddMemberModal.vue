<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { NewMember } from '@/types/admin'

const props = defineProps<{ open: boolean; member?: NewMember | null }>()
const emit = defineEmits<{ close: []; save: [member: NewMember] }>()

const form = reactive<NewMember>({ name: '', email: '', memberId: '', registerDate: '', expireDate: '' })

watch(() => props.open, (open) => {
  if (open) Object.assign(form, props.member ?? { name: '', email: '', memberId: '', registerDate: '', expireDate: '' })
})

function submit() {
  emit('save', { ...form })
}
</script>

<template>
  <div v-if="open" class="modal-backdrop" role="presentation" @click.self="emit('close')">
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal__header">
        <div><span class="eyebrow">Member registry</span><h2 id="modal-title">{{ member ? 'Edit Member' : 'Add Member' }}</h2></div>
        <button type="button" aria-label="Close dialog" @click="emit('close')">×</button>
      </div>
      <form @submit.prevent="submit">
        <label>Full name<input v-model.trim="form.name" required type="text" placeholder="Marcus Vance" /></label>
        <label>Email address<input v-model.trim="form.email" required type="email" placeholder="member@example.com" /></label>
        <div class="form-grid">
          <label>Gym ID<input v-model.trim="form.memberId" required type="text" placeholder="ET-00000" /></label>
          <label>Register date<input v-model="form.registerDate" required type="date" /></label>
        </div>
        <label>Expire date<input v-model="form.expireDate" required type="date" /></label>
        <div class="modal__actions"><button type="button" class="secondary" @click="emit('close')">Cancel</button><button type="submit" class="primary">Save record</button></div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.modal-backdrop { position: fixed; inset: 0; z-index: 20; display: grid; place-items: center; padding: 1rem; background: rgba(0, 0, 0, 0.82); }
.modal { width: min(100%, 34rem); padding: 1.5rem; background: #202020; border: 1px solid #3c3c3c; border-radius: 0.75rem; box-shadow: 0 1rem 4rem #000; }
.modal__header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }.modal__header h2 { margin: 0.25rem 0 0; color: #fff; font: 700 1.5rem Oswald, Impact, sans-serif; text-transform: uppercase; }
.modal__header > button { color: #aaa; background: none; border: 0; cursor: pointer; font-size: 1.75rem; line-height: 1; }
.eyebrow { color: #ff6b72; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
form { display: grid; gap: 1rem; } label { display: grid; gap: 0.4rem; color: #c4c4c4; font-size: 0.75rem; font-weight: 600; } input { width: 100%; padding: 0.7rem 0.8rem; color: #fff; background: #2c2c2c; border: 1px solid #454545; border-radius: 0.3rem; } input:focus { outline: 1px solid #e50914; border-color: #e50914; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }.modal__actions { display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem; }.modal__actions button { padding: 0.7rem 1rem; border: 1px solid #454545; border-radius: 0.3rem; cursor: pointer; font-weight: 700; text-transform: uppercase; }.secondary { color: #ddd; background: #303030; }.primary { color: #fff; background: #e50914; border-color: #e50914 !important; }
@media (max-width: 500px) { .form-grid { grid-template-columns: 1fr; } }
</style>
