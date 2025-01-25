'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../../styles/global-styles'
import { theme } from '../../styles/theme'

export function ThemeContainer({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
} 