---
title: 'Rancang YouTube (video on demand)'
order: 6
minutes: 45
relatedCase: 'bagian-3/youtube'
difficulty: 'sulit'
hints:
  - 'Tanyakan apakah hanya video on demand atau juga live, berapa resolusi maksimum, dan apakah rekomendasi termasuk.'
  - 'Estimasi bandwidth keluar harus menghasilkan angka yang mustahil dilayani origin. Itu argumenmu untuk CDN di dalam ISP.'
  - 'Rancang pipeline transcoding sebagai DAG: potongan paralel, kualitas yang terbit bertahap, aman diulang, dan punya prioritas.'
  - 'Penyajian memakai manifest dan segmen HLS atau DASH dengan bitrate adaptif dan URL bertanda tangan. Semuanya file statis.'
  - 'Hitung view count lewat stream dan agregasi, bukan update database per tontonan.'
---

**Soal.** Rancang platform video on demand seperti YouTube. Kreator mengunggah video berukuran gigabyte, dan penonton di seluruh dunia menontonnya dengan waktu mulai cepat dan tanpa buffering. Skalanya miliaran jam tonton per hari.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement dan target non-fungsional untuk waktu mulai, rebuffer, durability, dan biaya.
2. Hitung dari jam tonton ke stream bersamaan lalu bandwidth, dari upload ke storage, dan dari transcoding ke CPU.
3. Rancang API upload, metadata, playback statis, dan event tontonan.
4. Rancang skema video, rendition, statistik, dan event stream, lalu tata letak objek di blob store.
5. Gambar high-level design dengan alur upload yang melewati DAG dan alur tonton yang melewati CDN.
6. Dalami pipeline transcoding, lalu bitrate adaptif dan CDN.
7. Evaluasi waktu mulai dan rebuffer, availability, bottleneck saat beban 10 kali, dan biaya.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
