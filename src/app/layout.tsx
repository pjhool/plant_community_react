import type { Metadata } from "next";
import { Inter } from "next/font"
import "../core/styles/globals.css";
import { Providers } from "../core/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Plant Community",
    description: "A community for plant lovers",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
