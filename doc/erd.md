# Entity-Relationship Diagram (ERD) — Earth-Titan Fitness

This ERD defines the PostgreSQL relational schema for **Earth-Titan Fitness** (Milestone 2 — Prisma + NestJS), extending [`PROPOSAL.md`](./PROPOSAL.md) and [`api-contract.md`](./api-contract.md) with normalized `1:0..1`, `1:N`, and `N:N` relationships.

---

## 1. Visual ERD (Mermaid)

```mermaid
erDiagram
    GYM_BRANCH ||--o{ USER : "1:N home / assigned station"
    USER ||--o| MEMBERSHIP : "1:0..1 holds"
    GYM_BRANCH ||--o{ HOLIDAY_SCHEDULE : "1:N schedules"
    GYM_BRANCH ||--o{ BRANCH_AMENITY : "1:N includes"
    AMENITY ||--o{ BRANCH_AMENITY : "1:N available in"

    USER {
        int id PK
        string name
        string email UK
        string password_hash
        enum role "customer | employee | admin"
        int branch_id FK "nullable (home or assigned branch)"
    }

    MEMBERSHIP {
        int id PK
        int user_id FK,UK "1:0..1 with USER"
        string membership_code UK "ETF-XXXXX"
        enum plan "Titan Month-to-Month | Titan Standard Iron | Titan Pro Black"
        date registration_date
        date expiration_date
        enum status "active | expired"
    }

    GYM_BRANCH {
        int id PK
        string name UK
        string address
        string image
        string badge
        string opening_time "HH:mm"
        string closing_time "HH:mm"
        string weekend_opening_time "HH:mm"
        string weekend_closing_time "HH:mm"
        boolean is_24_hours
    }

    HOLIDAY_SCHEDULE {
        int id PK
        int branch_id FK
        date date
        string name
        enum type "regular | adjusted | closed"
        string opening_time "nullable HH:mm"
        string closing_time "nullable HH:mm"
    }

    AMENITY {
        int id PK
        string icon
        string label UK
    }

    BRANCH_AMENITY {
        int branch_id PK,FK
        int amenity_id PK,FK
    }
```

---

## 2. Box & Key Diagram (`1:0..1`, `1:N`, and `N:N` Lines)

```text
+-------------------------------+          1 : 0..1          +-------------------------------+
|             USER              |--------------------------->|          MEMBERSHIP           |
+-------------------------------+                            +-------------------------------+
| PK  id                  (INT) |                            | PK  id                  (INT) |
|     name            (VARCHAR) |                            | FK  user_id      (INT, UNIQUE)|
| UK  email           (VARCHAR) |                            | UK  membership_code (VARCHAR) |
|     password_hash   (VARCHAR) |                            |     plan               (ENUM) |
|     role               (ENUM) |                            |     registration_date  (DATE) |
| FK  branch_id (INT, NULLABLE) |                            |     expiration_date    (DATE) |
+-------------------------------+                            |     status             (ENUM) |
                ^                                            +-------------------------------+
                |
                | 1 : N  (One branch is the home / assigned station for many users)
                |
+-------------------------------+          1 : N             +-------------------------------+
|          GYM_BRANCH           |--------------------------->|       HOLIDAY_SCHEDULE        |
+-------------------------------+                            +-------------------------------+
| PK  id                  (INT) |                            | PK  id                  (INT) |
| UK  name            (VARCHAR) |                            | FK  branch_id           (INT) |
|     address         (VARCHAR) |                            |     date               (DATE) |
|     image           (VARCHAR) |                            |     name            (VARCHAR) |
|     badge           (VARCHAR) |                            |     type               (ENUM) |
|     opening_time    (VARCHAR) |                            |     opening_time    (VARCHAR) |
|     closing_time    (VARCHAR) |                            |     closing_time    (VARCHAR) |
|     weekend_opening (VARCHAR) |                            +-------------------------------+
|     weekend_closing (VARCHAR) |
|     is_24_hours     (BOOLEAN) |
+-------------------------------+
                |
                | 1 : N
                v
+-------------------------------+                            +-------------------------------+
|        BRANCH_AMENITY         |          N : 1             |            AMENITY            |
|      (N : N Join Table)       |<---------------------------|                               |
+-------------------------------+                            +-------------------------------+
| PK,FK branch_id         (INT) |                            | PK  id                  (INT) |
| PK,FK amenity_id        (INT) |                            |     icon            (VARCHAR) |
+-------------------------------+                            | UK  label           (VARCHAR) |
        (Resolves N : N between GYM_BRANCH and AMENITY)      +-------------------------------+
```

---

## 3. Relationships & Cardinality Explanation

| Relationship                        | Cardinality                         | Keys Involved                                                            | Rule in Earth-Titan Fitness                                                                                                                            |
| ----------------------------------- | ----------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`User` ↔ `Membership`**           | **`1 : 0..1`** (One-to-Zero-or-One) | `Membership.user_id` (`FK`, `UNIQUE` → `User.id`)                        | Each customer has at most one active/expired membership record; employees and admins have zero memberships.                                            |
| **`GymBranch` → `User`**            | **`1 : N`** (One-to-Many)           | `User.branch_id` (`FK`, nullable → `GymBranch.id`)                       | **One** branch serves as the home registered branch or staff duty station for **many** users, while each user has at most one primary/assigned branch. |
| **`GymBranch` → `HolidaySchedule`** | **`1 : N`** (One-to-Many)           | `HolidaySchedule.branch_id` (`FK` → `GymBranch.id`, `ON DELETE CASCADE`) | **One** gym branch has **many** national holiday schedule overrides (`regular`, `adjusted`, or `closed`).                                              |
| **`GymBranch` ↔ `Amenity`**         | **`N : N`** (Many-to-Many)          | `BranchAmenity(branch_id, amenity_id)` composite `PK` + `FK`s            | **One** branch offers **many** amenities (e.g., _Powerlifting Pods_, _Olympic Platforms_), and **one** amenity is available across **many** branches.  |
