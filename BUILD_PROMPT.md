# Freedom City build prompt

Build a mobile-first charity management dashboard in Next.js with Tailwind and shadcn-style primitives. The product is for internal charity staff whose accounts are provisioned by the organization in Supabase Auth.

Use the Houdini audit as a product reference, not as an implementation dependency:

- Preserve the nonprofit-ops feel: onboarding checklist, dense metric cards, recent activity, and operational task tracking.
- Keep the first screen useful in under five seconds on mobile.
- Structure the dashboard around real charity work: donations, programs, volunteers, grants, and approvals.
- Include a bottom navigation for mobile and a more spacious shell on desktop.
- Make the board experience feel like a lightweight operations kanban, not a generic project-management clone.
- Thread the Freedom City logo through the landing page, login surface, and app shell.
- Wire Supabase with safe defaults so the app still runs in demo mode when env vars are missing.

Quality bar:

- Use App Router.
- Use reusable shadcn-style UI primitives in `src/components/ui`.
- Protect app routes with Supabase middleware when env vars are configured.
- Favor clear information density over decorative clutter.
- Keep the implementation small enough to be a solid first instance that can be pushed immediately.

