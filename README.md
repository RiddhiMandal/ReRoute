# Reroute

A relocation guide for people moving to the Greater Toronto Area (GTA), in **English and French**.
Pick a city and see real rent, crime, jobs, healthcare and free settlement help on maps and lists —
or tell Reroute about yourself and let it rank the cities for you.

Free to run: no paid services. Accounts (optional) use a free Supabase project; everything else is
static data in this repo.

## What it does

| Area | What you get |
|---|---|
| **Sign-up** | Sign up / sign in with email + password, or skip. Choose **New to Canada** or **Moving within Canada** — the 30-day plan adapts. |
| **Profile** | Saves your name, type, match preferences and checklist progress to your account, on any device. Sign out or delete your account any time. |
| **Header** | Logo, city filter (region: GTA), **EN / FR** switch, profile. Nav: Find my city, Housing, Healthcare, Safety, Employment, Community. |
| **30-day plan banner** | Two slides on the home page; opens the full checklist (SIN, OHIP, bank, doctor, transit…). |
| **Stats bar** | Average 1BR rent, crime severity and number of rental listings for the selected city. |
| **Find my city** | Filters on the left (budget, occupation, language, priorities), top-4 results on the right, and a side-by-side comparison that scrolls inside its box. |
| **Housing** | Filters + 18 rental sites on the left, an OpenStreetMap **rent map** on the right; 10 tenant-insurance providers. |
| **Healthcare** | Filters + real clinics on the left, a **clinic map** on the right (linked both ways). Accurate OHIP guidance — Ontario has **no** waiting period. |
| **Safety** | Statistics Canada Crime Severity Index in plain language, police non-emergency line, and the numbers to save (911, Health811, 211, 988). |
| **Employment** | Unemployment rate, top roles, real employers with careers links. |
| **Community** | Free settlement agencies; filter by the language you speak. |
| **Niki** | A built-in chatbot that answers in English or French from the app's own data and jumps to the right tab. |

## Where the data comes from

| Data | Source | Refreshed |
|---|---|---|
| Average rents, listing counts | Rentals.ca city pages (asking rent) | Rents July 2026; counts 24 Sept 2026 |
| Vacancy rate | CMHC Rental Market Report 2025 (Brampton: not published, so omitted) | 2025 |
| Crime Severity Index | Statistics Canada 2024 (Toronto CMA; Peel Regional Police area for Mississauga and Brampton) | 2025-07 |
| Unemployment | Statistics Canada Labour Force Survey, Toronto CMA | June 2026 |
| OHIP rules, Health811 | ontario.ca, health811.ontario.ca | Sept 2026 |
| Clinics, agencies, employers | Their own websites, OCASI, 211 Ontario | Sept 2026 |
| Map pins | OpenStreetMap geocoding of each street address (`data/coordinates.json`) | Sept 2026 |

"Top hiring roles" and "languages widely spoken" are indicative, not from a single official table.
Clinic availability changes weekly — the footer tells visitors to verify directly.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). With no environment variables set, the app runs
in **guest mode**: everything works and progress is saved on that device only.

Useful checks before you push:

```bash
npm run lint
npm run check:i18n
npm run build
```

## Turn on accounts (free, about 10 minutes)

