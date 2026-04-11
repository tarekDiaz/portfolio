import "./globals.css";
import Navbar from "@/components/navbar";
import { Montserrat } from 'next/font/google';

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
        <html lang="es">
            <body className={`${montserrat.className} bg-background text-white overflow-x-hidden`}>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}