import { cn } from "@/lib/cn";

export const APP_NAME = "AutoPartsPro";

// Same lockup as pha-dashboard's AppLogoMark: the shared gear+chart brand
// mark (public/branding/logo-mark.png) next to real text, not baked into
// the image, so "AutoParts"/"Pro" can carry this site's own display font
// and still invert with the theme via currentColor.
export function Logo({ className, wordmarkClassName }: { className?: string; wordmarkClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img src="/branding/logo-mark.png" alt="" className="h-9 w-auto shrink-0" />
      <span className={cn("font-display text-xl font-bold tracking-tight text-fg", wordmarkClassName)}>
        AutoParts<span className="text-accent">Pro</span>
      </span>
    </div>
  );
}
