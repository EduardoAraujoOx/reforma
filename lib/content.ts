export interface ContentItem {
  slug: string;
  tag: string;
  titulo: string;
  subtitulo?: string;
  descricao?: string;
  porQueImporta: string;
  fonte: string;
  formato?: string;
  url: string;
  youtubeId?: string;
  prazo?: string;
  janela?: string;
  impacto?: string;
  date?: string;
  month?: string;
  data?: string;
  tema?: string;
  profundidade?: "Introdutório" | "Aprofundado" | "Especialista";
  novidade?: boolean;
}

export const destaque: ContentItem = {
  slug: "cgibs-guia-impactos-administrativos",
  tag: "CG-IBS · Guia Orientativo",
  titulo: "Guia Orientativo para Impactos Administrativos da Reforma Tributária",
  subtitulo: "Orientações práticas para Secretarias de Fazenda na adaptação à EC 132/2023 — dimensões institucional, operacional e de pessoal",
  porQueImporta:
    "O Guia de Orientações do Pré-CG-IBS traz diversas orientações administrativas para Secretarias de Fazenda. Dentre elas, recomenda-se que os Estados elaborem estudo para fixação de sua alíquota-padrão de IBS, utilizando equipes técnicas próprias e/ou consultorias especializadas, com foco em subsidiar o processo legislativo de fixação dessa alíquota em cada ente, com vistas a evitar perda de arrecadação com a Reforma Tributária do Consumo ou mitigar esse risco na transição do atual modelo para o IBS/CBS.",
  fonte: "Comitê Gestor do IBS · Pré-CG-IBS",
  formato: "Guia Técnico",
  tema: "CG-IBS · Gestão Administrativa",
  profundidade: "Aprofundado",
  data: "fev 2026",
  url: "https://cgibs.gov.br/upload/arquivos/202602/11155827-gt-08-guia-orientativo-para-impactos-administrativos-da-reforma-tributaria-v2-2.pdf",
};

export const base: ContentItem[] = [
  {
    slug: "ec-132-2023",
    tag: "Constituição",
    titulo: "Emenda Constitucional 132/2023",
    subtitulo: "Texto constitucional — reforma do sistema tributário nacional",
    porQueImporta:
      "A EC 132 é o documento fundante da Reforma Tributária. Extingue ICMS, ISS, PIS e COFINS e institui o IBS, a CBS e o Imposto Seletivo. Define o período de transição 2026–2032 e as bases do Comitê Gestor e do FNDR. Leitura obrigatória para todo servidor do Tesouro.",
    fonte: "Presidência da República / Planalto",
    formato: "Emenda Constitucional",
    tema: "Fundamentos / EC 132",
    profundidade: "Especialista",
    data: "dez 2023",
    url: "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm",
  },
  {
    slug: "lc-214-2025",
    tag: "Lei Complementar",
    titulo: "Lei Complementar 214/2025",
    subtitulo: "IBS, CBS, Imposto Seletivo, Split Payment e FNDR",
    porQueImporta:
      "Regulamenta os três novos tributos: alíquotas, fato gerador, regime de transição e Split Payment. Inclui os dispositivos sobre o FNDR — Fundo Nacional de Desenvolvimento Regional — que determinará as compensações para estados como o ES que dependem de arrecadação na origem.",
    fonte: "Presidência da República / Planalto",
    formato: "Lei Complementar",
    tema: "IBS · CBS · IS",
    profundidade: "Especialista",
    data: "jan 2025",
    url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm",
  },
  {
    slug: "lc-227-2026",
    tag: "Lei Complementar",
    titulo: "Lei Complementar 227/2026",
    subtitulo: "Criação formal do Comitê Gestor do IBS",
    porQueImporta:
      "Institui definitivamente o CG-IBS com 54 membros, regras de fiscalização, cobrança, contencioso administrativo e distribuição da arrecadação entre estados e municípios. Define como o ES participa das decisões do órgão que centralizará toda a arrecadação do IBS.",
    fonte: "Senado Federal / Diário Oficial da União",
    formato: "Lei Complementar",
    tema: "Comitê Gestor",
    profundidade: "Aprofundado",
    data: "jan 2026",
    novidade: true,
    url: "https://www12.senado.leg.br/noticias/materias/2026/01/14/reforma-tributaria-lei-cria-comite-gestor-do-ibs-e-define-regras-do-imposto",
  },
  {
    slug: "normas-cgibs",
    tag: "CG-IBS",
    titulo: "Portal do Comitê Gestor do IBS",
    subtitulo: "Resoluções, guias, notas técnicas e obrigações acessórias",
    porQueImporta:
      "Canal oficial onde o CG-IBS publica todas as normas que a SEFAZ-ES deve implementar: Resolução nº 6 com as alíquotas-teste, guias de impactos administrativos, cadastro unificado e prazos de integração de sistemas. Monitoramento essencial para a gestão fiscal estadual.",
    fonte: "Comitê Gestor do IBS",
    formato: "Portal Web",
    tema: "Normas / CG-IBS",
    profundidade: "Introdutório",
    data: "mai 2026",
    url: "https://www.cgibs.gov.br",
  },
  {
    slug: "reforma-fazenda",
    tag: "Ministério da Fazenda",
    titulo: "Portal da Reforma Tributária — Ministério da Fazenda",
    subtitulo: "Regulamentação, LC 214/2025, DeRE e documentos oficiais",
    porQueImporta:
      "Reúne a produção normativa do Ministério da Fazenda: texto integral da LC 214/2025, documentos sobre a DeRE (nova obrigação acessória de abril de 2026), regulamento do IBS/CBS, perguntas frequentes e material de orientação para contribuintes e fiscos.",
    fonte: "Ministério da Fazenda",
    formato: "Portal Web",
    tema: "Regulamentação",
    profundidade: "Introdutório",
    data: "mai 2026",
    url: "https://www.gov.br/fazenda/pt-br/acesso-a-informacao/acoes-e-programas/reforma-tributaria",
  },
];

