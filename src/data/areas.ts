export type Area = {
  slug: string;
  name: string;
  province: string;
  title: string;
  summary: string;
  intro: string;
  highlights: string[];
  towns: string[];
  services: string[];
  officeLabel?: string;
  projectRegions: string[];
  projectKeywords: string[];
  image: string;
};

export const areas: Area[] = [
  {
    slug: "nelspruit",
    name: "Nelspruit",
    province: "Mpumalanga",
    title: "Civil & Structural Engineers in Nelspruit (Mbombela)",
    summary:
      "Abidia Engineering is based in Nelspruit, Mpumalanga — municipal, road, water, structural and planning services for the Lowveld and surrounding municipalities.",
    intro:
      "Our head office sits in West Acres, Nelspruit, minutes from the Mbombela CBD. From here we deliver municipal, road, water, structural and construction management work across the Lowveld — for the City of Mbombela, surrounding municipalities, mining and agri-business clients, developers and government departments. Being on site in under an hour matters when a programme is moving, so our engineers are close to the work they design.",
    highlights: [
      "Head office in West Acres, Nelspruit — on site across the Lowveld",
      "Full multidisciplinary team: civil, structural, traffic, environment and planning",
      "ECSA-registered, SAICE member practice with a B-BBEE Level 1 rating",
    ],
    towns: [
      "Mbombela",
      "Nelspruit",
      "White River",
      "Hazyview",
      "Sabie",
      "KaNyamazane",
      "Emalahleni",
      "Mbombela CBD",
    ],
    services: [
      "municipal-engineering",
      "road-engineering",
      "structural-engineering",
      "water-wastewater-engineering",
      "construction-management",
      "traffic-management",
    ],
    officeLabel: "Head Office",
    projectRegions: ["Mpumalanga"],
    projectKeywords: [
      "Witbank",
      "Emalahleni",
      "Mbombela",
      "Nelspruit",
      "Marapyane",
      "Sonheuwel",
      "White River",
      "Hazyview",
      "KaNyamazane",
    ],
    image: "/images/services/municipal.jpg",
  },
  {
    slug: "mpumalanga",
    name: "Mpumalanga",
    province: "Mpumalanga",
    title: "Engineering Services Across Mpumalanga",
    summary:
      "Province-wide civil and structural engineering in Mpumalanga — schools, clinics, sanitation, roads, housing and traffic assessments for municipalities and developers.",
    intro:
      "Mpumalanga is our home province and the largest share of our portfolio: school and clinic upgrades, circuit offices, bulk water and sanitation schemes, internal street networks, residential layouts and traffic impact assessments. We work directly for municipalities and district authorities alongside our long-standing development partners, and we understand how provincial and municipal approval processes actually run.",
    highlights: [
      "Schools, clinics, circuit offices and public facilities delivered for developers",
      "Bulk water, sewer and stormwater networks designed and supervised",
      "Traffic impact assessments for developments across the province",
    ],
    towns: [
      "Mbombela",
      "Emalahleni",
      "Middelburg",
      "Ermelo",
      "Lydenburg",
      "Secunda",
      "Standerton",
      "White River",
      "Komatipoort",
      "Barberton",
    ],
    services: [
      "municipal-engineering",
      "water-wastewater-engineering",
      "road-engineering",
      "traffic-management",
      "town-regional-planning",
      "construction-management",
    ],
    officeLabel: "Head Office",
    projectRegions: ["Mpumalanga"],
    projectKeywords: [
      "Witbank",
      "Emalahleni",
      "Middelburg",
      "Ermelo",
      "Lydenburg",
      "Kinross",
      "Marapyane",
      "Doornkorp",
      "Nkomazi",
      "Thaba Chweu",
      "Hectaspruit",
      "Msholozi",
      "Sonheuwel",
      "Rondebousch",
      "Thlabane",
    ],
    image: "/images/services/road.jpg",
  },
  {
    slug: "newcastle",
    name: "Newcastle & KwaZulu-Natal",
    province: "KwaZulu-Natal",
    title: "Engineering Services in Newcastle & KwaZulu-Natal",
    summary:
      "Civil and structural engineering from Abidia's Newcastle office — municipal infrastructure, roads, water and building structures across KwaZulu-Natal.",
    intro:
      "Our KwaZulu-Natal office on Van Schalkwyk Street in Newcastle supports clients across the province — from Amajuba and uMhlathuze municipalities to private developers and industrial operators. The office gives our engineers a local base for site inspections, contract administration and stakeholder meetings, while drawing on the same multidisciplinary team that delivers our Mpumalanga work.",
    highlights: [
      "Newcastle office with local site presence",
      "Municipal infrastructure, roads and building structure expertise",
      "Contract administration and construction supervision on the ground",
    ],
    towns: [
      "Newcastle",
      "Ladysmith",
      "Dundee",
      "Utrecht",
      "Majuba",
      "eMadadeni",
      "Osizweni",
      "Rundle Road",
    ],
    services: [
      "municipal-engineering",
      "structural-engineering",
      "road-engineering",
      "water-wastewater-engineering",
      "construction-management",
    ],
    officeLabel: "KwaZulu-Natal",
    projectRegions: ["KwaZulu-Natal"],
    projectKeywords: ["Newcastle", "KwaZulu-Natal", "Amajuba", "uMhlathuze"],
    image: "/images/services/structural.jpg",
  },
  {
    slug: "limpopo",
    name: "Limpopo",
    province: "Limpopo",
    title: "Engineering Services in Limpopo",
    summary:
      "Traffic, municipal and water engineering in Limpopo — Abidia's Limpopo office supports assessments, studies and infrastructure delivery province-wide.",
    intro:
      "Our Limpopo office gives clients a direct line to the team for traffic impact assessments, engineering service reports and infrastructure projects across the province. We have delivered traffic studies for developments as far afield as Giyani, and we support municipalities and development partners with water, sanitation and public facility work.",
    highlights: [
      "Local office supporting Limpopo-based clients",
      "Traffic impact assessments and engineering service reports",
      "Water, sanitation and public facility design",
    ],
    towns: ["Polokwane", "Giyani", "Tzaneen", "Thohoyandou", "Musina", "Mokopane"],
    services: [
      "traffic-management",
      "municipal-engineering",
      "water-wastewater-engineering",
      "town-regional-planning",
      "environmental-management",
    ],
    officeLabel: "Limpopo",
    projectRegions: ["Limpopo"],
    projectKeywords: ["Giyani", "Limpopo", "Polokwane", "Tzaneen"],
    image: "/images/services/traffic.jpg",
  },
  {
    slug: "botswana",
    name: "Botswana",
    province: "Botswana",
    title: "Civil & Structural Engineering in Botswana",
    summary:
      "Abidia delivers structural, water supply and construction management projects across Botswana — from Gaborone housing to village water schemes.",
    intro:
      "We have delivered structural design, water supply and project supervision work across Botswana, including residential blocks, commercial buildings, retail projects and village water schemes for government ministries and institutional clients. Projects are priced in Pula and delivered alongside local partners, with our engineers travelling from the Lowveld to site as the programme requires.",
    highlights: [
      "Structural design for housing, hostels, retail and commercial buildings",
      "Bulk water supply schemes for villages and institutions",
      "Construction management and supervision across the border",
    ],
    towns: ["Gaborone", "Francistown", "Tlokweng", "Serowe", "Mahalapye", "Selibe Phikwe"],
    services: [
      "structural-engineering",
      "water-wastewater-engineering",
      "construction-management",
      "road-engineering",
      "environmental-management",
    ],
    projectRegions: ["Botswana"],
    projectKeywords: ["Botswana", "Tlokweng", "Gaborone", "Choppies", "BHC"],
    image: "/images/services/construction.jpg",
  },
];

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}
