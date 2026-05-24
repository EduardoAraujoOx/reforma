/* global React, BrazilRadar, PORTAL_TOKENS, PORTAL_DATA, FormatTag, ProfundidadePip, TemaPill, StatusFlag */

// ===== Portal Home — Mobile (390px) =====
// Same editorial system, mobile-first rhythm.

function MobileHeader() {
  const { NAVY, GOLD_LIGHT } = PORTAL_TOKENS;
  return (
    <header style={{
      background: NAVY, color: "#fff", padding: "14px 18px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="16" height="22" viewBox="0 0 20 26" fill="none">
          <path d="M10 1 L19 4 V13 C19 19, 14 24, 10 25 C 6 24, 1 19, 1 13 V4 Z" stroke="#fff" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="12" r="3" stroke="#fff" strokeWidth="1" fill="none"/>
        </svg>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700 }}>
            Radar da Reforma Tributária
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Tesouro Estadual · SEFAZ-ES
          </div>
        </div>
      </div>
      <div style={{ width: 24, display: "grid", gap: 4 }}>
        {[0,1,2].map(i=>(<div key={i} style={{ height: 1.5, background: "#fff" }} />))}
      </div>
    </header>
  );
}

function MobileHero() {
  const { NAVY, TEAL, GOLD, GOLD_LIGHT, CREAM_LIGHT, INK, RULE } = PORTAL_TOKENS;
  const m = PORTAL_DATA.manchete;
  return (
    <section style={{ background: CREAM_LIGHT, color: INK }}>
      <div style={{
        padding: "10px 18px", borderBottom: `1px solid ${RULE}`,
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(11,37,53,0.6)", display: "flex", justifyContent: "space-between",
      }}>
        <span>Sex, 23 mai 2026</span>
        <span style={{ color: GOLD }}>● Radar ativo</span>
      </div>

      <div style={{ padding: "22px 18px 26px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{
            background: NAVY, color: GOLD_LIGHT, padding: "5px 9px",
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
            letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700,
          }}>● Em destaque</span>
          <span style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: TEAL, fontWeight: 700,
          }}>{m.tag}</span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 700,
          fontSize: 30, lineHeight: 1.08, letterSpacing: "-0.01em",
          color: NAVY, margin: "0 0 18px", textWrap: "balance",
        }}>{m.titulo}</h1>

        <p style={{ fontSize: 15.5, lineHeight: 1.5, color: "#2b2520", margin: "0 0 20px", textWrap: "pretty" }}>
          <span style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9.5,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: GOLD, marginRight: 6, fontWeight: 700,
          }}>Por que importa</span>
          {m.porQueImporta}
        </p>

        <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 14, marginBottom: 22 }}>
          <div style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(11,37,53,0.6)", marginBottom: 4,
          }}>Prazo crítico</div>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: 22,
            color: NAVY, lineHeight: 1.1,
          }}>{m.prazo} <span style={{ color: GOLD, fontSize: 14 }}>· {m.janela}</span></div>
        </div>

        <a href="#" style={{
          display: "block", textAlign: "center",
          background: NAVY, color: "#fff", padding: "14px 0",
          fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 600,
          textDecoration: "none", marginBottom: 18,
        }}>Ler análise completa →</a>

        <div style={{
          background: NAVY, padding: "16px 14px",
          display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "center",
        }}>
          <div>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)", marginBottom: 4,
            }}>Radar federativo</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 15, lineHeight: 1.2 }}>
              Foco em<br/>Espírito Santo
            </div>
          </div>
          <div style={{ width: 90 }}>
            <BrazilRadar size={90} sweep={true} sweepSpeed={9}
              line="rgba(180,218,226,0.45)" dot="rgba(180,218,226,0.3)" rings={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

function MobilePillars() {
  const { NAVY, GOLD, RULE, CREAM } = PORTAL_TOKENS;
  const t = PORTAL_DATA.totais;
  const pillars = [
    { n: "01", t: "Base da Reforma", d: "Legislação, atos normativos e documentos oficiais.", c: t.base, l: "documentos" },
    { n: "02", t: "Estudos e Capacitação", d: "Vídeos, palestras, artigos e apresentações.", c: t.estudos, l: "materiais" },
    { n: "03", t: "Radar Tesouro", d: "Notícias sobre arrecadação, IBS, FNDR e impactos no ES.", c: t.radar, l: "atualizações" },
  ];
  return (
    <section style={{ background: CREAM, padding: "32px 18px 36px", borderTop: `1px solid ${RULE}` }}>
      <div style={{
        borderTop: `2px solid ${NAVY}`, paddingTop: 8, marginBottom: 14,
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
        letterSpacing: "0.24em", textTransform: "uppercase", color: NAVY, fontWeight: 700,
      }}>Como o portal está organizado</div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontSize: 26,
        lineHeight: 1.1, margin: "0 0 22px", color: NAVY, textWrap: "balance",
      }}>Três áreas. Uma referência única.</h2>

      {pillars.map((p) => (
        <a key={p.n} href="#" style={{
          display: "block", textDecoration: "none", color: PORTAL_TOKENS.INK,
          padding: "16px 0", borderTop: `1px solid ${RULE}`,
        }}>
          <div style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
            color: GOLD, letterSpacing: "0.2em", marginBottom: 6, fontWeight: 700,
          }}>{p.n}</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, lineHeight: 1.15, color: NAVY, marginBottom: 6 }}>{p.t}</div>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 13.5, lineHeight: 1.5, color: "rgba(11,37,53,0.7)", margin: "0 0 10px" }}>{p.d}</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: NAVY, lineHeight: 1 }}>{p.c}</span>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(11,37,53,0.55)",
            }}>{p.l}</span>
            <span style={{ marginLeft: "auto", color: NAVY, fontSize: 14 }}>→</span>
          </div>
        </a>
      ))}
    </section>
  );
}

