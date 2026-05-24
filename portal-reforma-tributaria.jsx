import { useState, useEffect } from "react";
import * as d3 from "d3";

/* ═══════════════════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════════════════ */
const C = {
  navy:"#0B2535", teal:"#1A5068", tealDark:"#0d3d52",
  gold:"#C9941A", goldLight:"#E8B84B",
  cream:"#F5F0E6", creamLight:"#FAF7F2",
  white:"#FFFFFF", mid:"#4A6070", light:"#8FA5B2",
  border:"#D6E4EC",
};

const BRASAO_URL =
  "https://cdn.es.gov.br/images/logo/governo/brasao/center-white/Brasao_Governo_800.png";

const YT_THUMB = (id) =>
  `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

/* ═══════════════════════════════════════════════════════════
   BRASÃO — imagem real com fallback SVG para ambientes
   que bloqueiam o CDN externo (ex: iframe de artefato)
═══════════════════════════════════════════════════════════ */
function Brasao({ height = 32 }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    /* Fallback: escudo estilizado em SVG inline */
    const h = height, w = Math.round(height * 0.72);
    return (
      <svg width={w} height={h} viewBox="0 0 36 50"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, opacity: 0.88 }}>
        {/* Escudo */}
        <path d="M2 2 H34 V30 C34 42 18 48 18 48 C18 48 2 42 2 30 Z"
          stroke="white" strokeWidth="1.8" fill="rgba(255,255,255,0.08)"
          strokeLinejoin="round"/>
        {/* Divisória horizontal */}
        <line x1="2" y1="18" x2="34" y2="18"
          stroke="white" strokeWidth="1" opacity=".55"/>
        {/* Pomba — corpo */}
        <ellipse cx="18" cy="11" rx="5" ry="3.5"
          fill="white" opacity=".92"/>
        {/* Cabeça */}
        <circle cx="22" cy="8.5" r="2.5" fill="white" opacity=".92"/>
        {/* Asa esquerda */}
        <path d="M13 11 C9 8 7 11 9 14 C11 12 13 12 13 11Z"
          fill="white" opacity=".85"/>
        {/* Cauda */}
        <path d="M13 12 L8 16 M13 11 L7 13"
          stroke="white" strokeWidth="0.9" opacity=".65" strokeLinecap="round"/>
        {/* Estrelas */}
        <text x="9"  y="36" fontSize="6" fill="white" opacity=".72">★</text>
        <text x="15" y="36" fontSize="6" fill="white" opacity=".72">★</text>
        <text x="21" y="36" fontSize="6" fill="white" opacity=".72">★</text>
        {/* ES */}
        <text x="18" y="45" fontSize="6.5" fill="white" opacity=".6"
          textAnchor="middle" fontFamily="system-ui" fontWeight="700"
          letterSpacing="0.08em">ES</text>
      </svg>
    );
  }

  return (
    <img
      src={BRASAO_URL}
      alt="Brasão do Governo do Espírito Santo"
      height={height}
      style={{ width: "auto", flexShrink: 0, opacity: 0.92 }}
      onError={() => setFailed(true)}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   CSS GLOBAL
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
:root {
  --ff-display: 'Playfair Display', Georgia, serif;
  --ff-reading: 'Lora', Georgia, serif;
  --ff-ui:      system-ui, -apple-system, sans-serif;
}

@keyframes radarSpin { to { transform: rotate(360deg); } }
@keyframes esPulse   { 0%,100%{opacity:.85} 50%{opacity:1} }
@keyframes dotBlink  { 0%,100%{opacity:.9}  50%{opacity:.22} }
@keyframes drawerIn  { from{transform:translateX(-100%)} to{transform:none} }
@keyframes overlayIn { from{opacity:0} to{opacity:1} }
@keyframes modalIn   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

.es-dot    { animation: esPulse   2s   ease-in-out infinite; }
.dot-blink { animation: dotBlink  2.2s ease-in-out infinite; }

/* ── HERO ── */
.hero-section { position:relative; overflow:hidden;
  background:linear-gradient(150deg,${C.navy} 0%,${C.teal} 65%,${C.tealDark} 100%); }
.hero-grid { max-width:980px; margin:0 auto;
  display:grid; grid-template-columns:1fr 400px;
  position:relative; z-index:1; padding:0 28px; }
.hero-text { padding:48px 36px 44px 0;
  display:flex; flex-direction:column; justify-content:center; }
.hero-map  { display:flex; align-items:center; justify-content:center; padding:20px 0; }
.hero-map svg { width:100%; height:auto; }

/* ── DESTAQUE BAND ── */
.destaque-band  { background:${C.cream}; border-bottom:1px solid ${C.border}; }
.destaque-inner { max-width:980px; margin:0 auto; padding:14px 28px;
  display:flex; align-items:center; gap:16px; }

/* ── COLUNAS ── */
.content-wrap { max-width:980px; margin:0 auto; }
.three-cols   { display:flex; background:${C.white};
  box-shadow:0 1px 4px rgba(0,0,0,.07); border-bottom:1px solid ${C.border}; }
.col          { flex:1; padding:28px 24px 22px; }
.col + .col   { border-left:1px solid ${C.border}; }

/* ── NAV ── */
.hamburger   { display:none !important; }
.nav-desktop { display:flex; }

/* ── DRAWER ── */
.drawer       { position:fixed; inset:0; z-index:200; display:flex; }
.drawer-bg    { position:absolute; inset:0; background:rgba(0,0,0,.5);
  animation:overlayIn .2s ease both; }
.drawer-panel { position:relative; z-index:1; width:78vw; max-width:290px;
  background:${C.navy}; height:100%; display:flex; flex-direction:column;
  animation:drawerIn .22s ease both; }

/* ── MODAL ── */
.modal-overlay { position:fixed; inset:0; z-index:300;
  background:rgba(5,18,30,.72); backdrop-filter:blur(3px);
  display:flex; align-items:center; justify-content:center;
  padding:16px; animation:overlayIn .2s ease both; }
.modal-box { background:${C.white}; border-radius:10px; overflow:hidden;
  max-width:640px; width:100%; max-height:90vh; overflow-y:auto;
  animation:modalIn .25s ease both; box-shadow:0 24px 64px rgba(0,0,0,.35); }
.modal-header { background:${C.navy}; padding:28px 28px 24px; }
.modal-body   { padding:28px; }
.modal-yt     { position:relative; padding-bottom:56.25%; height:0;
  overflow:hidden; border-radius:6px; margin-bottom:20px; background:#000; }
.modal-yt iframe { position:absolute; inset:0; width:100%; height:100%; border:none; }

/* ── LEITURA ── */
.reading-p { font-family:var(--ff-reading); font-size:14px;
  line-height:1.78; color:${C.mid}; }

/* ── MOBILE ── */
@media (max-width:680px) {
  .hamburger   { display:flex !important; }
  .nav-desktop { display:none  !important; }
  .hero-grid   { grid-template-columns:1fr; padding:0 16px; }
  .hero-text   { padding:28px 0 16px; }
  .hero-map    { padding:0 0 24px; opacity:.75; max-height:280px; overflow:hidden; }
  .hero-map svg{ max-width:280px; }
  .destaque-inner { flex-direction:column; align-items:flex-start; gap:10px; }
  .three-cols  { flex-direction:column; }
  .col + .col  { border-left:none; border-top:1px solid ${C.border}; }
  .col         { padding:22px 16px; }
  .modal-box   { max-height:95vh; }
  .modal-header{ padding:20px 18px 18px; }
  .modal-body  { padding:20px 18px; }
  .footer-inner{ flex-direction:column !important;
    align-items:flex-start !important; gap:10px !important; }
}
`;

