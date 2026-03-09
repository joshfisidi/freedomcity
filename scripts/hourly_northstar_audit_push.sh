#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/Users/josh/.openclaw/workspace/projects/freedomcity"
cd "$REPO_DIR"

STAMP="$(date +%Y-%m-%d-%H%M)"
AUDIT_DIR="audit/full-scope-${STAMP}"
mkdir -p audit "$AUDIT_DIR"

# 1) Delete old full-scope audits
find audit -maxdepth 1 -type d -name 'full-scope-*' ! -name "full-scope-${STAMP}" -exec rm -rf {} +

# 2) Audit methods
cat > "$AUDIT_DIR/00_audit_methods.md" <<'EOF'
# Audit Methods (Terminal)

```bash
pwd
ls -la
find src -maxdepth 4 -type f | sort
find . -maxdepth 2 -type f | sed 's#^./##' | sort
rg -n "TODO|FIXME|HACK|XXX" src
rg -n "supabase|auth|getUser|getSession|signIn|signOut" src middleware.ts
rg -n "export (default|async function|function|const (GET|POST|PUT|DELETE|PATCH))" src/app
find src -type f | wc -l
find src -type f | sed -E 's/.*\\.([^.]+)$/\\1/' | sort | uniq -c
npm run lint
npm run build
rg -n "redirect\(|getSafeRedirectPath|searchParams|redirectTo" src
rg -n "createServerClient|createBrowserClient|cookies|middleware|updateSession" src middleware.ts
find public -type f | sort
cat package.json
cat README.md
cat next.config.ts
cat middleware.ts
```
EOF

# 3) 19 additional audit files
{
  echo "# Repo Overview"; echo; echo "- Generated: $(date)"; echo; echo "## Root listing"; echo '```'; ls -la; echo '```';
} > "$AUDIT_DIR/01_repo_overview.md"

{
  echo "# File Inventory"; echo; echo "## src"; echo '```'; find src -maxdepth 6 -type f | sort; echo '```';
} > "$AUDIT_DIR/02_file_inventory.md"

{
  echo "# Dependency Audit"; echo '```json'; cat package.json; echo '```';
} > "$AUDIT_DIR/03_dependency_audit.md"

{
  echo "# Script & Tooling"; echo '```'; node -e 'const p=require("./package.json"); console.log(p.scripts)'; echo '```';
} > "$AUDIT_DIR/04_scripts_and_tooling.md"

{
  echo "# Route Surface"; echo '```'; find src/app -type f | sort; echo '```'; echo; echo '```'; rg -n "export (default|async function|function|const (GET|POST|PUT|DELETE|PATCH))" src/app || true; echo '```';
} > "$AUDIT_DIR/05_routes_surface.md"

{
  echo "# Auth Flow"; echo '```'; rg -n "supabase|auth|getUser|getSession|signIn|signOut" src middleware.ts || true; echo '```';
} > "$AUDIT_DIR/06_auth_flow.md"

{
  echo "# Middleware & Access Control"; echo '```ts'; cat middleware.ts; echo '```'; echo; echo '```ts'; sed -n '1,220p' src/lib/supabase/middleware.ts; echo '```';
} > "$AUDIT_DIR/07_middleware_access_control.md"

{
  echo "# Redirect Safety"; echo '```'; rg -n "redirect\(|getSafeRedirectPath|searchParams|redirectTo" src || true; echo '```'; echo; echo '```ts'; sed -n '1,220p' src/lib/redirect.ts; echo '```';
} > "$AUDIT_DIR/08_redirect_navigation_safety.md"

{
  echo "# UI Components"; echo '```'; find src/components -type f | sort; echo '```';
} > "$AUDIT_DIR/09_ui_components.md"

{
  echo "# App Shell & Layout"; echo '```tsx'; sed -n '1,260p' src/components/app-shell.tsx; echo '```'; echo; echo '```tsx'; sed -n '1,220p' 'src/app/(dashboard)/layout.tsx'; echo '```';
} > "$AUDIT_DIR/10_app_shell_layout.md"

{
  echo "# Data Model / Mock Data"; echo '```ts'; sed -n '1,260p' src/lib/mock-data.ts; echo '```';
} > "$AUDIT_DIR/11_data_model_mockdata.md"

