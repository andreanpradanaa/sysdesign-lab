---
title: 'Rancang sistem pemesanan tiket konser'
order: 17
minutes: 45
relatedCase: 'bagian-3/ticket-booking'
difficulty: 'sedang'
hints:
  - 'Tanyakan apakah kursi bernomor, berapa lama hold berlaku, dan seberapa besar lonjakan saat penjualan dibuka.'
  - 'Pisahkan dua beban: baca halaman event yang sangat besar, dan tulis reservasi kursi yang kecil tetapi saling berebut.'
  - 'Jelaskan bagaimana satu kursi dijamin hanya terjual ke satu orang, dan kenapa cek lalu ubah tidak cukup.'
  - 'Rancang hold berwaktu: apa yang terjadi bila pembeli pergi, dan bila pembayaran sukses setelah hold habis?'
  - 'Jelaskan bagaimana antrian virtual melindungi sistem pemesanan saat jutaan orang datang bersamaan.'
---

**Soal.** Rancang sistem penjualan tiket konser seperti Ticketmaster. Pengguna mencari event, memilih kursi bernomor, menahannya beberapa menit, lalu membayar. Saat konser populer dibuka, jutaan orang datang dalam menit pertama, dan satu kursi tidak boleh terjual ke dua orang.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirements fungsional dan target non-fungsional, termasuk yang sengaja di luar cakupan.
2. Hitung QPS baca saat lonjakan, laju reservasi, dan ukuran data kursi.
3. Rancang API untuk mencari, melihat kursi, menahan kursi, dan membayar.
4. Rancang skema event, kursi, reservasi, dan tiket beserta status kursi.
5. Gambar high-level design dan jelaskan alur memesan dari awal sampai akhir.
6. Dalami pencegahan double booking, hold berwaktu, dan antrian virtual.
7. Evaluasi target non-fungsional dan sebutkan bottleneck pertama saat beban naik 10 kali.

Kerjakan di kertas atau whiteboard, dan bicaralah seolah ada interviewer. Setelah selesai, bandingkan jawabanmu dengan studi kasus terkait.
