import "./globals.css";
import Navbar from "@/components/navbar";
import { Montserrat } from 'next/font/google';
import { Rubik } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react";
import Cursor from "@/components/cursor/cursor";



const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
});

const rubik = Rubik({
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
        <html lang="es" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            try {
                                const theme = localStorage.getItem('theme');
                                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                                if (theme === 'dark' || (!theme && systemDark)) {
                                document.documentElement.classList.add('dark');
                                } else {
                                document.documentElement.classList.remove('dark');
                            }
                        } catch (e) {}
                    })();
                    `,
                    }}
                />
            </head>
            <body className={`${rubik.className} overflow-x-hidden`}>
                <Cursor />
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Navbar />
                        <main className="min-h-screen px-6">
                            <Suspense>
                                {children}
                            </Suspense>
                        </main>
                </ThemeProvider>
            </body>
        </html>
    );
}