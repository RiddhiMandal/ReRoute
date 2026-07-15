declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent(eventName: string, params: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function trackOutboundClick(section: string, destination: string) {
  sendEvent("outbound_click", { section, destination });
}

export function trackAffiliateClick(destination: string) {
  sendEvent("affiliate_click", { section: "housing", destination });
}
