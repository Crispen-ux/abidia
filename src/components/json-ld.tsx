import { site } from "@/config/site";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: "Abidia",
    url: site.url,
    logo: `${site.url}/icons/icon-512.png`,
    image: `${site.url}/images/hero/hero-building.jpg`,
    description: site.description,
    foundingDate: String(site.founded),
    founder: {
      "@type": "Person",
      name: site.founder,
    },
    slogan: site.tagline,
    email: site.email,
    telephone: site.phoneHref,
    priceRange: "$$",
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "Botswana" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.offices[0].street,
      addressLocality: site.offices[0].city,
      addressRegion: site.offices[0].province,
      addressCountry: "ZA",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    sameAs: [site.socials.instagram, site.socials.facebook].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering services",
      itemListElement: [
        "Municipal Engineering",
        "Road Engineering",
        "Structural Engineering",
        "Water & Wastewater Engineering",
        "Environmental Management",
        "Traffic Management",
        "Town & Regional Planning",
        "Construction Management",
      ].map((name, i) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
        position: i + 1,
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.shortDescription,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-ZA",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${site.url}/projects?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
