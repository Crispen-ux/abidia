import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";
import { site } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact Abidia Engineering";

export default async function Image() {
  return AbidiaOgImage({
    title: "Let's scope your project.",
    subtitle: `Talk to our engineers — ${site.phone} · ${site.hours}.`,
    kicker: "CONTACT",
    footer: "Nelspruit · Newcastle · Limpopo",
  });
}
