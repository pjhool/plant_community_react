import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        // vitest 4.x: pool changed from 'forks' to 'vmForks' by default
        // Use 'forks' for better compatibility with jsdom + React 19
        pool: 'forks',
    },
});
