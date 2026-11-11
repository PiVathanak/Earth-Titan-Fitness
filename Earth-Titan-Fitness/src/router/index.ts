import { createRouter, createWebHistory } from 'vue-router'
import { homeForRole, useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types/api'

declare module 'vue-router' {
  interface RouteMeta {
    /** Roles allowed to open the page. Omit for public pages. */
    roles?: UserRole[]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue'),
    },
    {
      path: '/branches',
      name: 'branches',
      component: () => import('../views/BranchesPage.vue'),
    },
    {
      // Detail page with a route param, e.g. /branches/2
      path: '/branches/:id(\\d+)',
      name: 'branch-detail',
      component: () => import('../views/BranchDetailPage.vue'),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: '/membership',
      name: 'membership',
      component: () => import('../views/MembershipPage.vue'),
      meta: { roles: ['customer'] },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminPage.vue'),
      meta: { roles: ['admin'] },
    },
    {
      path: '/employee-status',
      name: 'employee-status',
      component: () => import('../views/EmployeeStatusPage.vue'),
      meta: { roles: ['employee', 'admin'] },
    },
    {
      // Catch-all 404 — must stay last
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundPage.vue'),
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// Role guard: not logged in -> /login, wrong role -> that role's own home page.
router.beforeEach((to) => {
  const roles = to.meta.roles
  if (!roles) return true

  const auth = useAuthStore()
  if (!auth.isLoggedIn || !auth.role) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (!roles.includes(auth.role)) {
    return homeForRole[auth.role]
  }
  return true
})

export default router
