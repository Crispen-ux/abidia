export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatReply = {
  content: string;
  suggestions?: string[];
};

type Entry = {
  id: string;
  keywords: string[];
  reply: string;
  suggestions?: string[];
};

const CONTACT = "Call or WhatsApp 083 470 2027, or email info@abidia.co.za — we reply within one business day.";

const KB: Entry[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "good day", "sawubona", "dumela", "howzit", "morning", "afternoon"],
    reply:
      "Hello — I'm the Abidia assistant. I can tell you about our engineering services, point you to our cost tools, or get you to the right office. What are you working on?",
    suggestions: ["What services do you offer?", "What will my project cost?", "How do I contact you?"],
  },
  {
    id: "services",
    keywords: ["service", "services", "what do you do", "offer", "discipline", "capabilit", "scope"],
    reply:
      "Abidia is a multidisciplinary consultancy with 8 services: Municipal Engineering, Road Engineering, Structural Engineering, Water & Wastewater, Environmental Management, Traffic Management, Town & Regional Planning, and Construction Management.",
    suggestions: ["Tell me about road engineering", "What will my project cost?", "See all services"],
  },
  {
    id: "municipal",
    keywords: ["municipal", "bulk services", "sanitation", "stormwater", "reticulation"],
    reply:
      "Municipal Engineering: bulk and internal services, water and sanitation networks, stormwater, public facilities (schools, clinics, circuit offices), tender documentation and construction supervision. We work with municipalities and district authorities.",
    suggestions: ["Road engineering", "What will my project cost?", "See municipal engineering"],
  },
  {
    id: "road",
    keywords: ["road", "roads", "pavement", "highway", "street", "resurfacing", "geometric"],
    reply:
      "Road Engineering: route and pavement design, geometric design, rehabilitation and overlay, road marking and signage, tender documentation, site supervision and interim payment certificates.",
    suggestions: ["What will my project cost?", "Traffic management", "See road engineering"],
  },
  {
    id: "structural",
    keywords: ["structural", "structure", "building", "foundation", "reinforced concrete", "steel frame", "retrofit"],
    reply:
      "Structural Engineering: analysis and design of new buildings and extensions, foundation design, reinforcement detailing, condition assessments, strengthening and retrofit, and BoQs for residential, institutional, commercial and industrial work.",
    suggestions: ["What will my project cost?", "Construction management", "See structural engineering"],
  },
  {
    id: "water",
    keywords: ["water", "wastewater", "sewer", "sewage", "reservoir", "pump station", "treatment plant", "reticulation"],
    reply:
      "Water & Wastewater Engineering: treatment works, reservoirs, pump stations, water and sewer networks, and design from concept through construction supervision.",
    suggestions: ["Municipal engineering", "What will my project cost?", "See water services"],
  },
  {
    id: "traffic",
    keywords: ["traffic", "impact assessment", "tia", "traffic count", "road safety", "intersection"],
    reply:
      "Traffic Management: traffic impact assessments, traffic counts, intersection and circulation design, road safety audits and traffic engineering input to developments.",
    suggestions: ["Town planning", "What will my project cost?", "See traffic management"],
  },
  {
    id: "planning",
    keywords: ["planning", "town planning", "regional planning", "spatial", "land use", "rezoning", "subdivision", "layout"],
    reply:
      "Town & Regional Planning: spatial frameworks, land use applications, subdivision and rezoning, layout plans and development planning support.",
    suggestions: ["Environmental management", "What will my project cost?", "See planning services"],
  },
  {
    id: "environmental",
    keywords: ["environmental", "nema", "eia", "assessment", "authorisation", "waste management", "empr"],
    reply:
      "Environmental Management: NEMA assessments and authorisations, environmental management plans, waste and water related studies, and compliance reporting.",
    suggestions: ["Town planning", "What will my project cost?", "See environmental services"],
  },
  {
    id: "construction-management",
    keywords: ["construction management", "site supervision", "employer's agent", "contract administration", "superintendent", "quality assurance"],
    reply:
      "Construction Management: contract administration, site supervision, quality assurance, measurement and payment certification, and employer's agent services.",
    suggestions: ["What will my project cost?", "See construction management", "Build a project brief"],
  },
  {
    id: "estimate",
    keywords: ["cost", "price", "pricing", "how much", "budget", "estimate", "quotation", "quote", "fee", "fees", "expensive", "rate"],
    reply:
      "Use our free cost estimator — pick a discipline, size and region and you'll get an indicative budget range and professional fee guidance in seconds. A formal quote follows a site visit.",
    suggestions: ["Open the cost estimator", "How do I get a formal quote?", "Quantity calculator"],
  },
  {
    id: "calculator",
    keywords: ["quantity", "quantities", "concrete", "cement", "excavation", "asphalt", "calculator", "how many bags", "m3", "cubic"],
    reply:
      "Our quantity calculator works out concrete volumes and cement/aggregate requirements, asphalt tonnage for road surfaces, and bulk excavation volumes with truck loads.",
    suggestions: ["Open the quantity calculator", "Cost estimator", "Build a project brief"],
  },
  {
    id: "brief",
    keywords: ["brief", "start", "get started", "next step", "how do i", "process", "engage", "hire", "appoint"],
    reply:
      "Easiest starting point: build a project brief in four steps — service, site, scale and your contact details. It generates a summary you can send to our engineers on WhatsApp or email.",
    suggestions: ["Build a project brief", "What will my project cost?", "How do I contact you?"],
  },
  {
    id: "contact",
    keywords: ["contact", "phone", "call", "email", "whatsapp", "number", "reach you", "talk to", "speak to"],
    reply: `We'd like to hear from you. ${CONTACT}`,
    suggestions: ["Where are your offices?", "What are your opening hours?", "Build a project brief"],
  },
  {
    id: "hours",
    keywords: ["hours", "open", "closing", "time", "when are you", "sunday", "saturday", "weekend"],
    reply: "We're open Monday to Friday, 08:00–17:00. WhatsApp messages are picked up during office hours.",
    suggestions: ["Where are your offices?", "How do I contact you?", "What services do you offer?"],
  },
  {
    id: "offices",
    keywords: ["office", "offices", "where are you", "location", "address", "branch", "based in", "visit"],
    reply:
      "Three offices: Head Office — 10 Cedarwood Circle, West Acres, Nelspruit (Mpumalanga); 15 Van Schalkwyk Street, Newcastle (KwaZulu-Natal); Dr Anneckestraat 28A, Limpopo. We also deliver across Botswana.",
    suggestions: ["Where do you work?", "How do I contact you?", "See all areas"],
  },
  {
    id: "areas",
    keywords: ["where do you work", "area", "region", "province", "mpumalanga", "gauteng", "kzn", "limpopo", "botswana", "country", "nelspruit", "newcastle"],
    reply:
      "We work across Mpumalanga, KwaZulu-Natal, Limpopo and Botswana, and take on projects elsewhere in Southern Africa on request — our engineers travel to site.",
    suggestions: ["See all areas", "What services do you offer?", "How do I contact you?"],
  },
  {
    id: "projects",
    keywords: ["project", "projects", "portfolio", "experience", "reference", "past work", "case study", "track record", "client", "clients"],
    reply:
      "49 published projects across education, healthcare, housing, water and sanitation, roads and traffic — including the R1.8bn Witbank Hospital upgrade. Clients include Zwelihle Holdings, Amulet Group and the Ministry of Works & Transport.",
    suggestions: ["See the project portfolio", "What will my project cost?", "About Abidia"],
  },
  {
    id: "about",
    keywords: ["who are you", "about abidia", "about the company", "company", "abidia", "history", "founded", "owner", "director", "accreditation", "ecsa", "saice", "b-bbee", "bbee", "qualified", "experience level"],
    reply:
      "Abidia Engineering was established in 2010 by Abraham Mukokanduku and is registered with ECSA, a member of SAICE and a B-BBEE Level 1 contributor. We're a multidisciplinary civil and structural consultancy with three offices.",
    suggestions: ["Read about us", "See credentials", "How do I contact you?"],
  },
  {
    id: "careers",
    keywords: ["career", "careers", "job", "jobs", "vacancy", "internship", "graduate", "work for you", "employment"],
    reply:
      "We don't currently list vacancies on the site. Send your CV to info@abidia.co.za with the role you're after and we'll keep it on file.",
    suggestions: ["How do I contact you?", "About Abidia", "What services do you offer?"],
  },
  {
    id: "popia",
    keywords: ["popia", "privacy", "personal information", "data", "poipa", "protection of personal"],
    reply:
      "Your information is handled under POPIA. Our privacy policy explains what we collect and why; the POPIA notice explains your rights and our Information Officer.",
    suggestions: ["Read the POPIA notice", "Read the privacy policy", "How do I contact you?"],
  },
  {
    id: "terms",
    keywords: ["terms", "conditions", "terms and conditions", "disclaimer", "liability", "legal"],
    reply:
      "Our terms of use cover how you may use this site, including that any estimator or calculator output is indicative only and not a quotation.",
    suggestions: ["Read the terms of use", "Privacy policy", "What will my project cost?"],
  },
];

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "for", "on", "is", "are", "you", "your", "we", "do", "does", "i", "me", "my", "it", "with", "at", "be", "this", "that", "can", "what", "how", "please", "about", "our", "us",
]);

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s&']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function answerLocally(message: string): ChatReply {
  const text = normalize(message);
  if (!text) {
    return {
      content: "Tell me a little about your project and I'll point you in the right direction.",
      suggestions: ["What services do you offer?", "What will my project cost?", "How do I contact you?"],
    };
  }

  const words = text.split(" ").filter((word) => word.length > 2 && !STOPWORDS.has(word));

  let best: { score: number; entry: Entry } | null = null;

  for (const entry of KB) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const normalised = normalize(keyword);
      if (!normalised) continue;
      if (text.includes(normalised)) {
        score += (normalised.includes(" ") ? 3 : 2) + normalised.length / 1000;
      } else if (words.some((word) => word.includes(normalised) || normalised.includes(word))) {
        score += 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) best = { score, entry };
  }

  if (best && best.score >= 1) {
    return { content: best.entry.reply, suggestions: best.entry.suggestions };
  }

  return {
    content: `I'm not sure about that one yet — a human engineer will. ${CONTACT} You can also browse our services or try the cost estimator.`,
    suggestions: ["What services do you offer?", "What will my project cost?", "How do I contact you?"],
  };
}

