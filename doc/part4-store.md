# Part 4 — Pinia Stores Handling Loading, Error, Empty, and Success

## What Changed

Created three Pinia stores in `src/stores/`:

1. **[`src/stores/branches.ts`](../Earth-Titan-Fitness/src/stores/branches.ts) (`useBranchesStore`)**:
   - Tracks `items`, `status` (`'idle' | 'loading' | 'error' | 'success'`), `error`, and `isEmpty` for the branch list, plus `current`, `currentStatus`, and `currentError` for a single branch.
   - Consumed by [`BranchesPage.vue`](../Earth-Titan-Fitness/src/views/BranchesPage.vue) and [`BranchDetailPage.vue`](../Earth-Titan-Fitness/src/views/BranchDetailPage.vue), which render dedicated UI states for:
     - **Loading:** skeleton cards / pulse placeholders (`aria-busy="true"`).
     - **Error:** alert banner with the error message and a **Try again** button that re-runs `fetchAll()` / `fetchOne(id)`.
     - **Empty:** clear empty message when no branches exist (`store.isEmpty`) or when filters match nothing.
     - **Success:** live branch cards with operating status calculated from opening hours and holiday overrides ([`src/utils/branchView.ts`](../Earth-Titan-Fitness/src/utils/branchView.ts)).
2. **[`src/stores/members.ts`](../Earth-Titan-Fitness/src/stores/members.ts) (`useMembersStore`)**:
   - Loads `/memberships?_expand=user` and performs full CRUD (`create`, `update`, `remove`) across `/users` and `/memberships`.
   - Consumed by [`MemberOverview.vue`](../Earth-Titan-Fitness/src/components/admin/MemberOverview.vue) with loading spinner, error retry state, empty registry prompt, and paginated table on success.
3. **[`src/stores/auth.ts`](../Earth-Titan-Fitness/src/stores/auth.ts) (`useAuthStore`)**:
   - Authenticates against `/users` (and verifies the customer's Gym ID against `/memberships`) and persists the session in `localStorage`.

