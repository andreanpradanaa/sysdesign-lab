# Peta fitur — sysdesign-lab

Platform belajar System Design pribadi (statis, gratis, open source). Tidak ada Figma; desain langsung di kode dengan token CSS di `src/styles/global.css` (font Inter/JetBrains Mono dari Google Fonts, aksen gradasi indigo→violet→sky, dark mode via `html[data-theme]`, breakpoint 900px untuk drawer dan 1100px untuk TOC).

## Peta halaman

| Route                      | File                              | Fungsi                                                                                           |
| -------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `/`                        | `src/pages/index.astro`           | Beranda: progress, tombol lanjutkan, daftar kurikulum                                            |
| `/belajar/<bagian>/<slug>` | `src/pages/belajar/[...id].astro` | Pelajaran / studi kasus / postmortem + kuis + tandai selesai + prev/next                         |
| `/mock`                    | `src/pages/mock/index.astro`      | Daftar soal mock, tahap & rubrik                                                                 |
| `/mock/<slug>`             | `src/pages/mock/[id].astro`       | Mode mock interview (timer, checklist, rubrik, riwayat)                                          |
| `/kuis`                    | `src/pages/kuis/index.astro`      | Daftar kuis dan skor terakhir                                                                    |
| `/cheatsheet`              | `src/pages/cheatsheet.astro`      | Latency numbers, pola umum, tabel pilih DB, urutan 45 menit                                      |
| `/dashboard`               | `src/pages/dashboard.astro`       | Sapaan, streak, progress per bagian, area lemah dari kuis, sesi mock terakhir, bookmark, catatan |
| `/search.json`             | `src/pages/search.json.ts`        | Indeks pencarian statis untuk modal Ctrl+K                                                       |

## Komponen

| Komponen                         | Tanggung jawab                                                                         |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| `layouts/Base.astro`             | Shell: header, nav, toggle tema, sidebar, inline theme script, memuat `scripts/app.ts` |
| `components/Sidebar.astro`       | Kurikulum 4 bagian, tanda selesai, progress bar, tombol lanjutkan, badge "segera"      |
| `components/Quiz.astro`          | Form pilihan ganda, penilaian, penjelasan per opsi, simpan skor                        |
| `components/MarkDone.astro`      | Tandai/batal selesai, catat kunjungan terakhir                                         |
| `components/MockInterview.astro` | Timer mundur, checklist tahap (anggaran waktu), rubrik 1–4, catatan, riwayat           |
| `components/Search.astro`        | Modal pencarian global dengan navigasi keyboard                                        |
| `components/Notes.astro`         | Catatan belajar per pelajaran, autosave ke localStorage                                |
| `components/Bookmark.astro`      | Simpan atau lepas pelajaran ke daftar tersimpan                                        |

## Format konten (wajib)

**Pelajaran** (`type: lesson`): frontmatter lengkap → `## Tujuan belajar` → penjelasan konsep → diagram mermaid → tabel trade-off → `## Pertanyaan yang sering ditanya interviewer` → `## Ringkasan` (3 poin) → kuis 3–5 soal di frontmatter dengan penjelasan per opsi.

**Studi kasus** (`type: case`): 8 section H2 berurutan: Requirements → Estimasi kapasitas → API design → Skema data → High-level design → Detailed design → Evaluasi terhadap non-functional requirements → Pertanyaan lanjutan interviewer. Lihat contoh `src/content/lessons/bagian-3/tinyurl.mdx`.

**Postmortem** (`type: postmortem`): format pelajaran, dengan bagian "Kronologi", "Akar masalah", "Pola yang bisa dipetik".

**Mock**: satu file per soal di `src/content/mocks/`, dirujuk ke studi kasus.

## Glosarium

- **bagian**: salah satu dari 4 modul besar kurikulum (`bagian-1`..`bagian-4`).
- **lessonId**: `<bagian>/<slug>`, kunci di localStorage dan URL.
- **tersedia vs direncanakan**: kurikulum di `src/data/curriculum.ts` memuat semua topik; yang belum punya file tampil "segera" dan tidak dihitung ke progress.

## State machine pelajaran (per browser)

`belum dibuka` → (buka) `dikunjungi` (lastVisited) → (tandai selesai) `selesai` ⇄ (batalkan) `dikunjungi`. Kuis independen: `belum` → `dinilai (skor terakhir)`.

## Pertanyaan terbuka

- Ekspor/impor progress (JSON) untuk pindah browser? Belum diputuskan.
- Apakah skor kuis ikut menentukan "selesai"? Saat ini tidak.
