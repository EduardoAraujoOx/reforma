# Radar da Reforma Tributária — Contexto do Projeto

## O que é

Portal do **Tesouro Estadual / SEFAZ-ES** que acompanha a Reforma Tributária do Consumo
(EC 132/2023 + LC 214/2025 + LC 227/2026). Público interno: servidores do Tesouro.

URL em produção: **https://tesouroes.vercel.app**  
Repositório: `eduardoaraujoox/reforma`  
Branch de desenvolvimento: `claude/adoring-turing-EiDaG`  

---

## Stack

- **Next.js 14** App Router, TypeScript, geração estática (SSG)
- **Vercel** para deploy (auto-deploy no push)
- **Sem Tailwind** — estilos 100% inline + classes CSS em `app/globals.css`
- **Design tokens** em `components/tokens.ts` (importar como `T`)
- **Fontes:** Playfair Display (`--ff-display`), Lora (`--ff-reading`), system-ui (`--ff-ui`), monospace (`--ff-mono`)

---

## Estrutura de arquivos relevantes

```
app/
  globals.css          ← todos os estilos CSS (classes + media queries)
  layout.tsx           ← fontes Google + metadata
  page.tsx             ← renderiza <Portal />

components/
  tokens.ts            ← design tokens (cores, T.NAVY, T.GOLD, etc.)
  Header.tsx           ← sticky header + drawer mobile
  Portal.tsx           ← toda a página (3 seções + footer)
  ContentModal.tsx     ← modal de detalhe de item

lib/
  content.ts           ← dados estáticos atuais (base, estudos, radar)

public/
  normas/              ← imagens WebP das legislações (ec-132, lc-214, etc.)
  tesouro-logo.webp    ← logo do Tesouro Estadual (823×966, transparência)
  animated-radar-es.svg
```

---

## Arquitetura visual

Três seções na ordem:

| # | id | Fundo | Conteúdo |
|---|---|---|---|
| 1 | `#noticias` | cream (`#FAF7F2`) | Featured vídeo (esq) + lista de notícias com expand (dir) |
| 2 | `#estudos` | navy (`#0B2535`) | Carrossel de vídeos + índice expansível |
| 3 | `#base` | cream (`#FAF7F2`) | Featured card EC 132 + lista de docs com thumbnails |

Entre seções: `<div className="section-rule" />` (traço gold com gradiente).  
Breakpoint mobile: **768px**.

### Padrão de layout das seções

Todas usam `.hero-feed` (grid `1fr 296px`):
- **Esquerda:** card destaque com imagem full-width + corpo
- **Direita:** lista com thumbnail 88×60, título, descrição truncada, seta

---

## Modelo de dados — `ContentItem`

```typescript
interface ContentItem {
  slug: string
  tag: string
  titulo: string
  subtitulo?: string
  descricao?: string
  porQueImporta: string
  fonte: string
  formato?: string
  url: string
  imageUrl?: string        // URL da imagem (pode ser /normas/ec-132.webp ou externa)
  youtubeId?: string       // ID do YouTube (thumbnail automático)
  date?: string            // "20"
  month?: string           // "mai"
  data?: string            // "jan 2025"
  tag?: string             // "ES · Impacto Fiscal"
  tema?: string
  profundidade?: "Introdutório" | "Aprofundado" | "Especialista"
  novidade?: boolean
}
```

Arrays exportados de `lib/content.ts`: `base[]`, `estudos[]`, `radar[]`.

---

## Próxima fase: Backend/CMS

### Objetivo
Permitir ao Tesouro adicionar, editar, reordenar e excluir conteúdo sem tocar em código.

### Arquitetura decidida
**Vercel KV** (key-value) + **Vercel Blob** (imagens)

Motivos: já estão no Vercel, zero infra extra, atualizações instantâneas via `revalidatePath`, free tier suficiente.

### Arquivos a criar

```
app/
  admin/
    page.tsx            ← painel (lista por seção, adicionar, reordenar, excluir)
    layout.tsx          ← proteção por senha (cookie HTTP-only)
  api/
    fetch-url/
      route.ts          ← POST { url } → retorna { titulo, subtitulo, imageUrl, youtubeId, ... }
    content/
      route.ts          ← GET / POST / PATCH / DELETE

lib/
  db.ts                 ← abstração do Vercel KV
  og-fetch.ts           ← parser OG + handling especial YouTube
```

### Fluxo "Adicionar via URL"

1. Admin cola link (notícia, YouTube, portal.gov.br)
2. `/api/fetch-url` faz fetch server-side, extrai `og:title`, `og:description`, `og:image`, data
3. YouTube: extrai `videoId`, thumbnail = `https://img.youtube.com/vi/{id}/hqdefault.jpg`
4. Admin revisa/edita campos na prévia → salva

### Segurança
- Senha em `ADMIN_PASSWORD` (env var no Vercel)
- Cookie HTTP-only de sessão, sem OAuth (uso interno)

### Passos de implementação

1. No painel Vercel: criar KV Store + Blob Store, copiar env vars para o projeto
2. `lib/db.ts` + script de migração do `lib/content.ts` atual → KV
3. `lib/og-fetch.ts` com parser OG + YouTube
4. Rotas de API (`/api/fetch-url`, `/api/content`)
5. Admin UI em `/admin`
6. Atualizar `Portal.tsx` para buscar do KV em vez do arquivo estático
7. Testar com conteúdo real

### Variáveis de ambiente necessárias (Vercel Dashboard)

- `ADMIN_PASSWORD` — senha do painel admin
- `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN` — geradas automaticamente ao criar KV Store
- `BLOB_READ_WRITE_TOKEN` — gerado ao criar Blob Store

---

## Convenções de código

- Estilos: sempre inline style ou classes de `globals.css`. Nunca Tailwind.
- Imagens: salvar em `public/` como WebP otimizado (usar `sharp` como devDependency)
- Commits: mensagem em português, descritiva, sem referência a número de issue
- Branch: sempre `claude/adoring-turing-EiDaG` (nunca fazer push direto para main sem PR)
- Construir: `npm run build` antes de commit para garantir sem erros
