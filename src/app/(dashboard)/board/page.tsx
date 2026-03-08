import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { boardColumns } from "@/lib/mock-data";

export default function BoardPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>Operations kanban</Badge>
            <CardTitle className="mt-2">Mission-critical work across finance, programs, and volunteers</CardTitle>
            <CardDescription>
              This is intentionally lightweight. It adapts the nonprofit dashboard feel from Houdini while keeping the flow mobile-first and legible.
            </CardDescription>
          </div>
          <Button size="sm" variant="outline">
            Add task
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardHeader>
      </Card>

      <section className="grid gap-4 xl:grid-cols-4">
        {boardColumns.map((column) => (
          <Card className="overflow-hidden" key={column.title}>
            <div className={`h-1.5 w-full bg-gradient-to-r ${column.accent}`} />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{column.title}</CardTitle>
                <Badge variant="outline">{column.count}</Badge>
              </div>
              <CardDescription>Shared across departments and visible from mobile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.items.map((item) => (
                <div className="rounded-[22px] border border-border/70 bg-white/85 p-4" key={item.title}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <Badge>{item.meta}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
