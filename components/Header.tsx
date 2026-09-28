"use client";

import { useState } from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";
import CitySelector from "@/components/CitySelector";
import LanguageToggle from "@/components/LanguageToggle";
import ProfilePanel from "@/components/ProfilePanel";
import { useAccount } from "@/lib/account";
import { useI18n } from "@/lib/i18n";

export default function Header({
  activeCityId,
  onCityChange,
}: {
  activeCityId: string;
  onCityChange: (cityId: string) => void;
}) {
  const { t } = useI18n();
  const account = useAccount();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="flex items-center justify-between gap-3 border-b border-black/5 bg-white px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 items-center gap-2">
        <Image src="/logo.svg" alt="" width={32} height={32} />
        <span className="hidden text-lg font-semibold text-reroute-green sm:inline">Reroute</span>
        <span className="hidden truncate text-sm text-slate-400 lg:inline">— {t("header.tagline")}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <CitySelector activeCityId={activeCityId} onChange={onCityChange} />
        <LanguageToggle />
        <button
          onClick={() => setProfileOpen(true)}
          aria-label={t("profile.title")}
          className="flex items-center gap-1.5 rounded-full border border-black/10 px-2.5 py-1.5 text-sm text-reroute-green hover:bg-reroute-cream"
        >
          <UserRound size={16} />
          <span className="hidden max-w-[8rem] truncate font-medium sm:inline">
            {account.name || t("profile.title")}
          </span>
        </button>
      </div>
      {profileOpen && <ProfilePanel onClose={() => setProfileOpen(false)} />}
    </header>
  );
}
