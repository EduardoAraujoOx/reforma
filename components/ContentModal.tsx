"use client";

import { useEffect } from "react";
import { T } from "./tokens";
import type { ContentItem } from "@/lib/content";

interface Props {
  item: ContentItem;
  onClose: () => void;
}

export default function ContentModal({ item, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.12em", color: T.GOLD_LIGHT, marginBottom: 10,
              fontFamily: "var(--ff-ui)" }}>
              {item.tag}{item.formato ? ` · ${item.formato}` : ""}
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none",
              color: T.LIGHT, fontSize: 20, cursor: "pointer", lineHeight: 1, flexShrink: 0 }}>✕</button>
          </div>
          <h2 style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(17px,2.5vw,22px)",
            fontWeight: 700, color: T.WHITE, lineHeight: 1.3, marginBottom: 6 }}>
            {item.titulo}
          </h2>
          {item.subtitulo && (
            <div style={{ fontSize: 12, color: T.LIGHT, fontFamily: "var(--ff-ui)" }}>
              {item.subtitulo}
            </div>
          )}
          {item.prazo && (
            <div style={{ marginTop: 10, fontSize: 11.5, color: T.GOLD_LIGHT,
              fontFamily: "var(--ff-ui)", fontWeight: 600 }}>
              {item.prazo}
            </div>
          )}
        </div>
        <div className="modal-body">
          {item.youtubeId && (
            <div className="modal-yt">
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                allowFullScreen
                title={item.titulo}
              />
            </div>
          )}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.12em", color: T.GOLD, marginBottom: 10,
              fontFamily: "var(--ff-ui)" }}>
              Por que importa para o Tesouro Estadual
            </div>
            <p className="reading-p">{item.porQueImporta}</p>
          </div>
          {item.descricao && (
            <p className="reading-p" style={{ marginBottom: 20 }}>{item.descricao}</p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10,
            padding: "12px 14px", background: T.CREAM_LIGHT, borderRadius: 6,
            marginBottom: 22, border: `1px solid ${T.BORDER}` }}>
            <span style={{ fontSize: 16 }}>📄</span>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: T.LIGHT, fontFamily: "var(--ff-ui)" }}>
                Fonte
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.NAVY,
                fontFamily: "var(--ff-ui)" }}>
                {item.fonte}
              </div>
            </div>
          </div>
          <a href={item.url} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, background: T.GOLD, color: T.WHITE, borderRadius: 5,
              padding: "13px 24px", fontSize: 13.5, fontWeight: 700,
              textDecoration: "none", fontFamily: "var(--ff-ui)" }}>
            {item.youtubeId ? "Assistir no YouTube →" : "Acessar fonte original →"}
          </a>
          <div style={{ fontSize: 11, color: T.LIGHT, textAlign: "center",
            marginTop: 8, fontFamily: "var(--ff-ui)" }}>
            Abre na fonte original · {item.fonte}
          </div>
        </div>
      </div>
    </div>
  );
}
