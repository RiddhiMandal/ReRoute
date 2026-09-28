export interface InsuranceProvider {
  name: string;
  description: string;
  tags: string[];
  url: string;
}

export const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  {
    name: "Square One",
    description: "Tenant insurance, personal belongings, liability, customizable coverage, online quote.",
    tags: ["Personal belongings", "Liability", "Customizable coverage", "Online quote"],
    url: "https://www.squareone.ca/tenant",
  },
  {
    name: "Sonnet",
    description: "Tenant insurance, contents coverage, liability protection, online quote.",
    tags: ["Contents coverage", "Liability", "Online quote"],
    url: "https://www.sonnet.ca/tenant-insurance",
  },
  {
    name: "TD Insurance",
    description: "Tenant insurance, belongings, liability and additional living expenses.",
    tags: ["Belongings", "Liability", "Additional living expenses"],
    url: "https://www.tdinsurance.com/products-services/tenant-insurance",
  },
  {
    name: "Intact Insurance",
    description: "Tenant insurance, personal property, liability and additional coverage.",
    tags: ["Personal property", "Liability", "Additional coverage"],
    url: "https://www.intact.ca/en/personal-insurance/home/tenant-insurance",
  },
  {
    name: "Aviva Canada",
    description: "Tenant insurance, belongings protection, liability and optional coverage.",
    tags: ["Belongings protection", "Liability", "Optional coverage"],
    url: "https://www.aviva.ca/en/find-insurance/home/tenant-insurance/",
  },
  {
    name: "Co-operators",
    description: "Tenant insurance, personal property, liability and additional living expenses.",
    tags: ["Personal property", "Liability", "Additional living expenses"],
    url: "https://www.cooperators.ca/en/tenant-insurance",
  },
  {
    name: "belairdirect",
    description: "Tenant insurance, personal property, liability and living-expense coverage.",
    tags: ["Personal property", "Liability", "Living-expense coverage"],
    url: "https://www.belairdirect.com/en/home-insurance/tenants.html",
  },
  {
    name: "Desjardins Insurance",
    description: "Renter insurance covering belongings, liability and relocation expenses.",
    tags: ["Belongings", "Liability", "Relocation expenses"],
    url: "https://www.desjardins.com/en/insurance/home/tenants.html",
  },
  {
    name: "RBC Insurance",
    description: "Tenant insurance, personal belongings, living expenses and liability coverage.",
    tags: ["Personal belongings", "Living expenses", "Liability"],
    url: "https://www.rbcinsurance.com/en-ca/home-insurance/tenant-insurance/",
  },
  {
    name: "CAA Insurance",
    description: "Tenant insurance, personal belongings and liability protection.",
    tags: ["Personal belongings", "Liability protection"],
    url: "https://www.caasco.com/insurance/home/tenant",
  },
];
