export type Project = {
  slug: string;
  name: string;
  client: string;
  value: string;
  valueNumeric?: number;
  currency: "ZAR" | "BWP" | "NAD" | "UNDISCLOSED";
  category: string;
  discipline: string;
  region?: string;
  image: string;
  featured?: boolean;
  summary: string;
};

type Row = [
  name: string,
  client: string,
  value: string,
  category: string,
  discipline: string,
  region?: string,
  featured?: boolean,
];

const rows: Row[] = [
  ["Upgrade of Maogogeni Primary School", "Zwelihle Holdings", "R 12 000 000", "Education", "municipal-engineering", undefined, true],
  ["Upgrade of Mabombe Primary School", "Zwelihle Holdings", "R 6 500 000", "Education", "municipal-engineering"],
  ["Upgrade of Ekhuphileni Primary School", "Zwelihle Holdings", "R 8 250 000", "Education", "municipal-engineering"],
  ["Upgrade of Tholukwazi Primary School", "Zwelihle Holdings", "R 12 500 000", "Education", "municipal-engineering"],
  ["Upgrade of Timeleni Primary School", "Zwelihle Holdings", "Confidential", "Education", "municipal-engineering"],
  ["Upgrade of Andries Primary School", "Zwelihle Holdings", "Confidential", "Education", "municipal-engineering"],
  ["Upgrade of Dikgabo Primary School", "Zwelihle Holdings", "Confidential", "Education", "municipal-engineering"],
  ["New Witbank Mini Laundry", "Zwelihle Holdings", "R 56 000 000", "Institutional", "construction-management", "Mpumalanga"],
  ["Witbank Hospital Upgrade", "Zwelihle Holdings", "R 1.8 Billion", "Healthcare", "construction-management", "Mpumalanga", true],
  ["New Marapyane Circuit Office", "Zwelihle Holdings", "Confidential", "Institutional", "construction-management", "Mpumalanga"],
  ["New Middelburg Primary School", "Denzhe Engineers Pty Ltd", "Confidential", "Education", "municipal-engineering", "Mpumalanga"],
  ["New Doornkorp Primary School", "Denzhe Engineers Pty Ltd", "Confidential", "Education", "municipal-engineering", "Mpumalanga"],
  ["Upgrade of Malontone Primary School", "Denzhe Engineers Pty Ltd", "Confidential", "Education", "municipal-engineering"],
  ["New Ermelo Primary School", "Denzhe Engineers Pty Ltd", "Confidential", "Education", "municipal-engineering", "Mpumalanga"],
  ["Refurbishment of Sazama Secondary School", "Denzhe Engineers Pty Ltd", "TBC", "Education", "construction-management"],
  ["Sanitation Project at Motlamogale Primary", "Matsinye Holdings Pty Ltd", "Confidential", "Water & Sanitation", "water-wastewater-engineering"],
  ["Sanitation Project at Zakheleni", "Matsinye Holdings Pty Ltd", "Confidential", "Water & Sanitation", "water-wastewater-engineering"],
  ["Sanitation Project at Sehlare", "Matsinye Holdings Pty Ltd", "Confidential", "Water & Sanitation", "water-wastewater-engineering"],
  ["Sanitation Project at Narishe", "Matsinye Holdings Pty Ltd", "Confidential", "Water & Sanitation", "water-wastewater-engineering"],
  ["Sanitation Project at LL Mogane", "Matsinye Holdings Pty Ltd", "Confidential", "Water & Sanitation", "water-wastewater-engineering"],
  ["Sanitation Project at Pugishe", "Amulet Group", "Confidential", "Water & Sanitation", "water-wastewater-engineering"],
  ["New CRUs at Sonheuwel", "Amulet Group", "R 52 000 000", "Housing", "town-regional-planning", "Mpumalanga", true],
  ["Rondebousch Bulk Sewer", "Amulet Group", "TBC", "Water & Sanitation", "water-wastewater-engineering", "Mpumalanga"],
  ["Bulk Water at Lehumo & Burlington Villages", "Amulet Group", "TBC", "Water & Sanitation", "water-wastewater-engineering"],
  ["1 500 Residential Units — Lydenburg", "Future Developments Pty Ltd", "TBC", "Housing", "town-regional-planning", "Mpumalanga", true],
  ["1 489 Residential Units — Kinross", "Future Developments Pty Ltd", "TBC", "Housing", "town-regional-planning", "Mpumalanga"],
  ["SunCity Traffic Impact Assessment", "CC Group Pty Ltd", "Confidential", "Roads & Traffic", "traffic-management"],
  ["Construction of a Residential House", "Mfundo Mkhize", "Confidential", "Housing", "construction-management"],
  ["Water Management at Transnet, South Africa", "Divhani Enviro Solutions", "Confidential", "Water & Sanitation", "environmental-management", "South Africa"],
  ["Private Property Design and Supervision", "Avax SA", "Confidential", "Commercial", "structural-engineering"],
  ["Design and Supervision of N11 CRUs", "Branco Development Planners", "R 28 000 000", "Roads & Traffic", "road-engineering"],
  ["Sonheuwel Development Traffic Count", "Branco Development Planners", "Confidential", "Roads & Traffic", "traffic-management", "Mpumalanga"],
  ["Msholozi Development Engineering Services Report", "Branco Development Planners", "TBC", "Infrastructure", "municipal-engineering", "Mpumalanga"],
  ["Thlabane Development Traffic Count", "Branco Development Planners", "Confidential", "Roads & Traffic", "traffic-management", "North West"],
  ["Traffic Assessment for Hectaspruit Filling Station", "Branco Development Planners", "TBC", "Roads & Traffic", "traffic-management", "Mpumalanga"],
  ["Traffic Assessment in Giyani", "Zonke Engineering Pty Ltd", "Confidential", "Roads & Traffic", "traffic-management", "Limpopo"],
  ["Traffic Assessment Road P8/2, Thaba Chweu", "Zonke Engineering Pty Ltd", "Confidential", "Roads & Traffic", "traffic-management", "Mpumalanga"],
  ["Traffic Impact Assessment on Road 0432, Nkomazi", "Zonke Engineering Pty Ltd", "TBC", "Roads & Traffic", "traffic-management", "Mpumalanga"],
  ["BLC Upgrade", "BCL Mining & Smelting Pty Ltd", "Confidential", "Industrial", "structural-engineering"],
  ["Choppies Supermarket Design", "Multi-Tech Consult", "BWP 1.2 Million", "Commercial", "structural-engineering", "Botswana"],
  ["Caitec Office Block", "Multi-Tech Consult", "BWP 4.0 Million", "Commercial", "structural-engineering", "Botswana"],
  ["125 Family Flats", "Multi-Tech Consult", "BWP 4.0 Million", "Housing", "structural-engineering", "Botswana"],
  ["GIPS Three Storey Hostels", "Multi-Tech Consult", "BWP 6.0 Million", "Institutional", "structural-engineering", "Botswana", true],
  ["Project Supervision of 100 Botswana Housing Units", "BHC Botswana", "BWP 6.0 Million", "Housing", "construction-management", "Botswana"],
  ["General Hospital Construction", "Pagomo General Hospital", "Confidential", "Healthcare", "construction-management"],
  ["Road Construction", "Ministry of Works & Transport", "NAD 48 Million", "Roads & Traffic", "road-engineering", "Southern Africa", true],
  ["Upgrading Water Supply — Phase 1", "Botswana College of Agriculture", "BWP 9.0 Million", "Water & Sanitation", "water-wastewater-engineering", "Botswana"],
  ["Tlokweng Major Village Water Supply", "Ministry of Energy & Water Resources", "BWP 4.7 Million", "Water & Sanitation", "water-wastewater-engineering", "Botswana"],
  ["Khonkwhwa & Keng Water Supply", "Ministry of Energy & Water Resources", "BWP 15.9 Million", "Water & Sanitation", "water-wastewater-engineering", "Botswana", true],
];

