import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div className="h-full rounded-full bg-[linear-gradient(90deg,hsl(171_62%_32%),hsl(201_72%_34%))]" style={{ width: `${value}%` }} />
    </div>
  );
}

