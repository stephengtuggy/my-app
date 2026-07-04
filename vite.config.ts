/// <reference types="vitest/config" />

import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    plugins: [],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
        },
        globals: true,
    },
});
