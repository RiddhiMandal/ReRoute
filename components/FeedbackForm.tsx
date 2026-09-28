"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const TALLY_EMBED_URL = process.env.NEXT_PUBLIC_TALLY_EMBED_URL;
const FEEDBACK_EMAIL = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL;

export default function FeedbackForm() {
  const { t } = useI18n();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  if (!TALLY_EMBED_URL && !FEEDBACK_EMAIL) return null;

  return (
    <section className="border-t border-black/5 bg-white px-6 py-10">
      <h2 className="text-lg font-semibold text-reroute-green">{t("feedback.title")}</h2>
      <p className="mt-1 text-sm text-slate-500">{t("feedback.subtitle")}</p>

      {TALLY_EMBED_URL ? (
        <iframe
          title={t("feedback.title")}
          src={TALLY_EMBED_URL}
          className="mt-4 h-96 w-full rounded-lg border-0"
          loading="lazy"
        />
      ) : (
        <form
          className="mt-4 max-w-md space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const subject = encodeURIComponent("Reroute feedback");
            const body = encodeURIComponent(`${t("feedback.rating")}: ${rating ?? "-"}\n\n${comment}`);
            window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
          }}
        >
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                aria-label={t("feedback.outOf5", { n })}
                aria-pressed={rating === n}
                className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                  rating === n ? "bg-reroute-green text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder={t("feedback.placeholder")}
            aria-label={t("feedback.placeholder")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-reroute-green focus:outline-none focus:ring-1 focus:ring-reroute-green"
          />
          <button
            type="submit"
            className="rounded-md bg-reroute-green px-4 py-2 text-sm font-medium text-white hover:bg-reroute-green-light"
          >
            {t("feedback.send")}
          </button>
        </form>
      )}
    </section>
  );
}
