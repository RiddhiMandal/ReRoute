"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import LoginGate from "@/components/LoginGate";
import CityHero from "@/components/CityHero";
import PlanBanner from "@/components/PlanBanner";
import HomeHero from "@/components/HomeHero";
import Home from "@/components/Home";
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
import { CITIES, DEFAULT_CITY_ID, getCityData } from "@/lib/cities";

// Tabs that use a wide two-column layout (filters/results on the left, map or results on the right).
const WIDE_SECTIONS: SectionId[] = ["home", "match", "housing", "healthcare"];
const VALID_SECTIONS = new Set<string>([...SECTIONS.map((s) => s.id), "checklist"]);

/** Reads the current tab/city from the URL so the browser Back/Forward buttons move between them. */
function readFromLocation(): { section: SectionId; cityId: string } {
  if (typeof window === "undefined") {
    return { section: SECTIONS[0].id, cityId: DEFAULT_CITY_ID };
  }
  const params = new URLSearchParams(window.location.search);
  const cityParam = params.get("city");
  const sectionParam = params.get("section");
  const cityId = CITIES.some((c) => c.id === cityParam) ? (cityParam as string) : DEFAULT_CITY_ID;
  const section = (sectionParam && VALID_SECTIONS.has(sectionParam) ? sectionParam : SECTIONS[0].id) as SectionId;
  return { section, cityId };
}

export default function Page() {
  const { t, tr } = useI18n();
  const account = useAccount();
  const [activeCityId, setActiveCityId] = useState(DEFAULT_CITY_ID);
  const [activeSection, setActiveSection] = useState<SectionId>(SECTIONS[0].id);

  // Sync from the URL on first load, and whenever the user presses Back/Forward —
  // this is what makes the browser's back button move between tabs/cities instead of leaving the site.
  useEffect(() => {
    const sync = () => {
      const { section, cityId } = readFromLocation();
      setActiveSection(section);
      setActiveCityId(cityId);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  if (account.restoring) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-reroute-teal text-white">
        <span className="animate-pulse text-lg font-semibold">Reroute</span>
      </div>
    );
  }

  if (!account.entered) return <LoginGate />;

  const cityData = getCityData(activeCityId);

  function navigate(section: SectionId, cityId?: string) {
    const nextCityId = cityId ?? activeCityId;
    const params = new URLSearchParams();
    params.set("section", section);
    params.set("city", nextCityId);
    window.history.pushState(null, "", `?${params.toString()}`);
    setActiveSection(section);
    setActiveCityId(nextCityId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function changeCity(cityId: string) {
    navigate(activeSection, cityId);
  }

  let content: JSX.Element;
  switch (activeSection) {
    case "home":
      content = <Home onNavigate={navigate} />;
      break;
    case "match":
      content = <CityMatch onExplore={(cityId) => navigate("housing", cityId)} />;
      break;
    case "checklist":
      content = (
        <div className="space-y-4">
          <button
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-reroute-teal hover:underline"
          >
            <ArrowLeft size={14} />
            {t("check.back")}
          </button>
          <Checklist onNavigate={(section) => navigate(section)} />
        </div>
      );
      break;
    case "housing":
      content = <Housing data={cityData} />;
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
        <Header activeCityId={activeCityId} onCityChange={changeCity} />
        <SectionTabs active={activeSection} onChange={(section) => navigate(section)} />
      </div>
      {activeSection === "home" && <HomeHero data={cityData} onOpenChecklist={() => navigate("checklist")} />}
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
