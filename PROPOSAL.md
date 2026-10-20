# Software Specification Review (SSR) Template

> **Purpose:** Use this template to review the requirements and scope of a software project before implementation. Adapt it to your lecturer's or team's required format.

## 1. Project Information

- **Project name:** Earth-Titan Fitness
- **Team / group:** Team Vathanak
- **Team members:** PI sereyVathanak(p20240045)
- **Reviewer(s):** PM and Developer

## 2. Problem Statement

State the problem in **two sentences**.

1. **Problem:** Gym-goers often have difficulty finding gym locations and checking opening hours, especially on national holidays. Gym employees also struggle to manage member information and track membership subscriptions efficiently.
2. **Impact / need:** A gym management application is needed to help customers easily find gyms, check opening hours and holiday schedules, while allowing employees to manage member records and monitor subscription status, saving time and improving the overall gym experience.

- **Target users:** Gym-goers or potential customers who want to find gyms and check their opening hours, and gym employees who need to manage members and subscriptions.
- **Roles (at least two):**
  - **Role 1:** Gym Employee / Cashier — Manages member information, checks membership status, and tracks subscription payments and expiration dates.
  - **Role 2:** Gym User / Customer — Searches for gym locations, checks opening hours and national holiday schedules, and views available membership information.
  - **Role 3:** Gym Admin / — Performs CRUD (Create, Read, Update, Delete) operations on customer information, manages gym records, and exports monthly reports in CSV or PDF format for the gym owner.

## 3. User Stories

Provide **6–10 user stories** in this format:

> As a **[type of user]**, I want **[goal / action]**, so that **[benefit]**.

| ID    | User story                                                                                                                                                     | Priority (Must / Nice) | Acceptance criteria                                                                                                                                                                                                                  | SSR result / notes |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| US-01 | As a Consumer, I want to view gym locations and opening hours, so that I can find the gym and plan my visits correctly.                                        | Must                   | Given a customer visits the webpage, when they open the gym information page, then the system displays the gym address, opening hours, and opening status on normal day or National Holiday.                                         |                    |
| US-02 | As a Consumer, I want to view my membership ID, registration date, and expiration date, so that I can check my subscription information.                       | Must                   | Given a customer has a registered account, when they access their membership page, then the system displays their correct membership ID, registration date, and expiration date.                                                     |                    |
| US-03 | As a Gym Employee, I want to verify a customer's ID and face, so that I can confirm their identity and check in members more efficiently.                      | Must                   | Given an employee enters a valid membership ID, when the system searches for the member, then it displays the matching member's information and supports identity verification. If the ID is invalid, an error message is displayed. |                    |
| US-04 | As a Gym Employee, I want to check customer information and subscription due dates, so that I can inform customers when their memberships are about to expire. | Must                   | When an employee searches for a member, the system displays their membership status and expiration date. Expired memberships are clearly marked.                                                                                     |                    |
| US-05 | As a Consumer, I want to view a list of available protein drinks and beverages, so that I can choose products suitable for my workout needs.                   | Nice                   | The product page displays product names, prices, and availability.                                                                                                                                                                   |                    |
| US-06 | As a Consumer, I want to view available supplements and their prices, so that I can compare products before purchasing.                                        | Nice                   | The supplement page displays product names, descriptions, prices, and availability.                                                                                                                                                  |                    |
| US-07 | As a Gym Employee, I want to generate a payment receipt, so that customers can receive proof of their purchases.                                               | Nice                   | After a successful purchase, the system generates a receipt containing the receipt number, purchased items, quantities, total amount, and payment date.                                                                              |                    |
| US-08 | As a Gym Administrator, I want to create, view, update, and delete customer information, so that I can maintain accurate gym membership records.               | Must                   | The administrator can perform all four CRUD operations. Invalid data is rejected, and unauthorized users cannot access these functions.                                                                                              |                    |
| US-09 | As a Gym Administrator, I want to export gym data into CSV or PDF files, so that I can prepare monthly reports for the gym owner.                              | Must                   | The administrator can select a reporting month and export the relevant data to a readable CSV or PDF file.                                                                                                                           |                    |
| US-10 | As a Gym Employee, I want to search, for customers by membership ID, Sort customers by expire or due date so that I can retrieve member information quickly.   | Nice                   | When an employee enters a valid membership ID, the system displays the matching member. If no match exists, it displays a clear message.                                                                                             |                    |

**Acceptance criteria requirement:** Write acceptance criteria for the **three most important user stories** at minimum. Use measurable, observable outcomes; add criteria for other stories if useful.

### US-01 — View gym locations and opening hours

- **Given** a customer opens the gym information page, **when** the page loads, **then** the gym's address and regular opening hours are displayed.
- **Given** a customer checks today's gym availability, **when** the page loads, **then** the system displays all gym locations with their real-time operating status (**Open** or **Closed**) for today.
- **Given** the gym's schedule has been updated by an authorized administrator, **when** a customer revisits the page, **then** the latest saved schedule is displayed.

