<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { NewBranch } from '@/api/branches'
import type { Amenity, GymBranch, HolidayEntry, HolidayType } from '@/types/api'
import { useBranchesStore } from '@/stores/branches'
import { BRANCH_IMAGE_OPTIONS, PRESET_AMENITIES, resolveBranchImage } from '@/utils/branchView'

const props = defineProps<{
  open: boolean
  branch?: GymBranch | null
  saving?: boolean
  serverError?: string | null
}>()

const emit = defineEmits<{
  close: []
  save: [payload: NewBranch]
}>()

const store = useBranchesStore()

interface BranchFormState {
  name: string
  address: string
  badge: string
  image: string
  is24Hours: boolean
  openingTime: string
  closingTime: string
  weekendOpeningTime: string
  weekendClosingTime: string
  capacityPercent: number
  amenities: Amenity[]
  holidaySchedule: HolidayEntry[]
}

const emptyForm = (): BranchFormState => ({
  name: '',
  address: '',
  badge: `Branch ${String(store.items.length + 1).padStart(2, '0')}`,
  image: 'branch1-1.png',
  is24Hours: false,
  openingTime: '05:00',
  closingTime: '23:00',
  weekendOpeningTime: '06:00',
  weekendClosingTime: '21:00',
  capacityPercent: 45,
  amenities: [
    { icon: 'fitness_center', label: 'Powerlifting Pods' },
    { icon: 'sports_gymnastics', label: 'Olympic Platforms' },
  ],
  holidaySchedule: [],
})

const form = reactive<BranchFormState>(emptyForm())
const touched = reactive({
  name: false,
  address: false,
  badge: false,
  weekdayHours: false,
  weekendHours: false,
  capacityPercent: false,
})
const submitted = ref(false)

watch(
  () => props.open,
  (open) => {
    if (!open) return
    const b = props.branch
    const source = b
      ? {
          name: b.name,
          address: b.address,
          badge: b.badge,
          image: b.image || 'branch1-1.png',
          is24Hours: b.is24Hours,
          openingTime: b.openingTime,
          closingTime: b.closingTime,
          weekendOpeningTime: b.weekendOpeningTime,
          weekendClosingTime: b.weekendClosingTime,
          capacityPercent: b.capacityPercent,
          amenities: b.amenities.map((a) => ({ ...a })),
          holidaySchedule: b.holidaySchedule.map((h) => ({ ...h })),
        }
      : emptyForm()

    form.name = source.name
    form.address = source.address
    form.badge = source.badge
    form.image = source.image
    form.is24Hours = source.is24Hours
    form.openingTime = source.openingTime
    form.closingTime = source.closingTime
    form.weekendOpeningTime = source.weekendOpeningTime
    form.weekendClosingTime = source.weekendClosingTime
    form.capacityPercent = source.capacityPercent
    form.amenities = source.amenities
    form.holidaySchedule = source.holidaySchedule

    touched.name = false
    touched.address = false
    touched.badge = false
    touched.weekdayHours = false
    touched.weekendHours = false
    touched.capacityPercent = false
    submitted.value = false
  },
)

function handle24HoursChange() {
  if (form.is24Hours) {
    form.openingTime = '00:00'
    form.closingTime = '23:59'
    form.weekendOpeningTime = '00:00'
    form.weekendClosingTime = '23:59'
  } else if (form.openingTime === '00:00' && form.closingTime === '23:59') {
    form.openingTime = '05:00'
    form.closingTime = '23:00'
    form.weekendOpeningTime = '06:00'
    form.weekendClosingTime = '21:00'
  }
}

function isAmenitySelected(amenity: Amenity): boolean {
  return form.amenities.some((a) => a.label === amenity.label)
}

function toggleAmenity(amenity: Amenity) {
  const index = form.amenities.findIndex((a) => a.label === amenity.label)
  if (index >= 0) {
    form.amenities.splice(index, 1)
  } else {
    form.amenities.push({ ...amenity })
  }
}

function selectAllAmenities() {
  form.amenities = PRESET_AMENITIES.map((a) => ({ ...a }))
}

