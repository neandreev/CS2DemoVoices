import { createContext, memo, useContext, useEffect, useMemo, useState } from 'react'

export type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const ThemeProvider = memo(
  ({
    children,
    defaultTheme = 'system',
    storageKey = 'vite-ui-theme',
    ...props
  }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(
      () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    useEffect(() => {
      const root = window.document.documentElement

      root.classList.remove('light', 'dark')

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'

        root.classList.add(systemTheme)
        return
      }

      root.classList.add(theme)
    }, [theme])

    const value = useMemo(
      () => ({
        theme,
        setTheme: (theme: Theme): void => {
          localStorage.setItem(storageKey, theme)
          setTheme(theme)
        }
      }),
      [theme, storageKey]
    )

    return (
      <ThemeProviderContext.Provider {...props} value={value}>
        {children}
      </ThemeProviderContext.Provider>
    )
  }
)

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
