import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light' | 'system'

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
