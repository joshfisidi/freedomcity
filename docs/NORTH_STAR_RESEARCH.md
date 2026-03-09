Below is a research-backed north star for **Freedom City** as a **central charity operations dashboard** built with **Next.js + Tailwind CSS + shadcn/ui + Supabase**.

Your current repo is already a credible shell for this direction: it has a clean App Router surface, a shared dashboard shell, Supabase SSR auth wiring, protected route middleware, and a branded visual system, but the domain layer is still mostly mock-data driven and role authorization is not yet implemented.   

---

# Freedom City North Star

**Freedom City should become the operating system for the charity.**

Not a brochure site. Not a loose admin panel.
A **mission-critical internal control center** where staff, coordinators, finance, volunteer leads, and board-facing operators can:

* manage donations and donor stewardship
* coordinate volunteers, shifts, and field activity
* track programs, cases, and service delivery
* control compliance, receipts, grants, and approvals
* assemble board-ready reporting from live operational data
* do all of that securely from desktop or mobile

That is already implicit in the current codebase: the shell is organized around `/app`, `/programs`, `/board`, `/team`, and `/settings`, with a “keep the whole charity moving” posture and a mobile-first dashboard model.  

---

# What the current codebase actually is

## Strengths already in place

The repo already has the right skeletal structure:

* **Next.js App Router**
* **Supabase SSR-style split** between browser and server clients
* **middleware-protected routes** for dashboard sections
* **shared AppShell** with desktop and mobile navigation
* **shadcn-style primitive layer** for cards, badges, buttons, inputs, progress
* **strict TypeScript**
* successful build and lint state    

## Real gaps

The main gaps are architectural, not aesthetic:

1. **Auth exists, authorization does not.**
   You have authenticated-route protection, but not a robust org-role model yet. 

2. **The app is presentation-first.**
   Core views are still powered by mock metrics and static board/program/team data. 

3. **Demo mode intentionally opens the dashboard if env is missing.**
   That is fine for shipping UI, but not acceptable for production charity operations. 

4. **The current information architecture is broad but not yet normalized.**
   The routes are correct, but the backend needs a canonical operational model underneath them. 

---

# Best-practice product shape for a charity operations center

For a nonprofit dashboard, the highest-leverage model is **not** “one giant CRM clone.” It is a **control plane** with separate operational lanes:

## 1. Executive lane

For ED, ops lead, finance lead, board-prep admin.

Primary widgets:

* cash in / cash out
* recurring donors
* donor retention trend
* urgent compliance items
* volunteer coverage gaps
* program throughput
* pending approvals
* board packet readiness

Recurring giving and donor retention matter disproportionately because recurring donors retain at much higher rates than one-time donors; Blackbaud reports 81% recurring donor retention in FY24 vs 46% for single-gift-only donors. ([The ENGAGE Blog by Blackbaud][1])

## 2. Development / fundraising lane

Primary functions:

* donor profiles
* gifts
* recurring gift management
* pledge tracking
* receipts
* campaigns
* donor notes / stewardship tasks
* lapsed donor recovery queue

Retention should be a first-class metric. Bloomerang cites low first-time donor retention and emphasizes repeat-gift conversion and impact communication as core levers. ([Bloomerang][2])

## 3. Volunteer operations lane

Primary functions:

* volunteer onboarding
* role matching
* shift creation
* attendance / check-in
* hours logging
* certifications / waivers
* SMS/email reminders
* no-show and coverage monitoring

Volunteer platforms consistently center scheduling, hour tracking, communications, permissions, and self-service profile updates as core admin capabilities. ([VolunteerHub][3])

## 4. Program delivery lane

Primary functions:

* programs
* cohorts / families / cases
* service events
* outcomes
* case notes
* referrals
* partner organizations
* capacity and waitlists

This is where Freedom City becomes differentiated: donor/volunteer/admin data should converge into a service-delivery view.

## 5. Compliance + finance lane

Primary functions:

* donation receipts
* grant files
* reimbursements
* vendor docs
* insurance / policy renewals
* board resolution archive
* audit evidence
* approval workflows

## 6. Board lane

Primary functions:

* packet assembly
* board metrics
* meeting agenda readiness
* approvals status
* major risks
* funding concentration
* unresolved compliance items
* document access / minutes history

