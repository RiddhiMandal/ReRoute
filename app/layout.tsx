import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// TODO(day1): replace with the real GA4 Measurement ID (format G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

// TODO(day4): replace with the real Botpress bot ID from the Botpress Cloud dashboard
const BOTPRESS_BOT_ID = "YOUR_BOTPRESS_BOT_ID";

export const metadata: Metadata = {
  title: "Reroute — Find your city in Ontario",
  description:
    "Housing, healthcare, safety, employment and community data for newcomers relocating to Ontario cities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-reroute-cream text-slate-900 antialiased">
        {children}

        {/* Google Analytics 4 */}
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

        {/* Botpress Cloud webchat */}
        <Script
          src="https://cdn.botpress.cloud/webchat/v2/inject.js"
          strategy="afterInteractive"
        />
        <Script id="botpress-init" strategy="afterInteractive">
          {`
            window.botpressWebChat && window.botpressWebChat.init({
              botId: '${BOTPRESS_BOT_ID}',
              hostUrl: 'https://cdn.botpress.cloud/webchat',
              messagingUrl: 'https://messaging.botpress.cloud',
              clientId: '${BOTPRESS_BOT_ID}'
            });
          `}
        </Script>
      </body>
    </html>
  );
}
