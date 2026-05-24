"use client";

import { useState } from "react";
import { T } from "./tokens";

const NAV = ["Início", "Base da Reforma", "Estudos e Capacitação", "Atualizações"];

function Brasao({ height = 32 }: { height?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    const h = height, w = Math.round(height * 0.72);
    return (
      <svg width={w} height={h} viewBox="0 0 36 50" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, opacity: 0.88 }}>
        <path d="M2 2 H34 V30 C34 42 18 48 18 48 C18 48 2 42 2 30 Z"
          stroke="white" strokeWidth="1.8" fill="rgba(255,255,255,0.08)" strokeLinejoin="round" />
        <line x1="2" y1="18" x2="34" y2="18" stroke="white" strokeWidth="1" opacity=".55" />
        <ellipse cx="18" cy="11" rx="5" ry="3.5" fill="white" opacity=".92" />
        <circle cx="22" cy="8.5" r="2.5" fill="white" opacity=".92" />
        <path d="M13 11 C9 8 7 11 9 14 C11 12 13 12 13 11Z" fill="white" opacity=".85" />
        <path d="M13 12 L8 16 M13 11 L7 13" stroke="white" strokeWidth="0.9" opacity=".65" strokeLinecap="round" />
        <text x="9" y="36" fontSize="6" fill="white" opacity=".72">★</text>
        <text x="15" y="36" fontSize="6" fill="white" opacity=".72">★</text>
        <text x="21" y="36" fontSize="6" fill="white" opacity=".72">★</text>
        <text x="18" y="45" fontSize="6.5" fill="white" opacity=".6"
          textAnchor="middle" fontFamily="system-ui" fontWeight="700" letterSpacing="0.08em">ES</text>
      </svg>
    );
  }
  return (
    <img
      src="https://cdn.es.gov.br/images/logo/governo/brasao/center-white/Brasao_Governo_800.png"
      alt="Brasão do Governo do Espírito Santo"
      height={height}
      style={{ width: "auto", flexShrink: 0, opacity: 0.92 }}
      onError={() => setFailed(true)}
    />
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Início");

  return (
    <>
      {drawerOpen && (
        <div className="drawer">
          <div className="drawer-bg" onClick={() => setDrawerOpen(false)} />
          <nav className="drawer-panel">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 20px 18px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Brasao height={28} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.WHITE,
                    fontFamily: "var(--ff-display)" }}>Radar da Reforma</div>
                  <div style={{ fontSize: 10, color: T.LIGHT, fontFamily: "var(--ff-ui)" }}>
                    Tesouro Estadual · SEFAZ-ES
                  </div>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)}
                style={{ background: "none", border: "none", color: T.LIGHT, fontSize: 20, cursor: "pointer" }}>
                ✕
              </button>
            </div>
            {NAV.map(item => (
              <button key={item}
                onClick={() => { setActiveNav(item); setDrawerOpen(false); }}
                style={{ background: "none", border: "none", fontFamily: "var(--ff-ui)",
                  fontSize: 13.5, color: activeNav === item ? T.GOLD : T.LIGHT,
                  fontWeight: activeNav === item ? 700 : 400,
                  padding: "14px 24px", textAlign: "left", cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                  borderLeft: activeNav === item ? `3px solid ${T.GOLD}` : "3px solid transparent",
                  width: "100%" }}>
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}

      <header style={{ background: T.NAVY, height: 54, position: "sticky",
        top: 0, zIndex: 100, boxShadow: "0 2px 16px rgba(0,0,0,.32)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", height: "100%",
          display: "flex", alignItems: "center", padding: "0 28px", gap: 16 }}>

          <button className="hamburger" onClick={() => setDrawerOpen(true)}
            style={{ background: "none", border: "none", color: T.LIGHT,
              fontSize: 20, cursor: "pointer", display: "flex",
              alignItems: "center", padding: 4, flexShrink: 0 }}>
            ☰
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Brasao height={32} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.WHITE,
                lineHeight: 1.15, fontFamily: "var(--ff-display)", letterSpacing: "-0.01em" }}>
                Radar da Reforma Tributária
              </div>
              <div style={{ fontSize: 10, color: T.LIGHT, fontFamily: "var(--ff-ui)" }}>
                Tesouro Estadual · SEFAZ-ES
              </div>
            </div>
          </div>

          <nav className="nav-desktop" style={{ gap: 2, flex: 1, justifyContent: "center" }}>
            {NAV.map(item => (
              <button key={item} onClick={() => setActiveNav(item)}
                style={{ background: "none", border: "none", fontFamily: "var(--ff-ui)",
                  fontSize: 12.5, color: activeNav === item ? T.GOLD : T.LIGHT,
                  fontWeight: activeNav === item ? 600 : 400,
                  padding: "6px 11px", cursor: "pointer",
                  borderBottom: activeNav === item ? `2px solid ${T.GOLD}` : "2px solid transparent" }}>
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
