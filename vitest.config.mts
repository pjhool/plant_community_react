import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
        exclude: ['tests/e2e/**', 'node_modules/**'],
        // vitest 4.x: pool changed from 'forks' to 'vmForks' by default
        // Use 'forks' for better compatibility with jsdom + React 19
        pool: 'forks',
    },
});
