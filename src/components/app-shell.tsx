import Link from "next/link";
import { ArrowUpRight, Bell, ChevronRight, LogOut, Menu, Search } from "lucide-react";

import { BottomNav } from "@/components/bottom-nav";
import { LogoLockup } from "@/components/logo-lockup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { hasSupabaseEnv } from "@/lib/supabase/env";

const desktopLinks = [
  { href: "/app", label: "Dashboard" },
  { href: "/programs", label: "Programs" },
  { href: "/board", label: "Board" },
  { href: "/team", label: "Team" },
  { href: "/settings", label: "Settings" },
];

interface AppShellProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  userName: string;
}

export function AppShell({ children, heading, subheading, userName }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-24 pt-4 md:px-6 md:pb-8">
        <header className="mb-4 flex items-center justify-between gap-3 rounded-[30px] border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground md:hidden" type="button">
              <Menu className="h-5 w-5" />
            </button>
            <LogoLockup compact />
          </div>
          <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
            {desktopLinks.map((link) => (
              <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground" type="button">
              <Search className="h-5 w-5" />
            </button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground" type="button">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="grid flex-1 gap-4 md:grid-cols-[1.1fr_0.38fr]">
          <section className="space-y-4">
            <Card className="overflow-hidden bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.92))]">
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
            <Card className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Signed in as</p>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">{userName}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Accounts are managed by the organization in Supabase.</p>
                </div>
                <Badge variant="outline">Staff</Badge>
              </div>
              <div className="mt-5 rounded-[24px] bg-secondary/70 p-4">
                <p className="text-sm font-medium text-foreground">Today&apos;s operating focus</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Close volunteer coverage gaps, finish the grant packet, and clear approval bottlenecks before board prep.
                </p>
              </div>
            </Card>

            <Card className="p-5">
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
                  <div className="rounded-[20px] border border-border/70 bg-white/80 px-4 py-3 text-sm font-medium text-foreground" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
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
      <BottomNav />
    </div>
  );
}

