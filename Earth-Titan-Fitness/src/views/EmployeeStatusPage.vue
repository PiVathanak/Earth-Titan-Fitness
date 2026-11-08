<script setup lang="ts">
import { computed, ref } from 'vue'

interface MemberRecord {
  id: string
  name: string
  email: string
  phone: string
  plan: string
  registered: string
  expires: string
  access: string
  status: 'active' | 'expiring' | 'expired'
}

const records: MemberRecord[] = [
  { id: 'ETF-89241', name: 'Marcus Vance', email: 'm.vance@titanmail.com', phone: '+1 (555) 019-8234', plan: 'Titan Pro Black', registered: '2024-01-15', expires: '2025-01-15', access: 'All Branches (24/7)', status: 'active' },
  { id: 'ETF-55012', name: 'Darius Thorne', email: 'd.thorne@ironstrength.com', phone: '+1 (555) 349-1190', plan: 'Titan Standard Iron', registered: '2023-11-20', expires: '2024-11-25 (Expiring 3 Days)', access: 'Downtown Flagship Only', status: 'expiring' },
  { id: 'ETF-10499', name: 'Cassandra Cole', email: 'c.cole@apexfitness.org', phone: '+1 (555) 872-4040', plan: 'Titan Month-to-Month', registered: '2023-04-01', expires: '2024-04-01 (EXPIRED)', access: 'None - Blocked at Turnstile', status: 'expired' },
]

const memberId = ref('ETF-89241')
const searchedId = ref('')
const hasSearched = ref(false)
const authorized = ref(false)
const searched = computed(() => hasSearched.value ? records.find((record) => record.id === searchedId.value) : undefined)
const statusLabel = computed(() => searched.value?.status === 'active' ? 'Active & Valid' : searched.value?.status === 'expiring' ? 'Expiring Soon · Notice Alert' : searched.value?.status === 'expired' ? 'Entry Denied · Membership Expired' : 'Record Not Found')

function executeQuery() {
  searchedId.value = memberId.value.trim().toUpperCase()
  hasSearched.value = true
  authorized.value = false
}

function resetCheckIn() {
  memberId.value = ''
  searchedId.value = ''
  hasSearched.value = false
  authorized.value = false
}

function authorizeEntry() {
  if (searched.value?.status !== 'expired') authorized.value = true
}
</script>

<template>
  <div class="terminal">
    <aside class="sidebar">
      <div>
        <div class="brand"><span class="brand-mark">ET</span><span>EARTH-TITAN<br /><b>FITNESS</b></span></div>
        <div class="facility"><span>FACILITY STATION</span><strong>Downtown Iron Gym</strong><i /></div>
        <nav><a class="active" href="#check-in">⌗ <span>Rapid Check-In</span></a><a href="#registration">♟ <span>Walk-In Registration</span></a></nav>
      </div>
      <div class="sidebar-footer"><span>LIVE CAPACITY</span><div class="capacity"><i /></div><strong>Marcus Vance</strong><small>Desk Commander</small></div>
    </aside>
    <main>
      <header class="topbar"><div><span class="eyebrow">STAFF TERMINAL / CASHIER STATION</span><h1>Rapid Check-In</h1></div><div class="station-status"><span class="online" /> SYSTEM ONLINE <b>MV</b></div></header>
      <section class="content">
        <div class="terminal-heading"><div><p class="eyebrow">DESK GATE 01 / MEMBER VERIFICATION</p><h2>Rapid Check-In</h2><p>Scan or enter a member credential to verify status and authorize facility access.</p></div><span class="clock">● Barcode Scanner / Keyboard Emulation Connected</span></div>
        <form class="query-bar" @submit.prevent="executeQuery"><input v-model="memberId" autofocus aria-label="Member ID" placeholder="Enter Member ID (e.g. ETF-89241, ETF-55012, ETF-10499)..." /><button type="submit">⌕ Execute Query</button></form>
        <div class="workspace">
          <section v-if="hasSearched" class="member-panel">
            <div class="status-ribbon" :class="`ribbon--${searched?.status ?? 'missing'}`" />
            <template v-if="searched">
              <div class="member-header"><div><span class="badge" :class="`badge--${searched.status}`">● {{ statusLabel }}</span><span class="pass-label">Single Entry Pass: {{ searched.status === 'expired' ? 'Restricted' : 'Permitted' }}</span><h3>{{ searched.name }}</h3><div class="contact"><strong>{{ searched.id }}</strong> · {{ searched.email }} · {{ searched.phone }}</div></div></div>
              <div class="member-metrics"><div><span>REGISTERED</span><strong>{{ searched.registered }}</strong></div><div><span>VALID UNTIL</span><strong :class="`text--${searched.status}`">{{ searched.expires }}</strong></div><div><span>STATUS</span><strong :class="`text--${searched.status}`">{{ searched.status.toUpperCase() }}</strong></div></div>
              <div v-if="authorized" class="notification">✓ Access Authorized - Turnstile Gate 01 Released</div>
              <div class="member-actions"><button class="authorize" :disabled="searched.status === 'expired'" type="button" @click="authorizeEntry">✓ {{ searched.status === 'expired' ? 'Entry Restricted - Membership Expired' : 'Authorize Entry (Grant Access)' }}</button><button class="reset" type="button" @click="resetCheckIn">↻ Reset</button></div>
              <div class="details"><div><span>MEMBERSHIP PLAN</span><strong>{{ searched.plan }}</strong></div><div><span>BRANCH ACCESS</span><strong>{{ searched.access }}</strong></div></div>
            </template>
            <div v-else class="not-found"><span class="badge badge--missing">● Record Not Found</span><h3>NO MATCHING MEMBER</h3><p>{{ searchedId || 'Enter a member ID to begin.' }}</p><strong>ENTRY RESTRICTED - UNREGISTERED ID</strong></div>
          </section>
          <aside class="protocol"><h3>✓ Desk Protocol Standard</h3><div class="protocol-box"><span class="eyebrow">MVP OPERATING WORKFLOW</span><p>Verify member identity against the presented ID or digital pass. If membership is active and unexpired, authorize entry manually.</p></div><span class="checklist-title">Gate Clearance Checklist:</span><label><input v-model="authorized" type="checkbox" /> Confirm identity with display ID</label><label><input checked type="checkbox" /> Verify active membership status</label></aside>
        </div>
        <footer class="session-stats"><div><span class="history">◷</span><div><strong>Session Station Statistics</strong><p>Desk Gate 01 has processed <b>148 check-ins</b> during shift.</p></div></div><div class="stats-actions"><span>Authorized: <b>142</b></span><button type="button">Export Shift CSV</button></div></footer>
      </section>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap');
