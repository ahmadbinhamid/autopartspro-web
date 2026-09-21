import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitDemoRequest, ApiError } from "@/lib/api";

const fieldClass =
  "w-full rounded-xl border border-border bg-bg-2/60 px-4 py-3 text-[0.95rem] text-fg placeholder:text-fg-muted/70 transition-colors focus:border-accent/50 focus:bg-bg focus:outline-none disabled:opacity-60";
const labelClass = "mb-2 block text-sm font-semibold text-fg";

export function DemoRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    setSubmitting(true);
    setError(null);

    try {
      await submitDemoRequest({
        fullName: String(data.get("name") || ""),
        businessName: String(data.get("business") || ""),
        phone: String(data.get("phone") || ""),
        workEmail: String(data.get("email") || ""),
        message: String(data.get("message") || ""),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-ok/25 bg-ok/5 px-8 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-ok" />
        <p className="mt-4 text-lg font-bold text-fg">Request received</p>
        <p className="mt-2 max-w-sm text-sm text-fg-muted">
          Thanks for reaching out. We'll be in touch within one business day to set up your demo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label className={labelClass} htmlFor="demo-name">
          Full name
        </label>
        <input id="demo-name" name="name" type="text" placeholder="Jordan Miller" required disabled={submitting} className={fieldClass} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="demo-business">
            Business name
          </label>
          <input
            id="demo-business"
            name="business"
            type="text"
            placeholder="Miller Auto Parts"
            required
            disabled={submitting}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="demo-phone">
            Phone
          </label>
          <input
            id="demo-phone"
            name="phone"
            type="tel"
            placeholder="(555) 012-3456"
            disabled={submitting}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="demo-email">
          Work email
        </label>
        <input
          id="demo-email"
          name="email"
          type="email"
          placeholder="jordan@yourshop.com"
          required
          disabled={submitting}
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="demo-message">
          What are you looking to solve?
        </label>
        <textarea
          id="demo-message"
          name="message"
          rows={3}
          placeholder="e.g. We list on eBay and Google manually and keep overselling."
          disabled={submitting}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {error ? (
        <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="shine flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-semibold text-accent-fg shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request My Demo
            <ArrowRight className="h-4.5 w-4.5" />
          </>
        )}
      </button>
      <p className="text-center text-xs text-fg-muted">We'll get back to you within one business day.</p>
    </form>
  );
}
