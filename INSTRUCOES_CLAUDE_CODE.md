# Radar da Reforma Tributária — Instruções para Claude Code

## Contexto

Este documento instrui a implementação de um portal institucional chamado **Radar da Reforma Tributária**, iniciativa da Subsecretaria do Tesouro Estadual da SEFAZ-ES. O protótipo visual completo está no arquivo `portal-reforma-tributaria.jsx` desta pasta. O objetivo nesta fase é publicar o front-end estático no Vercel via GitHub, sem backend. O backend será implementado em fase posterior.

---

## Fase 1 — Front-end estático (esta sessão)

### Stack

- **Next.js 14** com App Router (`app/`)
- **TypeScript**
- **Tailwind CSS** (apenas utilitários base, sem customização pesada — o design usa inline styles)
- **D3.js** (`d3`) para o mapa do Brasil no hero
- Hospedagem: **Vercel**, vinculado ao repositório GitHub

### Estrutura de pastas a criar

```
radar-reforma/
├── app/
│   ├── layout.tsx          # layout raiz com metadados e Google Fonts
│   ├── page.tsx            # home — importa PortalReformaTributaria
│   ├── sobre/
│   │   └── page.tsx        # página Sobre (âncora interna por ora)
│   └── globals.css         # reset mínimo
├── components/
│   └── PortalReformaTributaria.tsx   # componente principal (converter do .jsx)
├── lib/
│   └── content.ts          # dados curados exportados (extrair do componente)
├── public/
│   └── (vazio por ora)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Passos

**1. Criar o projeto**
```bash
npx create-next-app@latest radar-reforma \
  --typescript --tailwind --app --src-dir no \
  --import-alias "@/*"
cd radar-reforma
npm install d3 @types/d3
```

**2. Converter o protótipo**

Copiar `portal-reforma-tributaria.jsx` para `components/PortalReformaTributaria.tsx`. Adicionar `"use client"` no topo (o componente usa `useState` e `useEffect`). Tipar as props com interfaces TypeScript simples — o conteúdo está no objeto `CONTENT` interno; extraí-lo para `lib/content.ts` e importar no componente.

**3. `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radar da Reforma Tributária | Tesouro Estadual · SEFAZ-ES",
  description:
    "Repositório de conteúdo selecionado sobre a Reforma Tributária, " +
    "organizado para qualificação dos servidores do Tesouro Estadual do Espírito Santo.",
  openGraph: {
    title: "Radar da Reforma Tributária",
    description: "Uma iniciativa do Tesouro Estadual · SEFAZ-ES",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**4. `app/page.tsx`**

```tsx
import PortalReformaTributaria from "@/components/PortalReformaTributaria";

export default function Home() {
  return <PortalReformaTributaria />;
}
```

**5. `next.config.ts`**

Permitir o domínio da imagem do brasão e dos thumbnails do YouTube:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.es.gov.br" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
```

Substituir as tags `<img>` por `<Image>` do Next.js apenas para brasão e thumbnails, passando `width` e `height` explícitos. O SVG do radar não precisa de ajuste.

**6. Variáveis de ambiente**

Criar `.env.local` (não commitar):
```
# Vazio por ora. Reservado para Fase 2 (Supabase).
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Adicionar `.env.local` ao `.gitignore`.

**7. Deploy no Vercel**

```bash
git init
git add .
git commit -m "feat: portal radar reforma tributária — fase 1 estática"
gh repo create radar-reforma --public --source=. --push
```

Depois: acessar vercel.com → Import Git Repository → selecionar `radar-reforma` → Deploy. O Vercel detecta Next.js automaticamente.

---

## Fase 2 — Backend de curadoria (sessão futura)

**Não implementar agora.** Documentado aqui apenas para orientar a arquitetura da Fase 1.

### O que será construído

Um painel de administração simples, acessível via `/admin`, que permitirá:

- Inserir novos itens de conteúdo fornecendo apenas uma URL
- O sistema chama uma API Route (`/api/scrape`) que usa a biblioteca `metascraper` para extrair título, descrição, imagem e fonte automaticamente
- O curador revisa, preenche o campo "Por que importa" e confirma
- O item é salvo no Supabase (tabela `content_items`)
- A home lê do Supabase via `getServerSideProps` ou React Server Component

### Estrutura futura de dados (Supabase)

```sql
create table content_items (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  secao       text not null,  -- 'base' | 'estudos' | 'radar'
  tag         text,
  titulo      text not null,
  subtitulo   text,
  descricao   text,
  por_que_importa text,
  fonte       text,
  formato     text,
  url         text not null,
  youtube_id  text,
  data_publicacao date,
  destaque    boolean default false,
  ativo       boolean default true,
  created_at  timestamptz default now()
);
```

### Autenticação do painel `/admin`

Usar NextAuth.js com provider de e-mail (magic link), restrito a domínios `@sefaz.es.gov.br`. Nenhuma senha para gerenciar.

---

## Notas para a implementação

**Mapa do Brasil:** o contorno atual usa coordenadas manuais com D3 Mercator. Funciona bem para esta fase. Na Fase 2, considerar substituir pelo GeoJSON oficial do IBGE (repositório `datasets/geo-data-br` no GitHub) convertido com `topojson` para precisão por estado.

**Fontes no `@import`:** a string `@import url(...)` dentro do template literal CSS funciona em artefatos Claude mas pode gerar aviso no Next.js. Mover o `<link>` do Google Fonts para `app/layout.tsx` (já feito acima) e remover o `@import` do CSS inline no componente.

**Thumbnail YouTube sem autenticação:** `https://img.youtube.com/vi/{id}/mqdefault.jpg` é URL pública que não requer API key. Usar `<Image>` do Next com `width={320} height={180}`.

**SEO:** o título e description estão no `metadata` do layout. Para páginas de conteúdo futuras (`/conteudo/[slug]`), gerar metadata dinâmico via `generateMetadata()` do Next.js lendo o slug do Supabase.