export const CHAT_SUGGESTIONS = [
  "What services do you offer?",
  "What will my project cost?",
  "Where are your offices?",
];

const SUGGESTION_ROUTES: Record<string, string> = {
  "open the cost estimator": "/tools/estimate",
  "open the quantity calculator": "/tools/calculator",
  "quantity calculator": "/tools/calculator",
  "build a project brief": "/tools/brief",
  "see all services": "/services",
  "see the project portfolio": "/projects",
  "read about us": "/about",
  "about abidia": "/about",
  "see credentials": "/about",
  "see all areas": "/areas",
  "read the popia notice": "/popia",
  "read the privacy policy": "/privacy",
  "read the terms of use": "/terms",
  "see municipal engineering": "/services/municipal-engineering",
  "see road engineering": "/services/road-engineering",
  "see structural engineering": "/services/structural-engineering",
  "see water services": "/services/water-wastewater-engineering",
  "see traffic management": "/services/traffic-management",
  "see planning services": "/services/town-regional-planning",
  "see environmental services": "/services/environmental-management",
  "see construction management": "/services/construction-management",
  "road engineering": "/services/road-engineering",
  "structural engineering": "/services/structural-engineering",
  "construction management": "/services/construction-management",
  "traffic management": "/services/traffic-management",
  "town planning": "/services/town-regional-planning",
  "environmental management": "/services/environmental-management",
  "municipal engineering": "/services/municipal-engineering",
};

export function suggestionHref(suggestion: string): string | undefined {
  const key = suggestion.trim().toLowerCase();
  return SUGGESTION_ROUTES[key];
}

export function chatSystemPrompt() {
  return [
    "You are the website assistant for Abidia Engineering, a South African civil and structural engineering consultancy established in 2010 (founder Abraham Mukokanduku).",
    "Answer briefly (2-4 sentences), in plain English, friendly and professional.",
    "Services: municipal, road, structural, water & wastewater, environmental, traffic, town & regional planning, construction management.",
    "Offices: 10 Cedarwood Circle, West Acres, Nelspruit (Mpumalanga); 15 Van Schalkwyk Street, Newcastle (KZN); Dr Anneckestraat 28A (Limpopo). Delivery also in Botswana.",
    `Contact: 083 470 2027 (WhatsApp), info@abidia.co.za, Mon-Fri 08:00-17:00.`,
    "Free tools: /tools/estimate (budget ranges), /tools/calculator (quantities), /tools/brief (project brief builder).",
    "Never invent fees, clients, projects or credentials. Estimator output is indicative only, never a quotation. If you don't know, say a human engineer will follow up.",
  ].join(" ");
}
