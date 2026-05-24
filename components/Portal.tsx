"use client";

import { useState, useEffect } from "react";
import { T } from "./tokens";
import { destaque, base, estudos, radar } from "@/lib/content";
import type { ContentItem } from "@/lib/content";
import Header from "./Header";
import BrazilRadarMap from "./BrazilRadarMap";
import ContentModal from "./ContentModal";

const YT_THUMB = (id: string) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

function BadgePulse({ label }: { label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
      textTransform: "uppercase", color: T.GOLD_LIGHT, fontFamily: "var(--ff-ui)" }}>
      <span className="dot-blink" style={{ width: 7, height: 7, borderRadius: "50%",
        background: T.GOLD_LIGHT, flexShrink: 0 }} />
      {label}
    </span>
  );
}

function ColHead({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 4 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 11.5, fontWeight: 800, textTransform: "uppercase",
          letterSpacing: "0.1em", color: T.NAVY, fontFamily: "var(--ff-ui)" }}>{title}</span>
      </div>
      <div style={{ fontSize: 11.5, color: T.MID, marginBottom: 10,
        fontFamily: "var(--ff-reading)" }}>{sub}</div>
      <div style={{ height: 2, background: T.GOLD, borderRadius: 1 }} />
    </div>
  );
}

function DocRow({ item, onClick }: { item: ContentItem; onClick: (i: ContentItem) => void }) {
  return (
    <div onClick={() => onClick(item)} style={{ display: "flex", alignItems: "center",
      gap: 10, padding: "12px 0", borderBottom: `1px solid ${T.BORDER}`, cursor: "pointer" }}>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.1em", color: T.GOLD, display: "block", marginBottom: 2,
          fontFamily: "var(--ff-ui)" }}>{item.tag}</span>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: T.NAVY, lineHeight: 1.35,
          fontFamily: "var(--ff-display)" }}>{item.titulo}</div>
        {item.subtitulo && (
          <div style={{ fontSize: 11.5, color: T.MID, marginTop: 2,
            fontFamily: "var(--ff-reading)" }}>{item.subtitulo}</div>
        )}
      </div>
      <span style={{ fontSize: 18, color: T.GOLD, flexShrink: 0 }}>›</span>
    </div>
  );
}

function StudyCard({ item, dark, onClick }: { item: ContentItem; dark?: boolean; onClick: (i: ContentItem) => void }) {
  return (
    <div onClick={() => onClick(item)} style={{ background: dark ? T.NAVY : T.CREAM,
      borderRadius: 7, overflow: "hidden", cursor: "pointer", flex: "1 1 0",
      display: "flex", flexDirection: "column" }}>
      {item.youtubeId && (
        <div style={{ position: "relative", paddingBottom: "56.25%", flexShrink: 0 }}>
          <img src={YT_THUMB(item.youtubeId)} alt={item.titulo}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(11,37,53,.38)",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.GOLD,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: T.WHITE, boxShadow: "0 2px 10px rgba(0,0,0,.4)" }}>▶</div>
          </div>
        </div>
      )}
      <div style={{ padding: "13px 13px 14px", flex: 1 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: dark ? T.GOLD_LIGHT : T.GOLD,
          marginBottom: 5, fontFamily: "var(--ff-ui)" }}>{item.tag}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.4,
          color: dark ? T.WHITE : T.NAVY, fontFamily: "var(--ff-display)" }}>{item.titulo}</div>
        {item.subtitulo && (
          <div style={{ fontSize: 11, marginTop: 5, lineHeight: 1.5,
            color: dark ? "#8FAAB8" : T.MID, fontFamily: "var(--ff-reading)" }}>{item.subtitulo}</div>
        )}
      </div>
    </div>
  );
}

function NewsRow({ item, onClick }: { item: ContentItem; onClick: (i: ContentItem) => void }) {
  return (
    <div onClick={() => onClick(item)} style={{ display: "flex", gap: 12, padding: "11px 0",
      borderBottom: `1px solid ${T.BORDER}`, cursor: "pointer" }}>
      <div style={{ textAlign: "center", minWidth: 28, flexShrink: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1,
          color: T.NAVY, fontFamily: "var(--ff-display)" }}>{item.date}</div>
        <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase",
          color: T.GOLD, letterSpacing: "0.1em", fontFamily: "var(--ff-ui)" }}>{item.month}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 9, color: T.LIGHT, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.1em", marginBottom: 2, fontFamily: "var(--ff-ui)" }}>{item.tag}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.NAVY, lineHeight: 1.45,
          fontFamily: "var(--ff-display)" }}>{item.titulo}</div>
      </div>
      <span style={{ fontSize: 17, color: T.GOLD, flexShrink: 0 }}>›</span>
    </div>
  );
}

