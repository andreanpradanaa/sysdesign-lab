# Spec: fondasi platform (scaffold)

Sumber: deskripsi user (2026-10-21), tanpa Figma.

## Tujuan

Kerangka yang memungkinkan menulis konten modul per modul tanpa menyentuh kode lagi: content collection terskema, navigasi otomatis dari kurikulum, progress lokal, kuis, mock interview, cheat sheet, dark mode, responsif.

## Screen & navigasi

Lihat peta halaman di `../overview.md`. Semua halaman memakai sidebar yang sama; mobile memakai drawer (tombol ☰).

## Komponen

Semua baru: Base, Sidebar, Quiz, MarkDone, MockInterview.

## State

- Sidebar/beranda: progress 0/N saat kosong; "Mulai: <pelajaran pertama>" bila belum pernah berkunjung; "Lanjutkan: …" setelahnya; "Semua pelajaran selesai" bila habis.
- Kuis: belum dinilai → dinilai (opsi benar hijau, pilihan salah merah, penjelasan semua opsi tampil) → ulangi.
- Mock: timer belum mulai → berjalan (tahap aktif disorot) → ≤5 menit kuning → lewat 0 merah dengan tanda minus; riwayat kosong → berisi.
- Diagram: mermaid gagal → pesan merah di tempat diagram, halaman tetap berfungsi.

## Data

`docs/api/content-schema.md` dan `docs/api/local-storage.md`.

## Responsif & aksesibilitas

Breakpoint 900px. Tombol ikon ber-`aria-label`; tombol skala rubrik `aria-pressed`; hasil kuis `aria-live`; `prefers-reduced-motion` mematikan transisi.

## Pertanyaan terbuka

Lihat overview.
