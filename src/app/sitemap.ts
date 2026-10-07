import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { areas } from "@/data/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/tools/estimate`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/tools/calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/tools/brief`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const areaRoutes: MetadataRoute.Sitemap = areas.map((area) => ({
    url: `${site.url}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...areaRoutes, ...serviceRoutes, ...projectRoutes];
}
