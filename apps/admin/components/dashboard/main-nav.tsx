'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@workspace/ui/lib/utils'

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <Link
        href="/dashboard"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        Overview
      </Link>
      <Link
        href="/customers"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/customers' ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        Customers
      </Link>
      <Link
        href="/products"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/products' ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        Products
      </Link>
      <Link
        href="/settings"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === '/settings' ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        Settings
      </Link>
    </nav>
  )
}
