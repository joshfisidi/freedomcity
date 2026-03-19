# Auth Flow
```
middleware.ts:3:import { updateSession } from "@/lib/supabase/middleware";
src/lib/mock-data.ts:20:  "Supabase-backed authentication for staff accounts created by the organization",
src/app/login/actions.ts:6:import { createClient } from "@/lib/supabase/server";
src/app/login/actions.ts:7:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/app/login/actions.ts:13:export async function signIn(_: LoginState, formData: FormData): Promise<LoginState> {
src/app/login/actions.ts:30:  const supabase = await createClient();
src/app/login/actions.ts:31:  if (!supabase) {
src/app/login/actions.ts:37:  const { error } = await supabase.auth.signInWithPassword({
src/app/page.tsx:11:import { createClient } from "@/lib/supabase/server";
src/app/page.tsx:24:  const supabase = await createClient();
src/app/page.tsx:26:  if (supabase) {
src/app/page.tsx:29:    } = await supabase.auth.getUser();
src/app/page.tsx:123:            Deterministic components, mobile-first navigation, and explicit auth state.
src/lib/supabase/client.ts:1:import { createBrowserClient } from "@supabase/ssr";
src/lib/supabase/client.ts:3:import { getSupabaseEnv } from "@/lib/supabase/env";
src/app/(dashboard)/layout.tsx:4:import { createClient } from "@/lib/supabase/server";
src/app/(dashboard)/layout.tsx:5:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/app/(dashboard)/layout.tsx:11:    const supabase = await createClient();
src/app/(dashboard)/layout.tsx:14:    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };
src/lib/supabase/server.ts:1:import { createServerClient, type SetAllCookies } from "@supabase/ssr";
src/lib/supabase/server.ts:4:import { getSupabaseEnv } from "@/lib/supabase/env";
src/lib/supabase/middleware.ts:1:import { createServerClient, type SetAllCookies } from "@supabase/ssr";
src/lib/supabase/middleware.ts:5:import { getSupabaseEnv } from "@/lib/supabase/env";
src/lib/supabase/middleware.ts:23:  const supabase = createServerClient(env.url, env.publishableKey, {
src/lib/supabase/middleware.ts:42:  } = await supabase.auth.getUser();
src/lib/supabase/env.ts:1:const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
src/lib/supabase/env.ts:2:const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
src/lib/supabase/env.ts:5:  return Boolean(supabaseUrl && supabasePublishableKey);
src/lib/supabase/env.ts:9:  if (!supabaseUrl || !supabasePublishableKey) {
src/lib/supabase/env.ts:14:    url: supabaseUrl,
src/lib/supabase/env.ts:15:    publishableKey: supabasePublishableKey,
src/app/(dashboard)/settings/page.tsx:6:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/components/app-shell.tsx:10:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/components/app-shell.tsx:48:                  <Badge>{hasSupabaseEnv() ? "Live auth" : "Demo mode"}</Badge>
src/components/app-shell.tsx:118:                  <form action="/auth/signout" method="post">
src/app/auth/signout/route.ts:3:import { createClient } from "@/lib/supabase/server";
src/app/auth/signout/route.ts:6:  const supabase = await createClient();
src/app/auth/signout/route.ts:8:  if (supabase) {
src/app/auth/signout/route.ts:9:    await supabase.auth.signOut();
src/components/login-form.tsx:6:import { signIn, type LoginState } from "@/app/login/actions";
src/components/login-form.tsx:9:import { hasSupabaseEnv } from "@/lib/supabase/env";
src/components/login-form.tsx:18:  const [state, action, pending] = useActionState(signIn, initialState);
src/components/ui/badge.tsx:2:import { cva, type VariantProps } from "class-variance-authority";
src/components/ui/button.tsx:3:import { cva, type VariantProps } from "class-variance-authority";
src/components/ui/card.tsx:2:import { cva, type VariantProps } from "class-variance-authority";
```
