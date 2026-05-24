/* global React, PORTAL_TOKENS, PORTAL_DATA, BrazilRadar */

// ===== Curadoria / Sobre + Footer =====
function CuradoriaSobre() {
  const { NAVY, GOLD, GOLD_LIGHT, CREAM_LIGHT, RULE, TEAL } = PORTAL_TOKENS;
  const c = PORTAL_DATA.curadoria;
  return (
    <section id="sobre" style={{ background: CREAM_LIGHT, padding: "72px 56px 80px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "start" }}>
        <div>
          <div style={{
            borderTop: `2px solid ${NAVY}`, paddingTop: 10,
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
            letterSpacing: "0.24em", textTransform: "uppercase",
            color: NAVY, fontWeight: 700,
          }}>Como o portal é mantido</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 42,
            lineHeight: 1.08, letterSpacing: "-0.012em",
            margin: "12px 0 18px", color: NAVY, textWrap: "balance",
          }}>
            Curadoria simples, manual e <em>responsável</em>.
          </h2>
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: 17, lineHeight: 1.55,
            color: "rgba(11,37,53,0.78)", margin: "0 0 28px", textWrap: "pretty", maxWidth: 620,
          }}>
            Não somos um agregador automático. Cada material que entra no Radar passa pela
            curadoria da Subsecretaria de Estudos e Acompanhamento Fiscal — porque o que
            queremos não é volume, é referência.
          </p>

          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {c.pilares.map((t, i) => (
              <li key={i} style={{
                display: "grid", gridTemplateColumns: "36px 1fr", gap: 14,
                padding: "16px 0", borderTop: `1px solid ${RULE}`,
                fontFamily: "'Lora', Georgia, serif", fontSize: 15.5, lineHeight: 1.55,
                color: "rgba(11,37,53,0.85)",
              }}>
                <span style={{
                  fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12,
                  color: GOLD, letterSpacing: "0.16em", fontWeight: 700,
                }}>0{i+1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Sidebar — contato e cadência */}
        <aside style={{
          background: NAVY, color: "#fff", padding: "32px 32px 36px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: -80, top: -40, opacity: 0.28, pointerEvents: "none",
          }}>
            <BrazilRadar size={360} sweep={true} sweepSpeed={14}
              line="rgba(180,218,226,0.4)" dot="rgba(180,218,226,0.22)" rings={false} />
          </div>
          <div style={{ position: "relative" }}>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: GOLD_LIGHT, fontWeight: 700, marginBottom: 14,
            }}>Equipe responsável</div>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 22, lineHeight: 1.2,
              color: "#fff", maxWidth: 280, marginBottom: 8,
            }}>{c.equipe}</div>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.16em", color: "rgba(255,255,255,0.65)",
            }}>SEFAZ-ES</div>

            <hr style={{ border: 0, borderTop: "1px solid rgba(255,255,255,0.14)", margin: "26px 0" }} />

            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: GOLD_LIGHT, fontWeight: 700, marginBottom: 8,
            }}>Cadência</div>
            <div style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: 14, lineHeight: 1.55,
              color: "rgba(255,255,255,0.82)", marginBottom: 20,
            }}>{c.cadencia}</div>

            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: GOLD_LIGHT, fontWeight: 700, marginBottom: 8,
            }}>Sugerir conteúdo</div>
            <a href={`mailto:${c.contato}`} style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 13,
              color: "#fff", textDecoration: "none",
              borderBottom: `1px solid ${GOLD}`, paddingBottom: 2,
            }}>{c.contato}</a>

            <div style={{
              marginTop: 28, padding: 14, border: `1px solid ${GOLD}`,
              fontFamily: "'Lora', Georgia, serif", fontSize: 13, lineHeight: 1.5,
              color: "rgba(255,255,255,0.85)",
            }}>
              <strong style={{ color: GOLD_LIGHT, fontWeight: 600 }}>Por que importa.</strong>{" "}
              O Radar é a memória técnica do Tesouro Estadual sobre a Reforma — para que servidores
              que entrarem em 2030 ainda possam reconstruir o caminho que percorremos agora.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function PortalFooter() {
  const { NAVY, GOLD, GOLD_LIGHT } = PORTAL_TOKENS;
  return (
    <footer style={{ background: NAVY, color: "rgba(255,255,255,0.78)", padding: "56px 56px 24px" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
        gap: 48, paddingBottom: 36, borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 44, background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)", display: "grid", placeItems: "center",
            }}>
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
                <path d="M10 1 L19 4 V13 C19 19, 14 24, 10 25 C 6 24, 1 19, 1 13 V4 Z" stroke="#fff" strokeWidth="1" fill="none"/>
                <circle cx="10" cy="12" r="3" stroke="#fff" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff" }}>
                Radar da Reforma Tributária
              </div>
              <div style={{
                fontSize: 11, color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 3,
              }}>Tesouro Estadual · SEFAZ-ES</div>
            </div>
          </div>
          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: 14, lineHeight: 1.6,
            color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: 380,
          }}>
            Memória técnica do Tesouro Estadual sobre a Reforma Tributária do consumo
            — vista pelo Espírito Santo.
          </p>
        </div>

        {[
          { t: "Áreas", l: ["Base da Reforma", "Estudos e Capacitação", "Radar Tesouro", "Ciclo de Palestras"] },
          { t: "Institucional", l: ["Sobre o portal", "Equipe responsável", "Metodologia de curadoria", "Sugerir conteúdo"] },
          { t: "Governo", l: ["SEFAZ-ES", "Tesouro Estadual", "Portal da Transparência", "Diário Oficial"] },
        ].map((c, i) => (
          <div key={i}>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: GOLD_LIGHT, fontWeight: 700, marginBottom: 16,
            }}>{c.t}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {c.l.map((l, j) => (
                <li key={j} style={{ marginBottom: 10 }}>
                  <a href="#" style={{
                    color: "rgba(255,255,255,0.78)", textDecoration: "none",
                    fontSize: 14, fontFamily: "'Lora', Georgia, serif",
                  }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 22, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
        letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
        flexWrap: "wrap", gap: 12,
      }}>
        <span>© 2026 · Governo do Estado do Espírito Santo · SEFAZ-ES</span>
        <span>Boletim 023/2026 · Atualizado em 23 mai 2026 · 14h12</span>
      </div>
    </footer>
  );
}

window.CuradoriaSobre = CuradoriaSobre;
window.PortalFooter = PortalFooter;
