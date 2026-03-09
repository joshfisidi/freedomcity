# FreedomCity North Star

## Mission
Build the most reliable, mobile-first operating surface for community organizations to run donations, programs, volunteers, compliance, and board workflows with low friction.

## Non-Negotiables (Upgrade Gate)
1. **Build integrity:** `npm run lint` and `npm run build` must pass.
2. **Auth safety:** protected routes and redirect safety must remain intact.
3. **Operational clarity:** route surface, dependencies, and core architecture must stay documented.
4. **Determinism:** every hourly run produces a timestamped audit with reproducible command evidence.
5. **Public accountability:** successful checks are committed and pushed to `main` on the public GitHub repo.

## Hourly Protocol
Every hour:
1. Remove previous `audit/full-scope-*` folder(s).
2. Run a fresh full-scope audit (20 markdown files).
3. Run North Star checks (lint/build/auth-route grep assertions).
4. If checks pass: commit and push.
5. If checks fail: write failure report to `audit/NORTHSTAR_BLOCKED.md` and do not push.

## Success Criteria
- Latest commit on GitHub contains:
  - fresh `audit/full-scope-YYYY-MM-DD-HHMM`
  - `audit/NORTHSTAR_CHECK.md`
  - any updated automation files
- Branch remains green (buildable) and auditable by inspection.
