/* global React, PORTAL_TOKENS, PORTAL_DATA, SectionHead */

// ===== Ciclo de Palestras — agenda viva =====
// Memória técnica em movimento. Próximo evento como peça editorial principal.
function CicloDePalestras() {
  const { NAVY, GOLD, GOLD_LIGHT, CREAM, RULE } = PORTAL_TOKENS;
  const c = PORTAL_DATA.ciclo;
  const p = c.proximo;

  return (
    <section id="ciclo" style={{ background: CREAM, padding: "80px 56px 88px" }}>
      <SectionHead
        kicker="Ciclo de Palestras Tesouro Estadual"
        title="A Reforma explicada por quem está conduzindo."
        lede="Encontros mensais com secretários, técnicos do Comitê Gestor e pesquisadores. Cada palestra é gravada e catalogada na biblioteca de Estudos e Capacitação."
        right={
          <span style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: GOLD, fontWeight: 700,
          }}>{c.edicao}</span>
        }
      />

      {/* Featured next event */}
      <div style={{
        marginTop: 36, display: "grid", gridTemplateColumns: "260px 1fr 280px",
        gap: 36, alignItems: "stretch",
        background: NAVY, color: "#fff",
      }}>
        {/* Date block */}
        <div style={{
          padding: "32px 24px", borderRight: "1px solid rgba(255,255,255,0.12)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: GOLD_LIGHT, fontWeight: 700, marginBottom: 14,
            }}>Próxima · nº {p.n}</div>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 78,
              lineHeight: 0.95, color: "#fff", letterSpacing: "-0.02em",
            }}>{p.data.dia}</div>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 24,
              lineHeight: 1.1, color: GOLD_LIGHT, marginTop: 6, fontStyle: "italic",
            }}>{p.data.mes} · {p.data.ano}</div>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)", marginTop: 14,
            }}>{p.data.hora}</div>
          </div>
          <div style={{
            marginTop: 32, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.12)",
            fontSize: 11, fontFamily: "ui-monospace, Menlo, monospace",
            color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em", textTransform: "uppercase",
          }}>
            <div style={{ marginBottom: 4 }}>{p.modalidade}</div>
            <div style={{ color: "rgba(255,255,255,0.45)", textTransform: "none", letterSpacing: 0 }}>{p.local}</div>
          </div>
        </div>

        {/* Talk */}
        <div style={{ padding: "32px 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 36,
            lineHeight: 1.1, letterSpacing: "-0.012em",
            margin: "0 0 22px", color: "#fff", textWrap: "balance", maxWidth: 580,
          }}>{p.titulo}</h3>

          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.12)",
          }}>
            {/* Avatar placeholder */}
            <div style={{
              width: 52, height: 52, borderRadius: 99,
              background: "rgba(255,255,255,0.08)",
              border: `1px solid ${GOLD}`, display: "grid", placeItems: "center",
              fontFamily: "'Playfair Display', serif", fontSize: 22, color: GOLD_LIGHT,
              fontStyle: "italic",
            }}>{p.palestrante.split(" ").map(s=>s[0]).slice(0,2).join("")}</div>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: 19, color: "#fff",
                lineHeight: 1.15,
              }}>{p.palestrante}</div>
              <div style={{
                fontSize: 13, color: "rgba(255,255,255,0.62)", marginTop: 3,
                fontFamily: "'Lora', Georgia, serif",
              }}>{p.cargo}</div>
            </div>
          </div>
        </div>

        {/* CTA panel */}
        <div style={{
          padding: "32px 24px", borderLeft: "1px solid rgba(255,255,255,0.12)",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: GOLD_LIGHT, fontWeight: 700, marginBottom: 10,
            }}>Inscrição aberta</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", lineHeight: 1.2 }}>
              Vagas limitadas no auditório · transmissão sem inscrição.
            </div>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <a href="#" style={{
              background: GOLD, color: NAVY, padding: "13px 16px",
              fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 700,
              letterSpacing: "0.04em", textTransform: "uppercase",
              textDecoration: "none", textAlign: "center",
            }}>Inscrever-se →</a>
            <a href="#" style={{
              color: "rgba(255,255,255,0.85)", padding: "12px 16px",
              fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600,
              textDecoration: "none", textAlign: "center",
              border: "1px solid rgba(255,255,255,0.3)",
            }}>Adicionar ao calendário</a>
          </div>
        </div>
      </div>

      {/* Upcoming line */}
      <div style={{ marginTop: 32 }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          borderTop: `1px solid ${RULE}`, paddingTop: 14, marginBottom: 6,
        }}>
          <span style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: NAVY, fontWeight: 700,
          }}>Próximos encontros</span>
          <a href="#" style={{
            fontSize: 12, fontFamily: "system-ui, sans-serif", color: NAVY,
            textDecoration: "none", borderBottom: `1px solid ${NAVY}`, paddingBottom: 2,
          }}>Ver agenda completa →</a>
        </div>

        {c.proximos.map((e, i) => (
          <a key={i} href="#" style={{
            display: "grid", gridTemplateColumns: "44px 180px 1fr 220px",
            gap: 22, alignItems: "center",
            padding: "20px 0", borderTop: `1px solid ${RULE}`,
            textDecoration: "none", color: PORTAL_TOKENS.INK,
          }}>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12,
              color: GOLD, letterSpacing: "0.18em", fontWeight: 700,
            }}>{e.n}</span>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: PORTAL_TOKENS.TEAL, fontWeight: 700,
            }}>{e.data}</span>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 20,
              lineHeight: 1.2, color: NAVY, textWrap: "balance",
            }}>{e.titulo}</div>
            <div style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: 14,
              color: "rgba(11,37,53,0.65)", textAlign: "right",
            }}>{e.palestrante}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

window.CicloDePalestras = CicloDePalestras;
