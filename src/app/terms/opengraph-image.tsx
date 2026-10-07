import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Abidia Engineering terms and conditions";

export default async function Image() {
  return AbidiaOgImage({
    title: "Terms & conditions",
    subtitle:
      "Website terms of use — including that our estimator and calculator outputs are indicative only, never a quotation.",
    kicker: "LEGAL",
    footer: "Abidia Engineering · South Africa",
  });
}
