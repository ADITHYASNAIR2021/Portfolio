import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Adithya S Nair — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#06080d",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Cyan glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Violet glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "auto",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "rgba(0,212,255,0.12)",
                border: "1px solid rgba(0,212,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00d4ff",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              A
            </div>
            <span
              style={{ color: "#6b7280", fontSize: 16, fontFamily: "monospace" }}
            >
              adithya.dev
            </span>
          </div>
          {/* Location */}
          <span
            style={{ color: "#4b5563", fontSize: 15, fontFamily: "monospace" }}
          >
            Kerala, India — Doctreen
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 80 }}>
          {/* Role tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                color: "#00d4ff",
                fontSize: 15,
                fontFamily: "monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              AI Engineer
            </span>
            <span style={{ color: "#1e293b", fontSize: 15 }}>·</span>
            <span
              style={{
                color: "#4b5563",
                fontSize: 15,
                fontFamily: "monospace",
              }}
            >
              Medical AI · LLMs · RAG
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: "#e8eaed",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Adithya{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              S Nair
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              color: "#6b7280",
              fontSize: 22,
              lineHeight: 1.5,
              marginTop: 8,
              maxWidth: 680,
            }}
          >
            Building LLM pipelines and medical AI systems that work reliably in
            production.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: "auto",
            paddingTop: 40,
            borderTop: "1px solid #1e293b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span
              style={{
                color: "#6b7280",
                fontSize: 14,
                fontFamily: "monospace",
              }}
            >
              Open to new roles
            </span>
          </div>
          <span style={{ color: "#1e293b" }}>·</span>
          <span
            style={{ color: "#4b5563", fontSize: 14, fontFamily: "monospace" }}
          >
            FastAPI · PyTorch · LangChain · Docker
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
