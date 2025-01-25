"use client"

import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global-styles'
import { theme } from '../styles/theme'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
