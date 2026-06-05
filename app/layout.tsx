import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  CAL_URL,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  siteUrl,
} from "../lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_AUTHOR}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  keywords: [
    "automatización con IA",
    "agentes IA",
    "pipelines de datos",
    "n8n",
    "Next.js",
    "Python",
    "LangChain",
    "RAG",
    "consultor IA",
    "PyMEs",
    "agencias",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: SITE_AUTHOR,
        alternateName: "Ariel Del Fresno",
        url: SITE,
        jobTitle: "Consultor en automatización con IA",
        sameAs: [
          "https://www.linkedin.com/in/guillermo-ariel-del-fresno/",
          CAL_URL,
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE}/#service`,
        name: SITE_NAME,
        url: SITE,
        description: SITE_DESCRIPTION,
        provider: { "@id": `${SITE}/#person` },
        areaServed: ["AR", "ES", "MX", "CL", "UY"],
        serviceType: [
          "Agentes conversacionales con IA",
          "Pipelines de datos con IA",
          "Automatizaciones no-code",
          "Dashboards a medida",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: SITE_NAME,
        inLanguage: "es",
        publisher: { "@id": `${SITE}/#person` },
      },
    ],
  };

  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        <a href="#hero" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        {children}
        <Footer />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