/* ═══════════════════════════════════════════════════════════
   CONTEÚDO CURADO
═══════════════════════════════════════════════════════════ */
const CONTENT = {

  /* ── DESTAQUE ─────────────────────────────────────────────
     Recomendação do CG-IBS: manter fiscalização do ICMS até
     31/12/2026 para não perder posição no cálculo do IBS
  ─────────────────────────────────────────────────────────── */
  destaque: {
    slug:"cgibs-guia-fiscalizacao-icms-2026",
    tag:"CG-IBS · Alerta Operacional",
    titulo:"CG-IBS orienta estados a reforçarem fiscalização do ICMS até dezembro de 2026",
    prazo:"Prazo crítico: 31 de dezembro de 2026 — referência para o cálculo da alíquota-padrão do IBS",
    porQueImporta:"O Guia de Orientações do Pré-CG-IBS alerta que a arrecadação de ICMS até 31/12/2026 serve de base de cálculo para a alíquota-padrão do IBS a partir de 2029. Estados que perderem receita de ICMS nesse período fixarão uma alíquota menor de IBS, reduzindo permanentemente sua fatia na arrecadação compartilhada. Para o ES, que tem no setor atacadista 29% de toda a arrecadação do ICMS — com risco de perda de R$ 9,8 bilhões até 2033 —, este alerta é de máxima prioridade para o Tesouro Estadual.",
    fonte:"Comitê Gestor do IBS (cgibs.gov.br) · Pré-CG-IBS",
    formato:"Guia / Portal Web",
    url:"https://www.cgibs.gov.br/pre-comite-gestor-lanca-2-edicao-atualizada-do-guia-de-orientacoes-para-impactos-administrativos-da-reforma-tributaria",
  },

  /* ── BASE DA REFORMA ──────────────────────────────────────
     Documentos fundantes: legislação, normas e referências
  ─────────────────────────────────────────────────────────── */
  base:[
    { slug:"ec-132-2023", tag:"Constituição",
      titulo:"Emenda Constitucional 132/2023",
      subtitulo:"Texto constitucional — reforma do sistema tributário nacional",
      porQueImporta:"A EC 132 é o documento fundante da Reforma Tributária. Extingue ICMS, ISS, PIS e COFINS e institui o IBS, a CBS e o Imposto Seletivo. Define o período de transição 2026–2032 e as bases do Comitê Gestor e do FNDR. Leitura obrigatória para todo servidor do Tesouro.",
      fonte:"Presidência da República / Planalto",
      formato:"HTML",
      url:"https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm" },

    { slug:"lc-214-2025", tag:"Lei Complementar",
      titulo:"Lei Complementar 214/2025",
      subtitulo:"IBS, CBS, Imposto Seletivo, Split Payment e FNDR",
      porQueImporta:"Regulamenta os três novos tributos: alíquotas, fato gerador, regime de transição e Split Payment. Inclui os dispositivos sobre o FNDR — Fundo Nacional de Desenvolvimento Regional — que determinará as compensações para estados como o ES que dependem de arrecadação na origem.",
      fonte:"Presidência da República / Planalto",
      formato:"HTML",
      url:"https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm" },

    { slug:"lc-227-2026", tag:"Lei Complementar",
      titulo:"Lei Complementar 227/2026",
      subtitulo:"Criação formal do Comitê Gestor do IBS e regras de administração",
      porQueImporta:"Institui definitivamente o CG-IBS com 54 membros, regras de fiscalização, cobrança, contencioso administrativo e distribuição da arrecadação entre estados e municípios. Define como o ES participa das decisões do órgão que centralizará toda a arrecadação do IBS.",
      fonte:"Senado Federal / Diário Oficial da União",
      formato:"HTML",
      url:"https://www12.senado.leg.br/noticias/materias/2026/01/14/reforma-tributaria-lei-cria-comite-gestor-do-ibs-e-define-regras-do-imposto" },

    { slug:"normas-cgibs", tag:"CG-IBS",
      titulo:"Portal do Comitê Gestor do IBS",
      subtitulo:"Resoluções, guias, notas técnicas e obrigações acessórias",
      porQueImporta:"Canal oficial onde o CG-IBS publica todas as normas que a SEFAZ-ES deve implementar: Resolução nº 6 com as alíquotas-teste, guias de impactos administrativos, cadastro unificado e prazos de integração de sistemas. Monitoramento essencial para a gestão fiscal estadual.",
      fonte:"Comitê Gestor do IBS",
      formato:"Portal Web",
      url:"https://www.cgibs.gov.br" },

    { slug:"reforma-fazenda", tag:"Ministério da Fazenda",
      titulo:"Portal da Reforma Tributária — Ministério da Fazenda",
      subtitulo:"Regulamentação, LC 214/2025, DeRE e documentos oficiais",
      porQueImporta:"Reúne a produção normativa do Ministério da Fazenda: texto integral da LC 214/2025, documentos sobre a DeRE (nova obrigação acessória de abril de 2026), regulamento do IBS/CBS, perguntas frequentes e material de orientação para contribuintes e fiscos.",
      fonte:"Ministério da Fazenda",
      formato:"Portal Web",
      url:"https://www.gov.br/fazenda/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria" },

    { slug:"sefaz-es-comsefaz-2025", tag:"SEFAZ-ES",
      titulo:"ES sedia 51ª Reunião do Comsefaz e 199ª Reunião do Confaz",
      subtitulo:"Vitória, dezembro de 2025 — secretário Benício Costa anfitrião",
      porQueImporta:"O Espírito Santo sediou os últimos encontros nacionais dos secretários de fazenda em 2025, posicionando a SEFAZ-ES no centro das negociações sobre o PLP 108/2024 — que criaria o CG-IBS — e sobre o cenário fiscal dos estados na transição. Registro institucional relevante.",
      fonte:"SEFAZ-ES / Comsefaz",
      formato:"Notícia",
      url:"https://sefaz.es.gov.br/Notícia/reforma-tributaria-e-cenario-macroeconomico-dos-estados-sao-destaques-da-51a-reuniao-ordinaria-do-comsefaz-em-vitoria" },
  ],

  /* ── ESTUDOS E CAPACITAÇÃO ────────────────────────────────
     Vídeos, notas técnicas, estudos e análises
  ─────────────────────────────────────────────────────────── */
  estudos:[
    { slug:"regulamento-ibs-cbs-2026", tag:"Vídeo", hasPlay:true,
      youtubeId:"NrXf8xXT8Dk",
      titulo:"Regulamento do IBS e CBS: análise do Decreto 12.955/2026 e Resolução CGIBS 6",
      subtitulo:"Análise técnica · maio de 2026",
      porQueImporta:"Vídeo mais recente e diretamente relevante para operação do Tesouro Estadual em 2026. Analisa o regulamento geral do IBS e CBS publicado pelo CG-IBS, detalhando as obrigações de notas fiscais, prazos e o funcionamento do Sistema de Apuração Assistida.",
      fonte:"YouTube · maio de 2026",
      formato:"Vídeo · YouTube",
      url:"https://www.youtube.com/watch?v=NrXf8xXT8Dk" },

    { slug:"appy-poder360-2025", tag:"Vídeo", hasPlay:true,
      youtubeId:"oqXJofB6Kbk",
      titulo:"Bernard Appy: reforma tributária — regulamentação e próximos passos",
      subtitulo:"Entrevista ao Poder360 · abril de 2025",
      porQueImporta:"Bernard Appy, principal arquiteto da Reforma, explica o estágio de regulamentação após a LC 214/2025, o funcionamento do Split Payment e os desafios para estados e municípios na transição do ICMS para o IBS.",
      fonte:"Poder360 — YouTube",
      formato:"Vídeo · YouTube",
      url:"https://www.youtube.com/watch?v=oqXJofB6Kbk" },

    { slug:"ccif-notas-tecnicas", tag:"Notas Técnicas",
      titulo:"Notas Técnicas do CCiF sobre a Reforma Tributária",
      subtitulo:"Centro de Cidadania Fiscal — mais de 28 notas publicadas",
      porQueImporta:"O CCiF, organização que formulou a proposta original da EC 132, publicou mais de 28 notas técnicas cobrindo alíquotas, regimes diferenciados, guerra fiscal, FNDR, Comitê Gestor e período de transição. Fonte de referência técnica independente de maior profundidade disponível.",
      fonte:"Centro de Cidadania Fiscal (CCiF)",
      formato:"PDF / HTML",
      url:"https://ccif.com.br/notas-tecnicas-reforma-tributaria/" },

    { slug:"ifi-senado-estudo-19", tag:"Estudo Técnico",
      titulo:"Reforma Tributária: contexto, mudanças e impactos fiscais",
      subtitulo:"Estudo Especial nº 19 — Instituição Fiscal Independente (IFI) · março de 2024",
      porQueImporta:"Análise técnica independente do Senado Federal sobre os impactos fiscais da Reforma: projeção de alíquotas, impacto sobre arrecadação de estados e municípios, cronograma de transição e riscos de calibragem do IBS. Documento denso e essencial para planejamento do Tesouro.",
      fonte:"Instituição Fiscal Independente (IFI) / Senado Federal",
      formato:"PDF",
      url:"https://www2.senado.leg.br/bdsf/bitstream/handle/id/647648/EE19_2024.pdf" },

    { slug:"ipea-impactos-redistributivos", tag:"Estudo IPEA",
      titulo:"Impactos Redistributivos da Reforma Tributária: estimativas atualizadas",
      subtitulo:"Instituto de Pesquisa Econômica Aplicada (IPEA)",
      porQueImporta:"O IPEA modelou a redistribuição de receitas entre estados e municípios com a mudança do ICMS para o IBS. Estima que 60% dos estados ganham participação no bolo tributário — mas estados com forte base na arrecadação de origem, como o ES pelo modelo atacadista, podem registrar perdas expressivas.",
      fonte:"IPEA",
      formato:"Estudo / HTML",
      url:"https://www.ipea.gov.br/portal/categorias/45-todas-as-noticias/noticias/13935-reforma-tributaria-beneficiara-ao-menos-82-dos-municipios-e-60-dos-estados" },

    { slug:"fndr-risco-desvio", tag:"Análise",
      titulo:"Os novos fundos da reforma e seu custo federativo",
      subtitulo:"Análise crítica — ConJur · agosto de 2025",
      porQueImporta:"Análise publicada no Conjur sobre os riscos do FNDR e dos demais fundos criados pela EC 132. Aponta que a possibilidade de estados usarem recursos do FNDR para pagar dívidas com a União pode desvirtuar a finalidade original do fundo, comprometendo investimentos em infraestrutura e desenvolvimento regional.",
      fonte:"Consultor Jurídico (ConJur)",
      formato:"Artigo",
      url:"https://www.conjur.com.br/2025-ago-26/os-novos-fundos-da-reforma-tributaria-e-seu-custo-federativo/" },
  ],

  /* ── ATUALIZAÇÕES ─────────────────────────────────────────
     Notícias, análises e movimentos — foco no ES e no sistema
  ─────────────────────────────────────────────────────────── */
  radar:[
    { slug:"atacado-es-reforma-risco-9bi", date:"20", month:"Mai", tag:"ES · Impacto Fiscal",
      titulo:"Setor atacadista do ES projeta perda de R$ 9,8 bilhões com a Reforma até 2033",
      desc:"Estudo da Apex Research com o Sincades aponta que o atacado capixaba passou de 15% para 29% do ICMS estadual entre 2022 e 2025 — modelo baseado em incentivos que a Reforma extingue.",
      porQueImporta:"Esta é a ameaça fiscal mais concreta e quantificada para o ES. O setor atacadista é responsável por R$ 6,64 bilhões de ICMS anuais e R$ 1,66 bilhão em repasses a municípios. A extinção dos incentivos fiscais pelo IBS compromete diretamente esse modelo.",
      fonte:"Folha Vitória / Apex Research + Sincades",
      url:"https://www.folhavitoria.com.br/folha-business/atacado-capixaba-dobra-fatia-no-icms-e-chega-a-quase-30-da-arrecadacao/" },

    { slug:"alianca-evitar-prejuizo-es", date:"19", month:"Mai", tag:"ES · Governança",
      titulo:"Reforma tributária: governador anuncia grupo de trabalho para mitigar impactos no ES",
      desc:"Governador Ricardo Ferraço anuncia criação de grupo de trabalho para estudar alternativas ao modelo atacadista frente à extinção dos incentivos de ICMS.",
      porQueImporta:"Resposta institucional do governo estadual ao risco de R$ 8,3 bilhões apontado pelo Sincades. O grupo de trabalho envolvendo SEFAZ-ES é relevante para o Tesouro Estadual acompanhar.",
      fonte:"A Tribuna Online",
      url:"https://tribunaonline.com.br/economia/reforma-tributaria-alianca-para-evitar-prejuizo-ao-espirito-santo-302047" },

    { slug:"cgibs-resolucao6-decreto-2026", date:"30", month:"Abr", tag:"CG-IBS",
      titulo:"Publicados Decreto 12.955/2026 e Resolução CGIBS nº 6 com regulamento geral do IBS",
      desc:"A partir de agosto de 2026, empresas (exceto Simples Nacional) devem destacar IBS (0,1%) e CBS (0,9%) nas notas fiscais. Decreto regulamenta o sistema de apuração assistida.",
      porQueImporta:"Norma operacional mais urgente de 2026. Define as obrigações concretas que a SEFAZ-ES deve repassar aos contribuintes capixabas e implementar em seus sistemas de fiscalização.",
      fonte:"Comitê Gestor do IBS / Diário Oficial",
      url:"https://www.cgibs.gov.br" },

    { slug:"fndr-risco-dividas-estados", date:"20", month:"Fev", tag:"Federalismo Fiscal",
      titulo:"22 estados aderem ao Propag e podem usar FNDR para pagar dívidas com a União",
      desc:"Portaria MF 3.066/2025 permite uso de recursos do FNDR para pagamento de dívidas estaduais, gerando risco de desvio da finalidade original do fundo.",
      porQueImporta:"Caso o ES venha a aderir ao Propag, a destinação dos recursos do FNDR ao estado pode ser comprometida. Tema relevante para o planejamento de longo prazo do Tesouro Estadual.",
      fonte:"SINFRERJ / Molina Advogados",
      url:"https://sinfrerj.com.br/conteudo/10893/reforma-tributaria-fundo-nacional-de-desenvolvimento-regional-corre-risco-de-desvirtuamento" },

    { slug:"lc-227-cgibs-jan2026", date:"14", month:"Jan", tag:"Legislação",
      titulo:"LC 227/2026 é sancionada e cria definitivamente o Comitê Gestor do IBS",
      desc:"Lei institui o CG-IBS com 54 membros, regras de fiscalização, contencioso administrativo em duas instâncias e publicação de relatórios mensais de arrecadação e distribuição.",
      porQueImporta:"Marco regulatório que dá ao CG-IBS sua forma definitiva. Define os mecanismos de transparência e controle que permitirão ao Tesouro Estadual acompanhar os repasses do IBS.",
      fonte:"Senado Federal",
      url:"https://www12.senado.leg.br/noticias/materias/2026/01/14/reforma-tributaria-lei-cria-comite-gestor-do-ibs-e-define-regras-do-imposto" },

    { slug:"appy-poder-compra-10pc", date:"26", month:"Fev", tag:"Análise Macroeconômica",
      titulo:"Appy: Reforma Tributária deve elevar poder de compra dos brasileiros em 10% nos próximos 15 anos",
      desc:"Secretário extraordinário afirma que o impacto positivo sobre o PIB potencial do Brasil deve se acumular ao longo do período de transição até 2033.",
      porQueImporta:"Projeção macroeconômica relevante para o planejamento fiscal de longo prazo do Tesouro Estadual — especialmente para estimar o crescimento da base tributável do IBS após a transição.",
      fonte:"Ministério da Fazenda",
      url:"https://www.gov.br/fazenda/pt-br/assuntos/noticias/2025/fevereiro/appy-preve-aumento-de-10-no-poder-de-compra-com-reforma-tributaria" },
  ],
};

