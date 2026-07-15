"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CityHero from "@/components/CityHero";
import SectionTabs, { SECTIONS, SectionId } from "@/components/SectionTabs";
import Housing from "@/components/Housing";
import Healthcare from "@/components/Healthcare";
import Safety from "@/components/Safety";
import Employment from "@/components/Employment";
import Community from "@/components/Community";
import FeedbackForm from "@/components/FeedbackForm";
import { DEFAULT_CITY_ID, getCityData, type CityData } from "@/lib/cities";

const SECTION_COMPONENTS: Record<SectionId, (props: { data: CityData }) => JSX.Element> = {
  housing: Housing,
  healthcare: Healthcare,
  safety: Safety,
  employment: Employment,
  community: Community,
};

export default function Page() {
  const [activeCityId, setActiveCityId] = useState(DEFAULT_CITY_ID);
  const [activeSection, setActiveSection] = useState<SectionId>(SECTIONS[0].id);

  const cityData = getCityData(activeCityId);
  const ActiveSection = SECTION_COMPONENTS[activeSection];

  return (
    <main className="min-h-screen">
      <Header
        cityName={cityData.city}
        activeCityId={activeCityId}
        onCityChange={setActiveCityId}
      />
      <CityHero data={cityData} />
      <SectionTabs active={activeSection} onChange={setActiveSection} />
      <section className="mx-auto max-w-3xl px-6 py-8">
        <ActiveSection data={cityData} />
      </section>
      <FeedbackForm />
      <footer className="border-t border-black/5 px-6 py-6 text-xs text-slate-400">
        {cityData.disclaimer}
      </footer>
    </main>
  );
}
