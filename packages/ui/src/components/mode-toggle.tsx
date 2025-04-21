'use client'

import * as React from 'react'
import { Moon, Sun, Palette } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'

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
        <Button variant="ghost" size="sm" className="hover:cursor-pointer">
          {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
          {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
          {theme === 'custom' && <Palette className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="text-lg">
        {['light', 'dark', 'custom'].map((mode) => (
          <DropdownMenuItem
            key={mode}
            onClick={() => setTheme(mode)}
            className="hover:cursor-pointer py-2 px-4"
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
