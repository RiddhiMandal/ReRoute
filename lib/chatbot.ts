import { CITIES, acceptingClinicCount, type CityData } from "@/lib/cities";
import { EMPLOYERS } from "@/lib/employers";
import { INSURANCE_PROVIDERS } from "@/lib/insuranceProviders";
import type { SectionId } from "@/components/SectionTabs";

export interface BotAction {
  label: string;
  section: SectionId;
  cityId?: string;
}

export interface BotReply {
  text: string;
  actions?: BotAction[];
}

/** The pieces of the i18n context the bot needs. */
export interface BotContext {
  t: (key: string, vars?: Record<string, string | number>) => string;
  tr: (text: string) => string;
  money: (n: number) => string;
}

export const SUGGESTION_KEYS = ["bot.suggest.1", "bot.suggest.2", "bot.suggest.3", "bot.suggest.4", "bot.suggest.5"];

function detectCity(question: string, fallback: CityData): CityData {
  const q = question.toLowerCase();
  return CITIES.find((c) => q.includes(c.city.toLowerCase())) ?? fallback;
}

interface Intent {
  name: string;
  /** English and French patterns live side by side so either language works. */
  patterns: RegExp[];
  reply: (city: CityData, ctx: BotContext) => BotReply;
}

const hasNoOhip = (city: CityData) =>
  city.healthcare.clinics.some((c) => c.patient_types.some((t) => /no ohip/i.test(t)));

