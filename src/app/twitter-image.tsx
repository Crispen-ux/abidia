import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";
import { site } from "@/config/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${site.legalName} — civil and structural engineering consultancy`;

export default async function Image() {
  return AbidiaOgImage({
    title: "Engineering that gets built.",
    subtitle:
      "Municipal, road, water, structural, environmental, traffic and town planning services across South Africa and Botswana.",
  });
}
