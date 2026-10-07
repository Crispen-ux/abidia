import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${site.legalName} — ${site.tagline}`,
    short_name: site.name,
    description: site.shortDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait-primary",
    background_color: "#faf8f6",
    theme_color: "#9b393a",
    lang: "en-ZA",
    dir: "ltr",
    categories: ["business", "productivity", "utilities"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-384-maskable.png", sizes: "384x384", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { src: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcuts: [
      {
        name: "Project cost estimator",
        short_name: "Estimate",
        description: "Get an instant budget range for your project",
        url: "/tools/estimate",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Quantity calculator",
        short_name: "Calculate",
        description: "Concrete, asphalt and excavation quantities",
        url: "/tools/calculator",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Request a quote",
        short_name: "Quote",
        description: "Build a project brief and send it to Abidia",
        url: "/tools/brief",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
