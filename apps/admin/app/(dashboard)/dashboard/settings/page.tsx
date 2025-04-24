import type { Metadata } from 'next'
import SettingsClientPage from '@/app/(dashboard)/dashboard/settings/settings-client-page'

// This would normally be in the layout.tsx file, but for demonstration purposes
export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your company settings.',
}

export default function SettingsPage() {
  return <SettingsClientPage />
}