/* ═══════════════════════════════════════════════════════════
   MAPA DO BRASIL (D3)
═══════════════════════════════════════════════════════════ */
const BRAZIL_COORDS = [
  [-51.7,4.2],[-51.0,3.8],[-50.9,1.8],[-50.2,0.8],[-49.5,0.5],
  [-49.3,-0.5],[-49.0,-1.0],[-48.0,-1.5],[-46.5,-1.0],[-44.4,-2.5],
  [-42.8,-2.8],[-41.8,-3.0],[-38.5,-3.7],[-37.0,-4.9],[-35.2,-5.4],
  [-34.8,-7.1],[-35.0,-8.1],[-35.7,-9.6],[-37.1,-11.0],[-38.5,-13.0],
  [-39.0,-14.8],[-39.1,-16.4],[-39.3,-17.7],[-39.8,-18.8],[-40.3,-20.3],
  [-41.0,-21.5],[-41.8,-22.4],[-43.1,-22.9],[-44.3,-23.0],[-46.3,-24.0],
  [-47.5,-24.5],[-48.5,-25.5],[-48.5,-27.6],[-49.8,-29.3],[-51.1,-30.0],
  [-52.1,-32.0],[-53.4,-33.7],[-53.7,-33.5],[-55.0,-32.0],[-56.0,-30.8],
  [-58.1,-30.2],[-57.6,-29.5],[-55.8,-28.2],[-54.5,-26.3],[-55.8,-22.0],
  [-57.5,-18.0],[-58.5,-15.5],[-60.5,-14.0],[-62.0,-12.0],[-65.0,-10.5],
  [-68.0,-11.0],[-70.5,-9.5],[-73.0,-9.0],[-73.5,-7.0],[-72.5,-4.5],
  [-70.0,-2.5],[-68.0,-2.0],[-70.0,1.0],[-67.5,2.0],[-64.0,3.5],
  [-62.0,4.0],[-60.2,5.3],[-59.9,4.5],[-59.5,3.5],[-60.0,2.5],
  [-58.0,1.5],[-52.7,2.3],[-51.7,4.2],
];
const STATES = [
  {id:"RR",lon:-61.4,lat:2.0},{id:"AP",lon:-51.9,lat:1.4},
  {id:"AM",lon:-64.6,lat:-4.1},{id:"PA",lon:-52.9,lat:-3.9},
  {id:"MA",lon:-44.4,lat:-4.9},{id:"PI",lon:-42.8,lat:-7.7},
  {id:"CE",lon:-39.3,lat:-5.1},{id:"RN",lon:-36.7,lat:-5.8},
  {id:"PB",lon:-36.8,lat:-7.2},{id:"PE",lon:-37.9,lat:-8.4},
  {id:"AL",lon:-36.6,lat:-9.7},{id:"SE",lon:-37.4,lat:-10.6},
  {id:"BA",lon:-41.7,lat:-13.3},{id:"TO",lon:-48.3,lat:-10.2},
  {id:"RO",lon:-63.6,lat:-10.8},{id:"AC",lon:-70.5,lat:-9.0},
  {id:"MT",lon:-55.9,lat:-12.6},{id:"GO",lon:-49.6,lat:-16.0},
  {id:"DF",lon:-47.9,lat:-15.8},{id:"MG",lon:-44.5,lat:-18.5},
  {id:"MS",lon:-54.7,lat:-20.4},{id:"RJ",lon:-43.2,lat:-22.5},
  {id:"SP",lon:-48.5,lat:-22.3},{id:"PR",lon:-51.6,lat:-24.7},
  {id:"SC",lon:-50.0,lat:-27.3},{id:"RS",lon:-53.1,lat:-30.2},
];
const W=400, H=480;
const geoBR = { type:"Feature", geometry:{ type:"Polygon", coordinates:[BRAZIL_COORDS] } };
const projection = d3.geoMercator().fitSize([W,H], geoBR);
const pathGen    = d3.geoPath().projection(projection);
const brazilD    = pathGen(geoBR);
const [CX,CY]   = projection([-52.5,-14.5]);
const [ESX,ESY] = projection([-40.3,-20.3]);
const R=155, SIN45=Math.sin(Math.PI/4), COS45=Math.cos(Math.PI/4);
const statePts = STATES.map((s,i)=>({...s,xy:projection([s.lon,s.lat]),delay:(i*.31).toFixed(2)}));

