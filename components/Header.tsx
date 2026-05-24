"use client";

import { useState } from "react";
import { T } from "./tokens";

const NAV = [
  { label: "Início",                href: "#"        },
  { label: "Base da Reforma",       href: "#base"    },
  { label: "Estudos",               href: "#estudos" },
  { label: "Radar",                 href: "#radar"   },
];

function ShieldLogo({ height = 36 }: { height?: number }) {
  const w = Math.round(height * 0.7);
  return (
    <svg width={w} height={height} viewBox="0 0 28 40" fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M2 2 H26 V24 C26 34 14 39 14 39 C14 39 2 34 2 24 Z"
        fill={T.TEAL} stroke={T.GOLD} strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="2" y1="14" x2="26" y2="14" stroke={T.GOLD_LIGHT} strokeWidth="0.8" opacity=".5" />
      <text x="14" y="10" fontSize="7" fill={T.GOLD_LIGHT} textAnchor="middle"
        fontFamily="ui-monospace,Menlo,monospace" fontWeight="700" letterSpacing="0.5">ES</text>
      <text x="14" y="28" fontSize="5.5" fill={T.WHITE} textAnchor="middle"
        fontFamily="ui-monospace,Menlo,monospace" opacity=".85">SEFAZ</text>
      <text x="14" y="34.5" fontSize="4.5" fill={T.GOLD_LIGHT} textAnchor="middle"
        fontFamily="ui-monospace,Menlo,monospace" opacity=".7" letterSpacing="0.2">TESOURO</text>
    </svg>
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
                <ShieldLogo height={34} />
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
            <ShieldLogo height={36} />
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
