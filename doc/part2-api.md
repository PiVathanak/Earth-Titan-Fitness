# Part 2 — `json-server`, `api` Script, and `src/api/` Modules

## What Changed

1. **Installed `json-server` & added the `api` script** in [`Earth-Titan-Fitness/package.json`](../Earth-Titan-Fitness/package.json):
   ```json
   "api": "json-server --watch db.json --port 3000"
   ```
2. **Added [`Earth-Titan-Fitness/.env.example`](../Earth-Titan-Fitness/.env.example)** with `VITE_API_URL=http://localhost:3000` so switching to the real backend in weeks 6–7 only requires changing the environment variable.
3. **Created [`Earth-Titan-Fitness/src/api/http.ts`](../Earth-Titan-Fitness/src/api/http.ts)**:
   - Central `http<T>()` wrapper around `fetch` with base URL resolution, query-string builder, JSON serialization, `204 No Content` support, and a typed `ApiError` class.
   - Exports `api.get`, `api.post`, `api.put`, `api.patch`, `api.delete`, and `errorMessage()`.
4. **Created one API module per resource in `src/api/`**:
   - [`src/api/users.ts`](../Earth-Titan-Fitness/src/api/users.ts) — `list`, `get`, `findByEmail`, `create`, `update`, `remove` for `/users`.
   - [`src/api/memberships.ts`](../Earth-Titan-Fitness/src/api/memberships.ts) — `listWithUsers` (`_expand=user`), `get`, `findByCode` (US-03 lookup), `findByUser` (US-02 customer portal), `create`, `update`, `remove` for `/memberships`.
   - [`src/api/branches.ts`](../Earth-Titan-Fitness/src/api/branches.ts) — `list`, `get`, `create`, `update`, `remove` for `/branches`.

