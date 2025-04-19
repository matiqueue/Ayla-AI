import Link from 'next/link'

export default function AdminPage() {
  return (
    <div>
      Witaj w panelu admina, zaloguj sie aby kkontynuowac:
      <Link href="/admin/login">Zaloguj się</Link>
    </div>
  )
}
