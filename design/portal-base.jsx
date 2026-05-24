/* global React, PORTAL_TOKENS, PORTAL_DATA, SectionHead, FormatTag, ProfundidadePip, TemaPill, StatusFlag */

// ===== Base da Reforma — legislação como acervo documental =====
function BaseDaReforma() {
  const { NAVY, GOLD, RULE, CREAM_LIGHT, INK } = PORTAL_TOKENS;
  const items = PORTAL_DATA.base;
  const destaque = items.find(i => i.destaque);
  const lista = items.filter(i => i !== destaque);

  return (
    <section id="base" style={{ background: CREAM_LIGHT, padding: "72px 56px 80px" }}>
      <SectionHead
        kicker="01 · Base da Reforma"
        title="O terreno legal — onde tudo começa."
        lede="Emendas, leis complementares, decretos estaduais e atos do Comitê Gestor. Cada documento abaixo foi catalogado com seu tema, formato e nível de profundidade — para que o servidor encontre o que precisa sem garimpar."
        right={
          <a href="#" style={{
            fontSize: 12, fontFamily: "system-ui, sans-serif", color: NAVY,
            textDecoration: "none", borderBottom: `1px solid ${NAVY}`, paddingBottom: 2,
          }}>Ver acervo completo →</a>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 56, marginTop: 36 }}>
        {/* Destaque — large editorial card */}
        {destaque && (
          <article style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
              <StatusFlag kind="destaque" />
              <FormatTag formato={destaque.formato} />
              <TemaPill tema={destaque.tema} />
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 38,
              lineHeight: 1.1, letterSpacing: "-0.012em",
              margin: "0 0 18px", color: NAVY, textWrap: "balance",
            }}>{destaque.titulo}</h3>
            <p style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: 17.5, lineHeight: 1.55,
              color: "rgba(11,37,53,0.78)", margin: "0 0 26px", textWrap: "pretty",
            }}>{destaque.descricao}</p>
            <div style={{
              marginTop: "auto", display: "flex", alignItems: "center", gap: 22,
              paddingTop: 16, borderTop: `1px solid ${RULE}`, flexWrap: "wrap",
            }}>
              <ProfundidadePip level={destaque.profundidade} />
              <span style={{
                fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(11,37,53,0.55)",
              }}>Fonte · {destaque.fonte}</span>
              <span style={{
                fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(11,37,53,0.55)",
              }}>{destaque.data}</span>
              <a href="#" style={{
                marginLeft: "auto", color: NAVY, fontSize: 14, fontWeight: 600,
                fontFamily: "system-ui, sans-serif", textDecoration: "none",
                borderBottom: `1px solid ${NAVY}`, paddingBottom: 2,
              }}>Abrir documento →</a>
            </div>
          </article>
        )}

        {/* Lista — index-style entries */}
        <div>
          <div style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(11,37,53,0.55)", marginBottom: 12, fontWeight: 700,
          }}>Outros documentos</div>
          {lista.map((it, i) => (
            <a key={i} href="#" style={{
              display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "start",
              padding: "20px 0", borderTop: `1px solid ${RULE}`,
              textDecoration: "none", color: INK,
            }}>
              <span style={{
                fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
                color: GOLD, letterSpacing: "0.18em", fontWeight: 700, paddingTop: 3,
              }}>{String(i + 1).padStart(2,"0")}</span>
              <div>
                <div style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <FormatTag formato={it.formato} />
                  <TemaPill tema={it.tema} />
                  {it.novidade && <StatusFlag kind="novo" />}
                </div>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 19,
                  lineHeight: 1.2, color: NAVY, marginBottom: 6, textWrap: "balance",
                }}>{it.titulo}</div>
                <div style={{
                  fontFamily: "'Lora', Georgia, serif", fontSize: 14, lineHeight: 1.5,
                  color: "rgba(11,37,53,0.7)", margin: 0, textWrap: "pretty",
                }}>{it.descricao}</div>
                <div style={{
                  display: "flex", gap: 18, alignItems: "center", marginTop: 10, flexWrap: "wrap",
                }}>
                  <ProfundidadePip level={it.profundidade} />
                  {it.situacao && (
                    <span style={{
                      fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: PORTAL_TOKENS.TEAL, fontWeight: 700,
                    }}>● {it.situacao}</span>
                  )}
                </div>
              </div>
              <div style={{
                textAlign: "right", paddingTop: 3,
                fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "rgba(11,37,53,0.55)",
              }}>{it.data}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

window.BaseDaReforma = BaseDaReforma;
