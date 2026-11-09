# Earth-Titan Fitness

## 1. Project Information

- **Project name:** Earth-Titan Fitness
- **Team / group:** Team Vathanak
- **Team members:** PI SereyVathanak (P20240045)

## 2. Problem Statement

1. **Problem:** Gym-goers often have difficulty finding gym locations and checking opening hours, especially on national holidays. Gym employees also struggle to manage member information and track membership subscriptions efficiently.
2. **Impact / need:** A gym management application is needed to help customers easily find gyms, check opening hours and holiday schedules, while allowing employees to manage member records and monitor subscription status, saving time and improving the overall gym experience.

- **Target users:** Gym-goers or potential customers who want to find gyms and check their opening hours, and gym employees who need to manage members and subscriptions.
- **Roles:**
  - **Role 1: Gym Employee / Cashier** — Manages member information, checks membership status, and tracks subscription payments and expiration dates.
  - **Role 2: Gym User / Customer** — Searches for gym locations, checks opening hours and national holiday schedules, and views available membership information.
  - **Role 3: Gym Administrator** — Manages user records, gym locations, and membership information.

## 3. User Stories

| ID    | User story                                                                                                                                                          | Priority (Must / Nice) | Acceptance criteria                                                                                                                                                                                   |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US-01 | As a Consumer, I want to view gym locations and opening hours, so that I can find a gym and plan my visits correctly.                                               | Must                   | Given a customer visits the webpage, when they open the gym information page, then the system displays the gym address, opening hours, and opening status on normal days or national holidays.        |
| US-02 | As a Consumer, I want to view my membership ID, registration date, and expiration date, so that I can check my subscription information.                            | Must                   | Given a customer has a registered account, when they access their membership page, then the system displays their correct membership ID, registration date, and expiration date.                      |
| US-03 | As a Gym Employee, I want to verify a customer's identity using their membership ID, so that I can confirm their identity and check in members more efficiently.    | Must                   | Given an employee enters a valid membership ID, when the system searches for the member, then it displays the matching member's information. If the ID is invalid, an error message is displayed.     |
| US-04 | As a Gym Employee, I want to check customer information and membership expiration dates, so that I can inform customers when their memberships are about to expire. | Must                   | When an employee searches for a member, the system displays their membership status and expiration date. Expired memberships are clearly marked.                                                      |
| US-05 | As a Consumer, I want to view a list of available protein drinks and beverages, so that I can choose products suitable for my workout needs.                        | Nice                   | The product page displays product names, prices, and availability.                                                                                                                                    |
| US-06 | As a Consumer, I want to view available supplements and their prices, so that I can compare products before purchasing.                                             | Nice                   | The supplement page displays product names, descriptions, prices, and availability.                                                                                                                   |
| US-07 | As a Gym Employee, I want to generate a payment receipt, so that customers can receive proof of their purchases.                                                    | Nice                   | After a successful purchase, the system generates a receipt containing the receipt number, purchased items, quantities, total amount, and payment date.                                               |
| US-08 | As a Gym Administrator, I want to create, view, update, and delete customer information, so that I can maintain accurate gym membership records.                    | Must                   | The administrator can perform all four CRUD operations. Invalid data is rejected, and unauthorized users cannot access these functions.                                                               |
| US-09 | As a Gym Administrator, I want to export gym data into CSV or PDF files, so that I can prepare monthly reports for the gym owner.                                   | Must                   | The administrator can select a reporting month and export the relevant data to a readable CSV or PDF file.                                                                                            |
| US-10 | As a Gym Employee, I want to search for customers by membership ID and sort customers by expiration date, so that I can retrieve member information quickly.        | Nice                   | When an employee enters a valid membership ID, the system displays the matching member. If no match exists, it displays a clear message. Employees can also sort customer records by expiration date. |

### Acceptance Criteria for the Three Most Important User Stories

#### US-01 — View Gym Locations and Opening Hours

- **Given** a customer opens the gym information page, **when** the page loads, **then** the gym's address and regular opening hours are displayed.
- **Given** a customer checks today's gym availability, **when** the page loads, **then** the system displays each gym's operating status (**Open** or **Closed**) based on its saved schedule for today.
- **Given** the gym's schedule has been updated by an authorized administrator, **when** a customer revisits the page, **then** the latest saved schedule is displayed.

#### US-02 — View Membership Information

