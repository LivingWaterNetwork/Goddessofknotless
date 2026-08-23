import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Goddess of Knotless — knotless braids in Chicago's West Loop";

/**
 * Branded social share image, generated at build time from the palette rather
 * than shipped as a hand-made raster — so it can never drift from the brand.
 * Uses system-safe fonts because next/og cannot load next/font faces.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a5c46 0%, #064E3B 55%, #04382a 100%)",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#C8A34A",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            Goddess
          </span>
          <span
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#F4F1E8",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            of Knotless
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, lineHeight: 1.08, color: "#F4F1E8", display: "flex", flexDirection: "column" }}>
            <span>Natural-looking braids.</span>
            <span>A calm experience.</span>
            <span style={{ color: "#DCC07E", fontStyle: "italic" }}>Results you can trust.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 1, background: "#C8A34A" }} />
          <span
            style={{
              fontSize: 20,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#C9D3CB",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            West Loop · Chicago · By Appointment
          </span>
        </div>
      </div>
    ),
    size,
  );
}