Boardable’s nonprofit positioning reinforces that centralized packets, reporting, meeting materials, and engagement tracking are the relevant board layer. ([Boardable][4])

---

# The right technical philosophy for this stack

The strongest pattern here is:

## Thin routes, thick data layer

Next.js currently recommends separating:

* **authentication**
* **session management**
* **authorization**

and specifically recommends a **Data Access Layer** plus DTO shaping for secure checks. It also distinguishes optimistic route checks from secure database-backed authorization. ([Next.js][5])

That aligns exactly with what Freedom City should do.

### Use the framework like this

* **Middleware**: only for lightweight optimistic gating
* **Server Components / Server Actions / Route Handlers**: for actual secure reads and writes
* **DAL**: one place for permissioned queries and mutation logic
* **Supabase RLS**: final enforcement boundary

That means your current middleware is directionally right, but it should become only the first gate, not the only gate.  ([Next.js][5])

---

# Recommended application architecture

## Frontend

**Stack**

* Next.js App Router
* Tailwind CSS
* shadcn/ui
* server-first rendering
* client islands only where interaction requires it

This matches both Next.js App Router guidance and shadcn’s composable component model. ([Next.js][6])

## Backend

**Core**

* Supabase Postgres
* Supabase Auth
* Supabase Storage
* Supabase Realtime
* optional Edge Functions / DB Webhooks for async side effects

Supabase’s recommended SSR model is a browser client + server client split with middleware/proxy support for refreshed auth state, which matches your current codebase direction. ([Supabase][7])

## Enforcement model

* **Auth**: Supabase Auth
* **Org membership + role**: Postgres tables
* **Authorization**: RLS + DAL
* **Audit trail**: append-only activity table
* **Notifications**: DB-triggered jobs / webhooks / queue processor

## UX model

* **Red / gold / white** visual identity
* **high-contrast cards**
* **task-first layouts**
* **mobile-first bottom nav**
* **large tap targets**
* **boards and tables only where they reduce operational friction**

Your current button/card/badge variants already encode this brand posture well.  

---

# Recommended domain model for Supabase

The app should be **multi-role, single-organization aware** from day one, even if Freedom City is the only org for now.

## Core org / identity tables

```sql
organizations
- id uuid pk
- name text
- slug text unique
- status text
- created_at timestamptz

profiles
- id uuid pk references auth.users(id)
- full_name text
- phone text
- avatar_url text
- created_at timestamptz

organization_memberships
- id uuid pk
- organization_id uuid references organizations(id)
- user_id uuid references profiles(id)
- role text -- super_admin, executive, ops_lead, finance, development, volunteer_lead, program_manager, board_member, staff
- status text -- invited, active, suspended
- created_at timestamptz
```

## Donor / fundraising tables

```sql
donors
- id uuid pk
- organization_id uuid
- type text -- individual, household, corporate, foundation, church, partner
- full_name text
- email text
- phone text
- address jsonb
- tags text[]
- created_at timestamptz

donations
- id uuid pk
- organization_id uuid
- donor_id uuid
- amount numeric(12,2)
- currency text
- frequency text -- one_time, monthly, annual
- method text -- cash, card, ach, cheque, wire
- campaign_id uuid null
- status text -- pending, succeeded, failed, refunded
- donated_at timestamptz

receipts
- id uuid pk
- organization_id uuid
- donation_id uuid
- receipt_number text unique
- issued_at timestamptz
- pdf_path text
```

## Volunteer tables

```sql
volunteers
- id uuid pk
- organization_id uuid
- linked_profile_id uuid null
- full_name text
- email text
- phone text
- onboarding_status text
- background_check_status text
- notes text

shifts
- id uuid pk
- organization_id uuid
- program_id uuid null
- title text
- location text
- start_at timestamptz
- end_at timestamptz
- capacity int
- required_roles text[]
- status text

shift_assignments
- id uuid pk
- shift_id uuid
- volunteer_id uuid
- status text -- invited, confirmed, checked_in, completed, no_show, cancelled
- checked_in_at timestamptz
- checked_out_at timestamptz
```

## Program / case tables

```sql
programs
- id uuid pk
- organization_id uuid
- name text
- category text
- status text
- owner_membership_id uuid null

participants
- id uuid pk
- organization_id uuid
- type text -- person, family, household
- display_name text
- metadata jsonb

services
- id uuid pk
- organization_id uuid
- program_id uuid
- participant_id uuid
- service_type text
- delivered_at timestamptz
- quantity numeric
- notes text
- created_by uuid
```