function BrazilRadarMap() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sweepG" cx={CX} cy={CY} r={R} gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={C.gold} stopOpacity="0"/>
          <stop offset="60%"  stopColor={C.gold} stopOpacity="0.14"/>
          <stop offset="100%" stopColor={C.gold} stopOpacity="0.58"/>
        </radialGradient>
        <radialGradient id="esGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={C.gold} stopOpacity="0.45"/>
          <stop offset="100%" stopColor={C.gold} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <path d={brazilD} fill="#4AABB8" fillOpacity="0.09"
        stroke="#4AABB8" strokeWidth="1.4" strokeOpacity="0.45" strokeLinejoin="round"/>
      {[R,R*.74,R*.48,R*.24].map((r,i)=>(
        <circle key={i} cx={CX} cy={CY} r={r} fill="none"
          stroke="#4AABB8" strokeWidth="0.6" opacity="0.28"/>
      ))}
      {[0,45,90,135].map(a=>{
        const rad=a*Math.PI/180,dx=(R+6)*Math.cos(rad),dy=(R+6)*Math.sin(rad);
        return <line key={a} x1={CX-dx} y1={CY-dy} x2={CX+dx} y2={CY+dy}
          stroke="#4AABB8" strokeWidth="0.4" opacity="0.2"/>;
      })}
      <circle cx={CX} cy={CY} r="3.5" fill="#4AABB8" opacity="0.45"/>
      <g style={{animation:"radarSpin 7s linear infinite",
        transformOrigin:`${CX.toFixed(1)}px ${CY.toFixed(1)}px`}}>
        <path d={`M${CX.toFixed(1)},${CY.toFixed(1)} L${CX.toFixed(1)},${(CY-R).toFixed(1)}
          A${R},${R} 0 0 1 ${(CX+R*SIN45).toFixed(1)},${(CY-R*COS45).toFixed(1)} Z`}
          fill="url(#sweepG)" opacity=".95"/>
        <line x1={CX.toFixed(1)} y1={CY.toFixed(1)}
          x2={CX.toFixed(1)} y2={(CY-R).toFixed(1)}
          stroke={C.gold} strokeWidth="1.5" opacity=".8"/>
      </g>
      {statePts.map(s=>s.xy&&(
        <circle key={s.id} cx={s.xy[0].toFixed(1)} cy={s.xy[1].toFixed(1)} r="3"
          fill="#5BC8D4" opacity="0.28"
          style={{animation:`dotBlink 6s ${s.delay}s ease-in-out infinite`}}/>
      ))}
      <ellipse cx={ESX.toFixed(1)} cy={ESY.toFixed(1)} rx="22" ry="22" fill="url(#esGlow)"/>
      <circle cx={ESX.toFixed(1)} cy={ESY.toFixed(1)} r="10"
        fill="none" stroke={C.gold} strokeWidth="1.2" opacity="0">
        <animate attributeName="r" values="10;28" dur="2.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="2.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx={ESX.toFixed(1)} cy={ESY.toFixed(1)} r="7.5"
        fill="none" stroke={C.gold} strokeWidth="0.9" opacity="0.38"/>
      <circle className="es-dot" cx={ESX.toFixed(1)} cy={ESY.toFixed(1)} r="5"
        fill={C.gold} opacity="0.95"/>
      <text x={(ESX+9).toFixed(1)} y={(ESY-3).toFixed(1)}
        fontSize="9" fill={C.gold} opacity="0.95"
        fontFamily="system-ui" fontWeight="700" letterSpacing="0.06em">ES</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════════════════ */
