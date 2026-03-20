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
