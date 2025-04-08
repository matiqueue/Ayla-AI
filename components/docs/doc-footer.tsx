import Link from 'next/link'
import { ExternalLink, Github, Twitter } from 'lucide-react'

export function DocFooter() {
  return (
    <footer className="mt-12">
      <div className="container max-w-4xl py-10 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-4">Documentation</h3>
            <ul className="grid gap-3">
              <li>
                <Link
                  href="#introduction"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="#installation"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#api-reference"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-sm text-muted-foreground hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="grid gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-1"
                >
                  GitHub <Github className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-1"
                >
                  Twitter <Twitter className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-1"
                >
                  Support <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:underline flex items-center gap-1"
                >
                  Blog <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
