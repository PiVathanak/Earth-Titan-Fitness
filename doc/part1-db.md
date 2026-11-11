# Part 1 — Shape `db.json` Like the Weeks 6–7 API

## How It Connects to `doc/PROPOSAL.md`

Section 5 of [`doc/PROPOSAL.md`](./PROPOSAL.md) defines three core entities and their relationships:

1. **User** (`id`, `name`, `email`, `password`, `role`: `'customer' | 'employee' | 'admin'`)
2. **Membership** (`id`, `userId`, `membershipCode`, `plan`, `registrationDate`, `expirationDate`, `status`: `'active' | 'expired'`)
3. **GymBranch** (`id`, `name`, `address`, `openingTime`, `closingTime`, `weekendOpeningTime`, `weekendClosingTime`, `holidaySchedule`, `amenities`, `capacityPercent`)

Constraint #1 & #2 state that **each user has zero or one membership** and **each membership belongs to one user**, while Constraint #4 states that **a membership is valid across all branches** (so there is no `branchId` foreign key on `Membership`).

## What Changed

- Created [`Earth-Titan-Fitness/db.json`](../Earth-Titan-Fitness/db.json) with three top-level arrays: `"users"`, `"memberships"`, and `"branches"`.
- Linked `memberships` to `users` via `"userId"` (for example, `{ "id": 1, "userId": 1, "membershipCode": "ETF-89241", ... }`), allowing `json-server` to join records using `GET /memberships?_expand=user`.
- Created [`Earth-Titan-Fitness/src/types/api.ts`](../Earth-Titan-Fitness/src/types/api.ts) with matching TypeScript interfaces (`User`, `Membership`, `MembershipWithUser`, `GymBranch`).

