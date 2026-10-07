import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "About Abidia Engineering";

export default async function Image() {
  return AbidiaOgImage({
    title: "Engineering since 2010.",
    subtitle:
      "Abidia Engineering — a multidisciplinary civil and structural consultancy with offices in Mpumalanga, KwaZulu-Natal and Limpopo.",
    kicker: "ABOUT US",
  });
}
