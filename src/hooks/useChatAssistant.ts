import { useMemo, useRef, useState } from "react";
import { buildChatKnowledgeBase } from "@/constants/chatKnowledge";
import type { ChatKnowledgeEntry } from "@/types/content";

export interface ChatMessage {
  role: "bot" | "user";
  text: string;
  jump?: string;
  jumpLabel?: string;
}

const STORE_KEY = "apw-chat-v1";
const STOP = new Set(
  "a an and any are as at be but by can could did do does doing for from get got has have how i if in into is it its me my need of on or our so some tell than that the their them then there these they this to up us use want was we what when where which who will with you your".split(
    " ",
  ),
);

function tokens(str: string): string[] {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && w.length > 1 && !STOP.has(w))
    .map((w) => w.replace(/(ies)$/, "y").replace(/s$/, ""));
}

interface IndexedEntry extends ChatKnowledgeEntry {
  titleTokens: string[];
  allTokens: string[];
}

function indexEntries(entries: ChatKnowledgeEntry[]): IndexedEntry[] {
  return entries.map((e) => ({
    ...e,
    titleTokens: tokens(e.title + " " + (e.titleBoost || "")),
    allTokens: tokens(e.title + " " + e.answer + " " + (e.keys || []).join(" ") + " " + (e.titleBoost || "")),
  }));
}

function bestMatch(text: string, kb: IndexedEntry[]): IndexedEntry | null {
  const q = tokens(text);
  if (!q.length) return null;
  const low = " " + text.toLowerCase() + " ";
  let best: IndexedEntry | null = null;
  let bestScore = 0;
  let bestCoverage = 0;

  kb.forEach((e) => {
    let s = 0;
    let matched = 0;
    q.forEach((w) => {
      if (e.allTokens.includes(w)) {
        s += 1;
        matched++;
      }
      if (e.titleTokens.includes(w)) s += 1.5;
    });
    (e.keys || []).forEach((k) => {
      if (k && low.includes(k)) {
        s += 3;
        matched++;
      }
    });
    if (s > bestScore) {
      bestScore = s;
      bestCoverage = Math.min(1, matched / q.length);
      best = e;
    }
  });

  return bestScore >= 2.5 && bestCoverage >= 0.34 ? best : null;
}

const GREET = /\b(hi|hey|hello|yo|good (morning|afternoon|evening))\b/i;
const THANKS = /\b(thanks|thank you|cheers|ta)\b/i;
const BYE = /\b(bye|goodbye|see you|later)\b/i;

function answerFor(text: string, kb: IndexedEntry[]): { text: string; jump?: string; jumpLabel?: string } {
  if (GREET.test(text) && tokens(text).length <= 3) {
    return { text: "Hi! I can answer questions about syncing, orders, fitment data, warehouses, integrations or pricing. What would you like to know?" };
  }
  if (THANKS.test(text)) return { text: "Any time. Anything else I can dig out for you?" };
  if (BYE.test(text)) return { text: "Thanks for stopping by — the demo form is here whenever you want it." };

  const m = bestMatch(text, kb);
  if (m) return { text: m.answer, jump: m.jump, jumpLabel: m.jump === "#demo-section" ? "Book a demo" : "Show me on the page" };

  return {
    text: "I don't want to guess at that one. A specialist can answer it properly on a 30-minute walkthrough — shall I take you to the form?",
    jump: "#demo-section",
    jumpLabel: "Book a demo",
  };
}

function loadHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (!raw) return [];
    const saved = JSON.parse(raw);
    if (Array.isArray(saved)) return saved;
  } catch {
    /* ignore corrupt session storage */
  }
  return [];
}

export function useChatAssistant() {
  const kb = useMemo(() => indexEntries(buildChatKnowledgeBase()), []);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [typing, setTyping] = useState(false);
  const typingTimeout = useRef<number | undefined>(undefined);

  function persist(next: ChatMessage[]) {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(next.slice(-40)));
    } catch {
      /* storage unavailable — conversation just won't persist across reloads */
    }
  }

  function greetIfEmpty() {
    setMessages((prev) => {
      if (prev.length) return prev;
      const next: ChatMessage[] = [
        { role: "bot", text: "Hi — I'm the Auto Parts Pro assistant. Ask me about marketplace sync, orders, vehicle fitment, warehouses or pricing." },
      ];
      persist(next);
      return next;
    });
  }

  function send(raw: string) {
    const text = raw.trim();
    if (!text) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setMessages((prev) => {
      const next = [...prev, { role: "user" as const, text }];
      persist(next);
      return next;
    });

    const reply = () => {
      const a = answerFor(text, kb);
      setTyping(false);
      setMessages((prev) => {
        const next = [...prev, { role: "bot" as const, text: a.text, jump: a.jump, jumpLabel: a.jumpLabel }];
        persist(next);
        return next;
      });
    };

    if (reduce) {
      reply();
      return;
    }

    setTyping(true);
    window.clearTimeout(typingTimeout.current);
    typingTimeout.current = window.setTimeout(reply, Math.min(1100, 380 + text.length * 12));
  }

  return { messages, typing, send, greetIfEmpty };
}
