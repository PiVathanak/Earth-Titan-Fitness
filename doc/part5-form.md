# Part 5 — Forms with Validation and Per-Field Error Messages

## What Changed

1. **Admin Member Create / Edit Form ([`AddMemberModal.vue`](../Earth-Titan-Fitness/src/components/admin/AddMemberModal.vue))**:
   - Uses `novalidate` with reactive `touched` tracking (`@blur`) and `submitted` state so errors appear underneath each field as soon as the user leaves a field or submits.
   - Validates every field with a clear `<small class="error">` message directly under the input:
     - **Full name:** required, 2–60 chars, letters/spaces/punctuation only.
     - **Email address:** required, valid email format, and unique across existing members (`store.isEmailTaken`).
     - **Gym ID:** required, matches `ETF-12345` (`^ETF-\d{5}$`), and unique (`store.isCodeTaken`).
     - **Plan:** required selection from available plans.
     - **Register date:** required and cannot be in the future.
     - **Expire date:** required and must be after the register date.
2. **Role Login Form ([`LoginPage.vue`](../Earth-Titan-Fitness/src/views/LoginPage.vue))**:
   - Validates **Email**, **Password** (required, min 6 characters), and **Gym ID** (`^ETF-\d{5}$` when on the Customer tab) with `<p class="text-xs text-error">` messages directly under each field.

