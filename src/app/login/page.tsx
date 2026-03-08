import Link from "next/link";
import { ArrowRight, Building2, ChevronLeft, LockKeyhole, ShieldCheck } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import { LogoLockup } from "@/components/logo-lockup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { checklist, orgProfile } from "@/lib/mock-data";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-4 md:px-6 md:py-6">
      <div className="grid w-full gap-4 md:grid-cols-[0.95fr_1.05fr]">
        <Card className="overflow-hidden p-5 md:p-8">
          <div className="flex items-center justify-between">
            <LogoLockup />
            <Button asChild size="sm" variant="ghost">
              <Link href="/">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>

          <div className="mt-10 space-y-5">
            <Badge>Staff sign in</Badge>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Log into the Freedom City operations hub.
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground md:text-base">
                Staff and volunteer coordinators use org-created accounts to access donations, programs, approvals, and the daily board from one place.
              </p>
            </div>

            <LoginForm />
          </div>
        </Card>

        <Card className="overflow-hidden border-transparent bg-[linear-gradient(180deg,rgba(15,118,110,0.96),rgba(15,23,42,0.96))] p-5 text-white md:p-8">
          <div className="flex items-center justify-between">
            <Badge className="border-white/20 bg-white/10 text-white" variant="outline">
              {orgProfile.location}
            </Badge>
            <LockKeyhole className="h-5 w-5 text-white/80" />
          </div>

          <div className="mt-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">Secure internal access</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
              Accounts are provisioned centrally and mapped to charity operations.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/78 md:text-base">
              The first version keeps the login model simple: Supabase Auth handles email and password, while the UI is shaped around real internal workflows rather than public donor journeys.
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            {checklist.map((item) => (
              <div className="rounded-[24px] border border-white/15 bg-white/10 px-4 py-3" key={item.title}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-2.5 w-2.5 rounded-full ${item.done ? "bg-emerald-300" : "bg-amber-300"}`} />
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-white/70">{item.done ? "Complete" : "Pending action"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Building2, label: "Programs" },
              { icon: ShieldCheck, label: "Compliance" },
              { icon: ArrowRight, label: "Approvals" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div className="rounded-[24px] border border-white/15 bg-white/10 p-4" key={item.label}>
                  <Icon className="h-4 w-4 text-white/80" />
                  <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </main>
  );
}

