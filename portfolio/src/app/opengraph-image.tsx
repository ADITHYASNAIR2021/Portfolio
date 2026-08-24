import { ImageResponse } from "next/og";

export const alt = "Adithya S Nair - AI Engineer and Researcher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", padding: "48px 54px", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#f4f1e8", background: "#080d16", fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -120, top: 60, width: 430, height: 430, border: "2px solid rgba(111,140,255,0.38)", borderRadius: "50%", display: "flex" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: 15, letterSpacing: "0.1em", position: "relative" }}>
          <span style={{ color: "#c9f45a" }}>AS/N / APPLIED AI 26</span><span>KERALA / WORLDWIDE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <span style={{ color: "#6f8cff", fontSize: 28, marginBottom: 14 }}>Adithya S Nair / AI engineer</span>
          <strong style={{ maxWidth: 820, fontSize: 104, lineHeight: 0.84, letterSpacing: "-0.065em" }}>Build AI that earns confidence.</strong>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "monospace", fontSize: 14, letterSpacing: "0.07em", position: "relative" }}>
          <span style={{ width: 14, height: 14, background: "#ff6a4d", transform: "rotate(45deg)" }} />
          <span>AI SYSTEMS / AGENT MEMORY / EVALUATION / FULL-STACK</span>
        </div>
      </div>
    ),
    size,
  );
}