function MobileBase() {
  const { NAVY, GOLD, RULE, CREAM_LIGHT, INK, TEAL } = PORTAL_TOKENS;
  const items = PORTAL_DATA.base.slice(0, 4);
  return (
    <section style={{ background: CREAM_LIGHT, padding: "32px 18px 36px" }}>
      <div style={{
        borderTop: `2px solid ${NAVY}`, paddingTop: 8, marginBottom: 12,
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
        letterSpacing: "0.24em", textTransform: "uppercase", color: NAVY, fontWeight: 700,
      }}>01 · Base da Reforma</div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontSize: 26,
        lineHeight: 1.1, margin: "0 0 8px", color: NAVY,
      }}>O terreno legal.</h2>
      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 14, lineHeight: 1.55, color: "rgba(11,37,53,0.7)", margin: "0 0 18px" }}>
        Emendas, leis complementares e atos do CG-IBS, catalogados por tema e profundidade.
      </p>

      {items.map((it, i) => (
        <a key={i} href="#" style={{
          display: "block", padding: "16px 0",
          borderTop: `1px solid ${RULE}`, textDecoration: "none", color: INK,
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center", flexWrap: "wrap" }}>
            <FormatTag formato={it.formato} />
            {it.novidade && <StatusFlag kind="novo" />}
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: 17,
            lineHeight: 1.2, color: NAVY, marginBottom: 6, textWrap: "balance",
          }}>{it.titulo}</div>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 13, lineHeight: 1.5, color: "rgba(11,37,53,0.7)", margin: "0 0 8px" }}>
            {it.descricao}
          </p>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <ProfundidadePip level={it.profundidade} />
            <span style={{
              marginLeft: "auto",
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(11,37,53,0.5)",
            }}>{it.data}</span>
          </div>
        </a>
      ))}
      <a href="#" style={{
        display: "block", marginTop: 14, color: NAVY, fontSize: 13, fontWeight: 600,
        fontFamily: "system-ui, sans-serif", textDecoration: "none",
        borderBottom: `1px solid ${NAVY}`, paddingBottom: 3, width: "fit-content",
      }}>Ver acervo completo →</a>
    </section>
  );
}

