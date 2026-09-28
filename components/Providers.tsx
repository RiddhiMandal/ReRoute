"use client";

import type { ReactNode } from "react";
import { AccountProvider } from "@/lib/account";
import { I18nProvider } from "@/lib/i18n";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AccountProvider>{children}</AccountProvider>
    </I18nProvider>
  );
}
