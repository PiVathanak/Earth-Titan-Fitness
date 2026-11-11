<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import logoUrl from '@/images/logo.png'
import BranchOverview from '@/components/admin/BranchOverview.vue'
import EmployeeOverview from '@/components/admin/EmployeeOverview.vue'
import MemberOverview from '@/components/admin/MemberOverview.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const activeOverview = ref<'members' | 'employees' | 'branches'>('members')

function overviewFromHash(): 'members' | 'employees' | 'branches' {
  if (window.location.hash === '#employee') return 'employees'
  if (window.location.hash === '#branch') return 'branches'
  return 'members'
}

function selectOverview(overview: 'members' | 'employees' | 'branches') {
  activeOverview.value = overview
  const hash = overview === 'members' ? '#member' : overview === 'employees' ? '#employee' : '#branch'
  if (window.location.hash !== hash) {
    window.history.pushState(null, '', `${window.location.pathname}${hash}`)
  }
}

function logout() {
  auth.logout()
  router.push('/login')
}

function syncOverviewFromHash() {
  activeOverview.value = overviewFromHash()
}

onMounted(() => {
  syncOverviewFromHash()
  window.addEventListener('hashchange', syncOverviewFromHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncOverviewFromHash)
})
</script>

<template>
  <div class="admin-page">
    <aside class="sidebar">
      <div>
        <div class="brand"><img :src="logoUrl" alt="Earth-Titan Fitness" /></div>
        <div class="facility"><span>FACILITY STATION</span><strong>Downtown Iron Gym</strong><i /></div>
        <nav>
          <button :class="{ active: activeOverview === 'employees' }" type="button" @click="selectOverview('employees')">▣ <span>Employee Overview</span></button>
          <button :class="{ active: activeOverview === 'members' }" type="button" @click="selectOverview('members')">♟ <span>Member Overview</span></button>
          <button :class="{ active: activeOverview === 'branches' }" type="button" @click="selectOverview('branches')">▤ <span>Branch Overview</span></button>
          <button type="button">⌁ <span>Financial & Member Analytics</span></button>
        </nav>
      </div>
      <div class="sidebar-footer"><span>LIVE CAPACITY</span><div class="capacity"><i /></div><strong>{{ auth.user?.name ?? 'Administrator' }}</strong><small>Gym Administrator</small><button class="logout-button" type="button" @click="logout">↪ Logout</button></div>
    </aside>
    <main>
      <header class="topbar"><div><span class="eyebrow">COMMAND CENTER / OPERATIONS</span><h1>{{ activeOverview === 'members' ? 'Member Overview' : activeOverview === 'employees' ? 'Employee Overview' : 'Branch Overview' }}</h1></div><div class="topbar-user"><span class="online" /> SYSTEM ONLINE <b>MV</b></div></header>
      <section class="content">
        <MemberOverview v-if="activeOverview === 'members'" />
        <EmployeeOverview v-else-if="activeOverview === 'employees'" />
        <BranchOverview v-else />
      </section>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap');
.admin-page{min-height:100vh;color:#e5e5e5;background:#131313;font-family:Inter,sans-serif}.sidebar{position:fixed;inset:0 auto 0 0;z-index:5;display:flex;width:16rem;flex-direction:column;justify-content:space-between;padding:1.5rem 1rem;background:#0e0e0e;border-right:1px solid #2e2e2e}.brand{display:flex;align-items:center;gap:.65rem;padding:0 .5rem 2rem}.brand img{display:block;width:auto;height:3.5rem;max-width:13rem;object-fit:contain}.facility{position:relative;display:grid;gap:.3rem;margin-bottom:1.5rem;padding:.75rem;background:#1c1c1c;border:1px solid #303030;border-radius:.5rem}.facility span,.eyebrow{color:#e76d72;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.facility strong{color:#eee;font-size:.75rem}.facility i,.online{width:.55rem;height:.55rem;background:#22c55e;border-radius:50%;box-shadow:0 0 .5rem #22c55e}.facility i{position:absolute;top:1.2rem;right:.75rem}nav{display:grid;gap:.35rem}nav a,nav button{display:flex;align-items:center;gap:.65rem;padding:.75rem;color:#999;background:transparent;border:0;border-radius:.35rem;font:700 .7rem Inter,sans-serif;text-align:left;text-decoration:none;text-transform:uppercase;cursor:pointer}nav a:hover,nav button:hover,nav a.active,nav button.active{color:#fff;background:#e50914}.sidebar-footer{display:grid;gap:.35rem;padding-top:1rem;border-top:1px solid #303030;color:#eee;font-size:.75rem}.sidebar-footer>span{color:#999;font-size:.65rem;letter-spacing:.08em}.sidebar-footer small{color:#999}.capacity{height:.3rem;margin:.25rem 0 .5rem;background:#333;border-radius:1rem;overflow:hidden}.capacity i{display:block;width:84%;height:100%;background:#e50914}.logout-button{margin-top:.7rem;padding:.55rem;color:#ff6b72;background:transparent;border:1px solid #522326;border-radius:.3rem;cursor:pointer;font-size:.7rem;font-weight:700;text-align:left;text-transform:uppercase}.logout-button:hover{color:#fff;background:#e50914;border-color:#e50914}main{margin-left:16rem}.topbar{display:flex;align-items:center;justify-content:space-between;height:5rem;padding:0 2.5rem;border-bottom:1px solid #292929}.topbar h1{margin:.3rem 0 0;color:#fff;font:700 2rem/1 Oswald,sans-serif;text-transform:uppercase}.topbar-user{display:flex;align-items:center;gap:.6rem;color:#999;font-size:.65rem;font-weight:700;letter-spacing:.08em}.topbar-user b{display:grid;width:2rem;height:2rem;place-items:center;color:#fff;background:#303030;border-radius:50%}.content{max-width:92rem;margin:0 auto;padding:2.5rem}@media(max-width:750px){.sidebar{position:static;width:auto}.sidebar-footer{display:none}main{margin-left:0}.topbar{padding:1rem}.content{padding:1rem}.topbar-user{display:none}}
</style>
