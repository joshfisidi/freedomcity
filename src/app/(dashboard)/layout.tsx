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