export const estudos: ContentItem[] = [
  {
    slug: "sefaz-es-reforma-tributaria-video-1",
    tag: "Vídeo",
    titulo: "Reforma Tributária no ES — Apresentação SEFAZ-ES",
    subtitulo: "Seminário SEFAZ-ES · 2026",
    porQueImporta:
      "Material institucional da SEFAZ-ES sobre a Reforma Tributária, abordando os impactos para o Espírito Santo e as medidas de adaptação do Tesouro Estadual ao novo modelo do IBS/CBS.",
    fonte: "SEFAZ-ES — YouTube",
    formato: "Vídeo",
    tema: "ES · SEFAZ",
    profundidade: "Introdutório",
    data: "2026",
    youtubeId: "1Ya8u41jySs",
    url: "https://youtu.be/1Ya8u41jySs",
  },
  {
    slug: "sefaz-es-reforma-tributaria-video-2",
    tag: "Vídeo",
    titulo: "IBS no Espírito Santo — Seminário Técnico SEFAZ-ES",
    subtitulo: "Seminário SEFAZ-ES · 2026",
    porQueImporta:
      "Seminário técnico da SEFAZ-ES tratando dos impactos operacionais do IBS e CBS para a administração tributária do Espírito Santo e as ações de preparação institucional.",
    fonte: "SEFAZ-ES — YouTube",
    formato: "Vídeo",
    tema: "ES · SEFAZ",
    profundidade: "Aprofundado",
    data: "2026",
    youtubeId: "6cYCdhXC5gQ",
    url: "https://youtu.be/6cYCdhXC5gQ",
  },
  {
    slug: "regulamento-ibs-cbs-2026",
    tag: "Vídeo",
    titulo: "Regulamento do IBS e CBS: análise do Decreto 12.955/2026 e Resolução CGIBS 6",
    subtitulo: "Análise técnica · maio de 2026",
    porQueImporta:
      "Vídeo mais recente e diretamente relevante para operação do Tesouro Estadual em 2026. Analisa o regulamento geral do IBS e CBS publicado pelo CG-IBS, detalhando as obrigações de notas fiscais, prazos e o funcionamento do Sistema de Apuração Assistida.",
    fonte: "YouTube · maio de 2026",
    formato: "Vídeo",
    tema: "IBS · CBS",
    profundidade: "Aprofundado",
    data: "mai 2026",
    youtubeId: "NrXf8xXT8Dk",
    url: "https://www.youtube.com/watch?v=NrXf8xXT8Dk",
  },
  {
    slug: "appy-poder360-2025",
    tag: "Vídeo",
    titulo: "Bernard Appy: reforma tributária — regulamentação e próximos passos",
    subtitulo: "Entrevista ao Poder360 · abril de 2025",
    porQueImporta:
      "Bernard Appy, principal arquiteto da Reforma, explica o estágio de regulamentação após a LC 214/2025, o funcionamento do Split Payment e os desafios para estados e municípios na transição do ICMS para o IBS.",
    fonte: "Poder360 — YouTube",
    formato: "Vídeo",
    tema: "Panorama geral",
    profundidade: "Introdutório",
    data: "abr 2025",
    youtubeId: "oqXJofB6Kbk",
    url: "https://www.youtube.com/watch?v=oqXJofB6Kbk",
  },
  {
    slug: "ccif-notas-tecnicas",
    tag: "Notas Técnicas",
    titulo: "Notas Técnicas do CCiF sobre a Reforma Tributária",
    subtitulo: "Centro de Cidadania Fiscal — mais de 28 notas publicadas",
    porQueImporta:
      "O CCiF publicou mais de 28 notas técnicas cobrindo alíquotas, regimes diferenciados, guerra fiscal, FNDR, Comitê Gestor e período de transição. Fonte de referência técnica independente de maior profundidade disponível.",
    fonte: "Centro de Cidadania Fiscal (CCiF)",
    formato: "Nota técnica",
    tema: "IBS · CBS · IS",
    profundidade: "Especialista",
    data: "mai 2026",
    url: "https://ccif.com.br/notas-tecnicas-reforma-tributaria/",
  },
  {
    slug: "ifi-senado-estudo-19",
    tag: "Estudo Técnico",
    titulo: "Reforma Tributária: contexto, mudanças e impactos fiscais",
    subtitulo: "Estudo Especial nº 19 — IFI / Senado · março de 2024",
    porQueImporta:
      "Análise técnica independente do Senado Federal sobre os impactos fiscais da Reforma: projeção de alíquotas, impacto sobre arrecadação de estados e municípios, cronograma de transição e riscos de calibragem do IBS. Documento denso e essencial para planejamento do Tesouro.",
    fonte: "Instituição Fiscal Independente (IFI) / Senado Federal",
    formato: "Artigo técnico",
    tema: "Impacto fiscal",
    profundidade: "Especialista",
    data: "mar 2024",
    url: "https://www2.senado.leg.br/bdsf/bitstream/handle/id/647648/EE19_2024.pdf",
  },
  {
    slug: "ipea-impactos-redistributivos",
    tag: "Estudo IPEA",
    titulo: "Impactos Redistributivos da Reforma Tributária: estimativas atualizadas",
    subtitulo: "Instituto de Pesquisa Econômica Aplicada (IPEA)",
    porQueImporta:
      "O IPEA modelou a redistribuição de receitas entre estados e municípios com a mudança do ICMS para o IBS. Estima que 60% dos estados ganham participação no bolo tributário — mas estados com forte base na arrecadação de origem, como o ES, podem registrar perdas expressivas.",
    fonte: "IPEA",
    formato: "Artigo técnico",
    tema: "Redistribuição",
    profundidade: "Aprofundado",
    data: "2026",
    url: "https://www.ipea.gov.br/portal/categorias/45-todas-as-noticias/noticias/13935-reforma-tributaria-beneficiara-ao-menos-82-dos-municipios-e-60-dos-estados",
  },
  {
    slug: "fndr-risco-desvio",
    tag: "Análise",
    titulo: "Os novos fundos da reforma e seu custo federativo",
    subtitulo: "Análise crítica — ConJur · agosto de 2025",
    porQueImporta:
      "Análise no Conjur sobre os riscos do FNDR e dos demais fundos criados pela EC 132. Aponta que a possibilidade de estados usarem recursos do FNDR para pagar dívidas com a União pode desvirtuar a finalidade original do fundo.",
    fonte: "Consultor Jurídico (ConJur)",
    formato: "Artigo técnico",
    tema: "FNDR",
    profundidade: "Aprofundado",
    data: "ago 2025",
    url: "https://www.conjur.com.br/2025-ago-26/os-novos-fundos-da-reforma-tributaria-e-seu-custo-federativo/",
  },
];

