import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Free tools for clients";

export default async function Image() {
  return AbidiaOgImage({
    title: "Free tools for your project.",
    subtitle:
      "Cost estimator, quantity calculator and a project brief builder you can send straight to our engineers.",
    kicker: "CLIENT TOOLS",
  });
}
