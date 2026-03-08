import { CheckCircle2, Database, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Badge>Configuration</Badge>
          <CardTitle className="mt-2">Environment and access model</CardTitle>
          <CardDescription>
            The first instance keeps auth wiring explicit so the organization can add real Supabase credentials without reshaping the UI.
          </CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Database className="h-5 w-5 text-foreground" />
            <CardTitle className="mt-4">Supabase</CardTitle>
            <CardDescription>{hasSupabaseEnv() ? "Environment variables detected." : "Running in demo mode until env vars are added."}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={hasSupabaseEnv() ? "default" : "outline"}>{hasSupabaseEnv() ? "Configured" : "Missing env vars"}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ShieldCheck className="h-5 w-5 text-foreground" />
            <CardTitle className="mt-4">Access policy</CardTitle>
            <CardDescription>Organization administrators create accounts and distribute credentials to staff.</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CheckCircle2 className="h-5 w-5 text-foreground" />
            <CardTitle className="mt-4">Next step</CardTitle>
            <CardDescription>Add row-level security and role tables once the first internal release is approved.</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
