# Skema frontmatter konten

Sumber kebenaran: `src/content.config.ts` (Zod). Validasi tambahan tanpa Astro: `src/test/content.test.ts`.

## Koleksi `lessons` — `src/content/lessons/<bagian>/<slug>.mdx`

ID entri = `<bagian>/<slug>` dan **harus** terdaftar di `src/data/curriculum.ts`.

| Field           | Tipe                               | Wajib                    | Keterangan                                                |
| --------------- | ---------------------------------- | ------------------------ | --------------------------------------------------------- |
| `title`         | string                             | ya                       | Judul halaman                                             |
| `module`        | `bagian-1`..`bagian-4`             | ya                       | Harus sama dengan folder                                  |
| `order`         | int >= 0                           | ya                       | Urutan di dalam bagian (tampilan mengikuti curriculum.ts) |
| `minutes`       | int > 0                            | ya                       | Estimasi menit belajar                                    |
| `type`          | `lesson` \| `case` \| `postmortem` | tidak (default `lesson`) | `case` memaksa 8 section berurutan                        |
| `prerequisites` | string[] (id pelajaran)            | tidak                    | Ditampilkan sebagai link bila tersedia                    |
| `sources`       | `{title, url}[]` min 1             | ya                       | Hanya sumber gratis; `educative.io` ditolak test          |
| `summary`       | string                             | tidak                    | Satu kalimat, dipakai meta description                    |
| `quiz`          | QuizQuestion[] 3–5                 | ya (lewat test)          | Lihat di bawah                                            |
| `draft`         | boolean                            | tidak                    | `true` = disembunyikan saat build produksi                |

### `quiz[]`

```yaml
- q: 'Pertanyaan?'
  options:
    - { text: 'Opsi A', correct: true, why: 'Kenapa benar' }
    - { text: 'Opsi B', correct: false, why: 'Kenapa salah' }
```

Tepat satu `correct: true` per soal; semua opsi wajib `why`.

### Struktur body

- `lesson` / `postmortem`: wajib ada H2 "Tujuan belajar", H2 yang mengandung "interviewer", H2 "Ringkasan", dan minimal satu blok ```mermaid.
- `case`: H2 berurutan: `1. Requirements`, `2. Estimasi kapasitas`, `3. API design`, `4. Skema data`, `5. High-level design`, `6. Detailed design`, `7. Evaluasi terhadap non-functional requirements`, `8. Pertanyaan lanjutan interviewer`.

## Koleksi `mocks` — `src/content/mocks/<slug>.md`

| Field         | Tipe                           | Wajib            | Keterangan                    |
| ------------- | ------------------------------ | ---------------- | ----------------------------- |
| `title`       | string                         | ya               |                               |
| `order`       | int                            | ya               | Urutan di halaman /mock       |
| `minutes`     | int                            | tidak (45)       | Durasi timer                  |
| `relatedCase` | id pelajaran                   | tidak            | Link ke studi kasus           |
| `difficulty`  | `mudah` \| `sedang` \| `sulit` | tidak (`sedang`) |                               |
| `hints`       | string[]                       | tidak            | Ditampilkan dalam `<details>` |

Body = soal yang ditampilkan ke user.
