"use client";

import { useState } from "react";
import { T } from "./tokens";

const NAV = [
  { label: "Início",                href: "#"        },
  { label: "Base da Reforma",       href: "#base"    },
  { label: "Estudos",               href: "#estudos" },
  { label: "Radar",                 href: "#radar"   },
];

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
      src="https://cdn.es.gov.br/images/logo/governo/brasao/center-white/Brasao_Governo_640.png"
      alt="Brasão do Governo do Espírito Santo"
      height={height}
      style={{ width: "auto", flexShrink: 0, opacity: 0.92 }}
      onError={() => setFailed(true)}
    />
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {drawerOpen && (
        <div className="drawer">
          <div className="drawer-bg" onClick={() => setDrawerOpen(false)} />
          <nav className="drawer-panel">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 20px 18px", borderBottom: `1px solid rgba(255,255,255,.1)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Brasao height={34} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.WHITE,
                    fontFamily: "var(--ff-display)", letterSpacing: "-0.01em" }}>
                    Radar da Reforma
                  </div>
                  <div style={{ fontSize: 10, color: T.GOLD_LIGHT, fontFamily: "var(--ff-mono)",
                    letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>
                    Tesouro · SEFAZ-ES
                  </div>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)}
                style={{ background: "none", border: "none", color: T.LIGHT,
                  fontSize: 20, cursor: "pointer", lineHeight: 1 }}>
                ✕
              </button>
            </div>
            {NAV.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setDrawerOpen(false)}
                style={{ display: "block", fontFamily: "var(--ff-ui)",
                  fontSize: 14, color: T.LIGHT, fontWeight: 400,
                  padding: "15px 24px", textDecoration: "none",
                  borderBottom: `1px solid rgba(255,255,255,.06)`,
                  borderLeft: "3px solid transparent" }}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <header style={{ background: T.NAVY, height: 58, position: "sticky",
        top: 0, zIndex: 100, boxShadow: "0 1px 0 rgba(201,148,26,.18), 0 4px 24px rgba(0,0,0,.28)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", height: "100%",
          display: "flex", alignItems: "center", padding: "0 56px", gap: 20 }}>

          {/* Hamburger (mobile only) */}
          <button className="hamburger" onClick={() => setDrawerOpen(true)}
            style={{ background: "none", border: "none", color: T.LIGHT,
              fontSize: 22, cursor: "pointer", display: "flex",
              alignItems: "center", padding: 4, flexShrink: 0 }}>
            ☰
          </button>

          {/* Brand */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12,
            flexShrink: 0, textDecoration: "none" }}>
            <Brasao height={36} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.WHITE,
                lineHeight: 1.1, fontFamily: "var(--ff-display)", letterSpacing: "-0.01em" }}>
                Radar da Reforma Tributária
              </div>
              <div style={{ fontSize: 10, color: T.GOLD_LIGHT, fontFamily: "var(--ff-mono)",
                letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>
                Tesouro Estadual · SEFAZ-ES
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ gap: 0, flex: 1, justifyContent: "flex-end" }}>
            {NAV.map(({ label, href }) => (
              <a key={label} href={href}
                style={{ fontFamily: "var(--ff-ui)", fontSize: 12.5, color: T.LIGHT,
                  fontWeight: 400, padding: "6px 13px", textDecoration: "none",
                  letterSpacing: "0.01em", transition: "color .15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = T.GOLD_LIGHT)}
                onMouseLeave={e => (e.currentTarget.style.color = T.LIGHT)}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
