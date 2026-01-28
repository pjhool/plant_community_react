import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google"
import "../core/styles/globals.css";
import { Providers } from "../core/components/Providers";
import { cn } from "@/core/utils/cn";

const notoTSans = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-noto-sans",
});

export const metadata: Metadata = {
    title: "반려식물 커뮤니티",
    description: "반려식물 초보집사를 위한 소통 공간",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                notoTSans.variable
            )}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
