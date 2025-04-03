import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
