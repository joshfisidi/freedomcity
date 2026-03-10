# Freedom City North Star

## Product North-Star Sentence
**Freedom City is the operational nerve center for the charity: a secure, role-aware, mobile-first control plane that unifies donations, volunteers, programs, compliance, and board reporting into one auditable system of record.**

## Positioning
- Not a brochure site.
- Not a generic CRM clone.
- A mission-critical internal charity operations OS.

## Mission
Enable staff, coordinators, finance, volunteer leads, and board operators to run core operations from one reliable surface.

## Strategic Priorities (in order)
1. Auth + authorization + RLS enforcement.
2. Operational queues and approvals.
3. Donor + volunteer + program system-of-record data.
4. Documents + audit log durability.
5. Board-ready reporting.
6. Selective realtime for operational exceptions.

## Non-Negotiables (Upgrade Gate)
1. **Build integrity:** `npm run lint` and `npm run build` pass.
2. **Security architecture:** middleware is optimistic gate only; server-side DAL + Supabase RLS remain enforcement boundary.
3. **Org-role model:** explicit role-aware access (`super_admin`, executive, finance, development, volunteer_lead, program_manager, board_member, staff).
4. **Auditability:** each run regenerates timestamped audit artifacts + north-star check output.
5. **Operational focus:** roadmap stays on queues, approvals, documents, and board readiness (not vanity dashboards).

## Operating Lanes
- Executive
- Development/Fundraising
- Volunteer Operations
- Program Delivery
- Compliance/Finance
- Board

## Execution Rule (Critical)
Build one **vertical slice** first before broad lane expansion:
- donor -> receipt -> approval -> activity log

This is the first production-hardening slice and de-risks architecture faster than broad UI expansion.

## Canonical Phase Roadmap
1. Replace mock-data views with DB-backed reads (org bootstrap, memberships, donors, volunteers, tasks, approvals, activity feed).
2. Implement hard authorization (membership roles, DAL checks, RLS, production-safe removal of demo bypass behavior).
3. Ship core workflows (receipts, shift scheduling/check-in, board packets, deadlines, notifications).
4. Add board-ready reporting and summaries.
5. Differentiate with outcome intelligence and cross-lane risk scoring.

## Source of Truth
- `docs/NORTH_STAR_RESEARCH.md` (full research-backed guidance)
- this file (`NORTH_STAR.md`) is the enforced executable summary

## Hourly Protocol
Hourly automation must:
1. Load `NORTH_STAR.md` and `docs/NORTH_STAR_RESEARCH.md`.
2. Delete old `audit/full-scope-*` folders.
3. Regenerate full-scope audit artifacts.
4. Run north-star gates and write `audit/NORTHSTAR_CHECK.md`.
5. Push only if gates pass (to branch `agent` for manual promotion).
