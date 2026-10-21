---
title: 'Rancang Google Docs (editor kolaboratif)'
order: 11
minutes: 45
relatedCase: 'bagian-3/google-docs'
difficulty: 'sulit'
hints:
  - 'Tanyakan: berapa editor bersamaan per dokumen, offline, riwayat versi, teks kaya.'
  - 'Mulai dari contoh dua operasi concurrent berbasis indeks yang divergen; itu memotivasi OT atau CRDT.'
  - 'OT: satu doc server sebagai pengurut, client menyimpan op pending, transform terhadap op server; log durable sebelum ACK.'
  - 'Kegagalan doc server: lease, snapshot + replay log, reconnect dengan version dan dedup clientId+seq.'
  - 'Sebutkan kapan CRDT lebih cocok dan harganya.'
---

**Soal.** Rancang editor dokumen kolaboratif real-time: banyak orang mengetik di dokumen yang sama, melihat perubahan satu sama lain dalam sub-detik, tidak ada editan yang hilang, dengan riwayat versi dan izin.

**Yang diharapkan dalam 45 menit:**

1. Requirements dan NFR (latency, konvergensi, durability).
2. Estimasi operasi/detik, koneksi, log, memori doc server.
3. API muat dokumen (HTTP) dan sesi edit (WebSocket: OP/ACK/PRESENCE).
4. Skema op log, snapshot, versi, ACL.
5. High-level design: muat, edit, presence.
6. Deep dive: OT dengan server pengurut (sequence diagram) atau CRDT; kepemilikan dokumen dan pemulihan.
7. Evaluasi: region, dokumen panas, bug transform, bottleneck 10x.
