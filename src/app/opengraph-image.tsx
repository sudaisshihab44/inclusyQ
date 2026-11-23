import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { hero, site } from "@/lib/content";

export const alt = site.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const boardFrame = hero.board.frames[2];
  const lockup = await readFile(
    path.join(process.cwd(), "public", "inclusyq-lockup-light.png")
  );
  const lockupSrc = `data:image/png;base64,${lockup.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #080808 0%, #0a1420 100%)",
          color: "#F3F8F5",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={lockupSrc}
            width={326}
            height={88}
            alt=""
            style={{ objectFit: "contain" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 660 }}>
            <div style={{ display: "flex", fontSize: 18, color: "#8A9A91", letterSpacing: 0.4 }}>
              {hero.status}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 22,
                fontSize: 72,
                lineHeight: 0.98,
                letterSpacing: -3.5,
                fontWeight: 500,
              }}
            >
              {hero.headlineWide.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 18, color: "#A9B8AF", maxWidth: 620 }}>
              {hero.meta.join(" · ")}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 340,
              padding: 26,
              borderRadius: 20,
              border: "1px solid rgba(231,239,234,.16)",
              background: "#0B0E0D",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, color: "#8A9A91" }}>{hero.board.nowServing}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#C9ECFF" }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "#6CC8FF" }} />
                {hero.board.live}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                lineHeight: 1,
                letterSpacing: -5,
                color: "#9BDCFF",
                marginTop: 10,
              }}
            >
              {boardFrame.now}
            </div>
            <div style={{ display: "flex", fontSize: 17, color: "#CBD8D1", marginTop: 4 }}>
              {boardFrame.doctor} · {boardFrame.room}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
                marginTop: 22,
                borderTop: "1px solid rgba(231,239,234,.12)",
                paddingTop: 16,
              }}
            >
              {boardFrame.next.slice(0, 2).map((row) => (
                <div key={row.token} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 20, color: "#F3F8F5" }}>{row.token}</span>
                  <span
                    style={{
                      display: "flex",
                      fontSize: 12,
                      color: row.state === "next" ? "#C9ECFF" : "#A9B8AF",
                      border: `1px solid ${row.state === "next" ? "rgba(59,174,253,.35)" : "rgba(231,239,234,.12)"}`,
                      borderRadius: 6,
                      padding: "4px 8px",
                    }}
                  >
                    {row.state === "next" ? "Next" : "Waiting"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(231,239,234,.12)",
            paddingTop: 20,
            fontSize: 16,
            color: "#8A9A91",
          }}
        >
          <span>{site.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
          <span>Outpatient registration, tokens and live queues.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
