"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Grid2x2, Home, Settings, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/programs", label: "Programs", icon: Grid2x2 },
  { href: "/board", label: "Board", icon: ClipboardList },
  { href: "/team", label: "Team", icon: Users },
  { href: "/settings", label: "More", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-3 z-50 mx-auto w-[calc(100%-1rem)] max-w-md rounded-[28px] border border-white/70 bg-white/90 p-2 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur md:hidden">
      <ul className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                className={cn(
                  "flex flex-col items-center gap-1 rounded-[20px] px-2 py-2 text-[11px] font-semibold transition",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
                href={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

