import { useRef } from "react";
import type { FaqEntry } from "@/types/content";

interface Props {
  entry: FaqEntry;
  open: boolean;
  onToggle: () => void;
}

/** Only one FAQ item is open at a time — `open` is owned by FaqSection. */
export function FaqItem({ entry, open, onToggle }: Props) {
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`faq-item anim${open ? " open" : ""}`}>
      <button className="faq-q" onClick={onToggle}>
        {entry.question}
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-a" ref={answerRef} style={{ maxHeight: open ? answerRef.current?.scrollHeight : 0 }}>
        {entry.answer.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
