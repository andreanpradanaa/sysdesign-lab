---
title: 'Rancang web crawler'
order: 2
minutes: 45
relatedCase: 'bagian-3/web-crawler'
difficulty: 'sedang'
hints:
  - 'Tanyakan tujuan crawl, skala halaman per bulan, dan apakah halaman yang butuh JavaScript harus dirender.'
  - 'Dua hal yang hampir pasti ditanya: cara menjaga kesopanan per host sambil tetap paralel, dan cara menghindari duplikat URL dan konten.'
  - 'Hitung laju halaman per detik, bandwidth, dan storage 5 tahun. Angka storage harus membawa kamu ke blob store terkompresi.'
  - 'Sebutkan apa yang terjadi saat node frontier mati dan bagaimana kamu menangani spider trap.'
---

**Soal.** Rancang crawler yang mengunduh sebagian besar web untuk mesin pencari, dalam skala miliaran halaman. Crawler harus memperbarui halaman yang berubah dan tidak boleh membebani situs yang dikunjungi.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement tentang cakupan, kesopanan, kesegaran, dan ketahanan, lalu sebutkan yang di luar cakupan.
2. Hitung laju unduh, bandwidth, storage, dan ukuran himpunan URL yang pernah dilihat.
3. Rancang API untuk seed dan permintaan crawl ulang, serta kontrak untuk pipeline di hilir.
4. Rancang skema metadata URL, state per host, dan penyimpanan konten.
5. Gambar high-level design dengan alur satu halaman dari frontier sampai tersimpan.
6. Dalami frontier dengan prioritas dan kesopanan, lalu dedup URL dan konten.
7. Evaluasi bottleneck saat beban 10 kali, titik lemah tunggal, dan penanganan spider trap.

Kerjakan di kertas atau whiteboard sambil bicara seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
