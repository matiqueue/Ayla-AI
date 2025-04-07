import { Navbar, Footer, Sidebar } from '@/components/home/container/container'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </main>
  )
}
