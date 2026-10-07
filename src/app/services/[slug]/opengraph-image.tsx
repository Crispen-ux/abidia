import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";
import { getService } from "@/data/services";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Abidia Engineering service";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return AbidiaOgImage({ title: "Engineering that gets built." });
  }

  return AbidiaOgImage({
    title: service.name,
    subtitle: service.summary,
    kicker: "SERVICES",
  });
}
