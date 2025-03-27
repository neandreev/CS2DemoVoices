import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { type Theme, useTheme } from '@/themeProvider'
import { memo, useCallback } from 'react'

const iconByTheme = {
  dark: <Sun />,
  light: <Moon />,
  system: <Sun />
}

const oppositeTheme: Record<Theme, Theme> = {
  dark: 'light',
  light: 'dark',
  system: 'system'
}

const ModeToggle = memo(() => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      className="w-10"
      aria-label="mode-toggle"
      onClick={useCallback(() => setTheme(oppositeTheme[theme]), [setTheme, theme])}
    >
      {iconByTheme[theme]}
    </Button>
  )
})

export default ModeToggle
