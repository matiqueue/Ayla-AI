import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { SessionProvider } from 'next-auth/react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <SessionProvider>
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <main>{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}