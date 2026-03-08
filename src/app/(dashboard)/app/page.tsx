import { ArrowUpRight, CheckCircle2, Circle, Clock3 } from "lucide-react";

import { Sparkline } from "@/components/sparkline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { checklist, overviewCards, recentActivity, upcomingMoments } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title}>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className="mt-2 text-3xl">{card.value}</CardTitle>
                </div>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{card.change}</span>
                  <span className="text-muted-foreground">Last 7 days</span>
                </div>
                <Sparkline points={card.trend} />
                <p className="text-sm leading-6 text-muted-foreground">{card.detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <Badge>Checklist-first ops</Badge>
            <CardTitle className="mt-2">Today&apos;s setup and unblock list</CardTitle>
            <CardDescription>
              This borrows the Houdini pattern that gives teams immediate traction before deeper metrics fill out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Completion</span>
                <span className="text-muted-foreground">40%</span>
              </div>
              <Progress value={40} />
            </div>
            <div className="space-y-3">
              {checklist.map((item) => (
                <div className="flex items-start justify-between gap-3 rounded-[22px] border border-border/70 bg-white/80 p-4" key={item.title}>
                  <div className="flex items-start gap-3">
                    {item.done ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" /> : <Circle className="mt-0.5 h-5 w-5 text-slate-300" />}
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.done ? "Completed and archived." : "Needs action from the assigned team."}</p>
                    </div>
                  </div>
                  <Badge variant={item.done ? "muted" : "outline"}>{item.done ? "Done" : "Open"}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-end justify-between space-y-0">
            <div>
              <Badge>Live schedule</Badge>
              <CardTitle className="mt-2">What the team is moving through today</CardTitle>
            </div>
            <Button size="sm" variant="outline">
              Export brief
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingMoments.map((moment) => (
              <div className="flex gap-4 rounded-[22px] border border-border/70 bg-white/80 p-4" key={moment.title}>
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">{moment.title}</p>
                    <Badge variant="outline">{moment.time}</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{moment.summary}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <Card>
          <CardHeader className="flex-row items-end justify-between space-y-0">
            <div>
              <Badge>Recent activity</Badge>
              <CardTitle className="mt-2">Signals from across the organization</CardTitle>
            </div>
            <span className="text-sm text-muted-foreground">Updated in real time later via Supabase subscriptions.</span>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item) => (
              <div className="rounded-[22px] border border-border/70 bg-white/80 p-4" key={item.title}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <Badge variant="outline">{item.tag}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[linear-gradient(180deg,rgba(15,118,110,0.08),rgba(255,255,255,0.92))]">
          <CardHeader>
            <Badge>Board snapshot</Badge>
            <CardTitle className="mt-2">The board lane is visible from the first screen</CardTitle>
            <CardDescription>
              The goal is operational awareness, not an isolated PM tool. Deeper kanban lives in the dedicated board route.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              ["Intake", 4],
              ["In review", 5],
              ["Scheduled", 6],
              ["Completed", 9],
            ].map(([label, count]) => (
              <div className="flex items-center justify-between rounded-[22px] border border-white/70 bg-white/85 px-4 py-3" key={label}>
                <p className="font-medium text-foreground">{label}</p>
                <Badge>{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
