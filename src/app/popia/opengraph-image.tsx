import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Abidia Engineering POPIA notice";

export default async function Image() {
  return AbidiaOgImage({
    title: "POPIA notice",
    subtitle:
      "How we collect, use, protect and destroy personal information — and how to exercise your rights as a data subject.",
    kicker: "LEGAL",
    footer: "Protection of Personal Information Act 4 of 2013",
  });
}
