import type { Metadata } from 'next'
import { DocsContent } from '@/components/docs/docs-content'

export const metadata: Metadata = {
  title: 'Documentation | Your Product',
  description: 'Comprehensive documentation for your product or service.',
}

export default function DocsPage() {
  return <DocsContent />
}