function ContentModal({ item, onClose }) {
  useEffect(()=>{
    const h=e=>e.key==="Escape"&&onClose();
    window.addEventListener("keydown",h);
    return()=>window.removeEventListener("keydown",h);
  },[onClose]);
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div style={{display:"flex",justifyContent:"space-between",
            alignItems:"flex-start",gap:12}}>
            <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",
              letterSpacing:"0.12em",color:C.goldLight,marginBottom:10,
              fontFamily:"var(--ff-ui)"}}>{item.tag} · {item.formato}</div>
            <button onClick={onClose} style={{background:"none",border:"none",
              color:C.light,fontSize:20,cursor:"pointer",lineHeight:1,flexShrink:0}}>✕</button>
          </div>
          <h2 style={{fontFamily:"var(--ff-display)",
            fontSize:"clamp(17px,2.5vw,22px)",fontWeight:700,
            color:C.white,lineHeight:1.3,marginBottom:6}}>{item.titulo}</h2>
          {item.subtitulo&&(
            <div style={{fontSize:12,color:C.light,fontFamily:"var(--ff-ui)"}}>{item.subtitulo}</div>
          )}
          {item.prazo&&(
            <div style={{marginTop:10,fontSize:11.5,color:C.goldLight,
              fontFamily:"var(--ff-ui)",fontWeight:600}}>{item.prazo}</div>
          )}
        </div>
        <div className="modal-body">
          {item.youtubeId&&(
            <div className="modal-yt">
              <iframe src={`https://www.youtube.com/embed/${item.youtubeId}`}
                allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                allowFullScreen title={item.titulo}/>
            </div>
          )}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",
              letterSpacing:"0.12em",color:C.gold,marginBottom:10,
              fontFamily:"var(--ff-ui)"}}>Por que importa para o Tesouro Estadual</div>
            <p className="reading-p">{item.porQueImporta}</p>
          </div>
          {item.desc&&<p className="reading-p" style={{marginBottom:20}}>{item.desc}</p>}
          <div style={{display:"flex",alignItems:"center",gap:10,
            padding:"12px 14px",background:C.creamLight,borderRadius:6,
            marginBottom:22,border:`1px solid ${C.border}`}}>
            <span style={{fontSize:16}}>📄</span>
            <div>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",
                letterSpacing:"0.1em",color:C.light,fontFamily:"var(--ff-ui)"}}>Fonte</div>
              <div style={{fontSize:13,fontWeight:600,color:C.navy,
                fontFamily:"var(--ff-ui)"}}>{item.fonte}</div>
            </div>
          </div>
          <a href={item.url} target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",justifyContent:"center",
              gap:8,background:C.gold,color:C.white,borderRadius:5,
              padding:"13px 24px",fontSize:13.5,fontWeight:700,
              textDecoration:"none",fontFamily:"var(--ff-ui)"}}>
            {item.youtubeId?"Assistir no YouTube →":"Acessar fonte original →"}
          </a>
          <div style={{fontSize:11,color:C.light,textAlign:"center",
            marginTop:8,fontFamily:"var(--ff-ui)"}}>
            Abre na fonte original · {item.fonte}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTES MENORES