const categoryImages: Record<string, string> = {
  Education: "/images/projects/site-0044.jpg",
  "Water & Sanitation": "/images/projects/site-0047.jpg",
  Housing: "/images/projects/site-0038.jpg",
  Healthcare: "/images/projects/site-0046.jpg",
  Commercial: "/images/projects/site-0064.jpg",
  "Roads & Traffic": "/images/projects/site-0042.jpg",
  Institutional: "/images/projects/site-0056.jpg",
  Industrial: "/images/projects/site-0040.jpg",
  Infrastructure: "/images/projects/site-0058.jpg",
};

const summaries: Record<string, string> = {
  Education:
    "Design and construction supervision of a new primary school facility, delivered as part of Abidia's schools upgrade programme.",
  "Water & Sanitation":
    "Water and sanitation infrastructure engineered for reliable service delivery and full regulatory compliance.",
  Housing: "Large-scale residential development supported by planning, bulk services and structural design.",
  Healthcare: "Clinical infrastructure upgrade delivered under strict programme, infection-control and quality requirements.",
  Commercial: "Structural design and site supervision for a commercial development, from foundations to handover.",
  "Roads & Traffic": "Transport engineering scope covering assessment, design and approval for safe, efficient movement.",
  Institutional: "Public institutional facility designed and supervised to specification, budget and programme.",
  Industrial: "Heavy industrial structural works engineered for demanding operational loads and conditions.",
  Infrastructure: "Bulk infrastructure engineering services supporting development approval and construction.",
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function parseValue(value: string): { currency: Project["currency"]; valueNumeric?: number } {
  if (value === "Confidential" || value === "TBC") return { currency: "UNDISCLOSED" };
  if (value.startsWith("BWP")) {
    return { currency: "BWP", valueNumeric: parseFloat(value.replace(/[^\d.]/g, "")) * 1_000_000 };
  }
  if (value.startsWith("NAD")) {
    return { currency: "NAD", valueNumeric: parseFloat(value.replace(/[^\d.]/g, "")) * 1_000_000 };
  }
  if (value.includes("Billion")) {
    return { currency: "ZAR", valueNumeric: parseFloat(value.replace(/[^\d.]/g, "")) * 1_000_000_000 };
  }
  const num = parseFloat(value.replace(/[^\d.]/g, ""));
  return { currency: "ZAR", valueNumeric: Number.isNaN(num) ? undefined : num };
}

export const projects: Project[] = rows.map(([name, client, value, category, discipline, region, featured]) => {
  const parsed = parseValue(value);
  return {
    slug: slugify(name),
    name,
    client,
    value,
    valueNumeric: parsed.valueNumeric,
    currency: parsed.currency,
    category,
    discipline,
    region,
    image: categoryImages[category] ?? "/images/projects/site-0046.jpg",
    featured: featured ?? false,
    summary: summaries[category] ?? summaries.Infrastructure,
  };
});

export const projectCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);

export const portfolioValue = projects.reduce((sum, p) => sum + (p.valueNumeric ?? 0), 0);

export const clients = Array.from(new Set(projects.map((p) => p.client))).sort();
