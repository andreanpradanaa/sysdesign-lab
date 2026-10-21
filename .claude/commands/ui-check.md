---
description: Verifikasi visual halaman yang berubah terhadap spec (dan Figma bila ada): dev server, screenshot tiap state, light/dark, mobile/desktop, aksesibilitas dasar.
argument-hint: <nama-fitur atau path halaman, mis. "/mock/tinyurl">
---

# /ui-check $ARGUMENTS

## Tahap 1 — Siapkan
1. Baca spec terkait di `docs/features/` bila ada.
2. Pastikan dev server jalan: `pnpm astro dev status`; bila belum, `pnpm astro dev --background --port 4321`. Buka lewat browser bawaan (`.claude/launch.json` nama `dev`) atau `http://localhost:4321`.

## Tahap 2 — Periksa tiap halaman yang berubah
Untuk tiap halaman:
1. Desktop (lebar pane) dan mobile (375px): screenshot, tidak ada overflow horizontal, drawer sidebar bisa dibuka.
2. Light dan dark (tombol tema): kontras teks/tabel/kode/diagram mermaid.
3. State: konten kosong (mis. belum ada sesi mock), setelah interaksi (kuis dinilai, tandai selesai), error (diagram mermaid gagal).
4. Konsol browser: tidak ada error.
5. Aksesibilitas dasar: tab keyboard sampai semua kontrol, `aria-label` tombol ikon, heading berurutan.

## Tahap 3 — Laporan
Tabel: halaman → state → OK/selisih (deskripsi + screenshot). Perbaiki selisih kecil langsung; yang besar kembalikan ke `/feature`. Jangan commit.
