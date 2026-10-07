import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";
import { services } from "@/data/services";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Abidia Engineering services";

export default async function Image() {
  return AbidiaOgImage({
    title: `${services.length} disciplines. One team.`,
    subtitle:
      "Municipal, road, structural, water, environmental, traffic, town planning and construction management.",
    kicker: "SERVICES",
  });
}
