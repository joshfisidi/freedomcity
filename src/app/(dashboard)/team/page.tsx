import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { teamRoster } from "@/lib/mock-data";

export default function TeamPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Badge>People and coverage</Badge>
          <CardTitle className="mt-2">Who is online, on site, and making decisions today</CardTitle>
          <CardDescription>
            Keep the internal app grounded in staffing and coverage, not just donor metrics.
          </CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        {teamRoster.map((member) => (
          <Card key={member.name}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-foreground">{member.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                </div>
                <Badge variant="outline">{member.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Coverage notes</CardTitle>
          <CardDescription>Field-first notes that should stay visible on phones during the day.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {[
            "Two backup drivers requested for Saturday pantry routes.",
            "Volunteer badge printer needs fresh labels before the afternoon intake.",
            "Executive approval still needed on one stipend payout.",
          ].map((note) => (
            <div className="rounded-[22px] border border-border/70 bg-white/80 px-4 py-3 text-sm leading-6 text-muted-foreground" key={note}>
              {note}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
