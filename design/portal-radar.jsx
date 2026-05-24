/* global React, PORTAL_TOKENS, PORTAL_DATA, SectionHead */

// ===== Radar Tesouro — notícias e movimentos =====
// Newspaper feel: dateline + headline rail, with a "ticker" up top.
function RadarTesouro() {
  const { NAVY, TEAL, GOLD, RULE, CREAM_LIGHT, INK } = PORTAL_TOKENS;
  const items = PORTAL_DATA.radar;
  const lead = items[0];
  const segunda = items[1];
  const resto = items.slice(2);

  return (
    <section id="radar" style={{ background: CREAM_LIGHT, padding: "72px 56px 80px" }}>
      <SectionHead
        kicker="03 · Radar Tesouro"
        title="O que está se mexendo esta semana."
        lede="Arrecadação, transição fiscal, IBS, CBS, FNDR, Comitê Gestor e impactos nas finanças do Espírito Santo. O Radar acompanha o noticiário fiscal pelo olhar do Tesouro Estadual."
        right={
          <a href="#" style={{
            fontSize: 12, fontFamily: "system-ui, sans-serif", color: NAVY,
            textDecoration: "none", borderBottom: `1px solid ${NAVY}`, paddingBottom: 2,
          }}>Histórico completo →</a>
        }
      />

      {/* Ticker */}
      <div style={{
        marginTop: 28, padding: "12px 18px",
        border: `1px solid ${RULE}`, background: "#fff",
        display: "flex", alignItems: "center", gap: 22, overflow: "hidden",
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
        letterSpacing: "0.16em", textTransform: "uppercase",
      }}>
        <span style={{
          color: "#fff", background: NAVY, padding: "5px 10px", fontWeight: 700,
        }}>
          <span style={{
            display: "inline-block", width: 6, height: 6, background: GOLD,
            borderRadius: 99, marginRight: 8,
          }} />
          Ticker
        </span>
        <span style={{ color: TEAL, fontWeight: 700 }}>22 mai · CG-IBS define cronograma de homologação</span>
        <span style={{ width: 1, height: 14, background: RULE }} />
        <span style={{ color: TEAL, fontWeight: 700 }}>20 mai · Atacadistas ES projetam perda de R$ 9,8 bi</span>
        <span style={{ width: 1, height: 14, background: RULE }} />
        <span style={{ color: TEAL, fontWeight: 700 }}>17 mai · RFB libera leiaute técnico da CBS</span>
        <span style={{ marginLeft: "auto", color: "rgba(11,37,53,0.45)" }}>+ 142 no histórico</span>
      </div>

      {/* Top stories grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, marginTop: 36 }}>
        {/* Lead story */}
        <article>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: TEAL, fontWeight: 700,
            }}>{lead.kicker}</span>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(11,37,53,0.55)",
            }}>{lead.date} · {lead.fonte}</span>
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 38, lineHeight: 1.1,
            color: NAVY, letterSpacing: "-0.012em", margin: "0 0 16px",
            textWrap: "balance",
          }}>{lead.title}</h3>
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: 16.5, lineHeight: 1.55,
            color: "rgba(11,37,53,0.78)", margin: "0 0 18px", textWrap: "pretty",
          }}>
            O calendário publicado define janelas de teste para os sistemas tributários estaduais
            entre setembro de 2026 e março de 2027. SEFAZ-ES integra o grupo-piloto e deve apresentar
            ambiente de homologação em outubro.
          </p>
          <a href="#" style={{
            fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 600,
            color: NAVY, textDecoration: "none",
            borderBottom: `1px solid ${NAVY}`, paddingBottom: 2,
          }}>Ler matéria completa →</a>
        </article>

        {/* Secondary lead */}
        <article style={{ paddingLeft: 28, borderLeft: `1px solid ${RULE}` }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: GOLD, fontWeight: 700,
            }}>{segunda.kicker}</span>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(11,37,53,0.55)",
            }}>{segunda.date}</span>
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 26, lineHeight: 1.15,
            color: NAVY, margin: "0 0 12px", textWrap: "balance",
          }}>{segunda.title}</h3>
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: 14.5, lineHeight: 1.55,
            color: "rgba(11,37,53,0.7)", margin: "0 0 14px", textWrap: "pretty",
          }}>
            Estudo encomendado por entidades do setor projeta perda média anual de R$ 1,2 bi
            entre 2027 e 2033 se mantida a alíquota de referência preliminar.
          </p>

          <div style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(11,37,53,0.55)", marginBottom: 6,
          }}>Fonte · {segunda.fonte}</div>
        </article>
      </div>

      {/* Remaining list — broadsheet 2-col */}
      <div style={{
        marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr",
        columnGap: 56, rowGap: 0,
      }}>
        {resto.map((it, i) => (
          <a key={i} href="#" style={{
            display: "block", padding: "20px 0",
            borderTop: `1px solid ${RULE}`,
            textDecoration: "none", color: INK,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{
                fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: TEAL, fontWeight: 700,
              }}>{it.kicker}</span>
              <span style={{
                fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(11,37,53,0.5)",
              }}>{it.date} · {it.fonte}</span>
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 21,
              lineHeight: 1.18, color: NAVY, textWrap: "balance",
            }}>{it.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

window.RadarTesouro = RadarTesouro;
