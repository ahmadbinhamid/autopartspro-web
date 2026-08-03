import { useEffect, useRef, useState } from "react";
import { ChatBubbleIcon, CloseIcon, SendIcon } from "@/components/icons/SharedIcons";
import { useChatAssistant } from "@/hooks/useChatAssistant";
import { SITE_NAME } from "@/constants/site";

const CHIPS = [
  { q: "How long does setup take?", label: "Setup time" },
  { q: "Which marketplaces do you support?", label: "Marketplaces" },
  { q: "Does it prevent overselling?", label: "Overselling" },
  { q: "How much does it cost?", label: "Pricing" },
  { q: "Tell me about vehicle fitment", label: "Fitment data" },
];

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, typing, send, greetIfEmpty } = useChatAssistant();
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  function openChat() {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
    greetIfEmpty();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => inputRef.current?.focus(), reduce ? 0 : 180);
  }

  function close() {
    setOpen(false);
    if (lastFocus.current?.focus) lastFocus.current.focus();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
    setInput("");
  }

  function handleJumpClick() {
    close();
  }

  return (
    <>
      <button
        className={`chat-launcher${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="chatPanel"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => (open ? close() : openChat())}
      >
        <span className="chat-ico-open">
          <ChatBubbleIcon />
        </span>
        <span className="chat-ico-close">
          <CloseIcon strokeWidth={2.2} />
        </span>
        <span className="chat-launcher-label">Chat</span>
      </button>

      <div
        className={`chat-panel${open ? " is-open" : ""}`}
        id="chatPanel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="chatTitle"
        hidden={!open}
      >
        <header className="chat-head">
          <div className="chat-head-id">
            <span className="chat-avatar" aria-hidden="true">
              <img src="/assets/logo-mark.svg" alt="" />
            </span>
            <div>
              <p className="chat-title" id="chatTitle">
                {SITE_NAME} Assistant
              </p>
              <p className="chat-status">
                <span className="dot-pulse" /> Answers from our FAQ &amp; features
              </p>
            </div>
          </div>
          <button className="chat-close" aria-label="Close chat" onClick={close}>
            <CloseIcon strokeWidth={2.2} />
          </button>
        </header>

        <div className="chat-log" ref={logRef} role="log" aria-live="polite" aria-atomic="false">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg chat-msg-${m.role}`}>
              <div className="chat-bubble">
                {m.text}
                {m.jump && (
                  <a className="chat-jump" href={m.jump} onClick={handleJumpClick}>
                    {m.jumpLabel || "Take me there"}
                  </a>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="chat-msg chat-msg-bot chat-typing">
              <div className="chat-bubble">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        <div className="chat-chips">
          {CHIPS.map((c) => (
            <button key={c.q} type="button" className="chat-chip" onClick={() => send(c.q)}>
              {c.label}
            </button>
          ))}
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="chatInput">
            Type your message
          </label>
          <input
            ref={inputRef}
            type="text"
            id="chatInput"
            name="message"
            placeholder="Ask a question…"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" aria-label="Send message">
            <SendIcon />
          </button>
        </form>
      </div>
    </>
  );
}
