import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-soft hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_30px_hsl(var(--accent)/0.4)]",
  secondary: "border border-border bg-bg-2 text-fg hover:border-accent/30 hover:bg-bg-3",
  ghost: "bg-transparent text-fg hover:bg-bg-2",
  outline: "border border-border bg-transparent text-fg hover:border-accent/50 hover:bg-accent/5 hover:text-accent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 rounded-full px-5 text-sm",
  md: "h-12 rounded-full px-7 text-[0.95rem]",
  lg: "h-14 rounded-full px-9 text-base",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(base, variants[variant], sizes[size], className);
}
