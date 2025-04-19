import { Suspense } from 'react'

export default function GenerateLicenseLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>
}
