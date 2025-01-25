import { Inter, Roboto_Mono } from "next/font/google";
import StyledComponentsRegistry from '../lib/registry'
import { ThemeContainer } from '../components/providers/ThemeContainer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Rodrigo Cinelli - Full Stack Developer',
  description: 'Portfólio profissional especializado em Next.js e TypeScript',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeContainer>
            {children}
          </ThemeContainer>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
