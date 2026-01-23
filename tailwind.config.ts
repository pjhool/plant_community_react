import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#2D5A27",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#F3F7F2",
                    foreground: "#171717",
                },
                destructive: {
                    DEFAULT: "#FF4D4D",
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "#F1F5F9",
                    foreground: "#64748B",
                },
                accent: {
                    DEFAULT: "#E8F5E9",
                    foreground: "#1B5E20",
                },
            },
        },
    },
    plugins: [],
};
export default config;