function MobileEstudos() {
  const { NAVY, NAVY_SOFT, GOLD, GOLD_LIGHT } = PORTAL_TOKENS;
  const dest = PORTAL_DATA.estudos.find(i => i.destaque);
  const others = PORTAL_DATA.estudos.filter(i => i !== dest).slice(0, 3);
  return (
    <section style={{ background: NAVY, color: "#fff", padding: "36px 18px 40px" }}>
      <div style={{
        borderTop: `2px solid ${GOLD}`, paddingTop: 8, marginBottom: 12,
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
        letterSpacing: "0.24em", textTransform: "uppercase", color: GOLD, fontWeight: 700,
      }}>02 · Estudos e Capacitação</div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontSize: 26,
        lineHeight: 1.1, margin: "0 0 8px", color: "#fff",
      }}>Para entender — e para operar.</h2>
      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.72)", margin: "0 0 22px" }}>
        Vídeos, artigos e palestras curados — com formato, duração e profundidade visíveis.
      </p>

      {dest && (
        <a href="#" style={{
          display: "block", textDecoration: "none", color: "#fff",
          background: NAVY_SOFT, border: "1px solid rgba(255,255,255,0.12)",
          marginBottom: 22,
        }}>
          <div style={{
            aspectRatio: "16/9", display: "grid", placeItems: "center", position: "relative",
            background: `linear-gradient(135deg, ${NAVY_SOFT} 0%, #1f4a5e 100%)`,
          }}>
            <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke={GOLD_LIGHT} strokeWidth="1.2" opacity="0.55" />
              <path d="M20 17 L33 24 L20 31 Z" fill={GOLD_LIGHT} />
            </svg>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: GOLD }} />
          </div>
          <div style={{ padding: "18px 16px 20px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <StatusFlag kind="destaque" />
              <span style={{
                fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
                letterSpacing: "0.18em", color: GOLD_LIGHT,
              }}>{dest.formato} · {dest.duracao || dest.paginas}</span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, lineHeight: 1.2, marginBottom: 8 }}>
              {dest.titulo}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5, fontFamily: "'Lora', Georgia, serif" }}>
              {dest.descricao}
            </div>
          </div>
        </a>
      )}

      {others.map((it, i) => (
        <a key={i} href="#" style={{
          display: "block", padding: "14px 0",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          textDecoration: "none", color: "#fff",
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <FormatTag formato={it.formato} dark={true} />
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, lineHeight: 1.2, marginBottom: 4 }}>{it.titulo}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <ProfundidadePip level={it.profundidade} />
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
              letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)",
            }}>{it.duracao || it.paginas}</span>
          </div>
        </a>
      ))}

      <a href="#" style={{
        display: "block", marginTop: 18, color: GOLD_LIGHT, fontSize: 13, fontWeight: 600,
        fontFamily: "system-ui, sans-serif", textDecoration: "none",
        borderBottom: `1px solid ${GOLD}`, paddingBottom: 3, width: "fit-content",
      }}>Ver biblioteca completa →</a>
    </section>
  );
}

function MobileRadar() {
  const { NAVY, TEAL, GOLD, RULE, CREAM_LIGHT, INK } = PORTAL_TOKENS;
  const items = PORTAL_DATA.radar.slice(0, 5);
  const lead = items[0];
  return (
    <section style={{ background: CREAM_LIGHT, padding: "32px 18px 36px" }}>
      <div style={{
        borderTop: `2px solid ${NAVY}`, paddingTop: 8, marginBottom: 12,
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
        letterSpacing: "0.24em", textTransform: "uppercase", color: NAVY, fontWeight: 700,
      }}>03 · Radar Tesouro</div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontSize: 26, lineHeight: 1.1,
        margin: "0 0 18px", color: NAVY,
      }}>O que está se mexendo esta semana.</h2>

      <a href="#" style={{ display: "block", textDecoration: "none", color: INK, marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
          <span style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: TEAL, fontWeight: 700,
          }}>{lead.kicker}</span>
          <span style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
            color: "rgba(11,37,53,0.5)", letterSpacing: "0.16em", textTransform: "uppercase",
          }}>{lead.date}</span>
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, lineHeight: 1.15, color: NAVY, textWrap: "balance" }}>
          {lead.title}
        </div>
      </a>

      {items.slice(1).map((it, i) => (
        <a key={i} href="#" style={{
          display: "block", padding: "14px 0",
          borderTop: `1px solid ${RULE}`, textDecoration: "none", color: INK,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: TEAL, fontWeight: 700,
            }}>{it.kicker}</span>
            <span style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
              color: "rgba(11,37,53,0.5)", letterSpacing: "0.16em", textTransform: "uppercase",
            }}>{it.date}</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, lineHeight: 1.2, color: NAVY, textWrap: "balance" }}>
            {it.title}
          </div>
        </a>
      ))}

      <a href="#" style={{
        display: "block", marginTop: 16, color: NAVY, fontSize: 13, fontWeight: 600,
        fontFamily: "system-ui, sans-serif", textDecoration: "none",
        borderBottom: `1px solid ${NAVY}`, paddingBottom: 3, width: "fit-content",
      }}>Histórico completo →</a>
    </section>
  );
}

