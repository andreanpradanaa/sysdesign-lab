---
title: 'Rancang Uber (ride-hailing)'
order: 7
minutes: 45
relatedCase: 'bagian-3/uber'
difficulty: 'sulit'
hints:
  - 'Tanyakan apakah matching greedy atau batch, berapa pengemudi aktif, apakah surge termasuk, dan apakah pembayaran termasuk.'
  - 'Pisahkan dua jenis data: lokasi yang berfrekuensi tinggi dan boleh hilang, dan trip yang jarang berubah tetapi menyangkut uang.'
  - 'Pakai index geospasial berbasis grid seperti H3 atau geohash dengan sel tetangga, dan partisi per wilayah.'
  - 'Matching bersifat stateful: ubah status pengemudi dari available ke offered secara atomik dengan batas waktu. Jelaskan apa yang terjadi saat node matching mati.'
  - 'Perlakukan trip sebagai state machine dengan event yang hanya ditambahkan, dan pembayaran sebagai saga.'
---

**Soal.** Rancang layanan ride-hailing. Pengemudi mengirim lokasi terus-menerus, penumpang meminta tumpangan, dan sistem mencocokkan keduanya dengan pengemudi terdekat dalam hitungan detik. Setelah itu sistem mengelola trip sampai pembayaran selesai.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk latency matching, kesegaran lokasi, dan konsistensi trip.
2. Hitung ping lokasi per detik, permintaan per detik, push pelacakan, dan tulisan trip.
3. Rancang API pengemudi lewat stream dan API penumpang lewat HTTP dan push.
4. Rancang skema lokasi di memori dan trip di database, termasuk event trip.
5. Gambar high-level design dengan alur lokasi, alur permintaan dan matching, dan alur trip.
6. Dalami index geospasial dengan partisi wilayah, lalu matching dan perebutan pengemudi.
7. Evaluasi kegagalan node wilayah, bottleneck saat beban 10 kali, dan konsistensi pembayaran.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
