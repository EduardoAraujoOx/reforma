/* global React */
// ===== Shared portal primitives — tokens, badges, format glyphs =====

const PORTAL_TOKENS = {
  NAVY: "#0B2535",
  NAVY_SOFT: "#163749",
  TEAL: "#1A5068",
  GOLD: "#C9941A",
  GOLD_LIGHT: "#E8B84B",
  CREAM: "#F5F0E6",
  CREAM_LIGHT: "#FAF7F2",
  INK: "#1A1410",
  RULE: "rgba(11,37,53,0.14)",
  RULE_SOFT: "rgba(11,37,53,0.08)",
};

// Profundidade pip — 1, 2 or 3 filled bars
function ProfundidadePip({ level = "Introdutório" }) {
  const filled = level === "Especialista" ? 3 : level === "Aprofundado" ? 2 : 1;
  const { GOLD, RULE } = PORTAL_TOKENS;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: "rgba(11,37,53,0.7)",
    }}>
      <span style={{ display: "inline-flex", gap: 2 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width: 8, height: 3, background: i < filled ? GOLD : RULE,
          }} />
        ))}
      </span>
      {level}
    </span>
  );
}

// Format glyph — small SVG symbol per formato
const FORMAT_GLYPHS = {
  "Emenda Constitucional": "EC",
  "Lei Complementar": "LC",
  "Lei Complementar ": "LC",
  "Projeto de Lei": "PL",
  "Resolução": "RES",
  "Decreto Estadual": "DEC",
  "Vídeo": "VID",
  "Artigo técnico": "ART",
  "Nota técnica": "NT",
  "Apresentação": "APR",
  "Curso": "CUR",
};
function FormatTag({ formato, dark = false }) {
  const code = FORMAT_GLYPHS[formato] || formato.slice(0,3).toUpperCase();
  const { GOLD, GOLD_LIGHT, NAVY, RULE_SOFT } = PORTAL_TOKENS;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
      letterSpacing: "0.16em", textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.85)" : NAVY, fontWeight: 600,
    }}>
      <span style={{
        display: "inline-grid", placeItems: "center",
        width: 26, height: 18, fontSize: 9, fontWeight: 700,
        background: dark ? GOLD_LIGHT : GOLD, color: NAVY,
        letterSpacing: "0.08em",
      }}>{code}</span>
      {formato}
    </span>
  );
}

// Themed pill ("Tema: X")
function TemaPill({ tema, dark = false }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.7)" : "rgba(26,80,104,0.95)",
      fontWeight: 600,
    }}>
      <span style={{
        width: 4, height: 4, background: dark ? "rgba(255,255,255,0.55)" : PORTAL_TOKENS.TEAL,
        transform: "rotate(45deg)",
      }} />
      {tema}
    </span>
  );
}

// Section heading — newspaper-style two-line section opener
function SectionHead({ kicker, title, lede, dark = false, right }) {
  const { NAVY, GOLD, RULE } = PORTAL_TOKENS;
  const fg = dark ? "#fff" : NAVY;
  const muted = dark ? "rgba(255,255,255,0.65)" : "rgba(11,37,53,0.65)";
  const rule = dark ? "rgba(255,255,255,0.14)" : RULE;
  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderTop: `2px solid ${dark ? GOLD : NAVY}`, paddingTop: 10,
      }}>
        <span style={{
          fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
          letterSpacing: "0.24em", textTransform: "uppercase",
          color: dark ? GOLD : NAVY, fontWeight: 700,
        }}>{kicker}</span>
        {right}
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontSize: 44,
        fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.015em",
        margin: "12px 0 12px", color: fg, textWrap: "balance",
      }}>{title}</h2>
      {lede && (
        <p style={{
          fontFamily: "'Lora', Georgia, serif", fontSize: 17, lineHeight: 1.5,
          color: muted, maxWidth: 760, margin: 0, textWrap: "pretty",
        }}>{lede}</p>
      )}
      <div style={{ height: 1, background: rule, marginTop: 24 }} />
    </div>
  );
}

// Subtle badge for "Novo" / "Em destaque"
function StatusFlag({ kind = "novo" }) {
  const { GOLD, NAVY } = PORTAL_TOKENS;
  if (kind === "destaque") {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
        letterSpacing: "0.22em", textTransform: "uppercase",
        background: NAVY, color: "#fff", padding: "3px 7px", fontWeight: 700,
      }}>★ Destaque</span>
    );
  }
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
      letterSpacing: "0.22em", textTransform: "uppercase",
      color: GOLD, fontWeight: 700,
    }}>
      <span style={{ width: 6, height: 6, background: GOLD, borderRadius: 99,
        boxShadow: `0 0 8px ${GOLD}` }} />
      Novo
    </span>
  );
}

window.PORTAL_TOKENS = PORTAL_TOKENS;
window.ProfundidadePip = ProfundidadePip;
window.FormatTag = FormatTag;
window.TemaPill = TemaPill;
window.SectionHead = SectionHead;
window.StatusFlag = StatusFlag;