- **Given** a customer has a registered membership, **when** they access their membership page after authentication, **then** their membership ID, registration date, and expiration date are displayed.
- **Given** a customer's subscription has expired, **when** they view their membership information, **then** the system clearly identifies the membership as expired.
- **Given** a customer attempts to access another member's private information, **when** the system validates the request, **then** access is denied unless the customer has the required authorization.

#### US-03 — Verify a Customer's Identity

- **Given** an employee enters an existing membership ID, **when** the system processes the request, **then** it displays the matching member's record.
- **Given** an employee enters an invalid membership ID, **when** the system searches for the record, **then** it displays a message indicating that no member was found.

## 4. MVP Scope

### 4.1 Must-have (included in the MVP)

Features that are essential for the first usable release.

- **US-01: View Gym Locations and Opening Hours** — Consumers can view gym addresses, opening hours, and saved holiday schedules.
- **US-02: View Membership Information** — Authenticated consumers can view their own membership ID, registration date, expiration date, and status.
- **US-03: Verify Customer Identity** — Gym employees can search for customers using their membership IDs and check their registered information. Face verification is excluded from the MVP.
- **US-04: Check Membership Status** — Gym employees can view customer information, membership status, and expiration dates to identify expired memberships.
- **US-08: Manage Customer Information** — Gym administrators can create, view, update, and delete customer records while ensuring data validity and preventing unauthorized access.
- **US-09: Export Monthly Reports** — Gym administrators can export relevant gym data into CSV or PDF files for the gym owner.

### 4.2 Nice-to-have (not required for the first release)

Features that can be postponed if time or resources are limited.

- **US-05: View Protein Drinks and Beverages** — Consumers can view available products, prices, and availability.
- **US-06: View Supplements** — Consumers can browse supplements, read product descriptions, compare prices, and check availability.
- **US-07: Generate Payment Receipts** — Gym employees can generate receipts containing receipt numbers, purchased items, quantities, total amounts, and payment dates.

- **US-10: Search and Sort Customers** — Gym employees can search by membership ID and sort customer records by expiration date. Basic membership-ID lookup remains part of US-03.

### 4.3 Story Cut from the MVP

- **Feature:** Face verification from US-03.
- **Reason:** Face verification requires additional development, camera integration, and appropriate protection of customers' biometric data. Implementing it could increase the complexity and development time of the first release.
- **Impact / alternative:** Gym employees can still verify memberships by searching for membership IDs and checking registered information and membership status. This allows the gym to verify memberships without facial recognition technology.

## 5. Entities, Attributes, and Relationships

### Entity 1. User

- `user_id` (PK)
- `name`
- `email` (Unique)
- `password_hash`
- `role` (Consumer, Employee, Administrator)

### Entity 2. GymBranch

- `branch_id` (PK)
- `branch_name`
- `address`
- `opening_time`
- `closing_time`
- `holiday_schedule`

### Entity 3. Membership

- `membership_id` (PK)
- `user_id` (FK, Unique)
- `registration_date`
- `expiration_date`
- `status` (Active, Expired)

## 6. Relationships and Constraints

1. A user can have zero or one membership.
2. Each membership belongs to one user.
3. Earth-Titan Fitness has multiple branches under the same gym brand.
4. A membership is valid across all Earth-Titan Fitness branches, not just one specific branch.
5. Customers must physically arrive at a branch and present their membership ID for an employee to verify their membership.
6. Employees check whether the membership is active and has not expired before allowing entry.
7. Customers can view only their own membership information.
8. The system stores branch information but does not record individual check-in events.

## 7. Stretch Feature

Choose one:

- [x] Search + pagination
- [ ] File upload
- [ ] Real-time feature
- [ ] Scheduled task

**Chosen feature:** Search + pagination

**What it does in this app:** Employees and administrators can search for customer information by membership ID or filter records by expiration or subscription status. Search results are displayed across multiple pages.

**User value:** Staff can find customer records more quickly and manage large lists more efficiently.

**Dependencies / risks:** Search and filter logic, pagination controls, database queries, and preserving filters when changing pages.

**Why it is a stretch feature:** Basic membership-ID lookup is included in the MVP. Advanced search, filtering, and pagination can be added after the core features are complete.

## Repository

[Earth-Titan Fitness — GitHub](https://github.com/PiVathanak/Earth-Titan-Fitness.git)
