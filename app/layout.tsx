import { ReactNode } from "react";
import "@/styles/globals.css";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
