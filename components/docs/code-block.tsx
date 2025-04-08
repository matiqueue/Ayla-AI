'use client'

import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useTheme } from 'next-themes'

export function CodeBlock({ title, children }: { title?: string; children: string }) {
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border my-4 overflow-hidden transition-colors duration-200">
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/50">
          <div className="text-sm font-medium">{title}</div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      )}
      <div
        className={`p-4 overflow-x-auto bg-muted/30 ${theme === 'dark' ? 'dark-code' : 'light-code'}`}
      >
        <pre className="text-sm">{children}</pre>
      </div>
    </div>
  )
}
