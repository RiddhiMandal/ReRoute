"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAccount } from "@/lib/account";
import { useI18n } from "@/lib/i18n";
import { UserTypePicker } from "@/components/LoginGate";

export default function ProfilePanel({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const account = useAccount();
  const [name, setName] = useState(account.name);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function saveName() {
    account.updateProfile({ name: name.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await action();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 p-4 pt-20"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("profile.title")}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-reroute-green">{t("profile.title")}</h2>
            <p className="text-xs text-slate-500">
              {account.isSignedIn ? account.email : t("profile.guest")}
            </p>
          </div>
          <button onClick={onClose} aria-label={t("common.close")} className="rounded-md p-1 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <div>
          <label htmlFor="pf-name" className="mb-1 block text-xs font-semibold text-slate-500">
            {t("auth.name")}
          </label>
          <div className="flex gap-2">
            <input
              id="pf-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-reroute-green focus:outline-none focus:ring-1 focus:ring-reroute-green"
            />
            <button
              onClick={saveName}
              className="rounded-md bg-reroute-green px-3 text-sm font-medium text-white hover:bg-reroute-green-light"
            >
              {saved ? t("profile.saved") : t("common.save")}
            </button>
          </div>
        </div>

        <UserTypePicker
          value={account.userType}
          onChange={(v) => account.updateProfile({ userType: v })}
          name="pf-type"
        />

        <p className="rounded-lg bg-reroute-cream px-3 py-2 text-xs text-slate-600">
          {account.isSignedIn ? t("profile.syncedNote") : t("profile.localNote")}
        </p>

        {error && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {account.isSignedIn ? (
          <div className="space-y-2 border-t border-black/5 pt-4">
            <button
              disabled={busy}
              onClick={() => run(() => account.signOut())}
              className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              {t("profile.signOut")}
            </button>
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-full text-sm text-red-600 underline hover:text-red-700"
              >
                {t("profile.delete")}
              </button>
            ) : (
              <div className="space-y-2 rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-800">{t("profile.deleteConfirm")}</p>
                <div className="flex gap-2">
                  <button
                    disabled={busy}
                    onClick={() => run(() => account.deleteAccount())}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    {t("profile.deleteYes")}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-white"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="border-t border-black/5 pt-4">
            <button
              onClick={() => {
                account.leaveGuest();
                onClose();
              }}
              className="w-full rounded-md bg-reroute-green px-4 py-2 text-sm font-medium text-white hover:bg-reroute-green-light"
            >
              {t("profile.createAccount")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
