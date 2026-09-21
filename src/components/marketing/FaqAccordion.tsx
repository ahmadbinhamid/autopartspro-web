import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { FaqItem } from "@/constants/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-bg-2/30">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
            >
              <span className="text-[0.95rem] font-semibold text-fg">{item.question}</span>
              <ChevronDown
                className={cn("h-4.5 w-4.5 shrink-0 text-fg-muted transition-transform duration-300", isOpen && "rotate-180 text-accent")}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-fg-muted sm:px-7">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
