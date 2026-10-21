// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// SITE_URL dan BASE_PATH diisi dari env saat build (lihat .env.example dan CI).
// Contoh GitHub Pages: SITE_URL=https://<user>.github.io BASE_PATH=/sysdesign-lab
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [mdx()],
  vite: {
    // mermaid di-import dinamis; tanpa ini dev server Vite mengembalikan 504 saat pertama kali.
    optimizeDeps: { include: ['mermaid'] },
  },
  markdown: {
    // Blok ```mermaid tidak di-highlight Shiki; dirender di browser oleh src/scripts/mermaid.ts
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
