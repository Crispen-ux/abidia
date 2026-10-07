export type Service = {
  slug: string;
  name: string;
  short: string;
  summary: string;
  intro: string;
  deliverables: string[];
  sectors: string[];
  image: string;
  accentStat: { value: string; label: string };
};

export const services: Service[] = [
  {
    slug: "municipal-engineering",
    name: "Municipal Engineering",
    short: "Municipal Engineering",
    summary:
      "Reliable, compliant municipal infrastructure — from bulk services and sanitation to public facilities — delivered to budget and programme.",
    intro:
      "At Abidia we provide exceptional municipal engineering solutions that are innovative, reliable and sustainable. We work alongside municipalities, district authorities and development partners to plan, design and oversee the public infrastructure that keeps communities functioning: water and sanitation networks, internal streets, stormwater, public facilities and bulk connections.",
    deliverables: [
      "Concept, preliminary and detailed design of bulk and internal services",
      "Water reticulation, storage and wastewater collection design",
      "Stormwater management, drainage and flood attenuation design",
      "Public facility upgrades — schools, clinics, circuit offices and community halls",
      "Bill of quantities, tender documentation and CIDB-ready packaging",
      "Construction supervision, quality assurance and contract administration",
      "Asset registers, condition assessments and infrastructure master plans",
    ],
    sectors: ["Municipality", "District Authority", "Government Department", "Housing Developer"],
    image: "/images/services/municipal.jpg",
    accentStat: { value: "R1.8bn", label: "Hospital upgrade under municipal delivery" },
  },
  {
    slug: "road-engineering",
    name: "Road Engineering",
    short: "Road Engineering",
    summary:
      "Safe, durable roads — geometric design, pavement rehabilitation and supervision for rural, urban and industrial networks.",
    intro:
      "We are dedicated to shaping the future of transportation through innovative road engineering solutions that prioritise safety, efficiency and sustainability. From rural access roads and residential streets to heavy-duty industrial routes, Abidia designs pavements and geometries that suit the traffic, the ground and the budget.",
    deliverables: [
      "Route selection, geo-technical liaison and pavement design",
      "Geometric design and intersection / roundabout layouts",
      "Pavement rehabilitation, overlay and resurfacing design",
      "Road marking, signage, guardrails and road safety audits",
      "Tender documentation, pricing bills and procurement support",
      "Site supervision, measurement and interim payment certificates",
      "Bulk earthworks, retaining structures and roadside drainage",
    ],
    sectors: ["Municipality", "Provincial Roads", "Mining & Industry", "Private Developer"],
    image: "/images/services/road.jpg",
    accentStat: { value: "NAD 48m", label: "Road construction delivered in Botswana" },
  },
  {
    slug: "structural-engineering",
    name: "Structural Engineering",
    short: "Structural Engineering",
    summary:
      "Innovative, reliable and sustainable structural design for buildings, hostels, hospitals, flats and commercial developments.",
    intro:
      "At Abidia we are dedicated to providing exceptional structural engineering solutions that are innovative, reliable and sustainable. Our engineers design safe, cost-effective structures — reinforced concrete, post-tensioned slabs, steel and masonry — for residential, institutional, commercial and industrial buildings.",
    deliverables: [
      "Structural analysis and design of new buildings and extensions",
      "Foundation design — pad, strip, raft and piled solutions",
      "Reinforcement detailing and structural drawings for construction",
      "Condition assessments, structural audits and failure investigation",
      "Strengthening, alteration and retrofit design",
      "Bill of quantities and structural specification",
      "Site inspections, compressive cube testing and compliance certification",
    ],
    sectors: ["Property Developer", "Government", "Mining", "Commercial"],
    image: "/images/services/structural.jpg",
    accentStat: { value: "3 storeys", label: "Typical hostel & flats portfolio" },
  },
  {
    slug: "water-wastewater-engineering",
    name: "Water & Wastewater Engineering",
    short: "Water & Wastewater",
    summary:
      "Treatment, reticulation and bulk water systems engineered for resilience, water quality and regulatory compliance.",
    intro:
      "Abidia designs water and wastewater infrastructure that performs for decades. From bulk supply pipelines and reservoirs to sewer reticulation, pump stations and treatment works, we engineer systems that meet DWLASA and local authority requirements while keeping whole-of-life cost low.",
    deliverables: [
      "Bulk water pipelines, reservoirs and pressure zone design",
      "Sewer reticulation, pump stations and rising mains",
      "Wastewater treatment plant assessment and upgrade design",
      "Water quality management and licence applications",
      "Hydraulic modelling, flow calculations and network analysis",
      "Phased implementation planning and construction supervision",
      "Water balance studies and non-revenue water strategies",
    ],
    sectors: ["Municipality", "Mining", "Agriculture", "Government Department"],
    image: "/images/services/water.jpg",
    accentStat: { value: "BWP 15.9m", label: "Village water supply scheme" },
  },
  {
    slug: "environmental-management",
    name: "Environmental Management",
    short: "Environmental Management",
    summary:
      "NEMA-compliant assessments, permits and management plans that keep developments moving and ecosystems protected.",
    intro:
      "We are committed to protecting and preserving the environment through comprehensive and innovative environmental management solutions. Abidia guides clients through NEMA, EMPr and water use licence processes — turning regulatory requirements into a clear, approvals-driven programme.",
    deliverables: [
      "Basic Assessment, Scoping and Environmental Impact Assessment reports",
      "Environmental Management Plans (EMP) and EMP implementation reports",
      "Water use licence applications and authorisations",
      "Specialist studies — air quality, biodiversity, heritage and traffic",
      "Solid waste, effluent and social impact management plans",
      "Public participation facilitation and regulatory liaison",
      "Environmental compliance audits and site inspections",
    ],
    sectors: ["Developer", "Municipality", "Mining", "Agriculture"],
    image: "/images/services/environmental.jpg",
    accentStat: { value: "NEMA", label: "Full assessment & authorisation support" },
  },
  {
    slug: "traffic-management",
    name: "Traffic Management",
    short: "Traffic Management",
    summary:
      "Traffic impact assessments, counts and management plans that unlock approvals for developments of every scale.",
    intro:
      "We specialise in providing comprehensive traffic management solutions to ensure safe, efficient and organised transportation systems. With a focus on innovation, reliability and customer satisfaction, we offer a range of services to address the unique traffic challenges faced by communities, businesses and event organisers.",
    deliverables: [
      "Traffic Impact Assessments (TIA) for planning approval",
      "Manual and automated traffic counts and origin–destination surveys",
      "Traffic engineering assessments for fuel sites, retail and estates",
      "Signal design, intersection layout and parking studies",
      "Construction traffic management plans",
      "Road safety audits and hazardous location assessments",
      "Traffic accommodation and diversions for live sites",
    ],
    sectors: ["Retail & Fuel", "Property Developer", "Municipality", "Event Organiser"],
    image: "/images/services/traffic.jpg",
    accentStat: { value: "40+", label: "Traffic assessments completed" },
  },
  {
    slug: "town-regional-planning",
    name: "Town & Regional Planning",
    short: "Town Planning",
    summary:
      "Spatial plans, land use schemes and development applications that turn land into consented, bankable projects.",
    intro:
      "We are dedicated to shaping vibrant, resilient and sustainable communities through thoughtful and innovative town and regional planning solutions. Our planners translate policy, zoning and spatial frameworks into approvals — so developers can build with certainty.",
    deliverables: [
      "Spatial development frameworks and structure plans",
      "Land use scheme applications, rezoning and consent uses",
      "Subdivision and layout plan applications",
      "Development frameworks for villages, estates and housing projects",
      "Environmental authorisation support for planning approval",
      "SCM / SPLUMA compliance and public participation processes",
      "Town planning reports for bond and investment committees",
    ],
    sectors: ["Property Developer", "Municipality", "Housing Association", "Agriculture"],
    image: "/images/services/planning.jpg",
    accentStat: { value: "2 989", label: "Residential units planned & developed" },
  },
  {
    slug: "construction-management",
    name: "Construction Management",
    short: "Construction Management",
    summary:
      "Employer's agent, site supervision and contract administration that protect quality, cost and programme on site.",
    intro:
      "Abidia manages construction on behalf of owners so that design intent survives contact with the site. We act as employer's agent and superintendent, controlling quality, measurements, payments, programme and variations — and we close out projects with proper snagging and certification.",
    deliverables: [
      "Tender evaluation and contractor appointment support",
      "Construction supervision and quality assurance plans",
      "Measurement, interim certificates and payment administration",
      "Variation orders, claims assessment and programme monitoring",
      "Health, safety and environmental compliance monitoring",
      "Snag lists, practical completion and defects liability management",
      "Financial reporting and final account reconciliation",
    ],
    sectors: ["Government", "Property Developer", "Mining", "Institutional"],
    image: "/images/services/construction.jpg",
    accentStat: { value: "100%", label: "Projects supervised to completion" },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceCategories = [
  "All",
  "Infrastructure",
  "Buildings",
  "Environment",
  "Transport",
] as const;
