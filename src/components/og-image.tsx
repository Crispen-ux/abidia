import { cache } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png" as const;

const loadFont = cache(async () => {
  const buffer = await readFile(join(process.cwd(), "public", "fonts", "Geist-Regular.ttf"));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
});

type OgImageOptions = {
  title: string;
  kicker?: string;
  subtitle?: string;
  footer?: string;
};

export async function AbidiaOgImage({
  title,
  kicker = "ABIDIA ENGINEERING",
  subtitle,
  footer = "Civil & Structural Engineers ɛ Project Managers",
}: OgImageOptions) {
  const fontData = await loadFont();
  const titleSize = title.length > 52 ? 74 : title.length > 34 ? 88 : 104;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#141418",
          color: "#ffffff",
          padding: 64,
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 26, letterSpacing: 6, color: "#9b393a" }}>{kicker}</span>
          <span style={{ fontSize: 26, color: "rgba(255,255,255,0.55)" }}>abidia.co.za</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: titleSize, lineHeight: 1.08, maxWidth: 1040 }}>{title}</div>
          {subtitle ? (
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.65)",
                maxWidth: 950,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 64, height: 8, backgroundColor: "#9b393a" }} />
            <span style={{ fontSize: 30 }}>{footer}</span>
          </div>
          <span style={{ fontSize: 26, color: "rgba(255,255,255,0.55)" }}>
            Est. 2010 · ECSA · SAICE
          </span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: "Geist",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
