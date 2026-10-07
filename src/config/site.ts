export const site = {
  name: "Abidia",
  legalName: "Abidia Engineering",
  tagline: "Civil & Structural Engineers ɛ Project Managers",
  shortDescription:
    "Abidia is a South African civil and structural engineering consultancy delivering municipal, road, water, structural, environmental, traffic and town planning projects since 2010.",
  description:
    "Abidia Engineering is a multidisciplinary civil and structural engineering consultancy established in 2010. We deliver municipal, road, water, structural, environmental, traffic and town planning services across South Africa and Botswana.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abidia.co.za",
  email: "info@abidia.co.za",
  phone: "083 470 2027",
  phoneHref: "+27834702027",
  whatsapp: "27834702027",
  hours: "Monday–Friday, 08:00–17:00",
  founded: 2010,
  founder: "Abraham Mukokanduku",
  registration: "Established 2010",
  currencies: ["ZAR", "BWP", "NAD"],
  offices: [
    {
      label: "Head Office",
      street: "10 Cedarwood Circle",
      suburb: "West Acres",
      city: "Nelspruit",
      province: "Mpumalanga",
      country: "South Africa",
      maps: "https://www.google.com/maps/search/?api=1&query=10+Cedarwood+Circle+West+Acres+Nelspruit",
      area: "nelspruit",
    },
    {
      label: "KwaZulu-Natal",
      street: "15 Van Schalkwyk Street",
      suburb: "",
      city: "Newcastle",
      province: "KwaZulu-Natal",
      country: "South Africa",
      maps: "https://www.google.com/maps/search/?api=1&query=15+Van+Schalkwyk+Street+Newcastle",
      area: "newcastle",
    },
    {
      label: "Limpopo",
      street: "Dr Anneckestraat 28A",
      suburb: "",
      city: "Limpopo",
      province: "Limpopo",
      country: "South Africa",
      maps: "https://www.google.com/maps/search/?api=1&query=Dr+Anneckestraat+28A+Limpopo",
      area: "limpopo",
    },
  ],
  socials: {
    instagram: "https://www.instagram.com/abidia",
    facebook: "https://www.facebook.com/abidia",
  },
  credentials: [
    { label: "Engineering Council of South Africa", short: "ECSA", logo: "/images/logos/ecsa.png" },
    { label: "South African Institution of Civil Engineering", short: "SAICE", logo: "/images/logos/saicelogo.png" },
    { label: "B-BBEE Rated", short: "B-BBEE", logo: "/images/logos/B-BBEE-1-Rating-e1643879679367.png" },
    { label: "Zim Engineering Association", short: "ZIM", logo: "/images/logos/zim1.png" },
  ],
  stats: [
    { value: "2010", label: "Established", detail: "Providing engineering excellence for over 15 years" },
    { value: "8", label: "Disciplines", detail: "A single multidisciplinary team for your whole project" },
    { value: "R1.8bn", label: "Largest Project Value", detail: "Witbank Hospital upgrade, delivered for Zwelihle Holdings" },
    { value: "3", label: "Provincial Offices", detail: "Mpumalanga, KwaZulu-Natal and Limpopo" },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/tools", label: "Client Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = [
  {
    title: "Services",
    links: [
      { href: "/services/municipal-engineering", label: "Municipal Engineering" },
      { href: "/services/road-engineering", label: "Road Engineering" },
      { href: "/services/structural-engineering", label: "Structural Engineering" },
      { href: "/services/water-wastewater-engineering", label: "Water & Wastewater" },
      { href: "/services/environmental-management", label: "Environmental Management" },
      { href: "/services/traffic-management", label: "Traffic Management" },
      { href: "/services/town-regional-planning", label: "Town & Regional Planning" },
      { href: "/services/construction-management", label: "Construction Management" },
    ],
  },
  {
    title: "Clients",
    links: [
      { href: "/tools/estimate", label: "Cost Estimator" },
      { href: "/tools/calculator", label: "Quantity Calculator" },
      { href: "/tools/brief", label: "Project Brief Builder" },
      { href: "/projects", label: "Project Portfolio" },
      { href: "/contact", label: "Request a Quote" },
    ],
  },
  {
    title: "Where we work",
    links: [
      { href: "/areas", label: "Areas we serve" },
      { href: "/areas/nelspruit", label: "Nelspruit & Lowveld" },
      { href: "/areas/mpumalanga", label: "Mpumalanga" },
      { href: "/areas/newcastle", label: "Newcastle & KZN" },
      { href: "/areas/limpopo", label: "Limpopo" },
      { href: "/areas/botswana", label: "Botswana" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Abidia" },
      { href: "/about#vision", label: "Our Vision" },
      { href: "/about#partners", label: "Partners" },
      { href: "/contact", label: "Offices" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/popia", label: "POPIA Notice" },
      { href: "/terms", label: "Terms of Use" },
    ],
  },
] as const;
