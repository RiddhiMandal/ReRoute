"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import type { CityData } from "@/lib/cities";
import { SUGGESTION_KEYS, answer, type BotAction } from "@/lib/chatbot";
import { useI18n } from "@/lib/i18n";
import type { SectionId } from "@/components/SectionTabs";

interface Message {
  from: "bot" | "user";
  /** Bot messages are stored as a reply already built in the visitor's language. */
  text: string;
  actions?: BotAction[];
}

export default function Chatbot({
  city,
  onNavigate,
}: {
  city: CityData;
  onNavigate: (section: SectionId, cityId?: string) => void;
}) {
  const i18n = useI18n();
  const { t } = i18n;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = answer(trimmed, city, i18n);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      { from: "bot", text: reply.text, actions: reply.actions },
    ]);
    setInput("");
  }

  const shown: Message[] = [{ from: "bot", text: t("bot.welcome") }, ...messages];

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={t("bot.title")}
          className="fixed bottom-20 right-4 z-50 flex h-[min(32rem,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between bg-reroute-teal px-4 py-3 text-white">
            <div>
              <div className="text-sm font-semibold">{t("bot.title")}</div>
              <div className="text-xs text-white/70">{t("bot.subtitle", { city: city.city })}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("common.close")}
              className="rounded-md p-1 hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-reroute-cream/50 p-4">
            {shown.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%] space-y-2">
                  <div
                    className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-sm bg-reroute-teal text-white"
                        : "rounded-bl-sm bg-white text-slate-700 shadow-sm ring-1 ring-black/5"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.actions && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.actions.map((a) => (
                        <button
                          key={a.label}
                          onClick={() => {
                            onNavigate(a.section, a.cityId);
                            setOpen(false);
                          }}
                          className="rounded-full bg-reroute-teal/10 px-3 py-1 text-xs font-medium text-reroute-teal transition-colors hover:bg-reroute-teal hover:text-white"
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="border-t border-black/5 bg-white p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {SUGGESTION_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => send(t(key))}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200"
                >
                  {t(key)}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("bot.placeholder")}
                aria-label={t("bot.placeholder")}
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-reroute-teal focus:outline-none focus:ring-1 focus:ring-reroute-teal"
              />
              <button
                type="submit"
                aria-label={t("bot.send")}
                className="rounded-lg bg-reroute-orange px-3 text-white transition-colors hover:bg-reroute-orange-light"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t("common.close") : t("bot.open")}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-reroute-orange text-white shadow-lg transition-transform hover:scale-105 hover:bg-reroute-orange-light"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
