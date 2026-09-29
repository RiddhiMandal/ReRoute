import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "Reroute — Find your city in Ontario",
  description:
    "Rent, healthcare, safety, jobs and free settlement help for people moving to the Greater Toronto Area — with a personal city match, maps and a 30-day plan, in English and French.",
  openGraph: {
    title: "Reroute — Find your city in Ontario",
    description:
      "Compare GTA cities on rent, safety, jobs, healthcare and settlement help, then get a personal city match. English and French.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F6E56",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-reroute-cream text-slate-900 antialiased">
        <Providers>{children}</Providers>

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
