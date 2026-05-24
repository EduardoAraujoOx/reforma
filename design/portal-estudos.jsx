/* global React, PORTAL_TOKENS, PORTAL_DATA, SectionHead, FormatTag, ProfundidadePip, TemaPill, StatusFlag */

// ===== Estudos e Capacitação — biblioteca/sala de aula =====
// Background NAVY for visual contrast and to suggest "biblioteca": ambiente de estudo.
function EstudosECapacitacao() {
  const { NAVY, NAVY_SOFT, GOLD, GOLD_LIGHT, CREAM_LIGHT } = PORTAL_TOKENS;
  const items = PORTAL_DATA.estudos;
  const destaques = items.filter(i => i.destaque).slice(0, 2);
  const resto = items.filter(i => !destaques.includes(i));

  // Format icon for the "viewer" frame
  const FormatViewer = ({ formato }) => {
    const map = {
      "Vídeo": (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke={GOLD_LIGHT} strokeWidth="1.2" opacity="0.55" />
          <path d="M20 17 L33 24 L20 31 Z" fill={GOLD_LIGHT} />
        </svg>
      ),
      "Curso": (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="14" width="32" height="22" stroke={GOLD_LIGHT} strokeWidth="1.2" />
          <path d="M14 14 L14 36 M8 22 L40 22" stroke={GOLD_LIGHT} strokeWidth="1.2" opacity="0.6" />
        </svg>
      ),
    };
    return map[formato] || (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="8" width="28" height="34" stroke={GOLD_LIGHT} strokeWidth="1.2" />
        <path d="M16 18 L32 18 M16 24 L32 24 M16 30 L26 30" stroke={GOLD_LIGHT} strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  };

  return (
    <section id="estudos" style={{ background: NAVY, color: "#fff", padding: "80px 56px 84px" }}>
      <SectionHead
        kicker="02 · Estudos e Capacitação"
        title="Material para entender — e para operar."
        lede="Curadoria de vídeos, palestras, artigos e apresentações que ajudam o servidor a compreender a Reforma e a se preparar para conduzi-la. Cada item indica formato, duração e nível de profundidade."
        dark={true}
        right={
          <a href="#" style={{
            fontSize: 12, fontFamily: "system-ui, sans-serif", color: GOLD_LIGHT,
            textDecoration: "none", borderBottom: `1px solid ${GOLD}`, paddingBottom: 2,
          }}>Ver biblioteca completa →</a>
        }
      />

      {/* Featured row — 2 large viewer-style cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 36 }}>
        {destaques.map((it, i) => (
          <a key={i} href="#" style={{
            display: "block", textDecoration: "none", color: "#fff",
            border: "1px solid rgba(255,255,255,0.12)", background: NAVY_SOFT,
          }}>
            {/* Viewer area */}
            <div style={{
              aspectRatio: "16/9", background: `linear-gradient(135deg, ${NAVY_SOFT} 0%, #1f4a5e 100%)`,
              display: "grid", placeItems: "center", position: "relative",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}>
              {/* corner ticks */}
              {[
                {top:10,left:10,b:["L","T"]},
                {top:10,right:10,b:["R","T"]},
                {bottom:10,left:10,b:["L","B"]},
                {bottom:10,right:10,b:["R","B"]},
              ].map((c,k)=>(
                <div key={k} style={{
                  position:"absolute", ...c, width: 14, height: 14,
                  borderTop: c.b.includes("T") ? `1px solid ${GOLD_LIGHT}` : "none",
                  borderBottom: c.b.includes("B") ? `1px solid ${GOLD_LIGHT}` : "none",
                  borderLeft: c.b.includes("L") ? `1px solid ${GOLD_LIGHT}` : "none",
                  borderRight: c.b.includes("R") ? `1px solid ${GOLD_LIGHT}` : "none",
                }} />
              ))}
              <div style={{ display: "grid", placeItems: "center", gap: 14 }}>
                <FormatViewer formato={it.formato} />
                <span style={{
                  fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: GOLD_LIGHT, fontWeight: 700,
                }}>{it.formato} · {it.duracao || it.paginas}</span>
              </div>
              {/* watermark stripe */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
                background: GOLD, opacity: 0.85,
              }} />
            </div>
            <div style={{ padding: "24px 26px 26px" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
                <StatusFlag kind="destaque" />
                <TemaPill tema={it.tema} dark={true} />
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif", fontSize: 26,
                lineHeight: 1.18, margin: "0 0 12px", color: "#fff", textWrap: "balance",
              }}>{it.titulo}</h3>
              <p style={{
                fontFamily: "'Lora', Georgia, serif", fontSize: 15, lineHeight: 1.55,
                color: "rgba(255,255,255,0.72)", margin: "0 0 18px", textWrap: "pretty",
              }}>{it.descricao}</p>
              <div style={{
                display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap",
                paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.12)",
              }}>
                <ProfundidadePip level={it.profundidade} />
                <span style={{
                  fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}>{it.fonte}</span>
                <span style={{
                  marginLeft: "auto",
                  fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}>{it.data}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Index of remaining — typeset like a journal contents page */}
      <div style={{ marginTop: 56 }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          borderTop: "1px solid rgba(255,255,255,0.14)", paddingTop: 14,
        }}>
          <span style={{
            fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: GOLD_LIGHT, fontWeight: 700,
          }}>Índice da biblioteca</span>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            {["Todos","Vídeos","Artigos","Apresentações","Cursos"].map((f, i) => (
              <a key={f} href="#" style={{
                fontFamily: "system-ui, sans-serif", fontSize: 12,
                color: i === 0 ? GOLD_LIGHT : "rgba(255,255,255,0.65)",
                textDecoration: "none",
                borderBottom: i === 0 ? `1px solid ${GOLD}` : "1px solid transparent",
                paddingBottom: 2,
              }}>{f}</a>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 6 }}>
          {resto.map((it, i) => (
            <a key={i} href="#" style={{
              display: "grid",
              gridTemplateColumns: "44px 1.7fr 1fr auto auto",
              gap: 22, alignItems: "center",
              padding: "18px 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              textDecoration: "none", color: "#fff",
            }}>
              <span style={{
                fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11,
                color: GOLD_LIGHT, letterSpacing: "0.18em", fontWeight: 700,
              }}>{String(destaques.length + i + 1).padStart(2,"0")}</span>
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 19,
                  lineHeight: 1.2, marginBottom: 4, textWrap: "balance",
                }}>{it.titulo}</div>
                <div style={{
                  fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.45,
                  fontFamily: "'Lora', Georgia, serif",
                }}>{it.descricao}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <FormatTag formato={it.formato} dark={true} />
                <TemaPill tema={it.tema} dark={true} />
              </div>
              <ProfundidadePip level={it.profundidade} />
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}>{it.duracao || it.paginas}</div>
                <div style={{
                  fontFamily: "ui-monospace, Menlo, monospace", fontSize: 10,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)", marginTop: 3,
                }}>{it.data}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

window.EstudosECapacitacao = EstudosECapacitacao;
