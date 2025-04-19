import { SidebarProvider, SidebarTrigger } from '@workspace/ui/components/sidebar'
import { AppSidebar } from '@/components/docs/app-sidebar'

export const metadata = {
  title: 'Minimal Docs Site',
  description: 'A gorgeous minimal documentation site using Next.js App Router',
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="ml-3 mt-3" />
      <main className="flex-1 overflow-auto p-8 pt-16">{children}</main>
    </SidebarProvider>
  )
}
