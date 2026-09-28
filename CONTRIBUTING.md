# Contributing

Three people — Riddhi, Nikita, Samidha — working one session at a time rather than in
parallel. That makes the rules simpler than a normal team repo, but a couple of habits
matter so the next person isn't stuck guessing what state things are in.

Repo: https://github.com/RiddhiMandal/ReRoute

## Getting set up (Nikita & Samidha, do this once)

```bash
git clone https://github.com/RiddhiMandal/ReRoute.git
cd ReRoute
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and confirm it loads before doing
anything else. If `npm install` or `npm run dev` fails, say so before writing any code
— don't debug a broken environment and a feature at the same time.

## Workflow

1. **Pull `main` before you start.** Always work from the latest state:
   `git checkout main && git pull`.
2. **Branch per session**, named after the task you're picking up, e.g.
   `nikita-city-data` or `samidha-chatbot-flows`.
3. **Commit as you go**, with small, described commits — it makes it much easier for
   the next person to see what changed and why.
4. **Open a PR into `main` when your session ends**, even if the work isn't fully
   finished — describe what's done, what's left, and anything you got stuck on. Merge
   it yourself once it builds (`npm run build` + `npm run lint` clean) — no need to
   wait for review since only one person is active at a time, but leave the PR
   description as the handoff note for whoever picks up next.
5. **Update the placeholder tables in `README.md`** if you fill one in, so the next
   person doesn't waste time re-checking something that's already done.

## Before you push

```bash
npm run lint
npm run build
```

Both should pass clean. A broken `main` blocks whoever picks this up next.

## Current task split

The app is feature-complete: all data is researched and sourced, the chatbot is built in, and
there are no placeholders left. What remains is launch and validation.

### Riddhi — launch

- [ ] Push this repo to GitHub (commands below)
- [ ] Sign in to vercel.com with GitHub, import the repo and deploy (see README → Deploy it)
- [ ] Open the `*.vercel.app` URL on your phone and click through every tab
- [ ] Optional: create a GA4 property and add `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel
- [ ] Optional: create a Tally form and add `NEXT_PUBLIC_TALLY_EMBED_URL` in Vercel (or set
      `NEXT_PUBLIC_FEEDBACK_EMAIL` for a no-account option)
- [ ] Optional: buy a domain and add it in Vercel → Settings → Domains (DNS takes 24-48h)

### Nikita — data upkeep

- [ ] Every month: refresh rents from `rentals.ca/<city>` and note the month in `last_updated`
- [ ] Every quarter: re-check that each clinic still accepts new patients (call or check the
      website) and update `accepting_new_patients`
- [ ] Verify indicative fields with a real source: `top_roles` (Job Bank) and `languages`
      (Statistics Canada census profile) for all three cities
- [ ] Find Brampton's rental vacancy rate (CMHC Peel data) and fill `housing.vacancy_rate`
- [ ] Add a fourth Ontario city following the README's "Adding another Ontario city" steps

### Samidha — user testing

- [ ] Recruit 5 newcomer testers + 5 recently-relocated-within-Ontario testers
- [ ] Set up a shared spreadsheet: tester #, useful Y/N, most helpful section, what's missing,
      would share Y/N, confidence 1-5, one direct quote
- [ ] Run sessions. Watch for: does "Find my city" match what they expected? Do the chatbot
      answers make sense? Which tab do they open first?
- [ ] Add any question the chatbot got wrong to `lib/chatbot.ts` (each topic is one entry with
      keyword patterns and a reply)

### Everyone, once the above is done

- [ ] Read through all user-testing notes, pick the single highest-frequency
      complaint, and ship just that one fix — resist fixing everything at once
- [ ] Write the 2-minute demo script
- [ ] Pick the 3 strongest tester quotes for the pitch opening
- [ ] Rehearse the live demo twice out loud, ideally on the actual venue's wifi or a
      phone hotspot beforehand

## Picking up where the last person left off

Check, in order:

1. Open PRs / recently merged PRs — the handoff notes live there.
2. The "Keeping the data fresh" section in `README.md`.
3. Your section in "Current task split" above.

## Reporting a blocker

If something blocks you (a data source changed its page layout, a link now 404s, DNS not
propagated yet) — note it in your PR description rather than silently working around it.
