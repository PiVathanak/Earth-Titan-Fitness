# Earth-Titan Fitness

A Vue 3 + TypeScript web application for **Earth-Titan Fitness**, built for the Internet Programming course. Customers can check gym locations, opening hours, and holiday schedules or inspect their membership card; staff verify memberships at the front desk; and administrators manage customer and membership records.

## How to Run It

### 1. Install dependencies

```sh
cd Earth-Titan-Fitness
npm install
```

### 2. Start the mock API (`json-server`)

Open a terminal and run:

```sh
npm run api
```

This watches `db.json` and serves the REST API at `http://localhost:3000` (`/users`, `/memberships`, `/branches`). Keep this terminal open.

### 3. Start the Vite dev server

Open a **second** terminal in `Earth-Titan-Fitness` and run:

```sh
npm run dev
```

Then open the URL printed by Vite (normally `http://localhost:5173`).

> Optional: copy `.env.example` to `.env` if you want to point `VITE_API_URL` at a different port or backend.

## Demo Accounts (`/login`)

| Role | Tab | Email | Password | Gym ID (Customer tab only) |
| --- | --- | --- | --- | --- |
| Customer (active) | Customer | `m.vance@titanathletics.io` | `titan123` | `ETF-89241` |
| Customer (expiring soon) | Customer | `e.rostova@heavyiron.org` | `titan123` | `ETF-91044` |
| Customer (expired) | Customer | `d.kross@titanathletics.io` | `titan123` | `ETF-73412` |
| Employee / Cashier | Staff Desk | `staff@titanathletics.io` | `staff123` | — |
| Administrator | Command | `command@titanathletics.io` | `admin123` | — |

## Main Routes

| Path | Description | Access |
| --- | --- | --- |
| `/` | Home page | Public |
| `/about` | About Earth-Titan Fitness | Public |
| `/branches` | All gym branches, hours, and holiday status | Public |
| `/branches/:id` | Single branch detail page (e.g. `/branches/2`) | Public |
| `/login` | Role-based sign in | Public |
| `/membership` | Customer digital membership card & countdown | Customer |
| `/employee-status` | Staff rapid check-in & membership ID lookup | Employee, Admin |
| `/admin` | Admin command center (member CRUD, search & pagination) | Admin |
| `/:pathMatch(.*)*` | 404 Not Found page | Public |

## Other Scripts

```sh
npm run type-check   # TypeScript + vue-tsc check
npm run build        # Production build
npm run test:unit    # Vitest unit tests
```