const INTENTS: Intent[] = [
  {
    name: "ohip",
    patterns: [/\bohip\b/, /health card/, /health insurance/, /waiting period/, /\bwait\b/, /ramo/, /assurance[- ]sant/, /carte[- ]sant/, /d[ée]lai d.attente/, /attendre/],
    reply: (city, { t }) => ({
      text:
        t("bot.ohip.body") +
        " " +
        (hasNoOhip(city) ? t("bot.ohip.yes", { city: city.city }) : t("bot.ohip.no", { city: city.city })),
      actions: [
        { label: t("bot.a.healthcare"), section: "healthcare" },
        { label: t("bot.a.settlement"), section: "community" },
      ],
    }),
  },
  {
    name: "insurance",
    patterns: [/insurance/, /insure/, /liability/, /assurance/, /assurer/, /responsabilit/],
    reply: (_city, { t }) => ({
      text: t("bot.insurance", {
        n: INSURANCE_PROVIDERS.length,
        names: INSURANCE_PROVIDERS.slice(0, 4).map((p) => p.name).join(", "),
      }),
      actions: [{ label: t("bot.a.compare"), section: "housing" }],
    }),
  },
  {
    name: "healthcare",
    patterns: [/doctor/, /clinic/, /hospital/, /walk-?in/, /health\b/, /healthcare/, /medical/, /sick/, /nurse/, /m[ée]decin/, /clinique/, /h[ôo]pital/, /sant[ée]/, /infirmi/, /malade/, /sans rendez-vous/],
    reply: (city, { t }) => {
      const noOhip = city.healthcare.clinics.filter((c) => c.patient_types.some((x) => /no ohip/i.test(x))).length;
      return {
        text: t("bot.health", {
          city: city.city,
          n: city.healthcare.clinics.length,
          accepting: acceptingClinicCount(city),
          names: city.healthcare.clinics.slice(0, 3).map((c) => c.name).join(", "),
          hospital: city.healthcare.nearest_hospital,
          noOhip: noOhip > 0 ? " " + t("bot.health.noOhip", { n: noOhip }) : "",
        }),
        actions: [{ label: t("bot.a.clinics", { city: city.city }), section: "healthcare", cityId: city.id }],
      };
    },
  },
  {
    name: "safety",
    patterns: [/safe/, /crime/, /police/, /emergency/, /\b911\b/, /danger/, /secure/, /s[ée]curit/, /criminalit/, /urgence/, /\bs[ûu]r/],
    reply: (city, { t, tr }) => {
      const safest = [...CITIES].sort((a, b) => a.safety.csi_score - b.safety.csi_score)[0];
      return {
        text: t("bot.safety", {
          city: city.city,
          rating: tr(city.safety.csi_rating).toLowerCase(),
          score: city.safety.csi_score,
          trend: tr(city.safety.trend).toLowerCase(),
          count: CITIES.length,
          safest: safest.city,
          safestScore: safest.safety.csi_score,
          service: tr(city.safety.police_service),
          phone: tr(city.safety.police_non_emergency),
        }),
        actions: [{ label: t("bot.a.safety", { city: city.city }), section: "safety", cityId: city.id }],
      };
    },
  },
  {
    name: "jobs",
    patterns: [/\bjobs?\b/, /work/, /employ/, /hiring/, /career/, /unemploy/, /salary/, /resume/, /emploi/, /travail/, /embauch/, /carri[èe]re/, /ch[ôo]mage/, /salaire/],
    reply: (city, { t, tr }) => ({
      text: t("bot.jobs", {
        city: city.city,
        roles: city.employment.top_roles.map(tr).join(", "),
        rate: city.employment.unemployment_rate,
        employers: EMPLOYERS.filter((e) => e.city === city.city)
          .slice(0, 4)
          .map((e) => e.name)
          .join(", "),
      }),
      actions: [{ label: t("bot.a.jobs", { city: city.city }), section: "employment", cityId: city.id }],
    }),
  },
  {
    name: "community",
    patterns: [/settle/, /agency/, /language/, /speak/, /community/, /newcomer/, /immigra/, /translat/, /punjabi|urdu|tamil|mandarin|cantonese|arabic|hindi|gujarati|portuguese|spanish/, /[ée]tablissement/, /organisme/, /langue/, /parler/, /communaut/, /nouvel/, /traduction/, /pendjabi|ourdou|tamoul|cantonais|arabe|goudjarati|portugais|espagnol/],
    reply: (city, { t, tr }) => ({
      text: t("bot.community", {
        city: city.city,
        agencies: city.community.agencies.slice(0, 3).map((a) => a.name).join(", "),
        languages: city.community.languages.map(tr).join(", "),
      }),
      actions: [{ label: t("bot.a.community", { city: city.city }), section: "community", cityId: city.id }],
    }),
  },
  {
    name: "compare",
    patterns: [/which city/, /best city/, /compare/, /recommend/, /where should/, /cheapest/, /most affordable/, /\bmatch\b/, /choose/, /\bpick\b/, /quelle ville/, /meilleure ville/, /comparer/, /recommand/, /o[ùu] devrais/, /moins cher/, /choisir/],
    reply: (_city, { t, money }) => {
      const cheapest = [...CITIES].sort((a, b) => a.housing.avg_rent_1br - b.housing.avg_rent_1br)[0];
      const safest = [...CITIES].sort((a, b) => a.safety.csi_score - b.safety.csi_score)[0];
      return {
        text: t("bot.compare", {
          cheapest: cheapest.city,
          rent: money(cheapest.housing.avg_rent_1br),
          safest: safest.city,
        }),
        actions: [{ label: t("bot.a.match"), section: "match" }],
      };
    },
  },
  {
    name: "housing",
    patterns: [/rent/, /housing/, /apartment/, /condo/, /price/, /cost/, /afford/, /landlord/, /lease/, /bedroom/, /\bhome\b/, /loyer/, /logement/, /appartement/, /prix/, /co[ûu]t/, /abordable/, /propri[ée]taire/, /\bbail\b/, /chambre/],
    reply: (city, { t, money }) => ({
      text: t("bot.housing", {
        city: city.city,
        r1: money(city.housing.avg_rent_1br),
        r2: money(city.housing.avg_rent_2br),
        r3: money(city.housing.avg_rent_3br),
        vacancy: city.housing.vacancy_rate ? " " + t("bot.housing.vacancy", { rate: city.housing.vacancy_rate }) : "",
        sites: 18,
      }),
      actions: [{ label: t("bot.a.housing", { city: city.city }), section: "housing", cityId: city.id }],
    }),
  },
  {
    name: "checklist",
    patterns: [/checklist/, /\bsin\b/, /social insurance/, /bank/, /first (week|month|30)/, /just arrived/, /what (do|should) i do/, /where (do|should) i start/, /getting started/, /liste de/, /\bnas\b/, /assurance sociale/, /banque/, /premi[èe]re semaine/, /premier mois/, /30 jours/, /vient d.arriver/, /par o[ùu] commencer/, /d[ée]marrer/],
    reply: (_city, { t }) => ({
      text: t("bot.checklist"),
      actions: [{ label: t("bot.a.checklist"), section: "checklist" }],
    }),
  },
  {
    name: "greeting",
    patterns: [/^(hi|hello|hey|howdy|good (morning|afternoon|evening))\b/, /^(salut|bonjour|bonsoir|allo|all[ôo]|coucou)/],
    reply: (_city, { t }) => ({ text: t("bot.greet") }),
  },
  {
    name: "thanks",
    patterns: [/\bthanks?\b/, /thank you/, /\bbye\b/, /appreciate/, /merci/, /au revoir/],
    reply: (_city, { t }) => ({ text: t("bot.thanks") }),
  },
];

export function answer(question: string, currentCity: CityData, ctx: BotContext): BotReply {
  const q = question.trim().toLowerCase();
  if (!q) return { text: ctx.t("bot.empty") };
  const city = detectCity(q, currentCity);

  let best: { intent: Intent; hits: number } | null = null;
  for (const intent of INTENTS) {
    const hits = intent.patterns.filter((p) => p.test(q)).length;
    if (hits > 0 && (!best || hits > best.hits)) best = { intent, hits };
  }

  if (best) return best.intent.reply(city, ctx);
  return { text: ctx.t("bot.fallback") };
}
