"use client";

import { useState, useEffect } from "react";
import { T } from "./tokens";
import { destaque, base, estudos, radar } from "@/lib/content";
import type { ContentItem } from "@/lib/content";
import Header from "./Header";
import BrazilRadarMap from "./BrazilRadarMap";
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

        {/* Dateline */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 56px", fontFamily: "var(--ff-mono)", fontSize: 11,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(11,37,53,0.55)", borderBottom: `1px solid ${T.RULE}` }}>
          <span>Vitória · ES &nbsp;·&nbsp; sáb, 24 mai 2026</span>
          <span className="dateline-right" style={{ color: T.GOLD }}>
            ● Radar ativo · 12 atualizações esta semana
          </span>
        </div>

        <div className="hero-inner">
          {/* Article */}
          <article>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8,
                background: T.NAVY, color: T.GOLD_LIGHT, padding: "6px 12px",
                fontFamily: "var(--ff-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, background: T.GOLD_LIGHT, borderRadius: 99 }} />
                Em destaque
              </span>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: T.TEAL, fontWeight: 600 }}>
                {destaque.tag}
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--ff-display)",
              fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 700,
              lineHeight: 1.08, letterSpacing: "-0.012em",
              margin: "0 0 14px", color: T.NAVY }}>
              {destaque.titulo}
            </h1>

            {destaque.subtitulo && (
              <p style={{ fontFamily: "var(--ff-reading)", fontSize: 16, lineHeight: 1.5,
                color: T.MID, margin: "0 0 20px", maxWidth: 600 }}>
                {destaque.subtitulo}
              </p>
            )}

            <p style={{ fontFamily: "var(--ff-reading)", fontSize: 17, lineHeight: 1.55,
              color: "#2b2520", maxWidth: 680, margin: "0 0 32px" }}>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: T.GOLD, marginRight: 10, fontWeight: 700 }}>
                Por que importa
              </span>
              {destaque.porQueImporta}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
              paddingBottom: 14, borderBottom: `1px solid ${T.RULE}` }}>
              <button onClick={() => setModal(destaque)}
                style={{ background: T.NAVY, color: "#fff", padding: "14px 22px",
                  fontFamily: "var(--ff-ui)", fontSize: 14, fontWeight: 600,
                  letterSpacing: "0.02em", border: "none", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 10 }}>
                Ler análise completa
                <span style={{ fontFamily: "var(--ff-mono)", fontWeight: 400 }}>→</span>
              </button>
              <a href={destaque.url} target="_blank" rel="noopener noreferrer"
                style={{ color: T.NAVY, padding: "14px 4px", fontSize: 14, fontWeight: 600,
                  fontFamily: "var(--ff-ui)", textDecoration: "none",
                  borderBottom: `1px solid ${T.NAVY}` }}>
                Ver fonte: {destaque.fonte.split("·")[0].trim()}
              </a>
            </div>

            {/* Metadata strip */}
            <div style={{ display: "flex", gap: 20, alignItems: "center",
              paddingTop: 14, flexWrap: "wrap" }}>
              {destaque.formato    && <FormatTag formato={destaque.formato} />}
              {destaque.tema       && <TemaPill tema={destaque.tema} />}
              {destaque.profundidade && <ProfundidadePip level={destaque.profundidade} />}
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(11,37,53,0.55)", marginLeft: "auto" }}>
                {destaque.data}
              </span>
            </div>
          </article>

          {/* Radar sidebar */}
          <aside className="hero-aside">
            <div style={{ background: T.NAVY, padding: "28px 24px 18px" }}>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>
                Radar federativo
              </div>
              <div style={{ fontFamily: "var(--ff-display)", color: "#fff",
                fontSize: 20, lineHeight: 1.15, marginBottom: 12 }}>
                Foco em<br />Espírito Santo
              </div>
              <div style={{ marginLeft: -10, marginRight: -10 }}>
                <BrazilRadarMap size={320} />
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)",
                marginTop: 8, paddingTop: 12, display: "grid", gap: 8,
                fontSize: 11, fontFamily: "var(--ff-ui)", color: "rgba(255,255,255,0.7)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, background: T.GOLD_LIGHT, borderRadius: 99 }} />
                  ES · ponto de vigilância ativa
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, background: "rgba(180,218,226,0.4)", borderRadius: 99 }} />
                  26 UFs monitoradas
                </div>
              </div>
            </div>
            <div style={{ marginTop: 14, fontFamily: "var(--ff-mono)", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(11,37,53,0.55)", textAlign: "center" }}>
              Última varredura · mai 2026
            </div>
          </aside>
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
            {estudos.map((item, i) => (
              <div key={item.slug} onClick={() => setModal(item)} className="estudos-index-row">
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
                  color: T.GOLD_LIGHT, letterSpacing: "0.18em", fontWeight: 700 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
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
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RADAR TESOURO ═══ */}
      <section id="radar" style={{ background: T.CREAM_LIGHT, borderBottom: `1px solid ${T.RULE}` }}>
        <div className="section-inner">
          <SectionHead
            kicker="03 · Radar Tesouro"
            title="Últimas notícias"
            lede="Arrecadação, transição fiscal, IBS, CBS, FNDR, Comitê Gestor e impactos nas finanças do Espírito Santo. O Radar acompanha o noticiário fiscal pelo olhar do Tesouro Estadual."
            right={
              <span style={{ fontSize: 12, fontFamily: "var(--ff-ui)", color: T.NAVY,
                opacity: 0.6, letterSpacing: "0.04em" }}>
                {radar.length} entradas
              </span>
            }
          />

          {/* Ticker */}
          <div style={{ marginTop: 28, padding: "12px 18px", border: `1px solid ${T.RULE}`,
            background: "#fff", display: "flex", alignItems: "center", gap: 22,
            overflow: "hidden", fontFamily: "var(--ff-mono)", fontSize: 11,
            letterSpacing: "0.16em", textTransform: "uppercase" }}>
            <span style={{ color: "#fff", background: T.NAVY, padding: "5px 10px",
              fontWeight: 700, flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, background: T.GOLD, borderRadius: 99 }} />
              Ticker
            </span>
            {radar.slice(0, 3).map((item, i) => (
              <span key={item.slug} style={{ color: T.TEAL, fontWeight: 700, flexShrink: 0 }}>
                {item.date} {item.month} · {item.titulo.slice(0, 52)}…
                {i < 2 && <span style={{ color: "rgba(11,37,53,0.2)", margin: "0 18px" }}>|</span>}
              </span>
            ))}
            <span style={{ marginLeft: "auto", color: "rgba(11,37,53,0.45)", flexShrink: 0 }}>
              + {radar.length} no histórico
            </span>
          </div>

          {/* Lead + secondary */}
          <div className="radar-main">
            <article>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: T.TEAL, fontWeight: 700 }}>
                  {leadRadar.tag}
                </span>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(11,37,53,0.55)" }}>
                  {leadRadar.date} {leadRadar.month} · {leadRadar.fonte}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(22px,3vw,34px)",
                lineHeight: 1.1, color: T.NAVY, letterSpacing: "-0.012em", margin: "0 0 16px" }}>
                {leadRadar.titulo}
              </h3>
              <p style={{ fontFamily: "var(--ff-reading)", fontSize: 16, lineHeight: 1.55,
                color: "rgba(11,37,53,0.78)", margin: "0 0 18px" }}>
                {leadRadar.descricao}
              </p>
              <button onClick={() => setModal(leadRadar)}
                style={{ fontFamily: "var(--ff-ui)", fontSize: 14, fontWeight: 600,
                  color: T.NAVY, background: "none", border: "none", cursor: "pointer",
                  borderBottom: `1px solid ${T.NAVY}`, paddingBottom: 2 }}>
                Ler análise completa →
              </button>
            </article>

            <article style={{ paddingLeft: 28, borderLeft: `1px solid ${T.RULE}` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: T.GOLD, fontWeight: 700 }}>
                  {secondRadar.tag}
                </span>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(11,37,53,0.55)" }}>
                  {secondRadar.date} {secondRadar.month}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(18px,2.5vw,24px)",
                lineHeight: 1.15, color: T.NAVY, margin: "0 0 12px" }}>
                {secondRadar.titulo}
              </h3>
              <p style={{ fontFamily: "var(--ff-reading)", fontSize: 14, lineHeight: 1.55,
                color: "rgba(11,37,53,0.7)", margin: "0 0 14px" }}>
                {secondRadar.descricao}
              </p>
              <button onClick={() => setModal(secondRadar)}
                style={{ fontFamily: "var(--ff-ui)", fontSize: 13, fontWeight: 600,
                  color: T.NAVY, background: "none", border: "none", cursor: "pointer",
                  borderBottom: `1px solid ${T.NAVY}`, paddingBottom: 2 }}>
                Ler mais →
              </button>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(11,37,53,0.55)", marginTop: 12 }}>
                Fonte · {secondRadar.fonte}
              </div>
            </article>
          </div>

          {/* Remaining grid */}
          <div className="radar-rest">
            {restRadar.map((item) => (
              <div key={item.slug} onClick={() => setModal(item)}
                style={{ padding: "20px 0", borderTop: `1px solid ${T.RULE}`, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 8, gap: 8 }}>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: T.TEAL, fontWeight: 700 }}>
                    {item.tag}
                  </span>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(11,37,53,0.5)" }}>
                    {item.date} {item.month}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--ff-display)", fontSize: 20,
                  lineHeight: 1.18, color: T.NAVY }}>
                  {item.titulo}
                </div>
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