Accounts use [Supabase](https://supabase.com) (free plan: 50,000 monthly users, 500 MB database).
The app talks to it directly from the browser; each person can only ever read and change their own row
(Row Level Security).

1. Create a free project at supabase.com. Pick a region near Toronto (for example `ca-central-1`).
2. **SQL Editor → New query**, paste the whole of [`supabase/schema.sql`](supabase/schema.sql), click **Run**.
3. **Authentication → Providers → Email**: keep it enabled and turn **off "Confirm email"**.
   (With it on, sign-up needs an email round-trip, and Supabase's built-in mailer is limited to a
   few emails per hour. To keep it on later, connect your own mail service under Authentication → SMTP.)
4. **Project Settings → API**: copy the **Project URL** and the **anon public** key.
5. Put them in `.env.local` (local) and in Vercel → Settings → Environment Variables, then redeploy:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
   ```

Good to know:
- The **anon** key is meant to be public. Never put the `service_role` key anywhere in this project.
- Free Supabase projects **pause after 1 week of no activity**; open the dashboard and click Restore.
- There is no "forgot password" email yet (it needs the mailer from step 3). Until then a user who
  forgets their password can create a new account with a different email.
- "Delete my account" in the profile permanently removes the user and their saved data.

## Deploy (free, about 10 minutes)

1. Push the repo to GitHub.
2. On [vercel.com](https://vercel.com) sign in with GitHub → **Add New → Project** → import the repo → **Deploy**
   (all defaults). Every later push to `main` redeploys automatically.
3. Optional environment variables (Vercel → Settings → Environment Variables, then redeploy):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Turns on accounts (above). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Turns on Google Analytics 4. |
| `NEXT_PUBLIC_TALLY_EMBED_URL` or `NEXT_PUBLIC_FEEDBACK_EMAIL` | Shows a feedback form (hidden if neither is set). |

Map tiles come from the public OpenStreetMap servers, which are fine for a demo and light traffic. For
heavy traffic switch the tile URL in `components/MapView.tsx` to a provider such as MapTiler (free tier).

## Languages (English / French)

- Interface text lives in `lib/dictionary.ts` (`EN` and `FR`). Data text (clinic services, agency
  descriptions, employer blurbs, source labels) is translated in `lib/dataFr.ts`. Names, addresses and
  phone numbers are never translated. Official links switch to their French page where one exists.
- If a data string has no French entry the English shows, so nothing breaks. `npm run check:i18n`
  fails if a UI key is missing in either language.

## Keeping the data fresh

- **Rents / listing counts:** copy from `rentals.ca/<city>` into each city's `housing` block.
- **Crime / unemployment:** update from the Statistics Canada "The Daily" releases.
- **Clinics, agencies, employers:** edit `data/cities/*.json` or `lib/employers.ts`; new entries appear in
  search, filters and (with coordinates) on the map. Add French for new text in `lib/dataFr.ts`.
- **Map pins:** add `"<name>": [lat, lng]` to `data/coordinates.json`.

## Adding another GTA city (Vaughan, Markham, Oakville…)

1. Copy `data/cities/mississauga.json` to `data/cities/<city-id>.json` (the id is lowercase with
   hyphens, e.g. `richmond-hill`) and fill every field with a real source and date.
2. Register it in `lib/cities.ts` (import it, add it to `CITIES`).
3. Add `"city:<city-id>": [lat, lng]` and each clinic/agency/hospital to `data/coordinates.json`.
4. Add its employers to `lib/employers.ts` (set `city` to the display name) and French text to `lib/dataFr.ts`.

Housing-site links are built automatically from the city id, so no change is needed there. Find my city,
the comparison table (top 4), the header filter, the maps and the chatbot all pick the new city up.

## Stack

Next.js 14 (App Router) + TypeScript, Tailwind CSS, Leaflet + OpenStreetMap, lucide-react, Supabase (optional).

## Folder structure

```
app/            page.tsx (gate + tabs), layout.tsx (providers, metadata, optional analytics)
components/     one per tab, plus CityMatch, Checklist, Chatbot, LoginGate, ProfilePanel, MapView, PlanBanner
data/           cities/*.json, coordinates.json
lib/            cities.ts (types), match.ts (scoring), chatbot.ts, account.tsx + supabase.ts (accounts),
                i18n.tsx + dictionary.ts + dataFr.ts (languages), housingSites.ts, insuranceProviders.ts, employers.ts
supabase/       schema.sql
scripts/        check-i18n.mjs
```

## Team

Riddhi, Nikita and Samidha — see [`CONTRIBUTING.md`](CONTRIBUTING.md) for the workflow.