## Compliance / governance tables

```sql
tasks
- id uuid pk
- organization_id uuid
- title text
- description text
- lane text -- ops, finance, board, development, volunteer, compliance
- priority text
- status text
- due_at timestamptz
- owner_membership_id uuid null

approvals
- id uuid pk
- organization_id uuid
- entity_type text
- entity_id uuid
- requested_by uuid
- assigned_to uuid
- status text -- pending, approved, rejected
- requested_at timestamptz
- resolved_at timestamptz

documents
- id uuid pk
- organization_id uuid
- kind text -- board_packet, grant, receipt, policy, waiver, invoice, minutes
- title text
- storage_path text
- metadata jsonb
- uploaded_by uuid
- created_at timestamptz
```

## System / audit tables

```sql
activity_log
- id bigserial pk
- organization_id uuid
- actor_user_id uuid null
- entity_type text
- entity_id uuid
- action text
- payload jsonb
- created_at timestamptz

notifications
- id uuid pk
- organization_id uuid
- user_id uuid
- type text
- title text
- body text
- read_at timestamptz null
- created_at timestamptz
```

---

# Supabase policy model

This is where the app becomes durable.

Supabase explicitly recommends **RLS** on exposed-schema tables and treats it as defense in depth. Auth and JWT claims integrate directly with authorization policy. ([Supabase][8])

## Policy strategy

### 1. Never trust route protection alone

Middleware is convenience.
RLS is enforcement.

### 2. Scope all business data by `organization_id`

Every row should belong to an org.

### 3. Role resolution via membership

Policies should check current user membership inside the org.

### 4. Separate “read broad, write narrow”

Example:

* board members can read board packets and executive dashboards
* finance can issue receipts
* volunteer leads can manage shifts
* program staff can update service records
* only admins can manage memberships

### 5. Hide service-role work behind server-only paths

Supabase warns not to expose `service_role` client-side because it bypasses RLS. ([Supabase][9])

---

# Recommended route and feature map

Your existing route surface is a good start, but it should be expanded into domain-specific subroutes instead of stuffing everything into flat pages. 

## Proposed route tree

```text
/app
  /overview
  /inbox
  /tasks
  /activity

/donors
  /list
  /[donorId]
  /campaigns
  /recurring
  /receipts

/volunteers
  /list
  /shifts
  /check-in
  /hours
  /onboarding

/programs
  /list
  /[programId]
  /participants
  /services
  /outcomes

/finance
  /donations
  /reconciliation
  /receipts
  /budgets
  /exports

/compliance
  /approvals
  /documents
  /grants
  /policies
  /audit-log

/board
  /overview
  /packets
  /meetings
  /minutes
  /reports

/team
  /members
  /roles
  /invites

/settings
  /organization
  /branding
  /auth
  /integrations
```

---

# Dashboard composition that fits the mission

## Home dashboard should answer 5 questions in 5 seconds

1. **Are we funded today?**
2. **Are we staffed for today?**
3. **Are programs moving?**
4. **Are there risks or blockers?**
5. **Is the board / compliance surface under control?**

## Recommended hero row

* cash received this month
* recurring donor MRR
* volunteer coverage today
* families / participants served this week
* urgent approvals / compliance count

## Recommended second row

* staffing gaps
* donor follow-up queue
* grant / compliance due dates
* activity feed
* board packet readiness

## Recommended third row

* lane-specific cards by role
* “my approvals”
* “my shifts”
* “my assigned cases”
* “my unresolved receipts”

This is stronger than a generic analytics dashboard because it merges **throughput + exception handling + approvals**.

---

# shadcn/ui usage strategy

Use shadcn for **primitives and composition**, not for theme-chasing.

## Best fits for Freedom City

* **Card**: KPI surfaces, risk panels, board packet status
* **Table / Data Table**: donors, volunteers, shifts, receipts, approvals
* **Form patterns**: onboarding, donor edits, grant updates, note entry
* **Sheet / Drawer**: mobile actions
* **Tabs**: per-entity subviews
* **Dialog / Alert Dialog**: destructive confirmations, approval actions
* **Calendar**: shift scheduling
* **Chart**: lightweight KPI trend views only

