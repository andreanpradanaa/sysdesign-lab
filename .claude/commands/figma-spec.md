---
description: Tarik desain Figma (bila ada) menjadi spec fitur di docs/features/<fitur>/spec.md. Hemat kuota MCP — cek docs/figma/ dulu.
argument-hint: <link-figma-dengan-node-id atau "-"> <nama-fitur>
---

# /figma-spec $ARGUMENTS

fileKey Figma proyek ini: **TODO (belum ada file Figma)**. Bila argumen pertama "-" atau tidak ada link, lewati MCP dan buat spec dari deskripsi user + kode yang ada.

## Tahap 1 — Cek ekstrak lokal
1. Baca `docs/figma/*.md`. Bila screen yang diminta sudah ada di sana, JANGAN panggil MCP.
2. Kuota MCP Figma ±20 panggilan/bulan: `get_metadata` maksimal sekali per file, `get_design_context` hanya untuk node yang belum ada di `docs/figma/`, `get_variable_defs` sekali per file. Catat jumlah panggilan.

## Tahap 2 — Ekstrak (hanya bila perlu)
Simpan hasil mentah per screen ke `docs/figma/sysdesign-lab-screens.md` (nama screen, node id, komponen, token warna/tipografi, state).

## Tahap 3 — Tulis spec
Buat/perbarui `docs/features/<nama-fitur>/spec.md` dengan template:
1. **Tujuan** (satu paragraf) dan sumber (link Figma/node atau "dari deskripsi").
2. **Screen & navigasi**: halaman/route yang terlibat, dari mana masuk, ke mana keluar.
3. **Komponen**: dipakai (petakan ke `src/components/*.astro` yang ada) dan baru.
4. **State per screen**: loading/kosong/error/berisi; untuk fitur localStorage sebutkan key dan bentuk datanya (rujuk `docs/api/`).
5. **Form & validasi klien** bila ada.
6. **Data yang dikonsumsi**: frontmatter/koleksi (rujuk `docs/api/`).
7. **Responsif & aksesibilitas**: breakpoint 900px, fokus keyboard, aria, kontras light/dark.
8. **Pertanyaan terbuka** untuk user.

## Tahap 4 — Laporan
Sebutkan file yang dibuat, jumlah panggilan MCP, dan pertanyaan terbuka. Jangan commit.
