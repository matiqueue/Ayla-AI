'use client'

import * as React from 'react'
import { Moon, Sun, Palette } from 'lucide-react' // Dodano Palette dla trybu "custom"
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Nie renderuj dopóki nie zamontuje się na kliencie
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="hover:cursor-pointer">
          {/* Ikona Sun - widoczna w trybie light */}
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
            }`}
          />
          {/* Ikona Moon - widoczna w trybie dark */}
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
            }`}
          />
          {/* Ikona Palette - widoczna w trybie custom */}
          <Palette
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              theme === 'custom' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {['light', 'dark', 'custom'].map((mode) => (
          <DropdownMenuItem
            key={mode}
            onClick={() => setTheme(mode)}
            className="hover:cursor-pointer"
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
