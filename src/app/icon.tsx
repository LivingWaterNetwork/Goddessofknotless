import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: gold "GK" monogram on emerald, echoing the packet's seal. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#064E3B",
          color: "#C8A34A",
          fontSize: 34,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          letterSpacing: -1,
        }}
      >
        gk
      </div>
    ),
    size,
  );
}