{
  echo "# Supabase Clients"; echo '```ts'; sed -n '1,220p' src/lib/supabase/env.ts; echo '```'; echo; echo '```ts'; sed -n '1,220p' src/lib/supabase/server.ts; echo '```'; echo; echo '```ts'; sed -n '1,220p' src/lib/supabase/client.ts; echo '```';
} > "$AUDIT_DIR/12_supabase_clients.md"

{
  echo "# Code Quality Signals"; echo '```'; rg -n "TODO|FIXME|HACK|XXX|ts-ignore|eslint-disable|\\bany\\b" src || true; echo '```';
} > "$AUDIT_DIR/13_code_quality_signals.md"

{
  echo "# TypeScript Surface"; echo '```'; find src -type f | wc -l; find src -type f | sed -E 's/.*\.([^.]+)$/\1/' | sort | uniq -c; echo '```';
} > "$AUDIT_DIR/14_typescript_surface.md"

{
  echo "# Assets & Branding"; echo '```'; find public -type f | sort; echo '```';
} > "$AUDIT_DIR/15_assets_branding.md"

{
  echo "# Build & Lint"; echo "Lint/build run at: $(date)";
} > "$AUDIT_DIR/16_build_and_lint.md"

{
  echo "# Runtime/Performance"; echo '```'; npm run build 2>/dev/null | rg "^Route \(app\)|^┌|^├|^└|^\+ First Load JS|^  ├|^  └" -n || true; echo '```';
} > "$AUDIT_DIR/17_runtime_performance.md"

{
  echo "# Security Posture"; echo '```'; rg -n "protectedPrefixes|isProtectedPath|getSafeRedirectPath|hasSupabaseEnv|getSupabaseEnv" src middleware.ts || true; echo '```';
} > "$AUDIT_DIR/18_security_posture.md"

cat > "$AUDIT_DIR/19_full_scope_understanding_summary.md" <<EOF
# Full Scope Understanding Summary

Generated: $(date)

- Next.js App Router dashboard for nonprofit operations.
- Supabase-ready auth with middleware protection and safe redirect helper.
- Demo mode supported when env vars absent.
- Mobile-first shell and reusable UI primitives.
- Audit regenerated hourly under north-star protocol.
EOF

# 4) North star checks
CHECK_FILE="audit/NORTHSTAR_CHECK.md"
{
  echo "# North Star Check";
  echo;
  echo "Timestamp: $(date)";
  echo;
  echo "## Gate Results";
  echo;
} > "$CHECK_FILE"

PASS=1

if npm run lint >> "$CHECK_FILE" 2>&1; then
  echo "- ✅ lint passed" >> "$CHECK_FILE"
else
  echo "- ❌ lint failed" >> "$CHECK_FILE"
  PASS=0
fi

if npm run build >> "$CHECK_FILE" 2>&1; then
  echo "- ✅ build passed" >> "$CHECK_FILE"
else
  echo "- ❌ build failed" >> "$CHECK_FILE"
  PASS=0
fi

if rg -n "protectedPrefixes|getSafeRedirectPath" src/lib/supabase/middleware.ts src/lib/redirect.ts >> "$CHECK_FILE" 2>&1; then
  echo "- ✅ auth/redirect safety signals present" >> "$CHECK_FILE"
else
  echo "- ❌ auth/redirect safety signals missing" >> "$CHECK_FILE"
  PASS=0
fi

if [[ "$PASS" -ne 1 ]]; then
  cat > audit/NORTHSTAR_BLOCKED.md <<EOF
# NORTHSTAR BLOCKED

Timestamp: $(date)

One or more non-negotiable gates failed.
No push performed.
See:
- $CHECK_FILE
- $AUDIT_DIR
EOF
  exit 1
fi

rm -f audit/NORTHSTAR_BLOCKED.md

# 5) Commit + push

git add NORTH_STAR.md audit scripts/hourly_northstar_audit_push.sh
if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "chore(audit): hourly north-star audit ${STAMP}"
git push origin main

echo "Hourly north-star audit + push complete: ${STAMP}"
