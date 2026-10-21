import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: { 'astro:content': fileURLToPath(new URL('./src/test/stubs/astro-content.ts', import.meta.url)) },
  },
  test: {
    include: ['src/test/**/*.test.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/lib/**/*.ts', 'src/data/**/*.ts'],
      exclude: ['src/lib/storage.ts'], // adapter browser, diuji manual lewat /ui-check
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
      reporter: ['text', 'html'],
    },
  },
});