.terminal{min-height:100vh;color:#e5e5e5;background:#131313;font-family:Inter,sans-serif}.sidebar{position:fixed;inset:0 auto 0 0;z-index:5;display:flex;width:16rem;flex-direction:column;justify-content:space-between;padding:1.5rem 1rem;background:#0e0e0e;border-right:1px solid #2e2e2e}.brand{display:flex;align-items:center;gap:.65rem;padding:0 .5rem 2rem;color:#f3f3f3;font:700 .78rem/1.1 Oswald,sans-serif;letter-spacing:.05em}.brand-mark{display:grid;width:2rem;height:2rem;place-items:center;color:#fff;background:#e50914;border-radius:50%;font-size:.65rem}.brand b{color:#e50914}.facility{position:relative;display:grid;gap:.3rem;margin-bottom:1.5rem;padding:.75rem;background:#1c1c1c;border:1px solid #303030;border-radius:.5rem}.facility span,.eyebrow{color:#e76d72;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.facility strong{font-size:.75rem}.facility i,.online{width:.55rem;height:.55rem;background:#22c55e;border-radius:50%;box-shadow:0 0 .5rem #22c55e}.facility i{position:absolute;top:1.2rem;right:.75rem}nav{display:grid;gap:.35rem}nav a{display:flex;align-items:center;gap:.65rem;padding:.75rem;color:#999;border-radius:.35rem;font-size:.7rem;font-weight:700;text-decoration:none;text-transform:uppercase}nav a.active,nav a:hover{color:#fff;background:#e50914}.sidebar-footer{display:grid;gap:.35rem;padding-top:1rem;border-top:1px solid #303030;font-size:.75rem}.sidebar-footer>span,.sidebar-footer small{color:#999;font-size:.65rem;letter-spacing:.08em}.capacity{height:.3rem;background:#333;border-radius:1rem;overflow:hidden}.capacity i{display:block;width:84%;height:100%;background:#e50914}main{margin-left:16rem}.topbar{display:flex;align-items:center;justify-content:space-between;height:5rem;padding:0 2.5rem;border-bottom:1px solid #292929}.topbar h1{margin:.3rem 0 0;color:#fff;font:700 2rem/1 Oswald,sans-serif;text-transform:uppercase}.station-status{display:flex;align-items:center;gap:.6rem;color:#999;font-size:.65rem;font-weight:700}.station-status b{display:grid;width:2rem;height:2rem;place-items:center;color:#fff;background:#303030;border-radius:50%}.content{max-width:92rem;margin:0 auto;padding:2.5rem}.terminal-heading{display:flex;align-items:end;justify-content:space-between;gap:1rem}.terminal-heading h2{margin:.4rem 0;color:#fff;font:700 2.5rem/1 Oswald,sans-serif;text-transform:uppercase}.terminal-heading p:last-child{margin:0;color:#999;font-size:.85rem}.clock{color:#4ade80;font-size:.68rem}.query-bar{display:flex;gap:.5rem;margin:1.5rem 0;padding:1rem;background:#1c1c1c;border:1px solid #303030;border-radius:.5rem}.query-bar input{flex:1;padding:1rem;color:#fff;background:#0e0e0e;border:0;border-radius:.35rem;font-size:1rem;text-transform:uppercase}.query-bar button{padding:0 1.25rem;color:#fff;background:#e50914;border:0;border-radius:.35rem;cursor:pointer;font-weight:700;text-transform:uppercase}.workspace{display:grid;grid-template-columns:2fr 1fr;gap:1rem}.member-panel,.protocol{position:relative;padding:1.25rem;background:#1c1c1c;border:1px solid #303030;border-radius:.5rem;overflow:hidden}.status-ribbon{height:.45rem;margin:-1.25rem -1.25rem 1.25rem}.ribbon--active{background:#22c55e}.ribbon--expiring{background:#f59e0b}.ribbon--expired,.ribbon--missing{background:#e50914}.member-header{display:flex;justify-content:space-between}.badge{display:inline-flex;gap:.35rem;padding:.35rem .65rem;border-radius:999px;font-size:.68rem;font-weight:700;text-transform:uppercase}.badge--active{color:#4ade80;background:#064e3b}.badge--expiring{color:#fbbf24;background:#451a03}.badge--expired,.badge--missing{color:#ff6b72;background:#4c0519}.pass-label{float:right;color:#999;font-size:.65rem;text-transform:uppercase}.member-panel h3,.not-found h3{margin:.75rem 0 .35rem;color:#fff;font:700 2.3rem/1 Oswald,sans-serif;text-transform:uppercase}.contact{color:#999;font-size:.8rem}.member-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin:1.5rem 0;padding:1rem;background:#151515;border:1px solid #303030;border-radius:.35rem}.member-metrics span,.details span{display:block;color:#888;font-size:.65rem;letter-spacing:.08em}.member-metrics strong,.details strong{display:block;margin-top:.35rem;font-size:.9rem}.text--active{color:#4ade80}.text--expiring{color:#fbbf24}.text--expired{color:#ff6b72}.notification{margin-bottom:1rem;padding:.8rem;color:#6ee7b7;background:#064e3b;border-radius:.3rem;font-size:.8rem}.member-actions{display:flex;gap:.5rem}.authorize,.reset,.stats-actions button{padding:.9rem 1rem;border:0;border-radius:.3rem;cursor:pointer;font-weight:700;text-transform:uppercase}.authorize{flex:1;color:#fff;background:#059669}.authorize:disabled{color:#ff6b72;background:#4c0519;cursor:not-allowed}.reset{color:#ddd;background:#303030}.details{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid #303030}.protocol h3{margin:0 0 1rem;color:#fff;font:700 1.15rem Oswald,sans-serif;text-transform:uppercase}.protocol-box{padding:1rem;background:#0e0e0e;border-radius:.35rem}.protocol-box p{margin:.5rem 0 0;color:#ddd;font-size:.8rem;line-height:1.6}.checklist-title{display:block;margin:1.25rem 0 .75rem;color:#999;font-size:.68rem;text-transform:uppercase}.protocol label{display:block;margin:.7rem 0;color:#ddd;font-size:.8rem}.protocol input{margin-right:.5rem;accent-color:#e50914}.not-found{padding:2rem 0;text-align:center}.not-found p{color:#999}.not-found strong{color:#ff6b72;font-size:.75rem}.session-stats{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-top:1rem;padding:1rem;background:#242424;border-radius:.4rem}.session-stats>div:first-child{display:flex;align-items:center;gap:.75rem}.history{color:#ff6b72;font-size:1.5rem}.session-stats strong{font-size:.85rem}.session-stats p{margin:.2rem 0 0;color:#999;font-size:.75rem}.stats-actions{display:flex;align-items:center;gap:1rem;color:#999;font-size:.7rem;text-transform:uppercase}.stats-actions b{color:#4ade80}.stats-actions button{color:#ddd;background:#303030;font-size:.68rem}@media(max-width:900px){.workspace{grid-template-columns:1fr}.sidebar{position:static;width:auto}.sidebar-footer{display:none}main{margin-left:0}.content{padding:1rem}}@media(max-width:600px){.topbar{padding:1rem}.station-status{display:none}.terminal-heading{align-items:flex-start;flex-direction:column}.query-bar{flex-direction:column}.query-bar button{padding:1rem}.member-metrics,.details{grid-template-columns:1fr}.member-actions,.session-stats,.stats-actions{align-items:stretch;flex-direction:column}}
</style>
