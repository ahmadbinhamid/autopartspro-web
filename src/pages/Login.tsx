import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { EyeIcon } from "@/components/icons/SharedIcons";
import { SITE_NAME } from "@/constants/site";

type NoteState = { text: string; kind: "" | "error" | "info" };

/* Client-side validation only. Deliberately does NOT pretend to sign
   anyone in — with no auth endpoint wired up, a fake "success" screen
   would be misleading. Ported 1:1 from the original login.html. */
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [note, setNote] = useState<NoteState>({ text: "", kind: "" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setNote({ text: "Enter a valid work email address.", kind: "error" });
      document.getElementById("loginEmail")?.focus();
      return;
    }
    if (!password) {
      setNote({ text: "Enter your password.", kind: "error" });
      document.getElementById("loginPassword")?.focus();
      return;
    }

    setNote({ text: "Sign-in is not connected to an authentication service yet, so nothing was submitted.", kind: "info" });
  }

  return (
    <div className="auth-body">
      <main className="auth-wrap">
        <div className="auth-card">
          <Link className="auth-brand" to="/">
            <img src="/assets/logo-mark.svg" alt="" className="logo-mark" />
            <span>{SITE_NAME}</span>
          </Link>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Log in to manage your inventory, orders and channels.</p>

          <form className="auth-form" id="loginForm" noValidate onSubmit={handleSubmit}>
            <div className="f-row">
              <label htmlFor="loginEmail">
                Work email
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  placeholder="you@yourshop.com"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="f-row">
              <label htmlFor="loginPassword">
                Password
                <span className="auth-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="loginPassword"
                    name="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className={`auth-reveal${showPassword ? " is-on" : ""}`}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    <EyeIcon />
                  </button>
                </span>
              </label>
            </div>

            <div className="auth-row">
              <label className="auth-check">
                <input type="checkbox" name="remember" id="remember" />
                <span>Keep me logged in</span>
              </label>
            </div>

            <button type="submit" className="btn-submit">
              Log in
            </button>

            <p className={`auth-note${note.kind ? ` is-${note.kind}` : ""}`} id="loginNote" role="status" aria-live="polite">
              {note.text}
            </p>
          </form>

          <p className="auth-foot">
            Access is provisioned by your account administrator. <Link to="/">Back to site</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
