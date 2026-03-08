import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoLockupProps {
  className?: string;
  compact?: boolean;
}

export function LogoLockup({ className, compact = false }: LogoLockupProps) {
  return (
    <Link className={cn("flex items-center gap-3", className)} href="/">
      <div className="relative overflow-hidden rounded-[22px] border border-white/40 bg-white/75 p-2 shadow-sm">
        <Image alt="Freedom City logo" className="h-10 w-10 rounded-[14px] object-cover" height={40} priority src="/freedomcitylogo.avif" width={40} />
      </div>
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-foreground">
          Freedom City
        </p>
        {!compact ? <p className="text-sm text-muted-foreground">Charity operations dashboard</p> : null}
      </div>
    </Link>
  );
}

