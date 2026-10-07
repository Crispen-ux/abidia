import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";
import { projects } from "@/data/projects";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Abidia Engineering project portfolio";

export default async function Image() {
  return AbidiaOgImage({
    title: `${projects.length} projects across Southern Africa.`,
    subtitle: "Schools, hospitals, housing, roads, bulk water and sanitation — designed and supervised.",
    kicker: "PROJECT PORTFOLIO",
  });
}