export default function Portal() {
  const [modal, setModal] = useState<ContentItem | null>(null);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  return (
    <div style={{ fontFamily: "var(--ff-reading)", background: T.CREAM_LIGHT,
      minHeight: "100vh", color: T.NAVY }}>

      {modal && <ContentModal item={modal} onClose={() => setModal(null)} />}

      <Header />

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-text">
            <BadgePulse label="Uma iniciativa do Tesouro Estadual · SEFAZ-ES" />
            <h1 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(26px,3.8vw,36px)",
              fontWeight: 700, color: T.WHITE, margin: "14px 0 20px", lineHeight: 1.18 }}>
              Radar da Reforma Tributária
            </h1>
            <p style={{ fontFamily: "var(--ff-reading)", fontSize: 14,
              color: "#A8C8D8", lineHeight: 1.75, maxWidth: 420, marginBottom: 28 }}>
              Repositório de conteúdo selecionado sobre a Reforma Tributária,
              organizado para qualificação dos servidores do Tesouro Estadual
              e compreensão dos impactos fiscais, federativos e operacionais
              para o Espírito Santo.
            </p>
            <button
              onClick={() => document.getElementById("base")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)",
                color: T.WHITE, borderRadius: 4, padding: "10px 20px", fontSize: 12.5,
                fontFamily: "var(--ff-ui)", fontWeight: 600, cursor: "pointer" }}>
              Ver o conteúdo ↓
            </button>
          </div>
          <div className="hero-map"><BrazilRadarMap /></div>
        </div>
      </section>

      {/* DESTAQUE BAND */}
      <div className="destaque-band">
        <div className="destaque-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 16 }}>📌</span>
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.12em", color: T.GOLD, fontFamily: "var(--ff-ui)" }}>
              Em destaque
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: T.MID, fontFamily: "var(--ff-ui)", marginBottom: 2 }}>
              {destaque.tag}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.NAVY,
              fontFamily: "var(--ff-display)", lineHeight: 1.3 }}>
              {destaque.titulo}
            </div>
          </div>
          <button onClick={() => setModal(destaque)}
            style={{ background: T.NAVY, color: T.WHITE, border: "none",
              borderRadius: 4, padding: "9px 16px", fontSize: 12, fontWeight: 700,
              cursor: "pointer", fontFamily: "var(--ff-ui)", whiteSpace: "nowrap",
              flexShrink: 0 }}>
            Ver mais →
          </button>
        </div>
      </div>

      {/* THREE COLUMNS */}
      <div id="base" className="content-wrap" style={{ scrollMarginTop: 60 }}>
        <div className="three-cols">

          {/* Base da Reforma */}
          <div className="col">
            <ColHead icon="🏛️" title="Base da Reforma"
              sub="Legislação, normas e documentos fundantes." />
            {base.map(item => (
              <DocRow key={item.slug} item={item} onClick={setModal} />
            ))}
          </div>

          {/* Estudos e Capacitação */}
          <div className="col">
            <ColHead icon="🎓" title="Estudos e Capacitação"
              sub="Vídeos, artigos, notas técnicas e apresentações." />
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <StudyCard item={estudos[0]} dark onClick={setModal} />
              <StudyCard item={estudos[1]} onClick={setModal} />
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <StudyCard item={estudos[2]} onClick={setModal} />
              <StudyCard item={estudos[3]} dark onClick={setModal} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <StudyCard item={estudos[4]} onClick={setModal} />
              <StudyCard item={estudos[5]} onClick={setModal} />
            </div>
          </div>

          {/* Atualizações */}
          <div className="col">
            <ColHead icon="📡" title="Atualizações"
              sub="Notícias e movimentos relevantes para o Tesouro Estadual." />
            {radar.map(item => (
              <NewsRow key={item.slug} item={item} onClick={setModal} />
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${T.BORDER}`, marginTop: 40 }}>
        <div className="footer-inner">
          <div style={{ fontSize: 11, color: T.LIGHT, fontFamily: "var(--ff-ui)" }}>
            © 2026 · Subsecretaria do Tesouro Estadual · SEFAZ-ES
          </div>
          <div style={{ fontSize: 11, color: T.LIGHT, fontFamily: "var(--ff-ui)" }}>
            Conteúdo curado para fins de qualificação e acompanhamento da Reforma Tributária
          </div>
        </div>
      </footer>
    </div>
  );
}
