// All interface text, in English and French. Keys must exist in BOTH objects
// (scripts/check-i18n.mjs verifies this). Use {placeholders} for values.

export const EN: Record<string, string> = {
  // common
  "common.back": "Back",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.language": "Language",
  "common.lastUpdated": "Last updated",
  "common.loading": "Loading…",
  "common.noResults": "No results found — try a different search or clear the filter.",
  "common.notAvailable": "Not available",
  "common.save": "Save",
  "common.source": "Source",
  "common.colon": ": ",
  "common.viewGoogleMaps": "View on Google Maps",

  // header
  "header.city": "City",
  "header.regionGta": "GTA (Greater Toronto Area)",
  "header.tagline": "a relocation guide for Ontario",

  // sign-up / sign-in
  "auth.tagline": "Find the right GTA city to call home.",
  "auth.signUp": "Sign Up",
  "auth.signIn": "Sign In",
  "auth.skip": "Skip for now →",
  "auth.name": "Name",
  "auth.namePlaceholder": "Your name",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.passwordHint": "At least 8 characters",
  "auth.createAccount": "Create Account",
  "auth.type.legend": "I am…",
  "auth.type.newcomer": "New to Canada",
  "auth.type.newcomerHint": "I recently arrived or am about to arrive",
  "auth.type.internal": "Moving within Canada",
  "auth.type.internalHint": "I already live in Canada and am moving to the GTA",
  "auth.err.invalid": "Wrong email or password.",
  "auth.err.exists": "An account with this email already exists — try signing in.",
  "auth.err.weak": "Password must be at least 8 characters.",
  "auth.err.rate": "Too many attempts. Please wait a few minutes and try again.",
  "auth.err.network": "Could not reach the server. Check your connection and try again.",
  "auth.err.name": "Please enter your name.",
  "auth.err.email": "Please enter a valid email address.",
  "auth.err.password": "Please enter your password.",
  "auth.confirmEmail": "Almost done — check your email and click the confirmation link, then sign in.",
  "auth.privacy":
    "We store your name, email, preferences and checklist progress only to save your progress across devices. You can delete your account any time from your profile.",
  "auth.prototypeNote":
    "Prototype mode: your details are saved on this device only. No account or password is needed yet.",

  // profile
  "profile.title": "Your profile",
  "profile.guest": "Guest — saved on this device",
  "profile.saved": "Saved",
  "profile.syncedNote":
    "Your match preferences and checklist progress are saved to your account and follow you to any device.",
  "profile.localNote":
    "You're browsing as a guest: your progress is saved on this device only. Create a free account to keep it safe and use it anywhere.",
  "profile.signOut": "Sign out",
  "profile.delete": "Delete my account",
  "profile.deleteConfirm":
    "This permanently deletes your account and everything saved in it. This cannot be undone.",
  "profile.deleteYes": "Yes, delete everything",
  "profile.createAccount": "Create a free account",

  // navigation
  "nav.aria": "Sections",
  "nav.home": "Home",
  "nav.match": "Find my city",
  "nav.housing": "Housing",
  "nav.healthcare": "Healthcare",
  "nav.safety": "Safety",
  "nav.employment": "Employment",
  "nav.community": "Community",

  // home page
  "home.findCity.title": "Find my city",
  "home.findCity.subtitle":
    "Tell us about you and we'll rank the GTA cities using real rent, crime, jobs and language data. Your answers are saved to your profile.",
  "home.searchPlaceholder": "Search a city (e.g. Mississauga, Brampton, Toronto)",
  "home.search": "Search",
  "home.card.housing.desc": "Rent, neighbourhoods and listings",
  "home.card.healthcare.desc": "Hospitals, clinics and wait times",
  "home.card.safety.desc": "Crime data and neighbourhood safety",
  "home.card.employment.desc": "Jobs, industries and commute",
  "home.card.community.desc": "Language, culture and settlement support",
  "home.why.title": "Why Reroute?",
  "home.why.1.title": "Real data, real insights",
  "home.why.1.body": "Get up-to-date info on rent, safety, jobs and more.",
  "home.why.2.title": "Personalized recommendations",
  "home.why.2.body": "Find cities that match your goals and lifestyle.",
  "home.why.3.title": "Save and compare",
  "home.why.3.body": "Keep your favourite cities and answers in your profile.",
  "home.popular.title": "Popular cities in the GTA",
  "home.popular.viewAll": "View all cities",
  "home.popular.favorite": "Save {city} as a favourite",
  "home.popular.unfavorite": "Remove {city} from favourites",

  // 30-day banner
  "banner.aria": "30-day plan for newcomers",
  "banner.prev": "Previous banner",
  "banner.next": "Next banner",
  "banner.slides": "Banner slides",
  "banner.slideN": "Banner {n} of {total}",
  "banner.cta": "Open the 30-day plan",
  "banner.1.kicker": "Your 30-day plan · Week 1",
  "banner.2.kicker": "Your 30-day plan · Weeks 2–4",
  "banner.1.title.newcomer": "Land safely: SIN, OHIP and a bank account",
  "banner.1.body.newcomer":
    "Ontario has no OHIP waiting period, so apply on day one. Get your SIN, open a bank account and secure a home.",
  "banner.2.title.newcomer": "Settle in: agency, clinic, transit and work",
  "banner.2.body.newcomer":
    "Connect with a free settlement agency in your language, find a clinic, get a PRESTO card and start your job search.",
  "banner.1.title.internal": "Land smoothly: OHIP, address and a home",
  "banner.1.body.internal":
    "Ontario has no OHIP waiting period, so apply as soon as you arrive. Update your address everywhere and secure a home.",
  "banner.2.title.internal": "Settle in: doctor, transit, work and community",
  "banner.2.body.internal":
    "Find a family doctor or clinic, get a PRESTO card, start your job search and connect with local community support.",

  // stats bar
  "hero.rent": "Avg. 1BR rent",
  "hero.crime": "Crime severity",
  "hero.listings": "Rental listings",
  "hero.fromToronto": "{min} minutes from Toronto",
  "hero.inToronto": "In Toronto",

  // find my city
  "match.title": "Find my city",
  "match.intro":
    "Tell us about you and we'll rank the GTA cities using real rent, crime, commute, jobs and language data. Your answers are saved to your profile.",
  "match.filters": "Filters",
  "match.budget": "Monthly budget (1-bedroom)",
  "match.role": "Your occupation",
  "match.roleNone": "Not sure / other",
  "match.language": "Language community",
  "match.languageNone": "English / no preference",
  "match.howMuch": "How much does each matter?",
  "match.p.affordability": "Affordable rent",
  "match.p.safety": "Low crime",
  "match.p.commute": "Close to downtown Toronto",
  "match.p.jobs": "Jobs in my field",
  "match.p.language": "My language community",
  "match.imp.0": "Not important",
  "match.imp.1": "Somewhat",
  "match.imp.2": "Important",
  "match.imp.3": "Very important",
  "match.results": "Search results",
  "match.topOf": "Top {n} of {total} cities",
  "match.matchWord": "match",
  "match.explore": "Explore {city}",
  "match.r.rentOk": "Average 1BR rent {rent} fits your {budget} budget",
  "match.r.rentOver": "Average 1BR rent {rent} is {diff} over your budget",
  "match.r.safety": "{rating} crime severity (index {score})",
  "match.r.commute0": "You would live in Toronto itself",
  "match.r.commute": "About {min} minutes from Toronto",
  "match.r.roleHit": "{role} is a top hiring role here",
  "match.r.roleMiss": "{role} is not among the top hiring roles listed here",
  "match.r.langSpoken": "{lang} is widely spoken here",
  "match.r.langSpokenAgency1": "{lang} is widely spoken here and 1 settlement agency offers it",
  "match.r.langSpokenAgencyN": "{lang} is widely spoken here and {n} settlement agencies offer it",
  "match.r.langAgency1": "1 settlement agency offers {lang}",
  "match.r.langAgencyN": "{n} settlement agencies offer {lang}",
  "match.r.langNone": "{lang} is not among the top languages listed here",

  // comparison table
  "cmp.title": "Side-by-side comparison",
  "cmp.hint": "Top {n} matches — scroll inside the table",
  "cmp.rent1": "1BR average rent",
  "cmp.rent2": "2BR average rent",
  "cmp.rent3": "3BR average rent",
  "cmp.listings": "Rental listings",
  "cmp.vacancy": "Rental vacancy rate",
  "cmp.crime": "Crime severity",
  "cmp.distance": "From downtown Toronto",
  "cmp.minutes": "{min} minutes",
  "cmp.unemployment": "Unemployment rate",
  "cmp.roles": "Top hiring roles",
  "cmp.languages": "Languages",
  "cmp.clinics": "Listed clinics accepting patients",
  "cmp.agencies": "Settlement agencies listed",
  "cmp.hospital": "Nearest hospital",
  "cmp.note":
    "Rents are average asking rents (Rentals.ca, July 2026); listing counts are as of 24 Sept 2026. Mississauga and Brampton share one police service, so their crime index is the same. Unemployment is reported for the whole Toronto area.",

  // housing
  "housing.bedrooms": "Bedrooms",
  "housing.br": "{n} BR",
  "housing.avg1": "1BR average rent",
  "housing.avg2": "2BR average rent",
  "housing.avg3": "3BR average rent",
  "housing.listingsLine": "{n} rental listings on Rentals.ca (as of {date}).",
  "housing.vacancy": "Vacancy rate: {rate}.",
  "housing.searchTitle": "Search rental listings in {city}",
  "housing.searchSubtitle": "{n} sites — filter by feature or search by name",
  "housing.searchPlaceholder": "Search by site name or feature (e.g. condos, verified, map)",
  "housing.searchCity": "Search {city}",
  "housing.mapLabel": "Map showing average rent in {city}",
  "housing.mapHint": "Average asking rent for a {n}-bedroom in {city}.",
  "housing.insTitle": "Tenant insurance providers (Canada)",
  "housing.insSubtitle": "{n} providers — filter by coverage or search by name",
  "housing.insPlaceholder": "Search by provider name or coverage (e.g. liability, online quote)",
  "housing.getQuote": "Get a quote from {name}",

  // healthcare
  "health.accepting": "listed clinics accepting new patients",
  "health.hospital": "nearest hospital",
  "health.ohipLead": "New to Ontario?",
  "health.ohipBody":
    "There is no waiting period for OHIP — if you are eligible (for example permanent resident, or a work/study permit of 6+ months), coverage starts immediately. Apply in person at a ServiceOntario centre with three original documents: status, Ontario address and identity.",
  "health.ohipLink": "OHIP application guide",
  "health.noOhipYes":
    "Not eligible yet, or waiting on your status? Look for clinics tagged “No OHIP required” below.",
  "health.noOhipNo":
    "Not eligible yet, or waiting on your status? None of the clinics listed here are tagged “No OHIP required” — Toronto has several, and the settlement agencies in the Community tab can point you to care.",
  "health.findTitle": "Find a clinic in {city}",
  "health.findSubtitle": "{n} clinics — filter by symptom, specialty, or patient type",
  "health.searchPlaceholder": "Search by symptom, specialty, or clinic name",
  "health.none": "No clinics found — try a different search or clear the filter.",
  "health.acceptingBadge": "Accepting new patients",
  "health.treats": "Checks/treats:",
  "health.showOnMap": "Show on map",
  "health.mapLabel": "Map of clinics in {city}",
  "health.mapHint": "Green pins are clinics, the red pin is the nearest hospital. Click a pin to highlight its clinic.",

  // safety
  "safety.badge": "{rating} crime severity",
  "safety.trend": "Trend",
  "safety.explain":
    "Crime Severity Index score of {score}. In plain language: {city} has {rating} reported crime (trend: {trend}). The index is set to 100 for Canada in 2006, so lower is safer.",
  "safety.fullData": "See full Statistics Canada data",
  "safety.saveTitle": "Numbers every newcomer should save",
  "safety.n911": "Emergency (police, fire, ambulance)",
  "safety.nTelehealth": "Health811 — free 24/7 nurse advice (or chat online)",
  "safety.n211": "211 Ontario — find community and social services",
  "safety.n988": "988 — Suicide Crisis Helpline (call or text)",
  "safety.nonEmergency": "{service} — non-emergency line (reporting a theft, noise, etc.)",

  // employment
  "jobs.topRoles": "Top hiring roles",
  "jobs.unemployment": "Unemployment rate is {rate}.",
  "jobs.employersTitle": "Employers hiring in {city}",
  "jobs.showing": "Showing {n} of {total} employers",
  "jobs.searchPlaceholder": "Search by employer name or industry",
  "jobs.none": "No employers found — try a different search or clear the filter.",
  "jobs.hiring": "Hiring",
  "jobs.jobBank": "Search Job Bank for {city}",

  // community
  "community.languagesTitle": "Languages widely spoken in {city}",
  "community.helpTitle": "Free settlement help in {city}",
  "community.helpSubtitle":
    "{n} agencies — settlement services are free for permanent residents and many other newcomers",
  "community.searchPlaceholder": "Search by agency or service (e.g. housing, counselling, jobs)",
  "community.filterLanguage": "Filter by language",
  "community.anyLanguage": "Any language",
  "community.none": "No agencies found — try a different search or language.",
  "community.languagesLabel": "Languages:",
  "community.ircc": "Find more free newcomer services (IRCC)",

  // 30-day checklist
  "check.title": "Your first 30 days",
  "check.introNewcomer":
    "The essentials, in the order most newcomers need them. Your progress is saved to your profile.",
  "check.introInternal":
    "The essentials for moving to Ontario from elsewhere in Canada. Your progress is saved to your profile.",
  "check.progress": "{done} of {total} done",
  "check.back": "Back to Find my city",
  "check.reset": "Reset checklist",
  "check.phase.week1": "First week",
  "check.phase.weeks2to4": "Weeks 2–4",
  "check.phase.months2to3": "Months 2–3",
  "check.go.housing": "Open Housing",
  "check.go.community": "Open Community",
  "check.go.healthcare": "Open Healthcare",
  "check.go.employment": "Open Employment",
  "check.sin.title": "Get your Social Insurance Number (SIN)",
  "check.sin.detail": "You need a SIN to work in Canada and to file taxes. It is free — never pay anyone to get one.",
  "check.sin.link": "Apply for a SIN",
  "check.ohip.title": "Apply for OHIP health coverage",
  "check.ohip.detail":
    "There is no waiting period — if you are eligible, coverage starts immediately. Apply in person at ServiceOntario with three original documents (status, Ontario address, identity).",
  "check.ohip.link": "OHIP application guide",
  "check.bank.title": "Open a bank account",
  "check.bank.detail": "Most banks have newcomer packages. Ask about no-fee accounts and building a credit history.",
  "check.bank.link": "Opening a bank account",
  "check.housing.title": "Secure a home and know your tenant rights",
  "check.housing.detail": "Compare rents across the GTA and learn what a landlord can and cannot ask of you.",
  "check.housing.link": "Renting in Ontario: your rights",
  "check.insurance.title": "Get tenant insurance",
  "check.insurance.detail": "Covers your belongings and liability. Compare providers and get a quote online.",
  "check.settlement.title": "Connect with a free settlement agency",
  "check.settlement.detail": "Free help with jobs, housing, English classes and paperwork — in your language.",
  "check.settlement.link": "IRCC newcomer services",
  "check.doctor.title": "Find a family doctor or walk-in clinic",
  "check.doctor.detail": "Know where you will go before you get sick. Some clinics see patients without OHIP.",
  "check.telehealth.title": "Save Health811: call 811",
  "check.telehealth.detail": "Free 24/7 advice from a registered nurse (call 811 or chat online) when you are unsure if you need a doctor.",
  "check.telehealth.link": "About Health811",
  "check.presto.title": "Get a PRESTO transit card",
  "check.presto.detail": "One card for TTC, MiWay, Brampton Transit and GO Transit across the GTA.",
  "check.presto.link": "PRESTO",
  "check.jobs.title": "Start your job search",
  "check.jobs.detail": "Browse local employers and search Canada's official Job Bank.",
  "check.jobs.link": "Job Bank",
  "check.school.title": "Register your children for school",
  "check.school.detail":
    "Contact your local public or Catholic school board — registration usually needs proof of address and your child's records.",
  "check.licence.title": "Exchange or obtain an Ontario driver's licence",
  "check.licence.detail": "Visit ServiceOntario. Rules depend on the country your current licence is from.",
  "check.taxes.title": "File your first tax return",
  "check.taxes.detail":
    "Filing unlocks benefits and credits you may qualify for. Free tax clinics exist for eligible low-income households.",
  "check.ohipInternal.title": "Apply for OHIP in Ontario",
  "check.ohipInternal.detail":
    "Ontario has no waiting period. Apply in person at ServiceOntario with your ID, proof of status and your new Ontario address, then let your previous province know.",
  "check.ohipInternal.link": "OHIP application guide",
  "check.address.title": "Update your address everywhere",
  "check.address.detail":
    "Tell the Canada Revenue Agency, your bank, insurer, employer, phone provider and driver's licence office about your new address.",
  "check.bankInternal.title": "Update your bank and cards",
  "check.bankInternal.detail":
    "Move your accounts to a local branch if you like, and update your address so cards and statements reach you.",
  "check.bankInternal.link": "Banking information",
  "check.community211.title": "Find community support near you",
  "check.community211.detail":
    "Some settlement services are only for permanent residents, but local community centres and 211 are open to everyone.",
  "check.community211.link": "211 Ontario",
  "check.licenceInternal.title": "Get your Ontario driver's licence",
  "check.licenceInternal.detail":
    "Visit ServiceOntario soon after you move — check their page for the deadline and what to bring.",
  "check.taxesInternal.title": "Update your tax residency",
  "check.taxesInternal.detail": "Update your address with the CRA and file your next return as an Ontario resident.",

  // Niki, the chatbot
  "bot.title": "Niki · your Reroute guide",
  "bot.subtitle": "Answers about {city} and the GTA",
  "bot.placeholder": "Ask a question…",
  "bot.send": "Send",
  "bot.open": "Ask Niki for help",
  "bot.empty": "Type a question, or tap one of the suggestions below.",
  "bot.suggest.1": "How much is rent?",
  "bot.suggest.2": "Do I need to wait for OHIP?",
  "bot.suggest.3": "Which city is safest?",
  "bot.suggest.4": "Where can I get help in my language?",
  "bot.suggest.5": "What jobs are hiring?",
  "bot.welcome":
    "Hi, I'm Niki, your Reroute guide! Ask me about rent, OHIP and clinics, safety, jobs, or free help in your language.",
  "bot.greet":
    "Hi, I'm Niki! Ask me about rent, healthcare and OHIP, safety, jobs, settlement help in your language, or which GTA city fits you best.",
  "bot.thanks": "You're welcome! Good luck with your move — I'm here if you need anything else.",
  "bot.fallback":
    "I'm not sure about that one. I can help with rent and housing, OHIP and clinics, safety, jobs, free settlement services in your language, and choosing between GTA cities. Try one of the suggestions below.",
  "bot.ohip.body":
    "Good news: Ontario has no waiting period for OHIP anymore. If you are eligible (for example a permanent resident, or on a work or study permit of 6+ months), coverage starts immediately. Apply in person at a ServiceOntario centre with three original documents: proof of status, proof of Ontario address and ID.",
  "bot.ohip.yes": "If you are not eligible yet, {city}'s Healthcare tab lists clinics that see patients without OHIP.",
  "bot.ohip.no":
    "If you are not eligible yet, Toronto has clinics that see patients without OHIP, and the settlement agencies in {city}'s Community tab can point you to care.",
  "bot.insurance":
    "Tenant insurance protects your belongings and liability. In the Housing tab you can compare {n} Canadian providers, including {names}, and get an online quote. For health coverage, ask me about OHIP.",
  "bot.health":
    "In {city} I list {n} clinics ({accepting} accepting new patients), for example {names}. The nearest hospital is {hospital}.{noOhip} Call ahead — availability changes. For free nurse advice any time, call Health811 by dialing 811.",
  "bot.health.noOhip": "{n} of them see patients without OHIP.",
  "bot.safety":
    "{city} has {rating} crime severity (index {score}, {trend}). Of the {count} cities, {safest} scores lowest ({safestScore}). In an emergency call 911. For non-emergencies in {city}, reach {service} at {phone}.",
  "bot.jobs":
    "In {city} the top hiring roles are {roles}. The Toronto-area unemployment rate is {rate}. Employers to look at: {employers}. The Employment tab links straight to each careers page and to Canada's Job Bank.",
  "bot.community":
    "Free settlement help in {city}: {agencies}. Widely spoken here: {languages}. Settlement services help with jobs, housing, English classes and paperwork, and are free for permanent residents and many other newcomers. You can filter agencies by language in the Community tab.",
  "bot.compare":
    "It depends on what matters to you. On rent alone, {cheapest} is cheapest ({rent} for a 1BR). For crime, {safest} scores lowest. Use Find my city — set your budget, occupation, language and priorities and I'll rank the cities for you.",
  "bot.housing":
    "Average asking rent in {city}: {r1} for a 1-bedroom, {r2} for a 2-bedroom and {r3} for a 3-bedroom (Rentals.ca, July 2026).{vacancy} The Housing tab lists {sites} listing sites with direct links to this city, a rent map, and tenant insurance providers.",
  "bot.housing.vacancy": "Vacancy rate: {rate}.",
  "bot.checklist":
    "Start with these: get your SIN, apply for OHIP (no waiting period), open a bank account, secure housing and tenant insurance. Then connect with a free settlement agency, find a clinic and get a PRESTO card. The 30-day plan walks you through it and saves your progress.",
  "bot.a.healthcare": "Open Healthcare",
  "bot.a.settlement": "Free settlement help",
  "bot.a.compare": "Compare providers",
  "bot.a.clinics": "Open {city} clinics",
  "bot.a.safety": "Open {city} safety",
  "bot.a.jobs": "Open {city} jobs",
  "bot.a.community": "Open {city} community",
  "bot.a.match": "Find my city",
  "bot.a.housing": "Open {city} housing",
  "bot.a.checklist": "Open the 30-day plan",

  // feedback
  "feedback.title": "Give us feedback",
  "feedback.subtitle": "Was this helpful? Tell us what's missing.",
  "feedback.rating": "Helpfulness (1-5)",
  "feedback.outOf5": "{n} out of 5",
  "feedback.placeholder": "What was most useful? What is missing?",
  "feedback.send": "Send feedback",
};