═══════════════════════════════════════════════════════════ */
function BadgePulse({label}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:6,
      fontSize:10,fontWeight:700,letterSpacing:"0.14em",
      textTransform:"uppercase",color:C.goldLight,fontFamily:"var(--ff-ui)"}}>
      <span className="dot-blink" style={{width:7,height:7,borderRadius:"50%",
        background:C.goldLight,flexShrink:0}}/>{label}
    </span>
  );
}

function ColHead({icon,title,sub}){
  return(
    <div style={{marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:4}}>
        <span style={{fontSize:18}}>{icon}</span>
        <span style={{fontSize:11.5,fontWeight:800,textTransform:"uppercase",
          letterSpacing:"0.1em",color:C.navy,fontFamily:"var(--ff-ui)"}}>{title}</span>
      </div>
      <div style={{fontSize:11.5,color:C.mid,marginBottom:10,
        fontFamily:"var(--ff-reading)"}}>{sub}</div>
      <div style={{height:2,background:C.gold,borderRadius:1}}/>
    </div>
  );
}

function DocRow({item,onClick}){
  return(
    <div onClick={()=>onClick(item)} style={{display:"flex",alignItems:"center",
      gap:10,padding:"12px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
      <div style={{flex:1}}>
        <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",
          letterSpacing:"0.1em",color:C.gold,display:"block",marginBottom:2,
          fontFamily:"var(--ff-ui)"}}>{item.tag}</span>
        <div style={{fontSize:13.5,fontWeight:600,color:C.navy,lineHeight:1.35,
          fontFamily:"var(--ff-display)"}}>{item.titulo}</div>
        <div style={{fontSize:11.5,color:C.mid,marginTop:2,
          fontFamily:"var(--ff-reading)"}}>{item.subtitulo}</div>
      </div>
      <span style={{fontSize:18,color:C.gold,flexShrink:0}}>›</span>
    </div>
  );
}

