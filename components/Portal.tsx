"use client";

import { useState, useEffect } from "react";
import { T } from "./tokens";
import { base, estudos, radar } from "@/lib/content";
import type { ContentItem } from "@/lib/content";
import Header from "./Header";
import ContentModal from "./ContentModal";

// ── Primitive helpers ──────────────────────────────────────

const FORMAT_CODE: Record<string, string> = {
  "Emenda Constitucional": "EC",
  "Lei Complementar": "LC",
  "Resolução": "RES",
  "Decreto": "DEC",
  "Vídeo": "VID",
  "Artigo técnico": "ART",
  "Nota técnica": "NT",
  "Portal Web": "WEB",
  "Guia / Portal Web": "GUIA",
};

function FormatTag({ formato = "", dark = false }: { formato?: string; dark?: boolean }) {
  const code = FORMAT_CODE[formato] ?? formato.slice(0, 3).toUpperCase();
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.16em",
      textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.85)" : T.NAVY, fontWeight: 600 }}>
      <span style={{ display: "inline-grid", placeItems: "center",
        width: 26, height: 18, fontSize: 9, fontWeight: 700,
        background: dark ? T.GOLD_LIGHT : T.GOLD, color: T.NAVY, letterSpacing: "0.08em" }}>
        {code}
      </span>
      {formato}
    </span>
  );
}

function ProfundidadePip({ level = "Introdutório", dark = false }: { level?: string; dark?: boolean }) {
  const filled = level === "Especialista" ? 3 : level === "Aprofundado" ? 2 : 1;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.18em",
      textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.7)" : "rgba(11,37,53,0.7)" }}>
      <span style={{ display: "inline-flex", gap: 2 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: 8, height: 3,
            background: i < filled
              ? (dark ? "rgba(255,255,255,0.55)" : T.GOLD)
              : (dark ? "rgba(255,255,255,0.18)" : T.RULE) }} />
        ))}
      </span>
      {level}
    </span>
  );
}

function TemaPill({ tema = "", dark = false }: { tema?: string; dark?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.7)" : "rgba(26,80,104,0.95)", fontWeight: 600 }}>
      <span style={{ width: 4, height: 4, transform: "rotate(45deg)",
        background: dark ? "rgba(255,255,255,0.55)" : T.TEAL }} />
      {tema}
    </span>
  );
}

function StatusFlag({ kind = "novo" }: { kind?: "novo" | "destaque" }) {
  if (kind === "destaque") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: "0.22em",
        textTransform: "uppercase", background: T.NAVY, color: "#fff",
        padding: "3px 7px", fontWeight: 700 }}>
        ★ Destaque
      </span>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: "0.22em",
      textTransform: "uppercase", color: T.GOLD, fontWeight: 700 }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: T.GOLD,
        boxShadow: `0 0 8px ${T.GOLD}` }} />
      Novo
    </span>
  );
}

