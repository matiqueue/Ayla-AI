import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { MenuBar } from "@/components/menu-bar"
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

interface PageProps {
    children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
    return (
        <div>
            <ThemeProvider attribute="class" defaultTheme="light">
                <div className="fixed top-0 left-0 right-0 z-10 h-[100px]">
                    <MenuBar />
                </div>
                <div className="absolute top-4 right-4 z-20">
                    <ThemeToggle />
                </div>
            </ThemeProvider>
            <div className="max-h-[100vh] max-w-[100vw] overflow-hidden relative">
                {children}
            </div>
        </div>
    );
}