function StudyCard({item,dark,onClick}){
  const hasThumb=item.youtubeId;
  return(
    <div onClick={()=>onClick(item)} style={{background:dark?C.navy:C.cream,
      borderRadius:7,overflow:"hidden",cursor:"pointer",flex:"1 1 0",
      display:"flex",flexDirection:"column"}}>
      {hasThumb&&(
        <div style={{position:"relative",paddingBottom:"56.25%",flexShrink:0}}>
          <img src={YT_THUMB(item.youtubeId)} alt={item.titulo}
            style={{position:"absolute",inset:0,width:"100%",height:"100%",
              objectFit:"cover",display:"block"}}/>
          <div style={{position:"absolute",inset:0,
            background:"rgba(11,37,53,.38)",
            display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:36,height:36,borderRadius:"50%",
              background:C.gold,display:"flex",alignItems:"center",
              justifyContent:"center",fontSize:14,color:C.white,
              boxShadow:"0 2px 10px rgba(0,0,0,.4)"}}>▶</div>
          </div>
        </div>
      )}
      <div style={{padding:"13px 13px 14px",flex:1}}>
        {!hasThumb&&item.hasPlay&&(
          <div style={{width:26,height:26,borderRadius:"50%",background:C.gold,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:10,color:C.white,marginBottom:8}}>▶</div>
        )}
        <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.12em",
          textTransform:"uppercase",color:dark?C.goldLight:C.gold,
          marginBottom:5,fontFamily:"var(--ff-ui)"}}>{item.tag}</div>
        <div style={{fontSize:12.5,fontWeight:600,lineHeight:1.4,
          color:dark?C.white:C.navy,fontFamily:"var(--ff-display)"}}>{item.titulo}</div>
        <div style={{fontSize:11,marginTop:5,lineHeight:1.5,
          color:dark?"#8FAAB8":C.mid,fontFamily:"var(--ff-reading)"}}>{item.subtitulo}</div>
      </div>
    </div>
  );
}

function NewsRow({item,onClick}){
  return(
    <div onClick={()=>onClick(item)} style={{display:"flex",gap:12,padding:"11px 0",
      borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
      <div style={{textAlign:"center",minWidth:28,flexShrink:0}}>
        <div style={{fontSize:18,fontWeight:800,lineHeight:1,
          color:C.navy,fontFamily:"var(--ff-display)"}}>{item.date}</div>
        <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",
          color:C.gold,letterSpacing:"0.1em",fontFamily:"var(--ff-ui)"}}>{item.month}</div>
      </div>
      <div style={{flex:1}}>
        <div style={{fontSize:9,color:C.light,fontWeight:700,textTransform:"uppercase",
          letterSpacing:"0.1em",marginBottom:2,fontFamily:"var(--ff-ui)"}}>{item.tag}</div>
        <div style={{fontSize:13,fontWeight:600,color:C.navy,lineHeight:1.45,
          fontFamily:"var(--ff-display)"}}>{item.titulo}</div>
      </div>
      <span style={{fontSize:17,color:C.gold,flexShrink:0}}>›</span>
    </div>
  );
}

