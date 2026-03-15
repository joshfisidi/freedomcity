# Security Posture
```
src/lib/redirect.ts:3:export function getSafeRedirectPath(value?: string | null) {
src/lib/supabase/server.ts:4:import { getSupabaseEnv } from "@/lib/supabase/env";
src/lib/supabase/server.ts:7:  const env = getSupabaseEnv();
src/lib/supabase/env.ts:4:export function hasSupabaseEnv() {
src/lib/supabase/env.ts:8:export function getSupabaseEnv() {
src/lib/supabase/client.ts:3:import { getSupabaseEnv } from "@/lib/supabase/env";
src/lib/supabase/client.ts:8:  const env = getSupabaseEnv();
src/lib/supabase/middleware.ts:4:import { getSafeRedirectPath } from "@/lib/redirect";
src/lib/supabase/middleware.ts:5:import { getSupabaseEnv } from "@/lib/supabase/env";
src/lib/supabase/middleware.ts:7:const protectedPrefixes = ["/app", "/programs", "/board", "/team", "/settings"];
src/lib/supabase/middleware.ts:9:function isProtectedPath(pathname: string) {
src/lib/supabase/middleware.ts:10:  return protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
src/lib/supabase/middleware.ts:18:  const env = getSupabaseEnv();
src/lib/supabase/middleware.ts:44:  if (!user && isProtectedPath(request.nextUrl.pathname)) {
src/lib/supabase/middleware.ts:47:    url.searchParams.set("redirectTo", getSafeRedirectPath(request.nextUrl.pathname));
src/app/login/page.tsx:3:import { getSafeRedirectPath } from "@/lib/redirect";
src/app/login/page.tsx:20:  const redirectTo = getSafeRedirectPath(redirectParam);
src/app/(dashboard)/layout.tsx:5:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/app/(dashboard)/layout.tsx:10:  if (hasSupabaseEnv()) {
src/app/(dashboard)/settings/page.tsx:6:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/app/(dashboard)/settings/page.tsx:22:            <CardDescription>{hasSupabaseEnv() ? "Environment variables detected." : "Running in demo mode until env vars are added."}</CardDescription>
src/app/(dashboard)/settings/page.tsx:25:            <Badge variant={hasSupabaseEnv() ? "default" : "outline"}>{hasSupabaseEnv() ? "Configured" : "Missing env vars"}</Badge>
src/app/login/actions.ts:5:import { getSafeRedirectPath } from "@/lib/redirect";
src/app/login/actions.ts:7:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/app/login/actions.ts:14:  if (!hasSupabaseEnv()) {
src/app/login/actions.ts:22:  const redirectTo = getSafeRedirectPath(typeof formData.get("redirectTo") === "string" ? String(formData.get("redirectTo")) : null);
src/app/page.tsx:9:import { getSafeRedirectPath } from "@/lib/redirect";
src/app/page.tsx:23:  const redirectTo = getSafeRedirectPath(requestedRedirect);
src/components/app-shell.tsx:10:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/components/app-shell.tsx:48:                  <Badge>{hasSupabaseEnv() ? "Live auth" : "Demo mode"}</Badge>
src/components/app-shell.tsx:117:                {hasSupabaseEnv() ? (
src/components/login-form.tsx:9:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/components/login-form.tsx:19:  const isSupabaseEnabled = hasSupabaseEnv();
```
