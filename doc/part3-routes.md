# Part 3 — Routes, Detail Page with Param, 404 Page, and Role Guard

## What Changed

1. **Updated [`Earth-Titan-Fitness/src/router/index.ts`](../Earth-Titan-Fitness/src/router/index.ts)**:
   - **Main pages:** `/`, `/about`, `/branches`, `/login`, `/membership`, `/employee-status`, `/admin`.
   - **Detail page with route param:** `/branches/:id(\\d+)` mapped to [`BranchDetailPage.vue`](../Earth-Titan-Fitness/src/views/BranchDetailPage.vue) with `props: (route) => ({ id: Number(route.params.id) })`.
   - **Catch-all 404 page:** `/:pathMatch(.*)*` mapped to [`NotFoundPage.vue`](../Earth-Titan-Fitness/src/views/NotFoundPage.vue).
2. **Added role-based navigation guard (`router.beforeEach`)**:
   - Routes declare required roles in `meta.roles`:
     - `/membership` → `['customer']` (Proposal Constraint #7: customers view their own membership)
     - `/employee-status` → `['employee', 'admin']` (US-03 / US-04 staff desk)
     - `/admin` → `['admin']` (US-08 admin CRUD)
   - Unauthenticated visitors are redirected to `/login?redirect=...`.
   - Logged-in users with the wrong role are redirected to their role's home route (`homeForRole`).
3. **Updated [`AppHeader.vue`](../Earth-Titan-Fitness/src/components/AppHeader.vue)** so navigation links point to real routes (`/branches`, `/membership`) and show the active user + Log Out button when signed in.

