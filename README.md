# Reroute

A relocation guide for newcomers moving to Ontario — pick a city (Mississauga, Toronto,
Brampton to start) and see housing, healthcare, safety, employment and community data
for it, plus a chatbot that answers questions about each section.

No backend, no database — all data is hardcoded from published government sources in
`data/cities/*.json` so there is nothing to break during a live demo.

## Stack

- **Next.js 14** (App Router) + **TypeScript** — frontend framework
- **Tailwind CSS** — styling, mobile-first
- **lucide-react** — icons
- **Google Maps Embed** — clinic/settlement agency maps
- **Botpress Cloud** — chatbot (script injected in `app/layout.tsx`)
- **Google Analytics 4** — outbound + affiliate click tracking (`lib/analytics.ts`)
- **Tally.so** — feedback form embed (nice-to-have)
- **Vercel** — hosting, auto-deploys from GitHub

## Folder structure

```
reroute/
├── app/
│   ├── page.tsx          ← main landing page; holds active-city + active-tab state
│   ├── layout.tsx         ← global layout; GA4 + Botpress scripts injected here
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── CitySelector.tsx   ← dropdown to switch Ontario city
│   ├── CityHero.tsx       ← city name, tagline, three headline stat cards
│   ├── SectionTabs.tsx    ← Housing / Healthcare / Safety / Employment / Community
│   ├── Housing.tsx
│   ├── Healthcare.tsx
│   ├── Safety.tsx
│   ├── Employment.tsx
│   ├── Community.tsx
│   ├── SourceLabel.tsx    ← "Source: X · Last updated Y" footer used on every section
│   └── FeedbackForm.tsx   ← Tally.so embed (nice-to-have)
├── data/cities/
│   ├── mississauga.json   ← real, researched data
│   ├── toronto.json        ← placeholder data — needs research (see below)
│   └── brampton.json       ← placeholder data — needs research (see below)
├── lib/
│   ├── cities.ts          ← CityData type + registry; add a new city here
│   └── analytics.ts       ← trackOutboundClick / trackAffiliateClick GA4 helpers
└── public/
    └── logo.svg
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new Ontario city

1. Copy `data/cities/mississauga.json` to `data/cities/<cityname>.json`.
2. Fill in real numbers from CMHC / Statistics Canada / HealthForceOntario. Set `source`
   and `last_updated` — don't leave `"NEEDS RESEARCH"`.
3. Register it in `lib/cities.ts` (import it, add it to the `CITIES` array).

That's the whole integration surface — no other file needs to change.

## Before this is demo-ready

| Placeholder | File |
|---|---|
| `GA_MEASUREMENT_ID` | `app/layout.tsx` |
| `BOTPRESS_BOT_ID` | `app/layout.tsx` |
| `YOUR_GOOGLE_MAPS_EMBED_API_KEY` (×2 per city) | `data/cities/*.json` |
| `TALLY_EMBED_URL` | `components/FeedbackForm.tsx` |
| `"NEEDS RESEARCH"` / `"TODO"` fields | `data/cities/toronto.json`, `data/cities/brampton.json` |

Plus one thing to verify, not assume: confirm the Job Bank iframe in
`components/Employment.tsx` actually renders — `jobbank.gc.ca` has historically
blocked iframe embedding via `X-Frame-Options`. If it's blocked, the "Search Job Bank"
button is already there as the fallback.

## Known risks

- **DNS propagation** for a custom domain can take 24–48 hours — start this early.
- **Google Maps Embed API** currently requires a Google Cloud project on file even for
  the free tier — confirm before relying on it.
- **Botpress free tier** has monthly active user / message caps — don't burn the quota
  you need for the live demo during testing.
- **Job Bank iframe** may be blocked outright (see above).

## Team & task split

Three people, working one session at a time rather than in parallel. See
[`CONTRIBUTING.md`](CONTRIBUTING.md) for the full workflow and the current task
assignments for Riddhi, Nikita and Samidha.
