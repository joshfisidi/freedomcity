# App Shell & Layout
```tsx
import Link from "next/link";
import { ArrowUpRight, Bell, ChevronRight, LogOut, Menu, Search } from "lucide-react";

import { AppNavigation } from "@/components/app-navigation";
import { BottomNavLazy } from "@/components/bottom-nav-lazy";
import { LogoLockup } from "@/components/logo-lockup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { hasSupabaseEnv } from "@/lib/supabase/env";

interface AppShellProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  userName: string;
}

export function AppShell({ children, heading, subheading, userName }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,31,44,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,164,65,0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.32),transparent_22%,transparent_78%,rgba(255,255,255,0.18))]" />
      <div className="mx-auto flex min-h-screen max-w-[88rem] flex-col px-4 pb-24 pt-4 md:px-6 md:pb-8">
        <header className="mb-4 flex items-center justify-between gap-3 rounded-[32px] border border-white/70 bg-white/88 px-4 py-3 shadow-[0_20px_60px_-42px_rgba(96,20,28,0.48)] backdrop-blur">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground md:hidden" type="button">
              <Menu className="h-5 w-5" />
            </button>
            <LogoLockup compact />
          </div>
          <AppNavigation className="flex-1 justify-center" />
          <div className="flex items-center gap-2">
            <Button aria-label="Search" size="icon" type="button" variant="secondary">
              <Search className="h-5 w-5" />
            </Button>
            <Button aria-label="Notifications" size="icon" type="button" variant="secondary">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="grid flex-1 gap-4 md:grid-cols-[1.1fr_0.38fr]">
          <section className="space-y-4">
            <Card className="overflow-hidden" variant="hero">
              <div className="flex flex-col gap-5 p-5 md:flex-row md:items-end md:justify-between md:p-6">
                <div className="space-y-3">
                  <Badge>{hasSupabaseEnv() ? "Live auth" : "Demo mode"}</Badge>
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Internal operations</p>
                    <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                      {heading}
                    </h1>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{subheading}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button>Open today&apos;s brief</Button>
                  <Button asChild variant="outline">
                    <Link href="/board">
                      Review board
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
            {children}
          </section>

          <aside className="space-y-4">
            <Card className="p-5" variant="soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Signed in as</p>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">{userName}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Accounts are managed by the organization in Supabase.</p>
                </div>
                <Badge variant="outline">Staff</Badge>
              </div>
              <div className="mt-5 rounded-[24px] border border-white/55 bg-secondary/80 p-4">
                <p className="text-sm font-medium text-foreground">Today&apos;s operating focus</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Close volunteer coverage gaps, finish the grant packet, and clear approval bottlenecks before board prep.
                </p>
              </div>
            </Card>

            <Card className="p-5" variant="soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Quick links</p>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">High-friction workflows</h2>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Approve staff access",
                  "Issue donor receipts",
                  "Create weekend shift reminder",
                  "Upload board packet",
                ].map((item) => (
                  <div
                    className="rounded-[22px] border border-border/75 bg-white/84 px-4 py-3 text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5" variant="soft">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Session</p>
              <div className="mt-3 flex flex-col gap-3">
                {hasSupabaseEnv() ? (
                  <form action="/auth/signout" method="post">
                    <Button className="w-full justify-between" type="submit" variant="secondary">
                      Sign out
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <p className="text-sm leading-6 text-muted-foreground">
                    Demo mode stays open until Supabase env vars are added. This lets the UI ship before credentials are wired.
                  </p>
                )}
              </div>
            </Card>
          </aside>
        </main>
      </div>
      <BottomNavLazy />
    </div>
  );
}
```

```tsx
import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let userName = "Freedom City staff";

  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

    if (!user) {
      redirect("/login");
    }

    userName = user.user_metadata?.full_name ?? user.email ?? userName;
  }

  return (
    <AppShell
      heading="Keep the whole charity moving."
      subheading="A mobile-first dashboard for donations, volunteers, programs, compliance, and board-ready operations."
      userName={userName}
    >
      {children}
    </AppShell>
  );
}
```