shadcn’s table guidance specifically expects custom data tables built with TanStack Table for sorting/filtering/pagination, which fits donor/volunteer/admin lists well. Its form guidance also emphasizes accessible field composition and validation patterns. ([Shadcn UI][10])

## Important restraint

Do **not** over-index on charts.
A charity operations app is primarily:

* lists
* queues
* approvals
* schedules
* documents
* audit trails

Charts are supporting instrumentation, not the product center.

---

# Accessibility and interaction standards

This matters more for a charity system than many startup dashboards.

## Non-negotiables

* native HTML tables for static tabular content when possible
* interactive tabular interfaces only use grid/treegrid when necessary
* keyboard navigation first
* sufficient color contrast for red/gold palette
* visible focus rings
* text labels not icon-only for critical flows
* mobile-safe tap targets
* screen-reader names for actions

WAI guidance explicitly prefers native HTML tables where possible, and only recommends `grid`/`treegrid` when the table becomes a highly interactive widget. WCAG 2.2 remains the baseline for contrast, labels, and interaction clarity. ([w3.org][11])

## Specific note on your palette

Red + gold + white can work well visually, but gold-on-white and muted red-on-white often fail contrast in real UI.
So:

* use **deep red** for primary actions
* use **gold as accent/fill/supporting surfaces**, not as body text
* use dark neutral text for most content
* keep white/cream background dominant

---

# Realtime strategy for this app

Supabase Realtime is useful, but it should be applied selectively.

## Good realtime candidates

* live approval queue
* volunteer shift check-ins
* task board changes
* notifications
* recent activity feed
* document upload status
* donor import progress

## Bad realtime candidates

* every table on every page
* all board analytics
* every donor list mutation streamed to all users

Supabase documents that Postgres Changes can become a bottleneck at scale because each event must be authorized per subscribed user. Use it for targeted operational surfaces, not indiscriminately across the app. ([Supabase][9])

## Practical rule

* **Realtime for operational exceptions**
* **SSR/query for canonical views**
* **scheduled/materialized summaries for board reporting**

---

# Storage and document strategy

A charity dashboard always becomes a document system.

Use Supabase Storage for:

* receipts
* board packets
* meeting minutes
* grant files
* waivers
* policy docs
* invoices / reimbursement attachments

Then store only metadata in Postgres:

* who uploaded
* document type
* org
* linked entity
* version
* signed URL / access rules

This keeps the app audit-friendly and avoids bloating row payloads.

---

# Notification and workflow model

A central charity dashboard becomes truly useful when it creates **operational loops**.

## Trigger sources

* donation succeeded
* new volunteer registered
* shift under capacity
* receipt not issued within X hours
* approval overdue
* board meeting within 72 hours without packet complete
* grant deadline inside 7 days
* case follow-up overdue

## Delivery

* in-app notifications table
* digest emails
* optional SMS for urgent volunteer ops
* route-level inboxes (“My approvals”, “My gaps”, “My documents”)

Supabase Database Webhooks are a clean option for kicking off async workflows from table events. ([Supabase][12])

---

# Exact architectural recommendation for Freedom City

## Keep

* Next.js App Router
* Tailwind
* shadcn/ui
* Supabase SSR split
* branded card-based shell
* mobile-first nav

## Add immediately

* DAL under `src/lib/dal/*`
* typed schema and query layer
* org membership and roles
* RLS policies
* activity log
* notifications
* document metadata layer
* storage buckets
* real tables replacing mock data

## Add next

* TanStack Table-backed admin/data tables
* Zod schemas for all writes
* server actions for core mutations
* route handlers for exports and file workflows
* board reporting snapshots
* import/export jobs

---

# Concrete north-star build plan

## Phase 1 — Make the current repo real

Replace mock-data pages with database-backed reads.

Deliver:

* org bootstrap
* memberships
* donor list
* volunteer list
* task list
* approvals queue
* activity feed

This is the minimum point where the dashboard stops being decorative.

## Phase 2 — Lock down authorization

Implement:

* membership roles
* DAL permission checks
* RLS
* removal of public “demo mode” behavior in production
* tests for protected-route and mutation access

This directly addresses the largest repo risk. 

## Phase 3 — Operational workflows

Implement:

* receipts workflow
* shift scheduling + check-in
* board packet document flow
* grant deadline tracking
* notifications

