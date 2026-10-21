# sysdesign-lab

Platform belajar System Design pribadi (statis, Bahasa Indonesia, istilah teknis Inggris). Tidak ada backend/auth; progress di localStorage.

## Stack

- Astro 7 (static output) + MDX, TypeScript 5 strict, pnpm 12, Node >= 22.
- Konten: `src/content/lessons/<bagian>/<slug>.mdx` (skema di `src/content.config.ts`), `src/content/mocks/*.md`.
- Kurikulum (urutan & judul yang direncanakan): `src/data/curriculum.ts`. Konten baru harus ada di sini dulu.
- Logika murni (diuji Vitest): `src/lib/{progress,quiz,mock,url}.ts`; adapter browser: `src/lib/storage.ts`; helper koleksi: `src/lib/content.ts`.
- UI: `src/layouts/Base.astro`, `src/components/*.astro` (script client inline per komponen), `src/scripts/{app,theme,mermaid}.ts`, `src/styles/global.css` (token CSS, dark mode via `data-theme`).
- Routing: `src/pages/{index,cheatsheet}.astro`, `belajar/[...id]`, `mock/[id]`, `mock/`, `kuis/`.
- Diagram: blok ```mermaid dirender client-side (Shiki dikecualikan di astro.config.mjs).

## Spec & dokumen

- Spec fitur: `docs/features/<fitur>/spec.md`; peta fitur & format konten: `docs/features/overview.md`.
- Kontrak "API" = skema frontmatter + key localStorage: `docs/api/`.
- Progress proyek: `docs/PROGRESS.md`. Indeks dokumen: `docs/README.md`.
- Gaya bahasa: ikuti `docs/features/gaya-bahasa.md` (kalimat ≤30 kata, tanpa panah/titik koma di prosa, istilah Inggris diberi pengantar, opsi kuis ≤20 kata); lint di test aktif untuk prefix di `STYLE_CHECKED`.
- Sumber konten: hanya gratis (System Design Primer, ByteByteGo gratis, DDIA ringkasan, blog engineering, RFC). Jangan pernah menyalin teks/diagram educative.io atau sumber berbayar lain. Test konten menolak link educative.io.

## Workflow pengerjaan fitur / konten

Setiap fitur baru, perubahan, bug fix, atau modul konten baru (meski user tidak mengetik command) ikuti `.claude/commands/feature.md`:
plan (spec + `graphify query`) → TDD (`pnpm test`, coverage >= 80% via `pnpm test:coverage`) → `pnpm check` + `pnpm lint` + `pnpm format:check` bersih → review `/code-review` (+ agent security-reviewer bila menyentuh input user, storage, atau script client) → `/ui-check` bila tampilan berubah → `graphify update .` → update `docs/PROGRESS.md`.
Konten baru: ikuti format di overview (pelajaran: tujuan, konsep, mermaid, tabel trade-off, pertanyaan interviewer, ringkasan 3 poin, kuis 3-5 soal dengan penjelasan per opsi; studi kasus: 8 section berurutan). Perubahan kecil boleh lewati TDD dan review.

## Hemat token

- `graphify query "<pertanyaan>"` dulu sebelum membaca file; jangan `cat` file besar, pakai grep/sed -n.
- Figma: baca `docs/figma/` dan spec; panggil MCP Figma hanya lewat `/figma-spec`.
- Pangkas output tool (`| tail`, `--stat`); pekerjaan berlog panjang lewat subagent.
- Format + lint cepat sudah otomatis lewat hook PostToolUse; tidak perlu dijalankan manual setelah tiap edit.

## Git

- Jangan pernah `git commit` atau `git push` (dijaga hook). User commit manual per fitur; cukup usulkan pesan commit (Conventional Commits, bahasa Inggris).

## Perintah (semua sudah diverifikasi jalan)

- Test: `pnpm test` · coverage: `pnpm test:coverage` · watch: `pnpm test:watch`
- Type-check: `pnpm check` · lint: `pnpm lint` (`pnpm lint:fix`) · format: `pnpm format` / `pnpm format:check`
- Build: `pnpm build` · preview build: `pnpm preview`
- Deploy: otomatis via CI saat push ke main; fallback manual `pnpm deploy:pages` (lalu ubah source Pages ke branch gh-pages)
- Dev server: `pnpm dev` (atau `pnpm astro dev --background`, stop: `pnpm astro dev stop`); preview app lewat `.claude/launch.json` (nama `dev`, port 4321)
- Graph: `graphify update .`
