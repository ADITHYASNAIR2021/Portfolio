import { ImageResponse } from "next/og";

export const alt = "Adithya S Nair — AI Engineer and Researcher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "46px 54px",
          display: "flex",
          flexDirection: "column",
          color: "#f1f6ec",
          background: "#0d0c12",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 79% 34%, rgba(197,184,255,0.28), transparent 25%), linear-gradient(112deg, transparent 0 70%, rgba(186,245,90,0.08) 70% 71%, transparent 71%)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 15,
            letterSpacing: "0.09em",
            position: "relative",
          }}
        >
          <span style={{ color: "#baf55a" }}>AS/N · BUILD LOG 26.08</span>
          <span>AI ENGINEERING / RESEARCH / PRODUCT</span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              marginBottom: 15,
              color: "#c5b8ff",
            }}
          >
            Adithya S Nair
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 88,
              lineHeight: 0.88,
              letterSpacing: "-0.06em",
              fontWeight: 800,
            }}
          >
            <span>AI should survive</span>
            <span style={{ color: "#c5b8ff" }}>
              contact with the real world.
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            position: "relative",
          }}
        >
          <div style={{ width: 11, height: 11, background: "#ff633b", transform: "rotate(45deg)" }} />
          <div style={{ flex: 1, height: 2, background: "#ff633b" }} />
          <div style={{ display: "flex", fontFamily: "monospace", fontSize: 15, letterSpacing: "0.06em" }}>
            MEDICAL AI · RAG · AGENTS · FULL-STACK SYSTEMS
          </div>
        </div>
      </div>
    ),
    size,
  );
}
