    # Progress — sysdesign-lab

Diperbarui: 2026-10-21. Total konten **58/58 (100%)**; deploy otomatis aktif; tersisa ekspor progress (opsional).

| Prioritas | Fitur                                                   | Progress   | %    | x/y   | Status                |
| --------- | ------------------------------------------------------- | ---------- | ---- | ----- | --------------------- |
| P0        | Fondasi (scaffold, tooling, CI)                         | ██████████ | 100% | 6/6   | Selesai               |
| P0        | Platform (progress, kuis, mock, cheat sheet, dark mode) | ██████████ | 100% | 7/7   | Selesai               |
| P0        | Bagian 1 — Fondasi (5 modul)                            | ██████████ | 100% | 5/5   | Selesai               |
| P1        | Bagian 2 — Building blocks (17 modul)                   | ██████████ | 100% | 17/17 | Selesai               |
| P1        | Bagian 3 — Studi kasus (16)                             | ██████████ | 100% | 16/16 | Selesai               |
| P2        | Bagian 4 — Outage & rangkuman (4)                       | ██████████ | 100% | 4/4   | Selesai               |
| P1        | Mock interview (soal per studi kasus)                   | ██████████ | 100% | 16/16 | Selesai               |
| P2        | Deploy (GitHub Pages)                                   | ██████████ | 100% | 3/3   | Selesai (CI otomatis) |

Legenda: Belum mulai · Berjalan · Selesai · Terblokir. Bar = 10 blok, tiap blok 10%.

## Fondasi

- [x] Scaffold Astro 7 + MDX, struktur folder, content collection terskema
- [x] Vitest + coverage 80%, ESLint, Prettier, `astro check`
- [x] `.env.example`, `.claude/launch.json`, CI GitHub Actions (lint → test → build → deploy Pages)
- [x] Claude Code: CLAUDE.md, ECC agents/rules/skills, command feature/figma-spec/ui-check, hooks
- [x] Graphify
- [x] Dokumen: overview, spec platform, api, PROGRESS, README

## Platform

- [x] Sidebar kurikulum + badge "segera" + tanda selesai
- [x] Progress bar + "lanjutkan belajar" (localStorage)
- [x] Halaman pelajaran: meta, prasyarat, sumber, prev/next, tandai selesai
- [x] Kuis interaktif dengan penjelasan per opsi dan skor tersimpan; halaman /kuis
- [x] Mock interview: timer 45 menit, checklist tahap, rubrik 1–4, catatan, riwayat
- [x] Cheat sheet
- [x] Dark mode, responsif (drawer mobile), mermaid client-side
- [x] Pedoman gaya bahasa (docs/features/gaya-bahasa.md) + lint gaya di test konten; diterapkan ke teks UI, semua 42 pelajaran (STYLE_CHECKED bagian-1..4), dan 16 soal mock (test "soal mock interview")
- [x] Redesign "premium": Inter + JetBrains Mono, token warna + gradasi aksen, header kaca dengan progress, hero + statistik + kartu kurikulum, TOC di halaman pelajaran, kartu navigasi prev/next, kuis & mock bergaya kartu
- [x] Enhancement ala HelloInterview: dashboard (streak, progress per bagian, area lemah, sesi mock, bookmark, catatan), pencarian global (Ctrl+K), catatan dan bookmark per pelajaran, kesulitan + tag pola di studi kasus dengan filter, sisipan "coba dulu" ke mock terkait, pertanyaan pemandu per tahap dan laporan sesi mock
- [x] Bank soal /soal ala "reported questions": 0 soal orisinal (src/data/questions.ts), filter tipe/level/kesulitan/sumber/tag, pencarian, urutan, tanda sudah dicoba, formulir laporan soal pribadi (localStorage)
- [ ] (opsional) Ekspor/impor progress JSON

## Bagian 1 — Fondasi

- [x] cara-kerja-interview
- [x] do-and-dont
- [x] abstraksi-distributed-system
- [x] karakteristik-non-fungsional
- [x] estimasi-kapasitas

## Bagian 2 — Building blocks

- [x] dns · [x] load-balancer · [x] database · [x] key-value-store · [x] cdn · [x] unique-id-generator · [x] distributed-monitoring · [x] distributed-cache · [x] message-queue · [x] pub-sub · [x] rate-limiter · [x] blob-store · [x] distributed-search · [x] distributed-logging · [x] task-scheduler · [x] sharded-counter · [x] framework-45-menit

## Bagian 3 — Studi kasus

- [x] tinyurl
- [x] web-crawler · [x] newsfeed · [x] instagram · [x] whatsapp · [x] youtube · [x] uber · [x] google-maps · [x] yelp-proximity · [x] typeahead · [x] google-docs · [x] payment-system · [x] deployment-system · [x] online-judge · [x] chatgpt-like · [x] llm-customer-support

## Bagian 4 — Outage

- [x] cloudflare · [x] aws · [x] facebook-bgp-2021 · [x] rangkuman

## Mock interview

- [x] tinyurl
- [x] web-crawler · [x] newsfeed · [x] instagram · [x] whatsapp · [x] youtube · [x] uber · [x] google-maps · [x] yelp-proximity · [x] typeahead · [x] google-docs · [x] payment-system · [x] deployment-system · [x] online-judge · [x] chatgpt-like · [x] llm-customer-support

## Deploy

- [x] Repo GitHub publik andreanpradanaa/sysdesign-lab, main ter-push
- [x] Situs live: https://andreanpradanaa.github.io/sysdesign-lab/ (source Pages: GitHub Actions, deploy otomatis tiap push ke main)
- [x] Fallback deploy manual: `pnpm deploy:pages` (push dist ke gh-pages; hanya bila CI tidak tersedia, lalu ubah source Pages ke branch)
- [x] Workflow CI hijau setelah kunci billing GitHub lepas (budget Actions $0 dihapus + verifikasi kartu); run 39576857453 attempt 5
