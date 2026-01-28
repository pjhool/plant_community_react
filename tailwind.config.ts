import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                    50: '#F0FDF4',
                    100: '#DCFCE7',
                    200: '#BBF7D0',
                    300: '#86EFAC',
                    400: '#4ADE80',
                    500: '#22C55E',
                    600: '#16A34A',
                    700: '#15803D',
                    800: '#166534',
                    900: '#14532D',
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                success: {
                    DEFAULT: "var(--success)",
                    foreground: "#FFFFFF",
                },
                warning: {
                    DEFAULT: "var(--warning)",
                    foreground: "#FFFFFF",
                },
                error: {
                    DEFAULT: "var(--error)",
                    foreground: "#FFFFFF",
                },
                info: {
                    DEFAULT: "var(--info)",
                    foreground: "#FFFFFF",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-noto-sans)", "ui-sans-serif", "system-ui"],
            },
            fontSize: {
                'h1': ['28px', { lineHeight: '36px', letterSpacing: '-0.3px', fontWeight: '700' }],
                'h2': ['22px', { lineHeight: '30px', letterSpacing: '-0.2px', fontWeight: '500' }],
                'body1': ['16px', { lineHeight: '24px', fontWeight: '400' }],
                'body2': ['14px', { lineHeight: '20px', fontWeight: '400' }],
                'button': ['15px', { lineHeight: '20px', letterSpacing: '0.3px', fontWeight: '500' }],
                'caption': ['12px', { lineHeight: '16px', letterSpacing: '0.2px', fontWeight: '400' }],
            },
        },
    },
    plugins: [],
};
export default config;
