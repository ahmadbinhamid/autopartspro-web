import { cn } from "@/lib/cn";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "reveal mx-auto max-w-2xl",
        align === "center" ? "text-center" : "max-w-xl text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="mb-4 inline-block text-xs font-bold tracking-[0.2em] text-accent uppercase">{eyebrow}</span>
      ) : null}
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance text-fg sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-balance text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
