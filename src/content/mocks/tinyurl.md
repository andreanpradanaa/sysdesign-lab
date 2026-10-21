---
title: 'Rancang layanan pemendek URL'
order: 1
minutes: 45
relatedCase: 'bagian-3/tinyurl'
difficulty: 'mudah'
hints:
  - 'Tanyakan dulu apakah perlu alias kustom, apakah perlu analytics, berapa URL baru per bulan, dan berapa lama URL hidup.'
  - 'Hitung perbandingan baca dan tulis. Rasio 100 banding 1 seharusnya langsung membawa kamu ke cache.'
  - 'Bagaimana key dibuat tanpa bertabrakan dan tanpa bisa ditebak? Bandingkan minimal dua pendekatan.'
  - 'Sebutkan status code redirect yang kamu pilih dan akibatnya terhadap cache browser dan analytics.'
  - 'Sebelum selesai, tanyakan pada dirimu apa yang terjadi kalau database primary mati selama dua menit.'
---

**Soal.** Rancang layanan seperti bit.ly. Pengguna mengirim URL panjang dan mendapat URL pendek. Siapa pun yang membuka URL pendek itu diarahkan ke URL aslinya.

**Yang diharapkan interviewer dalam 45 menit:**

1. Tulis requirement fungsional dan non-fungsional, termasuk hal yang sengaja kamu keluarkan dari cakupan.
2. Hitung QPS baca dan tulis, storage untuk 5 tahun, dan ukuran cache dengan asumsi yang kamu tulis sendiri.
3. Rancang API minimal untuk membuat URL pendek dan melakukan redirect, lengkap dengan kasus error.
4. Rancang skema data dan jelaskan alasan memilih jenis database itu.
5. Gambar high-level design yang bisa kamu jelaskan untuk satu alur tulis dan satu alur baca.
6. Dalami dua komponen: pembuatan key dan strategi cache.
7. Evaluasi desainmu terhadap availability dan latency, lalu sebutkan titik lemah tunggal dan cara mengatasinya.

Kerjakan di kertas atau whiteboard. Bicaralah keras-keras seolah ada interviewer. Setelah selesai, buka studi kasus terkait dan bandingkan.
