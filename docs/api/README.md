# Kontrak data (pengganti "API")

Proyek ini statis tanpa backend. Dua "kontrak" yang berperan sebagai API:

| Kontrak                                   | File                                   | Dipakai di                                                                     |
| ----------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------ |
| Skema frontmatter konten (lessons, mocks) | [content-schema.md](content-schema.md) | `src/content.config.ts`, semua halaman `belajar/`, `mock/`, `kuis/`            |
| Key & bentuk data localStorage            | [local-storage.md](local-storage.md)   | `src/lib/storage.ts`, komponen Quiz, MarkDone, MockInterview, `scripts/app.ts` |

Sumber: kode di `src/content.config.ts` dan `src/lib/*.ts`. Tanggal: 2026-10-21. Perubahan skema harus memperbarui dokumen ini dan test terkait.