export const FR: Record<string, string> = {
  // common
  "common.back": "Retour",
  "common.cancel": "Annuler",
  "common.close": "Fermer",
  "common.language": "Langue",
  "common.lastUpdated": "Dernière mise à jour",
  "common.loading": "Chargement…",
  "common.noResults": "Aucun résultat — essayez une autre recherche ou effacez le filtre.",
  "common.notAvailable": "Non disponible",
  "common.save": "Enregistrer",
  "common.source": "Source",
  "common.colon": " : ",
  "common.viewGoogleMaps": "Voir sur Google Maps",

  // header
  "header.city": "Ville",
  "header.regionGta": "RGT (région du Grand Toronto)",
  "header.tagline": "un guide d'installation pour l'Ontario",

  // sign-up / sign-in
  "auth.tagline": "Trouvez la ville de la RGT où vous sentir chez vous.",
  "auth.signUp": "S'inscrire",
  "auth.signIn": "Se connecter",
  "auth.skip": "Continuer sans compte →",
  "auth.name": "Nom",
  "auth.namePlaceholder": "Votre nom",
  "auth.email": "Courriel",
  "auth.password": "Mot de passe",
  "auth.passwordHint": "Au moins 8 caractères",
  "auth.createAccount": "Créer mon compte",
  "auth.type.legend": "Je suis…",
  "auth.type.newcomer": "Nouvel arrivant au Canada",
  "auth.type.newcomerHint": "Je viens d'arriver ou je m'apprête à arriver",
  "auth.type.internal": "En déménagement au Canada",
  "auth.type.internalHint": "Je vis déjà au Canada et je déménage dans la RGT",
  "auth.err.invalid": "Courriel ou mot de passe incorrect.",
  "auth.err.exists": "Un compte existe déjà avec ce courriel — essayez de vous connecter.",
  "auth.err.weak": "Le mot de passe doit contenir au moins 8 caractères.",
  "auth.err.rate": "Trop de tentatives. Attendez quelques minutes et réessayez.",
  "auth.err.network": "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.",
  "auth.err.name": "Veuillez entrer votre nom.",
  "auth.err.email": "Veuillez entrer un courriel valide.",
  "auth.err.password": "Veuillez entrer votre mot de passe.",
  "auth.confirmEmail":
    "Presque terminé — consultez votre courriel et cliquez sur le lien de confirmation, puis connectez-vous.",
  "auth.privacy":
    "Nous conservons votre nom, votre courriel, vos préférences et l'avancement de votre liste uniquement pour enregistrer votre progression sur tous vos appareils. Vous pouvez supprimer votre compte en tout temps depuis votre profil.",
  "auth.prototypeNote":
    "Mode prototype : vos renseignements sont enregistrés sur cet appareil seulement. Aucun compte ni mot de passe n'est encore nécessaire.",

  // profile
  "profile.title": "Votre profil",
  "profile.guest": "Invité — enregistré sur cet appareil",
  "profile.saved": "Enregistré",
  "profile.syncedNote":
    "Vos préférences de jumelage et l'avancement de votre liste sont enregistrés dans votre compte et vous suivent sur tous vos appareils.",
  "profile.localNote":
    "Vous naviguez en tant qu'invité : votre progression est enregistrée sur cet appareil seulement. Créez un compte gratuit pour la conserver et l'utiliser partout.",
  "profile.signOut": "Se déconnecter",
  "profile.delete": "Supprimer mon compte",
  "profile.deleteConfirm":
    "Cela supprime définitivement votre compte et tout ce qu'il contient. Cette action est irréversible.",
  "profile.deleteYes": "Oui, tout supprimer",
  "profile.createAccount": "Créer un compte gratuit",

  // navigation
  "nav.aria": "Sections",
  "nav.home": "Accueil",
  "nav.match": "Trouver ma ville",
  "nav.housing": "Logement",
  "nav.healthcare": "Santé",
  "nav.safety": "Sécurité",
  "nav.employment": "Emploi",
  "nav.community": "Communauté",

  // page d'accueil
  "home.findCity.title": "Trouver ma ville",
  "home.findCity.subtitle":
    "Parlez-nous de vous et nous classerons les villes du GTA selon les données réelles sur le loyer, la criminalité, l'emploi et la langue. Vos réponses sont enregistrées dans votre profil.",
  "home.searchPlaceholder": "Rechercher une ville (ex. Mississauga, Brampton, Toronto)",
  "home.search": "Rechercher",
  "home.card.housing.desc": "Loyer, quartiers et annonces",
  "home.card.healthcare.desc": "Hôpitaux, cliniques et délais d'attente",
  "home.card.safety.desc": "Données sur la criminalité et sécurité des quartiers",
  "home.card.employment.desc": "Emplois, industries et déplacements",
  "home.card.community.desc": "Langue, culture et aide à l'établissement",
  "home.why.title": "Pourquoi Reroute?",
  "home.why.1.title": "Données réelles, aperçus concrets",
  "home.why.1.body": "Obtenez des informations à jour sur le loyer, la sécurité, l'emploi et plus encore.",
  "home.why.2.title": "Recommandations personnalisées",
  "home.why.2.body": "Trouvez les villes qui correspondent à vos objectifs et à votre mode de vie.",
  "home.why.3.title": "Enregistrer et comparer",
  "home.why.3.body": "Gardez vos villes favorites et vos réponses dans votre profil.",
  "home.popular.title": "Villes populaires du GTA",
  "home.popular.viewAll": "Voir toutes les villes",
  "home.popular.favorite": "Ajouter {city} aux favoris",
  "home.popular.unfavorite": "Retirer {city} des favoris",

  // 30-day banner
  "banner.aria": "Plan de 30 jours pour les nouveaux arrivants",
  "banner.prev": "Bannière précédente",
  "banner.next": "Bannière suivante",
  "banner.slides": "Diapositives de la bannière",
  "banner.slideN": "Bannière {n} sur {total}",
  "banner.cta": "Ouvrir le plan de 30 jours",
  "banner.1.kicker": "Votre plan de 30 jours · Semaine 1",
  "banner.2.kicker": "Votre plan de 30 jours · Semaines 2 à 4",
  "banner.1.title.newcomer": "Bien atterrir : NAS, RAMO et compte bancaire",
  "banner.1.body.newcomer":
    "L'Ontario n'impose plus de délai d'attente pour le RAMO : faites votre demande dès le premier jour. Obtenez votre NAS, ouvrez un compte bancaire et trouvez un logement.",
  "banner.2.title.newcomer": "S'installer : organisme, clinique, transport et emploi",
  "banner.2.body.newcomer":
    "Communiquez avec un organisme d'établissement gratuit dans votre langue, trouvez une clinique, procurez-vous une carte PRESTO et lancez votre recherche d'emploi.",
  "banner.1.title.internal": "Bien atterrir : RAMO, adresse et logement",
  "banner.1.body.internal":
    "L'Ontario n'impose aucun délai d'attente pour le RAMO : faites votre demande dès votre arrivée. Mettez votre adresse à jour partout et trouvez un logement.",
  "banner.2.title.internal": "S'installer : médecin, transport, emploi et communauté",
  "banner.2.body.internal":
    "Trouvez un médecin de famille ou une clinique, procurez-vous une carte PRESTO, lancez votre recherche d'emploi et joignez les ressources communautaires de votre quartier.",

  // stats bar
  "hero.rent": "Loyer moyen (1 ch.)",
  "hero.crime": "Gravité de la criminalité",
  "hero.listings": "Annonces de location",
  "hero.fromToronto": "À {min} minutes de Toronto",
  "hero.inToronto": "À Toronto",

  // find my city
  "match.title": "Trouver ma ville",
  "match.intro":
    "Dites-nous qui vous êtes et nous classerons les villes de la RGT selon les vrais loyers, la criminalité, le trajet, l'emploi et la langue. Vos réponses sont enregistrées dans votre profil.",
  "match.filters": "Filtres",
  "match.budget": "Budget mensuel (1 chambre à coucher)",
  "match.role": "Votre profession",
  "match.roleNone": "Je ne sais pas / autre",
  "match.language": "Communauté linguistique",
  "match.languageNone": "Anglais / aucune préférence",
  "match.howMuch": "Quelle importance accordez-vous à chaque critère?",
  "match.p.affordability": "Loyer abordable",
  "match.p.safety": "Faible criminalité",
  "match.p.commute": "Près du centre-ville de Toronto",
  "match.p.jobs": "Emplois dans mon domaine",
  "match.p.language": "Ma communauté linguistique",
  "match.imp.0": "Sans importance",
  "match.imp.1": "Un peu",
  "match.imp.2": "Important",
  "match.imp.3": "Très important",
  "match.results": "Résultats",
  "match.topOf": "Les {n} meilleures sur {total} villes",
  "match.matchWord": "compatibilité",
  "match.explore": "Explorer {city}",
  "match.r.rentOk": "Le loyer moyen d'un 1 chambre ({rent}) respecte votre budget de {budget}",
  "match.r.rentOver": "Le loyer moyen d'un 1 chambre ({rent}) dépasse votre budget de {diff}",
  "match.r.safety": "Gravité de la criminalité : {rating} (indice {score})",
  "match.r.commute0": "Vous habiteriez à Toronto même",
  "match.r.commute": "À environ {min} minutes de Toronto",
  "match.r.roleHit": "{role} figure parmi les postes les plus recherchés ici",
  "match.r.roleMiss": "{role} ne figure pas parmi les postes les plus recherchés ici",
  "match.r.langSpoken": "{lang} : langue très parlée ici",
  "match.r.langSpokenAgency1": "{lang} : langue très parlée ici, et 1 organisme d'établissement offre ce service dans cette langue",
  "match.r.langSpokenAgencyN": "{lang} : langue très parlée ici, et {n} organismes d'établissement offrent ce service dans cette langue",
  "match.r.langAgency1": "{lang} : 1 organisme d'établissement offre ce service dans cette langue",
  "match.r.langAgencyN": "{lang} : {n} organismes d'établissement offrent ce service dans cette langue",
  "match.r.langNone": "{lang} ne figure pas parmi les langues principales répertoriées ici",

  // comparison table
  "cmp.title": "Comparaison côte à côte",
  "cmp.hint": "Les {n} meilleures correspondances — faites défiler dans le tableau",
  "cmp.rent1": "Loyer moyen (1 ch.)",
  "cmp.rent2": "Loyer moyen (2 ch.)",
  "cmp.rent3": "Loyer moyen (3 ch.)",
  "cmp.listings": "Annonces de location",
  "cmp.vacancy": "Taux d'inoccupation",
  "cmp.crime": "Gravité de la criminalité",
  "cmp.distance": "Distance du centre-ville de Toronto",
  "cmp.minutes": "{min} minutes",
  "cmp.unemployment": "Taux de chômage",
  "cmp.roles": "Postes les plus recherchés",
  "cmp.languages": "Langues",
  "cmp.clinics": "Cliniques répertoriées acceptant des patients",
  "cmp.agencies": "Organismes d'établissement répertoriés",
  "cmp.hospital": "Hôpital le plus proche",
  "cmp.note":
    "Les loyers sont des loyers moyens demandés (Rentals.ca, juillet 2026); le nombre d'annonces est celui du 24 septembre 2026. Mississauga et Brampton relèvent du même service de police : leur indice de criminalité est donc identique. Le taux de chômage est publié pour l'ensemble de la région de Toronto.",

  // housing
  "housing.bedrooms": "Chambres à coucher",
  "housing.br": "{n} ch.",
  "housing.avg1": "Loyer moyen, 1 ch.",
  "housing.avg2": "Loyer moyen, 2 ch.",
  "housing.avg3": "Loyer moyen, 3 ch.",
  "housing.listingsLine": "{n} annonces de location sur Rentals.ca (au {date}).",
  "housing.vacancy": "Taux d'inoccupation : {rate}.",
  "housing.searchTitle": "Chercher des logements à louer à {city}",
  "housing.searchSubtitle": "{n} sites — filtrez par caractéristique ou cherchez par nom",
  "housing.searchPlaceholder": "Chercher par nom de site ou caractéristique (ex. condos, vérifié, carte)",
  "housing.searchCity": "Chercher à {city}",
  "housing.mapLabel": "Carte du loyer moyen à {city}",
  "housing.mapHint": "Loyer moyen demandé pour un logement à {n} chambre(s) à {city}.",
  "housing.insTitle": "Assureurs pour locataires (Canada)",
  "housing.insSubtitle": "{n} assureurs — filtrez par garantie ou cherchez par nom",
  "housing.insPlaceholder": "Chercher par assureur ou garantie (ex. responsabilité civile, soumission en ligne)",
  "housing.getQuote": "Obtenir une soumission de {name}",

  // healthcare
  "health.accepting": "cliniques répertoriées acceptant de nouveaux patients",
  "health.hospital": "hôpital le plus proche",
  "health.ohipLead": "Nouveau en Ontario?",
  "health.ohipBody":
    "Il n'y a aucun délai d'attente pour le RAMO (Assurance-santé de l'Ontario) : si vous êtes admissible (par exemple résident permanent, ou titulaire d'un permis de travail ou d'études de 6 mois ou plus), la couverture commence immédiatement. Présentez-vous en personne dans un centre ServiceOntario avec trois documents originaux : preuve de statut, preuve d'adresse en Ontario et pièce d'identité.",
  "health.ohipLink": "Guide de demande du RAMO",
  "health.noOhipYes":
    "Pas encore admissible ou en attente de votre statut? Cherchez les cliniques étiquetées « RAMO non requis » ci-dessous.",
  "health.noOhipNo":
    "Pas encore admissible ou en attente de votre statut? Aucune des cliniques répertoriées ici n'est étiquetée « RAMO non requis » — Toronto en compte plusieurs, et les organismes d'établissement de l'onglet Communauté peuvent vous orienter vers des soins.",
  "health.findTitle": "Trouver une clinique à {city}",
  "health.findSubtitle": "{n} cliniques — filtrez par symptôme, spécialité ou type de patient",
  "health.searchPlaceholder": "Chercher par symptôme, spécialité ou nom de clinique",
  "health.none": "Aucune clinique trouvée — essayez une autre recherche ou effacez le filtre.",
  "health.acceptingBadge": "Accepte de nouveaux patients",
  "health.treats": "Consultations et soins :",
  "health.showOnMap": "Voir sur la carte",
  "health.mapLabel": "Carte des cliniques à {city}",
  "health.mapHint":
    "Les épingles vertes sont des cliniques; l'épingle rouge est l'hôpital le plus proche. Cliquez sur une épingle pour mettre la clinique en évidence.",

  // safety
  "safety.badge": "Gravité de la criminalité : {rating}",
  "safety.trend": "Tendance",
  "safety.explain":
    "Indice de gravité de la criminalité : {score}. En clair : à {city}, la criminalité déclarée est {rating} (tendance : {trend}). L'indice est fixé à 100 pour le Canada en 2006; plus il est bas, plus c'est sûr.",
  "safety.fullData": "Voir les données complètes de Statistique Canada",
  "safety.saveTitle": "Numéros que tout nouvel arrivant devrait enregistrer",
  "safety.n911": "Urgence (police, incendie, ambulance)",
  "safety.nTelehealth": "Santé811 — conseils gratuits d'une infirmière, 24 h sur 24 (ou clavardage en ligne)",
  "safety.n211": "211 Ontario — trouvez des services communautaires et sociaux",
  "safety.n988": "988 — Ligne d'aide en cas de crise suicidaire (appel ou texto)",
  "safety.nonEmergency": "{service} — ligne non urgente (signaler un vol, du bruit, etc.)",

  // employment
  "jobs.topRoles": "Postes les plus recherchés",
  "jobs.unemployment": "Le taux de chômage est de {rate}.",
  "jobs.employersTitle": "Employeurs qui recrutent à {city}",
  "jobs.showing": "{n} employeurs affichés sur {total}",
  "jobs.searchPlaceholder": "Chercher par nom d'employeur ou secteur",
  "jobs.none": "Aucun employeur trouvé — essayez une autre recherche ou effacez le filtre.",
  "jobs.hiring": "Recrute",
  "jobs.jobBank": "Chercher dans Guichet-Emplois pour {city}",

  // community
  "community.languagesTitle": "Langues très parlées à {city}",
  "community.helpTitle": "Aide gratuite à l'établissement à {city}",
  "community.helpSubtitle":
    "{n} organismes — les services d'établissement sont gratuits pour les résidents permanents et de nombreux autres nouveaux arrivants",
  "community.searchPlaceholder": "Chercher par organisme ou service (ex. logement, counseling, emploi)",
  "community.filterLanguage": "Filtrer par langue",
  "community.anyLanguage": "Toutes les langues",
  "community.none": "Aucun organisme trouvé — essayez une autre recherche ou langue.",
  "community.languagesLabel": "Langues :",
  "community.ircc": "Trouver d'autres services gratuits pour nouveaux arrivants (IRCC)",

  // 30-day checklist
  "check.title": "Vos 30 premiers jours",
  "check.introNewcomer":
    "L'essentiel, dans l'ordre où la plupart des nouveaux arrivants en ont besoin. Votre progression est enregistrée dans votre profil.",
  "check.introInternal":
    "L'essentiel pour déménager en Ontario depuis une autre région du Canada. Votre progression est enregistrée dans votre profil.",
  "check.progress": "{done} sur {total} terminés",
  "check.back": "Retour à Trouver ma ville",
  "check.reset": "Réinitialiser la liste",
  "check.phase.week1": "Première semaine",
  "check.phase.weeks2to4": "Semaines 2 à 4",
  "check.phase.months2to3": "Mois 2 et 3",
  "check.go.housing": "Ouvrir Logement",
  "check.go.community": "Ouvrir Communauté",
  "check.go.healthcare": "Ouvrir Santé",
  "check.go.employment": "Ouvrir Emploi",
  "check.sin.title": "Obtenir votre numéro d'assurance sociale (NAS)",
  "check.sin.detail":
    "Il vous faut un NAS pour travailler au Canada et produire une déclaration de revenus. C'est gratuit — ne payez jamais personne pour l'obtenir.",
  "check.sin.link": "Demander un NAS",
  "check.ohip.title": "Faire une demande d'assurance-santé de l'Ontario (RAMO)",
  "check.ohip.detail":
    "Il n'y a aucun délai d'attente — si vous êtes admissible, la couverture commence immédiatement. Présentez-vous en personne à ServiceOntario avec trois documents originaux (statut, adresse en Ontario, identité).",
  "check.ohip.link": "Guide de demande du RAMO",
  "check.bank.title": "Ouvrir un compte bancaire",
  "check.bank.detail":
    "La plupart des banques offrent des forfaits pour nouveaux arrivants. Renseignez-vous sur les comptes sans frais et sur la constitution d'un dossier de crédit.",
  "check.bank.link": "Ouvrir un compte bancaire",
  "check.housing.title": "Trouver un logement et connaître vos droits de locataire",
  "check.housing.detail":
    "Comparez les loyers dans la RGT et apprenez ce qu'un propriétaire peut ou ne peut pas exiger de vous.",
  "check.housing.link": "Louer en Ontario : vos droits",
  "check.insurance.title": "Souscrire une assurance locataire",
  "check.insurance.detail":
    "Elle couvre vos biens et votre responsabilité civile. Comparez les assureurs et obtenez une soumission en ligne.",
  "check.settlement.title": "Communiquer avec un organisme d'établissement gratuit",
  "check.settlement.detail":
    "Aide gratuite pour l'emploi, le logement, les cours d'anglais et les formalités — dans votre langue.",
  "check.settlement.link": "Services d'IRCC pour nouveaux arrivants",
  "check.doctor.title": "Trouver un médecin de famille ou une clinique sans rendez-vous",
  "check.doctor.detail":
    "Sachez où aller avant de tomber malade. Certaines cliniques reçoivent des patients sans RAMO.",
  "check.telehealth.title": "Enregistrer Santé811 : composez le 811",
  "check.telehealth.detail":
    "Conseils gratuits d'une infirmière autorisée, 24 h sur 24 (composez le 811 ou clavardez en ligne), quand vous ne savez pas s'il faut voir un médecin.",
  "check.telehealth.link": "À propos de Santé811",
  "check.presto.title": "Se procurer une carte de transport PRESTO",
  "check.presto.detail": "Une seule carte pour la TTC, MiWay, Brampton Transit et GO Transit dans toute la RGT.",
  "check.presto.link": "PRESTO",
  "check.jobs.title": "Commencer votre recherche d'emploi",
  "check.jobs.detail": "Consultez les employeurs locaux et explorez le Guichet-Emplois officiel du Canada.",
  "check.jobs.link": "Guichet-Emplois",
  "check.school.title": "Inscrire vos enfants à l'école",
  "check.school.detail":
    "Communiquez avec votre conseil scolaire public ou catholique — l'inscription exige généralement une preuve d'adresse et le dossier scolaire de votre enfant.",
  "check.licence.title": "Échanger ou obtenir un permis de conduire de l'Ontario",
  "check.licence.detail":
    "Rendez-vous à ServiceOntario. Les règles dépendent du pays qui a délivré votre permis actuel.",
  "check.taxes.title": "Produire votre première déclaration de revenus",
  "check.taxes.detail":
    "La déclaration donne accès à des prestations et crédits auxquels vous pourriez avoir droit. Des cliniques d'impôt gratuites existent pour les ménages à faible revenu admissibles.",
  "check.ohipInternal.title": "Faire une demande de RAMO en Ontario",
  "check.ohipInternal.detail":
    "L'Ontario n'impose aucun délai d'attente. Présentez-vous en personne à ServiceOntario avec une pièce d'identité, une preuve de statut et votre nouvelle adresse en Ontario, puis avisez votre province précédente.",
  "check.ohipInternal.link": "Guide de demande du RAMO",
  "check.address.title": "Mettre votre adresse à jour partout",
  "check.address.detail":
    "Informez l'Agence du revenu du Canada, votre banque, votre assureur, votre employeur, votre fournisseur de téléphonie et le bureau des permis de conduire de votre nouvelle adresse.",
  "check.bankInternal.title": "Mettre à jour votre banque et vos cartes",
  "check.bankInternal.detail":
    "Transférez vos comptes vers une succursale locale si vous le souhaitez et mettez à jour votre adresse pour recevoir vos cartes et relevés.",
  "check.bankInternal.link": "Renseignements bancaires",
  "check.community211.title": "Trouver du soutien communautaire près de chez vous",
  "check.community211.detail":
    "Certains services d'établissement sont réservés aux résidents permanents, mais les centres communautaires locaux et le 211 sont ouverts à tous.",
  "check.community211.link": "211 Ontario",
  "check.licenceInternal.title": "Obtenir votre permis de conduire de l'Ontario",
  "check.licenceInternal.detail":
    "Rendez-vous à ServiceOntario peu après votre déménagement — consultez leur page pour connaître le délai et les documents à apporter.",
  "check.taxesInternal.title": "Mettre à jour votre résidence fiscale",
  "check.taxesInternal.detail":
    "Mettez votre adresse à jour auprès de l'ARC et produisez votre prochaine déclaration comme résident de l'Ontario.",

  // Niki, the chatbot
  "bot.title": "Niki · votre guide Reroute",
  "bot.subtitle": "Réponses sur {city} et la RGT",
  "bot.placeholder": "Posez une question…",
  "bot.send": "Envoyer",
  "bot.open": "Demander de l'aide à Niki",
  "bot.empty": "Écrivez une question ou touchez l'une des suggestions ci-dessous.",
  "bot.suggest.1": "Combien coûte un loyer?",
  "bot.suggest.2": "Dois-je attendre pour le RAMO?",
  "bot.suggest.3": "Quelle ville est la plus sûre?",
  "bot.suggest.4": "Où trouver de l'aide dans ma langue?",
  "bot.suggest.5": "Quels emplois sont disponibles?",
  "bot.welcome":
    "Bonjour, je suis Niki, votre guide Reroute! Posez-moi vos questions sur les loyers, le RAMO et les cliniques, la sécurité, l'emploi ou l'aide dans votre langue.",
  "bot.greet":
    "Bonjour, je suis Niki! Posez-moi vos questions sur les loyers, la santé et le RAMO, la sécurité, l'emploi, l'aide à l'établissement dans votre langue ou la ville de la RGT qui vous convient le mieux.",
  "bot.thanks": "Avec plaisir! Bonne chance pour votre déménagement — je suis là si vous avez besoin d'autre chose.",
  "bot.fallback":
    "Je ne suis pas sûr de comprendre. Je peux vous aider avec les loyers et le logement, le RAMO et les cliniques, la sécurité, l'emploi, les services d'établissement gratuits dans votre langue et le choix entre les villes de la RGT. Essayez l'une des suggestions ci-dessous.",
  "bot.ohip.body":
    "Bonne nouvelle : l'Ontario n'impose plus de délai d'attente pour le RAMO. Si vous êtes admissible (par exemple résident permanent, ou titulaire d'un permis de travail ou d'études de 6 mois ou plus), la couverture commence immédiatement. Présentez-vous en personne dans un centre ServiceOntario avec trois documents originaux : preuve de statut, preuve d'adresse en Ontario et pièce d'identité.",
  "bot.ohip.yes":
    "Si vous n'êtes pas encore admissible, l'onglet Santé de {city} répertorie des cliniques qui reçoivent des patients sans RAMO.",
  "bot.ohip.no":
    "Si vous n'êtes pas encore admissible, Toronto compte des cliniques qui reçoivent des patients sans RAMO, et les organismes d'établissement de l'onglet Communauté de {city} peuvent vous orienter vers des soins.",
  "bot.insurance":
    "L'assurance locataire protège vos biens et votre responsabilité civile. Dans l'onglet Logement, vous pouvez comparer {n} assureurs canadiens, dont {names}, et obtenir une soumission en ligne. Pour la couverture santé, demandez-moi au sujet du RAMO.",
  "bot.health":
    "À {city}, je répertorie {n} cliniques ({accepting} acceptant de nouveaux patients), par exemple {names}. L'hôpital le plus proche est {hospital}.{noOhip} Appelez avant de vous déplacer — la disponibilité change. Pour des conseils gratuits d'une infirmière en tout temps, composez le 811 (Santé811).",
  "bot.health.noOhip": "{n} d'entre elles reçoivent des patients sans RAMO.",
  "bot.safety":
    "À {city}, la gravité de la criminalité est {rating} (indice {score}, {trend}). Parmi les {count} villes, {safest} obtient le score le plus bas ({safestScore}). En cas d'urgence, composez le 911. Pour les situations non urgentes à {city}, joignez {service} au {phone}.",
  "bot.jobs":
    "À {city}, les postes les plus recherchés sont : {roles}. Le taux de chômage dans la région de Toronto est de {rate}. Employeurs à consulter : {employers}. L'onglet Emploi mène directement à chaque page carrières et au Guichet-Emplois du Canada.",
  "bot.community":
    "Aide gratuite à l'établissement à {city} : {agencies}. Langues très parlées ici : {languages}. Les services d'établissement aident pour l'emploi, le logement, les cours d'anglais et les formalités, et sont gratuits pour les résidents permanents et de nombreux autres nouveaux arrivants. Vous pouvez filtrer les organismes par langue dans l'onglet Communauté.",
  "bot.compare":
    "Cela dépend de ce qui compte pour vous. Pour le loyer seulement, {cheapest} est la moins chère ({rent} pour un 1 chambre). Pour la criminalité, {safest} obtient le score le plus bas. Utilisez Trouver ma ville : indiquez votre budget, votre profession, votre langue et vos priorités, et je classerai les villes pour vous.",
  "bot.housing":
    "Loyer moyen demandé à {city} : {r1} pour un 1 chambre, {r2} pour un 2 chambres et {r3} pour un 3 chambres (Rentals.ca, juillet 2026).{vacancy} L'onglet Logement répertorie {sites} sites d'annonces avec des liens directs vers cette ville, une carte des loyers et des assureurs pour locataires.",
  "bot.housing.vacancy": "Taux d'inoccupation : {rate}.",
  "bot.checklist":
    "Commencez par ceci : obtenez votre NAS, faites votre demande de RAMO (aucun délai d'attente), ouvrez un compte bancaire, trouvez un logement et une assurance locataire. Ensuite, communiquez avec un organisme d'établissement gratuit, trouvez une clinique et procurez-vous une carte PRESTO. Le plan de 30 jours vous guide pas à pas et enregistre votre progression.",
  "bot.a.healthcare": "Ouvrir Santé",
  "bot.a.settlement": "Aide gratuite à l'établissement",
  "bot.a.compare": "Comparer les assureurs",
  "bot.a.clinics": "Ouvrir les cliniques de {city}",
  "bot.a.safety": "Ouvrir Sécurité — {city}",
  "bot.a.jobs": "Ouvrir Emploi — {city}",
  "bot.a.community": "Ouvrir Communauté — {city}",
  "bot.a.match": "Trouver ma ville",
  "bot.a.housing": "Ouvrir Logement — {city}",
  "bot.a.checklist": "Ouvrir le plan de 30 jours",

  // feedback
  "feedback.title": "Donnez-nous votre avis",
  "feedback.subtitle": "Cette page vous a-t-elle été utile? Dites-nous ce qui manque.",
  "feedback.rating": "Utilité (1 à 5)",
  "feedback.outOf5": "{n} sur 5",
  "feedback.placeholder": "Qu'avez-vous trouvé le plus utile? Qu'est-ce qui manque?",
  "feedback.send": "Envoyer mon avis",
};
