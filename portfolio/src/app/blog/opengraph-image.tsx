import { ImageResponse } from "next/og";

export const alt = "AI Systems Journal by Adithya S Nair";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BlogOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 54, color: "#f4f1e8", background: "#080d16", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, letterSpacing: "0.12em" }}>
          <span style={{ color: "#c9f45a" }}>AS/N / FIELD JOURNAL</span><span>2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#6f8cff", fontSize: 28 }}>AI systems after the demo.</span>
          <strong style={{ maxWidth: 900, marginTop: 14, fontSize: 94, lineHeight: 0.9, letterSpacing: "-0.06em" }}>Notes from the hard part.</strong>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 16, letterSpacing: "0.08em" }}>
          <span style={{ width: 14, height: 14, background: "#ff6a4d", transform: "rotate(45deg)" }} />
          <span>MEMORY / EVALUATION / MEDICAL AI / RAG</span>
        </div>
      </div>
    ),
    size,
  );
}