function clearAmenities() {
  form.amenities = []
}

function addHolidayRow() {
  form.holidaySchedule.push({
    date: '',
    name: '',
    type: 'closed',
  })
}

function onHolidayTypeChange(entry: HolidayEntry) {
  if (entry.type === 'adjusted') {
    entry.openingTime = entry.openingTime || '08:00'
    entry.closingTime = entry.closingTime || '16:00'
  } else {
    delete entry.openingTime
    delete entry.closingTime
  }
}

function removeHolidayRow(index: number) {
  form.holidaySchedule.splice(index, 1)
}

const previewImageUrl = computed(() => resolveBranchImage(form.image))

const errors = computed(() => {
  const e = {
    name: '',
    address: '',
    badge: '',
    weekdayHours: '',
    weekendHours: '',
    capacityPercent: '',
    holidays: '',
  }

  const name = form.name.trim()
  if (!name) e.name = 'Branch name is required.'
  else if (name.length < 3 || name.length > 80) e.name = 'Branch name must be 3–80 characters.'
  else if (store.isNameTaken(name, props.branch?.id)) e.name = 'A branch with this name already exists.'

  const address = form.address.trim()
  if (!address) e.address = 'Street address is required.'
  else if (address.length < 5 || address.length > 160) e.address = 'Address must be 5–160 characters.'

  const badge = form.badge.trim()
  if (badge && (badge.length < 2 || badge.length > 30)) {
    e.badge = 'Station badge must be 2–30 characters.'
  }

  if (!form.is24Hours) {
    if (!form.openingTime || !form.closingTime) {
      e.weekdayHours = 'Weekday opening and closing times are required.'
    } else if (form.closingTime <= form.openingTime) {
      e.weekdayHours = 'Closing time must be after opening time.'
    }

    if (!form.weekendOpeningTime || !form.weekendClosingTime) {
      e.weekendHours = 'Weekend opening and closing times are required.'
    } else if (form.weekendClosingTime <= form.weekendOpeningTime) {
      e.weekendHours = 'Weekend closing time must be after opening time.'
    }
  }

  if (
    !Number.isInteger(Number(form.capacityPercent)) ||
    form.capacityPercent < 0 ||
    form.capacityPercent > 100
  ) {
    e.capacityPercent = 'Capacity must be a whole number between 0 and 100.'
  }

  for (const h of form.holidaySchedule) {
    if (!h.date || !h.name.trim() || h.name.trim().length < 2) {
      e.holidays = 'Every holiday row needs a valid date and name (at least 2 characters).'
      break
    }
    if (h.type === 'adjusted') {
      if (!h.openingTime || !h.closingTime || h.closingTime <= h.openingTime) {
        e.holidays = `Adjusted holiday "${h.name}" needs closing time after opening time.`
        break
      }
    }
  }

  return e
})

const isValid = computed(() => Object.values(errors.value).every((msg) => !msg))
const show = (key: keyof typeof touched) => (touched[key] || submitted.value) && errors.value[key]

function submit() {
  submitted.value = true
  if (!isValid.value) return

  const payload: NewBranch = {
    name: form.name.trim(),
    address: form.address.trim(),
    badge: form.badge.trim() || `Branch ${String(store.items.length + 1).padStart(2, '0')}`,
    image: form.image,
    openingTime: form.is24Hours ? '00:00' : form.openingTime,
    closingTime: form.is24Hours ? '23:59' : form.closingTime,
    weekendOpeningTime: form.is24Hours ? '00:00' : form.weekendOpeningTime,
    weekendClosingTime: form.is24Hours ? '23:59' : form.weekendClosingTime,
    is24Hours: form.is24Hours,
    capacityPercent: Number(form.capacityPercent),
    amenities: form.amenities.map((a) => ({ icon: a.icon, label: a.label })),
    holidaySchedule: form.holidaySchedule.map((h) => ({
      date: h.date,
      name: h.name.trim(),
      type: h.type as HolidayType,
      ...(h.type === 'adjusted' ? { openingTime: h.openingTime, closingTime: h.closingTime } : {}),
    })),
  }

  emit('save', payload)
}
</script>

