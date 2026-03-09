# Freedom City North Star

## Product North-Star Sentence
**Freedom City is the operational nerve center for the charity: a secure, role-aware, mobile-first control plane that unifies donations, volunteers, programs, compliance, and board reporting into one auditable system of record.**

## Mission
Build Freedom City as the charity’s mission-critical internal operating system (not a brochure site, not a generic admin panel).

## Non-Negotiables (Upgrade Gate)
1. **Build integrity**: `npm run lint` and `npm run build` pass.
2. **Security architecture**: authentication + authorization split is preserved (middleware optimistic gate + server-side enforcement + DAL + RLS).
3. **Org-role model**: role-aware access patterns remain explicit (`super_admin`, executive, finance, development, volunteer, program, board, staff).
4. **Auditability**: each run regenerates timestamped audit evidence and north-star check artifacts.
5. **Operational focus**: roadmap remains centered on queues, approvals, documents, and board readiness — not vanity analytics.

## Operating Lanes
- Executive lane
- Development/fundraising lane
- Volunteer operations lane
- Program delivery lane
- Compliance/finance lane
- Board lane

## Phase Roadmap (Canonical)
1. Replace mock-data views with DB-backed reads (org bootstrap, memberships, donors, volunteers, tasks, approvals, activity feed).
2. Implement hard authorization (membership roles, DAL checks, RLS, production-safe demo behavior).
3. Ship core workflows (receipts, shift scheduling/check-in, board packets, deadlines, notifications).
4. Add board-ready reporting and summaries.
5. Differentiate with outcome intelligence and cross-lane risk scoring.

## Hourly Protocol
Every hour automation must:
1. Load this file and `docs/NORTH_STAR_RESEARCH.md`.
2. Delete old `audit/full-scope-*` folders.
3. Regenerate full-scope audit artifacts (20 markdown files).
4. Run north-star checks and write `audit/NORTHSTAR_CHECK.md`.
5. Push to GitHub only if all gates pass.