function MobileCiclo() {
  const { NAVY, GOLD, GOLD_LIGHT } = PORTAL_TOKENS;
  const p = PORTAL_DATA.ciclo.proximo;
  return (
    <section style={{ background: NAVY, color: "#fff", padding: "32px 18px 36px" }}>
      <div style={{
        borderTop: `2px solid ${GOLD}`, paddingTop: 8, marginBottom: 12,
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
        letterSpacing: "0.24em", textTransform: "uppercase", color: GOLD, fontWeight: 700,
      }}>Ciclo de Palestras</div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontSize: 24, lineHeight: 1.15,
        margin: "0 0 20px", color: "#fff",
      }}>A Reforma por quem está conduzindo.</h2>

      <div style={{ display: "flex", gap: 18, alignItems: "baseline", marginBottom: 18 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, color: "#fff", lineHeight: 0.9 }}>
          {p.data.dia}
        </div>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: 18,
            fontStyle: "italic", color: GOLD_LIGHT,
          }}>{p.data.mes} · {p.data.ano}</div>
          <div style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)", marginTop: 4,
          }}>{p.data.hora}</div>
        </div>
      </div>

      <div style={{
        fontFamily: "'Playfair Display', serif", fontSize: 22, lineHeight: 1.15,
        color: "#fff", textWrap: "balance", margin: "0 0 16px",
      }}>{p.titulo}</div>

      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.12)", marginBottom: 18,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 99, border: `1px solid ${GOLD}`,
          display: "grid", placeItems: "center", color: GOLD_LIGHT,
          fontFamily: "'Playfair Display', serif", fontSize: 16, fontStyle: "italic",
        }}>{p.palestrante.split(" ").map(s=>s[0]).slice(0,2).join("")}</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#fff" }}>{p.palestrante}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "'Lora', Georgia, serif" }}>{p.cargo}</div>
        </div>
      </div>

      <a href="#" style={{
        display: "block", textAlign: "center",
        background: GOLD, color: NAVY, padding: "13px 0",
        fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 700,
        letterSpacing: "0.04em", textTransform: "uppercase",
        textDecoration: "none", marginBottom: 16,
      }}>Inscrever-se →</a>

      <div style={{
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.55)", textAlign: "center",
      }}>+ 3 encontros na agenda · ver completa</div>
    </section>
  );
}

function MobileFooter() {
  const { NAVY, GOLD_LIGHT } = PORTAL_TOKENS;
  return (
    <footer style={{ background: NAVY, color: "rgba(255,255,255,0.78)", padding: "28px 18px 22px" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#fff", marginBottom: 4 }}>
        Radar da Reforma Tributária
      </div>
      <div style={{
        fontSize: 10, color: "rgba(255,255,255,0.55)",
        letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18,
      }}>Tesouro Estadual · SEFAZ-ES</div>
      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,0.72)", margin: "0 0 18px" }}>
        Memória técnica do Tesouro Estadual sobre a Reforma Tributária do consumo — vista pelo ES.
      </p>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22,
      }}>
        {[
          ["Áreas", ["Base da Reforma", "Estudos", "Radar Tesouro", "Ciclo de Palestras"]],
          ["Institucional", ["Sobre", "Equipe", "Metodologia", "Sugerir conteúdo"]],
        ].map(([t, items], i) => (
          <div key={i}>
            <div style={{
              fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: GOLD_LIGHT, fontWeight: 700, marginBottom: 8,
            }}>{t}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {items.map((l, j) => (
                <li key={j} style={{ marginBottom: 6 }}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.78)", textDecoration: "none", fontSize: 12, fontFamily: "'Lora', Georgia, serif" }}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.12)",
        fontFamily: "ui-monospace, Menlo, monospace", fontSize: 9,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.45)",
      }}>© 2026 · Gov ES · SEFAZ-ES</div>
    </footer>
  );
}

function PortalHomeMobile() {
  return (
    <div style={{ width: 390, fontFamily: "'Lora', Georgia, serif" }}>
      <MobileHeader />
      <MobileHero />
      <MobilePillars />
      <MobileBase />
      <MobileEstudos />
      <MobileRadar />
      <MobileCiclo />
      <MobileFooter />
    </div>
  );
}

window.PortalHomeMobile = PortalHomeMobile;
