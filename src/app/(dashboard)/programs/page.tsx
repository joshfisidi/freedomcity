import { ArrowUpRight, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { programCards } from "@/lib/mock-data";

export default function ProgramsPage() {
  return (
    <div className="space-y-4">
      <section className="grid gap-4 lg:grid-cols-3">
        {programCards.map((program) => (
          <Card key={program.title}>
            <CardHeader>
              <Badge>{program.title}</Badge>
              <CardTitle className="mt-3 text-3xl">{program.figure}</CardTitle>
              <CardDescription>{program.summary}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader className="flex-row items-end justify-between space-y-0">
            <div>
              <Badge>Program readiness</Badge>
              <CardTitle className="mt-2">Cross-program risk and capacity</CardTitle>
            </div>
            <Button size="sm" variant="outline">
              Open report
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              ["Housing renewals pending", "5", "Landlord signatures are the main blocker."],
              ["School supplies pledged", "71%", "Need one more sponsor push this week."],
              ["Counseling referrals triaged", "19", "Two cases need bilingual placement."],
            ].map(([title, value, detail]) => (
              <div className="rounded-[22px] border border-border/70 bg-white/80 p-4" key={title}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-foreground">{title}</p>
                  <p className="text-2xl font-semibold text-foreground">{value}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-transparent bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(15,118,110,0.08))]">
          <CardHeader>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground">
              <Wallet className="h-5 w-5" />
            </div>
            <CardTitle className="mt-4">Funding alignment</CardTitle>
            <CardDescription>
              Show program leads how delivery and restricted funding track together without forcing them into finance tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "General fund supports 54% of active pantry costs",
              "Youth support reimbursement claim due Friday",
              "Housing bridge fund is under target by $8.4k",
            ].map((item) => (
              <div className="rounded-[20px] border border-border/70 bg-white/80 px-4 py-3 text-sm leading-6 text-muted-foreground" key={item}>
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
