import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/membership',
      name: 'membership',
      component: () => import('../views/MembershipPage.vue'),
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
    },
    {
      path: '/employee-status',
      name: 'employee-status',
      component: () => import('../views/EmployeeStatusPage.vue'),
    },
  ],
})

export default router
