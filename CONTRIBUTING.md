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

The original 7-day plan is compressed into three chunks, each broken into small,
one-sitting-sized tasks. Work through your list top to bottom; commit + open a PR after
each task (or small group of related ones) rather than saving it all for one giant PR
at the end — smaller PRs are easier to hand off if you have to stop partway through.

### Riddhi — infra & accounts (do this first, it unblocks placeholders below)

- [ ] Push this repo to GitHub (commands below)
- [ ] Sign in to vercel.com with your GitHub account
- [ ] Import the ReRoute repo as a new Vercel project
- [ ] Deploy it and open the `*.vercel.app` URL — confirm it loads with no errors
- [ ] Create a GA4 property at analytics.google.com
- [ ] Copy the GA4 Measurement ID (format `G-XXXXXXXXXX`)
- [ ] Paste it into `GA_MEASUREMENT_ID` in `app/layout.tsx`, commit, redeploy
- [ ] Open GA4 Realtime and confirm your own visit shows up
- [ ] Enable "Maps Embed API" in a Google Cloud project
- [ ] Generate a Maps Embed API key
- [ ] Restrict the key to your Vercel domain in Google Cloud Console
- [ ] Paste the key into all 6 `YOUR_GOOGLE_MAPS_EMBED_API_KEY` placeholders across
      `data/cities/*.json` (2 per city × 3 cities)
- [ ] Create a free Botpress Cloud account (just the account — Samidha builds the bot)
- [ ] Optional: buy a domain (e.g. on Namecheap) and start DNS setup — takes 24-48h to
      propagate, so start it early if you're doing it at all

### Nikita — city data & content polish

- [ ] Clone the repo, run `npm install && npm run dev`, confirm localhost:3000 loads
- [ ] Toronto housing: look up avg. 1BR/2BR/3BR rent + vacancy rate (CMHC Rental Market
      Report), fill in `data/cities/toronto.json`'s `housing` block + `source` +
      `last_updated`
- [ ] Toronto healthcare: look up clinics accepting patients + nearest major hospital
      (HealthForceOntario), fill in the `healthcare` block
- [ ] Toronto safety: look up the Crime Severity Index (Statistics Canada), fill in the
      `safety` block
- [ ] Toronto employment: look up top hiring roles + unemployment rate (Statistics
      Canada / Job Bank), fill in the `employment` block
- [ ] Toronto community: fill in languages spoken + settlement agency info
- [ ] Repeat the same 5 steps above for `data/cities/brampton.json`
- [ ] Double-check the numbers already in `data/cities/mississauga.json` are still
      current — flag anything stale in your PR instead of silently changing it
- [ ] Run the app, open the Employment tab, confirm whether the Job Bank iframe
      actually renders or gets blocked by `X-Frame-Options` — note the result in your
      PR either way (the button fallback is already coded either way)
- [ ] Open Chrome DevTools, switch to the iPhone SE (375px) preset, click through all 5
      tabs, note/screenshot anything broken
- [ ] Repeat the same click-through at the iPad (768px) preset
- [ ] Fix any layout issues found in the two checks above
- [ ] Stretch goal: add a 4th Ontario city following the README's "Adding a new
      Ontario city" steps

### Samidha — chatbot, tracking & user testing

- [ ] Clone the repo, run `npm install && npm run dev`, confirm localhost:3000 loads
- [ ] Create a free Botpress Cloud account
- [ ] Create a new bot in the Botpress Cloud dashboard
- [ ] Build conversation flow #1: Housing questions (trigger phrases + responses)
- [ ] Build conversation flow #2: Healthcare questions
- [ ] Build conversation flow #3: Safety questions
- [ ] Build conversation flow #4: Employment questions
- [ ] Build conversation flow #5: Community questions
- [ ] Build one fallback flow for anything that doesn't match the above
- [ ] Copy the Bot ID from the Botpress dashboard, paste into `BOTPRESS_BOT_ID` in
      `app/layout.tsx`
- [ ] Test all 5 trigger phrases on desktop
- [ ] Test all 5 trigger phrases on a mobile viewport
- [ ] Confirm the chat widget doesn't overlap the affiliate/CTA buttons on small screens
- [ ] Once Riddhi's GA4 is live, click through the site yourself and confirm outbound +
      affiliate clicks show up in GA4 Realtime (`trackOutboundClick` /
      `trackAffiliateClick` in `lib/analytics.ts` already fire on every relevant link —
      this is a verification step, not new code)
- [ ] Create a free Tally.so account
- [ ] Build a short feedback form: usefulness, most helpful section, what's missing,
      would they share it, confidence score
- [ ] Paste the Tally embed URL into `TALLY_EMBED_URL` in `components/FeedbackForm.tsx`
- [ ] Recruit 5 newcomer testers + 5 recently-relocated-within-Ontario testers, at
      least 2 days before you plan to run sessions
- [ ] Set up a shared spreadsheet with columns: tester #, useful Y/N, most helpful
      section, what's missing, would share Y/N, confidence 1-5, one direct quote
- [ ] Run the test sessions and log every answer

### Everyone, once the above is done

- [ ] Read through all user-testing notes, pick the single highest-frequency
      complaint, and ship just that one fix — resist fixing everything at once
- [ ] Write the 2-minute demo script
- [ ] Pick the 3 strongest tester quotes for the pitch opening
- [ ] Confirm at least one real affiliate click is tracked in GA4 (click it yourself if
      no tester triggered one organically)
- [ ] Rehearse the live demo twice out loud, ideally on the actual venue's wifi or a
      phone hotspot beforehand

## Picking up where the last person left off

Check, in order:

1. Open PRs / recently merged PRs — the handoff notes live there.
2. The placeholder tables in `README.md` — tells you what's still a `TODO`.
3. Your section in "Current task split" above.

## Reporting a blocker

If you hit one of the known risks (Job Bank iframe blocked, Google Maps Embed API
billing prompt, Botpress quota, DNS not propagated yet) — note it in your PR
description rather than silently working around it. These are flagged because they've
bitten teams before.
