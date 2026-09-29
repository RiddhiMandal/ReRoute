"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useAccount } from "@/lib/account";
import { useI18n } from "@/lib/i18n";

export default function PlanBanner({ onOpen }: { onOpen: () => void }) {
  const { t } = useI18n();
  const { userType } = useAccount();
  const [index, setIndex] = useState(0);

  const suffix = userType === "internal" ? "internal" : "newcomer";
  const slides = [
    {
      kicker: t("banner.1.kicker"),
      title: t(`banner.1.title.${suffix}`),
      body: t(`banner.1.body.${suffix}`),
    },
    {
      kicker: t("banner.2.kicker"),
      title: t(`banner.2.title.${suffix}`),
      body: t(`banner.2.body.${suffix}`),
    },
  ];
  const slide = slides[index];

  return (
    <section
      aria-label={t("banner.aria")}
      className="relative overflow-hidden bg-gradient-to-r from-reroute-teal-light to-reroute-teal px-4 py-5 text-white sm:px-8"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <button
          onClick={() => setIndex((index + slides.length - 1) % slides.length)}
          aria-label={t("banner.prev")}
          className="hidden rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white sm:block"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium uppercase tracking-wide text-white/70">{slide.kicker}</div>
          <div className="mt-1 text-lg font-semibold sm:text-xl">{slide.title}</div>
          <p className="mt-1 text-sm text-white/85">{slide.body}</p>
          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 rounded-md bg-white px-3.5 py-1.5 text-sm font-medium text-reroute-teal transition-colors hover:bg-reroute-cream"
            >
              {t("banner.cta")}
              <ArrowRight size={14} />
            </button>
            <div className="flex items-center gap-1.5" role="tablist" aria-label={t("banner.slides")}>
              {slides.map((s, i) => (
                <button
                  key={s.kicker}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={t("banner.slideN", { n: i + 1, total: slides.length })}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIndex((index + 1) % slides.length)}
          aria-label={t("banner.next")}
          className="hidden rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white sm:block"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
