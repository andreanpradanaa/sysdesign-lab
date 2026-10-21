# SysDesign Lab

Platform belajar System Design pribadi: statis, gratis, open source. Bahasa pengantar Indonesia, istilah teknis Inggris. Terinspirasi struktur kursus populer, tetapi semua teks, diagram, dan kuis ditulis orisinal dari sumber gratis (System Design Primer, ByteByteGo gratis, DDIA, blog engineering, RFC).

## Menjalankan

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm test         # Vitest (logika + validasi konten)
pnpm build        # output statis di dist/
```

Deploy ke GitHub Pages lewat `.github/workflows/ci.yml` (aktifkan Pages → Source: GitHub Actions). Untuk Vercel/domain sendiri set `BASE_PATH=/`.

## Struktur

- `src/content/lessons/<bagian>/*.mdx` — pelajaran, studi kasus, postmortem (format wajib di `docs/features/overview.md`)
- `src/content/mocks/*.md` — soal mock interview
- `src/data/curriculum.ts` — urutan kurikulum 4 bagian
- `src/lib/` — logika murni (progress, kuis, mock) · `src/components/` — UI
- `docs/` — spec, kontrak data, progress

Progress belajar disimpan di localStorage browser; tidak ada backend atau akun.
