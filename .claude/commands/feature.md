---
description: Alur wajib untuk fitur baru, perubahan, bug fix, atau modul konten baru — plan → TDD → build/lint → review → verifikasi visual → selesai. Tidak boleh lompat tahap.
argument-hint: <nama-fitur atau id-konten, mis. "bagian-2/dns" atau "progress-export">
---

# /feature $ARGUMENTS

Kerjakan tahap 1–6 berurutan. Tulis satu baris ringkasan setelah tiap tahap. Jangan commit/push.

## Tahap 1 — Plan
1. Baca `docs/features/overview.md` dan, bila ada, `docs/features/$ARGUMENTS/spec.md`. Untuk konten: cek `src/data/curriculum.ts` berisi slug-nya; bila belum, tambahkan dulu.
2. `graphify query "$ARGUMENTS"` (bila `graphify-out/graph.json` ada) untuk menemukan file terkait; baru buka file yang relevan dengan `sed -n`.
3. Tulis rencana singkat: file yang disentuh, perilaku yang diuji, risiko. Untuk konten: daftar sumber gratis yang akan dirujuk (tanpa educative.io / sumber berbayar).

## Tahap 2 — TDD
1. Logika di `src/lib/` atau `src/data/`: tulis test di `src/test/` dulu (merah), implementasi minimum (hijau), refactor. Ikuti skill `tdd-workflow`.
2. Konten MDX: test `src/test/content.test.ts` sudah memvalidasi frontmatter, kuis, section studi kasus, dan mermaid — jalankan `pnpm test` sampai hijau.
3. `pnpm test:coverage` harus >= 80% untuk `src/lib` dan `src/data`.

## Tahap 3 — Build, type-check, lint, format
`pnpm check && pnpm lint && pnpm format:check && pnpm build` semua bersih. Bila gagal, pakai `/build-fix`.

## Tahap 4 — Review
1. `/code-review` untuk perubahan lokal.
2. Panggil agent `security-reviewer` bila menyentuh script client, localStorage, parsing input, atau dependensi baru.
3. Untuk komponen UI baru: agent `a11y-architect` atau skill `frontend-a11y`.

## Tahap 5 — Verifikasi visual (bila tampilan/konten berubah)
Jalankan `/ui-check $ARGUMENTS`: dev server, buka halaman yang berubah, cek light/dark, mobile (375px) dan desktop, state kosong/error, diagram mermaid ter-render.

## Tahap 6 — Selesai
1. `pnpm test` terakhir.
2. `graphify update .`
3. Update `docs/PROGRESS.md` (centang item, persen) dan spec bila ada keputusan baru.
4. Ringkas ke user: apa yang berubah, hasil test/lint, hal yang belum diverifikasi.
5. Jangan commit. Usulkan pesan commit Conventional Commits (mis. `feat(content): add DNS lesson`).
