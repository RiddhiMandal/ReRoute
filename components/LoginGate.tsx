"use client";

import { useState } from "react";
import { useAccount, type UserType } from "@/lib/account";
import { useI18n } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

type View = "choice" | "signup" | "signin";

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-reroute-green focus:outline-none focus:ring-1 focus:ring-reroute-green";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-xs font-semibold text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}

export function UserTypePicker({
  value,
  onChange,
  name,
}: {
  value: UserType;
  onChange: (v: UserType) => void;
  name: string;
}) {
  const { t } = useI18n();
  const options: { id: UserType; label: string; hint: string }[] = [
    { id: "newcomer", label: t("auth.type.newcomer"), hint: t("auth.type.newcomerHint") },
    { id: "internal", label: t("auth.type.internal"), hint: t("auth.type.internalHint") },
  ];
  return (
    <fieldset>
      <legend className="mb-1 block text-xs font-semibold text-slate-500">{t("auth.type.legend")}</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <label
            key={o.id}
            className={`flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-left text-sm transition-colors ${
              value === o.id ? "border-reroute-green bg-reroute-green/5" : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            <input
              type="radio"
              name={name}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              className="mt-0.5 accent-reroute-green"
            />
            <span>
              <span className="block font-medium text-slate-800">{o.label}</span>
              <span className="block text-xs text-slate-500">{o.hint}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function LoginGate() {
  const { t } = useI18n();
  const account = useAccount();
  const [view, setView] = useState<View>("choice");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType>("newcomer");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function friendly(message: string): string {
    const m = message.toLowerCase();
    if (m.includes("invalid login")) return t("auth.err.invalid");
    if (m.includes("already registered") || m.includes("already exists")) return t("auth.err.exists");
    if (m.includes("password") && m.includes("least")) return t("auth.err.weak");
    if (m.includes("rate limit") || m.includes("too many")) return t("auth.err.rate");
    if (m.includes("failed to fetch") || m.includes("network")) return t("auth.err.network");
    return message;
  }

  function go(next: View) {
    setView(next);
    setError(null);
    setNotice(null);
  }

  async function submitSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError(t("auth.err.name"));
    if (!email.includes("@")) return setError(t("auth.err.email"));
    if (account.backend && password.length < 8) return setError(t("auth.err.weak"));
    setBusy(true);
    try {
      const result = await account.signUp({ name: name.trim(), email: email.trim(), password, userType });
      if (result === "confirm-email") {
        setNotice(t("auth.confirmEmail"));
        setView("signin");
      }
    } catch (err) {
      setError(friendly(err instanceof Error ? err.message : String(err)));
    } finally {
      setBusy(false);
    }
  }

  async function submitSignin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.includes("@")) return setError(t("auth.err.email"));
    if (account.backend && !password) return setError(t("auth.err.password"));
    setBusy(true);
    try {
      await account.signIn({ email: email.trim(), password });
    } catch (err) {
      setError(friendly(err instanceof Error ? err.message : String(err)));
    } finally {
      setBusy(false);
    }
  }

  const primary =
    "rounded-md bg-reroute-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-reroute-green-light disabled:opacity-60";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-reroute-green to-reroute-green-light p-5">
      <div className="absolute right-4 top-4">
        <LanguageToggle tone="dark" />
      </div>

      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl sm:p-10">
        <h1 className="text-3xl font-bold text-reroute-green">Reroute</h1>
        <p className="mb-7 mt-1 text-sm text-slate-500">{t("auth.tagline")}</p>

        {view === "choice" && (
          <div className="flex flex-col gap-2.5">
            <button onClick={() => go("signup")} className={primary}>
              {t("auth.signUp")}
            </button>
            <button
              onClick={() => go("signin")}
              className="rounded-md bg-reroute-cream px-4 py-2.5 text-sm font-semibold text-reroute-green hover:bg-reroute-green/10"
            >
              {t("auth.signIn")}
            </button>
            <button
              onClick={() => account.continueAsGuest()}
              className="mt-1 text-sm font-medium text-slate-500 underline"
            >
              {t("auth.skip")}
            </button>
          </div>
        )}

        {view === "signup" && (
          <form onSubmit={submitSignup} className="flex flex-col gap-3 text-left" noValidate>
            <Field label={t("auth.name")} htmlFor="su-name">
              <input
                id="su-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("auth.namePlaceholder")}
                autoComplete="name"
                className={inputClass}
              />
            </Field>
            <Field label={t("auth.email")} htmlFor="su-email">
              <input
                id="su-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClass}
              />
            </Field>
            {account.backend && (
              <Field label={t("auth.password")} htmlFor="su-password">
                <input
                  id="su-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.passwordHint")}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </Field>
            )}
            <UserTypePicker value={userType} onChange={setUserType} name="su-type" />
            {error && (
              <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
            <button type="submit" disabled={busy} className={primary}>
              {busy ? t("common.loading") : t("auth.createAccount")}
            </button>
            <button type="button" onClick={() => go("choice")} className="text-sm text-slate-500 underline">
              ← {t("common.back")}
            </button>
            <p className="text-xs text-slate-400">
              {account.backend ? t("auth.privacy") : t("auth.prototypeNote")}
            </p>
          </form>
        )}

        {view === "signin" && (
          <form onSubmit={submitSignin} className="flex flex-col gap-3 text-left" noValidate>
            {notice && (
              <p role="status" className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">
                {notice}
              </p>
            )}
            <Field label={t("auth.email")} htmlFor="si-email">
              <input
                id="si-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClass}
              />
            </Field>
            {account.backend && (
              <Field label={t("auth.password")} htmlFor="si-password">
                <input
                  id="si-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className={inputClass}
                />
              </Field>
            )}
            {error && (
              <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
            <button type="submit" disabled={busy} className={primary}>
              {busy ? t("common.loading") : t("auth.signIn")}
            </button>
            <button type="button" onClick={() => go("choice")} className="text-sm text-slate-500 underline">
              ← {t("common.back")}
            </button>
            {!account.backend && <p className="text-xs text-slate-400">{t("auth.prototypeNote")}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