function FormatIcon({ code, dark = false }: { code: string; dark?: boolean }) {
  const c = dark ? "rgba(232,184,75,0.8)" : T.GOLD;
  const paths: Record<string, React.ReactNode> = {
    VID:  <><circle cx="10" cy="10" r="8.5" stroke={c} strokeWidth="1.1" fill="none"/><path d="M8 7 L15 10 L8 13 Z" fill={c}/></>,
    EC:   <><rect x="3" y="2" width="14" height="16" rx="1.5" stroke={c} strokeWidth="1.1" fill="none"/><path d="M3 6 H17" stroke={c} strokeWidth="0.8"/><line x1="6" y1="10" x2="14" y2="10" stroke={c} strokeWidth="0.9"/><line x1="6" y1="13" x2="14" y2="13" stroke={c} strokeWidth="0.9"/></>,
    LC:   <><path d="M2 3 Q10 1 18 3 L18 15 Q10 18 2 15 Z" stroke={c} strokeWidth="1" fill="none"/><text x="10" y="13" textAnchor="middle" fontSize="8" fill={c} fontFamily="serif" fontWeight="700">§</text></>,
    NT:   <><circle cx="8.5" cy="8.5" r="6" stroke={c} strokeWidth="1.1" fill="none"/><line x1="13" y1="13" x2="18" y2="18" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
    WEB:  <><circle cx="10" cy="10" r="8.5" stroke={c} strokeWidth="1.1" fill="none"/><ellipse cx="10" cy="10" rx="4" ry="8.5" stroke={c} strokeWidth="0.8" fill="none"/><line x1="1.5" y1="10" x2="18.5" y2="10" stroke={c} strokeWidth="0.8"/></>,
    ART:  <><line x1="3" y1="5" x2="17" y2="5" stroke={c} strokeWidth="1.2"/><line x1="3" y1="9" x2="17" y2="9" stroke={c} strokeWidth="1"/><line x1="3" y1="13" x2="11" y2="13" stroke={c} strokeWidth="1"/></>,
    GUIA: <><circle cx="10" cy="10" r="8.5" stroke={c} strokeWidth="1" fill="none"/><circle cx="10" cy="10" r="2.5" fill={c}/><line x1="10" y1="1.5" x2="10" y2="5" stroke={c} strokeWidth="0.9"/><line x1="10" y1="15" x2="10" y2="18.5" stroke={c} strokeWidth="0.9"/><line x1="1.5" y1="10" x2="5" y2="10" stroke={c} strokeWidth="0.9"/><line x1="15" y1="10" x2="18.5" y2="10" stroke={c} strokeWidth="0.9"/></>,
    PDF:  <><path d="M4 1 H13 L17 5 V19 H4 Z" stroke={c} strokeWidth="1" fill="none"/><path d="M13 1 V5 H17" stroke={c} strokeWidth="0.9" fill="none"/><line x1="7" y1="10" x2="14" y2="10" stroke={c} strokeWidth="0.8"/><line x1="7" y1="13" x2="14" y2="13" stroke={c} strokeWidth="0.8"/></>,
    RES:  <><path d="M10 2 L18 6 V14 L10 18 L2 14 V6 Z" stroke={c} strokeWidth="1" fill="none"/><line x1="10" y1="7" x2="10" y2="12" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="14.5" r="1.2" fill={c}/></>,
  };
  const icon = paths[code] ?? paths["ART"];
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      style={{ flexShrink: 0, opacity: 0.9 }}>
      {icon}
    </svg>
  );
}

interface SectionHeadProps {
  kicker: string;
  title: string;
  lede?: string;
  dark?: boolean;
  right?: React.ReactNode;
}
function SectionHead({ kicker, title, lede, dark = false, right }: SectionHeadProps) {
  const fg   = dark ? "#fff" : T.NAVY;
  const muted = dark ? "rgba(255,255,255,0.65)" : "rgba(11,37,53,0.65)";
  const rule  = dark ? "rgba(255,255,255,0.14)" : T.RULE;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderTop: `2px solid ${dark ? T.GOLD : T.NAVY}`, paddingTop: 10 }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
          letterSpacing: "0.24em", textTransform: "uppercase",
          color: dark ? T.GOLD : T.NAVY, fontWeight: 700 }}>
          {kicker}
        </span>
        {right}
      </div>
      <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(28px,4vw,44px)",
        fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.015em",
        margin: "12px 0 12px", color: fg }}>
        {title}
      </h2>
      {lede && (
        <p style={{ fontFamily: "var(--ff-reading)", fontSize: 17, lineHeight: 1.5,
          color: muted, maxWidth: 760, margin: 0 }}>
          {lede}
        </p>
      )}
      <div style={{ height: 1, background: rule, marginTop: 24 }} />
    </div>
  );
}

// ── Portal ─────────────────────────────────────────────────

