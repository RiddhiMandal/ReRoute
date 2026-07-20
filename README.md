# ReRoute

Helping newcomers pick the right GTA city to settle in — an interactive map plus five decision-relevant data tabs (Housing, Healthcare, Safety, Employment, Community) and a guided chatbot, built against the scope in the "MVP Features" sheet of `ReRoute.xlsx`.

**Stack:** Flask backend, plain HTML/CSS/JS frontend (no build step), Leaflet.js + OpenStreetMap for the map (free, no API key required to run this today).

## Run it

```bash
pip3 install -r requirements.txt
python3 app.py
```

Then open http://127.0.0.1:5050

## What's built

- **Login gate** — Sign Up / Sign In / Skip, matching the "Login Journey" sheet. Skip is the main path. Sign Up stores just a name in `localStorage` for a "Welcome, {name}" greeting — **there is no real account system or password storage here**, intentionally, since building fake auth would be worse than not having it. Wire up real auth before this goes anywhere near production.
- **Interactive Map** — 20 real GTA-area municipalities (Toronto out to Georgina/Uxbridge) plotted with real coordinates, colour-coded green/yellow/red by 1-bedroom affordability tier. Filters: bedroom size, max budget, max distance from Toronto (real straight-line distance, computed server-side via the haversine formula — not made up). Click a pin for a quick-stats panel with one-click jumps into any of the five detail tabs, pre-loaded with that city.
- **Housing / Healthcare / Safety / Employment / Community tabs** — each has its own city picker (stays in sync with whatever you selected on the map) and shows that city's numbers: rent by bedroom size + rental listings, doctors/clinics/hospitals + an OHIP guide, Crime Severity Index + trend + nearest police/fire, job count/salary/labour demand + credential-recognition guidance, and religious places/cultural orgs/grocery stores/settlement agencies.
- **Healthcare tab has its own mini-map** — hospitals (red pins) and a sample of nearby walk-in clinics (blue pins) plotted on the selected city, not just a count.
- **Safety tab has its own mini-map too** — 5 sub-areas per city (Downtown/Core, North End, East Side, West End, Waterfront/South), each shown as a colour-coded, size-scaled circle by crime severity (green = lower, amber = moderate, red = higher), plus a table of the same numbers.
- **Employment tab lists example job openings** (role, employer, type, estimated salary) instead of just a job-count stat.
- **Chatbot** — a genuine rule-based decision tree (5 branches, matching the spec's "simple decision tree covering all five features... upgrade to AI in Version 2" — this is intentionally not an LLM). It asks what matters most, narrows down, and can jump you straight into the Map with filters pre-applied or into the relevant tab.

## What's real vs. placeholder — please read before presenting this as more than a prototype

- **City coordinates and the distance-from-Toronto calculation are real** (haversine formula against real lat/lng).
- **Every number in Housing/Healthcare/Safety/Employment/Community (rent, vacancy rate, crime index, job counts, doctor counts, etc.) is generated/illustrative data**, not pulled from a live source. It's seeded with a believable gradient (closer to Toronto = generally pricier & more jobs) so the demo *feels* right, but none of it is real CMHC, StatsCan, Job Bank, or Google Places data yet. See `data/cities.json` — swap in real numbers or wire up the real APIs before using this to advise an actual newcomer.
- **No Google Maps API used** — the map runs on Leaflet + OpenStreetMap tiles, which is free and needs zero setup, so the MVP works out of the box today. If you specifically want Google Maps (nicer styling, Street View, matches the spec's listed data sources like the Distance Matrix API), that's a fairly small swap — say the word and I'll wire it in once you have an API key and billing set up on a Google Cloud project.
- **Rental listing links are placeholder URLs** (`rentals.ca/<city>`), not real live listings.
- **Hospital/clinic pin locations and crime-zone boundaries are randomly scattered near each city's centre**, not real addresses or real police reporting-zone geography — good enough to demo "here's roughly where things are," not good enough to navigate by. Swap in Google Places API results (healthcare) and your local police service's actual zone data (safety) before this goes near a real user.
- **Example job openings are illustrative role/employer/salary combinations**, not real postings — swap in live Job Bank Canada API results for production.

## Data sources this should eventually connect to (per the spec sheet)

| Feature | Real source |
|---|---|
| Average rent | CMHC Rental Market Survey |
| Rental listings | Rentals.ca / Zumper public feeds |
| Distance from Toronto | Google Maps Distance Matrix API (or keep the free haversine calc) |
| Family doctors | HealthForceOntario |
| Clinics/hospitals | Google Places API |
| Crime Severity Index | Statistics Canada Table 35-10-0026-01 |
| Police/fire stations | Google Places API |
| Job listings/salary/labour demand | Job Bank Canada API |
| Religious places / cultural orgs / grocery | Google Places API + OpenStreetMap Overpass API |
| Settlement agencies | IRCC settlement finder |
| City coordinates | Google Geocoding API (currently hardcoded real values instead) |

## Not built yet

Everything outside the "MVP Features" sheet's 7 items — the fuller Housing/Healthcare/Safety/Employment/Culture/Government Support tabs sketched in the other sheets of the xlsx (tenant insurance, legal aid, bank/phone plan setup, OHIP enrollment as a real flow, mental health reports, LINC/ESL class finder, Ontario Works navigator, etc.) are not part of this build — that sheet reads as a broader product wishlist, while "MVP Features" is the explicit cut-line ("That is your full MVP"). Real authentication, a real database (currently a flat JSON file), and live API integrations are also not done.
