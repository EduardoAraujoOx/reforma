/* global React, BrazilRadar, PORTAL_TOKENS, PORTAL_DATA, FormatTag, ProfundidadePip, TemaPill */

// ===== Portal header (unified) =====
function PortalHeader({ active = "Início", compact = false }) {
  const { NAVY, GOLD, GOLD_LIGHT } = PORTAL_TOKENS;
  return (
    <header style={{
      background: NAVY, color: "#fff", padding: compact ? "12px 56px" : "16px 56px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 36, height: 44, background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)", display: "grid", placeItems: "center",
        }}>
          <svg width="20" height="26" viewBox="0 0 20 26" fill="none" aria-label="Brasão ES (placeholder)">
            <path d="M10 1 L19 4 V13 C19 19, 14 24, 10 25 C 6 24, 1 19, 1 13 V4 Z" stroke="#fff" strokeWidth="1" fill="none"/>
            <circle cx="10" cy="12" r="3" stroke="#fff" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.01em" }}>
            Radar da Reforma Tributária
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.62)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 2 }}>
            Tesouro Estadual · SEFAZ-ES
          </div>
        </div>
      </div>
      <nav style={{ display: "flex", gap: 28, fontSize: 14, alignItems: "center" }}>
        {["Início","Base da Reforma","Estudos e Capacitação","Radar Tesouro","Ciclo de Palestras","Sobre"].map((l) => (
          <a key={l} href="#" style={{
            color: l === active ? GOLD_LIGHT : "rgba(255,255,255,0.85)",
            textDecoration: "none",
            borderBottom: l === active ? `2px solid ${GOLD}` : "2px solid transparent",
            paddingBottom: 4,
          }}>{l}</a>
        ))}
        <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.18)", marginLeft: 6 }} />
        <a href="#" style={{
          color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: 12, fontFamily: "ui-monospace, Menlo, monospace", letterSpacing: "0.14em",
          textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.25)",
          padding: "8px 12px",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
          </svg>
          Buscar
        </a>
      </nav>
    </header>
  );
}

// ===== HERO — Variação A (manchete como capa) =====
function PortalHero() {
  const { NAVY, NAVY_SOFT, TEAL, GOLD, GOLD_LIGHT, CREAM_LIGHT, INK, RULE } = PORTAL_TOKENS;
  const m = PORTAL_DATA.manchete;
  return (
    <div style={{ background: CREAM_LIGHT, fontFamily: "'Lora', Georgia, serif", color: INK }}>
      {/* dateline / running head */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 56px", fontFamily: "ui-monospace, Menlo, monospace",
        fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(11,37,53,0.55)", borderBottom: `1px solid ${RULE}`,
      }}>
        <span>Vitória · ES &nbsp; · &nbsp; Boletim 023/2026 &nbsp; · &nbsp; sex, 23 mai 2026</span>
        <span style={{ color: GOLD }}>● Radar ativo · 12 atualizações esta semana</span>
      </div>

      <main style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 64, padding: "56px 56px 40px" }}>
        <article>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: NAVY, color: GOLD_LIGHT, padding: "6px 12px",
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600,
            }}>
              <span style={{ width: 6, height: 6, background: GOLD_LIGHT, borderRadius: 99 }} />
              Em destaque
            </span>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.18em", textTransform: "uppercase", color: TEAL, fontWeight: 600,
            }}>
              {m.tag}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: 64, lineHeight: 1.04, letterSpacing: "-0.012em",
            margin: "0 0 28px", color: NAVY, textWrap: "balance",
          }}>{m.titulo}</h1>

          <p style={{
            fontFamily: "'Lora', Georgia, serif", fontSize: 20, lineHeight: 1.5,
            color: "#2b2520", maxWidth: 720, margin: "0 0 32px", textWrap: "pretty",
          }}>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: GOLD, marginRight: 10, verticalAlign: "0.18em", fontWeight: 700,
            }}>Por que importa</span>
            {m.porQueImporta}
          </p>

          <div style={{
            display: "flex", alignItems: "stretch", gap: 24, marginBottom: 32,
            borderLeft: `3px solid ${GOLD}`, paddingLeft: 20,
          }}>
            {[
              ["Prazo crítico", m.prazo],
              ["Janela restante", m.janela],
              ["Impacto", m.impacto],
            ].map(([k, v], i, arr) => (
              <React.Fragment key={k}>
                <div>
                  <div style={{
                    fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "rgba(11,37,53,0.6)", marginBottom: 6,
                  }}>{k}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: NAVY, lineHeight: 1 }}>
                    {v}
                  </div>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, background: RULE }} />}
              </React.Fragment>
            ))}
          </div>

          <div style={{
            display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
            paddingBottom: 14, borderBottom: `1px solid ${RULE}`,
          }}>
            <a href="#" style={{
              background: NAVY, color: "#fff", padding: "14px 22px",
              fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 600,
              letterSpacing: "0.02em", textDecoration: "none", display: "inline-flex",
              alignItems: "center", gap: 10,
            }}>
              Ler análise completa
              <span style={{ fontFamily: "ui-monospace", fontWeight: 400 }}>→</span>
            </a>
            <a href="#" style={{
              color: NAVY, padding: "14px 4px", fontSize: 14, fontWeight: 600,
              fontFamily: "system-ui, sans-serif", textDecoration: "none",
              borderBottom: `1px solid ${NAVY}`,
            }}>Ver fonte: {m.fonte}</a>
          </div>

          {/* metadata strip */}
          <div style={{
            display: "flex", gap: 28, alignItems: "center", paddingTop: 14, flexWrap: "wrap",
          }}>
            <FormatTag formato={m.formato} />
            <TemaPill tema={m.tema} />
            <ProfundidadePip level={m.profundidade} />
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(11,37,53,0.55)", marginLeft: "auto",
            }}>
              Publicado em {m.data}
            </span>
          </div>
        </article>

        {/* RIGHT — radar as insignia */}
        <aside>
          <div style={{ background: NAVY, padding: "28px 24px 18px", border: `1px solid ${NAVY}` }}>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)", marginBottom: 4,
            }}>Radar federativo</div>
            <div style={{
              fontFamily: "'Playfair Display', serif", color: "#fff",
              fontSize: 20, lineHeight: 1.15, marginBottom: 12,
            }}>Foco em<br/>Espírito Santo</div>

            <div style={{ marginLeft: -10, marginRight: -10 }}>
              <BrazilRadar size={320} sweep={true} sweepSpeed={9}
                line="rgba(180,218,226,0.45)" dot="rgba(180,218,226,0.32)" />
            </div>

            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              marginTop: 8, paddingTop: 12,
              display: "grid", gap: 8, fontSize: 11,
              fontFamily: "system-ui, sans-serif", color: "rgba(255,255,255,0.7)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, background: GOLD_LIGHT, borderRadius: 99 }} />
                ES · ponto de vigilância ativa
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, background: "rgba(180,218,226,0.4)", borderRadius: 99 }} />
                26 UFs monitoradas
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 14, fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(11,37,53,0.55)", textAlign: "center",
          }}>Última varredura · há 12 min</div>
        </aside>
      </main>
    </div>
  );
}

window.PortalHeader = PortalHeader;
window.PortalHero = PortalHero;
