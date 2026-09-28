"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import LoginGate from "@/components/LoginGate";
import CityHero from "@/components/CityHero";
import PlanBanner from "@/components/PlanBanner";
import SectionTabs, { SECTIONS, SectionId } from "@/components/SectionTabs";
import CityMatch from "@/components/CityMatch";
import Housing from "@/components/Housing";
import Healthcare from "@/components/Healthcare";
import Safety from "@/components/Safety";
import Employment from "@/components/Employment";
import Community from "@/components/Community";
import Checklist from "@/components/Checklist";
import Chatbot from "@/components/Chatbot";
import FeedbackForm from "@/components/FeedbackForm";
import { useAccount } from "@/lib/account";
import { useI18n } from "@/lib/i18n";
import { DEFAULT_CITY_ID, getCityData } from "@/lib/cities";

// Tabs that use a wide two-column layout (filters/results on the left, map or results on the right).
const WIDE_SECTIONS: SectionId[] = ["match", "housing", "healthcare"];

export default function Page() {
  const { t, tr } = useI18n();
  const account = useAccount();
  const [activeCityId, setActiveCityId] = useState(DEFAULT_CITY_ID);
  const [activeSection, setActiveSection] = useState<SectionId>(SECTIONS[0].id);

  if (account.restoring) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-reroute-green text-white">
        <span className="animate-pulse text-lg font-semibold">Reroute</span>
      </div>
    );
  }

  if (!account.entered) return <LoginGate />;

  const cityData = getCityData(activeCityId);

  function navigate(section: SectionId, cityId?: string) {
    if (cityId) setActiveCityId(cityId);
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let content: JSX.Element;
  switch (activeSection) {
    case "match":
      content = <CityMatch onExplore={(cityId) => navigate("housing", cityId)} />;
      break;
    case "checklist":
      content = (
        <div className="space-y-4">
          <button
            onClick={() => navigate("match")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-reroute-green hover:underline"
          >
            <ArrowLeft size={14} />
            {t("check.back")}
          </button>
          <Checklist onNavigate={(section) => navigate(section)} />
        </div>
      );
      break;
    case "housing":
      content = <Housing data={cityData} onSelectCity={setActiveCityId} />;
      break;
    case "healthcare":
      content = <Healthcare data={cityData} />;
      break;
    case "safety":
      content = <Safety data={cityData} />;
      break;
    case "employment":
      content = <Employment data={cityData} />;
      break;
    default:
      content = <Community data={cityData} />;
  }

  return (
    <main className="min-h-screen">
      <div className="sticky top-0 z-40 shadow-sm">
        <Header activeCityId={activeCityId} onCityChange={setActiveCityId} />
        <SectionTabs active={activeSection} onChange={setActiveSection} />
      </div>
      {activeSection === "match" && <PlanBanner onOpen={() => navigate("checklist")} />}
      <CityHero data={cityData} />
      <section
        className={`mx-auto px-4 py-8 sm:px-6 ${WIDE_SECTIONS.includes(activeSection) ? "max-w-6xl" : "max-w-3xl"}`}
      >
        {content}
      </section>
      <FeedbackForm />
      <footer className="border-t border-black/5 px-6 py-6 text-xs text-slate-400">{tr(cityData.disclaimer)}</footer>
      <Chatbot city={cityData} onNavigate={navigate} />
    </main>
  );
}
