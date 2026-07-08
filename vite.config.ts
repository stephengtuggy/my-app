/// <reference types="vitest/config" />

import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
import { angular } from '@analogjs/vite-plugin-angular';

export default defineConfig({
    plugins: [angular()],
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