This is where the product starts compounding labor efficiency.

## Phase 4 — Reporting and board readiness

Implement:

* recurring giving dashboard
* donor retention view
* program delivery summaries
* compliance aging
* exportable board summary pack

## Phase 5 — Differentiation

Implement:

* case/program outcome intelligence
* cross-lane risk scoring
* funding-to-program alignment views
* volunteer-to-service coverage forecasting

That is the layer generic nonprofit tools usually do badly.

---

# What I would change in this repo first

## 1. Add a proper data access layer

```text
src/lib/dal/
  auth.ts
  memberships.ts
  donors.ts
  volunteers.ts
  programs.ts
  tasks.ts
  approvals.ts
  documents.ts
  reports.ts
```

Reason: Next.js explicitly recommends a DAL for authorization-centralized apps. ([Next.js][5])

## 2. Replace `mock-data.ts` with typed entities and queries

Your current `mock-data.ts` is useful for shell development, but it is now the main barrier to production reality. 

## 3. Introduce org-role authorization

Current auth checks identify the user, but Freedom City needs to know whether that user is:

* board
* executive
* finance
* volunteer lead
* staff
* readonly
* suspended

## 4. Convert the homepage into a role-aware overview

Different users should land into different queue compositions, not identical dashboards.

## 5. Add documents + audit log before you add fancy analytics

For a charity, governance durability matters more than cosmetic analytics.

---

# Product north-star sentence

**Freedom City is the operational nerve center for the charity: a secure, role-aware, mobile-first control plane that unifies donations, volunteers, programs, compliance, and board reporting into one auditable system of record.**

That north star matches both the current route shell and the best external patterns for Next.js, Supabase, and nonprofit operations.  ([Next.js][5])

---

# Final recommendation

Do **not** pivot this into a generic CRM clone.

Build it as a **charity operations OS** with these priorities:

1. **org auth + RLS**
2. **queues and approvals**
3. **donor + volunteer + program core records**
4. **documents + audit log**
5. **board-ready summaries**
6. **selective realtime**

That gives you a system with control surfaces, low hidden state, and a direct path from current UI shell to production-grade internal platform.

The uploaded audit was useful and I relied on it heavily for the repo-grounded parts of this write-up. 

If you want the next step, I can turn this into a **full implementation blueprint** with:

* Supabase SQL schema
* RLS policies
* Next.js route map
* shadcn component inventory
* phased file-by-file refactor plan

[1]: https://blog.blackbaud.com/key-takeaways-from-the-donorcentrics-sustainer-summit/?utm_source=chatgpt.com "Key Takeaways from the donorCentrics Sustainer Summit"
[2]: https://bloomerang.com/blog/heres-why-bloomerang-customers-have-a-higher-first-time-donor-retention-rate-compared-to-the-industry-average/?utm_source=chatgpt.com "Why Bloomerang Customers Have High First-Time Donor Retention"
[3]: https://volunteerhub.com/platform/volunteer-database?utm_source=chatgpt.com "Access an Intuitive Volunteer Database with VolunteerHub"
[4]: https://boardable.com/features/reporting/?utm_source=chatgpt.com "Board Reporting Software: Insightful, Actionable, & User-Friendly"
[5]: https://nextjs.org/docs/app/guides/authentication?utm_source=chatgpt.com "Guides: Authentication | Next.js"
[6]: https://nextjs.org/docs/app?utm_source=chatgpt.com "Next.js Docs: App Router | Next.js"
[7]: https://supabase.com/docs/guides/with-nextjs?utm_source=chatgpt.com "Build a User Management App with Next.js | Supabase Docs"
[8]: https://supabase.com/docs/guides/database/postgres/row-level-security?utm_source=chatgpt.com "Row Level Security | Supabase Docs"
[9]: https://supabase.com/docs/guides/realtime/postgres-changes?utm_source=chatgpt.com "Postgres Changes | Supabase Docs"
[10]: https://ui.shadcn.com/docs/components/data-table%5C?utm_source=chatgpt.com "Data Table - shadcn/ui"
[11]: https://www.w3.org/WAI/ARIA/apg/patterns/table/?utm_source=chatgpt.com "Table Pattern | APG | WAI | W3C"
[12]: https://supabase.com/docs/guides/database/webhooks?utm_source=chatgpt.com "Database Webhooks | Supabase Docs"