<template>
  <div v-if="open" class="modal-backdrop" role="presentation" @click.self="emit('close')">
    <section class="modal" role="dialog" aria-modal="true" aria-labelledby="branch-modal-title">
      <div class="modal__header">
        <div>
          <span class="eyebrow">FACILITY NETWORK // REGISTRY</span>
          <h2 id="branch-modal-title">{{ branch ? `Edit ${branch.name}` : 'Add New Gym Branch' }}</h2>
        </div>
        <button type="button" aria-label="Close dialog" @click="emit('close')">×</button>
      </div>

      <form novalidate @submit.prevent="submit">
        <!-- Name & Badge -->
        <div class="form-grid form-grid--2-1">
          <label :class="{ invalid: show('name') }">
            Branch Name
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Southside Powerhouse Arena"
              @blur="touched.name = true"
            />
            <small v-if="show('name')" class="error">{{ errors.name }}</small>
          </label>
          <label :class="{ invalid: show('badge') }">
            Station Badge
            <input
              v-model="form.badge"
              type="text"
              placeholder="e.g. Branch 05"
              @blur="touched.badge = true"
            />
            <small v-if="show('badge')" class="error">{{ errors.badge }}</small>
          </label>
        </div>

        <!-- Address -->
        <label :class="{ invalid: show('address') }">
          Street Address
          <input
            v-model="form.address"
            type="text"
            placeholder="e.g. 1904 Industrial Road, South Metro, NY 10040"
            @blur="touched.address = true"
          />
          <small v-if="show('address')" class="error">{{ errors.address }}</small>
        </label>

        <!-- Image selector with live preview & Capacity -->
        <div class="form-grid form-grid--2-1">
          <label>
            Facility Image
            <select v-model="form.image">
              <option v-for="img in BRANCH_IMAGE_OPTIONS" :key="img.value" :value="img.value">
                {{ img.label }}
              </option>
            </select>
          </label>
          <label :class="{ invalid: show('capacityPercent') }">
            Initial Capacity (%)
            <input
              v-model.number="form.capacityPercent"
              type="number"
              min="0"
              max="100"
              @blur="touched.capacityPercent = true"
            />
            <small v-if="show('capacityPercent')" class="error">{{ errors.capacityPercent }}</small>
          </label>
        </div>

        <div class="image-preview">
          <img :src="previewImageUrl" :alt="form.name || 'Selected branch preview'" />
          <span>{{ form.badge || 'NEW NODE' }} · {{ form.name || 'Branch Preview' }}</span>
        </div>

        <!-- Operating Hours & 24/7 Toggle -->
        <div class="schedule-box">
          <div class="schedule-box__top">
            <span class="section-label">OPERATING SCHEDULE</span>
            <label class="checkbox-inline">
              <input v-model="form.is24Hours" type="checkbox" @change="handle24HoursChange" />
              <span>24/7 Continuous Access</span>
            </label>
          </div>

          <div class="form-grid">
            <div class="time-group" :class="{ invalid: show('weekdayHours') }">
              <span>Weekday Hours (Mon–Fri)</span>
              <div class="time-pair">
                <input
                  v-model="form.openingTime"
                  type="time"
                  :disabled="form.is24Hours"
                  @blur="touched.weekdayHours = true"
                />
                <em>to</em>
                <input
                  v-model="form.closingTime"
                  type="time"
                  :disabled="form.is24Hours"
                  @blur="touched.weekdayHours = true"
                />
              </div>
              <small v-if="show('weekdayHours')" class="error">{{ errors.weekdayHours }}</small>
            </div>

            <div class="time-group" :class="{ invalid: show('weekendHours') }">
              <span>Weekend Hours (Sat–Sun)</span>
              <div class="time-pair">
                <input
                  v-model="form.weekendOpeningTime"
                  type="time"
                  :disabled="form.is24Hours"
                  @blur="touched.weekendHours = true"
                />
                <em>to</em>
                <input
                  v-model="form.weekendClosingTime"
                  type="time"
                  :disabled="form.is24Hours"
                  @blur="touched.weekendHours = true"
                />
              </div>
              <small v-if="show('weekendHours')" class="error">{{ errors.weekendHours }}</small>
            </div>
          </div>
        </div>

        <!-- Amenities Multi-Select (matching BranchDetailPage pills) -->
        <div class="amenities-section">
          <div class="amenities-header">
            <span class="section-label">AMENITIES ({{ form.amenities.length }} SELECTED)</span>
            <div class="amenities-bulk">
              <button type="button" @click="selectAllAmenities">Select All</button>
              <button type="button" @click="clearAmenities">Clear</button>
            </div>
          </div>
          <div class="amenities-grid">
            <button
              v-for="amenity in PRESET_AMENITIES"
              :key="amenity.label"
              type="button"
              class="amenity-pill"
              :class="{ 'amenity-pill--selected': isAmenitySelected(amenity) }"
              @click="toggleAmenity(amenity)"
            >
              <span class="material-symbols-outlined amenity-icon">{{ amenity.icon }}</span>
              <span>{{ amenity.label }}</span>
            </button>
          </div>
        </div>

        <!-- Holiday Schedule Overrides -->
        <div class="holidays-section">
          <div class="amenities-header">
            <span class="section-label">HOLIDAY SCHEDULE OVERRIDES</span>
            <button type="button" class="add-holiday-btn" @click="addHolidayRow">＋ Add Holiday</button>
          </div>

          <p v-if="form.holidaySchedule.length === 0" class="muted-hint">
            No holiday overrides added yet (regular hours apply).
          </p>

          <div v-for="(h, idx) in form.holidaySchedule" :key="idx" class="holiday-row">
            <input v-model="h.date" type="date" aria-label="Holiday date" />
            <input v-model="h.name" type="text" placeholder="Holiday name (e.g. Christmas Day)" />
            <select v-model="h.type" @change="onHolidayTypeChange(h)">
              <option value="closed">Closed</option>
              <option value="adjusted">Adjusted Hours</option>
              <option value="regular">Regular Hours</option>
            </select>
            <template v-if="h.type === 'adjusted'">
              <input v-model="h.openingTime" type="time" aria-label="Holiday open" />
              <input v-model="h.closingTime" type="time" aria-label="Holiday close" />
            </template>
            <button type="button" class="remove-row-btn" title="Remove holiday" @click="removeHolidayRow(idx)">
              ×
            </button>
          </div>
          <small v-if="submitted && errors.holidays" class="error">{{ errors.holidays }}</small>
        </div>

        <p v-if="serverError" class="server-error" role="alert">{{ serverError }}</p>

        <div class="modal__actions">
          <button type="button" class="secondary" @click="emit('close')">Cancel</button>
          <button type="submit" class="primary" :disabled="saving">
            {{ saving ? 'Saving…' : branch ? 'Save Changes' : 'Create Branch' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
.modal-backdrop { position: fixed; inset: 0; z-index: 30; display: grid; place-items: center; padding: 1rem; background: rgba(0, 0, 0, 0.84); }
.modal { width: min(100%, 48rem); max-height: calc(100vh - 2rem); overflow-y: auto; padding: 1.5rem; background: #1e1e1e; border: 1px solid #3c3c3c; border-radius: 0.75rem; box-shadow: 0 1.25rem 4rem #000; color: #e5e5e5; }
.modal__header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }
.modal__header h2 { margin: 0.25rem 0 0; color: #fff; font: 700 1.55rem Oswald, Impact, sans-serif; text-transform: uppercase; }
.modal__header > button { color: #aaa; background: none; border: 0; cursor: pointer; font-size: 1.75rem; line-height: 1; }
.eyebrow, .section-label { color: #ff6b72; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
form { display: grid; gap: 1rem; }
label, .time-group { display: grid; gap: 0.4rem; align-content: start; color: #c4c4c4; font-size: 0.75rem; font-weight: 600; }
input[type='text'], input[type='number'], input[type='date'], input[type='time'], select { width: 100%; padding: 0.65rem 0.75rem; color: #fff; background: #2b2b2b; border: 1px solid #444; border-radius: 0.3rem; font-size: 0.82rem; }
input:focus, select:focus { outline: 1px solid #e50914; border-color: #e50914; }
input:disabled { opacity: 0.5; cursor: not-allowed; }
.invalid input, .invalid select { border-color: #ff6b72; }
.error { color: #ff6b72; font-size: 0.72rem; font-weight: 500; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
.form-grid--2-1 { grid-template-columns: 2fr 1fr; }
.image-preview { position: relative; height: 7.5rem; border-radius: 0.45rem; overflow: hidden; border: 1px solid #353535; background: #111; }
.image-preview img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
.image-preview span { position: absolute; left: 0.75rem; bottom: 0.6rem; padding: 0.25rem 0.55rem; background: rgba(14, 14, 14, 0.86); border-radius: 0.25rem; color: #fff; font: 700 0.72rem Oswald, sans-serif; letter-spacing: 0.06em; text-transform: uppercase; }
.schedule-box, .amenities-section, .holidays-section { display: grid; gap: 0.75rem; padding: 0.95rem; background: #151515; border: 1px solid #2e2e2e; border-radius: 0.5rem; }
.schedule-box__top, .amenities-header { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
.checkbox-inline { display: inline-flex; align-items: center; gap: 0.45rem; color: #ddd; font-size: 0.76rem; cursor: pointer; }
.checkbox-inline input { accent-color: #e50914; width: 1rem; height: 1rem; }
.time-pair { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 0.45rem; }
.time-pair em { color: #888; font-style: normal; font-size: 0.72rem; }
.amenities-bulk { display: flex; gap: 0.4rem; }
.amenities-bulk button, .add-holiday-btn { padding: 0.3rem 0.6rem; color: #ddd; background: #292929; border: 1px solid #3e3e3e; border-radius: 0.25rem; cursor: pointer; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; }
.amenities-bulk button:hover, .add-holiday-btn:hover { color: #fff; border-color: #e50914; }
.amenities-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.amenity-pill { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.7rem; color: #bdbdbd; background: #262626; border: 1px solid #3a3a3a; border-radius: 0.3rem; cursor: pointer; font: 700 0.72rem Oswald, Inter, sans-serif; letter-spacing: 0.04em; text-transform: uppercase; transition: all 0.15s ease; }
.amenity-pill:hover { color: #fff; border-color: #666; }
.amenity-pill--selected { color: #fff; background: #2f1416; border-color: #e50914; box-shadow: inset 0 0 0 1px rgba(229, 9, 20, 0.35); }
.amenity-icon { color: #e50914; font-size: 1rem; }
.muted-hint { margin: 0; color: #888; font-size: 0.76rem; }
.holiday-row { display: grid; grid-template-columns: 9.5rem 1fr 8.5rem auto auto auto; gap: 0.45rem; align-items: center; }
.remove-row-btn { padding: 0.45rem 0.65rem; color: #ff6b72; background: #2b181a; border: 1px solid #522326; border-radius: 0.3rem; cursor: pointer; font-size: 1rem; line-height: 1; }
.server-error { margin: 0; padding: 0.6rem 0.8rem; color: #ffdad6; background: #4c0519; border-radius: 0.3rem; font-size: 0.8rem; }
.modal__actions { display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.25rem; }
.modal__actions button { padding: 0.75rem 1.15rem; border: 1px solid #454545; border-radius: 0.3rem; cursor: pointer; font-weight: 700; text-transform: uppercase; }
.modal__actions button:disabled { opacity: 0.6; cursor: wait; }
.secondary { color: #ddd; background: #303030; }
.primary { color: #fff; background: #e50914; border-color: #e50914 !important; }
.primary:hover { background: #c90812; }
@media (max-width: 680px) { .form-grid, .form-grid--2-1, .holiday-row { grid-template-columns: 1fr; } }
</style>
