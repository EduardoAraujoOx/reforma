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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
