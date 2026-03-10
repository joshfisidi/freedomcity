# Redirect Safety
```
src/lib/redirect.ts:3:export function getSafeRedirectPath(value?: string | null) {
src/lib/redirect.ts:4:  const redirectTo = value?.trim();
src/lib/redirect.ts:6:  if (!redirectTo || !redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
src/lib/redirect.ts:10:  return redirectTo;
src/lib/supabase/middleware.ts:4:import { getSafeRedirectPath } from "@/lib/redirect";
src/lib/supabase/middleware.ts:47:    url.searchParams.set("redirectTo", getSafeRedirectPath(request.nextUrl.pathname));
src/lib/supabase/middleware.ts:48:    return NextResponse.redirect(url);
src/components/login-form.tsx:14:  redirectTo: string;
src/components/login-form.tsx:17:export function LoginForm({ redirectTo }: LoginFormProps) {
src/components/login-form.tsx:23:      <input name="redirectTo" type="hidden" value={redirectTo} />
src/app/auth/signout/route.ts:12:  return NextResponse.redirect(new URL("/login", request.url));
src/app/(dashboard)/layout.tsx:17:      redirect("/login");
src/app/page.tsx:9:import { getSafeRedirectPath } from "@/lib/redirect";
src/app/page.tsx:15:  searchParams: Promise<{
src/app/page.tsx:16:    redirectTo?: string | string[];
src/app/page.tsx:20:export default async function HomePage({ searchParams }: HomePageProps) {
src/app/page.tsx:21:  const params = await searchParams;
src/app/page.tsx:22:  const requestedRedirect = typeof params.redirectTo === "string" ? params.redirectTo : null;
src/app/page.tsx:23:  const redirectTo = getSafeRedirectPath(requestedRedirect);
src/app/page.tsx:32:      redirect(redirectTo);
src/app/page.tsx:118:            <LoginForm redirectTo={redirectTo} />
src/app/login/page.tsx:3:import { getSafeRedirectPath } from "@/lib/redirect";
src/app/login/page.tsx:6:  searchParams: Promise<{
src/app/login/page.tsx:7:    redirectTo?: string | string[];
src/app/login/page.tsx:12:export default async function LoginPage({ searchParams }: LoginPageProps) {
src/app/login/page.tsx:13:  const params = await searchParams;
src/app/login/page.tsx:15:    typeof params.redirectTo === "string"
src/app/login/page.tsx:16:      ? params.redirectTo
src/app/login/page.tsx:20:  const redirectTo = getSafeRedirectPath(redirectParam);
src/app/login/page.tsx:23:    redirect(`/?redirectTo=${encodeURIComponent(redirectTo)}`);
src/app/login/page.tsx:26:  redirect("/");
src/app/login/actions.ts:5:import { getSafeRedirectPath } from "@/lib/redirect";
src/app/login/actions.ts:22:  const redirectTo = getSafeRedirectPath(typeof formData.get("redirectTo") === "string" ? String(formData.get("redirectTo")) : null);
src/app/login/actions.ts:48:  redirect(redirectTo);
```

```ts
const DEFAULT_REDIRECT_PATH = "/app";

export function getSafeRedirectPath(value?: string | null) {
  const redirectTo = value?.trim();

  if (!redirectTo || !redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
    return DEFAULT_REDIRECT_PATH;
  }

  return redirectTo;
}
```