### US-02 — View membership information

- Given a customer has a registered membership, when they access their membership page after the required authentication, then their membership ID, registration date, and expiration date are displayed.
- Given a customer's subscription has expired, when they view their membership information, then the system clearly identifies the membership as expired.
- Given a customer attempts to access member's private information, when the system validates the request, then access is denied unless the customer has the required authorization.

### US-03 — Verify a customer's identity

- Given an employee enters an existing membership ID, when the system processes the request, then it displays the matching member's record.
- Given an employee enters an invalid membership ID, when the system searches for the record, then it displays a message indicating that no member was found.
- Given face verification is implemented and the member has valid enrollment data and consent, when verification is performed, then the system displays a clear verification result to the authorized employee.

## 4. MVP Scope

### 4.1 Must-have (included in the MVP)

Features that are essential for the first usable release.

- US-01: View Gym Locations and Opening Hours — Consumers can view gym addresses, opening hours, and location opening status to plan their visits.
- US-02: View Membership Information — Consumers can view their membership ID, registration date, and expiration date.
- US-03: Verify Customer Identity — Gym employees can search for customers using their membership IDs and check their registered information to verify their identities. Face verification is excluded from the MVP.
- US-04: Check Membership Status — Gym employees can view customer information, membership status, and expiration dates to identify expired memberships.
- US-10: Search Customers by Membership ID — Gym employees can search for members quickly, with a clear message displayed when no matching member is found.

### 4.2 Nice-to-have (not required for the first release)

Features that can be postponed if time or resources are limited.

- US-05: View Protein Drinks and Beverages — Consumers can view available products, prices, and availability.
- US-06: View Supplements — Consumers can browse supplements, read product descriptions, compare prices, and check availability.
- US-07: Generate Payment Receipts — Gym employees can generate receipts containing receipt numbers, purchased items, quantities, total amounts, and payment dates.
- US-08: Manage Customer Information — Gym administrators can create, view, update, and delete customer records while ensuring data validity and preventing unauthorized access.
- US-09: Export Monthly Reports — Gym administrators can export relevant gym data into CSV or PDF files for the gym owner.

### 4.3 Story cut from the MVP

- **Face verification from US-03**: Verify Customer Identity.
- **Reason**: Face verification requires additional development, camera integration, and appropriate protection of customers' biometric data. Implementing it could increase the complexity and development time of the first release.
- **Impact / alternative**: Gym employees can still verify customers by searching for their membership IDs and checking their registered information and membership status. This allows the gym to verify memberships without requiring facial recognition technology.

## 5. Entities, Attributes, and Relationships

List the main data entities. Include **at least three entities**, their important attributes, and how they relate to one another.

| Entity              | Main attributes                                                                                                                | Relationships                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gym Consumer / User | - GymID (Primary Key)<br>- Name<br>- Email<br>- Password (Hashed)<br>- RegisterDate<br>- DueDate<br>- RemainingDay<br>- Status | - A consumer can have one membership records over time.<br>- A consumer can make multiple purchases.<br>- A consumer's membership status can be checked by gym employees.                        |
| Employee            | - EmployeeID (Primary Key)<br>- Name<br>- Role<br>- NationalCardNumber<br>- Email<br>- Password (Hashed)                       | - An employee can verify multiple consumers' membership information.<br>- An employee can process multiple purchase transactions.<br>- An employee belongs to a gym location.                    |
| administrator       | - AdminID (Primary Key)<br>- Name<br>- Email<br>- Password (Hashed)                                                            | - An administrator can create, view, update, and delete consumer records.<br>- An administrator can manage gym information.<br>- An administrator can generate monthly reports for the gym owner |

## 6. Chosen Stretch Feature

Name one optional feature that may be implemented if the core MVP is completed.

- **Stretch feature:** Mapping API that when user click on one distributed location, it open in map directly
- **User value:** user don't have to go to google map and search for specific name.
- **Dependencies / risks:** Map API
- **Why it is a stretch feature:** it hard to implement and need to spend money

## 11. Review Decision

- **Decision:** [Approved / Approved with Actions / Rejected / Re-review Required]
- **Conditions or outstanding issues:** [List any remaining items]
- **Reviewer comments:** [Summary of review]
- **Approval / acknowledgement:**
  - Product owner / stakeholder: [Name and date]
  - Team representative: [Name and date]
  - Reviewer / lecturer (if required): [Name and date]

## Stretch feature

Choose **one**:

- [x] Search + pagination
- [ ] File upload
- [ ] Real-time feature
- [ ] Scheduled task

**Chosen feature:**

**What it does in this app:** Employee and Admin can search for customer information by Membership ID or filter base on expire or subscribe status.

## Repository

[https://github.com/PiVathanak/Earth-Titan-Fitness.git](https://github.com/PiVathanak/Earth-Titan-Fitness.git)
