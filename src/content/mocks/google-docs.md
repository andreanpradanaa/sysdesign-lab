---
title: 'Rancang Google Docs (editor kolaboratif)'
order: 11
minutes: 45
relatedCase: 'bagian-3/google-docs'
difficulty: 'sulit'
hints:
  - 'Tanyakan berapa editor bersamaan per dokumen, apakah perlu offline, apakah ada riwayat versi, dan apakah teks kaya termasuk.'
  - 'Mulai dari contoh dua operasi bersamaan berbasis indeks yang menghasilkan dokumen berbeda. Itu alasan memakai OT atau CRDT.'
  - 'Dengan OT, satu doc server menjadi pengurut, client menyimpan operasi yang belum di-ack, dan log ditulis durable sebelum ACK.'
  - 'Saat doc server mati: lease kedaluwarsa, server baru memuat snapshot lalu memutar ulang log, dan client menyambung ulang dengan nomor versi.'
  - 'Sebutkan kapan CRDT lebih cocok daripada OT dan apa harganya.'
---

**Soal.** Rancang editor dokumen kolaboratif real-time. Banyak orang mengetik di dokumen yang sama dan melihat perubahan satu sama lain dalam waktu kurang dari satu detik. Tidak ada editan yang boleh hilang, dan dokumen punya riwayat versi serta izin akses.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk latency, konvergensi, dan durability.
2. Hitung operasi per detik, jumlah koneksi, ukuran log, dan memori doc server.
3. Rancang API untuk memuat dokumen lewat HTTP dan sesi edit lewat WebSocket dengan pesan OP, ACK, dan PRESENCE.
4. Rancang skema log operasi, snapshot, versi, dan daftar izin.
5. Gambar high-level design dengan alur memuat, alur mengedit, dan alur presence.
6. Dalami OT dengan server pengurut atau CRDT, lalu kepemilikan dokumen dan pemulihan.
7. Evaluasi editor lintas region, dokumen yang sangat ramai, bug fungsi transform, dan bottleneck saat beban 10 kali.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
