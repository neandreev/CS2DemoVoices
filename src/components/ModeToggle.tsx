import { Moon, Sun } from 'lucide-react'

import { Theme, useTheme } from '@/themeProvider'
import { Button } from '@/components/ui/button'

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

const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button className="w-10" onClick={() => setTheme(oppositeTheme[theme])}>
      {iconByTheme[theme]}
    </Button>
  )
}

export default ModeToggle
