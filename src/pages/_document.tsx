import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Portfólio Full-Stack Developer especializado em Next.js e TypeScript" />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <link rel="canonical" href="https://seudominio.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 