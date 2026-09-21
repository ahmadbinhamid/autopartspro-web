import { cn } from "@/lib/cn";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-accent uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
