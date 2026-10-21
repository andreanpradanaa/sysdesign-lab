---
title: 'Rancang WhatsApp (chat 1:1 dan grup)'
order: 5
minutes: 45
relatedCase: 'bagian-3/whatsapp'
difficulty: 'sulit'
hints:
  - 'Tanyakan ukuran grup maksimum, dukungan multi-perangkat, end-to-end encryption, dan apakah server menyimpan riwayat.'
  - 'Hitung pesan per detik dan koneksi bersamaan. Jumlah koneksi menentukan berapa server koneksi yang kamu butuhkan.'
  - 'Pisahkan lapisan koneksi yang ringan dari message service. Simpan routing pengguna ke server di KV dengan lease.'
  - 'Untuk reliability: inbox durable sebelum ACK, id pesan dari client untuk dedup, dan ack bertingkat. Jelaskan skenario penerima offline.'
  - 'Sebutkan apa yang tidak bisa dilakukan server karena end-to-end encryption.'
---

**Soal.** Rancang aplikasi chat seperti WhatsApp. Pesan bisa 1:1 atau grup, punya status terkirim dan dibaca, dan penerima bisa sedang offline. Skalanya miliaran pengguna, dan server tidak boleh bisa membaca isi pesan.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement fungsional untuk 1:1, grup, status, presence, dan media, lalu target non-fungsional untuk latency, keandalan, urutan, dan privasi.
2. Hitung pesan per detik, koneksi bersamaan, dan storage inbox.
3. Rancang API dengan jalur HTTP dan jalur koneksi persisten, termasuk frame SEND, ACK, MESSAGE, DELIVERED, dan READ.
4. Rancang skema routing, inbox, keanggotaan grup, dan kunci enkripsi.
5. Gambar high-level design dengan alur penerima online dan alur penerima offline.
6. Dalami lapisan koneksi dan kegagalan server koneksi, lalu jaminan reliability dan fan-out grup.
7. Evaluasi latency, availability, skala 10 kali, dan batasan yang muncul dari end-to-end encryption.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
