import Link from "next/link";
import { ArrowRight, ClipboardList, HeartHandshake, ShieldCheck } from "lucide-react";

import { LogoLockup } from "@/components/logo-lockup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appSections, landingHighlights, orgProfile } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-4 md:px-6 md:py-6">
      <section className="soft-grid overflow-hidden rounded-[34px] border border-white/70 bg-white/70 p-5 shadow-[0_26px_90px_-42px_rgba(15,23,42,0.45)] backdrop-blur md:p-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-6">
            <LogoLockup />
            <div className="space-y-4">
              <Badge>One-shot first instance</Badge>
              <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
                Charity operations for the people doing the work.
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                {orgProfile.mission} Built with Next.js, Tailwind, shadcn-style components, and Supabase-ready auth.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/login">
                  Staff login
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/app">Open dashboard preview</Link>
              </Button>
            </div>
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {landingHighlights.map((highlight) => (
                <div className="rounded-[24px] border border-white/80 bg-white/85 px-4 py-3 text-sm leading-6 text-muted-foreground" key={highlight}>
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-md border-transparent bg-[linear-gradient(160deg,rgba(15,118,110,0.94),rgba(3,105,161,0.9))] text-white">
            <CardHeader>
              <Badge className="w-fit border-white/20 bg-white/10 text-white" variant="outline">
                Mobile first
              </Badge>
              <CardTitle className="mt-2 text-2xl text-white">Mission control for the field, office, and board room.</CardTitle>
              <CardDescription className="text-white/80">
                A dense dashboard inspired by nonprofit ops tools like Houdini, but rebuilt as a modern app shell with better mobile ergonomics.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="rounded-[22px] bg-white/12 p-4">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>Live cards</span>
                  <HeartHandshake className="h-4 w-4" />
                </div>
                <p className="mt-3 text-3xl font-semibold">412</p>
                <p className="mt-1 text-sm text-white/80">Families served this month</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[20px] bg-white/12 p-4">
                  <ClipboardList className="h-4 w-4 text-white/80" />
                  <p className="mt-3 text-lg font-semibold">20 board tasks</p>
                  <p className="text-sm text-white/75">Across four work lanes</p>
                </div>
                <div className="rounded-[20px] bg-white/12 p-4">
                  <ShieldCheck className="h-4 w-4 text-white/80" />
                  <p className="mt-3 text-lg font-semibold">3 urgent approvals</p>
                  <p className="text-sm text-white/75">Need clearance today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {appSections.map((section) => {
          const Icon = section.icon;

          return (
            <Card key={section.title}>
              <CardHeader>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="mt-4">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </main>
  );
}

