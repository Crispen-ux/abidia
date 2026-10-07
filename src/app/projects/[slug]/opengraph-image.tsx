import { AbidiaOgImage, ogSize, ogContentType } from "@/components/og-image";
import { getProject } from "@/data/projects";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Abidia Engineering project";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return AbidiaOgImage({ title: "Engineering that gets built." });
  }

  return AbidiaOgImage({
    title: project.name,
    subtitle: `${project.category} · ${project.value} · ${project.client}`,
    kicker: "PROJECT PORTFOLIO",
  });
}
