import "./globals.css";
import Navbar from "@/components/navbar";
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: "Tarek Díaz Carissimi Portfolio",
    description: "Ingeniero Multimedia",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className={`${montserrat.className} overflow-x-hidden`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Navbar />
                    <main className="min-h-screen">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}