export const radar: ContentItem[] = [
  {
    slug: "atacado-es-reforma-risco-9bi",
    date: "20",
    month: "Mai",
    tag: "ES · Impacto Fiscal",
    titulo: "Setor atacadista do ES projeta perda de R$ 9,8 bilhões com a Reforma até 2033",
    descricao:
      "Estudo da Apex Research com o Sincades aponta que o atacado capixaba passou de 15% para 29% do ICMS estadual entre 2022 e 2025 — modelo baseado em incentivos que a Reforma extingue.",
    porQueImporta:
      "Esta é a ameaça fiscal mais concreta e quantificada para o ES. O setor atacadista é responsável por R$ 6,64 bilhões de ICMS anuais e R$ 1,66 bilhão em repasses a municípios. A extinção dos incentivos fiscais pelo IBS compromete diretamente esse modelo.",
    fonte: "Folha Vitória / Apex Research + Sincades",
    url: "https://www.folhavitoria.com.br/folha-business/atacado-capixaba-dobra-fatia-no-icms-e-chega-a-quase-30-da-arrecadacao/",
  },
  {
    slug: "alianca-evitar-prejuizo-es",
    date: "19",
    month: "Mai",
    tag: "ES · Governança",
    titulo: "Governador anuncia grupo de trabalho para mitigar impactos da Reforma no ES",
    descricao:
      "Ricardo Ferraço anuncia criação de grupo de trabalho para estudar alternativas ao modelo atacadista frente à extinção dos incentivos de ICMS.",
    porQueImporta:
      "Resposta institucional do governo estadual ao risco de R$ 8,3 bilhões apontado pelo Sincades. O grupo de trabalho envolvendo SEFAZ-ES é relevante para o Tesouro Estadual acompanhar.",
    fonte: "A Tribuna Online",
    url: "https://tribunaonline.com.br/economia/reforma-tributaria-alianca-para-evitar-prejuizo-ao-espirito-santo-302047",
  },
  {
    slug: "cgibs-resolucao6-decreto-2026",
    date: "30",
    month: "Abr",
    tag: "CG-IBS",
    titulo: "Publicados Decreto 12.955/2026 e Resolução CGIBS nº 6 com regulamento geral do IBS",
    descricao:
      "A partir de agosto de 2026, empresas devem destacar IBS (0,1%) e CBS (0,9%) nas notas fiscais. Decreto regulamenta o sistema de apuração assistida.",
    porQueImporta:
      "Norma operacional mais urgente de 2026. Define as obrigações concretas que a SEFAZ-ES deve repassar aos contribuintes capixabas e implementar em seus sistemas de fiscalização.",
    fonte: "Comitê Gestor do IBS / DOU",
    url: "https://www.cgibs.gov.br",
  },
  {
    slug: "fndr-risco-dividas-estados",
    date: "20",
    month: "Fev",
    tag: "Federalismo Fiscal",
    titulo: "22 estados aderem ao Propag e podem usar FNDR para pagar dívidas com a União",
    descricao:
      "Portaria MF 3.066/2025 permite uso de recursos do FNDR para pagamento de dívidas estaduais, gerando risco de desvio da finalidade original do fundo.",
    porQueImporta:
      "Caso o ES venha a aderir ao Propag, a destinação dos recursos do FNDR ao estado pode ser comprometida. Tema relevante para o planejamento de longo prazo do Tesouro Estadual.",
    fonte: "SINFRERJ / Molina Advogados",
    url: "https://sinfrerj.com.br/conteudo/10893/reforma-tributaria-fundo-nacional-de-desenvolvimento-regional-corre-risco-de-desvirtuamento",
  },
  {
    slug: "lc-227-cgibs-jan2026",
    date: "14",
    month: "Jan",
    tag: "Legislação",
    titulo: "LC 227/2026 é sancionada e cria definitivamente o Comitê Gestor do IBS",
    descricao:
      "Lei institui o CG-IBS com 54 membros, regras de fiscalização, contencioso administrativo em duas instâncias e relatórios mensais de arrecadação.",
    porQueImporta:
      "Marco regulatório que dá ao CG-IBS sua forma definitiva. Define os mecanismos de transparência e controle que permitirão ao Tesouro Estadual acompanhar os repasses do IBS.",
    fonte: "Senado Federal",
    url: "https://www12.senado.leg.br/noticias/materias/2026/01/14/reforma-tributaria-lei-cria-comite-gestor-do-ibs-e-define-regras-do-imposto",
  },
  {
    slug: "appy-poder-compra-10pc",
    date: "26",
    month: "Fev",
    tag: "Análise Macroeconômica",
    titulo: "Appy: Reforma deve elevar poder de compra dos brasileiros em 10% nos próximos 15 anos",
    descricao:
      "Secretário extraordinário afirma que o impacto positivo sobre o PIB potencial do Brasil deve se acumular ao longo do período de transição até 2033.",
    porQueImporta:
      "Projeção macroeconômica relevante para o planejamento fiscal de longo prazo do Tesouro Estadual — especialmente para estimar o crescimento da base tributável do IBS após a transição.",
    fonte: "Ministério da Fazenda",
    url: "https://www.gov.br/fazenda/pt-br/assuntos/noticias/2025/fevereiro/appy-preve-aumento-de-10-no-poder-de-compra-com-reforma-tributaria",
  },
];
