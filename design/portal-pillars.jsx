/* global React, PORTAL_TOKENS, PORTAL_DATA, SectionHead, FormatTag, ProfundidadePip, TemaPill, StatusFlag */

// ===== Three pillars overview =====
// Sits between hero and the first content section.
// Establishes the mental model: três áreas + totais.
function PillarsOverview() {
  const { NAVY, GOLD, GOLD_LIGHT, CREAM, RULE } = PORTAL_TOKENS;
  const t = PORTAL_DATA.totais;
  const pillars = [
    {
      n: "01", titulo: "Base da Reforma",
      desc: "Legislação, atos normativos e documentos oficiais — o terreno em que todo o resto se apoia.",
      total: t.base, label: "documentos catalogados",
    },
    {
      n: "02", titulo: "Estudos e Capacitação",
      desc: "Vídeos, palestras, artigos, apresentações e notas técnicas. Conhecimento para entender e operar.",
      total: t.estudos, label: "materiais selecionados",
    },
    {
      n: "03", titulo: "Radar Tesouro",
      desc: "Notícias e movimentos sobre arrecadação, transição, IBS, Comitê Gestor, FNDR e impactos no ES.",
      total: t.radar, label: "atualizações no histórico",
    },
  ];
  return (
    <section style={{ background: CREAM, padding: "56px 56px 64px", borderTop: `1px solid ${RULE}` }}>
      <SectionHead
        kicker="Como o portal está organizado"
        title="Três áreas. Uma única referência para o servidor do Tesouro Estadual."
        lede="O Radar reúne, organiza e dá visibilidade ao conhecimento sobre a Reforma Tributária que já existe — espalhado em normas, palestras e notícias. Aqui ele vira memória técnica do Tesouro Estadual capixaba."
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: 36 }}>
        {pillars.map((p, i) => (
          <a key={p.n} href="#" style={{
            display: "block", textDecoration: "none", color: PORTAL_TOKENS.INK,
            padding: "0 28px 0 0", marginRight: i < 2 ? 28 : 0,
            borderRight: i < 2 ? `1px solid ${RULE}` : "none",
          }}>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12,
              color: GOLD, letterSpacing: "0.22em", marginBottom: 14, fontWeight: 700,
            }}>{p.n}</div>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 30,
              color: NAVY, lineHeight: 1.15, margin: "0 0 12px",
              textWrap: "balance",
            }}>{p.titulo}</div>
            <p style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: 15, lineHeight: 1.55,
              color: "rgba(11,37,53,0.78)", margin: "0 0 22px", textWrap: "pretty",
            }}>{p.desc}</p>
            <div style={{
              display: "flex", alignItems: "baseline", gap: 10,
              paddingTop: 14, borderTop: `1px solid ${RULE}`,
            }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: NAVY, lineHeight: 1 }}>
                {p.total}
              </span>
              <span style={{
                fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(11,37,53,0.55)",
              }}>{p.label}</span>
              <span style={{ marginLeft: "auto", color: NAVY, fontSize: 14, fontWeight: 600,
                fontFamily: "system-ui, sans-serif" }}>→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

window.PillarsOverview = PillarsOverview;
