import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";
import { getArea } from "@/data/areas";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Areas Abidia Engineering serves";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);

  if (!area) {
    return AbidiaOgImage({ title: "Engineering that gets built." });
  }

  return AbidiaOgImage({
    title: area.title,
    subtitle: area.summary,
    kicker: `WHERE WE WORK · ${area.province.toUpperCase()}`,
    footer: area.towns.slice(0, 4).join(" · "),
  });
}
