import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Tejas Patel — Software & AI Systems Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c0d0e",
          color: "#f3f4f6",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background Grid Pattern Accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(204, 255, 0, 0.18) 1px, transparent 0)",
            backgroundSize: "36px 36px",
            opacity: 0.7,
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 20px",
              border: "1px solid rgba(204, 255, 0, 0.35)",
              backgroundColor: "rgba(204, 255, 0, 0.08)",
              color: "#ccff00",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "2px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#ccff00",
              }}
            />
            AVAILABLE FOR ROLES &amp; CONTRACTS // NADIAD, INDIA
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#9ca3af",
              fontFamily: "monospace",
            }}
          >
            EST. 2026
          </div>
        </div>

        {/* Center Title Block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "88px",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-4px",
              color: "#ffffff",
            }}
          >
            TEJAS PATEL
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#ccff00",
              letterSpacing: "-1px",
            }}
          >
            SOFTWARE &amp; APPLIED AI SYSTEMS ENGINEER
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#9ca3af",
              maxWidth: "920px",
              lineHeight: 1.45,
              fontWeight: 400,
            }}
          >
            I engineer end-to-end web applications (TypeScript, Next.js, Node) and construct custom agentic AI systems (Python, LLM graphs).
          </div>
        </div>

        {/* Bottom Social / Repos */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: "16px", color: "#e5e7eb", fontFamily: "monospace" }}>
            github.com/tejaspatel2255
          </div>
          <div style={{ fontSize: "16px", color: "#e5e7eb", fontFamily: "monospace" }}>
            linkedin.com/in/pateltejasd
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