function MoreBtn({label}){
  return(
    <button style={{background:"none",border:"none",color:C.gold,
      fontSize:12,fontWeight:700,cursor:"pointer",padding:"14px 0 2px",
      display:"block",fontFamily:"var(--ff-ui)"}}>{label} →</button>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════ */
export default function PortalReformaTributaria(){
  const [modal,      setModal]      = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNav,  setActiveNav]  = useState("Início");

  useEffect(()=>{
    document.body.style.overflow=(drawerOpen||modal)?"hidden":"";
    return()=>{document.body.style.overflow="";};
  },[drawerOpen,modal]);

  const NAV=["Início","Base da Reforma","Estudos e Capacitação","Atualizações"];

  return(
    <div style={{fontFamily:"var(--ff-reading)",background:C.creamLight,
      minHeight:"100vh",color:C.navy}}>
      <style>{CSS}</style>

      {/* DRAWER */}
      {drawerOpen&&(
        <div className="drawer">
          <div className="drawer-bg" onClick={()=>setDrawerOpen(false)}/>
          <nav className="drawer-panel">
            <div style={{display:"flex",alignItems:"center",
              justifyContent:"space-between",padding:"20px 20px 18px",
              borderBottom:"1px solid rgba(255,255,255,.1)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <Brasao height={28}/>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:C.white,
                    fontFamily:"var(--ff-display)"}}>Radar da Reforma</div>
                  <div style={{fontSize:10,color:C.light,fontFamily:"var(--ff-ui)"}}>
                    Tesouro Estadual · SEFAZ-ES</div>
                </div>
              </div>
              <button onClick={()=>setDrawerOpen(false)}
                style={{background:"none",border:"none",
                  color:C.light,fontSize:20,cursor:"pointer"}}>✕</button>
            </div>
            {NAV.map(item=>(
              <button key={item}
                onClick={()=>{setActiveNav(item);setDrawerOpen(false);}}
                style={{background:"none",border:"none",fontFamily:"var(--ff-ui)",
                  fontSize:13.5,color:activeNav===item?C.gold:C.light,
                  fontWeight:activeNav===item?700:400,
                  padding:"14px 24px",textAlign:"left",cursor:"pointer",
                  borderBottom:"1px solid rgba(255,255,255,.06)",
                  borderLeft:activeNav===item?`3px solid ${C.gold}`:"3px solid transparent"}}>
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}

      {modal&&<ContentModal item={modal} onClose={()=>setModal(null)}/>}

      {/* HEADER */}
      <header style={{background:C.navy,height:54,position:"sticky",
        top:0,zIndex:100,boxShadow:"0 2px 16px rgba(0,0,0,.32)"}}>
        <div style={{maxWidth:980,margin:"0 auto",height:"100%",
          display:"flex",alignItems:"center",padding:"0 28px",gap:16}}>

          <button className="hamburger" onClick={()=>setDrawerOpen(true)}
            style={{background:"none",border:"none",color:C.light,
              fontSize:20,cursor:"pointer",display:"flex",
              alignItems:"center",padding:4,flexShrink:0}}>☰</button>

          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            <Brasao height={32}/>
            <div>
              <div style={{fontSize:15,fontWeight:700,color:C.white,
                lineHeight:1.15,fontFamily:"var(--ff-display)",
                letterSpacing:"-0.01em"}}>Radar da Reforma Tributária</div>
              <div style={{fontSize:10,color:C.light,fontFamily:"var(--ff-ui)"}}>
                Tesouro Estadual · SEFAZ-ES</div>
            </div>
          </div>

          <nav className="nav-desktop" style={{gap:2,flex:1,justifyContent:"center"}}>
            {NAV.map(item=>(
              <button key={item} onClick={()=>setActiveNav(item)}
                style={{background:"none",border:"none",fontFamily:"var(--ff-ui)",
                  fontSize:12.5,color:activeNav===item?C.gold:C.light,
                  fontWeight:activeNav===item?600:400,
                  padding:"6px 11px",cursor:"pointer",
                  borderBottom:activeNav===item?`2px solid ${C.gold}`:"2px solid transparent"}}>
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-text">
            <BadgePulse label="Uma iniciativa do Tesouro Estadual · SEFAZ-ES"/>
            <h1 style={{fontFamily:"var(--ff-display)",
              fontSize:"clamp(26px,3.8vw,36px)",fontWeight:700,
              color:C.white,margin:"14px 0 20px",lineHeight:1.18}}>
              Radar da Reforma Tributária
            </h1>
            <p style={{fontFamily:"var(--ff-reading)",fontSize:14,
              color:"#A8C8D8",lineHeight:1.75,maxWidth:420,marginBottom:28}}>
              Repositório de conteúdo selecionado sobre a Reforma Tributária,
              organizado para qualificação dos servidores do Tesouro Estadual
              e compreensão dos impactos fiscais, federativos e operacionais
              para o Espírito Santo.
            </p>
            <button
              onClick={()=>document.getElementById("base")?.scrollIntoView({behavior:"smooth"})}
              style={{background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.22)",
                color:C.white,borderRadius:4,padding:"10px 20px",fontSize:12.5,
                fontFamily:"var(--ff-ui)",fontWeight:600,cursor:"pointer"}}>
              Ver o conteúdo ↓
            </button>
          </div>
          <div className="hero-map"><BrazilRadarMap/></div>
        </div>
      </section>

      {/* DESTAQUE */}
      <div className="destaque-band">
        <div className="destaque-inner">
          <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            <span style={{fontSize:16}}>📌</span>
            <span style={{fontSize:10,fontWeight:800,textTransform:"uppercase",
              letterSpacing:"0.12em",color:C.gold,fontFamily:"var(--ff-ui)"}}>
              Em destaque</span>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.mid,fontFamily:"var(--ff-ui)",
              marginBottom:2}}>{CONTENT.destaque.tag}</div>
            <div style={{fontSize:14,fontWeight:600,color:C.navy,
              fontFamily:"var(--ff-display)",lineHeight:1.3}}>
              {CONTENT.destaque.titulo}</div>
          </div>
          <button onClick={()=>setModal(CONTENT.destaque)}
            style={{background:C.navy,color:C.white,border:"none",
              borderRadius:4,padding:"9px 16px",fontSize:12,fontWeight:700,
              cursor:"pointer",fontFamily:"var(--ff-ui)",whiteSpace:"nowrap",
              flexShrink:0}}>Ver mais →</button>
        </div>
      </div>

      {/* TRÊS COLUNAS */}
      <div id="base" className="content-wrap" style={{scrollMarginTop:60}}>
        <div className="three-cols">
          <div className="col">
            <ColHead icon="🏛️" title="Base da Reforma"
              sub="Legislação, normas e documentos fundantes."/>
            {CONTENT.base.map(item=>(
              <DocRow key={item.slug} item={item} onClick={setModal}/>
            ))}
            <MoreBtn label="Ver todos os documentos"/>
          </div>
          <div className="col">
            <ColHead icon="🎓" title="Estudos e Capacitação"
              sub="Vídeos, artigos, notas técnicas e apresentações."/>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <StudyCard item={CONTENT.estudos[0]} dark onClick={setModal}/>
              <StudyCard item={CONTENT.estudos[1]} onClick={setModal}/>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <StudyCard item={CONTENT.estudos[2]} onClick={setModal}/>
              <StudyCard item={CONTENT.estudos[3]} dark onClick={setModal}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <StudyCard item={CONTENT.estudos[4]} onClick={setModal}/>
              <StudyCard item={CONTENT.estudos[5]} onClick={setModal}/>
            </div>
            <MoreBtn label="Ver todos os conteúdos"/>
          </div>
          <div className="col">
            <ColHead icon="📡" title="Atualizações"
              sub="Notícias e movimentos relevantes para o Tesouro Estadual."/>
            {CONTENT.radar.map(item=>(
              <NewsRow key={item.slug} item={item} onClick={setModal}/>
            ))}
            <MoreBtn label="Ver todas as atualizações"/>
          </div>
        </div>
      </div>

      {/* FOOTER — vazio por ora; newsletter virá aqui */}
      <footer style={{borderTop:`1px solid ${C.border}`,
        marginTop:40,paddingBottom:40}}/>


    </div>
  );
}