export default function Portal() {
  const [modal, setModal] = useState<ContentItem | null>(null);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const featuredVideo = estudos[0];
  const featuredBase = base[0];
  const restBase     = base.slice(1);
  const featuredEstudos = estudos.slice(0, 2);
  const restEstudos     = estudos.slice(2);
  const [leadRadar, secondRadar, ...restRadar] = radar;


  return (
    <div style={{ background: T.CREAM_LIGHT, minHeight: "100vh", color: T.INK }}>
      {modal && <ContentModal item={modal} onClose={() => setModal(null)} />}
      <Header />

      {/* ═══ HERO ═══ */}
      <div style={{ background: T.CREAM_LIGHT, borderBottom: `1px solid ${T.RULE}` }}>

        {/* Curadoria kicker */}
        <div className="hero-kicker">
          <div style={{ flex: 1, height: 1, background: T.GOLD, opacity: 0.38 }} />
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.26em",
            textTransform: "uppercase", color: "rgba(11,37,53,0.48)", whiteSpace: "nowrap" }}>
            Curadoria · Normas, Estudos e Notícias
          </span>
          <div style={{ flex: 1, height: 1, background: T.GOLD, opacity: 0.38 }} />
        </div>

        <div className="hero-feed">

          {/* ── Featured card ── */}
          <div className="hero-feat" onClick={() => setModal(featuredVideo)}>
            {/* Thumbnail */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`}
                alt={featuredVideo.titulo}
                style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center",
                background: "rgba(11,37,53,0.25)" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.55)"
                    stroke="rgba(232,184,75,0.75)" strokeWidth="1.3" />
                  <path d="M19 15 L34 24 L19 33 Z" fill="#E8B84B" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="hero-feat-body">
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9.5, letterSpacing: "0.22em",
                textTransform: "uppercase", color: T.GOLD, fontWeight: 700, marginBottom: 10 }}>
                Em destaque · Ciclo de Palestras
              </div>
              <h1 style={{ fontFamily: "var(--ff-display)",
                fontSize: "clamp(20px,2.6vw,30px)", fontWeight: 700,
                lineHeight: 1.1, letterSpacing: "-0.012em",
                margin: "0 0 10px", color: T.NAVY }}>
                {featuredVideo.titulo}
              </h1>
              <p style={{ fontFamily: "var(--ff-reading)", fontSize: 14, lineHeight: 1.58,
                color: "rgba(11,37,53,0.7)", margin: "0 0 18px" }}>
                {featuredVideo.subtitulo}
              </p>
              <button
                onClick={e => { e.stopPropagation(); setModal(featuredVideo); }}
                style={{ background: T.NAVY, color: "#fff", padding: "11px 18px",
                  fontFamily: "var(--ff-ui)", fontSize: 13, fontWeight: 600,
                  border: "none", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 8 }}>
                Assistir palestra
                <span style={{ fontFamily: "var(--ff-mono)", fontWeight: 400 }}>→</span>
              </button>
            </div>
          </div>

          {/* ── News list ── */}
          <div className="hero-nlist">
            <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.24em",
              textTransform: "uppercase", color: T.NAVY, fontWeight: 700,
              paddingBottom: 12, borderBottom: `2px solid ${T.NAVY}`,
              marginBottom: 2 }}>
              Últimas Notícias
            </div>

            {radar.slice(0, 4).map((item) => (
              <div key={item.slug} className="hero-nitem" onClick={() => setModal(item)}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9.5, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: T.TEAL, fontWeight: 700,
                    marginBottom: 4 }}>
                    {item.tag} &nbsp;·&nbsp; {item.date} {item.month}
                  </div>
                  <div className="hero-nitem-title" style={{ fontFamily: "var(--ff-display)",
                    fontSize: "clamp(15px,1.8vw,17px)", lineHeight: 1.25, color: T.NAVY,
                    marginBottom: 4 }}>
                    {item.titulo}
                  </div>
                  {item.descricao && (
                    <div style={{ fontFamily: "var(--ff-reading)", fontSize: 13, lineHeight: 1.5,
                      color: "rgba(11,37,53,0.6)",
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.descricao}
                    </div>
                  )}
                </div>
                <div style={{ color: "rgba(11,37,53,0.28)", fontSize: 22,
                  flexShrink: 0, alignSelf: "center", paddingLeft: 8 }}>›</div>
              </div>
            ))}

            <a href="#radar" style={{ display: "block", marginTop: 16,
              fontFamily: "var(--ff-ui)", fontSize: 13, fontWeight: 600,
              color: T.NAVY, textDecoration: "none",
              borderBottom: `1px solid ${T.NAVY}`, paddingBottom: 2,
              width: "fit-content" }}>
              Ver todas as notícias →
            </a>
          </div>

        </div>
      </div>

      {/* ═══ BASE DA REFORMA ═══ */}
      <section id="base" style={{ background: T.CREAM_LIGHT, borderBottom: `1px solid ${T.RULE}` }}>
        <div className="section-inner">
          <SectionHead
            kicker="01 · Base da Reforma"
            title="Legislação, atos normativos e documentos oficiais"
            lede="Emendas, leis complementares, decretos e atos do Comitê Gestor. Cada documento catalogado com tema, formato e nível de profundidade — para que o servidor encontre o que precisa sem garimpar."
            right={
              <span style={{ fontSize: 12, fontFamily: "var(--ff-ui)", color: T.NAVY,
                opacity: 0.6, letterSpacing: "0.04em" }}>
                {base.length} documentos
              </span>
            }
          />

          <div className="base-grid">
            {/* Featured */}
            <article style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
                <StatusFlag kind="destaque" />
                {featuredBase.formato && <FormatTag formato={featuredBase.formato} />}
                {featuredBase.tema    && <TemaPill tema={featuredBase.tema} />}
              </div>
              <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(24px,3vw,36px)",
                lineHeight: 1.1, letterSpacing: "-0.012em", margin: "0 0 18px", color: T.NAVY }}>
                {featuredBase.titulo}
              </h3>
              <p style={{ fontFamily: "var(--ff-reading)", fontSize: 17, lineHeight: 1.55,
                color: "rgba(11,37,53,0.78)", margin: "0 0 26px" }}>
                {featuredBase.subtitulo}
              </p>
              {featuredBase.porQueImporta && (
                <p style={{ fontFamily: "var(--ff-reading)", fontSize: 15, lineHeight: 1.6,
                  color: "rgba(11,37,53,0.65)", margin: "0 0 26px",
                  paddingLeft: 14, borderLeft: `3px solid ${T.RULE}` }}>
                  {featuredBase.porQueImporta}
                </p>
              )}
              <div style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 22,
                paddingTop: 16, borderTop: `1px solid ${T.RULE}`, flexWrap: "wrap" }}>
                {featuredBase.profundidade && <ProfundidadePip level={featuredBase.profundidade} />}
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(11,37,53,0.55)" }}>
                  {featuredBase.fonte}
                </span>
                <button onClick={() => setModal(featuredBase)}
                  style={{ marginLeft: "auto", color: T.NAVY, fontSize: 14, fontWeight: 600,
                    fontFamily: "var(--ff-ui)", background: "none", border: "none",
                    cursor: "pointer", borderBottom: `1px solid ${T.NAVY}`, paddingBottom: 2 }}>
                  Abrir documento →
                </button>
              </div>
            </article>

            {/* Numbered list */}
            <div>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "rgba(11,37,53,0.55)",
                marginBottom: 12, fontWeight: 700 }}>
                Outros documentos
              </div>
              {restBase.map((item, i) => (
                <div key={item.slug} onClick={() => setModal(item)}
                  style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22,
                    alignItems: "start", padding: "20px 0", borderTop: `1px solid ${T.RULE}`,
                    cursor: "pointer" }}>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: T.GOLD,
                    letterSpacing: "0.18em", fontWeight: 700, paddingTop: 3 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 6, flexWrap: "wrap", alignItems: "center" }}>
                      {item.formato && <FormatTag formato={item.formato} />}
                      {item.tema    && <TemaPill tema={item.tema} />}
                      {item.novidade && <StatusFlag kind="novo" />}
                    </div>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 19,
                      lineHeight: 1.2, color: T.NAVY, marginBottom: 6 }}>
                      {item.titulo}
                    </div>
                    <div style={{ fontFamily: "var(--ff-reading)", fontSize: 14,
                      lineHeight: 1.5, color: "rgba(11,37,53,0.7)" }}>
                      {item.subtitulo}
                    </div>
                    {item.profundidade && (
                      <div style={{ marginTop: 10 }}>
                        <ProfundidadePip level={item.profundidade} />
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: "right", paddingTop: 3, fontFamily: "var(--ff-mono)",
                    fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "rgba(11,37,53,0.55)" }}>
                    {item.data}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ESTUDOS E CAPACITAÇÃO ═══ */}
      <section id="estudos" style={{ background: T.NAVY, color: "#fff" }}>
        <div className="estudos-inner">
          <SectionHead
            kicker="02 · Estudos e Capacitação"
            title="Vídeos, estudos e material para capacitação técnica"
            lede="Curadoria de vídeos institucionais, palestras, notas técnicas e estudos de referência sobre a Reforma Tributária do Consumo."
            dark
            right={
              <span style={{ fontSize: 12, fontFamily: "var(--ff-ui)", color: T.GOLD_LIGHT,
                opacity: 0.8, letterSpacing: "0.04em" }}>
                {estudos.length} itens
              </span>
            }
          />

          {/* Video carousel */}
          <div style={{ marginTop: 36, marginLeft: -56, marginRight: -56 }}>
            <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase", color: T.GOLD_LIGHT, fontWeight: 700,
              marginBottom: 14, paddingLeft: 56 }}>
              ▶ Vídeos em destaque
            </div>
            <div style={{ overflowX: "auto", paddingLeft: 56, paddingBottom: 16,
              scrollbarWidth: "none" }}>
              <div style={{ display: "flex", gap: 20, width: "max-content", paddingRight: 56 }}>
                {estudos.filter(e => e.youtubeId).map((item) => (
                  <div key={item.slug} onClick={() => setModal(item)}
                    style={{ width: 272, flexShrink: 0, cursor: "pointer",
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: T.NAVY_SOFT }}>
                    <div style={{ position: "relative", width: 272, height: 153, overflow: "hidden" }}>
                      <img
                        src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.titulo}
                        style={{ width: "100%", height: "100%", objectFit: "cover",
                          display: "block" }}
                      />
                      <div style={{ position: "absolute", inset: 0,
                        display: "grid", placeItems: "center",
                        background: "rgba(11,37,53,0.28)" }}>
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                          <circle cx="22" cy="22" r="20" fill="rgba(0,0,0,0.55)"
                            stroke="rgba(232,184,75,0.7)" strokeWidth="1.2" />
                          <path d="M18 15 L31 22 L18 29 Z" fill="#E8B84B" />
                        </svg>
                      </div>
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
                        height: 3, background: "rgba(201,148,26,0.9)" }} />
                    </div>
                    <div style={{ padding: "16px 18px 18px" }}>
                      {item.tema && (
                        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                          color: "rgba(232,184,75,0.8)", fontWeight: 700, marginBottom: 8 }}>
                          {item.tema}
                        </div>
                      )}
                      <h4 style={{ fontFamily: "var(--ff-display)", fontSize: 15,
                        lineHeight: 1.25, margin: "0 0 10px", color: "#fff",
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.titulo}
                      </h4>
                      <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.45)" }}>
                        {item.fonte.split("—")[0].trim()} · {item.data}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Index of remaining */}
          <div style={{ marginTop: 56 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
              borderTop: "1px solid rgba(255,255,255,0.14)", paddingTop: 14, marginBottom: 6 }}>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: T.GOLD_LIGHT, fontWeight: 700 }}>
                Índice da biblioteca
              </span>
            </div>
            {estudos.map((item, i) => {
              const code = FORMAT_CODE[item.formato ?? ""] ?? (item.formato ?? "").slice(0, 3).toUpperCase();
              return (
              <div key={item.slug} onClick={() => setModal(item)} className="estudos-index-row">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10,
                    color: T.GOLD_LIGHT, letterSpacing: "0.14em", fontWeight: 700 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <FormatIcon code={code} dark />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: 19,
                    lineHeight: 1.2, marginBottom: 4, color: "#fff" }}>
                    {item.titulo}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.45, fontFamily: "var(--ff-reading)" }}>
                    {item.subtitulo}
                  </div>
                </div>
                <div className="estudos-index-meta" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {item.formato && <FormatTag formato={item.formato} dark />}
                  {item.tema    && <TemaPill tema={item.tema} dark />}
                </div>
                {item.profundidade && (
                  <div className="estudos-index-meta">
                    <ProfundidadePip level={item.profundidade} dark />
                  </div>
                )}
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* ═══ RADAR TESOURO ═══ */}
      <section id="radar" style={{ background: T.WHITE, borderBottom: `1px solid ${T.RULE}` }}>
        <div className="section-inner">
          <SectionHead
            kicker="03 · Radar Tesouro"
            title="Últimas notícias"
            lede="Arrecadação, transição fiscal, IBS, CBS, FNDR e impactos nas finanças do Espírito Santo. Acompanhe o noticiário pelo olhar do Tesouro Estadual."
            right={
              <span style={{ fontSize: 12, fontFamily: "var(--ff-ui)", color: T.NAVY,
                opacity: 0.6, letterSpacing: "0.04em" }}>
                {radar.length} entradas
              </span>
            }
          />

          {/* Featured item */}
          <div style={{ marginTop: 32, borderTop: `3px solid ${T.NAVY}`, paddingTop: 24,
            borderBottom: `1px solid ${T.RULE}`, paddingBottom: 28 }}>
            <div style={{ display: "flex", gap: 14, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase", color: T.TEAL, fontWeight: 700 }}>
                {leadRadar.tag}
              </span>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "rgba(11,37,53,0.5)" }}>
                {leadRadar.date} {leadRadar.month} &nbsp;·&nbsp; {leadRadar.fonte}
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(22px,3vw,34px)",
              lineHeight: 1.1, color: T.NAVY, letterSpacing: "-0.012em", margin: "0 0 14px" }}>
              {leadRadar.titulo}
            </h3>
            <p style={{ fontFamily: "var(--ff-reading)", fontSize: 16, lineHeight: 1.55,
              color: "rgba(11,37,53,0.75)", margin: "0 0 22px", maxWidth: 700 }}>
              {leadRadar.descricao}
            </p>
            <button onClick={() => setModal(leadRadar)}
              style={{ background: T.NAVY, color: "#fff", padding: "11px 18px",
                fontFamily: "var(--ff-ui)", fontSize: 13, fontWeight: 600,
                border: "none", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8 }}>
              Ler análise completa
              <span style={{ fontFamily: "var(--ff-mono)", fontWeight: 400 }}>→</span>
            </button>
          </div>

          {/* Remaining items — same style as hero news list */}
          <div>
            {[secondRadar, ...restRadar].map((item) => (
              <div key={item.slug} onClick={() => setModal(item)}
                style={{ display: "flex", alignItems: "center", gap: 14,
                  padding: "16px 0", borderBottom: `1px solid ${T.RULE}`, cursor: "pointer" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9.5, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: T.TEAL, fontWeight: 700, marginBottom: 4 }}>
                    {item.tag} &nbsp;·&nbsp; {item.date} {item.month}
                  </div>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(16px,2vw,19px)",
                    lineHeight: 1.25, color: T.NAVY, marginBottom: 4 }}>
                    {item.titulo}
                  </div>
                  {item.descricao && (
                    <div style={{ fontFamily: "var(--ff-reading)", fontSize: 13, lineHeight: 1.5,
                      color: "rgba(11,37,53,0.6)",
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.descricao}
                    </div>
                  )}
                </div>
                <div style={{ color: "rgba(11,37,53,0.28)", fontSize: 22, flexShrink: 0 }}>›</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: T.NAVY, color: "rgba(255,255,255,0.78)",
        padding: "56px 56px 24px" }}>
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 44, background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
                    <path d="M10 1 L19 4 V13 C19 19, 14 24, 10 25 C 6 24, 1 19, 1 13 V4 Z"
                      stroke="#fff" strokeWidth="1" fill="none" />
                    <circle cx="10" cy="12" r="3" stroke="#fff" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: 18, color: "#fff", lineHeight: 1.2 }}>
                    Radar da Reforma Tributária
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 3,
                    fontFamily: "var(--ff-mono)" }}>
                    Tesouro Estadual · SEFAZ-ES
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: "var(--ff-reading)", fontSize: 14, lineHeight: 1.6,
                color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: 380 }}>
                Memória técnica do Tesouro Estadual sobre a Reforma Tributária do consumo
                — vista pelo Espírito Santo.
              </p>
            </div>

            {[
              { t: "Áreas",        l: ["Base da Reforma", "Estudos e Capacitação", "Radar Tesouro"] },
              { t: "Institucional", l: ["SEFAZ-ES", "Tesouro Estadual", "Portal da Transparência"] },
              { t: "Governo",      l: ["Governo ES", "Diário Oficial ES", "Ministério da Fazenda"] },
            ].map((col) => (
              <div key={col.t}>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: T.GOLD_LIGHT, fontWeight: 700, marginBottom: 16 }}>
                  {col.t}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {col.l.map((label) => (
                    <li key={label} style={{ marginBottom: 10 }}>
                      <a href="#" style={{ color: "rgba(255,255,255,0.78)",
                        textDecoration: "none", fontSize: 14,
                        fontFamily: "var(--ff-reading)" }}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: 22, fontFamily: "var(--ff-mono)", fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)", flexWrap: "wrap", gap: 12 }}>
            <span>© 2026 · Governo do Estado do Espírito Santo · SEFAZ-ES</span>
            <span>Boletim 023/2026 · Atualizado em 23 mai 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
