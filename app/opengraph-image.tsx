import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Guillermo Ariel Del Fresno — Automatización con IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(ellipse 60% 50% at 15% 5%, rgba(230,57,70,0.35), transparent 60%), radial-gradient(ellipse 55% 45% at 90% 95%, rgba(255,107,122,0.22), transparent 65%), #08070A",
          color: "#F4F1F2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "20px",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "#F4F1F2",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#E63946",
            }}
          />
          delfresno
          <span style={{ color: "#807A82" }}>/automations</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              maxWidth: "1000px",
            }}
          >
            Automatizo procesos repetitivos con IA.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "36px",
              color: "#807A82",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Pipelines, agentes y dashboards en producción.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            fontFamily: "monospace",
            color: "#807A82",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
          }}
        >
          <span>Guillermo Ariel Del Fresno</span>
          <span style={{ color: "#E63946" }}>cal.com/guillermo-ariel-del-fresno</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
