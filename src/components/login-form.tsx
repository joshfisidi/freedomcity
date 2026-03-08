"use client";

import { useActionState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";

import { signIn, type LoginState } from "@/app/login/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hasSupabaseEnv } from "@/lib/supabase/env";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, initialState);

  return (
    <form action={action} className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge>{hasSupabaseEnv() ? "Supabase enabled" : "Demo shell only"}</Badge>
        <Badge variant="outline">Org managed accounts</Badge>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="email">
          Work email
        </label>
        <Input id="email" name="email" placeholder="team@freedomcity.org" type="email" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="password">
          Password
        </label>
        <Input id="password" name="password" placeholder="Enter your password" type="password" />
      </div>

      <Button className="w-full justify-between" disabled={pending} type="submit">
        {pending ? "Signing in..." : "Sign in to dashboard"}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <div className="rounded-[24px] border border-border/70 bg-secondary/70 p-4 text-sm leading-6 text-muted-foreground">
        <p className="font-medium text-foreground">Access model</p>
        <p className="mt-1">
          Staff accounts are created by the organization. If you need a password reset or a new account, request it from an administrator.
        </p>
      </div>

      {state?.error ? (
        <div className="flex items-start gap-3 rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{state.error}</p>
        </div>
      ) : null}
    </form>
  );
}

